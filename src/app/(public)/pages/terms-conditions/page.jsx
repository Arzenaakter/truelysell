import TermsConditions from "@/components/pages/terms-condition/TermsConditions";
import HeadingSection from "@/components/shared/HeadingSection";
import React from "react";

const termsConditionPage = () => {
  return (
    <div>
      <HeadingSection PageName="Terms & Conditions" />
      <TermsConditions />
    </div>
  );
};

export default termsConditionPage;
