import type { NicheSlug } from "./rpmData";

export type Niche = {
  slug: NicheSlug;
  name: string;
  title: string;
  description: string;
  avgRpm: number;
  trend: "مرتفع" | "مستقر" | "نامي";
  bestCountries: string[];
  arabicRange: [number, number];
  globalRange: [number, number];
  topChannels: string[];
  tips: string[];
};

export const niches: Niche[] = [
  {
    slug: "tech",
    name: "تقنية",
    title: "RPM يوتيوب في مجال التقنية",
    description: "مراجعات الأجهزة، التطبيقات، الذكاء الاصطناعي، والشروحات التقنية.",
    avgRpm: 3.5,
    trend: "مرتفع",
    bestCountries: ["الإمارات", "السعودية", "الكويت"],
    arabicRange: [1.4, 4.9],
    globalRange: [3, 12],
    topChannels: ["عبدالله عيد", "Elzero Web School", "تيك بلس"],
    tips: ["قارن المنتجات قبل الشراء.", "استخدم عناوين بحثية واضحة.", "أضف ملفات وروابط مفيدة في الوصف."]
  },
  {
    slug: "finance",
    name: "مال وأعمال",
    title: "RPM يوتيوب في مجال المال والأعمال",
    description: "الادخار، الاستثمار، المشاريع، التجارة الإلكترونية، وريادة الأعمال.",
    avgRpm: 4,
    trend: "مرتفع",
    bestCountries: ["الإمارات", "السعودية", "الكويت"],
    arabicRange: [1.6, 5.6],
    globalRange: [4, 18],
    topChannels: ["دروس أونلاين", "قناة بزنس بالعربي", "مال وأعمال"],
    tips: ["استخدم أمثلة واقعية.", "ضع تنبيها ماليا واضحا.", "ركز على أسئلة المبتدئين."]
  },
  {
    slug: "education",
    name: "تعليم",
    title: "RPM يوتيوب في مجال التعليم",
    description: "الدروس، اللغات، المهارات المهنية، والشرح الأكاديمي.",
    avgRpm: 2.5,
    trend: "نامي",
    bestCountries: ["السعودية", "الأردن", "الإمارات"],
    arabicRange: [1, 3.5],
    globalRange: [2, 9],
    topChannels: ["دروس أونلاين", "أكاديمية التحرير", "Elzero Web School"],
    tips: ["حول الدروس إلى سلاسل.", "ابدأ بمشكلة واضحة.", "استخدم أمثلة قابلة للتطبيق."]
  },
  {
    slug: "cooking",
    name: "طبخ",
    title: "RPM يوتيوب في مجال الطبخ",
    description: "الوصفات، تجهيز الوجبات، أكلات اقتصادية، ومراجعة أدوات المطبخ.",
    avgRpm: 2,
    trend: "مستقر",
    bestCountries: ["السعودية", "الإمارات", "مصر"],
    arabicRange: [0.8, 2.8],
    globalRange: [1.5, 6],
    topChannels: ["مطبخ سيدتي", "وصفات عربية", "أكلات بيتية"],
    tips: ["اذكر تكلفة الوصفة.", "اعرض البدائل.", "صور النتيجة النهائية بوضوح."]
  },
  {
    slug: "gaming",
    name: "ألعاب",
    title: "RPM يوتيوب في مجال الألعاب",
    description: "بث الألعاب، التحديات، الشروحات، أخبار التحديثات، والمراجعات.",
    avgRpm: 1.2,
    trend: "نامي",
    bestCountries: ["السعودية", "الكويت", "الإمارات"],
    arabicRange: [0.5, 1.7],
    globalRange: [1, 5],
    topChannels: ["AboFlah", "بندريتا", "سعودي قيمر"],
    tips: ["اصنع مقاطع قابلة للبحث.", "غط التحديثات بسرعة.", "استخدم لقطات قصيرة لجذب الجمهور."]
  },
  {
    slug: "entertainment",
    name: "ترفيه",
    title: "RPM يوتيوب في مجال الترفيه",
    description: "تحديات، تجارب، قصص، محتوى اجتماعي، وبرامج خفيفة.",
    avgRpm: 1.8,
    trend: "مستقر",
    bestCountries: ["السعودية", "الإمارات", "العراق"],
    arabicRange: [0.7, 2.5],
    globalRange: [1, 7],
    topChannels: ["AboFlah", "ShongxBong", "نور ستارز"],
    tips: ["ابدأ بقصة قوية.", "حافظ على إيقاع سريع.", "كرر السلاسل الناجحة."]
  },
  {
    slug: "sports",
    name: "رياضة",
    title: "RPM يوتيوب في مجال الرياضة",
    description: "تحليل المباريات، أخبار الأندية، اللياقة، والتوقعات الرياضية.",
    avgRpm: 1.5,
    trend: "نامي",
    bestCountries: ["السعودية", "الإمارات", "المغرب"],
    arabicRange: [0.6, 2.1],
    globalRange: [1, 6],
    topChannels: ["ملعب العرب", "تكتيك", "أخبار الكرة"],
    tips: ["انشر بعد الأحداث مباشرة.", "قدم تحليلا لا مجرد ملخص.", "استهدف مباريات قادمة."]
  },
  {
    slug: "beauty",
    name: "صحة وجمال",
    title: "RPM يوتيوب في مجال الصحة والجمال",
    description: "العناية الشخصية، اللياقة، المراجعات، والروتين الصحي.",
    avgRpm: 2.2,
    trend: "مرتفع",
    bestCountries: ["الإمارات", "السعودية", "الكويت"],
    arabicRange: [0.9, 3.1],
    globalRange: [2, 10],
    topChannels: ["جمالك", "صحة بالعربي", "روتين"],
    tips: ["اذكر نوع البشرة أو الجسم.", "اعرض خطوات واضحة.", "تجنب الادعاءات الطبية غير المثبتة."]
  },
  {
    slug: "travel",
    name: "سفر",
    title: "RPM يوتيوب في مجال السفر",
    description: "الوجهات، الميزانيات، الفنادق، التجارب، ونصائح التخطيط.",
    avgRpm: 2.8,
    trend: "نامي",
    bestCountries: ["الإمارات", "السعودية", "الأردن"],
    arabicRange: [1.1, 3.9],
    globalRange: [2.5, 11],
    topChannels: ["ابن حتوتة", "رحالة", "سافر صح"],
    tips: ["اعرض ميزانية الرحلة.", "اذكر أفضل وقت للزيارة.", "صور تفاصيل عملية لا مناظر فقط."]
  },
  {
    slug: "kids",
    name: "أطفال",
    title: "RPM يوتيوب في مجال الأطفال",
    description: "التعليم المبسط، القصص، الأغاني الآمنة، والأنشطة العائلية.",
    avgRpm: 1.6,
    trend: "مستقر",
    bestCountries: ["السعودية", "الإمارات", "مصر"],
    arabicRange: [0.6, 2.2],
    globalRange: [1, 5],
    topChannels: ["طيور الجنة", "كراميش", "تعلم مع زكريا"],
    tips: ["اجعل المحتوى آمنا.", "استخدم شخصيات متكررة.", "ركز على التعلم المرح."]
  },
  {
    slug: "religion",
    name: "دين",
    title: "RPM يوتيوب في المجال الديني",
    description: "شرح مبسط، أسئلة شائعة، قصص، ومحتوى روحاني موثق.",
    avgRpm: 1,
    trend: "مستقر",
    bestCountries: ["السعودية", "الأردن", "مصر"],
    arabicRange: [0.4, 1.4],
    globalRange: [0.7, 4],
    topChannels: ["زاد", "كنوز", "الطريق إلى الله"],
    tips: ["وثق المصادر.", "تجنب الإثارة.", "قسم الموضوعات إلى إجابات قصيرة."]
  },
  {
    slug: "comedy",
    name: "كوميديا",
    title: "RPM يوتيوب في مجال الكوميديا",
    description: "سكتشات، مواقف يومية، تعليقات ساخرة، وشخصيات متكررة.",
    avgRpm: 1.4,
    trend: "نامي",
    bestCountries: ["السعودية", "العراق", "مصر"],
    arabicRange: [0.5, 2],
    globalRange: [1, 5],
    topChannels: ["إيجيكولوجي", "دحيح", "كوميديا عربية"],
    tips: ["اختبر الفكرة كمقطع قصير.", "كرر الشخصيات الناجحة.", "اجعل العنوان مفهوما دون شرح طويل."]
  }
];

export function getNiche(slug: string) {
  return niches.find((niche) => niche.slug === slug);
}
