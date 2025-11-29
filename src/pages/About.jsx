import { useState } from 'react';
import { TrendingUp, Users, Heart, Target, Globe, MessageCircle, Video, Award, Mail, Facebook, Instagram, Youtube, Twitter, Linkedin, CheckCircle, ArrowRight } from 'lucide-react';

const TRANSITIONS = {
  fast: 'transition-all duration-200 ease-out',
  normal: 'transition-all duration-300 ease-out',
  slow: 'transition-all duration-500 ease-out',
};

const HOVER_EFFECTS = {
  scale: 'hover:scale-105 active:scale-95',
  lift: 'hover:-translate-y-1 hover:shadow-xl',
};

export const About = () =>{
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { label: 'Total Global Audience', value: '97m', icon: Globe },
    { label: 'Monthly Uniques', value: '54m', icon: Users },
    { label: 'Monthly Video Views', value: '500m', icon: Video },
  ];

  const principles = [
    {
      title: 'Audience First',
      description: 'Every story begins with: "Will this help people understand the world better?"',
      icon: Users,
    },
    {
      title: 'Transparency Builds Trust',
      description: 'We show our sources, our process, and our reasoning.',
      icon: Heart,
    },
    {
      title: 'Context Over Noise',
      description: 'We go deeper, slower, and more meaningfully.',
      icon: Target,
    },
    {
      title: 'Speak Truth to Power',
      description: 'Critique is not negativity. Accountability is service to the public.',
      icon: TrendingUp,
    },
    {
      title: 'Make Complexity Simple',
      description: 'No jargon. No academic walls. Just clear, human explanations.',
      icon: MessageCircle,
    },
    {
      title: 'Youth Voices Matter',
      description: 'They are not the future—they are the present.',
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center space-y-6">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${TRANSITIONS.slow} hover:scale-105 inline-block cursor-default`}>
              Covering The Uncovered
            </h1>
            <p className="text-2xl md:text-3xl text-red-100 max-w-4xl mx-auto">
              We are your friend or a brother, who explains complex things in simple words.
            </p>
            <div className="flex items-center justify-center gap-4 pt-6 flex-wrap">
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold">
                Research
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold">
                Analysis
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold">
                Satire
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
              IDS Reaches Nepali Across the Globe
            </h2>
            <p className="text-xl text-gray-600">180 countries • 1 million total followers • 50 million monthly reach</p>
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
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <div className={`flex items-center gap-3 mb-6 group ${TRANSITIONS.normal}`}>
            <div className={`w-1 h-8 bg-red-600 ${TRANSITIONS.normal} group-hover:h-12`}></div>
            <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border-2 border-red-100 mb-8">
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Born during one of Nepal's most turbulent eras, <span className="font-bold text-red-600">In-Depth Story</span> began as a young creator's attempt to question power when speaking up felt risky. What started during the pandemic has now grown into one of Nepal's most trusted sources for explanation-driven journalism, reaching millions every month and shaping national conversations.
              </p>
              <p className="text-2xl font-bold text-red-600 text-center mt-6">
                But at our core, our mission remains unchanged:<br />
                We help people understand what truly matters and why it matters.
              </p>
            </div>
          </div>
        </div>

        {/* Why We Exist */}
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

        {/* What We Do */}
        <div className="mb-16">
          <div className={`flex items-center gap-3 mb-6 group ${TRANSITIONS.normal}`}>
            <div className={`w-1 h-8 bg-red-600 ${TRANSITIONS.normal} group-hover:h-12`}></div>
            <h2 className="text-4xl font-bold text-gray-900">What We Do</h2>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
            <h3 className="text-3xl font-bold text-red-600 mb-6 text-center">
              We Explain. We Investigate. We Inspire.
            </h3>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
              We produce videos, stories, graphics, and conversations that go beyond headlines, offering meaning, insight, and context.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                'Politics & Governance',
                'Economy & Development',
                'Foreign Policy & Geopolitics',
                'Culture, Society & Identity',
                'Youth & Technology',
              ].map((topic, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-red-200 ${TRANSITIONS.normal} ${HOVER_EFFECTS.scale}`}
                >
                  <p className="font-semibold text-gray-900 text-center">{topic}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 text-lg text-gray-700">
              <p className="flex items-start gap-3">
                <span className="text-red-600 text-2xl">•</span>
                <span>We spotlight stories others overlook.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-red-600 text-2xl">•</span>
                <span>We ask the questions others avoid.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-red-600 text-2xl">•</span>
                <span className="font-bold">And we do it with the responsibility of a brother who cares.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="mb-16">
          <div className={`flex items-center gap-3 mb-6 group ${TRANSITIONS.normal}`}>
            <div className={`w-1 h-8 bg-red-600 ${TRANSITIONS.normal} group-hover:h-12`}></div>
            <h2 className="text-4xl font-bold text-gray-900">Our Guiding Principles</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-2xl border-2 border-gray-200 ${TRANSITIONS.normal} hover:border-red-300 hover:shadow-xl`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white p-12 rounded-2xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Vision</h2>
          <p className="text-3xl font-bold mb-8 text-red-100">
            To become World's most creative media platform.
          </p>
          <div className="max-w-3xl mx-auto space-y-4 text-xl">
            <p>We want to build a smarter public.</p>
            <p>We want to help people imagine what is possible.</p>
            <p>We want to grow a community of citizens who believe in truth over noise.</p>
          </div>
          <div className="mt-12 pt-8 border-t border-red-400">
            <p className="text-2xl font-bold mb-4">
              In-Depth Story exists for the people and because of the people.
            </p>
            <p className="text-xl text-red-100">
              Tell us what you want us to explain next.
            </p>
          </div>
        </div>

        {/* Connect With Us */}
        <div className="mb-16">
          <div className={`flex items-center gap-3 mb-6 group ${TRANSITIONS.normal}`}>
            <div className={`w-1 h-8 bg-red-600 ${TRANSITIONS.normal} group-hover:h-12`}></div>
            <h2 className="text-4xl font-bold text-gray-900">Stay Connected</h2>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-white p-12 rounded-2xl border-2 border-red-100">
            <p className="text-xl text-gray-700 text-center mb-8">Follow our stories across platforms</p>
            
            <div className="flex items-center justify-center gap-6 flex-wrap mb-10">
              <a
                href="https://facebook.com/indepthstory"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white p-5 rounded-xl border-2 border-gray-200 ${TRANSITIONS.normal} hover:border-blue-500 ${HOVER_EFFECTS.lift}`}
                aria-label="Facebook"
              >
                <Facebook className="w-10 h-10 text-blue-600" />
              </a>
              
              <a
                href="https://instagram.com/indepthstory"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white p-5 rounded-xl border-2 border-gray-200 ${TRANSITIONS.normal} hover:border-pink-500 ${HOVER_EFFECTS.lift}`}
                aria-label="Instagram"
              >
                <Instagram className="w-10 h-10 text-pink-600" />
              </a>
              
              <a
                href="https://youtube.com/@indepthstory"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white p-5 rounded-xl border-2 border-gray-200 ${TRANSITIONS.normal} hover:border-red-500 ${HOVER_EFFECTS.lift}`}
                aria-label="YouTube"
              >
                <Youtube className="w-10 h-10 text-red-600" />
              </a>
              
              <a
                href="https://twitter.com/indepthstory"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white p-5 rounded-xl border-2 border-gray-200 ${TRANSITIONS.normal} hover:border-sky-500 ${HOVER_EFFECTS.lift}`}
                aria-label="Twitter"
              >
                <Twitter className="w-10 h-10 text-sky-600" />
              </a>
              
              <a
                href="https://linkedin.com/company/indepthstory"
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white p-5 rounded-xl border-2 border-gray-200 ${TRANSITIONS.normal} hover:border-blue-700 ${HOVER_EFFECTS.lift}`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-10 h-10 text-blue-700" />
              </a>
            </div>

            <div className="pt-8 border-t-2 border-red-200">
              <p className="text-lg text-gray-700 text-center mb-6">For tips, story ideas, or feedback</p>
              <div className="text-center">
                <a
                  href="mailto:contact@indepthstory.com"
                  className={`inline-flex items-center gap-3 bg-gradient-to-br from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg ${TRANSITIONS.normal} hover:shadow-xl ${HOVER_EFFECTS.scale}`}
                >
                  <Mail className="w-6 h-6" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}