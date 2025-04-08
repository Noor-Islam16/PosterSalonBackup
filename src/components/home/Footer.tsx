import { FC, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaCcDinersClub,
} from "react-icons/fa";
import { subscribeToNewsletter, URLS } from "../../lib/api"; // adjust path if needed

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;

    setLoading(true);
    setSubscribed(false);

    try {
      const success = await subscribeToNewsletter(email);
      if (success) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const footerLinks = [
    {
      title: "ORDERS",
      links: [
        { name: "Order Cancellation", url: URLS.cancellation },
        { name: "Order Tracking", url: URLS.tracking },
      ],
    },
    {
      title: "CUSTOMER CARE",
      links: [
        { name: "Shipping Policy", url: URLS.policy },
        { name: "Happiness Guarantee", url: URLS.happiness },
        { name: "Refund Policy", url: URLS.refund },
        { name: "FAQs", url: URLS.faqs },
      ],
    },
    {
      title: "ABOUT US",
      links: [
        { name: "About", url: URLS.about },
        { name: "Poster Details", url: URLS.poster },
        { name: "Canvas Details", url: URLS.canvas },
      ],
    },
    {
      title: "POLICIES",
      links: [
        { name: "Terms Of Services", url: URLS.service },
        { name: "Privacy Policy", url: URLS.privacy },
        { name: "Intellectual Property", url: URLS.intellectual },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white p-6 md:p-10 text-sm font-poppins">
      <div className="max-w-screen mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Subscription Section */}
          <div className="w-full md:w-1/3">
            <h3 className="text-[#F8C900] font-bold mb-3">
              PLEASE SUBSCRIBE FOR UPCOMING OFFERS.
            </h3>
            {subscribed && (
              <div className="text-green-400 text-xs mb-2">
                Subscribed successfully!
              </div>
            )}
            <div className="flex bg-gray-800 p-1 rounded-md">
              <Input
                type="email"
                placeholder="Your Email.."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white flex-1 border-none focus:ring-0"
              />
                <Button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-200 hover:text-black"
                >
                  {loading ? "Submitting..." : "SUBSCRIBE NOW"}
                </Button>
            </div>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <h3 className="text-[#F8C900] font-bold mb-3">FOLLOW US</h3>
            <div className="flex gap-3 text-gray-400">
              <a
                href="https://x.com/TimFirefly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-[#F8C900]"
              >
                <FaTwitter className="text-gray-400 hover:text-[#F8C900]" /> Twitter
              </a>
              <a
                href="https://www.instagram.com/postersalon/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-[#F8C900]"
              >
                <FaInstagram className="text-gray-400 hover:text-[#F8C900]" /> Instagram
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/3">
            <h3 className="text-[#F8C900] font-bold mb-3">CONTACT</h3>
            <p className="mb-3">support@postersalon.com</p>
            <p className="text-white">
              or{" "}
            <a href={URLS.contact} target="_blank" className="text-[#F8C900] hover:text-gray-400">
              click here!
            </a>
            </p>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full text-gray-400 md:gap-16">
          <div className="flex flex-col items-center md:items-start w-full md:w-auto mb-6 md:mb-0">
            <div className="flex gap-2 text-gray-400 text-2xl mb-2">
              <FaCcDinersClub className="w-8 h-8 md:w-12 md:h-12" />
              <FaCcAmex className="w-8 h-8 md:w-12 md:h-12" />
              <FaCcMastercard className="w-8 h-8 md:w-12 md:h-12" />
              <FaCcPaypal className="w-8 h-8 md:w-12 md:h-12" />
              <FaCcVisa className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <p className="text-white">©{currentYear} Postersalon, All Rights Reserved</p>
          </div>

          <div className="grid grid-cols-2 md:flex md:justify-between w-full md:gap-12 text-gray-400">
            {footerLinks.map((category) => (
              <div key={category.title} className="mb-6 md:mb-0">
                <h4 className="text-[#F8C900] font-bold mb-2">{category.title}</h4>
                {category.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 text-white block"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
