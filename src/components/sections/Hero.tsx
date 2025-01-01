"use client";
import React, { useState, useRef, useEffect } from "react";
import Image1White from "../../../public/hero.jpg";
import Image2White from "../../../public/galleries/1.jpg";
import Image3White from "../../../public/galleries/2.jpg";
import Image4White from "../../../public/galleries/3.jpg";
import Image5White from "../../../public/galleries/4.jpg";
import Image6White from "../../../public/galleries/5.jpg";
import Image1Black from "../../../public/galleries/black/2.png";
import Image2Black from "../../../public/galleries/black/1.png";
import Image3Black from "../../../public/galleries/black/2.png";
import Image4Black from "../../../public/galleries/black/3.png";
import Image5Black from "../../../public/galleries/black/4.png";
import Image6Black from "../../../public/galleries/black/5.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { Bodoni_Moda } from "next/font/google";
import * as yup from "yup";
import { ValidationError } from "yup";
import { Toaster, toast } from "react-hot-toast";
import { FaShippingFast, FaSpinner } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";
import Adv from "../../../public/product/adv.png";
import Table from "../../../public/product/table.webp";
import Product from "../../../public/product/product.jpg";
import Countdown from "../Countdown";
import { gsap } from "gsap";
import confetti from "canvas-confetti";
import { CgArrangeBack } from "react-icons/cg";
import { TbTruckReturn } from "react-icons/tb";
import { TfiPackage } from "react-icons/tfi";
import { SlBadge } from "react-icons/sl";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

