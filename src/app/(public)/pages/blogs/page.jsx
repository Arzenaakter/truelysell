// import AllBlogs from "@/components/shared/AllBlogs";
import HeadingSection from "@/components/shared/HeadingSection";
import Link from "next/link";
import { FaEdit, FaTrash, FaRegCircle } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
export const allData = [
  {
    id: 1,
    blogThumbnail:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    blogCategoryName: "Health",
    title: "The Importance of Daily Mental Wellness",
    content:
      "<p>Learn why taking small steps daily can greatly improve your mental health.</p>",
    createdUser: "Sophia Reed",
    createdDate: "2025-01-12",
    status: "Active",
  },
  {
    id: 2,
    blogThumbnail:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    blogCategoryName: "Technology",
    title: "How AI is Transforming Everyday Life",
    content:
      "<p>Artificial Intelligence is now part of daily routines—here’s how.</p>",
    createdUser: "Daniel Parker",
    createdDate: "2025-01-10",
    status: "Active",
  },
  {
    id: 3,
    blogThumbnail:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    blogCategoryName: "Career",
    title: "Top Skills You Need in 2025",
    content:
      "<p>Discover the most in-demand professional skills for the upcoming year.</p>",
    createdUser: "Emily Watson",
    createdDate: "2025-01-08",
    status: "Draft",
  },
  {
    id: 4,
    blogThumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    blogCategoryName: "Travel",
    title: "Best Budget Travel Destinations",
    content:
      "<p>Explore breathtaking travel spots that won’t break the bank.</p>",
    createdUser: "Kevin Lee",
    createdDate: "2025-01-05",
    status: "Active",
  },
  {
    id: 5,
    blogThumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    blogCategoryName: "Programming",
    title: "Why JavaScript Still Dominates Web Development",
    content:
      "<p>JavaScript continues to rule—here’s what makes it irreplaceable.</p>",
    createdUser: "Aisha Rahman",
    createdDate: "2025-01-04",
    status: "Active",
  },
  {
    id: 6,
    blogThumbnail:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    blogCategoryName: "Business",
    title: "How to Start a Small Business Successfully",
    content:
      "<p>Simple strategies to launch your business and avoid common mistakes.</p>",
    createdUser: "Lucas Green",
    createdDate: "2025-01-02",
    status: "Draft",
  },
  {
    id: 7,
    blogThumbnail:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    blogCategoryName: "Lifestyle",
    title: "10 Habits That Can Change Your Life",
    content: "<p>Upgrade your lifestyle with these proven habits.</p>",
    createdUser: "Nora James",
    createdDate: "2024-12-27",
    status: "Active",
  },
  {
    id: 8,
    blogThumbnail:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    blogCategoryName: "Food",
    title: "Healthy Recipes That Are Easy to Cook",
    content:
      "<p>Try these delicious meals that take less than 20 minutes to prepare.</p>",
    createdUser: "Jacob Wilson",
    createdDate: "2024-12-24",
    status: "Active",
  },
  {
    id: 9,
    blogThumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    blogCategoryName: "Education",
    title: "How to Study Smarter, Not Harder",
    content:
      "<p>Boost your learning efficiency with these scientifically proven techniques.</p>",
    createdUser: "Sarah Kim",
    createdDate: "2024-12-20",
    status: "Draft",
  },
  {
    id: 10,
    blogThumbnail:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b",
    blogCategoryName: "Fitness",
    title: "The Best Workouts for Busy People",
    content: "<p>Stay fit with these time-efficient exercise routines.</p>",
    createdUser: "Mark Stevens",
    createdDate: "2024-12-18",
    status: "Active",
  },
  {
    id: 11,
    blogThumbnail:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    blogCategoryName: "Finance",
    title: "Simple Ways to Save Money Every Month",
    content: "<p>Improve your financial life with these practical tips.</p>",
    createdUser: "Lily Carter",
    createdDate: "2024-12-16",
    status: "Active",
  },
  {
    id: 12,
    blogThumbnail:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    blogCategoryName: "Motivation",
    title: "How to Stay Motivated Throughout the Year",
    content:
      "<p>Learn how to keep your motivation high, even on difficult days.</p>",
    createdUser: "Henry Cooper",
    createdDate: "2024-12-12",
    status: "Draft",
  },
  {
    id: 13,
    blogThumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    blogCategoryName: "Web Design",
    title: "Modern UI Trends You Should Know",
    content: "<p>Here are the hottest and most effective UI design trends.</p>",
    createdUser: "Olivia Turner",
    createdDate: "2024-12-10",
    status: "Active",
  },
  {
    id: 14,
    blogThumbnail:
      "https://images.unsplash.com/photo-1526277612208-3f07a1d8d71d",
    blogCategoryName: "Marketing",
    title: "Digital Marketing Strategies for 2025",
    content:
      "<p>Boost your brand with these proven online marketing strategies.</p>",
    createdUser: "David Anderson",
    createdDate: "2024-12-07",
    status: "Active",
  },
];

const BlogsPage = () => {
  return (
    <div>
      <HeadingSection PageName="Blogs" />
      <div className="py-10">
        {/* <AllBlogs blogStatus="All" blgFrom="Public" /> */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 container px-6 lg:px-10 mx-auto">
          {allData.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-md shadow-lg border border-gray-200   flex flex-col"
            >
              {/* Blog Image */}
              <div className="relative overflow-hidden">
                <img
                  src={blog.blogThumbnail}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-md transform transition-transform duration-500 ease-in-out hover:scale-110"
                />
                <span className="absolute top-2 left-2 bg-white text-gray-700 px-3 py-1 text-sm rounded-md shadow">
                  {blog.blogCategoryName}
                </span>
              </div>

              <div className="p-4 flex flex-col grow">
                {/* Author + Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="font-medium text-gray-700">
                    {blog.createdUser}
                  </span>
                  <FaRegCalendarAlt className="ml-4" />
                  <span>{blog.createdDate}</span>
                </div>

                {/* Title */}
                <Link
                  href={`/pages/blogs/view?id=${blog.id}`}
                  className="font-semibold text-gray-800 mb-2 cursor-pointer hover:text-(--primary-blue) transition-colors duration-300"
                >
                  {blog.title}
                </Link>
                {/* content */}

                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
