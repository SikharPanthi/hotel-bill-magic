
import React, { useState } from "react";
import { Hotel, Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Cart from "./Cart";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  cartItemCount: number;
  onCartOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onCartOpen }) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-hotel-navy text-white z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Hotel className="h-6 w-6 text-hotel-gold" />
          <span className="text-xl font-semibold">Sikhar Restaurant</span>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-hotel-gold transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="relative bg-transparent border-hotel-gold text-hotel-gold hover:bg-hotel-gold hover:text-white"
                onClick={onCartOpen}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] sm:w-[450px]">
              <Cart />
            </SheetContent>
          </Sheet>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button
              variant="outline"
              size="icon"
              className="md:hidden bg-transparent border-hotel-gold text-hotel-gold hover:bg-hotel-gold hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-hotel-navy border-t border-hotel-gold animate-fadeIn">
          <div className="container mx-auto px-4 py-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-3 text-white hover:text-hotel-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
