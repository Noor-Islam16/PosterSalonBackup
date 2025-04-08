import images from "../../assets";
import ProductCarousel from "./Carousel"; // Updated import to use the renamed component

// Data for new arrivals
const newArrivals = [
  {
    image: images.Propaganda,
    name: "Propaganda",
    oldPrice: "$39.99",
    newPrice: "$19.99",
  },
  {
    image: images.Anime,
    name: "Anime",
    oldPrice: "$39.99",
    newPrice: "$19.99",
  },
  {
    image: images.pinup,
    name: "Pin Ups",
    oldPrice: "$39.99",
    newPrice: "$19.99",
  },
  {
    image: images.Kitsch,
    name: "Kitsch",
    oldPrice: "$39.99",
    newPrice: "$19.99",
  },
];

// Data for popular posters
const popularPosters = [
  {
    image: images.Propaganda1,
    name: "Propaganda",
    oldPrice: "$39.99",
    newPrice: "$19.99",
  },
  {
    image: images.Anime1,
    name: "Anime",
    oldPrice: "$39.99",
    newPrice: "$19.99",
  },
  {
    image: images.pinup1,
    name: "Pin Ups",
    oldPrice: "$39.99",
    newPrice: "$19.99",
  },
  {
    image: images.Kitsch1,
    name: "Kitsch",
    oldPrice: "$39.99",
    newPrice: "$19.99",
  },
];

export default function PostersPage() {
  return (
    <div className="bg-black flex items-center justify-center p-4 font-poppins">
      <div className="bg-gray-800 text-white max-w-[90%] rounded-lg shadow-xl p-6 md:p-8 lg:p-10 w-full">
        {/* Updated component name to ProductCarousel */}
        <ProductCarousel title="NEW ARRIVAL" items={newArrivals} />
        <ProductCarousel title="POPULAR POSTERS" items={popularPosters} />
      </div>
    </div>
  );
}
