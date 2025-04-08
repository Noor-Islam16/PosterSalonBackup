import { FC, useState } from "react";
import { Card, CardContent } from "../ui/card";

interface ArtCarouselProps {
  artNouveauBanner: string;
}

const ArtCarousel: FC<ArtCarouselProps> = ({ artNouveauBanner }) => {
  const [currentIndex] = useState(0);

  return (
    <Card className="relative w-full mx-auto overflow-hidden rounded-none shadow-lg bg-black border-0">
      <CardContent
        className="flex transition-transform duration-500 ease-in-out bg-black border-0"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {artNouveauBanner && (
          <img
            src={artNouveauBanner}
            alt="Art Nouveau Banner"
            className="w-full flex-shrink-0 object-cover border-0"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ArtCarousel;
