"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Doctor } from "@/lib/doctors";

const ALPHABET = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

export default function DoctorsBrowser({
  doctors,
  initialDepartment,
}: {
  doctors: Doctor[];
  initialDepartment?: string;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(initialDepartment ?? "All");

  const categories = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.category))).sort(),
    [doctors]
  );

  const groups = useMemo(() => {
    const filtered = doctors.filter(
      (d) =>
        (category === "All" || d.category === category) &&
        d.name.toLowerCase().includes(name.trim().toLowerCase())
    );
    const byCategory = new Map<string, Doctor[]>();
    for (const doc of filtered) {
      if (!byCategory.has(doc.category)) byCategory.set(doc.category, []);
      byCategory.get(doc.category)!.push(doc);
    }
    return Array.from(byCategory.entries()).map(([cat, docs]) => ({
      name: cat,
      doctors: docs,
    }));
  }, [doctors, name, category]);

  return (
    <>
      <div className="px-[6vw] pt-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          <div>
            <div className="mb-1.5 text-[12.5px] text-muted">Search by Speciality</div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-purple bg-white px-3.5 py-3 text-[14px] text-faint"
            >
              <option value="All">Please Select</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1.5 text-[12.5px] text-muted">Search by Name</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type Doctor Name"
              className="w-full border border-purple px-3.5 py-3 text-[14px]"
            />
          </div>
          <div>
            <div className="mb-1.5 text-[12.5px] text-muted">Search by Date &amp; Time</div>
            <input
              placeholder="mm/dd/yyyy"
              className="w-full border border-purple px-3.5 py-3 text-[14px]"
            />
          </div>
          <div>
            <div className="mb-1.5 text-[12.5px] text-muted">Search by Availability</div>
            <div className="flex justify-between border border-purple px-3.5 py-3 text-[14px] text-faint">
              Please Select <span>⌄</span>
            </div>
          </div>
        </div>
        <div className="mt-6.5 flex justify-center">
          <span className="bg-purple px-7.5 py-3.5 text-[14px] text-white">
            {groups.reduce((n, g) => n + g.doctors.length, 0)} matching
          </span>
        </div>
        <div className="mt-7.5 text-center text-[12.5px] font-semibold">
          Search by Department
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {ALPHABET.map((letter) => (
            <span
              key={letter}
              className="border border-[#DDC7E6] px-2 py-1 text-[11.5px] text-purple"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div className="px-[6vw] pt-12.5 pb-20">
        {groups.map((group) => (
          <div key={group.name} className="mb-11.5">
            <h2 className="mb-5.5 text-[26px] font-semibold sm:text-[34px]">{group.name}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
              {group.doctors.map((doc) => (
                <div key={doc.id} className="border border-border">
                  {doc.photoUrl ? (
                    <div
                      className="h-55 bg-cover bg-center"
                      style={{ backgroundImage: `url(${doc.photoUrl})` }}
                    />
                  ) : (
                    <div className="placeholder-media flex h-55 items-end justify-center p-3">
                      <span className="font-mono text-[10.5px] text-[#6E6488]">
                        [ portrait 600×720 ]
                      </span>
                    </div>
                  )}
                  <div className="px-5 pt-5 pb-6">
                    <div className="text-[16px] font-semibold">{doc.name}</div>
                    <div className="mt-1.5 text-[13px] text-faint">{doc.category}</div>
                    <Link
                      href={`/doctors/${doc.id}`}
                      className="mt-4 inline-block border-b border-purple text-[12.5px] text-purple"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {groups.length === 0 && doctors.length === 0 && (
          <div className="text-[14px] text-faint">
            Doctor profiles will appear here once they are added from the admin panel.
          </div>
        )}
        {groups.length === 0 && doctors.length > 0 && (
          <div className="text-[14px] text-faint">No doctors match your search.</div>
        )}
      </div>
    </>
  );
}
