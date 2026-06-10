import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const baseUrl = "https://cervicalcurveguide.com";
const slug = "surfing-cervical-kyphosis-rehab-experience";
const version = "20260609-pillar";
const reviewDate = "2026-06-10";

const languages = {
  zh: {
    htmlLang: "zh-Hans",
    hreflang: "zh-Hans",
    prefix: "/zh",
    home: "/zh/",
    short: "中文",
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
    updated: "最后审校：2026 年 6 月 10 日",
    review:
      "个人经验分享；已按健康教育与安全边界检查，尚未由具名执业临床人员独立审阅。",
    noticeLabel: "医疗提醒：",
    notice:
      "本站只做健康教育，不做诊断、处方或复健计划。新出现或加重的无力、麻木扩散、手变笨、走路不稳、大小便异常、发热、肿瘤病史或明显外伤，应尽快就医。",
    trackerTitle: "把症状先记录 7 天",
    trackerBody:
      "记录疼痛、手麻、睡眠、诱因和第二天反应，再决定是否调整练习或带去就医讨论。",
    trackerAction: "打开记录表",
    sourceHeading: "参考来源",
    relatedHeading: "继续阅读",
    ad: "广告位",
    footer: "一个面向颈椎曲度保守康复的多语言健康教育网站。",
    readMore: "继续阅读"
  },
  en: {
    htmlLang: "en",
    hreflang: "en",
    prefix: "",
    home: "/",
    short: "EN",
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
    updated: "Last reviewed: June 10, 2026",
    review:
      "Personal experience essay; checked for health-education boundaries and safety language, not yet independently reviewed by a named licensed clinician.",
    noticeLabel: "Medical notice:",
    notice:
      "This site is educational, not a diagnosis, prescription, or rehabilitation plan. New or worsening weakness, spreading numbness, hand clumsiness, walking changes, bowel/bladder symptoms, fever, cancer history, or significant trauma need prompt medical care.",
    trackerTitle: "Track symptoms for 7 days first",
    trackerBody:
      "Record pain, numbness, sleep, triggers, and next-day response before changing exercises or discussing care.",
    trackerAction: "Open the tracker",
    sourceHeading: "References",
    relatedHeading: "Keep reading",
    ad: "Advertisement",
    footer: "A multilingual health-education site for conservative cervical curve care.",
    readMore: "Read more"
  },
  ja: {
    htmlLang: "ja",
    hreflang: "ja",
    prefix: "/ja",
    home: "/ja/",
    short: "日本語",
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
    updated: "最終確認：2026年6月10日",
    review:
      "個人の経験談です。健康教育としての安全境界は確認済みですが、氏名を表示した有資格臨床家による独立レビューは未完了です。",
    noticeLabel: "医療上の注意：",
    notice:
      "このサイトは教育目的であり、診断、処方、個別のリハビリ計画ではありません。新しい筋力低下、しびれの拡大、手の不器用さ、歩行変化、排尿排便の異常、発熱、がんの既往、大きな外傷がある場合は早めに医療相談をしてください。",
    trackerTitle: "まず7日間、症状を記録する",
    trackerBody:
      "痛み、しびれ、睡眠、誘因、翌日の反応を整理してから、運動調整や医療相談につなげます。",
    trackerAction: "記録表を開く",
    sourceHeading: "参考文献",
    relatedHeading: "続けて読む",
    ad: "広告枠",
    footer: "頸椎カーブの保存的ケアを扱う多言語健康教育サイトです。",
    readMore: "続きを読む"
  },
  es: {
    htmlLang: "es",
    hreflang: "es",
    prefix: "/es",
    home: "/es/",
    short: "ES",
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
    updated: "Última revisión: 10 de junio de 2026",
    review:
      "Ensayo de experiencia personal; revisado con límites de educación sanitaria y lenguaje de seguridad, aún sin revisión independiente por un profesional clínico identificado.",
    noticeLabel: "Aviso médico:",
    notice:
      "Este sitio es educativo; no es diagnóstico, prescripción ni plan de rehabilitación. Debilidad nueva o progresiva, entumecimiento que se extiende, torpeza de la mano, cambios al caminar, síntomas urinarios/intestinales, fiebre, antecedente de cáncer o traumatismo importante requieren atención médica.",
    trackerTitle: "Registra síntomas durante 7 días",
    trackerBody:
      "Anota dolor, entumecimiento, sueño, desencadenantes y respuesta al día siguiente antes de cambiar ejercicios o consultar.",
    trackerAction: "Abrir registro",
    sourceHeading: "Referencias",
    relatedHeading: "Seguir leyendo",
    ad: "Publicidad",
    footer:
      "Sitio multilingüe de educación sanitaria para cuidado conservador de la curva cervical.",
    readMore: "Leer más"
  }
};

const sources = [
  {
    label: "NCBI Bookshelf: Cervical Radiculopathy",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK441828/"
  },
  {
    label: "NCBI Bookshelf: Cervical Traction",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK470412/"
  },
  {
    label: "PMC: Surfer's myelopathy review",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7919899/"
  },
  {
    label: "PubMed: Neck Pain Clinical Practice Guideline",
    url: "https://pubmed.ncbi.nlm.nih.gov/28666405/"
  },
  {
    label: "MedlinePlus: Thoracic Outlet Syndrome",
    url: "https://medlineplus.gov/thoracicoutletsyndrome.html"
  }
];

