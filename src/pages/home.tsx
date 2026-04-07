import AboutCompany from "../components/AboutCompany";
import BlogCompany from "../components/BlogCompany";
import CallBanner from "../components/CallBanner";
import FactsCounter from "../components/FactsCounter";
import HomeCarousel from "../components/HomeCarousel";
import ProductsCompany from "../components/ProductsCompany";
// import ProjectsCompany from "../components/ProjectsCompany"
import ServicesCompany from "../components/ServicesCompany";
import SolarSavings from "../components/SolarSavings";
import TrustedBanner from "../components/TrustedBanner";
import TrustedPartners from "../components/TrustedPartners";
import HomeWhyChooseUs from "../components/WhyChooseUs";
import WorkProcess from "../components/WorkProcess";

const home = () => {
  return (
    <section>
      <HomeCarousel />
      {/* <Hero /> */}
      <AboutCompany />
      <TrustedBanner />
      <ProductsCompany />
      <ServicesCompany />
      <WorkProcess />
      <SolarSavings />
      <BlogCompany />
      <HomeWhyChooseUs />
      <FactsCounter />
      <TrustedPartners />
      <CallBanner />
    </section>
  );
};

export default home;
