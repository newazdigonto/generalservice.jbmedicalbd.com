"use client";

import { useState } from "react";
import { faqs } from "@/data/site";

export default function FaqList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex max-w-[760px] flex-col gap-0.5">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={faq.q}
            onClick={() => setOpen(isOpen ? null : i)}
            className="cursor-pointer border-b border-border-light py-4"
          >
            <div className="flex items-center gap-3 text-[14.5px] text-ink">
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-purple text-[11px] text-white">
                {isOpen ? "−" : "+"}
              </span>
              {faq.q}
            </div>
            {isOpen && (
              <p className="mt-3 ml-7.5 text-[14px] leading-[1.7] text-body">{faq.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
