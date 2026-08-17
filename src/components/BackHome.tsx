import Link from "next/link";

export default function BackHome() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink hover:text-purple"
    >
      ‹ Back
    </Link>
  );
}
