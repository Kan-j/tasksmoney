"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { rechargeUser } from "@/lib/actions/recharge.actions"; 
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface RechargeOptionsSelectorProps {
  userId: string | null; // Pass userId as a prop
}

export default function RechargeOptionsSelector({ userId }: RechargeOptionsSelectorProps) {
  const presetAmounts = [10, 20, 50, 100, 200, 500];
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const router = useRouter(); // Initialize useRouter

  // Handle card selection
  const handleCardSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Clear custom amount if preset is selected
  };

  // Handle form submission
  const handleSubmit = async () => {
    const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

    if (!finalAmount || !userId) {
      alert("Invalid amount or user not authenticated.");
      return;
    }

    setIsLoading(true); // Set loading to true
    try {
      const response = await rechargeUser({ userId, amount: finalAmount });
      alert(`Recharge request submitted for ${finalAmount} USDT.`);
      router.push("/investor/dashboard/recharge"); // Navigate to the Recharge Requests page
    } catch (error) {
      console.error("Recharge request failed:", error);
      alert("Failed to submit recharge request. Please try again later.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      {/* Card Grid */}
      <div className="grid grid-cols-3 gap-4">
        {presetAmounts.map((amount) => (
          <div
            key={amount}
            className={`cursor-pointer border rounded-lg p-4 text-center transition-colors
              ${selectedAmount === amount ? "border-blue-500 bg-blue-100 text-orange-500" : "border-gray-300 hover:bg-gray-100"}
            `}
            onClick={() => handleCardSelect(amount)}
          >
            <p className="text-sm font-bold">Amount</p>
            <p className="font-bold text-2xl ">{amount} USDT</p>
          </div>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="mt-6">
        <label htmlFor="customAmount" className="block mb-2 text-sm">
          Enter your preferred amount
        </label>
        <input
          type="number"
          id="customAmount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelectedAmount(null); // Clear preset selection when custom input is used
          }}
          placeholder="Enter your preferred amount"
          className="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <Button onClick={handleSubmit} className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Proceed to Recharge"}
        </Button>
      </div>
    </div>
  );
}
