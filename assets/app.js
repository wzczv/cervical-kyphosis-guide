const commonVideos = [
  {
    id: "rZDj-Fiko4g",
    source: "E3 Rehab",
    url: "https://www.youtube.com/watch?v=rZDj-Fiko4g",
    key: "radiculopathy"
  },
  {
    id: "gZUNcfcdHW4",
    source: "Ask Doctor Jo",
    url: "https://www.youtube.com/watch?v=gZUNcfcdHW4",
    key: "pinched"
  },
  {
    id: "yZJ1MfKqByY",
    source: "Ask Doctor Jo",
    url: "https://www.youtube.com/watch?v=yZJ1MfKqByY",
    key: "glides"
  },
  {
    id: "sr3hW43i9tg",
    source: "Ask Doctor Jo",
    url: "https://www.youtube.com/watch?v=sr3hW43i9tg",
    key: "daily"
  },
  {
    id: "WOp5Fnma-po",
    source: "Ask Doctor Jo",
    url: "https://www.youtube.com/watch?v=WOp5Fnma-po",
    key: "shoulder"
  }
];

const sourceLinks = [
  {
    label: "AAFP: Nonoperative Management of Cervical Radiculopathy",
    url: "https://www.aafp.org/afp/2016/0501/p746"
  },
  {
    label: "JOSPT / PubMed: Neck Pain, Revision 2017 Clinical Practice Guideline",
    url: "https://pubmed.ncbi.nlm.nih.gov/28666405/"
  },
  {
    label: "PMC: Etiology and treatment of cervical kyphosis, narrative review",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8511555/"
  },
  {
    label: "PMC: Loss of cervical lordosis, prognosis review",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5324370/"
  },
  {
    label: "PubMed: Sagittal alignment of the cervical spine after neck injury",
    url: "https://pubmed.ncbi.nlm.nih.gov/23412281/"
  },
  {
    label: "PMC: Surfer's myelopathy review",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7919899/"
  },
  {
    label: "PMC: Surfer's myelopathy case series and literature review",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6280062/"
  },
  {
    label: "PMC: Cervical radiculopathy review",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4958381/"
  },
  {
    label: "Cleveland Clinic: Cervical kyphosis symptoms",
    url: "https://my.clevelandclinic.org/health/diseases/22868-cervical-kyphosis"
  },
  {
    label: "Merck Manual Professional: Radiculopathy dermatomal patterns",
    url: "https://www.merckmanuals.com/professional/multimedia/table/symptoms-of-common-radiculopathies-by-dermatomal-level"
  },
  {
    label: "Johns Hopkins Medicine: Thoracic outlet syndrome",
    url: "https://www.hopkinsmedicine.org/health/conditions-and-diseases/thoracic-outlet-syndrome"
  },
  {
    label: "PubMed: Spinal injury in alpine winter sports review",
    url: "https://pubmed.ncbi.nlm.nih.gov/31324221/"
  },
  {
    label: "PMC: Return to play after cervical spine injuries consensus",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5110349/"
  },
  {
    label: "ScienceDirect: Cervical load while belaying in climbing",
    url: "https://www.sciencedirect.com/science/article/abs/pii/S0949328X13001294"
  }
];

const protocolVideoLabels = {
  en: { heading: "YouTube references", open: "Open on YouTube" },
  zh: { heading: "YouTube 视频参考", open: "在 YouTube 打开" },
  ja: { heading: "YouTube 動画参考", open: "YouTubeで開く" },
  es: { heading: "Referencias en YouTube", open: "Abrir en YouTube" }
};

const protocolVideoRefs = [
  [
    [
      {
        title: "Foam Rolling for Thoracic Extension",
        source: "Point Performance",
        url: "https://www.youtube.com/watch?v=6gUphK9a-Gg"
      },
      {
        title: "Surfer shoulder thoracic mobility drill",
        source: "Surf Strength Coach",
        url: "https://www.youtube.com/watch?v=so9kxCJmbcE"
      },
      {
        title: "Pressup Cobra Spine Stretch",
        source: "Stone Clinic",
        url: "https://www.youtube.com/watch?v=L3A0pW34o44"
      }
    ],
    [
      {
        title: "How to Improve Your Surfboard Paddling",
        source: "Degree 33 Surfboards",
        url: "https://www.youtube.com/watch?v=SSDITQG1s08"
      },
      {
        title: "Surfer's neck strengthening and soft tissue program",
        source: "Martin Dunn / Michelle Drielsma",
        url: "https://www.youtube.com/watch?v=C_OVd3_BCJo"
      }
    ],
    [
      {
        title: "Surfboard paddling body position and technique",
        source: "Degree 33 Surfboards",
        url: "https://www.youtube.com/watch?v=SSDITQG1s08"
      },
      {
        title: "Surf shoulders: thoracic spine mobility",
        source: "Surf Strength Coach",
        url: "https://www.youtube.com/watch?v=so9kxCJmbcE"
      }
    ]
  ],
  [
    [
      {
        title: "Neck motor control",
        source: "Active Life Chiropractic",
        url: "https://www.youtube.com/watch?v=gIoBiQ52xSw"
      },
      {
        title: "Isometric neck strengthening",
        source: "Active Life Chiropractic",
        url: "https://www.youtube.com/watch?v=tLasge6DkZk"
      }
    ],
    [
      {
        title: "Home exercises for upper back and neck strain",
        source: "ChoosePT",
        url: "https://www.youtube.com/watch?v=D8GZu6kWtcY"
      },
      {
        title: "Neck strengthening exercises",
        source: "Active Life Chiropractic",
        url: "https://www.youtube.com/watch?v=SQLmgKoUm4U"
      }
    ],
    [
      {
        title: "Strengthening neck retraction",
        source: "Active Life Chiropractic",
        url: "https://www.youtube.com/watch?v=D2scztt0fJU"
      },
      {
        title: "Neck extensor strengthening",
        source: "Active Life Chiropractic",
        url: "https://www.youtube.com/watch?v=HbLiEFFH2Sg"
      }
    ]
  ],
  [
    [
      {
        title: "Belay glasses overview",
        source: "BMC TV",
        url: "https://www.youtube.com/watch?v=O3SSFmG_taE"
      },
      {
        title: "Lead belay technique",
        source: "REI",
        url: "https://www.youtube.com/watch?v=S_F1MfVGOzk"
      }
    ],
    [
      {
        title: "W Exercise with Band for Shoulders and Scapular Strengthening",
        source: "Point Performance",
        url: "https://www.youtube.com/watch?v=E_jTdfyvXW4"
      },
      {
        title: "Wall Slides for Scapular Stability",
        source: "Total Physical Therapy",
        url: "https://www.youtube.com/watch?v=SoC1P-Aoywk"
      },
      {
        title: "Banded I, T, Ys for Scapular Retraction",
        source: "GoTherex",
        url: "https://www.youtube.com/watch?v=fqrKXC1H4KI"
      }
    ],
    [
      {
        title: "Levator scapula stretch",
        source: "DNA Physical Therapy",
        url: "https://www.youtube.com/watch?v=nnpTI3gKSuw"
      },
      {
        title: "Home exercises for upper back and neck strain",
        source: "ChoosePT",
        url: "https://www.youtube.com/watch?v=D8GZu6kWtcY"
      }
    ]
  ]
];

