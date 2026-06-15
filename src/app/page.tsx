"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { t as tFn } from "@/lib/i18n";
import { LAWYERS, SPECIALTIES, SPECIALTY_COUNTS } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import LawyerCard from "@/components/LawyerCard";
import VerifiedBadge from "@/components/VerifiedBadge";
import Rating from "@/components/Rating";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  CheckIcon,
  StarIcon,
  ClockIcon,
  WhatsAppIcon,
} from "@/components/Icons";

// ─── Trust strip ───
function TrustStrip({ lang }: { lang: string }) {
  const translate = (key: string) => tFn(lang as "es" | "en", key);
  return (
    <div
      className="trust-strip"
      style={{ justifyContent: "center", marginTop: 48 }}
    >
      {[
        { num: "4.200+", lbl: translate("trust.lawyers") },
        { num: "48", lbl: translate("trust.cities") },
        { num: "< 4h", lbl: translate("trust.response") },
        { num: "12.800", lbl: translate("trust.reviews") },
      ].map((s) => (
        <div className="trust-stat" key={s.lbl}>
          <span className="num">{s.num}</span>
          <span className="lbl">{s.lbl}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Hero side panels ───
function HeroSideLiveActivity() {
  const items = [
    {
      id: 1,
      name: "Roberto S.",
      city: "San José",
      specialty: "Penal",
      lawyer: "Lic. Quesada",
      bg: "#0F172A",
      ago: "hace 2 min",
      initials: "RS",
    },
    {
      id: 2,
      name: "María R.",
      city: "Heredia",
      specialty: "Familiar",
      lawyer: "Licda. Vargas",
      bg: "#14B8A6",
      ago: "hace 5 min",
      initials: "MR",
    },
    {
      id: 3,
      name: "Carlos V.",
      city: "Escazú",
      specialty: "Corporativo",
      lawyer: "Licda. Mora",
      bg: "#1E40AF",
      ago: "hace 12 min",
      initials: "CV",
    },
    {
      id: 4,
      name: "Anónimo",
      city: "Liberia",
      specialty: "Inmobiliario",
      lawyer: "Lic. Hernández",
      bg: "#7C3AED",
      ago: "hace 18 min",
      initials: "?",
    },
  ];
  return (
    <div
      className="hero-feature-card"
      style={{ padding: 0, overflow: "hidden" }}
    >
      <div
        className="card-tag"
        style={{ background: "var(--accent)", color: "var(--navy-ink)" }}
      >
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--navy-ink)",
            marginRight: 6,
            animation: "pulse 1.6s infinite",
          }}
        ></span>
        EN VIVO
      </div>
      <div style={{ padding: "20px 24px 14px" }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>
          Actividad reciente
        </div>
        <h4 style={{ fontSize: 17, color: "var(--navy)" }}>Hoy en JurisGO</h4>
      </div>
      {items.map((it) => (
        <div
          key={it.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 24px",
            borderTop: "1px solid var(--line)",
            fontSize: 13,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: it.bg,
              color: "white",
              display: "grid",
              placeItems: "center",
              fontWeight: 600,
              fontSize: 12,
              flexShrink: 0,
            }}
          >
            {it.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 500, color: "var(--ink)" }}>
              <b>{it.name}</b> contactó a <b>{it.lawyer}</b>
            </div>
            <div className="muted text-xs" style={{ marginTop: 2 }}>
              {it.specialty} · {it.city} · {it.ago}
            </div>
          </div>
        </div>
      ))}
      <div
        style={{
          padding: "14px 24px",
          borderTop: "1px solid var(--line)",
          background: "var(--faint)",
        }}
      >
        <div className="row gap-8 between text-xs">
          <span className="muted">
            <b style={{ color: "var(--navy)" }}>847</b> contactos esta semana
          </span>
          <span className="muted">
            Respuesta media · <b style={{ color: "var(--navy)" }}>3h 12m</b>
          </span>
        </div>
      </div>
    </div>
  );
}

function HeroSideMap() {
  const cities = [
    { name: "San José", count: 1847, x: 45, y: 55 },
    { name: "Heredia", count: 412, x: 42, y: 50 },
    { name: "Alajuela", count: 386, x: 37, y: 47 },
    { name: "Cartago", count: 298, x: 52, y: 58 },
    { name: "Liberia", count: 184, x: 18, y: 32 },
    { name: "Limón", count: 142, x: 80, y: 52 },
  ];
  return (
    <div
      className="hero-feature-card"
      style={{ padding: 0, overflow: "hidden" }}
    >
      <div className="card-tag">CR 🇨🇷</div>
      <div style={{ padding: "20px 24px 12px" }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>
          Cobertura nacional
        </div>
        <h4 style={{ fontSize: 17, color: "var(--navy)" }}>
          4.200+ abogados en 48 ciudades
        </h4>
      </div>
      <div
        style={{
          position: "relative",
          height: 260,
          margin: "0 16px",
          borderRadius: "var(--r-md)",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 30% 40%, rgba(20, 184, 166, 0.08), transparent 40%), linear-gradient(180deg, #EEF2F7 0%, #E5EAF1 100%)",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <path
            d="M 10,30 Q 18,22 30,28 L 45,32 Q 58,28 70,38 L 82,48 Q 88,55 82,62 L 70,68 Q 55,72 42,65 L 25,60 Q 14,52 12,42 Z"
            fill="rgba(20, 184, 166, 0.12)"
            stroke="rgba(11, 31, 77, 0.25)"
            strokeWidth="0.4"
          />
        </svg>
        {cities.map((c, i) => (
          <div
            key={c.name}
            style={{
              position: "absolute",
              left: `${c.x}%`,
              top: `${c.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                width: 10 + Math.min(c.count / 80, 18),
                height: 10 + Math.min(c.count / 80, 18),
                borderRadius: "50%",
                background: i === 0 ? "var(--accent)" : "var(--navy)",
                border: "2px solid white",
                boxShadow: "0 2px 6px rgba(11, 31, 77, 0.3)",
              }}
            ></div>
            {i === 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translate(-50%, 4px)",
                  background: "white",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  color: "var(--navy)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {c.name} · {c.count}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "16px 24px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        {[
          { n: "48", l: "ciudades" },
          { n: "4.2K", l: "abogados" },
          { n: "6", l: "provincias" },
        ].map((s) => (
          <div key={s.l}>
            <div
              className="serif"
              style={{
                fontSize: 24,
                color: "var(--navy)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {s.n}
            </div>
            <div className="text-xs muted" style={{ marginTop: 2 }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroSideVerification() {
  const steps = [
    {
      n: "01",
      t: "Sube su carné",
      d: "El profesional envía su carné del Colegio de Abogados.",
    },
    {
      n: "02",
      t: "Validamos en 48h",
      d: "Verificamos contra la base oficial del CABCR.",
    },
    {
      n: "03",
      t: "Sello activo",
      d: "Solo los verificados aparecen en búsquedas.",
    },
  ];
  return (
    <div className="hero-feature-card" style={{ padding: 24 }}>
      <div
        className="card-tag"
        style={{
          background: "var(--teal-50)",
          color: "var(--accent-ink)",
          border: "1px solid var(--teal-100)",
        }}
      >
        <ShieldCheckIcon size={11} /> CABCR
      </div>
      <div style={{ marginBottom: 20, marginTop: 4 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          Confianza verificada
        </div>
        <h4 style={{ fontSize: 18, color: "var(--navy)" }}>
          Cómo verificamos cada abogado.
        </h4>
      </div>
      <div className="col gap-12">
        {steps.map((s, i) => (
          <div
            key={s.n}
            style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 36,
                height: 36,
                borderRadius: 10,
                background: i === 2 ? "var(--accent)" : "var(--teal-50)",
                color: i === 2 ? "var(--navy-ink)" : "var(--accent-ink)",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-serif)",
                fontSize: 13,
                fontWeight: 600,
                border: i === 2 ? "none" : "1px solid var(--teal-100)",
              }}
            >
              {i === 2 ? <CheckIcon size={16} /> : s.n}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "var(--navy)",
                  marginBottom: 2,
                }}
              >
                {s.t}
              </div>
              <div className="text-sm muted" style={{ lineHeight: 1.45 }}>
                {s.d}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 20,
          padding: "12px 14px",
          background: "var(--faint)",
          borderRadius: "var(--r-md)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <ShieldCheckIcon size={16} />
        <span className="text-sm" style={{ flex: 1, color: "var(--ink-soft)" }}>
          <b>100% de perfiles</b> tienen carné vigente.
        </span>
      </div>
    </div>
  );
}

function HeroSideTopPick({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const featured = LAWYERS[2];
  return (
    <div
      className="hero-feature-card"
      style={{ padding: 0, overflow: "hidden" }}
    >
      <div className="card-tag">TOP PICK · Hoy</div>
      <div
        style={{
          height: 92,
          position: "relative",
          background:
            "linear-gradient(135deg, var(--navy) 0%, var(--navy-700) 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>
      <div
        style={{ padding: "0 24px 20px", marginTop: -32, position: "relative" }}
      >
        <img
          src={featured.avatar}
          className="avatar"
          style={{ width: 64, height: 64, border: "3px solid white" }}
          alt={featured.name}
        />
        <div
          className="row gap-8 wrap"
          style={{ marginTop: 12, marginBottom: 4 }}
        >
          <h4 style={{ fontSize: 17, margin: 0 }}>
            {featured.title} {featured.name}
          </h4>
          <VerifiedBadge />
        </div>
        <div className="muted text-sm" style={{ marginBottom: 14 }}>
          {featured.primarySpecialty} · {featured.locations[0]}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            padding: "14px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div>
            <div className="row gap-4" style={{ color: "var(--star)" }}>
              <StarIcon size={13} />
            </div>
            <div
              className="serif"
              style={{
                fontSize: 18,
                color: "var(--navy)",
                lineHeight: 1.1,
                marginTop: 2,
              }}
            >
              {featured.rating}
            </div>
            <div className="text-xs muted">{featured.reviews} reseñas</div>
          </div>
          <div>
            <ClockIcon size={13} />
            <div
              className="serif"
              style={{
                fontSize: 18,
                color: "var(--navy)",
                lineHeight: 1.1,
                marginTop: 2,
              }}
            >
              {featured.responseTime}
            </div>
            <div className="text-xs muted">Responde en</div>
          </div>
          <div>
            <BriefcaseIcon size={13} />
            <div
              className="serif"
              style={{
                fontSize: 18,
                color: "var(--navy)",
                lineHeight: 1.1,
                marginTop: 2,
              }}
            >
              {featured.yearsExp}
            </div>
            <div className="text-xs muted">años exp.</div>
          </div>
        </div>
        <div className="row gap-8" style={{ marginTop: 16 }}>
          <button
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
            onClick={() => onNavigate(`/lawyer/${featured.slug}`)}
          >
            Ver perfil <ArrowRightIcon size={13} />
          </button>
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>
            <WhatsAppIcon size={13} /> Contactar
          </button>
        </div>
      </div>
    </div>
  );
}

type SideVariant = "top_pick" | "live" | "map" | "verification";

function HeroSideRotator({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const variants: SideVariant[] = ["top_pick", "live", "map", "verification"];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % variants.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [paused]);

  const panels = {
    top_pick: <HeroSideTopPick onNavigate={onNavigate} />,
    live: <HeroSideLiveActivity />,
    map: <HeroSideMap />,
    verification: <HeroSideVerification />,
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        key={idx}
        style={{
          animation: "fadeUp 0.45s cubic-bezier(0.2, 0.6, 0.2, 1) both",
        }}
      >
        {panels[variants[idx]]}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: -28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        {variants.map((v, i) => (
          <button
            key={v}
            onClick={() => setIdx(i)}
            aria-label={v}
            style={{
              border: 0,
              padding: 0,
              cursor: "pointer",
              background: "transparent",
              display: "grid",
              placeItems: "center",
            }}
          >
            <span
              style={{
                display: "block",
                width: i === idx ? 22 : 6,
                height: 6,
                borderRadius: 999,
                background: i === idx ? "var(--navy)" : "var(--line-strong)",
                transition: "all 0.35s cubic-bezier(0.2, 0.6, 0.2, 1)",
              }}
            ></span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { lang, setLang, filters, setFilters } = useApp();
  const router = useRouter();
  const translate = (key: string) => tFn(lang, key);
  const featured = LAWYERS.filter((l) => l.featured).slice(0, 3);

  const navigate = (path: string) => router.push(path);
  const goSearch = () => {
    router.push("/search");
  };

  return (
    <div className="app">
      <Header lang={lang} setLang={setLang} />

      <main className="page">
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero-asym">
              <div>
                <div className="hero-eyebrow" style={{ marginBottom: 20 }}>
                  <span className="dot"></span>
                  <span>{translate("hero.eyebrow")}</span>
                </div>
                <h1 style={{ marginBottom: 18 }}>
                  {translate("hero.title.l1")}{" "}
                  <span
                    style={{ fontStyle: "italic", color: "var(--navy-600)" }}
                  >
                    {translate("hero.title.l2")}
                  </span>
                </h1>
                <p
                  style={{
                    fontSize: 17.5,
                    color: "var(--muted)",
                    maxWidth: 540,
                    lineHeight: 1.55,
                    marginBottom: 32,
                  }}
                >
                  {translate("hero.sub")}
                </p>
                <SearchBar
                  filters={filters}
                  setFilters={setFilters}
                  lang={lang}
                  vertical
                  onSearch={goSearch}
                />
              </div>
              <HeroSideRotator onNavigate={navigate} />
            </div>
          </div>
        </section>

        {/* Specialties */}
        <section className="section" style={{ paddingTop: 40 }}>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">
                {translate("specialties.eyebrow")}
              </span>
              <h2>{translate("specialties.title")}</h2>
            </div>
            <div className="specialty-grid">
              {SPECIALTIES.map((s) => (
                <div
                  key={s.id}
                  className="specialty-tile"
                  onClick={() => {
                    setFilters({ ...filters, specialty: s.id });
                    router.push("/search");
                  }}
                >
                  <div className="specialty-icon">
                    <BriefcaseIcon size={16} />
                  </div>
                  <span className="specialty-label">
                    {lang === "es" ? s.label_es : s.label_en}
                  </span>
                  <span className="specialty-count">
                    {SPECIALTY_COUNTS[s.id]}{" "}
                    {translate("specialties.lawyers_in")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured */}
        <section
          className="section"
          style={{
            background: "white",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div className="container">
            <div
              className="row between wrap"
              style={{ marginBottom: 40, alignItems: "flex-end" }}
            >
              <div style={{ maxWidth: 600 }}>
                <span
                  className="eyebrow"
                  style={{ display: "block", marginBottom: 12 }}
                >
                  {translate("featured.eyebrow")}
                </span>
                <h2 style={{ marginBottom: 12 }}>
                  {translate("featured.title")}
                </h2>
                <p className="muted" style={{ fontSize: 16 }}>
                  {translate("featured.sub")}
                </p>
              </div>
              <button
                className="btn btn-ghost"
                onClick={() => router.push("/search")}
              >
                {translate("featured.see_all")} <ArrowRightIcon size={14} />
              </button>
            </div>
            <div className="featured-grid">
              {featured.map((l) => (
                <LawyerCard key={l.id} lawyer={l} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">{translate("how.eyebrow")}</span>
              <h2>{translate("how.title")}</h2>
            </div>
            <div className="how-grid">
              {[1, 2, 3].map((i) => (
                <div className="how-step" key={i}>
                  <div className="how-step-num">0{i}</div>
                  <h3>{translate(`how.${i}.title`)}</h3>
                  <p>{translate(`how.${i}.body`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="section" style={{ paddingTop: 40 }}>
          <div className="container">
            <div className="cta-strip">
              <div style={{ position: "relative", zIndex: 2 }}>
                <span className="eyebrow" style={{ color: "var(--teal-100)" }}>
                  JurisGO Pro
                </span>
                <h2 style={{ marginTop: 12 }}>{translate("cta.title")}</h2>
                <p>{translate("cta.body")}</p>
              </div>
              <div
                className="row gap-12 wrap"
                style={{ position: "relative", zIndex: 2 }}
              >
                <button className="btn btn-accent btn-lg">
                  {translate("cta.btn")}
                </button>
                <button
                  className="btn btn-ghost btn-lg"
                  style={{
                    color: "white",
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                >
                  {translate("cta.demo")}
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer lang={lang} />
      </main>
    </div>
  );
}
