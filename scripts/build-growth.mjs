import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";

const baseUrl = "https://cervicalcurveguide.com";
const version = "20260609-pillar";
const reviewDate = "2026-06-09";
const sitemapLastmod = "2026-06-12";
const generatedHtmlFiles = new Set();
const skippedExistingHtmlFiles = new Set();
const overwriteExistingHtml = process.argv.includes("--overwrite-existing");
const overwriteTrafficSprintHtml = process.argv.includes("--overwrite-traffic-sprint");
const trafficSprintHtmlFiles = new Set();

const languages = {
  zh: {
    htmlLang: "zh-Hans",
    hreflang: "zh-Hans",
    prefix: "/zh",
    home: "/zh/",
    short: "中文",
    label: "中文",
    read: "继续阅读",
    updated: "最后审校：2026 年 6 月 9 日",
    review:
      "编辑审阅：已按保守健康教育标准检查；尚未由具名执业临床人员独立审阅。",
    medicalLabel: "医疗提醒：",
    ad: "广告位",
    sourceHeading: "参考来源",
    related: "相关内容",
    keyHeading: "先记住这几件事",
    trackHeading: "建议记录什么",
    redFlagHeading: "什么时候不要继续自我处理",
    redFlag:
      "新出现或加重的无力、麻木扩散、手变笨、走路不稳、大小便异常、发热、肿瘤病史或明显外伤，应尽快就医。持续夜间痛醒、握力下降或症状快速进展，也不适合只靠网上练习。",
    track:
      "记录疼痛位置、手臂或手指症状、睡眠、诱发姿势、运动量、第二天反应和是否影响握力/精细动作。这个记录比单独盯着影像报告更有用。",
    footer:
      "一个面向颈椎曲度保守康复的多语言健康教育网站。",
    nav: {
      home: "首页",
      symptoms: "症状",
      diagnosis: "影像",
      exercises: "练习",
      treatments: "治疗",
      sports: "运动",
      videos: "视频",
      tools: "工具"
    },
    skip: "跳到正文",
    growthStrings: {
      "guides.title": "二十多个主题已经组成内容集群。",
      "guides.copy":
        "新增栏目页、工具页、视频索引和长尾专题后，读者可以从症状、影像、练习、治疗边界和运动负荷进入更细的页面。"
    }
  },
  en: {
    htmlLang: "en",
    hreflang: "en",
    prefix: "",
    home: "/",
    short: "EN",
    label: "English",
    read: "Read more",
    updated: "Last reviewed: June 9, 2026",
    review:
      "Editorial review: checked for conservative health-education wording; not yet independently reviewed by a named licensed clinician.",
    medicalLabel: "Medical notice:",
    ad: "Advertisement",
    sourceHeading: "References",
    related: "Related reading",
    keyHeading: "Start with these points",
    trackHeading: "What to track",
    redFlagHeading: "When not to keep self-managing",
    redFlag:
      "New or worsening weakness, spreading numbness, hand clumsiness, walking changes, bowel/bladder symptoms, fever, cancer history, or significant trauma need prompt medical care. Night pain that keeps waking you, grip loss, or fast progression should not be handled only with online exercises.",
    track:
      "Track pain location, arm or finger symptoms, sleep, aggravating positions, training volume, next-day response, and whether grip or fine hand control changes. This record is often more useful than staring at imaging words alone.",
    footer:
      "A multilingual health-education site for conservative cervical curve care.",
    nav: {
      home: "Home",
      symptoms: "Symptoms",
      diagnosis: "Imaging",
      exercises: "Exercises",
      treatments: "Treatments",
      sports: "Sports",
      videos: "Videos",
      tools: "Tools"
    },
    skip: "Skip to content",
    growthStrings: {
      "guides.title": "More than twenty topics now form content clusters.",
      "guides.copy":
        "New hub pages, tools, video references, and long-tail guides let readers enter by symptoms, imaging, exercises, treatment boundaries, and sport loading."
    }
  },
  ja: {
    htmlLang: "ja",
    hreflang: "ja",
    prefix: "/ja",
    home: "/ja/",
    short: "日本語",
    label: "日本語",
    read: "続きを読む",
    updated: "最終確認：2026年6月9日",
    review:
      "編集レビュー：保守的な健康教育表現として確認済み。現時点では、氏名を表示した有資格臨床家による独立レビューは未完了です。",
    medicalLabel: "医療上の注意：",
    ad: "広告枠",
    sourceHeading: "参考文献",
    related: "関連コンテンツ",
    keyHeading: "まず押さえること",
    trackHeading: "記録したいこと",
    redFlagHeading: "自己判断を続けない方がよい時",
    redFlag:
      "新しい筋力低下、しびれの拡大、手の不器用さ、歩行変化、排尿排便の異常、発熱、がんの既往、大きな外傷がある場合は早めに医療相談をしてください。夜間に何度も起きる痛み、握力低下、急な悪化もオンライン運動だけで扱う状況ではありません。",
    track:
      "痛みの場所、腕や指の症状、睡眠、悪化姿勢、運動量、翌日の反応、握力や細かい手作業の変化を記録します。画像の言葉だけを見るより実用的です。",
    footer:
      "頸椎カーブの保存的ケアを扱う多言語健康教育サイトです。",
    nav: {
      home: "ホーム",
      symptoms: "症状",
      diagnosis: "画像",
      exercises: "運動",
      treatments: "治療",
      sports: "スポーツ",
      videos: "動画",
      tools: "ツール"
    },
    skip: "本文へ移動",
    growthStrings: {
      "guides.title": "20以上のテーマがコンテンツ群になりました。",
      "guides.copy":
        "症状、画像、運動、治療の境界、スポーツ負荷から入れるハブ、ツール、動画参考、長尾ガイドを追加しました。"
    }
  },
  es: {
    htmlLang: "es",
    hreflang: "es",
    prefix: "/es",
    home: "/es/",
    short: "ES",
    label: "Español",
    read: "Leer más",
    updated: "Última revisión: 9 de junio de 2026",
    review:
      "Revisión editorial: comprobado con lenguaje conservador de educación sanitaria; aún no revisado de forma independiente por un profesional clínico identificado.",
    medicalLabel: "Aviso médico:",
    ad: "Publicidad",
    sourceHeading: "Referencias",
    related: "Contenido relacionado",
    keyHeading: "Empieza por estos puntos",
    trackHeading: "Qué conviene registrar",
    redFlagHeading: "Cuándo no seguir automanejándolo",
    redFlag:
      "Debilidad nueva o progresiva, entumecimiento que se extiende, torpeza de la mano, cambios al caminar, síntomas urinarios o intestinales, fiebre, antecedente de cáncer o traumatismo importante requieren atención médica. Dolor nocturno que despierta, pérdida de agarre o progresión rápida tampoco deberían manejarse solo con ejercicios en línea.",
    track:
      "Registra ubicación del dolor, síntomas de brazo o dedos, sueño, posturas que agravan, volumen de ejercicio, respuesta al día siguiente y cambios de agarre o control fino. Suele ser más útil que mirar solo las palabras del informe.",
    footer:
      "Sitio multilingüe de educación sanitaria para cuidado conservador de la curva cervical.",
    nav: {
      home: "Inicio",
      symptoms: "Síntomas",
      diagnosis: "Imagen",
      exercises: "Ejercicios",
      treatments: "Tratamientos",
      sports: "Deporte",
      videos: "Videos",
      tools: "Herramientas"
    },
    skip: "Saltar al contenido",
    growthStrings: {
      "guides.title": "Más de veinte temas forman grupos de contenido.",
      "guides.copy":
        "Nuevos hubs, herramientas, videos de referencia y guías long-tail permiten entrar por síntomas, imagen, ejercicios, límites de tratamiento y carga deportiva."
    }
  }
};

// ---------------------------------------------------------------------------
// SAFETY GUARD — added 2026-06-10. DO NOT REMOVE without reading this.
// This guard catches the old PRE-migration routing shape: zh at "/" and en at
// "/en/". The LIVE site was migrated to English-default (en at "/", zh at
// "/zh/") and then hand-edited (expanded articles, thickened EN/JA hub pages,
// a static ja homepage #overview section, /en/ redirect stubs). If this config
// ever drifts back to the old routing, running it would regenerate ~134 files,
// REVERT the migration, and OVERWRITE that hand-written content.
// The guard aborts when it detects the live tree is already English-default
// but this config is still pre-migration. To genuinely revive the generator,
// reconcile it first (swap prefixes + port the post-migration content), then
// diff a sandbox rebuild against the live tree until it matches.
// Escape hatch (only if you intentionally want the old pre-migration output):
//   node scripts/build-growth.mjs --force-prerevert
// ---------------------------------------------------------------------------
{
  const liveIsEnglishDefault =
    existsSync("zh/index.html") || existsSync("zh/symptoms/index.html");
  const generatorIsPreMigration =
    languages.zh.prefix === "" && languages.en.prefix === "/en";
  if (
    liveIsEnglishDefault &&
    generatorIsPreMigration &&
    !process.argv.includes("--force-prerevert")
  ) {
    console.error(
      [
        "",
        "✋ build-growth.mjs ABORTED — it is OUT OF SYNC with the live site.",
        "",
        "The live site is English-default (en at '/', zh at '/zh/'), but this",
        "generator still routes zh at '/' and en at '/en/'. Running it would:",
        "  • revert the English-default migration (~134 files), and",
        "  • overwrite the hand-written hub/article/ja content (2026-06-10).",
        "",
        "Before using this generator again, reconcile it with the live tree:",
        "  1) swap language prefixes  (en -> prefix '', home '/';  zh -> '/zh', '/zh/')",
        "  2) port post-migration hand edits into the generator's data",
        "     (expanded articles, thickened EN/JA hubs, ja homepage #overview,",
        "      prerendered homepages, /en/ redirect stubs)",
        "  3) rebuild in a sandbox copy and diff against the live tree until equal",
        "",
        "Intentionally want the OLD pre-migration output? Re-run with:",
        "  node scripts/build-growth.mjs --force-prerevert",
        ""
      ].join("\n")
    );
    process.exit(1);
  }
}

const sources = {
  radiculopathy: {
    label: "AAOS OrthoInfo: Cervical Radiculopathy",
    url: "https://orthoinfo.aaos.org/en/diseases--conditions/cervical-radiculopathy-pinched-nerve/"
  },
  ncbiRadiculopathy: {
    label: "NCBI Bookshelf: Cervical Radiculopathy",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK441828/"
  },
  neckPainGuideline: {
    label: "JOSPT / PubMed: Neck Pain Clinical Practice Guideline",
    url: "https://pubmed.ncbi.nlm.nih.gov/28666405/"
  },
  kyphosisReview: {
    label: "PMC: Etiology and treatment of cervical kyphosis",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8511555/"
  },
  lordosisReview: {
    label: "PMC: Loss of cervical lordosis prognosis review",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5324370/"
  },
  spineBasics: {
    label: "AAOS OrthoInfo: Spine Basics",
    url: "https://www.orthoinfo.org/en/diseases--conditions/spine-basics/"
  },
  curvesOfSpine: {
    label: "Cedars-Sinai: Curves of the Spine",
    url: "https://www.cedars-sinai.org/health-library/diseases-and-conditions/c/curves-of-the-spine.html"
  },
  clevelandKyphosis: {
    label: "Cleveland Clinic: Cervical Kyphosis",
    url: "https://my.clevelandclinic.org/health/diseases/22868-cervical-kyphosis"
  },
  carpal: {
    label: "MedlinePlus: Carpal Tunnel Syndrome",
    url: "https://medlineplus.gov/carpaltunnelsyndrome.html"
  },
  ulnar: {
    label: "MedlinePlus: Ulnar Nerve Dysfunction",
    url: "https://medlineplus.gov/ency/article/000789.htm"
  },
  thoracicOutlet: {
    label: "MedlinePlus: Thoracic Outlet Syndrome",
    url: "https://medlineplus.gov/thoracicoutletsyndrome.html"
  },
  surferMyelopathy: {
    label: "PMC: Surfer's myelopathy review",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7919899/"
  },
  returnSport: {
    label: "PMC: Return to play after cervical spine injuries",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5110349/"
  },
  winterSport: {
    label: "PubMed: Spinal injury in alpine winter sports",
    url: "https://pubmed.ncbi.nlm.nih.gov/31324221/"
  }
};

const existingArticles = [
  {
    slug: "finger-numbness-nerve-map",
    category: "symptoms",
    cards: {
      zh: ["症状专题", "手指麻木地图：颈椎神经根还是周围神经？", "按拇指、食指、中指、无名指和小指整理神经根、腕管、尺神经、桡神经和胸廓出口线索。"],
      en: ["Symptom guide", "Finger numbness map: cervical root or peripheral nerve?", "Thumb, index, middle, ring, and little-finger patterns across cervical roots and peripheral nerves."],
      ja: ["症状特集", "指のしびれマップ：頸椎神経根か、末梢神経か", "指ごとのしびれを神経根、手根管、尺骨神経、橈骨神経、胸郭出口から整理します。"],
      es: ["Guía de síntomas", "Mapa de dedos dormidos: raíz cervical o nervio periférico", "Patrones por dedo entre raíces cervicales, túnel carpiano, nervio cubital, radial y salida torácica."]
    }
  },
  {
    slug: "sports-neck-load-return-guide",
    category: "sports",
    cards: {
      zh: ["运动专题", "颈椎反弓还能冲浪、滑雪/单板或攀岩吗？", "用 24 小时症状规则解释划水、雪上冲击和攀岩保护姿势。"],
      en: ["Sport guide", "Can you surf, ski, snowboard, or climb with cervical kyphosis?", "A return-to-sport framework for paddling, snow impact risk, belay posture, and symptom response."],
      ja: ["スポーツ特集", "頸椎後弯でもサーフィン、スキー、スノーボード、クライミングはできる？", "パドリング、雪上衝撃、ビレイ姿勢を24時間ルールで整理します。"],
      es: ["Guía deportiva", "¿Puedes surfear, esquiar, hacer snowboard o escalar con cifosis cervical?", "Marco de vuelta al deporte para remada, nieve, aseguramiento y respuesta de síntomas."]
    }
  },
  {
    slug: "surfing-cervical-kyphosis-rehab-experience",
    category: "sports",
    cards: {
      zh: ["亲历记录", "颈椎反弓 + 冲浪：我亲历的康复动作清单", "第一人称记录：哪些动作帮到我，哪些反而让右手更麻，以及如何用 24 小时反应回到划水。"],
      en: ["Personal experience", "Cervical kyphosis + surfing: my rehab exercise list", "A first-person note on drills that helped, drills that made hand numbness worse, and a thoracic-led return-to-surf framework."],
      ja: ["体験記", "頸椎後弯とサーフィン：私のリハビリ運動リスト", "役立った運動、手のしびれが悪化した運動、24時間反応でサーフィンへ戻る考え方。"],
      es: ["Experiencia", "Cifosis cervical y surf: mi lista de ejercicios", "Nota personal sobre ejercicios que ayudaron, los que empeoraron la mano dormida y un retorno al surf guiado por la respuesta de 24 horas."]
    }
  },
  {
    slug: "cervical-kyphosis-vs-loss-lordosis",
    category: "diagnosis",
    cards: {
      zh: ["影像解读", "颈椎反弓、后凸和曲度变直有什么区别？", "把报告词翻译成人话，避免把影像词直接当成疼痛诊断。"],
      en: ["Imaging guide", "Cervical kyphosis vs loss of cervical lordosis", "Plain-language differences between straightening, reversed curve, and cervical kyphosis."],
      ja: ["画像の読み方", "頸椎後弯と頸椎前弯減少の違い", "ストレートネック、前弯減少、逆カーブ、後弯を整理します。"],
      es: ["Guía de imagen", "Cifosis cervical vs pérdida de lordosis", "Diferencias entre rectificación, pérdida de lordosis, curva invertida y cifosis cervical."]
    }
  },
  {
    slug: "cervical-radiculopathy-myelopathy-red-flags",
    category: "symptoms",
    cards: {
      zh: ["危险信号", "神经根病和脊髓受压哪些症状不能拖？", "区分放射痛、手麻、无力、手变笨和走路不稳。"],
      en: ["Red flags", "Radiculopathy and myelopathy warning signs", "Separate radiating arm pain, numbness, weakness, hand clumsiness, and gait changes."],
      ja: ["危険サイン", "神経根症と脊髄症で待ってはいけない症状", "腕痛、しびれ、筋力低下、手の不器用さ、歩行変化を整理します。"],
      es: ["Señales de alarma", "Radiculopatía y mielopatía: cuándo no esperar", "Ordena dolor irradiado, dedos dormidos, debilidad, torpeza manual y marcha."]
    }
  },
  {
    slug: "can-cervical-curve-be-restored",
    category: "exercises",
    cards: {
      zh: ["康复预期", "颈椎曲度能练回来吗？", "不承诺恢复曲度，改为追踪疼痛、手麻、睡眠、活动和力量耐受。"],
      en: ["Rehab expectations", "Can cervical curve be restored?", "Do not promise curve restoration; track pain, numbness, sleep, motion, strength, and tolerance."],
      ja: ["リハビリの期待値", "頸椎カーブは運動で戻る？", "カーブ回復を約束せず、痛み、しびれ、睡眠、可動性、耐性を追います。"],
      es: ["Expectativas", "¿Se puede recuperar la curva cervical?", "No promete restaurar la curva; mide dolor, entumecimiento, sueño, movimiento y tolerancia."]
    }
  },
  {
    slug: "traction-pillow-manipulation-risk-guide",
    category: "treatments",
    cards: {
      zh: ["治疗边界", "牵引、枕头、按摩和正骨怎么判断？", "保守解释常见工具可能帮什么，以及哪些症状不适合自行尝试。"],
      en: ["Treatment boundaries", "Traction, pillows, massage, and manipulation", "A conservative guide to common tools, possible benefits, and when self-care is not appropriate."],
      ja: ["治療の境界", "牽引、枕、マッサージ、手技療法の考え方", "よく使う道具や施術が何を助け得るか、自己判断を避ける境界を整理します。"],
      es: ["Límites", "Tracción, almohadas, masaje y manipulación", "Guía prudente sobre herramientas comunes, beneficios posibles y límites del autocuidado."]
    }
  }
];

