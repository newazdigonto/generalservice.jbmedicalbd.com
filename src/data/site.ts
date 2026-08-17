export const contact = {
  phone: "+880 1965-544401",
  phoneHref: "tel:+8801965544401",
  email: "info@jbmedical.com",
  emailHref: "mailto:info@jbmedical.com",
  address: "Khan Complex, Sonarpara, Sylhet",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Health Checkup", href: "/health-checkup" },
  { label: "Departments", href: "/departments" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "About Us", href: "/about" },
];

export const sheetLinks = [
  ...navLinks,
  { label: "Book Appointment", href: "/book-appointment" },
];

export const serviceGroups = [
  {
    title: "Test & Procedures",
    items: [
      "Lab Tests — Blood Test",
      "Lab Tests — Urine Test",
      "Lab Tests — Stool Test",
      "X-Ray",
      "Ultrasound",
      "ECG",
    ],
  },
  { title: "Consultations", items: ["Video Consultation"] },
  { title: "Diagnostics", items: ["Diagnostics"] },
  { title: "Membership Plans", items: ["Membership Plans"] },
  { title: "Vaccines", items: ["Vaccines"] },
  { title: "Home Health Services", items: ["Home Health Services"] },
];

export const stats = [
  { label: "Departments", value: "27" },
  { label: "Doctors", value: "90" },
  { label: "Patients Served", value: "794K" },
];

export const serviceRows = [
  {
    slug: "consultations",
    title: "Consultations",
    body: "Our doctors take the time to listen and understand your needs. In-person chamber visits and video consultations are both available, with the same record kept for each patient.",
  },
  {
    slug: "tests-procedures",
    title: "Tests & Procedures",
    body: "Blood, urine and stool testing in our own laboratory, alongside X-ray, ultrasound and ECG in the same building. Reports are delivered the same day wherever possible.",
  },
  {
    slug: "diagnostics",
    title: "Diagnostics",
    body: "A full diagnostic workup coordinated in one visit, so samples, imaging and the consultation that reads them happen together rather than across several trips.",
  },
  {
    slug: "health-checks-packages",
    title: "Health Checks & Packages",
    body: "Checkup packages combine laboratory work, vitals, imaging and a consultation, designed around age and need so you stay ahead of your health.",
  },
  {
    slug: "membership-plans",
    title: "Membership Plans",
    body: "Ongoing care for you and your family through the year — routine checkups on schedule, priority booking and discounted rates on tests.",
  },
  {
    slug: "vaccines",
    title: "Vaccines",
    body: "Routine childhood immunisation and travel vaccines, given on an appointment basis with the schedule tracked for you.",
  },
  {
    slug: "home-health-services",
    title: "Home Health Services",
    body: "Home sample collection for lab tests and home visits by our doctors and nurses, for patients for whom travelling to the centre is difficult.",
  },
];

export const checkGroups = [
  {
    name: "Women Health Checks",
    checks: [
      { name: "Her Health Check (Below 40 Years)", price: "—" },
      { name: "Her Health Check (40 to 65 Years)", price: "—" },
      { name: "Her Health Check (Above 65 Years)", price: "—" },
    ],
  },
  {
    name: "Men Health Checks",
    checks: [
      { name: "His Health Check (Below 40 Years)", price: "—" },
      { name: "His Health Check (40 to 65 Years)", price: "—" },
      { name: "His Health Check (Above 65 Years)", price: "—" },
    ],
  },
  {
    name: "Special Health Checks",
    checks: [
      { name: "Full Body Health Check", price: "—" },
      { name: "Home Health Check", price: "—" },
      {
        name: "Comprehensive Cardiac and Hypertension Health Check",
        price: "—",
      },
      { name: "Comprehensive Diabetes Health Check", price: "—" },
      { name: "Child Health Check (2 to 16 Years)", price: "—" },
    ],
  },
];

