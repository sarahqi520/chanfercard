import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Locale } from "@/lib/i18n/config";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const baseUrl = "https://chanfercard.com";
  return {
    title: "Privacy Policy | CHANFER",
    description:
      "How CHANFER collects, uses and protects your personal information. Effective 2026-09-01.",
    alternates: { canonical: `${baseUrl}/${locale}/privacy` },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  return (
    <div className="flex flex-col min-h-screen">
      <Header dict={dict} locale={locale} />
      <main className="flex-1">
        <section className="bg-muted">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">生效日期 / Effective: 2026-09-01</p>

            <h2 className="text-2xl font-bold mt-8 mb-2">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We collect information you provide through contact forms and inquiries
              (name, company, country/region, email, phone, product requirements), and
              automatically collected data (IP address, browser type, pages visited,
              duration, referral source via analytics tools such as Google Analytics).
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">1. 我们收集的信息</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              我们通过网站联系表单、询盘或留言收集您主动提供的信息（姓名、公司、国家/地区、电子邮箱、电话及产品需求），以及自动收集的信息（IP 地址、浏览器类型、访问页面、停留时长与访问来源，经 Google Analytics 等分析工具）。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">2. How We Use Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-2">
              <li>To respond to your inquiries and provide quotations and technical materials;</li>
              <li>To improve our website, products and services;</li>
              <li>To send product updates or exhibition news where you have consented.</li>
            </ul>
            <h2 className="text-xl font-bold mt-4 mb-2">2. 我们如何使用信息</h2>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-6">
              <li>回复您的询盘、提供报价与技术资料；</li>
              <li>改进网站内容、产品与服务；</li>
              <li>在您事先同意的前提下，向您发送产品更新或展会资讯。</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-2">3. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We use essential cookies (site operation) and analytics cookies (Google
              Analytics) to understand traffic and improve the site. You may disable
              analytics cookies in your browser.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">3. Cookie 与同类技术</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              我们使用必要 Cookie（保障网站基本运行）与分析 Cookie（Google Analytics，用于优化网站）。您可在浏览器设置中拒绝分析 Cookie。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">4. Third Parties</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              The Site uses Google Analytics (analytics) and Cloudflare (security and
              performance). These third parties process data under their own policies.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">4. 第三方服务</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              本网站使用 Google Analytics（访问分析）与 Cloudflare（安全防护与加速），相关数据处理遵循其各自隐私政策。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Inquiry data is retained for 3 years after the end of the business relationship,
              or as required by applicable law.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">5. 数据保留</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              询盘相关信息保留至业务关系终止后再 3 年，或依适用法律要求的最短期限。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Where GDPR and similar laws apply, you have the right to access, rectify,
              erase your personal data, withdraw consent and request portability. Contact:
              sarah@gzchanfer.com.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">6. 您的权利</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              在适用欧盟 GDPR 等地区法规的情况下，您有权访问、更正、删除您的个人数据、撤回同意并要求数据可携。行使权利请联系：sarah@gzchanfer.com。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">7. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Guangzhou Chanfer Intelligent Equipment Co., Ltd.<br />
              Address: 701, No.5 Yongfeng Road, Shawan Street, Panyu District, Guangzhou, Guangdong, China<br />
              Email: sarah@gzchanfer.com &nbsp;|&nbsp; Tel: +86 130 6098 5132
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">7. 联系我们</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              广州长发智能装备有限公司<br />
              地址：广州市番禺区沙湾街永丰路 5 号 701 室<br />
              邮箱：sarah@gzchanfer.com ｜ 电话：+86 130 6098 5132
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">8. Updates</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We may update this policy from time to time; the updated version will be posted
              here with its effective date.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">8. 政策更新</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              我们可能适时更新本政策，更新后的版本将发布于本页面并注明生效日期。
            </p>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
