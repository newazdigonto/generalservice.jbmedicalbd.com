import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import BackHome from "@/components/BackHome";
import DoctorsBrowser from "@/components/DoctorsBrowser";

export const metadata: Metadata = {
  title: "Our Doctors — JB Medical Center",
  description:
    "At JB Medical Center, family medicine doctors and visiting specialists take care of you.",
};

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ department?: string }>;
}) {
  const { department } = await searchParams;

  return (
    <section>
      <PageHero image="/images/front-desk.jpg" alt="JB Medical Center" objectPosition="center 50%" />
      <div className="px-[6vw] pt-10">
        <BackHome />
        <h1 className="mt-6.5 text-[30px] font-semibold sm:text-[42px]">Our Doctors</h1>
        <p className="mt-3.5 max-w-[860px] text-[15.5px] leading-[1.7] text-body">
          At JB Medical Center, family medicine doctors and visiting specialists take
          care of you. Send the names, specialties and chamber hours and these cards
          will be filled in.
        </p>
      </div>
      <DoctorsBrowser initialDepartment={department} />
    </section>
  );
}