const newArticles = [
  topic("headache-dizziness-neck-curve", "symptoms", [sources.neckPainGuideline, sources.kyphosisReview], {
    zh: ["症状专题", "颈椎反弓会导致头痛或头晕吗？", "很多头痛和头晕不能简单归因于颈椎曲度。更稳妥的做法是区分颈源性线索、前庭问题、偏头痛、血压和神经危险信号。", "颈源性头痛通常更像由颈部姿势或活动诱发的单侧枕部/颞部疼痛；持续旋转性眩晕、说话含糊、视物重影或突然最严重头痛不应自行处理。", ["曲度报告不能单独解释头痛或头晕。", "先看神经系统危险信号，再讨论颈部负荷。", "记录头痛位置、眩晕性质、持续时间和诱发动作。"]],
    en: ["Symptom guide", "Can cervical kyphosis cause headache or dizziness?", "Headache and dizziness should not be automatically blamed on curve findings. A safer approach separates neck-related clues from vestibular, migraine, blood-pressure, and neurological red flags.", "Cervicogenic headache often behaves like one-sided occipital or temporal pain linked with neck position or movement; spinning vertigo, slurred speech, double vision, or a sudden worst headache needs medical care.", ["A curve report alone does not explain headache or dizziness.", "Screen neurological red flags before blaming neck posture.", "Track location, dizziness quality, duration, and triggers."]],
    ja: ["症状特集", "頸椎後弯は頭痛やめまいの原因になりますか？", "頭痛やめまいを画像上のカーブだけで説明するのは危険です。頸部由来の手がかり、前庭、片頭痛、血圧、神経の危険サインを分けます。", "頸部由来の頭痛は首の姿勢や動きで変わる片側の後頭部や側頭部痛として出やすい一方、回転性めまい、ろれつ不良、複視、突然の激しい頭痛は医療相談が必要です。", ["カーブ所見だけで頭痛やめまいを説明しない。", "首の負荷を見る前に神経の危険サインを確認する。", "場所、めまいの質、持続時間、誘因を記録する。"]],
    es: ["Guía de síntomas", "¿La cifosis cervical puede causar dolor de cabeza o mareo?", "Dolor de cabeza y mareo no deberían atribuirse automáticamente a la curva. Conviene separar pistas cervicales de problemas vestibulares, migraña, presión arterial y señales neurológicas.", "La cefalea cervicogénica suele ser dolor occipital o temporal unilateral relacionado con postura o movimiento del cuello; vértigo giratorio, habla alterada, visión doble o el peor dolor súbito requieren atención.", ["El informe de curva no explica por sí solo cabeza o mareo.", "Descarta señales neurológicas antes de culpar la postura.", "Registra ubicación, tipo de mareo, duración y desencadenantes."]]
  }),
  topic("morning-hand-numbness-differential", "symptoms", [sources.radiculopathy, sources.carpal, sources.ulnar], {
    zh: ["症状专题", "早上醒来手麻：颈椎、腕管还是尺神经？", "晨起手麻常和夜间手腕、肘部、肩带或颈部姿势有关。关键不是马上贴诊断，而是看哪种姿势最能重复诱发或缓解。", "如果甩手后很快缓解，要考虑腕管或局部神经压力；如果颈部后仰或转头让症状往手指跑，颈椎神经根线索更强。", ["夜间姿势会放大腕管、肘管和颈部线索。", "分布、诱因和缓解方式要一起看。", "伴随无力或白天越来越重时应评估。"]],
    en: ["Symptom guide", "Waking with numb hands: neck, carpal tunnel, or ulnar nerve?", "Morning hand numbness often reflects overnight wrist, elbow, shoulder-girdle, or neck position. The useful question is which posture reliably reproduces or relieves it.", "Fast relief after shaking the hand can fit carpal tunnel or local nerve pressure; symptoms sent into the fingers by neck extension or turning make a cervical root more suspicious.", ["Night posture can amplify carpal tunnel, cubital tunnel, and neck clues.", "Distribution, triggers, and relief pattern matter together.", "Weakness or worsening daytime symptoms deserve assessment."]],
    ja: ["症状特集", "朝起きた時の手のしびれ：首、手根管、尺骨神経？", "朝の手のしびれは、夜間の手首、肘、肩帯、首の姿勢と関係することがあります。どの姿勢で再現または軽減するかが重要です。", "手を振るとすぐ楽になるなら手根管や局所圧迫を考えます。首を反らす、回すことで指へ走るなら頸椎神経根の手がかりが強くなります。", ["夜間姿勢は手根管、肘部管、首の手がかりを強める。", "分布、誘因、軽減方法を一緒に見る。", "筋力低下や日中悪化は評価が必要。"]],
    es: ["Guía de síntomas", "Manos dormidas al despertar: cuello, túnel carpiano o nervio cubital", "El adormecimiento matutino suele relacionarse con posición nocturna de muñeca, codo, cintura escapular o cuello. Lo útil es ver qué postura lo reproduce o alivia.", "Si sacudir la mano alivia rápido, puede encajar con túnel carpiano o presión local; si extensión o giro del cuello manda síntomas a los dedos, sospecha más una raíz cervical.", ["La postura nocturna amplifica pistas de muñeca, codo y cuello.", "Distribución, desencadenantes y alivio se interpretan juntos.", "Debilidad o empeoramiento diurno requiere valoración."]]
  }),
  topic("c5-c8-nerve-root-symptoms", "symptoms", [sources.radiculopathy, sources.ncbiRadiculopathy], {
    zh: ["症状专题", "C5、C6、C7、C8 神经根症状怎么区分？", "颈椎神经根模式能帮助整理线索，但感觉区域会重叠。不要只凭一根手指麻就自行判断节段。", "更可靠的是把疼痛路线、肌力、反射、诱发动作和影像节段放在一起看。C5 更像肩部和上臂，C6/C7/C8 更容易进入前臂和手指。", ["神经根分布是线索，不是诊断。", "C6、C7、C8 最容易和周围神经混淆。", "无力、反射变化和进展速度比单纯麻木更重要。"]],
    en: ["Symptom guide", "C5, C6, C7, and C8 nerve-root symptoms", "Cervical root patterns help organize clues, but sensory territories overlap. A single numb finger should not be used to self-label a spinal level.", "A better pattern combines pain route, strength, reflexes, triggers, and imaging level. C5 is more shoulder and upper arm; C6, C7, and C8 more often reach the forearm and fingers.", ["Root maps are clues, not diagnoses.", "C6, C7, and C8 can be confused with peripheral nerves.", "Weakness, reflex change, and progression matter more than mild numbness alone."]],
    ja: ["症状特集", "C5、C6、C7、C8神経根症状の違い", "神経根パターンは整理に役立ちますが、感覚領域は重なります。一本の指のしびれだけでレベルを決めないでください。", "痛みの走り方、筋力、反射、誘因、画像レベルを合わせて見ます。C5は肩と上腕、C6/C7/C8は前腕や指へ出やすくなります。", ["神経根マップは手がかりで診断ではない。", "C6、C7、C8は末梢神経と紛らわしい。", "軽いしびれ単独より筋力低下、反射変化、進行が重要。"]],
    es: ["Guía de síntomas", "Síntomas de raíces C5, C6, C7 y C8", "Los patrones radiculares ayudan, pero los territorios sensitivos se superponen. Un dedo dormido no basta para autodefinir un nivel.", "Mejor combinar ruta del dolor, fuerza, reflejos, desencadenantes e imagen. C5 suele ser hombro y brazo alto; C6, C7 y C8 llegan más a antebrazo y dedos.", ["Los mapas de raíces son pistas, no diagnósticos.", "C6, C7 y C8 se confunden con nervios periféricos.", "Debilidad, reflejos y progresión importan más que hormigueo leve aislado."]]
  }),
  topic("mri-disc-bulge-stenosis-osteophyte", "diagnosis", [sources.kyphosisReview, sources.radiculopathy], {
    zh: ["影像解读", "MRI 报告里的突出、膨出、椎管狭窄和骨赘是什么意思？", "这些词描述结构变化，不自动等于症状来源。真正要问的是它们是否压迫神经根或脊髓，以及是否和你的症状侧别、节段和体征相符。", "同一个 MRI 可以出现多个退变词，但只有和症状、查体一致的发现才更可能有临床意义。不要把所有影像词都当成必须马上处理的问题。", ["影像词是结构描述，不是治疗指令。", "重点看神经根、脊髓和症状是否对应。", "报告严重程度要和功能变化一起解释。"]],
    en: ["Imaging guide", "MRI report terms: disc bulge, herniation, stenosis, and osteophytes", "These terms describe structure, not automatic symptom sources. The key question is whether they affect a nerve root or the spinal cord and match your side, level, and exam.", "One MRI can list many degenerative findings. Only findings that fit symptoms and physical exam are more likely to matter clinically.", ["Imaging terms are descriptions, not treatment instructions.", "Look for nerve-root, spinal-cord, and symptom agreement.", "Report severity should be interpreted with function."]],
    ja: ["画像の読み方", "MRIの膨隆、ヘルニア、狭窄、骨棘とは？", "これらは構造の説明であり、自動的に症状源を意味しません。神経根や脊髄への影響、症状側、レベル、診察所見との一致が重要です。", "一つのMRIに複数の変性所見が出ることがあります。症状と診察に合う所見ほど臨床的な意味が強くなります。", ["画像用語は説明であり治療指示ではない。", "神経根、脊髄、症状の一致を見る。", "重症度は機能変化と合わせて読む。"]],
    es: ["Guía de imagen", "Informe de MRI: protrusión, hernia, estenosis y osteofitos", "Estos términos describen estructura, no fuentes automáticas de síntomas. La pregunta es si afectan raíz o médula y si coinciden con lado, nivel y exploración.", "Una MRI puede listar muchos hallazgos degenerativos. Importan más los que encajan con síntomas y examen físico.", ["Los términos de imagen describen, no ordenan tratamiento.", "Busca concordancia entre raíz, médula y síntomas.", "La severidad se interpreta con función."]]
  }),
  topic("xray-mri-emg-what-tests-show", "diagnosis", [sources.radiculopathy, sources.neckPainGuideline], {
    zh: ["影像解读", "X 光、MRI、肌电图分别能说明什么？", "X 光更适合看排列和骨性结构，MRI 更适合看椎间盘、神经根和脊髓，肌电/神经传导更适合帮助区分神经根和周围神经。", "检查不是越多越好。合适的检查取决于危险信号、神经体征、持续时间和是否会改变治疗决策。", ["不同检查回答不同问题。", "肌电不能替代 MRI，MRI 也不能替代体格检查。", "检查结果要服务于下一步决策。"]],
    en: ["Imaging guide", "X-ray, MRI, and EMG/NCS: what each test can show", "X-ray is better for alignment and bone structure, MRI for discs, nerve roots, and cord, and EMG/NCS for helping separate root and peripheral nerve problems.", "More tests are not automatically better. The right test depends on red flags, nerve signs, duration, and whether the result would change care.", ["Different tests answer different questions.", "EMG does not replace MRI, and MRI does not replace exam.", "Testing should change the next decision."]],
    ja: ["画像の読み方", "X線、MRI、筋電図は何を示す？", "X線は配列や骨構造、MRIは椎間板、神経根、脊髄、筋電図/神経伝導は神経根と末梢神経の区別に役立ちます。", "検査は多ければよいわけではありません。危険サイン、神経所見、持続期間、治療判断が変わるかで選びます。", ["検査ごとに答える問題が違う。", "筋電図はMRIの代わりではなく、MRIも診察の代わりではない。", "検査は次の判断に役立つ時に意味がある。"]],
    es: ["Guía de imagen", "Radiografía, MRI y EMG/NCS: qué muestra cada prueba", "La radiografía muestra mejor alineación y hueso, la MRI discos, raíces y médula, y EMG/NCS ayuda a separar raíz de nervio periférico.", "Más pruebas no siempre es mejor. Depende de señales de alarma, signos neurológicos, duración y si cambiaría la decisión.", ["Cada prueba responde una pregunta distinta.", "EMG no reemplaza MRI, y MRI no reemplaza exploración.", "La prueba debe ayudar a decidir el siguiente paso."]]
  }),
  topic("when-to-see-doctor-cervical-kyphosis", "diagnosis", [sources.radiculopathy, sources.neckPainGuideline], {
    zh: ["就医指南", "颈椎反弓什么时候该看骨科、神经科或康复科？", "如果只是报告写了曲度变直但症状轻微稳定，通常不需要恐慌。真正决定就医优先级的是神经症状、外伤、发热、肿瘤病史和功能下降。", "康复科/物理治疗适合非急性、稳定、需要运动和负荷管理的人；骨科或神经外科更适合进行性神经缺损、脊髓受压或明显结构问题评估。", ["先按危险信号分流，而不是按报告词恐慌。", "症状稳定时可以从保守康复评估开始。", "进行性无力、脊髓线索或外伤后颈痛要更快就医。"]],
    en: ["Care guide", "When should cervical kyphosis be checked by orthopedics, neurology, or rehab?", "A report mentioning straightening or kyphosis with mild stable symptoms usually does not require panic. Priority comes from nerve symptoms, trauma, fever, cancer history, and functional decline.", "Rehab or physical therapy fits stable non-emergency cases needing movement and load management; orthopedics or neurosurgery is more relevant for progressive deficits, cord compression, or structural concern.", ["Triage by red flags, not fear of report language.", "Stable symptoms can often start with conservative rehab assessment.", "Progressive weakness, cord signs, or post-trauma neck pain needs quicker care."]],
    ja: ["受診ガイド", "頸椎後弯は整形外科、神経内科、リハビリ科のどこへ？", "画像にストレートや後弯と書かれても、軽く安定した症状なら慌てる必要はありません。優先度は神経症状、外傷、発熱、がん既往、機能低下で決まります。", "安定した非緊急例はリハビリや理学療法で負荷管理を相談しやすく、進行性神経障害や脊髄圧迫、構造的懸念では整形外科や脳神経外科が重要です。", ["報告語ではなく危険サインで振り分ける。", "安定症状は保存的リハビリ評価から始めやすい。", "進行性筋力低下、脊髄サイン、外傷後の首痛は早めに相談。"]],
    es: ["Guía de atención", "Cuándo ver ortopedia, neurología o rehabilitación por cifosis cervical", "Un informe con rectificación o cifosis y síntomas leves estables no suele requerir pánico. La prioridad depende de síntomas nerviosos, trauma, fiebre, cáncer y pérdida funcional.", "Rehabilitación o fisioterapia encaja en casos estables no urgentes; ortopedia o neurocirugía importa más con déficits progresivos, compresión medular o preocupación estructural.", ["Clasifica por señales de alarma, no por miedo al informe.", "Síntomas estables pueden empezar con evaluación conservadora.", "Debilidad progresiva, signos medulares o trauma requieren atención más rápida."]]
  }),
  topic("office-neck-curve-ergonomics", "exercises", [sources.neckPainGuideline, sources.lordosisReview], {
    zh: ["练习专题", "低头族和办公室颈椎反弓：怎么调整才实际？", "办公调整的目标不是保持一个完美姿势，而是减少持续时间太长的同一种负荷。屏幕、键盘、休息节奏和上背力量要一起处理。", "如果只提醒自己挺胸收下巴，但工作量、屏幕高度和休息节奏没有变，症状很容易反复。", ["姿势不是越僵越好，变化比固定更重要。", "先减少连续低头和耸肩时间。", "把微休息和上背训练放进日程。"]],
    en: ["Exercise guide", "Desk work and cervical curve changes: practical ergonomics", "The goal is not one perfect posture. It is reducing long exposure to the same load by adjusting screen, keyboard, break rhythm, and upper-back capacity together.", "If you only tell yourself to sit tall and tuck the chin while workload, screen height, and breaks stay unchanged, symptoms often return.", ["Posture should vary; rigid posture is not the goal.", "Reduce uninterrupted looking down and shoulder shrugging.", "Build microbreaks and upper-back work into the day."]],
    ja: ["運動特集", "デスクワークと頸椎カーブ：現実的な調整", "目的は完璧な姿勢ではなく、同じ負荷が長く続くことを減らすことです。画面、キーボード、休憩、上背部の能力を合わせて考えます。", "胸を張る、あごを引くと意識するだけで、仕事量や画面高、休憩が変わらないと症状は戻りやすくなります。", ["硬い姿勢ではなく変化が大切。", "連続した下向き姿勢と肩すくめを減らす。", "小休憩と上背部トレーニングを予定に入れる。"]],
    es: ["Guía de ejercicios", "Trabajo de oficina y curva cervical: ergonomía práctica", "El objetivo no es una postura perfecta, sino reducir exposición prolongada a la misma carga ajustando pantalla, teclado, descansos y capacidad de espalda alta.", "Si solo intentas sentarte recto y meter mentón sin cambiar carga, altura de pantalla ni pausas, los síntomas suelen volver.", ["La postura debe variar; rigidez no es meta.", "Reduce mirar abajo y encoger hombros sin pausa.", "Incluye micropausas y trabajo de espalda alta."]]
  }),
  topic("strength-training-with-cervical-kyphosis", "exercises", [sources.neckPainGuideline, sources.returnSport], {
    zh: ["练习专题", "颈椎曲度变直还能做力量训练吗？", "很多人可以继续力量训练，但需要把颈部症状反应、动作选择和训练量放在第一位。关键不是怕所有重量，而是避免用训练硬顶神经症状。", "划船、下拉、深蹲、硬拉和推举都可能通过耸肩、憋气或头颈代偿加重症状。先降低强度并观察 24 小时反应。", ["不必自动停掉所有力量训练。", "神经症状不稳定时不追 PR。", "用 24 小时反应决定加量或降量。"]],
    en: ["Exercise guide", "Can you strength train with a straightened cervical curve?", "Many people can keep strength training, but symptom response, exercise selection, and volume come first. The point is not to fear all load, but to avoid pushing through nerve symptoms.", "Rows, pulldowns, squats, deadlifts, and pressing can flare symptoms through shrugging, breath-holding, or neck compensation. Start lower and watch the 24-hour response.", ["You do not automatically need to stop all lifting.", "Do not chase PRs when nerve symptoms are unstable.", "Use the 24-hour response to progress or deload."]],
    ja: ["運動特集", "頸椎前弯減少でも筋トレはできますか？", "多くの人は筋トレを続けられますが、症状反応、種目選択、量が優先です。重量を全て恐れるのではなく、神経症状を押して進めないことが重要です。", "ロー、ラットプル、スクワット、デッドリフト、プレスは肩すくめ、息こらえ、首の代償で悪化することがあります。低めから始め24時間反応を見ます。", ["全ての筋トレを自動的に止める必要はない。", "神経症状が不安定な時に最大重量を狙わない。", "24時間反応で進めるか下げるか決める。"]],
    es: ["Guía de ejercicios", "¿Puedes entrenar fuerza con curva cervical rectificada?", "Muchas personas pueden seguir entrenando fuerza, pero mandan respuesta de síntomas, elección de ejercicio y volumen. No se trata de temer toda carga, sino de no empujar síntomas nerviosos.", "Remos, jalones, sentadillas, peso muerto y press pueden irritar por encoger hombros, aguantar aire o compensar con cuello. Empieza más bajo y mira 24 horas.", ["No necesitas parar toda fuerza automáticamente.", "No busques PR con síntomas nerviosos inestables.", "Usa respuesta de 24 horas para progresar o descargar."]]
  }),
  topic("pillow-height-sleep-position", "exercises", [sources.neckPainGuideline], {
    zh: ["睡眠专题", "颈椎反弓枕头怎么选？高度、睡姿和误区", "枕头的目标是让睡眠更稳定，不是把骨头顶回去。合适高度取决于睡姿、肩宽、床垫和症状反应。", "如果换枕后手麻更多、夜里更痛或早晨僵硬明显增加，说明这个方案不适合当前状态。", ["枕头不能承诺恢复曲度。", "侧睡通常要考虑肩宽，仰睡要避免过高屈颈。", "用睡眠质量和晨起症状判断，而不是广告词。"]],
    en: ["Sleep guide", "Pillow height and sleep position for cervical kyphosis or straight neck", "The goal of a pillow is better sleep, not pushing bones back. The right height depends on sleep position, shoulder width, mattress, and symptom response.", "If a new pillow increases hand numbness, night pain, or morning stiffness, it does not fit your current state.", ["A pillow should not promise curve restoration.", "Side sleeping depends on shoulder width; back sleeping should avoid excessive flexion.", "Judge by sleep quality and morning symptoms, not marketing claims."]],
    ja: ["睡眠特集", "頸椎後弯の枕選び：高さ、寝姿勢、誤解", "枕の目的は睡眠を安定させることで、骨を押し戻すことではありません。高さは寝姿勢、肩幅、マットレス、症状反応で変わります。", "新しい枕で手のしびれ、夜間痛、朝のこわばりが増えるなら、今の状態に合っていません。", ["枕はカーブ回復を約束できない。", "横向きは肩幅、仰向けは過度な屈曲を考える。", "広告文句ではなく睡眠と朝の症状で判断する。"]],
    es: ["Guía de sueño", "Altura de almohada y postura para cifosis o cuello rectificado", "El objetivo de una almohada es dormir mejor, no empujar huesos. La altura depende de postura, ancho de hombros, colchón y respuesta de síntomas.", "Si una almohada aumenta manos dormidas, dolor nocturno o rigidez matutina, no encaja con tu estado actual.", ["Una almohada no debe prometer restaurar la curva.", "Dormir de lado depende de hombros; boca arriba evita flexión excesiva.", "Juzga por sueño y síntomas matutinos, no por marketing."]]
  }),
  topic("cervical-traction-contraindications", "treatments", [sources.radiculopathy, sources.neckPainGuideline], {
    zh: ["治疗边界", "颈椎牵引适合谁？禁忌和风险怎么判断", "牵引可能短期减轻某些神经根症状，但不适合所有人，也不应作为自我硬拉。剂量、角度、症状反应和禁忌都很重要。", "有脊髓症状、骨折/不稳定、严重骨质疏松、感染、肿瘤、血管问题或牵引后症状加重时，不应自行继续。", ["牵引是减压尝试，不是保证复位。", "神经症状加重就是停下来的理由。", "高风险情况需要专业评估。"]],
    en: ["Treatment boundaries", "Cervical traction: who may fit, contraindications, and risks", "Traction may give short-term relief for some nerve-root symptoms, but it is not for everyone and should not be treated as forceful self-pulling. Dose, angle, response, and contraindications matter.", "Cord symptoms, fracture or instability, severe osteoporosis, infection, tumor, vascular concerns, or worsening symptoms after traction are reasons not to continue on your own.", ["Traction is a decompression trial, not guaranteed realignment.", "Worsening nerve symptoms are a stop sign.", "Higher-risk cases need professional assessment."]],
    ja: ["治療の境界", "頸椎牽引：合う人、禁忌、リスク", "牽引は一部の神経根症状を短期的に楽にする可能性がありますが、全員向けではなく強く引く自己処置ではありません。量、角度、反応、禁忌が重要です。", "脊髄症状、骨折や不安定性、重い骨粗しょう症、感染、腫瘍、血管問題、牽引後の悪化がある場合は自己判断で続けません。", ["牽引は減圧の試みで、整復保証ではない。", "神経症状の悪化は中止サイン。", "高リスク例は専門評価が必要。"]],
    es: ["Límites de tratamiento", "Tracción cervical: para quién, contraindicaciones y riesgos", "La tracción puede aliviar a corto plazo algunos síntomas radiculares, pero no es para todos ni debe ser autoestiramiento fuerte. Importan dosis, ángulo, respuesta y contraindicaciones.", "Síntomas medulares, fractura o inestabilidad, osteoporosis severa, infección, tumor, problemas vasculares o empeoramiento tras tracción son razones para no seguir solo.", ["La tracción prueba descompresión, no realineación garantizada.", "Empeorar síntomas nerviosos es señal de parar.", "Casos de mayor riesgo requieren evaluación profesional."]]
  }),
  topic("massage-manipulation-safety", "treatments", [sources.neckPainGuideline, sources.radiculopathy], {
    zh: ["治疗边界", "按摩、推拿、正骨后舒服，是否代表颈椎变好了？", "短期舒服可以来自肌肉张力下降、疼痛调制或放松，但不证明结构已经改变。颈部高速手法尤其需要谨慎看待风险和适应证。", "如果手麻、无力、眩晕、头痛或走路问题在手法后出现或加重，应停止继续尝试并就医。", ["舒服不等于曲度被纠正。", "颈部高速手法不适合所有人。", "神经或血管样症状出现后不要反复试。"]],
    en: ["Treatment boundaries", "Massage and manipulation: does feeling better mean the neck changed?", "Short-term relief may come from lower muscle tone, pain modulation, or relaxation, but it does not prove structural change. High-velocity neck manipulation deserves careful risk screening.", "If numbness, weakness, dizziness, headache, or walking problems appear or worsen after manual treatment, stop repeating it and seek care.", ["Feeling better does not prove the curve was corrected.", "High-velocity neck techniques are not for everyone.", "Do not keep testing when nerve or vascular-like symptoms appear."]],
    ja: ["治療の境界", "マッサージや手技で楽なら首は変わった？", "短期的な楽さは筋緊張低下、痛みの調整、リラックスで起こり得ますが、構造変化の証明ではありません。頸部の高速手技はリスク確認が必要です。", "手技後にしびれ、筋力低下、めまい、頭痛、歩行問題が出るまたは悪化する場合は繰り返さず医療相談をしてください。", ["楽さはカーブ矯正の証明ではない。", "頸部高速手技は全員向けではない。", "神経や血管を疑う症状が出たら繰り返さない。"]],
    es: ["Límites de tratamiento", "Masaje y manipulación: ¿sentirse mejor significa que el cuello cambió?", "El alivio corto puede venir de menor tono muscular, modulación del dolor o relajación, pero no prueba cambio estructural. La manipulación cervical de alta velocidad exige cribado de riesgo.", "Si entumecimiento, debilidad, mareo, dolor de cabeza o problemas al caminar aparecen o empeoran después, no lo repitas y busca atención.", ["Sentirse mejor no prueba corrección de curva.", "Técnicas cervicales rápidas no son para todos.", "No sigas probando si aparecen síntomas nerviosos o vasculares."]]
  }),
  topic("surfing-neck-pain-paddling", "sports", [sources.surferMyelopathy, sources.neckPainGuideline], {
    zh: ["冲浪专题", "冲浪划水为什么容易让颈椎不舒服？", "趴板划水要求胸椎伸展、肩部反复用力和头颈抬起。胸椎不够伸展或肩部疲劳时，颈椎更容易代偿。", "多数慢性颈痛不是罕见严重问题，但新手长时间过度伸展后出现下肢症状、麻木或无力，需要立刻停止并就医。", ["划水是持续伸展加肩部负荷。", "先练陆地耐受，再增加下水时间。", "出现神经症状不要用更多划水测试。"]],
    en: ["Surf guide", "Why surf paddling can irritate the neck", "Prone paddling asks for thoracic extension, repeated shoulder work, and a raised head. If thoracic extension or shoulder endurance is limited, the neck often compensates.", "Most chronic neck pain is not the rare severe condition described in novice surfers, but leg symptoms, numbness, or weakness after prolonged hyperextension needs urgent care.", ["Paddling is sustained extension plus shoulder load.", "Build land tolerance before increasing water time.", "Do not test nerve symptoms with more paddling."]],
    ja: ["サーフィン特集", "パドリングで首がつらくなる理由", "腹ばいパドリングは胸椎伸展、肩の反復作業、頭を上げる姿勢を求めます。胸椎や肩の耐性が低いと首が代償しやすくなります。", "慢性首痛の多くはまれな重症例ではありませんが、長い過伸展後の下肢症状、しびれ、筋力低下はすぐ中止して受診します。", ["パドリングは持続伸展と肩負荷。", "水上時間を増やす前に陸上耐性を作る。", "神経症状をさらにパドリングで試さない。"]],
    es: ["Guía de surf", "Por qué remar en surf puede irritar el cuello", "Remar boca abajo exige extensión torácica, trabajo repetido de hombros y cabeza elevada. Si falta extensión torácica o resistencia de hombro, el cuello compensa.", "La mayoría del dolor crónico no es la rara lesión grave descrita en principiantes, pero síntomas en piernas, entumecimiento o debilidad tras hiperextensión requieren atención.", ["Remar combina extensión sostenida y carga de hombro.", "Crea tolerancia en tierra antes de aumentar agua.", "No pruebes síntomas nerviosos remando más."]]
  }),
  topic("ski-snowboard-neck-pain-after-fall", "sports", [sources.winterSport, sources.returnSport], {
    zh: ["雪上运动", "滑雪/单板摔倒后颈痛：什么时候不能继续滑？", "雪上运动的重点风险是速度、摔倒、旋转和碰撞，而不只是姿势。摔倒后有头颈外伤、手麻、无力、头晕或意识问题，不应继续当天运动。", "轻微酸痛也要看活动范围、头痛、恶心、神经症状和第二天反应。用雪场继续测试颈椎不是好策略。", ["外伤后神经症状优先处理。", "高速摔倒和碰撞后不要靠意志继续。", "回归雪场要看活动、力量、平衡和症状稳定。"]],
    en: ["Snow sports", "Neck pain after a ski or snowboard fall: when to stop", "The main snow-sport risk is speed, falls, rotation, and collision, not posture alone. Neck trauma with hand numbness, weakness, dizziness, or altered awareness is not a ski-through situation.", "Even mild soreness should be judged with motion, headache, nausea, nerve symptoms, and next-day response. The mountain is not the right place to stress-test the neck.", ["Nerve symptoms after trauma take priority.", "Do not push through high-speed falls or collisions.", "Return requires stable motion, strength, balance, and symptoms."]],
    ja: ["雪上スポーツ", "スキー/スノーボード転倒後の首痛：続けてよい？", "雪上スポーツの主なリスクは速度、転倒、回旋、衝突で、姿勢だけではありません。頭頸部外傷後の手のしびれ、筋力低下、めまい、意識変化では続けません。", "軽い痛みでも可動域、頭痛、吐き気、神経症状、翌日の反応を見ます。雪山で首を試すのは安全な方法ではありません。", ["外傷後の神経症状を優先する。", "高速転倒や衝突後に無理をしない。", "復帰は可動域、筋力、バランス、症状安定で判断。"]],
    es: ["Deportes de nieve", "Dolor de cuello tras caída esquiando o en snowboard: cuándo parar", "El riesgo principal es velocidad, caída, rotación y choque, no solo postura. Trauma de cuello con manos dormidas, debilidad, mareo o conciencia alterada no se esquía encima.", "Incluso dolor leve se mira con movimiento, dolor de cabeza, náusea, síntomas nerviosos y respuesta al día siguiente. La montaña no es el lugar para probar el cuello.", ["Síntomas nerviosos tras trauma son prioridad.", "No sigas tras caídas rápidas o choques.", "Volver requiere movimiento, fuerza, equilibrio y síntomas estables."]]
  }),
  topic("climbing-belay-neck-pain", "sports", [sources.neckPainGuideline, sources.returnSport], {
    zh: ["攀岩专题", "攀岩保护者颈痛：不是只有攀爬才算负荷", "很多攀岩者攀爬时还好，保护时更容易颈痛，因为长时间仰头观察会让颈椎持续伸展。保护量也应该像训练量一样记录。", "保护眼镜、换保、站位和肩胛力量训练可以降低颈部暴露，但不能牺牲安全观察。", ["保护姿势本身就是颈椎负荷。", "把攀爬量和保护量分开记录。", "减轻仰头时不能降低保护安全。"]],
    en: ["Climbing guide", "Belayer neck pain: belaying is load too", "Many climbers tolerate climbing but flare while belaying because prolonged upward gaze keeps the cervical spine extended. Belay volume should be tracked like training volume.", "Belay glasses, partner swaps, stance changes, and scapular strength can reduce exposure, but never at the cost of safe monitoring.", ["Belay posture is cervical load.", "Track climbing volume and belay volume separately.", "Reduce upward gaze without reducing belay safety."]],
    ja: ["クライミング特集", "ビレイヤーの首痛：ビレイも負荷です", "登る時は大丈夫でも、ビレイ中に悪化する人がいます。長い上向き視線で頸椎が伸展位に保たれるためです。ビレイ量もトレーニング量として記録します。", "ビレイグラス、交代、立ち位置、肩甲骨トレーニングは暴露を減らしますが、安全確認を犠牲にしてはいけません。", ["ビレイ姿勢も頸椎負荷。", "登る量とビレイ量を分けて記録する。", "上向きを減らしても安全確認は減らさない。"]],
    es: ["Guía de escalada", "Dolor de cuello del asegurador: asegurar también carga", "Muchos escaladores toleran escalar pero se irritan asegurando porque mirar arriba mantiene extensión cervical. El volumen de asegurar también debe registrarse.", "Gafas de aseguramiento, cambios de compañero, posición y fuerza escapular reducen exposición, pero nunca a costa de vigilancia segura.", ["La postura de asegurar es carga cervical.", "Registra volumen de escalar y de asegurar por separado.", "Reduce mirada arriba sin reducir seguridad."]]
  })
];

