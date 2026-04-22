import { IconType } from "react-icons/lib";

export interface NavbarLinksProps {
  name: string;
  path: string;
}

export interface HomeSliderContentProps {
  title: string;
  description: string;
  imgSrc: string;
}

export interface ServiceTypesProps {
  id: number;
  imgSrc: string;
  imgWidth: number;
  service: string;
  title: string;
  description: string;
}

export interface FactsCounterDetailsProps {
  icon: IconType;
  title: string;
  counter_number: number;
}

export interface WorkProcessDetailsProps {
  process_number: number;
  process_img: string;
  process_img_height: number;
  process_img_width: number;
  process_title: string;
  process_description: string;
}

export interface BlogProps {
  id: number;
  title: string;
  description: string;
  deeperDescription: string;
  img?: string;
  category?: string;
  day?: string;
  month?: string;
}

export interface ProjectProps {
  id: number;
  year: number;
  customer: string;
  location: string;
  inverter: string;
  pv: string;
  battery: string;
  imgUrl: string;
  projectsIcon: string;
  projectDateIcon: string;
  projectLocationIcon: string;
  projectInverterIcon: string;
  projectPanelIcon: string;
  projectBatteryIcon: string;
}

export interface ProjectDetailsProps {
  project: ProjectProps | undefined;
}

export interface TrustedPartnersProps {
  id: number;
  imgUrl: string;
  imgWidth: string;
}
