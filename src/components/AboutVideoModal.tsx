import { X } from "lucide-react";

const AboutVideoModal = ({
  handleShowModal,
}: {
  handleShowModal: () => void;
}) => {
  const closeModal = (event: React.MouseEvent) => {
    // Close the modal only when the user clicks outside the video.
    if (event.target === event.currentTarget) {
      handleShowModal();
    }
  };

  return (
    <div
      className="h-full w-full fixed top-0 left-0 flex justify-center items-center backdrop-filter backdrop-brightness-75 backdrop-blur-md z-[55]"
      onClick={closeModal}
    >
      <div className="absolute top-4 right-4">
        <button
          type="button"
          className="p-2 bg-forcarooLightGreen text-slate-50 group"
          onClick={handleShowModal}
        >
          <X className="transition-all duration-300 group-hover:rotate-180" />
        </button>
      </div>
      {/* <div className="container mx-auto px-4">
        <video
          width="100%"
          className="z-50"
          controls
          aria-labelledby="video-modal-title"
        >
          <source src="https://www.youtube.com/watch?v=GasOvLJu2vQ&t=72s" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
      <div className="container mx-auto px-4">
        <iframe
          width="100%"
          height="500"
          src="https://www.youtube.com/embed/GasOvLJu2vQ?start=72"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="z-50 rounded-lg"
          aria-labelledby="video-modal-title"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutVideoModal;
