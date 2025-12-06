import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              IDS Story Nepal
            </h3>
            <p className="text-gray-400 mb-4">
              Your trusted source for news and stories from Nepal. We bring you
              the latest updates, in-depth analysis, and compelling narratives
              from across the nation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/indepthstorynepal/"
                className="text-gray-400 hover:text-red-400 transition"
                aria-label="Facebook"
                target="_blank"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/in_depthstory"
                className="text-gray-400 hover:text-red-400 transition"
                aria-label="Twitter"
                target="_blank"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/indepthstory/"
                className="text-gray-400 hover:text-red-400 transition"
                aria-label="Instagram"
                target="_blank"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/trending" className="hover:text-white transition">
                  Trending
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-white transition">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/ids-youtube" className="hover:text-white transition">
                  Youtube Videos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Lalitpur, Nepal</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:business.idsnp@gmail.com"
                  className="hover:text-white transition"
                >
                  business.idsnp@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a
                  href="tel:+9779860934654"
                  className="hover:text-white transition"
                >
                  +977 98-60934654
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} IDS Story Nepal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};