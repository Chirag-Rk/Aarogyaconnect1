
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-green-400" />
              <span className="text-xl font-bold">AarogyaConnect</span>
            </div>
            <p className="text-gray-300 text-sm">
              Bridging rural healthcare gaps through technology and community support.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/doctors" className="text-gray-300 hover:text-green-400 transition-colors">Find Doctors</a></li>
              <li><a href="/symptoms" className="text-gray-300 hover:text-green-400 transition-colors">Symptom Checker</a></li>
              <li><a href="/volunteer" className="text-gray-300 hover:text-green-400 transition-colors">Volunteer</a></li>
              <li><a href="/tips" className="text-gray-300 hover:text-green-400 transition-colors">Health Tips</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Services</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span>Ambulance: 102</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span>Police: 100</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span>Fire: 101</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span>support@aarogyaconnect.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span>+91 80-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span>Bangalore, Karnataka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 AarogyaConnect. All rights reserved. Built for rural healthcare access.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
