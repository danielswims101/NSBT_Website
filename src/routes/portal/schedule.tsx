import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PortalGate } from "@/components/campus/portal-gate";
import { Button } from "@/components/site/button";
import {
  createMeetingSeries,
  downloadIcs,
  formatMeetingWhen,
  listMeetings,
  rosterMailto,
  toDatetimeLocal,
  updateMeeting,
  type ClassMeeting,
} from "@/lib/meetings";

export const Route = createFileRoute("/portal/schedule")({
  component: () => (
    <PortalGate>
      {(_user, role) => (role === "faculty" ? <ScheduleBoard /> : <StudentsSeeJoin />)}
    </PortalGate>
  ),
  head: () => ({ meta: [{ title: "Class board · Campus · NSBT" }] }),
});

function StudentsSeeJoin() {
  return (
    <>
      <h1 className="font-display text-4xl text-ink">Class board</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        Faculty and Student Records post the hour here. Open Join class for this week’s Meet.
      </p>
    </>
  );
}

function ScheduleBoard() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["meetings"], queryFn: () => listMeetings() });
  const rows = q.data ?? [];
  const series = useMemo(() => {
    const map = new Map<string, ClassMeeting[]>();
    for (const row of rows) {
      const list = map.get(row.series_id) ?? [];
      list.push(row);
      map.set(row.series_id, list);
    }
    return [...map.entries()];
  }, [rows]);

  return (
    <>
      <p className="text-[0.7rem] tracking-[0.18em] text-subtle uppercase">Control tower</p>
      <h1 className="mt-2 font-display text-4xl text-ink">Class board.</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        Post the weekly hour here. Students see it on Join class. Moving a week updates the board and opens a notice to the roster. Populi still holds the paper. Google Calendar still sends the invite once you import the file or IT connects the API. Current-session links you already gave students stay valid.
      </p>
      <PostSeries onCreated={() => void q.refetch()} />
      {q.isPending ? <p className="mt-8 text-muted">Loading the board…</p> : null}
      {q.error ? <p className="mt-8 text-seal">Could not open the board. Sign in again.</p> : null}
      <div className="mt-10 space-y-10">
        {series.map(([id, list]) => (
          <SeriesBlock key={id} rows={list} onChange={() => void qc.invalidateQueries({ queryKey: ["meetings"] })} />
        ))}
        {!q.isPending && series.length === 0 ? (
          <p className="text-muted">No hours posted yet. Create the first series above.</p>
        ) : null}
      </div>
    </>
  );
}

function PostSeries({ onCreated }: { onCreated: () => void }) {
  const [course, setCourse] = useState("");
  const [title, setTitle] = useState("");
  const [first, setFirst] = useState("");
  const [weeks, setWeeks] = useState(8);
  const [minutes, setMinutes] = useState(90);
  const [meet, setMeet] = useState("");
  const [roster, setRoster] = useState("");
  const [note, setNote] = useState("");
  const m = useMutation({
    mutationFn: () =>
      createMeetingSeries({
        data: {
          course_code: course,
          title,
          first_start: first,
          weeks,
          duration_min: minutes,
          meet_url: meet,
          roster,
          populi_note: note,
        },
      }),
    onSuccess: onCreated,
  });

  return (
    <form
      className="mt-10 max-w-3xl border border-rule bg-cream p-6"
      onSubmit={(e) => {
        e.preventDefault();
        m.mutate();
      }}
    >
      <h2 className="font-display text-2xl text-ink">Post a series</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Course code
          <input required value={course} onChange={(e) => setCourse(e.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" placeholder="MA100" />
        </label>
        <label className="block text-sm">
          Title
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" placeholder="Leadership in Global Context" />
        </label>
        <label className="block text-sm sm:col-span-2">
          First meeting
          <input required type="datetime-local" value={first} onChange={(e) => setFirst(e.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
        </label>
        <label className="block text-sm">
          Weeks
          <input type="number" min={1} max={16} value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
        </label>
        <label className="block text-sm">
          Minutes
          <input type="number" min={30} max={240} step={15} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        Google Meet URL (paste the one already in Calendar)
        <input value={meet} onChange={(e) => setMeet(e.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" placeholder="https://meet.google.com/…" />
      </label>
      <label className="mt-4 block text-sm">
        Roster · @nsbt.org addresses, one per line
        <textarea value={roster} onChange={(e) => setRoster(e.target.value)} rows={3} className="mt-1 w-full border border-rule bg-paper px-3 py-2" placeholder="student@nsbt.org" />
      </label>
      <label className="mt-4 block text-sm">
        Populi note (optional)
        <input value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
      </label>
      <Button type="submit" className="mt-6 h-12" disabled={m.isPending}>
        {m.isPending ? "Posting…" : "Post to the board"}
      </Button>
      {m.error ? <p className="mt-3 text-sm text-seal">{m.error.message}</p> : null}
    </form>
  );
}

function SeriesBlock({ rows, onChange }: { rows: ClassMeeting[]; onChange: () => void }) {
  const head = rows[0];
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">
        {head.course_code} · {head.title}
      </h2>
      <ul className="mt-4 divide-y divide-rule border-y border-rule">
        {rows.map((row) => (
          <HourRow key={row.id} row={row} onChange={onChange} />
        ))}
      </ul>
    </section>
  );
}

function HourRow({ row, onChange }: { row: ClassMeeting; onChange: () => void }) {
  const [open, setOpen] = useState(false);
  const [when, setWhen] = useState(toDatetimeLocal(row.starts_at));
  const [meet, setMeet] = useState(row.meet_url ?? "");
  const save = useMutation({
    mutationFn: (payload: { id: string; starts_at?: string; meet_url?: string; status?: string }) =>
      updateMeeting({ data: payload }),
    onSuccess: onChange,
  });

  return (
    <li className="py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-ink">
            {formatMeetingWhen(row.starts_at)}
            {row.status !== "posted" ? <span className="ml-2 text-sm text-muted">{row.status}</span> : null}
          </p>
          <p className="text-sm text-muted">{row.duration_min} minutes</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {row.meet_url && row.status !== "cancelled" ? (
            <Button asChild size="sm">
              <a href={row.meet_url} target="_blank" rel="noreferrer">
                Join
              </a>
            </Button>
          ) : null}
          <Button size="sm" variant="outline" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Move / update"}
          </Button>
          <Button size="sm" variant="ghost" onClick={() => downloadIcs(row)}>
            Calendar file
          </Button>
          <Button asChild size="sm" variant="ghost">
            <a href={rosterMailto(row, row.status === "cancelled" ? "cancelled" : "posted")}>Notice</a>
          </Button>
        </div>
      </div>
      {open ? (
        <div className="mt-4 grid gap-3 border border-rule bg-paper p-4 sm:grid-cols-2">
          <label className="block text-sm">
            New time
            <input type="datetime-local" value={when} onChange={(e) => setWhen(e.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
          </label>
          <label className="block text-sm">
            Meet URL
            <input value={meet} onChange={(e) => setMeet(e.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
          </label>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button
              type="button"
              disabled={save.isPending}
              onClick={() => save.mutate({ id: row.id, starts_at: new Date(when).toISOString(), meet_url: meet })}
            >
              Save time
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={save.isPending || row.status === "cancelled"}
              onClick={() => save.mutate({ id: row.id, status: "cancelled" })}
            >
              Cancel this week
            </Button>
          </div>
        </div>
      ) : null}
    </li>
  );
}
