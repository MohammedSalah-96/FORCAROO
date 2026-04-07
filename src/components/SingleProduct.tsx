import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import OtherPagesHero from "../components/OtherPagesHero";
import ProductRating from "../components/ProductRating";
import NotFound from "../components/NotFound";
import { useLocalizedData } from "../hooks/useLocalizedData";

const SingleProduct = () => {
  const { productsList } = useLocalizedData();
  const { productId } = useParams();
  const selectedProduct: any | undefined = productsList.find(
    (product) => product.id === Number(productId),
  );

  if (!selectedProduct) return <NotFound />;

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="single-product pt-24">
      <OtherPagesHero
        page_name={`Products/ ${selectedProduct.name}`}
        page_bg_img=""
      />

      <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 mt-16 mb-10 px-4">
        <div className="w-full lg:max-w-3/5 flex items-center gap-2">
          <div className="h-48 lg:h-64 w-full flex items-center justify-center p-3 lg:p-6 bg-zinc-100 border border-zinc-200">
            <img
              src={selectedProduct.productImg[0]}
              alt={selectedProduct.name}
              className="max-h-full w-full"
            />
          </div>
          <div className="h-48 lg:h-64 w-full flex items-center justify-center p-3 lg:p-6 bg-zinc-100 border border-zinc-200">
            <img
              src={selectedProduct.productImg[1]}
              alt={selectedProduct.name}
              className="max-h-full w-full"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex lg:flex-col items-start justify-between gap-1">
            <h3 className="mb-1 text-xl font-semibold">
              {selectedProduct.name}
            </h3>
            <ProductRating rating={selectedProduct.rating} />
          </div>
          <hr className="w-full mt-3 mb-2 lg:mb-5 border-zinc-200" />
          <p>{selectedProduct.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
