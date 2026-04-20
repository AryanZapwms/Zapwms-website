"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion"
import {
    TrendingUp, Instagram, Facebook, Palette, Share2,
    Globe, Search, Youtube, Video, Sparkles,
    Mail, MousePointer, Linkedin
} from "lucide-react"
import Link from "next/link"

// ─── Data ─────────────────────────────────────────────────────────────────────

const services = [
    {
        id: "performance",
        icon: TrendingUp,
        title: "Performance Marketing",
        tagline: "Sales · Income · Growth",
        tags: ["Search Engine Marketing", "Social Media Marketing", "E-commerce Ads", "Native & Affiliate Ads"],
        outcomes: ["Visibility", "Traffic", "ROI", "ROAS"],
        color: "#06B6D4",
        colorDim: "rgba(180, 231, 240, 0.18)",
        colorBorder: "rgba(6,182,212,0.22)",
        number: "01",
    },
    {
        id: "instagram",
        icon: Instagram,
        title: "Instagram Marketing",
        tagline: "Promotion & Growth",
        tags: ["Page Growth", "Hashtag Research", "Stories & Reels", "Engagement Monitoring"],
        outcomes: ["Followers", "Engagement", "Visibility"],
        color: "#EC4899",
        colorDim: "rgba(150, 95, 122, 0.31)",
        colorBorder: "rgba(236,72,153,0.22)",
        number: "02",
    },
    {
        id: "meta",
        icon: Facebook,
        title: "Meta Facebook Ads",
        tagline: "For Your Business",
        tags: ["Pixel Setup", "A/B Testing", "Sales Funnel", "Re-Targeting"],
        outcomes: ["Brand Awareness", "Leads", "Conversions"],
        color: "#6366F1",
        colorDim: "rgba(145, 147, 216, 0.23)",
        colorBorder: "rgba(99,102,241,0.22)",
        number: "03",
    },
    {
        id: "design",
        icon: Palette,
        title: "Creative Designer",
        tagline: "Graphic Designing Services",
        tags: ["Logo Creation", "Brochures & Flyers", "Illustrations", "Business Cards"],
        outcomes: ["Brand Identity", "Engagement", "Sales"],
        color: "#F59E0B",
        colorDim: "rgba(245, 159, 11, 0.24)",
        colorBorder: "rgba(245,158,11,0.22)",
        number: "04",
    },
    {
        id: "social",
        icon: Share2,
        title: "Social Media Marketing",
        tagline: "Promotion & Growth",
        tags: ["Organic & Paid", "Page Management", "Attractive Creatives", "Optimization"],
        outcomes: ["Connection", "Sales", "Brand Growth"],
        color: "#8B5CF6",
        colorDim: "rgba(138, 92, 246, 0.24)",
        colorBorder: "rgba(139,92,246,0.22)",
        number: "05",
    },
    {
        id: "web",
        icon: Globe,
        title: "Website Developer",
        tagline: "For Your Website",
        tags: ["Web Design", "SEO Friendly", "Fully Responsive", "Web Maintenance"],
        outcomes: ["Presence", "Traffic", "Conversions"],
        color: "#10B981",
        colorDim: "rgba(16, 185, 129, 0.22)",
        colorBorder: "rgba(16,185,129,0.22)",
        number: "06",
    },
    {
        id: "seo",
        icon: Search,
        title: "Advance SEO Service",
        tagline: "#1 Rank on Google",
        tags: ["Search Ranking", "Quality Backlinks", "Competitor Analysis", "On & Off Page"],
        outcomes: ["Page 1 Rank", "Organic Traffic", "More Leads"],
        color: "#EF4444",
        colorDim: "rgba(239, 68, 68, 0.26)",
        colorBorder: "rgba(239,68,68,0.22)",
        number: "07",
    },
    {
        id: "youtube",
        icon: Youtube,
        title: "YouTube Marketing",
        tagline: "Promotion & Growth",
        tags: ["Views & Likes", "Subscribers", "Watch Hours", "Traffic & Ranking"],
        outcomes: ["Views", "Subscribers", "Engagement"],
        color: "#DC2626",
        colorDim: "rgba(251, 52, 52, 0.29)",
        colorBorder: "rgba(220,38,38,0.22)",
        number: "08",
    },
    {
        id: "video",
        icon: Video,
        title: "2D Video Creations",
        tagline: "Professional Video Makers",
        tags: ["Explainer Videos", "Brand Story", "Motion Graphics", "Social Media Videos"],
        outcomes: ["Storytelling", "Engagement", "ROI"],
        color: "#0EA5E9",
        colorDim: "rgba(14,165,233,0.10)",
        colorBorder: "rgba(14,165,233,0.22)",
        number: "09",
    },
    {
        id: "animation",
        icon: Sparkles,
        title: "Animation & Mascot",
        tagline: "Bring Your Brand to Life",
        tags: ["3D Animation", "Whiteboard", "Stop Motion", "360 Animation"],
        outcomes: ["Brand Character", "Viral Potential", "Retention"],
        color: "#D946EF",
        colorDim: "rgba(217,70,239,0.10)",
        colorBorder: "rgba(217,70,239,0.22)",
        number: "10",
    },
    {
        id: "email",
        icon: Mail,
        title: "Affiliate Email Marketing",
        tagline: "Increase Sales & Revenue",
        tags: ["Email Campaigns", "Template Design", "Tracking & Reporting", "Follow-Up Strategy"],
        outcomes: ["Revenue", "Open Rates", "Retention"],
        color: "#14B8A6",
        colorDim: "rgba(20,184,166,0.10)",
        colorBorder: "rgba(20,184,166,0.22)",
        number: "11",
    },
    {
        id: "ppc",
        icon: MousePointer,
        title: "Google Ads / PPC",
        tagline: "Give Your Brand a Larger Reach",
        tags: ["Pixel Setup", "Sales Funnel", "PPC Remarketing", "Display Advertising"],
        outcomes: ["ROI", "Qualified Traffic", "Reach"],
        color: "#4285F4",
        colorDim: "rgba(66,133,244,0.10)",
        colorBorder: "rgba(66,133,244,0.22)",
        number: "12",
    },
    {
        id: "linkedin",
        icon: Linkedin,
        title: "LinkedIn Marketing",
        tagline: "Professional Network Growth",
        tags: ["Page Setup", "Profile Build Up", "Content Creation", "Network Growth"],
        outcomes: ["B2B Leads", "Authority", "Network"],
        color: "#0A66C2",
        colorDim: "rgba(10, 102, 194, 0.31)",
        colorBorder: "rgba(10,102,194,0.22)",
        number: "13",
    },
]

// ─── Animated counter ──────────────────────────────────────────────────────────

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        if (!isInView) return
        const controls = animate(0, value, {
            duration: 1.4,
            ease: "easeOut",
            onUpdate: (v) => setDisplay(Math.round(v)),
        })
        return controls.stop
    }, [isInView, value])

    return <span ref={ref}>{display}{suffix}</span>
}

// ─── Vertical SVG connector between rows ──────────────────────────────────────

function RowConnector({ fromColor, toColor }: { fromColor: string; toColor: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-20px" })
    const gradId = `grad-${fromColor.replace("#", "")}-${toColor.replace("#", "")}`

    return (
        <div ref={ref} className="flex justify-center items-center py-0">
            <svg width="120" height="56" viewBox="0 0 120 56" fill="none" overflow="visible">
                <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={fromColor} />
                        <stop offset="100%" stopColor={toColor} />
                    </linearGradient>
                </defs>
                <motion.path
                    d="M20 0 L20 18 Q20 28 60 28 Q100 28 100 38 L100 56"
                    stroke={`url(#${gradId})`}
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
                    transition={{ duration: 0.9, delay: 0.15, ease: "easeInOut" }}
                />
                {isInView && (
                    <motion.circle
                        r="3.5"
                        fill={toColor}
                        initial={{ offsetDistance: "0%" } as React.CSSProperties & { offsetDistance: string }}
                        animate={{ offsetDistance: "100%" } as React.CSSProperties & { offsetDistance: string }}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                        style={{
                            offsetPath: `path("M20 0 L20 18 Q20 28 60 28 Q100 28 100 38 L100 56")`,
                        } as React.CSSProperties}
                    />
                )}
            </svg>
        </div>
    )
}

// ─── Horizontal dotted connector (desktop, between cards in a row) ─────────────

function HorizontalConnector({ color, isInView }: { color: string; isInView: boolean }) {
    return (
        <div className="hidden lg:flex items-center w-4 flex-shrink-0" aria-hidden>
            <svg width="16" height="2" viewBox="0 0 16 2" style={{ width: "100%", minWidth: 16 }}>
                <motion.line
                    x1="0" y1="1" x2="16" y2="1"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                />
            </svg>
        </div>
    )
}

// ─── Vertical dotted connector (mobile, between stacked cards) ─────────────────

function MobileConnector({ color }: { color: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    return (
        <div ref={ref} className="flex justify-center my-1 lg:hidden">
            <svg width="2" height="40" viewBox="0 0 2 40">
                <motion.line
                    x1="1" y1="0" x2="1" y2="40"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.6 } : {}}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </svg>
        </div>
    )
}

// ─── Service card ──────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const Icon = service.icon
    const xOffset = index % 2 === 0 ? -24 : 24

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20, x: xOffset }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-full"
        >
            {/* Hover glow */}
            <div
                className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: service.colorDim }}
            />

            <div
                className="relative h-full rounded-2xl p-5 border bg-[#111111] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
                style={{
                    borderColor: service.colorBorder,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
            >
                {/* Top accent bar */}
                <motion.div
                    className="absolute top-0 left-5 right-5 h-0.5 rounded-full"
                    style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.3 }}
                />

                {/* Number + icon */}
                <div className="flex items-center justify-between mb-4">
                    <span
                        className="text-4xl font-black leading-none select-none"
                        style={{ color: service.colorDim, WebkitTextStroke: `1px ${service.color}33` }}
                    >
                        {service.number}
                    </span>
                    <motion.div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: service.colorDim, border: `1px solid ${service.colorBorder}` }}
                        whileHover={{ rotate: 6, scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 350 }}
                    >
                        <Icon className="w-4 h-4" style={{ color: service.color }} />
                    </motion.div>
                </div>

                {/* Tagline + Title */}
                <p className="text-[10px] uppercase tracking-[0.14em] mb-1 font-semibold" style={{ color: service.color }}>
                    {service.tagline}
                </p>
                <h3 className="text-[15px] font-bold text-slate-800 mb-3 leading-snug">{service.title}</h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
                            style={{
                                background: service.colorDim,
                                color: service.color,
                                border: `1px solid ${service.colorBorder}`,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Outcomes */}
                <div className="pt-3 border-t border-slate-100">
                    <p className="text-[9px] uppercase tracking-widest text-slate-400 mb-1.5">Outcomes</p>
                    <div className="flex flex-wrap gap-1.5">
                        {service.outcomes.map((o, i) => (
                            <motion.span
                                key={o}
                                className="text-[11px] font-bold"
                                style={{ color: service.color }}
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ delay: 0.4 + i * 0.08 }}
                            >
                                {o}
                                {i < service.outcomes.length - 1 && (
                                    <span className="text-slate-300 ml-1.5">·</span>
                                )}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Pulsing corner dot */}
                <motion.div
                    className="absolute bottom-3.5 right-3.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: service.color }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    )
}

// ─── Row of cards with horizontal connectors ──────────────────────────────────

function CardRow({ group, startIndex }: { group: typeof services; startIndex: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-40px" })

    return (
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-0 items-stretch">
            {group.map((service, i) => (
                <div key={service.id} className="flex items-stretch min-w-0">
                    <div className="flex-1 min-w-0">
                        {/* Mobile connector above card (except first) */}
                        {i > 0 && <MobileConnector color={service.color} />}
                        <ServiceCard service={service} index={startIndex + i} />
                    </div>
                    {/* Desktop horizontal connector */}
                    {i < group.length - 1 && (
                        <HorizontalConnector color={service.color} isInView={isInView} />
                    )}
                </div>
            ))}
        </div>
    )
}

// ─── Parallax ambient blob ─────────────────────────────────────────────────────

function ParallaxBlob({
    color, top, left, delay = 0,
}: {
    color: string; top: string; left: string; delay?: number
}) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
    const y = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"])

    return (
        <motion.div
            ref={ref}
            style={{ y, top, left, position: "absolute", pointerEvents: "none" }}
            className="w-64 h-64 rounded-full blur-3xl opacity-[0.05]"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
        >
            <div className="w-full h-full rounded-full" style={{ background: color }} />
        </motion.div>
    )
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 rounded-3xl overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #111827 0%, #0f172a 50%, #1e1b4b 100%)",
                border: "1.5px solid rgba(99,102,241,0.12)",
                boxShadow: "0 4px 32px rgba(99,102,241,0.08)",
            }}
        >
            <div className="p-10 sm:p-16 text-center relative">
                {/* Subtle gradient accent */}
                <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 60%)",
                    }}
                />
                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-semibold">
                        Ready to Scale?
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
                        Let&apos;s Build Your<br />Digital Ecosystem
                    </h3>
                    <p className="text-slate-400 max-w-sm mx-auto mb-8 text-sm leading-relaxed">
                        Every service above is tailor-made to your business. Let&apos;s map out exactly what you need.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-slate-700 transition-colors duration-200"
                        >
                            Book a Free Strategy Call
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-slate-300 text-sm font-semibold hover:bg-slate-50 transition-colors duration-200"
                        >
                            View All Services
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// ─── Scroll progress bar ───────────────────────────────────────────────────────