export const allPackages = [
  "Full Body Health Check",
  "Cardiac Screening",
  "Diabetes Screening",
  "Cancer Screening (Female)",
  "Cancer Screening (Male)",
  "Child Health Check (2 to 16 Years)",
  "Home Health Check",
  "Annual Health Checkup",
];

export const faqs = [
  {
    q: "What is a health check?",
    a: "A grouped set of tests, vitals and a consultation done in one visit, chosen for your age and history.",
  },
  {
    q: "How does a health check help me?",
    a: "It catches changes early — blood sugar, pressure, cholesterol and organ function — while they are still simple to manage.",
  },
  {
    q: "How will I receive my reports?",
    a: "Reports are collected from reception or sent to you once a consultant has reviewed them, usually the same day.",
  },
  {
    q: "I still haven't received my reports.",
    a: "Call +880 1965-544401 with your registration number and reception will trace the report for you.",
  },
];

export const departments = [
  { slug: "laboratory", name: "Laboratory", note: "Blood, urine and stool testing" },
  { slug: "imaging", name: "Imaging", note: "X-Ray and ultrasound" },
  { slug: "cardiac", name: "Cardiac", note: "ECG and cardiac review" },
  {
    slug: "outpatient-consultation",
    name: "Outpatient Consultation",
    note: "Daily doctor chambers",
  },
  { slug: "vaccination", name: "Vaccination", note: "Routine and travel vaccines" },
  {
    slug: "home-health",
    name: "Home Health",
    note: "Sample collection and home visits",
  },
];


export const apartPoints = [
  {
    title: "Quality",
    body: "Laboratory, imaging and consultation run under one roof at Khan Complex, with results checked by a consultant before they reach you.",
  },
  {
    title: "Affordability",
    body: "Everyday tests and consultations are priced so a routine checkup does not have to wait for an emergency.",
  },
  {
    title: "Innovation",
    body: "Video consultation, home sample collection and home health visits keep the same record following the patient across every visit.",
  },
];

export const teamSlots = ["Role", "Role", "Role", "Role", "Role"];

export const footerLinks = {
  services: [
    { label: "Tests & Procedures", href: "/services" },
    { label: "Health Checks & Packages", href: "/health-checkup" },
    { label: "Membership Plans", href: "/services" },
    { label: "Home Health Services", href: "/services" },
  ],
  resources: [
    { label: "Our Doctors", href: "/doctors" },
    { label: "About Us", href: "/about" },
    { label: "Book Appointment", href: "/book-appointment" },
    { label: "FAQ", href: "/health-checkup#faq" },
  ],
};

const WEEKDAY_SLOT_PATTERNS: Record<number, string[]> = {
  1: ["16:00-17:59", "17:00-17:59", "18:00-18:59", "18:00-19:59"],
  2: ["16:00-17:59", "16:00-16:59", "17:00-17:59", "18:00-19:59", "19:00-19:59", "20:00-20:59"],
  4: ["16:00-17:59", "17:00-17:59", "18:00-18:59", "19:00-19:59"],
  0: ["16:00-17:59", "17:00-17:59", "18:00-18:59", "18:00-19:59"],
};

const DOW_LABEL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getUpcomingSchedule() {
  const days: { date: string; dow: string; slots: string[] }[] = [];
  const today = new Date();
  const cursor = new Date(today);
  cursor.setDate(cursor.getDate() + 1);
  let guard = 0;
  while (days.length < 4 && guard < 30) {
    const dow = cursor.getDay();
    if (WEEKDAY_SLOT_PATTERNS[dow]) {
      const dd = String(cursor.getDate()).padStart(2, "0");
      const mm = String(cursor.getMonth() + 1).padStart(2, "0");
      const yyyy = cursor.getFullYear();
      days.push({
        date: `${dd}-${mm}-${yyyy}`,
        dow: DOW_LABEL[dow],
        slots: WEEKDAY_SLOT_PATTERNS[dow],
      });
    }
    cursor.setDate(cursor.getDate() + 1);
    guard += 1;
  }
  return days;
}
