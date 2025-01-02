"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";
import FaqImg from "../../../public/galleries/3.jpg";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "كم عدد الأحذية التي يمكن أن تحتويها هذه الرفوف؟",
    answer:
      "يمكن أن تحتوي الرفوف حوالي 35 إلى 40 زوجًا من الأحذية.",
  },
  {
    question: "هل هو صعب التجميع؟",
    answer:
      "لا، إنه سهل التجميع جدًا مع التعليمات المرفقة.",
  },
  {
    question: "من أي مواد مصنوعة هذه الرفوف؟",
    answer:
      "الرفوف مصنوعة من MDF متين للقوة والجودة.",
  },
  {
    question: "ما هي أبعاد هذا المنتج؟",
    answer:
      "الأبعاد هي: القطر: (60 سم)، الارتفاع: (160 سم). إنه سهل التجميع جدًا ومتين جدًا.",
  },
  {
    question: "هل يمكنني الدفع عند التسليم؟",
    answer:
      "نعم، نقدم خيار الدفع عند الاستلام (الدفع عند الاستلام - COD) لراحتك. يمكنك تسوية طلبك مباشرة مع المندوب عند الاستلام.",
  },
  {
    question: "هل تقومون بالتوصيل في جميع أنحاء المغرب؟",
    answer:
      "بالطبع! نقوم بالتوصيل في جميع مناطق المغرب، حتى تتمكن من الاستمتاع بمنتجاتنا أينما كنت.",
  },
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mb-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col justify-center items-center gap-x-8 gap-y-5 xl:gap-16 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/2">
            <Image
              src={FaqImg}
              alt="FAQ tailwind section"
              height={600}
              width={600}
              className="w-full rounded-xl object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6">
                <h2 className="text-2xl text-center font-bold text-gray-900 leading-[3.25rem] mb-2 lg:text-right">
                  أسئلة وأجوبة العملاء
                </h2>
              </div>
              <div
                className="accordion-group"
                data-accordion="default-accordion"
              >
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`accordion ${
                      index < faqs.length - 1
                        ? "py-4 border-b border-solid border-gray-200"
                        : ""
                    }`}
                  >
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h6 className="text-black text-[16px] font-semibold">
                        {faq.question}
                      </h6>
                      {activeIndex === index ? (
                        <FaChevronUp className="text-indigo-600" />
                      ) : (
                        <FaChevronDown className="text-gray-900 group-hover:text-indigo-600" />
                      )}
                    </button>
                    <div
                      className={`accordion-content w-full px-0 overflow-hidden pr-4 transition-max-height duration-500 ${
                        activeIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <p className="text-base font-normal text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
