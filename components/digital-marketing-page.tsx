// app/components/digital-marketing-page.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ================= DATA (unchanged) ================= */
const services = [
  {
    title: "Influencer Marketing",
    desc: "Connect your brand with trusted creators to build credibility, reach new audiences, and drive conversions.",
    best: "D2C brands, product launches, lifestyle brands",
    details: [
      "Influencer discovery across Instagram, YouTube, LinkedIn",
      "End-to-end campaign management and execution",
      "Content planning and creative direction",
      "UGC (User Generated Content) production",
      "Performance tracking and ROI optimization",
    ],
  },
  {
    title: "AI Marketing",
    desc: "Leverage AI to automate campaigns, optimize targeting, and maximize performance in real-time.",
    best: "E-commerce, SaaS, scaling businesses",
    details: [
      "AI-driven audience targeting and segmentation",
      "Campaign automation and optimization",
      "Predictive analytics for better decisions",
      "AI-generated creatives and ad copies",
      "Performance monitoring and scaling",
    ],
  },
  {
    title: "AI Model Generation",
    desc: "Create hyper-realistic AI models for product visuals without the cost of traditional shoots.",
    best: "Fashion, beauty, e-commerce brands",
    details: [
      "Custom AI model creation (age, ethnicity, style)",
      "Product catalogue-ready images",
      "Bulk image generation for scaling",
      "Consistent branding across visuals",
      "Faster turnaround vs traditional shoots",
    ],
  },
  {
    title: "Motion Posters",
    desc: "Cinematic animated posters designed to capture attention and increase engagement.",
    best: "Films, events, product launches",
    details: [
      "High-quality motion graphics and animation",
      "Social media optimized formats",
      "Teaser and promotional visuals",
      "Visual storytelling for campaigns",
      "Platform-specific adaptations",
    ],
  },
  {
    title: "Anime & Animation",
    desc: "Custom anime-style visuals and animations for engaging storytelling and branding.",
    best: "Gaming, youth-focused brands, startups",
    details: [
      "Character design and development",
      "2D/3D animation production",
      "Explainer and storytelling videos",
      "Branded animation campaigns",
      "Creative direction and scripting",
    ],
  },
  {
    title: "Spot Advertising",
    desc: "Short, high-impact ads designed to grab attention and drive quick conversions.",
    best: "Product launches, offers, events",
    details: [
      "6–30 second ad creatives",
      "High-conversion social media ads",
      "A/B testing for optimization",
      "Platform-specific ad variations",
      "Performance tracking and iteration",
    ],
  },
  {
    title: "YouTube Ads (Non-Skip)",
    desc: "Guaranteed visibility ads that deliver strong brand recall through storytelling.",
    best: "Brand awareness, premium products",
    details: [
      "Non-skippable ad formats",
      "Audience targeting and segmentation",
      "Creative storytelling approach",
      "Ad performance analytics",
      "Campaign optimization strategies",
    ],
  },
  {
    title: "Brand Awareness Campaigns",
    desc: "Multi-channel campaigns to build brand recognition, trust, and authority.",
    best: "Startups, rebranding, new markets",
    details: [
      "Brand positioning and messaging",
      "Cross-platform campaign execution",
      "Creative and content strategy",
      "Audience targeting and reach expansion",
      "Performance tracking and reporting",
    ],
  },
  {
    title: "SEO Content Writing",
    desc: "Content that ranks on search engines and converts visitors into customers.",
    best: "Websites, blogs, e-commerce",
    details: [
      "SEO blog writing and articles",
      "Website and landing page copy",
      "Keyword research and optimization",
      "Product descriptions and content",
      "Content strategy planning",
    ],
  },
  {
    title: "Wikipedia Writing",
    desc: "Professional Wikipedia page creation with proper research and compliance.",
    best: "Public figures, brands, organizations",
    details: [
      "In-depth research and sourcing",
      "Wikipedia-compliant content writing",
      "Page creation and publishing",
      "Content editing and updates",
      "Approval process guidance",
    ],
  },
  {
    title: "Facebook Marketplace Marketing",
    desc: "Optimize product listings to drive direct leads and sales from marketplace.",
    best: "Local businesses, e-commerce brands",
    details: [
      "Optimized product listings",
      "SEO-driven descriptions",
      "Lead generation strategies",
      "Audience targeting",
      "Conversion optimization",
    ],
  },
  {
    title: "Artist Promotion",
    desc: "Promote music across streaming and social platforms to increase visibility.",
    best: "Independent artists, music labels",
    details: [
      "Playlist pitching and placements",
      "Social media promotions",
      "PR and outreach campaigns",
      "Audience targeting strategies",
      "Growth tracking and analytics",
    ],
  },
  {
    title: "Audio / Video Promotion",
    desc: "Boost reach and engagement for audio and video content across platforms.",
    best: "Music creators, video creators",
    details: [
      "Streaming platform promotions",
      "YouTube marketing strategies",
      "Cross-platform distribution",
      "Audience targeting",
      "Performance analytics",
    ],
  },
  {
    title: "Music Revenue Generation",
    desc: "Monetize your music across global streaming platforms efficiently.",
    best: "Artists, music producers",
    details: [
      "Distribution to Spotify, Apple Music, etc.",
      "Royalty management and tracking",
      "Monetization strategies",
      "Content ID setup",
      "Revenue optimization",
    ],
  },
  {
    title: "Music Video Production",
    desc: "End-to-end production of high-quality music videos.",
    best: "Artists, labels",
    details: [
      "Concept development and scripting",
      "Professional video shooting",
      "Editing and post-production",
      "Creative direction",
      "Distribution-ready output",
    ],
  },
  {
    title: "Product Photography",
    desc: "High-quality visuals designed to boost product appeal and conversions.",
    best: "E-commerce, brands",
    details: [
      "Studio product shoots",
      "High-end retouching",
      "Catalogue-ready images",
      "Lighting and composition setup",
      "Multiple angle shots",
    ],
  },
  {
    title: "Beauty Product Shoots",
    desc: "Premium visuals that highlight product aesthetics and quality.",
    best: "Beauty, skincare brands",
    details: [
      "Macro and detail shots",
      "Luxury styling and setup",
      "Creative compositions",
      "High-end visual storytelling",
      "Brand-focused aesthetics",
    ],
  },
  {
    title: "Model Product Shoots",
    desc: "Lifestyle-based shoots using models to increase engagement and trust.",
    best: "Fashion, apparel brands",
    details: [
      "Model casting and selection",
      "Styling and wardrobe planning",
      "Professional shoot execution",
      "Brand-aligned visuals",
      "Campaign-ready assets",
    ],
  },
  {
    title: "Brand Face Shoots",
    desc: "Create a strong brand identity with a recognizable face.",
    best: "Personal brands, companies",
    details: [
      "Face selection and casting",
      "Brand alignment strategy",
      "Campaign visuals creation",
      "Consistency across marketing",
      "Identity development",
    ],
  },
  {
    title: "Regional Marketing",
    desc: "Localized campaigns tailored to different regions and cultures.",
    best: "Pan-India brands, local businesses",
    details: [
      "Regional language adaptations",
      "Localized content creation",
      "Cultural targeting strategies",
      "Regional ad campaigns",
      "Market-specific optimization",
    ],
  },
];

