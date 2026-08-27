export const POPULI_APPLY =
  "https://nsbt.populiweb.com/router/admissions/onlineapplications/index?source=99355";
export const POPULI = "https://nsbt.populiweb.com/";
export const POPULI_GIVE =
  "https://nsbt.populiweb.com/router/donate/pages/2425?embedded=1";
export const DTL =
  "https://dtl.primo.exlibrisgroup.com/nde/home?vid=01DTL_INST:DTL1";
export const STUDENT_EMAIL = "studentservices@nsbt.org";
export const GOOGLE_WORKSPACE = "https://accounts.google.com/AccountChooser?hd=nsbt.org";
export const DESK = "https://desk.nsbt.org";
export const CANONICAL_ORIGIN = "https://www.nsbt.org";

export const school = {
  short: "NSBT",
  name: "The New School of Biblical Theology",
  city: "Orlando",
  phone: "844-377-1900",
  phoneHref: "tel:+18443771900",
  localPhone: "321-999-7990",
  localPhoneHref: "tel:+13219997990",
  fax: "321-999-7980",
  address: "111 North Orange Avenue, Suite 800, Orlando, FL 32801",
  tagline: "A graduate school · Florida",
} as const;

export const tuition = {
  applicationFee: 50,
  perCredit: 500,
  perSession: 1500,
  program: 18000,
  note: "All rates and fees are subject to change.",
} as const;

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

/** Top navigation. Catalog, Handbook, Career, and Effectiveness are withheld
 *  from nav (v16 C.1) until those documents are published. Pages remain live. */
export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "Mission & Vision", href: "/about/mission" },
      { label: "Founding President", href: "/about/founder" },
      { label: "Executive Vice President", href: "/about/lim" },
      { label: "Board of Trustees", href: "/about/trustees" },
      { label: "Advisory Council", href: "/about/advisory" },
      { label: "Accreditation Status", href: "/about/accreditation" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Academics", href: "/academics" },
      { label: "Degrees", href: "/programs" },
      { label: "Master of Arts in Christian Ministry", href: "/programs/macm" },
      { label: "Master of Arts in Global Christian Leadership", href: "/programs/magl" },
      { label: "Courses", href: "/academics/courses" },
      { label: "Faculty", href: "/academics/faculty" },
      { label: "Digital Theological Library", href: "/academics/library" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Admissions", href: "/admissions" },
      { label: "How to Apply", href: "/admissions/apply" },
      { label: "Tuition & Fees", href: "/tuition" },
      { label: "Transfer Credit", href: "/admissions/transfer" },
    ],
  },
  {
    label: "Students",
    href: "/students",
    children: [
      { label: "Current Students", href: "/students" },
      { label: "Office of Student Records and Accounts", href: "/students/records" },
      { label: "Student Accessibility", href: "/students/accessibility" },
      { label: "Technology", href: "/students/tech" },
    ],
  },
  {
    label: "Alumni",
    href: "/alumni",
    children: [
      { label: "Alumni", href: "/alumni" },
      { label: "Give", href: "/give" },
    ],
  },
  { label: "Apply", href: "/admissions/apply" },
];

export const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Degrees", href: "/programs" },
  { label: "Faculty", href: "/academics/faculty" },
  { label: "Admissions", href: "/admissions" },
  { label: "Apply", href: "/admissions/apply" },
  { label: "Bookstore", href: "/store" },
  { label: "Contact", href: "/contact" },
  { label: "Find", href: "/find" },
  { label: "Accreditation Status", href: "/about/accreditation" },
];

export const degrees = [
  {
    slug: "macm",
    code: "MACM",
    name: "Master of Arts in Christian Ministry",
    href: "/programs/macm",
    photo: "/images/grad/grad-2024-64780.jpg",
    provenance: "REAL",
  },
  {
    slug: "magl",
    code: "MAGL",
    name: "Master of Arts in Global Christian Leadership",
    href: "/programs/magl",
    photo: "/images/grad/grad-2024-65186.jpg",
    provenance: "REAL",
  },
] as const;

export const LANGUAGES = [
  { id: "en", label: "English", native: "English" },
  { id: "es", label: "Spanish", native: "Español" },
  { id: "fr", label: "French", native: "Français" },
  { id: "pt", label: "Portuguese", native: "Português" },
  { id: "ko", label: "Korean", native: "한국어" },
  { id: "ht", label: "Haitian Creole", native: "Kreyòl ayisyen" },
] as const;
