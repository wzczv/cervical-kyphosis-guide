import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const baseUrl = "https://cervicalcurveguide.com";
const today = "2026-06-15";
const cssVersion = "20260613-header-consent";
const analyticsVersion = "20260613-header-consent3";

const sources = {
  aaosRadiculopathy: {
    label: "AAOS OrthoInfo: Cervical Radiculopathy",
    url: "https://orthoinfo.aaos.org/en/diseases--conditions/cervical-radiculopathy-pinched-nerve/"
  },
  ncbiRadiculopathy: {
    label: "NCBI Bookshelf: Cervical Radiculopathy",
    url: "https://www.ncbi.nlm.nih.gov/books/NBK441828/"
  },
  carpal: {
    label: "MedlinePlus: Carpal Tunnel Syndrome",
    url: "https://medlineplus.gov/carpaltunnelsyndrome.html"
  },
  ulnar: {
    label: "MedlinePlus: Ulnar Nerve Dysfunction",
    url: "https://medlineplus.gov/ency/article/000789.htm"
  },
  kyphosis: {
    label: "Cleveland Clinic: Cervical Kyphosis",
    url: "https://my.clevelandclinic.org/health/diseases/22868-cervical-kyphosis"
  },
  lordosis: {
    label: "PMC: Loss of cervical lordosis prognosis review",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5324370/"
  },
  guideline: {
    label: "JOSPT / PubMed: Neck Pain Clinical Practice Guideline",
    url: "https://pubmed.ncbi.nlm.nih.gov/28666405/"
  }
};

const related = {
  en: [
    ["Finger numbness map", "/articles/finger-numbness-nerve-map/"],
    ["C5-C8 nerve-root symptoms", "/articles/c5-c8-nerve-root-symptoms/"],
    ["Radiculopathy and myelopathy warning signs", "/articles/cervical-radiculopathy-myelopathy-red-flags/"],
    ["7-day symptom tracker", "/printable-neck-symptom-tracker/"]
  ],
  zh: [
    ["手指麻木地图", "/zh/articles/finger-numbness-nerve-map/"],
    ["C5-C8 神经根症状", "/zh/articles/c5-c8-nerve-root-symptoms/"],
    ["神经根病和脊髓危险信号", "/zh/articles/cervical-radiculopathy-myelopathy-red-flags/"],
    ["7 天症状记录表", "/zh/printable-neck-symptom-tracker/"]
  ]
};

const linkLabels = {
  en: {
    "can-cervical-curve-be-restored": "Can cervical curve be restored?",
    "can-cervical-kyphosis-cause-hand-numbness": "Can cervical kyphosis cause hand numbness?",
    "c5-c8-nerve-root-symptoms": "C5-C8 nerve-root symptoms",
    "c6-c7-numbness-thumb-index-middle-finger": "C6-C7 numbness in thumb, index, and middle finger",
    "cervical-kyphosis-exercises-to-avoid": "Cervical kyphosis exercises to avoid",
    "cervical-kyphosis-vs-loss-lordosis": "Cervical kyphosis vs loss of lordosis",
    "cervical-radiculopathy-myelopathy-red-flags": "Radiculopathy and myelopathy warning signs",
    "cervical-traction-contraindications": "Cervical traction contraindications",
    "finger-numbness-nerve-map": "Finger numbness map",
    "headache-dizziness-neck-curve": "Headache and dizziness with neck curve changes",
    "is-loss-of-cervical-lordosis-serious": "Is loss of cervical lordosis serious?",
    "mild-cervical-kyphosis-symptoms": "Mild cervical kyphosis symptoms",
    "morning-hand-numbness-differential": "Morning hand numbness differential",
    "normal-cervical-lordosis-vs-straight-neck": "Normal cervical lordosis vs straight neck",
    "office-neck-curve-ergonomics": "Office ergonomics for neck curve changes",
    "pillow-height-sleep-position": "Pillow height and sleep position",
    "printable-neck-symptom-tracker": "7-day symptom tracker",
    "strength-training-with-cervical-kyphosis": "Strength training with cervical kyphosis",
    "traction-pillow-manipulation-risk-guide": "Traction, pillows, and manipulation risk guide",
    "when-to-see-doctor-cervical-kyphosis": "When to see a doctor for cervical kyphosis"
  },
  zh: {
    "can-cervical-curve-be-restored": "颈椎曲度能练回来吗？",
    "can-cervical-kyphosis-cause-hand-numbness": "颈椎反弓会导致手麻吗？",
    "c5-c8-nerve-root-symptoms": "C5-C8 神经根症状",
    "c6-c7-numbness-thumb-index-middle-finger": "C6-C7 与拇指、食指、中指麻木",
    "cervical-kyphosis-exercises-to-avoid": "颈椎反弓需要避免的练习",
    "cervical-kyphosis-vs-loss-lordosis": "颈椎反弓、后凸和曲度变直的区别",
    "cervical-radiculopathy-myelopathy-red-flags": "神经根病和脊髓危险信号",
    "cervical-traction-contraindications": "颈椎牵引禁忌和风险",
    "finger-numbness-nerve-map": "手指麻木地图",
    "headache-dizziness-neck-curve": "颈曲变化、头痛和头晕",
    "is-loss-of-cervical-lordosis-serious": "颈椎生理曲度变直严重吗？",
    "mild-cervical-kyphosis-symptoms": "轻度颈椎反弓症状",
    "morning-hand-numbness-differential": "晨起手麻的常见线索",
    "normal-cervical-lordosis-vs-straight-neck": "正常颈曲和直颈的区别",
    "office-neck-curve-ergonomics": "办公室颈椎曲度调整",
    "pillow-height-sleep-position": "枕头高度和睡姿",
    "printable-neck-symptom-tracker": "7 天症状记录表",
    "strength-training-with-cervical-kyphosis": "颈椎反弓和力量训练",
    "traction-pillow-manipulation-risk-guide": "牵引、枕头和手法风险边界",
    "when-to-see-doctor-cervical-kyphosis": "颈椎反弓什么时候该就医？"
  }
};

