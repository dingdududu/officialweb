"use client";
import React, { useState } from "react";
import { qaList } from "@/data/qaList";

export default function FQAList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="max-w-[1000px] mx-auto px-4 py-8 mt-30"
      aria-label="Frequently Asked Questions"
    >

      <ul className="space-y-4">
        {qaList.map((qa, idx) => (
          <li
            key={idx}
            className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div
              className={`flex justify-between items-center cursor-pointer px-6 py-4 ${
                openIndex === idx ? "bg-gray-50" : "bg-white hover:bg-gray-50"
              } transition-colors duration-300`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setOpenIndex(openIndex === idx ? null : idx);
              }}
            >
              <span className="text-lg text-[#005C8A]">{qa.question}</span>
              <span className="text-2xl select-none">
                {openIndex === idx ? "−" : "+"}
              </span>
            </div>
            {openIndex === idx && (
              <div className="px-6 pb-4 text-base text-gray-700 transition-all bg-gray-50">
                {qa.answer}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
