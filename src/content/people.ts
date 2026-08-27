export type Education = {
  degree: string;
  field?: string;
  school: string;
  year?: string;
  honorary?: boolean;
};

export type Person = {
  slug: string;
  name: string;
  role: string;
  photo?: string;
  href: string;
  email?: string;
  lede: string;
  education: Education[];
  teaching?: string[];
  sections: { heading: string; paragraphs: string[] }[];
};

export const people = {
  "bernard": {
    "slug": "bernard",
    "name": "The Reverend Dr. A. R. Bernard, Sr.",
    "role": "Founding President and Chairperson of the Board of Trustees",
    "photo": "/images/people/bernard-headshot.jpg",
    "href": "/about/founder",
    "lede": "The Reverend Dr. A. R. Bernard, Sr. is Founding President of the New School of Biblical Theology, Chairperson of its Board of Trustees, and Professor of Public Theology. He founded the school in 2019 and gives executive oversight of its mission, strategic direction, and governance.",
    "education": [
      {
        "degree": "Master of Divinity",
        "school": "Alliance Theological Seminary, Nyack, New York"
      },
      {
        "degree": "Master of Urban Studies",
        "school": "Alliance Theological Seminary, Nyack, New York"
      },
      {
        "degree": "Doctor of Divinity",
        "school": "Wagner College, Staten Island, New York",
        "honorary": true
      },
      {
        "degree": "Doctor of Divinity",
        "school": "Nyack College / Alliance Theological Seminary, Nyack, New York",
        "honorary": true
      }
    ],
    "sections": [
      {
        "heading": "Ministry and public life",
        "paragraphs": [
          "He is Founding Pastor of the Christian Cultural Center in Brooklyn, New York, a congregation he began on January 1, 1978 after a career in finance. The Center now serves a registered membership of more than 37,000 across campuses in Brooklyn, Long Island, Orlando, Atlanta, and a virtual campus.",
          "He is President of the New York Commission of Religious Leaders and has served as President of the Council of Churches of the City of New York. He was appointed Co-Chief Chaplain of the New York City Police Department and sworn in on March 4, 2026. He has sat on the boards of the Brooklyn Public Library and the New York City Economic Development Corporation."
        ]
      },
      {
        "heading": "Published work",
        "paragraphs": [
          "His books include Happiness Is… Simple Steps to a Life of Joy (Touchstone Faith / Simon and Schuster, 2006) and Four Things Women Want from a Man. A further volume, Reframing Faith in a World of Power, is forthcoming."
        ]
      },
      {
        "heading": "Honors and recognition",
        "paragraphs": [
          "He has repeatedly been named among New York's most influential leaders, including the New York Times' “The Power Pastor” and multiple appearances on Ebony's Power 100 and the New York Daily News and New York Post influence lists. He served on the mayoral transition teams of Michael Bloomberg and Bill de Blasio, and was featured on Oprah Winfrey's Super Soul Sunday.",
          "His community work includes founding the Brooklyn Preparatory School and the Cultural Arts Academy Charter School, a food pantry and prison ministry serving Brooklyn, and orientation training for the New York City Police Department. Each week his teaching reaches hundreds of thousands of people worldwide through radio, television, and social media."
        ]
      }
    ]
  },
  "chaparro": {
    "slug": "chaparro",
    "name": "Dr. Onorio Chaparro",
    "role": "Academic Dean and Director of Admissions",
    "photo": "/images/people/chaparro.jpg",
    "href": "/academics/faculty/chaparro",
    "lede": "Dr. Onorio Chaparro is Academic Dean and Director of Admissions of the New School of Biblical Theology. He oversees curriculum, faculty collaboration, admissions, and student formation in the school’s fully online graduate programs.",
    "education": [
      {
        "degree": "Doctor of Ministry",
        "field": "Christian Leadership in the Global Context",
        "school": "Alliance University (formerly Nyack College), Nyack, New York",
        "year": "2015"
      },
      {
        "degree": "Master of Divinity",
        "school": "Princeton Theological Seminary, Princeton",
        "year": "2005"
      },
      {
        "degree": "Bachelor of Arts",
        "field": "Sociology, cum laude",
        "school": "Hunter College, City University of New York",
        "year": "1998"
      }
    ],
    "teaching": [
      "Leadership in Global Context",
      "The Capstone series in the Master of Arts in Christian Ministry",
      "Leadership and Spiritual Formation"
    ],
    "sections": [
      {
        "heading": "Appointment",
        "paragraphs": [
          "Dr. Chaparro has served as Academic Dean and Director of Admissions since 2020. He provides academic leadership for the theological degree programs, including the curriculum, individual courses, and faculty collaboration. He directs admissions strategy, applicant discernment, enrollment, and student onboarding in alignment with the school’s mission. He mentors students throughout their academic and spiritual formation."
        ]
      },
      {
        "heading": "Ministry",
        "paragraphs": [
          "He is an ordained minister of Christian Cultural Center (October 14, 2005) and was installed as an Elder on September 19, 2025. He serves on the Orlando Campus Team, with preaching, teaching, pastoral care, and sacramental ministry. He has directed men’s formation through the International Christian Brotherhood and adult Christian education through the Spiritual Life Institute. He previously served as Campus Pastor and Director of Nassau Christian Center in Princeton (2003–2005)."
        ]
      },
      {
        "heading": "Scholarship",
        "paragraphs": [
          "His Doctor of Ministry dissertation, Flip the Script: Identifying Sex Scripts Among Young Adult Males at Christian Cultural Center, examines performance-based identity, masculinity, and spiritual formation among young adult Christian men. At Princeton Theological Seminary he received the Arthur Paul Rech Memorial Prize in Theology and Pastoral Ministry (2005)."
        ]
      }
    ]
  },
  "irvin": {
    "slug": "irvin",
    "name": "Dr. Dale T. Irvin",
    "role": "Director of Strategic Planning and Professor of World Christianity",
    "photo": "/images/people/irvin-official.jpg",
    "href": "/academics/faculty/irvin",
    "lede": "Dr. Dale T. Irvin is Director of Strategic Planning and Professor of World Christianity at the New School of Biblical Theology. A scholar of world Christianity, ecumenical studies, and contextual theology, he served thirteen years as President of New York Theological Seminary.",
    "education": [
      {
        "degree": "Doctor of Philosophy",
        "field": "Ecumenical Studies",
        "school": "Union Theological Seminary, New York",
        "year": "1989"
      },
      {
        "degree": "Master of Divinity",
        "school": "Princeton Theological Seminary, Princeton",
        "year": "1981"
      },
      {
        "degree": "Bachelor of Arts",
        "school": "Thomas Edison State College, Trenton",
        "year": "1977"
      }
    ],
    "teaching": [
      "Introduction to Theology in Global Context",
      "World Christianity"
    ],
    "sections": [
      {
        "heading": "Appointment",
        "paragraphs": [
          "Dr. Irvin has served as Director of Strategic Planning and Professor of World Christianity at NSBT since 2019. He is ordained in the American Baptist Churches USA and is a member of The Riverside Church, New York."
        ]
      },
      {
        "heading": "Academic leadership",
        "paragraphs": [
          "At New York Theological Seminary he was President (2006–2019), Vice President for Academic Affairs and Academic Dean (2002–2006), Professor of World Christianity (1997–2020), and Professor of Contextual Theology (1989–1997). He has held visiting and adjunct appointments at Union Theological Seminary, the University of Uppsala, Georgetown University, New Brunswick Theological Seminary, Wake Forest University Divinity School, Regent University, Drew University, and the College of New Rochelle."
        ]
      },
      {
        "heading": "Selected books",
        "paragraphs": [
          "He is the author or editor of seven books. History of the World Christian Movement, Volume I: Earliest Christianity to 1453, written with Scott W. Sunquist (Orbis / T & T Clark, 2001), was named an Outstanding Academic Title by Choice, selected by the Catholic Book Association as the outstanding book in theology and history for 2001, and listed by the International Bulletin of Missionary Research among the fifteen outstanding books in mission studies for 2001. Volume II, Modern Christianity 1454 to 1800, appeared from Orbis in 2012. Volume III is forthcoming.",
          "Other books include The Protestant Reformation and World Christianity: Global Perspectives (Eerdmans, 2017); Christian Mission, Contextual Theology, Prophetic Dialogue, co-edited with Peter C. Phan (Orbis, 2018); Christian Histories, Christian Traditioning (Orbis, 1998); The Agitated Mind of God: The Theology of Kosuke Koyama, co-edited with Akintunde E. Akinade (Orbis, 1996); and Hearing Many Voices: Dialogue and Diversity in the Ecumenical Movement (University Press of America, 1994)."
        ]
      },
      {
        "heading": "Editorships and service",
        "paragraphs": [
          "He is founding co-editor of The Journal of World Christianity, published by Penn State University Press since 2016, and co-editor with Peter C. Phan of the World Christianity series for that press. He chairs the Ecclesiological Investigations International Research Network. He has served as a trustee of the Center of Theological Inquiry, Princeton; the Blanton-Peale Institute; and The Interchurch Center. He sat on the Faith and Order Commission of the National Council of Churches of Christ U.S.A. (1998–2003)."
        ]
      }
    ]
  },
  "white": {
    "slug": "white",
    "name": "Dr. Angela R. White",
    "role": "Dean of Institutional Effectiveness and Academic Programs and Director of Field Education",
    "photo": "/images/people/white-official.jpg",
    "href": "/academics/faculty/white",
    "email": "Awhite20@nsbt.org",
    "lede": "Dr. Angela R. White is Dean of Institutional Effectiveness and Academic Programs and Director of Field Education at the New School of Biblical Theology, where she also teaches as an adjunct professor. She carries institutional effectiveness, academic program execution, curriculum, outcomes assessment, Field Education, and Capstone writing support.",
    "education": [
      {
        "degree": "Doctor of Education",
        "field": "Educational Leadership and Policy",
        "school": "Fordham University, New York",
        "year": "2009"
      },
      {
        "degree": "Master of Arts",
        "field": "Christian Ministry",
        "school": "The New School of Biblical Theology, Orlando, Florida",
        "year": "2023"
      },
      {
        "degree": "Master of Arts",
        "field": "Special Education",
        "school": "Teachers College, Columbia University, New York",
        "year": "1985"
      },
      {
        "degree": "Advanced Certification",
        "field": "Educational Administration and Supervision",
        "school": "Brooklyn College, Brooklyn, New York",
        "year": "1993"
      },
      {
        "degree": "Bachelor of Arts",
        "field": "Psychology",
        "school": "Long Island University, Brooklyn, New York",
        "year": "1981"
      }
    ],
    "teaching": [
      "The Field Education Practicum series",
      "The Capstone Completion Paper series"
    ],
    "sections": [
      {
        "heading": "Appointment",
        "paragraphs": [
          "Dr. White has served as Director of Field Education and as an adjunct professor at NSBT since 2023. She was appointed Dean of Institutional Effectiveness and Academic Programs on June 6, 2026."
        ]
      },
      {
        "heading": "Career in education",
        "paragraphs": [
          "Her career in education spans more than four decades. In the New York City Department of Education she served as a Title I reading teacher, coordinator, Director of Funded Programs, and Principal of P.S. 224Q (1981–1996). She was Principal of Brookside School in the Ossining Union Free School District (1996–2007) and Assistant Superintendent of Elementary Education and Administrative Services (2007–2015). She served as Superintendent of Schools for Special Education at the Carol and Frank Biondi Education Center at Rising Ground in Yonkers (2016–2023).",
          "She concurrently directs the Teachers of Color Program and teaches Special Education as an adjunct professor at Pace University."
        ]
      }
    ]
  },
  "lim": {
    "slug": "lim",
    "name": "The Reverend Dr. Jimmy Lim",
    "role": "Executive Vice President",
    "photo": "/images/people/lim-official.jpg",
    "href": "/about/lim",
    "email": "jlim@nsbt.org",
    "lede": "The Reverend Dr. Jimmy Lim is Executive Vice President of the New School of Biblical Theology. He reports to the Board of Trustees with full operational authority over the academic, administrative, financial, and legal functions of the institution.",
    "education": [
      {
        "degree": "Doctor of Ministry",
        "school": "New York Theological Seminary, New York",
        "year": "2010"
      },
      {
        "degree": "Master of Divinity",
        "school": "New Brunswick Theological Seminary, New Brunswick",
        "year": "2002"
      },
      {
        "degree": "Bachelor of Arts",
        "field": "Philosophy, cum laude",
        "school": "Nyack College, Nyack, New York",
        "year": "1998"
      }
    ],
    "sections": [
      {
        "heading": "Appointment",
        "paragraphs": [
          "Dr. Lim has served as Executive Vice President of the New School of Biblical Theology, Orlando, since 2019. He is responsible for institutional governance, regulatory compliance, state authorization, and accreditation preparation, and oversees faculty appointments, curriculum development, financial operations, technology infrastructure, and external partnerships."
        ]
      },
      {
        "heading": "Ministry and public service",
        "paragraphs": [
          "He is an ordained minister in the Reformed Church in America (2002). Since 2016 he has served in the executive office of Dr. A. R. Bernard, Sr., at Christian Cultural Center in Brooklyn.",
          "From 2007 to 2014 he was Executive Director of the Council of Churches of the City of New York, the oldest ecumenical council of churches with a continuous existence in the United States. He was the youngest person and the first Asian American to hold that office. He served the Council earlier as Associate Executive Director (2006–2007), Program Director and Editor in Chief (2001–2006), and Executive Assistant (1999–2001). He was General Secretary of the New York Commission of Religious Leaders from 2014 to 2016."
        ]
      },
      {
        "heading": "Teaching and governance",
        "paragraphs": [
          "He taught as adjunct faculty at New York Theological Seminary from 2005 to 2019. He has served on the boards of trustees of New York Theological Seminary and New Brunswick Theological Seminary, and as Chairperson of the Minister’s Supervision Committee of the Classis of Greater Palisades, Reformed Church in America.",
          "In 2008 he organized the ecumenical delegation and interfaith service for the visit of Pope Benedict XVI to New York, in coordination with the Archdiocese of New York. From 2001 to 2005 he coordinated the September 11th Caregiver Project. He chaired the Language Committee of the Billy Graham Greater New York Crusade (2004–2005)."
        ]
      }
    ]
  },
  "weiss": {
    "slug": "weiss",
    "name": "Larry H. Weiss, Esq.",
    "role": "Secretary, Board of Trustees",
    "photo": "/images/people/weiss.jpg",
    "href": "/about/trustees/weiss",
    "lede": "Larry H. Weiss, Esq., is Secretary of the Board of Trustees of the New School of Biblical Theology. He is an attorney in East Meadow, New York, admitted to the New York bar in 1974 and to the bar of the Supreme Court of the United States in 1979.",
    "education": [
      {
        "degree": "Juris Doctor",
        "school": "Brooklyn Law School",
        "year": "1973"
      },
      {
        "degree": "Bachelor of Arts",
        "school": "Queens College",
        "year": "1969"
      }
    ],
    "sections": [
      {
        "heading": "Practice",
        "paragraphs": [
          "He is principal of the Law Office of Larry H. Weiss, a general practice with emphasis in real estate, estates, trusts, guardianships, negligence litigation, and commercial agreements. He has appeared in the state and federal courts of New York. He has served as legal counsel to a not-for-profit religious institution for more than thirty years and as general counsel to a not-for-profit special education school for more than twenty-three years.",
          "He has served as conservator, guardian, guardian ad litem, court evaluator, and attorney for petitioners in Nassau, Queens, Suffolk, and Bronx Counties, and as Court Examiner and Referee in Nassau County."
        ]
      },
      {
        "heading": "Bar and teaching",
        "paragraphs": [
          "He was admitted to the New York State Bar in March 1974, to the Southern and Eastern Districts of New York in March 1975, and to the Supreme Court of the United States in June 1979. He is a member of the Nassau County Bar Association and the New York State Bar Association. He taught as Adjunct Assistant Professor of Law in the MBA program at Adelphi University from 1986 to 1998 and has served as an arbitrator in the Nassau County District Court since 1985."
        ]
      }
    ]
  },
  "halek": {
    "slug": "halek",
    "name": "James Halek",
    "role": "Treasurer, Board of Trustees",
    "photo": "/images/people/halek.jpg",
    "href": "/about/trustees/halek",
    "lede": "James Halek is Treasurer of the Board of Trustees of the New School of Biblical Theology. He is a real estate developer for nonprofit organizations and commercial clients, with more than four decades of experience in development, acquisitions, land, general contracting, and project financing.",
    "education": [],
    "sections": [
      {
        "heading": "Work",
        "paragraphs": [
          "Over the past thirty years he has dedicated his practice to religious and nonprofit organizations, providing consulting and development services and securing financing for nonprofit projects. He has served on numerous nonprofit boards and as an advisor to national ministry leaders. He serves as a trustee of Christian Cultural Center in Brooklyn.",
          "In 1983 he founded Integrity Development, Inc., in Bloomington, Minnesota. In 1979 he founded Halek Development, Inc., in Brooklyn Park, Minnesota, developing single-family homes, subdivisions, custom homes, and a 210-unit multifamily complex for low-income families."
        ]
      }
    ]
  },
  "jamaal": {
    "slug": "jamaal",
    "name": "Pastor Jamaal Bernard, Sr.",
    "role": "Chairperson, Advisory Council",
    "photo": "/images/people/jamaal.jpg",
    "href": "/about/advisory/jamaal",
    "lede": "Pastor Jamaal Bernard, Sr., is Chairperson of the Advisory Council of the New School of Biblical Theology. He is Senior Pastor of the Christian Cultural Center, installed in September 2025, with oversight of its campuses in Brooklyn, Long Island, Atlanta, and Orlando.",
    "education": [],
    "sections": [
      {
        "heading": "Ministry",
        "paragraphs": [
          "He led the Long Island campus of Christian Cultural Center for a decade from its launch, and he has served the congregation as Vice President and as Chief of Operations. He founded its youth ministry, co-founded its young adult ministry, and has led mission trips to Mexico, Guatemala, the Philippines, Jamaica, and Haiti."
        ]
      },
      {
        "heading": "Writing and media",
        "paragraphs": [
          "He is the author of four books, most recently The Blueprint for a Beautiful Life, and he hosts the interview podcast Off Script with Jamaal Bernard."
        ]
      }
    ]
  },
  "hernandez": {
    "slug": "hernandez",
    "name": "Dr. Francine Hernandez",
    "role": "Member, Advisory Council",
    "photo": "/images/people/hernandez.jpg",
    "href": "/about/advisory/hernandez",
    "lede": "Dr. Francine Hernandez is a member of the Advisory Council of the New School of Biblical Theology. She is a Board Certified Chaplain and pastoral counselor and a Certified Clinical Pastoral Educator with the College of Pastoral Supervision and Psychotherapy.",
    "education": [
      {
        "degree": "Doctor of Ministry",
        "field": "Pastoral Care and Counseling",
        "school": "New York Theological Seminary"
      },
      {
        "degree": "Master of Divinity",
        "field": "Psychology of Religion and Pastoral Care",
        "school": "Morehouse School of Religion"
      }
    ],
    "sections": [
      {
        "heading": "Practice",
        "paragraphs": [
          "She has supervised Clinical Pastoral Education units at Episcopal Health Services since 2007, and before that at New York Presbyterian Hospital, where she served as Interim Director of Clinical Pastoral Education. She serves as Associate Pastor and pastoral counselor at Macedonia Missionary Baptist Church in Melbourne, Florida."
        ]
      },
      {
        "heading": "Writing",
        "paragraphs": [
          "She has written several works on pastoral care, among them Cave Walker: A Psychodynamic Approach to Pastoral Care."
        ]
      }
    ]
  },
  "spears": {
    "slug": "spears",
    "name": "Dr. Nickolas Spears Jr.",
    "role": "Member, Advisory Council",
    "photo": "/images/people/spears.jpg",
    "href": "/about/advisory/spears",
    "lede": "Dr. Nickolas Spears Jr. is a member of the Advisory Council of the New School of Biblical Theology. As a graduate of the Master of Arts in Christian Ministry, completed in 2024, he brings to the Council the perspective of someone who has completed the program under review.",
    "education": [
      {
        "degree": "Doctor of Philosophy",
        "field": "Education, Counseling, and Supervision",
        "school": "Virginia Commonwealth University"
      },
      {
        "degree": "Master of Arts",
        "field": "Mental Health Counseling",
        "school": "New York University"
      },
      {
        "degree": "Master of Arts",
        "field": "Christian Ministry",
        "school": "The New School of Biblical Theology",
        "year": "2024"
      }
    ],
    "sections": [
      {
        "heading": "Practice and teaching",
        "paragraphs": [
          "He is a Licensed Professional Counselor and the owner of GAP Counseling in Richmond, Virginia, where he serves as Site Clinical Director for master’s-level interns and supervises licensed and pre-licensed therapists. He taught as an Assistant Professor at Hampton University, and he previously carried accreditation and licensure work in the Dean’s Office of the School of Education at Virginia Commonwealth University."
        ]
      }
    ]
  }
} satisfies Record<string, Person>;

export const faculty: Person[] = [people.chaparro, people.irvin, people.white];

export const trustees: Person[] = [people.bernard, people.weiss, people.halek];

export const advisory: Person[] = [
  { ...people.jamaal, role: "Chairperson" },
  { ...people.hernandez, role: "Member" },
  { ...people.spears, role: "Member" },
  { ...people.chaparro, role: "Faculty Liaison", href: "/academics/faculty/chaparro" },
];
