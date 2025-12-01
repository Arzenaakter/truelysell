import RootServiceComponent from "@/components/services/RootServiceComponent";
import HeadingSection from "@/components/shared/HeadingSection";

const AllServicesPage = () => {
  return (
    <div>
      <HeadingSection PageName="Services" />
      <RootServiceComponent />
    </div>
  );
};

export default AllServicesPage;
