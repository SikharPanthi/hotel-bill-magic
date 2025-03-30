
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
  total: number;
  orderNumber: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentComplete,
  total,
  orderNumber
}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-center text-sm text-gray-500">
            This is a demo application. No real payment will be processed.
          </p>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Order Number</span>
              <span>{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-hotel-navy hover:bg-hotel-navy/90"
            disabled={isProcessing}
            onClick={handlePayment}
          >
            {isProcessing ? "Processing..." : "Complete Payment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
