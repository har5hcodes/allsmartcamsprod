import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-300 pt-10  pb-32 px-8 mt-6 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 md:gap-16 ">
          <div>
            <Link
              to="/contact"
              className="text-slate-700 hover:text-gray-900 font-medium text-xs md:text-base mt-4 inline-block"
            >
              <h3 className=" text-sm md:text-lg font-medium  text-slate-700">
                About Us
              </h3>
            </Link>
            <p className="text-xs md:text-base mt-2 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              orci quis tortor venenatis pharetra.
            </p>
          </div>
          <div>
            <Link
              to="/contact"
              className="text-slate-700 hover:text-gray-900 font-medium text-xs md:text-base mt-4 inline-block"
            >
              <h3 className=" text-sm md:text-lg font-medium text-slate-700">
                Contact Us
              </h3>
            </Link>
            <p className="text-xs md:text-base mt-2 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              orci quis tortor venenatis pharetra.
            </p>
          </div>
          <div>
            <Link
              to="/contact"
              className="text-slate-700 hover:text-gray-900 font-medium text-xs md:text-base  mt-4 inline-block"
            >
              <h3 className=" text-sm md:text-lg font-medium text-slate-700">
                Privacy Policy
              </h3>
            </Link>
            <p className="text-xs md:text-base  mt-2 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              orci quis tortor venenatis pharetra.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
