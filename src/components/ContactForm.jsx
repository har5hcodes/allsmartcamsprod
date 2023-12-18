import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
const ContactForm = () => {
  const [verified, setVerified] = React.useState(false);
  const onChange = (value) => {
    console.log("Captcha value:", value);
    setVerified(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded p-5 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Your email address"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            placeholder="Your message"
            rows="5"
          ></textarea>
        </div>
        <div className="mb-4">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_KEY}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!verified}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
