
import { jsPDF } from "jspdf";
import { CartItem } from "../components/Cart";

interface BillDetails {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  date: Date;
  orderNumber: string;
  paymentMethod?: string;
}

export const generatePDF = (billDetails: BillDetails): Blob => {
  const doc = new jsPDF();
  
  // Add hotel logo/header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("NEPALI RESTAURANT", 105, 20, { align: "center" });
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("123 Kathmandu Street, Thamel", 105, 30, { align: "center" });
  doc.text("Phone: 9867391430", 105, 35, { align: "center" });
  
  // Bill information
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("RECEIPT", 105, 50, { align: "center" });
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Date: ${billDetails.date.toLocaleDateString()}`, 20, 60);
  doc.text(`Time: ${billDetails.date.toLocaleTimeString()}`, 20, 65);
  doc.text(`Order #: ${billDetails.orderNumber}`, 20, 70);
  if (billDetails.paymentMethod) {
    doc.text(`Payment Method: ${billDetails.paymentMethod}`, 20, 75);
  }
  
  // Table headers
  doc.setFont("helvetica", "bold");
  let yPos = 85;
  doc.text("Item", 20, yPos);
  doc.text("Qty", 120, yPos);
  doc.text("Price", 150, yPos);
  doc.text("Amount", 180, yPos);
  
  doc.line(20, yPos + 2, 190, yPos + 2);
  
  // Table content
  yPos += 10;
  doc.setFont("helvetica", "normal");
  
  billDetails.items.forEach((item) => {
    doc.text(item.name, 20, yPos);
    doc.text(item.quantity.toString(), 120, yPos);
    doc.text(`$${item.price.toFixed(2)}`, 150, yPos);
    doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 180, yPos);
    yPos += 8;
  });
  
  doc.line(20, yPos, 190, yPos);
  yPos += 8;
  
  // Totals
  doc.text("Subtotal:", 140, yPos);
  doc.text(`$${billDetails.subtotal.toFixed(2)}`, 180, yPos);
  yPos += 8;
  
  doc.text("Tax:", 140, yPos);
  doc.text(`$${billDetails.tax.toFixed(2)}`, 180, yPos);
  yPos += 8;
  
  doc.setFont("helvetica", "bold");
  doc.text("Total:", 140, yPos);
  doc.text(`$${billDetails.total.toFixed(2)}`, 180, yPos);
  
  // Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text("Thank you for your visit. Please come again!", 105, 270, { align: "center" });
  
  return doc.output("blob");
};

export const downloadPDF = (billDetails: BillDetails): void => {
  const doc = generatePDF(billDetails);
  const url = URL.createObjectURL(doc);
  const link = document.createElement("a");
  link.href = url;
  link.download = `receipt-${billDetails.orderNumber}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
};
