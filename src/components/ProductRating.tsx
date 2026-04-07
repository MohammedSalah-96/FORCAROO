import { Star } from "lucide-react";

const ProductRating = ({ rating }: { rating: number }) => {
  return (
    <div className="product-rating flex gap-1">
      {[1, 2, 3, 4, 5].map((i: number, index: number) =>
        i <= rating ? (
          <Star
            key={index}
            size={14}
            className="fill-forcarooLightGreen text-forcarooLightGreen border-0"
          />
        ) : (
          <Star
            key={index}
            size={14}
            className="text-forcarooLightGreen border-0"
          />
        )
      )}
    </div>
  );
};

export default ProductRating;