const translations = {
  zh: {
    title: "颈椎反弓 + 冲浪：我亲历的康复动作清单",
    description:
      "一位冲浪者颈椎反弓、椎间盘后突、椎管狭窄合并神经根症状的第一人称康复记录：哪些动作真正帮到我，哪些反而诱发右手麻，以及胸椎主导划水的回归框架。",
    kicker: "亲历记录 / 运动与颈椎负荷",
    headline:
      "颈椎反弓 + 冲浪：我亲历的康复动作清单（以及那些反而让我手更麻的动作）",
    cardTag: "亲历记录",
    cardTitle: "颈椎反弓 + 冲浪：我亲历的康复动作清单",
    cardBody:
      "一位冲浪者记录哪些康复动作帮到自己、哪些动作反而诱发右手麻，以及如何用胸椎主导划水和 24 小时法则回归下水。",
    intro: [
      "这不是“照着练”的处方，而是一份第一人称复盘：我怎样从盯着片子上的反弓，转向盯着症状、代偿和 24 小时反应。",
      "文章最有价值的部分，不是哪个动作一定有效，而是哪些经典动作在我当时的敏感状态下反而让手更麻，以及我为什么把它们停掉。"
    ],
    callout:
      "<strong>重要提示：</strong>这是个人康复经历，不是诊断，也不是给你的处方。神经根症状的动作选择高度个体化。新出现或加重的肢体无力、麻木扩散、手部精细动作变差、握力下降、走路踩棉花、平衡变差、大小便控制感变化、外伤后颈痛、发热或肿瘤病史，请先就医。",
    sections: [
      {
        id: "my-case",
        title: "我的情况",
        blocks: [
          {
            type: "p",
            html:
              "几年前我第一次拍核磁，报告写着“颈椎生理曲度变直、反弓”。那次的症状是右侧小臂到大臂之间一条线在疼。后来靠<strong>普拉提 + 拉伸</strong>练好了，疼痛消失，我也就没再当回事。"
          },
          {
            type: "p",
            html:
              "直到最近半年，我恢复了<strong>力量训练</strong>，又重新开始<strong>冲浪</strong>，右手开始发麻：拇指、食指、中指，接近 C6/C7 神经根常见分布。复查核磁这次写得更重："
          },
          {
            type: "ul",
            items: [
              "C3/4-C6/7 多节段椎间盘后突",
              "C4/5-C6/7 椎管明显狭窄",
              "C5 椎体后滑移，也就是失稳线索",
              "颈椎反弓"
            ]
          },
          {
            type: "p",
            html:
              "我去了上海一家以脊柱外科著称的三甲医院面诊。医生当面看原片、查体后的结论是：<strong>手术可选、不是必须</strong>，保守治疗仍然可行。医生放开了<strong>游泳</strong>和<strong>引体向上</strong>，也说适度后仰没问题，但不要长时间低头。"
          },
          {
            type: "p",
            html:
              "这篇文章就是我在这个框架下，一个动作一个动作试出来的记录。它的重点不是替你决定能不能冲浪，而是示范怎样把“理论上应该有用”的动作，放回自己的症状反应里验证。"
          }
        ]
      },
      {
        id: "symptoms-first",
        title: "改变我整个思路的一句话：曲度重要，但症状更重要",
        blocks: [
          {
            type: "p",
            html:
              "我一开始的执念，和很多看到“反弓”报告的人一样：<strong>想把曲度掰回来</strong>。后来我才理解，影像上的曲度不等于诊断。同样是反弓，有人没症状，有人手麻。真正决定我能不能冲浪、能不能训练的，不是片子上那条弧线长什么样，而是："
          },
          {
            type: "ul",
            items: [
              "哪个姿势会诱发我的手麻？",
              "一个动作做完后 24 小时内，症状是更轻、不变，还是更重？",
              "症状有没有从颈肩向上臂、前臂、手指扩散？",
              "有没有力量、精细动作、走路和平衡的变化？"
            ]
          },
          {
            type: "p",
            html:
              "我把训练目标从“恢复曲度”换成“<strong>让症状稳定、可控、不向手臂扩散</strong>”之后，整件事才走上正轨。值得练的不是那条弧线本身，而是围绕它的肌肉控制、负荷管理和姿势习惯。"
          }
        ]
      },
      {
        id: "surfing-is-not-correction",
        title: "一个一定要讲清楚的误区：冲浪不是“后仰矫正”",
        blocks: [
          {
            type: "quote",
            html:
              "“颈椎反弓是长期低头造成的，那冲浪划水时抬头后仰，不正好是反向矫正吗？”"
          },
          {
            type: "p",
            html:
              "这个直觉在脊柱上不成立。腰椎过度前凸的人不会靠整天驼背来“反向矫正”；颈椎反弓也一样。更合理的方向是<strong>回到中立位 + 训练深层稳定肌</strong>，不是把脖子长期推到另一个极端。"
          },
          {
            type: "table",
            headers: ["维度", "修复反弓的训练动作", "冲浪划水"],
            rows: [
              ["后伸角度", "通常是轻微、短时、可控", "常见大幅抬头，且要持续看浪"],
              ["持续时间", "每次几秒到几十秒", "可以连续 30-60 分钟"],
              ["负重", "无或很小", "水的阻力、重力和肩部反复发力"],
              ["动作复杂度", "单纯后伸或中立控制", "后伸、旋转、划水、海况干扰同时出现"],
              ["目的", "激活和控制", "看浪、追浪、划出去"]
            ]
          },
          {
            type: "p",
            html:
              "医生说的“后仰没问题”，指的是生理范围内、短时、可控的后伸。冲浪划水是它的放大版：长时间、大角度、带旋转和负重，还不可控。对我这种叠加了椎管狭窄、椎间盘后突和 C5 后滑移的颈椎，后伸位很容易变成神经根被刺激的环境。"
          },
          {
            type: "p",
            html:
              "这也是为什么医生放开游泳，我却把冲浪单独拎出来重新评估：自由泳配呼吸管、仰泳可以把颈椎维持在更中立的位置；冲浪划水不是。"
          }
        ]
      },
      {
        id: "stopped-exercises",
        title: "那些反而让我手更麻的动作（我停掉的）",
        blocks: [
          {
            type: "h3",
            html: "1. 站姿 chin tuck（收下巴）"
          },
          {
            type: "p",
            html:
              "最让我意外的是站姿收下巴。它几乎是所有颈椎科普的第一个动作，但我站着做会诱发右手拇指、食指、中指发麻。我的推测是：重力位下颈深屈肌没力，上斜方肌和肩胛提肌抢着代偿，反而挤压了右侧神经根出口。"
          },
          {
            type: "p",
            html:
              "<strong>我的处理：</strong>站姿版全停。卧姿、非常轻的基础版本相对温和，但也要看当天症状。"
          },
          {
            type: "h3",
            html: "2. Sphinx pose、俯卧眼镜蛇、俯卧 T/Y、四点支撑胸椎旋转"
          },
          {
            type: "p",
            html:
              "这一类“趴姿 + 抬头/抬手”的动作，是我踩得最狠的坑。理论上 Sphinx 可以保持颈椎中立，但我做完会出现右侧颈部发酸、右手发麻。趴着时人很容易无意识抬头；而我又有根深蒂固的上斜方代偿，任何抬手动作都默认用脖子帮忙。"
          },
          {
            type: "p",
            html:
              "<strong>关键认知：</strong>所有趴姿抬头/抬手，对我来说都很像陆地版冲浪划水。症状急性敏感期，这一整类我先停掉。"
          },
          {
            type: "h3",
            html: "3. 弹力带 pull-apart / 靠墙 W 字"
          },
          {
            type: "p",
            html:
              "这两个本来是练肩胛稳定的常见动作，但我一做就出现两块肩胛骨之间发酸，和冲浪后的不适感一模一样。它成了一个有用的诊断信号：问题不只在结构，而在运动控制。"
          },
          {
            type: "p",
            html:
              "<strong>我的处理：</strong>症状期回避，等代偿模式改善后再低强度重新引入。"
          },
          {
            type: "h3",
            html: "4. 把 chin tuck 和肩胛后缩合并成一个动作"
          },
          {
            type: "p",
            html:
              "我曾经想省事，把收下巴和肩胛后缩一起做。结果两个目标互相打架，哪个都没练到位。后来我把它们拆开：收下巴只练颈深屈肌，肩胛后缩只练中下斜方。"
          },
          {
            type: "h3",
            html: "5. 家用颈椎牵引器"
          },
          {
            type: "p",
            html:
              "我研究过家用下巴托式牵引器，但没有买。因为我有 C5 后滑移和明显椎管狭窄，这些都是牵引需要非常谨慎甚至不适合自行尝试的线索。在已经不稳的颈椎上施加持续外力，可能沿着原本的失稳方向继续制造剪切。"
          },
          {
            type: "p",
            html:
              "<strong>我的处理：</strong>不买。真正的解法是改变环境：电脑垫高到齐眼、外接键盘、手机举到视线高度。本站的 <a href=\"/zh/articles/cervical-traction-contraindications/\">颈椎牵引指南</a> 对禁忌讲得更全。"
          }
        ]
      },
      {
        id: "safe-list",
        title: "症状急性期我保留下来的动作（我的安全清单）",
        blocks: [
          {
            type: "p",
            html:
              "把上面那些停掉之后，我手里还剩这些。它们的共同点是：<strong>颈部全程中立、被支撑，或者根本不让脖子参与发力</strong>。"
          },
          {
            type: "h3",
            html: "缓解类：温和地安抚神经"
          },
          {
            type: "ul",
            items: [
              "<strong>斜角肌三方向拉伸：</strong>轻柔，缓解颈前侧紧张。",
              "<strong>正中神经滑动：</strong>注意是滑动，不是硬拉伸；不在终末端停留，次数宁少勿多，第二天早上再评估。若麻变尖锐、做完仍持续或范围扩大，就停。",
              "<strong>左侧颈部拉伸：</strong>拉我右侧过紧的肌肉，方向对、感觉安全。"
            ]
          },
          {
            type: "h3",
            html: "核心 + 下肢：让颈部全程不发力"
          },
          {
            type: "ul",
            items: [
              "死虫、鸟狗、前臂侧平板、Pallof press。",
              "农夫行走，但保持下巴微收、肩不耸。",
              "深蹲先降到 50%、髋桥、腿弯举；不抬头看镜子。"
            ]
          },
          {
            type: "h3",
            html: "温和上背激活"
          },
          {
            type: "ul",
            items: [
              "反向耸肩。",
              "普拉提小球俯卧滚动：手放小球上前推后拉，前提是当天不诱发症状。"
            ]
          },
          {
            type: "h3",
            html: "游泳：医生放开，但分泳姿"
          },
          {
            type: "table",
            headers: ["泳姿", "颈椎友好度", "说明"],
            rows: [
              ["自由泳 + 前置呼吸管", "最佳", "颈椎全程中立，不用扭头呼吸。"],
              ["仰泳", "友好", "水的浮力支撑头部。"],
              ["自由泳侧呼吸", "中等", "必须双侧轮换，避免总向一侧扭。"],
              ["抬头蛙泳", "大忌", "每划一次都让脖子后伸一次。"]
            ]
          },
          {
            type: "h3",
            html: "引体向上：医生放开，但分版本"
          },
          {
            type: "ul",
            items: [
              "<strong>可以：</strong>严格引体、起手先死悬 5-10 秒、下巴微收过杆、保留体力不力竭。",
              "<strong>先不做：</strong>甩腿式、颈后引体、练到力竭的最后两个、负重引体。"
            ]
          },
          {
            type: "p",
            html:
              "我还发现一个细节：走路时双臂自然下垂会诱发我胸廓出口型手麻。我临时的办法是把手插进口袋，让肩带不要被向下牵拉。本站的 <a href=\"/zh/articles/finger-numbness-nerve-map/\">手指麻木图谱</a> 里也讲了这种“同一只手两个压迫点”的可能。"
          }
        ]
      },
      {
        id: "return-to-surf",
        title: "冲浪回归框架：胸椎主导划水 + 24 小时法则",
        blocks: [
          {
            type: "p",
            html:
              "这是我最舍不得放弃、也花最多心思改造的部分。核心思路一句话：<strong>不要用脖子去抬头，让上背把胸顶起来</strong>。"
          },
          {
            type: "table",
            headers: ["方案", "实现方式", "颈椎应力"],
            rows: [
              ["颈椎主导", "趴板后用颈椎后伸 30-60 度去抬头", "高"],
              ["胸椎主导", "趴板 + 前臂撑，胸椎打开，胸廓抬升，颈椎保持中立", "更低"]
            ]
          },
          {
            type: "p",
            html:
              "但这里必须诚实：我在症状急性期，连前臂撑高胸的 Sphinx 都会诱发手麻。所以胸椎主导划水是<strong>症状稳定之后的目标</strong>，不是手还在麻时硬上的急救动作。"
          },
          {
            type: "h3",
            html: "陆上准备"
          },
          {
            type: "ul",
            items: [
              "<strong>泡沫轴胸椎伸展：</strong>泡沫轴横放中上背，托住头，呼气沉入伸展，6-8 次 x 2 组。",
              "<strong>Low cobra hold：</strong>只抬胸骨一点点，视线看前方地面，颈部拉长，10-20 秒 x 4-6 次。",
              "<strong>趴板划水预演：</strong>小幅撑胸，轻松划 20-30 秒 x 4 组；只有全程症状安静，才加到 60-90 秒。"
            ]
          },
          {
            type: "h3",
            html: "等浪姿势"
          },
          {
            type: "ul",
            items: [
              "耳垂对齐肩膀，头不前移。",
              "看浪时先动眼球，不用整个脖子找浪。",
              "用听浪声、同伴提醒和间歇扫描，减少长时间盯浪。",
              "波间 30 秒放松：耸肩再沉肩 x3、避开后伸位的小弧度转头、深呼吸 + 肩胛后缩 x3。"
            ]
          },
          {
            type: "h3",
            html: "水中剂量"
          },
          {
            type: "ul",
            items: [
              "假期限定，不日常连续冲。",
              "每 7 天假期 3 次，每次全程 1.5 小时，纯划水控制在 45-60 分钟。",
              "至少隔 1 天，绝不连续两天。",
              "24 小时法则：手麻、刺痛或颈痛上升超过约 2/10，或持续到第二天，下次直接砍掉 30-50%。",
              "每次只增加一个变量：时长、抓浪数、浪的大小、板的难度、划水强度，五选一。",
              "刚复发后优先大板、长板或泡沫板，减少疯狂划水和长时间抬头。"
            ]
          },
          {
            type: "h3",
            html: "上岸三问"
          },
          {
            type: "ol",
            items: [
              "颈部是“被用了但没报警”，还是已经在响警报？",
              "有没有任何手麻或上肢酸胀？任何 yes，当天不再下水。",
              "当晚和第二天有没有新症状？有的话，下次方案降一档。"
            ]
          }
        ]
      },
      {
        id: "compensation-awareness",
        title: "比动作更重要的一件事：先学会感知代偿",
        blocks: [
          {
            type: "p",
            html:
              "如果这篇文章只记一件事，我希望是这个：我真正的问题不只在那条反弓弧线，而在一个根深蒂固的<strong>上斜方代偿模式</strong>。MRI 能告诉我结构，但不能告诉我刷牙、泡咖啡、划水、练肩胛时，到底是不是又在用脖子帮忙。"
          },
          {
            type: "ul",
            items: [
              "刷牙、泡咖啡、用电脑时，把手放在颈后那块容易发酸的位置，一紧张就主动松开，并问自己“我现在在做什么让它工作”。",
              "用镜子做视觉反馈：耳朵是否在肩膀正上方？有没有探头？有没有耸肩？",
              "改造环境，而不是靠意志对抗：屏幕齐眼、外接键盘、手机举到视线、久坐每 30 分钟起身一次。"
            ]
          }
        ]
      },
      {
        id: "principles",
        title: "我的核心原则（一页总结）",
        blocks: [
          {
            type: "ol",
            items: [
              "<strong>症状 > 曲度。</strong>别只盯片子上的弧线，盯 24 小时反应。",
              "<strong>反弓的修复方向是中立位 + 深层稳定。</strong>不是反向后伸到底。",
              "<strong>冲浪不等于医生说的“适度后仰”。</strong>游泳能放开，不代表冲浪自动能放开。",
              "<strong>趴姿抬头/抬手很像陆地版划水。</strong>症状期我先停掉。",
              "<strong>牵引对失稳 + 椎管狭窄需要格外谨慎。</strong>我选择改环境，不买器械。",
              "<strong>胸椎主导划水是目标，不是急救。</strong>手还在麻时不要硬上。",
              "<strong>先感知代偿，再练动作。</strong>问题在运动控制，不只在弧线。",
              "<strong>每次只动一个变量。</strong>用 24 小时法则进退。"
            ]
          }
        ]
      },
      {
        id: "closing",
        title: "结语",
        blocks: [
          {
            type: "p",
            html:
              "我把这段经历写下来，不是因为我“练好了”。颈椎反弓 + 椎管狭窄是结构上的易感体质，我接受它会长期存在。我能做的是避免诱发、重建代偿，让它在大多数日常和我喜欢的运动里够用。"
          },
          {
            type: "p",
            html:
              "也正因为这是我个人的、和脊柱外科医生反复确认过的路径，请不要直接照搬。你该做的第一步不是抄我的清单，而是先筛查危险信号，配合临床查体，用本站的 <a href=\"/zh/printable-neck-symptom-tracker/\">7 天追踪表</a> 记录自己的 24 小时反应，再决定加减。"
          }
        ]
      }
    ]
  },
  en: {
    title: "Cervical Kyphosis + Surfing: My Rehab Exercise List",
    description:
      "A first-person recovery note from a surfer with cervical kyphosis, disc protrusions, stenosis, and nerve-root symptoms: what helped, what made the hand numbness worse, and a thoracic-led paddling framework.",
    kicker: "Personal experience / Sport neck load",
    headline:
      "Cervical kyphosis + surfing: my rehab exercise list, including the drills that made my hand more numb",
    cardTag: "Personal story",
    cardTitle: "Cervical kyphosis + surfing: my rehab exercise list",
    cardBody:
      "A surfer's first-person record of which rehab drills helped, which ones made right-hand numbness worse, and how thoracic-led paddling plus a 24-hour rule shaped the return plan.",
    intro: [
      "This is not a routine to copy. It is a first-person debrief on how I moved from obsessing over the curve on MRI to watching symptoms, compensation, and the 24-hour response.",
      "The most useful part may not be the exercises that helped me, but the classic rehab drills that made my hand more numb in that irritable phase, and why I stopped them."
    ],
    callout:
      "<strong>Important:</strong> This is personal experience, not a diagnosis or prescription. Exercise selection for nerve-root symptoms is highly individual. New or worsening limb weakness, spreading numbness, loss of fine hand control, grip loss, walking imbalance, bowel/bladder changes, neck pain after trauma, fever, or cancer history should be assessed medically first.",
    sections: [
      {
        id: "my-case",
        title: "My situation",
        blocks: [
          {
            type: "p",
            html:
              "Years ago, my first cervical MRI report said the normal cervical curve was straightened and reversed. Back then I had a line of pain from the right forearm toward the upper arm. Pilates and stretching eventually settled it, the pain disappeared, and I stopped paying attention."
          },
          {
            type: "p",
            html:
              "Over the last six months I restarted <strong>strength training</strong> and went back to <strong>surfing</strong>. Then my right hand began to go numb: thumb, index finger, and middle finger, which fits a common C6/C7-type distribution. The repeat MRI looked heavier:"
          },
          {
            type: "ul",
            items: [
              "Multilevel posterior disc protrusions from C3/4 to C6/7",
              "Marked canal stenosis from C4/5 to C6/7",
              "C5 retrolisthesis, suggesting instability",
              "Reversed cervical curve"
            ]
          },
          {
            type: "p",
            html:
              "I saw a spine surgeon at a major Shanghai hospital. After reviewing the original images and examining me, the message was: <strong>surgery was an option, not a must</strong>; conservative care was still reasonable. The surgeon allowed swimming and pull-ups, and said short, moderate extension was acceptable, but prolonged head-down posture was not."
          },
          {
            type: "p",
            html:
              "This article records how I tested exercises one by one inside that framework. It is not meant to decide whether you should surf. It is meant to show how I put supposedly helpful drills back into my own symptom response."
          }
        ]
      },
      {
        id: "symptoms-first",
        title: "The sentence that changed my thinking: the curve matters, but symptoms matter more",
        blocks: [
          {
            type: "p",
            html:
              "At first I had the same fixation many people have after reading a “reversed curve” report: <strong>I wanted to force the curve back</strong>. Later I understood that curve language on imaging is not the diagnosis by itself. Two people can have a similar curve report; one has no symptoms, another has hand numbness. What actually decides whether I can surf or train is not the shape of the line on the image, but:"
          },
          {
            type: "ul",
            items: [
              "Which positions reproduce my hand numbness?",
              "Within 24 hours after an exercise, are symptoms calmer, unchanged, or worse?",
              "Do symptoms spread from the neck and shoulder toward the arm or fingers?",
              "Is there any change in strength, hand coordination, walking, or balance?"
            ]
          },
          {
            type: "p",
            html:
              "Once I changed the goal from “restore the curve” to <strong>keep symptoms stable, controllable, and not spreading into the arm</strong>, the process became much more usable. The thing worth training was not the curve alone; it was muscle control, load management, and daily movement habits around it."
          }
        ]
      },
      {
        id: "surfing-is-not-correction",
        title: "A misconception I had to dismantle: surfing is not extension correction",
        blocks: [
          {
            type: "quote",
            html:
              "“If cervical kyphosis comes from too much looking down, then isn’t lifting my head while paddling a reverse correction?”"
          },
          {
            type: "p",
            html:
              "That intuition does not work well for the spine. A person with excessive lumbar arching would not be told to round the lower back all day as a correction. Cervical kyphosis is similar: the safer direction is <strong>neutral alignment plus deep stabilizer control</strong>, not pushing the neck into the opposite extreme for a long time."
          },
          {
            type: "table",
            headers: ["Dimension", "Rehab-style extension", "Surf paddling"],
            rows: [
              ["Extension range", "Small, short, controlled", "Often larger head lift to watch waves"],
              ["Duration", "Seconds to short holds", "30-60 minutes can accumulate"],
              ["Load", "None or light", "Water resistance, gravity, repeated shoulder effort"],
              ["Complexity", "Simple extension or neutral control", "Extension, rotation, paddling, and ocean variability together"],
              ["Purpose", "Activation and control", "Seeing waves, chasing waves, paddling out"]
            ]
          },
          {
            type: "p",
            html:
              "When my doctor said moderate extension was okay, he meant short, controlled extension inside a physiological range. Surf paddling is the magnified version: long duration, larger angle, rotation, load, and low control. For my neck, with stenosis, disc protrusions, and C5 retrolisthesis, that position could easily become a nerve-root irritant."
          },
          {
            type: "p",
            html:
              "That is why swimming was cleared while surfing needed its own assessment. Freestyle with a front snorkel and backstroke can keep the neck closer to neutral. Surf paddling does not."
          }
        ]
      },
      {
        id: "stopped-exercises",
        title: "Exercises that made my hand more numb, and I stopped",
        blocks: [
          { type: "h3", html: "1. Standing chin tucks" },
          {
            type: "p",
            html:
              "The biggest surprise was the standing chin tuck. It is often the first exercise in neck rehab content, but when I did it standing, my right thumb, index, and middle finger became numb. My best explanation is that, under gravity, my deep neck flexors were too weak and my upper trapezius and levator scapulae took over, increasing irritation around the right nerve-root exit."
          },
          {
            type: "p",
            html:
              "<strong>What I did:</strong> stopped the standing version. A very gentle lying version felt more tolerable, but only on days when symptoms were quiet."
          },
          { type: "h3", html: "2. Sphinx pose, prone cobra, prone T/Y, quadruped thoracic rotation" },
          {
            type: "p",
            html:
              "This whole family of “prone plus head lift or arm lift” drills was my biggest trap. In theory, sphinx can be done with a neutral neck. In practice, I finished with right-sided neck ache and right-hand numbness. When I am prone, I unconsciously lift the head. And I have a strong upper-trap compensation habit, so any arm lift invites the neck to help."
          },
          {
            type: "p",
            html:
              "<strong>The key realization:</strong> prone head-lift and arm-lift drills were land versions of surf paddling for me. During the acute irritable phase, I paused the whole category."
          },
          { type: "h3", html: "3. Band pull-aparts and wall W drills" },
          {
            type: "p",
            html:
              "These are common scapular-stability drills, but they recreated the exact ache between my shoulder blades that I felt after surfing. That was useful information: it told me the problem was not only structural; it was also movement control."
          },
          {
            type: "p",
            html:
              "<strong>What I did:</strong> avoided them during the symptomatic phase and planned to reintroduce them later at lower intensity."
          },
          { type: "h3", html: "4. Combining chin tuck and scapular retraction" },
          {
            type: "p",
            html:
              "I tried to save time by combining a chin tuck with scapular retraction. The two goals interfered with each other, and neither was trained well. I split them up: chin tucks for deep neck flexor control, scapular retraction for mid/lower trapezius control."
          },
          { type: "h3", html: "5. Home cervical traction devices" },
          {
            type: "p",
            html:
              "I looked into home traction devices, especially chin-support versions marketed for restoring curve. I did not buy one. With C5 retrolisthesis and marked canal stenosis, traction is something I would not self-prescribe. Applying sustained force to an already unstable segment could add shear in the wrong direction."
          },
          {
            type: "p",
            html:
              "<strong>What I did:</strong> changed the environment instead: screen at eye level, external keyboard, phone lifted to sightline. The site's <a href=\"/articles/cervical-traction-contraindications/\">cervical traction guide</a> covers contraindications in more detail."
          }
        ]
      },
      {
        id: "safe-list",
        title: "What stayed on my acute-phase safe list",
        blocks: [
          {
            type: "p",
            html:
              "After removing the aggravating drills, I kept the exercises that shared one feature: <strong>the neck stayed neutral, was supported, or did not need to generate force</strong>."
          },
          { type: "h3", html: "Calming drills" },
          {
            type: "ul",
            items: [
              "<strong>Three-direction scalene stretching:</strong> gentle, aimed at reducing front-of-neck tension.",
              "<strong>Median nerve glides:</strong> gliding, not aggressive stretching; no holding at end range, fewer reps, and reassess the next morning. If numbness becomes sharper, persists afterward, or spreads, stop.",
              "<strong>Left-side neck stretch:</strong> for the muscles that felt over-tight on my right side, using a direction that felt safe."
            ]
          },
          { type: "h3", html: "Core and lower-body work with the neck quiet" },
          {
            type: "ul",
            items: [
              "Dead bug, bird dog, forearm side plank, Pallof press.",
              "Farmer's carry, but with a slight chin nod and no shrugging.",
              "Squats reduced to about 50%, glute bridges, leg curls; no looking up at the mirror."
            ]
          },
          { type: "h3", html: "Gentle upper-back activation" },
          {
            type: "ul",
            items: [
              "Reverse shrugs.",
              "Pilates-ball prone rolling with the hands on the ball, only if symptoms stayed quiet that day."
            ]
          },
          { type: "h3", html: "Swimming, cleared by the doctor but not all strokes are equal" },
          {
            type: "table",
            headers: ["Stroke", "Neck friendliness", "Why"],
            rows: [
              ["Freestyle with front snorkel", "Best", "The neck can stay neutral without turning to breathe."],
              ["Backstroke", "Friendly", "Water supports the head."],
              ["Freestyle with side breathing", "Moderate", "Bilateral breathing matters; avoid always rotating one way."],
              ["Head-up breaststroke", "Avoid", "Every stroke forces the neck into extension."]
            ]
          },
          { type: "h3", html: "Pull-ups, cleared by the doctor but version matters" },
          {
            type: "ul",
            items: [
              "<strong>Yes:</strong> strict pull-ups, start with a 5-10 second dead hang, slight chin nod over the bar, stop before failure.",
              "<strong>Not yet:</strong> kipping, behind-the-neck pull-ups, the last two grinder reps, weighted pull-ups."
            ]
          },
          {
            type: "p",
            html:
              "I also noticed that walking with both arms hanging naturally could trigger thoracic-outlet-type hand numbness. My low-tech fix was to put my hands in my pockets so the shoulder girdle was not dragged down. The site's <a href=\"/articles/finger-numbness-nerve-map/\">finger numbness map</a> explains why the same hand can have more than one irritation point."
          }
        ]
      },
      {
        id: "return-to-surf",
        title: "My return-to-surf framework: thoracic-led paddling plus the 24-hour rule",
        blocks: [
          {
            type: "p",
            html:
              "This was the part I least wanted to give up, so I spent the most thought on it. The core idea is simple: <strong>do not lift the head with the neck; let the upper back lift the chest</strong>."
          },
          {
            type: "table",
            headers: ["Strategy", "How it happens", "Cervical stress"],
            rows: [
              ["Cervical-led paddling", "Prone position, then 30-60 degrees of neck extension to lift the head", "High"],
              ["Thoracic-led paddling", "Prone plus forearm support, upper thoracic extension, chest rises, neck stays long and neutral", "Lower"]
            ]
          },
          {
            type: "p",
            html:
              "But I need to be honest: during my acute phase, even a forearm-supported sphinx position could trigger hand numbness. Thoracic-led paddling is a <strong>later goal after symptoms settle</strong>, not an emergency drill while the hand is still numb."
          },
          { type: "h3", html: "Land preparation" },
          {
            type: "ul",
            items: [
              "<strong>Foam-roller thoracic extension:</strong> roller across the upper-mid back, support the head, exhale into extension, 6-8 reps x 2 sets.",
              "<strong>Low cobra hold:</strong> lift the sternum only a little, eyes toward the floor ahead, neck long, 10-20 seconds x 4-6 reps.",
              "<strong>Board paddling rehearsal:</strong> small chest lift, easy paddle motion for 20-30 seconds x 4 rounds; only build to 60-90 seconds if symptoms stay quiet."
            ]
          },
          { type: "h3", html: "Waiting for waves" },
          {
            type: "ul",
            items: [
              "Keep the earlobe stacked over the shoulder; no head jutting.",
              "Move the eyes first instead of scanning with the whole neck.",
              "Use wave sound, partner calls, and intermittent scanning to avoid staring up for too long.",
              "Between waves: shrug then drop shoulders x3, small arc turns that avoid end-range extension, deep breathing plus scapular retraction x3."
            ]
          },
          { type: "h3", html: "Water dose" },
          {
            type: "ul",
            items: [
              "Vacation-only exposure, not daily surfing.",
              "During a 7-day trip: 3 sessions, each 1.5 hours total, with pure paddling around 45-60 minutes.",
              "At least one rest day between sessions; no back-to-back days.",
              "24-hour rule: if hand numbness, tingling, or neck pain rises more than about 2/10 or lasts into the next day, cut the next exposure by 30-50%.",
              "Change only one variable at a time: duration, wave count, wave size, board difficulty, or paddling intensity.",
              "After a flare, start with a big board, longboard, or foam board to reduce frantic paddling and prolonged head lift."
            ]
          },
          { type: "h3", html: "Three questions after getting out" },
          {
            type: "ol",
            items: [
              "Did the neck feel used but calm, or was it already sounding an alarm?",
              "Was there any hand numbness or arm heaviness? Any yes means no more water that day.",
              "Did new symptoms show up that evening or the next day? If yes, the next plan drops one level."
            ]
          }
        ]
      },
      {
        id: "compensation-awareness",
        title: "More important than any drill: learning to feel compensation",
        blocks: [
          {
            type: "p",
            html:
              "If you remember one thing from this article, make it this: my real problem was not only the reversed curve; it was a deeply grooved <strong>upper-trap compensation pattern</strong>. MRI can show structure. It cannot tell me whether I am using my neck to help while brushing my teeth, making coffee, paddling, or doing scapular drills."
          },
          {
            type: "ul",
            items: [
              "When brushing teeth, making coffee, or working at the computer, I put a hand on the sore back-of-neck area. When it tenses, I relax it and ask, “What am I doing that made this muscle work?”",
              "I use a mirror for feedback: are the ears over the shoulders, is the head jutting, are the shoulders shrugging?",
              "I changed the environment instead of fighting it with willpower: screen at eye level, external keyboard, phone at sightline, and a stand-up break every 30 minutes."
            ]
          }
        ]
      },
      {
        id: "principles",
        title: "My one-page principle list",
        blocks: [
          {
            type: "ol",
            items: [
              "<strong>Symptoms > curve.</strong> Do not stare only at the line on the image; watch the 24-hour response.",
              "<strong>The direction is neutral plus deep stability.</strong> It is not maximal reverse extension.",
              "<strong>Surfing is not the same as “moderate extension.”</strong> Swimming clearance does not automatically clear surfing.",
              "<strong>Prone head/arm lifting can be land paddling.</strong> I paused that category during the symptomatic phase.",
              "<strong>Traction needs caution with instability and stenosis.</strong> I changed the environment instead of buying a device.",
              "<strong>Thoracic-led paddling is a goal, not first aid.</strong> Do not force it while the hand is still numb.",
              "<strong>Feel compensation before loading drills.</strong> The problem is movement control, not only the curve.",
              "<strong>Change one variable at a time.</strong> Let the 24-hour rule decide whether to progress or back off."
            ]
          }
        ]
      },
      {
        id: "closing",
        title: "Closing",
        blocks: [
          {
            type: "p",
            html:
              "I am writing this not because I am “fixed.” Cervical kyphosis plus canal stenosis is a structural sensitivity I expect to live with. What I can do is avoid known triggers, rebuild compensation patterns, and make my neck good enough for most daily life and the sports I care about."
          },
          {
            type: "p",
            html:
              "Because this path is personal and was repeatedly checked with a spine surgeon, please do not copy it blindly. The first step is not my checklist. It is screening for red flags, getting an exam when needed, using the site's <a href=\"/printable-neck-symptom-tracker/\">7-day tracker</a>, and then adjusting based on your own 24-hour response."
          }
        ]
      }
    ]
  },
  ja: {
    title: "頸椎後弯 + サーフィン：私のリハビリ動作リスト",
    description:
      "頸椎後弯、椎間板突出、脊柱管狭窄、神経根症状を持つサーファーの個人体験記。役立った動作、右手のしびれを強めた動作、胸椎主導パドリングで戻る考え方。",
    kicker: "個人の経験 / スポーツと頸部負荷",
    headline:
      "頸椎後弯 + サーフィン：私のリハビリ動作リスト（手のしびれを強めた動作も含めて）",
    cardTag: "経験談",
    cardTitle: "頸椎後弯 + サーフィン：私のリハビリ動作リスト",
    cardBody:
      "どのリハビリ動作が役立ち、どの動作で右手のしびれが強くなったのか。胸椎主導パドリングと24時間ルールで復帰を考えた記録です。",
    intro: [
      "これは真似するためのメニューではありません。MRIのカーブばかり見ていた私が、症状、代償、24時間後の反応を見るようになった個人的な振り返りです。",
      "いちばん役に立つ部分は、効いた動作そのものより、一般的にはよく勧められる動作が、敏感な時期の私には手のしびれを強めたこと、そしてそれを止めた理由かもしれません。"
    ],
    callout:
      "<strong>重要：</strong>これは個人の経験であり、診断や処方ではありません。神経根症状の運動選択は個別性が高いです。新しい筋力低下、しびれの拡大、細かな手作業の低下、握力低下、歩行不安定、排尿排便の変化、外傷後の首痛、発熱、がんの既往がある場合は、まず医療相談をしてください。",
    sections: [
      {
        id: "my-case",
        title: "私の状態",
        blocks: [
          {
            type: "p",
            html:
              "数年前、初めて撮った頸椎MRIで「生理的前弯の消失、後弯」と書かれました。その時は右前腕から上腕にかけて一本線のような痛みがありました。ピラティスとストレッチで落ち着き、痛みが消えたので、しばらく気にしなくなりました。"
          },
          {
            type: "p",
            html:
              "ところが最近半年で<strong>筋力トレーニング</strong>を再開し、<strong>サーフィン</strong>にも戻ったところ、右手がしびれ始めました。親指、人差し指、中指で、C6/C7神経根の典型的な分布に近い感じです。再検査のMRIでは次のように書かれました。"
          },
          {
            type: "ul",
            items: [
              "C3/4-C6/7 の多椎間で後方椎間板突出",
              "C4/5-C6/7 の明らかな脊柱管狭窄",
              "C5椎体の後方すべり、つまり不安定性の手がかり",
              "頸椎後弯"
            ]
          },
          {
            type: "p",
            html:
              "上海の脊椎外科で有名な三甲病院を受診し、原画像と診察を見てもらいました。結論は、<strong>手術は選択肢だが必須ではない</strong>、保存療法はまだ可能というものでした。医師は水泳と懸垂を許可し、短時間の適度な伸展はよいが、長時間の下向き姿勢は避けるように言いました。"
          },
          {
            type: "p",
            html:
              "この文章は、その枠組みの中で一つずつ動作を試した記録です。サーフィンをしてよいかを代わりに決めるものではなく、理論上よさそうな動作を自分の症状反応で検証する例として読んでください。"
          }
        ]
      },
      {
        id: "symptoms-first",
        title: "考え方を変えた一文：カーブは大事。でも症状はもっと大事",
        blocks: [
          {
            type: "p",
            html:
              "最初の私は、多くの人と同じように<strong>カーブを戻したい</strong>と思っていました。けれど画像上のカーブは、それだけで診断ではありません。同じように後弯と書かれても、無症状の人もいれば、手がしびれる人もいます。私がサーフィンやトレーニングをできるかを決めるのは、画像の線そのものではなく、次のことでした。"
          },
          {
            type: "ul",
            items: [
              "どの姿勢で手のしびれが出るか。",
              "運動後24時間で症状が軽い、不変、悪化のどれか。",
              "症状が首や肩から腕、指へ広がるか。",
              "筋力、手先の細かい動き、歩行、バランスに変化があるか。"
            ]
          },
          {
            type: "p",
            html:
              "目標を「カーブを戻す」から、<strong>症状を安定させ、コントロールし、腕へ広げない</strong>に変えると、全体が現実的になりました。練る価値があるのはカーブだけではなく、その周りの筋制御、負荷管理、姿勢習慣でした。"
          }
        ]
      },
      {
        id: "surfing-is-not-correction",
        title: "誤解：サーフィンは「反らせる矯正」ではない",
        blocks: [
          {
            type: "quote",
            html:
              "「頸椎後弯は下向きが原因なら、パドリングで顔を上げるのは逆方向の矯正では？」"
          },
          {
            type: "p",
            html:
              "この直感は脊椎ではうまくいきません。腰を反りすぎる人に、一日中丸めて逆矯正しなさいとは言いません。頸椎でも同じで、方向は<strong>中立位 + 深層安定筋の制御</strong>であり、反対側へ長時間押し込むことではありません。"
          },
          {
            type: "table",
            headers: ["項目", "リハビリでの伸展", "サーフィンのパドリング"],
            rows: [
              ["伸展角度", "小さく、短く、制御される", "波を見るため頭を大きく上げやすい"],
              ["時間", "数秒から短い保持", "30-60分積み重なることがある"],
              ["負荷", "なし、または軽い", "水の抵抗、重力、肩の反復動作"],
              ["複雑さ", "単純な伸展や中立制御", "伸展、回旋、パドリング、海況の乱れが同時"],
              ["目的", "活性化と制御", "波を見る、追う、沖へ出る"]
            ]
          },
          {
            type: "p",
            html:
              "医師の言う「適度な後屈」は、生理的範囲の短時間で制御された伸展です。サーフィンのパドリングは、その拡大版です。時間が長く、角度が大きく、回旋と負荷があり、コントロールもしにくい。私のように狭窄、椎間板突出、C5後方すべりが重なる首では、神経根を刺激しやすい姿勢になります。"
          },
          {
            type: "p",
            html:
              "だから水泳は許可されても、サーフィンは別に評価しました。前方シュノーケル付き自由形や背泳ぎは頸椎を中立に近づけやすいですが、パドリングは違います。"
          }
        ]
      },
      {
        id: "stopped-exercises",
        title: "手のしびれを強めたので止めた動作",
        blocks: [
          { type: "h3", html: "1. 立位の chin tuck" },
          {
            type: "p",
            html:
              "最も意外だったのは立ったままの chin tuck でした。頸部リハビリでよく最初に出る動作ですが、私の場合は右の親指、人差し指、中指がしびれました。重力下で深頸屈筋が弱く、上部僧帽筋や肩甲挙筋が代償し、右の神経根出口を刺激したのだと思います。"
          },
          {
            type: "p",
            html:
              "<strong>対応：</strong>立位版は中止。仰向けでごく軽い版は比較的穏やかでしたが、症状が静かな日だけにしました。"
          },
          { type: "h3", html: "2. Sphinx、うつ伏せコブラ、うつ伏せ T/Y、四つ這い胸椎回旋" },
          {
            type: "p",
            html:
              "「うつ伏せ + 頭を上げる/腕を上げる」系は、一番大きな落とし穴でした。理論上Sphinxは首を中立にできますが、私の場合は右首のだるさと右手のしびれが出ました。うつ伏せでは無意識に少し頭を上げやすく、さらに上部僧帽筋の代償癖があるため、腕を上げると首が手伝ってしまいます。"
          },
          {
            type: "p",
            html:
              "<strong>気づき：</strong>私にとって、うつ伏せで頭や腕を上げる動作は陸上版パドリングでした。急性の敏感な時期には、この種類をまとめて止めました。"
          },
          { type: "h3", html: "3. バンド pull-apart と壁 W" },
          {
            type: "p",
            html:
              "肩甲骨安定の定番ですが、肩甲骨の間のだるさが出て、サーフィン後と同じ感覚になりました。これは重要なサインでした。問題は構造だけでなく、運動制御にもあると分かったからです。"
          },
          {
            type: "p",
            html:
              "<strong>対応：</strong>症状期は避け、代償が落ち着いてから低強度で再導入することにしました。"
          },
          { type: "h3", html: "4. chin tuck と肩甲骨後退を一緒にする" },
          {
            type: "p",
            html:
              "時間短縮のために chin tuck と肩甲骨後退を同時に行ったことがあります。結果は、どちらも中途半端でした。今は分けています。chin tuck は深頸屈筋、肩甲骨後退は中下部僧帽筋のために別々に練ります。"
          },
          { type: "h3", html: "5. 家庭用頸椎牽引器" },
          {
            type: "p",
            html:
              "家庭用の下顎支持型牽引器も調べましたが、購入しませんでした。C5後方すべりと明らかな脊柱管狭窄があり、自分で牽引を処方する状況ではないと考えたからです。不安定な部分に持続的な力をかけると、望ましくない方向の剪断が増える可能性があります。"
          },
          {
            type: "p",
            html:
              "<strong>対応：</strong>器具ではなく環境を変えました。画面を目線に上げる、外付けキーボードを使う、スマホを目線まで上げる。詳しくは <a href=\"/ja/articles/cervical-traction-contraindications/\">頸椎牽引ガイド</a> へ。"
          }
        ]
      },
      {
        id: "safe-list",
        title: "急性期に残した安全リスト",
        blocks: [
          {
            type: "p",
            html:
              "悪化させた動作を外した後に残ったものには共通点がありました。<strong>首が中立、支えられている、または首で力を出さない</strong>ことです。"
          },
          { type: "h3", html: "神経を落ち着かせる動作" },
          {
            type: "ul",
            items: [
              "<strong>斜角筋の三方向ストレッチ：</strong>軽く、首前側の緊張を落とす目的。",
              "<strong>正中神経グライド：</strong>強いストレッチではなく滑らせる動作。終末位で止めず、回数は少なめにし、翌朝に反応を見る。しびれが鋭くなる、残る、広がるなら中止。",
              "<strong>左側頸部ストレッチ：</strong>右側の過緊張を落とすため、私には安全に感じる方向でした。"
            ]
          },
          { type: "h3", html: "首を静かにしたままの体幹・下肢" },
          {
            type: "ul",
            items: [
              "デッドバグ、バードドッグ、前腕サイドプランク、Pallof press。",
              "ファーマーズキャリー。ただし顎を軽く引き、肩をすくめない。",
              "スクワットは約50%に下げ、ヒップブリッジ、レッグカール。鏡を見るために顔を上げない。"
            ]
          },
          { type: "h3", html: "穏やかな上背部活性" },
          {
            type: "ul",
            items: [
              "リバースシュラッグ。",
              "ピラティスボール上で手を前後に転がす動作。ただしその日に症状が出ない場合だけ。"
            ]
          },
          { type: "h3", html: "水泳：医師は許可。ただし泳法で違う" },
          {
            type: "table",
            headers: ["泳法", "首へのやさしさ", "理由"],
            rows: [
              ["自由形 + 前方シュノーケル", "最も良い", "呼吸で首を回さず、中立に保ちやすい。"],
              ["背泳ぎ", "良い", "水が頭を支える。"],
              ["横呼吸の自由形", "中等度", "左右交互が大切。一方向だけを避ける。"],
              ["顔上げ平泳ぎ", "避ける", "一かきごとに首が伸展される。"]
            ]
          },
          { type: "h3", html: "懸垂：許可されたが種類を選ぶ" },
          {
            type: "ul",
            items: [
              "<strong>可：</strong>厳密な懸垂、最初に5-10秒のデッドハング、顎を軽く引いてバーを越える、限界まで追い込まない。",
              "<strong>まだ避ける：</strong>キッピング、ビハインドネック、最後の粘る2回、加重懸垂。"
            ]
          },
          {
            type: "p",
            html:
              "歩く時に両腕を自然に下げると、胸郭出口っぽい手のしびれが出ることも分かりました。暫定的には手をポケットに入れ、肩帯が下へ引かれないようにしました。同じ手に複数の刺激点がある可能性は、<a href=\"/ja/articles/finger-numbness-nerve-map/\">指のしびれマップ</a>でも説明しています。"
          }
        ]
      },
      {
        id: "return-to-surf",
        title: "サーフィン復帰：胸椎主導パドリング + 24時間ルール",
        blocks: [
          {
            type: "p",
            html:
              "一番手放したくなかった部分なので、最も考えました。核になる考えは一つです。<strong>首で頭を上げず、上背部で胸を持ち上げる</strong>。"
          },
          {
            type: "table",
            headers: ["方法", "実現の仕方", "頸椎ストレス"],
            rows: [
              ["頸椎主導", "うつ伏せから頸椎を30-60度伸展して頭を上げる", "高い"],
              ["胸椎主導", "前腕で支え、胸椎を開き、胸郭を上げ、首は長く中立に保つ", "低め"]
            ]
          },
          {
            type: "p",
            html:
              "ただし正直に言うと、急性期の私は前腕支持のSphinxでも手がしびれました。胸椎主導パドリングは<strong>症状が安定した後の目標</strong>であり、手がしびれている時の救急動作ではありません。"
          },
          { type: "h3", html: "陸上準備" },
          {
            type: "ul",
            items: [
              "<strong>フォームローラー胸椎伸展：</strong>中上背部に横向きで当て、頭を支え、呼気で伸展へ沈む。6-8回 x 2セット。",
              "<strong>Low cobra hold：</strong>胸骨を少しだけ上げ、視線は斜め前の床、首を長く。10-20秒 x 4-6回。",
              "<strong>ボード上パドリング予行：</strong>小さく胸を上げ、20-30秒 x 4。症状が静かな時だけ60-90秒へ。"
            ]
          },
          { type: "h3", html: "波待ち姿勢" },
          {
            type: "ul",
            items: [
              "耳たぶを肩の上にそろえ、頭を前へ出さない。",
              "まず目だけを動かし、首全体で探し続けない。",
              "波の音、仲間の声、間欠的な確認を使って、長時間見上げ続けない。",
              "波間に30秒：肩をすくめて落とす x3、伸展終末を避けた小さい首回し、深呼吸 + 肩甲骨後退 x3。"
            ]
          },
          { type: "h3", html: "水中量" },
          {
            type: "ul",
            items: [
              "休暇中だけ。日常的に連日行わない。",
              "7日間の休暇で3回、各1.5時間まで。純粋なパドリングは45-60分程度。",
              "少なくとも1日空け、連日はしない。",
              "24時間ルール：手のしびれ、刺痛、首痛が約2/10以上上がる、または翌日まで残るなら、次回は30-50%減らす。",
              "一度に変える変数は一つだけ。時間、波数、波の大きさ、板の難度、パドリング強度のどれか。",
              "再発後は大きい板、ロングボード、フォームボードから始め、無理なパドリングと長い頭上げを減らす。"
            ]
          },
          { type: "h3", html: "上がった後の三つの質問" },
          {
            type: "ol",
            items: [
              "首は使われたが静かか、それとも警報が鳴っているか。",
              "手のしびれや腕の重さはあるか。少しでも yes なら、その日はもう入らない。",
              "夜や翌日に新症状は出たか。出たなら次回は一段下げる。"
            ]
          }
        ]
      },
      {
        id: "compensation-awareness",
        title: "動作より大事：代償を感じ取る",
        blocks: [
          {
            type: "p",
            html:
              "この文章で一つだけ覚えるなら、これです。私の問題はカーブだけではなく、深く刻まれた<strong>上部僧帽筋の代償パターン</strong>でした。MRIは構造を見せますが、歯磨き、コーヒー、パドリング、肩甲骨運動で首が手伝っているかまでは教えてくれません。"
          },
          {
            type: "ul",
            items: [
              "歯磨き、コーヒー、PC作業中に、だるくなる首後ろへ手を当てる。硬くなったら緩め、「今何がこの筋肉を働かせた？」と考える。",
              "鏡で確認する。耳は肩の上か、頭が前に出ていないか、肩をすくめていないか。",
              "意志で耐えるより環境を変える。画面は目線、外付けキーボード、スマホは目線へ、30分ごとに立つ。"
            ]
          }
        ]
      },
      {
        id: "principles",
        title: "私の原則まとめ",
        blocks: [
          {
            type: "ol",
            items: [
              "<strong>症状 > カーブ。</strong>画像の線だけでなく24時間反応を見る。",
              "<strong>方向は中立位 + 深層安定。</strong>逆方向へ最大に反らすことではない。",
              "<strong>サーフィンは「適度な後屈」と同じではない。</strong>水泳が許可されたからといって自動的に許可ではない。",
              "<strong>うつ伏せ頭上げ/腕上げは陸上パドリングになり得る。</strong>症状期は止めた。",
              "<strong>不安定性 + 狭窄では牽引に慎重。</strong>器具より環境を変えた。",
              "<strong>胸椎主導パドリングは目標であり、応急処置ではない。</strong>",
              "<strong>負荷を増やす前に代償を感じる。</strong>問題はカーブだけでなく運動制御。",
              "<strong>一度に変える変数は一つ。</strong>進むか下げるかは24時間ルールで決める。"
            ]
          }
        ]
      },
      {
        id: "closing",
        title: "おわりに",
        blocks: [
          {
            type: "p",
            html:
              "この経験を書いたのは、私が完全に治ったからではありません。頸椎後弯 + 脊柱管狭窄は、長く付き合う構造的な敏感さだと思っています。できることは誘発を避け、代償を作り直し、日常と好きなスポーツの中で十分に使える状態へ近づけることです。"
          },
          {
            type: "p",
            html:
              "これは私個人の、脊椎外科医と確認しながら進めた道です。直接真似しないでください。最初の一歩は私のリストをコピーすることではなく、危険サインを確認し、必要なら診察を受け、<a href=\"/ja/printable-neck-symptom-tracker/\">7日間記録表</a>で自分の24時間反応を集めることです。"
          }
        ]
      }
    ]
  },
  es: {
    title: "Cifosis cervical + surf: mi lista de ejercicios de rehabilitación",
    description:
      "Relato en primera persona de un surfista con cifosis cervical, protrusiones discales, estenosis y síntomas de raíz nerviosa: qué ayudó, qué aumentó el adormecimiento de la mano y cómo volver con remada guiada por la columna torácica.",
    kicker: "Experiencia personal / carga cervical en deporte",
    headline:
      "Cifosis cervical + surf: mi lista de ejercicios de rehabilitación, incluidos los que me dieron más hormigueo en la mano",
    cardTag: "Experiencia",
    cardTitle: "Cifosis cervical + surf: mi lista de rehabilitación",
    cardBody:
      "Un surfista cuenta qué ejercicios ayudaron, cuáles aumentaron el adormecimiento de la mano derecha y cómo usó la remada guiada por la columna torácica y la regla de 24 horas.",
    intro: [
      "Esto no es una rutina para copiar. Es una revisión personal de cómo pasé de obsesionarme con la curva en la resonancia a observar síntomas, compensaciones y respuesta en 24 horas.",
      "Lo más útil quizá no sea la lista de ejercicios que me ayudaron, sino los ejercicios clásicos que, en mi fase irritable, hicieron que la mano se adormeciera más, y por qué los suspendí."
    ],
    callout:
      "<strong>Importante:</strong> esta es una experiencia personal, no diagnóstico ni prescripción. La elección de ejercicios con síntomas de raíz nerviosa es muy individual. Debilidad nueva o progresiva, entumecimiento que se extiende, pérdida de destreza fina, pérdida de agarre, cambios al caminar, alteraciones urinarias/intestinales, dolor cervical tras traumatismo, fiebre o antecedente de cáncer requieren valoración médica.",
    sections: [
      {
        id: "my-case",
        title: "Mi situación",
        blocks: [
          {
            type: "p",
            html:
              "Hace años, mi primera resonancia cervical decía que la curva normal estaba rectificada e invertida. En ese momento tenía una línea de dolor desde el antebrazo derecho hacia el brazo. Con pilates y estiramientos se calmó, el dolor desapareció y dejé de prestarle atención."
          },
          {
            type: "p",
            html:
              "En los últimos seis meses retomé el <strong>entrenamiento de fuerza</strong> y volví al <strong>surf</strong>. Entonces empezó el adormecimiento en la mano derecha: pulgar, índice y medio, una distribución típica de C6/C7. La nueva resonancia era más seria:"
          },
          {
            type: "ul",
            items: [
              "Protrusiones discales posteriores multinivel de C3/4 a C6/7",
              "Estenosis marcada del canal de C4/5 a C6/7",
              "Retrolistesis de C5, una pista de inestabilidad",
              "Curva cervical invertida"
            ]
          },
          {
            type: "p",
            html:
              "Consulté en un hospital terciario de Shanghái conocido por cirugía de columna. Tras revisar las imágenes originales y examinarme, el mensaje fue: <strong>la cirugía era una opción, no una obligación</strong>; el tratamiento conservador seguía siendo razonable. El médico permitió natación y dominadas, y dijo que una extensión moderada y breve estaba bien, pero no mantener mucho tiempo la cabeza hacia abajo."
          },
          {
            type: "p",
            html:
              "Este artículo es el registro de cómo probé movimiento por movimiento dentro de ese marco. No decide si tú puedes surfear; muestra cómo puse ejercicios supuestamente útiles frente a mi propia respuesta de síntomas."
          }
        ]
      },
      {
        id: "symptoms-first",
        title: "La frase que cambió mi enfoque: la curva importa, pero los síntomas importan más",
        blocks: [
          {
            type: "p",
            html:
              "Al principio tenía la obsesión habitual después de leer “curva invertida”: <strong>quería devolver la curva a la fuerza</strong>. Luego entendí que la curva en una imagen no es el diagnóstico completo. Dos personas pueden tener un informe parecido; una no tiene síntomas y otra tiene la mano dormida. Lo que decide si puedo surfear o entrenar no es la línea en la imagen, sino:"
          },
          {
            type: "ul",
            items: [
              "Qué posturas reproducen mi adormecimiento de mano.",
              "En las 24 horas posteriores a un ejercicio, los síntomas bajan, quedan igual o empeoran.",
              "Si los síntomas se extienden del cuello/hombro hacia brazo o dedos.",
              "Si cambian fuerza, destreza fina, marcha o equilibrio."
            ]
          },
          {
            type: "p",
            html:
              "Cuando cambié el objetivo de “restaurar la curva” a <strong>mantener síntomas estables, controlables y sin extenderse al brazo</strong>, todo se volvió más práctico. Lo que vale la pena entrenar no es solo la curva, sino el control muscular, la gestión de carga y los hábitos alrededor de ella."
          }
        ]
      },
      {
        id: "surfing-is-not-correction",
        title: "Un error que tuve que desmontar: surfear no es una corrección por extensión",
        blocks: [
          {
            type: "quote",
            html:
              "“Si la cifosis cervical viene de mirar mucho hacia abajo, ¿levantar la cabeza remando no corrige en sentido contrario?”"
          },
          {
            type: "p",
            html:
              "Esa intuición no funciona bien en la columna. A una persona con demasiada lordosis lumbar no se le indica encorvarse todo el día para corregir. En el cuello, la dirección más prudente es <strong>posición neutra + control de estabilizadores profundos</strong>, no empujar al extremo opuesto durante mucho tiempo."
          },
          {
            type: "table",
            headers: ["Dimensión", "Extensión tipo rehabilitación", "Remada de surf"],
            rows: [
              ["Ángulo", "Pequeño, breve, controlado", "La cabeza suele elevarse mucho para mirar olas"],
              ["Duración", "Segundos o sostén corto", "Puede acumular 30-60 minutos"],
              ["Carga", "Nula o baja", "Resistencia del agua, gravedad y hombros repetitivos"],
              ["Complejidad", "Extensión simple o control neutro", "Extensión, rotación, remada y mar variable a la vez"],
              ["Objetivo", "Activación y control", "Ver olas, perseguirlas, salir al pico"]
            ]
          },
          {
            type: "p",
            html:
              "Cuando el médico dijo que la extensión moderada era aceptable, hablaba de una extensión breve, controlada y fisiológica. La remada de surf es la versión amplificada: más tiempo, más ángulo, rotación, carga y menos control. Con estenosis, protrusiones y retrolistesis de C5, esa postura puede irritar la raíz nerviosa."
          },
          {
            type: "p",
            html:
              "Por eso la natación quedó autorizada, pero el surf necesitó evaluación propia. Libre con snorkel frontal y espalda pueden mantener el cuello más neutro. La remada de surf no."
          }
        ]
      },
      {
        id: "stopped-exercises",
        title: "Ejercicios que me adormecieron más la mano y suspendí",
        blocks: [
          { type: "h3", html: "1. Chin tuck de pie" },
          {
            type: "p",
            html:
              "La mayor sorpresa fue el chin tuck de pie. Aparece en casi todo contenido de rehabilitación cervical, pero a mí me provocaba hormigueo en pulgar, índice y medio derechos. Mi explicación probable es que, contra la gravedad, mis flexores profundos no hacían bien el trabajo y el trapecio superior/elevador de la escápula compensaban, irritando la salida de la raíz nerviosa derecha."
          },
          {
            type: "p",
            html:
              "<strong>Qué hice:</strong> suspendí la versión de pie. La versión tumbada, muy suave, era más tolerable, pero solo en días tranquilos."
          },
          { type: "h3", html: "2. Sphinx, cobra boca abajo, T/Y boca abajo y rotación torácica en cuadrupedia" },
          {
            type: "p",
            html:
              "La familia de “boca abajo + levantar cabeza o brazos” fue mi mayor trampa. En teoría, sphinx puede hacerse con cuello neutro. En mi cuerpo terminaba con molestia derecha de cuello y mano derecha dormida. Boca abajo tiendo a levantar la cabeza sin darme cuenta, y cualquier elevación de brazos invita a mi cuello a ayudar."
          },
          {
            type: "p",
            html:
              "<strong>La idea clave:</strong> para mí, los levantamientos boca abajo eran una versión terrestre de remar. En fase aguda e irritable, pausé toda la categoría."
          },
          { type: "h3", html: "3. Band pull-apart y W en pared" },
          {
            type: "p",
            html:
              "Son ejercicios clásicos de estabilidad escapular, pero reproducían exactamente la molestia entre las escápulas que sentía después de surfear. Fue una señal útil: el problema no era solo estructura, también era control motor."
          },
          {
            type: "p",
            html:
              "<strong>Qué hice:</strong> los evité durante la fase sintomática y pensé en reintroducirlos después con poca intensidad."
          },
          { type: "h3", html: "4. Combinar chin tuck con retracción escapular" },
          {
            type: "p",
            html:
              "Intenté ahorrar tiempo uniendo chin tuck y retracción escapular. Los objetivos se interferían y ninguno quedaba limpio. Los separé: chin tuck para flexores profundos del cuello, retracción escapular para trapecio medio/inferior."
          },
          { type: "h3", html: "5. Dispositivos caseros de tracción cervical" },
          {
            type: "p",
            html:
              "Miré dispositivos caseros de tracción, sobre todo los que sostienen la barbilla y prometen restaurar curva. No compré ninguno. Con retrolistesis de C5 y estenosis marcada, no es algo que me autoprescribiría. Aplicar fuerza sostenida sobre un segmento inestable podría añadir cizalla en la dirección equivocada."
          },
          {
            type: "p",
            html:
              "<strong>Qué hice:</strong> cambié el entorno: pantalla a la altura de los ojos, teclado externo, móvil a la línea de visión. La <a href=\"/es/articles/cervical-traction-contraindications/\">guía de tracción cervical</a> del sitio explica más contraindicaciones."
          }
        ]
      },
      {
        id: "safe-list",
        title: "Lo que quedó en mi lista segura de fase aguda",
        blocks: [
          {
            type: "p",
            html:
              "Después de quitar lo que irritaba, mantuve ejercicios con una característica común: <strong>el cuello permanecía neutro, estaba apoyado o no tenía que generar fuerza</strong>."
          },
          { type: "h3", html: "Ejercicios calmantes" },
          {
            type: "ul",
            items: [
              "<strong>Estiramiento suave de escalenos en tres direcciones:</strong> para reducir tensión anterior del cuello.",
              "<strong>Deslizamientos del nervio mediano:</strong> deslizar, no estirar agresivamente; sin sostener al final, pocas repeticiones y revisar a la mañana siguiente. Si el hormigueo se vuelve más agudo, dura o se expande, parar.",
              "<strong>Estiramiento del lado izquierdo del cuello:</strong> para soltar los músculos derechos que sentía tensos, en una dirección que me resultaba segura."
            ]
          },
          { type: "h3", html: "Core y tren inferior con el cuello quieto" },
          {
            type: "ul",
            items: [
              "Dead bug, bird dog, plancha lateral sobre antebrazo, Pallof press.",
              "Farmer's carry con leve mentón recogido y sin encoger hombros.",
              "Sentadilla reducida a 50%, puente de glúteo, curl femoral; sin levantar la mirada al espejo."
            ]
          },
          { type: "h3", html: "Activación suave de espalda alta" },
          {
            type: "ul",
            items: [
              "Reverse shrug.",
              "Rodar una pelota pequeña de pilates boca abajo con las manos, solo si ese día no provocaba síntomas."
            ]
          },
          { type: "h3", html: "Natación: autorizada, pero no todos los estilos son iguales" },
          {
            type: "table",
            headers: ["Estilo", "Amabilidad cervical", "Motivo"],
            rows: [
              ["Libre con snorkel frontal", "Mejor", "El cuello queda neutro sin girar para respirar."],
              ["Espalda", "Amigable", "El agua sostiene la cabeza."],
              ["Libre con respiración lateral", "Media", "Conviene alternar lados y no girar siempre igual."],
              ["Braza con cabeza fuera", "Evitar", "Cada brazada fuerza extensión cervical."]
            ]
          },
          { type: "h3", html: "Dominadas: autorizadas, pero según versión" },
          {
            type: "ul",
            items: [
              "<strong>Sí:</strong> dominadas estrictas, empezar con 5-10 segundos de colgado muerto, mentón suavemente recogido al pasar la barra, parar antes del fallo.",
              "<strong>Todavía no:</strong> kipping, dominadas tras nuca, las últimas dos repeticiones forzadas, dominadas con peso."
            ]
          },
          {
            type: "p",
            html:
              "También noté que caminar con los brazos colgando podía provocar un adormecimiento tipo salida torácica. Mi solución temporal fue meter las manos en los bolsillos para que la cintura escapular no tirara hacia abajo. El <a href=\"/es/articles/finger-numbness-nerve-map/\">mapa de dedos dormidos</a> explica por qué una misma mano puede tener más de un punto de irritación."
          }
        ]
      },
      {
        id: "return-to-surf",
        title: "Mi marco para volver al surf: remada guiada por la columna torácica + regla de 24 horas",
        blocks: [
          {
            type: "p",
            html:
              "Era la parte que menos quería abandonar, así que fue la que más pensé. La idea central: <strong>no levantar la cabeza con el cuello; dejar que la espalda alta eleve el pecho</strong>."
          },
          {
            type: "table",
            headers: ["Estrategia", "Cómo ocurre", "Estrés cervical"],
            rows: [
              ["Remada guiada por cuello", "Boca abajo y 30-60 grados de extensión cervical para levantar la cabeza", "Alto"],
              ["Remada guiada por tórax", "Apoyo de antebrazos, extensión torácica, pecho se eleva, cuello largo y neutro", "Más bajo"]
            ]
          },
          {
            type: "p",
            html:
              "Pero debo ser honesto: en mi fase aguda, incluso una postura tipo sphinx con antebrazos podía provocar hormigueo. La remada guiada por la columna torácica es un <strong>objetivo posterior, cuando los síntomas se estabilizan</strong>, no un ejercicio de emergencia mientras la mano sigue dormida."
          },
          { type: "h3", html: "Preparación en tierra" },
          {
            type: "ul",
            items: [
              "<strong>Extensión torácica con foam roller:</strong> rodillo atravesado en la espalda media-alta, cabeza apoyada, exhalar hacia extensión, 6-8 repeticiones x 2 series.",
              "<strong>Low cobra hold:</strong> elevar solo un poco el esternón, mirada al suelo delante, cuello largo, 10-20 segundos x 4-6.",
              "<strong>Ensayo de remada sobre tabla:</strong> pequeña elevación del pecho, remar suave 20-30 segundos x 4; subir a 60-90 segundos solo si todo sigue tranquilo."
            ]
          },
          { type: "h3", html: "Esperar olas" },
          {
            type: "ul",
            items: [
              "Lóbulo de la oreja sobre el hombro; no adelantar la cabeza.",
              "Mover primero los ojos en lugar de buscar con todo el cuello.",
              "Usar sonido de olas, aviso de compañeros y escaneo intermitente para no mirar hacia arriba demasiado tiempo.",
              "Entre olas: encoger y bajar hombros x3, giros pequeños evitando extensión final, respiración profunda + retracción escapular x3."
            ]
          },
          { type: "h3", html: "Dosis en el agua" },
          {
            type: "ul",
            items: [
              "Solo en vacaciones, no surf diario.",
              "En 7 días: 3 sesiones, 1,5 h cada una, con remada pura alrededor de 45-60 min.",
              "Al menos un día de descanso entre sesiones; nunca días consecutivos.",
              "Regla de 24 h: si hormigueo, adormecimiento o dolor cervical sube más de 2/10 o dura hasta el día siguiente, reducir la siguiente sesión 30-50%.",
              "Cambiar una sola variable: duración, número de olas, tamaño, dificultad de tabla o intensidad de remada.",
              "Tras una recaída, empezar con tabla grande, longboard o foam para reducir remadas frenéticas y cabeza elevada prolongada."
            ]
          },
          { type: "h3", html: "Tres preguntas al salir" },
          {
            type: "ol",
            items: [
              "¿El cuello se usó pero está tranquilo, o ya está dando alarma?",
              "¿Hubo mano dormida o brazo pesado? Cualquier sí significa no volver al agua ese día.",
              "¿Aparecieron síntomas nuevos esa noche o al día siguiente? Si sí, el próximo plan baja un nivel."
            ]
          }
        ]
      },
      {
        id: "compensation-awareness",
        title: "Más importante que cualquier ejercicio: aprender a sentir la compensación",
        blocks: [
          {
            type: "p",
            html:
              "Si recuerdas una sola cosa, que sea esta: mi problema no era solo la curva invertida, sino un patrón muy arraigado de <strong>compensación del trapecio superior</strong>. La resonancia muestra estructura, pero no me dice si uso el cuello al cepillarme, hacer café, remar o entrenar escápulas."
          },
          {
            type: "ul",
            items: [
              "Al cepillarme, hacer café o usar el ordenador, pongo una mano en la zona posterior del cuello que se carga. Si se tensa, la relajo y me pregunto: “¿qué estoy haciendo para que trabaje?”.",
              "Uso espejo: orejas sobre hombros, cabeza sin adelantarse, hombros sin encogerse.",
              "Cambio el entorno en vez de luchar con fuerza de voluntad: pantalla a la altura de los ojos, teclado externo, móvil a la línea de visión, levantarme cada 30 minutos."
            ]
          }
        ]
      },
      {
        id: "principles",
        title: "Mis principios en una página",
        blocks: [
          {
            type: "ol",
            items: [
              "<strong>Síntomas > curva.</strong> No mirar solo la línea de la imagen; mirar la respuesta de 24 horas.",
              "<strong>La dirección es neutro + estabilidad profunda.</strong> No máxima extensión contraria.",
              "<strong>Surfear no es lo mismo que “extensión moderada”.</strong> Que la natación esté autorizada no autoriza automáticamente el surf.",
              "<strong>Levantar cabeza/brazos boca abajo puede ser remada en tierra.</strong> En fase sintomática lo pausé.",
              "<strong>Tracción requiere cautela con inestabilidad y estenosis.</strong> Cambié el entorno en vez de comprar aparato.",
              "<strong>La remada torácica es objetivo, no primeros auxilios.</strong> No forzarla si la mano sigue dormida.",
              "<strong>Sentir compensación antes de cargar ejercicios.</strong> El problema es control motor, no solo curva.",
              "<strong>Cambiar una variable cada vez.</strong> La regla de 24 horas decide avanzar o retroceder."
            ]
          }
        ]
      },
      {
        id: "closing",
        title: "Cierre",
        blocks: [
          {
            type: "p",
            html:
              "Escribo esto no porque esté “curado”. Cifosis cervical + estenosis es una sensibilidad estructural con la que probablemente conviviré. Lo que puedo hacer es evitar disparadores, reconstruir patrones de compensación y lograr que el cuello sea suficiente para la vida diaria y los deportes que me importan."
          },
          {
            type: "p",
            html:
              "Como este camino es personal y fue revisado repetidamente con un cirujano de columna, no lo copies de forma directa. El primer paso no es mi lista, sino revisar alarmas, obtener exploración cuando haga falta, usar el <a href=\"/es/printable-neck-symptom-tracker/\">registro de 7 días</a> y ajustar según tu propia respuesta de 24 horas."
          }
        ]
      }
    ]
  }
};

