import Image from "next/image";

import Image1 from "@/assets/img/bg/bg-09.png";
import Image2 from "@/assets/img/bg/bg-10.png";
import Image3 from "@/assets/img/bg/bg-11.png";
import Image4 from "@/assets/img/bg/bg-12.png"; // arrow image

const stepsData = [
  {
    id: "01",
    title: "Create An Account",
    description1:
      "Create an account as a service provider and start offering your services to a wide audience. On your dashboard, you'll be able to showcase your expertise, manage appointments, and connect with potential clients.",
    description2:
      "Simply provide your name, email address, and create a strong password to get started. You'll also get access to tools for tracking your work, setting availability, and receiving payments.",
    imageUrl: Image1,
    imageAlt: "A person creating an account on a large mobile screen",
    layout: "imageRight",
  },
  {
    id: "02",
    title: "Post An Ad",
    description1:
      "Promote your services and reach new clients by posting on our platform. Start by providing a clear and engaging title that describes your service. Include a detailed description, specifying what you offer, your experience, and any unique skills or certifications.",
    description2:
      "We sure to add your contact information so clients can easily get in touch with you. Posting your service is fast and straightforward, helping you expand your client base effortlessly!",
    imageUrl: Image2,
    imageAlt:
      "A person posting an advertisement on a social media style interface",
    layout: "imageLeft",
  },
  {
    id: "03",
    title: "Start Earning",
    description1:
      "Take control of your financial future by starting to earn with our platform. Whether you're a seasoned professional or just starting, our platform connects you with a steady stream of clients who need your skills.",
    description2:
      "Start earning today, expand your client base, and watch your income grow as you take on exciting new opportunities.",
    imageUrl: Image3,
    imageAlt: "A person checking their earnings on a mobile phone",
    layout: "imageRight",
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto px-4 lg:px-10 lg:py-20 py-10">
        {stepsData.map((step, index) => (
          <div key={step.id}>
            {/* Step Section */}
            <div
              className={`
                flex flex-col md:flex-row justify-between gap-10 md:gap-16
                ${step.layout === "imageLeft" ? "md:flex-row-reverse" : ""}
                mb-6 md:mb-10
              `}
            >
              {/* Text */}
              <div className="text-center md:text-left lg:w-[60%]">
                <div className="flex justify-center md:justify-start">
                  <span
                    className="
                      flex items-center justify-center 
                      w-12 h-12 rounded-full 
                      bg-(--primary) text-white
                      font-bold text-xl mb-4
                    "
                  >
                    {step.id}
                  </span>
                </div>

                <h1>{step.title}</h1>
                <p className="text-gray-500 my-4 text-sm lg:w-[80%]">
                  {step.description1}
                </p>
                <p className="text-gray-500 text-sm lg:w-[80%]">
                  {step.description2}
                </p>
              </div>

              {/* Image */}
              <div className="lg:w-[30%]">
                <Image src={step.imageUrl} alt={step.imageAlt} />
              </div>
            </div>

            {/* Arrow — Show ONLY Between Sections */}
            {index !== stepsData.length - 1 && (
              <div className="flex justify-center mb-6 md:mb-10">
                <Image src={Image4} alt="arrow" className="w-72 " />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
