import { people } from "./people";

export type NextStep = {
  heading: string;
  body: string;
  links: { label: string; href: string }[];
};

export type PageMeta = {
  h1: string;
  breadcrumb: string;
  nav?: string;
  footer?: string;
  documentTitle: string;
  metaTitle: string;
  description: string;
  nextStep?: NextStep | null;
};

export const pages: Record<string, PageMeta> = {
  "/": {
    "h1": "Formed in Scripture. Prepared for the world.",
    "breadcrumb": "Home",
    "nav": "Home",
    "footer": "About",
    "documentTitle": "The New School of Biblical Theology",
    "metaTitle": "The New School of Biblical Theology",
    "description": "Two graduate degrees taught entirely online. The New School of Biblical Theology prepares men and women for effective Christian ministry and leadership in a global context.",
    "nextStep": {
      "heading": "Begin an application",
      "body": "NSBT admits students on a rolling basis.",
      "links": [
        {
          "label": "How to apply",
          "href": "/admissions/apply"
        },
        {
          "label": "Accreditation status",
          "href": "/about/accreditation"
        }
      ]
    }
  },
  "/about": {
    "h1": "About the School",
    "breadcrumb": "About",
    "nav": "About",
    "footer": "About",
    "documentTitle": "About · NSBT",
    "metaTitle": "About · NSBT",
    "description": "The New School of Biblical Theology is a graduate school for people already at work in ministry and public life, taught entirely online. Administrative address in Orlando, Florida.",
    "nextStep": {
      "heading": "Read the mission",
      "body": "The mission and vision are published in full.",
      "links": [
        {
          "label": "Mission & Vision",
          "href": "/about/mission"
        },
        {
          "label": "Accreditation status",
          "href": "/about/accreditation"
        }
      ]
    }
  },
  "/about/mission": {
    "h1": "Mission & Vision",
    "breadcrumb": "Mission & Vision",
    "nav": "Mission & Vision",
    "footer": "Mission & Vision",
    "documentTitle": "Mission & Vision · NSBT",
    "metaTitle": "Mission & Vision · NSBT",
    "description": "The Mission of NSBT is to prepare men and women for effective Christian ministry and leadership in a global context. The vision is published in full.",
    "nextStep": {
      "heading": "Meet the Founding President",
      "body": "NSBT was founded by the Reverend Dr. A. R. Bernard, Sr.",
      "links": [
        {
          "label": "Founding President",
          "href": "/about/founder"
        }
      ]
    }
  },
  "/about/founder": {
    "h1": "The Reverend Dr. A. R. Bernard, Sr.",
    "breadcrumb": "Founding President",
    "nav": "Founding President",
    "footer": "Founding President",
    "documentTitle": "Founding President · NSBT",
    "metaTitle": "Founding President · NSBT",
    "description": "The Reverend Dr. A. R. Bernard, Sr. is Founding President of the New School of Biblical Theology, Chairperson of its Board of Trustees, and Professor of Public Theology.",
    "nextStep": {
      "heading": "A message from the Founding President",
      "body": "A signed letter is published on its own page.",
      "links": [
        {
          "label": "Read the letter",
          "href": "/about/founder/message"
        }
      ]
    }
  },
  "/about/founder/message": {
    "h1": "A Message from the Founding President",
    "breadcrumb": "Message",
    "nav": "Executive Vice President",
    "footer": "Executive Vice President",
    "documentTitle": "A Message from the Founding President · NSBT",
    "metaTitle": "A Message from the Founding President · NSBT",
    "description": "A letter from the Reverend Dr. A. R. Bernard, Sr., Founding President and Chairperson of the Board of Trustees of NSBT.",
    "nextStep": {
      "heading": "About the Founding President",
      "body": "The biography is published on its own page.",
      "links": [
        {
          "label": "Founding President",
          "href": "/about/founder"
        }
      ]
    }
  },
  "/about/lim": {
    "h1": "The Reverend Dr. Jimmy Lim",
    "breadcrumb": "Executive Vice President",
    "nav": "Executive Vice President",
    "footer": "Executive Vice President",
    "documentTitle": "Executive Vice President · NSBT",
    "metaTitle": "Executive Vice President · NSBT",
    "description": "The Reverend Dr. Jimmy Lim is Executive Vice President of the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "General enquiries go to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/about/trustees": {
    "h1": "Board of Trustees",
    "breadcrumb": "Board of Trustees",
    "nav": "Board of Trustees",
    "footer": "Board of Trustees",
    "documentTitle": "Board of Trustees · NSBT",
    "metaTitle": "Board of Trustees · NSBT",
    "description": "The Board of Trustees is the governing body of The New School of Biblical Theology. Dr. A. R. Bernard, Sr. serves as Chairperson.",
    "nextStep": {
      "heading": "Advisory Council",
      "body": "The Advisory Council is a consultative body.",
      "links": [
        {
          "label": "Advisory Council",
          "href": "/about/advisory"
        }
      ]
    }
  },
  "/about/trustees/weiss": {
    "h1": "Larry H. Weiss, Esq.",
    "breadcrumb": "Larry H. Weiss, Esq.",
    "nav": "Board of Trustees",
    "footer": "Board of Trustees",
    "documentTitle": "Larry H. Weiss, Esq. · NSBT",
    "metaTitle": "Larry H. Weiss, Esq. · NSBT",
    "description": "Larry H. Weiss, Esq., is Secretary of the Board of Trustees of the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Board of Trustees",
      "body": "The Board of Trustees is the governing body of the school.",
      "links": [
        {
          "label": "Board of Trustees",
          "href": "/about/trustees"
        }
      ]
    }
  },
  "/about/trustees/halek": {
    "h1": "James Halek",
    "breadcrumb": "James Halek",
    "nav": "Board of Trustees",
    "footer": "Board of Trustees",
    "documentTitle": "James Halek · NSBT",
    "metaTitle": "James Halek · NSBT",
    "description": "James Halek is Treasurer of the Board of Trustees of the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Board of Trustees",
      "body": "The Board of Trustees is the governing body of the school.",
      "links": [
        {
          "label": "Board of Trustees",
          "href": "/about/trustees"
        }
      ]
    }
  },
  "/about/advisory": {
    "h1": "Advisory Council",
    "breadcrumb": "Advisory Council",
    "nav": "Advisory Council",
    "footer": "Advisory Council",
    "documentTitle": "Advisory Council · NSBT",
    "metaTitle": "Advisory Council · NSBT",
    "description": "The Advisory Council offers judgment on the relevance, currency, and quality of NSBT curricula and on the preparation of graduates.",
    "nextStep": {
      "heading": "Faculty",
      "body": "The faculty who teach NSBT courses are named on the faculty page.",
      "links": [
        {
          "label": "Faculty",
          "href": "/academics/faculty"
        }
      ]
    }
  },
  "/about/accreditation": {
    "h1": "Accreditation Status",
    "breadcrumb": "Accreditation Status",
    "nav": "Accreditation Status",
    "footer": "Accreditation Status",
    "documentTitle": "Accreditation Status · NSBT",
    "metaTitle": "Accreditation Status · NSBT",
    "description": "NSBT is not accredited. This page states that fact, the Florida religious exemption, transfer of credit, and federal financial aid.",
    "nextStep": {
      "heading": "Tuition and fees",
      "body": "Read the published rates, or write to the office.",
      "links": [
        {
          "label": "Tuition & Fees",
          "href": "/tuition"
        },
        {
          "label": "Write to the Office of Student Records and Accounts",
          "href": "/contact"
        }
      ]
    }
  },
  "/state-authorization": {
    "h1": "State Authorization",
    "breadcrumb": "State Authorization",
    "footer": "State Authorization",
    "documentTitle": "State Authorization · NSBT",
    "metaTitle": "State Authorization · NSBT",
    "description": "The New School of Biblical Theology, Inc. is a religious institution and is exempt from licensure by the Florida Commission for Independent Education.",
    "nextStep": null
  },
  "/about/staff": {
    "h1": "Staff Directory",
    "breadcrumb": "Staff Directory",
    "nav": "Staff Directory",
    "footer": "Staff Directory",
    "documentTitle": "Staff Directory · NSBT",
    "metaTitle": "Staff Directory · NSBT",
    "description": "The administrative staff of the New School of Biblical Theology.",
    "nextStep": null
  },
  "/about/effectiveness": {
    "h1": "Institutional Effectiveness",
    "breadcrumb": "Institutional Effectiveness",
    "nav": "Academics",
    "footer": "Institutional Effectiveness",
    "documentTitle": "Institutional Effectiveness · NSBT",
    "metaTitle": "Institutional Effectiveness · NSBT",
    "description": "Information about institutional effectiveness at the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "General enquiries go to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/academics": {
    "h1": "Academics",
    "breadcrumb": "Academics",
    "nav": "Academics",
    "footer": "Academics",
    "documentTitle": "Academics · NSBT",
    "metaTitle": "Academics · NSBT",
    "description": "NSBT offers two graduate degrees: the Master of Arts in Christian Ministry and the Master of Arts in Global Christian Leadership. Both are taught entirely online.",
    "nextStep": {
      "heading": "The two degrees",
      "body": "Each degree is 36 credits.",
      "links": [
        {
          "label": "Degrees",
          "href": "/programs"
        }
      ]
    }
  },
  "/programs": {
    "h1": "Same school. Two vocations.",
    "breadcrumb": "Degrees",
    "nav": "Degrees",
    "footer": "Degrees",
    "documentTitle": "Degrees · NSBT",
    "metaTitle": "Degrees · NSBT",
    "description": "NSBT offers two 36-credit graduate degrees, taught entirely online: Christian Ministry, and Global Christian Leadership.",
    "nextStep": {
      "heading": "How to apply",
      "body": "NSBT admits students on a rolling basis.",
      "links": [
        {
          "label": "How to apply",
          "href": "/admissions/apply"
        }
      ]
    }
  },
  "/programs/macm": {
    "h1": "Master of Arts in Christian Ministry",
    "breadcrumb": "Master of Arts in Christian Ministry",
    "nav": "Master of Arts in Christian Ministry",
    "footer": "Courses",
    "documentTitle": "Master of Arts in Christian Ministry · NSBT",
    "metaTitle": "Master of Arts in Christian Ministry · NSBT",
    "description": "A 36-credit graduate degree for those called to pastoral and congregational ministry, taught entirely online. This degree does not lead to professional licensure.",
    "nextStep": {
      "heading": "How to apply",
      "body": "NSBT admits students on a rolling basis.",
      "links": [
        {
          "label": "How to apply",
          "href": "/admissions/apply"
        },
        {
          "label": "Tuition & Fees",
          "href": "/tuition"
        }
      ]
    }
  },
  "/programs/magl": {
    "h1": "Master of Arts in Global Christian Leadership",
    "breadcrumb": "Master of Arts in Global Christian Leadership",
    "nav": "Master of Arts in Global Christian Leadership",
    "footer": "Courses",
    "documentTitle": "Master of Arts in Global Christian Leadership · NSBT",
    "metaTitle": "Master of Arts in Global Christian Leadership · NSBT",
    "description": "A 36-credit graduate degree for Christian leadership in business, government, and civil society, taught entirely online. This degree does not lead to professional licensure.",
    "nextStep": {
      "heading": "How to apply",
      "body": "NSBT admits students on a rolling basis.",
      "links": [
        {
          "label": "How to apply",
          "href": "/admissions/apply"
        },
        {
          "label": "Tuition & Fees",
          "href": "/tuition"
        }
      ]
    }
  },
  "/tuition": {
    "h1": "Tuition and Fees",
    "breadcrumb": "Tuition and Fees",
    "nav": "Tuition & Fees",
    "footer": "Tuition & Fees",
    "documentTitle": "Tuition and Fees · NSBT",
    "metaTitle": "Tuition and Fees · NSBT",
    "description": "The current tuition and fee schedule for The New School of Biblical Theology.",
    "nextStep": null
  },
  "/complaints": {
    "h1": "Student Complaints",
    "breadcrumb": "Student Complaints",
    "footer": "Student Complaints",
    "documentTitle": "Student Complaints · NSBT",
    "metaTitle": "Student Complaints · NSBT",
    "description": "The New School of Biblical Theology's student complaint procedure and the contact information for the Florida Commission for Independent Education.",
    "nextStep": null
  },
  "/academics/courses": {
    "h1": "Courses",
    "breadcrumb": "Courses",
    "nav": "Courses",
    "footer": "Courses",
    "documentTitle": "Courses · NSBT",
    "metaTitle": "Courses · NSBT",
    "description": "Course titles and descriptions for the two NSBT graduate degrees.",
    "nextStep": {
      "heading": "The two degrees",
      "body": "Each course sits inside one of the two Master of Arts degrees.",
      "links": [
        {
          "label": "Degrees",
          "href": "/programs"
        }
      ]
    }
  },
  "/academics/faculty": {
    "h1": "Faculty",
    "breadcrumb": "Faculty",
    "nav": "Faculty",
    "footer": "Faculty",
    "documentTitle": "Faculty · NSBT",
    "metaTitle": "Faculty · NSBT",
    "description": "The faculty who teach NSBT graduate courses, with the degrees they hold and the areas they teach.",
    "nextStep": {
      "heading": "The two degrees",
      "body": "Each faculty member teaches in the Master of Arts programs.",
      "links": [
        {
          "label": "Degrees",
          "href": "/programs"
        }
      ]
    }
  },
  "/academics/library": {
    "h1": "Library",
    "breadcrumb": "Library",
    "nav": "Digital Theological Library",
    "footer": "Library",
    "documentTitle": "Library · NSBT",
    "metaTitle": "Library · NSBT",
    "description": "NSBT’s library is the Digital Theological Library. Students reach it through their NSBT Populi account at no additional cost.",
    "nextStep": {
      "heading": "Current students",
      "body": "Library access is through Populi.",
      "links": [
        {
          "label": "Current Students",
          "href": "/students"
        }
      ]
    }
  },
  "/academics/excellence": {
    "h1": "Academic Excellence",
    "breadcrumb": "Academic Excellence",
    "nav": "Academic Excellence",
    "footer": "Academic Excellence",
    "documentTitle": "Academic Excellence · NSBT",
    "metaTitle": "Academic Excellence · NSBT",
    "description": "NSBT is committed to your success as a graduate student, teaching you not only the curriculum but how to become a lifelong learner.",
    "nextStep": null
  },
  "/academics/sample-course": {
    "h1": "View a Sample Course",
    "breadcrumb": "Sample Course",
    "nav": "Sample Course",
    "footer": "Sample Course",
    "documentTitle": "Sample Course · NSBT",
    "metaTitle": "Sample Course · NSBT",
    "description": "Take a nongraded visual tour of an NSBT online course in Populi and see what it is like to be a student at NSBT.",
    "nextStep": null
  },
  "/academics/online-learning": {
    "h1": "Online Learning",
    "breadcrumb": "Online Learning",
    "nav": "Online Learning",
    "footer": "Online Learning",
    "documentTitle": "Online Learning · NSBT",
    "metaTitle": "Online Learning · NSBT",
    "description": "The Online Learning Tutorial helps newly registered NSBT students learn and engage NSBT's online learning environment in Populi.",
    "nextStep": null
  },
  "/academics/catalog": {
    "h1": "Academic Catalog",
    "breadcrumb": "Academic Catalog",
    "nav": "Admissions",
    "footer": "Academic Catalog",
    "documentTitle": "Academic Catalog · NSBT",
    "metaTitle": "Academic Catalog · NSBT",
    "description": "The NSBT Academic Catalog.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "To request a copy now, write to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/academics/policies": {
    "h1": "Academic Policies",
    "breadcrumb": "Academic Policies",
    "nav": "Admissions",
    "footer": "Academic Policies",
    "documentTitle": "Academic Policies · NSBT",
    "metaTitle": "Academic Policies · NSBT",
    "description": "Academic policies of the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "For academic policies now, write to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/admissions": {
    "h1": "Admissions",
    "breadcrumb": "Admissions",
    "nav": "Admissions",
    "footer": "Admissions",
    "documentTitle": "Admissions · NSBT",
    "metaTitle": "Admissions · NSBT",
    "description": "NSBT admits students on a rolling basis. An applicant possesses a bachelor’s degree or its recognized international equivalent.",
    "nextStep": {
      "heading": "How to apply",
      "body": "Every required item is listed on the application page.",
      "links": [
        {
          "label": "How to apply",
          "href": "/admissions/apply"
        },
        {
          "label": "Tuition & Fees",
          "href": "/tuition"
        }
      ]
    }
  },
  "/admissions/apply": {
    "h1": "How to Apply",
    "breadcrumb": "How to Apply",
    "nav": "Apply",
    "footer": "Apply",
    "documentTitle": "How to Apply · NSBT",
    "metaTitle": "How to Apply · NSBT",
    "description": "The items required to apply to NSBT, including the application, the $50 application fee, transcripts, a personal statement, references, and identification.",
    "nextStep": {
      "heading": "Tuition and fees",
      "body": "The published rates are on the tuition page.",
      "links": [
        {
          "label": "Tuition & Fees",
          "href": "/tuition"
        },
        {
          "label": "Accreditation status",
          "href": "/about/accreditation"
        }
      ]
    }
  },
  "/admissions/transfer": {
    "h1": "Transfer Credit",
    "breadcrumb": "Transfer Credit",
    "nav": "Transfer Credit",
    "footer": "Transfer Credit",
    "documentTitle": "Transfer Credit · NSBT",
    "metaTitle": "Transfer Credit · NSBT",
    "description": "Credit earned at another institution is evaluated case by case on course content, learning outcomes, and credit hours.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "Write before applying if prior study may be presented for credit.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/admissions/cancellation": {
    "h1": "Cancellation",
    "breadcrumb": "Cancellation",
    "nav": "Students",
    "footer": "Current Students",
    "documentTitle": "Cancellation · NSBT",
    "metaTitle": "Cancellation · NSBT",
    "description": "A student has five calendar days after signing an enrollment agreement to cancel enrollment and receive a full refund of all monies paid to NSBT.",
    "nextStep": {
      "heading": "Tuition & Fees",
      "body": "The cancellation right is published with the rates.",
      "links": [
        {
          "label": "Tuition & Fees",
          "href": "/tuition"
        }
      ]
    }
  },
  "/admissions/refunds": {
    "h1": "Refunds",
    "breadcrumb": "Refunds",
    "nav": "Students",
    "footer": "Current Students",
    "documentTitle": "Refunds · NSBT",
    "metaTitle": "Refunds · NSBT",
    "description": "NSBT refunds tuition on a published weekly schedule. Any money due is refunded within 30 days.",
    "nextStep": {
      "heading": "Tuition & Fees",
      "body": "The refund schedule is published with the rates.",
      "links": [
        {
          "label": "Tuition & Fees",
          "href": "/tuition"
        }
      ]
    }
  },
  "/admissions/request": {
    "h1": "Request Information",
    "breadcrumb": "Request Information",
    "nav": "Students",
    "footer": "Current Students",
    "documentTitle": "Request Information · NSBT",
    "metaTitle": "Request Information · NSBT",
    "description": "Write to the Office of Student Records and Accounts with questions about study at NSBT.",
    "nextStep": {
      "heading": "How to apply",
      "body": "NSBT admits students on a rolling basis.",
      "links": [
        {
          "label": "How to apply",
          "href": "/admissions/apply"
        }
      ]
    }
  },
  "/admissions/ordination": {
    "h1": "Ordination",
    "breadcrumb": "Ordination",
    "nav": "Students",
    "footer": "Current Students",
    "documentTitle": "Ordination · NSBT",
    "metaTitle": "Ordination · NSBT",
    "description": "NSBT degrees do not confer ordination. Ordination is a matter for a student’s church or denomination.",
    "nextStep": {
      "heading": "The two degrees",
      "body": "Neither degree leads to professional licensure.",
      "links": [
        {
          "label": "Degrees",
          "href": "/programs"
        }
      ]
    }
  },
  "/students": {
    "h1": "Current Students",
    "breadcrumb": "Current Students",
    "nav": "Students",
    "footer": "Current Students",
    "documentTitle": "Current Students · NSBT",
    "metaTitle": "Current Students · NSBT",
    "description": "How NSBT students reach courses, faculty, the library, and the Office of Student Records and Accounts.",
    "nextStep": {
      "heading": "Log in",
      "body": "Courses are held in Populi. Sign in from the school’s login page.",
      "links": [
        {
          "label": "Log in",
          "href": "/login"
        }
      ]
    }
  },
  "/students/tech": {
    "h1": "Technology",
    "breadcrumb": "Technology",
    "nav": "",
    "footer": "Student Handbook",
    "documentTitle": "Technology · NSBT",
    "metaTitle": "Technology · NSBT",
    "description": "The computer and connection a student uses to take part in NSBT’s online courses.",
    "nextStep": {
      "heading": "Current students",
      "body": "Courses are held in Populi.",
      "links": [
        {
          "label": "Current Students",
          "href": "/students"
        }
      ]
    }
  },
  "/students/handbook": {
    "h1": "Student Handbook",
    "breadcrumb": "Student Handbook",
    "nav": "",
    "footer": "Student Handbook",
    "documentTitle": "Student Handbook · NSBT",
    "metaTitle": "Student Handbook · NSBT",
    "description": "The NSBT Student Handbook.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "To request a copy now, write to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/students/records": {
    "h1": "Office of Student Records and Accounts",
    "breadcrumb": "Office of Student Records and Accounts",
    "nav": "Alumni",
    "footer": "Office of Student Records and Accounts",
    "documentTitle": "Office of Student Records and Accounts · NSBT",
    "metaTitle": "Office of Student Records and Accounts · NSBT",
    "description": "The Office of Student Records and Accounts handles admissions, records, accounts, and general enquiries.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "The office mailbox is published on the contact page.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/students/accessibility": {
    "h1": "Student Accessibility",
    "breadcrumb": "Student Accessibility",
    "nav": "Alumni",
    "footer": "Student Accessibility",
    "documentTitle": "Student Accessibility · NSBT",
    "metaTitle": "Student Accessibility · NSBT",
    "description": "How a student with a diagnosed disability requests an accommodation at NSBT. Requests go to the Office of Student Records and Accounts.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "Accommodation requests go to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/students/chapel": {
    "h1": "Chapel",
    "breadcrumb": "Chapel",
    "nav": "Alumni",
    "footer": "Career Services",
    "documentTitle": "Chapel · NSBT",
    "metaTitle": "Chapel · NSBT",
    "description": "Chapel at the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Current students",
      "body": "Courses and community tools are listed for current students.",
      "links": [
        {
          "label": "Current Students",
          "href": "/students"
        }
      ]
    }
  },
  "/students/prayers": {
    "h1": "Online Prayers",
    "breadcrumb": "Online Prayers",
    "nav": "Current Students",
    "footer": "Online Prayers",
    "documentTitle": "Online Prayers · NSBT",
    "metaTitle": "Online Prayers · NSBT",
    "description": "As a community of faith, NSBT students, faculty, and staff pray together each week for the school and one another.",
    "nextStep": null
  },
  "/admissions/registration": {
    "h1": "Registration Information",
    "breadcrumb": "Registration Information",
    "nav": "Admissions",
    "footer": "Registration Information",
    "documentTitle": "Registration Information · NSBT",
    "metaTitle": "Registration Information · NSBT",
    "description": "Institutional language of instruction and the foreign-language transcript and credential-evaluation policy for admission to NSBT.",
    "nextStep": null
  },
  "/conversation": {
    "h1": "A Conversation Series",
    "breadcrumb": "A Conversation Series",
    "nav": "A Conversation Series",
    "footer": "A Conversation Series",
    "documentTitle": "A Conversation Series · NSBT",
    "metaTitle": "A Conversation Series · NSBT",
    "description": "NSBT's Conversation Series brings scholars and leaders together for engaging conversations on faith, Scripture, and public life.",
    "nextStep": null
  },
  "/students/career": {
    "h1": "Career Services",
    "breadcrumb": "Career Services",
    "nav": "Alumni",
    "footer": "Career Services",
    "documentTitle": "Career Services · NSBT",
    "metaTitle": "Career Services · NSBT",
    "description": "Career services information for students and graduates of the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "For assistance now, write to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/students/integrity": {
    "h1": "Writing with integrity",
    "breadcrumb": "Writing with integrity",
    "nav": "Alumni",
    "footer": "Alumni",
    "documentTitle": "Writing with integrity · NSBT",
    "metaTitle": "Writing with integrity · NSBT",
    "description": "Writing with integrity at the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Current students",
      "body": "Courses and community tools are listed for current students.",
      "links": [
        {
          "label": "Current Students",
          "href": "/students"
        }
      ]
    }
  },
  "/alumni": {
    "h1": "Alumni",
    "breadcrumb": "Alumni",
    "nav": "Alumni",
    "footer": "Alumni",
    "documentTitle": "Alumni · NSBT",
    "metaTitle": "Alumni · NSBT",
    "description": "Graduate alumni of the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Give",
      "body": "Gifts support NSBT’s educational and religious mission.",
      "links": [
        {
          "label": "Give",
          "href": "/give"
        }
      ]
    }
  },
  "/events": {
    "h1": "Calendar",
    "breadcrumb": "Calendar",
    "nav": "",
    "footer": "Calendar",
    "documentTitle": "Calendar · NSBT",
    "metaTitle": "Calendar · NSBT",
    "description": "NSBT’s academic year runs on five sessions of eight weeks each. There is one graduation service each year, held in June at Christian Cultural Center in Brooklyn.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "For the dates of the current and coming sessions, write to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/contact": {
    "h1": "Contact Us",
    "breadcrumb": "Contact",
    "nav": "",
    "footer": "Contact",
    "documentTitle": "Contact · NSBT",
    "metaTitle": "Contact · NSBT",
    "description": "Office of Student Records and Accounts, 111 North Orange Avenue, Suite 800, Orlando, FL 32801. Telephone 844-377-1900.",
    "nextStep": {
      "heading": "How to apply",
      "body": "NSBT admits students on a rolling basis.",
      "links": [
        {
          "label": "How to apply",
          "href": "/admissions/apply"
        }
      ]
    }
  },
  "/store": {
    "h1": "The NSBT Bookstore",
    "breadcrumb": "Bookstore",
    "nav": "",
    "footer": "Bookstore",
    "documentTitle": "The NSBT Bookstore",
    "metaTitle": "The NSBT Bookstore",
    "description": "The NSBT Bookstore carries books, regalia, and everyday goods bearing the school’s seal. Course texts are listed in each syllabus.",
    "nextStep": {
      "heading": "Course texts",
      "body": "Faculty list required texts in the syllabus. Many readings are in the Digital Theological Library.",
      "links": [
        {
          "label": "Library",
          "href": "/academics/library"
        }
      ]
    }
  },
  "/store/shipping": {
    "h1": "Shipping Policy",
    "breadcrumb": "Shipping Policy",
    "nav": "",
    "footer": "Shipping Policy",
    "documentTitle": "Shipping Policy · NSBT Bookstore",
    "metaTitle": "Shipping Policy · NSBT Bookstore",
    "description": "Shipping policy for orders from the NSBT Bookstore.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "For questions about an order now, write to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/store/returns": {
    "h1": "Returns Policy",
    "breadcrumb": "Returns Policy",
    "nav": "",
    "footer": "Returns Policy",
    "documentTitle": "Returns Policy · NSBT Bookstore",
    "metaTitle": "Returns Policy · NSBT Bookstore",
    "description": "Returns policy for orders from the NSBT Bookstore.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "For questions about an order now, write to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/store/privacy": {
    "h1": "Privacy Policy",
    "breadcrumb": "Privacy Policy",
    "nav": "",
    "footer": "Privacy Policy",
    "documentTitle": "Privacy Policy · NSBT Bookstore",
    "metaTitle": "Privacy Policy · NSBT Bookstore",
    "description": "Privacy policy for the NSBT Bookstore.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "For questions about an order now, write to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/store/terms": {
    "h1": "Terms of Sale",
    "breadcrumb": "Terms of Sale",
    "nav": "",
    "footer": "Terms of Sale",
    "documentTitle": "Terms of Sale · NSBT Bookstore",
    "metaTitle": "Terms of Sale · NSBT Bookstore",
    "description": "Terms of sale for the NSBT Bookstore.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "For questions about an order now, write to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/give": {
    "h1": "Donate",
    "breadcrumb": "Give",
    "nav": "",
    "footer": "Give",
    "documentTitle": "Give · NSBT",
    "metaTitle": "Give · NSBT",
    "description": "Gifts support the educational and religious mission of the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Contact",
      "body": "Questions about a gift go to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/ask": {
    "h1": "Ask NSBT",
    "breadcrumb": "Ask NSBT",
    "nav": "",
    "footer": "",
    "documentTitle": "Ask NSBT",
    "metaTitle": "Ask NSBT",
    "description": "Answers come from the published pages of this site. Ask a question about NSBT.",
    "nextStep": {
      "heading": "Write to the office",
      "body": "For a question these pages do not answer, write to the Office of Student Records and Accounts.",
      "links": [
        {
          "label": "Contact",
          "href": "/contact"
        }
      ]
    }
  },
  "/find": {
    "h1": "Find",
    "breadcrumb": "Find",
    "nav": "",
    "footer": "",
    "documentTitle": "Find · NSBT",
    "metaTitle": "Find · NSBT",
    "description": "Search the public pages of the New School of Biblical Theology.",
    "nextStep": {
      "heading": "Ask NSBT",
      "body": "Answers come from the published pages of this site.",
      "links": [
        {
          "label": "Ask NSBT",
          "href": "/ask"
        }
      ]
    }
  }
};

export function pageMeta(path: string): PageMeta {
  if (pages[path]) return pages[path];
  const person = Object.values(people).find((p) => p.href === path);
  if (person) {
    return {
      h1: person.name,
      breadcrumb: person.name,
      documentTitle: `${person.name} · NSBT`,
      metaTitle: `${person.name} · NSBT`,
      description: person.lede,
    };
  }
  return {
    h1: "NSBT",
    breadcrumb: "NSBT",
    documentTitle: "NSBT",
    metaTitle: "NSBT",
    description: "The New School of Biblical Theology.",
  };
}
