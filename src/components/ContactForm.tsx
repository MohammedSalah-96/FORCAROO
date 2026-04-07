import { IoLocationOutline } from "react-icons/io5";
import { PiEnvelopeLight } from "react-icons/pi";
import { SlScreenSmartphone } from "react-icons/sl";
import ContactFormLogic from "./ContactFormLogic";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  return (
    <div className="contact-form w-full flex flex-col lg:flex-row justify-between gap-4">
      <div className="contact-form-left w-full lg:w-3/5">
        <div className="flex flex-row lg:flex-col flex-wrap lg:flex-nowrap gap-2">
          <div className="contact w-full md:w-[49%] lg:w-full flex justify-between items-center gap-2 py-8 ps-3 bg-slate-100 border border-forcarooLightGreen">
            <div className="contact-detail-icon h-20 flex justify-center items-center mx-auto px-1 bg-forcarooLightGreen">
              <SlScreenSmartphone
                size={44}
                className="py-2 bg-forcarooLightGreen text-slate-50 rounded"
              />
            </div>

            <div className="contact-detail-heading flex-1 ps-1">
              <h4 className="text-zinc-900 font-bold">
                {t("contactPage.contactForm.phone")}
              </h4>
              <p className="my-1 text-zinc-700">
                {t("contactPage.contactForm.phoneDescription")}
              </p>
              <h6
                className="justify-self-start text-sm font-semibold text-end"
                dir="ltr"
              >
                +9647504444444
              </h6>
            </div>
          </div>

          <div className="contact w-full md:w-[49%] lg:w-full flex justify-between items-center gap-2 py-8 ps-3 bg-slate-100 border border-forcarooLightGreen">
            <div className="contact-detail-icon h-20 flex justify-center items-center mx-auto px-1 bg-forcarooLightGreen">
              <PiEnvelopeLight
                size={44}
                className="py-2 bg-forcarooLightGreen text-slate-50 rounded"
              />
            </div>
            <div className="contact-detail-heading flex-1 ps-1">
              <h4 className="text-zinc-900 font-bold">
                {t("contactPage.contactForm.email")}
              </h4>
              <p className="my-1 text-zinc-700">
                {t("contactPage.contactForm.emailDescription")}
              </p>
              <h6 className="text-sm font-semibold">info@forcaroo.com</h6>
            </div>
          </div>

          <div className="contact w-full md:w-[49%] lg:w-full flex justify-between items-center gap-2 py-8 ps-3 bg-slate-100 border border-forcarooLightGreen">
            <div className="contact-detail-icon h-20 flex justify-center items-center mx-auto px-1 bg-forcarooLightGreen">
              <IoLocationOutline
                size={44}
                className="py-2 bg-forcarooLightGreen text-slate-50 rounded"
              />
            </div>
            <div className="contact-detail-heading flex-1 ps-1">
              <h4 className="text-zinc-900 font-bold">
                {t("contactPage.contactForm.address")}
              </h4>
              <p className="my-1 text-zinc-700">
                {t("contactPage.contactForm.addressDescription")}
              </p>
              <h6 className="text-sm font-semibold">
                {t("contactPage.contactForm.addressCompany")}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-form-right w-full">
        <ContactFormLogic />
      </div>
    </div>
  );
};

export default ContactForm;
