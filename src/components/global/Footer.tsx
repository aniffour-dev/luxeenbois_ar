import React from "react";
import Logo from "./LogoFooter";
import Link from "next/link";
import { BiLocationPlus, BiPhoneCall } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <footer className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-900/5 py-10">
          <div className="flex justify-between items-center">
            <ul>
              <li className="mb-6 text-sm text-slate-900 font-semibold max-w-[400px]">
                Luxeenbois هي شركة متخصصة في الديكور الداخلي وأحدث اتجاهات الديكور
              </li>
              <li className="mb-2.5 max-w-[300px]">
                <Link href="/privacy-policy" className="mb-2 flex justify-start items-center gap-0.5">
                  <BiLocationPlus className="size-10 text-amber-500" />
                  <span>حي سيدي غانم الصناعي، 40000 مراكش، آسفي-مراكش</span>
                </Link>
              </li>
              <li className="mb-2.5">
                <Link href="mailto:contact@luxeenbois.com" className="mb-2 flex justify-start items-center gap-0.5">
                  <AiOutlineMail className="size-6 text-amber-500" />
                  <span>contact@luxeenbois.com</span>
                </Link>
              </li>
              <li className="mb-2.5">
                <Link href="tel:+212626487883" className="mb-2 flex justify-start items-center gap-0.5">
                  <BiPhoneCall className="size-6 text-amber-500" />
                  <span>+212 6 26 48 78 83</span>
                </Link>
              </li>
            </ul>
            {/* <p className="mt-5 text-center text-sm leading-6 text-slate-500">
          © 2025 Luxe en bois. Tous droits réservés..
        </p> */}
        <Logo />
            <div className="mt-8 text-sm font-semibold leading-6 text-slate-700">
              <ul>
                <li className="mb-5">
                  <Link href="/privacy-policy" className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    سياسة الخصوصية
                  </Link>
                </li>
                <li className="mb-5">
                  <Link href="/changelog" className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    حول
                  </Link>
                </li>
                <li className="mb-5">
                  <Link href="/changelog" className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
    // <div className="pb-10 shadow w-full">
    //   <footer className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
    //     <div className="flex justify-between items-center">
    //       <div>
    //         <Logo />
    //         <p className="mt-4 text-slate-600 font-medium text-sm mb-3">
    //         LuxeEnBois Essentials propose des solutions de décoration élégantes et pratiques pour sublimer votre maison.
    //         </p>
    //         <ul>
    //           <li>jkjkbjh</li>
    //           <li>jkjkbjh</li>
    //           <li>jkjkbjh</li>
    //         </ul>
    //       </div>
    //       <div>kjlkjl</div>
    //       <div>kjlkjl</div>
    //     </div>
    //   </footer>
    // </div>
  );
};

export default Footer;
