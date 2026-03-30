import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Facebook,
  Globe,
  Instagram,
  Leaf,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  QrCode,
  Rocket,
  Sprout,
  Star,
  Target,
  Trophy,
  Twitter,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ── helpers ─────────────────────────────────────── */
function useFadeUp(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/** Hook for individual agenda items — fires once on entry */
function useAgendaItem(index: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible, delay: `${index * 120}ms` };
}

const NAV_LINKS = ["About", "Agenda", "Evaluation", "Prizes", "Register"];

/* ── particles data ──────────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.8 + 2) % 100}%`,
  delay: `${(i * 0.7) % 9}s`,
  duration: `${10 + ((i * 1.3) % 12)}s`,
  size: `${8 + ((i * 3) % 12)}px`,
  isEven: i % 2 === 0,
}));

export default function App() {
  const [navSolid, setNavSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-body bg-background text-foreground">
      {/* ── NAV ──────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navSolid
            ? "bg-[#0B2A16]/95 nav-glass shadow-[0_2px_24px_#0004]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* logo */}
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="font-display font-bold text-xl tracking-widest gold-shimmer select-none"
            data-ocid="nav.link"
          >
            AGRIVISION 2.0
          </button>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <button
                type="button"
                key={l}
                data-ocid="nav.link"
                onClick={() => scrollTo(l.toLowerCase())}
                className="px-4 py-1.5 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
              >
                {l}
              </button>
            ))}
            <button
              type="button"
              data-ocid="nav.primary_button"
              onClick={() => scrollTo("register")}
              className="ml-3 px-5 py-2 rounded-full bg-[#1F7A3A] hover:bg-[#2E8B57] hover:scale-105 text-white text-sm font-semibold transition-all duration-200 shadow-green pulse-cta"
            >
              Register Now
            </button>
          </div>

          {/* mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0B2A16]/98 nav-glass border-t border-white/10 px-4 pb-4"
            >
              {NAV_LINKS.map((l) => (
                <button
                  type="button"
                  key={l}
                  onClick={() => scrollTo(l.toLowerCase())}
                  className="block w-full text-left py-3 text-white/80 hover:text-white border-b border-white/5 text-sm font-medium"
                >
                  {l}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("register")}
                className="mt-3 w-full py-3 rounded-full bg-[#1F7A3A] hover:bg-[#2E8B57] text-white font-semibold text-sm transition-all"
              >
                Register Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center parallax-hero overflow-hidden"
        style={{
          backgroundImage: `url('/assets/generated/hero-agrivision.dim_1920x1080.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* gradient overlays — bottom-to-top green fade + top vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(27,94,32,0.75) 0%, rgba(0,0,0,0.35) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A16]/80 via-[#0B2A16]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A16]/70 via-transparent to-transparent" />

        {/* floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className="particle absolute"
              style={{
                left: p.left,
                bottom: "-20px",
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
                background: p.isEven
                  ? "oklch(0.76 0.1 80 / 0.65)"
                  : "oklch(0.54 0.13 155 / 0.5)",
                borderRadius: p.isEven ? "50% 0 50% 0" : "0 50% 0 50%",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-28 w-full">
          <div className="max-w-2xl">
            {/* badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D6B56D]/40 bg-[#D6B56D]/10 mb-6"
            >
              <Leaf size={14} className="text-[#D6B56D]" />
              <span className="text-[#D6B56D] text-xs font-semibold tracking-widest uppercase">
                KLS GIT × EWB India × IIC
              </span>
            </motion.div>

            {/* title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-display font-bold uppercase leading-none mb-4"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              <span className="gold-shimmer block">AGRI</span>
              <span className="gold-shimmer block">VISION 2.0</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white text-lg sm:text-xl font-semibold mb-2"
            >
              Inter-College Agri-Tech Innovation Challenge
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white/70 text-base sm:text-lg mb-8"
            >
              Where Engineering Meets Agriculture
            </motion.p>

            {/* date + venue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <div className="flex items-center gap-2 text-white/80">
                <Calendar size={16} className="text-[#D6B56D]" />
                <span className="text-sm font-medium">
                  6th – 7th April 2026
                </span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin size={16} className="text-[#D6B56D]" />
                <span className="text-sm font-medium">
                  KLS Gogte Institute of Technology, Belagavi
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <button
                type="button"
                data-ocid="hero.secondary_button"
                onClick={() => scrollTo("agenda")}
                className="px-8 py-3.5 rounded-full border-2 border-[#D6B56D] text-[#D6B56D] font-semibold hover:bg-[#D6B56D] hover:text-[#0B2A16] hover:scale-105 transition-all duration-200 text-sm tracking-wide shadow-lg"
              >
                View Agenda
              </button>
              <button
                type="button"
                data-ocid="hero.primary_button"
                onClick={() => scrollTo("register")}
                className="px-8 py-3.5 rounded-full bg-[#1F7A3A] hover:bg-[#2E8B57] hover:scale-105 text-white font-semibold transition-all duration-200 text-sm tracking-wide pulse-cta shadow-lg"
              >
                Register Now
              </button>
            </motion.div>

            {/* stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { label: "Prize Pool", value: "₹15,000", icon: Trophy },
                { label: "Duration", value: "2 Days", icon: Calendar },
                { label: "Format", value: "Agrithon", icon: Users },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D6B56D]/15 flex items-center justify-center">
                    <Icon size={18} className="text-[#D6B56D]" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg leading-none">
                      {value}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────── */}
      <AboutSection />

      {/* ── AGENDA ───────────────────────────────────── */}
      <AgendaSection />

      {/* ── EVALUATION ───────────────────────────────── */}
      <EvaluationSection />

      {/* ── PRIZES ───────────────────────────────────── */}
      <PrizesSection />

      {/* ── REGISTER ─────────────────────────────────── */}
      <RegisterSection />

      {/* ── FOOTER ───────────────────────────────────── */}
      <Footer />
    </div>
  );
}

