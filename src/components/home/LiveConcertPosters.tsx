import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface LiveConcertPostersProps {
  concertCategories?: Record<string, string>; // Key-value pairs
}

const LiveConcertPosters: FC<LiveConcertPostersProps> = ({ concertCategories }) => {
  if (!concertCategories || Object.keys(concertCategories).length === 0) return null;

  return (
    <div className="font-poppins bg-black text-[#F8C900] p-6 w-full flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
      {/* Left-aligned Title for Desktop, Centered for Mobile */}
      <h1 className="text-3xl md:text-[36px] font-bold text-center md:text-left">
        Live Concert <br className="hidden md:block" /> Posters:
      </h1>

      {/* Category Buttons with Links */}
      <div className="flex flex-wrap justify-start w-full md:w-auto gap-4 md:gap-x-16">
        {Object.entries(concertCategories).map(([category, value]) => (
          <Link key={category} to={`/products/${value}`}>
            <Button
              variant="outline"
              className="bg-black border-[#F8C900] text-[#F8C900] hover:bg-[#F8C900] hover:text-black px-4 py-2 text-sm md:text-base whitespace-nowrap"
            >
              {category}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LiveConcertPosters;
