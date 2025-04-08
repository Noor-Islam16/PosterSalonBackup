import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

interface ExploreProps {
  data?: { id: string; product_src?: string; product_name?: string; title?: string }[];
}

const Explore: FC<ExploreProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Format product names for URL-friendly slugs
  const formatProductName = (name: string) =>
    name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <div className="bg-black text-[#F8C900] p-6 flex flex-col items-center font-poppins">
      <h1 className="text-3xl font-bold mb-6">EXPLORE YOUR OPTIONS</h1>

      {/* Cards Section with Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {data.map((item) => (
          <Link
            key={item.id}
            to={`/product/${formatProductName(item.product_name || "")}/${item.id}`}
            className="block w-full"
          >
            <div className="flex flex-col items-center">
              {/* Card */}
              <Card className="w-full bg-black p-4 shadow-lg rounded-none border-0 hover:scale-105 transition-transform hover:shadow-xl">
                <CardContent className="flex flex-col items-center">
                  {item.product_src ? (
                    <img
                      src={item.product_src}
                      alt={item.product_name || "Product Image"}
                      className="w-full h-[300px] object-cover rounded-none"
                    />
                  ) : (
                    <div className="w-full h-[300px] flex items-center justify-center bg-gray-800 text-white">
                      No Image Available
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Title (Centered Below Card) */}
              {item.title && (
                <h2 className="text-[#F8C900] mt-3 text-center font-semibold text-lg truncate w-full">
                  {item.title}
                </h2>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Explore;