const content = {
  en: {
    lang: "en",
    locale: "en-US",
    title: "Cervical Curve Guide | Conservative Rehab for Cervical Kyphosis",
    description:
      "A multilingual education site about cervical kyphosis, loss of cervical lordosis, conservative rehabilitation, nerve glides, back strengthening, and sport-specific neck care.",
    strings: {
      brand: "Cervical Curve Guide",
      "nav.learn": "Learn",
      "nav.symptoms": "Symptoms",
      "nav.rehab": "Rehab",
      "nav.videos": "Videos",
      "nav.sports": "Sports",
      "hero.eyebrow": "Evidence-aware neck curve education",
      "hero.title": "Cervical kyphosis,\nexplained without panic.",
      "hero.copy":
        "A multilingual guide for understanding reversed or flattened cervical curve findings, conservative rehab, nerve mobility, upper-back strength, and smarter sport participation.",
      "hero.primary": "Start with the rehab map",
      "notice.title": "Important:",
      "notice.copy":
        "This site is educational, not a diagnosis or prescription. New weakness, numbness, gait changes, fever, trauma, cancer history, or bowel/bladder symptoms need prompt medical care.",
      "learn.eyebrow": "The core idea",
      "learn.title": "The curve matters, but symptoms matter more.",
      "learn.copy":
        "\"Cervical kyphosis\" can describe a reversed curve, while \"loss of cervical lordosis\" often describes a flattened curve. An image finding alone does not prove the pain source; function, nerve signs, sleep, work exposure, and sport load all matter.",
      "symptoms.eyebrow": "Symptom map",
      "symptoms.title": "Hand numbness is a clue, not a diagnosis.",
      "symptoms.copy":
        "Cervical kyphosis or straightening becomes clinically important when it appears with nerve-root or spinal-cord symptoms: radiating arm pain, tingling, weakness, hand clumsiness, or walking changes.",
      "nerve.eyebrow": "Finger pattern guide",
      "nerve.title": "Which nerve pattern fits the fingers?",
      "nerve.copy":
        "Patterns overlap, and double-crush can happen. Use this as a discussion guide for clinical exam, imaging, and EMG/NCS when appropriate.",
      "nerve.col.source": "Source",
      "nerve.col.numbness": "Common numb area",
      "nerve.col.clues": "Extra clues",
      "rehab.eyebrow": "Conservative care",
      "rehab.title": "A practical rehab map for non-emergency cases.",
      "rehab.copy":
        "The safest framing is graded exposure: calm symptoms, restore tolerable motion, build shoulder-blade and thoracic strength, then return to sport with load rules.",
      "videos.eyebrow": "Exercise guides",
      "videos.title": "Read the drill first, then use YouTube as reference.",
      "videos.copy":
        "Each card explains who the drill may fit, how to try it, and when to stop. YouTube is used as a visual reference after the on-site guidance.",
      "sports.eyebrow": "Sport relationship",
      "sports.title": "Surfing, skiing, and climbing change neck loading.",
      "sports.copy":
        "Sports rarely fit a simple \"good\" or \"bad\" label. The key is the position, exposure time, impact risk, and how your symptoms respond over the next 24 hours.",
      "sources.eyebrow": "References",
      "sources.title": "Source base for this prototype.",
      "sources.copy":
        "The site should keep a visible review date, cite clinician-grade sources, and avoid claiming that exercise can guarantee curve restoration.",
      "footer.copy":
        "Built as a multilingual educational prototype for conservative cervical curve care.",
      "footer.disclaimer": "Medical disclaimer",
      "footer.privacy": "Privacy",
      "footer.terms": "Terms",
      "footer.top": "Back to top"
    },
    learnCards: [
      {
        tag: "Meaning",
        title: "A curve report is not the whole diagnosis.",
        body:
          "Loss or reversal of lordosis can appear on imaging, but studies question a one-to-one link with pain. The site should teach readers to pair imaging with symptoms and exam findings."
      },
      {
        tag: "Conservative path",
        title: "Most non-emergency neck and arm symptoms start with rehab.",
        body:
          "Education, activity changes, stretching, strengthening, and sometimes traction are common conservative options for cervical radicular symptoms."
      },
      {
        tag: "Safety",
        title: "Red flags must sit above every exercise page.",
        body:
          "Progressive weakness, coordination changes, fever, trauma, cancer history, or bowel/bladder changes are not self-treatment topics. They need clinical evaluation."
      }
    ],
    symptomCards: [
      {
        tag: "Radiculopathy",
        value: "Arm pain + finger symptoms",
        title: "Nerve-root irritation often travels.",
        body:
          "Classic cervical radiculopathy is neck or shoulder-blade pain that radiates into one arm, with tingling, numbness, reflex change, or weakness in a root pattern."
      },
      {
        tag: "Myelopathy",
        value: "Clumsy hands + gait change",
        title: "Spinal-cord symptoms are higher priority.",
        body:
          "Dropping objects, handwriting changes, balance trouble, leg stiffness, or bowel/bladder changes move the issue out of a simple exercise-page category."
      },
      {
        tag: "Double crush",
        value: "Neck + wrist/elbow can coexist",
        title: "The same hand can have two compression points.",
        body:
          "A cervical root can be irritated while the median or ulnar nerve is also compressed at the wrist, elbow, or thoracic outlet, making finger maps imperfect."
      }
    ],
    nerveRows: [
      {
        source: "C6 nerve root",
        numbness: "Thumb, index finger, radial forearm",
        clues: "Often linked with wrist-extension or biceps weakness and reduced brachioradialis reflex."
      },
      {
        source: "C7 nerve root",
        numbness: "Middle finger, sometimes index/middle region",
        clues: "Often linked with triceps weakness or reduced triceps reflex; C6/C7 sensory patterns can overlap."
      },
      {
        source: "C8 nerve root",
        numbness: "Ring and little fingers, medial forearm",
        clues: "Can involve finger-flexor weakness and grip changes."
      },
      {
        source: "Median nerve / carpal tunnel",
        numbness: "Thumb, index, middle, and radial half of ring finger",
        clues: "Often worse at night or with wrist positions; may include thenar weakness."
      },
      {
        source: "Ulnar nerve / cubital or Guyon's tunnel",
        numbness: "Little finger and ulnar half of ring finger",
        clues: "Often worse with prolonged elbow flexion or handlebar/grip pressure; may affect finger spreading."
      },
      {
        source: "Thoracic outlet / lower brachial plexus",
        numbness: "Diffuse arm/hand tingling, often ulnar-side dominant",
        clues: "May worsen with overhead arm positions, shoulder depression, heavy straps, or prolonged paddling posture."
      }
    ],
    surfResearch: {
      eyebrow: "Surfing deep dive",
      title: "Paddling is repeated extension plus shoulder load.",
      copy:
        "The literature is strongest for novice-surfer spinal cord ischemia from prolonged prone hyperextension. For chronic neck/arm symptoms, surf posture can plausibly aggravate cervical disc, facet, or thoracic-outlet problems, especially when symptoms appear during paddling and settle when exposure is reduced.",
      cards: [
        {
          tag: "Mechanism",
          title: "Prone paddling holds the head up.",
          body:
            "Surf paddling requires thoracic/lumbar extension and a raised head. If thoracic extension is limited, the neck may take more extension and compression."
        },
        {
          tag: "Evidence boundary",
          title: "Serious cases are usually spinal-cord, not finger-only numbness.",
          body:
            "Surfer's myelopathy reviews describe rare but severe neurological injury in novices from prolonged hyperextension, usually with back pain and leg symptoms."
        },
        {
          tag: "Clinical bridge",
          title: "Neck pain that will not settle needs differential thinking.",
          body:
            "Reviews note unresolved neck pain after conservative care may relate to cervical disc injury, degenerative arthritis, or thoracic outlet syndrome."
        }
      ]
    },
    rehabSteps: [
      {
        title: "Screen and establish a baseline",
        body:
          "Track pain location, arm symptoms, sleep disruption, aggravating positions, and whether cough, sneeze, or neck extension changes symptoms.",
        meta: "Before exercise"
      },
      {
        title: "Restore tolerable motion",
        body:
          "Use gentle neck rotation, thoracic extension, chin-nod control, and symptom-guided nerve glides. The goal is easier movement, not forcing a perfect curve.",
        meta: "Low irritability"
      },
      {
        title: "Build the upper back and neck support system",
        body:
          "Progress rows, scapular retraction, wall slides, prone T/Y work, and deep neck flexor endurance. Dose should leave symptoms stable the next day.",
        meta: "Strength phase"
      },
      {
        title: "Change exposure, not identity",
        body:
          "Desk height, screen distance, sleep setup, recovery breaks, and stress load often explain why symptoms keep returning after exercise alone.",
        meta: "Daily load"
      },
      {
        title: "Return to sport by response",
        body:
          "Use a 24-hour symptom rule: reduce duration, intensity, or neck-extension time if symptoms spike or spread after surfing, skiing, or climbing.",
        meta: "Sport bridge"
      }
    ],
    videos: {
      guideLabels: {
        bestFor: "Best for",
        steps: "How to try it",
        stop: "Stop if"
      },
      radiculopathy: {
        tag: "Education + exercise",
        title: "Cervical Radiculopathy | Pinched Nerve in Neck Rehab",
        body:
          "A broad evidence-informed overview covering myths, exercise options, and when surgery enters the conversation.",
        bestFor:
          "Readers with neck pain plus arm pain, tingling, or hand numbness who need a framework before copying exercises.",
        steps: [
          "Use the video to understand options, not to diagnose which nerve is involved.",
          "Compare any exercise with your own 24-hour response: calmer, unchanged, or worse.",
          "Prioritize positions that reduce arm symptoms before chasing harder strengthening."
        ],
        stop:
          "new weakness, spreading numbness, balance changes, hand clumsiness, or symptoms that stay worse the next day."
      },
      pinched: {
        tag: "Stretches + exercises",
        title: "Pinched Nerve Cervical Radiculopathy Stretches & Exercises",
        body:
          "Useful for showing common home movements, with the reminder that radicular symptoms should be monitored carefully.",
        bestFor:
          "Mild to moderate radiating symptoms that are not rapidly worsening and have no red flags.",
        steps: [
          "Start with the smallest comfortable range, especially for neck side-bending or rotation.",
          "Keep effort low for the first session; the goal is symptom information, not fatigue.",
          "Reduce range or skip a drill if arm symptoms move farther down the arm."
        ],
        stop:
          "pain shoots below the elbow, numbness increases, grip feels weaker, or dizziness appears."
      },
      glides: {
        tag: "Nerve mobility",
        title: "Neural Glides for Ulnar, Median & Radial Nerves",
        body:
          "Reference for gentle nerve sliding patterns. These should feel easy and should not be treated as aggressive stretching.",
        bestFor:
          "Tingling that changes with arm, wrist, or neck position, especially when symptoms are irritable but not progressive.",
        steps: [
          "Move in and out of tension smoothly; do not hold the end position.",
          "Use fewer repetitions than you think you need, then reassess the next morning.",
          "Match the glide to the symptom pattern instead of doing all nerve glides every day."
        ],
        stop:
          "tingling becomes sharper, lasts after the set, or spreads into a larger hand area."
      },
      daily: {
        tag: "Neck control",
        title: "Neck Pain Relief Daily Exercise",
        body:
          "A simple starting point for neck motion and control when symptoms are mild and non-emergency.",
        bestFor:
          "Stiff, achy necks without progressive arm symptoms, weakness, or spinal-cord warning signs.",
        steps: [
          "Use slow, comfortable motion to map what your neck tolerates today.",
          "Pair neck control with breathing and relaxed shoulders instead of forcing posture.",
          "Keep the session short enough that symptoms settle within the same day."
        ],
        stop:
          "movement creates arm pain, visual symptoms, dizziness, nausea, or a headache that escalates."
      },
      shoulder: {
        tag: "Shoulder blade support",
        title: "Shoulder Pain Relief Exercise Routine",
        body:
          "Shoulder blade and upper-back work matters because the neck often overworks when the thoracic spine and scapulae underperform.",
        bestFor:
          "People whose neck symptoms flare with desk work, paddling, climbing, carrying, or shoulder fatigue.",
        steps: [
          "Keep the neck quiet while the shoulder blade moves; avoid shrugging through every rep.",
          "Build easy volume before adding bands, weights, or long holds.",
          "Use it as support work, not as proof that the neck curve has been corrected."
        ],
        stop:
          "shoulder work reproduces arm numbness, pinching, or neck pain that lingers beyond the workout."
      },
      link: "Watch reference on YouTube"
    },
    sports: [
      {
        tag: "Surfing",
        title: "Paddling asks for long neck and thoracic extension.",
        body:
          "For some people, long prone paddling sessions irritate the neck because the head is held up while the shoulders work repeatedly.",
        bullets: ["Build thoracic extension endurance.", "Take shorter early sessions after a flare.", "Consider board and paddling-volume changes."]
      },
      {
        tag: "Skiing + snowboarding",
        title: "The main issue is impact risk, not posture aesthetics.",
        body:
          "High-speed falls, jumps, and collisions create a different risk profile than desk posture or gym exercise.",
        bullets: ["Prioritize helmet use and skill progression.", "Avoid fatigue-driven high-speed runs.", "Get evaluated after significant head or neck trauma."]
      },
      {
        tag: "Climbing",
        title: "Belaying can create prolonged upward gaze.",
        body:
          "Climbers often tolerate climbing better than belaying, because watching a partner overhead can load the cervical spine for long periods.",
        bullets: ["Use belay glasses when appropriate.", "Alternate belayers on long sessions.", "Train scapular strength and neck endurance."]
      }
    ],
    sportProtocols: [
      {
        title: "Surfing: build land tolerance before chasing longer sessions.",
        body:
          "Train the position that paddling asks for, then manage water exposure like a progressive workload. Keep symptoms local and settled within 24 hours.",
        cards: [
          {
            tag: "Thoracic extension",
            title: "Make the upper back hold the chest up.",
            body: "The goal is not to crank the neck backward. The chest lifts first; the gaze stays low.",
            steps: [
              "Foam-roller thoracic extension: roller across mid/upper back, support the head, exhale into extension, 6-8 reps x 2.",
              "Low cobra hold: lift sternum slightly, eyes to the floor ahead, neck long, 10-20 sec x 4-6.",
              "Prone paddle rehearsal: small chest support, easy strokes for 20-30 sec x 4; progress toward 60-90 sec only if symptoms stay quiet."
            ]
          },
          {
            tag: "Water dose",
            title: "Shorten after a flare, then rebuild by response.",
            body: "Use time, not ego, as the first progression metric.",
            steps: [
              "Start with 20-30 min easy sessions or 4-6 paddling blocks separated by sitting/resting.",
              "If arm pain, tingling, or neck pain rises more than about 2/10 or lasts the next day, cut the next session by 30-50%.",
              "Increase only one variable per week: duration, wave count, current size, board difficulty, or paddle intensity."
            ]
          },
          {
            tag: "Board + volume",
            title: "Change the equipment when the neck is doing too much.",
            body: "More float and easier entry can reduce frantic paddling and prolonged head-up time.",
            steps: [
              "After a flare, favor a higher-volume board, longboard, foam board, or calmer break before returning to a small shortboard.",
              "Track paddling minutes, duck dives, and total session time; many people overcount waves and undercount paddling exposure.",
              "Use the 24-hour rule: no spreading symptoms, no new numbness, and no next-day grip weakness before progressing."
            ]
          }
        ]
      },
      {
        title: "Skiing and snowboarding: train control before speed.",
        body:
          "For cervical symptoms, impact risk and fatigue-driven decisions matter more than the appearance of neck posture.",
        cards: [
          {
            tag: "Neck control",
            title: "Build low-load isometric tolerance.",
            body: "Train the neck to resist small perturbations without bracing aggressively.",
            steps: [
              "Four-way hand isometrics: front, back, left, right, 5-10 sec x 5 each, pain-free.",
              "Add trunk turns and visual scanning so the head is not doing all the rotation.",
              "Stop if symptoms shoot into the arm, dizziness appears, or grip changes."
            ]
          },
          {
            tag: "Fatigue rule",
            title: "Avoid fast runs when form is gone.",
            body: "Tired legs and poor edge control increase fall risk.",
            steps: [
              "Use easier terrain for the first two runs and after lunch breaks.",
              "Skip jumps, icy high-speed runs, and crowded terrain during symptom flares.",
              "End the day when neck guarding, delayed reactions, or arm symptoms appear."
            ]
          },
          {
            tag: "Return criteria",
            title: "Do not return on unresolved neurological symptoms.",
            body: "A conservative return requires motion, strength, and nerve signs to be stable.",
            steps: [
              "Look for pain-free active neck motion, normal arm strength, and no new numbness.",
              "Any significant head/neck fall needs medical evaluation before continuing.",
              "Use helmet, appropriate conditions, and a skill progression instead of testing the neck on maximal terrain."
            ]
          }
        ]
      },
      {
        title: "Climbing: protect the belayer's neck as much as the climber's fingers.",
        body:
          "Many climbers tolerate climbing but flare while belaying because the neck is held in extension for long periods.",
        cards: [
          {
            tag: "Belay setup",
            title: "Reduce sustained upward gaze.",
            body: "The best neck exercise is sometimes changing the viewing angle.",
            steps: [
              "Use belay glasses when safe and familiar; keep brief direct visual checks.",
              "Stand farther back when appropriate and move the feet instead of craning the neck.",
              "Switch belayers every 15-20 min on long projecting sessions."
            ]
          },
          {
            tag: "Scapular strength",
            title: "Train the shoulder blades to support the neck.",
            body: "A stronger upper back can reduce neck guarding during pulls and belay posture.",
            steps: [
              "Band rows or cable rows: 2-3 sets of 10-15, ribs down, neck relaxed.",
              "Face pulls or external rotation: 2 sets of 12-15, slow control.",
              "Wall slides or prone W/T: 2 sets of 8-12 without shoulder shrugging."
            ]
          },
          {
            tag: "Session dose",
            title: "Separate climbing load from belay load.",
            body: "Route difficulty is not the only stressor.",
            steps: [
              "During a flare, choose shorter routes, more frequent partner swaps, or bouldering with careful fall choices.",
              "Avoid long projecting days where you spend more time looking up than climbing.",
              "Progress when symptoms stay local, arm strength is unchanged, and sleep is not worse that night."
            ]
          }
        ]
      }
    ],
    sourceNote: "Used for medical framing, symptom education, sport loading, and video curation."
  },
  zh: {
    lang: "zh-Hans",
    locale: "zh-CN",
    title: "颈椎曲度指南 | 颈椎反弓保守康复网站",
    description:
      "一个介绍颈椎反弓、颈椎曲度变直、保守康复、神经滑动、背后肌群训练和运动关系的多语言健康教育网站。",
    strings: {
      brand: "颈椎曲度指南",
      "nav.learn": "认识",
      "nav.symptoms": "症状",
      "nav.rehab": "康复",
      "nav.videos": "视频",
      "nav.sports": "运动",
      "hero.eyebrow": "有依据的颈椎曲度教育",
      "hero.title": "颈椎反弓，\n不必先恐慌。",
      "hero.copy":
        "一个多语言健康教育网站，帮助读者理解颈椎反弓或曲度变直、保守康复、神经滑动、背后肌群训练，以及更聪明地回到运动。",
      "hero.primary": "查看康复路径",
      "notice.title": "重要提醒：",
      "notice.copy":
        "本站只做健康教育，不做诊断和处方。新出现的无力、麻木、走路不稳、发热、外伤、肿瘤病史，或大小便异常，应尽快就医。",
      "learn.eyebrow": "核心理解",
      "learn.title": "曲度重要，但症状更重要。",
      "learn.copy":
        "“颈椎反弓”通常指颈椎曲线反向，“颈椎生理曲度变直”通常指原有前凸减小。影像报告本身不能单独证明疼痛来源，功能、神经体征、睡眠、工作负荷和运动暴露都要一起看。",
      "symptoms.eyebrow": "症状地图",
      "symptoms.title": "手麻是线索，不是诊断。",
      "symptoms.copy":
        "颈椎反弓或曲度变直真正需要认真对待，往往是它同时出现神经根或脊髓相关症状：手臂放射痛、麻木刺痛、无力、手变笨、走路不稳等。",
      "nerve.eyebrow": "手指分布指南",
      "nerve.title": "哪种神经模式更像你的手麻？",
      "nerve.copy":
        "不同模式会重叠，也可能出现“双重卡压”。这张表适合作为和医生、康复师讨论体格检查、影像和肌电/神经传导检查的线索。",
      "nerve.col.source": "来源",
      "nerve.col.numbness": "常见麻木区域",
      "nerve.col.clues": "额外线索",
      "rehab.eyebrow": "保守治疗",
      "rehab.title": "非急症情况下的实用康复地图。",
      "rehab.copy":
        "更稳妥的框架是渐进暴露：先降低症状敏感度，再恢复可耐受活动度，建立肩胛和胸椎力量，最后用负荷规则回到运动。",
      "videos.eyebrow": "动作指南",
      "videos.title": "先看站内训练说明，再把 YouTube 当作动作参考。",
      "videos.copy":
        "每张卡片先说明适合谁、怎么尝试、何时停止。YouTube 用来辅助看动作，不让网站变成单纯跳转页。",
      "sports.eyebrow": "运动关系",
      "sports.title": "冲浪、滑雪和攀岩会改变颈部负荷。",
      "sports.copy":
        "运动很少能简单说成“好”或“坏”。关键是颈部姿势、持续时间、冲击风险，以及接下来 24 小时内症状如何反应。",
      "sources.eyebrow": "参考来源",
      "sources.title": "这个原型的资料基础。",
      "sources.copy":
        "网站应保留明显审校日期，引用临床级资料，并避免承诺“运动一定能恢复曲度”。",
      "footer.copy": "一个面向颈椎曲度保守康复的多语言健康教育原型。",
      "footer.disclaimer": "医疗免责声明",
      "footer.privacy": "隐私政策",
      "footer.terms": "使用条款",
      "footer.top": "回到顶部"
    },
    learnCards: [
      {
        tag: "含义",
        title: "影像报告不是完整诊断。",
        body:
          "颈椎曲度变直或反弓可能出现在影像上，但研究并不支持把它和疼痛简单一一对应。网站要教读者把影像、症状和体格检查放在一起理解。"
      },
      {
        tag: "保守路径",
        title: "多数非急症颈痛和手臂症状先从康复开始。",
        body:
          "健康教育、活动调整、拉伸、力量训练，以及部分情况下的牵引，都是颈椎神经根相关症状常见的保守处理方向。"
      },
      {
        tag: "安全",
        title: "每个练习页都要先放危险信号。",
        body:
          "进行性无力、协调变差、发热、外伤、肿瘤病史、大小便异常，不是内容营销主题，而是需要临床评估的情况。"
      }
    ],
    symptomCards: [
      {
        tag: "神经根症状",
        value: "手臂痛 + 手指麻",
        title: "颈椎神经根受刺激时，症状常会往下跑。",
        body:
          "典型表现是颈部或肩胛周围痛，沿一侧手臂放射，伴随刺痛、麻木、反射变化或特定肌肉无力。"
      },
      {
        tag: "脊髓症状",
        value: "手变笨 + 走路变差",
        title: "脊髓受压信号优先级更高。",
        body:
          "经常掉东西、写字变差、扣扣子困难、平衡变差、腿发紧，或大小便变化，不适合只在网页上跟练。"
      },
      {
        tag: "双重卡压",
        value: "颈部 + 腕/肘可同时存在",
        title: "同一只手可能有两个卡压点。",
        body:
          "颈椎神经根受刺激的同时，正中神经或尺神经也可能在腕部、肘部或胸廓出口受压，所以手指分布不是百分百准确。"
      }
    ],
    nerveRows: [
      {
        source: "C6 神经根",
        numbness: "拇指、食指、桡侧前臂",
        clues: "可伴腕背伸或肱二头肌无力，肱桡肌反射减弱。"
      },
      {
        source: "C7 神经根",
        numbness: "中指，部分人牵涉食指/中指区域",
        clues: "可伴肱三头肌无力或肱三头肌反射减弱；C6 和 C7 感觉区有重叠。"
      },
      {
        source: "C8 神经根",
        numbness: "无名指、小指、尺侧前臂",
        clues: "可伴手指屈曲力量下降、握力变化。"
      },
      {
        source: "正中神经 / 腕管",
        numbness: "拇指、食指、中指、无名指桡侧半",
        clues: "常在夜间或特定腕部姿势加重；严重时可有大鱼际无力。"
      },
      {
        source: "尺神经 / 肘管或 Guyon 管",
        numbness: "小指、无名指尺侧半",
        clues: "常因长时间屈肘、车把/握持压力加重；可能影响手指分开和夹纸力量。"
      },
      {
        source: "胸廓出口 / 下臂丛",
        numbness: "较弥散的手臂或手麻，常偏尺侧",
        clues: "可被上举手臂、肩下沉、背重包、长时间划水姿势诱发。"
      }
    ],
    surfResearch: {
      eyebrow: "冲浪深潜",
      title: "划水是重复伸展 + 肩部负荷。",
      copy:
        "目前较强的研究证据集中在新手冲浪者长时间俯卧过伸导致的脊髓缺血风险。对于慢性颈痛、手臂痛或手麻，划水姿势可以合理地加重颈椎椎间盘、关节突或胸廓出口问题，尤其是症状在划水中出现、减少暴露后缓解时。",
      cards: [
        {
          tag: "机制",
          title: "趴板划水需要一直抬头。",
          body:
            "划水需要胸椎/腰椎伸展和头部抬起。如果胸椎伸展不够，颈椎往往会承担更多后仰和压缩。"
        },
        {
          tag: "证据边界",
          title: "严重研究多是脊髓问题，不是单纯手指麻。",
          body:
            "Surfer's myelopathy 综述描述的是少见但严重的新手冲浪神经损伤，通常先有背痛，再出现下肢或大小便相关症状。"
        },
        {
          tag: "临床桥梁",
          title: "久治不缓解的颈痛要做鉴别。",
          body:
            "综述提到，保守处理后仍不缓解的冲浪相关颈痛，可能与颈椎椎间盘损伤、退变性关节炎或胸廓出口综合征有关。"
        }
      ]
    },
    rehabSteps: [
      {
        title: "先筛查并建立基线",
        body:
          "记录疼痛位置、手臂症状、睡眠影响、诱发姿势，以及咳嗽、打喷嚏或后仰是否会改变症状。",
        meta: "练习前"
      },
      {
        title: "恢复可耐受的活动度",
        body:
          "使用温和的颈部旋转、胸椎伸展、下巴轻收控制和症状引导下的神经滑动。目标是让动作更容易，而不是强行追求完美曲度。",
        meta: "低敏感期"
      },
      {
        title: "建立上背和颈部支撑系统",
        body:
          "逐步加入划船、肩胛后缩、墙天使、俯卧 T/Y 和深颈屈肌耐力训练。剂量标准是第二天症状稳定。",
        meta: "力量阶段"
      },
      {
        title: "改变暴露，而不是否定生活方式",
        body:
          "桌椅高度、屏幕距离、睡眠设置、恢复间隔和压力负荷，经常解释为什么只做练习后症状还会反复。",
        meta: "日常负荷"
      },
      {
        title: "按反应回归运动",
        body:
          "使用 24 小时症状规则：冲浪、滑雪或攀岩后如果症状明显上升或扩散，就先减少时长、强度或颈部后仰时间。",
        meta: "运动过渡"
      }
    ],
    videos: {
      guideLabels: {
        bestFor: "适合谁",
        steps: "怎么尝试",
        stop: "停止信号"
      },
      radiculopathy: {
        tag: "教育 + 练习",
        title: "颈椎神经根症状：夹住的颈部神经康复",
        body: "较系统地讲解误区、练习选择，以及什么时候需要讨论手术等更高阶处理。",
        bestFor: "有颈痛并伴随手臂痛、刺麻或手指麻的人，先建立判断框架，再决定是否跟练。",
        steps: [
          "先用视频理解可选路径，不要只靠视频判断是哪条神经受压。",
          "每个动作都用 24 小时反应来判断：变轻、没变，还是加重。",
          "优先选择能让手臂症状减轻或不扩散的姿势，再考虑更强的训练。"
        ],
        stop: "出现新的无力、麻木扩散、走路不稳、手变笨，或第二天仍明显加重。"
      },
      pinched: {
        tag: "拉伸 + 练习",
        title: "颈椎神经根症状的伸展和练习",
        body: "适合展示常见居家动作，但有手臂放射症状时要谨慎监测反应。",
        bestFor: "轻到中度的放射痛或麻木，且没有快速恶化和危险信号的人。",
        steps: [
          "从最小、最舒服的活动范围开始，尤其是侧屈和旋转。",
          "第一组只做低强度，用来收集症状反应，而不是追求酸累。",
          "如果症状往手臂远端跑，就缩小幅度或跳过这个动作。"
        ],
        stop: "疼痛射到肘部以下、麻木增加、握力变弱，或出现头晕。"
      },
      glides: {
        tag: "神经滑动",
        title: "尺神经、正中神经和桡神经滑动",
        body: "神经滑动应轻柔、顺畅，不应当做强拉伸来做。",
        bestFor: "手指刺麻会随手臂、手腕或颈部姿势变化，但症状没有进行性加重的人。",
        steps: [
          "像让神经轻轻滑过一样来回动，不要在末端拉住。",
          "次数宁可少一点，第二天再看麻木是否更安静。",
          "按症状分布选择一种神经滑动，不必每天把所有神经都做一遍。"
        ],
        stop: "刺麻变尖锐、做完仍持续，或扩散到更大的手部区域。"
      },
      daily: {
        tag: "颈部控制",
        title: "每日颈痛缓解练习",
        body: "症状较轻且没有危险信号时，可作为颈部活动和控制的起点。",
        bestFor: "颈部僵硬酸痛，但没有进行性手臂症状、无力或脊髓危险信号的人。",
        steps: [
          "用慢而舒服的动作，观察今天颈部能接受什么。",
          "配合呼吸和肩膀放松，不要硬把姿势顶到标准位置。",
          "把训练控制在当天能恢复的量，不追求一次做很多。"
        ],
        stop: "动作引出手臂痛、视觉异常、头晕、恶心，或头痛明显升级。"
      },
      shoulder: {
        tag: "肩胛支撑",
        title: "肩痛缓解与上背练习",
        body: "肩胛和上背能力很关键，因为胸椎和肩胛表现不足时，颈部常常代偿过度。",
        bestFor: "久坐、划水、攀岩、背包或肩膀疲劳后容易颈部发作的人。",
        steps: [
          "让肩胛在动，颈部尽量安静，避免每一下都耸肩代偿。",
          "先建立轻松的次数和耐力，再加弹力带、重量或长时间保持。",
          "把它当作支撑训练，不要把它理解成已经把曲度练回来了。"
        ],
        stop: "肩部练习诱发手麻、卡压感，或颈痛在训练后持续不退。"
      },
      link: "在 YouTube 观看参考"
    },
    sports: [
      {
        tag: "冲浪",
        title: "划水会要求长时间颈部和胸椎伸展。",
        body: "部分人长时间趴板划水会刺激颈部，因为头要抬着，同时肩部反复发力。",
        bullets: ["训练胸椎伸展耐力。", "症状波动后先缩短下水时间。", "考虑板型和划水总量调整。"]
      },
      {
        tag: "滑雪 + 单板",
        title: "主要问题是冲击风险，而不是姿态好不好看。",
        body: "高速摔倒、跳台失败和碰撞，与办公姿势或健身训练是完全不同的风险类型。",
        bullets: ["重视头盔和技术进阶。", "疲劳时避免高速线路。", "明显头颈部外伤后应评估。"]
      },
      {
        tag: "攀岩",
        title: "保护时常常需要长时间抬头看。",
        body: "很多攀岩者攀爬本身还可以，但保护别人时持续仰头会让颈椎负荷明显增加。",
        bullets: ["合适时使用保护眼镜。", "长线路轮换保护者。", "训练肩胛力量和颈部耐力。"]
      }
    ],
    sportProtocols: [
      {
        title: "冲浪：先在陆地建立耐受，再增加下水暴露。",
        body:
          "重点不是把脖子越练越能后仰，而是让胸椎、肩胛和颈部一起分担划水姿势。每次进阶都用 24 小时症状反应来判断。",
        cards: [
          {
            tag: "胸椎伸展耐力",
            title: "让上背托住胸口，而不是折脖子。",
            body: "训练时胸骨先轻轻抬起，目光看斜前下方，后颈保持长。任何手麻扩散都说明剂量太大。",
            steps: [
              "泡沫轴胸椎伸展：滚轴横放在肩胛下缘到上背，不压腰；双手托头，呼气时胸口向后打开，6-8 次 x 2 组。",
              "俯卧小眼镜蛇等长：胸骨轻抬、肋骨不猛顶地、眼睛看前方地面，10-20 秒 x 4-6 组。",
              "趴板划水模拟：胸下垫薄枕或毛巾，低视线轻划 20-30 秒 x 4 组；第二天稳定后再加到 60-90 秒。"
            ]
          },
          {
            tag: "下水剂量",
            title: "症状波动后先缩短，而不是硬顶。",
            body: "下水时间、浪大小、流强度、划水强度只能一次改一个。",
            steps: [
              "复出第一周用 20-30 分钟轻松 session，或 4-6 段短划水，每段之间坐板休息。",
              "如果颈痛或手臂症状上升超过约 2/10、出现新麻木，或第二天仍明显不适，下次总量减少 30-50%。",
              "连续 2-3 次 session 后 24 小时内都稳定，再增加 10-15 分钟或少量浪数，不要同时换小板和加时长。"
            ]
          },
          {
            tag: "板型和划水总量",
            title: "当脖子过度工作时，先改装备和环境。",
            body: "更容易起速和进浪的板，往往能减少慌张划水、长时间抬头和反复 duck dive。",
            steps: [
              "症状波动期优先用更高浮力板、长板、软板或更平缓的浪点，暂缓小短板、强流和连续 duck dive。",
              "记录的不是只看浪数：同时记划水分钟、duck dive 次数、总下水时长和第二天手麻/握力变化。",
              "进阶标准：症状不向手指扩散、没有新麻木、握力不下降、睡眠不变差，再考虑更难板型或更长 session。"
            ]
          }
        ]
      },
      {
        title: "滑雪和单板：先训练控制，再追求速度。",
        body:
          "对颈椎问题来说，高速、疲劳和摔倒机制比静态姿势更关键。训练目标是让头颈在转向、看路、轻微扰动中保持稳定。",
        cards: [
          {
            tag: "颈部控制",
            title: "从低负荷等长开始。",
            body: "等长训练不追求大力顶，而是学会轻轻出力、保持呼吸和肩放松。",
            steps: [
              "四方向手掌抗阻：前、后、左、右各 5-10 秒 x 5 次，力度约三成，不诱发手麻。",
              "站姿转体看点：胸口带着头一起转向目标，不只用脖子扫视，左右各 8-10 次。",
              "出现放射痛、头晕、手麻加重或握力变化时停止，当天不再做冲击类训练。"
            ]
          },
          {
            tag: "疲劳规则",
            title: "技术变形时，不做高速线路。",
            body: "腿疲劳、反应慢和转弯质量下降，会显著增加摔倒和甩头风险。",
            steps: [
              "热身后先滑 2 条简单线路，午饭后或休息后也用简单线路重新找感觉。",
              "症状波动期避开跳台、冰面高速、拥挤雪道和连续蘑菇包。",
              "如果开始耸肩护颈、转头迟钝、手臂症状出现，今天的强度就到这里。"
            ]
          },
          {
            tag: "回归条件",
            title: "神经症状没稳定前，不用雪场测试颈椎。",
            body: "回归运动应满足活动度、力量和神经症状都稳定，而不是只看疼痛忍耐。",
            steps: [
              "下场前应能完成无痛或低痛颈部主动活动，双臂力量无明显差异，没有新增手麻。",
              "任何明显头颈部摔伤、撞击后手麻、无力、头晕或走路异常，都应停止并评估。",
              "使用头盔，选择可控雪况和坡度；把难度进阶当训练计划，不当胆量测试。"
            ]
          }
        ]
      },
      {
        title: "攀岩：保护者的颈椎也需要训练和减负。",
        body:
          "很多人不是爬的时候痛，而是保护时长时间仰头、肩胛上提、胸椎僵硬后开始颈痛或手麻。",
        cards: [
          {
            tag: "保护姿势",
            title: "减少持续仰头，不减少安全观察。",
            body: "保护眼镜和站位调整是减负工具，不是偷懒；关键是熟悉使用并保留必要的直接目视。",
            steps: [
              "合适时使用保护眼镜，并定期直接看攀爬者和绳路，避免完全依赖眼镜。",
              "在安全前提下后退半步到一步，用脚步和躯干调整视线，不只靠颈椎后仰。",
              "长线路或 project 日每 15-20 分钟轮换保护者，尤其是同伴反复挂点、休息时。"
            ]
          },
          {
            tag: "肩胛力量",
            title: "让肩胛稳定，颈部才不用一直代偿。",
            body: "训练时肩不要耸到耳朵，肋骨不要外翻，动作慢一些更有效。",
            steps: [
              "弹力带划船或坐姿划船：2-3 组 x 10-15 次，末端停 1 秒，脖子保持放松。",
              "面拉或外旋：2 组 x 12-15 次，重点是肩胛后倾和外旋，不是重量。",
              "墙滑或俯卧 W/T：2 组 x 8-12 次；如果上斜方肌抢活，先降难度。"
            ]
          },
          {
            tag: "训练总量",
            title: "把攀爬量和保护量分开记录。",
            body: "线路难度不是唯一负荷。保护时间、仰头时间、坠落次数和休息质量都算训练量。",
            steps: [
              "症状波动期选择短线路、更多换保、或低风险抱石；减少长时间 project belay。",
              "当天如果保护比攀爬更多，就不要再用大强度悬挂板或极限拉力补训练。",
              "进阶标准：症状不向手扩散、第二天睡眠不差、握力和手指精细控制不下降。"
            ]
          }
        ]
      }
    ],
    sourceNote: "用于医学框架、症状教育、运动负荷和视频选择。"
  },
  ja: {
    lang: "ja",
    locale: "ja-JP",
    title: "頸椎カーブガイド | 頸椎後弯の保存的リハビリ",
    description:
      "頸椎後弯、頸椎前弯減少、保存的リハビリ、神経グライド、背部筋力、スポーツ別の首の負荷を扱う多言語サイト。",
    strings: {
      brand: "頸椎カーブガイド",
      "nav.learn": "理解",
      "nav.symptoms": "症状",
      "nav.rehab": "リハビリ",
      "nav.videos": "動画",
      "nav.sports": "スポーツ",
      "hero.eyebrow": "根拠を意識した頸椎カーブ教育",
      "hero.title": "頸椎後弯を、\n恐怖ではなく\n根拠で理解する。",
      "hero.copy":
        "頸椎カーブの反転や平坦化、保存的リハビリ、神経の滑走、上背部の筋力、スポーツ復帰を多言語で整理するガイドです。",
      "hero.primary": "リハビリ地図を見る",
      "notice.title": "重要：",
      "notice.copy":
        "このサイトは教育目的であり、診断や処方ではありません。新しい筋力低下、しびれ、歩行障害、発熱、外傷、がんの既往、排尿排便の異常は早めの医療相談が必要です。",
      "learn.eyebrow": "基本理解",
      "learn.title": "カーブは重要。ただし症状はもっと重要。",
      "learn.copy":
        "「頸椎後弯」はカーブの反転、「頸椎前弯の減少」は平坦化を指すことがあります。画像所見だけで痛みの原因は決まりません。機能、神経所見、睡眠、仕事、スポーツ負荷を合わせて見ます。",
      "symptoms.eyebrow": "症状マップ",
      "symptoms.title": "手のしびれは手がかりであり、診断ではありません。",
      "symptoms.copy":
        "頸椎後弯や前弯減少が臨床的に重要になるのは、神経根または脊髄症状を伴う場合です。腕へ走る痛み、しびれ、筋力低下、手の巧緻性低下、歩行変化などです。",
      "nerve.eyebrow": "指のパターン",
      "nerve.title": "どの神経パターンに近いか？",
      "nerve.copy":
        "症状分布は重なり、ダブルクラッシュも起こります。診察、画像、必要に応じた神経伝導検査を相談するための目安です。",
      "nerve.col.source": "由来",
      "nerve.col.numbness": "しびれやすい部位",
      "nerve.col.clues": "追加の手がかり",
      "rehab.eyebrow": "保存的ケア",
      "rehab.title": "非緊急例のための実用的リハビリ地図。",
      "rehab.copy":
        "安全な考え方は段階的な負荷です。症状を落ち着かせ、許容できる可動性を戻し、肩甲帯と胸椎の力を作り、ルールを持ってスポーツへ戻します。",
      "videos.eyebrow": "運動ガイド",
      "videos.title": "まずサイト内の説明を読み、YouTube は動きの参考にする。",
      "videos.copy":
        "各カードは、適する人、試し方、中止サインを先に説明します。YouTube は動きを確認するための参考です。",
      "sports.eyebrow": "スポーツとの関係",
      "sports.title": "サーフィン、スキー、クライミングは首の負荷を変える。",
      "sports.copy":
        "スポーツは単純に良い悪いで判断しにくいものです。大切なのは姿勢、時間、衝撃リスク、そして次の 24 時間の症状反応です。",
      "sources.eyebrow": "参考文献",
      "sources.title": "このプロトタイプの情報基盤。",
      "sources.copy":
        "サイトにはレビュー日を明記し、臨床レベルの情報源を引用し、運動で必ずカーブが戻るという表現は避けます。",
      "footer.copy": "頸椎カーブの保存的ケアを扱う多言語教育プロトタイプです。",
      "footer.disclaimer": "医療免責事項",
      "footer.privacy": "プライバシー",
      "footer.terms": "利用規約",
      "footer.top": "上へ戻る"
    },
    learnCards: [
      {
        tag: "意味",
        title: "画像所見だけでは診断になりません。",
        body:
          "前弯の減少や反転は画像で見られますが、痛みと一対一で結びつくとは限りません。症状、検査所見、機能を合わせて理解する必要があります。"
      },
      {
        tag: "保存的対応",
        title: "多くの非緊急の首や腕の症状はリハビリから始まります。",
        body:
          "教育、活動調整、ストレッチ、筋力トレーニング、ときに牽引は、頸椎神経根症状で使われる保存的な選択肢です。"
      },
      {
        tag: "安全",
        title: "すべての運動ページで危険サインを先に示します。",
        body:
          "進行する筋力低下、協調性の低下、発熱、外傷、がんの既往、排尿排便の変化は、コンテンツではなく医療評価の対象です。"
      }
    ],
    symptomCards: [
      {
        tag: "神経根症",
        value: "腕の痛み + 指のしびれ",
        title: "神経根の刺激は腕へ広がりやすい。",
        body:
          "典型例では首や肩甲骨周囲の痛みが片腕へ走り、しびれ、感覚低下、反射変化、特定筋の筋力低下を伴います。"
      },
      {
        tag: "脊髄症",
        value: "手の不器用さ + 歩行変化",
        title: "脊髄症状は優先度が高いサインです。",
        body:
          "物を落とす、字が書きにくい、ボタンが留めにくい、バランス低下、脚のこわばり、排尿排便変化は単なる運動ページで扱う状態ではありません。"
      },
      {
        tag: "ダブルクラッシュ",
        value: "首 + 手首/肘が同時に起こる",
        title: "同じ手に複数の圧迫部位があることがあります。",
        body:
          "頸椎神経根の刺激に加え、正中神経や尺骨神経が手首、肘、胸郭出口で圧迫されることがあり、指の地図は完全ではありません。"
      }
    ],
    nerveRows: [
      {
        source: "C6 神経根",
        numbness: "親指、人差し指、橈側前腕",
        clues: "手首伸展や上腕二頭筋の筋力低下、腕橈骨筋反射低下が手がかりになります。"
      },
      {
        source: "C7 神経根",
        numbness: "中指、ときに人差し指/中指周辺",
        clues: "上腕三頭筋の筋力低下や反射低下を伴うことがあります。C6/C7 の感覚領域は重なります。"
      },
      {
        source: "C8 神経根",
        numbness: "薬指、小指、尺側前腕",
        clues: "指屈筋の弱さや握力低下を伴うことがあります。"
      },
      {
        source: "正中神経 / 手根管",
        numbness: "親指、人差し指、中指、薬指の橈側半分",
        clues: "夜間や手首姿勢で悪化しやすく、母指球筋の弱さを伴うことがあります。"
      },
      {
        source: "尺骨神経 / 肘部管または Guyon 管",
        numbness: "小指、薬指の尺側半分",
        clues: "長時間の肘屈曲、グリップ圧、ハンドル圧で悪化し、指を広げる力に影響することがあります。"
      },
      {
        source: "胸郭出口 / 下部腕神経叢",
        numbness: "広い腕や手のしびれ、尺側優位が多い",
        clues: "腕を上げる姿勢、肩の下制、重いストラップ、長いパドリング姿勢で悪化することがあります。"
      }
    ],
    surfResearch: {
      eyebrow: "サーフィン深掘り",
      title: "パドリングは反復伸展と肩の負荷です。",
      copy:
        "研究として最も強いのは、初心者サーファーの長時間腹臥位過伸展による脊髄虚血リスクです。慢性の首痛、腕痛、手のしびれでは、パドリング姿勢が頸椎椎間板、椎間関節、胸郭出口の問題を悪化させる可能性があります。",
      cards: [
        {
          tag: "メカニズム",
          title: "腹ばいパドリングでは頭を上げ続けます。",
          body:
            "胸椎や腰椎の伸展と頭部挙上が必要です。胸椎伸展が不足すると、頸椎がより多くの伸展と圧縮を受けやすくなります。"
        },
        {
          tag: "証拠の範囲",
          title: "重症例の研究は主に脊髄障害です。",
          body:
            "Surfer's myelopathy のレビューは、初心者に起こるまれだが重い神経障害を扱い、背部痛や下肢症状が中心です。"
        },
        {
          tag: "臨床的な橋渡し",
          title: "改善しない首痛は鑑別が必要です。",
          body:
            "レビューでは、保存的ケアで改善しないサーフィン関連の首痛に、頸椎椎間板損傷、変性関節症、胸郭出口症候群が関係し得るとされています。"
        }
      ]
    },
    rehabSteps: [
      {
        title: "スクリーニングと基準作り",
        body:
          "痛みの場所、腕の症状、睡眠への影響、悪化する姿勢、咳やくしゃみ、首の伸展で症状が変わるかを記録します。",
        meta: "運動前"
      },
      {
        title: "許容できる可動性を戻す",
        body:
          "軽い頸部回旋、胸椎伸展、あごを軽く引く制御、症状に合わせた神経グライドを使います。目的は動きやすさであり、理想のカーブを無理に作ることではありません。",
        meta: "低刺激期"
      },
      {
        title: "上背部と首の支えを作る",
        body:
          "ローイング、肩甲骨の後退、ウォールスライド、うつ伏せ T/Y、深頸屈筋の持久力を段階的に進めます。翌日の症状が安定する量にします。",
        meta: "筋力期"
      },
      {
        title: "負荷環境を変える",
        body:
          "机の高さ、画面距離、睡眠環境、休憩、ストレス負荷が、運動だけでは再発する理由になることがあります。",
        meta: "日常負荷"
      },
      {
        title: "反応を見てスポーツへ戻る",
        body:
          "24 時間ルールを使います。サーフィン、スキー、クライミング後に症状が増える、広がる場合は時間、強度、首の伸展時間を減らします。",
        meta: "復帰段階"
      }
    ],
    videos: {
      guideLabels: {
        bestFor: "適する人",
        steps: "試し方",
        stop: "中止サイン"
      },
      radiculopathy: {
        tag: "教育 + 運動",
        title: "頸椎神経根症：首の「挟まれた神経」リハビリ",
        body: "誤解、運動選択、手術を検討する場面まで広く扱う参考動画です。",
        bestFor: "首痛に腕痛、しびれ、手指の感覚変化があり、運動を真似る前に全体像を知りたい人。",
        steps: [
          "動画は診断ではなく、選択肢を理解するために使います。",
          "各運動は 24 時間後の反応で判断します。軽くなる、変わらない、悪くなるを記録します。",
          "腕症状が減る姿勢を優先し、強い筋トレはその後に進めます。"
        ],
        stop: "新しい筋力低下、しびれの拡大、歩行不安定、手の不器用さ、翌日の悪化がある場合。"
      },
      pinched: {
        tag: "ストレッチ + 運動",
        title: "頸椎神経根症のストレッチと運動",
        body: "一般的なホームエクササイズの参考。腕への放散症状がある場合は反応を慎重に見ます。",
        bestFor: "軽度から中等度の放散痛やしびれで、急速な悪化や危険サインがない人。",
        steps: [
          "首の側屈や回旋は、最小で快適な範囲から始めます。",
          "最初のセッションは低強度にし、疲労より症状反応を見ます。",
          "症状が腕の遠くへ広がる場合は、範囲を減らすかその運動を避けます。"
        ],
        stop: "痛みが肘より下へ走る、しびれが増える、握力が落ちる、めまいが出る場合。"
      },
      glides: {
        tag: "神経滑走",
        title: "尺骨神経、正中神経、橈骨神経のグライド",
        body: "神経グライドは軽く滑らせる運動で、強いストレッチとして行うものではありません。",
        bestFor: "腕、手首、首の姿勢でしびれが変化し、進行性ではない人。",
        steps: [
          "末端で止めず、張力に出入りするように滑らかに動かします。",
          "回数は少なめにし、翌朝のしびれを確認します。",
          "すべてを行うのではなく、症状パターンに合うグライドを選びます。"
        ],
        stop: "しびれが鋭くなる、セット後も残る、手の広い範囲へ広がる場合。"
      },
      daily: {
        tag: "頸部制御",
        title: "毎日の首痛軽減エクササイズ",
        body: "症状が軽く危険サインがない場合の、首の動きと制御の入り口になります。",
        bestFor: "首のこわばりや鈍痛があり、進行する腕症状、筋力低下、脊髄サインがない人。",
        steps: [
          "ゆっくり快適に動かし、今日の許容範囲を確認します。",
          "姿勢を押し込まず、呼吸と肩の脱力を合わせます。",
          "その日のうちに落ち着く量にとどめます。"
        ],
        stop: "腕痛、視覚症状、めまい、吐き気、強まる頭痛が出る場合。"
      },
      shoulder: {
        tag: "肩甲帯サポート",
        title: "肩痛軽減と上背部エクササイズ",
        body: "胸椎や肩甲骨が働きにくいと首が代償しやすいため、上背部の力は重要です。",
        bestFor: "デスクワーク、パドリング、クライミング、荷物、肩疲労で首症状が出やすい人。",
        steps: [
          "肩甲骨を動かし、首は静かに保ちます。毎回肩をすくめないようにします。",
          "バンドや重り、長い保持を足す前に、楽な回数と持久力を作ります。",
          "首のカーブを直した証明ではなく、支える運動として使います。"
        ],
        stop: "肩の運動で手のしびれ、挟まる感じ、残る首痛が出る場合。"
      },
      link: "YouTube で参考を見る"
    },
    sports: [
      {
        tag: "サーフィン",
        title: "パドリングは長い首と胸椎伸展を要求します。",
        body: "腹ばいで頭を持ち上げ、肩を反復して使うため、長時間のパドリングで首が刺激される人がいます。",
        bullets: ["胸椎伸展の持久力を作る。", "増悪後はセッションを短くする。", "ボードやパドリング量を調整する。"]
      },
      {
        tag: "スキー + スノーボード",
        title: "主な問題は姿勢の見た目ではなく衝撃リスクです。",
        body: "高速転倒、ジャンプ失敗、衝突は、デスク姿勢やジム運動とは別のリスクを持ちます。",
        bullets: ["ヘルメットと段階的な技術向上を重視する。", "疲労時の高速滑走を避ける。", "大きな頭頸部外傷後は評価を受ける。"]
      },
      {
        tag: "クライミング",
        title: "ビレイは長い上向き視線を作ります。",
        body: "登る動作より、相手を見上げ続けるビレイで首の負荷が増える人がいます。",
        bullets: ["適切ならビレイグラスを使う。", "長時間のセッションでは交代する。", "肩甲骨の筋力と首の持久力を鍛える。"]
      }
    ],
    sportProtocols: [
      {
        title: "サーフィン：陸上で耐性を作ってから水上時間を増やす。",
        body:
          "首を強く反らす練習ではなく、胸椎、肩甲骨、頸部でパドリング姿勢を分担する練習です。進行は 24 時間後の症状反応で判断します。",
        cards: [
          {
            tag: "胸椎伸展持久力",
            title: "首ではなく上背部で胸を支える。",
            body: "胸骨を軽く上げ、視線は斜め前下方、後頸部は長く保ちます。手のしびれが広がるなら負荷が高すぎます。",
            steps: [
              "フォームローラー胸椎伸展：肩甲骨下部から上背部にローラーを置き、頭を支え、呼気で胸を開く。6-8 回 x 2。",
              "低いコブラ保持：胸骨を少し上げ、目線は床の前方、首を折らない。10-20 秒 x 4-6。",
              "腹ばいパドリング練習：胸の下に薄いタオルを置き、低い視線で 20-30 秒 x 4。翌日安定すれば 60-90 秒へ。"
            ]
          },
          {
            tag: "水上負荷",
            title: "増悪後は短くして反応を見ながら戻す。",
            body: "時間、波の大きさ、流れ、パドリング強度は一度に一つだけ増やします。",
            steps: [
              "復帰初週は 20-30 分の軽いセッション、または休憩を挟む 4-6 本の短いパドリングブロック。",
              "首痛や腕症状が約 2/10 以上増える、新しいしびれが出る、翌日も残る場合は次回を 30-50% 減らします。",
              "2-3 セッション連続で 24 時間安定したら、10-15 分または少しの波数だけ増やします。"
            ]
          },
          {
            tag: "ボードと総量",
            title: "首が働きすぎる時は道具と環境を変える。",
            body: "浮力があり入りやすいボードは、焦ったパドリングや長い頭部挙上を減らせます。",
            steps: [
              "増悪期は高浮力ボード、ロングボード、ソフトボード、穏やかなポイントを優先します。",
              "波数だけでなく、パドリング時間、ダックダイブ回数、総セッション時間、翌日のしびれや握力を記録します。",
              "新しいしびれがない、握力低下がない、睡眠悪化がない時だけ難しいボードや長いセッションへ進みます。"
            ]
          }
        ]
      },
      {
        title: "スキーとスノーボード：速度より制御を先に作る。",
        body:
          "頸椎症状では、静的な姿勢よりも高速、疲労、転倒メカニズムが重要です。",
        cards: [
          {
            tag: "頸部制御",
            title: "低負荷の等尺性から始める。",
            body: "強く押すのではなく、軽く力を出し、呼吸と肩の脱力を保ちます。",
            steps: [
              "手で前後左右に軽く抵抗：各 5-10 秒 x 5、痛みやしびれなし。",
              "立位で体幹ごと視線を移す練習：首だけでなく胸も一緒に回す。左右 8-10 回。",
              "放散痛、めまい、しびれ増悪、握力変化があれば中止します。"
            ]
          },
          {
            tag: "疲労ルール",
            title: "フォームが崩れたら高速滑走をしない。",
            body: "脚の疲労と反応遅れは転倒と頭頸部への衝撃リスクを上げます。",
            steps: [
              "最初の 2 本、昼食後、長い休憩後は簡単な斜面で再開します。",
              "症状がある日はジャンプ、氷面高速、混雑した斜面、連続コブを避けます。",
              "肩をすくめて首を守る、振り向きが遅い、腕症状が出る日は強度を上げません。"
            ]
          },
          {
            tag: "復帰基準",
            title: "神経症状が不安定なまま雪上で試さない。",
            body: "復帰は活動範囲、筋力、神経症状が安定していることが前提です。",
            steps: [
              "首の自動運動が低痛または無痛、両腕筋力に明らかな差がない、新しいしびれがないこと。",
              "頭頸部の強い転倒、衝撃後のしびれ、筋力低下、めまい、歩行異常は評価が必要です。",
              "ヘルメット、制御できる雪質と斜度、段階的な技術練習を優先します。"
            ]
          }
        ]
      },
      {
        title: "クライミング：ビレイヤーの首も守る。",
        body:
          "登る時より、長時間見上げるビレイで首痛や手のしびれが出る人もいます。",
        cards: [
          {
            tag: "ビレイ姿勢",
            title: "安全確認を保ちながら上向き姿勢を減らす。",
            body: "ビレイグラスと立ち位置調整は首の負荷を減らす道具です。",
            steps: [
              "安全に慣れている場合はビレイグラスを使い、必要な直接目視も残します。",
              "可能なら半歩から一歩下がり、足と体幹で視線を調整します。",
              "長いルートや project 日は 15-20 分ごとにビレイヤーを交代します。"
            ]
          },
          {
            tag: "肩甲骨筋力",
            title: "肩甲骨が安定すると首の代償が減る。",
            body: "肩をすくめず、肋骨を反らせず、ゆっくり制御します。",
            steps: [
              "バンドローまたはシーテッドロー：2-3 セット x 10-15、終末で 1 秒停止。",
              "フェイスプルまたは外旋：2 セット x 12-15、重さより制御。",
              "ウォールスライドまたはうつ伏せ W/T：2 セット x 8-12。僧帽筋上部が強く働くなら難度を下げます。"
            ]
          },
          {
            tag: "総量管理",
            title: "登る量とビレイ量を分けて記録する。",
            body: "グレードだけでなく、見上げ時間、落下回数、休憩の質も負荷です。",
            steps: [
              "増悪期は短いルート、交代多め、または低リスクのボルダーを選びます。",
              "ビレイが多い日は、追加で高強度ハングボードや限界プルを入れないようにします。",
              "手への症状拡大がない、睡眠が悪化しない、握力と細かい手作業が落ちない時に進めます。"
            ]
          }
        ]
      }
    ],
    sourceNote: "医学的枠組み、症状教育、スポーツ負荷、動画選定の参考として使用。"
  },
  es: {
    lang: "es",
    locale: "es-ES",
    title: "Guía de Curva Cervical | Rehabilitación conservadora para cifosis cervical",
    description:
      "Sitio multilingüe sobre cifosis cervical, pérdida de lordosis, rehabilitación conservadora, deslizamientos neurales, fuerza de espalda y deporte.",
    strings: {
      brand: "Guía de Curva Cervical",
      "nav.learn": "Aprender",
      "nav.symptoms": "Síntomas",
      "nav.rehab": "Rehab",
      "nav.videos": "Videos",
      "nav.sports": "Deporte",
      "hero.eyebrow": "Educación sobre la curva cervical basada en evidencia",
      "hero.title": "Cifosis cervical,\nexplicada sin alarmismo.",
      "hero.copy":
        "Una guía multilingüe para entender la curva cervical invertida o rectificada, la rehabilitación conservadora, la movilidad neural, la fuerza de la espalda alta y la vuelta al deporte.",
      "hero.primary": "Ver el mapa de rehabilitación",
      "notice.title": "Importante:",
      "notice.copy":
        "Este sitio es educativo, no diagnóstico ni prescripción. Debilidad nueva, entumecimiento, cambios al caminar, fiebre, traumatismo, antecedente de cáncer o cambios urinarios/intestinales requieren atención médica.",
      "learn.eyebrow": "Idea central",
      "learn.title": "La curva importa, pero los síntomas importan más.",
      "learn.copy":
        "La \"cifosis cervical\" puede describir una curva invertida; la \"pérdida de lordosis cervical\" suele describir una curva rectificada. Una imagen por sí sola no demuestra la causa del dolor; también importan función, signos neurológicos, sueño, trabajo y carga deportiva.",
      "symptoms.eyebrow": "Mapa de síntomas",
      "symptoms.title": "El adormecimiento de la mano es una pista, no un diagnóstico.",
      "symptoms.copy":
        "La cifosis o rectificación cervical se vuelve clínicamente importante cuando aparece con síntomas de raíz nerviosa o médula: dolor que baja al brazo, hormigueo, debilidad, torpeza de la mano o cambios al caminar.",
      "nerve.eyebrow": "Guía por dedos",
      "nerve.title": "¿Qué patrón nervioso encaja con los dedos?",
      "nerve.copy":
        "Los patrones se superponen y puede existir doble atrapamiento. Úsalo como guía para hablar de exploración clínica, imagen y EMG/conducción nerviosa cuando corresponda.",
      "nerve.col.source": "Origen",
      "nerve.col.numbness": "Zona frecuente de adormecimiento",
      "nerve.col.clues": "Pistas adicionales",
      "rehab.eyebrow": "Cuidado conservador",
      "rehab.title": "Un mapa práctico para casos no urgentes.",
      "rehab.copy":
        "El marco más seguro es la exposición gradual: calmar síntomas, recuperar movimiento tolerable, fortalecer escápulas y columna torácica, y volver al deporte con reglas de carga.",
      "videos.eyebrow": "Guías de ejercicio",
      "videos.title": "Lee la guía primero; usa YouTube como referencia visual.",
      "videos.copy":
        "Cada tarjeta explica para quién puede servir, cómo probarlo y cuándo detenerse. YouTube queda como apoyo visual, no como simple salto fuera del sitio.",
      "sports.eyebrow": "Relación con deporte",
      "sports.title": "Surf, esquí y escalada cambian la carga del cuello.",
      "sports.copy":
        "El deporte rara vez es simplemente bueno o malo. La clave es la posición, el tiempo de exposición, el riesgo de impacto y la respuesta de tus síntomas durante las próximas 24 horas.",
      "sources.eyebrow": "Referencias",
      "sources.title": "Base de fuentes del prototipo.",
      "sources.copy":
        "El sitio debe mostrar fecha de revisión, citar fuentes clínicas y evitar prometer que el ejercicio restaura la curva con garantía.",
      "footer.copy":
        "Prototipo educativo multilingüe para cuidado conservador de la curva cervical.",
      "footer.disclaimer": "Aviso médico",
      "footer.privacy": "Privacidad",
      "footer.terms": "Términos",
      "footer.top": "Volver arriba"
    },
    learnCards: [
      {
        tag: "Significado",
        title: "Un informe de imagen no es todo el diagnóstico.",
        body:
          "La rectificación o inversión de la lordosis puede aparecer en estudios de imagen, pero no siempre se relaciona uno a uno con el dolor. El sitio debe enseñar a unir imagen, síntomas y examen."
      },
      {
        tag: "Ruta conservadora",
        title: "Muchos síntomas no urgentes de cuello y brazo empiezan con rehabilitación.",
        body:
          "Educación, cambios de actividad, estiramientos, fortalecimiento y a veces tracción son opciones conservadoras comunes para síntomas radiculares cervicales."
      },
      {
        tag: "Seguridad",
        title: "Las señales de alarma deben ir antes de cada ejercicio.",
        body:
          "Debilidad progresiva, peor coordinación, fiebre, traumatismo, antecedente de cáncer o cambios urinarios/intestinales requieren evaluación clínica."
      }
    ],
    symptomCards: [
      {
        tag: "Radiculopatía",
        value: "Dolor de brazo + dedos",
        title: "La irritación de una raíz nerviosa suele viajar.",
        body:
          "El patrón típico es dolor de cuello o escápula que baja por un brazo, con hormigueo, adormecimiento, cambio de reflejos o debilidad en un patrón de raíz."
      },
      {
        tag: "Mielopatía",
        value: "Torpeza manual + marcha",
        title: "Los síntomas de médula tienen mayor prioridad.",
        body:
          "Soltar objetos, cambios en escritura, torpeza para abotonar, problemas de equilibrio, rigidez de piernas o cambios urinarios/intestinales no son solo una página de ejercicios."
      },
      {
        tag: "Doble compresión",
        value: "Cuello + muñeca/codo",
        title: "La misma mano puede tener dos puntos de compresión.",
        body:
          "Una raíz cervical puede estar irritada mientras el nervio mediano o cubital también se comprime en muñeca, codo o salida torácica."
      }
    ],
    nerveRows: [
      {
        source: "Raíz C6",
        numbness: "Pulgar, índice, antebrazo radial",
        clues: "Puede asociarse con debilidad de extensión de muñeca o bíceps y reflejo braquiorradial reducido."
      },
      {
        source: "Raíz C7",
        numbness: "Dedo medio, a veces zona índice/medio",
        clues: "Puede asociarse con debilidad del tríceps o reflejo tricipital reducido; C6/C7 pueden superponerse."
      },
      {
        source: "Raíz C8",
        numbness: "Anular y meñique, antebrazo medial",
        clues: "Puede incluir debilidad de flexores de dedos y cambios de agarre."
      },
      {
        source: "Nervio mediano / túnel carpiano",
        numbness: "Pulgar, índice, medio y mitad radial del anular",
        clues: "A menudo peor de noche o con posturas de muñeca; puede haber debilidad tenar."
      },
      {
        source: "Nervio cubital / túnel cubital o Guyon",
        numbness: "Meñique y mitad cubital del anular",
        clues: "A menudo peor con flexión prolongada del codo o presión de agarre; puede afectar separar los dedos."
      },
      {
        source: "Salida torácica / plexo braquial inferior",
        numbness: "Hormigueo más difuso de brazo/mano, a menudo lado cubital",
        clues: "Puede empeorar con brazos elevados, hombros deprimidos, correas pesadas o postura prolongada de remada."
      }
    ],
    surfResearch: {
      eyebrow: "Surf en profundidad",
      title: "Remar combina extensión repetida y carga de hombro.",
      copy:
        "La evidencia más fuerte se centra en isquemia medular rara en surfistas novatos por hiperextensión prolongada en prono. Para dolor crónico de cuello/brazo u hormigueo, la postura de remada puede agravar problemas de disco cervical, facetas o salida torácica.",
      cards: [
        {
          tag: "Mecanismo",
          title: "Remar boca abajo mantiene la cabeza elevada.",
          body:
            "La remada exige extensión torácica/lumbar y cabeza levantada. Si falta extensión torácica, el cuello puede asumir más extensión y compresión."
        },
        {
          tag: "Límite de evidencia",
          title: "Los casos graves suelen ser medulares.",
          body:
            "Las revisiones de surfer's myelopathy describen lesiones raras pero severas en novatos, usualmente con dolor lumbar y síntomas de piernas."
        },
        {
          tag: "Puente clínico",
          title: "El cuello que no mejora requiere diferencial.",
          body:
            "Las revisiones señalan que dolor cervical persistente tras cuidado conservador puede relacionarse con lesión discal cervical, artritis degenerativa o salida torácica."
        }
      ]
    },
    rehabSteps: [
      {
        title: "Cribado y línea base",
        body:
          "Registra ubicación del dolor, síntomas del brazo, sueño, posiciones que irritan y si tos, estornudo o extensión del cuello cambian los síntomas.",
        meta: "Antes de entrenar"
      },
      {
        title: "Recuperar movimiento tolerable",
        body:
          "Usa rotación suave del cuello, extensión torácica, control de mentón y deslizamientos neurales guiados por síntomas. El objetivo es moverse mejor, no forzar una curva perfecta.",
        meta: "Baja irritabilidad"
      },
      {
        title: "Construir soporte de espalda alta y cuello",
        body:
          "Progresa remos, retracción escapular, wall slides, trabajo prono T/Y y resistencia de flexores cervicales profundos. La dosis debe dejar síntomas estables al día siguiente.",
        meta: "Fase de fuerza"
      },
      {
        title: "Cambiar exposición diaria",
        body:
          "Altura de escritorio, distancia de pantalla, sueño, pausas y estrés explican muchas recaídas cuando solo se hacen ejercicios.",
        meta: "Carga diaria"
      },
      {
        title: "Volver al deporte por respuesta",
        body:
          "Usa la regla de 24 horas: reduce duración, intensidad o tiempo de extensión cervical si los síntomas suben o se extienden tras surf, esquí o escalada.",
        meta: "Puente deportivo"
      }
    ],
    videos: {
      guideLabels: {
        bestFor: "Mejor para",
        steps: "Cómo probarlo",
        stop: "Detente si"
      },
      radiculopathy: {
        tag: "Educación + ejercicio",
        title: "Radiculopatía cervical: rehabilitación del nervio pinzado en el cuello",
        body:
          "Panorama amplio sobre mitos, opciones de ejercicio y cuándo entra la conversación quirúrgica.",
        bestFor:
          "Personas con dolor de cuello más dolor de brazo, hormigueo o dedos dormidos que necesitan contexto antes de copiar ejercicios.",
        steps: [
          "Usa el video para entender opciones, no para diagnosticar qué nervio está implicado.",
          "Juzga cada ejercicio por la respuesta de 24 horas: calma, igual o peor.",
          "Prioriza posturas que reduzcan síntomas del brazo antes de añadir fuerza difícil."
        ],
        stop:
          "hay nueva debilidad, entumecimiento que se extiende, problemas de equilibrio, torpeza de la mano o empeora al día siguiente."
      },
      pinched: {
        tag: "Estiramientos + ejercicios",
        title: "Estiramientos y ejercicios para radiculopatía cervical",
        body:
          "Útil para movimientos caseros comunes, con vigilancia especial si hay síntomas que bajan al brazo.",
        bestFor:
          "Síntomas irradiados leves o moderados que no empeoran rápido y no tienen señales de alarma.",
        steps: [
          "Empieza con el rango más pequeño y cómodo, sobre todo en inclinación o rotación del cuello.",
          "Mantén baja la intensidad al principio; busca información de síntomas, no fatiga.",
          "Reduce el rango o salta el ejercicio si los síntomas bajan más por el brazo."
        ],
        stop:
          "el dolor baja del codo, aumenta el entumecimiento, el agarre se debilita o aparece mareo."
      },
      glides: {
        tag: "Movilidad neural",
        title: "Deslizamientos del nervio cubital, mediano y radial",
        body:
          "Referencia para patrones suaves de deslizamiento neural. No deben sentirse como estiramientos agresivos.",
        bestFor:
          "Hormigueo que cambia con la posición del brazo, muñeca o cuello, sin progresión rápida.",
        steps: [
          "Entra y sale de la tensión suavemente; no sostengas el final del movimiento.",
          "Haz menos repeticiones de las que crees necesitar y revisa la respuesta al día siguiente.",
          "Elige el deslizamiento según el patrón, no todos los nervios todos los días."
        ],
        stop:
          "el hormigueo se vuelve agudo, dura después de la serie o se extiende a más zonas de la mano."
      },
      daily: {
        tag: "Control cervical",
        title: "Ejercicio diario para aliviar dolor de cuello",
        body: "Punto de partida simple para movilidad y control si los síntomas son leves y no hay señales de alarma.",
        bestFor:
          "Cuello rígido o doloroso sin síntomas progresivos del brazo, debilidad ni señales medulares.",
        steps: [
          "Muévete lento y cómodo para mapear lo que el cuello tolera hoy.",
          "Combina control cervical con respiración y hombros relajados, sin forzar postura.",
          "Mantén la sesión lo bastante corta para que los síntomas se calmen el mismo día."
        ],
        stop:
          "aparece dolor de brazo, síntomas visuales, mareo, náusea o dolor de cabeza que aumenta."
      },
      shoulder: {
        tag: "Soporte escapular",
        title: "Rutina para dolor de hombro y espalda alta",
        body:
          "El trabajo escapular y torácico importa porque el cuello suele compensar cuando la espalda alta no ayuda.",
        bestFor:
          "Personas cuyos síntomas del cuello suben con escritorio, remada, escalada, cargar peso o fatiga de hombro.",
        steps: [
          "Deja que se mueva la escápula mientras el cuello permanece tranquilo; evita encoger hombros en cada repetición.",
          "Construye volumen fácil antes de añadir bandas, peso o pausas largas.",
          "Úsalo como apoyo, no como prueba de que la curva cervical ya se corrigió."
        ],
        stop:
          "el trabajo de hombro reproduce entumecimiento del brazo, pinzamiento o dolor de cuello que persiste."
      },
      link: "Ver referencia en YouTube"
    },
    sports: [
      {
        tag: "Surf",
        title: "Remar exige extensión prolongada de cuello y tórax.",
        body: "En algunas personas, remar boca abajo irrita el cuello porque la cabeza se mantiene elevada mientras los hombros trabajan repetidamente.",
        bullets: ["Construir resistencia de extensión torácica.", "Acortar sesiones tras un brote.", "Ajustar tabla y volumen de remada."]
      },
      {
        tag: "Esquí + snowboard",
        title: "El riesgo principal es el impacto, no la estética postural.",
        body: "Caídas rápidas, saltos y colisiones tienen un perfil de riesgo distinto al trabajo de escritorio o al gimnasio.",
        bullets: ["Priorizar casco y progresión técnica.", "Evitar bajadas rápidas con fatiga.", "Evaluarse tras traumatismo importante de cabeza o cuello."]
      },
      {
        tag: "Escalada",
        title: "Asegurar puede crear mirada hacia arriba prolongada.",
        body: "Algunos escaladores toleran mejor escalar que asegurar, porque mirar al compañero arriba carga el cuello durante mucho tiempo.",
        bullets: ["Usar gafas de aseguramiento si procede.", "Alternar aseguradores en sesiones largas.", "Entrenar fuerza escapular y resistencia cervical."]
      }
    ],
    sportProtocols: [
      {
        title: "Surf: crea tolerancia en tierra antes de aumentar el agua.",
        body:
          "No se trata de forzar más extensión cervical. La columna torácica, las escápulas y el cuello deben compartir la postura de remada. Progresa según la respuesta de 24 horas.",
        cards: [
          {
            tag: "Extensión torácica",
            title: "Que la espalda alta sostenga el pecho, no el cuello.",
            body: "Levanta primero el esternón, mirada baja hacia delante y cuello largo. Si el hormigueo baja a la mano, la dosis es excesiva.",
            steps: [
              "Extensión torácica con foam roller: rodillo bajo escápulas/espalda alta, sostén la cabeza, exhala y abre el pecho. 6-8 rep x 2.",
              "Cobra baja isométrica: eleva poco el esternón, mirada al suelo delante, sin quebrar el cuello. 10-20 s x 4-6.",
              "Simulación de remada en prono: toalla bajo el pecho, mirada baja, brazadas suaves 20-30 s x 4; progresa a 60-90 s si el día siguiente está estable."
            ]
          },
          {
            tag: "Dosis en agua",
            title: "Tras un brote, acorta antes de empujar.",
            body: "Tiempo, tamaño de ola, corriente e intensidad de remada cambian de uno en uno.",
            steps: [
              "Primera semana: sesión fácil de 20-30 min o 4-6 bloques cortos de remada con descanso sentado.",
              "Si dolor de cuello/brazo sube más de 2/10, aparece nuevo hormigueo o sigue al día siguiente, reduce la próxima sesión 30-50%.",
              "Tras 2-3 sesiones estables durante 24 h, aumenta solo 10-15 min o unas pocas olas."
            ]
          },
          {
            tag: "Tabla + volumen",
            title: "Si el cuello trabaja demasiado, cambia equipo y entorno.",
            body: "Más flotación y entrada más fácil reducen remadas desesperadas, cabeza elevada y duck dives repetidos.",
            steps: [
              "En fase sensible, usa tabla de más volumen, longboard, foam board o pico más tranquilo; pospone shortboard pequeño y corrientes fuertes.",
              "Registra minutos de remada, duck dives, duración total y síntomas/agarre al día siguiente.",
              "Progresa si no hay síntomas que bajen a dedos, nuevo adormecimiento, pérdida de agarre ni peor sueño."
            ]
          }
        ]
      },
      {
        title: "Esquí y snowboard: control antes que velocidad.",
        body:
          "Para síntomas cervicales, velocidad, fatiga y mecanismo de caída pesan más que la estética de la postura.",
        cards: [
          {
            tag: "Control cervical",
            title: "Empieza con isométricos de baja carga.",
            body: "No empujes fuerte; busca tensión suave, respiración y hombros relajados.",
            steps: [
              "Resistencia manual en cuatro direcciones: frente, atrás, izquierda, derecha, 5-10 s x 5, sin hormigueo.",
              "Giros de tronco con mirada: pecho y cabeza giran juntos hacia el objetivo, 8-10 por lado.",
              "Detente con dolor irradiado, mareo, más hormigueo o cambios de agarre."
            ]
          },
          {
            tag: "Regla de fatiga",
            title: "No hagas velocidad cuando la técnica se desarma.",
            body: "Piernas fatigadas y reacción lenta aumentan riesgo de caída y latigazo.",
            steps: [
              "Primeras dos bajadas y después de comer: terreno fácil para recalibrar.",
              "Durante brotes evita saltos, hielo rápido, pistas llenas y baches continuos.",
              "Si proteges el cuello, reaccionas tarde o aparecen síntomas de brazo, no subas intensidad ese día."
            ]
          },
          {
            tag: "Criterios de vuelta",
            title: "No pruebes el cuello en la montaña con síntomas neurológicos activos.",
            body: "La vuelta conservadora requiere movilidad, fuerza y signos nerviosos estables.",
            steps: [
              "Antes de volver: movimiento activo cervical sin dolor o bajo dolor, fuerza de brazos simétrica y sin nuevo adormecimiento.",
              "Caída fuerte de cabeza/cuello, hormigueo, debilidad, mareo o cambios de marcha requieren evaluación.",
              "Usa casco, condiciones controlables y progresión técnica en vez de terreno máximo."
            ]
          }
        ]
      },
      {
        title: "Escalada: protege también el cuello del asegurador.",
        body:
          "Algunas personas no se irritan al escalar, sino al asegurar mirando arriba durante mucho tiempo.",
        cards: [
          {
            tag: "Postura de seguro",
            title: "Reduce mirada sostenida hacia arriba sin perder seguridad.",
            body: "Gafas de aseguramiento y posición son herramientas de descarga, no sustitutos de atención.",
            steps: [
              "Usa gafas si sabes manejarlas con seguridad y conserva chequeos visuales directos.",
              "Cuando sea seguro, retrocede medio paso o un paso y mueve pies/tronco en vez de solo extender el cuello.",
              "En sesiones largas o project, alterna asegurador cada 15-20 min."
            ]
          },
          {
            tag: "Fuerza escapular",
            title: "Escápulas estables reducen compensación cervical.",
            body: "Evita encoger hombros; controla costillas y tempo.",
            steps: [
              "Remo con banda o polea: 2-3 series x 10-15, pausa 1 s al final, cuello relajado.",
              "Face pull o rotación externa: 2 series x 12-15, prioriza control sobre carga.",
              "Wall slides o prono W/T: 2 series x 8-12; baja dificultad si domina trapecio superior."
            ]
          },
          {
            tag: "Volumen",
            title: "Registra carga de escalar y carga de asegurar por separado.",
            body: "El grado no es la única carga: tiempo mirando arriba, caídas y descanso también cuentan.",
            steps: [
              "Durante brotes elige vías cortas, más cambios de asegurador o búlder de bajo riesgo.",
              "Si aseguraste más de lo que escalaste, evita añadir hangboard pesado o tracciones máximas ese día.",
              "Progresa cuando no hay síntomas hacia la mano, el sueño no empeora y agarre/control fino no bajan."
            ]
          }
        ]
      }
    ],
    sourceNote:
      "Usado para marco médico, educación de síntomas, carga deportiva y curaduría de videos."
  }
};

