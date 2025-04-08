import { FC } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
interface ProductData {
  id: string;
  product_name: string;
  product_src: string;
}

interface MoviePostersProps {
  products: ProductData[];
  categoryName: string;
}

const MoviePosters: FC<MoviePostersProps> = ({ products, categoryName }) => {
  if (!products.length) return <p className="text-white text-center py-10">No products found.</p>;

  // Format product names for URL-friendly slugs
  const formatProductName = (name: string) => 
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <div className="bg-black text-[#F8C900] p-4 sm:p-8 font-poppins">
      {/* Title with Left & Right Lines */}
      <div className="flex items-center justify-center w-full sm:w-1/2 mx-auto mb-4">
        <div className="flex-1 border-t border-[#F8C900]"></div>
        <h1 className="text-2xl sm:text-3xl font-bold mx-4 whitespace-nowrap">
          {categoryName}
        </h1>
        <div className="flex-1 border-t border-[#F8C900]"></div>
      </div>

      {/* Grid Layout for Posters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${formatProductName(product.product_name)}/${product.id}`}
            className="block"
          >
            <Card className="bg-black shadow-lg w-full h-full flex flex-col justify-between hover:scale-105 transition-transform hover:shadow-xl">
              <CardContent className="p-4 flex flex-col items-center">
                <img
                  src={product.product_src}
                  alt={product.product_name}
                  className="w-full h-[300px] object-cover"
                />
                <h2 className="text-center sm:text-start text-base sm:text-lg font-medium mt-2 text-[#F8C900] w-full h-12 truncate">
                  {product.product_name}
                </h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviePosters;
