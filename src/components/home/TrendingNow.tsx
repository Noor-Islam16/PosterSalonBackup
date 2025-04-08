import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

interface TrendingItem {
  id: string;
  product_src: string;
  product_name: string;
}

interface TrendingNowProps {
  data?: TrendingItem[];
}

const TrendingNow: FC<TrendingNowProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Format product names for URL-friendly slugs
  const formatProductName = (name: string) => 
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <div className="bg-black text-[#F8C900] p-6 flex flex-col items-center font-poppins">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">TRENDING NOW</h1>

      {/* Cards Section with Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {data.map((item) => (
          <Link
            key={item.id}
            to={`/product/${formatProductName(item.product_name)}/${item.id}`}
            className="block w-full"
          >
            <div className="flex flex-col items-center">
              {/* Card */}
              <Card className="w-full bg-white p-4 shadow-lg rounded-none hover:scale-105 transition-transform hover:shadow-xl">
                <CardContent className="flex flex-col items-center">
                  <img
                    src={item.product_src}
                    alt={item.product_name}
                    className="w-full h-[300px] object-cover rounded-lg"
                  />
                </CardContent>
              </Card>

              {/* Title (Centered Below Card) */}
              <h2 className="text-[#F8C900] mt-3 text-center font-semibold text-lg truncate w-full">
                {item.product_name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