const trafficSprintArticles = [
  topic("is-loss-of-cervical-lordosis-serious", "diagnosis", [sources.lordosisReview, sources.neckPainGuideline, sources.spineBasics], {
    zh: ["影像解释", "颈椎生理曲度变直严重吗？", "把 loss of cervical lordosis 当作影像描述来读，而不是直接当成严重诊断。真正改变优先级的是外伤、神经症状、功能下降和体格检查。", "曲度变直可以和疼痛保护、姿势、拍片体位或退变相关；是否严重取决于症状是否进展、有没有无力麻木扩散、手变笨或走路变化。", ["报告词本身不是严重程度。", "红旗症状比曲度形状更重要。", "先记录症状和功能，再谈曲度。"]],
    en: ["Imaging explainer", "Is loss of cervical lordosis serious?", "How to read loss of normal cervical lordosis without panic: when it is an imaging description, when symptoms matter, and what to track next.", "Loss of lordosis can be a posture, guarding, positioning, or degenerative finding. The priority changes when trauma, progressive neurological symptoms, cord signs, or function loss are present.", ["Report wording alone is not a severity score.", "Red flags outrank curve shape.", "Track symptoms and function before chasing curve correction."]],
    ja: ["画像解説", "頸椎前弯消失は重い状態？", "前弯消失という画像表現を、すぐ重症診断として読まないための整理です。外傷、神経症状、機能低下、診察所見が優先度を変えます。", "前弯消失は姿勢、防御性筋緊張、撮影姿勢、加齢変化と関連することがあります。進行するしびれや筋力低下、手の不器用さ、歩行変化が重要です。", ["報告語だけでは重症度は決まらない。", "危険サインはカーブ形状より優先。", "カーブ修正より症状と機能を記録する。"]],
    es: ["Explicador de imagen", "¿La pérdida de lordosis cervical es grave?", "Cómo leer pérdida de lordosis cervical normal sin pánico: cuándo es una descripción de imagen, cuándo importan síntomas y qué seguir.", "Puede relacionarse con postura, protección por dolor, posición de la radiografía o cambios degenerativos. La prioridad cambia con trauma, síntomas neurológicos progresivos, signos medulares o pérdida funcional.", ["La frase del informe no es una escala de gravedad.", "Las alarmas pesan más que la forma de la curva.", "Registra síntomas y función antes de perseguir la curva."]]
  }, {
    zh: [
      ["什么时候通常不算紧急", ["单独一句 loss of normal cervical lordosis、颈椎曲度变直或 straight neck，通常只是描述这张片子上的排列。它不能单独证明疼痛来源、永久损伤或必须立刻做强刺激治疗。", { html: `如果主要问题是曲度形状本身，先看 <a href="${localizedPath("zh", "images/cervical-curve-diagram")}">颈椎曲度图解</a> 和 <a href="${localizedPath("zh", "cervical-curve")}">颈椎曲度指南</a>，再把报告词和症状放在一起读。` }]],
      ["什么时候需要更快评估", ["当报告词伴随外伤、进行性手臂痛、麻木扩散、真实无力、手变笨、走路不稳、大小便异常、发热、肿瘤病史或疼痛持续加重时，优先级会改变。", { html: `这些情况更适合参考 <a href="${articlePath("zh", "cervical-radiculopathy-myelopathy-red-flags")}">神经根病和脊髓受压红旗指南</a>，而不是继续加码网上姿势练习。` }]],
      ["下一步怎么做", ["记录能观察到的内容：疼痛位置、手臂或手指症状、睡眠、工作耐受、运动后反应、握力、平衡，以及 24 小时内症状是变稳还是累积。这个模式比反复盯着报告词更能指导下一步。"]]
    ],
    en: [
      ["When it is usually less urgent", ["A single report phrase such as loss of normal cervical lordosis, straightened cervical curve, or straight neck often describes alignment on that image. It does not prove the pain source, permanent damage, or the need for aggressive treatment.", { html: `If your main question is the shape itself, compare it with the <a href="${localizedPath("en", "images/cervical-curve-diagram")}">normal cervical curve diagram</a> and the broader <a href="${localizedPath("en", "cervical-curve")}">cervical curve guide</a>.` }]],
      ["When it deserves faster assessment", ["The report becomes more important when it travels with trauma, progressive arm pain, spreading numbness, real weakness, hand clumsiness, walking changes, bowel or bladder symptoms, fever, cancer history, or pain that is worsening instead of settling.", { html: `Those patterns belong with the <a href="${articlePath("en", "cervical-radiculopathy-myelopathy-red-flags")}">radiculopathy and myelopathy red flag guide</a>, not with more online posture drills.` }]],
      ["What to do next", ["Track what you can actually observe: pain location, arm or finger symptoms, sleep, work tolerance, exercise response, grip, balance, and whether symptoms calm or accumulate over 24 hours. That pattern is more actionable than repeating the phrase from the report."]]
    ],
    ja: [
      ["急ぎではないことが多い場合", ["loss of normal cervical lordosis、ストレートネック、前弯減少という一文だけなら、その画像での配列を表していることが多いです。それだけで痛みの原因、永久的な損傷、強い治療の必要性は決まりません。", { html: `形そのものが不安なら、まず <a href="${localizedPath("ja", "images/cervical-curve-diagram")}">頸椎カーブ図</a> と <a href="${localizedPath("ja", "cervical-curve")}">頸椎カーブガイド</a> で症状と一緒に確認します。` }]],
      ["早めの評価が必要な場合", ["外傷、進行する腕痛、しびれの拡大、明らかな筋力低下、手の不器用さ、歩行変化、排尿排便異常、発熱、がんの既往、悪化し続ける痛みがある時は優先度が変わります。", { html: `そのようなパターンは、姿勢運動を増やすより <a href="${articlePath("ja", "cervical-radiculopathy-myelopathy-red-flags")}">神経根症・脊髄症の危険サイン</a> として扱います。` }]],
      ["次に記録すること", ["痛みの場所、腕や指の症状、睡眠、仕事耐性、運動反応、握力、バランス、24時間で落ち着くか蓄積するかを記録します。報告語を繰り返すより、次の判断に役立ちます。"]]
    ],
    es: [
      ["Cuándo suele ser menos urgente", ["Una frase aislada como pérdida de lordosis cervical normal, cuello rectificado o straight neck suele describir la alineación en esa imagen. No prueba por sí sola la fuente del dolor, daño permanente ni necesidad de tratamiento agresivo.", { html: `Si la duda principal es la forma, compárala con el <a href="${localizedPath("es", "images/cervical-curve-diagram")}">diagrama de curva cervical</a> y la <a href="${localizedPath("es", "cervical-curve")}">guía de curva cervical</a>.` }]],
      ["Cuándo merece evaluación más rápida", ["La prioridad cambia si aparece con trauma, dolor de brazo progresivo, entumecimiento que se extiende, debilidad real, torpeza de mano, cambios al caminar, síntomas urinarios o intestinales, fiebre, antecedente de cáncer o dolor que sigue empeorando.", { html: `Esos patrones encajan mejor con la <a href="${articlePath("es", "cervical-radiculopathy-myelopathy-red-flags")}">guía de alarmas de radiculopatía y mielopatía</a> que con más ejercicios posturales en línea.` }]],
      ["Qué hacer después", ["Registra lo observable: ubicación del dolor, síntomas de brazo o dedos, sueño, tolerancia al trabajo, respuesta al ejercicio, agarre, equilibrio y si los síntomas se calman o se acumulan en 24 horas. Ese patrón orienta más que repetir la frase del informe."]]
    ]
  }),
  topic("mild-cervical-kyphosis-symptoms", "diagnosis", [sources.clevelandKyphosis, sources.kyphosisReview, sources.neckPainGuideline], {
    zh: ["影像解释", "轻度颈椎反弓会有什么症状？", "轻度 cervical kyphosis 报告词不等于症状一定轻，也不等于一定严重。需要把局部颈痛、手臂症状、红旗和 24 小时反应分开看。", "局部僵硬、疲劳、头痛和姿势敏感可以出现；手麻、无力、手变笨、走路问题或外伤后加重会改变处理优先级。", ["轻度影像不自动等于轻度症状。", "手臂和手指症状要单独筛查。", "下一步看进展和功能，而不是只看曲度词。"]],
    en: ["Imaging explainer", "Mild cervical kyphosis symptoms: what to watch", "A conservative guide to mild cervical kyphosis symptoms, from local neck stiffness to arm pain, finger numbness, weakness, and red flags.", "Mild wording on a report does not always mean mild symptoms, and serious-sounding wording does not automatically mean an emergency. Symptom behavior decides the next step.", ["Mild imaging does not automatically mean mild symptoms.", "Arm and finger symptoms need their own screen.", "Progression and function matter more than the curve word alone."]],
    ja: ["画像解説", "軽度頸椎後弯の症状：何を見る？", "軽度頸椎後弯の症状を、局所のこわばり、腕痛、指のしびれ、筋力低下、危険サインに分けて整理します。", "軽度という報告語は症状も軽いという意味ではありません。逆に強い言葉だけで緊急とは限りません。症状の変化が次の判断を決めます。", ["軽度画像=軽度症状とは限らない。", "腕や指の症状は別に確認する。", "曲度語より進行と機能を見る。"]],
    es: ["Explicador de imagen", "Síntomas de cifosis cervical leve: qué vigilar", "Guía conservadora sobre síntomas de cifosis cervical leve: rigidez local, dolor de brazo, dedos dormidos, debilidad y alarmas.", "La palabra leve en un informe no siempre significa síntomas leves, y una frase seria no siempre significa urgencia. El comportamiento de los síntomas guía el siguiente paso.", ["Imagen leve no siempre significa síntomas leves.", "Síntomas de brazo y dedos necesitan cribado propio.", "Progresión y función importan más que la frase de curva."]]
  }, {
    zh: [
      ["局部症状怎么读", ["局部颈部僵硬、上背疲劳、头痛和姿势敏感，可以出现在很多非急性的颈痛模式里。真正有用的问题是：症状是在稳定、改善，还是在日常负荷下逐渐累积。"]],
      ["手臂或手指症状要单独看", [{ html: `放射性手臂痛、刺麻、麻木、无力、握力变化或手指症状，应结合 <a href="${localizedPath("zh", "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 手指麻木地图</a> 和 <a href="${articlePath("zh", "cervical-radiculopathy-myelopathy-red-flags")}">红旗指南</a> 整理。曲度可能相关，但神经模式更决定优先级。` }]],
      ["什么时候先降量", ["当症状扩散、力量下降、步态变化，或睡眠一晚比一晚差时，不要继续叠加拉伸或牵引。这和处理稳定的局部僵硬是完全不同的决策。"]]
    ],
    en: [
      ["Local symptoms", ["Local neck stiffness, upper-back fatigue, headache, and position sensitivity can fit many non-emergency neck pain patterns. The useful question is whether symptoms are stable, improving, or accumulating with normal daily load."]],
      ["Arm or finger symptoms", [{ html: `Radiating arm pain, tingling, numbness, weakness, grip change, or finger symptoms should be organized with the <a href="${localizedPath("en", "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 finger numbness map</a> and the <a href="${articlePath("en", "cervical-radiculopathy-myelopathy-red-flags")}">red flag guide</a>. The curve may be relevant, but the neurological pattern decides urgency.` }]],
      ["When to slow down", ["Do not keep adding stretches or traction when symptoms spread, strength drops, gait changes, or sleep is worsening night after night. That is a different decision than managing stable local stiffness."]]
    ],
    ja: [
      ["局所症状の読み方", ["首のこわばり、上背部の疲れ、頭痛、姿勢で変わる痛みは、緊急ではない首痛パターンにも見られます。大切なのは、症状が安定しているか、改善しているか、日常負荷で蓄積しているかです。"]],
      ["腕や指の症状は別に確認する", [{ html: `腕へ走る痛み、しびれ、感覚変化、筋力低下、握力変化、指の症状は <a href="${localizedPath("ja", "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 指のしびれマップ</a> と <a href="${articlePath("ja", "cervical-radiculopathy-myelopathy-red-flags")}">危険サインガイド</a> で整理します。カーブより神経パターンが優先度を決めます。` }]],
      ["量を下げる時", ["症状が広がる、筋力が落ちる、歩き方が変わる、睡眠が連日悪化する時は、ストレッチや牽引を増やしません。安定した局所のこわばりとは別の判断です。"]]
    ],
    es: [
      ["Síntomas locales", ["Rigidez local del cuello, fatiga de espalda alta, dolor de cabeza y sensibilidad a la postura pueden encajar con muchos patrones no urgentes. La pregunta útil es si los síntomas están estables, mejoran o se acumulan con la carga diaria."]],
      ["Síntomas de brazo o dedos", [{ html: `Dolor irradiado, hormigueo, entumecimiento, debilidad, cambio de agarre o síntomas de dedos se organizan mejor con el <a href="${localizedPath("es", "images/c6-c7-c8-finger-numbness-map")}">mapa C6 C7 C8</a> y la <a href="${articlePath("es", "cervical-radiculopathy-myelopathy-red-flags")}">guía de alarmas</a>. La curva puede importar, pero el patrón neurológico decide urgencia.` }]],
      ["Cuándo bajar la carga", ["No sigas añadiendo estiramientos o tracción si los síntomas se extienden, baja la fuerza, cambia la marcha o el sueño empeora noche tras noche. No es la misma decisión que manejar rigidez local estable."]]
    ]
  }),
  topic("can-cervical-kyphosis-cause-hand-numbness", "symptoms", [sources.radiculopathy, sources.ncbiRadiculopathy, sources.neckPainGuideline, sources.carpal], {
    zh: ["症状专题", "颈椎反弓会导致手麻吗？", "手麻可能和颈神经根、椎间孔狭窄、椎间盘问题、腕管或尺神经有关。单靠颈椎反弓这个词，不能证明手麻来源。", "更可靠的线索是麻木区域、颈部动作是否诱发、咳嗽喷嚏是否加重、腕肘姿势、握力和症状是否进展。", ["曲度词不能单独解释手麻。", "颈源性和周围神经问题会重叠。", "无力或麻木扩散需要更快评估。"]],
    en: ["Symptom guide", "Can cervical kyphosis cause hand numbness?", "Cervical kyphosis can coexist with nerve-root irritation, foraminal narrowing, disc findings, carpal tunnel, or ulnar nerve irritation, but the curve word alone does not prove the source of numbness.", "The useful clues are the numb area, neck-position triggers, cough or sneeze response, wrist and elbow position, grip change, and whether symptoms are progressing.", ["Curve wording alone cannot explain hand numbness.", "Neck and peripheral nerve patterns can overlap.", "Weakness or spreading numbness deserves faster assessment."]],
    ja: ["症状ガイド", "頸椎後弯で手がしびれる？", "頸椎後弯は神経根刺激、椎間孔狭窄、椎間板所見、手根管、尺骨神経刺激と同時に見られることがありますが、カーブ語だけで原因は証明できません。", "しびれる場所、首の動き、咳やくしゃみ、手首や肘の姿勢、握力、進行の有無を合わせて見ます。", ["カーブ語だけで手のしびれは説明できない。", "首と末梢神経のパターンは重なる。", "筋力低下やしびれ拡大は早めに評価。"]],
    es: ["Guía de síntomas", "¿La cifosis cervical puede causar manos dormidas?", "Puede coexistir con irritación de raíz nerviosa, estrechamiento foraminal, hallazgos discales, túnel carpiano o nervio cubital, pero la palabra de curva no prueba la fuente.", "Las pistas útiles son zona dormida, desencadenantes con el cuello, tos o estornudo, posición de muñeca/codo, agarre y progresión.", ["La curva sola no explica la mano dormida.", "Cuello y nervios periféricos se pueden superponer.", "Debilidad o entumecimiento que se extiende requiere evaluación."]]
  }, {
    zh: [
      ["颈椎什么时候可能参与", ["如果手麻和颈部姿势相关，从颈部或肩胛区往手臂走，咳嗽或喷嚏会加重，或伴随相应无力、反射变化，就更需要考虑颈部神经根参与。"]],
      ["为什么曲度本身不够", ["反弓或变直可以出现在影像上，但并不能证明某根神经被压迫。更可靠的判断需要症状、体格检查、影像和时间变化指向同一方向。"]],
      ["先画分布，再筛风险", [{ html: `先用 <a href="${localizedPath("zh", "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 手指麻木地图</a> 整理区域；如果有无力、手变笨、走路变化或麻木扩散，再看 <a href="${articlePath("zh", "cervical-radiculopathy-myelopathy-red-flags")}">红旗指南</a>。` }]]
    ],
    en: [
      ["How the neck can be involved", ["Hand numbness becomes more suspicious for a neck contribution when it is linked to neck position, travels from the neck or shoulder blade into the arm, worsens with coughing or sneezing, or appears with matching weakness or reflex change."]],
      ["Why the curve is not enough", ["A reversed or straightened curve can appear on an image without proving that a nerve is compressed. The diagnosis depends on whether symptoms, exam, imaging, and timing point in the same direction."]],
      ["Map the pattern, then screen risk", [{ html: `Use the <a href="${localizedPath("en", "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 finger numbness map</a> to organize the distribution, then use the <a href="${articlePath("en", "cervical-radiculopathy-myelopathy-red-flags")}">red flag guide</a> if there is weakness, hand clumsiness, walking change, or spreading numbness.` }]]
    ],
    ja: [
      ["首が関わる可能性", ["手のしびれが首の姿勢で変わる、首や肩甲部から腕へ走る、咳やくしゃみで悪化する、対応する筋力低下や反射変化を伴う場合は、頸椎神経根の関与を考えます。"]],
      ["カーブだけでは不十分", ["逆カーブやストレート化が画像にあっても、それだけで神経圧迫は証明できません。症状、診察、画像、経過が同じ方向を示すかが重要です。"]],
      ["分布を整理し、リスクを確認", [{ html: `<a href="${localizedPath("ja", "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 指のしびれマップ</a> で分布を整理し、筋力低下、手の不器用さ、歩行変化、しびれ拡大があれば <a href="${articlePath("ja", "cervical-radiculopathy-myelopathy-red-flags")}">危険サインガイド</a> を確認します。` }]]
    ],
    es: [
      ["Cómo puede participar el cuello", ["La mano dormida sugiere más participación cervical si cambia con la posición del cuello, viaja desde cuello o escápula al brazo, empeora con tos o estornudo, o aparece con debilidad o reflejos concordantes."]],
      ["Por qué la curva no basta", ["Una curva invertida o rectificada puede verse en imagen sin probar que un nervio esté comprimido. El diagnóstico depende de que síntomas, exploración, imagen y tiempo apunten en la misma dirección."]],
      ["Mapa primero, riesgo después", [{ html: `Usa el <a href="${localizedPath("es", "images/c6-c7-c8-finger-numbness-map")}">mapa C6 C7 C8</a> para ordenar la distribución; si hay debilidad, torpeza de mano, cambios al caminar o entumecimiento que se extiende, revisa la <a href="${articlePath("es", "cervical-radiculopathy-myelopathy-red-flags")}">guía de alarmas</a>.` }]]
    ]
  }),
  topic("normal-cervical-lordosis-vs-straight-neck", "diagnosis", [sources.spineBasics, sources.curvesOfSpine, sources.lordosisReview], {
    zh: ["影像解释", "正常颈椎前凸 vs 颈椎变直：报告怎么读", "区分 normal cervical lordosis、straight neck、loss of lordosis 和 reversed curve，避免只凭一个词判断好坏。", "正常颈曲通常是侧面温和前凸；变直或反向需要结合体位、疼痛保护、症状、神经体征和功能变化。", ["正常曲度是整体脊柱曲线的一部分。", "变直不等于自动严重。", "反向曲度也要和症状一起读。"]],
    en: ["Imaging explainer", "Normal cervical lordosis vs straight neck: how to read the wording", "A plain-language comparison of normal cervical lordosis, straight neck, loss of lordosis, and reversed cervical curve.", "Normal cervical lordosis is usually a gentle forward curve from the side. Straightening or reversal should be interpreted with position, pain guarding, symptoms, neurological signs, and function.", ["Normal lordosis is part of the spine's overall curves.", "Straight neck is not automatically severe.", "A reversed curve still needs symptom context."]],
    ja: ["画像解説", "正常頸椎前弯 vs ストレートネック：用語の読み方", "正常頸椎前弯、ストレートネック、前弯消失、逆カーブをやさしく比較します。", "正常前弯は側面から見るゆるやかな前向きカーブです。直線化や逆カーブは姿勢、疼痛防御、症状、神経所見、機能と合わせて読みます。", ["正常前弯は脊柱全体のカーブの一部。", "ストレートネックは自動的に重症ではない。", "逆カーブも症状文脈が必要。"]],
    es: ["Explicador de imagen", "Lordosis cervical normal vs cuello recto: cómo leerlo", "Comparación sencilla de lordosis cervical normal, cuello recto, pérdida de lordosis y curva cervical invertida.", "La lordosis normal suele ser una curva suave hacia delante vista de lado. La rectificación o inversión se interpreta con posición, protección por dolor, síntomas, signos neurológicos y función.", ["La lordosis normal forma parte de las curvas de la columna.", "Cuello recto no es automáticamente grave.", "Una curva invertida también necesita contexto."]]
  }, {
    zh: [
      ["四个常见报告词", ["Normal cervical lordosis 表示这张影像上颈部有通常的温和前凸。Straight neck 和 loss of lordosis 多数表示前凸减少或变平；reversed cervical curve 表示部分曲线方向相反。"]],
      ["为什么不同报告说法会变", ["拍片体位、测量方式、肌肉保护、疼痛、年龄和退变都可能影响报告措辞。所以同一个人不同时间或机构的报告，可能出现不同语言。"]],
      ["配合图解一起读", [{ html: `想快速对照，可以看 <a href="${localizedPath("zh", "images/cervical-curve-diagram")}">颈椎曲度图解</a>。如果需要完整判断路径，再读 <a href="${localizedPath("zh", "cervical-curve")}">颈椎曲度指南</a>。` }]]
    ],
    en: [
      ["The four common phrases", ["Normal cervical lordosis means the neck has the usual gentle forward curve on that image. Straight neck and loss of lordosis usually mean the curve appears reduced or flattened. Reversed cervical curve means part of the curve bends the other way."]],
      ["Why wording varies", ["Different imaging positions, measurement methods, muscle guarding, pain, age, and degenerative changes can all change the wording. This is why the same person can see different language across reports."]],
      ["Use the visual comparison", [{ html: `For a quick side-by-side view, use the <a href="${localizedPath("en", "images/cervical-curve-diagram")}">normal cervical curve diagram</a>. For the broader decision path, read the <a href="${localizedPath("en", "cervical-curve")}">cervical curve guide</a>.` }]]
    ],
    ja: [
      ["よくある4つの表現", ["Normal cervical lordosis は、その画像で通常のゆるやかな前弯があることを示します。ストレートネックや前弯減少はカーブが小さいこと、逆カーブは一部が反対方向へ曲がることを示します。"]],
      ["表現が変わる理由", ["撮影姿勢、測定方法、筋緊張、痛み、年齢、変性所見で報告語は変わります。同じ人でも別の検査で違う表現が出ることがあります。"]],
      ["図解と一緒に読む", [{ html: `横並びで確認するなら <a href="${localizedPath("ja", "images/cervical-curve-diagram")}">頸椎カーブ図</a> を使います。全体の判断は <a href="${localizedPath("ja", "cervical-curve")}">頸椎カーブガイド</a> で確認できます。` }]]
    ],
    es: [
      ["Las cuatro frases frecuentes", ["Lordosis cervical normal significa que el cuello muestra la curva suave habitual en esa imagen. Cuello recto y pérdida de lordosis suelen indicar curva reducida o aplanada. Curva invertida significa que parte se dobla en sentido contrario."]],
      ["Por qué cambia el lenguaje", ["Posición durante la imagen, método de medición, protección muscular, dolor, edad y degeneración pueden cambiar la frase del informe. La misma persona puede recibir wording distinto en pruebas diferentes."]],
      ["Usa la comparación visual", [{ html: `Para una vista rápida, usa el <a href="${localizedPath("es", "images/cervical-curve-diagram")}">diagrama de curva cervical</a>. Para la ruta completa, lee la <a href="${localizedPath("es", "cervical-curve")}">guía de curva cervical</a>.` }]]
    ]
  }),
  topic("cervical-kyphosis-exercises-to-avoid", "exercises", [sources.neckPainGuideline, sources.returnSport, sources.radiculopathy], {
    zh: ["练习边界", "颈椎反弓哪些练习先别硬做？", "没有一种动作对所有颈椎反弓都永远禁止，但症状加重、神经症状、外伤或不稳定风险出现时，某些拉伸、牵引和高负荷动作不适合硬扛。", "先避开会让疼痛扩散、手麻加重、无力明显、头晕或第二天反应持续变差的动作。", ["不要用疼痛硬测试颈椎。", "神经症状加重是停止信号。", "练习选择要看 24 小时反应。"]],
    en: ["Exercise boundaries", "Cervical kyphosis exercises to avoid: what not to force", "There is no single exercise that every person with cervical kyphosis must avoid forever, but symptom-provoking stretches, traction, and heavy loading should be treated carefully.", "Avoid forcing movements that spread pain, worsen numbness, create weakness, trigger dizziness, or leave a worse next-day response.", ["Do not use pain to stress-test the neck.", "Worsening nerve symptoms are a stop sign.", "Choose exercises by the 24-hour response."]],
    ja: ["運動の境界", "頸椎後弯で無理しない方がよい運動", "全員が永遠に避ける一つの運動はありませんが、症状を悪化させるストレッチ、牽引、高負荷は慎重に扱います。", "痛みの拡大、しびれ悪化、筋力低下、めまい、翌日の悪化が出る動きは無理に続けません。", ["痛みで首をテストしない。", "神経症状悪化は中止サイン。", "24時間反応で運動を選ぶ。"]],
    es: ["Límites de ejercicio", "Ejercicios a evitar con cifosis cervical: qué no forzar", "No hay un ejercicio que todos deban evitar para siempre, pero estiramientos, tracción y cargas que provocan síntomas deben manejarse con cuidado.", "Evita forzar movimientos que extiendan dolor, empeoren entumecimiento, creen debilidad, disparen mareo o dejen peor respuesta al día siguiente.", ["No uses dolor para probar el cuello.", "Empeorar síntomas nerviosos es señal de parar.", "Elige ejercicios por la respuesta de 24 horas."]]
  }, {
    zh: [
      ["不要硬推末端角度", ["强力末端拉伸、反复负重后仰或低头、以及让症状扩散的长时间保持，都不是好的自我测试。温和动作很快稳定下来，和硬扛一个姿势证明自己能忍，是两回事。"]],
      ["牵引和神经张力动作要谨慎", [{ html: `牵引和神经滑动不一定错，但如果麻木、无力、头晕或第二天反应加重，就应该停止尝试。可以配合 <a href="${articlePath("zh", "cervical-traction-contraindications")}">颈椎牵引禁忌指南</a> 和 <a href="${localizedPath("zh", "images/24-hour-neck-symptom-response-chart")}">24 小时反应图</a> 判断。` }]],
      ["相对安全的进阶标准", ["更合适的动作通常会让症状在 24 小时内相同或更平稳，不会让症状往手臂远端扩散，也不会降低力量、平衡或睡眠。"]]
    ],
    en: [
      ["Do not force end-range positions", ["Aggressive end-range stretching, repeated loaded neck extension or flexion, and long holds that create spreading symptoms are poor self-tests. A gentle movement that settles quickly is different from forcing a position to prove toughness."]],
      ["Be careful with traction and nerve tensioning", [{ html: `Traction and nerve glides are not automatically wrong, but worsening numbness, weakness, dizziness, or next-day escalation should stop the experiment. Pair this page with the <a href="${articlePath("en", "cervical-traction-contraindications")}">cervical traction contraindications guide</a> and the <a href="${localizedPath("en", "images/24-hour-neck-symptom-response-chart")}">24-hour response chart</a>.` }]],
      ["Green-light criteria", ["Better choices usually leave symptoms the same or calmer within 24 hours, do not spread symptoms farther down the arm, and do not reduce strength, balance, or sleep."]]
    ],
    ja: [
      ["末端姿勢を無理に押さない", ["強い末端ストレッチ、負荷をかけた首の伸展や屈曲、症状が広がる長い保持は自己テストとして不向きです。すぐ落ち着く軽い動きと、無理に耐える姿勢は違います。"]],
      ["牽引と神経テンションに注意", [{ html: `牽引や神経グライドは自動的に悪いわけではありませんが、しびれ、筋力低下、めまい、翌日の悪化があれば中止します。<a href="${articlePath("ja", "cervical-traction-contraindications")}">頸椎牽引の禁忌ガイド</a> と <a href="${localizedPath("ja", "images/24-hour-neck-symptom-response-chart")}">24時間反応チャート</a> を併用します。` }]],
      ["進めてもよい目安", ["よい選択は、多くの場合24時間以内に症状が同じか落ち着き、腕の遠くへ広がらず、筋力、バランス、睡眠を悪化させません。"]]
    ],
    es: [
      ["No fuerces posiciones finales", ["Estiramientos agresivos al final del rango, extensión o flexión cervical cargada repetida, y mantenimientos largos que extienden síntomas son malos autotests. Un movimiento suave que se calma rápido no es lo mismo que forzar para demostrar tolerancia."]],
      ["Cuidado con tracción y tensión neural", [{ html: `Tracción y deslizamientos neurales no son automáticamente incorrectos, pero empeorar entumecimiento, debilidad, mareo o respuesta al día siguiente debe detener el experimento. Combínalo con la <a href="${articlePath("es", "cervical-traction-contraindications")}">guía de contraindicaciones de tracción cervical</a> y el <a href="${localizedPath("es", "images/24-hour-neck-symptom-response-chart")}">gráfico de respuesta 24 h</a>.` }]],
      ["Criterios de luz verde", ["Las mejores opciones suelen dejar los síntomas igual o más calmados en 24 horas, no los extienden por el brazo y no reducen fuerza, equilibrio ni sueño."]]
    ]
  }),
  topic("c6-c7-numbness-thumb-index-middle-finger", "symptoms", [sources.radiculopathy, sources.ncbiRadiculopathy, sources.carpal, sources.ulnar], {
    zh: ["症状专题", "拇指、食指、中指麻：C6、C7 还是腕管？", "拇指、食指和中指麻木可能让人想到 C6/C7 神经根，也可能和腕管、尺神经或其他周围神经问题重叠。分布只是线索，不是诊断。", "把手指区域、颈部诱发、手腕姿势、夜间症状、握力和症状进展放在一起看，才更有意义。", ["拇指食指常让人想到 C6 或正中神经。", "中指常被拿来观察 C7 线索。", "分布图不能代替检查。"]],
    en: ["Symptom guide", "C6 C7 numbness in the thumb, index, or middle finger", "Thumb, index, and middle-finger numbness may suggest C6 or C7 nerve-root clues, but it can also overlap with carpal tunnel, ulnar nerve, or other peripheral nerve patterns.", "Finger distribution is only a clue. It is more useful when combined with neck triggers, wrist position, night symptoms, grip change, and progression.", ["Thumb and index symptoms can point toward C6 or the median nerve.", "Middle-finger symptoms are often discussed with C7 clues.", "A distribution map does not replace an exam."]],
    ja: ["症状ガイド", "親指・人差し指・中指のしびれ：C6/C7？手根管？", "親指、人差し指、中指のしびれはC6/C7神経根を考える手がかりになりますが、手根管、尺骨神経、他の末梢神経とも重なります。", "指の分布は手がかりです。首の誘発、手首姿勢、夜間症状、握力、進行と合わせて見ます。", ["親指と人差し指はC6や正中神経の手がかり。", "中指はC7の手がかりとして語られる。", "分布図は診察の代わりではない。"]],
    es: ["Guía de síntomas", "Entumecimiento C6 C7 en pulgar, índice o dedo medio", "Pulgar, índice y dedo medio dormidos pueden sugerir pistas de C6 o C7, pero también se superponen con túnel carpiano, nervio cubital u otros nervios.", "La distribución por dedos es solo una pista. Sirve más al combinarla con desencadenantes del cuello, muñeca, síntomas nocturnos, agarre y progresión.", ["Pulgar e índice pueden apuntar a C6 o nervio mediano.", "El dedo medio suele discutirse con C7.", "Un mapa no sustituye un examen."]]
  }, {
    zh: [
      ["这种分布可能提示什么", ["拇指和食指症状常被拿来讨论 C6 或正中神经模式。中指症状常被拿来观察 C7 线索。但真实症状不一定严格按照教科书边界走。"]],
      ["颈部线索 vs 手腕线索", ["颈部相关线索包括症状从颈部或肩胛区往手臂走、随颈部姿势变化、咳嗽或喷嚏加重。手腕相关线索包括夜间麻木、甩手缓解、和手腕姿势或重复抓握相关。"]],
      ["保守使用分布图", [{ html: `把 <a href="${localizedPath("zh", "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 手指麻木地图</a> 当作讨论工具，再结合 <a href="${articlePath("zh", "can-cervical-kyphosis-cause-hand-numbness")}">颈椎反弓和手麻指南</a> 判断曲度报告是否真的相关。` }]]
    ],
    en: [
      ["What the pattern can suggest", ["Thumb and index symptoms are often discussed with C6 or median-nerve patterns. Middle-finger symptoms are often discussed with C7. But real symptoms do not always respect textbook borders."]],
      ["Neck clues vs wrist clues", ["Neck-related clues include symptoms that travel from the neck or shoulder blade into the arm, change with neck position, or worsen with coughing or sneezing. Wrist-related clues include night numbness, shaking the hand for relief, and symptoms linked to wrist position or repetitive gripping."]],
      ["Use the map conservatively", [{ html: `Use the <a href="${localizedPath("en", "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 finger numbness map</a> as a discussion aid, then check the broader <a href="${articlePath("en", "can-cervical-kyphosis-cause-hand-numbness")}">hand numbness and cervical kyphosis guide</a> if the curve report is part of your concern.` }]]
    ],
    ja: [
      ["分布が示す可能性", ["親指と人差し指はC6または正中神経パターンとして語られることがあります。中指はC7の手がかりとして使われます。ただし実際の症状は教科書通りに分かれるとは限りません。"]],
      ["首の手がかりと手首の手がかり", ["首由来の手がかりは、首や肩甲部から腕へ走る、首の姿勢で変わる、咳やくしゃみで悪化することです。手首由来では夜間のしびれ、手を振ると楽、手首姿勢や反復把持との関連を見ます。"]],
      ["マップを保守的に使う", [{ html: `<a href="${localizedPath("ja", "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 指のしびれマップ</a> は相談用の材料です。カーブ報告が気になる場合は <a href="${articlePath("ja", "can-cervical-kyphosis-cause-hand-numbness")}">頸椎後弯と手のしびれガイド</a> も確認します。` }]]
    ],
    es: [
      ["Qué puede sugerir el patrón", ["Pulgar e índice se discuten a menudo con C6 o nervio mediano. El dedo medio suele discutirse con C7. Pero los síntomas reales no siempre respetan fronteras de libro."]],
      ["Pistas del cuello vs muñeca", ["Pistas cervicales: síntomas que viajan de cuello o escápula al brazo, cambian con posición cervical o empeoran con tos/estornudo. Pistas de muñeca: entumecimiento nocturno, sacudir la mano ayuda, o relación con postura de muñeca y agarre repetitivo."]],
      ["Usa el mapa con prudencia", [{ html: `Usa el <a href="${localizedPath("es", "images/c6-c7-c8-finger-numbness-map")}">mapa C6 C7 C8</a> como ayuda de conversación, y revisa la <a href="${articlePath("es", "can-cervical-kyphosis-cause-hand-numbness")}">guía de mano dormida y cifosis cervical</a> si el informe de curva es parte de la preocupación.` }]]
    ]
  })
];

