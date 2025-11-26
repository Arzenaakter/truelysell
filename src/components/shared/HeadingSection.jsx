import { IoIosArrowForward } from "react-icons/io";

const HeadingSection = ({ PageName }) => {
  return (
    <div className="py-12 bg-slate-50/80  relative">
      <div
        className="absolute right-10 -top-14 w-40 h-40 rounded-full opacity-60 blur-2xl z-0"
        style={{ background: "radial-gradient(circle, #d1b3ff, #e0ccff)" }}
      />
      <div
        className="absolute -left-40 top-0 w-80 h-12 rounded-full opacity-60 blur-2xl z-0"
        style={{ background: "radial-gradient(circle, #d1b3ff, #e0ccff)" }}
      />
      <div
        className="absolute left-[350px] top-0 w-[800px] h-10 rounded-full opacity-60 blur-2xl z-0"
        style={{ background: "radial-gradient(circle, #d1b3ff, #e0ccff)" }}
      />
      <div
        className="absolute left-40 bottom-2 w-80 h-12 rounded-full opacity-60 blur-2xl z-0"
        style={{ background: "radial-gradient(circle, #d1b3ff, #e0ccff)" }}
      />
      <h1 className="text-center mb-2">{PageName}</h1>
      <div className="flex items-center justify-center gap-2 ">
        <span className="text-gray-500">Home</span>
        <IoIosArrowForward />
        <span className="text-gray-700">{PageName}</span>
      </div>
    </div>
  );
};

export default HeadingSection;
