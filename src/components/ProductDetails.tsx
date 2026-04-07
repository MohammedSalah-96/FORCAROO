import { useLocation, useParams } from "react-router";
// import { ProductTypesProps } from "../types";
import NotFound from "./NotFound";
import CallBanner from "./CallBanner";
import TrustedPartners from "./TrustedPartners";
import { useLocalizedData } from "../hooks/useLocalizedData";
import { formattedAmount } from "../lib/utils";
import ProductRating from "./ProductRating";
import { useEffect } from "react";

const ProductDetails = () => {
  const { productsList } = useLocalizedData();
  const { productId } = useParams();
  const product: any | undefined = productsList.find(
    (product) => product.id === Number(productId),
  );

  if (!product) return <NotFound />;

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="product-details pt-36">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 py-8 px-6 bg-white border-4 lg:border-8 border-slate-300/90 rounded-lg shadow-md transition-transform duration-300 select-none relative">
          <div
            className="product-img mx-auto md:mx-0"
            // style={{ width: product?.imgWidth }}
          >
            <img
              src={product?.productImg}
              alt="Kartal Energy Services"
              className="w-40"
              loading="lazy"
            />
          </div>
          <h4 className="mt-4 text-cyan-700 text-lg font-bold uppercase text-center md:text-start">
            {product?.category}
          </h4>
          <h5 className="text-cyan-700 font-semibold text-center md:text-start">
            {product?.name}
          </h5>
          <p className="flex-grow text-base text-zinc-600 px-0 lg:px-8">
            {formattedAmount(product?.price)} $
          </p>
          <ProductRating rating={product?.rating} />
          <p className="flex-grow text-base text-zinc-600 px-0 lg:px-8">
            {product?.description}
          </p>
        </div>

        <CallBanner addClass="px-0" />
      </div>
      <TrustedPartners />
    </div>
  );
};

export default ProductDetails;