interface FormData {
  city: string | number | readonly string[] | undefined;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const checkoutSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/,
      "Please enter a valid phone number. Format: +1-234-567-8900 or 2345678900"
    ),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
});

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState("white");
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSpecialOffer, setIsSpecialOffer] = useState(false);
  const popupRef = useRef(null);

  const validateField = async (name: keyof FormData, value: string) => {
    try {
      const fieldSchema = yup.reach(checkoutSchema, name) as yup.Schema<string>;
      await fieldSchema.validate(value);
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof ValidationError) {
        setFormErrors((prev) => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await checkoutSchema.validate(formData, { abortEarly: false });

      // Calculate price based on special offer and quantity
      let orderPrice;
      const basePrice = 1880;

      if (isSpecialOffer && quantity === 2) {
        // Special offer price only when quantity is 2
        orderPrice = {
          value: 3200,
          display: "3200 DHs (Offer)",
        };
      } else {
        // Regular price calculation for all other cases
        const totalPrice = basePrice * quantity;
        orderPrice = {
          value: totalPrice,
          display: `${totalPrice} DHs`,
        };
      }

      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo: formData,
          orderItems: [
            {
              productName: "360° Rotation Porte-chaussures",
              color: selectedColor,
              quantity,
              price: basePrice,
              totalPrice: orderPrice.value,
              displayPrice: orderPrice.display,
              isSpecialOffer: isSpecialOffer && quantity === 2,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Failed to place order!");
      } else {
        toast.success("L’achat a été couronné de succès!");
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationErrors: Partial<Record<keyof FormData, string>> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path as keyof FormData] = err.message;
          }
        });
        setFormErrors(validationErrors);
      } else {
        console.error("Checkout error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while placing your order"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const colors = [
    { name: "white", class: "bg-white border border-slate-300" },
    { name: "black", class: "bg-black border border-slate-300" },
  ];

  const imagesWhite = [
    Image1White,
    Image2White,
    Image3White,
    Image4White,
    Image5White,
    Image6White,
  ];
  const imagesBlack = [
    Image1Black,
    Image2Black,
    Image3Black,
    Image4Black,
    Image5Black,
    Image6Black,
  ];
  const images = selectedColor === "white" ? imagesWhite : imagesBlack;

  const openPopup = (index: number) => {
    setSelectedImageIndex(index);
    setIsPopupOpen(true);
    gsap.fromTo(
      popupRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5 }
    );
  };

  const closePopup = () => {
    gsap
      .to(popupRef.current, { opacity: 0, scale: 0.5, duration: 0.5 })
      .then(() => {
        setIsPopupOpen(false);
      });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isSpecialOffer) {
      setQuantity(2);
    }
  }, [isSpecialOffer]);

  return (
    <div className="max-w-6xl mx-auto mt-16 mb-16 px-6 lg:px-0">
      <Toaster position="top-center" reverseOrder={true} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative lg:sticky lg:top-20 lg:self-start">
          <div className="main-swiper">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="rounded-lg shadow-lg"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-square relative">
                    <Image
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="object-cover"
                      fill
                      onClick={() => openPopup(index)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="thumbnail-swiper mt-4">
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="rounded-lg cursor-pointer shadow-lg"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-square relative">
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover"
                      fill
                      onClick={() => openPopup(index)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="space-y-6">
          <header className="order-2 md:order-1">
            <h1 className="text-lg md:text-3xl font-bold text-gray-900">
              360° Rotation Porte-chaussures{" "}
              <span className="font-black">MDF</span>, Tient 35 Paires, Peu
              encombrant, Facile à Assembler, Durable, Design Élégant
            </h1>
          </header>

          <section className="flex items-center gap-0.5">
            {[1, 2, 3, 4].map((star) => (
              <svg
                key={star}
                className="w-6 h-6 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg
              className="w-5 h-5 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-500 ml-2">1624 avis</span>
          </section>

          <section>
            <p className="text-gray-600">
              LuxeEnBois vous propose la tour de rangement de chaussures
              rotative originale, 7 couches pouvant contenir plus de 35 paires
              de chaussures, une tour de rangement de chaussures rotative à 360
              degrés, un organisateur de placard à chaussures rotatif.
            </p>
          </section>

          <section className="flex items-baseline gap-4">
            <span
              className={`${bodoni.className} text-3xl font-bold ${
                isSpecialOffer ? "text-emerald-500" : "text-emerald-600"
              }`}
            >
              {isSpecialOffer ? "3200 DHs" : "1880 DHs"}
            </span>
            {isSpecialOffer && (
              <span
                className={`${bodoni.className} text-gray-500 line-through text-lg`}
              >
                3760 DHs
              </span>
            )}
            <span className="text-red-500 text-lg font-semibold">
              {isSpecialOffer ? "20% de réduction" : "20% de réduction"}
            </span>
          </section>

          <h4 className="text-black font-semibold my-3 mt-0">
            Special Offer🎉
          </h4>

          <button
            className={`${
              isSpecialOffer
                ? "bg-black text-white"
                : "bg-slate-50 border-[1px] border-slate-800 text-black"
            } py-2 px-4 rounded font-semibold mb-4`}
            onClick={() => setIsSpecialOffer(!isSpecialOffer)}
          >
            {isSpecialOffer
              ? "Désélectionner l'offre spéciale"
              : "Achetez 2 pour 3200dhs – Économisez 560dhs!"}
          </button>

          <section className="flex justify-start items-center gap-8">
            <div className="flex justify-start items-center gap-2">
              <h3 className="font-medium text-gray-800">Couleur:</h3>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-7 h-7 rounded-full ${color.class} ${
                      selectedColor === color.name
                        ? "ring-2 ring-offset-2 ring-gray-800"
                        : ""
                    }`}
                    onClick={() => setSelectedColor(color.name)}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="flex items-center border rounded shadow-sm">
                <button
                  className={`p-3 hover:bg-gray-100 ${
                    isSpecialOffer ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={isSpecialOffer}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className={`p-3 hover:bg-gray-100 ${
                    isSpecialOffer ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isSpecialOffer}
                >
                  +
                </button>
              </div>
            </div>
          </section>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white shadow-lg rounded-lg p-5 border-[1px] border-slate-100"
          >
            <h4 className="text-md text-black font-semibold mb-3">
              Pour acheter ces articles, veuillez remplir ce formulaire
              ci-dessous !
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 text-[13px] font-semibold mb-1">
                  Nom et prénom:
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="🙎‍♂️ Nom et prénom:"
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 text-[13px] font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="📧 Adresse Email"
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 text-[13px] font-semibold mb-1">
                  Téléphone:
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="📞 Numéro De Téléphone"
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-900 text-[13px] font-semibold mb-1">
                  Ville:
                </label>
                <input
                  type="tel"
                  name="city"
                  placeholder="🏘️ Ville"
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                {formErrors.city && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-900 text-[13px] font-semibold mb-1">
                Adresse de livraison:
              </label>
              <textarea
                name="address"
                placeholder="📍 Adresse de livraison"
                required
                className="shadow appearance-none border h-20 max-h-20 min-h-20 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                disabled={isSubmitting}
              />
              {formErrors.address && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.address}
                </p>
              )}
            </div>

            <div className="flex justify-center items-center my-3 cursor-none">
              <div className="border-2 border-slate-700 rounded-lg max-w-[300px] flex justify-center items-center py-1 px-4 gap-0.5">
                <span className="text-slate-800 font-bold text-lg uppercase italic">
                  Free
                </span>
                <span className="text-red-500 font-bold text-lg uppercase italic">
                  Delivery
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="submit"
                className={`w-full py-3 uppercase font-semibold rounded bg-violet-900 text-violet-50 flex-1 flex items-center justify-center ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FaSpinner className="animate-spin h-5 w-5 text-white mr-3" />
                ) : null}
                {isSubmitting ? "Acheter maintenant..." : "Acheter maintenant"}
              </button>
            </div>
          </form>

          <div className="my-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white shadow rounded p-3 text-center flex justify-center items-center flex-col border-[1px] border-slate-100">
                <FaShippingFast className="size-6 mb-2 mt-1.5 text-amber-500" />
                <p className="text-sm mb-1.5 text-slate-800 font-semibold">
                  Livraison Rapide
                </p>
              </div>
              <div className="bg-white shadow rounded p-3 px-3 text-center flex justify-center items-center flex-col border-[1px] border-slate-100">
                <TbTruckReturn className="size-7 mb-2 mt-1.5 text-amber-500" />
                <p className="text-sm mb-1.5 text-slate-800 font-semibold">
                  Retour Gratuit
                </p>
              </div>
              <div className="bg-white shadow rounded p-3 px-3 text-center flex justify-center items-center flex-col border-[1px] border-slate-100">
                <TfiPackage className="size-6 mb-2 mt-1.5 text-amber-500" />
                <p className="text-sm mb-1.5 text-slate-800 font-semibold">
                  Assurez l&apos;emballage
                </p>
              </div>
              <div className="bg-white shadow rounded p-3 px-3 text-center flex justify-center items-center flex-col border-[1px] border-slate-100">
                <SlBadge className="size-6 mb-2 mt-1.5 text-amber-500" />
                <p className="text-sm mb-1.5 text-slate-800 font-semibold">
                  100% Produits Local
                </p>
              </div>
            </div>
          </div>

          <section className="flex justify-center items-center flex-col">
            <div className="text-black font-medium my-2">
              Livraison à domicile partout au Maroc paiement à la livraison
            </div>
            <Image
              src={Product}
              alt="Product"
              width={0}
              height={0}
              className="w-[95%]"
            />
          </section>
          <ul className="mt-3 mb-4">
            <li className="text-sm text-slate-900 font-semibold flex justify-start items-center gap-2 mb-2.5">
              <BiCheck className="size-8 text-emerald-500" />
              <span>
                Le porte-chaussures 7 niveaux en{" "}
                <span className="font-bold">MDF</span> peut contenir jusqu'à 35
                paires de chaussures
              </span>
            </li>
            <li className="text-sm text-slate-900 font-semibold flex justify-start items-center gap-2 mb-2.5">
              <BiCheck className="size-8 text-emerald-500" />
              <span>
                Conception rotative à 360 degrés pour économiser de l'espace et
                garder les placards bien rangés
              </span>
            </li>
            <li className="text-sm text-slate-900 font-semibold flex justify-start items-center gap-2 mb-2.5">
              <BiCheck className="size-8 text-emerald-500" />
              <span>
                Facile à assembler, propre et fabriqué avec des matériaux
                solides et de haute qualité
              </span>
            </li>
            <li className="text-sm text-slate-900 font-semibold flex justify-start items-center gap-2 mb-2.5">
              <BiCheck className="size-8 text-emerald-500" />
              <span>Un design élégant complète tout décor à la maison.</span>
            </li>
            <li className="text-sm text-slate-900 font-semibold flex justify-start items-center gap-2 mb-2.5">
              <BiCheck className="size-8 text-emerald-500" />
              <span>
                Utilisation polyvalente pour les chaussures, sacs, foulards,
                chapeaux, et plus encore.
              </span>
            </li>
            <li className="text-sm text-slate-900 font-semibold flex justify-start items-center gap-2 mb-2.5">
              <BiCheck className="size-8 text-emerald-500" />
              <span>
                Solution de stockage durable et peu encombrante pour les
                familles nombreuses
              </span>
            </li>
          </ul>
          <section className="flex justify-center items-center flex-col">
            <Image
              src={Adv}
              alt="Product"
              width={0}
              height={0}
              className="w-[70%] mb-5"
            />
            <Image
              src={Table}
              alt="Product"
              width={0}
              height={0}
              className="w-[70%]"
            />
          </section>
          <Countdown />
        </div>
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closePopup}
        >
          <div
            ref={popupRef}
            className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closePopup}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <Swiper
              spaceBetween={10}
              navigation={true}
              modules={[Navigation]}
              className="rounded-lg shadow-lg"
              initialSlide={selectedImageIndex}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-square relative">
                    <Image
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="object-cover"
                      fill
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