const state = {
  lang: localStorage.getItem("ccg_lang") || "zh"
};

function getActiveContent() {
  return content[state.lang] || content.zh;
}

function renderI18n() {
  const active = getActiveContent();
  document.documentElement.lang = active.lang;
  document.title = active.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", active.description);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = active.strings[key];
    if (value) element.textContent = value;
  });

  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
  });
}

function createCard(item, className = "info-card") {
  const card = document.createElement("article");
  card.className = className;

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = item.tag;
  card.append(tag);

  const title = document.createElement("h3");
  title.textContent = item.title;
  card.append(title);

  const body = document.createElement("p");
  body.textContent = item.body;
  card.append(body);

  return card;
}

function renderLearnCards() {
  const active = getActiveContent();
  const grid = document.querySelector("#learn-cards");
  grid.replaceChildren(...active.learnCards.map((item) => createCard(item)));
}

function renderSymptomCards() {
  const active = getActiveContent();
  const grid = document.querySelector("#symptom-cards");
  const cards = active.symptomCards.map((item) => {
    const card = document.createElement("article");
    card.className = "symptom-card";

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item.tag;
    const value = document.createElement("strong");
    value.textContent = item.value;
    const title = document.createElement("h3");
    title.textContent = item.title;
    const body = document.createElement("p");
    body.textContent = item.body;
    card.append(tag, value, title, body);
    return card;
  });
  grid.replaceChildren(...cards);
}

