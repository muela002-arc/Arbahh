import type { Metadata } from "next";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";

export const metadata: Metadata = {
  title: "الإفصاح المسؤول عن الثغرات | arbahh.com",
  description: "كيفية الإبلاغ عن ثغرات أمنية في موقع arbahh.com.",
  alternates: { canonical: "/security" }
};

export default function SecurityPage() {
  return (
    <main className="section">
      <article className="container-page max-w-3xl leading-8 text-slate-300">
        <h1 className="text-4xl font-semibold text-slate-100">الإفصاح المسؤول عن الثغرات الأمنية</h1>
        <p className="mt-3 text-sm text-slate-500">Responsible Disclosure Policy</p>

        <p className="mt-6">
          نأخذ أمان الموقع على محمل الجد. إذا اكتشفت ثغرة أمنية في arbahh.com، نشجعك على إخبارنا بشكل مسؤول قبل الإفصاح العام حتى نتمكن من إصلاحها.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">كيفية الإبلاغ</h2>
        <p className="mt-3">
          أرسل تقريرك عبر البريد الإلكتروني إلى:{" "}
          <ObfuscatedEmail user="privacy" domain="arbahh.com" className="text-red-400 hover:underline" />
          {" "}مع ذكر <strong className="text-slate-200">"Security Report"</strong> في عنوان الرسالة.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">ما يجب تضمينه في التقرير</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-400">
          <li>وصف واضح للثغرة وطريقة استغلالها</li>
          <li>خطوات إعادة الإنتاج (proof of concept إن أمكن)</li>
          <li>التأثير المحتمل على المستخدمين أو البيانات</li>
          <li>معلومات التواصل معك (اختياري)</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">وقت الاستجابة المتوقع</h2>
        <p className="mt-3">
          سنحاول الإقرار باستلام تقريرك خلال <strong className="text-slate-200">7 أيام عمل</strong>، ونعمل على تقييم الثغرة وإصلاحها في أقرب وقت ممكن. سنبقيك على اطلاع بتقدم العمل.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">ما نطلبه منك</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-400">
          <li>لا تستغل الثغرة أو تكشف عنها علنًا قبل إصلاحها</li>
          <li>لا تصل إلى بيانات المستخدمين الآخرين أو تعدّل عليها</li>
          <li>لا تنفّذ هجمات DoS أو تتلاعب بالبنية التحتية</li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold text-slate-100">نطاق الإفصاح</h2>
        <p className="mt-3">يشمل النطاق: arbahh.com وجميع نطاقاته الفرعية. لا يشمل: خدمات Google Analytics أو AdSense أو Vercel التي تخضع لسياسات كل مزود على حدة.</p>

        <p className="mt-8 text-sm text-slate-500">
          نقدّر مساهمة الباحثين الأمنيين في تحسين أمان الموقع.
        </p>
      </article>
    </main>
  );
}
