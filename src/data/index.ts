import SliderOne from "@/assets/08.jpg";
import SliderTwo from "@/assets/hero2.jpg";
import SliderThree from "@/assets/09.jpg";

import Partner1 from "@/assets/partner-longi.svg";
import Partner2 from "@/assets/partner-jinko.png";
import Partner3 from "@/assets/partner-deye.png";
import Partner4 from "@/assets/partner-growatt.png";
import Partner5 from "@/assets/partner-voltronic.png";
import Partner6 from "@/assets/partner-camel.png";
import Partner7 from "@/assets/partner-sunpro.png";
import Partner8 from "@/assets/partner-sunergy.png";
import Partner9 from "@/assets/partner-afore.svg";

import { TrustedPartnersProps } from "../types";

export const homeSliderImages = [SliderOne, SliderTwo, SliderThree];

export const trustedPartners: TrustedPartnersProps[] = [
  { id: 1, imgUrl: Partner1, imgWidth: '90px' },
  { id: 2, imgUrl: Partner2, imgWidth: '110px' },
  { id: 3, imgUrl: Partner3, imgWidth: '90px' },
  { id: 4, imgUrl: Partner4, imgWidth: '130px' },
  { id: 5, imgUrl: Partner5, imgWidth: '180px' },
  { id: 6, imgUrl: Partner6, imgWidth: '70px' },
  { id: 7, imgUrl: Partner7, imgWidth: '120px' },
  { id: 8, imgUrl: Partner8, imgWidth: '100px' },
  { id: 9, imgUrl: Partner9, imgWidth: '80px' },
]

export const productsFilter = [
  { id: 0, categoryFilter: "all" },
  { id: 1, categoryFilter: "solar-panel" },
  { id: 2, categoryFilter: "inverter" },
  { id: 3, categoryFilter: "battery" },
  { id: 4, categoryFilter: "kit" }
];
