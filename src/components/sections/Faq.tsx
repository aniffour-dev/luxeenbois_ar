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
    question: "Combien de chaussures ce porte-chaussures peut-il contenir?",
    answer:
      "Le porte-chaussures peut contenir environ 35 à 40 paires de chaussures.",
  },
  {
    question: "Est-ce difficile à assembler?",
    answer:
      "Non, il est très facile à assembler avec des instructions incluses.",
  },
  {
    question: "De quels matériaux est fait le porte-chaussures?",
    answer:
      "Le porte-chaussures est fait de MDF durable pour la force et la qualité.",
  },
  {
    question: "Quelles sont les dimensions de ce produit?",
    answer:
      "Les dimensions sont: Diamètre: ( 60 cm ), Hauteur: ( 160 cm ). Il est très facile à assembler et très solide.",
  },
  {
    question: "Puis-je payer ma commande à la livraison ?",
    answer:
      "Oui, nous proposons l'option de paiement à la livraison (Cash on Delivery - COD) pour votre commodité. Vous pouvez régler votre commande directement auprès du livreur à la réception.",
  },
  {
    question: "Livrez-vous dans tout le Maroc ?",
    answer:
      "Absolument ! Nous assurons la livraison dans toutes les régions du Maroc, afin que vous puissiez profiter de nos produits où que vous soyez.",
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
                <h2 className="text-2xl text-center font-bold text-gray-900 leading-[3.25rem] mb-2 lg:text-left">
                  Questions et réponses des clients
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
