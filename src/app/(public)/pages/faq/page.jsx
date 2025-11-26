import Faq from "@/components/page-component/faqpage/Faq";
import HeadingSection from "@/components/shared/HeadingSection";
import React from "react";

const FaqPage = () => {
  return (
    <div>
      <HeadingSection PageName="Frequently Asked Questions" />
      <Faq />
    </div>
  );
};

export default FaqPage;
