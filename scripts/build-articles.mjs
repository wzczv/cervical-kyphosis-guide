import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const baseUrl = "https://cervicalcurveguide.com";
const version = "20260609-content-clusters";
const reviewDate = "2026-06-09";

const languages = {
  zh: {
    htmlLang: "zh-Hans",
    hreflang: "zh-Hans",
    prefix: "",
    label: "中文",
    short: "中文",
    home: "/",
    nav: {
      learn: "认识",
      symptoms: "症状",
      rehab: "康复",
      sports: "运动",
      guides: "专题",
      faq: "问答"
    },
    footer:
      "一个面向颈椎曲度保守康复的多语言健康教育原型。",
    lastReviewed: "最后审校：2026 年 6 月 9 日",
    medicalNoticeLabel: "医疗提醒：",
    adLabel: "广告位",
    medicalNote:
      "本站只做健康教育，不做诊断、处方或复健计划。新出现或加重的无力、麻木扩散、手变笨、走路不稳、大小便异常、发热、肿瘤病史或明显外伤，应尽快就医。",
    sourceHeading: "参考来源",
    relatedHeading: "继续阅读",
    homeLabel: "返回首页"
  },
  en: {
    htmlLang: "en",
    hreflang: "en",
    prefix: "/en",
    label: "English",
    short: "EN",
    home: "/en/",
    nav: {
      learn: "Learn",
      symptoms: "Symptoms",
      rehab: "Rehab",
      sports: "Sports",
      guides: "Guides",
      faq: "FAQ"
    },
    footer:
      "Built as a multilingual educational prototype for conservative cervical curve care.",
    lastReviewed: "Last reviewed: June 9, 2026",
    medicalNoticeLabel: "Medical notice:",
    adLabel: "Advertisement",
    medicalNote:
      "This page is educational, not a diagnosis, prescription, or rehabilitation plan. New or worsening weakness, spreading numbness, hand clumsiness, walking changes, bowel/bladder symptoms, fever, cancer history, or significant trauma need prompt medical care.",
    sourceHeading: "References",
    relatedHeading: "Keep reading",
    homeLabel: "Back to home"
  },
  ja: {
    htmlLang: "ja",
    hreflang: "ja",
    prefix: "/ja",
    label: "日本語",
    short: "日本語",
    home: "/ja/",
    nav: {
      learn: "理解",
      symptoms: "症状",
      rehab: "リハビリ",
      sports: "スポーツ",
      guides: "特集",
      faq: "FAQ"
    },
    footer: "頸椎カーブの保存的ケアを扱う多言語教育プロトタイプです。",
    lastReviewed: "最終確認：2026年6月9日",
    medicalNoticeLabel: "医療上の注意：",
    adLabel: "広告枠",
    medicalNote:
      "このページは教育目的であり、診断、処方、個別のリハビリ計画ではありません。新しい筋力低下、しびれの拡大、手の不器用さ、歩行変化、排尿排便の異常、発熱、がんの既往、大きな外傷がある場合は早めに医療相談をしてください。",
    sourceHeading: "参考文献",
    relatedHeading: "続けて読む",
    homeLabel: "ホームへ戻る"
  },
  es: {
    htmlLang: "es",
    hreflang: "es",
    prefix: "/es",
    label: "Español",
    short: "ES",
    home: "/es/",
    nav: {
      learn: "Aprender",
      symptoms: "Síntomas",
      rehab: "Rehab",
      sports: "Deporte",
      guides: "Guías",
      faq: "FAQ"
    },
    footer:
      "Prototipo educativo multilingüe para cuidado conservador de la curva cervical.",
    lastReviewed: "Última revisión: 9 de junio de 2026",
    medicalNoticeLabel: "Aviso médico:",
    adLabel: "Publicidad",
    medicalNote:
      "Esta página es educativa; no es diagnóstico, prescripción ni plan de rehabilitación. Debilidad nueva o progresiva, entumecimiento que se extiende, torpeza de la mano, cambios al caminar, síntomas urinarios/intestinales, fiebre, antecedente de cáncer o traumatismo importante requieren atención médica.",
    sourceHeading: "Referencias",
    relatedHeading: "Seguir leyendo",
    homeLabel: "Volver al inicio"
  }
};

