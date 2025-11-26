import AboutBestSolution from "@/components/pages/about/AboutBestSolution";

import AboutHowItWorks from "@/components/pages/about/AboutHowItWorks";
import BestServices from "@/components/pages/about/BestServices";
import Testimonials from "@/components/pages/about/Testimonials";
import WhyChooseUs from "@/components/pages/about/WhyChooseUS";
import HeadingSection from "@/components/shared/HeadingSection";
import React from "react";

const AboutUsPage = () => {
  return (
    <div>
      <HeadingSection PageName="About Us" />
      <AboutBestSolution />
      <WhyChooseUs />
      <AboutHowItWorks />
      <BestServices />
      <Testimonials />
    </div>
  );
};

export default AboutUsPage;