/* ================= SCROLL STACK (React Bits style) ================= */
function ScrollStack({
  items,
  onCardClick,
}: {
  items: { title: string; description: string; content: any }[];
  onCardClick: (service: any) => void;
}) {
  return (
    <div className="relative">
      {items.map((item, index) => (
        <ScrollStackCard
          key={index}
          item={item}
          index={index}
          total={items.length}
          onClick={() => onCardClick(item.content)}
        />
      ))}
    </div>
  );
}

function ScrollStackCard({
  item,
  index,
  total,
  onClick,
}: {
  item: { title: string; description: string };
  index: number;
  total: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const topOffset = index * 8;
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 1, 0.6]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        position: "sticky",
        top: `calc(15vh + ${topOffset}px)`,
        scale,
        opacity,
        zIndex: total - index,
      }}
      className="w-full max-w-2xl mx-auto p-6 border border-gray-800 rounded-2xl bg-white  text-black cursor-pointer hover:border-yellow-400  mb-4"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
      <p className="text-black">{item.description}</p>
    </motion.div>
  );
}

/* ================= SLIDE-IN DRAWER ================= */
function ServiceDrawer({
  service,
  onClose,
}: {
  service: any;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-[100] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer panel */}
          <motion.div
            className="relative w-full md:w-[50vw] lg:w-[45vw] bg-gray-900 border-l border-gray-800 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="p-8 pt-20">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-white border border-gray-700 rounded-lg px-3 py-1 transition-colors"
              >
                ✕ Close
              </button>

              {/* Title */}
              <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
              <p className="text-lg text-gray-400 mb-10">{service.desc}</p>

              {/* Best For */}
              <div className="mb-10 p-5 border border-yellow-400/30 rounded-xl bg-yellow-400/10">
                <h3 className="text-sm font-semibold text-yellow-300 mb-1">
                  🎯 Best For
                </h3>
                <p className="text-yellow-200">{service.best}</p>
              </div>

              {/* What’s Included */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6">What’s Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.details.map((d: string, i: number) => (
                    <div
                      key={i}
                      className="p-4 border border-gray-800 rounded-xl bg-gray-800/50 text-sm"
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* What You Get */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6">What You Get</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-800 rounded-xl text-center text-sm">
                    🚀 Faster Growth
                  </div>
                  <div className="p-4 border border-gray-800 rounded-xl text-center text-sm">
                    📈 More Leads
                  </div>
                  <div className="p-4 border border-gray-800 rounded-xl text-center text-sm">
                    💰 Higher ROI
                  </div>
                </div>
              </div>

              {/* Use Cases */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-4">Use Cases</h3>
                <p className="text-gray-400">
                  This service is ideal for brands looking to scale quickly,
                  build strong visibility, and convert audiences into customers.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center pb-10">
                <p className="text-gray-400 mb-6">
                  Get a custom strategy tailored to your business goals.
                </p>
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-medium hover:scale-105 transition">
                  Get Free Consultation
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================= MAIN PAGE ================= */
export default function DigitalMarketingPage() {
  const [active, setActive] = useState<any>(null);

  return (
    <div className="bg-black text-white min-h-screen px-6 py-20">
      {/* Hero */}
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore all the services we offer to scale your brand.
        </p>
      </div>

      {/* Scroll Stack */}
      <ScrollStack
        items={services.map((s) => ({
          title: s.title,
          description: s.desc,
          content: s,
        }))}
        onCardClick={setActive}
      />

      {/* Slide‑in Drawer */}
      <ServiceDrawer service={active} onClose={() => setActive(null)} />
    </div>
  );
}