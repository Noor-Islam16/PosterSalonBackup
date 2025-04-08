import { FC } from "react";
import { Card, CardContent } from "../ui/card";

interface ImageCarouselProps {
  topBanner?: string;
}

const ImageCarousel: FC<ImageCarouselProps> = ({ topBanner }) => {
  if (!topBanner) return null;

  return (
    <Card className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg bg-black border-0">
      <CardContent
        className="flex transition-transform duration-500 ease-in-out bg-black border-0"
      >
        <div className="w-full flex-shrink-0">
          <img
            src={topBanner}
            alt="Banner"
            className="w-full h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[600px] object-cover border-0"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCarousel;
