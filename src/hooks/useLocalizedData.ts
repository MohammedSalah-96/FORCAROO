import ProductsImg1 from "../assets/ProductImg1.png";
import ProductsImg2 from "../assets/ProductImg2.png";
import ProductsImg3 from "../assets/ProductImg3.jpg";
import ProductsImg4 from "../assets/ProductImg4.jpg";
import ProductsImg5 from "../assets/ProductImg5.jpg";
import ProductsImg6 from "../assets/ProductImg6.jpg";
import ProductsImg7 from "../assets/ProductImg7.jpg";
import ProductsImg8 from "../assets/ProductImg8.jpg";
import ProductsImg9 from "../assets/ProductImg9.jpg";

import FirstServiceImg from "@/assets/green-energy.png";
import SecondServiceImg from "@/assets/solar-panel.png";
import ThirdServiceImg from "@/assets/services8.png";
import SixthServiceImg from "@/assets/eco-house.png";
import SeventhServiceImg from "@/assets/services6.png";
import EighthServiceImg from "@/assets/ev-charging-station.png";
import TenthServiceImg from "@/assets/battery-recycling.png";

import FirstWorkProcessIcon from "../assets/work-process-planning.svg";
import SecondWorkProcessIcon from "../assets/work-process-research.svg";
import ThirdWorkProcessIcon from "../assets/work-process-installation.svg";

import Blog01 from "../assets/blog-01.jpg";
import Blog02 from "../assets/blog-02.jpg";
import Blog03 from "../assets/blog-03.jpg";
import Blog04 from "../assets/blog-04.jpg";
import Blog05 from "../assets/blog-05.jpg";
import Blog06 from "../assets/blog-06.jpg";

import {
  ServiceTypesProps,
  NavbarLinksProps,
  WorkProcessDetailsProps,
} from "../types";
import { useTranslation } from "react-i18next";