function renderNerveTable() {
  const active = getActiveContent();
  const tbody = document.querySelector("#nerve-table");
  const rows = active.nerveRows.map((item) => {
    const row = document.createElement("tr");
    [item.source, item.numbness, item.clues].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });
    return row;
  });
  tbody.replaceChildren(...rows);
}

function renderRehabSteps() {
  const active = getActiveContent();
  const timeline = document.querySelector("#rehab-steps");
  const steps = active.rehabSteps.map((item) => {
    const step = document.createElement("article");
    step.className = "step";

    const copy = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = item.title;
    const body = document.createElement("p");
    body.textContent = item.body;
    copy.append(title, body);

    const meta = document.createElement("span");
    meta.className = "step-meta";
    meta.textContent = item.meta;
    step.append(copy, meta);
    return step;
  });
  timeline.replaceChildren(...steps);
}

function renderVideos() {
  const active = getActiveContent();
  const grid = document.querySelector("#video-grid");
  const cards = commonVideos.map((video) => {
    const copy = active.videos[video.key];
    const labels = active.videos.guideLabels;
    const card = document.createElement("article");
    card.className = "video-card";

    const frame = document.createElement("a");
    frame.className = "video-frame video-preview";
    frame.href = video.url;
    frame.target = "_blank";
    frame.rel = "noopener noreferrer";
    frame.setAttribute("aria-label", `${active.videos.link}: ${copy.title}`);

    const thumbnail = document.createElement("img");
    thumbnail.src = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
    thumbnail.alt = `${copy.title} - ${video.source}`;
    thumbnail.loading = "lazy";
    const play = document.createElement("span");
    play.className = "video-play";
    play.setAttribute("aria-hidden", "true");
    const platform = document.createElement("span");
    platform.className = "video-platform";
    platform.textContent = "YouTube";
    frame.append(thumbnail, play, platform);

    const body = document.createElement("div");
    body.className = "video-body";
    const tag = document.createElement("span");
    tag.className = "video-meta";
    tag.textContent = `${copy.tag} | ${video.source}`;
    const title = document.createElement("h3");
    title.textContent = copy.title;
    const description = document.createElement("p");
    description.className = "video-summary";
    description.textContent = copy.body;

    const guide = document.createElement("div");
    guide.className = "video-guide";

    const bestFor = document.createElement("div");
    bestFor.className = "video-guide-block";
    const bestForLabel = document.createElement("h4");
    bestForLabel.textContent = labels.bestFor;
    const bestForText = document.createElement("p");
    bestForText.textContent = copy.bestFor;
    bestFor.append(bestForLabel, bestForText);

    const steps = document.createElement("div");
    steps.className = "video-guide-block";
    const stepsLabel = document.createElement("h4");
    stepsLabel.textContent = labels.steps;
    const stepsList = document.createElement("ol");
    copy.steps.forEach((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      stepsList.append(item);
    });
    steps.append(stepsLabel, stepsList);

    const stop = document.createElement("div");
    stop.className = "video-guide-block warning";
    const stopLabel = document.createElement("h4");
    stopLabel.textContent = labels.stop;
    const stopText = document.createElement("p");
    stopText.textContent = copy.stop;
    stop.append(stopLabel, stopText);
    guide.append(bestFor, steps, stop);

    body.append(tag, title, description, guide);

    const actions = document.createElement("div");
    actions.className = "video-actions";
    const link = document.createElement("a");
    link.className = "video-link";
    link.href = video.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = active.videos.link;
    actions.append(link);

    card.append(body, frame, actions);
    return card;
  });
  grid.replaceChildren(...cards);
}

