import Image from "next/image";
import Link from "next/link";
import { stats } from "@/data/site";

export default function HomePage() {
  return (
    <div>
      <section className="relative flex min-h-[460px] items-center justify-center bg-navy sm:min-h-[560px]">
        <Image
          src="/images/reception-wide.png"
          alt="JB Medical Center reception"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_72%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(27,22,80,0.55)] to-[rgba(27,22,80,0.82)]" />
        <div className="relative max-w-[860px] px-[6vw] py-19 text-center sm:py-30">
          <h1 className="m-0 text-[34px] leading-[1.08] font-semibold text-balance text-white sm:text-[56px]">
            Healthcare Anytime, Anywhere
          </h1>
          <p className="mt-4.5 text-[19px] font-normal text-white/82">
            Let us take care of your health
          </p>
          <Link
            href="/services"
            className="mt-8.5 inline-block rounded-full bg-purple px-7.5 py-4 text-[15px] font-medium text-white hover:bg-purple-hover"
          >
            Explore our services →
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 items-start gap-8.5 px-[6vw] py-12 sm:gap-15 sm:py-19 lg:grid-cols-2">
        <div className="border-l-[3px] border-purple pl-5">
          <div className="mb-3 text-[12px] font-semibold tracking-[0.1em] uppercase">
            ABOUT <span className="text-purple">JB MEDICAL CENTER</span>
          </div>
          <p className="m-0 text-[15px] leading-[1.75] text-pretty text-body">
            JB Medical Center is a general-services medical centre in Sylhet offering
            diagnostics, daily doctor chambers and home health services under one roof.
            Lab tests, imaging and consultations are handled in the same visit, with
            reports delivered the same day wherever possible.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 sm:gap-7">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-[11.5px] tracking-[0.09em] text-faint uppercase">
                {s.label}
              </div>
              <div className="mt-2 text-[28px] leading-[1.1] font-semibold text-purple sm:text-[38px]">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 items-stretch bg-bg-soft lg:grid-cols-2">
        <div className="flex flex-col justify-center px-[6vw] py-12 sm:py-19">
          <div className="text-[12px] font-semibold tracking-[0.1em] text-ink uppercase">
            WHY JB MEDICAL CENTER
          </div>
          <h2 className="mt-4.5 text-[26px] font-semibold sm:text-[34px]">
            Doctors Who Listen
          </h2>
          <p className="mt-4.5 max-w-[460px] text-[15px] leading-[1.75] text-pretty text-body">
            Consultations are booked with time to talk. Our physicians review your
            history, explain what the tests mean and write a plan you can follow at
            home.
          </p>
        </div>
        <div className="relative min-h-[260px] rounded-bl-[46px] sm:min-h-[380px] sm:rounded-bl-[90px]">
          <Image
            src="/images/bp-check.jpg"
            alt="Blood pressure check at JB Medical Center"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-bl-[46px] object-cover object-[center_30%] sm:rounded-bl-[90px]"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 px-[6vw] py-12 sm:py-24 lg:grid-cols-2">
        <div className="flex flex-col justify-center rounded-t-[22px] bg-purple px-7.5 py-10 sm:rounded-l-[22px] sm:rounded-tr-none sm:px-12 sm:py-15">
          <div className="text-[12px] font-semibold tracking-[0.1em] text-white/85 uppercase">
            WHY JB MEDICAL CENTER
          </div>
          <h2 className="mt-4.5 text-[26px] font-semibold text-white sm:text-[34px]">
            Diagnosis You Can Trust
          </h2>
          <p className="mt-4.5 text-[15px] leading-[1.75] text-pretty text-white/86">
            Blood, urine and stool work is processed in our own laboratory, with X-ray,
            ultrasound and ECG in the same building. Results are checked by a
            consultant before they reach you.
          </p>
          <Link
            href="/services"
            className="mt-7.5 self-start rounded-full border border-white/70 px-5.5 py-2.5 text-[13px] text-white hover:bg-white/14"
          >
            Our Services →
          </Link>
        </div>
        <div className="relative min-h-[260px] rounded-b-[22px] sm:min-h-[380px] sm:rounded-r-[22px] sm:rounded-bl-none">
          <Image
            src="/images/lab-team.jpg"
            alt="Laboratory team at JB Medical Center"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-b-[22px] object-cover object-[center_35%] sm:rounded-r-[22px] sm:rounded-bl-none"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 bg-bg-soft lg:grid-cols-2">
        <div className="flex flex-col justify-center px-[6vw] py-12 sm:py-19">
          <div className="text-[12px] font-semibold tracking-[0.1em] uppercase">
            WHY JB MEDICAL CENTER
          </div>
          <h2 className="mt-4.5 text-[26px] font-semibold sm:text-[34px]">
            Healthcare Anytime, Anywhere
          </h2>
          <p className="mt-4.5 max-w-[470px] text-[15px] leading-[1.75] text-pretty text-body">
            Video consultation for follow-ups, home sample collection for tests, and
            home health visits when travelling to the centre is difficult. The same
            record follows you across all three.
          </p>
        </div>
        <div className="relative min-h-[260px] rounded-bl-[46px] sm:min-h-[380px] sm:rounded-bl-[90px]">
          <Image
            src="/images/exam-room.jpg"
            alt="Doctor examining a patient"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="rounded-bl-[46px] object-cover object-[center_35%] sm:rounded-bl-[90px]"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="relative mr-[6vw] rounded-r-[22px] bg-purple px-[6vw] py-11 sm:mr-[12vw] sm:py-24">
          <div className="text-[12px] font-semibold tracking-[0.1em] text-white/85 uppercase">
            WHY JB MEDICAL CENTER
          </div>
          <h2 className="mt-4.5 text-[26px] font-semibold text-white sm:text-[34px]">
            Take A Tour Of Our Facility
          </h2>
          <p className="mt-4.5 max-w-[520px] text-[15px] leading-[1.75] text-pretty text-white/86">
            Reception, laboratory, imaging and chambers sit on one floor at Khan
            Complex, Sonarpara. Walk through before your first appointment.
          </p>
          <Link
            href="/book-appointment"
            className="mt-7.5 inline-block rounded-full bg-white px-6 py-3 text-[13px] font-medium text-purple-dark hover:bg-purple-soft"
          >
            Book A Guided Tour →
          </Link>
        </div>
        <div className="mt-[-40px] ml-auto mr-[6vw] w-[min(420px,78vw)] sm:mt-[-60px] sm:mr-[10vw]">
          <Image
            src="/images/front-desk.jpg"
            alt="Front desk at JB Medical Center"
            width={420}
            height={250}
            className="block h-[190px] w-full rounded-[18px] object-cover object-[center_55%] shadow-[0_18px_40px_rgba(27,22,80,0.12)] sm:h-[250px]"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 bg-bg-soft lg:grid-cols-2">
        <div className="relative min-h-[260px] sm:min-h-[380px]">
          <Image
            src="/images/reporting-room.jpg"
            alt="Reporting room at JB Medical Center"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[center_40%]"
          />
        </div>
        <div className="flex flex-col justify-center px-[6vw] py-12 sm:py-19">
          <div className="text-[12px] font-semibold tracking-[0.1em] uppercase">
            WHY JB MEDICAL CENTER
          </div>
          <h2 className="mt-4.5 text-[26px] font-semibold sm:text-[34px]">
            We Care For You Like Family
          </h2>
          <p className="mt-4.5 max-w-[460px] text-[15px] leading-[1.75] text-pretty text-body">
            Membership plans cover routine checkups for the whole household, so the
            people you look after are seen on schedule rather than in an emergency.
          </p>
          <Link
            href="/book-appointment"
            className="mt-7.5 self-start rounded-full border border-purple px-6 py-3 text-[13px] font-medium text-purple hover:bg-purple hover:text-white"
          >
            Book Appointment →
          </Link>
        </div>
      </section>
    </div>
  );
}
