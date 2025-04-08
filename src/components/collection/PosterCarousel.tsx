import { FC } from "react";
import { Card, CardContent } from "../ui/card";

interface PosterCarouselProps {
  banner?: string;
}

const PosterCarousel: FC<PosterCarouselProps> = ({ banner }) => {
  if (!banner) return null; // Avoid rendering if no banner is provided

  return (
    <Card className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg bg-black border-0">
      <CardContent className="flex transition-transform duration-500 ease-in-out bg-black border-0">
        <img
          src={banner}
          alt="Banner"
          className="w-full flex-shrink-0 object-cover border-0"
        />
      </CardContent>
    </Card>
  );
};

export default PosterCarousel;
