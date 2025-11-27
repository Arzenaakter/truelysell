import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import CommentForm from "../pages/blogs/CommentForm";
import { allData } from "@/app/(public)/pages/blogs/page";
const catArr = [
  { id: 1, name: "Car Wash", total: 2 },
  { id: 2, name: "Plumbing", total: 5 },
  { id: 3, name: "Carpenter", total: 8 },
  { id: 4, name: "Computer Service", total: 4 },
  { id: 5, name: "Cleaning", total: 6 },
];

const BlogDetails = ({ id }) => {
  const item = {
    id: 14,
    blogThumbnail:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    blogCategoryName: "Marketing",
    title: "Digital Marketing Strategies for 2025",
    content:
      "<p>Boost your brand with these proven online marketing strategies.Boost your brand with these proven online marketing strategies.Boost your brand with these proven online marketing strategies.Boost your brand with these proven online marketing strategies.Boost your brand with these proven online marketing strategies.Boost your brand with these proven online marketing strategies.Boost your brand with these proven online marketing strategies.Boost your brand with these proven online marketing strategies.</p>",
    createdUser: "David Anderson",
    createdDate: "2024-12-07",
    status: "Active",
  };
  return (
    <div className="">
      <div className="grid lg:grid-cols-12 gap-5 ">
        {/* left side */}
        <div className="lg:col-span-8">
          {/* author part */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-gray-800 py-1 px-2 rounded-md bg-gray-200 text-sm">
              {item.blogCategoryName}
            </span>
            <span className="ml-4">|</span>
            <span className="flex items-center gap-1 text-gray-500">
              {" "}
              <FaRegCalendarAlt />
              {item.createdDate}
            </span>
            <span className="ml-4">|</span>
            <span className="font-medium text-gray-500">
              {item.createdUser}
            </span>
          </div>
          <h3>{item.title}</h3>
          {/* content */}
          <div className="rounded-md p-4 shadow">
            <div>
              <Image
                src={item.blogThumbnail}
                alt=""
                width={1000}
                height={1000}
                className="w-full h-auto rounded-md mb-6"
              />
            </div>
            <div
              className="prose max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
          {/* tags */}
          <div>
            <h4 className="mt-6 mb-2 font-medium">Tags</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-(--primary) hover:text-white">
                Marketing
              </span>
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-(--primary) hover:text-white">
                SEO
              </span>
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-(--primary) hover:text-white">
                Social Media
              </span>
            </div>
          </div>
          {/* comments */}
          <div>
            <h4 className="mt-6 mb-2 font-medium">Write a Comment</h4>
            {/* comment form */}
            <CommentForm />
          </div>
        </div>
        {/* right side */}
        <div className="lg:col-span-4">
          {/* category */}
          <div className="p-4 rounded-md bg-gray-100">
            <h5 className="mb-3">Categories</h5>
            <div>
              {catArr.map((cat) => (
                <div
                  key={cat.id}
                  className="flex justify-between items-center  py-2 bg-white mb-2 p-2"
                >
                  <span className="text-gray-600">{cat.name}</span>
                  <span className=" text-gray-600 text-sm">
                    ( {cat.total} )
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Latest */}
          <div className="p-4 rounded-md bg-gray-100 mt-5">
            <h5 className="mb-3">latest Blogs</h5>
            <div>
              {allData.slice(0, 4).map((item) => (
                <div key={item.id} className="flex justify-between  mb-4 gap-3">
                  <div>
                    <Image
                      src={item.blogThumbnail}
                      alt=""
                      width={200}
                      height={200}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{item.createdDate}</p>
                    <p className="text-gray-800">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