const articles = [
  {
    slug: "finger-numbness-nerve-map",
    sources: [
      {
        label: "NCBI Bookshelf: Cervical Radiculopathy",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK441828/"
      },
      {
        label: "PMC: Cervical radiculopathy review",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4958381/"
      },
      {
        label: "AAFP: Nonoperative Management of Cervical Radiculopathy",
        url: "https://www.aafp.org/afp/2016/0501/p746"
      },
      {
        label: "MedlinePlus: Carpal Tunnel Syndrome",
        url: "https://medlineplus.gov/carpaltunnelsyndrome.html"
      },
      {
        label: "MedlinePlus: Ulnar Nerve Dysfunction",
        url: "https://medlineplus.gov/ency/article/000789.htm"
      },
      {
        label: "NCBI Bookshelf: Radial Nerve Entrapment",
        url: "https://www.ncbi.nlm.nih.gov/sites/books/NBK431097/"
      },
      {
        label: "MedlinePlus: Thoracic Outlet Syndrome",
        url: "https://medlineplus.gov/thoracicoutletsyndrome.html"
      }
    ],
    translations: {
      zh: {
        title: "手指麻木地图：颈椎神经根、腕管、尺神经和胸廓出口怎么区分",
        description:
          "保守解释拇指、食指、中指、无名指、小指麻木可能对应的颈椎神经根和周围神经线索，以及什么时候应尽快就医。",
        kicker: "症状专题",
        headline: "手指麻木是线索，不是自我诊断。",
        intro: [
          "很多人看到“颈椎反弓”或“颈椎曲度变直”后，会把手麻直接归因于颈椎。但手指麻木的来源可以在颈椎神经根，也可以在腕部、肘部、前臂、胸廓出口，甚至同时存在两个卡压点。",
          "更稳妥的做法是把手指分布、诱发姿势、力量变化、反射和症状进展放在一起看。下面的地图适合用来整理线索，再带给医生或康复师讨论。"
        ],
        callout:
          "不要只凭“哪根手指麻”就确定病因。神经分布会重叠，个体差异很常见，影像报告也不能单独证明疼痛来源。",
        sections: [
          {
            title: "先看危险信号",
            body: [
              "如果麻木快速扩散，或伴随新出现的无力、拿东西掉落、写字/扣扣子变笨、走路不稳、大小便异常、发热、明显外伤、肿瘤病史，优先级不是做拉伸，而是尽快接受医疗评估。",
              "单纯轻微刺麻可以先观察，但持续恶化、夜间痛醒、影响握力或精细动作时，也应尽早就医。"
            ]
          },
          {
            title: "常见分布模式",
            table: {
              headers: ["可能来源", "常见区域", "额外线索"],
              rows: [
                ["C6 神经根", "拇指、食指、桡侧前臂", "可伴腕背伸或肱二头肌无力，颈部后仰或偏向患侧可能加重。"],
                ["C7 神经根", "中指，或食指/中指附近", "可伴肱三头肌无力或反射变化，手臂放射痛较常见。"],
                ["C8 神经根", "无名指、小指、尺侧前臂", "可伴握力、手指屈曲力量变化。"],
                ["正中神经 / 腕管", "拇指、食指、中指、无名指桡侧半", "常被夜间、打字、骑车、手腕弯曲诱发。"],
                ["尺神经 / 肘管或 Guyon 管", "小指、无名指尺侧半", "常被长时间屈肘、压肘、车把或握持压力诱发。"],
                ["桡神经浅支", "拇指背侧、虎口背侧、手背桡侧", "常与腕带、前臂压迫、手腕姿势有关，通常不完全跟随颈部姿势。"],
                ["胸廓出口 / 下臂丛", "弥散手麻，常偏尺侧", "可被上举手臂、背重包、肩下沉或长时间划水姿势诱发。"]
              ]
            }
          },
          {
            title: "记录诱因比猜病名更有用",
            bullets: [
              "颈部后仰、转头、咳嗽或打喷嚏会不会让手麻往下跑？这更像神经根线索。",
              "夜间、手腕弯曲、键盘鼠标或骑车后更明显？要考虑腕管或局部周围神经。",
              "长时间屈肘、压着肘部或握把后小指/无名指麻？尺神经线索更强。",
              "抬高手臂、背包带、冲浪划水后整条手臂沉重或麻？需要考虑胸廓出口或臂丛受刺激。"
            ]
          },
          {
            title: "保守处理的边界",
            body: [
              "轻度、稳定、没有无力的症状，通常可以先减少诱发姿势，调整工作和运动暴露，并用温和活动建立基线。神经滑动应像“滑动”而不是强拉伸，做完后不应让麻木更尖锐或更久。",
              "如果症状向更远端扩散、力量下降、第二天明显更差，说明当前动作或剂量不合适。此时应停止自我加量，优先评估。"
            ]
          }
        ]
      },
      en: {
        title: "Finger Numbness Map: Cervical Nerve Root or Peripheral Nerve?",
        description:
          "A conservative guide to thumb, index, middle, ring, and little-finger numbness patterns, cervical nerve roots, peripheral nerve clues, and red flags.",
        kicker: "Symptom guide",
        headline: "Finger numbness is a clue, not a self-diagnosis.",
        intro: [
          "After seeing “cervical kyphosis” or “loss of cervical lordosis” on an imaging report, it is easy to blame every hand symptom on the neck. In reality, numbness can come from a cervical nerve root, the wrist, elbow, forearm, thoracic outlet, or more than one site at the same time.",
          "A safer approach is to combine finger distribution with triggers, weakness, reflexes, and symptom trajectory. Use this map to organize clues before discussing the pattern with a clinician."
        ],
        callout:
          "Do not diagnose the cause from one numb finger. Nerve territories overlap, individual patterns vary, and imaging language alone does not prove the pain source.",
        sections: [
          {
            title: "Check red flags first",
            body: [
              "Rapidly spreading numbness, new weakness, dropping objects, handwriting or buttoning changes, walking imbalance, bowel/bladder symptoms, fever, significant trauma, or cancer history should move the issue from self-care to prompt medical evaluation.",
              "Mild tingling can be monitored, but symptoms that keep worsening, wake you at night, or affect grip and fine hand control deserve earlier assessment."
            ]
          },
          {
            title: "Common pattern map",
            table: {
              headers: ["Possible source", "Common area", "Extra clues"],
              rows: [
                ["C6 nerve root", "Thumb, index finger, radial forearm", "May include wrist-extension or biceps weakness; neck extension or side-bending toward symptoms may aggravate it."],
                ["C7 nerve root", "Middle finger, sometimes index/middle region", "May include triceps weakness or reflex change; radiating arm pain is common."],
                ["C8 nerve root", "Ring and little fingers, medial forearm", "May involve grip or finger-flexion strength changes."],
                ["Median nerve / carpal tunnel", "Thumb, index, middle, radial half of ring finger", "Often worse at night, with typing, cycling, or bent-wrist positions."],
                ["Ulnar nerve / cubital or Guyon's tunnel", "Little finger and ulnar half of ring finger", "Often worse with prolonged elbow flexion, elbow pressure, handlebars, or gripping."],
                ["Superficial radial nerve", "Back of thumb, index web space, radial back of hand", "Often linked with tight straps, forearm pressure, or wrist position rather than neck position."],
                ["Thoracic outlet / lower brachial plexus", "Diffuse arm or hand tingling, often ulnar-side dominant", "May worsen with overhead arms, heavy straps, shoulder depression, or prolonged paddling posture."]
              ]
            }
          },
          {
            title: "Triggers are often more useful than labels",
            bullets: [
              "Does neck extension, turning, coughing, or sneezing send symptoms down the arm? That supports a nerve-root clue.",
              "Is it worse at night, with wrist flexion, keyboard/mouse work, or cycling? Consider carpal tunnel or local peripheral nerve loading.",
              "Does prolonged elbow flexion, leaning on the elbow, or gripping bring on ring/little-finger numbness? The ulnar nerve becomes more suspicious.",
              "Do overhead positions, backpack straps, or surf paddling make the arm feel heavy or tingly? Think about thoracic outlet or brachial plexus irritation."
            ]
          },
          {
            title: "Where conservative care has limits",
            body: [
              "Mild, stable symptoms without weakness may start with reducing triggers, adjusting work and sport exposure, and using gentle motion to establish a baseline. Nerve glides should feel like easy sliding, not aggressive stretching.",
              "If symptoms spread farther down the arm, strength drops, or the next day is clearly worse, the current drill or dose is not appropriate. Stop increasing load and seek evaluation."
            ]
          }
        ]
      },
      ja: {
        title: "指のしびれマップ：頸椎神経根か、末梢神経か",
        description:
          "親指、人差し指、中指、薬指、小指のしびれを、頸椎神経根、手根管、尺骨神経、橈骨神経、胸郭出口の手がかりから保守的に整理します。",
        kicker: "症状特集",
        headline: "指のしびれは手がかりであり、自己診断ではありません。",
        intro: [
          "画像レポートで「頸椎後弯」や「頸椎前弯減少」と書かれると、手のしびれをすべて首のせいにしたくなります。実際には、原因は頸椎神経根、手首、肘、前腕、胸郭出口、または複数部位の組み合わせで起こります。",
          "安全な見方は、指の分布だけでなく、誘発姿勢、筋力、反射、症状の進行を合わせて考えることです。このマップは医療者に相談する前の整理に使ってください。"
        ],
        callout:
          "しびれる指だけで原因を断定しないでください。神経の領域は重なり、個人差もあります。画像所見だけで痛みの原因は決まりません。",
        sections: [
          {
            title: "まず危険サインを確認する",
            body: [
              "しびれが急に広がる、新しい筋力低下、物を落とす、字を書く・ボタンを留める動作が不器用になる、歩行不安定、排尿排便異常、発熱、大きな外傷、がんの既往がある場合は、自己ケアより医療評価が優先です。",
              "軽いしびれは観察できることもありますが、悪化し続ける、夜間に目が覚める、握力や細かい手作業に影響する場合は早めの相談が必要です。"
            ]
          },
          {
            title: "よくある分布パターン",
            table: {
              headers: ["考えられる由来", "出やすい部位", "追加の手がかり"],
              rows: [
                ["C6 神経根", "親指、人差し指、橈側前腕", "手首伸展や上腕二頭筋の弱さを伴うことがあり、首の伸展や患側への傾きで悪化することがあります。"],
                ["C7 神経根", "中指、ときに人差し指/中指周辺", "上腕三頭筋の弱さや反射変化を伴い、腕へ走る痛みがよく見られます。"],
                ["C8 神経根", "薬指、小指、尺側前腕", "握力や指を曲げる力の変化が手がかりになります。"],
                ["正中神経 / 手根管", "親指、人差し指、中指、薬指の橈側半分", "夜間、タイピング、自転車、手首を曲げた姿勢で悪化しやすいです。"],
                ["尺骨神経 / 肘部管または Guyon 管", "小指、薬指の尺側半分", "長い肘曲げ、肘への圧迫、ハンドル、強いグリップで悪化しやすいです。"],
                ["浅橈骨神経", "親指背側、母指と示指の間、手背橈側", "きついストラップ、前腕圧迫、手首姿勢に関連し、首の姿勢とは一致しないことがあります。"],
                ["胸郭出口 / 下部腕神経叢", "腕や手の広いしびれ、尺側優位が多い", "腕を上げる、重いストラップ、肩の下制、長いパドリングで悪化することがあります。"]
              ]
            }
          },
          {
            title: "誘因を記録すると整理しやすい",
            bullets: [
              "首を反らす、振り向く、咳やくしゃみで腕へ広がるなら神経根の手がかりです。",
              "夜間、手首を曲げる姿勢、キーボード、マウス、自転車で悪化するなら手根管や末梢神経の負荷を考えます。",
              "肘を曲げ続ける、肘をつく、握り続けると薬指・小指がしびれるなら尺骨神経が疑わしくなります。",
              "腕を上げる、リュックのストラップ、サーフィンのパドリングで腕全体が重い・しびれる場合は胸郭出口や腕神経叢も考えます。"
            ]
          },
          {
            title: "保存的ケアの限界",
            body: [
              "軽く安定していて筋力低下がない症状では、誘発姿勢を減らし、仕事やスポーツ負荷を調整し、軽い運動で基準を作ることがあります。神経グライドは強いストレッチではなく、楽に滑らせる運動です。",
              "症状が手の遠くへ広がる、筋力が落ちる、翌日にはっきり悪化する場合、その運動や量は合っていません。負荷を増やさず評価を受けてください。"
            ]
          }
        ]
      },
      es: {
        title: "Mapa de dedos dormidos: raíz cervical o nervio periférico",
        description:
          "Guía prudente para interpretar entumecimiento en pulgar, índice, medio, anular y meñique según raíces cervicales, túnel carpiano, nervio cubital, radial y salida torácica.",
        kicker: "Guía de síntomas",
        headline: "Los dedos dormidos orientan, pero no diagnostican por sí solos.",
        intro: [
          "Después de leer “cifosis cervical” o “pérdida de lordosis” en una imagen, es tentador culpar al cuello de todo síntoma de la mano. En realidad, el origen puede estar en una raíz cervical, muñeca, codo, antebrazo, salida torácica o en más de un punto.",
          "Lo prudente es combinar distribución por dedos, posturas que lo provocan, fuerza, reflejos y evolución. Usa este mapa para ordenar pistas antes de hablar con un profesional."
        ],
        callout:
          "No diagnostiques la causa por un solo dedo dormido. Los territorios nerviosos se superponen, hay variación individual y una imagen por sí sola no prueba el origen del dolor.",
        sections: [
          {
            title: "Primero descarta señales de alarma",
            body: [
              "Entumecimiento que se extiende rápido, debilidad nueva, soltar objetos, torpeza para escribir o abotonar, cambios al caminar, síntomas urinarios/intestinales, fiebre, traumatismo importante o antecedente de cáncer requieren evaluación médica pronta.",
              "Un hormigueo leve puede observarse, pero si empeora, despierta por la noche o afecta agarre y movimientos finos, conviene evaluarlo antes."
            ]
          },
          {
            title: "Patrones frecuentes",
            table: {
              headers: ["Posible origen", "Zona frecuente", "Pistas extra"],
              rows: [
                ["Raíz C6", "Pulgar, índice, antebrazo radial", "Puede acompañarse de debilidad de extensión de muñeca o bíceps; extensión o inclinación del cuello puede agravarlo."],
                ["Raíz C7", "Dedo medio, a veces zona índice/medio", "Puede acompañarse de debilidad del tríceps o cambio de reflejo; suele haber dolor que baja por el brazo."],
                ["Raíz C8", "Anular y meñique, antebrazo medial", "Puede cambiar el agarre o la fuerza de flexión de los dedos."],
                ["Nervio mediano / túnel carpiano", "Pulgar, índice, medio y mitad radial del anular", "A menudo peor de noche, al teclear, montar en bici o con la muñeca flexionada."],
                ["Nervio cubital / túnel cubital o Guyon", "Meñique y mitad cubital del anular", "A menudo peor con codo flexionado, presión sobre el codo, manillares o agarre."],
                ["Nervio radial superficial", "Dorso del pulgar, espacio pulgar-índice, dorso radial de la mano", "Suele relacionarse con correas, presión en antebrazo o postura de muñeca más que con la postura del cuello."],
                ["Salida torácica / plexo braquial inferior", "Hormigueo difuso del brazo o mano, a menudo lado cubital", "Puede empeorar con brazos elevados, correas pesadas, hombro deprimido o remada prolongada."]
              ]
            }
          },
          {
            title: "Los desencadenantes ayudan más que la etiqueta",
            bullets: [
              "¿Extender o girar el cuello, toser o estornudar manda síntomas al brazo? Eso apoya una pista de raíz nerviosa.",
              "¿Empeora de noche, con muñeca flexionada, teclado/ratón o bici? Considera túnel carpiano o carga de nervio periférico.",
              "¿Flexionar el codo mucho tiempo, apoyarlo o agarrar fuerte provoca anular y meñique? El nervio cubital gana sospecha.",
              "¿Brazos elevados, mochila o remada de surf hacen el brazo pesado u hormigueante? Piensa en salida torácica o plexo braquial."
            ]
          },
          {
            title: "Límites del autocuidado conservador",
            body: [
              "Síntomas leves, estables y sin debilidad pueden empezar con menos exposición a posturas irritantes, ajustes de trabajo/deporte y movimiento suave para crear una línea base. Los deslizamientos neurales deben sentirse fáciles, no como estiramiento agresivo.",
              "Si el síntoma se extiende, baja la fuerza o el día siguiente es claramente peor, el ejercicio o la dosis no son adecuados. No aumentes carga y busca evaluación."
            ]
          }
        ]
      }
    }
  },
  {
    slug: "sports-neck-load-return-guide",
    sources: [
      {
        label: "PMC: Surfer's myelopathy review",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7919899/"
      },
      {
        label: "PMC: Surfer's myelopathy case series and literature review",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6280062/"
      },
      {
        label: "PubMed: Spinal injury in alpine winter sports review",
        url: "https://pubmed.ncbi.nlm.nih.gov/31324221/"
      },
      {
        label: "PMC: Return-to-play recommendations after spine injuries",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4702157/"
      },
      {
        label: "PMC: Return to play after cervical spine injuries consensus",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5110349/"
      },
      {
        label: "DOI: Cervical strains while belaying in climbing",
        url: "https://doi.org/10.1016/j.orthtr.2013.05.002"
      }
    ],
    translations: {
      zh: {
        title: "颈椎反弓还能冲浪、滑雪或攀岩吗？运动负荷与回归指南",
        description:
          "解释冲浪划水、滑雪/单板冲击风险、攀岩保护仰头与颈椎负荷的关系，并给出保守的 24 小时症状规则。",
        kicker: "运动专题",
        headline: "运动不是简单的“能做”或“不能做”。",
        intro: [
          "颈椎反弓或曲度变直并不自动意味着必须停止所有运动。真正需要管理的是：颈部姿势暴露多久、是否有手臂神经症状、运动是否包含高速冲击，以及运动后 24 小时的反应。",
          "下面的框架适合非急症、症状稳定的人用来规划回归运动。它不是伤后复出许可，也不能替代医生或康复师的个体化评估。"
        ],
        callout:
          "任何明显头颈部摔伤后出现手麻、无力、头晕、走路异常或颈痛持续加重，都不应该继续运动测试，应先接受评估。",
        sections: [
          {
            title: "先用 24 小时规则",
            bullets: [
              "运动中症状上升不超过约 2/10，且不向手指或手臂远端扩散。",
              "当天晚上和第二天没有新麻木、无力、睡眠明显变差。",
              "连续 2-3 次稳定后，只增加一个变量：时间、强度、浪况/雪况、线路难度或装备难度。",
              "如果第二天更差，下次总量减少 30-50%，而不是用更多拉伸硬压过去。"
            ]
          },
          {
            title: "冲浪：划水是长时间俯卧伸展",
            body: [
              "冲浪划水需要胸椎和腰椎伸展，头部抬起，肩部反复发力。胸椎伸展不足或肩胛耐力不足时，颈椎可能承担更多后仰和压缩。",
              "文献中严重的 surfer's myelopathy 多见于新手、长时间俯卧过伸，通常涉及脊髓和下肢症状。它不能直接等同于慢性颈痛或手指麻，但提醒我们：长时间过伸不是无风险姿势。"
            ],
            bullets: [
              "症状波动期先用高浮力板、更短 session、较平缓浪况。",
              "记录划水分钟、duck dive 次数、下水总时长和第二天手麻/握力。",
              "训练胸椎伸展和肩胛耐力时，目光低、后颈长，不把练习做成拼命仰脖子。"
            ]
          },
          {
            title: "滑雪和单板：重点是摔倒机制和疲劳",
            body: [
              "滑雪/单板的风险核心不是姿势美不美，而是高速摔倒、碰撞、跳台失败、疲劳导致的反应变慢。文献综述提示冬季高山运动存在多种脊柱损伤机制，严重脊髓损伤虽少见，但颈椎可受累。",
              "复出标准应更保守：接近完整的颈部活动度、双臂力量稳定、没有新的神经症状，再考虑速度和难度。"
            ],
            bullets: [
              "午饭后、长休息后和疲劳时先回到简单线路。",
              "症状波动期避开跳台、冰面高速、拥挤雪道和连续大冲击。",
              "摔伤后出现手麻、无力、头晕或走路异常，停止当天运动。"
            ]
          },
          {
            title: "攀岩：很多人的问题在保护，而不是攀爬",
            body: [
              "攀岩本身通常是间歇性动作，但保护者可能长时间抬头看攀爬者。持续颈部后仰会增加关节、肌肉和神经组织负荷。",
              "保护眼镜、站位调整和轮换保护者，往往比多做一个颈部拉伸更直接。前提是安全观察不下降，使用前要熟悉设备。"
            ],
            bullets: [
              "长线路或 project 日每 15-20 分钟考虑换保。",
              "保护量和攀爬量分开记录，不要只看线路难度。",
              "症状波动期减少长时间仰头，优先短线路、换保或低风险抱石。"
            ]
          }
        ]
      },
      en: {
        title: "Can You Surf, Ski, Snowboard, or Climb with Cervical Kyphosis?",
        description:
          "A conservative return-to-sport guide for neck curve findings, surf paddling, ski/snowboard impact risk, climbing belay posture, and the 24-hour symptom rule.",
        kicker: "Sport guide",
        headline: "Sport is rarely a simple yes or no.",
        intro: [
          "Cervical kyphosis or a straightened cervical curve does not automatically mean you must stop every sport. The real questions are exposure time, nerve symptoms, impact risk, and how your neck and arm respond over the next 24 hours.",
          "This framework is for stable, non-emergency situations. It is not medical clearance after injury and cannot replace individualized evaluation."
        ],
        callout:
          "After a significant head or neck fall, do not use sport as a test if you have hand numbness, weakness, dizziness, walking changes, or worsening neck pain. Get evaluated first.",
        sections: [
          {
            title: "Start with the 24-hour rule",
            bullets: [
              "Symptoms during sport should not rise more than about 2/10 or spread farther into the arm or fingers.",
              "That night and the next day should bring no new numbness, weakness, or major sleep disruption.",
              "After 2-3 stable sessions, increase only one variable: duration, intensity, wave/snow conditions, route difficulty, or equipment challenge.",
              "If the next day is worse, reduce the next session by 30-50% instead of trying to stretch through it."
            ]
          },
          {
            title: "Surfing: paddling is prolonged prone extension",
            body: [
              "Surf paddling asks for thoracic and lumbar extension, a raised head, and repeated shoulder work. If thoracic extension or scapular endurance is limited, the neck may take more extension and compression.",
              "Published surfer's myelopathy cases focus on rare but serious spinal-cord injury in novices after prolonged prone hyperextension, often with leg symptoms. That does not equal ordinary chronic neck pain, but it does remind us that prolonged extension is not a neutral load."
            ],
            bullets: [
              "During a flare, favor more board volume, shorter sessions, and calmer conditions.",
              "Track paddling minutes, duck dives, total water time, and next-day numbness or grip changes.",
              "When training thoracic extension and scapular endurance, keep the gaze low and the back of the neck long."
            ]
          },
          {
            title: "Skiing and snowboarding: falls and fatigue matter most",
            body: [
              "For ski and snowboard participation, the main concern is not posture aesthetics. It is high-speed falls, collisions, jump failure, and fatigue-driven decisions. Reviews describe multiple spinal injury mechanisms in alpine winter sports; severe cord injury is uncommon but can involve the cervical spine.",
              "Return criteria should be conservative: near-full neck motion, stable arm strength, and no new neurological symptoms before speed and difficulty are progressed."
            ],
            bullets: [
              "After lunch, long breaks, or fatigue, restart on easier terrain.",
              "During symptom flares, avoid jumps, icy high-speed runs, crowded terrain, and repeated heavy impacts.",
              "After a fall with hand numbness, weakness, dizziness, or walking changes, stop the day and seek evaluation."
            ]
          },
          {
            title: "Climbing: the belayer's neck often takes the load",
            body: [
              "Climbing itself is intermittent, but belaying can hold the neck in extension while watching a partner overhead. Sustained upward gaze can load joints, muscles, and neural tissues.",
              "Belay glasses, stance changes, and rotating belayers may reduce load more directly than another neck stretch, as long as safety checks remain intact and the device is familiar."
            ],
            bullets: [
              "On long routes or project days, consider rotating belayers every 15-20 minutes.",
              "Track belay time separately from climbing difficulty.",
              "During flares, reduce sustained upward gaze with shorter routes, partner swaps, or lower-risk bouldering choices."
            ]
          }
        ]
      },
      ja: {
        title: "頸椎後弯でもサーフィン、スキー、スノーボード、クライミングはできる？",
        description:
          "頸椎カーブ所見がある人向けに、サーフィンのパドリング、スキー/スノーボードの衝撃、クライミングのビレイ姿勢、24時間ルールを整理します。",
        kicker: "スポーツ特集",
        headline: "スポーツは単純な「可」か「不可」ではありません。",
        intro: [
          "頸椎後弯や頸椎前弯減少があるからといって、すべてのスポーツを自動的に中止する必要はありません。見るべきものは、姿勢の時間、神経症状、衝撃リスク、そして次の24時間の反応です。",
          "この枠組みは、症状が安定している非緊急の人向けです。外傷後の復帰許可ではなく、個別評価の代わりにはなりません。"
        ],
        callout:
          "頭頸部を強く打った後に手のしびれ、筋力低下、めまい、歩行変化、悪化する首痛がある場合、スポーツで試さず評価を受けてください。",
        sections: [
          {
            title: "まず24時間ルールを使う",
            bullets: [
              "運動中の症状上昇は約2/10以内で、腕や指へ広がらないこと。",
              "その夜と翌日に、新しいしびれ、筋力低下、強い睡眠悪化がないこと。",
              "2-3回安定したら、時間、強度、波/雪の条件、ルート難度、道具の難度のうち一つだけ増やします。",
              "翌日悪化した場合は、次回を30-50%減らし、ストレッチで無理に押し切らないでください。"
            ]
          },
          {
            title: "サーフィン：パドリングは長い腹ばい伸展",
            body: [
              "パドリングでは胸椎と腰椎の伸展、頭部挙上、肩の反復運動が必要です。胸椎伸展や肩甲帯の持久力が不足すると、頸椎が伸展と圧縮を多く受けます。",
              "文献上の surfer's myelopathy は、初心者が長時間腹ばいで過伸展した後のまれだが重い脊髄障害が中心で、脚症状を伴うことが多いです。慢性首痛そのものとは同じではありませんが、長時間伸展が中立的な負荷ではないことを示します。"
            ],
            bullets: [
              "増悪期は浮力のあるボード、短いセッション、穏やかなコンディションを選びます。",
              "パドリング時間、ダックダイブ回数、水上時間、翌日のしびれや握力を記録します。",
              "胸椎伸展と肩甲帯持久力を練習する時は、目線を低く、後頸部を長く保ちます。"
            ]
          },
          {
            title: "スキーとスノーボード：転倒と疲労が重要",
            body: [
              "問題は姿勢の見た目ではなく、高速転倒、衝突、ジャンプ失敗、疲労による判断低下です。高山ウィンタースポーツのレビューでは複数の脊柱損傷機序が報告され、重い脊髄損傷はまれですが頸椎が関わることがあります。",
              "復帰基準は保守的に、首の可動域がほぼ戻り、腕の筋力が安定し、新しい神経症状がないことを確認してから速度や難度を上げます。"
            ],
            bullets: [
              "昼食後、長い休憩後、疲労時は簡単な斜面から再開します。",
              "症状がある日はジャンプ、氷面高速、混雑した斜面、反復する強い衝撃を避けます。",
              "転倒後に手のしびれ、筋力低下、めまい、歩行変化が出たら、その日は中止し評価を受けます。"
            ]
          },
          {
            title: "クライミング：ビレイヤーの首に負荷が集まりやすい",
            body: [
              "登る動作は間欠的ですが、ビレイでは相手を見上げ続けるため首が伸展位に保たれます。長い上向き視線は関節、筋肉、神経組織に負荷をかけます。",
              "安全確認を保てる範囲で、ビレイグラス、立ち位置の調整、ビレイヤー交代は、首のストレッチより直接的な減負荷になることがあります。"
            ],
            bullets: [
              "長いルートや project 日は、15-20分ごとにビレイヤー交代を考えます。",
              "登ったグレードだけでなく、ビレイ時間も別に記録します。",
              "増悪期は短いルート、交代多め、または低リスクのボルダーで長い上向き姿勢を減らします。"
            ]
          }
        ]
      },
      es: {
        title: "¿Puedes surfear, esquiar, hacer snowboard o escalar con cifosis cervical?",
        description:
          "Guía conservadora para volver al deporte con hallazgos de curva cervical, remada de surf, impactos en esquí/snowboard, postura de aseguramiento y regla de 24 horas.",
        kicker: "Guía deportiva",
        headline: "El deporte rara vez es un sí o no simple.",
        intro: [
          "Tener cifosis cervical o una curva rectificada no significa suspender todo deporte automáticamente. Importan el tiempo de exposición, los síntomas nerviosos, el riesgo de impacto y la respuesta del cuello y brazo durante las siguientes 24 horas.",
          "Este marco es para situaciones estables y no urgentes. No es autorización tras una lesión ni reemplaza una evaluación individual."
        ],
        callout:
          "Tras una caída importante de cabeza o cuello, no uses el deporte como prueba si hay entumecimiento de mano, debilidad, mareo, cambios al caminar o dolor cervical que empeora. Evalúate primero.",
        sections: [
          {
            title: "Empieza con la regla de 24 horas",
            bullets: [
              "Durante el deporte, los síntomas no deberían subir más de unos 2/10 ni extenderse más hacia brazo o dedos.",
              "Esa noche y el día siguiente no deberían aparecer nuevo entumecimiento, debilidad ni gran alteración del sueño.",
              "Tras 2-3 sesiones estables, aumenta solo una variable: duración, intensidad, condiciones de olas/nieve, dificultad de ruta o equipo.",
              "Si el día siguiente es peor, reduce la próxima sesión 30-50% en lugar de intentar compensar con más estiramientos."
            ]
          },
          {
            title: "Surf: remar es extensión prolongada boca abajo",
            body: [
              "Remar exige extensión torácica y lumbar, cabeza elevada y trabajo repetido de hombros. Si falta movilidad torácica o resistencia escapular, el cuello puede asumir más extensión y compresión.",
              "Los casos publicados de surfer's myelopathy describen una lesión medular rara pero grave en principiantes tras hiperextensión prolongada en prono, a menudo con síntomas de piernas. No equivale al dolor cervical crónico común, pero recuerda que la extensión prolongada no es una carga neutra."
            ],
            bullets: [
              "Durante una reagudización, usa más volumen de tabla, sesiones cortas y condiciones tranquilas.",
              "Registra minutos de remada, duck dives, tiempo total en agua y cambios de entumecimiento o agarre al día siguiente.",
              "Al entrenar extensión torácica y resistencia escapular, mantén mirada baja y nuca larga."
            ]
          },
          {
            title: "Esquí y snowboard: caídas y fatiga pesan más",
            body: [
              "La preocupación principal no es la estética postural, sino caídas a velocidad, colisiones, fallos de salto y decisiones tomadas con fatiga. Las revisiones describen varios mecanismos de lesión espinal en deportes alpinos; la lesión medular grave es poco frecuente, pero puede involucrar la columna cervical.",
              "Los criterios de vuelta deben ser conservadores: movilidad cervical casi completa, fuerza de brazos estable y sin síntomas neurológicos nuevos antes de progresar velocidad y dificultad."
            ],
            bullets: [
              "Después de comer, pausas largas o fatiga, reinicia en terreno fácil.",
              "Durante brotes, evita saltos, hielo a alta velocidad, zonas concurridas e impactos repetidos.",
              "Tras una caída con entumecimiento de mano, debilidad, mareo o cambios al caminar, termina el día y busca evaluación."
            ]
          },
          {
            title: "Escalada: el cuello del asegurador suele cargar más",
            body: [
              "Escalar es intermitente, pero asegurar puede mantener el cuello en extensión mirando a la persona que sube. La mirada sostenida hacia arriba carga articulaciones, músculos y tejido neural.",
              "Gafas de aseguramiento, cambios de posición y rotar aseguradores pueden reducir carga más directamente que otro estiramiento, siempre que la seguridad visual se mantenga y el equipo sea familiar."
            ],
            bullets: [
              "En rutas largas o días de proyecto, considera rotar aseguradores cada 15-20 minutos.",
              "Registra tiempo de aseguramiento separado de la dificultad escalada.",
              "Durante brotes, reduce mirada sostenida hacia arriba con rutas más cortas, cambios de compañero o boulder de menor riesgo."
            ]
          }
        ]
      }
    }
  }
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function urlFor(lang, slug) {
  const prefix = languages[lang].prefix;
  return `${baseUrl}${prefix}/articles/${slug}/`;
}

function pathFor(lang, slug) {
  const prefix = languages[lang].prefix;
  return `${prefix}/articles/${slug}/`;
}

function outputPath(lang, slug) {
  const prefix = languages[lang].prefix.replace(/^\//, "");
  return join(prefix, "articles", slug, "index.html");
}

function renderParagraphs(paragraphs) {
  return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n");
}

function renderBullets(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderTable(table) {
  return `
            <div class="table-wrap article-table-wrap">
              <table>
                <thead>
                  <tr>${table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
                </thead>
                <tbody>
                  ${table.rows
                    .map(
                      (row) =>
                        `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`
                    )
                    .join("\n")}
                </tbody>
              </table>
            </div>`;
}

function renderSections(sections) {
  return sections
    .map((section) => {
      const body = [
        section.body ? renderParagraphs(section.body) : "",
        section.table ? renderTable(section.table) : "",
        section.bullets ? renderBullets(section.bullets) : ""
      ]
        .filter(Boolean)
        .join("\n");
      return `<section class="article-section">
            <h2>${escapeHtml(section.title)}</h2>
            ${body}
          </section>`;
    })
    .join("\n");
}

function renderSources(article, lang) {
  const labels = languages[lang];
  return `<section class="article-section article-sources" aria-labelledby="article-sources-title">
            <h2 id="article-sources-title">${escapeHtml(labels.sourceHeading)}</h2>
            <ul class="source-list">
              ${article.sources
                .map(
                  (source) =>
                    `<li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
                      source.label
                    )}</a></li>`
                )
                .join("\n")}
            </ul>
          </section>`;
}

function renderRelated(currentArticle, lang) {
  const labels = languages[lang];
  const items = articles
    .filter((article) => article.slug !== currentArticle.slug)
    .map((article) => {
      const translation = article.translations[lang];
      return `<a class="article-related-card" href="${pathFor(lang, article.slug)}">
                <span>${escapeHtml(translation.kicker)}</span>
                <strong>${escapeHtml(translation.title)}</strong>
              </a>`;
    })
    .join("\n");
  return `<section class="article-section">
            <h2>${escapeHtml(labels.relatedHeading)}</h2>
            <div class="article-related-grid">
              <a class="article-related-card" href="${labels.home}">
                <span>Cervical Curve Guide</span>
                <strong>${escapeHtml(labels.homeLabel)}</strong>
              </a>
              ${items}
            </div>
          </section>`;
}

function renderLanguageLinks(activeLang, slug) {
  return Object.entries(languages)
    .map(([lang, labels]) => {
      const active = lang === activeLang ? " is-active" : "";
      const pressed = lang === activeLang ? "true" : "false";
      return `<a class="lang-button${active}" href="${pathFor(lang, slug)}" hreflang="${labels.hreflang}" aria-pressed="${pressed}">${labels.short}</a>`;
    })
    .join("\n");
}

function renderHreflang(slug) {
  return [
    `<link rel="alternate" hreflang="x-default" href="${urlFor("zh", slug)}" />`,
    ...Object.entries(languages).map(
      ([lang, labels]) =>
        `<link rel="alternate" hreflang="${labels.hreflang}" href="${urlFor(lang, slug)}" />`
    )
  ].join("\n    ");
}

function renderStructuredData(article, translation, lang) {
  const labels = languages[lang];
  const pageUrl = urlFor(lang, article.slug);
  const graph = [
    {
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}#medical-page`,
      name: translation.title,
      headline: translation.title,
      description: translation.description,
      url: pageUrl,
      inLanguage: labels.htmlLang,
      medicalAudience: "Patient",
      isAccessibleForFree: true,
      lastReviewed: reviewDate,
      dateModified: reviewDate,
      about: [
        "Cervical kyphosis",
        "Loss of cervical lordosis",
        "Cervical radiculopathy",
        "Neck rehabilitation",
        "Return to sport"
      ],
      isPartOf: { "@id": `${baseUrl}/#website` }
    },
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: translation.title,
      description: translation.description,
      url: pageUrl,
      image: `${baseUrl}/assets/hero-cervical-kyphosis.jpg`,
      inLanguage: labels.htmlLang,
      datePublished: reviewDate,
      dateModified: reviewDate,
      author: {
        "@type": "Organization",
        name: "Cervical Curve Guide"
      },
      publisher: {
        "@type": "Organization",
        name: "Cervical Curve Guide"
      },
      isPartOf: { "@id": `${pageUrl}#medical-page` }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Cervical Curve Guide",
          item: `${baseUrl}${labels.home}`
        },
        {
          "@type": "ListItem",
          position: 2,
          name: translation.title,
          item: pageUrl
        }
      ]
    }
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

