import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { CiImageOn } from "react-icons/ci";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom";
import ProductRating from "./ProductRating";
import { formattedAmount } from "../lib/utils";

const ViewProduct = ({
  productTitle,
  productDesc,
  productPrice,
  productRating,
  productImg,
}: {
  productTitle: string;
  productDesc: string;
  productPrice: number;
  productRating: number;
  productImg: string;
}) => {
  return (
    <Dialog>
      <div className="p-1 bg-white transition-all duration-300 hover:bg-forcarooText hover:text-slate-200">
        <Link to="">
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <CiImageOn size={22} />
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-forcarooText select-none">
              <p>quick view</p>
            </TooltipContent>
          </Tooltip>
        </Link>
      </div>

      <DialogContent className="h-auto lg:w-1/2">
        <DialogHeader hidden>
          <DialogTitle hidden>View Product</DialogTitle>
          <DialogDescription hidden>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mt-4">
          <div className="h-64 max-h-64 w-full bg-zinc-100 border border-zinc-200">
            <img
              src={productImg}
              alt={productTitle}
              className="h-full w-full"
            />
          </div>
          <div className="w-full">
            <h3 className="mb-1 text-lg font-semibold">{productTitle}</h3>
            <h4 className="my-1 text-forcarooText text-lg font-semibold">
              {formattedAmount(productPrice)} $
            </h4>
            <ProductRating rating={productRating} />
            <hr className="w-3/5 mt-3 mb-5 border-zinc-200" />
            <p>{productDesc}</p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="w-full max-w-full">
              Close
            </Button>
          </DialogClose>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProduct;
