import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { IoStar } from "react-icons/io5";
import images from "../../assets";
import { URLS } from "../../lib/api"; // Import URLS from api lib

interface Product {
  product_src: string;
  product_name: string;
  id?: number;
}

interface CitizenKanePageProps {
  product: Product;
}

const sizes = [
  { label: '12" x 18"', dimensions: "30cm x 46cm", price: 19.99 },
  { label: '16" x 24"', dimensions: "41cm x 61cm", price: 24.99 },
  { label: '24" x 36"', dimensions: "61cm x 92cm", price: 29.99 },
  { label: '32" x 48"', dimensions: "82cm x 122cm", price: 39.99 },
];

const canvasSizes = [
  { label: '8" x 12"', dimensions: "21cm x 31cm", price: 34.99 },
  { label: '12" x 18"', dimensions: "31cm x 46cm", price: 44.99 },
  { label: '16" x 24"', dimensions: "41cm x 61cm", price: 54.99 },
];

export default function CitizenKanePage({ product }: CitizenKanePageProps) {
  const [selectedProduct, setSelectedProduct] = useState<"poster" | "canvas">(
    "poster"
  );
  const selectedSizes = selectedProduct === "canvas" ? canvasSizes : sizes;
  const [selectedSize, setSelectedSize] = useState(selectedSizes[0]);

  // Removed the navigate import and useNavigate() hook

  const handleBuyNow = () => {
    const orderDetails = {
      productName: product.product_name,
      productImage: product.product_src,
      productId: product.id,
      productType: selectedProduct,
      size: selectedSize.label,
      dimensions: selectedSize.dimensions,
      price: selectedSize.price,
      quantity: 1,
    };

    // Store order details in sessionStorage before redirecting
    sessionStorage.setItem("orderDetails", JSON.stringify(orderDetails));

    // Redirect to checkout URL instead of using navigate
    window.location.href = URLS.checkout;
  };

  return (
    <div className="flex flex-col lg:flex-row bg-black w-full text-white p-4 lg:p-8">
      {/* Left Section: Image */}
      <div className="flex-1 flex justify-center lg:justify-center">
        <img
          src={product?.product_src}
          alt={product?.product_name}
          className="w-full max-w-md"
        />
      </div>

      {/* Right Section: Product Details */}
      <div className="flex-1 space-y-4 p-4">
        <h1 className="text-xl lg:text-2xl font-bold text-yellow-400">
          {product?.product_name}
        </h1>
        <p className="text-base lg:text-lg">
          <span className="text-yellow-500">
            US${selectedSize.price.toFixed(2)}
          </span>
          <span className="ml-2 line-through text-gray-400">
            WAS US${(selectedSize.price * 2).toFixed(2)} (50% off)
          </span>
        </p>

        {/* Ratings */}
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <IoStar key={index} className="text-white fill-white" size={20} />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
          <Button className="rounded-none border-2 border-yellow-400 text-yellow-400 bg-black hover:bg-yellow-400 hover:text-black">
            View Reviews
          </Button>
          <Button className="rounded-none border-2 border-yellow-400 text-yellow-400 bg-black hover:bg-yellow-400 hover:text-black">
            Write a Review
          </Button>
        </div>

        {/* Product Type Selection */}
        <h2 className="text-lg font-semibold">1. Choose Product Type</h2>
        <div className="flex gap-4">
          <img
            src={images.poster}
            alt="Poster"
            className={`w-20 h-20 cursor-pointer ${
              selectedProduct === "poster" ? "border-2 border-yellow-400" : ""
            }`}
            onClick={() => setSelectedProduct("poster")}
          />
          <img
            src={images.canvas}
            alt="Canvas"
            className={`w-20 h-20 cursor-pointer ${
              selectedProduct === "canvas" ? "border-2 border-yellow-400" : ""
            }`}
            onClick={() => setSelectedProduct("canvas")}
          />
        </div>

        {/* Size Selection */}
        <h2 className="text-lg font-semibold">2. Choose Size:</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {selectedSizes.map((size) => (
            <Card
              key={size.label}
              className={`p-2 cursor-pointer rounded-none border-2 border-yellow-400 bg-black text-white ${
                selectedSize.label === size.label
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              <p className="font-bold text-center">{size.label}</p>
              <p className="text-sm text-center">{size.dimensions}</p>
            </Card>
          ))}
        </div>

        {/* Buttons */}
        <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 hover:border-none">
          Add to cart
        </Button>

        {/* Updated Buy Now button with new navigation approach */}
        <Button
          onClick={handleBuyNow}
          variant="outline"
          className="w-full border-yellow-400 text-yellow-400 bg-black hover:bg-gray-900 hover:text-white hover:border-none"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
