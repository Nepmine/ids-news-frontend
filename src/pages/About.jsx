import React from 'react';
import { Users, Target, Award, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h1 className="text-5xl font-bold mb-4">About IDS Story Nepal</h1>
          <p className="text-xl text-red-100 max-w-3xl">
            Your trusted source for authentic news and stories from Nepal
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              IDS Story Nepal is dedicated to delivering accurate, timely, and impactful news coverage 
              from across Nepal. We believe in the power of storytelling to inform, inspire, and create 
              positive change in our communities.
            </p>
            <p className="text-lg text-gray-600">
              Our team of dedicated journalists and writers work tirelessly to bring you stories that 
              matter, from breaking news to in-depth analysis of the issues shaping our nation.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600"
              alt="Nepal"
              className="rounded-lg w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accuracy</h3>
              <p className="text-gray-600">
                We verify every fact and source to ensure the highest standards of journalism
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We serve the people of Nepal by giving voice to their stories and concerns
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest quality in every article and every story we publish
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We maintain independence and ethical standards in all our reporting
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Have a story tip or want to collaborate? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@idsstorynepal.com"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              Email Us
            </a>
            <button className="bg-red-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-900 transition">
              Follow Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};