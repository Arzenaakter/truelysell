import PrivecyPolicy from "@/components/pages/privacy-policy-page/PrivacyPolicy";
import HeadingSection from "@/components/shared/HeadingSection";
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div>
      <HeadingSection PageName="Privacy Policy " />
      <PrivecyPolicy />
    </div>
  );
};

export default PrivacyPolicyPage;
