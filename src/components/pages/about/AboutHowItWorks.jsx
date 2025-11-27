import Image from "next/image";
import handIcon from "@/assets/img/icons/about-hands.svg";
import srcDocIcon from "@/assets/img/icons/about-documents.svg";
import bookIcon from "@/assets/img/icons/about-book.svg";
import bg13 from "@/assets/img/bg/bg-13.png";
import dot from "@/assets/img/bg/dotted.png";

const arr = [
  {
    id: "01",
    icon: handIcon,
    title: "Search and Browse",
    desc: "Customers can browse or search for specific products or services using categories, filters, or search bars.",
  },
  {
    id: "02",
    icon: srcDocIcon,
    title: "Add to Cart or Book Now",
    desc: "Customers can add items to their shopping cart. For services, they may select a service and proceed to book.",
  },
  {
    id: "03",
    icon: bookIcon,
    title: "Amazing Places",
    desc: "The customer fulfills the order by either providing the service to the buyer.",
  },
];

const AboutHowItWorks = () => {
  return (
    <div className="bg-slate-50  pt-10 lg:pb-24 pb-5 relative">
      <div className="absolute top-5 left-0 ">
        <Image src={bg13} alt="" />
      </div>
      <div className="absolute bottom-5 right-0 ">
        <Image src={dot} alt="" />
      </div>
      <div className="container mx-auto px-6 lg:px-36">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-800">How It Works</h1>
          <p className="text-gray-600 mt-4">
            Straightforward process designed to make your experience seamless
            and hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {arr.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-white p-6 rounded-lg relative "
            >
              <span className=" absolute -top-5 left-0 text-(--pink)/10 text-5xl font-bold ">
                {item.id}
              </span>
              <div className="mb-4 bg-(--pink)/10 p-2 rounded-md">
                <Image src={item.icon} alt={item.title} className="w-8" />
              </div>
              <h6 className=" text-gray-700 mb-2">
                {index + 1} Amazing Places
              </h6>
              <span className="text-gray-500 text-center text-xs">
                The customer fulfills the order by either providing the service
                to the buyer.
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutHowItWorks;
