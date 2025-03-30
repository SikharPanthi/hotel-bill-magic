
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuItem } from "@/utils/menuData";
import { toast } from "sonner";

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(item);
    toast.success(`Added ${item.name} to cart`);
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg border border-gray-200">
      <div className="h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-hotel-navy">{item.name}</CardTitle>
        <p className="text-hotel-gold font-semibold">NPR {item.price.toFixed(0)}</p>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-hotel-navy text-white hover:bg-hotel-gold"
          onClick={handleAddToCart}
        >
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
