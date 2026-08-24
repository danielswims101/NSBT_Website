import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";

export type ClassMeeting = {
  id: string;
  series_id: string;
  course_code: string;
  title: string;
  meet_url: string | null;
  starts_at: string;
  duration_min: number;
  status: string;
  roster: string;
  populi_note: string | null;
  posted_by: string | null;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function formatMeetingWhen(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(d);
}

export function toDatetimeLocal(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function icsStamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function meetingIcs(row: ClassMeeting) {
  const start = new Date(row.starts_at);
  const end = new Date(start.getTime() + row.duration_min * 60 * 1000);
  const desc = [row.meet_url && `Join: ${row.meet_url}`, row.populi_note, "Populi remains the record."]
    .filter(Boolean)
    .join("\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NSBT Campus//EN",
    "BEGIN:VEVENT",
    `UID:${row.id}@nsbt.org`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:${row.course_code} ${row.title}`.replace(/\n/g, " "),
    `DESCRIPTION:${desc}`,
    row.meet_url ? `URL:${row.meet_url}` : "",
    row.status === "cancelled" ? "STATUS:CANCELLED" : "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function downloadIcs(row: ClassMeeting) {
  const blob = new Blob([meetingIcs(row)], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${row.course_code}-${row.id.slice(0, 8)}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function rosterMailto(row: ClassMeeting, kind: "posted" | "moved" | "cancelled") {
  const bcc = row.roster
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(",");
  const heading = kind === "cancelled" ? "Cancelled" : kind === "moved" ? "Updated time" : "Class hour posted";
  const body = [
    `${heading}: ${row.course_code} ${row.title}`,
    formatMeetingWhen(row.starts_at),
    row.meet_url ? `Join: ${row.meet_url}` : "Join from Campus → Join class, or your Calendar.",
    "",
    "Populi still holds the paper and the grade.",
    "Office of Student Records and Accounts · studentservices@nsbt.org",
  ].join("\n");
  const q = new URLSearchParams({
    subject: `NSBT · ${heading} · ${row.course_code}`,
    body,
  });
  if (bcc) q.set("bcc", bcc);
  return `mailto:studentservices@nsbt.org?${q.toString()}`;
}

export function upcomingMeetings(rows: ClassMeeting[], now = Date.now()) {
  return rows
    .filter((r) => r.status !== "cancelled")
    .filter((r) => new Date(r.starts_at).getTime() + r.duration_min * 60 * 1000 > now - 18 * 60 * 1000)
    .sort((a, b) => +new Date(a.starts_at) - +new Date(b.starts_at));
}

export function nextMeeting(rows: ClassMeeting[]) {
  return upcomingMeetings(rows)[0] ?? null;
}

export const listMeetings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return sql<ClassMeeting>`
      select id, series_id, course_code, title, meet_url, starts_at::text as starts_at,
             duration_min, status, roster, populi_note, posted_by
      from class_meetings
      order by starts_at asc
    `;
  });

const createSchema = z.object({
  course_code: z.string().min(1),
  title: z.string().min(1),
  first_start: z.string().min(1),
  weeks: z.number().min(1).max(16),
  duration_min: z.number().min(30).max(240),
  meet_url: z.string().optional(),
  roster: z.string().optional(),
  populi_note: z.string().optional(),
});

export const createMeetingSeries = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(createSchema)
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const seriesId = crypto.randomUUID();
    const first = new Date(data.first_start);
    if (Number.isNaN(first.getTime())) throw new Error("Invalid first meeting time");
    for (let i = 0; i < data.weeks; i += 1) {
      const start = new Date(first.getTime() + i * 7 * 24 * 60 * 60 * 1000);
      await sql`
        insert into class_meetings (
          id, series_id, course_code, title, meet_url, starts_at, duration_min, status, roster, populi_note, posted_by
        ) values (
          ${crypto.randomUUID()},
          ${seriesId},
          ${data.course_code},
          ${data.title},
          ${data.meet_url || null},
          ${start.toISOString()},
          ${data.duration_min},
          ${"posted"},
          ${data.roster ?? ""},
          ${data.populi_note || null},
          ${context.userId}
        )
      `;
    }
    return { ok: true, series_id: seriesId };
  });

const updateSchema = z.object({
  id: z.string().min(1),
  starts_at: z.string().optional(),
  meet_url: z.string().optional(),
  status: z.string().optional(),
});

export const updateMeeting = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(updateSchema)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<ClassMeeting>`select * from class_meetings where id = ${data.id} limit 1`;
    const current = rows[0];
    if (!current) throw new Error("Hour not found");
    const starts = data.starts_at ?? current.starts_at;
    const meet = data.meet_url ?? current.meet_url;
    const status = data.status ?? current.status;
    await sql`
      update class_meetings
      set starts_at = ${starts},
          meet_url = ${meet},
          status = ${status}
      where id = ${data.id}
    `;
    return { ok: true };
  });
