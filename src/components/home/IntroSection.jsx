import React from "react";
import CodeBox from "./CodeBox";

const IntroSection = () => {
  return (
    <div className="flex ">
      <section class=" w-1/2 h-[700px] bg-transparent py-3 flex flex-col justify-center sm:py-10">
        <div class="relative py-3 sm:max-w-lg sm:mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-pink-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div class="relative bg-white shadow-lg sm:rounded-3xl sm:p-4">
            <div class="max-w-md mx-auto">
              <div class="divide-y divide-gray-200"></div>
              <CodeBox />
            </div>
          </div>
        </div>
      </section>
      <section className=" text-black ">
        Practice As you move forward with the Tutorials.
      </section>
    </div>
  );
};

export default IntroSection;