const ogImages = {
  zh: "/assets/og/zh-articles-surfing-neck-pain-paddling.png",
  en: "/assets/og/en-en-articles-surfing-neck-pain-paddling.png",
  ja: "/assets/og/ja-ja-articles-surfing-neck-pain-paddling.png",
  es: "/assets/og/es-es-articles-surfing-neck-pain-paddling.png"
};

const relatedLinks = {
  zh: [
    ["冲浪划水为什么容易让颈椎不舒服？", "/zh/articles/surfing-neck-pain-paddling/", "冲浪专题"],
    ["颈椎反弓还能冲浪、滑雪/单板或攀岩吗？", "/zh/articles/sports-neck-load-return-guide/", "运动专题"],
    ["手指麻木地图：颈椎神经根还是周围神经？", "/zh/articles/finger-numbness-nerve-map/", "症状专题"],
    ["颈椎牵引适合谁？禁忌和风险怎么判断", "/zh/articles/cervical-traction-contraindications/", "治疗边界"]
  ],
  en: [
    ["Why surf paddling can irritate the neck", "/articles/surfing-neck-pain-paddling/", "Surf guide"],
    ["Can you surf, ski, snowboard, or climb with cervical kyphosis?", "/articles/sports-neck-load-return-guide/", "Sport guide"],
    ["Finger numbness map: cervical root or peripheral nerve?", "/articles/finger-numbness-nerve-map/", "Symptom guide"],
    ["Cervical traction: who may fit, contraindications, and risks", "/articles/cervical-traction-contraindications/", "Treatment boundaries"]
  ],
  ja: [
    ["パドリングで首がつらくなる理由", "/ja/articles/surfing-neck-pain-paddling/", "サーフィン特集"],
    ["頸椎後弯でもサーフィン、スキー、スノーボード、クライミングはできる？", "/ja/articles/sports-neck-load-return-guide/", "スポーツ特集"],
    ["指のしびれマップ：頸椎神経根か、末梢神経か", "/ja/articles/finger-numbness-nerve-map/", "症状特集"],
    ["頸椎牽引：合う人、禁忌、リスク", "/ja/articles/cervical-traction-contraindications/", "治療の境界"]
  ],
  es: [
    ["Por qué remar en surf puede irritar el cuello", "/es/articles/surfing-neck-pain-paddling/", "Guía de surf"],
    ["¿Puedes surfear, esquiar, hacer snowboard o escalar con cifosis cervical?", "/es/articles/sports-neck-load-return-guide/", "Guía deportiva"],
    ["Mapa de dedos dormidos: raíz cervical o nervio periférico", "/es/articles/finger-numbness-nerve-map/", "Guía de síntomas"],
    ["Tracción cervical: quién puede encajar, contraindicaciones y riesgos", "/es/articles/cervical-traction-contraindications/", "Límites de tratamiento"]
  ]
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pathFor(lang) {
  return `${languages[lang].prefix}/articles/${slug}/`.replace(/\/+/g, "/");
}

function urlFor(lang) {
  return `${baseUrl}${pathFor(lang)}`;
}

function localizedPath(lang, route) {
  return `${languages[lang].prefix}/${route}/`.replace(/\/+/g, "/");
}

function outputPath(lang) {
  const prefix = languages[lang].prefix.replace(/^\//, "");
  return join(prefix, "articles", slug, "index.html");
}

function renderList(tag, items) {
  return `<${tag}>${items.map((item) => `<li>${item}</li>`).join("")}</${tag}>`;
}

function renderTable(block) {
  return `<div class="table-wrap article-table-wrap">
              <table>
                <thead><tr>${block.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
                <tbody>
                  ${block.rows
                    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
                    .join("\n")}
                </tbody>
              </table>
            </div>`;
}

function renderBlock(block) {
  if (block.type === "p") return `<p>${block.html}</p>`;
  if (block.type === "h3") return `<h3>${block.html}</h3>`;
  if (block.type === "ul") return renderList("ul", block.items);
  if (block.type === "ol") return renderList("ol", block.items);
  if (block.type === "quote") return `<blockquote>${block.html}</blockquote>`;
  if (block.type === "table") return renderTable(block);
  throw new Error(`Unknown block type: ${block.type}`);
}

function renderSection(section) {
  return `<section class="article-section" id="${section.id}">
            <h2>${escapeHtml(section.title)}</h2>
            ${section.blocks.map(renderBlock).join("\n")}
          </section>`;
}

function renderHreflang() {
  return [
    `<link rel="alternate" hreflang="x-default" href="${urlFor("en")}" />`,
    ...Object.entries(languages).map(
      ([lang, labels]) =>
        `<link rel="alternate" hreflang="${labels.hreflang}" href="${urlFor(lang)}" />`
    )
  ].join("\n    ");
}

function renderLanguageLinks(activeLang) {
  return Object.entries(languages)
    .map(([lang, labels]) => {
      const active = lang === activeLang ? " is-active" : "";
      const current = lang === activeLang ? ' aria-current="page"' : "";
      return `<a class="lang-button${active}" href="${pathFor(lang)}" hreflang="${labels.hreflang}"${current}>${labels.short}</a>`;
    })
    .join("\n");
}

function renderStructuredData(lang) {
  const labels = languages[lang];
  const t = translations[lang];
  const pageUrl = urlFor(lang);
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
      url: baseUrl,
      publisher: { "@id": `${baseUrl}/#organization` },
      inLanguage: Object.values(languages).map((item) => item.htmlLang),
      isAccessibleForFree: true
    },
    {
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}#medical-page`,
      name: t.title,
      headline: t.headline,
      description: t.description,
      url: pageUrl,
      image: `${baseUrl}${ogImages[lang]}`,
      inLanguage: labels.htmlLang,
      medicalAudience: "Patient",
      isAccessibleForFree: true,
      lastReviewed: reviewDate,
      dateModified: reviewDate,
      about: [
        "Cervical kyphosis",
        "Cervical radiculopathy",
        "Cervical spinal stenosis",
        "Surfing",
        "Conservative rehabilitation"
      ],
      isPartOf: { "@id": `${baseUrl}/#website` }
    },
    {
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: t.headline,
      description: t.description,
      url: pageUrl,
      image: `${baseUrl}${ogImages[lang]}`,
      inLanguage: labels.htmlLang,
      datePublished: reviewDate,
      dateModified: reviewDate,
      author: { "@id": `${baseUrl}/#organization` },
      publisher: { "@id": `${baseUrl}/#organization` },
      genre: "Personal experience",
      citation: sources.map((source) => source.url),
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
          name: labels.nav.sports,
          item: `${baseUrl}${localizedPath(lang, "sports")}`
        },
        {
          "@type": "ListItem",
          position: 3,
          name: t.title,
          item: pageUrl
        }
      ]
    }
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

