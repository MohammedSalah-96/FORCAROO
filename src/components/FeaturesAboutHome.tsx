import { IoCheckmarkSharp } from "react-icons/io5";

const FeaturesAboutHome = ({
  feature_description,
}: {
  feature_description: string;
}) => {
  return (
    <div className="flex items-start md:items-center justify-start gap-2">
      <IoCheckmarkSharp size={22} className="text-forcarooLightGreen" />
      <span className="text-forcarooText">{feature_description}</span>
    </div>
  );
};

export default FeaturesAboutHome;
