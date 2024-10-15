import React from 'react';
import { OrderItem } from '../types';

interface ReceiptProps {
  order: OrderItem[];
  total: number;
  username: string;
}

const Receipt: React.FC<ReceiptProps> = ({ order, total, username }) => {
  const receiptRef = React.useRef<HTMLDivElement>(null);

  const printReceipt = () => {
    const printContent = receiptRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent || '';
    window.print();
    document.body.innerHTML = originalContent;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div ref={receiptRef}>
        <h2 className="text-2xl font-bold mb-4">Cozy Corner Café Receipt</h2>
        <p className="mb-2">Customer: {username}</p>
        <p className="mb-4">Date: {new Date().toLocaleString()}</p>
        <table className="w-full mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left">Item</th>
              <th className="text-right">Qty</th>
              <th className="text-right">Price</th>
              <th className="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.map((item) => (
              <tr key={item.id} className="border-b">
                <td>{item.name}</td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right">${item.price.toFixed(2)}</td>
                <td className="text-right">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right font-bold">
          Total: ${total.toFixed(2)}
        </div>
      </div>
      <button
        onClick={printReceipt}
        className="mt-4 bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 transition-colors"
      >
        Print Receipt
      </button>
    </div>
  );
};

export default Receipt;