const topics = [
  {
    slug: "reversal-of-cervical-lordosis-meaning",
    category: { en: "Imaging guide", zh: "影像解读" },
    title: { en: "Reversal of Cervical Lordosis: What the Report Means", zh: "颈椎生理曲度反弓：报告这样写是什么意思？" },
    description: {
      en: "A conservative explanation of reversal of cervical lordosis, how it differs from straightening, and why symptoms and exam findings matter more than one curve phrase.",
      zh: "保守解释颈椎生理曲度反弓、曲度变直和报告词之间的区别，以及为什么症状和体格检查比单个影像词更重要。"
    },
    intent: {
      en: "The phrase usually describes the neck curve moving away from the usual forward lordosis, but it is not a complete diagnosis by itself.",
      zh: "这个词通常描述颈椎曲线偏离正常前凸、甚至朝反方向变化，但它本身不是完整诊断。"
    },
    nuance: {
      en: "The next decision depends on pain behavior, arm symptoms, weakness, gait or hand-control changes, trauma history, and whether the finding matches the clinical exam.",
      zh: "下一步要看疼痛变化、手臂症状、无力、走路或手部控制变化、外伤史，以及影像结果是否和临床检查一致。"
    },
    checks: {
      en: ["Compare the exact report phrase with symptoms instead of treating it as a verdict.", "Track whether symptoms are local and stable or spreading into the arm.", "Use red flags, not curve shape alone, to decide urgency."],
      zh: ["先把报告原话和症状放在一起看，不要把它当成结论。", "记录症状是局部稳定，还是向手臂扩散。", "决定紧急程度时优先看危险信号，而不是只看曲度形态。"]
    },
    sources: ["kyphosis", "lordosis", "guideline"],
    links: ["cervical-kyphosis-vs-loss-lordosis", "normal-cervical-lordosis-vs-straight-neck", "when-to-see-doctor-cervical-kyphosis"]
  },
  {
    slug: "straightening-of-cervical-lordosis-muscle-spasm",
    category: { en: "Imaging guide", zh: "影像解读" },
    title: { en: "Straightening of Cervical Lordosis: Muscle Spasm or Curve Change?", zh: "颈椎曲度变直：是肌肉痉挛还是曲度改变？" },
    description: {
      en: "Straightening of cervical lordosis can appear with posture, guarding, pain, or structural context. This guide explains why one x-ray phrase should be matched with symptoms.",
      zh: "颈椎曲度变直可能和姿势、疼痛保护、肌肉紧张或结构背景有关。本文说明为什么不能只凭一句报告词判断。"
    },
    intent: {
      en: "Straightening may reflect a moment-in-time posture or guarding response, but it can also be reported in longer-standing alignment patterns.",
      zh: "曲度变直有时反映拍片当下的姿势或疼痛保护，也可能出现在更长期的排列模式里。"
    },
    nuance: {
      en: "The useful question is whether symptoms are improving, stable, or worsening, and whether arm pain, numbness, weakness, or coordination changes are present.",
      zh: "更有用的问题是症状在改善、稳定还是加重，以及是否有手臂痛、麻木、无力或协调变化。"
    },
    checks: {
      en: ["Do not assume spasm or permanent change from the phrase alone.", "Watch whether symptoms settle over days or keep escalating.", "Bring the report and a symptom log to a clinician if function is changing."],
      zh: ["不要只凭报告词判断是痉挛还是永久改变。", "观察症状是在几天内缓解，还是持续升级。", "如果功能在变化，带着报告和症状记录就医讨论。"]
    },
    sources: ["lordosis", "guideline", "kyphosis"],
    links: ["normal-cervical-lordosis-vs-straight-neck", "is-loss-of-cervical-lordosis-serious", "office-neck-curve-ergonomics"]
  },
  {
    slug: "cervical-kyphosis-dizziness-when-to-worry",
    category: { en: "Symptom guide", zh: "症状专题" },
    title: { en: "Cervical Kyphosis and Dizziness: When to Worry, What to Check", zh: "颈椎反弓和头晕：什么时候需要警惕、先查什么？" },
    description: {
      en: "Cervical kyphosis and dizziness can appear together, but a curve report does not prove the cause. Learn red flags, neck-related clues, and what to track.",
      zh: "颈椎反弓和头晕可以同时出现，但曲度报告不能直接证明原因。先区分危险信号、颈部相关线索和该记录什么。"
    },
    intent: {
      en: "The short answer: do not treat dizziness as proof that cervical kyphosis is the cause. First separate emergency signs, vestibular or medical causes, and neck-sensitive patterns.",
      zh: "简短答案：不要把头晕当成颈椎反弓导致的证明。先分清紧急信号、前庭或全身原因，以及是否存在颈部敏感模式。"
    },
    nuance: {
      en: "Urgency rises with new neurological symptoms, trouble walking, severe new headache, spinning vertigo, fainting, chest symptoms, trauma, fever, or rapidly worsening function.",
      zh: "如果出现新的神经症状、走路异常、严重新发头痛、旋转性眩晕、晕厥、胸部症状、外伤、发热或功能快速下降，优先级会升高。"
    },
    checks: {
      en: ["Separate dizziness type: lightheaded, spinning, imbalance, or headache-related.", "Record whether head movement, neck position, exertion, illness, sleep, or medication changes symptoms.", "Do not use neck exercises to self-manage sudden, severe, spinning, or neurological dizziness."],
      zh: ["先分清头晕类型：发飘、旋转、失衡，还是伴随头痛。", "记录头部动作、颈部姿势、运动、疾病、睡眠或用药是否改变症状。", "突发、严重、旋转性或伴神经症状的头晕，不要靠颈部练习自行处理。"]
    },
    sources: ["guideline", "kyphosis", "ncbiRadiculopathy"],
    links: ["headache-dizziness-neck-curve", "mild-cervical-kyphosis-symptoms", "cervical-radiculopathy-myelopathy-red-flags", "when-to-see-doctor-cervical-kyphosis"]
  },
  {
    slug: "neck-pain-numb-thumb-index-finger",
    category: { en: "Symptom guide", zh: "症状专题" },
    title: { en: "Neck Pain With Numb Thumb and Index Finger: C6 or Something Else?", zh: "颈痛伴拇指和食指麻：是 C6 还是别的问题？" },
    description: {
      en: "Thumb and index-finger numbness can suggest C6 nerve-root clues, but carpal tunnel and other peripheral nerve patterns can overlap.",
      zh: "拇指和食指麻可能提示 C6 神经根线索，但腕管综合征和其他周围神经模式也会重叠。"
    },
    intent: {
      en: "A C6 pattern is possible when neck or shoulder-blade pain travels toward the thumb or index finger, but the same area can be involved in median-nerve problems.",
      zh: "如果颈部或肩胛附近疼痛向拇指、食指放射，C6 模式有可能；但同一区域也可能和正中神经问题有关。"
    },
    nuance: {
      en: "Neck position, coughing, grip change, night symptoms, wrist position, and exam findings help separate these possibilities.",
      zh: "颈部姿势、咳嗽、握力变化、夜间症状、手腕姿势和体格检查能帮助区分这些可能性。"
    },
    checks: {
      en: ["Map whether symptoms start in the neck, shoulder blade, forearm, or hand.", "Note whether wrist position or shaking the hand changes symptoms.", "Escalate if numbness spreads or weakness appears."],
      zh: ["记录症状是从颈部、肩胛、前臂还是手开始。", "留意手腕姿势或甩手是否改变症状。", "如果麻木扩散或出现无力，应提高就医优先级。"]
    },
    sources: ["aaosRadiculopathy", "ncbiRadiculopathy", "carpal"],
    links: ["c6-c7-numbness-thumb-index-middle-finger", "finger-numbness-nerve-map", "can-cervical-kyphosis-cause-hand-numbness"]
  },
  {
    slug: "middle-finger-numbness-c7-nerve-root",
    category: { en: "Symptom guide", zh: "症状专题" },
    title: { en: "Middle Finger Numbness and the C7 Nerve Root", zh: "中指麻木和 C7 神经根：怎么保守判断？" },
    description: {
      en: "Middle-finger numbness is often discussed with C7 nerve-root clues, but finger maps overlap and should be interpreted with strength, reflex, and symptom behavior.",
      zh: "中指麻常被拿来讨论 C7 神经根线索，但手指分布会重叠，需要结合力量、反射和症状行为。"
    },
    intent: {
      en: "C7 is a common cervical radiculopathy level, and middle-finger symptoms may be one clue, especially with arm pain or triceps-area changes.",
      zh: "C7 是颈椎神经根病中常见节段，中指症状可能是线索之一，尤其合并手臂痛或肱三头肌区域变化时。"
    },
    nuance: {
      en: "No finger map can diagnose the level alone. Weakness, reflex change, spreading numbness, and exam agreement matter more.",
      zh: "没有任何手指地图能单独诊断节段。无力、反射变化、麻木扩散和检查一致性更重要。"
    },
    checks: {
      en: ["Record whether symptoms include the middle finger alone or the whole hand.", "Track pushing strength, triceps symptoms, and next-day response.", "Use the map as a discussion aid, not a self-diagnosis."],
      zh: ["记录是单纯中指麻，还是整只手都受影响。", "追踪推的力量、肱三头肌区域症状和第二天反应。", "把地图当讨论辅助，不要当自我诊断。"]
    },
    sources: ["aaosRadiculopathy", "ncbiRadiculopathy"],
    links: ["c5-c8-nerve-root-symptoms", "finger-numbness-nerve-map", "cervical-radiculopathy-myelopathy-red-flags"]
  },
  {
    slug: "ring-pinky-finger-numbness-neck-ulnar-nerve",
    category: { en: "Symptom guide", zh: "症状专题" },
    title: { en: "Ring and Pinky Finger Numbness: Neck, C8, or Ulnar Nerve?", zh: "无名指和小指麻：颈椎、C8 还是尺神经？" },
    description: {
      en: "Ring and pinky finger numbness can involve C8/T1 clues, ulnar nerve irritation, elbow position, or wrist/hand compression. This page compares the patterns.",
      zh: "无名指和小指麻可能涉及 C8/T1 线索、尺神经刺激、肘部姿势或腕手受压。本文保守比较这些模式。"
    },
    intent: {
      en: "Small-finger-side numbness often makes people worry about the neck, but the ulnar nerve can create a very similar distribution.",
      zh: "小指侧麻木常让人担心颈椎，但尺神经也能造成非常相似的分布。"
    },
    nuance: {
      en: "Elbow bending, leaning on the elbow, night position, grip weakness, and neck-triggered arm symptoms help sort the clues.",
      zh: "屈肘、压肘、夜间姿势、握力变化和颈部诱发的手臂症状，有助于整理线索。"
    },
    checks: {
      en: ["Notice whether elbow position reproduces symptoms.", "Track grip, finger spreading, and fine hand control.", "Seek care promptly for new weakness or spreading numbness."],
      zh: ["留意肘部姿势是否能重复诱发症状。", "追踪握力、手指分开能力和精细控制。", "新发无力或麻木扩散时应尽快就医。"]
    },
    sources: ["ulnar", "ncbiRadiculopathy", "aaosRadiculopathy"],
    links: ["finger-numbness-nerve-map", "c5-c8-nerve-root-symptoms", "morning-hand-numbness-differential"]
  },
  {
    slug: "cervical-kyphosis-sleeping-position",
    category: { en: "Sleep guide", zh: "睡眠专题" },
    title: { en: "Sleeping Position for Cervical Kyphosis or Straight Neck", zh: "颈椎反弓或曲度变直：睡姿怎么选？" },
    description: {
      en: "Sleeping position should aim for symptom calm and better sleep, not forcing the neck curve. Learn how to test pillow height and position changes conservatively.",
      zh: "睡姿目标应是让症状更稳定、睡眠更好，而不是强行矫正曲度。本文说明如何保守测试枕头高度和睡姿调整。"
    },
    intent: {
      en: "There is no single perfect sleeping position for every curve report. The better test is whether sleep quality and next-day symptoms improve.",
      zh: "没有一种睡姿适合所有曲度报告。更好的测试是睡眠质量和第二天症状是否改善。"
    },
    nuance: {
      en: "Side sleepers, back sleepers, mattress firmness, shoulder width, and arm symptoms all change the best setup.",
      zh: "侧睡、仰睡、床垫软硬、肩宽和手臂症状都会影响合适设置。"
    },
    checks: {
      en: ["Change only one variable at a time for several nights.", "Track morning numbness, headache, stiffness, and sleep interruption.", "Avoid forcing end-range neck positions during sleep."],
      zh: ["每次只改一个变量，并观察几个晚上。", "记录晨起手麻、头痛、僵硬和夜间醒来次数。", "睡觉时避免把颈部硬推到极限角度。"]
    },
    sources: ["guideline", "lordosis", "kyphosis"],
    links: ["pillow-height-sleep-position", "morning-hand-numbness-differential", "printable-neck-symptom-tracker"]
  },
  {
    slug: "push-ups-with-cervical-kyphosis",
    category: { en: "Exercise guide", zh: "练习专题" },
    title: { en: "Can You Do Push-Ups With Cervical Kyphosis?", zh: "颈椎反弓还能做俯卧撑吗？" },
    description: {
      en: "Push-ups are not automatically forbidden with cervical kyphosis, but neck position, symptom response, arm symptoms, and volume matter.",
      zh: "颈椎反弓不代表一定不能做俯卧撑，但颈部姿势、症状反应、手臂症状和训练量都很重要。"
    },
    intent: {
      en: "Many people can keep some version of pushing work if symptoms stay local, strength is stable, and the next-day response is calm.",
      zh: "如果症状保持局部、力量稳定、第二天反应平稳，很多人可以保留某种推类训练。"
    },
    nuance: {
      en: "Modify range, incline, tempo, and total sets before deciding that all push-ups are unsafe.",
      zh: "在判断所有俯卧撑都不安全之前，先调整幅度、斜度、节奏和总组数。"
    },
    checks: {
      en: ["Start with incline push-ups or wall push-ups after a flare.", "Keep the neck long instead of craning forward.", "Stop and reassess if arm pain, numbness, or weakness increases."],
      zh: ["症状波动后可从斜板或墙面俯卧撑开始。", "保持颈部延长，不要向前探头。", "如果手臂痛、麻木或无力增加，停止并重新评估。"]
    },
    sources: ["guideline", "aaosRadiculopathy"],
    links: ["strength-training-with-cervical-kyphosis", "cervical-kyphosis-exercises-to-avoid", "printable-neck-symptom-tracker"]
  },
  {
    slug: "neck-traction-made-symptoms-worse",
    category: { en: "Treatment boundaries", zh: "治疗边界" },
    title: { en: "Neck Traction Made Symptoms Worse: What It May Mean", zh: "颈椎牵引后症状更重：可能说明什么？" },
    description: {
      en: "If neck traction worsens symptoms, stop and reassess. This guide explains possible reasons, red flags, and what to track before trying more traction.",
      zh: "如果牵引后症状加重，应停止并重新评估。本文说明可能原因、危险信号，以及再次尝试前该记录什么。"
    },
    intent: {
      en: "Traction can help some nerve-root symptoms, but worsening pain, spreading numbness, or weakness means the dose, angle, diagnosis, or fit may be wrong.",
      zh: "牵引可能帮助部分神经根症状，但疼痛加重、麻木扩散或无力提示剂量、角度、诊断或适配性可能有问题。"
    },
    nuance: {
      en: "Do not push through neurological symptoms. A bad response is useful data, not a challenge to overcome.",
      zh: "不要硬顶神经症状。变差的反应是重要信息，不是需要强行克服的挑战。"
    },
    checks: {
      en: ["Stop traction if arm symptoms spread or strength changes.", "Write down angle, force, duration, and next-day response.", "Get clinical guidance before trying again after a clear flare."],
      zh: ["如果手臂症状扩散或力量改变，应停止牵引。", "记录角度、力度、时长和第二天反应。", "明显加重后再次尝试前，应先寻求专业指导。"]
    },
    sources: ["aaosRadiculopathy", "ncbiRadiculopathy", "guideline"],
    links: ["cervical-traction-contraindications", "traction-pillow-manipulation-risk-guide", "cervical-radiculopathy-myelopathy-red-flags"]
  },
  {
    slug: "loss-of-cervical-lordosis-exercises-to-avoid",
    category: { en: "Exercise guide", zh: "练习专题" },
    title: { en: "Loss of Cervical Lordosis: Exercises to Avoid or Modify", zh: "颈椎生理曲度变直：哪些练习要避免或调整？" },
    description: {
      en: "Loss of cervical lordosis does not ban all exercise, but aggressive stretching, heavy loading, or symptom-provoking positions may need modification.",
      zh: "颈椎生理曲度变直不等于禁止所有运动，但激进拉伸、重负荷或诱发症状的姿势可能需要调整。"
    },
    intent: {
      en: "The goal is not to force the curve back. It is to keep symptoms stable while gradually improving motion, strength, sleep, and tolerance.",
      zh: "目标不是把曲度硬掰回来，而是在症状稳定的前提下逐步改善活动、力量、睡眠和耐受。"
    },
    nuance: {
      en: "The same exercise may be fine for one person and too provocative for another depending on nerve symptoms and 24-hour response.",
      zh: "同一个动作对一个人可能没问题，对另一个人可能过度刺激，关键取决于神经症状和 24 小时反应。"
    },
    checks: {
      en: ["Avoid forcing end-range neck extension or aggressive nerve stretching during a flare.", "Reduce load before abandoning training entirely.", "Use the 24-hour response rule after every change."],
      zh: ["症状波动时避免强行后伸或激进神经拉伸。", "先降低负荷，不要一开始就完全停训。", "每次调整后都看 24 小时反应。"]
    },
    sources: ["guideline", "lordosis", "aaosRadiculopathy"],
    links: ["cervical-kyphosis-exercises-to-avoid", "can-cervical-curve-be-restored", "strength-training-with-cervical-kyphosis"]
  }
];

