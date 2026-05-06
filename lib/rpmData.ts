export type NicheSlug =
  | "tech"
  | "finance"
  | "education"
  | "cooking"
  | "gaming"
  | "entertainment"
  | "sports"
  | "beauty"
  | "travel"
  | "kids"
  | "religion"
  | "comedy"
  | "general";

export type CountrySlug = "sa" | "ae" | "eg" | "iq" | "ma" | "kw" | "jo" | "other";

export type PlatformSlug = "youtube" | "tiktok" | "instagram" | "facebook";

export type RpmRange = {
  low: number;
  final: number;
  high: number;
};

export const nicheBaseRPM: Record<NicheSlug, number> = {
  tech: 3.5,
  finance: 4,
  education: 2.5,
  cooking: 2,
  gaming: 1.2,
  entertainment: 1.8,
  sports: 1.5,
  beauty: 2.2,
  travel: 2.8,
  kids: 1.6,
  religion: 1,
  comedy: 1.4,
  general: 1.5
};

export const countryMultipliers: Record<CountrySlug, number> = {
  ae: 1.4,
  sa: 1.2,
  kw: 1.3,
  other: 0.85,
  eg: 0.7,
  iq: 0.65,
  ma: 0.75,
  jo: 0.8
};

export const countryLabels: Record<CountrySlug, string> = {
  sa: "السعودية",
  ae: "الإمارات",
  eg: "مصر",
  iq: "العراق",
  ma: "المغرب",
  kw: "الكويت",
  jo: "الأردن",
  other: "أخرى"
};

export const tipsByNiche: Record<NicheSlug, string> = {
  tech:
    "في التقنية، ركز على مراجعات المنتجات والمقارنات وأسئلة الشراء. هذا النوع يجذب إعلانات أعلى قيمة من الأخبار السريعة.",
  finance:
    "المحتوى المالي يحتاج شرحا هادئا ومصادر واضحة وتنبيها بأن المحتوى ليس نصيحة مالية. المواضيع العملية للمبتدئين غالبا أفضل من العناوين المبالغ فيها.",
  education:
    "اجعل الدروس ضمن سلاسل قصيرة، وكل فيديو يجيب عن سؤال واحد واضح. هذا يساعد البحث ويزيد الرجوع إلى القناة.",
  cooking:
    "اذكر تكلفة المكونات والبدائل وخطوات مختصرة. المشاهد يريد وصفة قابلة للتطبيق، لا عرضا طويلا فقط.",
  gaming:
    "امزج الترفيه مع محتوى قابل للبحث مثل الإعدادات، التحديثات، الحلول، وأفضل الطرق داخل اللعبة.",
  entertainment:
    "ابدأ بسرعة، واستخدم قالبا متكررا يسهل تذكره. مدة المشاهدة أهم من كثرة النشر بلا فكرة واضحة.",
  sports:
    "اربط المحتوى بالمباريات والأحداث القريبة، ثم أضف تحليلا أو زاوية لا يجدها المشاهد في الخبر العادي.",
  beauty:
    "اذكر نوع البشرة أو الشعر والسياق بوضوح، وتجنب الادعاءات الطبية غير المدعومة. التفاصيل تزيد الثقة.",
  travel:
    "قدّم الميزانية، أفضل وقت للزيارة، وأخطاء يجب تجنبها. هذه التفاصيل تجذب مشاهدا ذا نية عالية.",
  kids:
    "محتوى الأطفال يحتاج أمانا بصريا ولغويا وإيقاعا واضحا. ركز على التعلم والترفيه المناسب للعائلة.",
  religion:
    "المحتوى الديني ينجح عندما يكون موثقا وهادئا وخاليا من الإثارة. السلاسل القصيرة للأسئلة الشائعة مفيدة.",
  comedy:
    "الكوميديا تنمو عبر شخصيات أو مواقف متكررة قابلة للمشاركة. اختبر الأفكار القصيرة قبل تحويلها إلى فيديوهات أطول.",
  general:
    "إذا كان المحتوى متنوعا، اختر زاوية واضحة لكل فيديو. وضوح الجمهور يساعد الخوارزمية على فهم القناة."
};

export type ContentFormat = "shorts" | "standard" | "longform";

export const contentFormatMultipliers: Record<ContentFormat, number> = {
  shorts: 0.08,   // Shorts are paid via Shorts revenue share, not standard AdSense RPM
  standard: 1,
  longform: 1.55  // 8+ min videos unlock mid-roll ads, meaningfully higher RPM
};

export const platformRpmMultipliers: Record<PlatformSlug, number> = {
  youtube: 1,
  tiktok: 0.18,
  instagram: 0.28,
  facebook: 0.45
};

export function getRpmRange(niche: NicheSlug, country: CountrySlug, override?: number, format: ContentFormat = "standard"): RpmRange {
  const base = override && override > 0 ? override : nicheBaseRPM[niche] * countryMultipliers[country];
  const final = base * contentFormatMultipliers[format];
  return {
    low: final * 0.6,
    final,
    high: final * 1.4
  };
}