function renderNav(lang) {
  const labels = languages[lang];
  return `<a href="${labels.home}">${labels.nav.home}</a>
        <a href="${localizedPath(lang, "symptoms")}">${labels.nav.symptoms}</a>
        <a href="${localizedPath(lang, "diagnosis")}">${labels.nav.diagnosis}</a>
        <a href="${localizedPath(lang, "exercises")}">${labels.nav.exercises}</a>
        <a href="${localizedPath(lang, "treatments")}">${labels.nav.treatments}</a>
        <a href="${localizedPath(lang, "sports")}">${labels.nav.sports}</a>
        <a href="${localizedPath(lang, "videos")}">${labels.nav.videos}</a>
        <a href="${localizedPath(lang, "tools")}">${labels.nav.tools}</a>`;
}

function renderToc(lang) {
  const t = translations[lang];
  return `<nav class="pillar-toc" aria-label="Article sections">
            ${t.sections
              .map((section) => `<a href="#${section.id}">${escapeHtml(section.title)}</a>`)
              .join("\n")}
          </nav>`;
}

function renderSources(lang) {
  const labels = languages[lang];
  return `<section class="article-section article-sources" aria-labelledby="sources-title">
            <h2 id="sources-title">${labels.sourceHeading}</h2>
            <ul class="source-list">
              ${sources
                .map(
                  (source) =>
                    `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>`
                )
                .join("\n")}
            </ul>
          </section>`;
}

