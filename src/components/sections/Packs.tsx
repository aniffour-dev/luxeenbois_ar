import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import reviews from "@/data/reviews.json"; // Adjust the path based on your directory structure

interface Review {
  name: string;
  review: string;
  rating: number;
  image: string; // This is the path to the image
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = Array.from({ length: rating }, (_, index) => (
    <FaStar key={index} className="text-amber-400 size-5" />
  ));
  return <div className="flex justify-center items-center gap-1 mb-4">{stars}</div>;
};

const Card: React.FC<Review> = ({ name, review, rating, image }) => {
  return (
    <div className="break-inside-avoid bg-white shadow-md overflow-hidden">
      <Image
        src={image}
        alt="Product"
        width={400}
        height={280}
        objectFit="cover"
        className="w-full h-auto"
      />
      <div className="p-3">
        <h4 className="text-center text-black font-semibold text-md my-4">{name}</h4>
        <StarRating rating={rating} />
        <p className="text-sm text-slate-600 text-center font-medium">{review}</p>
      </div>
    </div>
  );
};

const Packs: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto mb-16 px-6 lg:px-0 border-b-[1px] pb-10 border-slate-200">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review, index) => (
          <Card
            key={index}
            name={review.name}
            review={review.review}
            rating={review.rating}
            image={review.image}
          />
        ))}
      </section>
    </div>
  );
};

export default Packs;
