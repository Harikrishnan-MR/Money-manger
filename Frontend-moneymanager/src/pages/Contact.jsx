import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hiektme",  // Replace with your EmailJS Service ID
        "template_l1ibtjk",  // Replace with your EmailJS Template ID
        form.current,
        "2Tlj_Nlb146CimmQH"  // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset();
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      );
  };

  return (
    <>
      <Header />
      <section
        id="contact"
        className="flex flex-col items-center justify-center py-4 px-[7vw] md:px-[7vw] lg:px-[20vw]bg-gray-50"
      >
        <ToastContainer />

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">CONTACT</h2>
          <div className="w-32 h-1 bg-purple-600 mx-auto mt-4"></div>
          <p className="text-gray-600 mt-4 text-lg font-semibold">
            I’d love to hear from you—reach out for any opportunities or questions!
          </p>
        </div>

        {/* Contact Form */}
        <div className="mt-1 w-full max-w-md bg-white p-1 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 text-center">
            Connect With Me <span className="ml-1">🚀</span>
          </h3>

          <form ref={form} onSubmit={sendEmail} className="mt-4 flex flex-col space-y-4">
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              required
              className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:border-purple-500"
            />
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition"
            >
              Send
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
