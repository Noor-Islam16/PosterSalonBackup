import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  weight?: string;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  rating,
  weight,
  onAddToCart,
}) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gray-50 rounded-lg mb-4">
        <img
          src={image || "/api/placeholder/200/200"}
          alt={name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      <h3 className="font-medium mb-1">
        {name}
        {weight && <span className="text-gray-500"> - {weight}</span>}
      </h3>

      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">${price.toFixed(2)}</span>
        <Button
          variant="outline"
          size="sm"
          className="text-emerald-600 border-emerald-600 hover:bg-emerald-50"
          onClick={onAddToCart}
        >
          Add
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
