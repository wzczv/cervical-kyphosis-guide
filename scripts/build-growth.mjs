import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const baseUrl = "https://cervicalcurveguide.com";
const version = "20260609-growth";
const reviewDate = "2026-06-09";

const languages = {
  zh: {
    htmlLang: "zh-Hans",
    hreflang: "zh-Hans",
    prefix: "",
    home: "/",
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
    prefix: "/en",
    home: "/en/",
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

function topic(slug, category, sourceList, translations) {
  return { slug, category, sources: sourceList, translations };
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

function renderHreflang(route, isArticle = false) {
  const toUrl = (lang) => (isArticle ? articleUrl(lang, route) : localizedUrl(lang, route));
  return [
    `<link rel="alternate" hreflang="x-default" href="${toUrl("zh")}" />`,
    ...Object.entries(languages).map(
      ([lang, labels]) => `<link rel="alternate" hreflang="${labels.hreflang}" href="${toUrl(lang)}" />`
    )
  ].join("\n    ");
}

function renderHeader(lang, title) {
  const l = languages[lang];
  return `<header class="site-header">
      <a class="brand" href="${l.home}" aria-label="Cervical Curve Guide home">
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
            const href = title.articleSlug
              ? articlePath(code, title.articleSlug)
              : localizedPath(code, title.route);
            return `<a class="lang-button${active}" href="${href}" hreflang="${labels.hreflang}" aria-pressed="${code === lang}">${labels.short}</a>`;
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

function structuredData({ lang, url, title, description, route, article, breadcrumbs = [] }) {
  const l = languages[lang];
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
      inLanguage: l.htmlLang,
      medicalAudience: "Patient",
      isAccessibleForFree: true,
      lastReviewed: reviewDate,
      dateModified: reviewDate,
      reviewedBy: { "@id": `${baseUrl}/#organization` },
      about: ["Cervical kyphosis", "Loss of cervical lordosis", "Neck pain", "Cervical radiculopathy"],
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
      image: `${baseUrl}/assets/hero-cervical-kyphosis.jpg`,
      inLanguage: l.htmlLang,
      datePublished: reviewDate,
      dateModified: reviewDate,
      author: { "@id": `${baseUrl}/#organization` },
      publisher: { "@id": `${baseUrl}/#organization` },
      reviewedBy: { "@id": `${baseUrl}/#organization` },
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

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

function htmlShell({ lang, route, articleSlug, title, description, content, article, breadcrumbs }) {
  const l = languages[lang];
  const url = articleSlug ? articleUrl(lang, articleSlug) : localizedUrl(lang, route);
  const hrefLangRoute = articleSlug || route;
  return `<!doctype html>
<html lang="${l.htmlLang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)} | Cervical Curve Guide</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta name="author" content="Cervical Curve Guide" />
    <meta name="theme-color" content="#f5fbfb" />
    <link rel="canonical" href="${url}" />
    ${renderHreflang(hrefLangRoute, Boolean(articleSlug))}
    <meta property="og:type" content="${articleSlug ? "article" : "website"}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${baseUrl}/assets/hero-cervical-kyphosis.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${baseUrl}/assets/hero-cervical-kyphosis.jpg" />
    <link rel="stylesheet" href="/assets/styles.css?v=${version}" />
    <script src="/assets/analytics.js?v=${version}" defer></script>
    <script type="application/ld+json">${structuredData({
      lang,
      url,
      title,
      description,
      route,
      article,
      breadcrumbs
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
  return items.map((item) => `<p>${escapeHtml(item)}</p>`).join("\n");
}

function bullets(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
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
  return `<div class="article-grid growth-grid">
    ${cards
      .map(
        (card) => `<article class="article-card">
          <span class="tag">${escapeHtml(card.tag)}</span>
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.body)}</p>
          <a href="${card.url}">${escapeHtml(l.read)}</a>
        </article>`
      )
      .join("\n")}
  </div>`;
}

function renderArticlePage(article, lang) {
  const l = languages[lang];
  const [kicker, title, description, focus, keyPoints] = article.translations[lang];
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
        <section class="article-section">
          <h2>${escapeHtml(l.keyHeading)}</h2>
          ${bullets(keyPoints)}
        </section>
        <section class="article-section">
          <h2>${escapeHtml(l.trackHeading)}</h2>
          <p>${escapeHtml(l.track)}</p>
        </section>
        <section class="article-section">
          <h2>${escapeHtml(l.redFlagHeading)}</h2>
          <p>${escapeHtml(l.redFlag)}</p>
        </section>
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
    ]
  });
}

function renderHubPage(route, lang) {
  const l = languages[lang];
  const hub = hubs[route];
  const [kicker, title, description] = hub.meta[lang];
  const cards = getCardsForRoute(lang, route);
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
        <section class="article-section">
          <h2>FAQ</h2>
          <div class="faq-list">
            ${extraFaqs[lang]
              .map(([question, answer]) => `<details class="faq-item"><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
              .join("\n")}
          </div>
        </section>
      </article>
    </main>`;
  return htmlShell({
    lang,
    route,
    title,
    description,
    content,
    breadcrumbs: [{ name: title, url: localizedUrl(lang, route) }]
  });
}

function renderToolsPage(lang) {
  const l = languages[lang];
  const meta = {
    zh: ["工具和原创图解", "手麻地图、颈椎曲度图解和 24 小时反应记录器", "用原创图解和小工具帮助读者整理线索。结果只用于教育和记录，不能替代诊断。"],
    en: ["Tools and original visuals", "Nerve maps, curve diagrams, and a 24-hour response tracker", "Original visuals and small tools help readers organize clues. Results are educational records, not diagnoses."],
    ja: ["ツールと図解", "しびれマップ、頸椎カーブ図、24時間反応記録", "図解と小ツールで手がかりを整理します。結果は教育と記録用で診断ではありません。"],
    es: ["Herramientas y visuales", "Mapas nerviosos, diagramas de curva y registro de 24 horas", "Visuales originales y herramientas pequeñas ayudan a ordenar pistas. El resultado es educativo, no diagnóstico."]
  }[lang];
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
  return htmlShell({ lang, route: "tools", title: meta[1], description: meta[2], content, breadcrumbs: [{ name: meta[1], url: localizedUrl(lang, "tools") }] });
}

function renderVideosPage(lang) {
  const l = languages[lang];
  const meta = {
    zh: ["参考视频索引", "YouTube 只作为动作参考，不替代站内内容", "先读本站说明，再把视频当成动作视觉参考。任何视频都不能替代个人诊断、处方或复健计划。"],
    en: ["Reference video index", "YouTube is a visual reference, not a replacement for site content", "Read the on-site explanation first, then use video for visual reference. No video replaces diagnosis, prescription, or individualized rehab."],
    ja: ["参考動画インデックス", "YouTubeは動作参考であり、本文の代わりではありません", "まずサイト内説明を読み、動画は視覚的参考として使います。診断、処方、個別リハビリの代わりではありません。"],
    es: ["Índice de videos de referencia", "YouTube es referencia visual, no reemplazo del contenido", "Lee primero la explicación del sitio y usa el video como referencia visual. Ningún video sustituye diagnóstico, prescripción ni rehabilitación individual."]
  }[lang];
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
                  <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="${escapeHtml(title)}" loading="lazy" />
                  <span class="video-play" aria-hidden="true"></span>
                  <span class="video-platform">YouTube</span>
                </a>
                <div class="video-body">
                  <span class="video-meta">${escapeHtml(tag)} · ${escapeHtml(source)}</span>
                  <h2>${escapeHtml(title)}</h2>
                  <p>${escapeHtml(meta[2])}</p>
                  <a class="video-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer">YouTube reference</a>
                </div>
              </article>`
            )
            .join("\n")}
        </div>
        <aside class="ad-slot ad-slot-article" aria-label="${escapeHtml(l.ad)}"><span>${escapeHtml(l.ad)}</span></aside>
      </article>
    </main>`;
  return htmlShell({ lang, route: "videos", title: meta[1], description: meta[2], content, breadcrumbs: [{ name: meta[1], url: localizedUrl(lang, "videos") }] });
}

function writePage(path, html) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, html);
}

const allArticles = [...existingArticles, ...newArticles];

for (const article of newArticles) {
  for (const lang of Object.keys(languages)) {
    writePage(outputArticle(lang, article.slug), renderArticlePage(article, lang));
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
}

const growthData = {
  strings: Object.fromEntries(Object.entries(languages).map(([lang, value]) => [lang, value.growthStrings])),
  articleCards: Object.fromEntries(
    Object.keys(languages).map((lang) => [
      lang,
      [
        ...newArticles.map((article) => cardForArticle(article, lang)),
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
  ...Object.keys(hubs).flatMap((route) => Object.keys(languages).map((lang) => localizedPath(lang, route))),
  ...["tools", "videos"].flatMap((route) => Object.keys(languages).map((lang) => localizedPath(lang, route))),
  ...staticUrls
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${reviewDate}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync("sitemap.xml", sitemap);

console.log(
  `Generated ${newArticles.length * Object.keys(languages).length} new article pages, ${Object.keys(hubs).length * Object.keys(languages).length} hub pages, tools/videos pages, growth data, and ${sitemapUrls.length} sitemap URLs.`
);