function renderRelated(lang) {
  const labels = languages[lang];
  return `<section class="article-section">
            <h2>${labels.relatedHeading}</h2>
            <div class="article-related-grid">
              ${relatedLinks[lang]
                .map(
                  ([title, href, tag]) =>
                    `<a class="article-related-card" href="${href}"><span>${escapeHtml(tag)}</span><strong>${escapeHtml(title)}</strong></a>`
                )
                .join("\n")}
            </div>
          </section>`;
}

function renderArticle(lang) {
  const labels = languages[lang];
  const t = translations[lang];
  const pageUrl = urlFor(lang);
  const ogImage = `${baseUrl}${ogImages[lang]}`;

  return `<!doctype html>
<html lang="${labels.htmlLang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(t.title)} | Cervical Curve Guide</title>
    <meta name="description" content="${escapeHtml(t.description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta name="author" content="Cervical Curve Guide" />
    <meta name="theme-color" content="#f5fbfb" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="canonical" href="${pageUrl}" />
    ${renderHreflang()}
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHtml(t.title)} | Cervical Curve Guide" />
    <meta property="og:description" content="${escapeHtml(t.description)}" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(t.title)} | Cervical Curve Guide" />
    <meta name="twitter:description" content="${escapeHtml(t.description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <link rel="stylesheet" href="/assets/styles.css?v=${version}" />
    <script src="/assets/analytics.js?v=${version}" defer></script>
    <script type="application/ld+json">${renderStructuredData(lang)}</script>
  </head>
  <body>
    <a class="skip-link" href="#content">${labels.skip}</a>
    <header class="site-header">
      <a class="brand" href="${labels.home}">
        <span class="brand-mark" aria-hidden="true">C</span>
        <span>Cervical Curve Guide</span>
      </a>
      <nav class="main-nav" aria-label="Primary navigation">
        ${renderNav(lang)}
      </nav>
      <div class="language-switcher" role="group" aria-label="Article language">
        ${renderLanguageLinks(lang)}
      </div>
    </header>
    <main class="legal-main article-main" id="content">
      <article class="legal-article article-page">
        <p class="legal-meta">${labels.updated} · ${escapeHtml(t.kicker)}</p>
        <p class="legal-meta">${escapeHtml(labels.review)}</p>
        <h1>${escapeHtml(t.headline)}</h1>
        <div class="article-dek">
          ${t.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}
        </div>
        <aside class="article-callout">${t.callout}</aside>
        <aside class="article-callout resource-callout">
          <strong>${escapeHtml(labels.trackerTitle)}</strong>
          <p>${escapeHtml(labels.trackerBody)}</p>
          <a class="button" href="${localizedPath(lang, "printable-neck-symptom-tracker")}">${escapeHtml(labels.trackerAction)}</a>
        </aside>
        ${renderToc(lang)}
        ${t.sections.map(renderSection).join("\n")}
        <aside class="ad-slot ad-slot-article" aria-label="${escapeHtml(labels.ad)}"><span>${escapeHtml(labels.ad)}</span></aside>
        ${renderSources(lang)}
        ${renderRelated(lang)}
      </article>
      <aside class="notice-band article-notice" aria-label="Medical notice">
        <strong>${escapeHtml(labels.noticeLabel)}</strong>
        <span>${escapeHtml(labels.notice)}</span>
      </aside>
    </main>
    <footer class="site-footer">
      <p>${escapeHtml(labels.footer)}</p>
      <nav class="footer-links" aria-label="Footer links">
        <a href="/about.html">About</a>
        <a href="/authors.html">Authors</a>
        <a href="/editorial-policy.html">Editorial policy</a>
        <a href="/medical-review-policy.html">Medical review</a>
        <a href="/contact.html">Contact</a>
        <a href="/disclaimer.html">Medical disclaimer</a>
        <a href="/privacy.html">Privacy</a>
        <a href="/terms.html">Terms</a>
      </nav>
    </footer>
  </body>
</html>
`;
}