function renderArticle(article, lang) {
  const labels = languages[lang];
  const translation = article.translations[lang];
  const pageUrl = urlFor(lang, article.slug);
  const siteNav = `
        <a href="${labels.home}#learn">${labels.nav.learn}</a>
        <a href="${labels.home}#symptoms">${labels.nav.symptoms}</a>
        <a href="${labels.home}#rehab">${labels.nav.rehab}</a>
        <a href="${labels.home}#sports">${labels.nav.sports}</a>
        <a href="${labels.home}#guides">${labels.nav.guides}</a>
        <a href="${labels.home}#faq">${labels.nav.faq}</a>`;

  return `<!doctype html>
<html lang="${labels.htmlLang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(translation.title)} | Cervical Curve Guide</title>
    <meta name="description" content="${escapeHtml(translation.description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta name="author" content="Cervical Curve Guide" />
    <meta name="theme-color" content="#f5fbfb" />
    <link rel="canonical" href="${pageUrl}" />
    ${renderHreflang(article.slug)}
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(translation.title)}" />
    <meta property="og:description" content="${escapeHtml(translation.description)}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${baseUrl}/assets/hero-cervical-kyphosis.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(translation.title)}" />
    <meta name="twitter:description" content="${escapeHtml(translation.description)}" />
    <meta name="twitter:image" content="${baseUrl}/assets/hero-cervical-kyphosis.jpg" />
    <link rel="stylesheet" href="/assets/styles.css?v=${version}" />
    <script type="application/ld+json">${renderStructuredData(article, translation, lang)}</script>
  </head>
  <body>
    <a class="skip-link" href="#article-content">${labels.nav.guides}</a>
    <header class="site-header">
      <a class="brand" href="${labels.home}" aria-label="Cervical Curve Guide home">
        <span class="brand-mark" aria-hidden="true">C</span>
        <span>Cervical Curve Guide</span>
      </a>
      <nav class="main-nav" aria-label="Primary navigation">
        ${siteNav}
      </nav>
      <div class="language-switcher" role="group" aria-label="Article language">
        ${renderLanguageLinks(lang, article.slug)}
      </div>
    </header>
    <main class="legal-main article-main" id="article-content">
      <article class="legal-article article-page">
        <p class="legal-meta">${escapeHtml(labels.lastReviewed)} · ${escapeHtml(translation.kicker)}</p>
        <h1>${escapeHtml(translation.headline)}</h1>
        <div class="article-dek">
          ${renderParagraphs(translation.intro)}
        </div>
        <aside class="article-callout">
          ${escapeHtml(translation.callout)}
        </aside>
        ${renderSections(translation.sections)}
        <aside class="ad-slot ad-slot-article" aria-label="Advertisement">
          <span>${escapeHtml(labels.adLabel)}</span>
        </aside>
        ${renderSources(article, lang)}
        ${renderRelated(article, lang)}
      </article>
      <aside class="notice-band article-notice" aria-label="Medical notice">
        <strong>${escapeHtml(labels.medicalNoticeLabel)}</strong>
        <span>${escapeHtml(labels.medicalNote)}</span>
      </aside>
    </main>
    <footer class="site-footer">
      <p>${escapeHtml(labels.footer)}</p>
      <nav class="footer-links" aria-label="Footer links">
        <a href="/about.html">About</a>
        <a href="/editorial-policy.html">Editorial policy</a>
        <a href="/medical-review-policy.html">Medical review</a>
        <a href="/contact.html">Contact</a>
        <a href="/disclaimer.html">Medical disclaimer</a>
        <a href="/privacy.html">Privacy</a>
        <a href="/terms.html">Terms</a>
        <a href="${labels.home}#top">${escapeHtml(labels.homeLabel)}</a>
      </nav>
    </footer>
  </body>
</html>
`;
}

for (const article of articles) {
  for (const lang of Object.keys(languages)) {
    const filePath = outputPath(lang, article.slug);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, renderArticle(article, lang));
  }
}

console.log(`Generated ${articles.length * Object.keys(languages).length} article pages.`);
