"use client";

import { AppShell, SectionTitle, StatCard } from "@/components/AppChrome";
import { analytics } from "@/lib/data";
import { useLanguage } from "@/components/AppChrome";
import { analyticsCopy, analyticsLabel } from "@/lib/localized-copy";

export default function AnalyticsPage() {
  return (
    <AppShell active="Analytics">
      <AnalyticsContent />
    </AppShell>
  );
}

function AnalyticsContent() {
  const { language } = useLanguage();
  const copy = analyticsCopy[language];
  const feedbackItems = {
    EN: [
      "Customer escalated after viewing roaming guide",
      "Chatbot answer rated unhelpful for app OTP",
      "Agent marked SIM replacement article as outdated",
      "WhatsApp variant requested for Super Card FAQ"
    ],
    AR: [
      "عميل طلب التصعيد بعد قراءة دليل التجوال",
      "تم تقييم إجابة الشات بوت حول OTP للتطبيق كغير مفيدة",
      "وكيل وضع علامة أن مقال استبدال الشريحة قديم",
      "تم طلب نسخة واتساب لأسئلة Super Card"
    ],
    KU: [
      "کڕیار دوای بینینی ڕێنمایی ڕۆمینگ داوای بەرزکردنەوەی کرد",
      "وەڵامی چاتبۆت بۆ OTP ئەپ وەک نایارمەتیدەر هەڵسەنگێنرا",
      "ئەجێنت بابەتی گۆڕینی SIM وەک کۆن دیاری کرد",
      "وەشانی واتساپ بۆ پرسیارەکانی Super Card داواکرا"
    ]
  }[language];

  return (
    <>
      <SectionTitle title={copy.title} level={1} />
      <div className="grid four">
        <StatCard label={copy.apiCalls} value="18.4k" detail={copy.apiCallsDetail} />
        <StatCard label={copy.avgResponse} value="118ms" detail={copy.avgResponseDetail} />
        <StatCard label={copy.lowConfidence} value="64" detail={copy.lowConfidenceDetail} />
        <StatCard label={copy.helpfulRating} value="86%" detail={copy.helpfulRatingDetail} />
      </div>
      <section className="section">
        <div className="grid two">
          <div className="panel stat-bars">
            <h3>{copy.searchTerms}</h3>
            {analytics.map((row) => (
              <div className="bar-row" key={row.label}>
                <div className="section-title">
                  <span>{analyticsLabel(row.label, language)}</span>
                  <span className="small">{row.failures} {copy.gaps}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${Math.min(100, row.failures)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="panel">
            <h3>{copy.feedbackFeed}</h3>
            <div className="article-list">
              {feedbackItems.map((item) => (
                <div className="result-item" key={item}>
                  <p>{item}</p>
                  <span className="chip magenta">{copy.review}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
