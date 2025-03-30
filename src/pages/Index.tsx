
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItem, getMenuItemsByCategory } from "@/utils/menuData";
import MenuCard from "@/components/MenuCard";
import Navbar from "@/components/Navbar";
import { CartProvider, useCart } from "@/components/Cart";

const categories = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "desserts", label: "Desserts" },
  { id: "beverages", label: "Beverages" },
];

const IndexContent = () => {
  const { items, addItem } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <Navbar cartItemCount={items.reduce((sum, item) => sum + item.quantity, 0)} onCartOpen={handleCartOpen} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center bg-gray-900">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1514516816566-de580c621376?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt="Luxury Hotel Restaurant"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="relative z-10 text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Fine Dining Experience</h1>
            <p className="text-lg md:text-xl mb-8">
              Indulge in exquisite cuisine crafted by our award-winning chefs using the finest seasonal ingredients.
            </p>
            <a href="#menu" className="bg-hotel-gold hover:bg-hotel-gold/90 text-white font-semibold py-3 px-8 rounded-md inline-block transition-colors">
              View Menu
            </a>
          </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-16 bg-hotel-cream">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-hotel-navy mb-12">
              Our Menu
            </h2>

            <Tabs defaultValue="breakfast" className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center mb-8">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-hotel-navy data-[state=active]:text-white"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getMenuItemsByCategory(category.id as MenuItem["category"]).map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Our Restaurant"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-hotel-navy mb-6">About Our Restaurant</h2>
                <p className="text-gray-700 mb-4">
                  Nestled within our luxury hotel, our restaurant offers an unparalleled dining experience that combines exquisite cuisine with elegant ambiance.
                </p>
                <p className="text-gray-700 mb-4">
                  Our team of award-winning chefs crafts each dish with precision and creativity, using only the finest seasonal ingredients sourced from local farmers and premium suppliers.
                </p>
                <p className="text-gray-700">
                  Whether you're joining us for a casual breakfast, business lunch, or romantic dinner, we promise a memorable culinary journey that delights all your senses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-hotel-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Make a Reservation</h2>
            <p className="mb-8 max-w-2xl mx-auto text-lg">
              For reservations, special events, or any inquiries, please don't hesitate to contact us.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-hotel-navy/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-hotel-gold">Location</h3>
                <p>123 Elegant Street</p>
                <p>Cityville, State 12345</p>
              </div>
              
              <div className="bg-hotel-navy/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-hotel-gold">Hours</h3>
                <p>Breakfast: 7:00 AM - 10:30 AM</p>
                <p>Lunch: 12:00 PM - 2:30 PM</p>
                <p>Dinner: 6:00 PM - 10:00 PM</p>
              </div>
              
              <div className="bg-hotel-navy/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-hotel-gold">Contact</h3>
                <p>Phone: (555) 123-4567</p>
                <p>Email: dining@luxuryhotel.com</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-black text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} Luxury Hotel. All rights reserved.</p>
            <p className="mt-2 text-gray-400 text-sm">
              This is a demo application created for educational purposes.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

const Index = () => {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
};

export default Index;