function topic(slug, category, sourceList, translations, sections = null) {
  return sections ? { slug, category, sources: sourceList, translations, sections } : { slug, category, sources: sourceList, translations };
}

const hubs = {
  symptoms: {
    categories: ["symptoms"],
    meta: {
      zh: ["症状中心", "手麻、手臂痛、头痛头晕和危险信号", "从症状进入，而不是从影像恐慌开始。这里整理手指麻木、神经根、脊髓危险信号、晨起手麻和头痛头晕的保守判断路径。"],
      en: ["Symptom hub", "Hand numbness, arm pain, headache, dizziness, and red flags", "Start from symptoms instead of imaging fear. This hub organizes finger numbness, nerve roots, cord warning signs, waking numb, headache, and dizziness."],
      ja: ["症状ハブ", "手のしびれ、腕痛、頭痛、めまい、危険サイン", "画像への不安からではなく症状から入ります。指のしびれ、神経根、脊髄サイン、朝のしびれ、頭痛、めまいを整理します。"],
      es: ["Hub de síntomas", "Manos dormidas, dolor de brazo, cefalea, mareo y alarmas", "Empieza por síntomas, no por miedo a la imagen. Organiza dedos dormidos, raíces, médula, adormecimiento matutino, cefalea y mareo."]
    }
  },
  diagnosis: {
    categories: ["diagnosis"],
    meta: {
      zh: ["影像中心", "读懂报告词，不把影像当诊断", "曲度变直、反弓、突出、狭窄、骨赘和检查选择都需要和症状、体格检查及下一步决策放在一起看。"],
      en: ["Imaging hub", "Read report terms without turning imaging into a diagnosis", "Straightening, kyphosis, bulge, stenosis, osteophytes, and test choices should be interpreted with symptoms, exam, and next decisions."],
      ja: ["画像ハブ", "画像用語を診断そのものにしない", "前弯減少、後弯、膨隆、狭窄、骨棘、検査選択は症状、診察、次の判断と合わせて読みます。"],
      es: ["Hub de imagen", "Leer informes sin convertir imagen en diagnóstico", "Rectificación, cifosis, protrusión, estenosis, osteofitos y pruebas se interpretan con síntomas, exploración y decisiones."]
    }
  },
  exercises: {
    categories: ["exercises"],
    meta: {
      zh: ["练习中心", "办公室、睡眠、力量训练和康复预期", "练习不是强行改变曲度，而是改善症状耐受、活动、力量、睡眠和回到生活运动的能力。"],
      en: ["Exercise hub", "Desk work, sleep, strength training, and rehab expectations", "Exercise is not about forcing curve change. It is about symptom tolerance, motion, strength, sleep, and returning to life and sport."],
      ja: ["運動ハブ", "デスク、睡眠、筋トレ、期待値", "運動はカーブを無理に変えることではなく、症状耐性、動き、筋力、睡眠、生活とスポーツ復帰を支えるものです。"],
      es: ["Hub de ejercicios", "Oficina, sueño, fuerza y expectativas", "El ejercicio no fuerza la curva; mejora tolerancia, movimiento, fuerza, sueño y regreso a vida y deporte."]
    }
  },
  treatments: {
    categories: ["treatments"],
    meta: {
      zh: ["治疗中心", "牵引、枕头、按摩和手法的保守边界", "常见工具可以帮助某些症状，但不能承诺复位或恢复曲度。重点是适应证、禁忌、剂量和反应。"],
      en: ["Treatment hub", "Conservative boundaries for traction, pillows, massage, and manipulation", "Common tools may help some symptoms, but they should not promise realignment or curve restoration. Indications, contraindications, dose, and response matter."],
      ja: ["治療ハブ", "牽引、枕、マッサージ、手技の境界", "一般的な道具や施術は一部の症状を助けることがありますが、整復やカーブ回復を約束しません。適応、禁忌、量、反応が重要です。"],
      es: ["Hub de tratamientos", "Límites para tracción, almohadas, masaje y manipulación", "Herramientas comunes pueden ayudar algunos síntomas, pero no deben prometer realineación ni restaurar curva. Importan indicaciones, contraindicaciones, dosis y respuesta."]
    }
  },
  sports: {
    categories: ["sports"],
    meta: {
      zh: ["运动中心", "冲浪、滑雪/单板和攀岩的颈椎负荷", "运动不是简单能不能做，而是姿势、持续时间、冲击风险和 24 小时症状反应的组合。"],
      en: ["Sport hub", "Neck loading in surfing, skiing, snowboarding, and climbing", "Sport is not a simple yes/no. It is position, duration, impact risk, and 24-hour symptom response together."],
      ja: ["スポーツハブ", "サーフィン、雪上、クライミングの首負荷", "スポーツは可否だけでなく、姿勢、時間、衝撃リスク、24時間の症状反応を合わせて考えます。"],
      es: ["Hub deportivo", "Carga cervical en surf, nieve y escalada", "El deporte no es solo sí/no. Importan posición, duración, impacto y respuesta de síntomas en 24 horas."]
    }
  }
};

const videoRefs = [
  ["rZDj-Fiko4g", "E3 Rehab", "Cervical Radiculopathy | Pinched Nerve in Neck Rehab", "radiculopathy"],
  ["gZUNcfcdHW4", "Ask Doctor Jo", "Pinched Nerve Cervical Radiculopathy Stretches & Exercises", "radiculopathy exercise"],
  ["yZJ1MfKqByY", "Ask Doctor Jo", "Neural Glides for Ulnar, Median & Radial Nerves", "nerve glides"],
  ["sr3hW43i9tg", "Ask Doctor Jo", "Neck Pain Relief Daily Exercise", "neck control"],
  ["WOp5Fnma-po", "Ask Doctor Jo", "Shoulder Pain Relief Exercise Routine", "scapular support"],
  ["6gUphK9a-Gg", "Point Performance", "Foam Rolling for Thoracic Extension", "thoracic extension"],
  ["SSDITQG1s08", "Degree 33 Surfboards", "How to Improve Your Surfboard Paddling", "surf paddling"],
  ["O3SSFmG_taE", "BMC TV", "Belay Glasses Overview", "climbing belay"]
];

const extraFaqs = {
  zh: [
    ["报告写颈椎反弓，我是不是一定会越来越严重？", "不一定。曲度词需要结合症状、体格检查和功能变化解释。轻微稳定症状通常先关注负荷、睡眠、力量和神经危险信号。"],
    ["每天做很多拉伸会不会更快恢复？", "不一定。神经症状不喜欢被硬拉。更稳妥的是少量、温和、看 24 小时反应，并逐步增加耐受。"],
    ["没有手麻，只是影像曲度变直，需要做 MRI 吗？", "是否需要检查取决于症状、外伤、神经体征和医生判断。单纯影像词或轻微稳定酸痛通常不等于必须立刻做更多检查。"]
  ],
  en: [
    ["Does a cervical kyphosis report mean my neck will keep getting worse?", "Not necessarily. Curve language needs symptoms, exam, and function. Mild stable symptoms usually start with load, sleep, strength, and red-flag screening."],
    ["Will doing many stretches every day restore the curve faster?", "Not necessarily. Irritable nerve symptoms often dislike aggressive stretching. Use gentle dosing and the 24-hour response."],
    ["Do I need an MRI if I have straightening but no hand numbness?", "Testing depends on symptoms, trauma, neurological signs, and clinical judgment. Imaging language alone does not automatically require more tests."]
  ],
  ja: [
    ["頸椎後弯と書かれたら悪化し続けますか？", "必ずしもそうではありません。カーブの言葉は症状、診察、機能と合わせて読みます。軽く安定した症状は負荷、睡眠、筋力、危険サインを見ます。"],
    ["毎日たくさん伸ばせば早く戻りますか？", "そうとは限りません。神経症状は強いストレッチで悪化することがあります。少量で穏やかに行い、24時間反応を見ます。"],
    ["手のしびれがなくストレートネックだけならMRIが必要？", "検査は症状、外傷、神経所見、医療判断で決まります。画像用語だけで追加検査が必須とは限りません。"]
  ],
  es: [
    ["¿Un informe de cifosis cervical significa que empeorará siempre?", "No necesariamente. El lenguaje de curva se interpreta con síntomas, exploración y función. Síntomas leves estables suelen empezar por carga, sueño, fuerza y alarmas."],
    ["¿Muchos estiramientos diarios restauran antes la curva?", "No necesariamente. Los síntomas nerviosos irritables pueden empeorar con estiramientos agresivos. Usa dosis suave y respuesta de 24 horas."],
    ["¿Necesito MRI si hay rectificación pero no manos dormidas?", "Depende de síntomas, trauma, signos neurológicos y criterio clínico. El término de imagen solo no exige automáticamente más pruebas."]
  ]
};

