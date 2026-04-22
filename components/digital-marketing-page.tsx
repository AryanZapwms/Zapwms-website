"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Megaphone,
  Users,
  Film,
  MapPin,
  Brain,
  Sparkles,
  Tv,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import AnimatedButton from "./animated-button";

const services = [
  {
    title: "Digital Marketing",
    icon: <Megaphone className="w-7 h-7" />,
    description:
      "Complete digital strategies to grow your brand, traffic, and revenue.",
    features: ["SEO", "Paid Ads", "Funnels", "Analytics"],
    outcomes: ["Traffic", "Leads", "Sales"],
    gradient: "from-blue-500/20 to-cyan-600/10",
    border: "border-blue-500/30",
    hover: "hover:border-blue-400/50",
    icon_color: "text-blue-400",
    dot: "bg-blue-500",
    pill_bg: "bg-blue-500/10",
    pill_text: "text-blue-300",
  },
  {
    title: "Influencer Marketing",
    icon: <Users className="w-7 h-7" />,
    description: "Leverage creators to build trust and reach new audiences.",
    features: ["Creator Outreach", "Campaign Strategy", "UGC Content"],
    outcomes: ["Brand Trust", "Reach", "Engagement"],
    gradient: "from-pink-500/20 to-rose-600/10",
    border: "border-pink-500/30",
    hover: "hover:border-pink-400/50",
    icon_color: "text-pink-400",
    dot: "bg-pink-500",
    pill_bg: "bg-pink-500/10",
    pill_text: "text-pink-300",
  },
  {
    title: "Motion Poster Marketing",
    icon: <Film className="w-7 h-7" />,
    description: "Eye-catching animated posters designed for viral campaigns.",
    features: ["Animated Posters", "Social Media Launches", "Teasers"],
    outcomes: ["Virality", "Attention", "Engagement"],
    gradient: "from-purple-500/20 to-violet-600/10",
    border: "border-purple-500/30",
    hover: "hover:border-purple-400/50",
    icon_color: "text-purple-400",
    dot: "bg-purple-500",
    pill_bg: "bg-purple-500/10",
    pill_text: "text-purple-300",
  },
  {
    title: "Offline Marketing",
    icon: <MapPin className="w-7 h-7" />,
    description:
      "Traditional marketing strategies that dominate local markets.",
    features: ["Billboards", "Print Ads", "Events", "Activations"],
    outcomes: ["Local Reach", "Brand Recall"],
    gradient: "from-green-500/20 to-emerald-600/10",
    border: "border-green-500/30",
    hover: "hover:border-green-400/50",
    icon_color: "text-green-400",
    dot: "bg-green-500",
    pill_bg: "bg-green-500/10",
    pill_text: "text-green-300",
  },
  {
    title: "AI Content & Advertising",
    icon: <Brain className="w-7 h-7" />,
    description: "AI-generated content and ads optimized for performance.",
    features: ["AI Creatives", "Ad Copy", "Automation"],
    outcomes: ["Speed", "Efficiency", "ROI"],
    gradient: "from-yellow-500/20 to-orange-600/10",
    border: "border-yellow-500/30",
    hover: "hover:border-yellow-400/50",
    icon_color: "text-yellow-400",
    dot: "bg-yellow-500",
    pill_bg: "bg-yellow-500/10",
    pill_text: "text-yellow-300",
  },
  {
    title: "AI Modeling & Marketing",
    icon: <Sparkles className="w-7 h-7" />,
    description: "AI models and virtual influencers for futuristic branding.",
    features: ["AI Models", "Virtual Campaigns", "Brand Visuals"],
    outcomes: ["Innovation", "Brand Differentiation"],
    gradient: "from-fuchsia-500/20 to-purple-600/10",
    border: "border-fuchsia-500/30",
    hover: "hover:border-fuchsia-400/50",
    icon_color: "text-fuchsia-400",
    dot: "bg-fuchsia-500",
    pill_bg: "bg-fuchsia-500/10",
    pill_text: "text-fuchsia-300",
  },
  {
    title: "TV & Film Advertising",
    icon: <Tv className="w-7 h-7" />,
    description: "Premium ad placements in TV shows and films.",
    features: ["Spot Ads", "Brand Placement", "Media Buying"],
    outcomes: ["Mass Reach", "Brand Authority"],
    gradient: "from-red-500/20 to-orange-600/10",
    border: "border-red-500/30",
    hover: "hover:border-red-400/50",
    icon_color: "text-red-400",
    dot: "bg-red-500",
    pill_bg: "bg-red-500/10",
    pill_text: "text-red-300",
  },
];

export default function DigitalMarketingServices() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-4">
            Digital Marketing Solutions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Modern strategies powered by creativity, data, and AI.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative p-7 rounded-3xl border ${service.border} ${service.hover} bg-gray-900/50 backdrop-blur group`}
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition`}
              />

              <div className="relative z-10">
                <div className={`${service.icon_color} mb-3`}>
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm mb-5">
                  {service.description}
                </p>

                {/* Outcomes */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.outcomes.map((o) => (
                    <span
                      key={o}
                      className={`text-xs px-2 py-1 rounded-full ${service.pill_bg} ${service.pill_text}`}
                    >
                      {o}
                    </span>
                  ))}
                </div>

                {/* Expand */}
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="flex items-center text-sm text-gray-400 mb-3"
                >
                  <ChevronDown
                    className={`w-4 h-4 mr-2 transition ${expanded === i ? "rotate-180" : ""}`}
                  />
                  Details
                </button>

                {expanded === i && (
                  <ul className="space-y-2 text-sm text-gray-300 mb-4">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center">
                        <div
                          className={`w-1.5 h-1.5 ${service.dot} rounded-full mr-2`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <Link href="/contact">
                  <AnimatedButton
                    variant="slim"
                    className="bg-white text-black"
                  >
                    <span className="flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </AnimatedButton>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