function renderSports() {
  const active = getActiveContent();
  const grid = document.querySelector("#sport-grid");
  const cards = active.sports.map((item) => {
    const card = createCard(item, "sport-card");
    const list = document.createElement("ul");
    item.bullets.forEach((bullet) => {
      const li = document.createElement("li");
      li.textContent = bullet;
      list.append(li);
    });
    card.append(list);
    return card;
  });
  grid.replaceChildren(...cards);
}

function renderSportProtocols() {
  const active = getActiveContent();
  const groups = active.sportProtocols || content.en.sportProtocols;
  const labels = protocolVideoLabels[state.lang] || protocolVideoLabels.en;
  const container = document.querySelector("#sport-protocols");
  const rendered = groups.map((group, groupIndex) => {
    const section = document.createElement("section");
    section.className = "protocol-group";

    const head = document.createElement("div");
    head.className = "protocol-head";
    const title = document.createElement("h3");
    title.textContent = group.title;
    const body = document.createElement("p");
    body.textContent = group.body;
    head.append(title, body);

    const grid = document.createElement("div");
    grid.className = "protocol-grid";
    const cards = group.cards.map((item, cardIndex) => {
      const card = document.createElement("article");
      card.className = "protocol-card";
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = item.tag;
      const title = document.createElement("h4");
      title.textContent = item.title;
      const body = document.createElement("p");
      body.textContent = item.body;
      const list = document.createElement("ul");
      item.steps.forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step;
        list.append(li);
      });

      const refs = protocolVideoRefs[groupIndex]?.[cardIndex] || [];
      if (refs.length) {
        const refBox = document.createElement("div");
        refBox.className = "video-ref-box";
        const heading = document.createElement("strong");
        heading.textContent = labels.heading;
        const refList = document.createElement("ul");
        refs.forEach((ref) => {
          const item = document.createElement("li");
          const link = document.createElement("a");
          link.href = ref.url;
          link.target = "_blank";
          link.rel = "noreferrer";
          link.textContent = `${labels.open}: ${ref.title}`;
          const source = document.createElement("span");
          source.textContent = ref.source;
          item.append(link, source);
          refList.append(item);
        });
        refBox.append(heading, refList);
        card.append(tag, title, body, list, refBox);
      } else {
        card.append(tag, title, body, list);
      }
      return card;
    });
    grid.append(...cards);

    section.append(head, grid);
    return section;
  });
  container.replaceChildren(...rendered);
}

