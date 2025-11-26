import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const contactData = [
  {
    icon: <FiPhone className="text-pink-500 w-7 h-7" />,
    title: "Phone Number",
    lines: ["(888) 888-8888", "(123) 456-7890"],
  },
  {
    icon: <FiMail className="text-pink-500 w-7 h-7" />,
    title: "Email Address",
    lines: ["truelysell@example.com", "johnsmith@example.com"],
  },
  {
    icon: <FiMapPin className="text-pink-500 w-7 h-7" />,
    title: "Address",
    lines: ["387 Hillcrest Lane, Irvine, California, United States"],
  },
];

const ContactCard = ({ icon, title, lines }) => (
  <div className="p-6 bg-white rounded-lg   transition border border-gray-200">
    <div className="flex items-start space-x-4">
      {/* Icon Box */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-50">
        {icon}
      </div>

      {/* Text */}
      <div>
        <h6 className="text-lg font-bold text-gray-800 mb-1">{title}</h6>
        {lines.map((text, i) => (
          <p key={i} className="text-sm text-gray-600">
            {text}
          </p>
        ))}
      </div>
    </div>
  </div>
);

const ContactDetails = () => (
  <div className=" container mx-auto p-6 lg:p-10  flex justify-center">
    <div className=" grid gap-6 md:grid-cols-3">
      {contactData.map((item, idx) => (
        <ContactCard
          key={idx}
          icon={item.icon}
          title={item.title}
          lines={item.lines}
        />
      ))}
    </div>
  </div>
);

export default ContactDetails;
