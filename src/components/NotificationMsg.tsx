import { FaCheck } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

const NotificationMsg = ({
  showNotification = false,
  successed = false,
}: {
  showNotification: boolean;
  successed: boolean;
}) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  // Update height when the notification is shown or hidden
  useEffect(() => {
    if (showNotification && notificationRef.current) {
      // Set height to the actual height of the notification content
      setHeight(notificationRef.current.scrollHeight);
    } else {
      // Set height to 0 when hiding
      setHeight(0);
    }
  }, [showNotification]);

  return (
    <div
      ref={notificationRef}
      className="notification overflow-hidden transition-all duration-500 ease-in-out"
      style={{
        opacity: showNotification ? 1 : 0,
        height: `${height}px`,
      }}
    >
      <div
        className={`h-auto w-full mb-2 py-2 px-4 bg-slate-100 ${
          successed ? "border-l-4 border-green-600" : "border-l-4 border-red-600"
        }`}
      >
        <div className="notification-content flex justify-center items-center gap-4">
          <div
            className={`notification-icon ${
              successed ? "bg-green-600" : "bg-red-600"
            } p-[3px] rounded-full`}
          >
            {successed ? (
              <FaCheck size={14} className="text-green-300" />
            ) : (
              <MdClose size={14} className="text-red-300" />
            )}
          </div>
          <div
            className={`notification-text ${
              successed ? "text-green-600" : "text-red-700"
            }`}
          >
            {successed
              ? "Your Message Has Been Sent Successfully."
              : "Something Went Wrong! Please Try Again."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationMsg;