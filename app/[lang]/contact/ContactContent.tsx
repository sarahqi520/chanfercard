"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { companyInfo } from "@/lib/data";
import { t, type Dictionary } from "@/lib/i18n/dictionaries";
import { type Locale } from "@/lib/i18n/config";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Factory,
} from "lucide-react";

type Props = {
  dict: Dictionary;
  locale: Locale;
};

export default function ContactContent({ dict, locale }: Props) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API
    setFormSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header dict={dict} locale={locale} />

      <main className="flex-1">
        {/* Page header */}
        <section className="bg-muted hero-pattern">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
            <h1 className="text-3xl md:text-5xl font-bold">
              {t(dict, "contact.title1")}{" "}
              <span className="gradient-text">{t(dict, "contact.title2")}</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
              {t(dict, "contact.description")}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Contact info sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Direct contact */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h2 className="font-bold text-lg mb-4">
                    {t(dict, "contact.directContact")}
                  </h2>
                  <div className="space-y-4">
                    <a
                      href="tel:+8613060985132"
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{t(dict, "contact.phoneWhatsApp")}</div>
                        <div className="text-sm text-muted-foreground">
                          +86 130 6098 5132
                        </div>
                      </div>
                    </a>

                    <a
                      href="mailto:sarah@gzchanfer.com"
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Mail size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{t(dict, "contact.emailLabel")}</div>
                        <div className="text-sm text-muted-foreground">
                          sarah@gzchanfer.com
                        </div>
                      </div>
                    </a>

                    <div className="flex items-start gap-3 p-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{t(dict, "contact.guangzhouOffice")}</div>
                        <div className="text-sm text-muted-foreground">
                          701, No.5 Yongfeng Road, Shawan Street, Panyu
                          District, Guangzhou, Guangdong, China
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent-dark flex items-center justify-center shrink-0">
                        <Factory size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {t(dict, "contact.dongguanFactory")}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          2F, Building 6, No.10 QiaoXin West 2nd Road, Qiaotou
                          Town, Dongguan, Guangdong, China
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Clock size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{t(dict, "contact.workingHours")}</div>
                        <div className="text-sm text-muted-foreground">
                          {t(dict, "contact.workingHoursValue")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/8613060985132"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 card-hover"
                >
                  <MessageCircle size={24} className="text-green-600" />
                  <div>
                    <div className="font-bold text-green-700 dark:text-green-400">
                      {t(dict, "contact.whatsapp.title")}
                    </div>
                    <div className="text-xs text-green-600/70 dark:text-green-400/70">
                      {t(dict, "contact.whatsapp.subtitle")}
                    </div>
                  </div>
                </a>
              </div>

              {/* Inquiry form */}
              <div className="lg:col-span-3">
                <div className="p-6 md:p-8 rounded-xl border border-border bg-card">
                  <h2 className="font-bold text-xl mb-2">
                    {t(dict, "contact.form.title")}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    {t(dict, "contact.form.description")}
                  </p>

                  {formSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 className="text-xl font-bold">
                        {t(dict, "contact.form.thankYou")}
                      </h3>
                      <p className="text-muted-foreground mt-2">
                        {t(dict, "contact.form.thankYouMessage")}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            {t(dict, "contact.form.name")} *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t(dict, "contact.form.namePlaceholder")}
                            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            {t(dict, "contact.form.company")} *
                          </label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            placeholder={t(dict, "contact.form.companyPlaceholder")}
                            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            {t(dict, "contact.form.email")} *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t(dict, "contact.form.emailPlaceholder")}
                            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            {t(dict, "contact.form.phone")}
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t(dict, "contact.form.phonePlaceholder")}
                            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            {t(dict, "contact.form.productType")}
                          </label>
                          <select
                            name="product"
                            value={formData.product}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          >
                            <option value="">{t(dict, "contact.form.selectProduct")}</option>
                            <option value="trading-cards">
                              {t(dict, "contact.form.productTypes.tradingCards")}
                            </option>
                            <option value="board-game-cards">
                              {t(dict, "contact.form.productTypes.boardGameCards")}
                            </option>
                            <option value="playing-cards">
                              {t(dict, "contact.form.productTypes.playingCards")}
                            </option>
                            <option value="collectible-cards">
                              {t(dict, "contact.form.productTypes.collectibleCards")}
                            </option>
                            <option value="game-components">
                              {t(dict, "contact.form.productTypes.gameComponents")}
                            </option>
                            <option value="printed-materials">
                              {t(dict, "contact.form.productTypes.printedMaterials")}
                            </option>
                            <option value="other">{t(dict, "contact.form.productTypes.other")}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            {t(dict, "contact.form.quantity")}
                          </label>
                          <select
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                          >
                            <option value="">{t(dict, "contact.form.selectQuantity")}</option>
                            <option value="under-100k">{t(dict, "contact.form.quantities.under100k")}</option>
                            <option value="100k-500k">{t(dict, "contact.form.quantities.100kTo500k")}</option>
                            <option value="500k-1m">{t(dict, "contact.form.quantities.500kTo1m")}</option>
                            <option value="1m-plus">{t(dict, "contact.form.quantities.over1m")}</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1.5">
                          {t(dict, "contact.form.projectDetails")}
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t(dict, "contact.form.projectPlaceholder")}
                          className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                      >
                        <Send size={16} />
                        {t(dict, "contact.form.submit")}
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
