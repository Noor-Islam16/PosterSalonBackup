import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import images from "../../assets";

const imageList: string[] = [images.ads];

export default function AdsCarousel() {
  const [currentIndex] = useState(0);

  // const goToPrevious = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
  //   );
  // };

  // const goToNext = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  return (
    <Card className="relative w-full mx-auto overflow-hidden rounded-none shadow-lg bg-black border-0">
      {/* Left Arrow */}
      {/* <Button
        variant="ghost"
        className="absolute top-4 left-6 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
        onClick={goToPrevious}
      >
        <ChevronLeft size={24} />
      </Button> */}

      {/* Right Arrow */}
      {/* <Button
        variant="ghost"
        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75"
        onClick={goToNext}
      >
        <ChevronRight size={24} />
      </Button> */}

      {/* Images */}
      <CardContent
        className="flex transition-transform duration-500 ease-in-out bg-black border-0"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageList.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full flex-shrink-0 object-cover border-0"
          />
        ))}
      </CardContent>
    </Card>
  );
}
