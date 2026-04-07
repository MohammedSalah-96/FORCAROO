import { useRef, FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import NotificationMsg from "./NotificationMsg";
import SimpleLoader from "./SimpleLoader";
import { useTranslation } from "react-i18next";

const ContactFormLogic = () => {
  const { t } = useTranslation();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const formData = useRef<HTMLFormElement>(null);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const form = formData.current;

    if (!form) return false;

    const fullname = form.user_fullname.value.trim();
    const email = form.user_email.value.trim();
    const phone = form.user_phone.value.trim();
    const subject = form.user_subject.value.trim();
    const message = form.user_message.value.trim();

    if (!fullname) {
      newErrors.user_fullname = t("contactPage.contactForm.fullnameRequired");
    }

    if (!email) {
      newErrors.user_email = t("contactPage.contactForm.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.user_email = t("contactPage.contactForm.emailInvalid");
    }

    if (!phone) {
      newErrors.user_phone = t("contactPage.contactForm.phoneRequired");
    }

    if (!subject) {
      newErrors.user_subject = t("contactPage.contactForm.subjectRequired");
    }

    if (!message) {
      newErrors.user_message = t("contactPage.contactForm.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableBtn(true);

    if (!validateForm()) {
      setDisableBtn(false);
      return;
    }

    if (!formData.current) {
      console.error("Form reference is not set.");
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_USER_KEY,
        }
      )
      .then(
        () => {
          setIsEmailSent(true);
          setShowNotification(true);
          formData.current?.reset();
          setErrors({});
        },
        () => {
          setIsEmailSent(false);
          setShowNotification(true);
        }
      )
      .finally(() => {
        setTimeout(() => setShowNotification(false), 3500);
        setDisableBtn(false);
      });
  };

  return (
    <div className="max-w-full mt-8 lg:mt-0 mx-auto px-0 lg:px-6">
      <NotificationMsg
        showNotification={showNotification}
        successed={isEmailSent}
      />
      <form ref={formData} onSubmit={handleSendEmail} className="space-y-6">
        <div>
          <label className="block text-forcarooText font-bold">
            {t("contactPage.contactForm.fullname")}
          </label>
          <input
            type="text"
            name="user_fullname"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forcarooLightGreen focus:border-forcarooLightGreen"
          />
          {errors.user_fullname && (
            <p className="text-red-500 text-sm mt-1">{errors.user_fullname}</p>
          )}
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-2">
          <div className="w-full">
            <label className="block text-forcarooText font-bold">
              {t("contactPage.contactForm.email")}
            </label>
            <input
              type="email"
              name="user_email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forcarooLightGreen focus:border-forcarooLightGreen"
            />
            {errors.user_email && (
              <p className="text-red-500 text-sm mt-1">{errors.user_email}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block text-forcarooText font-bold">
              {t("contactPage.contactForm.phone")}
            </label>
            <input
              type="text"
              name="user_phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forcarooLightGreen focus:border-forcarooLightGreen"
            />
            {errors.user_phone && (
              <p className="text-red-500 text-sm mt-1">{errors.user_phone}</p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-forcarooText font-bold">
            {t("contactPage.contactForm.subject")}
          </label>
          <input
            type="text"
            name="user_subject"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forcarooLightGreen focus:border-forcarooLightGreen"
          />
          {errors.user_subject && (
            <p className="text-red-500 text-sm mt-1">{errors.user_subject}</p>
          )}
        </div>
        <div>
          <label className="block text-forcarooText font-bold">
            {t("contactPage.contactForm.message")}
          </label>
          <textarea
            name="user_message"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-forcarooLightGreen focus:border-forcarooLightGreen"
          />
          {errors.user_message && (
            <p className="text-red-500 text-sm mt-1">{errors.user_message}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-forcarooText text-slate-200 font-semibold rounded-md shadow-sm transition-all duration-300 hover:text-forcarooLightGreen focus:outline-none disabled:opacity-85 disabled:pointer-events-none disabled:cursor-not-allowed"
            disabled={disableBtn}
          >
            {disableBtn ? (
              <SimpleLoader />
            ) : (
              t("contactPage.contactForm.sendBtn")
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactFormLogic;
