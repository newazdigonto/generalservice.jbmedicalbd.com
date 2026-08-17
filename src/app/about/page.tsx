import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { apartPoints, contact, teamSlots } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us — JB Medical Center",
  description: "JB Medical Center exists to give Sylhet a better patient experience.",
};

export default function AboutPage() {
  return (
    <section>
      <PageHero image="/images/reception-wide.jpg" alt="JB Medical Center" objectPosition="center 65%" />

      <div className="px-[6vw] pt-14 text-center">
        <h1 className="m-0 text-[30px] font-semibold sm:text-[42px]">Your Partner in Health</h1>
        <p className="mx-auto mt-4 max-w-[720px] text-[15.5px] leading-[1.7] text-body">
          JB Medical Center exists to give Sylhet a better patient experience —
          diagnostics, consultation and home care built around the person, not the
          paperwork.
        </p>
      </div>

      <div className="px-[6vw] pt-15">
        <div className="mb-5 text-[13px] font-semibold">What Sets Us Apart</div>
        <div className="grid grid-cols-1 items-start sm:grid-cols-2">
          <div className="relative h-65 sm:h-[560px]">
            <Image
              src="/images/front-desk.jpg"
              alt="JB Medical Center reception"
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-0 flex flex-col gap-6.5 bg-purple px-6.5 py-8.5 sm:mt-17.5 sm:px-12 sm:py-14">
            {apartPoints.map((point) => (
              <div key={point.title} className="border-b border-white/30 pb-5.5">
                <div className="text-[13px] font-semibold tracking-[0.08em] text-white uppercase">
                  {point.title}
                </div>
                <p className="mt-2.5 text-[14.5px] leading-[1.7] text-pretty text-white/88">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-[6vw] pt-17.5 text-center">
        <h2 className="m-0 text-[26px] font-semibold sm:text-[34px]">Our Management Team</h2>
        <div className="mt-7.5 grid grid-cols-2 justify-center gap-6 sm:grid-cols-[repeat(auto-fit,minmax(170px,200px))]">
          {teamSlots.map((slot, i) => (
            <div key={i}>
              <div className="placeholder-media flex h-52.5 items-end justify-center p-2.5">
                <span className="font-mono text-[10px] text-[#6E6488]">[ portrait ]</span>
              </div>
              <div className="mt-3 text-[14px] font-semibold">Name</div>
              <div className="mt-1 text-[12px] text-faint">{slot}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-[6vw] pt-17.5 pb-20 text-center">
        <h2 className="m-0 text-[26px] font-semibold sm:text-[34px]">Visit Us</h2>
        <div className="mt-4.5 text-[15px] leading-[1.9] text-body">
          {contact.address}
          <br />
          {contact.phone}
        </div>
      </div>
    </section>
  );
}
