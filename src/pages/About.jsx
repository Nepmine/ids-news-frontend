import React, { useState } from 'react';
import { Users, Target, Award, Heart, Newspaper, TrendingUp, Globe, Shield, Clock, CheckCircle, Mail, Phone, MapPin, Calendar, Youtube, Facebook, Instagram, Twitter, Linkedin, Landmark } from 'lucide-react';

// Design System Constants
const TRANSITIONS = {
  fast: 'transition-all duration-200 ease-out',
  normal: 'transition-all duration-300 ease-out',
  slow: 'transition-all duration-500 ease-out',
};

const HOVER_EFFECTS = {
  scale: 'hover:scale-105 active:scale-95',
  lift: 'hover:-translate-y-1 hover:shadow-xl',
};

export const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { icon: Youtube, value: '500K+', label: 'YouTube Subscribers', color: 'red' },
    { icon: Users, value: '87K+', label: 'Instagram Followers', color: 'purple' },
    { icon: Newspaper, value: '3,900+', label: 'Stories Published', color: 'blue' },
    { icon: Award, value: '#1', label: 'Research-Based Channel', color: 'yellow' },
  ];

  const socialLinks = [
    { 
      icon: Youtube, 
      label: 'YouTube', 
      handle: '@INDepthStory', 
      followers: '500K+ Subscribers',
      url: 'https://youtube.com/c/INDepthStory',
      color: 'red',
      description: 'In-depth documentaries and analysis'
    },
    { 
      icon: Facebook, 
      label: 'Facebook', 
      handle: '@indepthstorynepal', 
      followers: 'Covering The Uncovered',
      url: 'https://facebook.com/indepthstorynepal',
      color: 'blue',
      description: 'Latest news and updates'
    },
    { 
      icon: Instagram, 
      label: 'Instagram', 
      handle: '@indepthstory', 
      followers: '87K Followers',
      url: 'https://instagram.com/indepthstory',
      color: 'pink',
      description: 'Visual stories and behind-the-scenes'
    },
    { 
      icon: Twitter, 
      label: 'Twitter/X', 
      handle: '@in_depthstory', 
      followers: 'Breaking News',
      url: 'https://x.com/in_depthstory',
      color: 'sky',
      description: 'Real-time updates and discussions'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      handle: 'IN-Depth Story', 
      followers: 'Professional Network',
      url: 'https://linkedin.com/in/in-depth-story-b05166280',
      color: 'blue',
      description: 'Career opportunities and insights'
    },
  ];

  const timeline = [
    { 
      year: '2016', 
      title: 'Channel Founded', 
      description: 'Sudip Bhai Subedi created IN-Depth Story on August 28, 2016'
    },
    { 
      year: '2020', 
      title: 'Content Revolution', 
      description: 'Started producing in-depth research videos during COVID-19, addressing social injustices and misinformation'
    },
    { 
      year: '2022', 
      title: 'Major Growth', 
      description: 'Crossed 180,000 subscribers, became one of top research-based channels in Nepal'
    },
    { 
      year: '2023', 
      title: 'Team Expansion', 
      description: 'From solo creator to collaborative team, Rise Finalist recognition'
    },
    { 
      year: '2024', 
      title: 'Leading Voice', 
      description: 'Reached 500K+ subscribers, recognized as cornerstone of Nepali digital media'
    },
  ];

  const principles = [
    {
      icon: Shield,
      title: 'In-Depth Research',
      description: 'Every story begins with thorough research, data collection, and fact verification before publication.',
    },
    {
      icon: Target,
      title: 'Critical Storytelling',
      description: 'Combining research with satire and critical lens to make complex topics engaging and accessible.',
    },
    {
      icon: CheckCircle,
      title: 'Challenging Narratives',
      description: 'Questioning conventional wisdom and challenging mainstream narratives to foster critical thinking.',
    },
    {
      icon: TrendingUp,
      title: 'Social Impact',
      description: 'Creating conversations that extend beyond digital platforms into real-world societal change.',
    },
  ];

  const founderInfo = {
    name: 'Sudip Bhai Subedi',
    title: 'Founder & CEO',
    education: 'Institute of Engineering, Tribhuvan University',
    background: 'Son of a journalist, grew up immersed in current affairs and political narratives',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  };

  const contentTypes = [
    {
      title: 'Political & Social Commentary',
      description: 'Critical analysis of governance, policies, and political figures with emphasis on freedom of speech',
      icon: Landmark,
    },
    {
      title: 'Historical Narratives',
      description: 'Deep dives into Nepal\'s rich history, cultural heritage, and events that shaped the nation',
      icon: Calendar,
    },
    {
      title: 'Investigative Journalism',
      description: 'Exposés on corruption, social injustices, and issues demanding public accountability',
      icon: Shield,
    },
    {
      title: 'Business & Economy',
      description: 'Analysis of Nepal\'s business landscape, market dynamics, and economic developments',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="text-center">
            <div className={`inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 ${TRANSITIONS.normal} ${HOVER_EFFECTS.scale}`}>
              <Newspaper className="w-5 h-5" />
              <span className="font-semibold">Est. August 2016</span>
            </div>
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${TRANSITIONS.slow} hover:scale-105 inline-block cursor-default`}>
              IN-Depth Story Nepal
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto leading-relaxed mb-4">
              Covering The Uncovered
            </p>
            <p className="text-lg text-red-200 max-w-2xl mx-auto">
              Revolutionizing media through in-depth research, clever satire, and critical storytelling
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                500K+ YouTube Family
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                Research-Based Journalism
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                Independent Voice
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Section */}
        <div className="-mt-16 relative z-20 mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`
                  bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center
                  ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift}
                  border-t-4 border-${stat.color}-500
                `}
                style={{
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-${stat.color}-100 rounded-full mb-4`}>
                  <stat.icon className={`w-7 h-7 text-${stat.color}-600`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

          
          {/* Who Are We Section */}
                    <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Are We</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto border-l-4 border-red-600">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Founded by Sudip Bhai Subedi in August 2016, IN-Depth Story has grown from a solo creator's vision 
                into Nepal's leading research-based media platform with over 500,000 YouTube subscribers.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We combine rigorous research, clever satire, and critical storytelling to tackle the stories traditional 
                media won't—from political commentary and historical deep dives to investigative exposés on corruption 
                and social injustices.
              </p>
              
              <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-600">
                <p className="text-lg text-gray-800 leading-relaxed italic">
                  Our mission is simple: "Covering The Uncovered"—creating conversations that spark real-world change 
                  and inspire critical thinking across Nepal and beyond.
                </p>
              </div>
            </div>
          </div>

        {/* Mission & Vision with Tabs */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing how Nepal perceives media, YouTube, and education
            </p>
          </div>

          <div className={`bg-white rounded-2xl shadow-xl p-8 md:p-12`}>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  To provide a platform for Nepali audiences to engage with critical and complex stories that often go unaddressed 
                  by traditional media. We create a safe space where viewers can confront societal, political, and cultural dimensions 
                  of Nepal.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Through fusion of <strong>in-depth research, clever satire, and critical storytelling</strong>, we challenge 
                  conventional norms and push audiences to think beyond mainstream narratives.
                </p>
                <div className="space-y-3">
                  {['Unfiltered Perspectives', 'Thought-Provoking Analysis', 'Community Engagement'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`relative ${TRANSITIONS.slow} hover:scale-105`}>
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600"
                  alt="Nepal"
                  className="rounded-2xl w-full h-96 object-cover shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-xl shadow-2xl">
                  <div className="text-3xl font-bold">500K+</div>
                  <div className="text-sm">Subscribers</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To be recognized as the trailblazing video documentary creator that revolutionizes how people perceive media, 
                YouTube, and education in Nepal and beyond. We aim to foster open, meaningful discussions around underrepresented 
                topics and inspire the next generation of critical thinkers.
              </p>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <Globe className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Global Reach</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Community First</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Excellence</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Innovation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Types */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Cover</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Diverse content exploring every facet of Nepali society
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {contentTypes.map((type, index) => (
              <div
                key={index}
                className={`
                  bg-white p-8 rounded-xl shadow-lg
                  ${TRANSITIONS.normal} hover:shadow-xl
                  border-l-4 border-red-600 group
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${TRANSITIONS.normal} group-hover:bg-red-600`}>
                    <type.icon className={`w-6 h-6 text-red-600 ${TRANSITIONS.normal} group-hover:text-white`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                    <p className="text-gray-600">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Principles */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How we create content that makes a difference
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <div
                key={index}
                className={`
                  bg-white p-6 rounded-2xl shadow-lg text-center
                  ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift} group
                `}
              >
                <div className={`bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${TRANSITIONS.normal} group-hover:bg-red-600 group-hover:scale-110`}>
                  <principle.icon className={`w-8 h-8 text-red-600 ${TRANSITIONS.normal} group-hover:text-white`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{principle.title}</h3>
                <p className="text-gray-600 text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a solo creator to Nepal's leading research-based media platform
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-600 to-red-300"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className={`bg-white p-6 rounded-xl shadow-lg ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift}`}>
                      <div className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full font-bold mb-3">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Connect With Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our growing community across all platforms
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  bg-white rounded-2xl shadow-lg p-6
                  ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift}
                  group cursor-pointer
                  border-t-4 border-${social.color}-500
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`bg-${social.color}-100 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${TRANSITIONS.normal} group-hover:bg-${social.color}-600 group-hover:scale-110`}>
                    <social.icon className={`w-7 h-7 text-${social.color}-600 ${TRANSITIONS.normal} group-hover:text-white`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{social.label}</h3>
                    <p className="text-sm text-gray-600 mb-2">{social.handle}</p>
                    <p className={`text-xs font-semibold text-${social.color}-600 mb-2`}>{social.followers}</p>
                    <p className="text-xs text-gray-500">{social.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-20">
          <div className={`
            bg-gradient-to-br from-red-600 via-red-700 to-red-800 
            text-white rounded-3xl p-12 md:p-16 text-center
            relative overflow-hidden shadow-2xl
          `}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
              <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
                Story tips, collaborations, or business inquiries - we'd love to hear from you
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-4xl mx-auto">
                <div className={`bg-white/10 backdrop-blur-sm p-6 rounded-xl ${TRANSITIONS.normal} hover:bg-white/20`}>
                  <Mail className="w-8 h-8 mx-auto mb-3" />
                  <div className="font-semibold mb-1">Business Inquiries</div>
                  <a href="mailto:business.idsnp@gmail.com" className="text-red-100 text-sm hover:underline">
                    business.idsnp@gmail.com
                  </a>
                </div>
                <div className={`bg-white/10 backdrop-blur-sm p-6 rounded-xl ${TRANSITIONS.normal} hover:bg-white/20`}>
                  <Phone className="w-8 h-8 mx-auto mb-3" />
                  <div className="font-semibold mb-1">Call Us</div>
                  <a href="tel:+9779860934654" className="text-red-100 text-sm">
                    +977 986-093-4654
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:business.idsnp@gmail.com"
                  className={`
                    bg-white text-red-600 px-8 py-4 rounded-lg font-semibold 
                    hover:bg-red-50 ${TRANSITIONS.normal} ${HOVER_EFFECTS.scale}
                    shadow-xl inline-flex items-center justify-center gap-2
                  `}
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
                <a
                  href="https://youtube.com/c/INDepthStory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    bg-red-800 text-white px-8 py-4 rounded-lg font-semibold 
                    hover:bg-red-900 ${TRANSITIONS.normal} ${HOVER_EFFECTS.scale}
                    shadow-xl inline-flex items-center justify-center gap-2
                  `}
                >
                  <Youtube className="w-5 h-5" />
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};