const labels = {
  en: {
    lang: "en",
    localeName: "English",
    home: "/",
    prefix: "",
    skip: "Skip to content",
    nav: ["Home", "Symptoms", "Imaging", "Exercises", "Treatments", "Sports", "Videos", "Tools"],
    navUrls: ["/", "/symptoms/", "/diagnosis/", "/exercises/", "/treatments/", "/sports/", "/videos/", "/tools/"],
    reviewed: "Last reviewed: June 13, 2026",
    editorial: "Editorial review: conservative health-education wording; not a diagnosis, prescription, or individualized rehabilitation plan.",
    direct: "Short answer",
    compare: "Clues to compare",
    track: "What to track for 7 days",
    related: "Related reading",
    refs: "References",
    medicalNotice: "Medical notice: New or worsening weakness, spreading numbness, hand clumsiness, walking changes, bowel/bladder symptoms, fever, cancer history, or significant trauma need prompt medical care. Night pain that keeps waking you, grip loss, or fast progression should not be handled only with online exercises.",
    trackerTitle: "Track symptoms before changing exercises",
    trackerCopy: "Record pain, numbness, sleep, triggers, and next-day response before changing exercises or discussing care.",
    trackerCta: "Open the 7-day tracker",
    faq: [
      ["Can this page diagnose my exact problem?", "No. It organizes clues for safer discussion, but diagnosis depends on history, exam findings, and clinician judgment."],
      ["When should I stop self-managing?", "Stop self-managing and seek prompt care for new weakness, spreading numbness, hand clumsiness, walking changes, bowel/bladder symptoms, fever, major trauma, cancer history, or fast progression."],
      ["What should I bring to an appointment?", "Bring the imaging report, a 7-day symptom log, what makes symptoms better or worse, and any strength, grip, walking, or sleep changes."]
    ],
    footer: "A multilingual health-education site for conservative cervical curve care."
  },
  zh: {
    lang: "zh-Hans",
    localeName: "中文",
    home: "/zh/",
    prefix: "/zh",
    skip: "跳到正文",
    nav: ["首页", "症状", "影像", "练习", "治疗", "运动", "视频", "工具"],
    navUrls: ["/zh/", "/zh/symptoms/", "/zh/diagnosis/", "/zh/exercises/", "/zh/treatments/", "/zh/sports/", "/zh/videos/", "/zh/tools/"],
    reviewed: "最后审阅：2026 年 6 月 13 日",
    editorial: "编辑审校：采用保守健康教育表述；不构成诊断、处方或个体化康复方案。",
    direct: "先给简短答案",
    compare: "需要对照的线索",
    track: "建议连续记录 7 天",
    related: "相关阅读",
    refs: "参考来源",
    medicalNotice: "医疗提示：新出现或加重的无力、麻木扩散、手变笨、走路变化、大小便异常、发热、肿瘤病史或明显外伤，需要尽快医学评估。夜间痛反复痛醒、握力下降或症状快速进展，不应只靠网上练习处理。",
    trackerTitle: "先记录症状，再调整练习",
    trackerCopy: "改变动作或就医讨论前，先记录疼痛、麻木、睡眠、诱因和第二天反应。",
    trackerCta: "打开 7 天记录表",
    faq: [
      ["这篇文章能直接诊断我的问题吗？", "不能。它只是帮助整理线索，真正诊断需要病史、体格检查和医生判断。"],
      ["什么时候不该继续自行处理？", "如果出现新发无力、麻木扩散、手变笨、走路变化、大小便异常、发热、明显外伤、肿瘤病史或快速加重，应尽快就医。"],
      ["就医时应该带什么？", "带上影像报告、7 天症状记录、哪些动作会加重或缓解，以及力量、握力、走路和睡眠变化。"]
    ],
    footer: "一个面向颈椎曲度保守康复的多语言健康教育网站。"
  }
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function articlePath(lang, slug) {
  return lang === "zh" ? `/zh/articles/${slug}/` : `/articles/${slug}/`;
}

function localizeLink(lang, slug) {
  if (slug === "printable-neck-symptom-tracker") return lang === "zh" ? "/zh/printable-neck-symptom-tracker/" : "/printable-neck-symptom-tracker/";
  if (slug.startsWith("/")) return slug;
  return articlePath(lang, slug);
}

function sourceItems(keys) {
  return keys.map((key) => sources[key]);
}

function descriptionText(topic, lang) {
  if (lang !== "zh") return topic.description.en;
  return `${topic.description.zh} 同时提供症状记录、危险信号和保守处理边界，方便就医前整理线索。`;
}

function jsonLd(topic, lang) {
  const l = labels[lang];
  const url = `${baseUrl}${articlePath(lang, topic.slug)}`;
  const faq = l.faq.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a }
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#medical-page`,
        name: topic.title[lang],
        headline: topic.title[lang],
        description: descriptionText(topic, lang),
        url,
        inLanguage: l.lang,
        medicalAudience: "Patient",
        isAccessibleForFree: true,
        lastReviewed: today,
        dateModified: today,
        about: ["Cervical kyphosis", "Loss of cervical lordosis", "Neck pain", "Cervical radiculopathy"]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Cervical Curve Guide", item: `${baseUrl}${l.home}` },
          { "@type": "ListItem", position: 2, name: topic.title[lang], item: url }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url,
        inLanguage: l.lang,
        mainEntity: faq
      }
    ]
  };
}

