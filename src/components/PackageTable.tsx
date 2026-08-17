"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allPackages } from "@/data/site";

export default function PackageTable() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allPackages;
    return allPackages.filter((name) => name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="bg-bg-soft-2 px-[6vw] py-12.5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="m-0 text-[26px] font-semibold sm:text-[34px]">All Packages</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="min-w-[200px] border border-border-input bg-white px-3.5 py-2.5 text-[13px]"
        />
      </div>
      <div className="mt-6 bg-white">
        <div className="grid grid-cols-[1fr_160px_260px] gap-4 border-b border-border-light px-5.5 py-4 text-[12.5px] text-faint">
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
        </div>
        {filtered.map((name) => (
          <div
            key={name}
            className="grid grid-cols-1 items-center gap-3 border-b border-[#F2EFF6] px-5.5 py-4 text-[13.5px] sm:grid-cols-[1fr_160px_260px]"
          >
            <span className="text-ink">{name}</span>
            <span className="text-muted">Packages</span>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href={`/book-appointment?service=${encodeURIComponent(name)}`}
                className="border border-purple px-3.5 py-1.5 text-[12px] text-purple hover:bg-purple-soft"
              >
                Show Price
              </Link>
              <Link
                href={`/book-appointment?service=${encodeURIComponent(name)}`}
                className="bg-purple px-3.5 py-1.5 text-[12px] text-white hover:bg-purple-dark"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="px-5.5 py-6 text-[13.5px] text-faint">No packages match &quot;{query}&quot;.</div>
        )}
      </div>
      <div className="mt-4.5 text-[12.5px] text-faint">
        Full package list to follow — send the sheet and every row will be loaded.
      </div>
    </div>
  );
}