function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
    return (
        <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-slate-100">
            <motion.div
                className="h-full origin-left"
                style={{
                    width,
                    background: "linear-gradient(90deg, #06B6D4, #6366F1, #EC4899)",
                }}
            />
        </div>
    )
}

// ─── Main export ───────────────────────────────────────────────────────────────

export default function BrochureInfographic() {
    const containerRef = useRef(null)
    const headerRef = useRef(null)
    const headerInView = useInView(headerRef, { once: true })

    // Group services into rows of 3
    const rows = [
        services.slice(0, 3),
        services.slice(3, 6),
        services.slice(6, 9),
        services.slice(9, 12),
        services.slice(12),
    ]

    return (
        <section
            ref={containerRef}
            className="relative py-20 bg-[#0a0a0a] overflow-hidden"
            style={{
                backgroundImage: `
          linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)
        `,
                backgroundSize: "48px 48px",
            }}
        >
            <ScrollProgress />

            {/* Ambient parallax blobs */}
            <ParallaxBlob color="#06B6D4" top="4%" left="2%" delay={0} />
            <ParallaxBlob color="#8B5CF6" top="28%" left="82%" delay={2} />
            <ParallaxBlob color="#EC4899" top="58%" left="6%" delay={1} />
            <ParallaxBlob color="#10B981" top="78%" left="74%" delay={3} />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ── */}
                <div ref={headerRef} className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 bg-indigo-50 text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-5"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Interactive Service Map
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.65, delay: 0.08 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 text-white leading-[1.05]"
                    >
                        Every Service.
                        <br />
                        <span
                            className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 bg-clip-text text-transparent"
                        >
                            One Connected System.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.16 }}
                        className="text-slate-400 max-w-md mx-auto text-base leading-relaxed"
                    >
                        Scroll through our full ecosystem of digital services — each one precision-built, all of them connected.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.26 }}
                        className="flex flex-wrap justify-center gap-10 mt-9"
                    >
                        {[
                            { value: 13, suffix: "+", label: "Services" },
                            { value: 25, suffix: "+", label: "Years Experience" },
                            { value: 100, suffix: "+", label: "Global Clients" },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-3xl font-black text-white">
                                    <Counter value={s.value} suffix={s.suffix} />
                                </div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1 font-medium">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Service rows ── */}
                <div className="space-y-0">
                    {rows.map((row, rowIdx) => {
                        const startIndex = rowIdx * 3
                        const lastColorInRow = row[row.length - 1].color
                        const firstColorNextRow = rows[rowIdx + 1]?.[0]?.color

                        return (
                            <div key={rowIdx}>
                                {/* Single-column override for the last row (LinkedIn) */}
                                {row.length === 1 ? (
                                    <div className="max-w-sm mx-auto">
                                        <ServiceCard service={row[0]} index={startIndex} />
                                    </div>
                                ) : (
                                    <CardRow group={row} startIndex={startIndex} />
                                )}

                                {/* Vertical connector to next row */}
                                {rowIdx < rows.length - 1 && firstColorNextRow && (
                                    <RowConnector
                                        fromColor={lastColorInRow}
                                        toColor={firstColorNextRow}
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* ── CTA ── */}
                <FinalCTA />
            </div>
        </section>
    )
}