export const useLocalizedData = () => {
  const { t } = useTranslation();
  const navLinks: NavbarLinksProps[] = [
    { name: t("navLinks.home"), path: "/" },
    { name: t("navLinks.about"), path: "/about" },
    { name: t("navLinks.products"), path: "/products" },
    { name: t("navLinks.services"), path: "/services" },
    // { name: t('navLinks.blog'), path: "/blog" },
    { name: t("navLinks.contact"), path: "/contact" },
  ];

  const homeSliderTitles: string[] = t("homeSlider.homeSliderTitles", {
    returnObjects: true,
  }) as string[];

  const homeSliderDescriptions: string[] = t(
    "homeSlider.homeSliderDescriptions",
    { returnObjects: true },
  ) as string[];

  //   const companyServices: ServicesProps[] = titles.map((title, index) => ({
  //   id: index + 1,
  //   icon: icons[index],
  //   title,
  //   description: descriptions[index],
  //   deeperDescription: deepDescriptions[index],
  //   pageImg: servicesPageImg[index],
  // }));

  const productsList = [
    {
      id: 1,
      name: "SOLARPANEL-100W",
      description:
        "100W Monocrystalline Solar Panel - High Efficiency for Off-Grid Systems",
      price: 89.0,
      category: "solar-panel",
      rating: 4.5,
      max: 0.1,
      productImg: ProductsImg1,
    },
    {
      id: 2,
      name: "SOLARPANEL-400W",
      description:
        "400W Monocrystalline Solar Panel - Premium Grade for Home Systems",
      price: 249.0,
      category: "solar-panel",
      rating: 4.7,
      max: 0.4,
      productImg: ProductsImg2,
    },
    {
      id: 3,
      name: "INVERTER-3KW",
      description: "3kW Solar Inverter - Pure Sine Wave, MPPT, Hybrid Ready",
      price: 399.0,
      category: "inverter",
      rating: 4.6,
      productImg: ProductsImg3,
    },
    {
      id: 4,
      name: "INVERTER-5KW",
      description: "5kW Solar Inverter - Grid-Tied with Smart Monitoring",
      price: 599.0,
      category: "inverter",
      rating: 4.8,
      productImg: ProductsImg4,
    },
    {
      id: 5,
      name: "INVERTER-7KW",
      description: "7kW Solar Inverter - Pure Sine Wave, MPPT, Hybrid Ready",
      price: 499.0,
      category: "inverter",
      rating: 4.6,
      productImg: ProductsImg5,
    },
    {
      id: 6,
      name: "BATTERY-LFP-5KWH",
      description:
        "5kWh Lithium Iron Phosphate (LiFePO4) Battery - Long Cycle Life",
      price: 950.0,
      category: "battery",
      rating: 4.4,
      productImg: ProductsImg6,
    },
    {
      id: 7,
      name: "BATTERY-GEL-2KWH",
      description:
        "2kWh Deep Cycle Gel Battery - Maintenance-Free Backup Power",
      price: 360.0,
      category: "battery",
      rating: 4.2,
      productImg: ProductsImg7,
    },
    {
      id: 8,
      name: "BATTERY-GEL-3KWH",
      description:
        "3kWh Deep Cycle Gel Battery - Maintenance-Free Backup Power",
      price: 260.0,
      category: "battery",
      rating: 4.6,
      productImg: ProductsImg8,
    },
    {
      id: 9,
      name: "SOLAR-KIT-1KW",
      description:
        "1kW Complete Solar Kit (Panels, Inverter, Mounting, Cables)",
      price: 999.0,
      category: "kit",
      rating: 4.5,
      productImg: ProductsImg9,
    },
  ];

  const kartalServices: ServiceTypesProps[] = [
    {
      id: 1,
      imgSrc: FirstServiceImg,
      imgWidth: 64,
      service: t("servicesCompany.services.energyDesign.service"),
      title: t("servicesCompany.services.energyDesign.title"),
      description: t("servicesCompany.services.energyDesign.description"),
    },
    {
      id: 2,
      imgSrc: SecondServiceImg,
      imgWidth: 64,
      service: t("servicesCompany.services.solarEnergySupply.service"),
      title: t("servicesCompany.services.solarEnergySupply.title"),
      description: t("servicesCompany.services.solarEnergySupply.description"),
    },
    {
      id: 3,
      imgSrc: ThirdServiceImg,
      imgWidth: 80,
      service: t("servicesCompany.services.solarPanelSolutions.service"),
      title: t("servicesCompany.services.solarPanelSolutions.title"),
      description: t(
        "servicesCompany.services.solarPanelSolutions.description",
      ),
    },
    {
      id: 6,
      imgSrc: SixthServiceImg,
      imgWidth: 64,
      service: t("servicesCompany.services.solarInstallationServices.service"),
      title: t("servicesCompany.services.solarInstallationServices.title"),
      description: t(
        "servicesCompany.services.solarInstallationServices.description",
      ),
    },
    {
      id: 7,
      imgSrc: SeventhServiceImg,
      imgWidth: 64,
      service: t("servicesCompany.services.afterSalesSolarSupport.service"),
      title: t("servicesCompany.services.afterSalesSolarSupport.title"),
      description: t(
        "servicesCompany.services.afterSalesSolarSupport.description",
      ),
    },
    {
      id: 8,
      imgSrc: EighthServiceImg,
      imgWidth: 64,
      service: t("servicesCompany.services.evChargingSolutions.service"),
      title: t("servicesCompany.services.evChargingSolutions.title"),
      description: t(
        "servicesCompany.services.evChargingSolutions.description",
      ),
    },
    {
      id: 10,
      imgSrc: TenthServiceImg,
      imgWidth: 64,
      service: t("servicesCompany.services.solarBatteryRecycling.service"),
      title: t("servicesCompany.services.solarBatteryRecycling.title"),
      description: t(
        "servicesCompany.services.solarBatteryRecycling.description",
      ),
    },
  ];

  const workProcessSteps: WorkProcessDetailsProps[] = [
    {
      process_number: 1,
      process_img: FirstWorkProcessIcon,
      process_img_height: 48,
      process_img_width: 55,
      process_title: t("workProcess.theProcess.first.title"),
      process_description: t("workProcess.theProcess.first.description"),
    },
    {
      process_number: 2,
      process_img: SecondWorkProcessIcon,
      process_img_height: 55,
      process_img_width: 51,
      process_title: t("workProcess.theProcess.second.title"),
      process_description: t("workProcess.theProcess.second.description"),
    },
    {
      process_number: 3,
      process_img: ThirdWorkProcessIcon,
      process_img_height: 55,
      process_img_width: 79,
      process_title: t("workProcess.theProcess.third.title"),
      process_description: t("workProcess.theProcess.third.description"),
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: t("blog.blogs.first.title"),
      description: t("blog.blogs.first.description"),
      deeperDescription: t("blog.blogs.first.deeperDescription"),
      img: Blog01,
      category: "INVESTMENT",
      day: "4",
      month: "FEB",
    },
    {
      id: 2,
      title: t("blog.blogs.second.title"),
      description: t("blog.blogs.second.description"),
      deeperDescription: t("blog.blogs.second.deeperDescription"),
      img: Blog02,
      category: "BUSINESS",
      day: "31",
      month: "JAN",
    },
    {
      id: 3,
      title: t("blog.blogs.third.title"),
      description: t("blog.blogs.third.description"),
      deeperDescription: t("blog.blogs.third.deeperDescription"),
      img: Blog03,
      category: "MATERIALS",
      day: "31",
      month: "JAN",
    },
    {
      id: 4,
      title: t("blog.blogs.fourth.title"),
      description: t("blog.blogs.fourth.description"),
      deeperDescription: t("blog.blogs.fourth.deeperDescription"),
      img: Blog04,
      category: "ENERGY",
      day: "25",
      month: "JAN",
    },
    {
      id: 5,
      title: t("blog.blogs.fifth.title"),
      description: t("blog.blogs.fifth.description"),
      deeperDescription: t("blog.blogs.fifth.deeperDescription"),
      img: Blog05,
      category: "SOLAR",
      day: "15",
      month: "JAN",
    },
    {
      id: 6,
      title: t("blog.blogs.sixth.title"),
      description: t("blog.blogs.sixth.description"),
      deeperDescription: t("blog.blogs.sixth.deeperDescription"),
      img: Blog06,
      category: "FUTURE",
      day: "10",
      month: "JAN",
    },
  ];

  return {
    navLinks,
    homeSliderTitles,
    homeSliderDescriptions,
    productsList,
    kartalServices,
    workProcessSteps,
    blogPosts,
  };
};
