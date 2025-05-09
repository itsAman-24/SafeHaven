import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import { AiOutlineGlobal } from "react-icons/ai";
import FooterSection from "./FooterSection";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-xl font-bold">
              SafeHaven
            </Link>
            <p className="mt-2 text-gray-400 text-sm">
              Helping communities stay safe during emergency situations by
              providing vital information about shelters, bunkers, and safety
              instructions.
            </p>
          </div>

          <FooterSection
            title="Resources"
            links={[
              { label: "Emergency Contacts" },
              { label: "Safety Guidelines" },
              { label: "Evacuation Plans" },
              { label: "First Aid Guide" },
            ]}
          />

          <FooterSection
            title="About"
            links={[
              { label: "Our Mission" },
              { label: "How it Works" },
              { label: "Privacy Policy" },
              { label: "Terms of Service" },
            ]}
          />

          <FooterSection
            title="Connect"
            links={[
              { label: "Volunteer" },
              { label: "Safety" },
              { label: "Report Issue" },
              { label: "Suggest Feature" },
            ]}
          />
        </div>

        {/* Bottom section with copyright and social links */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {year} Aman Kumar Pandey. All rights reserved.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0 justify-center md:justify-end">
            <a
              href=" https://www.linkedin.com/in/aman-kumar-pandey-727520270/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>

            <a
              href="https://lighthearted-klepon-681865.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <AiOutlineGlobal className="h-5 w-5" />
            </a>

            <a
              href="https://github.com/itsAman-24"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-xs flex items-center justify-center">
          <span>Made with</span>
          <FaHeart className="mx-1 text-red-500" />
          <span>for the safety of communities</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
