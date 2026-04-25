import type { NicheSlug } from "./rpmData";

type DetectionInput = {
  channelTitle: string;
  channelDescription: string;
  videoCategoryIds: string[];
  videoTitles: string[];
  videoDescriptions: string[];
};

const categoryMap: Record<string, NicheSlug> = {
  "1": "entertainment",
  "2": "general",
  "10": "entertainment",
  "15": "general",
  "17": "sports",
  "19": "travel",
  "20": "gaming",
  "22": "entertainment",
  "23": "comedy",
  "24": "entertainment",
  "25": "general",
  "26": "beauty",
  "27": "education",
  "28": "tech"
};

const keywordMap: Record<NicheSlug, string[]> = {
  tech: ["tech", "technology", "iphone", "android", "ai", "software", "برمجة", "تقنية", "هاتف", "ذكاء اصطناعي"],
  finance: ["finance", "money", "business", "invest", "crypto", "stock", "مال", "أعمال", "استثمار", "تداول", "اقتصاد"],
  education: ["learn", "course", "lesson", "tutorial", "education", "تعلم", "تعليم", "شرح", "درس", "دورة"],
  cooking: ["cook", "recipe", "food", "kitchen", "طبخ", "وصفة", "مطبخ", "اكل", "أكل"],
  gaming: ["game", "gaming", "minecraft", "fortnite", "pubg", "لعبة", "العاب", "ألعاب", "قيمنق"],
  entertainment: ["entertainment", "vlog", "reaction", "challenge", "ترفيه", "فلوق", "تحدي", "مقلب"],
  sports: ["sport", "football", "soccer", "match", "رياضة", "كرة", "مباراة", "دوري"],
  beauty: ["beauty", "makeup", "health", "fitness", "skin", "جمال", "مكياج", "صحة", "بشرة", "لياقة"],
  travel: ["travel", "trip", "tourism", "hotel", "سفر", "رحلة", "سياحة", "فندق"],
  kids: ["kids", "children", "toy", "cartoon", "أطفال", "طفل", "كرتون", "العاب اطفال"],
  religion: ["quran", "islam", "hadith", "religion", "قرآن", "اسلام", "إسلام", "حديث", "دين"],
  comedy: ["comedy", "funny", "ضحك", "كوميديا", "نكت", "ساخر"],
  general: []
};

export function detectNiche(input: DetectionInput): { detectedNiche: NicheSlug; confidence: "low" | "medium" | "high" } {
  const scores = new Map<NicheSlug, number>();
  const text = [input.channelTitle, input.channelDescription, ...input.videoTitles, ...input.videoDescriptions]
    .join(" ")
    .toLowerCase();

  for (const categoryId of input.videoCategoryIds) {
    const niche = categoryMap[categoryId];
    if (niche) scores.set(niche, (scores.get(niche) ?? 0) + 3);
  }

  for (const [niche, keywords] of Object.entries(keywordMap) as [NicheSlug, string[]][]) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        scores.set(niche, (scores.get(niche) ?? 0) + 1);
      }
    }
  }

  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  const [winner, score] = ranked[0] ?? ["general", 0];

  if (!score || winner === "general") return { detectedNiche: "general", confidence: "low" };
  if (score >= 8) return { detectedNiche: winner, confidence: "high" };
  if (score >= 4) return { detectedNiche: winner, confidence: "medium" };
  return { detectedNiche: winner, confidence: "low" };
}
