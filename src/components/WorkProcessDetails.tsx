import { WorkProcessDetailsProps } from "../types";

const WorkProcessDetails = ({
  process_number,
  process_img,
  process_img_height,
  process_img_width,
  process_title,
  process_description,
}: WorkProcessDetailsProps) => {
  return (
    <div className="work-process-details text-center relative group">
      <div className="h-36 w-36 flex items-center justify-center mx-auto bg-forcarooLightGreen rounded-3xl relative">
        <div>
          <img
            height={process_img_height}
            width={process_img_width}
            src={process_img}
            alt="WORK PROCESS"
            className={`!h-[${process_img_height}] !w-[${process_img_width}] mx-auto`}
          />
        </div>
        <span className="work-process-plan-number absolute -top-[72px] left-1/2 -translate-x-1/2 h-20 w-20 flex items-center justify-center bg-slate-50 text-forcarooLightGreen text-6xl font-semibold">
          0{process_number}
        </span>
      </div>

      <div className="mt-8">
        <h3 className="mb-2 text-forcarooText text-2xl font-semibold">
          {process_title}
        </h3>
        <p className="text-forcarooTextLight">{process_description}</p>
      </div>
    </div>
  );
};

export default WorkProcessDetails;
