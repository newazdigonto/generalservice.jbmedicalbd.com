import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import BackHome from "@/components/BackHome";
import FaqList from "@/components/FaqList";
import PackageTable from "@/components/PackageTable";
import { checkGroups } from "@/data/site";

export const metadata: Metadata = {
  title: "Health Checks and Packages — JB Medical Center",
  description:
    "Health checks and packages to help you stay on top of your health, no matter your age, gender, or needs.",
};

export default function HealthCheckupPage() {
  return (
    <section>
      <PageHero image="/images/bp-check.jpg" alt="JB Medical Center" objectPosition="center 35%" />
      <div className="px-[6vw] pt-8.5">
        <BackHome />
        <h1 className="mt-5.5 text-[30px] font-semibold sm:text-[42px]">
          Health Checks and Packages
        </h1>
        <p className="mt-3 max-w-[900px] text-[14.5px] leading-[1.7] text-pretty text-body">
          We believe everyone should have access to convenient, affordable,
          high-quality healthcare. Our health checks and packages help you stay on
          top of your health no matter your age, gender, or needs. Choose the one
          that is right for you.
        </p>
      </div>

      <div className="px-[6vw] pt-11">
        {checkGroups.map((group) => (
          <div key={group.name} className="mb-12">
            <h2 className="mb-5 text-[26px] font-semibold sm:text-[34px]">{group.name}</h2>
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
              {group.checks.map((check) => (
                <div key={check.name} className="flex flex-col bg-bg-soft-2">
                  <div className="placeholder-media flex h-37.5 items-end justify-center p-2.5">
                    <span className="font-mono text-[10px] text-[#6E6488]">[ photo 720×450 ]</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 px-4.5 pt-4.5 pb-5.5">
                    <div className="text-[14px] leading-[1.5] text-ink">{check.name}</div>
                    <div className="text-[14px] font-semibold">Price: ৳ {check.price}</div>
                    <div className="mt-auto flex gap-2.5">
                      <Link
                        href={`/book-appointment?service=${encodeURIComponent(check.name)}`}
                        className="bg-purple px-4 py-2.5 text-[12.5px] text-white hover:bg-purple-dark"
                      >
                        Buy Now
                      </Link>
                      <Link
                        href={`/book-appointment?service=${encodeURIComponent(check.name)}`}
                        className="border border-purple px-4 py-2.5 text-[12.5px] text-purple hover:bg-purple-soft"
                      >
                        Add to Cart
                      </Link>
                    </div>
                    <Link
                      href={`/book-appointment?service=${encodeURIComponent(check.name)}`}
                      className="self-center border-b border-[#A99FC0] text-[12px] text-[#4A4468]"
                    >
                      See details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <PackageTable />

      <div id="faq" className="px-[6vw] pt-14 pb-20">
        <h2 className="m-0 text-[26px] font-semibold sm:text-[34px]">
          Frequently Asked Questions
        </h2>
        <p className="mt-2.5 mb-6.5 text-[14px] text-body">
          Take a look at the most commonly asked questions. We are here to help.
        </p>
        <FaqList />
      </div>
    </section>
  );
}
