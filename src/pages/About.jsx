import { useState } from 'react';
import { TrendingUp, Users, Heart, Target, Globe, MessageCircle, Video, Award, Mail, Facebook, Instagram, Youtube, Twitter, Linkedin, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { FaDiscord, FaTiktok } from 'react-icons/fa';

const TRANSITIONS = {
  fast: 'transition-all duration-200 ease-out',
  normal: 'transition-all duration-300 ease-out',
  slow: 'transition-all duration-500 ease-out',
};

const HOVER_EFFECTS = {
  scale: 'hover:scale-105 active:scale-95',
  lift: 'hover:-translate-y-1 hover:shadow-xl',
};

export const About= ()=> {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { label: 'Countries', value: '180', icon: Globe },
    { label: 'Monthly Reach', value: '50m', icon: Video },
    { label: 'Followers', value: '1m', icon: Users },
  ];

  const principles = [
    {
      title: 'Audience First',
      description: 'Every story begins with: "Will this help people understand the world better?"',
      icon: Users,
      gradient: 'from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Transparency Builds Trust',
      description: 'We show our sources, our process, and our reasoning.',
      icon: Heart,
      gradient: 'from-pink-50 to-pink-100',
      iconColor: 'text-pink-600',
      borderColor: 'border-pink-200',
    },
    {
      title: 'Context Over Noise',
      description: 'We go deeper, slower, and more meaningfully.',
      icon: Target,
      gradient: 'from-green-50 to-green-100',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
    },
    {
      title: 'Speak Truth to Power',
      description: 'Critique is not negativity. Accountability is service to the public.',
      icon: TrendingUp,
      gradient: 'from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200',
    },
    {
      title: 'Make Complexity Simple',
      description: 'No jargon. No academic walls. Just clear, human explanations.',
      icon: MessageCircle,
      gradient: 'from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Youth Voices Matter',
      description: 'They are not the future—they are the present.',
      icon: Award,
      gradient: 'from-yellow-50 to-yellow-100',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
    },
  ];

  const topics = [
    { name: 'Politics & Governance', icon: '🏛️' },
    { name: 'Economy & Development', icon: '📊' },
    { name: 'Foreign Policy & Geopolitics', icon: '🌏' },
    { name: 'Culture, Society & Identity', icon: '🎭' },
    { name: 'Youth & Technology', icon: '💡' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white relative overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 relative z-10"> 
          <div className="text-center space-y-8">
            {/* Main Title with Enhanced Animation */}
            <div className="relative inline-block">
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${TRANSITIONS.slow} hover:scale-105 cursor-default tracking-tight leading-tight`}>
                <span className="relative inline-block">
                  In Depth Story
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                </span>
              </h1>
            </div>
            
            {/* Subtitle with Better Spacing */}
            <p className="text-xl md:text-2xl text-red-50 max-w-2xl mx-auto font-light tracking-wide">
              Covering The Uncovered
            </p>
            
            {/* Enhanced Tags */}
            <div className="flex items-center justify-center gap-4 pt-6 flex-wrap">
              <span className="group bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-red-700 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white shadow-lg hover:shadow-xl hover:-translate-y-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-current rounded-full animate-pulse"></span>
                  Research
                </span>
              </span>
              <span className="group bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-red-700 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white shadow-lg hover:shadow-xl hover:-translate-y-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  Analysis
                </span>
              </span>
              <span className="group bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-sm font-semibold hover:bg-white hover:text-red-700 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white shadow-lg hover:shadow-xl hover:-translate-y-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                  Satire
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Reach Stats */}
      <div className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We Reach Nepali Across the Globe
            </h2>
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl border-2 border-red-100 text-center ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift} cursor-default`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-600 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-20">
          <div className={`flex items-center gap-3 mb-6 group ${TRANSITIONS.normal}`}>
            <div className={`w-1 h-8 bg-red-600 ${TRANSITIONS.normal} group-hover:h-12`}></div>
            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border-2 border-red-100 mb-8">
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Born during one of Nepal's most turbulent eras, <span className="font-bold text-red-600">In-Depth Story</span> began as a young creator's attempt to question power when speaking up felt risky. What started during the pandemic has now grown into one of Nepal's most trusted sources for explanation-driven journalism, reaching millions every month and shaping national conversations.
              </p>
              <p className="text-[1.35rem] italic text-red-600 text-center mt-6 font-semibold">
                “But at our core, our mission remains unchanged: We help people understand what truly matters and why it matters.”
              </p>
            </div>
          </div>
        </div>


        {/* Journey Transformation Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-16 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our Journey</h2>
          </div>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Animated Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-200 via-red-400 to-red-600 transform -translate-x-1/2 hidden lg:block">
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-red-600 rounded-full transform -translate-x-1/2 animate-pulse"></div>
              <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-red-600 rounded-full transform -translate-x-1/2"></div>
            </div>

            {/* Where It Started */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="lg:pr-8 order-2 lg:order-1">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-block mb-4">
                      <span className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                        The Beginning
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                      One Person, One Camera, One Mission
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      It started in a small room during the pandemic. No studio, no team, no budget—just a young creator with a laptop, a phone camera, and an unshakeable belief that Nepal deserved better media.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      Every video was researched, scripted, filmed, and edited alone. Every thumbnail designed by hand. Every comment replied to personally.
                    </p>
                    <p className="text-red-600 font-bold text-lg italic">
                      "The goal wasn't to go viral. It was to make people think."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 lg:pl-8">
                <div className="relative group cursor-pointer">
                  {/* Image Container with Hover Effect */}
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                    {/* Placeholder - Replace with actual image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center relative">
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Upload prompt or actual image */}
                      <div className="relative z-10 text-center p-8">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/sGfGMHsB09w" 
    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen></iframe>
                      </div>
                      
                      {/* Film grain effect */}
                      <div className="absolute inset-0 opacity-20 bg-repeat" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
                        backgroundSize: '100px 100px'
                      }}></div>
                    </div>
                    
                    {/* Border glow on hover */}
                    <div className="absolute inset-0 border-4 border-red-500 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 bg-white px-6 py-3 rounded-full shadow-xl border-2 border-red-600 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <p className="text-red-600 font-bold text-sm">2020-2021</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transformation Arrow - Compact version */}
            <div className="hidden lg:flex items-center justify-center my-8 relative z-20">
              <div className="bg-white rounded-full p-4 shadow-xl border-3 border-red-600">
                <ArrowRight className="w-8 h-8 text-red-600 transform rotate-90" />
              </div>
            </div>

            {/* Where We Are Today */}
            <div className="grid lg:grid-cols-2 gap-8 mt-8">
              {/* Left Column - Team Image with Content */}
              <div className="lg:pr-8">
                <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border-2 border-red-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group h-full">
                  {/* Decorative Corner */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-red-100 rounded-br-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-block mb-4">
                      <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
                        Today
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                      A Team, An Office, A Movement
                    </h3>
                    
                    {/* Team Image */}
                    <div className="relative overflow-hidden rounded-xl shadow-lg mb-6 group/img">
                      <img 
                        src="resources/IdsTeam.jpeg" 
                        alt="In-Depth Story Team" 
                        className="w-full h-auto object-cover transform transition-transform duration-500 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      Today, In-Depth Story is a team of researchers, writers, editors, designers, and strategists working together to bring you the stories that matter.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      We have our own office, our own workflow, and most importantly—our own voice. No one tells us what to cover. No one edits our conscience.
                    </p>
                    <p className="text-red-600 font-bold text-lg italic">
                      "We've gone from one person's mission to a movement."
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Office Image with Stats */}
              <div className="lg:pl-8">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col relative">
                  {/* Office Image */}
                  <div className="relative overflow-hidden rounded-xl shadow-lg mb-6 group/img flex-grow">
                    <img 
                      src="resources/idsOffice.jpeg" 
                      alt="In-Depth Story Office" 
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <p className="text-gray-900 font-bold text-sm">Our Home in Nepal</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Year Badge */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-600 to-red-700 px-5 py-2 rounded-full shadow-xl border-2 border-white z-30">
                    <p className="text-white font-bold text-sm">2025</p>
                  </div>
                </div>
              </div>
            </div>

            </div>
            {/* Stats Comparison */}
            <div className="mt-12 text-center">
              <p className="text-2xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-red-800 bg-clip-text">
                And we're just getting started!
              </p>
            </div>
        </div>  

        {/* Why We Exist - Improved Layout */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-16 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Why We Exist</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-10 rounded-2xl shadow-lg border-2 border-gray-200 hover:border-red-200 transition-all duration-300">
              <div className="inline-block p-3 bg-gray-100 rounded-xl mb-6">
                <Target className="w-8 h-8 text-gray-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">The Problem</h3>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start gap-3">
                  <span className="text-red-600 text-xl mt-1">↓</span>
                  <span className="text-lg">Nepal and the world are drowning in misinformation, political spin, and algorithm-driven noise.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-red-600 text-xl mt-1">↓</span>
                  <span className="text-lg">People are exhausted, distrustful, and disconnected from the truth.</span>
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-xl mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">The Solution</h3>
              <p className="text-2xl font-bold text-yellow-200 mb-8">
                In-Depth Story is the antidote.
              </p>
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-red-50">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>We don't chase virality or amplify panic</span>
                </p>
                <p className="flex items-center gap-3 text-red-50">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>We don't serve politicians or corporate elites</span>
                </p>
                <p className="flex items-center gap-3 font-bold text-lg">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>We serve the audience</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-r from-yellow-50 via-red-50 to-yellow-50 p-10 rounded-2xl border-2 border-yellow-200">
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-30"></div>
            <p className="relative text-xl md:text-2xl text-gray-800 leading-relaxed text-center italic font-medium">
              We decode politics, economy, governance, foreign policy, and society with honesty, empathy, and depth—the way a trusted friend would sit you down and say, <span className="font-bold text-red-700 not-italic">"ma bujai halxu ni"</span> or <span className="font-bold text-red-700 not-italic">"bujeu ni?"</span> or <span className="font-bold text-red-700 not-italic">"yesto ho kya"</span>
            </p>
          </div>
        </div>

        {/* Community & Creative - Side by Side Enhanced */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
            <div className="inline-block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl mb-6">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">A Community of Youth Who Demand Change</h3>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              In-Depth Story isn't just a media company. It's a community of young people (especially Gen Z) who are tired of the status quo and demand transparency, accountability, and better leadership.
            </p>
            <div className="space-y-3">
              {['We reflect their frustrations', 'We amplify their questions', 'We translate their energy into collective awareness'].map((item, i) => (
                <p key={i} className="flex items-center gap-3 text-gray-700">
                  <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-blue-900 font-bold text-lg">
                Together, we are shaping a new generation of informed citizens.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <Heart className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-6">A Home for Creative Minds</h3>
            <p className="mb-4 text-lg text-red-50 leading-relaxed">
              Behind every story is a team that loves what they do.
            </p>
            <p className="mb-4 text-lg text-red-50 leading-relaxed">
              In-Depth Story has become a place where young creators, editors, thinkers, analysts, and dreamers want to work.
            </p>
            <p className="italic mb-6 text-red-100 text-lg leading-relaxed">
              A space where ideas matter, where curiosity is rewarded, and where creativity is not limited by hierarchy.
            </p>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <p className="font-bold text-yellow-200 text-lg">
                We are building one of Nepal's most exciting creative teams—a team that believes journalism can be bold, beautiful, impactful, and deeply human.
              </p>
            </div>
          </div>
        </div>

        {/* What We Do - Improved */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-16 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">What We Do</h2>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-white p-10 md:p-12 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-red-600 to-red-800 bg-clip-text mb-8 text-center">
              We Explain. We Investigate. We Inspire.
            </h3>
            <p className="text-xl text-gray-700 mb-10 text-center max-w-3xl mx-auto leading-relaxed">
              We produce videos, stories, graphics, and conversations that go beyond headlines, offering meaning, insight, and context.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-red-300 group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{topic.icon}</div>
                  <p className="font-semibold text-gray-900">{topic.name}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t-2 border-gray-200 pt-8 space-y-4">
              {[
                'We spotlight stories others overlook.',
                'We ask the questions others avoid.',
                'And we do it with the responsibility of a brother who cares.'
              ].map((text, i) => (
                <p key={i} className="flex items-start gap-4 text-lg text-gray-700">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2.5 flex-shrink-0"></span>
                  <span className={i === 2 ? 'font-bold text-gray-900' : ''}>{text}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Guiding Principles - Color-coded */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-16 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Our Guiding Principles</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${principle.gradient} p-8 rounded-2xl border-2 ${principle.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
                >
                  <div className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${principle.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision - Enhanced */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white p-12 md:p-16 rounded-3xl text-center mb-20 shadow-2xl">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300 rounded-full blur-3xl opacity-10"></div>
          
          <div className="relative z-10">
            <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-2xl mb-8">
              <Target className="w-12 h-12" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Vision</h2>
            <p className="text-3xl md:text-4xl font-bold mb-10 text-yellow-200">
              To become World's most creative media platform.
            </p>
            <div className="max-w-3xl mx-auto space-y-4 text-xl md:text-2xl text-red-50 leading-relaxed">
              <p>We want to build a smarter public.</p>
              <p>We want to help people imagine what is possible.</p>
              <p>We want to grow a community of citizens who believe in truth over noise.</p>
            </div>
            <div className="mt-12 pt-10 border-t-2 border-red-400/30">
              <p className="text-2xl md:text-3xl font-bold mb-4">
                In-Depth Story exists for the people and because of the people.
              </p>
              <p className="text-xl text-red-100">
                Tell us what you want us to explain next.
              </p>
            </div>
            <div className="text-center mt-7">
                <a
                  href="mailto:business.idsnp@gmail.com"
                  onClick={(e) => {
                    window.location.href = 'mailto:business.idsnp@gmail.com';
                  }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-red-700 hover:to-red-800 cursor-pointer"
                >
                  <Mail className="w-6 h-6" />
                  <span>Email Us</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
          </div>
        </div>

        {/* Connect With Us - Enhanced */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-16 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Stay Connected</h2>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-white p-10 md:p-12 rounded-2xl shadow-lg border border-gray-200">
            <p className="text-2xl text-gray-800 text-center mb-10 font-semibold">Follow our stories across platforms</p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
              {[
                { icon: Facebook, color: 'blue', url: 'https://www.facebook.com/indepthstorynepal/', label: 'Facebook' },
                { icon: Instagram, color: 'pink', url: 'https://instagram.com/indepthstory', label: 'Instagram' },
                { icon: Youtube, color: 'red', url: 'https://youtube.com/@indepthstory', label: 'YouTube' },
                { icon: FaTiktok, color: 'blue', url: 'https://www.tiktok.com/@indepthstoryofficial?lang=en', label: 'TikTok' },
                { icon: Twitter, color: 'sky', url: 'https://www.facebook.com/indepthstorynepal/', label: 'Twitter' },
                { icon: Linkedin, color: 'blue', url: 'https://www.linkedin.com/company/in-depth-story/', label: 'LinkedIn' },
                { icon: FaDiscord, color: 'blue', url: 'https://discord.gg/A7wdgMTd', label: 'Discord' },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-200 hover:border-${social.color}-400`}
                    aria-label={social.label}
                  >
                    <Icon className={`w-10 h-10 text-${social.color}-600 group-hover:scale-110 transition-transform duration-300`} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}