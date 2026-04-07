import { useState } from "react";
import { productsFilter} from "../data";

import { motion, AnimatePresence } from "motion/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";

import { RiResetLeftFill } from "react-icons/ri";
import { HiViewfinderCircle } from "react-icons/hi2";

import { Link } from "react-router";
import ViewProduct from "../components/ViewProduct";
import ProductRating from "../components/ProductRating";
import { useTranslation } from "react-i18next";
import { formattedAmount } from "../lib/utils";
import { useLocalizedData } from "../hooks/useLocalizedData";

const Products = () => {
  const { t } = useTranslation();
  const { productsList } = useLocalizedData();
  const [filter, setFilter] = useState("all");
  const [showHideResetBtn, setShowHideResetBtn] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const filteredProducts =
    filter === "all"
      ? productsList
      : productsList.filter((product) => product.category === filter);

  const handleFilterEquipments = (category_filter: string) => {
    setFilter(category_filter);
    setShowHideResetBtn(!false);
  };

  return (
    <div className="products-details container mx-auto px-4 py-20 relative">
      <div className="flex flex-col justify-center items-start gap-4 md:gap-10 relative">
        <span className="watermark">{t("navLinks.products")}</span>
        <h4 className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10">
          {t("productsCompany.title")}
        </h4>
        <h2 className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize">
          {t("productsCompany.heading")}
        </h2>
        <p className="text-forcarooTextLight">
          {t("productsCompany.description")}
        </p>
      </div>

      <div className="my-0 lg:mt-8 p-8">
        <div className="w-full lg:hidden">
          {filter !== "all" && showHideResetBtn && (
            <div className="w-full mb-2 text-end">
              <button
                className="flex items-center justify-self-end gap-1 py-1 px-2 text-forcarooLightGreen font-medium rounded-lg"
                onClick={() => {
                  setFilter("all");
                  setSelectedValue(""); // this resets the Select to placeholder
                  setShowHideResetBtn(false); // optionally hide button after reset
                }}
              >
                <RiResetLeftFill /> reset filter
              </button>
            </div>
          )}
          <Select
            value={selectedValue}
            onValueChange={(value) => {
              setSelectedValue(value);
              handleFilterEquipments(value);
            }}
          >
            <SelectTrigger className="w-full text-primary-color font-medium uppercase">
              <SelectValue placeholder="FILTER Products" />
            </SelectTrigger>
            <SelectContent className="bg-slate-50">
              <SelectGroup>
                <SelectLabel className="text-primary-color">
                  Category
                </SelectLabel>
                {productsFilter.map((products: any) => (
                  <SelectItem
                    value={products.categoryFilter}
                    key={products.id}
                    className="text-forcarooTextLight text-base font-semibold capitalize"
                    // onClick={() =>
                    //   handleFilterEquipments(item.categoryFilter)
                    // }
                  >
                    {products.categoryFilter}
                  </SelectItem>
                ))}
              </SelectGroup>
              {/* <SelectItem value="light">Light</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden w-fit lg:flex flex-wrap items-center justify-center mx-auto py-2 px-3 bg-forcarooLightGreen/10 rounded-md">
          {productsFilter.map((product) => (
            <button
              key={product.id}
              className={`${
                filter === product.categoryFilter
                  ? "bg-forcarooLightGreen text-slate-50"
                  : "text-forcarooTextLight hover:text-forcarooText"
              } py-2 px-4 text-lg font-semibold rounded-lg cursor-pointer capitalize transition`}
              onClick={() => setFilter(product.categoryFilter)}
            >
              {product.categoryFilter}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.36 }}
                className="p-4 bg-white text-slate-800 border border-slate-300 rounded shadow-sm -shadow-sm relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h6 className="text-forcarooText text-xl font-semibold">
                      {product.name}
                    </h6>
                    <h4 className="my-1 text-forcarooText text-lg font-semibold">
                      {formattedAmount(product.price)} $
                    </h4>
                    <ProductRating rating={product.rating} />
                  </div>
                  <div className="absolute top-0 right-0 lg:-right-16 bg-slate-200/70 p-2 rounded-sm transition-all duration-500 group-hover:right-0 z-20">
                    <div className="flex flex-col gap-2">
                      <ViewProduct
                        productTitle={product.name}
                        productDesc={product.description}
                        productPrice={product.price}
                        productRating={product.rating}
                        productImg={product.productImg}
                      />
                      <div className="p-1 bg-white transition-all duration-300 hover:bg-forcarooText hover:text-slate-200">
                        <Link to={`/products/${product.id}`}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HiViewfinderCircle size={22} />
                            </TooltipTrigger>
                            <TooltipContent
                              side="left"
                              className="bg-forcarooText select-none"
                            >
                              <p>more details</p>
                            </TooltipContent>
                          </Tooltip>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-64 max-h-64 w-64 flex items-center justify-center mt-4 mx-auto relative">
                  <img
                    src={product.productImg}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Products;