const pillarPages = [
  {
    slug: "cervical-curve",
    sources: [sources.spineBasics, sources.curvesOfSpine, sources.lordosisReview, sources.neckPainGuideline],
    related: [
      "cervical-kyphosis-vs-loss-lordosis",
      "can-cervical-curve-be-restored",
      "office-neck-curve-ergonomics",
      "pillow-height-sleep-position"
    ],
    translations: {
      zh: {
        kicker: "Pillar 页面",
        title: "颈椎曲度：正常颈曲、变直、反弓和保守处理",
        description:
          "解释 cervical curve、正常颈椎前凸、颈椎曲度变直、loss of cervical lordosis 和反弓的区别，以及哪些症状需要优先就医。",
        intro: [
          "Cervical curve 通常指从侧面看颈椎的自然前凸曲线。很多人搜索这个词，是因为报告里写了曲度变直、loss of cervical lordosis、reversed curve 或 cervical kyphosis。",
          "这页把宽泛的“颈椎曲度”问题拆成几个更实用的判断：正常曲线是什么，影像词是否等于疼痛来源，哪些症状比曲线形状更重要，以及保守处理应该追踪什么。"
        ],
        sections: [
          ["什么是正常颈椎曲度", ["从侧面看，颈椎通常有一个轻微向前的 lordotic curve。它是脊柱整体曲线的一部分，帮助头颈负荷分布和日常活动。", "不同机构对角度和测量方式的表述可能不同，所以不要只用一个数字判断好坏。更重要的是症状、功能和神经系统线索是否匹配。"]],
          ["变直、loss of lordosis 和反弓有什么区别", ["Straightening 或 loss of cervical lordosis 通常表示正常前凸减少或变平；reversed curve 或 cervical kyphosis 则说明曲线方向可能发生反向。", "这些词描述的是影像上的形态，不等于单独诊断。拍片姿势、疼痛保护、肌肉紧张和退变都可能影响曲线外观。"]],
          ["什么时候曲度问题更需要重视", ["局部僵硬或轻度颈痛可以先看睡眠、工作姿势、训练负荷和上背力量。", "手臂放射痛、手指麻木、无力、手变笨、走路不稳或大小便异常，比曲线是否好看更决定优先级。新出现或进展的神经症状应尽快评估。"]],
          ["保守处理应该追踪什么", ["保守处理不应承诺把曲度练回某个角度。更有用的目标是疼痛减少、睡眠改善、麻木更稳定、活动范围和负荷耐受提升。", "记录 24 小时反应：如果某个动作让症状往手臂远端扩散、第二天明显更差或力量变化，就应该降量或停止，并考虑专业评估。"]]
        ]
      },
      en: {
        kicker: "Pillar guide",
        title: "Cervical Curve: Normal Neck Curve, Straightening, and Loss of Lordosis",
        description:
          "A plain-language guide to the cervical curve, normal neck lordosis, straightening, reversed curve, symptoms, conservative care, and when to seek medical evaluation.",
        intro: [
          "The cervical curve is the natural curve of the neck seen from the side. Many people search for it after an X-ray or MRI report mentions straightening, loss of cervical lordosis, reversed curve, or cervical kyphosis.",
          "This guide answers the broad question first: what the normal neck curve is, what common report words mean, why symptoms matter more than the curve alone, and what conservative care can reasonably track."
        ],
        sections: [
          ["What the cervical curve is", ["Viewed from the side, the cervical spine normally has a gentle lordotic curve as part of the spine's overall curves. It helps distribute load through the neck and supports everyday motion.", "A single angle is not the whole story. Measurement method, posture during imaging, symptoms, function, and neurological signs all matter when interpreting the curve."]],
          ["Normal cervical curvature and the normal C-spine curve", ["Searches for normal cervical curvature, normal neck curve, normal C-spine curve, and normal lordotic curve usually point to the same basic question: what should the side-view neck curve look like, and when does a report wording matter?", "A normal cervical curve is generally a gentle forward lordosis, but normal is not only a number. Imaging position, pain guarding, age, symptoms, neurological exam, and function decide whether the curve is just a finding or part of the current problem.", { html: `If a report says <a href="${articlePath("en", "cervical-kyphosis-vs-loss-lordosis")}">loss of normal cervical lordosis, straightening, reversed curve, or mild cervical kyphosis</a>, compare the wording with symptoms and the <a href="${localizedPath("en", "images/cervical-curve-diagram")}">normal cervical curve diagram</a> before assuming permanent damage. The dedicated <a href="${localizedPath("en", "loss-of-cervical-lordosis")}">loss of cervical lordosis guide</a> explains what to track next.` }]],
          ["Straightening, loss of lordosis, and reversed curve", ["Straightening or loss of cervical lordosis usually means the normal lordotic curve is reduced or flattened. A reversed curve or cervical kyphosis suggests the curve may bend in the opposite direction.", "These are imaging descriptions, not complete diagnoses. Positioning, pain guarding, muscle tone, and degenerative findings can all change how the neck curve appears on an image."]],
          ["When the curve finding deserves more attention", ["Local stiffness or mild neck ache usually starts with daily load, sleep setup, workstation exposure, upper-back capacity, and movement tolerance.", "Radiating arm pain, finger numbness, weakness, hand clumsiness, walking changes, or bowel/bladder symptoms matter more than whether the curve looks ideal. New or progressive neurological symptoms should be assessed promptly."]],
          ["What conservative care can track", ["Conservative care should not promise to force the curve back to a specific angle. More useful goals are less pain, better sleep, steadier numbness, improved motion, and higher work or sport tolerance.", "Track the 24-hour response. If a drill sends symptoms farther down the arm, leaves the next day clearly worse, or changes strength, reduce the dose or stop and consider professional evaluation."]]
        ]
      },
      ja: {
        kicker: "Pillar ガイド",
        title: "頸椎カーブ：正常な首のカーブ、ストレート、前弯減少",
        description:
          "頸椎カーブ、正常前弯、ストレートネック、前弯減少、逆カーブ、症状、保存的ケア、受診目安を整理します。",
        intro: [
          "頸椎カーブは、横から見た首の自然な前弯です。画像レポートでストレート、前弯減少、逆カーブ、頸椎後弯と書かれて検索する人が多い言葉です。",
          "このページでは、正常カーブ、画像用語、症状の優先度、保存的ケアで追うべきことをまとめます。"
        ],
        sections: [
          ["頸椎カーブとは", ["横から見ると、頸椎にはゆるやかな前弯があります。脊柱全体のカーブの一部で、首への負荷分散と日常動作を支えます。", "角度だけで良し悪しを決めるのではなく、撮影姿勢、症状、機能、神経所見と合わせて読みます。"]],
          ["ストレート、前弯減少、逆カーブ", ["ストレートや前弯減少は、通常の前弯が小さい、または平らに近い状態を指します。逆カーブや後弯は方向が反対に近いことを示す場合があります。", "これらは画像上の説明であり、完全な診断ではありません。痛み、筋緊張、姿勢、変性所見で見え方が変わります。"]],
          ["注意が必要な症状", ["軽い首こりや局所痛では、睡眠、作業姿勢、負荷、上背部の能力を確認します。", "腕へ走る痛み、指のしびれ、筋力低下、手の不器用さ、歩行変化、排尿排便異常は優先度が高く、早めの評価が必要です。"]],
          ["保存的ケアで追うこと", ["特定の角度へ戻す約束ではなく、痛み、睡眠、しびれ、動きやすさ、仕事やスポーツ耐性を追います。", "運動で症状が腕の遠くへ広がる、翌日悪化する、筋力が変わる場合は量を下げるか中止し、相談を検討します。"]]
        ]
      },
      es: {
        kicker: "Guía pilar",
        title: "Curva cervical: lordosis normal, rectificación y pérdida de lordosis",
        description:
          "Guía clara sobre curva cervical, lordosis normal, rectificación, curva invertida, síntomas, cuidado conservador y cuándo consultar.",
        intro: [
          "La curva cervical es la curva natural del cuello vista de lado. Muchas personas buscan este término después de que un informe menciona rectificación, pérdida de lordosis, curva invertida o cifosis cervical.",
          "Esta guía responde primero la pregunta amplia: qué es la curva normal, qué significan los términos del informe, por qué los síntomas pesan más que la curva sola y qué puede seguir el cuidado conservador."
        ],
        sections: [
          ["Qué es la curva cervical", ["Vista de lado, la columna cervical suele tener una lordosis suave como parte de las curvas de la columna. Ayuda a distribuir carga y permite movimiento cotidiano.", "Un ángulo aislado no cuenta toda la historia. Método de medición, postura durante la imagen, síntomas, función y signos neurológicos importan."]],
          ["Rectificación, pérdida de lordosis y curva invertida", ["Rectificación o pérdida de lordosis significa que la curva lordótica normal está reducida o aplanada. Curva invertida o cifosis cervical puede indicar que se curva en la dirección contraria.", "Son descripciones de imagen, no diagnósticos completos. Posición, protección por dolor, tono muscular y degeneración pueden cambiar la apariencia."]],
          ["Cuándo merece más atención", ["Rigidez local o dolor leve suele empezar por carga diaria, sueño, trabajo, capacidad de espalda alta y tolerancia de movimiento.", "Dolor irradiado al brazo, dedos dormidos, debilidad, torpeza de mano, cambios al caminar o síntomas urinarios/intestinales pesan más que una curva ideal."]],
          ["Qué puede seguir el cuidado conservador", ["No debe prometer forzar la curva a un ángulo concreto. Metas útiles son menos dolor, mejor sueño, entumecimiento más estable, más movimiento y mayor tolerancia laboral o deportiva.", "Registra la respuesta de 24 horas. Si un ejercicio manda síntomas más lejos, empeora al día siguiente o cambia la fuerza, baja dosis o detente y considera evaluación."]]
        ]
      }
    }
  },
  {
    slug: "cervical-kyphosis",
    sources: [sources.clevelandKyphosis, sources.kyphosisReview, sources.lordosisReview, sources.neckPainGuideline],
    related: [
      "cervical-kyphosis-vs-loss-lordosis",
      "can-cervical-curve-be-restored",
      "when-to-see-doctor-cervical-kyphosis",
      "office-neck-curve-ergonomics"
    ],
    translations: {
      zh: {
        kicker: "Pillar 页面",
        title: "颈椎反弓完整指南：报告词、症状、康复和风险边界",
        description:
          "一个保守、可核查的颈椎反弓总览页，解释影像报告、症状优先级、康复目标、治疗边界和什么时候应就医。",
        intro: [
          "颈椎反弓或颈椎后凸听起来很吓人，但它不是单独的诊断，也不自动说明疼痛来源。更稳妥的做法，是把影像词、症状、体格检查、工作和运动负荷放在同一个框架里看。",
          "这页是本站的总入口。它不会承诺把曲度练回去，也不会把某个动作包装成治疗方案；它帮助读者理解哪些问题可以从保守管理开始，哪些症状应该尽快评估。"
        ],
        sections: [
          ["颈椎反弓到底是什么意思", ["通常说的颈椎反弓，是指原本向前的颈椎曲线变直甚至反向。不同报告可能写后凸、反弓、曲度变直或 loss of lordosis。词语不同，严重程度和临床意义也不一定相同。", "影像上的曲线会受拍片姿势、疼痛保护、肌肉紧张和退变影响。单凭一张片子，不应直接推断病因、预后或治疗效果。"]],
          ["症状比曲线形状更决定优先级", ["如果只是颈部酸痛或僵硬，且没有神经症状，通常先看日常负荷、睡眠、上背力量和活动耐受。", "如果出现手臂放射痛、手麻、无力、手变笨、走路不稳，优先级会明显提高。新出现或进展的神经症状，不适合只靠网上动作处理。"]],
          ["保守康复真正追踪什么", ["保守康复的目标通常是减轻症状、改善活动、提高力量和负荷耐受，而不是承诺改变影像曲线。更值得记录的是疼痛位置、睡眠、手麻变化、运动后 24 小时反应和工作耐受。", "如果一个练习让症状向手臂远端扩散、第二天明显更差或出现力量下降，它就不是当前合适剂量。"]],
          ["治疗工具的边界", ["牵引、枕头、按摩和手法可能让部分人短期舒服，但不能承诺复位或恢复曲度。任何工具都应通过症状反应和风险筛查来判断。", "有脊髓相关线索、明显外伤、进行性无力、发热或肿瘤病史时，应先医疗评估，而不是加大自我处理。"]]
        ]
      },
      en: {
        kicker: "Pillar guide",
        title: "Cervical Kyphosis: Report Meaning, Symptoms, Rehab, and Safety Boundaries",
        description:
          "A conservative, source-backed overview of cervical kyphosis: imaging language, symptom priority, rehab goals, treatment boundaries, and when to seek care.",
        intro: [
          "Cervical kyphosis sounds alarming, but it is not a complete diagnosis by itself and it does not automatically prove the source of pain. The safer frame is to read the imaging language alongside symptoms, neurological signs, daily load, work exposure, and sport history.",
          "This is the main hub for the site. It does not promise to restore the curve and it does not turn one exercise into a treatment plan. It helps readers understand what the report may mean, which symptoms deserve priority, what conservative care can reasonably track, and when a clinician should be involved."
        ],
        sections: [
          ["What cervical kyphosis means", ["In plain language, cervical kyphosis usually means the normal forward neck curve has flattened enough to reverse direction or move toward a backward curve. Reports may use kyphosis, reversed curve, straightening, or loss of lordosis, but those terms do not always mean the same severity or the same clinical meaning.", "A report term is a description of shape. It does not automatically explain pain, hand numbness, headaches, dizziness, or sports tolerance. The curve finding becomes more meaningful when it matches the story, exam findings, neurological signs, and how symptoms behave under load."]],
          ["Cervical kyphosis versus straightening", ["Straightening or loss of cervical lordosis usually means the normal forward curve is reduced or flattened. Cervical kyphosis or reversal suggests the curve is moving in the opposite direction. Many readers see these terms used loosely, which is why the exact report wording should be interpreted carefully.", "The distinction matters, but it is not the whole decision. A mild straightening finding with no neurological symptoms may be managed very differently from a structural kyphosis after trauma, surgery, inflammatory disease, or progressive deformity. Context is what turns imaging language into a clinical question."]],
          ["Mild cervical kyphosis symptoms to watch", ["Mild cervical kyphosis on a report does not automatically mean severe disease. The more useful screen is whether symptoms are local and stable, or whether they include arm pain, finger numbness, weakness, hand clumsiness, walking changes, or worsening night pain.", "For many readers, cervical kyphosis symptoms overlap with neck stiffness, upper-back fatigue, headache, work-position sensitivity, or sport tolerance. The symptoms that change the next step are progressive neurological signs, trauma-related symptoms, or function loss that keeps worsening despite sensible load changes.", { html: `If the main concern is the report language, compare it with <a href="${articlePath("en", "cervical-kyphosis-vs-loss-lordosis")}">cervical kyphosis vs loss of normal cervical lordosis</a>. If the main issue is hand or finger numbness, use the <a href="${localizedPath("en", "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 finger numbness map</a> and the <a href="${articlePath("en", "cervical-radiculopathy-myelopathy-red-flags")}">red flag guide</a> before trying more exercises.` }]],
          ["Why one image is not the whole diagnosis", ["Neck curve appearance can change with positioning, pain guarding, muscle tone, x-ray technique, and degenerative findings. A person who is in pain may hold the neck differently during imaging. Another person may have a curve finding on a report but little or no functional limitation.", "This is why conservative health education should avoid saying the curve is definitely the cause or that a single treatment can put it back. Imaging is one input. Symptoms, exam, function, and change over time decide whether the finding is background context or the main issue."]],
          ["Common contexts and causes", ["Cervical kyphosis can appear in several contexts: postural exposure, muscle guarding, degenerative disc or joint changes, old trauma, congenital shape, inflammatory disease, post-surgical change, or structural deformity. These categories should not be blended into one simple internet explanation.", "A desk worker with local stiffness, a surfer with extension-related symptoms, and a person with progressive arm weakness after trauma need different thinking. The same curve word may appear in each case, but the risk level and next step can be very different."]],
          ["Symptoms set the priority more than curve shape", ["If symptoms are mainly stiffness or local neck ache without neurological signs, the first questions are often daily load, sleep, upper-back capacity, work posture, stress, and movement tolerance. The early plan may focus on reducing irritability and improving capacity.", "Radiating arm pain, finger numbness, weakness, hand clumsiness, or walking changes raise the priority. New or progressive neurological symptoms should not be managed only with online drills. The curve may be relevant, but the neurological pattern decides urgency."]],
          ["Diagnosis is a workflow, not a label", ["A useful clinical workflow starts with history: onset, trauma, symptom path, weakness, numbness, dizziness, gait change, and what makes symptoms better or worse. Then comes exam: range of motion, neurological screening, strength, reflexes, sensation, coordination, and shoulder or peripheral nerve contributors.", "X-ray can describe alignment. MRI can show discs, stenosis, cord context, and soft-tissue structures. EMG and nerve conduction studies may help when the question is nerve localization. None of these tests is automatically the best test for every reader; the choice depends on the clinical question."]],
          ["What conservative rehab should track", ["Conservative rehab usually aims to improve symptoms, motion, strength, and load tolerance rather than guaranteeing a different curve on imaging. Track pain location, sleep, numbness behavior, 24-hour response, work tolerance, and sport response. These measures tell you whether the neck is becoming more usable.", "A good plan usually starts below the symptom threshold, then progresses one variable at a time. If a drill sends symptoms farther down the arm, leaves the next day clearly worse, or changes strength, it is not the right current dose. More intensity is not automatically better."]],
          ["Boundaries for treatment tools", ["Traction, pillows, massage, and manual therapy may give short-term comfort for some people, but they should not promise realignment or curve restoration. A pillow can improve sleep position; it cannot diagnose the cause of numbness. Traction may be considered in selected cases, but it also has contraindications and should not be treated as a universal cure.", "Manual therapy or massage should be judged by symptom response and risk screening. Cord-related signs, significant trauma, progressive weakness, fever, or cancer history should move the plan toward medical evaluation before more self-treatment."]],
          ["Work, sleep, and sport exposure matter", ["Many readers focus only on the curve and miss the repeated exposures that keep symptoms irritated. Long uninterrupted desk blocks, poor sleep, heavy phone use, repeated driving, overhead work, surf paddling, belaying, snow-sport falls, and heavy bracing in the gym can all change neck load.", "The goal is not to avoid life. It is to make exposure readable and adjustable. Change one variable at a time: break frequency, pillow height, training volume, paddling minutes, belay duration, or lifting load. Then watch the 24-hour response before progressing."]],
          ["Common mistakes to avoid", ["Do not assume the most dramatic phrase in the report is automatically the most important finding. A report can mention kyphosis, disc changes, or osteophytes without proving which structure is causing symptoms. Matching the report to the side, level, exam, and symptom behavior is what gives it meaning.", "Do not chase curve correction so aggressively that symptoms become less stable. Repeatedly testing the neck, stretching into arm symptoms, using longer traction because the curve looks bad, or ignoring worsening hand symptoms can turn a manageable problem into a confusing one. Conservative care should make the pattern calmer and easier to interpret."]],
          ["How to use this hub", ["If your main worry is whether the curve can be restored, start with the curve-restoration guide and track function instead of obsessing over x-ray angles. If your main symptom is hand or finger numbness, use the numbness map and red-flag guide before trying nerve exercises. If your question is sport, use the neck-load return guide and the 24-hour rule.", "This page is meant to route you by decision, not by fear. Imaging terms belong in the diagnosis cluster. Numbness and weakness belong in the symptom cluster. Traction, pillows, massage, and manipulation belong in the treatment-boundary cluster. Surfing, skiing, climbing, and lifting belong in the sport-load cluster."]],
          ["When to seek care promptly", ["Seek prompt evaluation for new or worsening weakness, spreading numbness, hand clumsiness, walking imbalance, bowel or bladder symptoms, fever, cancer history, significant trauma, or severe unrelenting night pain. These are not situations where a curve-correction routine should be the main plan.", "Also seek guidance when symptoms do not match a simple pattern, keep recurring despite sensible load changes, or interfere with work, sleep, grip, or sport participation. A careful evaluation can separate neck-root symptoms from shoulder, wrist, elbow, thoracic outlet, or other medical contributors.", "If you are unsure whether a symptom is neurological, write down what changed, when it started, and whether it is progressing. That record makes the visit more useful and reduces the temptation to keep guessing from the image report alone. Bring medication lists, prior imaging dates, and clear symptom examples."]]
        ]
      },
      ja: {
        kicker: "Pillar ガイド",
        title: "頸椎後弯ガイド：画像用語、症状、リハビリ、安全な境界",
        description:
          "頸椎後弯について、画像の読み方、症状の優先度、リハビリ目標、治療道具の限界、受診目安を保守的に整理します。",
        intro: [
          "頸椎後弯という言葉は不安を招きますが、それだけで完全な診断になるわけではなく、痛みの原因を証明するものでもありません。",
          "このページはサイト全体の入口です。カーブ回復を約束せず、どこまで保存的に考え、どこから医療評価を優先するかを整理します。"
        ],
        sections: [
          ["頸椎後弯とは何か", ["通常は首の前弯が減少または逆方向になった状態を指します。ストレート、前弯減少、後弯などの言葉は、必ずしも同じ重症度を意味しません。", "画像の見え方は姿勢、痛み、筋緊張、変性所見で変わります。一枚の画像だけで原因や予後を決めません。"]],
          ["優先度はカーブより症状", ["局所の首こりや軽い痛みだけなら、日常負荷、睡眠、上背部能力、動きやすさを確認します。", "腕への痛み、指のしびれ、筋力低下、手の不器用さ、歩行変化は優先度が上がります。"]],
          ["保存的リハビリで追うこと", ["目的は症状、可動性、筋力、負荷耐性の改善であり、画像上のカーブ変化を保証することではありません。", "運動で症状が遠くへ広がる、翌日悪化する、筋力が落ちるなら量が合っていません。"]],
          ["治療道具の境界", ["牽引、枕、マッサージ、手技は短期的に楽になる人もいますが、整復やカーブ回復を約束するものではありません。", "脊髄サイン、外傷、進行性筋力低下、発熱、がん既往では自己処置より評価が優先です。"]]
        ]
      },
      es: {
        kicker: "Guía pilar",
        title: "Cifosis cervical: informe, síntomas, rehabilitación y límites de seguridad",
        description:
          "Resumen prudente y basado en fuentes sobre cifosis cervical: lenguaje de imagen, prioridad de síntomas, metas de rehabilitación y cuándo buscar atención.",
        intro: [
          "La cifosis cervical puede sonar alarmante, pero no es un diagnóstico completo por sí sola ni prueba automáticamente el origen del dolor.",
          "Esta página es el hub principal del sitio. No promete restaurar la curva ni convierte un ejercicio en tratamiento; ayuda a decidir qué puede empezar con manejo conservador y qué requiere evaluación."
        ],
        sections: [
          ["Qué significa cifosis cervical", ["En lenguaje simple, suele describir una curva cervical normal que se ha rectificado o invertido. Los informes pueden decir cifosis, curva invertida, rectificación o pérdida de lordosis, sin que todo signifique la misma gravedad.", "La apariencia de la curva cambia con postura, dolor, tono muscular y degeneración. Una imagen no decide sola causa, pronóstico o éxito terapéutico."]],
          ["Los síntomas fijan la prioridad", ["Si hay rigidez o dolor local sin signos neurológicos, primero se miran carga diaria, sueño, capacidad de espalda alta y tolerancia de movimiento.", "Dolor que baja al brazo, dedos dormidos, debilidad, torpeza de mano o cambios al caminar elevan la prioridad."]],
          ["Qué mide la rehabilitación conservadora", ["Busca mejorar síntomas, movimiento, fuerza y tolerancia, no garantizar una curva distinta en imagen. Registra dolor, sueño, entumecimiento, respuesta 24 h y tolerancia laboral.", "Si un ejercicio manda síntomas más lejos, empeora al día siguiente o cambia la fuerza, la dosis no encaja."]],
          ["Límites de herramientas de tratamiento", ["Tracción, almohadas, masaje y terapia manual pueden aliviar a corto plazo, pero no deben prometer realineación ni restauración de curva.", "Signos medulares, trauma, debilidad progresiva, fiebre o cáncer requieren evaluación antes de más autocuidado."]]
        ]
      }
    }
  },
  {
    slug: "loss-of-cervical-lordosis",
    sources: [sources.lordosisReview, sources.neckPainGuideline, sources.radiculopathy],
    related: [
      "cervical-kyphosis-vs-loss-lordosis",
      "mri-disc-bulge-stenosis-osteophyte",
      "office-neck-curve-ergonomics",
      "pillow-height-sleep-position"
    ],
    translations: {
      zh: {
        kicker: "Pillar 页面",
        title: "颈椎生理曲度变直：含义、症状和保守处理",
        description:
          "解释颈椎生理曲度变直、loss of cervical lordosis、直颈和相关症状的保守判断，不夸大影像词。",
        intro: ["颈椎生理曲度变直常见于影像报告，但它不是一个自动等于疼痛或严重疾病的结论。", "这页帮助读者把报告词、症状、日常负荷和检查选择放在一起理解。"],
        sections: [
          ["报告词不等于疼痛来源", ["曲度变直可以和疼痛、肌肉保护、姿势、拍片位置或退变同时出现。研究并不支持把每个颈痛都简单归因于 lordosis 变少。"]],
          ["什么时候更值得重视", ["当曲度词伴随手臂放射痛、手麻、无力、手变笨或走路变化时，重点应转向神经系统评估，而不是只纠正姿势。"]],
          ["保守处理从负荷开始", ["减少长时间同一姿势、改善睡眠和工作环境、建立上背和肩胛力量，比反复追求一个完美颈椎角度更实用。"]],
          ["如何跟踪变化", ["用 7 天记录表追踪疼痛、睡眠、手麻、工作耐受和运动后反应。影像复查是否需要，应由症状和医生判断决定。"]]
        ]
      },
      en: {
        kicker: "Pillar guide",
        title: "Loss of Cervical Lordosis: Meaning, Symptoms, and Conservative Care",
        description:
          "A conservative guide to loss of cervical lordosis, straight neck, report language, symptoms, and what to track before assuming the curve is the problem.",
        intro: ["Loss of cervical lordosis is common report language, but it does not automatically mean the curve is the cause of pain or that the neck is structurally failing.", "This page helps readers connect report wording with symptoms, daily exposure, testing decisions, and conservative care. High-quality search traffic for this topic usually wants reassurance plus clear safety boundaries."],
        sections: [
          ["Report language is not the pain source by itself", ["Straightening can appear with pain guarding, muscle tone, positioning, or degenerative findings. Research does not support blaming every neck-pain episode on a smaller lordosis alone.", "A useful report interpretation asks whether the finding matches symptoms, exam, and function. If it does not, the curve term may be background context rather than the main driver."]],
          ["When the finding deserves more attention", ["The priority changes when straightening appears with radiating arm pain, finger numbness, weakness, hand clumsiness, or walking changes. At that point, the question is nerve root or cord involvement, not cosmetic posture correction.", "Significant trauma, fever, cancer history, or progressive neurological findings should shift the plan to prompt medical assessment."]],
          ["Conservative care starts with load", ["Reduce long uninterrupted exposure to the same position, improve sleep setup, build upper-back and shoulder-blade capacity, and use gentle motion. The goal is a neck that tolerates life better, not a forced angle.", "Strength training, desk changes, and pillow changes should be judged by symptoms over 24 hours rather than by marketing claims about restoring lordosis."]],
          ["How to track progress", ["Use a weekly tracker for pain, sleep, numbness, work tolerance, and post-exercise response. Repeating imaging is a clinical decision, not a routine measure of whether rehab is working.", "Meaningful improvement often looks like fewer symptom flares, better sleep, more stable hand symptoms, and higher tolerance for desk work or sport."]]
        ]
      },
      ja: {
        kicker: "Pillar ガイド",
        title: "頸椎前弯減少：意味、症状、保存的ケア",
        description:
          "頸椎前弯減少やストレートネックの報告語を、症状と負荷管理の視点から保守的に整理します。",
        intro: ["頸椎前弯減少は画像でよく見られる言葉ですが、それだけで痛みの原因や重症度を決めるものではありません。", "報告語、症状、生活負荷、検査判断をつなげて考えます。"],
        sections: [
          ["報告語だけで痛みの原因にしない", ["ストレートは痛みの防御、筋緊張、撮影姿勢、変性所見と一緒に見えることがあります。"]],
          ["注意が必要な時", ["腕痛、指のしびれ、筋力低下、手の不器用さ、歩行変化があれば神経評価を優先します。"]],
          ["保存的ケアは負荷から", ["同じ姿勢の連続を減らし、睡眠、作業環境、上背部と肩甲骨の能力を改善します。"]],
          ["進歩の見方", ["痛み、睡眠、しびれ、仕事耐性、運動後反応を記録します。画像再検査は医療判断です。"]]
        ]
      },
      es: {
        kicker: "Guía pilar",
        title: "Pérdida de lordosis cervical: significado, síntomas y cuidado conservador",
        description:
          "Guía prudente sobre pérdida de lordosis cervical, cuello rectificado, lenguaje de informe, síntomas y seguimiento conservador.",
        intro: ["La pérdida de lordosis cervical es un término frecuente en informes, pero no significa automáticamente que la curva cause el dolor.", "Esta página conecta el informe con síntomas, exposición diaria, pruebas y cuidado conservador."],
        sections: [
          ["El informe no es la fuente de dolor por sí solo", ["La rectificación puede aparecer con protección por dolor, tono muscular, posición o degeneración. No todo dolor cervical se explica por menos lordosis."]],
          ["Cuándo merece más atención", ["Dolor al brazo, dedos dormidos, debilidad, torpeza de mano o cambios de marcha cambian la prioridad hacia raíz o médula."]],
          ["El cuidado conservador empieza por carga", ["Reduce exposición prolongada a la misma postura, mejora sueño y ergonomía, y construye capacidad de espalda alta y escápulas."]],
          ["Cómo seguir progreso", ["Registra dolor, sueño, entumecimiento, tolerancia laboral y respuesta tras ejercicio. Repetir imagen depende del criterio clínico."]]
        ]
      }
    }
  },
  {
    slug: "cervical-radiculopathy",
    sources: [sources.radiculopathy, sources.ncbiRadiculopathy, sources.neckPainGuideline],
    related: [
      "finger-numbness-nerve-map",
      "c5-c8-nerve-root-symptoms",
      "cervical-radiculopathy-myelopathy-red-flags",
      "cervical-traction-contraindications"
    ],
    translations: {
      zh: {
        kicker: "Pillar 页面",
        title: "颈椎神经根病：手臂痛、手麻、检查和保守康复",
        description:
          "总览颈椎神经根病的常见症状、C5-C8 线索、危险信号、检查选择和保守处理边界。",
        intro: ["颈椎神经根病通常指颈部神经根受刺激或受压，症状可能从颈部、肩胛区一路放射到手臂和手指。", "这页强调保守、分层的判断：先排除危险信号，再看症状分布、力量、反射、诱因和 24 小时反应。"],
        sections: [
          ["常见症状", ["典型表现包括颈痛、肩胛区痛、手臂放射痛、刺麻、感觉变化、反射或力量改变。不同神经根分布会重叠。"]],
          ["手指麻木怎么理解", ["拇指/食指可能提示 C6 或正中神经，中指可能提示 C7，小指/无名指可能提示 C8 或尺神经。手指分布只是线索。"]],
          ["检查和就医", ["进行性无力、手变笨、走路不稳或大小便异常优先就医。MRI 和肌电/神经传导回答的问题不同，应结合医生判断。"]],
          ["保守康复边界", ["轻度稳定症状可以从教育、活动调整、温和活动、力量和神经滑动开始。症状扩散、力量下降或第二天明显更差时应降量或评估。"]]
        ]
      },
      en: {
        kicker: "Pillar guide",
        title: "Cervical Radiculopathy: Arm Pain, Finger Numbness, Testing, and Conservative Rehab",
        description:
          "A source-backed overview of cervical radiculopathy: symptoms, C5-C8 clues, red flags, testing choices, and conservative rehab boundaries.",
        intro: ["Cervical radiculopathy usually means a cervical nerve root is irritated or compressed, with symptoms that may travel from the neck or shoulder blade into the arm and fingers. It can feel like sharp arm pain, tingling, numbness, burning, weakness, or a hard-to-place ache around the shoulder blade.", "This page gives a conservative triage framework: screen red flags first, then organize distribution, strength, reflexes, triggers, imaging context, and 24-hour response. It is educational, not a diagnosis or a replacement for a neurological exam."],
        sections: [
          ["What cervical radiculopathy means", ["A cervical nerve root leaves the spinal canal and helps supply sensation and strength to parts of the shoulder, arm, forearm, and hand. Radiculopathy means that root is irritated, inflamed, or compressed enough to create symptoms along its pathway.", "Common structural contributors include disc herniation, foraminal narrowing, degenerative changes, bone spurs, inflammation, or trauma. But a structural finding on MRI is not the same as a confirmed pain source. The finding matters most when it matches the side, symptom path, neurological exam, and timing."]],
          ["Common symptoms", ["Typical symptoms include neck pain, shoulder-blade pain, radiating arm pain, tingling, sensory change, reflex change, or weakness. Some people have more arm pain than neck pain. Others feel mostly hand numbness or a deep ache near the shoulder blade.", "The symptom map is helpful, but it is not a diagnosis by itself. Carpal tunnel, ulnar nerve irritation, radial sensory nerve irritation, shoulder problems, thoracic outlet patterns, and systemic medical issues can overlap with a neck-root pattern."]],
          ["Red flags come before exercise", ["Progressive weakness, hand clumsiness, walking imbalance, bowel or bladder changes, symptoms after significant trauma, fever, cancer history, or rapidly spreading numbness should be checked promptly. These are not situations for testing more stretches or pushing through a program.", "Possible spinal cord involvement deserves special caution. Clumsier hands, trouble buttoning, handwriting changes, balance changes, or symptoms in both hands and feet should raise concern beyond a single irritated nerve root."]],
          ["How to read finger numbness", ["Thumb and index symptoms can fit C6 or median nerve patterns; middle-finger symptoms can fit C7; ring and little-finger symptoms can fit C8 or the ulnar nerve. Distribution is only one clue, because nerve territories overlap and individual patterns vary.", "A stronger pattern combines finger area with neck movements, wrist or elbow positions, grip change, reflexes, and whether symptoms travel below the elbow. If wrist posture, elbow pressure, cycling, keyboard use, or night positioning reproduces symptoms, peripheral nerve loading needs to stay in the differential."]],
          ["C5 to C8 clues", ["C5 patterns may involve shoulder region pain or weakness with shoulder abduction. C6 patterns are often discussed around the thumb/index side and may include biceps or wrist-extension changes. C7 can involve the middle-finger region and triceps changes. C8 can involve the ring/little-finger side, grip, or finger-flexion weakness.", "These clues are useful for organizing the exam, not for self-diagnosis. The same finger area can be influenced by different structures. A clinician may compare reflexes, strength, sensation, and provocation tests on both sides to see whether the pattern is consistent."]],
          ["Testing and when it is useful", ["MRI can show disc herniation, foraminal narrowing, stenosis, spinal cord context, and other structural findings. It is often useful when symptoms are severe, persistent, progressive, trauma-related, or paired with neurological deficits. But MRI can also show findings that are not the current symptom source.", "EMG and nerve conduction studies answer a different question: how nerves and muscles are functioning electrically. They may be useful when the diagnosis is unclear, weakness is present, symptoms are persistent, or the question is neck root versus peripheral nerve entrapment. The timing and choice of tests should follow the clinical picture."]],
          ["What conservative care usually tries first", ["Stable, non-emergency symptoms often start with education, activity modification, gentle motion, strengthening, and carefully dosed nerve mobility. The goal is calmer symptoms, better sleep, steadier arm symptoms, improved function, and more tolerance for work and sport.", "A conservative plan should reduce threat and improve capacity. It may include modifying aggravating positions, reducing long static postures, improving thoracic and shoulder-blade capacity, gradually rebuilding neck tolerance, and using nerve glides only when they do not worsen symptoms."]],
          ["Nerve glides are not aggressive stretches", ["Nerve mobility drills are often misunderstood. The goal is usually gentle sliding, not yanking on an irritated nerve. A good dose should feel easy or mildly familiar and should not make symptoms sharper, farther down the arm, or worse the next day.", "If a nerve glide increases numbness, reduces grip, worsens sleep, or creates a longer flare, stop and reduce the dose or seek guidance. More tension is not more therapeutic when the nervous system is irritated."]],
          ["What recovery can look like", ["Radiculopathy recovery is rarely a perfectly straight line. Pain may calm before numbness, sleep may improve before strength feels normal, and symptoms may fluctuate with work, driving, training, or stress. A temporary flare after a clear exposure is different from progressive neurological loss.", "Useful progress looks like fewer arm-pain episodes, symptoms that centralize or become less intense, better sleep, less medication reliance when medically appropriate, more stable grip, and better tolerance for ordinary tasks. If the only metric is whether the MRI looks better, many meaningful functional gains will be missed."]],
          ["Work and sport modifications", ["Desk work may need shorter uninterrupted blocks, better arm support, screen height changes, and breaks before symptoms travel into the hand. Driving may need mirror adjustments, rest stops, and attention to whether rotation or vibration changes arm symptoms. Lifting may need lower loads, supported positions, and less overhead or heavy bracing until symptoms are stable.", "Sport should follow the same 24-hour response logic used elsewhere on the site. Do not progress speed, impact, volume, and technical difficulty at the same time. If a session causes spreading numbness, grip change, or worse sleep that night, the next exposure should be reduced or postponed."]],
          ["How to track progress", ["Track pain location, arm path, finger numbness area, weakness, sleep, work exposure, exercise dose, and next-day response. Also record what helps: hand-on-head position, wrist neutral, elbow straight, rest breaks, or changing neck posture. Relief patterns can be useful clinical clues.", "Meaningful improvement may look like fewer arm-pain episodes, numbness that no longer spreads, better sleep, more stable grip, and higher tolerance for desk work or sport. Repeat imaging is not usually the daily measure of progress; function and neurological stability matter more."]],
          ["Questions to bring to an appointment", ["Ask which nerve level or peripheral nerve pattern best fits the exam, what signs would make the problem urgent, whether imaging is needed now or only if symptoms persist, and whether EMG/NCS would change management. Ask what activities are safe to continue, what symptoms should stop exercise, and what timeline should trigger follow-up.", "Good questions prevent two common errors: ignoring progressive neurological signs because the pain is tolerable, or stopping all activity because the report sounds frightening. The aim is a plan that matches risk, not fear."]],
          ["When conservative care is not enough", ["If symptoms spread, strength changes, coordination worsens, walking changes appear, or the next day is clearly worse after small exposures, reduce the dose and consider evaluation. Do not use online exercise to push through worsening neurological signs.", "Some cases need medication guidance, physical therapy, injections, surgical opinion, or urgent evaluation depending on severity and progression. Seeking care is not a failure of conservative rehab; it is part of matching the plan to the risk level."]],
          ["Practical next step", ["If symptoms are mild and stable, create a seven-day baseline before changing several variables. Record neck position, arm symptoms, finger area, sleep, work exposures, training, and next-day response. Then change one variable at a time so the result is readable.", "If symptoms are new, progressive, traumatic, bilateral, or paired with weakness or clumsiness, skip the experiment and get assessed. Bring the symptom record, prior imaging reports, medication list, and specific examples of tasks that changed, such as grip, typing, lifting, or sport tolerance."]]
        ]
      },
      ja: {
        kicker: "Pillar ガイド",
        title: "頸椎神経根症：腕痛、指のしびれ、検査、保存的リハビリ",
        description:
          "頸椎神経根症の症状、C5-C8の手がかり、危険サイン、検査、保存的ケアの境界を整理します。",
        intro: ["頸椎神経根症は神経根の刺激や圧迫で、首や肩甲部から腕、指へ症状が広がることがあります。", "危険サインを先に確認し、分布、筋力、反射、誘因、24時間反応を整理します。"],
        sections: [
          ["よくある症状", ["首痛、肩甲部痛、腕へ走る痛み、しびれ、感覚変化、反射や筋力変化が見られます。"]],
          ["指のしびれの読み方", ["親指/人差し指はC6または正中神経、中指はC7、小指/薬指はC8または尺骨神経の手がかりになり得ます。"]],
          ["検査と受診", ["進行性筋力低下、手の不器用さ、歩行変化、排尿排便異常は早めに相談します。MRIと筋電図は異なる質問に答えます。"]],
          ["保存的リハビリの境界", ["安定した非緊急症状では教育、活動調整、軽い運動、筋力、神経モビリティから始めます。悪化時は量を下げます。"]]
        ]
      },
      es: {
        kicker: "Guía pilar",
        title: "Radiculopatía cervical: dolor de brazo, dedos dormidos, pruebas y rehabilitación",
        description:
          "Resumen de radiculopatía cervical: síntomas, pistas C5-C8, alarmas, pruebas y límites de rehabilitación conservadora.",
        intro: ["La radiculopatía cervical suele implicar irritación o compresión de una raíz nerviosa, con síntomas que pueden viajar del cuello o escápula al brazo y dedos.", "Primero se descartan alarmas; luego se ordenan distribución, fuerza, reflejos, desencadenantes y respuesta de 24 horas."],
        sections: [
          ["Síntomas frecuentes", ["Dolor de cuello, dolor escapular, dolor irradiado al brazo, hormigueo, cambios sensitivos, reflejos o fuerza pueden aparecer."]],
          ["Cómo leer dedos dormidos", ["Pulgar e índice pueden encajar con C6 o mediano; dedo medio con C7; anular y meñique con C8 o cubital. Es solo una pista."]],
          ["Pruebas y cuándo buscar atención", ["Debilidad progresiva, torpeza de mano, cambios de marcha o síntomas urinarios/intestinales requieren valoración. MRI y EMG/NCS responden preguntas distintas."]],
          ["Límites de rehabilitación conservadora", ["Síntomas estables no urgentes pueden empezar con educación, modificación de actividad, movimiento suave, fuerza y movilidad neural dosificada. Si se extienden o empeoran, baja dosis y evalúa."]]
        ]
      }
    }
  }
];

const visuals = [
  {
    slug: "cervical-curve-diagram",
    file: "cervical-curve-diagram.svg",
    related: "cervical-curve",
    labels: {
      zh: ["颈椎曲度图解", "原创图解对比正常前凸、颈椎曲度变直和反弓/后凸，帮助读者先理解报告词，再结合症状、功能和检查线索判断下一步。"],
      en: ["Normal cervical curve diagram", "Original visual comparing normal cervical curvature, a straightened cervical curve, loss of normal cervical lordosis, and reversed or kyphotic alignment so readers can interpret report language with symptoms."],
      ja: ["頸椎カーブ図", "通常の前弯、前弯減少、逆カーブ/後弯を比較するオリジナル図です。画像用語を症状や機能と合わせて読むための入口になります。"],
      es: ["Diagrama de curva cervical", "Visual original que compara lordosis habitual, curva rectificada e invertida/cifótica para leer el informe junto con síntomas y función."]
    }
  },
  {
    slug: "c6-c7-c8-finger-numbness-map",
    file: "c6-c7-c8-finger-numbness-map.svg",
    related: "cervical-radiculopathy",
    labels: {
      zh: ["C6 C7 C8 手指麻木地图", "原创手指麻木分布图，整理 C6、C7、C8 神经根与腕管、尺神经等常见重叠线索，强调它只适合记录和讨论，不能自我诊断。"],
      en: ["C6 C7 C8 finger numbness map", "Original finger numbness map showing overlapping C6, C7, C8, carpal tunnel, and ulnar-nerve clues for cervical radiculopathy discussions. Use it for discussion, not self-diagnosis."],
      ja: ["C6 C7 C8 指のしびれマップ", "C6、C7、C8神経根と手根管、尺骨神経などの重なりを整理するオリジナル図です。自己診断ではなく相談の材料です。"],
      es: ["Mapa C6 C7 C8 de dedos dormidos", "Mapa original de dedos dormidos que muestra solapamientos entre C6, C7, C8, túnel carpiano y nervio cubital; no es autodiagnóstico."]
    }
  },
  {
    slug: "24-hour-neck-symptom-response-chart",
    file: "24-hour-neck-symptom-response-chart.svg",
    related: "loss-of-cervical-lordosis",
    labels: {
      zh: ["24 小时颈部症状反应图", "原创运动后反应决策图，把疼痛、手麻扩散、无力和第二天反应放在一起，用于判断继续、降量或停止并就医。"],
      en: ["24-hour neck symptom response chart", "Original post-exercise response chart combining pain, spreading numbness, weakness, and next-day response to choose progress, deload, or care."],
      ja: ["24時間首症状反応チャート", "運動後の痛み、しびれの拡大、筋力低下、翌日反応を合わせ、進行、減量、中止と相談を判断するための図です。"],
      es: ["Gráfico de respuesta cervical 24 h", "Gráfico original que combina dolor, entumecimiento que se extiende, debilidad y respuesta al día siguiente para decidir progresar, descargar o consultar."]
    }
  }
];