function renderSurfResearch() {
  const active = getActiveContent();
  const band = document.querySelector("#surf-research");
  const data = active.surfResearch;

  const intro = document.createElement("div");
  intro.className = "research-intro";
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = data.eyebrow;
  const title = document.createElement("h3");
  title.textContent = data.title;
  const copy = document.createElement("p");
  copy.textContent = data.copy;
  intro.append(eyebrow, title, copy);

  const cards = data.cards.map((item) => {
    const card = document.createElement("article");
    card.className = "research-card";
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = item.tag;
    const title = document.createElement("h4");
    title.textContent = item.title;
    const body = document.createElement("p");
    body.textContent = item.body;
    card.append(tag, title, body);
    return card;
  });

  band.replaceChildren(intro, ...cards);
}

function renderSources() {
  const active = getActiveContent();
  const list = document.querySelector("#source-list");
  const items = sourceLinks.map((source) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = source.label;
    const note = document.createElement("span");
    note.textContent = active.sourceNote;
    item.append(link, note);
    return item;
  });
  list.replaceChildren(...items);
}

function renderAll() {
  renderI18n();
  renderLearnCards();
  renderSymptomCards();
  renderNerveTable();
  renderRehabSteps();
  renderVideos();
  renderSurfResearch();
  renderSports();
  renderSportProtocols();
  renderSources();
}

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.lang;
    localStorage.setItem("ccg_lang", state.lang);
    renderAll();
  });
});

renderAll();
