
import React, { useContext, useState, createContext } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MenuItem, getMenuItemById } from "@/utils/menuData";
import { downloadPDF } from "@/utils/pdfGenerator";
import { Check, Download, Receipt, X, CreditCard, QrCode, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define payment method type
type PaymentMethod = "card" | "esewa" | "phone";

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => {
    subtotal: number;
    tax: number;
    total: number;
  };
}

// Create the cart context
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => ({ subtotal: 0, tax: 0, total: 0 }),
});

// Custom hook for accessing the cart context
export const useCart = () => useContext(CartContext);

// CartProvider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const taxRate = 0.08; // 8% tax rate

  const addItem = (menuItem: MenuItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === menuItem.id);
      
      if (existingItem) {
        return prevItems.map((item) => 
          item.id === menuItem.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        }];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems((prevItems) => 
      prevItems.map((item) => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Cart component
const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isPaid, setIsPaid] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const { subtotal, tax, total } = getCartTotal();
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  const handlePayment = () => {
    setIsPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setIsPaid(true);
      toast.success("Payment successful!", {
        description: "Your order has been processed."
      });
    }, 1500);
  };

  const handleDownloadReceipt = () => {
    downloadPDF({
      items,
      subtotal,
      tax,
      total,
      date: new Date(),
      orderNumber,
      paymentMethod: paymentMethod === "card" ? "Credit Card" : 
                     paymentMethod === "esewa" ? "eSewa" : "Phone Payment",
    });
  };

  const startNewOrder = () => {
    clearCart();
    setIsPaid(false);
  };

  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="text-left border-b pb-4">
        <SheetTitle className="flex items-center">
          <Receipt className="mr-2 h-5 w-5" />
          Your Order
        </SheetTitle>
      </SheetHeader>
      
      {items.length === 0 && !isPaid && (
        <div className="flex flex-col items-center justify-center flex-grow py-10">
          <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
          <p className="text-gray-400 text-sm mt-2">Add items from the menu to get started</p>
        </div>
      )}

      {items.length > 0 && !isPaid && (
        <>
          <ScrollArea className="flex-grow">
            <div className="space-y-4 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-grow">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <span>-</span>
                    </Button>
                    <span className="mx-2 w-8 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <span>+</span>
                    </Button>
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 ml-2"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-4 bg-hotel-gold hover:bg-hotel-gold/90">
                  Proceed to Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Complete Your Payment</DialogTitle>
                </DialogHeader>
                
                <div className="py-4">
                  <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Card</span>
                      </TabsTrigger>
                      <TabsTrigger value="esewa" className="flex items-center gap-2">
                        <QrCode className="h-4 w-4" />
                        <span>eSewa</span>
                      </TabsTrigger>
                      <TabsTrigger value="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>Phone</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="cardNumber">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-navy/30"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="expiry">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="expiry"
                              placeholder="MM/YY"
                              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-navy/30"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="cvc">
                              CVC
                            </label>
                            <input
                              type="text"
                              id="cvc"
                              placeholder="123"
                              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-navy/30"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium" htmlFor="nameOnCard">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="nameOnCard"
                            placeholder="John Doe"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hotel-navy/30"
                          />
                        </div>
                        
                        <p className="text-center text-sm text-gray-500 mt-2">
                          This is a demo application. No real payment will be processed.
                        </p>
                      </div>
                      
                      <div className="space-y-2 pt-2 border-t">
                        <div className="flex justify-between">
                          <span>Order Number</span>
                          <span>{orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Amount</span>
                          <span className="font-medium">${total.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-hotel-navy hover:bg-hotel-navy/90"
                        disabled={isPaymentProcessing}
                        onClick={handlePayment}
                      >
                        {isPaymentProcessing ? "Processing..." : "Complete Payment"}
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="esewa" className="space-y-4">
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-4 text-center">
                          <p className="font-medium">Scan with eSewa app to pay</p>
                          <p className="text-sm text-gray-500 mt-1">Sikhar Panthi</p>
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg mb-4">
                          <img 
                            src="/lovable-uploads/286b17d8-1b06-400d-b652-937743aca110.png" 
                            alt="eSewa QR Code" 
                            className="w-64 h-auto"
                          />
                        </div>
                        
                        <p className="text-sm text-gray-500 text-center">
                          After scanning, click the button below to confirm payment
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full bg-[#60BB46] hover:bg-[#60BB46]/90 text-white"
                        disabled={isPaymentProcessing}
                        onClick={handlePayment}
                      >
                        {isPaymentProcessing ? "Verifying..." : "I've Paid with eSewa"}
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="phone" className="space-y-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-4">
                          <p className="font-medium">Pay via Phone</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Call or send payment to the number below
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 w-full p-4 rounded-lg mb-4 flex flex-col items-center">
                          <p className="text-2xl font-bold mb-1">9867391430</p>
                          <p className="text-gray-500">Sikhar Panthi</p>
                        </div>
                        
                        <p className="text-sm text-gray-500">
                          After sending the payment, click the button below to confirm
                        </p>
                      </div>
                      
                      <Button 
                        className="w-full bg-hotel-navy hover:bg-hotel-navy/90"
                        disabled={isPaymentProcessing}
                        onClick={handlePayment}
                      >
                        {isPaymentProcessing ? "Verifying..." : "I've Sent the Payment"}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}

      {isPaid && (
        <div className="flex flex-col items-center justify-center flex-grow py-8">
          <div className="mb-6">
            <div className="rounded-full bg-green-100 p-3 mb-4 mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-center">Payment Complete</h3>
            <p className="text-gray-500 text-center mt-1">
              Thank you for your order!
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number</span>
                <span>{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span>
                  {paymentMethod === "card" ? "Credit Card" : 
                   paymentMethod === "esewa" ? "eSewa" : "Phone Payment"}
                </span>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline"
            className="mb-2 w-full flex items-center justify-center"
            onClick={handleDownloadReceipt}
          >
            <Download className="mr-2 h-4 w-4" /> Download Receipt
          </Button>
          
          <Button 
            variant="link" 
            className="text-hotel-gold"
            onClick={startNewOrder}
          >
            Start a new order
          </Button>
        </div>
      )}
    </div>
  );
};

// Helper component to use with lucide-react
const ShoppingCart = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );
};

export default Cart;
