"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { contact, serviceGroups, sheetLinks } from "@/data/site";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasMenu: true },
  { label: "Health Checkup", href: "/health-checkup" },
  { label: "Departments", href: "/departments" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "About Us", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="w-full">
      <div className="hidden flex-wrap items-center gap-6 border-b border-border-light px-[6vw] py-2 text-[12.5px] text-muted lg:flex">
        <a href={contact.phoneHref} className="flex items-center gap-1.5 text-muted hover:text-purple">
          <span className="text-purple">✆</span>
          {contact.phone}
        </a>
        <a href={contact.emailHref} className="flex items-center gap-1.5 text-muted hover:text-purple">
          <span className="text-purple">✉</span>
          {contact.email}
        </a>
        <span className="ml-auto flex gap-5 whitespace-nowrap">
          <span>{contact.address}</span>
        </span>
      </div>

      <div className="sticky top-0 z-40 border-b border-border-light bg-white/95 backdrop-blur-sm">
        <div className="flex flex-nowrap items-center gap-x-6 px-4 py-3.5 sm:px-[4vw] lg:gap-x-10 lg:px-[6vw]">
          <Link href="/" className="shrink-0" onClick={() => setSheetOpen(false)}>
            <Image
              src="/brand/logo.png"
              alt="JB Medical Center"
              width={500}
              height={97}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <button
            type="button"
            onClick={() => setSheetOpen((v) => !v)}
            className="ml-auto flex items-center gap-2 rounded-full border border-border-input px-4 py-2.5 text-[12.5px] font-medium tracking-wide text-ink uppercase hover:border-purple hover:text-purple lg:hidden"
          >
            ☰ Menu
          </button>

          <nav className="ml-auto hidden flex-nowrap items-center gap-x-5 whitespace-nowrap text-[13px] font-medium tracking-wide text-ink uppercase xl:gap-x-7 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.hasMenu ? (
                <span
                  key={item.href}
                  className="relative pb-[3px]"
                  onMouseEnter={() => setMenuOpen(true)}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="cursor-pointer pb-[3px]"
                    style={{
                      color: isActive(item.href) ? "var(--color-purple)" : "var(--color-ink)",
                      borderBottom: `2px solid ${isActive(item.href) ? "var(--color-purple)" : "transparent"}`,
                    }}
                  >
                    Services ▾
                  </Link>
                  {menuOpen && (
                    <div className="absolute top-full left-[-20px] z-50 mt-3 grid grid-cols-2 gap-x-8 gap-y-5 rounded-2xl border border-border bg-white p-6 normal-case shadow-[0_18px_44px_rgba(27,22,80,0.14)]" style={{ minWidth: 380 }}>
                      {serviceGroups.map((group) => (
                        <div key={group.title}>
                          <Link href="/services" className="text-[13px] font-semibold text-ink">
                            {group.title}
                          </Link>
                          <div className="mt-2 flex flex-col gap-1.5">
                            {group.items.map((row) => (
                              <Link
                                key={row}
                                href="/services"
                                className="text-[12.5px] font-normal text-muted hover:text-purple"
                              >
                                {row}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Link
                        href="/health-checkup"
                        className="col-span-2 border-t border-border-light pt-3.5 text-[12.5px] font-medium text-purple"
                      >
                        Featured — Health Checkup →
                      </Link>
                    </div>
                  )}
                </span>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="cursor-pointer pb-[3px]"
                  style={{
                    color: isActive(item.href) ? "var(--color-purple)" : "var(--color-ink)",
                    borderBottom: `2px solid ${isActive(item.href) ? "var(--color-purple)" : "transparent"}`,
                  }}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <Link
            href="/book-appointment"
            className="hidden shrink-0 rounded-full bg-purple px-5.5 py-3 text-[13px] font-medium whitespace-nowrap text-white hover:bg-purple-dark lg:block"
          >
            Book Appointment →
          </Link>
        </div>

        {sheetOpen && (
          <div className="flex flex-col gap-0.5 border-t border-border-light bg-white px-[6vw] pt-4.5 pb-6.5 lg:hidden">
            {sheetLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setSheetOpen(false)}
                className="border-b border-[#F2EFF6] py-3.5 text-[15px] font-medium text-ink hover:text-purple"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 text-[13px] text-muted">
              {contact.address} · {contact.phone}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
