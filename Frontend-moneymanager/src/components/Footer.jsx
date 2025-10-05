import { FaLinkedin, FaGithub, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LeetCodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    viewBox="0 0 50 52"
    fill="currentColor"
  >
    <path d="M44,28.71c0-1.48-1.128-2.692-2.52-2.692H21.352c-1.392,0-2.52,1.212-2.52,2.692s1.128,2.692,2.52,2.692H41.48C42.872,31.402,44,30.19,44,28.71z"></path>
    <path d="M6.964,36.374l8.626,8.722C17.536,47.054,20.226,48,23.196,48s5.66-1.024,7.61-2.988l5.176-5.274
      c1.02-1.028,0.984-2.73-0.078-3.8c-1.062-1.07-2.75-1.106-3.768-0.078l-5.352,5.214c-0.924,0.934-2.204,1.324-3.618,1.324
      s-2.692-0.39-3.62-1.324l-8.596-8.726c-0.926-0.934-1.392-2.3-1.392-3.726s0.466-2.714,1.392-3.648l8.57-8.76
      c0.926-0.934,2.232-1.29,3.644-1.29c1.412,0,2.692,0.39,3.618,1.324l5.352,5.212c1.02,1.03,2.708,0.994,3.77-0.076
      c1.062-1.072,1.098-2.774,0.078-3.802l-5.176-5.272c-1.298-1.292-2.942-2.232-4.784-2.66l-0.068-0.014l4.894-5.006
      c1.024-1.028,0.988-2.732-0.074-3.802c-1.062-1.07-2.752-1.104-3.774-0.076L6.964,20.952C5.018,22.916,4,25.626,4,28.622
      C4,31.618,5.018,34.414,6.964,36.374z"></path>
  </svg>
);

const Footer = () => {
  const socialLinks = [
    { icon: <MdEmail />, link: `mailto:${import.meta.env.VITE_EMAIL}` },
    { icon: <FaPhone />, link: `tel:${import.meta.env.VITE_PHONE_NUMBER}` },
    { icon: <FaLinkedin />, link: import.meta.env.VITE_LINKEDIN_URL },
    { icon: <LeetCodeIcon />, link: import.meta.env.VITE_LEETCODE_URL },
    { icon: <FaGithub />, link: import.meta.env.VITE_GITHUB_URL },
  ];

  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200 text-center px-[12vw] py-10 md:px-[7vw] lg:px-[20vw]">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Harikrishnan M R
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {socialLinks.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-gray-500 transition-transform duration-200 hover:scale-110 hover:text-purple-600"
          >
            {item.icon}
          </a>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-6">
        © 2025 Harikrishnan M R. All rights reserved.
      </p>
    </footer>
  );
};



export default Footer;
