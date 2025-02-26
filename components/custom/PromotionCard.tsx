"use client"
// components/custom/PromotionCard.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiTrash2 } from "react-icons/fi";
import { IPromotion } from "@/lib/models/Promotion.model"; // Assuming you have an interface for Promotion
import { deletePromotion, togglePromotionActive } from "@/lib/actions/promotion.actions";
import { toast } from "sonner";

interface PromotionCardProps {
  promotion: any; // Define prop type for promotion
}

 // Function to handle deletion of a promotion
 const handleDelete = async (id: string) => {
  const confirmed = confirm("Are you sure you want to delete this promotion?");
  if (confirmed) {
    try {
      await deletePromotion(id);
      window.location.reload();
      toast.success("Promotion deleted successfully!");
      // Optionally refresh the page or update the state here
    } catch (error) {
      console.error("Error deleting promotion:", error);
      toast.error("Failed to delete the promotion.");
    }
  }
};

// Function to handle toggling active state
const handleToggleActive = async (id: string, isActive: boolean) => {
  try {
    await togglePromotionActive(id, { isActive }); // Call server action to toggle active state
    toast.success(`Promotion ${!isActive ? 'deactivated' : 'activated'} successfully!`);
    window.location.reload();
    // Optionally refresh the page or update the state here
  } catch (error) {
    console.error("Error toggling promotion active state:", error);
    toast.error("Failed to toggle promotion active state.");
  }
};


const PromotionCard: React.FC<PromotionCardProps> = ({ promotion }) => {
  return (
    <Card className="relative border border-gray-300">
      {/* Promotions Badge */}
      <Badge variant="secondary" className="absolute top-2 right-2 bg-black text-mainColor px-3 py-1">
        Promotions
      </Badge>
      
      {/* Card Content */}
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-bold">{promotion.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-gray-500 mt-4">{promotion.description}</p>
      </CardContent>

      {/* Action Icons (Toggle Active/Delete) */}
      <div className="flex justify-end items-center p-4 space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToggleActive(promotion._id, !promotion.isActive)} // Toggle active state
        >
          {promotion.isActive ? 'Deactivate' : 'Activate'} {/* Button text changes based on isActive */}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleDelete(promotion._id)} // Handle delete action
        >
          <FiTrash2 className="text-gray-500" size={20} />
        </Button>
      </div>
    </Card>
  );
};

export default PromotionCard;