const printableRoute = "printable-neck-symptom-tracker";

const specialPageMeta = {
  tools: {
    zh: ["工具和原创图解", "手麻地图、颈椎曲度图解和 24 小时反应记录器", "使用原创神经分布图、颈椎曲度图解和 24 小时反应记录器，整理手麻、颈痛、运动后反应和就医前要记录的线索。"],
    en: ["Tools and original visuals", "Nerve maps, normal cervical curve diagrams, and a 24-hour response tracker", "Use original nerve maps, normal cervical curvature diagrams, and a 24-hour response tracker to organize numbness, neck pain, exercise response, and appointment notes."],
    ja: ["ツールと図解", "しびれマップ、頸椎カーブ図、24時間反応記録", "オリジナルの神経マップ、頸椎カーブ図、24時間反応記録で、しびれ、首痛、運動後反応、受診前メモを整理します。"],
    es: ["Herramientas y visuales", "Mapas nerviosos, diagramas y registro 24 h", "Usa mapas nerviosos, diagramas de curva cervical y un registro de 24 horas para ordenar entumecimiento, dolor cervical y respuesta al ejercicio."]
  },
  videos: {
    zh: ["参考视频索引", "颈椎练习视频参考：神经滑动、力量和运动", "按神经滑动、颈部控制、肩胛力量、胸椎伸展和运动场景整理 YouTube 参考视频；先读站内说明，再看动作画面。"],
    en: ["Reference video index", "Neck exercise video references: nerve glides, strength, and sport", "Curated YouTube references for nerve glides, neck control, scapular strength, thoracic extension, and sport contexts after the on-site guidance."],
    ja: ["参考動画インデックス", "首の運動動画参考：神経グライド、筋力、スポーツ", "神経グライド、首の制御、肩甲骨強化、胸椎伸展、スポーツ別のYouTube参考動画を、本文の後に使えるよう整理します。"],
    es: ["Índice de videos de referencia", "Videos de ejercicios cervicales: nervios, fuerza y deporte", "Videos de YouTube organizados para deslizamientos neurales, control cervical, fuerza escapular, extensión torácica y deporte tras leer la guía."]
  },
  [printableRoute]: {
    zh: ["可打印记录表", "7 天颈痛和手麻记录表", "打印或保存这张 7 天记录表，用同一标准记录疼痛、手麻、睡眠、诱因、练习、训练量和第二天症状反应。"],
    en: ["Printable tracker", "7-Day Neck Pain and Numbness Tracker", "Print or save this 7-day tracker to record pain, numbness, sleep, triggers, exercises, training load, and next-day symptom response consistently."],
    ja: ["印刷用記録表", "7日間の首痛・しびれ記録表", "痛み、しびれ、睡眠、誘因、運動、運動量、翌日反応を同じ基準で記録するための7日間表です。"],
    es: ["Registro imprimible", "Registro de 7 días de cuello y entumecimiento", "Imprime o guarda este registro de 7 días para anotar dolor, entumecimiento, sueño, desencadenantes, ejercicios, carga y respuesta al día siguiente."]
  }
};

const categoryFaqs = {
  symptoms: {
    zh: [
      ["手指麻木能直接判断是哪一节颈椎吗？", "不能。手指分布只是线索，C6、C7、C8 和腕管、尺神经、胸廓出口等问题会重叠，需要结合诱因、体征和必要检查。"],
      ["什么时候手麻不能继续观察？", "新出现或加重的无力、麻木扩散、手变笨、走路不稳、大小便异常或外伤后症状，应尽快就医。"]
    ],
    en: [
      ["Can finger numbness identify the exact neck level?", "No. Finger maps are clues only; C6, C7, C8, carpal tunnel, ulnar nerve, and thoracic outlet patterns can overlap."],
      ["When should numbness not be watched at home?", "New or worsening weakness, spreading numbness, hand clumsiness, walking change, bowel/bladder symptoms, or symptoms after trauma need prompt care."]
    ],
    ja: [
      ["指のしびれだけで首のレベルは分かりますか？", "分かりません。指の分布は手がかりで、C6、C7、C8、手根管、尺骨神経、胸郭出口の症状は重なります。"],
      ["しびれを様子見しない方がよい時は？", "新しい筋力低下、しびれの拡大、手の不器用さ、歩行変化、排尿排便異常、外傷後の症状は早めに相談します。"]
    ],
    es: [
      ["¿Los dedos dormidos identifican el nivel cervical exacto?", "No. El mapa de dedos solo da pistas; C6, C7, C8, túnel carpiano, nervio cubital y salida torácica pueden solaparse."],
      ["¿Cuándo no conviene observar el entumecimiento en casa?", "Debilidad nueva o progresiva, entumecimiento que se extiende, torpeza de mano, cambios de marcha, síntomas urinarios/intestinales o trauma requieren atención."]
    ]
  },
  diagnosis: {
    zh: [
      ["MRI 或 X 光报告写得严重，就一定是疼痛来源吗？", "不一定。影像词描述结构，是否重要要看症状侧别、神经体征、功能变化和检查结果是否一致。"],
      ["曲度变直和颈椎反弓是一回事吗？", "不完全一样。曲度变直通常指前凸减少，反弓/后凸指曲线方向改变，但都不能单独诊断疼痛来源。"]
    ],
    en: [
      ["Does a severe-sounding MRI or X-ray report prove the pain source?", "Not by itself. Imaging words describe structure; clinical relevance depends on symptoms, side, neurological signs, function, and exam agreement."],
      ["Are straightening and cervical kyphosis the same thing?", "Not exactly. Straightening usually means reduced lordosis, while kyphosis or reversal means a directional curve change. Neither alone diagnoses pain."]
    ],
    ja: [
      ["MRIやX線の言葉が強ければ痛みの原因ですか？", "それだけでは決まりません。画像は構造を説明し、症状側、神経所見、機能、診察との一致で意味が変わります。"],
      ["ストレートネックと頸椎後弯は同じですか？", "完全には同じではありません。ストレートは前弯減少、後弯や逆カーブは方向変化を指しますが、単独で痛みを診断しません。"]
    ],
    es: [
      ["¿Un informe de MRI o radiografía serio prueba la causa del dolor?", "No por sí solo. La imagen describe estructura; importa si coincide con síntomas, lado, signos neurológicos, función y exploración."],
      ["¿Rectificación y cifosis cervical son lo mismo?", "No exactamente. Rectificación suele ser menor lordosis; cifosis o curva invertida implica cambio de dirección. Ninguna diagnostica dolor por sí sola."]
    ]
  },
  exercises: {
    zh: [
      ["练习目标是把曲度练回来吗？", "本站不承诺练习能恢复曲度。更可靠的目标是疼痛、手麻、睡眠、活动度、力量和运动耐受改善。"],
      ["练习后第二天更麻怎么办？", "先降量或停止该动作，记录诱因和反应；如果麻木扩散、无力或功能变差，应就医评估。"]
    ],
    en: [
      ["Is the exercise goal to restore the curve?", "This site does not promise curve restoration. More useful goals are pain, numbness, sleep, motion, strength, and activity tolerance."],
      ["What if numbness is worse the next day?", "Reduce or stop that drill, record the response, and seek care if numbness spreads, weakness appears, or function worsens."]
    ],
    ja: [
      ["運動の目的はカーブを戻すことですか？", "このサイトはカーブ回復を約束しません。痛み、しびれ、睡眠、可動域、筋力、活動耐性を目標にします。"],
      ["翌日にしびれが強くなったら？", "その運動を減らすか中止し、反応を記録します。しびれ拡大、筋力低下、機能低下があれば相談してください。"]
    ],
    es: [
      ["¿El objetivo del ejercicio es restaurar la curva?", "Este sitio no promete restaurar la curva. Objetivos más útiles son dolor, entumecimiento, sueño, movimiento, fuerza y tolerancia."],
      ["¿Qué hago si al día siguiente hay más entumecimiento?", "Reduce o detén ese ejercicio, registra la respuesta y consulta si se extiende, aparece debilidad o empeora la función."]
    ]
  },
  treatments: {
    zh: [
      ["牵引、枕头或按摩能把颈椎复位吗？", "不能这样承诺。它们可能短期改变症状或舒适度，但不等于结构复位或曲度恢复。"],
      ["做完手法后头晕或手麻加重要怎么办？", "不要反复尝试同一手法，应停止并尽快就医评估，尤其伴随无力、走路不稳或明显头痛时。"]
    ],
    en: [
      ["Can traction, pillows, or massage realign the neck?", "They should not promise realignment. They may change comfort or symptoms short term, but that does not prove structural correction."],
      ["What if dizziness or numbness worsens after manual treatment?", "Do not keep repeating it. Stop and seek assessment, especially with weakness, gait change, or significant headache."]
    ],
    ja: [
      ["牽引、枕、マッサージで首は整復されますか？", "整復を約束するものではありません。短期的な楽さはあり得ますが、構造が直った証明ではありません。"],
      ["手技後にめまいやしびれが悪化したら？", "同じ手技を繰り返さず中止し、筋力低下、歩行変化、強い頭痛を伴う場合は早めに相談します。"]
    ],
    es: [
      ["¿Tracción, almohadas o masaje realinean el cuello?", "No deberían prometer realineación. Pueden cambiar comodidad o síntomas a corto plazo, pero no prueban corrección estructural."],
      ["¿Y si mareo o entumecimiento empeoran tras manipulación?", "No lo repitas. Para y busca valoración, sobre todo con debilidad, cambio al caminar o dolor de cabeza importante."]
    ]
  },
  sports: {
    zh: [
      ["有颈椎反弓还能运动吗？", "很多人可以运动，但要看神经症状、外伤风险、训练量和 24 小时反应，而不是只看报告词。"],
      ["运动后怎么判断要不要降量？", "如果疼痛明显上升、手麻扩散、睡眠变差或第二天功能下降，下一次先减少时长、强度或颈部后仰暴露。"]
    ],
    en: [
      ["Can I still play sports with cervical kyphosis?", "Many people can, but decisions should consider nerve symptoms, trauma risk, dose, and 24-hour response, not report language alone."],
      ["How do I decide when to deload?", "If pain rises, numbness spreads, sleep worsens, or function drops the next day, reduce duration, intensity, or neck-extension exposure."]
    ],
    ja: [
      ["頸椎後弯でもスポーツはできますか？", "多くの人は可能ですが、画像用語だけでなく神経症状、外傷リスク、量、24時間反応で判断します。"],
      ["運動量を下げる基準は？", "痛み上昇、しびれ拡大、睡眠悪化、翌日の機能低下があれば、時間、強度、首の伸展暴露を下げます。"]
    ],
    es: [
      ["¿Puedo hacer deporte con cifosis cervical?", "Muchas personas pueden, pero decide por síntomas nerviosos, riesgo de trauma, dosis y respuesta de 24 horas, no solo por el informe."],
      ["¿Cuándo conviene descargar?", "Si sube el dolor, se extiende el entumecimiento, empeora el sueño o baja la función al día siguiente, reduce duración, intensidad o extensión cervical."]
    ]
  }
};

const seoTitleRewrites = {
  "Cervical Kyphosis vs Loss of Cervical Lordosis: What the Report Means": "Cervical Kyphosis vs Loss of Lordosis",
  "Can You Surf, Ski, Snowboard, or Climb with Cervical Kyphosis?": "Sports with Cervical Kyphosis: Surf, Snow, Climb",
  "Can Cervical Curve Be Restored? What Conservative Rehab Should Track": "Can Cervical Curve Be Restored?",
  "Traction, Pillows, Massage, and Manipulation: Conservative Care Boundaries": "Traction, Pillows, Massage: Safety Boundaries",
  "Finger Numbness Map: Cervical Nerve Root or Peripheral Nerve?": "Finger Numbness Map: Neck or Peripheral Nerve?",
  "Conservative boundaries for traction, pillows, massage, and manipulation": "Traction, Pillows, Massage: Boundaries",
  "When should cervical kyphosis be checked by orthopedics, neurology, or rehab?": "When to See a Doctor for Cervical Kyphosis",
  "Pillow height and sleep position for cervical kyphosis or straight neck": "Pillow Height for Cervical Kyphosis",
  "Cervical Kyphosis: Report Meaning, Symptoms, Rehab, and Safety Boundaries": "Cervical Kyphosis: Symptoms, Rehab, Safety",
  "Cervical Radiculopathy: Arm Pain, Finger Numbness, Testing, and Conservative Rehab": "Cervical Radiculopathy: Arm Pain and Numbness",
  "Cifosis cervical vs pérdida de lordosis: qué significa el informe": "Cifosis vs pérdida de lordosis cervical",
  "¿Puedes surfear, esquiar, hacer snowboard o escalar con cifosis cervical?": "Deporte con cifosis cervical: surf, nieve y escalada",
  "¿Se puede recuperar la curva cervical? Qué debería medir la rehabilitación": "¿Se puede recuperar la curva cervical?",
  "Tracción, almohadas, masaje y manipulación: límites del cuidado conservador": "Tracción, almohadas y manipulación cervical",
  "Mapa de dedos dormidos: raíz cervical o nervio periférico": "Dedos dormidos: raíz cervical o nervio periférico",
  "Radiculopatía cervical y mielopatía: señales de alarma": "Radiculopatía y mielopatía: alarmas",
  "Cifosis cervical: informe, síntomas, rehabilitación y límites de seguridad": "Cifosis cervical: síntomas, rehab y seguridad",
  "Radiculopatía cervical: dolor de brazo, dedos dormidos, pruebas y rehabilitación": "Radiculopatía cervical: dolor y dedos dormidos",
  "Pérdida de lordosis cervical: significado, síntomas y cuidado conservador": "Pérdida de lordosis cervical: significado y cuidado",
  "Guía de Curva Cervical | Rehabilitación conservadora para cifosis cervical": "Guía de Curva Cervical"
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeXml(value) {
  return escapeHtml(value).replace(/'/g, "&apos;");
}

function localizedPath(lang, route) {
  const prefix = languages[lang].prefix;
  return `${prefix}/${route}/`.replace(/\/+/g, "/");
}

function localizedUrl(lang, route) {
  return `${baseUrl}${localizedPath(lang, route)}`;
}

function articlePath(lang, slug) {
  const prefix = languages[lang].prefix;
  return `${prefix}/articles/${slug}/`.replace(/\/+/g, "/");
}

function articleUrl(lang, slug) {
  return `${baseUrl}${articlePath(lang, slug)}`;
}

function outputLocalized(lang, route) {
  const prefix = languages[lang].prefix.replace(/^\//, "");
  return join(prefix, route, "index.html");
}

function outputArticle(lang, slug) {
  const prefix = languages[lang].prefix.replace(/^\//, "");
  return join(prefix, "articles", slug, "index.html");
}

function pathToOutputFile(path) {
  if (path === "/") return "index.html";
  return `${path.replace(/^\//, "")}index.html`;
}

function ogAssetId(lang, path) {
  let assetPath = path;
  if (lang === "en" && !assetPath.startsWith("/en/")) {
    assetPath = assetPath === "/" ? "/en/" : `/en${assetPath}`;
  }
  if (lang === "zh" && assetPath.startsWith("/zh/")) {
    assetPath = assetPath.replace(/^\/zh(?=\/|$)/, "") || "/";
  }
  const normalized = assetPath === "/" ? "home" : assetPath.replace(/^\/|\/$/g, "").replace(/\//g, "-");
  return `${lang}-${normalized}`.replace(/[^a-z0-9-]/gi, "-").replace(/-+/g, "-").toLowerCase();
}

function ogAssetPath(lang, path, ext = "png") {
  return `/assets/og/${ogAssetId(lang, path)}.${ext}`;
}

function publicPathForPage(lang, route, articleSlug) {
  if (articleSlug) return articlePath(lang, articleSlug);
  return localizedPath(lang, route);
}

function ogImageUrl(lang, route, articleSlug) {
  return `${baseUrl}${ogAssetPath(lang, publicPathForPage(lang, route, articleSlug))}`;
}

function titleTag(title) {
  const compact = seoTitleRewrites[title] || title;
  const withBrand = `${compact} | Cervical Curve Guide`;
  return withBrand.length <= 68 ? withBrand : compact;
}

function pageFaqs(lang, category) {
  return [...(categoryFaqs[category]?.[lang] || []), ...(extraFaqs[lang] || []).slice(0, 1)].slice(0, 3);
}

function renderFaqSection(lang, faqs) {
  if (!faqs?.length) return "";
  const heading = { zh: "常见问题", en: "FAQ", ja: "よくある質問", es: "Preguntas frecuentes" }[lang];
  return `<section class="article-section">
          <h2>${escapeHtml(heading)}</h2>
          <div class="faq-list">
            ${faqs
              .map(([question, answer]) => `<details class="faq-item"><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
              .join("\n")}
          </div>
        </section>`;
}

function utilityCardsForCategory(lang, category) {
  const l = languages[lang];
  const tractionCard = existingArticles.find((item) => item.slug === "traction-pillow-manipulation-risk-guide");
  const cards = {
    symptoms: [
      {
        tag: l.nav.tools,
        title: visuals[1].labels[lang][0],
        body: visuals[1].labels[lang][1],
        url: localizedPath(lang, `images/${visuals[1].slug}`)
      },
      {
        tag: { zh: "记录表", en: "Tracker", ja: "記録表", es: "Registro" }[lang],
        title: specialPageMeta[printableRoute][lang][1],
        body: specialPageMeta[printableRoute][lang][2],
        url: localizedPath(lang, printableRoute)
      }
    ],
    diagnosis: [
      {
        tag: l.nav.tools,
        title: visuals[0].labels[lang][0],
        body: visuals[0].labels[lang][1],
        url: localizedPath(lang, `images/${visuals[0].slug}`)
      },
      {
        tag: l.nav.diagnosis,
        title: hubs.diagnosis.meta[lang][1],
        body: hubs.diagnosis.meta[lang][2],
        url: localizedPath(lang, "diagnosis")
      }
    ],
    exercises: [
      {
        tag: l.nav.tools,
        title: visuals[2].labels[lang][0],
        body: visuals[2].labels[lang][1],
        url: localizedPath(lang, `images/${visuals[2].slug}`)
      },
      {
        tag: { zh: "记录表", en: "Tracker", ja: "記録表", es: "Registro" }[lang],
        title: specialPageMeta[printableRoute][lang][1],
        body: specialPageMeta[printableRoute][lang][2],
        url: localizedPath(lang, printableRoute)
      }
    ],
    treatments: [
      {
        tag: l.nav.treatments,
        title: cardForArticle(tractionCard, lang).title,
        body: cardForArticle(tractionCard, lang).body,
        url: articlePath(lang, "traction-pillow-manipulation-risk-guide")
      },
      {
        tag: l.nav.tools,
        title: visuals[2].labels[lang][0],
        body: visuals[2].labels[lang][1],
        url: localizedPath(lang, `images/${visuals[2].slug}`)
      }
    ],
    sports: [
      {
        tag: l.nav.tools,
        title: visuals[2].labels[lang][0],
        body: visuals[2].labels[lang][1],
        url: localizedPath(lang, `images/${visuals[2].slug}`)
      },
      {
        tag: l.nav.videos,
        title: specialPageMeta.videos[lang][1],
        body: specialPageMeta.videos[lang][2],
        url: localizedPath(lang, "videos")
      }
    ]
  };
  return cards[category] || [];
}

function wrapText(text, maxChars, maxLines) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const hasSpaces = /\s/.test(clean);
  const lines = [];
  if (hasSpaces) {
    let line = "";
    for (const word of clean.split(" ")) {
      const next = line ? `${line} ${word}` : word;
      if (next.length > maxChars && line) {
        lines.push(line);
        line = word;
      } else {
        line = next;
      }
      if (lines.length === maxLines) break;
    }
    if (line && lines.length < maxLines) lines.push(line);
  } else {
    for (let i = 0; i < clean.length && lines.length < maxLines; i += maxChars) {
      lines.push(clean.slice(i, i + maxChars));
    }
  }
  if (lines.length === maxLines && lines.join(hasSpaces ? " " : "").length < clean.length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/[。.,，、;；:：!?！？]$/, "")}...`;
  }
  return lines;
}

function ogCardSvg(entry) {
  const isLatin = entry.lang === "en" || entry.lang === "es";
  const titleLines = wrapText(entry.title, isLatin ? 34 : 18, 3);
  const descLines = wrapText(entry.description, isLatin ? 58 : 28, 3);
  const motif =
    {
      symptoms: `<g transform="translate(885 155)"><rect x="0" y="112" width="54" height="220" rx="27" fill="#167a7f"/><rect x="76" y="70" width="54" height="262" rx="27" fill="#167a7f"/><rect x="152" y="42" width="54" height="290" rx="27" fill="#d8644a"/><rect x="228" y="78" width="54" height="254" rx="27" fill="#c8902f"/><path d="M44 370 C96 410 224 410 282 370" fill="none" stroke="#9db8b4" stroke-width="24" stroke-linecap="round"/></g>`,
      sports: `<g transform="translate(880 170)"><circle cx="150" cy="135" r="112" fill="#fff" stroke="#d9e5e2" stroke-width="8"/><path d="M74 156 C130 88 193 92 242 152" fill="none" stroke="#167a7f" stroke-width="20" stroke-linecap="round"/><path d="M62 244 C130 202 216 202 288 244" fill="none" stroke="#d8644a" stroke-width="18" stroke-linecap="round"/><circle cx="150" cy="135" r="24" fill="#c8902f"/></g>`,
      treatments: `<g transform="translate(900 155)"><rect width="235" height="310" rx="24" fill="#fff" stroke="#d9e5e2" stroke-width="8"/><path d="M70 66 C128 120 128 206 72 254" fill="none" stroke="#167a7f" stroke-width="18" stroke-linecap="round"/><path d="M154 70 C126 130 124 196 156 254" fill="none" stroke="#d8644a" stroke-width="18" stroke-linecap="round"/><circle cx="78" cy="255" r="16" fill="#9db8b4"/><circle cx="158" cy="255" r="16" fill="#9db8b4"/></g>`,
      videos: `<g transform="translate(890 170)"><rect width="260" height="180" rx="26" fill="#fff" stroke="#d9e5e2" stroke-width="8"/><path d="M112 58 L112 122 L172 90 Z" fill="#d8644a"/><rect x="18" y="220" width="224" height="28" rx="14" fill="#167a7f" opacity=".9"/></g>`,
      tools: `<g transform="translate(880 150)"><rect width="290" height="260" rx="26" fill="#fff" stroke="#d9e5e2" stroke-width="8"/><circle cx="74" cy="78" r="30" fill="#4d8061"/><circle cx="145" cy="78" r="30" fill="#c8902f"/><circle cx="216" cy="78" r="30" fill="#d8644a"/><path d="M62 178 C112 120 178 238 232 172" fill="none" stroke="#167a7f" stroke-width="18" stroke-linecap="round"/></g>`,
      diagnosis: `<g transform="translate(905 145)"><path d="M110 20 C190 115 188 255 108 340" fill="none" stroke="#167a7f" stroke-width="28" stroke-linecap="round"/><path d="M210 20 C162 120 162 245 212 340" fill="none" stroke="#d8644a" stroke-width="24" stroke-linecap="round"/><circle cx="132" cy="78" r="24" fill="#fff" stroke="#9db8b4" stroke-width="7"/><circle cx="136" cy="152" r="24" fill="#fff" stroke="#9db8b4" stroke-width="7"/><circle cx="130" cy="226" r="24" fill="#fff" stroke="#9db8b4" stroke-width="7"/><circle cx="116" cy="300" r="24" fill="#fff" stroke="#9db8b4" stroke-width="7"/></g>`
    }[entry.kind] || "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7fbfa"/>
  <rect x="46" y="46" width="1108" height="538" rx="28" fill="#fff" stroke="#d9e5e2" stroke-width="2"/>
  <circle cx="96" cy="96" r="24" fill="${entry.accent}"/>
  <text x="136" y="105" fill="#162026" font-family="Arial, sans-serif" font-size="25" font-weight="800">Cervical Curve Guide</text>
  <text x="84" y="188" fill="${entry.accent}" font-family="Arial, sans-serif" font-size="28" font-weight="900">${escapeXml(entry.tag)}</text>
  ${titleLines.map((line, index) => `<text x="84" y="${254 + index * 60}" fill="#162026" font-family="Arial, sans-serif" font-size="50" font-weight="850">${escapeXml(line)}</text>`).join("\n  ")}
  ${descLines.map((line, index) => `<text x="86" y="${465 + index * 36}" fill="#5b6a72" font-family="Arial, sans-serif" font-size="26">${escapeXml(line)}</text>`).join("\n  ")}
  <text x="84" y="558" fill="#5b6a72" font-family="Arial, sans-serif" font-size="22">cervicalcurveguide.com</text>
  ${motif}
</svg>`;
}

function convertSvgToPng(svgPath, pngPath) {
  if (!existsSync("/usr/bin/qlmanage")) return false;
  const outputDir = dirname(svgPath);
  const quicklookPng = `${svgPath}.png`;
  rmSync(quicklookPng, { force: true });
  rmSync(pngPath, { force: true });
  try {
    execFileSync("/usr/bin/qlmanage", ["-t", "-s", "1200", "-o", outputDir, svgPath], { stdio: "ignore" });
    if (existsSync(quicklookPng)) {
      renameSync(quicklookPng, pngPath);
      execFileSync("/usr/bin/sips", ["-c", "630", "1200", "--cropOffset", "285", "0", pngPath], { stdio: "ignore" });
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

function renderHreflang(route, isArticle = false) {
  const toUrl = (lang) => (isArticle ? articleUrl(lang, route) : localizedUrl(lang, route));
  return [
    `<link rel="alternate" hreflang="x-default" href="${toUrl("en")}" />`,
    ...Object.entries(languages).map(
      ([lang, labels]) => `<link rel="alternate" hreflang="${labels.hreflang}" href="${toUrl(lang)}" />`
    )
  ].join("\n    ");
}

function renderHeader(lang, title) {
  const l = languages[lang];
  return `<header class="site-header">
      <a class="brand" href="${l.home}">
        <span class="brand-mark" aria-hidden="true">C</span>
        <span>Cervical Curve Guide</span>
      </a>
      <nav class="main-nav" aria-label="Primary navigation">
        <a href="${l.home}">${escapeHtml(l.nav.home)}</a>
        <a href="${localizedPath(lang, "symptoms")}">${escapeHtml(l.nav.symptoms)}</a>
        <a href="${localizedPath(lang, "diagnosis")}">${escapeHtml(l.nav.diagnosis)}</a>
        <a href="${localizedPath(lang, "exercises")}">${escapeHtml(l.nav.exercises)}</a>
        <a href="${localizedPath(lang, "treatments")}">${escapeHtml(l.nav.treatments)}</a>
        <a href="${localizedPath(lang, "sports")}">${escapeHtml(l.nav.sports)}</a>
        <a href="${localizedPath(lang, "videos")}">${escapeHtml(l.nav.videos)}</a>
        <a href="${localizedPath(lang, "tools")}">${escapeHtml(l.nav.tools)}</a>
      </nav>
      <div class="language-switcher" role="group" aria-label="Language">
        ${Object.entries(languages)
          .map(([code, labels]) => {
            const active = code === lang ? " is-active" : "";
            const current = code === lang ? ' aria-current="page"' : "";
            const href = title.articleSlug
              ? articlePath(code, title.articleSlug)
              : localizedPath(code, title.route);
            return `<a class="lang-button${active}" href="${href}" hreflang="${labels.hreflang}"${current}>${labels.short}</a>`;
          })
          .join("\n        ")}
      </div>
    </header>`;
}

function renderFooter(lang) {
  const l = languages[lang];
  return `<footer class="site-footer">
      <p>${escapeHtml(l.footer)}</p>
      <nav class="footer-links" aria-label="Footer links">
        <a href="${localizedPath(lang, "symptoms")}">${escapeHtml(l.nav.symptoms)}</a>
        <a href="${localizedPath(lang, "diagnosis")}">${escapeHtml(l.nav.diagnosis)}</a>
        <a href="${localizedPath(lang, "exercises")}">${escapeHtml(l.nav.exercises)}</a>
        <a href="${localizedPath(lang, "treatments")}">${escapeHtml(l.nav.treatments)}</a>
        <a href="${localizedPath(lang, "sports")}">${escapeHtml(l.nav.sports)}</a>
        <a href="${localizedPath(lang, "videos")}">${escapeHtml(l.nav.videos)}</a>
        <a href="${localizedPath(lang, "tools")}">${escapeHtml(l.nav.tools)}</a>
        <a href="/about.html">About</a>
        <a href="/authors.html">Authors</a>
        <a href="/medical-review-policy.html">Medical review</a>
        <a href="/privacy.html">Privacy</a>
      </nav>
    </footer>`;
}

function structuredData({ lang, url, title, description, route, article, breadcrumbs = [], extraGraph = [], faqs = [], image }) {
  const l = languages[lang];
  const pageAbout =
    route === "cervical-curve"
      ? ["Cervical curve", "Cervical lordosis", "Cervical kyphosis", "Loss of cervical lordosis", "Neck pain", "Cervical radiculopathy"]
      : ["Cervical kyphosis", "Loss of cervical lordosis", "Neck pain", "Cervical radiculopathy"];
  const graph = [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Cervical Curve Guide",
      url: baseUrl
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: "Cervical Curve Guide",
      url: `${baseUrl}/`,
      publisher: { "@id": `${baseUrl}/#organization` },
      inLanguage: Object.values(languages).map((item) => item.htmlLang),
      isAccessibleForFree: true
    },
    {
      "@type": "MedicalWebPage",
      "@id": `${url}#medical-page`,
      name: title,
      headline: title,
      description,
      url,
      image,
      inLanguage: l.htmlLang,
      medicalAudience: "Patient",
      isAccessibleForFree: true,
      lastReviewed: reviewDate,
      dateModified: reviewDate,
      about: pageAbout,
      isPartOf: { "@id": `${baseUrl}/#website` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Cervical Curve Guide", item: `${baseUrl}${l.home}` },
        ...breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: crumb.name,
          item: crumb.url
        }))
      ]
    }
  ];

  if (article) {
    graph.push({
      "@type": "Article",
      "@id": `${url}#article`,
      headline: title,
      description,
      url,
      image,
      inLanguage: l.htmlLang,
      datePublished: reviewDate,
      dateModified: reviewDate,
      author: { "@id": `${baseUrl}/#organization` },
      publisher: { "@id": `${baseUrl}/#organization` },
      citation: article.sources.map((source) => source.url),
      isPartOf: { "@id": `${url}#medical-page` }
    });
  } else if (route) {
    const cards = getCardsForRoute(lang, route);
    if (cards.length) {
      graph.push({
        "@type": "ItemList",
        "@id": `${url}#item-list`,
        name: title,
        itemListElement: cards.map((card, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: card.title,
          url: new URL(card.url, baseUrl).href
        }))
      });
    }
  }

  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer
        }
      }))
    });
  }

  graph.push(...extraGraph);

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

