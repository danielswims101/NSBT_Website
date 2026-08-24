export const POPULI_CAMPUS = "https://nsbt.populiweb.com/";
export const DTL_SEARCH =
  "https://dtl.primo.exlibrisgroup.com/nde/home?vid=01DTL_INST:DTL1";
export const DTL_OA =
  "https://dtl.primo.exlibrisgroup.com/nde/home?vid=01DTL_INST:DTL1";
export const GOOGLE_MEET = "https://meet.google.com/";
export const GOOGLE_CALENDAR = "https://calendar.google.com/";

export type CampusRole = "student" | "faculty";

export function readCampusRole(): CampusRole {
  if (typeof window === "undefined") return "student";
  return window.sessionStorage.getItem("nsbt.role") === "faculty" ? "faculty" : "student";
}

export function writeCampusRole(role: CampusRole) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("nsbt.role", role);
}

export type CampusJob = {
  id: string;
  title: string;
  blurb: string;
  href: string;
  external?: boolean;
  student: boolean;
  faculty: boolean;
};

export const campusJobs: CampusJob[] = [
  {
    id: "courses",
    title: "My courses",
    blurb: "Lessons, discussions, papers, and grades. The record lives in Populi.",
    href: POPULI_CAMPUS,
    external: true,
    student: true,
    faculty: true,
  },
  {
    id: "class",
    title: "Join class",
    blurb: "This week’s Meet. If the hour is not on the board yet, use Calendar — the same link as this session.",
    href: "/portal/class",
    student: true,
    faculty: true,
  },
  {
    id: "library",
    title: "Library",
    blurb: "Search the Digital Theological Library. Open the book there — do not paste it here.",
    href: "/portal/library",
    student: true,
    faculty: true,
  },
  {
    id: "help",
    title: "Get help",
    blurb: "Large type. One step at a time. How to use Populi, Meet, and mail.",
    href: "/portal/help",
    student: true,
    faculty: true,
  },
  {
    id: "writing",
    title: "Writing lab",
    blurb: "Chicago notes. Questions about your draft. It will not write the paper.",
    href: "/portal/writing",
    student: true,
    faculty: true,
  },
  {
    id: "schedule",
    title: "Class board",
    blurb: "Post, move, or cancel the weekly hour. Students see it on Join class.",
    href: "/portal/schedule",
    student: false,
    faculty: true,
  },
  {
    id: "person",
    title: "Talk to a person",
    blurb: "The Dean, Student Records, or the phone. A human answers.",
    href: "/portal/person",
    student: true,
    faculty: true,
  },
];