function renderEnglishRedirect() {
  const canonical = `${baseUrl}${pathFor("en")}`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Moved</title>
    <link rel="canonical" href="${canonical}" />
    <meta name="robots" content="noindex,follow" />
    <meta http-equiv="refresh" content="0; url=${pathFor("en")}" />
    <script>location.replace("${pathFor("en")}" + location.hash);</script>
  </head>
  <body><p>Moved to <a href="${pathFor("en")}">${canonical}</a>.</p></body>
</html>
`;
}

function writeArticlePages() {
  for (const lang of Object.keys(languages)) {
    const filePath = outputPath(lang);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, renderArticle(lang));
  }

  const redirectPath = join("en", "articles", slug, "index.html");
  mkdirSync(dirname(redirectPath), { recursive: true });
  writeFileSync(redirectPath, renderEnglishRedirect());
}

function updateSportsHub(lang) {
  const labels = languages[lang];
  const t = translations[lang];
  const filePath = join(labels.prefix.replace(/^\//, ""), "sports", "index.html");
  let html = readFileSync(filePath, "utf8");
  const articleHref = pathFor(lang);
  const articleUrl = urlFor(lang);

  const scriptPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
  const match = html.match(scriptPattern);
  if (match) {
    const data = JSON.parse(match[1]);
    const itemList = data["@graph"]?.find((item) => item["@type"] === "ItemList");
    if (itemList && !itemList.itemListElement.some((item) => item.url === articleUrl)) {
      itemList.itemListElement.splice(1, 0, {
        "@type": "ListItem",
        position: 2,
        name: t.cardTitle,
        url: articleUrl
      });
      itemList.itemListElement.forEach((item, index) => {
        item.position = index + 1;
      });
      html = html.replace(
        scriptPattern,
        `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`
      );
    }
  }

  if (!html.includes(`href="${articleHref}"`)) {
    const existingHref = localizedPath(lang, "articles/sports-neck-load-return-guide");
    const markerIndex = html.indexOf(`href="${existingHref}"`);
    if (markerIndex === -1) {
      throw new Error(`Could not find sports guide card in ${filePath}`);
    }
    const insertAt = html.indexOf("</article>", markerIndex);
    if (insertAt === -1) throw new Error(`Could not find article-card close in ${filePath}`);
    const card = `
<article class="article-card">
          <span class="tag">${escapeHtml(t.cardTag)}</span>
          <h3>${escapeHtml(t.cardTitle)}</h3>
          <p>${escapeHtml(t.cardBody)}</p>
          <a href="${articleHref}">${escapeHtml(labels.readMore)}: ${escapeHtml(t.cardTitle)}</a>
        </article>`;
    html = `${html.slice(0, insertAt + "</article>".length)}${card}${html.slice(
      insertAt + "</article>".length
    )}`;
  }

  writeFileSync(filePath, html);
}

function updateSitemap() {
  const sitemapPath = "sitemap.xml";
  let xml = readFileSync(sitemapPath, "utf8");
  if (xml.includes(`${baseUrl}${pathFor("en")}`)) return;

  const entries = Object.keys(languages)
    .map(
      (lang) => `  <url>
    <loc>${urlFor(lang)}</loc>
    <lastmod>${reviewDate}</lastmod>
  </url>`
    )
    .join("\n");
  const marker = "  <url>\n    <loc>https://cervicalcurveguide.com/zh/articles/cervical-kyphosis-vs-loss-lordosis/</loc>";
  if (!xml.includes(marker)) throw new Error("Could not find sitemap insertion marker");
  xml = xml.replace(marker, `${entries}\n${marker}`);
  writeFileSync(sitemapPath, xml);
}

writeArticlePages();
for (const lang of Object.keys(languages)) updateSportsHub(lang);
updateSitemap();

console.log(`Built multilingual surfing experience article: ${slug}`);