function htmlShell({ lang, route, articleSlug, title, description, content, article, breadcrumbs, extraGraph = [], faqs = [] }) {
  const l = languages[lang];
  const url = articleSlug ? articleUrl(lang, articleSlug) : localizedUrl(lang, route);
  const hrefLangRoute = articleSlug || route;
  const pageTitle = titleTag(title);
  const image = ogImageUrl(lang, route, articleSlug);
  return `<!doctype html>
<html lang="${l.htmlLang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta name="author" content="Cervical Curve Guide" />
    <meta name="theme-color" content="#f5fbfb" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="canonical" href="${url}" />
    ${renderHreflang(hrefLangRoute, Boolean(articleSlug))}
    <meta property="og:type" content="${articleSlug ? "article" : "website"}" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${image}" />
    <link rel="stylesheet" href="/assets/styles.css?v=${version}" />
    <script src="/assets/analytics.js?v=${version}" defer></script>
    <script type="application/ld+json">${structuredData({
      lang,
      url,
      title,
      description,
      route,
      article,
      breadcrumbs,
      extraGraph,
      faqs,
      image
    })}</script>
  </head>
  <body>
    <a class="skip-link" href="#content">${escapeHtml(l.skip)}</a>
    ${renderHeader(lang, { route, articleSlug })}
    ${content}
    ${renderFooter(lang)}
  </body>
</html>
`;
}

function paragraphs(items) {
  return items.map((item) => (item && typeof item === "object" && item.html ? `<p>${item.html}</p>` : `<p>${escapeHtml(item)}</p>`)).join("\n");
}

function bullets(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderTrackerCta(lang) {
  const copy = {
    zh: {
      title: "把症状先记录 7 天",
      body: "记录疼痛、手麻、睡眠、诱因和第二天反应，再决定是否调整练习或带去就医讨论。",
      cta: "打开记录表"
    },
    en: {
      title: "Track symptoms for 7 days first",
      body: "Record pain, numbness, sleep, triggers, and next-day response before changing exercises or discussing care.",
      cta: "Open the tracker"
    },
    ja: {
      title: "まず7日間、症状を記録する",
      body: "痛み、しびれ、睡眠、誘因、翌日の反応を整理してから、運動調整や医療相談につなげます。",
      cta: "記録表を開く"
    },
    es: {
      title: "Registra síntomas durante 7 días",
      body: "Anota dolor, entumecimiento, sueño, desencadenantes y respuesta al día siguiente antes de cambiar ejercicios o consultar.",
      cta: "Abrir registro"
    }
  }[lang];
  return `<aside class="article-callout resource-callout">
          <strong>${escapeHtml(copy.title)}</strong>
          <p>${escapeHtml(copy.body)}</p>
          <a class="button" href="${localizedPath(lang, printableRoute)}">${escapeHtml(copy.cta)}</a>
        </aside>`;
}

function cardForArticle(article, lang) {
  if (article.cards) {
    const [tag, title, body] = article.cards[lang];
    return { tag, title, body, url: articlePath(lang, article.slug) };
  }
  const [tag, title, body] = article.translations[lang];
  return { tag, title, body, url: articlePath(lang, article.slug) };
}

function getCardsForRoute(lang, route) {
  if (hubs[route]) {
    const hub = hubs[route];
    return allArticles.filter((article) => hub.categories.includes(article.category)).map((article) => cardForArticle(article, lang));
  }
  if (route === "videos") {
    return videoRefs.map(([id, source, title]) => ({
      tag: source,
      title,
      body: "Reference video",
      url: `https://www.youtube.com/watch?v=${id}`
    }));
  }
  return [];
}

function renderCardGrid(cards, lang) {
  const l = languages[lang];
  const seen = new Set();
  const uniqueCards = cards.filter((card) => {
    if (seen.has(card.url)) return false;
    seen.add(card.url);
    return true;
  });
  return `<div class="article-grid growth-grid">
    ${uniqueCards
      .map(
        (card) => `<article class="article-card">
          <span class="tag">${escapeHtml(card.tag)}</span>
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.body)}</p>
          <a href="${card.url}">${escapeHtml(`${l.read}: ${card.title}`)}</a>
        </article>`
      )
      .join("\n")}
  </div>`;
}

function renderArticlePage(article, lang) {
  const l = languages[lang];
  const [kicker, title, description, focus, keyPoints] = article.translations[lang];
  const extraSections = article.sections?.[lang] || [];
  const faqs = pageFaqs(lang, article.category);
  const relatedCards = allArticles
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 6)
    .map((item) => cardForArticle(item, lang));
  const hub = Object.entries(hubs).find(([, value]) => value.categories.includes(article.category))?.[0];
  const content = `<main class="legal-main article-main" id="content">
      <article class="legal-article article-page">
        <p class="legal-meta">${escapeHtml(l.updated)} · ${escapeHtml(kicker)}</p>
        <p class="legal-meta">${escapeHtml(l.review)}</p>
        <h1>${escapeHtml(title)}</h1>
        <div class="article-dek">
          ${paragraphs([description, focus])}
        </div>
        <aside class="article-callout">${escapeHtml(l.medicalLabel)} ${escapeHtml(l.redFlag)}</aside>
        ${renderTrackerCta(lang)}
        <section class="article-section">
          <h2>${escapeHtml(l.keyHeading)}</h2>
          ${bullets(keyPoints)}
        </section>
        ${extraSections
          .map(
            ([heading, body]) => `<section class="article-section">
          <h2>${escapeHtml(heading)}</h2>
          ${paragraphs(body)}
        </section>`
          )
          .join("\n")}
        <section class="article-section">
          <h2>${escapeHtml(l.trackHeading)}</h2>
          <p>${escapeHtml(l.track)}</p>
        </section>
        <section class="article-section">
          <h2>${escapeHtml(l.redFlagHeading)}</h2>
          <p>${escapeHtml(l.redFlag)}</p>
        </section>
        ${renderFaqSection(lang, faqs)}
        <aside class="ad-slot ad-slot-article" aria-label="${escapeHtml(l.ad)}"><span>${escapeHtml(l.ad)}</span></aside>
        <section class="article-section article-sources">
          <h2>${escapeHtml(l.sourceHeading)}</h2>
          <ul class="source-list">
            ${article.sources
              .map((source) => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`)
              .join("\n")}
          </ul>
        </section>
        <section class="article-section">
          <h2>${escapeHtml(l.related)}</h2>
          ${renderCardGrid(
            [
              {
                tag: "Hub",
                title: hubs[hub].meta[lang][1],
                body: hubs[hub].meta[lang][2],
                url: localizedPath(lang, hub)
              },
              ...utilityCardsForCategory(lang, article.category),
              ...relatedCards
            ],
            lang
          )}
        </section>
      </article>
    </main>`;
  return htmlShell({
    lang,
    articleSlug: article.slug,
    title,
    description,
    content,
    article,
    breadcrumbs: [
      { name: hubs[hub].meta[lang][1], url: localizedUrl(lang, hub) },
      { name: title, url: articleUrl(lang, article.slug) }
    ],
    faqs
  });
}

function renderHubPage(route, lang) {
  const l = languages[lang];
  const hub = hubs[route];
  const [kicker, title, description] = hub.meta[lang];
  const cards = getCardsForRoute(lang, route);
  const faqs = [...(categoryFaqs[hub.categories[0]]?.[lang] || []), ...(extraFaqs[lang] || []).slice(0, 1)].slice(0, 3);
  const content = `<main class="legal-main growth-main" id="content">
      <article class="legal-article growth-page">
        <p class="legal-meta">${escapeHtml(l.updated)} · ${escapeHtml(kicker)}</p>
        <h1>${escapeHtml(title)}</h1>
        <div class="article-dek">${paragraphs([description])}</div>
        <aside class="article-callout">${escapeHtml(l.medicalLabel)} ${escapeHtml(l.redFlag)}</aside>
        <section class="article-section">
          <h2>${escapeHtml(l.related)}</h2>
          ${renderCardGrid(cards, lang)}
        </section>
        <aside class="ad-slot ad-slot-article" aria-label="${escapeHtml(l.ad)}"><span>${escapeHtml(l.ad)}</span></aside>
        ${renderFaqSection(lang, faqs)}
      </article>
    </main>`;
  return htmlShell({
    lang,
    route,
    title,
    description,
    content,
    breadcrumbs: [{ name: title, url: localizedUrl(lang, route) }],
    faqs
  });
}

function renderToolChooserSection(lang) {
  if (lang !== "en") return "";
  return `<section class="article-section">
          <h2>Choose the right tool first</h2>
          <p>If the question is normal cervical curvature, normal C-spine curve, loss of normal cervical lordosis, or mild cervical kyphosis, start with the <a href="${localizedPath(lang, "images/cervical-curve-diagram")}">normal cervical curve diagram</a>.</p>
          <p>If the question is finger numbness, arm pain, C6, C7, C8, carpal tunnel, or ulnar nerve overlap, start with the <a href="${localizedPath(lang, "images/c6-c7-c8-finger-numbness-map")}">C6 C7 C8 finger numbness map</a>. If the question is whether an exercise, pillow, or training change is helping, use the <a href="${localizedPath(lang, "images/24-hour-neck-symptom-response-chart")}">24-hour neck symptom response chart</a> and the printable tracker.</p>
        </section>`;
}

function renderToolsPage(lang) {
  const l = languages[lang];
  const meta = specialPageMeta.tools[lang];
  const faqs = extraFaqs[lang];
  const labels = {
    zh: ["正常前凸", "曲度变直", "反弓/后凸", "24 小时反应记录器", "疼痛是否升高 2 分以上？", "手麻或手臂痛是否扩散？", "是否出现无力、手变笨或走路不稳？", "生成提示", "可以继续小幅进阶。", "先降量并观察。", "停止并尽快就医评估。"],
    en: ["Usual lordosis", "Straightened curve", "Reversed/kyphotic", "24-hour response tracker", "Did pain rise by more than 2 points?", "Did arm or hand symptoms spread?", "Any weakness, hand clumsiness, or walking change?", "Generate guidance", "Small progression may be reasonable.", "Deload and observe first.", "Stop and seek prompt medical assessment."],
    ja: ["通常の前弯", "前弯減少", "逆カーブ/後弯", "24時間反応記録", "痛みが2点以上上がりましたか？", "腕や手の症状が広がりましたか？", "筋力低下、手の不器用さ、歩行変化は？", "結果を見る", "小さな進行は検討できます。", "まず量を下げて観察します。", "中止して早めに医療相談してください。"],
    es: ["Lordosis habitual", "Curva rectificada", "Invertida/cifótica", "Registro de respuesta 24 h", "¿El dolor subió más de 2 puntos?", "¿Se extendieron síntomas de brazo o mano?", "¿Debilidad, torpeza de mano o cambio al caminar?", "Generar orientación", "Puede ser razonable progresar poco.", "Primero descarga y observa.", "Para y busca evaluación pronta."]
  }[lang];
  const content = `<main class="legal-main growth-main" id="content">
      <article class="legal-article growth-page">
        <p class="legal-meta">${escapeHtml(l.updated)}</p>
        <h1>${escapeHtml(meta[1])}</h1>
        <div class="article-dek">${paragraphs([meta[2]])}</div>
        ${renderToolChooserSection(lang)}
        <section class="article-section visual-section">
          <h2>${escapeHtml(meta[0])}</h2>
          <div class="visual-grid">
            <figure class="diagram-card">
              <svg viewBox="0 0 720 260" role="img" aria-label="${escapeHtml(meta[1])}">
                <rect width="720" height="260" rx="8" fill="#f6fbfa"></rect>
                ${[0, 1, 2]
                  .map((index) => {
                    const x = 80 + index * 220;
                    const path = [
                      "M 0 20 C 42 56 42 128 0 174",
                      "M 0 20 C 8 70 8 124 0 174",
                      "M 0 20 C -36 70 -36 128 0 174"
                    ][index];
                    return `<g transform="translate(${x},36)">
                      <path d="${path}" fill="none" stroke="${index === 2 ? "#d8644a" : "#167a7f"}" stroke-width="12" stroke-linecap="round"></path>
                      ${[0, 1, 2, 3, 4].map((n) => `<circle cx="${index === 2 ? -8 - n * 4 : index === 1 ? 0 : 14 - n * 3}" cy="${40 + n * 30}" r="13" fill="#ffffff" stroke="#9db8b4" stroke-width="4"></circle>`).join("")}
                      <text x="-50" y="218" fill="#162026" font-size="18" font-weight="700">${escapeHtml(labels[index])}</text>
                    </g>`;
                  })
                  .join("")}
              </svg>
            </figure>
            <figure class="diagram-card">
              <svg viewBox="0 0 720 260" role="img" aria-label="Finger numbness nerve map">
                <rect width="720" height="260" rx="8" fill="#fff8f4"></rect>
                ${[
                  ["C6", 108, 86, "#167a7f"],
                  ["C6", 238, 56, "#167a7f"],
                  ["C7", 360, 44, "#d8644a"],
                  ["C8", 480, 58, "#c8902f"],
                  ["C8", 594, 86, "#c8902f"]
                ]
                  .map(([label, x, y, color], index) => `<g>
                    <rect x="${x - 35}" y="${y}" width="70" height="${150 - index * 8}" rx="32" fill="${color}" opacity="0.88"></rect>
                    <text x="${x}" y="${y + 55}" text-anchor="middle" fill="#fff" font-size="24" font-weight="800">${label}</text>
                  </g>`)
                  .join("")}
                <path d="M180 218 C245 238 410 238 540 218" fill="none" stroke="#9db8b4" stroke-width="18" stroke-linecap="round"></path>
                <text x="360" y="242" text-anchor="middle" fill="#162026" font-size="18" font-weight="700">C6 / C7 / C8 overlap, not diagnosis</text>
              </svg>
            </figure>
          </div>
        </section>
        <section class="article-section">
          <h2>${escapeHtml({ zh: "下载和引用", en: "Download and reference", ja: "ダウンロードと参照", es: "Descarga y referencia" }[lang])}</h2>
          ${renderCardGrid(
            [
              ...visuals.map((visual) => ({
                tag: l.nav.tools,
                title: visual.labels[lang][0],
                body: visual.labels[lang][1],
                url: localizedPath(lang, `images/${visual.slug}`)
              })),
              {
                tag: {
                  zh: "记录表",
                  en: "Tracker",
                  ja: "記録表",
                  es: "Registro"
                }[lang],
                title: {
                  zh: "7 天颈痛和手麻记录表",
                  en: "7-Day Neck Pain and Numbness Tracker",
                  ja: "7日間の首痛・しびれ記録表",
                  es: "Registro de 7 días de cuello y entumecimiento"
                }[lang],
                body: {
                  zh: "可打印或保存 PDF，帮助就医前整理症状变化。",
                  en: "Print or save as PDF to organize symptom changes before an appointment.",
                  ja: "印刷またはPDF保存し、受診前に症状変化を整理します。",
                  es: "Imprime o guarda como PDF para ordenar cambios antes de una cita."
                }[lang],
                url: localizedPath(lang, printableRoute)
              }
            ],
            lang
          )}
        </section>
        <section class="article-section tool-panel">
          <h2>${escapeHtml(labels[3])}</h2>
          <form class="response-tool" id="response-tool" data-green="${escapeHtml(labels[8])}" data-yellow="${escapeHtml(labels[9])}" data-red="${escapeHtml(labels[10])}">
            ${labels
              .slice(4, 7)
              .map((label, index) => `<label><input type="checkbox" name="risk" value="${index}" /> <span>${escapeHtml(label)}</span></label>`)
              .join("\n")}
            <button type="button" class="button primary" id="tool-submit">${escapeHtml(labels[7])}</button>
            <output id="tool-output" class="tool-output" aria-live="polite"></output>
          </form>
        </section>
        ${renderFaqSection(lang, faqs)}
        <aside class="ad-slot ad-slot-article" aria-label="${escapeHtml(l.ad)}"><span>${escapeHtml(l.ad)}</span></aside>
      </article>
    </main>
    <script>
      (() => {
        const form = document.querySelector("#response-tool");
        const output = document.querySelector("#tool-output");
        const button = document.querySelector("#tool-submit");
        if (!form || !output || !button) return;
        button.addEventListener("click", () => {
          const checked = [...form.querySelectorAll("input:checked")].map((item) => item.value);
          const hasRed = checked.includes("2");
          output.textContent = hasRed ? form.dataset.red : checked.length ? form.dataset.yellow : form.dataset.green;
          output.dataset.level = hasRed ? "red" : checked.length ? "yellow" : "green";
        });
      })();
    </script>`;
  return htmlShell({ lang, route: "tools", title: meta[1], description: meta[2], content, breadcrumbs: [{ name: meta[1], url: localizedUrl(lang, "tools") }], faqs });
}

function renderVideosPage(lang) {
  const l = languages[lang];
  const meta = specialPageMeta.videos[lang];
  const faqs = extraFaqs[lang];
  const content = `<main class="legal-main growth-main" id="content">
      <article class="legal-article growth-page">
        <p class="legal-meta">${escapeHtml(l.updated)}</p>
        <h1>${escapeHtml(meta[1])}</h1>
        <div class="article-dek">${paragraphs([meta[2]])}</div>
        <div class="video-grid growth-video-grid">
          ${videoRefs
            .map(
              ([id, source, title, tag]) => `<article class="video-card">
                <a class="video-frame video-preview" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer">
                  <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="${escapeHtml(title)}" width="480" height="360" loading="lazy" decoding="async" />
                  <span class="video-play" aria-hidden="true"></span>
                  <span class="video-platform">YouTube</span>
                </a>
                <div class="video-body">
                  <span class="video-meta">${escapeHtml(tag)} · ${escapeHtml(source)}</span>
                  <h2>${escapeHtml(title)}</h2>
                  <p>${escapeHtml(meta[2])}</p>
                  <a class="video-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer">YouTube reference</a>
                </div>
                <iframe class="video-embed" loading="lazy" width="560" height="315" src="https://www.youtube-nocookie.com/embed/${id}" title="${escapeHtml(title)}" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </article>`
            )
            .join("\n")}
        </div>
        ${renderFaqSection(lang, faqs)}
        <aside class="ad-slot ad-slot-article" aria-label="${escapeHtml(l.ad)}"><span>${escapeHtml(l.ad)}</span></aside>
      </article>
    </main>`;
  const extraGraph = videoRefs.map(([id, source, title, tag]) => ({
    "@type": "VideoObject",
    "@id": `${localizedUrl(lang, "videos")}#video-${id}`,
    name: title,
    description: `${source}: ${tag}. ${meta[2]}`,
    thumbnailUrl: [`https://i.ytimg.com/vi/${id}/hqdefault.jpg`],
    uploadDate: reviewDate,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    contentUrl: `https://www.youtube.com/watch?v=${id}`,
    publisher: { "@id": `${baseUrl}/#organization` },
    isPartOf: { "@id": `${localizedUrl(lang, "videos")}#medical-page` }
  }));
  return htmlShell({ lang, route: "videos", title: meta[1], description: meta[2], content, breadcrumbs: [{ name: meta[1], url: localizedUrl(lang, "videos") }], extraGraph, faqs });
}

function renderPillarPage(pillar, lang) {
  const l = languages[lang];
  const t = pillar.translations[lang];
  const url = localizedUrl(lang, pillar.slug);
  const pillarCategory = pillar.slug === "cervical-radiculopathy" ? "symptoms" : pillar.slug === "loss-of-cervical-lordosis" ? "exercises" : "diagnosis";
  const faqs = pageFaqs(lang, pillarCategory);
  const relatedCards = pillar.related
    .map((slug) => allArticles.find((article) => article.slug === slug))
    .filter(Boolean)
    .map((article) => cardForArticle(article, lang));
  const content = `<main class="legal-main growth-main" id="content">
      <article class="legal-article growth-page pillar-page">
        <p class="legal-meta">${escapeHtml(l.updated)} · ${escapeHtml(t.kicker)}</p>
        <p class="legal-meta">${escapeHtml(l.review)}</p>
        <h1>${escapeHtml(t.title)}</h1>
        <div class="article-dek">${paragraphs(t.intro)}</div>
        <aside class="article-callout">${escapeHtml(l.medicalLabel)} ${escapeHtml(l.redFlag)}</aside>
        <nav class="pillar-toc" aria-label="Page sections">
          ${t.sections
            .map(([heading], index) => `<a href="#section-${index + 1}">${escapeHtml(heading)}</a>`)
            .join("\n")}
        </nav>
        ${t.sections
          .map(
            ([heading, body], index) => `<section class="article-section pillar-section" id="section-${index + 1}">
              <h2>${escapeHtml(heading)}</h2>
              ${paragraphs(body)}
            </section>`
          )
          .join("\n")}
        ${renderFaqSection(lang, faqs)}
        <aside class="ad-slot ad-slot-article" aria-label="${escapeHtml(l.ad)}"><span>${escapeHtml(l.ad)}</span></aside>
        <section class="article-section article-sources">
          <h2>${escapeHtml(l.sourceHeading)}</h2>
          <ul class="source-list">
            ${pillar.sources
              .map((source) => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`)
              .join("\n")}
          </ul>
        </section>
        <section class="article-section">
          <h2>${escapeHtml(l.related)}</h2>
          ${renderCardGrid(
            [
              {
                tag: l.nav.tools,
                title: visuals[0].labels[lang][0],
                body: visuals[0].labels[lang][1],
                url: localizedPath(lang, `images/${visuals[0].slug}`)
              },
              {
                tag: l.nav.tools,
                title: {
                  zh: "7 天颈痛和手麻记录表",
                  en: "7-day neck pain and numbness tracker",
                  ja: "7日間の首痛・しびれ記録表",
                  es: "Registro de 7 días de cuello y entumecimiento"
                }[lang],
                body: {
                  zh: "打印或截图，用同一标准记录症状、睡眠、训练和第二天反应。",
                  en: "Print or save it to track symptoms, sleep, training, and next-day response consistently.",
                  ja: "印刷または保存し、症状、睡眠、運動、翌日反応を同じ基準で記録します。",
                  es: "Imprime o guarda para registrar síntomas, sueño, entrenamiento y respuesta al día siguiente."
                }[lang],
                url: localizedPath(lang, printableRoute)
              },
              ...utilityCardsForCategory(lang, pillarCategory),
              ...relatedCards
            ],
            lang
          )}
        </section>
      </article>
    </main>`;
  return htmlShell({
    lang,
    route: pillar.slug,
    title: t.title,
    description: t.description,
    content,
    article: { sources: pillar.sources },
    breadcrumbs: [{ name: t.title, url }],
    faqs
  });
}

function visualSvg(visual) {
  if (visual.slug === "cervical-curve-diagram") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" role="img" aria-labelledby="title desc">
  <title id="title">Cervical curve diagram</title>
  <desc id="desc">Comparison of usual cervical lordosis, straightened cervical curve, and reversed or kyphotic cervical curve.</desc>
  <rect width="1200" height="700" rx="24" fill="#f7fbfa"/>
  <text x="600" y="80" text-anchor="middle" fill="#162026" font-family="Arial, sans-serif" font-size="42" font-weight="700">Cervical Curve Comparison</text>
  ${[
    ["Usual lordosis", 210, "M 0 0 C 82 92 82 262 0 370", "#167a7f"],
    ["Straightened", 600, "M 0 0 C 18 106 18 258 0 370", "#4d8061"],
    ["Reversed / kyphotic", 990, "M 0 0 C -76 92 -76 270 0 370", "#d8644a"]
  ]
    .map(
      ([label, x, d, color]) => `<g transform="translate(${x},160)">
    <path d="${d}" fill="none" stroke="${color}" stroke-width="26" stroke-linecap="round"/>
    ${[0, 1, 2, 3, 4, 5].map((n) => `<circle cx="${x > 800 ? -18 - n * 7 : x > 500 ? 0 : 28 - n * 6}" cy="${42 + n * 55}" r="28" fill="#fff" stroke="#9db8b4" stroke-width="7"/>`).join("")}
    <text x="0" y="445" text-anchor="middle" fill="#162026" font-family="Arial, sans-serif" font-size="30" font-weight="700">${label}</text>
  </g>`
    )
    .join("\n")}
  <text x="600" y="660" text-anchor="middle" fill="#5b6a72" font-family="Arial, sans-serif" font-size="24">Educational diagram only; symptoms and clinical exam matter more than curve shape alone.</text>
</svg>`;
  }
  if (visual.slug === "c6-c7-c8-finger-numbness-map") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" role="img" aria-labelledby="title desc">
  <title id="title">C6 C7 C8 finger numbness map</title>
  <desc id="desc">Educational finger numbness map showing possible C6 C7 and C8 nerve root clues with overlap.</desc>
  <rect width="1200" height="700" rx="24" fill="#fff8f4"/>
  <text x="600" y="78" text-anchor="middle" fill="#162026" font-family="Arial, sans-serif" font-size="42" font-weight="700">Finger Numbness: C6 / C7 / C8 Clues</text>
  ${[
    ["Thumb", "C6", 165, 250, 310, "#167a7f"],
    ["Index", "C6", 360, 185, 390, "#167a7f"],
    ["Middle", "C7", 555, 160, 430, "#d8644a"],
    ["Ring", "C8", 750, 190, 380, "#c8902f"],
    ["Little", "C8", 935, 260, 300, "#c8902f"]
  ]
    .map(
      ([finger, root, x, y, h, color]) => `<g>
    <rect x="${x - 58}" y="${y}" width="116" height="${h}" rx="58" fill="${color}" opacity="0.9"/>
    <text x="${x}" y="${y + 90}" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="44" font-weight="800">${root}</text>
    <text x="${x}" y="${y + h + 46}" text-anchor="middle" fill="#162026" font-family="Arial, sans-serif" font-size="28" font-weight="700">${finger}</text>
  </g>`
    )
    .join("\n")}
  <path d="M260 620 C420 660 740 660 910 620" fill="none" stroke="#9db8b4" stroke-width="34" stroke-linecap="round"/>
  <text x="600" y="675" text-anchor="middle" fill="#5b6a72" font-family="Arial, sans-serif" font-size="24">Patterns overlap with carpal tunnel, ulnar nerve, and thoracic outlet symptoms.</text>
