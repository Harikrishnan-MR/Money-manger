import ReactTypingEffect from 'react-typing-effect';
import Tilt from 'react-parallax-tilt';
import { assets } from "../assets/assets.js";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const About = () => {
    console.log(import.meta.env.VITE_CV_LINK)
  return (
    <>
    <Header/>
    <section
        id="about"
        className="py-4 px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans bg-white">

      <div className="flex flex-col-reverse md:flex-row justify-between items-start">
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          {/* Greeting */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
            Hi, I am
          </h1>
          {/* Name */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-600 mb-4 leading-tight">
            Hari
            krishnan
          </h2>
          {/* Skills Heading with Typing Effect */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-gray-800 leading-tight">
            <span className="text-gray-900">I am a </span>
            <ReactTypingEffect
              text={[
                'Fullstack Dev',
                'Software Dev',
                'Coder',
              ]}
              speed={100}
              eraseSpeed={50}
              typingDelay={500}
              eraseDelay={2000}
              cursorRenderer={(cursor) => (
                <span className="text-purple-600">{cursor}</span>
              )}
            />
          </h3>
          {/* About Me Paragraph */}
          <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-10 mt-8 leading-relaxed">
            I am a passionate Java Full-Stack Developer with a strong foundation in both front-end and back-end technologies,skilled in building scalable, responsive, and user-focused applications. 
            With hands-on experience from my internship at Sedin Technologies and certifications in Java, React.js, Spring, and Spring Boot, I bring practical expertise in modern development tools, 
            database integration, and collaborative software engineering.I am eager to contribute to dynamic teams, create impactful solutions, and continuously sharpen my technical abilities.
          </p>
          {/* Resume Button */}
          <a
            href={import.meta.env.VITE_CV_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 text-white py-3 px-8 rounded-lg mt-5 text-lg font-semibold transition duration-300 hover:bg-purple-700 shadow-md"
          >
            DOWNLOAD CV
          </a>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end md:ml-8">
            <Tilt
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-[30rem] md:h-[30rem] border-4 border-purple-600 rounded-full"
              tiltMaxAngleX={20}
              tiltMaxAngleY={20}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1000}
              gyroscope={false}
            >
              <img
                src={assets.profile}
                alt="Harikrishnan"
                className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(126,34,206,0.4)]"
              />
            </Tilt>
          </div>

      </div>
    </section>
    <Footer />
    </>
  );
};

export default About;
