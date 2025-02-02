// components/custom/PromotionsCard.tsx
import PromotionCard from './PromotionCard';
import { Button } from "@/components/ui/button";
import { IPromotion } from '@/lib/models/Promotion.model'; // Assuming you have an interface for Promotion

interface PromotionsCardProps {
  promotions: IPromotion[]; // Define prop type for promotions
}

const PromotionsCard: React.FC<PromotionsCardProps> = ({ promotions }) => {
  return (
    <div className="space-y-4">
      {promotions.length > 0 ? (promotions.map((promo) => (
        <PromotionCard 
          key={promo.id} 
          promotion={promo} 
        />
      ))):(
        <p className="text-gray-500 text-lg">No promotions available.</p> 
      )}
    </div>
  );
};

export default PromotionsCard;
