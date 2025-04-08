import { FC } from "react";
import { Card, CardContent } from "../ui/card";

interface MoviePosterCarouselProps {
  elvisBanner: string;
}

const MoviePosterCarousel: FC<MoviePosterCarouselProps> = ({ elvisBanner }) => {
  return (
    <Card className="relative w-full mx-auto overflow-hidden rounded-lg shadow-lg bg-black border-0">
      {/* Image */}
      <CardContent className="flex bg-black border-0">
        <img
          src={elvisBanner}
          alt="Elvis Banner"
          className="w-full flex-shrink-0 object-cover border-0"
        />
      </CardContent>
    </Card>
  );
};

export default MoviePosterCarousel;