/* ─────────────────── ABOUT ─────────────────────── */
function AboutSection() {
  const s1 = useFadeUp();
  const s2 = useFadeUp();

  const features = [
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "Build creative, real-world solutions that transform agriculture",
    },
    {
      icon: Users,
      title: "Teamwork",
      desc: "Collaborate across disciplines to create impactful prototypes",
    },
    {
      icon: Sprout,
      title: "Smart Farming",
      desc: "IoT, AI/ML, mobile & web apps for modern agriculture",
    },
    {
      icon: Rocket,
      title: "Entrepreneurship",
      desc: "Pitch your idea like a startup to investors and experts",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 md:py-24"
      style={{
        background:
          "linear-gradient(180deg, #f0f4f1 0%, #e8f0ea 60%, #f4f6f7 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* title */}
        <div
          ref={s1.ref}
          className={`fade-up text-center mb-16 ${s1.visible ? "visible" : ""}`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#1F7A3A]/10 text-[#1F7A3A] text-xs font-bold tracking-widest uppercase mb-4">
            About the Event
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#0B2A16] mb-6">
            What is <span className="text-gradient-green">AGRIVISION 2.0?</span>
          </h2>
          <p className="text-[#2B2B2B]/70 text-lg max-w-3xl mx-auto leading-relaxed">
            AGRIVISION 2.0 is a prestigious two-day inter-college Agri-Tech
            innovation challenge organized by
            <strong className="text-[#0B2A16]">
              {" "}
              KLS Gogte Institute of Technology, Belagavi
            </strong>{" "}
            in association with{" "}
            <strong className="text-[#0B2A16]">
              Engineers Without Borders India
            </strong>{" "}
            and the
            <strong className="text-[#0B2A16]">
              {" "}
              Institution's Innovation Council
            </strong>
            .
          </p>
        </div>

        {/* organizer chips */}
        <div
          ref={s2.ref}
          className={`fade-up stagger mb-16 flex flex-wrap justify-center gap-4 ${s2.visible ? "visible" : ""}`}
        >
          {[
            { label: "KLS Gogte Institute of Technology", icon: Globe },
            { label: "Engineers Without Borders India", icon: Award },
            { label: "Institution's Innovation Council", icon: Zap },
          ].map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1F7A3A]/25 bg-white shadow-xs text-sm font-medium text-[#0E3A1F]"
            >
              <Icon size={15} className="text-[#1F7A3A]" />
              {label}
            </div>
          ))}
        </div>

        {/* agrithon callout */}
        <div className="bg-gradient-to-br from-[#0B2A16] to-[#114D28] rounded-2xl p-8 sm:p-12 mb-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D6B56D]/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="relative">
            <div className="text-[#D6B56D] text-xs font-bold tracking-widest uppercase mb-3">
              Event Format
            </div>
            <h3 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              The <span className="gold-shimmer">"Agrithon"</span> Format
            </h3>
            <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl">
              Combining the intensity of a hackathon with the strategic vision
              of a startup pitch, the Agrithon challenges you to both{" "}
              <em>build</em> and <em>present</em>. Identify real agricultural
              problems, develop technology-driven solutions, then pitch them to
              a panel of industry judges — all in 48 hours.
            </p>
          </div>
        </div>

        {/* feature cards */}
        <FeatureCards features={features} />
      </div>
    </section>
  );
}

function FeatureCards({
  features,
}: { features: { icon: React.ElementType; title: string; desc: string }[] }) {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      className={`fade-up stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${visible ? "visible" : ""}`}
    >
      {features.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="card-lift bg-white rounded-2xl p-7 border border-[#1F7A3A]/10 shadow-xs text-center"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1F7A3A] to-[#2E8B57] flex items-center justify-center mx-auto mb-5 shadow-green">
            <Icon size={24} className="text-white" />
          </div>
          <h4 className="font-display font-bold text-[#0B2A16] text-lg mb-2">
            {title}
          </h4>
          <p className="text-[#2B2B2B]/65 text-sm leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────── AGENDA ─────────────────────── */
function AgendaSection() {
  const { ref, visible } = useFadeUp();

  const days = [
    {
      day: "Day 1",
      date: "April 6, 2026",
      color: "#1F7A3A",
      dotColor: "#1F7A3A",
      events: [
        {
          time: "09:00 AM",
          title: "Inauguration & Briefing",
          desc: "Welcome address, event overview, and team registration",
        },
        {
          time: "10:00 AM",
          title: "Problem Identification",
          desc: "Teams identify agricultural challenges they want to solve",
        },
        {
          time: "11:30 AM",
          title: "Coding & Prototyping Begins",
          desc: "Build web/mobile apps, IoT systems, AI/ML models or any tech-driven solution",
        },
        {
          time: "01:00 PM",
          title: "Lunch & Mentoring",
          desc: "Expert mentors provide guidance on technical and domain aspects",
        },
        {
          time: "03:00 PM",
          title: "Progress Review",
          desc: "Mid-day check-in with evaluators, course correction",
        },
        {
          time: "06:00 PM",
          title: "Day 1 Wrap-up",
          desc: "Submit progress update, networking, and Q&A session",
        },
      ],
    },
    {
      day: "Day 2",
      date: "April 7, 2026",
      color: "#C9A24D",
      dotColor: "#C9A24D",
      events: [
        {
          time: "09:00 AM",
          title: "Final Preparations",
          desc: "Teams finalize prototypes, decks, and demos",
        },
        {
          time: "10:00 AM",
          title: "Pitch Presentations Begin",
          desc: "Teams present to the panel of judges",
        },
        {
          time: "11:30 AM",
          title: "Q&A with Judges",
          desc: "In-depth discussion on feasibility, scalability, and impact",
        },
        {
          time: "01:00 PM",
          title: "Lunch & Break",
          desc: "Networking lunch with judges and mentors",
        },
        {
          time: "02:30 PM",
          title: "Final Evaluation Round",
          desc: "Top teams present revised pitches to a full judging panel",
        },
        {
          time: "05:00 PM",
          title: "Prize Distribution & Closing",
          desc: "Winners announced, certificates awarded, closing ceremony",
        },
      ],
    },
  ];

  return (
    <section
      id="agenda"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #f4f6f7 0%, #eaf2ec 40%, #f4f6f7 100%)",
      }}
    >
      {/* subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at center, #1F7A3A 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          ref={ref}
          className={`fade-up text-center mb-16 ${visible ? "visible" : ""}`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#1F7A3A]/10 text-[#1F7A3A] text-xs font-bold tracking-widest uppercase mb-4">
            Schedule
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#0B2A16] mb-4">
            Event <span className="text-gradient-green">Agenda</span>
          </h2>
          <p className="text-[#2B2B2B]/65 text-lg max-w-xl mx-auto">
            Two days of building, pitching, and winning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {days.map((day) => (
            <DayTimeline key={day.day} day={day} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DayTimeline({
  day,
}: {
  day: {
    day: string;
    date: string;
    color: string;
    dotColor: string;
    events: { time: string; title: string; desc: string }[];
  };
}) {
  const { ref, visible } = useFadeUp();
  return (
    <div ref={ref} className={`fade-up ${visible ? "visible" : ""}`}>
      <div className="rounded-2xl overflow-hidden shadow-sm border border-[#1F7A3A]/10 bg-white">
        {/* day header */}
        <div
          className="p-6"
          style={{
            background: `linear-gradient(135deg, ${day.color}28 0%, ${day.color}10 100%)`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: day.color }}
            >
              {day.day.split(" ")[1]}
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-[#0B2A16]">
                {day.day}
              </div>
              <div className="text-sm text-[#2B2B2B]/60 flex items-center gap-1">
                <Calendar size={12} />
                {day.date}
              </div>
            </div>
          </div>
        </div>

        {/* timeline items */}
        <div className="px-6 py-4">
          <div className="relative">
            {/* continuous vertical line */}
            <div
              className="absolute left-[7px] top-2 bottom-2 w-0.5 rounded-full"
              style={{ background: `${day.color}35` }}
            />

            {day.events.map((ev, i) => (
              <AgendaItem
                key={ev.time}
                event={ev}
                index={i}
                color={day.color}
                dotColor={day.dotColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AgendaItem({
  event,
  index,
  color,
  dotColor,
}: {
  event: { time: string; title: string; desc: string };
  index: number;
  color: string;
  dotColor: string;
}) {
  const { ref, visible, delay } = useAgendaItem(index);

  return (
    <div
      ref={ref}
      className="agenda-item flex gap-4 pb-6 last:pb-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`,
      }}
    >
      {/* dot */}
      <div className="flex flex-col items-center relative z-10 flex-shrink-0">
        <div
          className="agenda-dot rounded-full mt-1 transition-all duration-500"
          style={{
            width: visible ? "16px" : "12px",
            height: visible ? "16px" : "12px",
            background: visible ? dotColor : `${dotColor}70`,
            boxShadow: visible
              ? `0 0 0 3px ${dotColor}25, 0 0 8px ${dotColor}50`
              : "none",
            marginLeft: visible ? "-2px" : "0",
          }}
        />
      </div>

      {/* card */}
      <div
        className="flex-1 pb-1 rounded-xl px-4 py-3 -mt-1 transition-all duration-300 hover:-translate-y-0.5 cursor-default"
        style={{
          background: visible ? `${color}08` : "transparent",
          border: visible ? `1px solid ${color}18` : "1px solid transparent",
        }}
      >
        <div className="text-xs font-bold tracking-wide mb-1" style={{ color }}>
          {event.time}
        </div>
        <div className="font-semibold text-[#0B2A16] text-sm mb-0.5">
          {event.title}
        </div>
        <div className="text-[#2B2B2B]/60 text-xs leading-relaxed">
          {event.desc}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── EVALUATION ────────────────── */
function EvaluationSection() {
  const { ref, visible } = useFadeUp();

  const criteria = [
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "Creative, original approaches to agricultural challenges that go beyond conventional solutions.",
      score: "25%",
    },
    {
      icon: Target,
      title: "Feasibility",
      desc: "Technical viability, realistic implementation plan, and practical deployment potential.",
      score: "25%",
    },
    {
      icon: Sprout,
      title: "Agricultural Impact",
      desc: "Direct benefit to farmers, measurable improvement in productivity, sustainability, or efficiency.",
      score: "25%",
    },
    {
      icon: Users,
      title: "Presentation Skills",
      desc: "Clear communication, compelling demo, strong Q&A handling, and overall team coordination.",
      score: "25%",
    },
  ];

  return (
    <section
      id="evaluation"
      className="py-16 md:py-24"
      style={{
        background:
          "linear-gradient(180deg, #f4f6f7 0%, #edf5ef 50%, #f4f6f7 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`fade-up text-center mb-16 ${visible ? "visible" : ""}`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#1F7A3A]/10 text-[#1F7A3A] text-xs font-bold tracking-widest uppercase mb-4">
            Judging
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#0B2A16] mb-4">
            Evaluation <span className="text-gradient-green">Criteria</span>
          </h2>
          <p className="text-[#2B2B2B]/65 text-lg max-w-2xl mx-auto">
            Projects are judged on four equally weighted pillars
          </p>
        </div>
        <EvalCards criteria={criteria} />
      </div>
    </section>
  );
}

function EvalCards({
  criteria,
}: {
  criteria: {
    icon: React.ElementType;
    title: string;
    desc: string;
    score: string;
  }[];
}) {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      className={`fade-up stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${visible ? "visible" : ""}`}
    >
      {criteria.map(({ icon: Icon, title, desc, score }) => (
        <div
          key={title}
          className="card-lift relative bg-white rounded-2xl p-7 border border-[#1F7A3A]/10 shadow-xs overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-3xl font-display font-bold text-[#1F7A3A]/10">
            {score}
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B2A16] to-[#1F7A3A] flex items-center justify-center mb-5">
            <Icon size={22} className="text-[#D6B56D]" />
          </div>
          <h4 className="font-display font-bold text-[#0B2A16] text-lg mb-2">
            {title}
          </h4>
          <p className="text-[#2B2B2B]/65 text-sm leading-relaxed">{desc}</p>
          <div className="mt-4 pt-4 border-t border-[#1F7A3A]/10">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#1F7A3A]" />
              <span className="text-[#1F7A3A] text-xs font-bold">
                Weightage: {score}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────── PRIZES ─────────────────────── */
function PrizesSection() {
  const { ref, visible } = useFadeUp();
  const { ref: ref2, visible: visible2 } = useFadeUp();

  return (
    <section id="prizes" className="relative py-16 md:py-28 overflow-hidden">
      {/* dark bg */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0B2A16 0%, #0E3A1F 50%, #114D28 100%)",
        }}
      />
      {/* decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#1F7A3A]/10 -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#D6B56D]/5 translate-x-40 translate-y-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#D6B56D]/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#1F7A3A]/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* title */}
        <div
          ref={ref}
          className={`fade-up text-center mb-14 ${visible ? "visible" : ""}`}
        >
          <span className="inline-block px-4 py-1 rounded-full border border-[#D6B56D]/30 bg-[#D6B56D]/10 text-[#D6B56D] text-xs font-bold tracking-widest uppercase mb-4">
            Prize Pool
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Win Big, <span className="gold-shimmer">Grow Bigger</span>
          </h2>
        </div>

        {/* trophy + amount */}
        <div
          ref={ref2}
          className={`fade-up flex flex-col lg:flex-row items-center gap-12 ${visible2 ? "visible" : ""}`}
        >
          {/* trophy */}
          <div className="flex-shrink-0 text-center">
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full bg-[#D6B56D]/20 blur-3xl scale-150" />
              <img
                src="/assets/generated/trophy-prize.dim_400x400.png"
                alt="Trophy"
                className="relative w-48 h-48 sm:w-64 sm:h-64 object-contain animate-float drop-shadow-2xl"
              />
            </div>
          </div>

          {/* content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-8">
              <div className="text-white/60 text-sm font-medium mb-2">
                Total Prize Pool
              </div>
              <div
                className="font-display font-bold gold-shimmer"
                style={{
                  fontSize: "clamp(4rem, 12vw, 8rem)",
                  lineHeight: 1,
                }}
              >
                ₹15,000
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { place: "1st Place", amount: "₹8,000", icon: "🥇" },
                { place: "2nd Place", amount: "₹4,500", icon: "🥈" },
                { place: "3rd Place", amount: "₹2,500", icon: "🥉" },
              ].map(({ place, amount, icon }) => (
                <div
                  key={place}
                  className="rounded-2xl p-5 text-center border"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(214,181,109,0.2)",
                  }}
                >
                  <div className="text-3xl mb-2">{icon}</div>
                  <div className="text-white/70 text-xs font-medium mb-1">
                    {place}
                  </div>
                  <div className="font-display font-bold text-2xl gold-shimmer">
                    {amount}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {[
                { icon: Award, label: "Recognition & Certificates" },
                { icon: Users, label: "Networking Opportunities" },
                { icon: Rocket, label: "Future Development Support" },
                { icon: Star, label: "Media Coverage" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-white/70 text-xs font-medium"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon size={13} className="text-[#D6B56D]" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── REGISTER ───────────────────── */
function RegisterSection() {
  const { ref, visible } = useFadeUp();

  return (
    <section
      id="register"
      className="py-16 md:py-24"
      style={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #f0f7f2 50%, #ffffff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className={`fade-up text-center mb-16 ${visible ? "visible" : ""}`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#1F7A3A]/10 text-[#1F7A3A] text-xs font-bold tracking-widest uppercase mb-4">
            Join Us
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#0B2A16] mb-4">
            Register for{" "}
            <span className="text-gradient-green">AGRIVISION 2.0</span>
          </h2>
          <p className="text-[#2B2B2B]/65 text-lg max-w-xl mx-auto">
            Secure your spot in Belagavi's most exciting Agri-Tech challenge
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Google Form placeholder */}
          <RegisterFormPlaceholder />

          {/* QR code placeholder */}
          <QRPlaceholder />
        </div>

        {/* info row */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: Calendar,
              label: "Event Dates",
              value: "6th – 7th April 2026",
            },
            {
              icon: MapPin,
              label: "Venue",
              value: "KLS GIT, Belagavi, Karnataka",
            },
            { icon: Users, label: "Team Size", value: "2–4 Members per Team" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 p-5 rounded-2xl border border-[#1F7A3A]/10 bg-[#F4F6F7]"
            >
              <div className="w-11 h-11 rounded-xl bg-[#1F7A3A]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-[#1F7A3A]" />
              </div>
              <div>
                <div className="text-[#2B2B2B]/55 text-xs font-medium">
                  {label}
                </div>
                <div className="text-[#0B2A16] font-semibold text-sm mt-0.5">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegisterFormPlaceholder() {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      data-ocid="register.panel"
      className={`fade-up rounded-2xl border-2 border-[#1F7A3A]/20 overflow-hidden shadow-xs ${visible ? "visible" : ""}`}
    >
      {/* header */}
      <div className="bg-gradient-to-r from-[#0B2A16] to-[#1F7A3A] p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <Globe size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-display font-bold text-lg">
              Online Registration
            </div>
            <div className="text-white/65 text-xs">
              Google Form — AGRIVISION 2.0
            </div>
          </div>
        </div>
      </div>

      {/* form iframe area */}
      <div className="p-8 bg-[#F4F6F7] min-h-[380px] flex flex-col items-center justify-center text-center">
        {/* Swap the div below with an actual iframe once you have the form link */}
        {/* <iframe src="YOUR_GOOGLE_FORM_LINK_HERE" width="100%" height="600" frameBorder="0" marginHeight={0} marginWidth={0} title="Registration Form">Loading...</iframe> */}
        <div className="w-16 h-16 rounded-2xl bg-[#1F7A3A]/15 flex items-center justify-center mb-5">
          <Globe size={28} className="text-[#1F7A3A]" />
        </div>
        <h3 className="font-display font-bold text-[#0B2A16] text-xl mb-2">
          Registration Form
        </h3>
        <p className="text-[#2B2B2B]/60 text-sm mb-6 max-w-xs">
          The Google Form registration link will be embedded here. Please check
          back soon or contact the organizers.
        </p>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-dashed border-[#1F7A3A]/40 bg-[#1F7A3A]/5 text-[#1F7A3A] text-sm font-semibold">
          <Cpu size={15} />
          Registration Form — Link Coming Soon
        </div>
        <p className="mt-6 text-xs text-[#2B2B2B]/40">
          To embed the form, replace the placeholder with:
          <br />
          <code className="bg-white px-2 py-0.5 rounded font-mono text-[#0B2A16]">
            &lt;iframe src="YOUR_GOOGLE_FORM_LINK"&gt;
          </code>
        </p>
      </div>
    </div>
  );
}

function QRPlaceholder() {
  const { ref, visible } = useFadeUp();
  return (
    <div
      ref={ref}
      data-ocid="register.card"
      className={`fade-up relative rounded-2xl border-2 border-dashed border-[#D6B56D]/40 bg-gradient-to-br from-[#0B2A16] to-[#114D28] p-10 flex flex-col items-center justify-center text-center min-h-[380px] ${visible ? "visible" : ""}`}
    >
      {/* QR icon / placeholder */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#D6B56D]/20 blur-2xl rounded-full" />
        <div className="relative w-40 h-40 rounded-2xl border-2 border-[#D6B56D]/50 bg-[#0B2A16] flex flex-col items-center justify-center p-4">
          <QrCode size={72} className="text-[#D6B56D]" />
        </div>
      </div>
      <h3 className="font-display font-bold text-white text-2xl mb-2">
        SCAN TO REGISTER
      </h3>
      <p className="text-white/55 text-sm mb-4">QR Code for Registration</p>
      <p className="text-white/40 text-xs mb-6">
        Scan with your phone camera to open the registration form
      </p>
      <div className="flex items-center gap-2 text-[#D6B56D]/60 text-xs">
        <div className="w-8 h-0.5 bg-[#D6B56D]/30" />
        <span>QR Code will be placed here</span>
        <div className="w-8 h-0.5 bg-[#D6B56D]/30" />
      </div>

      {/* corner decorations */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D6B56D]/40 rounded-tl-md" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D6B56D]/40 rounded-tr-md" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D6B56D]/40 rounded-bl-md" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D6B56D]/40 rounded-br-md" />
    </div>
  );
}

/* ─────────────────── FOOTER ─────────────────────── */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B2A16] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* brand */}
          <div className="lg:col-span-2">
            <div className="font-display font-bold text-2xl tracking-widest gold-shimmer mb-3">
              AGRIVISION 2.0
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-sm">
              A two-day inter-college Agri-Tech innovation challenge. Where
              engineering meets agriculture to create technology-driven
              solutions for a smarter farming future.
            </p>
            <div className="flex items-center gap-3 mb-6">
              {[
                { icon: Instagram, href: "#", name: "instagram" },
                { icon: Twitter, href: "#", name: "twitter" },
                { icon: Linkedin, href: "#", name: "linkedin" },
                { icon: Facebook, href: "#", name: "facebook" },
              ].map(({ icon: Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#1F7A3A] flex items-center justify-center transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            {/* organizer badges */}
            <div className="flex flex-wrap gap-2">
              {["KLS GIT", "EWB India", "IIC"].map((org) => (
                <span
                  key={org}
                  className="px-3 py-1 rounded-full bg-white/8 text-white/60 text-xs font-medium"
                >
                  {org}
                </span>
              ))}
            </div>
          </div>

          {/* quick links */}
          <div>
            <div className="font-semibold text-sm text-white/80 mb-4 tracking-wide uppercase">
              Quick Links
            </div>
            <ul className="space-y-2.5">
              {["About", "Agenda", "Evaluation", "Prizes", "Register"].map(
                (link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById(link.toLowerCase())
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="text-white/50 hover:text-[#D6B56D] text-sm transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#1F7A3A] text-xs">›</span>
                      {link}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* contact */}
          <div>
            <div className="font-semibold text-sm text-white/80 mb-4 tracking-wide uppercase">
              Contact
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/50 text-sm">
                <MapPin
                  size={14}
                  className="text-[#D6B56D] mt-0.5 flex-shrink-0"
                />
                <span>
                  KLS Gogte Institute of Technology, Udyambag, Belagavi – 590
                  008, Karnataka
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-white/50 text-sm">
                <Mail size={14} className="text-[#D6B56D]" />
                <span>agrivision@git.edu</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/50 text-sm">
                <Phone size={14} className="text-[#D6B56D]" />
                <span>+91 XXXXX XXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/35 text-xs">
          <span>
            © {year} AGRIVISION 2.0 — KLS Gogte Institute of Technology,
            Belagavi. All rights reserved.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 hover:text-white/50 transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
