import React from "react";
import { Card } from "../ui/card";

interface CategoryCardProps {
  name: string;
  image: string;
  itemCount: number;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  image,
  itemCount,
  onClick,
}) => {
  return (
    <Card
      className="flex-shrink-0 w-48 p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square bg-gray-100 rounded-lg mb-3">
        <img
          src={image || "/api/placeholder/150/150"}
          alt={name}
          className="w-full h-full object-contain p-2"
        />
      </div>
      <h3 className="font-medium text-center">{name}</h3>
      <p className="text-sm text-gray-500 text-center">{itemCount} Items</p>
    </Card>
  );
};

export default CategoryCard;
