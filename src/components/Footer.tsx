import Image from "next/image";
import Link from "next/link";
import { contact, footerLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-bg-soft px-[6vw] pt-15 pb-6.5">
      <div className="grid grid-cols-1 gap-11 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/brand/logo.png" alt="JB Medical Center" width={500} height={97} className="h-9.5 w-auto" />
          <div className="mt-6 text-[13px] font-medium">Keep up with JB Medical Center</div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <input
              placeholder="Email Address"
              type="email"
              className="min-w-[160px] flex-1 rounded-lg border border-border-input bg-white px-3.5 py-2.5 text-[13px]"
            />
            <button
              type="button"
              className="rounded-lg bg-purple px-5 py-2.5 text-[13px] text-white hover:bg-purple-dark"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div>
          <div className="mb-4 text-[14px] font-semibold">Services</div>
          <div className="flex flex-col gap-2.5 text-[13.5px] text-body">
            {footerLinks.services.map((l) => (
              <Link key={l.label} href={l.href} className="text-body hover:text-purple">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 text-[14px] font-semibold">Resources</div>
          <div className="flex flex-col gap-2.5 text-[13.5px] text-body">
            {footerLinks.resources.map((l) => (
              <Link key={l.label} href={l.href} className="text-body hover:text-purple">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 text-[14px] font-semibold">Get in touch</div>
          <div className="flex flex-col gap-2.5 text-[13.5px] text-body">
            <span>{contact.address}</span>
            <a href={contact.phoneHref} className="text-body hover:text-purple">
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
      <div className="mt-11.5 flex flex-wrap items-center justify-between gap-5 border-t border-[#E1DBE9] pt-5 text-[12px] text-faint">
        <div className="flex flex-wrap gap-5.5">
          <span>Privacy Notice</span>
          <span>Code of Ethics</span>
          <span>Patient Bill of Rights</span>
        </div>
        <div>© {new Date().getFullYear()} JB Medical Center</div>
      </div>
    </footer>
  );
}
