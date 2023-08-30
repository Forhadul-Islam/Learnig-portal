import React from "react";
import CourseVideo from "./CourseVideo";
import VideoLoader from "../ui/skeleton/VideoLoader";
import { useGetVideosQuery } from "../../features/videos/videosApi";

// const videos = [
//   {
//     id: 1,
//     title: "যে ১০ টি ভুল বিগিনার রিয়্যাক্ট ডেভেলপাররা করে থাকেন",
//     description:
//       "আপনারা যারা বিগিনার হিসেবে রিয়্যাক্ট জেস নিয়ে কাজ করা শুরু করেছেন, তারা রিয়্যাক্ট এর বেশ কিছু কনসেপ্ট ঠিক মতো আয়ত্ত না করতে পারার কারণে বিচিত্র কিছু সমস্যার সম্মুখীন হন এবং শেষ পর্যন্ত বুঝতে না পেরে হতাশ হয়ে পড়েন। তাদের জন্যই এই ভিডিওটি। এই ভিডিওতে আমি এমন ১০টি সমস্যার কথা তুলে ধরেছি যেগুলো বিগিনার হিসেবে আপনারা অহরহ সম্মুখীন হবেন। আশা করি ভিডিওটি দেখলে আপনাদের এই সমস্যাগুলো নিয়ে আর কনফিউশন থাকবেনা।",
//     author: "Learn with Sumit",
//     date: "May 10, 2022",
//     duration: "10:12",
//     views: "2.1k",
//     link: "https://www.youtube-nocookie.com/embed/6O4s7v28nlw",
//     thumbnail:
//       "https://i.ytimg.com/an_webp/lkIFF4maKMU/mqdefault_6s.webp?du=3000&sqp=COqbtqcG&rs=AOn4CLDdE3J12-irKbXVFAcAn69XyD2s8w",
//   },
//   {
//     id: 2,
//     title: "VS Code Snippets - Boost your productivity with User Snippets",
//     description:
//       "আমরা যখন Visual Studio Code Editor এ কাজ করি তখন অহরহ ব্যবহৃত কোড ব্লক গুলো আমাদের কে বারবার টাইপ করতে হয় এবং সামগ্রিকভাবে চিন্তা করলে এরকম ছোট ছোট ম্যনুয়াল কাজ আমাদের productivity অনেকাংশেই কমিয়ে দেয়। VS Code এর বিল্ট ইন ইউজার স্নিপেট ফিচারের মাধ্যমে আমরা কমন কাজগুলো স্নিপেট আকারে সাজিয়ে রেখে দিতে পারি এবং শর্টকাট কমান্ডের মাধ্যমে বড় বড় কোড ব্লক গুলো নিয়ে আসতে পারি। এই ভিডিওতে আপনারা এটাই জানতে পারবেন যে কিভাবে আমরা Visual Studio Code Editor এ কাস্টম স্নিপেট লিখতে পারি।",
//     date: "April 25, 2022",
//     duration: "10:12",
//     views: "2.1k",
//     link: "https://www.youtube-nocookie.com/embed/N-U6AVcIPy4",
//     author: "Alex",
//     thumbnail:
//       "https://i.ytimg.com/an_webp/SXmYUalHyYk/mqdefault_6s.webp?du=3000&sqp=COadtqcG&rs=AOn4CLDbXFyQARO441gjH-0poWHe46-xgQ",
//   },
//   {
//     id: 3,
//     title:
//       "Tailwind CSS 3 tutorial - Upgrade to Tailwind 3 | Tailwind CSS Bangla Tutorial",
//     description:
//       "Tailwind CSS v3.0 came with incredible performance gains, huge workflow improvements, and a seriously ridiculous number of new features. In this tutorial - I have tried to explain different new features of Tailwind CSS version 3, how to install tailwind css 3, how to upgrade from tailwind v2 to v3 etc.",
//     author: "Learn with Sumit",
//     date: "March 11, 2022",
//     duration: "10:12",
//     views: "2.1k",
//     link: "https://www.youtube-nocookie.com/embed/4M7D3O2XX4o",
//     thumbnail: "https://i3.ytimg.com/vi/4M7D3O2XX4o/maxresdefault.jpg",
//   },
//   {
//     id: 4,
//     title:
//       "Debounce Function in JavaScript - Advanced JavaScript Job Interview question",
//     description:
//       "In this video, I have explained about the debounce function in JavaScript. This is a common question interviewers ask at Job Interviews. If you watch this video carefully, you will understand what is debounce and how to handle it with custom debounce function.",
//     author: "Learn with Sumit",
//     date: "Jan 06, 2022",
//     duration: "10:12",
//     views: "3.1k",
//     link: "https://www.youtube-nocookie.com/embed/dD9O8DnIBj4",
//     thumbnail: "https://i3.ytimg.com/vi/dD9O8DnIBj4/maxresdefault.jpg",
//   },
//   {
//     id: 5,
//     title: "SASS Tutorial in English - Overview of SASS",
//     description:
//       "In this video, I have given a high level overview of popular CSS Pre-processor SASS which helps us managing our styles at scale. If you have a basic understanding of CSS & JavaScript, this 10 mins SASS Tutorial will help you getting started with SASS.",
//     author: "Learn with Sumit",
//     date: "Nov 22, 2021",
//     duration: "10:12",
//     views: "2.9k",
//     link: "https://www.youtube-nocookie.com/embed/4tV1Mfi4fMA",
//     thumbnail: "https://i3.ytimg.com/vi/4tV1Mfi4fMA/maxresdefault.jpg",
//   },
//   {
//     id: 6,
//     title:
//       "React Router DOM v6 Bangla Tutorial - Breaking Changes - React Router 6 vs 5",
//     description:
//       "In this React Router DOM v6 Bangla tutorial, you will learn how to install react router dom 6, what are the breaking changes in react router 6, difference between react router 6 vs 5, how to upgrade from react router v5 to react router v6. ",
//     author: "Learn with Sumit",
//     date: "Nov 08, 2021",
//     duration: "10:12",
//     views: "2.1k",
//     link: "https://www.youtube-nocookie.com/embed/34tjWL9wi4g",
//     thumbnail: "https://i3.ytimg.com/vi/34tjWL9wi4g/maxresdefault.jpg",
//   },
//   {
//     id: 8,
//     title: "React Developers' common mistakes are explained!",
//     description:
//       'যে ১০ টি ভুল বিগিনার রিয়্যাক্ট ডেভেলপাররা করে থাকেন",\n            "description": "আপনারা যারা বিগিনার হিসেবে রিয়্যাক্ট জেস নিয়ে কাজ করা শুরু করেছেন, তারা রিয়্যাক্ট এর বেশ কিছু কনসেপ্ট ঠিক মতো আয়ত্ত না করতে পারার কারণে বিচিত্র কিছু সমস্যার সম্মুখীন হন এবং শেষ পর্যন্ত বুঝতে না পেরে হতাশ হয়ে পড়েন। তাদের জন্যই এই ভিডিওটি। এই ভিডিওতে আমি এমন ১০টি সমস্যার কথা তুলে ধরেছি যেগুলো বিগিনার হিসেবে আপনারা অহরহ সম্মুখীন হবেন। আশা করি ভিডিওটি দেখলে আপনাদের এই সমস্যাগুলো নিয়ে আর কনফিউশন থাকবেনা।',
//     author: "Learn with Sumit",
//     date: "May 10, 2022",
//     duration: "10:12",
//     views: "3.5k",
//     link: "https://www.youtube-nocookie.com/embed/6O4s7v28nlw",
//     thumbnail: "https://i3.ytimg.com/vi/6O4s7v28nlw/maxresdefault.jpg",
//   },
//   {
//     id: 9,
//     title: "Tailwind CSS Tutorial Bangla - Introduction to Tailwind CSS",
//     description:
//       "Tailwind is a utility-first CSS framework to rapidly build modern websites without ever leaving your HTML. In this Tailwind CSS tutorial, I have given a short introduction and overview of Tailwind CSS in Bangla language. Also, I have explained, why Tailwind vs Bootstrap debate should be stopped as both are useful in their own ways.",
//     author: "LWS",
//     date: "Oct 15, 2021",
//     duration: "10:12",
//     views: "2.7",
//     link: "https://www.youtube-nocookie.com/embed/smDa6hoxLKI",
//     thumbnail: "https://i3.ytimg.com/vi/smDa6hoxLKI/maxresdefault.jpg",
//   },
//   {
//     id: 10,
//     title: "6 React Interview Questions You Have to Know",
//     description:
//       "Tags:\n- ReactJS Tutorial\n- ReactJS and MySQL\n- NodeJS Tutorial\n- API Tutorial",
//     author: "PedroTech",
//     date: "12 Feb, 2022",
//     duration: "13:10",
//     views: "31.5k",
//     link: "https://www.youtube.com/embed/mXxsjzgD3C",
//     thumbnail:
//       "https://i.ytimg.com/vi/mXxsjzgD3CI/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLASCWaW7f_xUwLzIPE7MdUiyB0uyg",
//   },
//   {
//     id: 11,
//     title: "Mastering Python: Advanced Tips and Tricks",
//     description:
//       "In this video, we delve into advanced Python programming techniques, covering topics like decorators, context managers, and metaclasses. Improve your Python skills with these powerful tips!",
//     author: "CodeMasters",
//     date: "Aug 15, 2023",
//     duration: "12:45",
//     views: "5.2k",
//     link: "https://www.youtube-nocookie.com/embed/abc123xyz",
//     thumbnail: "https://i3.ytimg.com/vi/abc123xyz/maxresdefault.jpg",
//   },
//   {
//     id: 12,
//     title: "Efficient Algorithms: Sorting and Searching Explained",
//     description:
//       "Learn about sorting and searching algorithms in depth. We explore various sorting algorithms like quicksort and mergesort, as well as binary search and its optimizations.",
//     author: "AlgoGenius",
//     date: "Sep 02, 2023",
//     duration: "18:20",
//     views: "3.8k",
//     link: "https://www.youtube-nocookie.com/embed/def456uvw",
//     thumbnail: "https://i3.ytimg.com/vi/def456uvw/maxresdefault.jpg",
//   },
//   {
//     id: 13,
//     title: "Web Development Crash Course: Building a Responsive Website",
//     description:
//       "Join us in this hands-on web development crash course where we build a responsive website from scratch. Learn HTML, CSS, and media queries to create a stunning web layout.",
//     author: "WebWizards",
//     date: "Oct 10, 2023",
//     duration: "22:30",
//     views: "7.6k",
//     link: "https://www.youtube-nocookie.com/embed/ghi789rst",
//     thumbnail: "https://i3.ytimg.com/vi/ghi789rst/maxresdefault.jpg",
//   },
//   {
//     id: 14,
//     title: "JavaScript Design Patterns: Building Scalable Applications",
//     description:
//       "Discover the power of design patterns in JavaScript. Learn how to create maintainable and scalable applications using patterns like Singleton, Observer, and Module.",
//     author: "JSArchitect",
//     date: "Nov 05, 2023",
//     duration: "15:55",
//     views: "4.9k",
//     link: "https://www.youtube-nocookie.com/embed/jkl012abc",
//     thumbnail: "https://i3.ytimg.com/vi/jkl012abc/maxresdefault.jpg",
//   },
//   {
//     id: 15,
//     title: "Introduction to Data Structures: Arrays and Linked Lists",
//     description:
//       "Dive into the world of data structures. This video provides an introduction to arrays and linked lists, explaining their advantages, trade-offs, and common use cases.",
//     author: "DataGeeks",
//     date: "Dec 20, 2023",
//     duration: "14:10",
//     views: "3.5k",
//     link: "https://www.youtube-nocookie.com/embed/mno345pqr",
//     thumbnail: "https://i3.ytimg.com/vi/mno345pqr/maxresdefault.jpg",
//   },
// ];

const AllCoursesSection = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  //content to render
  let content;
  if (isLoading) {
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }
  //error content
  if (!isLoading && isError) {
    content = <Error message="something went wrong!" />;
  }
  // display videos
  if (!isLoading && !isError && videos.length === 0) {
    content = <Error message="Videos not found!" />;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => (
      <CourseVideo key={video.id} video={video} />
    ));
  }
  return (
    <>
      <div className="text-black text-center text-3xl mb-16 head_text">
        Access Your courses Directly
      </div>
      <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          {content}
        </div>
      </section>
    </>
  );
};

export default AllCoursesSection;
