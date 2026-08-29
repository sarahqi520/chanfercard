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
    title: "Terms of Service | CHANFER",
    description: "Terms of use for the CHANFER website.",
    alternates: { canonical: `${baseUrl}/${locale}/terms` },
  };
}

export default async function TermsPage({ params }: Props) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  return (
    <div className="flex flex-col min-h-screen">
      <Header dict={dict} locale={locale} />
      <main className="flex-1">
        <section className="bg-muted">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">最后更新 / Last updated: 2026-08-29</p>

            <h2 className="text-2xl font-bold mt-8 mb-2">1. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              All content on the Site (text, images, videos, diagrams, trademarks and logos)
              is owned by Guangzhou Chanfer Intelligent Equipment Co., Ltd. and protected by
              applicable IP laws. No reproduction, distribution or commercial use is permitted
              without prior written consent.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">1. 知识产权</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              本网站所有内容（文字、图片、视频、图表、商标及标识）归广州长发智能装备有限公司所有，受相关知识产权法律保护。未经书面许可，不得擅自复制、传播或用于商业用途。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">2. Acceptable Use</h2>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-2">
              <li>You agree to use the Site lawfully and not for any illegal or infringing purpose;</li>
              <li>You will not disrupt the Site, scrape data at scale, or launch attacks;</li>
              <li>You will not impersonate others or submit false information.</li>
            </ul>
            <h2 className="text-xl font-bold mt-4 mb-2">2. 网站使用规范</h2>
            <ul className="list-disc pl-6 text-muted-foreground leading-relaxed mb-6">
              <li>您同意合法使用本网站，不用于任何违法或侵权目的；</li>
              <li>不得干扰网站正常运行，不得进行大规模数据抓取或攻击行为；</li>
              <li>不得冒用他人身份或提交虚假信息。</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-2">3. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Product and technical information is for reference only. We strive for accuracy
              and timeliness but do not warrant it is error-free or uninterrupted. Final
              specifications are subject to the executed contract and technical confirmation.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">3. 信息免责声明</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              本网站提供的产品、技术信息仅供参考，我们尽力确保其准确与及时，但不保证完全无误或无中断。产品规格以最终合同及技术确认为准。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">4. External Links</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              The Site may link to third-party websites. We are not responsible for their
              content, privacy practices or availability.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">4. 外部链接</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              本网站可能包含指向第三方网站的链接，我们不对这些网站的内容、隐私政策或可用性负责。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              To the maximum extent permitted by law, we are not liable for any indirect,
              incidental or consequential damages arising from use of or inability to use the Site.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">5. 责任限制</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              在法律允许的最大范围内，对于因使用或无法使用本网站产生的间接、附带或后果性损失，本公司不承担责任。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">6. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              These terms are governed by the laws of the People's Republic of China. Disputes
              shall be resolved through friendly negotiation; failing that, by the competent
              court in our jurisdiction.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">6. 适用法律与争议解决</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              本条款受中华人民共和国法律管辖。如发生争议，双方应友好协商；协商不成的，提交本公司所在地有管辖权的人民法院处理。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-2">7. Changes</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              We may amend these terms at any time; amended terms take effect upon posting.
              Continued use of the Site constitutes acceptance of the amended terms.
            </p>
            <h2 className="text-xl font-bold mt-4 mb-2">7. 条款修改</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              我们可随时修改本条款，修改后的条款发布于本页面即生效。您继续使用本网站即视为接受修改后的条款。
            </p>
          </div>
        </section>
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  );
}
