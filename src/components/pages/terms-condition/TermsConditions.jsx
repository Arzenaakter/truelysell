import React from "react";
import { FaCircle } from "react-icons/fa";
const TermsConditions = () => {
  return (
    <div className="bg-white container mx-auto p-6 lg:p-10 text-gray-500 text-sm">
      <p className=" leading-relaxed mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <p className=" leading-relaxed mb-6">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsum voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem.
      </p>

      <div className="space-y-4">
        <ul className="list-inside space-y-2">
          <li className="flex items-start">
            <FaCircle className="text-pink-500 mr-2" />
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et
          </li>
          <li className="flex items-start">
            <FaCircle className="text-pink-500 mr-2" />
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium,
          </li>
          <li className="flex items-start">
            <FaCircle className="text-pink-500 mr-2" />
            Nemo enim ipsum voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </li>
        </ul>

        <ul className="list-inside space-y-2">
          <li className="flex items-start">
            <FaCircle className="text-pink-500 mr-2" />
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et
          </li>
          <li className="flex items-start">
            <FaCircle className="text-pink-500 mr-2" />
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium,
          </li>
          <li className="flex items-start">
            <FaCircle className="text-pink-500 mr-2" />
            Nemo enim ipsum voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt.
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-10 mt-8">
        <button className="text-gray-800 bg-gray-200 px-6 py-2 rounded-md  font-semibold">
          Not right now...
        </button>
        <button className="bg-(--dark) text-white px-6 py-2 rounded-md  font-semibold ">
          I agree with terms
        </button>
      </div>
    </div>
  );
};

export default TermsConditions;
