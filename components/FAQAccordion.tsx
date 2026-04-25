"use client";

import { useState } from "react";

export type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div className="rounded-2xl border border-slate-800 bg-slate-900" key={item.question}>
          <button
            aria-expanded={open === index}
            className="focus-ring flex w-full items-center justify-between gap-4 p-4 text-right font-black text-slate-100"
            onClick={() => setOpen(open === index ? -1 : index)}
            type="button"
          >
            <span className="block leading-7">{item.question}</span>
            <span className="text-red-500">{open === index ? "−" : "+"}</span>
          </button>
          {open === index ? <p className="px-4 pb-4 leading-8 text-slate-300">{item.answer}</p> : null}
        </div>
      ))}
    </div>
  );
}