</svg>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" role="img" aria-labelledby="title desc">
  <title id="title">24-hour neck symptom response chart</title>
  <desc id="desc">Educational traffic-light chart for post-exercise neck symptom response.</desc>
  <rect width="1200" height="700" rx="24" fill="#f6fbfa"/>
  <text x="600" y="76" text-anchor="middle" fill="#162026" font-family="Arial, sans-serif" font-size="42" font-weight="700">24-Hour Neck Symptom Response</text>
  ${[
    ["Green", "Symptoms local, stable or calmer", "Small progression may be reasonable", 170, "#4d8061"],
    ["Yellow", "Pain rises or sleep worsens", "Deload and observe before adding more", 500, "#c8902f"],
    ["Red", "Weakness, spreading numbness, gait change", "Stop and seek prompt assessment", 830, "#d8644a"]
  ]
    .map(
      ([label, line1, line2, x, color]) => `<g transform="translate(${x},150)">
    <rect width="260" height="390" rx="18" fill="#fff" stroke="#d9e5e2" stroke-width="5"/>
    <circle cx="130" cy="90" r="54" fill="${color}"/>
    <text x="130" y="102" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="30" font-weight="800">${label}</text>
    <text x="130" y="190" text-anchor="middle" fill="#162026" font-family="Arial, sans-serif" font-size="25" font-weight="700">
      <tspan x="130">${line1}</tspan>
    </text>
    <text x="130" y="275" text-anchor="middle" fill="#5b6a72" font-family="Arial, sans-serif" font-size="23">
      <tspan x="130">${line2}</tspan>
    </text>
  </g>`
    )
    .join("\n")}
  <text x="600" y="660" text-anchor="middle" fill="#5b6a72" font-family="Arial, sans-serif" font-size="24">Use this as an educational log, not a diagnosis or personal treatment plan.</text>
</svg>`;
}

function writeVisualAssets() {
  for (const visual of visuals) {
    writePage(join("assets", "visuals", visual.file), visualSvg(visual));
  }
}

function kindForCategory(category) {
  return {
    symptoms: "symptoms",
    diagnosis: "diagnosis",
    exercises: "tools",
    treatments: "treatments",
    sports: "sports"
  }[category] || "tools";
}

function accentForKind(kind) {
  return {
    symptoms: "#d8644a",
    diagnosis: "#167a7f",
    tools: "#4d8061",
    treatments: "#c8902f",
    sports: "#0d5559",
    videos: "#d8644a"
  }[kind] || "#167a7f";
}

function buildOgEntries() {
  const entries = [];
  const add = ({ lang, path, title, description, tag, kind }) => {
    entries.push({
      lang,
      path,
      title,
      description,
      tag,
      kind,
      accent: accentForKind(kind),
      svgPath: ogAssetPath(lang, path, "svg"),
      pngPath: ogAssetPath(lang, path, "png")
    });
  };

  for (const lang of Object.keys(languages)) {
    add({
      lang,
      path: languages[lang].home,
      title: { zh: "颈椎曲度指南", en: "Cervical Curve Guide", ja: "頸椎カーブガイド", es: "Guía de Curva Cervical" }[lang],
      description: {
        zh: "颈椎反弓、曲度变直、手麻、保守康复和运动负荷的多语言健康教育网站。",
        en: "Multilingual education for cervical kyphosis, straightened curve, numbness, rehab, and sport loading.",
        ja: "頸椎後弯、前弯減少、しびれ、保存的リハビリ、スポーツ負荷を扱う多言語サイト。",
        es: "Educación multilingüe sobre cifosis cervical, curva rectificada, entumecimiento, rehabilitación y deporte."
      }[lang],
      tag: languages[lang].nav.home,
      kind: "diagnosis"
    });

    for (const article of generatedArticles) {
      const data = article.translations?.[lang] || article.cards?.[lang];
      if (!data) continue;
      const [, title, description] = data;
      add({
        lang,
        path: articlePath(lang, article.slug),
        title,
        description,
        tag: data[0],
        kind: kindForCategory(article.category)
      });
    }

    for (const pillar of pillarPages) {
      const data = pillar.translations[lang];
      const kind = pillar.slug === "cervical-radiculopathy" ? "symptoms" : pillar.slug === "loss-of-cervical-lordosis" ? "tools" : "diagnosis";
      add({
        lang,
        path: localizedPath(lang, pillar.slug),
        title: data.title,
        description: data.description,
        tag: data.kicker,
        kind
      });
    }

    for (const [route, hub] of Object.entries(hubs)) {
      const [tag, title, description] = hub.meta[lang];
      add({ lang, path: localizedPath(lang, route), title, description, tag, kind: kindForCategory(hub.categories[0]) });
    }

    for (const route of ["tools", "videos", printableRoute]) {
      const [tag, title, description] = specialPageMeta[route][lang];
      add({ lang, path: localizedPath(lang, route), title, description, tag, kind: route === "videos" ? "videos" : "tools" });
    }

    for (const visual of visuals) {
      const [title, description] = visual.labels[lang];
      add({ lang, path: localizedPath(lang, `images/${visual.slug}`), title, description, tag: languages[lang].nav.tools, kind: "tools" });
    }
  }

  return entries;
}

function writeOgAssets(entries) {
  mkdirSync(join("assets", "og"), { recursive: true });
  let converted = 0;
  for (const entry of entries) {
    const svgPath = entry.svgPath.replace(/^\//, "");
    const pngPath = entry.pngPath.replace(/^\//, "");
    writePage(svgPath, ogCardSvg(entry));
    if (convertSvgToPng(svgPath, pngPath)) converted += 1;
  }
  return converted;
}

function postProcessOgReferences(entries) {
  const byPath = new Map(entries.map((entry) => [entry.path, entry]));
  for (const [path, entry] of byPath) {
    const imageUrl = `${baseUrl}${entry.pngPath}`;
    const file = pathToOutputFile(path);
    if (!existsSync(file) || !generatedHtmlFiles.has(file)) continue;
    let html = readFileSync(file, "utf8");
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(titleTag(entry.title))}</title>`);
    html = html.replace(/\n\s*<meta property="og:image:(?:width|height)" content="[^"]*" \/>/g, "");
    html = html.replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${imageUrl}" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${imageUrl}" />`);
    html = html.replaceAll(`${baseUrl}/assets/hero-cervical-kyphosis.jpg`, imageUrl);
    writeFileSync(file, html);
  }
}

function postProcessHomePerformance() {
  const ogLocales = {
    zh: ["zh_CN", ["en_US", "ja_JP", "es_ES"]],
    en: ["en_US", ["zh_CN", "ja_JP", "es_ES"]],
    ja: ["ja_JP", ["zh_CN", "en_US", "es_ES"]],
    es: ["es_ES", ["zh_CN", "en_US", "ja_JP"]]
  };

  for (const lang of Object.keys(languages)) {
    const file = pathToOutputFile(languages[lang].home);
    if (!existsSync(file)) continue;
    if (!overwriteExistingHtml) {
      skippedExistingHtmlFiles.add(file);
      continue;
    }
    let html = readFileSync(file, "utf8");
    const assetPrefix = languages[lang].home === "/" ? "assets" : "../assets";
    const heroSrcset = `${assetPrefix}/hero-cervical-kyphosis-720.jpg 720w, ${assetPrefix}/hero-cervical-kyphosis-1200.jpg 1200w, ${assetPrefix}/hero-cervical-kyphosis.jpg 1672w`;
    const heroWebpSrcset = `${assetPrefix}/hero-cervical-kyphosis-720.webp 720w, ${assetPrefix}/hero-cervical-kyphosis-1200.webp 1200w, ${assetPrefix}/hero-cervical-kyphosis.webp 1672w`;
    if (!html.includes('rel="icon"')) {
      html = html.replace(
        /(<meta name="theme-color" content="[^"]*" \/>)/,
        `$1\n    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />`
      );
    }
    const [currentLocale, alternateLocales] = ogLocales[lang];
    const localeTags = [
      `    <meta property="og:locale" content="${currentLocale}" />`,
      ...alternateLocales.map((locale) => `    <meta property="og:locale:alternate" content="${locale}" />`)
    ].join("\n");
    html = html.replace(
      /    <meta property="og:locale" content="[^"]+" \/>\n(?:    <meta property="og:locale:alternate" content="[^"]+" \/>\n?)+/,
      `${localeTags}\n`
    );
    html = html.replace(
      /<link rel="preload" href="(?:\.\.\/)?assets\/hero-cervical-kyphosis(?:-\d+)?\.(?:jpg|webp)" as="image"[^>]*\/>/,
      `<link rel="preload" href="${assetPrefix}/hero-cervical-kyphosis-720.webp" as="image" type="image/webp" imagesrcset="${heroWebpSrcset}" imagesizes="100vw" />`
    );
    const heroAlt =
      html.match(/<img\s+class="hero-image"[\s\S]*?\salt="([^"]*)"/)?.[1] ||
      "Educational illustration of cervical spine alignment and conservative rehabilitation";
    html = html.replace(
      /(?:<picture class="hero-picture">[\s\S]*?<\/picture>|<img\s+class="hero-image"[\s\S]*?\/>)/,
      `<picture class="hero-picture">
        <source
          type="image/webp"
          srcset="${heroWebpSrcset}"
          sizes="100vw"
        />
        <img
          class="hero-image"
          src="${assetPrefix}/hero-cervical-kyphosis.jpg"
          alt="${heroAlt}"
          srcset="${heroSrcset}"
          sizes="100vw"
          width="1672"
          height="941"
          decoding="async"
          fetchpriority="high"
        />
      </picture>`
    );
    writeFileSync(file, html);
  }
}

function renderVisualExtraSection(visual, lang) {
  if (lang !== "en") return "";
  if (visual.slug === "cervical-curve-diagram") {
    return `<section class="article-section">
          <h2>How to use this normal neck curve diagram</h2>
          <p>Use the diagram to compare common report phrases: normal cervical curvature, normal C-spine curve, loss of normal cervical lordosis, straightened cervical curve, reversed cervical curve, and cervical kyphosis.</p>
          <p>The image is a starting point, not a diagnosis. If symptoms are mainly report anxiety, read the <a href="${localizedPath(lang, "cervical-curve")}">cervical curve guide</a>. If the wording says loss of lordosis or mild kyphosis, use the <a href="${articlePath(lang, "cervical-kyphosis-vs-loss-lordosis")}">kyphosis vs loss of lordosis guide</a>. If arm pain, finger numbness, weakness, hand clumsiness, or walking changes are present, start with the <a href="${articlePath(lang, "cervical-radiculopathy-myelopathy-red-flags")}">red flag guide</a>.</p>
        </section>`;
  }
  if (visual.slug === "c6-c7-c8-finger-numbness-map") {
    return `<section class="article-section">
          <h2>How to read C6, C7, and C8 finger numbness</h2>
          <p>Finger distribution is one clue, not a diagnosis. Thumb and index symptoms can overlap C6 and median nerve patterns; middle-finger symptoms can overlap C7; ring and little-finger symptoms can overlap C8 and the ulnar nerve.</p>
          <p>Use this map with the <a href="${articlePath(lang, "finger-numbness-nerve-map")}">finger numbness guide</a> and the <a href="${articlePath(lang, "cervical-radiculopathy-myelopathy-red-flags")}">radiculopathy and myelopathy red flag guide</a>. Progressive weakness, spreading numbness, hand clumsiness, walking change, or bowel/bladder symptoms should move the next step toward medical evaluation.</p>
        </section>`;
  }
  if (visual.slug === "24-hour-neck-symptom-response-chart") {
    return `<section class="article-section">
          <h2>Use this before changing neck exercise dose</h2>
          <p>The chart turns a vague question, "is this neck exercise helping?", into a 24-hour response check. A calmer next day can support a small progression; spreading arm or hand numbness, weakness, hand clumsiness, walking change, or worse sleep should lower the dose or stop the experiment.</p>
          <p>Pair it with the <a href="${localizedPath(lang, printableRoute)}">7-day neck pain and numbness tracker</a> before changing several variables at once. If your report says loss of normal cervical lordosis or mild cervical kyphosis, use the <a href="${localizedPath(lang, "cervical-curve")}">cervical curve guide</a> to keep image wording separate from symptom risk.</p>
        </section>`;
  }
  return "";
}

function renderVisualPage(visual, lang) {
  const l = languages[lang];
  const [title, description] = visual.labels[lang];
  const route = `images/${visual.slug}`;
  const url = localizedUrl(lang, route);
  const imageUrl = `${baseUrl}/assets/visuals/${visual.file}`;
  const relatedPillar = pillarPages.find((pillar) => pillar.slug === visual.related);
  const relatedTitle = relatedPillar?.translations[lang]?.title || relatedPillar?.translations.en.title || "Related guide";
  const content = `<main class="legal-main growth-main" id="content">
      <article class="legal-article growth-page visual-landing">
        <p class="legal-meta">${escapeHtml(l.updated)} · ${escapeHtml(l.nav.tools)}</p>
        <h1>${escapeHtml(title)}</h1>
        <div class="article-dek">${paragraphs([description, l.redFlag])}</div>
        <figure class="diagram-card visual-download-card">
          <img src="/assets/visuals/${visual.file}" alt="${escapeHtml(description)}" width="1200" height="700" loading="eager" />
        </figure>
        <div class="image-actions">
          <a class="button primary" href="/assets/visuals/${visual.file}" download>${escapeHtml({ zh: "下载 SVG", en: "Download SVG", ja: "SVGをダウンロード", es: "Descargar SVG" }[lang])}</a>
          <a class="button secondary light-button" href="${localizedPath(lang, visual.related)}">${escapeHtml(relatedTitle)}</a>
        </div>
        ${renderVisualExtraSection(visual, lang)}
        <section class="article-section">
          <h2>${escapeHtml(l.related)}</h2>
          ${renderCardGrid(
            [
              {
                tag: l.nav.tools,
                title: { zh: "24 小时反应记录器", en: "24-hour response tracker", ja: "24時間反応記録", es: "Registro de respuesta 24 h" }[lang],
                body: { zh: "把图解和记录表一起使用，避免凭感觉加量。", en: "Use diagrams and trackers together before changing load.", ja: "図解と記録表を合わせて使います。", es: "Usa diagramas y registro antes de cambiar carga." }[lang],
                url: localizedPath(lang, "tools")
              },
              {
                tag: "Pillar",
                title: relatedTitle,
                body: relatedPillar?.translations[lang]?.description || relatedPillar?.translations.en.description || "",
                url: localizedPath(lang, visual.related)
              }
            ],
            lang
          )}
        </section>
      </article>
    </main>`;
  return htmlShell({
    lang,
    route,
    title,
    description,
    content,
    breadcrumbs: [{ name: title, url }],
    extraGraph: [
      {
        "@type": "ImageObject",
        "@id": `${url}#image`,
        name: title,
        caption: description,
        contentUrl: imageUrl,
        url: imageUrl,
        inLanguage: l.htmlLang,
        creditText: "Cervical Curve Guide",
        license: `${baseUrl}/terms.html`,
        acquireLicensePage: `${baseUrl}/contact.html`,
        isPartOf: { "@id": `${url}#medical-page` }
      }
    ]
  });
}

function renderPrintableTrackerPage(lang) {
  const l = languages[lang];
  const meta = specialPageMeta[printableRoute][lang];
  const faqs = extraFaqs[lang];
  const headers = {
    zh: ["日期", "疼痛 0-10", "手麻/手臂痛", "睡眠", "诱因", "做了什么", "第二天反应"],
    en: ["Date", "Pain 0-10", "Numbness / arm pain", "Sleep", "Trigger", "What changed", "Next-day response"],
    ja: ["日付", "痛み0-10", "しびれ/腕痛", "睡眠", "誘因", "行ったこと", "翌日反応"],
    es: ["Fecha", "Dolor 0-10", "Entumecimiento / brazo", "Sueño", "Desencadenante", "Qué cambió", "Respuesta al día siguiente"]
  }[lang];
  const content = `<main class="legal-main growth-main" id="content">
      <article class="legal-article growth-page printable-page">
        <p class="legal-meta">${escapeHtml(l.updated)} · ${escapeHtml(meta[0])}</p>
        <h1>${escapeHtml(meta[1])}</h1>
        <div class="article-dek">${paragraphs([meta[2], l.redFlag])}</div>
        <button class="button primary print-button" type="button" onclick="window.print()">${escapeHtml({ zh: "打印 / 保存 PDF", en: "Print / Save PDF", ja: "印刷 / PDF保存", es: "Imprimir / Guardar PDF" }[lang])}</button>
        <div class="table-wrap printable-table-wrap">
          <table class="printable-table">
            <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
            <tbody>
              ${Array.from({ length: 7 }, (_, index) => `<tr><td>${index + 1}</td>${Array.from({ length: headers.length - 1 }, () => "<td></td>").join("")}</tr>`).join("\n")}
            </tbody>
          </table>
        </div>
        <section class="article-section">
          <h2>${escapeHtml(l.related)}</h2>
          ${renderCardGrid(
            visuals.map((visual) => ({
              tag: l.nav.tools,
              title: visual.labels[lang][0],
              body: visual.labels[lang][1],
              url: localizedPath(lang, `images/${visual.slug}`)
            })),
            lang
          )}
        </section>
        ${renderFaqSection(lang, faqs)}
      </article>
    </main>`;
  return htmlShell({
    lang,
    route: printableRoute,
    title: meta[1],
    description: meta[2],
    content,
    breadcrumbs: [{ name: meta[1], url: localizedUrl(lang, printableRoute) }],
    faqs
  });
}

function writePage(path, html) {
  mkdirSync(dirname(path), { recursive: true });
  const canOverwriteTrafficSprint = overwriteTrafficSprintHtml && trafficSprintHtmlFiles.has(path);
  if (path.endsWith(".html") && existsSync(path) && !overwriteExistingHtml && !canOverwriteTrafficSprint && !path.startsWith("en/")) {
    skippedExistingHtmlFiles.add(path);
    return;
  }
  writeFileSync(path, html);
  if (path.endsWith(".html")) {
    generatedHtmlFiles.add(path);
  }
}

function renderEnglishRedirectStub(targetPath) {
  const url = `${baseUrl}${targetPath}`;
  const title = targetPath === "/" ? "Cervical Curve Guide" : "Moved";
  const label = targetPath === "/" ? "cervicalcurveguide.com" : url;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <link rel="canonical" href="${url}" />
    <meta name="robots" content="noindex,follow" />
    <meta http-equiv="refresh" content="0; url=${targetPath}" />
    <script>location.replace("${targetPath}" + location.hash);</script>
  </head>
  <body><p>Moved to <a href="${targetPath}">${label}</a>.</p></body>
</html>
`;
}

function outputEnglishRedirect(targetPath) {
  if (targetPath === "/") return join("en", "index.html");
  return pathToOutputFile(`/en${targetPath}`);
}

function writeEnglishRedirectStubs() {
  const targetPaths = [
    "/",
    ...allArticles.map((article) => articlePath("en", article.slug)),
    ...pillarPages.map((pillar) => localizedPath("en", pillar.slug)),
    ...Object.keys(hubs).map((route) => localizedPath("en", route)),
    ...["tools", "videos", printableRoute].map((route) => localizedPath("en", route)),
    ...visuals.map((visual) => localizedPath("en", `images/${visual.slug}`))
  ];
  for (const targetPath of targetPaths) {
    writePage(outputEnglishRedirect(targetPath), renderEnglishRedirectStub(targetPath));
  }
}

const generatedArticles = [...newArticles, ...trafficSprintArticles];
const allArticles = [...existingArticles, ...generatedArticles];
for (const article of trafficSprintArticles) {
  for (const lang of Object.keys(languages)) {
    trafficSprintHtmlFiles.add(outputArticle(lang, article.slug));
  }
}
const ogEntries = buildOgEntries();
const ogPngCount = writeOgAssets(ogEntries);

writeVisualAssets();

for (const article of generatedArticles) {
  for (const lang of Object.keys(languages)) {
    writePage(outputArticle(lang, article.slug), renderArticlePage(article, lang));
  }
}

for (const pillar of pillarPages) {
  for (const lang of Object.keys(languages)) {
    writePage(outputLocalized(lang, pillar.slug), renderPillarPage(pillar, lang));
  }
}

for (const route of Object.keys(hubs)) {
  for (const lang of Object.keys(languages)) {
    writePage(outputLocalized(lang, route), renderHubPage(route, lang));
  }
}

for (const lang of Object.keys(languages)) {
  writePage(outputLocalized(lang, "tools"), renderToolsPage(lang));
  writePage(outputLocalized(lang, "videos"), renderVideosPage(lang));
  writePage(outputLocalized(lang, printableRoute), renderPrintableTrackerPage(lang));
  for (const visual of visuals) {
    writePage(outputLocalized(lang, `images/${visual.slug}`), renderVisualPage(visual, lang));
  }
}

writeEnglishRedirectStubs();

const growthData = {
  strings: Object.fromEntries(Object.entries(languages).map(([lang, value]) => [lang, value.growthStrings])),
  articleCards: Object.fromEntries(
    Object.keys(languages).map((lang) => [
      lang,
      [
        ...pillarPages.map((pillar) => ({
          tag: pillar.translations[lang].kicker,
          title: pillar.translations[lang].title,
          body: pillar.translations[lang].description,
          url: localizedPath(lang, pillar.slug)
        })),
        ...generatedArticles.map((article) => cardForArticle(article, lang)),
        ...Object.entries(hubs).map(([route, hub]) => ({
          tag: hub.meta[lang][0],
          title: hub.meta[lang][1],
          body: hub.meta[lang][2],
          url: localizedPath(lang, route)
        })),
        {
          tag: languages[lang].nav.tools,
          title: {
            zh: "原创图解和 24 小时反应记录器",
            en: "Original diagrams and a 24-hour response tracker",
            ja: "図解と24時間反応記録",
            es: "Diagramas y registro de respuesta 24 h"
          }[lang],
          body: {
            zh: "用站内图解整理手麻分布、曲度术语和运动后症状反应。",
            en: "Use on-site visuals to organize numbness patterns, curve language, and post-exercise response.",
            ja: "しびれ分布、カーブ用語、運動後反応をサイト内図解で整理します。",
            es: "Usa visuales del sitio para ordenar dedos dormidos, curva y respuesta postejercicio."
          }[lang],
          url: localizedPath(lang, "tools")
        },
        {
          tag: languages[lang].nav.videos,
          title: {
            zh: "参考视频索引",
            en: "Reference video index",
            ja: "参考動画インデックス",
            es: "Índice de videos de referencia"
          }[lang],
          body: {
            zh: "把 YouTube 视频按主题归类，并明确它们只是动作参考。",
            en: "Curated YouTube references grouped by topic, clearly framed as visual references.",
            ja: "YouTube動画をテーマ別に整理し、動作参考であることを明示します。",
            es: "Videos de YouTube agrupados por tema y enmarcados como referencia visual."
          }[lang],
          url: localizedPath(lang, "videos")
        },
        {
          tag: {
            zh: "记录表",
            en: "Tracker",
            ja: "記録表",
            es: "Registro"
          }[lang],
          title: {
            zh: "7 天颈痛和手麻记录表",
            en: "7-Day Neck Pain and Numbness Tracker",
            ja: "7日間の首痛・しびれ記録表",
            es: "Registro de 7 días de cuello y entumecimiento"
          }[lang],
          body: {
            zh: "可打印或保存 PDF，帮助就医前整理症状变化。",
            en: "Print or save as PDF to organize symptom changes before an appointment.",
            ja: "印刷またはPDF保存し、受診前に症状変化を整理します。",
            es: "Imprime o guarda como PDF para ordenar cambios antes de una cita."
          }[lang],
          url: localizedPath(lang, printableRoute)
        }
      ]
    ])
  ),
  faqs: extraFaqs
};

writeFileSync(
  "assets/growth-data.js",
  `window.CCG_GROWTH = ${JSON.stringify(growthData, null, 2)};\n`
);

const staticUrls = [
  "/about.html",
  "/authors.html",
  "/editorial-policy.html",
  "/medical-review-policy.html",
  "/contact.html",
  "/disclaimer.html",
  "/privacy.html",
  "/terms.html"
];

const sitemapUrls = [
  ...Object.values(languages).map((lang) => lang.home),
  ...allArticles.flatMap((article) => Object.keys(languages).map((lang) => articlePath(lang, article.slug))),
  ...pillarPages.flatMap((pillar) => Object.keys(languages).map((lang) => localizedPath(lang, pillar.slug))),
  ...Object.keys(hubs).flatMap((route) => Object.keys(languages).map((lang) => localizedPath(lang, route))),
  ...["tools", "videos"].flatMap((route) => Object.keys(languages).map((lang) => localizedPath(lang, route))),
  ...Object.keys(languages).map((lang) => localizedPath(lang, printableRoute)),
  ...visuals.flatMap((visual) =>
    Object.keys(languages).map((lang) => ({
      path: localizedPath(lang, `images/${visual.slug}`),
      images: [
        { url: `/assets/visuals/${visual.file}`, title: visual.labels[lang][0] },
        { url: ogAssetPath(lang, localizedPath(lang, `images/${visual.slug}`)), title: `${visual.labels[lang][0]} share card` }
      ]
    }))
  ),
  ...staticUrls
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapUrls
  .map((entry) => {
    const path = typeof entry === "string" ? entry : entry.path;
    const images = typeof entry === "string" ? [] : entry.images || [{ url: entry.image, title: entry.title }];
    const image = images
      .map(
        (item) => `
    <image:image>
      <image:loc>${baseUrl}${item.url}</image:loc>
      <image:title>${escapeHtml(item.title)}</image:title>
    </image:image>`
      )
      .join("");
    return `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${sitemapLastmod}</lastmod>${image}
  </url>`;
  })
  .join("\n")}
</urlset>
`;

writeFileSync("sitemap.xml", sitemap);
postProcessOgReferences(ogEntries);
postProcessHomePerformance();

console.log(
  `Prepared ${generatedArticles.length * Object.keys(languages).length} new article pages, ${pillarPages.length * Object.keys(languages).length} pillar pages, ${Object.keys(hubs).length * Object.keys(languages).length} hub pages, visual pages, tools/videos pages, ${ogPngCount} OG PNGs, growth data, and ${sitemapUrls.length} sitemap URLs. Wrote ${generatedHtmlFiles.size} HTML files.`
);
if (skippedExistingHtmlFiles.size) {
  console.log(
    `Skipped ${skippedExistingHtmlFiles.size} existing HTML files; pass --overwrite-existing to regenerate them from scripts/build-growth.mjs.`
  );
}