function header(topic, lang) {
  const l = labels[lang];
  const otherLang = lang === "zh" ? "en" : "zh";
  const other = labels[otherLang];
  const nav = l.nav
    .map((text, idx) => `<a href="${l.navUrls[idx]}">${esc(text)}</a>`)
    .join("\n        ");
  return `<a class="skip-link" href="#content">${esc(l.skip)}</a>
    <header class="site-header">
      <a class="brand" href="${l.home}">
        <span class="brand-mark" aria-hidden="true">C</span>
        <span>Cervical Curve Guide</span>
      </a>
      <nav class="main-nav" aria-label="Primary navigation">
        ${nav}
      </nav>
      <div class="language-switcher" role="group" aria-label="Language">
        <a class="lang-button${lang === "zh" ? " is-active" : ""}" href="${articlePath("zh", topic.slug)}" hreflang="zh-Hans"${lang === "zh" ? ' aria-current="page"' : ""}>${esc(labels.zh.localeName)}</a>
        <a class="lang-button${lang === "en" ? " is-active" : ""}" href="${articlePath("en", topic.slug)}" hreflang="en"${lang === "en" ? ' aria-current="page"' : ""}>EN</a>
      </div>
    </header>`;
}

function footer(lang) {
  const l = labels[lang];
  return `<footer class="site-footer">
      <p>${esc(l.footer)}</p>
      <nav class="footer-links" aria-label="Footer links">
        <a href="/disclaimer.html">${lang === "zh" ? "医疗免责声明" : "Medical disclaimer"}</a>
        <a href="/about.html">About</a>
        <a href="/authors.html">Authors</a>
        <a href="/editorial-policy.html">Editorial policy</a>
        <a href="/medical-review-policy.html">Medical review</a>
        <a href="/contact.html">Contact</a>
        <a href="/privacy.html">${lang === "zh" ? "隐私政策" : "Privacy"}</a>
        <a href="/terms.html">${lang === "zh" ? "使用条款" : "Terms"}</a>
        <a href="#content">${lang === "zh" ? "回到顶部" : "Back to top"}</a>
      </nav>
    </footer>`;
}

