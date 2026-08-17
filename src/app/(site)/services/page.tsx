import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import BackHome from "@/components/BackHome";
import { serviceRows } from "@/data/site";

export const metadata: Metadata = {
  title: "Services — JB Medical Center",
  description: "We take care of all your outpatient needs under one roof.",
};

export default function ServicesPage() {
  return (
    <section>
      <PageHero image="/images/exam-room-2.jpg" alt="JB Medical Center" objectPosition="center 40%" />
      <div className="px-[6vw] pt-10 pb-5">
        <BackHome />
        <h1 className="mt-5.5 text-[30px] font-semibold sm:text-[42px]">Services</h1>
        <p className="mt-3 text-[15.5px] text-body">
          We take care of all your outpatient needs under one roof
        </p>
      </div>
      <div className="px-[6vw] pt-6.5 pb-17.5">
        {serviceRows.map((row) => (
          <div
            key={row.slug}
            className="grid grid-cols-1 items-center gap-7 border-t border-border py-8.5 sm:grid-cols-[1fr_auto]"
          >
            <div>
              <h2 className="m-0 text-[26px] font-semibold sm:text-[34px]">{row.title}</h2>
              <p className="mt-3.5 max-w-[720px] text-[15px] leading-[1.75] text-pretty text-body">
                {row.body}
              </p>
            </div>
            <Link
              href={`/book-appointment?service=${encodeURIComponent(row.title)}`}
              className="justify-self-start bg-purple px-6 py-3.5 text-[13.5px] font-medium whitespace-nowrap text-white hover:bg-purple-dark sm:justify-self-end"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
