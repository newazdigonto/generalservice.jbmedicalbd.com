"use client";

import Link from "next/link";
import { useState } from "react";
import { getUpcomingSchedule } from "@/data/site";

export default function DoctorSchedule({ doctorName }: { doctorName: string }) {
  const [mode, setMode] = useState<"In Hub" | "Online">("In Hub");
  const [slot, setSlot] = useState<string | null>(null);
  const schedule = getUpcomingSchedule();

  return (
    <>
      <div className="mt-10.5 flex flex-wrap items-center gap-5.5">
        <h2 className="m-0 text-[26px] font-semibold sm:text-[34px]">Schedule</h2>
        {(["In Hub", "Online"] as const).map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setMode(label)}
            className="flex cursor-pointer items-center gap-2 text-[13.5px] text-ink"
          >
            <span
              className="h-3.5 w-3.5 rounded-full border-4 bg-white"
              style={{ borderColor: mode === label ? "var(--color-purple)" : "#E2D3EA" }}
            />
            {label}
          </button>
        ))}
      </div>

      <h2 className="mt-8.5 mb-4.5 text-[26px] font-semibold sm:text-[34px]">
        Appointment Time
      </h2>
      <div className="flex flex-col gap-3.5">
        {schedule.map((day) => (
          <div
            key={day.date}
            className="grid grid-cols-1 items-center gap-4.5 bg-bg-soft-2 p-4.5 sm:grid-cols-[180px_1fr]"
          >
            <div className="text-center">
              <div className="text-[14.5px] font-medium">{day.date}</div>
              <div className="mt-0.5 text-[12px] text-purple">{day.dow}</div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {day.slots.map((time) => {
                const key = day.date + time;
                const active = slot === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSlot(key)}
                    className="border border-purple px-3 py-1.5 text-[12.5px]"
                    style={{
                      background: active ? "var(--color-purple)" : "#fff",
                      color: active ? "#fff" : "var(--color-purple)",
                    }}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <Link
        href={`/book-appointment?doctor=${encodeURIComponent(doctorName)}`}
        className="mt-6.5 inline-block bg-purple px-7 py-3.5 text-[14px] font-medium text-white hover:bg-purple-dark"
      >
        Book Appointment →
      </Link>
    </>
  );
}