function pageHtml(topic, lang) {
  const l = labels[lang];
  const path = articlePath(lang, topic.slug);
  const enPath = articlePath("en", topic.slug);
  const zhPath = articlePath("zh", topic.slug);
  const metaDescription = descriptionText(topic, lang);
  const links = topic.links.map((slug) => {
    const href = localizeLink(lang, slug);
    const label = related[lang].find(([, url]) => url === href)?.[0] || linkLabels[lang][slug] || slug.replaceAll("-", " ");
    return `<li><a href="${href}">${esc(label)}</a></li>`;
  }).join("\n              ");
  const relatedCards = related[lang].map(([title, href]) => `<article class="article-card">
              <span class="tag">${lang === "zh" ? "相关资源" : "Related"}</span>
              <h3>${esc(title)}</h3>
              <p>${lang === "zh" ? "用于把症状、风险和下一步记录连接起来。" : "Use this to connect symptoms, risk screening, and next-step tracking."}</p>
              <a href="${href}">${lang === "zh" ? "继续阅读" : "Read more"}: ${esc(title)}</a>
            </article>`).join("\n");
  const sourceList = sourceItems(topic.sources).map((src) => `<li><a href="${src.url}" target="_blank" rel="noopener noreferrer">${esc(src.label)}</a></li>`).join("\n              ");
  const faq = l.faq.map(([q, a]) => `<details class="faq-item"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("\n              ");
  return `<!doctype html>
<html lang="${l.lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(topic.title[lang])} | Cervical Curve Guide</title>
    <meta name="description" content="${esc(metaDescription)}" />
    <meta name="robots" content="index,follow,max-image-preview:large" />
    <meta name="author" content="Cervical Curve Guide" />
    <meta name="theme-color" content="#f5fbfb" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="canonical" href="${baseUrl}${path}" />
    <link rel="alternate" hreflang="x-default" href="${baseUrl}${enPath}" />
    <link rel="alternate" hreflang="en" href="${baseUrl}${enPath}" />
    <link rel="alternate" hreflang="zh-Hans" href="${baseUrl}${zhPath}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${esc(topic.title[lang])}" />
    <meta property="og:description" content="${esc(metaDescription)}" />
    <meta property="og:url" content="${baseUrl}${path}" />
    <meta property="og:image" content="${baseUrl}/assets/hero-cervical-kyphosis.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(topic.title[lang])}" />
    <meta name="twitter:description" content="${esc(metaDescription)}" />
    <link rel="stylesheet" href="/assets/styles.css?v=${cssVersion}" />
    <script src="/assets/analytics.js?v=${analyticsVersion}" defer></script>
    <script type="application/ld+json">${JSON.stringify(jsonLd(topic, lang), null, 2)}</script>
  </head>
  <body>
    ${header(topic, lang)}
    <main class="legal-main article-main" id="content">
      <article class="legal-article article-page">
        <p class="legal-meta">${esc(l.reviewed)} · ${esc(topic.category[lang])}</p>
        <p class="legal-meta">${esc(l.editorial)}</p>
        <h1>${esc(topic.title[lang])}</h1>
        <div class="article-dek">
          <p>${esc(topic.description[lang])}</p>
          <p>${esc(topic.intent[lang])}</p>
        </div>
        <aside class="article-callout">${esc(l.medicalNotice)}</aside>
        <aside class="article-callout resource-callout">
          <strong>${esc(l.trackerTitle)}</strong>
          <p>${esc(l.trackerCopy)}</p>
          <a class="button" href="${lang === "zh" ? "/zh/printable-neck-symptom-tracker/" : "/printable-neck-symptom-tracker/"}">${esc(l.trackerCta)}</a>
        </aside>
        <section class="article-section">
          <h2>${esc(l.direct)}</h2>
          <p>${esc(topic.intent[lang])}</p>
          <p>${esc(topic.nuance[lang])}</p>
        </section>
        <section class="article-section">
          <h2>${esc(l.compare)}</h2>
          <ul>
            ${topic.checks[lang].map((item) => `<li>${esc(item)}</li>`).join("\n            ")}
          </ul>
        </section>
        <section class="article-section">
          <h2>${esc(l.track)}</h2>
          <p>${lang === "zh" ? "记录疼痛位置、手臂或手指症状、睡眠、诱发姿势、练习变化和第二天反应。这样的记录通常比反复盯着影像词更能帮助就医沟通。" : "Record pain location, arm or finger symptoms, sleep, aggravating positions, exercise changes, and next-day response. This log is often more useful for care discussions than rereading imaging words alone."}</p>
          <ul>
            ${links}
          </ul>
        </section>
        <section class="article-section">
          <h2>FAQ</h2>
          <div class="faq-list">
            ${faq}
          </div>
        </section>
        <section class="article-section article-sources">
          <h2>${esc(l.refs)}</h2>
          <ul class="source-list">
            ${sourceList}
          </ul>
        </section>
        <section class="article-section">
          <h2>${esc(l.related)}</h2>
          <div class="article-grid growth-grid">
            ${relatedCards}
          </div>
        </section>
      </article>
    </main>
    ${footer(lang)}
  </body>
</html>
`;
}

function writePage(topic, lang) {
  const rel = articlePath(lang, topic.slug).replace(/^\//, "") + "index.html";
  mkdirSync(dirname(rel), { recursive: true });
  writeFileSync(rel, pageHtml(topic, lang));
}

function card(topic, lang) {
  const read = lang === "zh" ? "阅读专题" : "Read the guide";
  return `<article class="article-card longtail-card"><span class="tag">${esc(topic.category[lang])}</span><h3>${esc(topic.title[lang])}</h3><p>${esc(topic.description[lang])}</p><a href="${articlePath(lang, topic.slug)}">${read}: ${esc(topic.title[lang])}</a></article>`;
}

function updateHomeStructuredData(html, lang) {
  const match = html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!match) throw new Error(`Missing home structured data for ${lang}`);
  const data = JSON.parse(match[1]);
  const itemList = data["@graph"]?.find((item) => item["@type"] === "ItemList");
  if (!itemList) throw new Error(`Missing home ItemList structured data for ${lang}`);
  const existing = itemList.itemListElement || [];
  const longtailUrls = new Set(topics.map((topic) => `${baseUrl}${articlePath(lang, topic.slug)}`));
  const oldItems = existing.filter((item) => !longtailUrls.has(item.url));
  const newItems = topics.map((topic, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: topic.title[lang],
    url: `${baseUrl}${articlePath(lang, topic.slug)}`
  }));
  itemList.itemListElement = [...newItems, ...oldItems].map((item, idx) => ({ ...item, position: idx + 1 }));
  itemList.name = lang === "zh" ? "四十多个主题已经组成内容集群。" : "More than forty topics now form content clusters.";
  const script = `<script id="structured-data" type="application/ld+json">${JSON.stringify(data)}</script>`;
  return html.replace(match[0], script);
}

function updateHome(lang) {
  const file = lang === "zh" ? "zh/index.html" : "index.html";
  let html = readFileSync(file, "utf8");
  const start = '<div class="article-grid" id="article-grid">';
  const idx = html.indexOf(start);
  if (idx === -1) throw new Error(`Missing article grid in ${file}`);
  const insertAt = idx + start.length;
  const markerStart = `<!-- longtail-sprint-start -->`;
  const markerEnd = `<!-- longtail-sprint-end -->`;
  const block = `${markerStart}${topics.map((topic) => card(topic, lang)).join("")}${markerEnd}`;
  const existing = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`);
  if (existing.test(html)) {
    html = html.replace(existing, block);
  } else {
    html = html.slice(0, insertAt) + block + html.slice(insertAt);
  }
  html = html.replace(/More than twenty topics now form content clusters\./g, "More than forty topics now form content clusters.");
  html = html.replace(/二十多个主题已经组成内容集群。/g, "四十多个主题已经组成内容集群。");
  html = updateHomeStructuredData(html, lang);
  writeFileSync(file, html);
}

function updateSitemap() {
  let xml = readFileSync("sitemap.xml", "utf8");
  const markerStart = "  <!-- longtail-sprint-start -->";
  const markerEnd = "  <!-- longtail-sprint-end -->";
  const entries = topics.flatMap((topic) => ["zh", "en"].map((lang) => `  <url>
    <loc>${baseUrl}${articlePath(lang, topic.slug)}</loc>
    <lastmod>${today}</lastmod>
  </url>`)).join("\n");
  const block = `${markerStart}\n${entries}\n${markerEnd}`;
  const existing = new RegExp(`  <!-- longtail-sprint-start -->[\\s\\S]*?  <!-- longtail-sprint-end -->`);
  if (existing.test(xml)) {
    xml = xml.replace(existing, block);
  } else {
    xml = xml.replace("\n</urlset>", `\n${block}\n</urlset>`);
  }
  writeFileSync("sitemap.xml", xml);
}

for (const topic of topics) {
  writePage(topic, "en");
  writePage(topic, "zh");
}
updateHome("en");
updateHome("zh");
updateSitemap();

console.log(`Generated ${topics.length * 2} long-tail pages and updated home grids + sitemap.`);
