type Locale = "en" | "zh";

export interface NamePreset {
  name: string; // url segment (lowercase for en, pinyin or pinyin-style for zh)
  displayText: string; // displayed text
  locale: Locale;
  keywords: string[];
  styleSlugs: string[]; // recommended style preset slugs
}

/**
 * Top 60 English names + 30 Chinese names — manually curated for quality
 * and SEO intent. Each entry targets "{name} 3d text" and "{name} name logo".
 */
export const namePresets: NamePreset[] = [
  // English names (most-searched, 60)
  { name: "john", displayText: "JOHN", locale: "en", keywords: ["john 3d text", "john name logo", "john in 3d letters"], styleSlugs: ["neon-night", "luxury-serif"] },
  { name: "emma", displayText: "EMMA", locale: "en", keywords: ["emma 3d text", "emma name logo", "emma in 3d letters"], styleSlugs: ["barbie-pink", "luxury-serif"] },
  { name: "michael", displayText: "MICHAEL", locale: "en", keywords: ["michael 3d text", "michael name logo"], styleSlugs: ["molten-gold", "luxury-serif"] },
  { name: "sophia", displayText: "SOPHIA", locale: "en", keywords: ["sophia 3d text", "sophia name logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "william", displayText: "WILLIAM", locale: "en", keywords: ["william 3d text", "william name logo"], styleSlugs: ["luxury-serif", "chrome-sheen"] },
  { name: "olivia", displayText: "OLIVIA", locale: "en", keywords: ["olivia 3d text", "olivia name logo"], styleSlugs: ["barbie-pink", "rose-gold"] },
  { name: "james", displayText: "JAMES", locale: "en", keywords: ["james 3d text", "james name logo"], styleSlugs: ["molten-gold", "neon-night"] },
  { name: "ava", displayText: "AVA", locale: "en", keywords: ["ava 3d text", "ava name logo"], styleSlugs: ["barbie-pink", "luxury-serif"] },
  { name: "alex", displayText: "ALEX", locale: "en", keywords: ["alex 3d text", "alex name logo"], styleSlugs: ["neon-night", "fireburst"] },
  { name: "lily", displayText: "LILY", locale: "en", keywords: ["lily 3d text", "lily name logo"], styleSlugs: ["barbie-pink", "ocean-glass"] },
  { name: "liam", displayText: "LIAM", locale: "en", keywords: ["liam 3d text", "liam name logo"], styleSlugs: ["molten-gold", "chrome-sheen"] },
  { name: "mia", displayText: "MIA", locale: "en", keywords: ["mia 3d text", "mia name logo"], styleSlugs: ["barbie-pink", "rose-gold"] },
  { name: "noah", displayText: "NOAH", locale: "en", keywords: ["noah 3d text", "noah name logo"], styleSlugs: ["luxury-serif", "chrome-sheen"] },
  { name: "harper", displayText: "HARPER", locale: "en", keywords: ["harper 3d text", "harper name logo"], styleSlugs: ["luxury-serif", "neon-night"] },
  { name: "lucas", displayText: "LUCAS", locale: "en", keywords: ["lucas 3d text", "lucas name logo"], styleSlugs: ["fireburst", "neon-night"] },
  { name: "ella", displayText: "ELLA", locale: "en", keywords: ["ella 3d text", "ella name logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "mason", displayText: "MASON", locale: "en", keywords: ["mason 3d text", "mason name logo"], styleSlugs: ["chrome-sheen", "sports-flame"] },
  { name: "aria", displayText: "ARIA", locale: "en", keywords: ["aria 3d text", "aria name logo"], styleSlugs: ["luxury-serif", "rose-gold"] },
  { name: "logan", displayText: "LOGAN", locale: "en", keywords: ["logan 3d text", "logan name logo"], styleSlugs: ["neon-night", "fireburst"] },
  { name: "grace", displayText: "GRACE", locale: "en", keywords: ["grace 3d text", "grace name logo"], styleSlugs: ["luxury-serif", "rose-gold"] },
  { name: "ethan", displayText: "ETHAN", locale: "en", keywords: ["ethan 3d text", "ethan name logo"], styleSlugs: ["fireburst", "chrome-sheen"] },
  { name: "chloe", displayText: "CHLOE", locale: "en", keywords: ["chloe 3d text", "chloe name logo"], styleSlugs: ["barbie-pink", "luxury-serif"] },
  { name: "jacob", displayText: "JACOB", locale: "en", keywords: ["jacob 3d text", "jacob name logo"], styleSlugs: ["molten-gold", "luxury-serif"] },
  { name: "zoe", displayText: "ZOE", locale: "en", keywords: ["zoe 3d text", "zoe name logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "daniel", displayText: "DANIEL", locale: "en", keywords: ["daniel 3d text", "daniel name logo"], styleSlugs: ["luxury-serif", "chrome-sheen"] },
  { name: "hannah", displayText: "HANNAH", locale: "en", keywords: ["hannah 3d text", "hannah name logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "henry", displayText: "HENRY", locale: "en", keywords: ["henry 3d text", "henry name logo"], styleSlugs: ["molten-gold", "luxury-serif"] },
  { name: "lila", displayText: "LILA", locale: "en", keywords: ["lila 3d text", "lila name logo"], styleSlugs: ["barbie-pink", "rose-gold"] },
  { name: "sebastian", displayText: "SEBASTIAN", locale: "en", keywords: ["sebastian 3d text", "sebastian name logo"], styleSlugs: ["luxury-serif", "horror-slime"] },
  { name: "owen", displayText: "OWEN", locale: "en", keywords: ["owen 3d text", "owen name logo"], styleSlugs: ["chrome-sheen", "luxury-serif"] },
  { name: "luna", displayText: "LUNA", locale: "en", keywords: ["luna 3d text", "luna name logo"], styleSlugs: ["ocean-glass", "rose-gold"] },
  { name: "samuel", displayText: "SAMUEL", locale: "en", keywords: ["samuel 3d text", "samuel name logo"], styleSlugs: ["luxury-serif", "neon-night"] },
  { name: "scarlett", displayText: "SCARLETT", locale: "en", keywords: ["scarlett 3d text", "scarlett name logo"], styleSlugs: ["barbie-pink", "rose-gold"] },
  { name: "jack", displayText: "JACK", locale: "en", keywords: ["jack 3d text", "jack name logo"], styleSlugs: ["neon-night", "fireburst"] },
  { name: "sophie", displayText: "SOPHIE", locale: "en", keywords: ["sophie 3d text", "sophie name logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "benjamin", displayText: "BENJAMIN", locale: "en", keywords: ["benjamin 3d text", "benjamin name logo"], styleSlugs: ["luxury-serif", "chrome-sheen"] },
  { name: "isabella", displayText: "ISABELLA", locale: "en", keywords: ["isabella 3d text", "isabella name logo"], styleSlugs: ["barbie-pink", "luxury-serif"] },
  { name: "leo", displayText: "LEO", locale: "en", keywords: ["leo 3d text", "leo name logo"], styleSlugs: ["fireburst", "neon-night"] },
  { name: "ruby", displayText: "RUBY", locale: "en", keywords: ["ruby 3d text", "ruby name logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "caleb", displayText: "CALEB", locale: "en", keywords: ["caleb 3d text", "caleb name logo"], styleSlugs: ["chrome-sheen", "sports-flame"] },
  { name: "maya", displayText: "MAYA", locale: "en", keywords: ["maya 3d text", "maya name logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "ryan", displayText: "RYAN", locale: "en", keywords: ["ryan 3d text", "ryan name logo"], styleSlugs: ["neon-night", "fireburst"] },
  { name: "zoey", displayText: "ZOEY", locale: "en", keywords: ["zoey 3d text", "zoey name logo"], styleSlugs: ["barbie-pink", "rose-gold"] },
  { name: "dylan", displayText: "DYLAN", locale: "en", keywords: ["dylan 3d text", "dylan name logo"], styleSlugs: ["luxury-serif", "chrome-sheen"] },
  { name: "alice", displayText: "ALICE", locale: "en", keywords: ["alice 3d text", "alice name logo"], styleSlugs: ["luxury-serif", "rose-gold"] },
  { name: "nathan", displayText: "NATHAN", locale: "en", keywords: ["nathan 3d text", "nathan name logo"], styleSlugs: ["luxury-serif", "neon-night"] },
  { name: "nora", displayText: "NORA", locale: "en", keywords: ["nora 3d text", "nora name logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "isaac", displayText: "ISAAC", locale: "en", keywords: ["isaac 3d text", "isaac name logo"], styleSlugs: ["chrome-sheen", "horror-slime"] },
  { name: "hunter", displayText: "HUNTER", locale: "en", keywords: ["hunter 3d text", "hunter name logo"], styleSlugs: ["fireburst", "sports-flame"] },
  { name: "violet", displayText: "VIOLET", locale: "en", keywords: ["violet 3d text", "violet name logo"], styleSlugs: ["luxury-serif", "rose-gold"] },
  { name: "christian", displayText: "CHRISTIAN", locale: "en", keywords: ["christian 3d text", "christian name logo"], styleSlugs: ["luxury-serif", "chrome-sheen"] },
  { name: "aurora", displayText: "AURORA", locale: "en", keywords: ["aurora 3d text", "aurora name logo"], styleSlugs: ["ocean-glass", "rose-gold"] },
  { name: "elijah", displayText: "ELIJAH", locale: "en", keywords: ["elijah 3d text", "elijah name logo"], styleSlugs: ["molten-gold", "luxury-serif"] },
  { name: "stella", displayText: "STELLA", locale: "en", keywords: ["stella 3d text", "stella name logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "gabriel", displayText: "GABRIEL", locale: "en", keywords: ["gabriel 3d text", "gabriel name logo"], styleSlugs: ["luxury-serif", "chrome-sheen"] },
  { name: "ivy", displayText: "IVY", locale: "en", keywords: ["ivy 3d text", "ivy name logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "anthony", displayText: "ANTHONY", locale: "en", keywords: ["anthony 3d text", "anthony name logo"], styleSlugs: ["luxury-serif", "neon-night"] },
  { name: "nova", displayText: "NOVA", locale: "en", keywords: ["nova 3d text", "nova name logo"], styleSlugs: ["neon-night", "rose-gold"] },
  { name: "tyler", displayText: "TYLER", locale: "en", keywords: ["tyler 3d text", "tyler name logo"], styleSlugs: ["fireburst", "neon-night"] },

  // Chinese names (30 — pinyin for URL, original display)
  { name: "xiaoming", displayText: "小明", locale: "zh", keywords: ["小明 3D 文字", "小明 名字 Logo", "小明 立体字"], styleSlugs: ["neon-night", "luxury-serif"] },
  { name: "xiaohong", displayText: "小红", locale: "zh", keywords: ["小红 3D 文字", "小红 名字 Logo", "小红 立体字"], styleSlugs: ["barbie-pink", "rose-gold"] },
  { name: "xiaojing", displayText: "小静", locale: "zh", keywords: ["小静 3D 文字", "小静 名字 Logo"], styleSlugs: ["luxury-serif", "rose-gold"] },
  { name: "xiaoli", displayText: "小丽", locale: "zh", keywords: ["小丽 3D 文字", "小丽 名字 Logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "wangwei", displayText: "王伟", locale: "zh", keywords: ["王伟 3D 文字", "王伟 名字 Logo"], styleSlugs: ["luxury-serif", "chrome-sheen"] },
  { name: "wangfang", displayText: "王芳", locale: "zh", keywords: ["王芳 3D 文字", "王芳 名字 Logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "wangmin", displayText: "王敏", locale: "zh", keywords: ["王敏 3D 文字", "王敏 名字 Logo"], styleSlugs: ["luxury-serif", "rose-gold"] },
  { name: "wanglei", displayText: "王磊", locale: "zh", keywords: ["王磊 3D 文字", "王磊 名字 Logo"], styleSlugs: ["chrome-sheen", "neon-night"] },
  { name: "lina", displayText: "李娜", locale: "zh", keywords: ["李娜 3D 文字", "李娜 名字 Logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "lijun", displayText: "李军", locale: "zh", keywords: ["李军 3D 文字", "李军 名字 Logo"], styleSlugs: ["luxury-serif", "neon-night"] },
  { name: "lijuan", displayText: "李娟", locale: "zh", keywords: ["李娟 3D 文字", "李娟 名字 Logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "lihua", displayText: "李华", locale: "zh", keywords: ["李华 3D 文字", "李华 名字 Logo"], styleSlugs: ["luxury-serif", "chrome-sheen"] },
  { name: "zhangwei", displayText: "张伟", locale: "zh", keywords: ["张伟 3D 文字", "张伟 名字 Logo"], styleSlugs: ["luxury-serif", "neon-night"] },
  { name: "zhangmin", displayText: "张敏", locale: "zh", keywords: ["张敏 3D 文字", "张敏 名字 Logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "zhangli", displayText: "张力", locale: "zh", keywords: ["张力 3D 文字", "张力 名字 Logo"], styleSlugs: ["chrome-sheen", "luxury-serif"] },
  { name: "zhangjing", displayText: "张静", locale: "zh", keywords: ["张静 3D 文字", "张静 名字 Logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "liuyang", displayText: "刘洋", locale: "zh", keywords: ["刘洋 3D 文字", "刘洋 名字 Logo"], styleSlugs: ["neon-night", "chrome-sheen"] },
  { name: "liuxin", displayText: "刘欣", locale: "zh", keywords: ["刘欣 3D 文字", "刘欣 名字 Logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "liuwei", displayText: "刘伟", locale: "zh", keywords: ["刘伟 3D 文字", "刘伟 名字 Logo"], styleSlugs: ["luxury-serif", "neon-night"] },
  { name: "liuhong", displayText: "刘红", locale: "zh", keywords: ["刘红 3D 文字", "刘红 名字 Logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "chenjing", displayText: "陈静", locale: "zh", keywords: ["陈静 3D 文字", "陈静 名字 Logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "chenhao", displayText: "陈浩", locale: "zh", keywords: ["陈浩 3D 文字", "陈浩 名字 Logo"], styleSlugs: ["neon-night", "fireburst"] },
  { name: "yangmin", displayText: "杨敏", locale: "zh", keywords: ["杨敏 3D 文字", "杨敏 名字 Logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "yanglei", displayText: "杨磊", locale: "zh", keywords: ["杨磊 3D 文字", "杨磊 名字 Logo"], styleSlugs: ["chrome-sheen", "neon-night"] },
  { name: "huangmei", displayText: "黄梅", locale: "zh", keywords: ["黄梅 3D 文字", "黄梅 名字 Logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "huangjun", displayText: "黄俊", locale: "zh", keywords: ["黄俊 3D 文字", "黄俊 名字 Logo"], styleSlugs: ["luxury-serif", "neon-night"] },
  { name: "zhaomin", displayText: "赵敏", locale: "zh", keywords: ["赵敏 3D 文字", "赵敏 名字 Logo"], styleSlugs: ["rose-gold", "barbie-pink"] },
  { name: "zhaoyang", displayText: "赵阳", locale: "zh", keywords: ["赵阳 3D 文字", "赵阳 名字 Logo"], styleSlugs: ["chrome-sheen", "luxury-serif"] },
  { name: "wujing", displayText: "吴静", locale: "zh", keywords: ["吴静 3D 文字", "吴静 名字 Logo"], styleSlugs: ["rose-gold", "luxury-serif"] },
  { name: "wulei", displayText: "吴磊", locale: "zh", keywords: ["吴磊 3D 文字", "吴磊 名字 Logo"], styleSlugs: ["luxury-serif", "neon-night"] },
];

export function getNamePreset(name: string, locale: Locale): NamePreset | undefined {
  const lower = name.toLowerCase();
  return namePresets.find(
    (n) => n.name === lower && n.locale === locale,
  );
}
