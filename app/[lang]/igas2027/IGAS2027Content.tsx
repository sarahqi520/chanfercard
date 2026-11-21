"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { t, type Dictionary } from "@/lib/i18n/dictionaries";
import { type Locale } from "@/lib/i18n/config";
import { IGAS_BOOTH, IGAS_EVENT, IGAS_FORM_ENDPOINT } from "@/lib/igas2027";
import {
  CalendarDays,
  MapPin,
  Store,
  ArrowRight,
  Send,
  CheckCircle2,
  Loader2,
  Ticket,
  Users,
  Sparkles,
  MessageCircle,
  Factory,
  Globe2,
} from "lucide-react";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

const K = "igas2027";
const key = (k: string) => `${K}.${k}`;

/** Product-interest options reuse the existing 9-language contact translations. */
const INTEREST_KEYS = [
  "tradingCards",
  "boardGameCards",
  "playingCards",
  "collectibleCards",
  "gameComponents",
  "printedMaterials",
  "other",
] as const;

const VISIT_DATE_KEYS = ["aug5", "aug6", "aug7", "aug8", "aug9", "undecided"] as const;

export default function IGAS2027Content({ dict, locale }: Props) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    country: "",
    email: "",
    phone: "",
    visitDate: "",
    visitors: "",
    interest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        _subject: `IGAS 2027 Visit Request - ${formData.company || formData.name} - ${formData.country || "-"}`,
        _replyto: formData.email,
        _template: "table",
        "Event": "IGAS 2027 (Tokyo Big Sight, Aug 5-9, 2027)",
        Name: formData.name,
        Company: formData.company,
        Country: formData.country || "-",
        Email: formData.email,
        "Phone / WhatsApp": formData.phone || "-",
        "Preferred visit date": t(dict, key(`form.visitDates.${formData.visitDate || "undecided"}`)),
        "Number of visitors": formData.visitors || "-",
        "Products of interest": formData.interest
          ? t(dict, `contact.form.productTypes.${formData.interest}`)
          : "-",
        Message: formData.message || "-",
      };

      const res = await fetch(IGAS_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("submit failed");
      setFormSubmitted(true);
    } catch {
      setSubmitError(t(dict, key("form.errorMessage")));
    } finally {
      setIsSubmitting(false);
    }
  };

  const whyItems = (dict[key("why.items")] ?? []) as Array<{
    title: string;
    desc: string;
  }>;
  const whyIcons = [Factory, Sparkles, Globe2, Users];
  const passBullets = (dict[key("pass.bullets")] ?? []) as string[];

  const inputCls =
    "w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary";
  const labelCls = "block text-sm font-medium mb-1.5";

  return (
    <div className="flex flex-col min-h-screen">
      <Header dict={dict} locale={locale} />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-primary text-xs md:text-sm font-bold tracking-wide">
              <Ticket size={14} />
              {t(dict, key("badge"))}
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
              {t(dict, key("title1"))}
              <br />
              <span className="text-accent">{t(dict, key("title2"))}</span>
            </h1>

            <p className="mt-5 max-w-3xl text-base md:text-lg text-white/85 leading-relaxed">
              {t(dict, key("subtitle"))}
            </p>

            {/* Event facts */}
            <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-4xl">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <CalendarDays size={22} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-white/70">{t(dict, key("datesLabel"))}</div>
                  <div className="font-semibold text-sm md:text-base">{IGAS_EVENT.dates}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <MapPin size={22} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-white/70">{t(dict, key("venueLabel"))}</div>
                  <div className="font-semibold text-sm md:text-base">
                    {IGAS_EVENT.venue}
                  </div>
                  <div className="text-xs text-white/70">{IGAS_EVENT.hall}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Store size={22} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-white/70">{t(dict, key("boothLabel"))}</div>
                  <div className="font-semibold text-sm md:text-base">{IGAS_BOOTH}</div>
                </div>
              </div>
            </div>

            <a
              href="#book-visit"
              className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-colors"
            >
              {t(dict, key("heroCta"))}
              <ArrowRight size={17} />
            </a>
          </div>
        </section>

        {/* ===== Why visit ===== */}
        <section className="py-14 md:py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold">
                {t(dict, key("why.title"))}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {t(dict, key("why.subtitle"))}
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {whyItems.map((item, i) => {
                const Icon = whyIcons[i % whyIcons.length];
                return (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-border bg-card card-hover"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Booking form ===== */}
        <section id="book-visit" className="py-14 md:py-20 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left: invitation info */}
              <div className="lg:col-span-2 space-y-5">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {t(dict, key("form.title"))}
                  </h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {t(dict, key("form.description"))}
                  </p>
                </div>

                {/* Invitation pass card */}
                <div className="p-6 rounded-xl border border-accent/40 bg-accent/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 text-accent-dark flex items-center justify-center shrink-0">
                      <Ticket size={20} />
                    </div>
                    <h3 className="font-bold text-base">{t(dict, key("pass.title"))}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(dict, key("pass.desc"))}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {passBullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct contact */}
                <div className="p-5 rounded-xl border border-border bg-card">
                  <div className="font-bold text-sm mb-3">{t(dict, key("contact.title"))}</div>
                  <a
                    href={`mailto:${IGAS_EVENT.email}?subject=IGAS%202027%20visit`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Send size={15} className="text-primary" />
                    {IGAS_EVENT.email}
                  </a>
                  <a
                    href="https://wa.me/8613060985132"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageCircle size={15} className="text-primary" />
                    +86 130 6098 5132 (WhatsApp)
                  </a>
                </div>
              </div>

              {/* Right: form */}
              <div className="lg:col-span-3">
                <div className="p-6 md:p-8 rounded-xl border border-border bg-card">
                  {formSubmitted ? (
                    <div className="text-center py-14">
                      <div className="w-16 h-16 rounded-full bg-accent/15 text-accent-dark flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 size={34} />
                      </div>
                      <h3 className="text-2xl font-bold">
                        {t(dict, key("form.thankYou"))}
                      </h3>
                      <p className="text-muted-foreground mt-3 max-w-md mx-auto leading-relaxed">
                        {t(dict, key("form.thankYouMessage")).replace(
                          "{email}",
                          formData.email
                        )}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>
                            {t(dict, key("form.name"))} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t(dict, key("form.namePlaceholder"))}
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>
                            {t(dict, key("form.company"))} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            placeholder={t(dict, key("form.companyPlaceholder"))}
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>
                            {t(dict, key("form.email"))} <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t(dict, key("form.emailPlaceholder"))}
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>{t(dict, key("form.country"))}</label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder={t(dict, key("form.countryPlaceholder"))}
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>{t(dict, key("form.phone"))}</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t(dict, key("form.phonePlaceholder"))}
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>{t(dict, key("form.visitDate"))}</label>
                          <select
                            name="visitDate"
                            value={formData.visitDate}
                            onChange={handleChange}
                            className={inputCls}
                          >
                            {VISIT_DATE_KEYS.map((k) => (
                              <option key={k} value={k}>
                                {t(dict, key(`form.visitDates.${k}`))}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>{t(dict, key("form.visitors"))}</label>
                          <select
                            name="visitors"
                            value={formData.visitors}
                            onChange={handleChange}
                            className={inputCls}
                          >
                            {["one", "two", "three", "fourPlus"].map((k) => (
                              <option key={k} value={k}>
                                {t(dict, key(`form.visitorOptions.${k}`))}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>{t(dict, key("form.interest"))}</label>
                          <select
                            name="interest"
                            value={formData.interest}
                            onChange={handleChange}
                            className={inputCls}
                          >
                            <option value="">{t(dict, key("form.selectOption"))}</option>
                            {INTEREST_KEYS.map((k) => (
                              <option key={k} value={k}>
                                {t(dict, `contact.form.productTypes.${k}`)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>{t(dict, key("form.message"))}</label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t(dict, key("form.messagePlaceholder"))}
                          className={`${inputCls} resize-y`}
                        />
                      </div>

                      {submitError && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-200">
                          {submitError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-8 py-3.5 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={17} className="animate-spin" />
                            {t(dict, key("form.sending"))}
                          </>
                        ) : (
                          <>
                            <Send size={17} />
                            {t(dict, key("form.submit"))}
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer dict={dict} locale={locale} />
    </div>
  );
}
