import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import BackHome from "@/components/BackHome";
import { departments } from "@/data/site";

export const metadata: Metadata = {
  title: "Departments — JB Medical Center",
  description: "The departments running at Khan Complex, Sonarpara.",
};

export default function DepartmentsPage() {
  return (
    <section>
      <PageHero image="/images/lab-team.jpg" alt="JB Medical Center" objectPosition="center 35%" />
      <div className="px-[6vw] pt-10">
        <BackHome />
        <h1 className="mt-5.5 text-[30px] font-semibold sm:text-[42px]">Departments</h1>
        <p className="mt-3 max-w-[640px] text-[15.5px] leading-[1.7] text-body">
          The departments running at Khan Complex, Sonarpara. Send the full list with
          the consultants attached to each and this page will be completed.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4.5 px-[6vw] pt-11 pb-20 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {departments.map((dept) => (
          <Link
            key={dept.slug}
            href={`/doctors?department=${encodeURIComponent(dept.name)}`}
            className="border border-border px-6 py-6.5 hover:border-purple hover:bg-[#FAF7FC]"
          >
            <div className="text-[16.5px] font-semibold">{dept.name}</div>
            <div className="mt-2 text-[13.5px] leading-[1.6] text-faint">{dept.note}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
