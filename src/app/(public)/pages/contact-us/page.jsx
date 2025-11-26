import ContactDetails from "@/components/pages/contact/ContactDetails";
import ContactFrom from "@/components/pages/contact/ContactFrom";
import ContactMap from "@/components/pages/contact/ContactMap";
import HeadingSection from "@/components/shared/HeadingSection";
import React from "react";

const ContactUsPage = () => {
  return (
    <div className="bg-white">
      <HeadingSection PageName="Contact Us" />
      <ContactDetails />
      <ContactFrom />
      <ContactMap />
    </div>
  );
};

export default ContactUsPage;
