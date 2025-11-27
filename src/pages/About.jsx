import { useState } from 'react';
import { TrendingUp, Users, Heart, Target, Globe, MessageCircle, Video, Award } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { label: 'Total Global Audience', value: '97m', icon: Globe },
    { label: 'Monthly Uniques', value: '54m', icon: Users },
    { label: 'Monthly Video Views', value: '500m', icon: Video },
    { label: 'Social Followers', value: '50.3m', icon: Heart },
    { label: 'Journalists', value: '2600', icon: Users },
    { label: 'Locations', value: '200', icon: Globe },
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
        <div className="mb-16">
          <div className={`flex items-center gap-3 mb-6 group ${TRANSITIONS.normal}`}>
            <div className={`w-1 h-8 bg-red-600 ${TRANSITIONS.normal} group-hover:h-12`}></div>
            <h2 className="text-4xl font-bold text-gray-900">Why We Exist</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border-2 border-red-100 ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">The Problem</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Nepal and the world are drowning in misinformation, political spin, and algorithm-driven noise.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                People are exhausted, distrustful, and disconnected from the truth.
              </p>
            </div>
            
            <div className={`bg-gradient-to-br from-red-600 to-red-700 text-white p-8 rounded-2xl ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift}`}>
              <h3 className="text-2xl font-bold mb-6">The Solution</h3>
              <p className="text-2xl font-bold text-red-100 mb-6">
                In-Depth Story is the antidote.
              </p>
              <div className="space-y-3">
                <p className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-200 rounded-full flex-shrink-0"></span>
                  <span>We don't chase virality or amplify panic</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-red-200 rounded-full flex-shrink-0"></span>
                  <span>We don't serve politicians or corporate elites</span>
                </p>
                <p className="flex items-center gap-3 font-bold text-lg">
                  <span className="w-2 h-2 bg-red-200 rounded-full flex-shrink-0"></span>
                  <span>We serve the audience</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className={`mt-8 bg-white p-8 rounded-2xl border-2 border-gray-200 ${TRANSITIONS.normal} hover:border-red-200`}>
            <p className="text-xl text-gray-700 leading-relaxed text-center italic">
              We decode politics, economy, governance, foreign policy, and society with honesty, empathy, and depth—the way a trusted friend would sit you down and say, <span className="font-semibold text-red-600">"ma bujai halxu ni"</span> or <span className="font-semibold text-red-600">"bujeu ni?"</span> or <span className="font-semibold text-red-600">"yesto ho kya"</span>
            </p>
          </div>
        </div>

        {/* Community & Creative Minds - Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className={`bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border-2 border-red-100 ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift}`}>
            <Users className="w-12 h-12 text-red-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">A Community of Youth Who Demand Change</h3>
            <p className="text-gray-700 mb-4">
              In-Depth Story isn't just a media company. It's a community of young people (especially Gen Z) who are tired of the status quo and demand transparency, accountability, and better leadership.
            </p>
            <div className="space-y-2 text-gray-700">
              <p>• We reflect their frustrations.</p>
              <p>• We amplify their questions.</p>
              <p>• We translate their energy into collective awareness.</p>
            </div>
            <p className="text-red-600 font-bold mt-4">
              Together, we are shaping a new generation of informed citizens.
            </p>
          </div>

          <div className={`bg-gradient-to-br from-red-600 to-red-700 text-white p-8 rounded-2xl ${TRANSITIONS.normal} ${HOVER_EFFECTS.lift}`}>
            <Heart className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-4">A Home for Creative Minds</h3>
            <p className="mb-4">
              Behind every story is a team that loves what they do.
            </p>
            <p className="mb-4">
              In-Depth Story has become a place where young creators, editors, thinkers, analysts, and dreamers want to work.
            </p>
            <p className="italic">
              A space where ideas matter, where curiosity is rewarded, and where creativity is not limited by hierarchy.
            </p>
            <p className="font-bold mt-4 text-red-100">
              We are building one of Nepal's most exciting creative teams—a team that believes journalism can be bold, beautiful, impactful, and deeply human.
            </p>
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
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white p-12 rounded-2xl text-center">
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
      </div>
    </div>
  );
}