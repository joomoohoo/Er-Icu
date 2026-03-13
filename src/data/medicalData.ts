export const medicalData = {
  en: {
    drugs: [
      { name: "Adrenaline (Epinephrine)", dosage: "1mg IV/IO every 3-5 mins", indications: "Cardiac arrest, Anaphylaxis", antidote: "N/A" },
      { name: "Amiodarone", dosage: "300mg initial, 150mg second dose", indications: "V-Fib, Pulseless V-Tach", antidote: "N/A" },
      { name: "Atropine", dosage: "1mg IV every 3-5 mins (Max 3mg)", indications: "Symptomatic Bradycardia", antidote: "N/A" },
      { name: "Adenosine", dosage: "6mg rapid IV push, then 12mg", indications: "SVT", antidote: "N/A" },
      { name: "Dopamine", dosage: "2-20 mcg/kg/min", indications: "Shock, Symptomatic Bradycardia", antidote: "N/A" },
      { name: "Norepinephrine", dosage: "0.1-2 mcg/kg/min", indications: "Severe Hypotension, Septic Shock", antidote: "N/A" },
      { name: "Heparin", dosage: "80 units/kg bolus, 18 units/kg/hr", indications: "ACS, PE, DVT", antidote: "Protamine Sulfate" },
      { name: "Morphine", dosage: "2-4mg IV every 5-15 mins", indications: "Pain, ACS, Pulmonary Edema", antidote: "Naloxone" },
      { name: "Fentanyl", dosage: "25-100 mcg IV", indications: "Pain, Sedation", antidote: "Naloxone" },
      { name: "Midazolam", dosage: "1-5mg IV", indications: "Sedation, Seizures", antidote: "Flumazenil" },
      { name: "Propofol", dosage: "5-50 mcg/kg/min", indications: "Sedation", antidote: "N/A" },
      { name: "Insulin (Regular)", dosage: "0.1 units/kg/hr", indications: "DKA, Hyperglycemia", antidote: "Dextrose/Glucagon" },
      { name: "Magnesium Sulfate", dosage: "1-2g IV over 15-60 mins", indications: "Torsades de Pointes, Eclampsia", antidote: "Calcium Gluconate" },
      { name: "Calcium Gluconate", dosage: "1g IV over 5-10 mins", indications: "Hyperkalemia, Hypocalcemia", antidote: "N/A" },
      { name: "Sodium Bicarbonate", dosage: "1 mEq/kg IV", indications: "Metabolic Acidosis, TCA Overdose", antidote: "N/A" }
    ],
    scenarios: [
      { title: "Choking", steps: ["Encourage coughing", "5 Back blows", "5 Abdominal thrusts", "Start CPR if unconscious"] },
      { title: "Drowning", steps: ["Remove from water safely", "Check breathing/pulse", "Give 5 rescue breaths first", "Start CPR if no pulse"] },
      { title: "Diabetic Emergency", steps: ["Check blood glucose", "If conscious: Give 15g fast sugar", "If unconscious: Glucagon or D50", "Re-check glucose in 15 mins"] },
      { title: "Amputation", steps: ["Apply direct pressure", "Use tourniquet if needed", "Wrap part in sterile gauze", "Place part in bag on ice"] },
      { title: "Seizures", steps: ["Protect from injury", "Do not restrain", "Time the seizure", "Recovery position after"] },
      { title: "Hemorrhage", steps: ["Direct pressure", "Pressure bandage", "Tourniquet for limbs", "Treat for shock (fluids)"] },
      { title: "Burns", steps: ["Stop the burn", "Cool with running water", "Remove jewelry/clothing", "Cover with clean film/dressing"] }
    ],
    antidotes: [
      { poison: "Opioids", antidote: "Naloxone" },
      { poison: "Benzodiazepines", antidote: "Flumazenil" },
      { poison: "Acetaminophen", antidote: "N-Acetylcysteine" },
      { poison: "Digoxin", antidote: "Digibind" },
      { poison: "Beta Blockers", antidote: "Glucagon" },
      { poison: "Calcium Channel Blockers", antidote: "Calcium/Glucagon" },
      { poison: "Warfarin", antidote: "Vitamin K / FFP" },
      { poison: "Organophosphates", antidote: "Atropine / Pralidoxime" },
      { poison: "Iron", antidote: "Deferoxamine" },
      { poison: "Methanol/Ethylene Glycol", antidote: "Fomepizole / Ethanol" }
    ],
    labValues: {
      hematology: [
        { item: "Hemoglobin", male: "13.5-17.5 g/dL", female: "12.0-15.5 g/dL" },
        { item: "WBC", range: "4,500-11,000 /µL" },
        { item: "Platelets", range: "150,000-450,000 /µL" },
        { item: "Hematocrit", male: "41-50%", female: "36-44%" }
      ],
      chemistry: [
        { item: "Sodium", range: "135-145 mEq/L" },
        { item: "Potassium", range: "3.5-5.0 mEq/L" },
        { item: "Chloride", range: "98-107 mEq/L" },
        { item: "Bicarbonate", range: "22-28 mEq/L" },
        { item: "BUN", range: "7-20 mg/dL" },
        { item: "Creatinine", range: "0.6-1.2 mg/dL" },
        { item: "Glucose (Fasting)", range: "70-100 mg/dL" }
      ]
    },
    calculators: {
      gcs: {
        name: "GCS (Glasgow Coma Scale)",
        categories: [
          { name: "Eye Opening", options: [{ label: "Spontaneous", score: 4 }, { label: "To Speech", score: 3 }, { label: "To Pain", score: 2 }, { label: "None", score: 1 }] },
          { name: "Verbal Response", options: [{ label: "Oriented", score: 5 }, { label: "Confused", score: 4 }, { label: "Inappropriate Words", score: 3 }, { label: "Incomprehensible Sounds", score: 2 }, { label: "None", score: 1 }] },
          { name: "Motor Response", options: [{ label: "Obeys Commands", score: 6 }, { label: "Localizes Pain", score: 5 }, { label: "Withdraws from Pain", score: 4 }, { label: "Abnormal Flexion", score: 3 }, { label: "Abnormal Extension", score: 2 }, { label: "None", score: 1 }] }
        ]
      },
      rass: {
        name: "RASS (Richmond Agitation-Sedation Scale)",
        options: [
          { label: "+4 Combative", score: 4 }, { label: "+3 Very Agitated", score: 3 }, { label: "+2 Agitated", score: 2 }, { label: "+1 Restless", score: 1 },
          { label: "0 Alert and Calm", score: 0 },
          { label: "-1 Drowsy", score: -1 }, { label: "-2 Light Sedation", score: -2 }, { label: "-3 Moderate Sedation", score: -3 }, { label: "-4 Deep Sedation", score: -4 }, { label: "-5 Unarousable", score: -5 }
        ]
      },
      ccf: {
        name: "CCF Scale (Critical Care Functional)",
        categories: [
          { name: "Rolling", options: [{ label: "Independent", score: 3 }, { label: "Minimal Assist", score: 2 }, { label: "Moderate Assist", score: 1 }, { label: "Unable", score: 0 }] },
          { name: "Supine to Sit", options: [{ label: "Independent", score: 3 }, { label: "Minimal Assist", score: 2 }, { label: "Moderate Assist", score: 1 }, { label: "Unable", score: 0 }] },
          { name: "Sitting Balance", options: [{ label: "Independent", score: 3 }, { label: "Minimal Assist", score: 2 }, { label: "Moderate Assist", score: 1 }, { label: "Unable", score: 0 }] }
        ]
      },
      four: {
        name: "FOUR Score",
        categories: [
          { name: "Eye Response", options: [{ label: "Eyelids open, tracking/blinking to command", score: 4 }, { label: "Eyelids open but not tracking", score: 3 }, { label: "Eyelids closed but open to loud voice", score: 2 }, { label: "Eyelids closed but open to pain", score: 1 }, { label: "Eyelids remain closed with pain", score: 0 }] },
          { name: "Motor Response", options: [{ label: "Thumbs-up, fist, or peace sign", score: 4 }, { label: "Localizing to pain", score: 3 }, { label: "Flexion response to pain", score: 2 }, { label: "Extension response to pain", score: 1 }, { label: "No response to pain or generalized myoclonus status", score: 0 }] },
          { name: "Brainstem Reflexes", options: [{ label: "Pupil and corneal reflexes present", score: 4 }, { label: "One pupil wide and fixed", score: 3 }, { label: "Pupil or corneal reflexes absent", score: 2 }, { label: "Pupil and corneal reflexes absent", score: 1 }, { label: "Absent pupil, corneal, and cough reflex", score: 0 }] },
          { name: "Respiration", options: [{ label: "Not intubated, regular breathing pattern", score: 4 }, { label: "Not intubated, Cheyne-Stokes breathing pattern", score: 3 }, { label: "Not intubated, irregular breathing", score: 2 }, { label: "Breathes above ventilator rate", score: 1 }, { label: "Breathes at ventilator rate or apnea", score: 0 }] }
        ]
      },
      cpot: {
        name: "CPOT (Critical-Care Pain Observation Tool)",
        categories: [
          { name: "Facial Expression", options: [{ label: "Relaxed, neutral", score: 0 }, { label: "Tense (frowning, brow lowering)", score: 1 }, { label: "Grimacing (all above plus eyelid tightly closed)", score: 2 }] },
          { name: "Body Movements", options: [{ label: "Absence of movements", score: 0 }, { label: "Protection (slow, cautious movements)", score: 1 }, { label: "Restlessness (pulling tubes, thrashing)", score: 2 }] },
          { name: "Muscle Tension", options: [{ label: "Relaxed (no resistance to passive movements)", score: 0 }, { label: "Tense, rigid (resistance to passive movements)", score: 1 }, { label: "Very tense or rigid (strong resistance)", score: 2 }] },
          { name: "Compliance with Ventilator (or Vocalization)", options: [{ label: "Tolerating ventilator / Normal talk", score: 0 }, { label: "Coughing but tolerating / Sighing, moaning", score: 1 }, { label: "Fighting ventilator / Crying out, sobbing", score: 2 }] }
        ]
      },
      flacc: {
        name: "FLACC Pain Scale",
        categories: [
          { name: "Face", options: [{ label: "No particular expression or smile", score: 0 }, { label: "Occasional grimace or frown, withdrawn, disinterested", score: 1 }, { label: "Frequent to constant quivering chin, clenched jaw", score: 2 }] },
          { name: "Legs", options: [{ label: "Normal position or relaxed", score: 0 }, { label: "Uneasy, restless, tense", score: 1 }, { label: "Kicking, or legs drawn up", score: 2 }] },
          { name: "Activity", options: [{ label: "Lying quietly, normal position, moves easily", score: 0 }, { label: "Squirming, shifting back and forth, tense", score: 1 }, { label: "Arched, rigid or jerking", score: 2 }] },
          { name: "Cry", options: [{ label: "No cry (awake or asleep)", score: 0 }, { label: "Moans or whimpers; occasional complaint", score: 1 }, { label: "Crying steadily, screams or sobs, frequent complaint", score: 2 }] },
          { name: "Consolability", options: [{ label: "Content, relaxed", score: 0 }, { label: "Reassured by occasional touching, hugging or being talked to, distractible", score: 1 }, { label: "Difficult to console or comfort", score: 2 }] }
        ]
      },
      apache: {
        name: "APACHE II (Simplified)",
        categories: [
          { name: "Age", options: [{ label: "< 44", score: 0 }, { label: "45-54", score: 2 }, { label: "55-64", score: 3 }, { label: "65-74", score: 5 }, { label: "> 75", score: 6 }] },
          { name: "History of Severe Organ Failure", options: [{ label: "None", score: 0 }, { label: "Emergency Surgery / Non-operative", score: 5 }, { label: "Elective Surgery", score: 2 }] },
          { name: "Temperature (°C)", options: [{ label: "36-38.4", score: 0 }, { label: "38.5-38.9", score: 1 }, { label: "34-35.9", score: 1 }, { label: "32-33.9", score: 2 }, { label: "30-31.9", score: 3 }, { label: "> 39 or < 30", score: 4 }] },
          { name: "Mean Arterial Pressure (mmHg)", options: [{ label: "70-109", score: 0 }, { label: "110-129", score: 2 }, { label: "50-69", score: 2 }, { label: "130-159", score: 3 }, { label: "> 160 or < 49", score: 4 }] },
          { name: "Heart Rate", options: [{ label: "70-109", score: 0 }, { label: "110-139", score: 2 }, { label: "55-69", score: 2 }, { label: "140-179", score: 3 }, { label: "40-54", score: 3 }, { label: "> 180 or < 39", score: 4 }] }
        ]
      },
      start: {
        title: "Simple Triage and Rapid Treatment",
        back: "Back to previous step",
        startNew: "Start New Triage",
        categoryLabel: "Triage Category",
        categories: {
          MINOR: { label: "MINOR", desc: "Green Tag: Minor injuries, can wait for treatment." },
          DELAYED: { label: "DELAYED", desc: "Yellow Tag: Serious but non-life-threatening injuries." },
          IMMEDIATE: { label: "IMMEDIATE", desc: "Red Tag: Life-threatening injuries, requires immediate intervention." },
          DECEASED: { label: "DECEASED", desc: "Black Tag: Deceased or injuries incompatible with life." }
        },
        steps: {
          walking: { question: "Can the patient walk?", options: [{ label: "Yes", result: 'MINOR' }, { label: "No", nextStep: 'breathing' }] },
          breathing: { question: "Is the patient breathing?", options: [{ label: "Yes", nextStep: 'respiratory_rate' }, { label: "No", nextStep: 'open_airway' }] },
          open_airway: { question: "Open airway. Is the patient breathing now?", options: [{ label: "Yes", result: 'IMMEDIATE' }, { label: "No", result: 'DECEASED' }] },
          respiratory_rate: { question: "Respiratory Rate?", options: [{ label: "> 30 / min", result: 'IMMEDIATE' }, { label: "< 30 / min", nextStep: 'perfusion' }] },
          perfusion: { question: "Perfusion (Radial Pulse or Capillary Refill)?", options: [{ label: "Pulse Absent / Cap Refill > 2s", result: 'IMMEDIATE' }, { label: "Pulse Present / Cap Refill < 2s", nextStep: 'mental_status' }] },
          mental_status: { question: "Mental Status (Follows simple commands)?", options: [{ label: "No", result: 'IMMEDIATE' }, { label: "Yes", result: 'DELAYED' }] }
        }
      },
      rts: {
        title: "Revised Trauma Score",
        survivalProb: "Survival Probability",
        categories: [
          { name: "GCS Score", options: [{ label: "13-15", score: 4 }, { label: "9-12", score: 3 }, { label: "6-8", score: 2 }, { label: "4-5", score: 1 }, { label: "3", score: 0 }] },
          { name: "Systolic BP (mmHg)", options: [{ label: "> 89", score: 4 }, { label: "76-89", score: 3 }, { label: "50-75", score: 2 }, { label: "1-49", score: 1 }, { label: "0", score: 0 }] },
          { name: "Respiratory Rate", options: [{ label: "10-29", score: 4 }, { label: "> 29", score: 3 }, { label: "6-9", score: 2 }, { label: "1-5", score: 1 }, { label: "0", score: 0 }] }
        ]
      }
    }
  },
  ar: {
    drugs: [
      { name: "أدرينالين (إبينفرين)", dosage: "1 مجم وريد/نخاع كل 3-5 دقائق", indications: "توقف القلب، الحساسية المفرطة", antidote: "لا يوجد" },
      { name: "أميودارون", dosage: "300 مجم جرعة أولى، 150 مجم جرعة ثانية", indications: "رجفان بطيني، تسارع بطيني بدون نبض", antidote: "لا يوجد" },
      { name: "أتروبين", dosage: "1 مجم وريد كل 3-5 دقائق (بحد أقصى 3 مجم)", indications: "بطء القلب المصحوب بأعراض", antidote: "لا يوجد" },
      { name: "أدينوزين", dosage: "6 مجم دفع وريدي سريع، ثم 12 مجم", indications: "تسارع القلب فوق البطيني (SVT)", antidote: "لا يوجد" },
      { name: "دوبامين", dosage: "2-20 ميكروجرام/كجم/دقيقة", indications: "الصدمة، بطء القلب المصحوب بأعراض", antidote: "لا يوجد" },
      { name: "نورأدرينالين", dosage: "0.1-2 ميكروجرام/كجم/دقيقة", indications: "انخفاض ضغط الدم الشديد، الصدمة الإنتانية", antidote: "لا يوجد" },
      { name: "هيبارين", dosage: "80 وحدة/كجم بلعة، 18 وحدة/كجم/ساعة", indications: "متلازمة الشريان التاجي، الجلطة الرئوية", antidote: "كبريتات البروتامين" },
      { name: "مورفين", dosage: "2-4 مجم وريد كل 5-15 دقيقة", indications: "الألم، متلازمة الشريان التاجي، الوذمة الرئوية", antidote: "نالكسون" },
      { name: "فنتانيل", dosage: "25-100 ميكروجرام وريد", indications: "الألم، التهدئة", antidote: "نالكسون" },
      { name: "ميدازولام", dosage: "1-5 مجم وريد", indications: "التهدئة، التشنجات", antidote: "فلومازينيل" },
      { name: "بروبوفول", dosage: "5-50 ميكروجرام/كجم/دقيقة", indications: "التهدئة", antidote: "لا يوجد" },
      { name: "أنسولين (عادي)", dosage: "0.1 وحدة/كجم/ساعة", indications: "الحماض الكيتوني السكري، ارتفاع سكر الدم", antidote: "ديكستروز/جلوكاجون" },
      { name: "كبريتات المغنيسيوم", dosage: "1-2 جرام وريد على مدار 15-60 دقيقة", indications: "تورساد دي بوانت، تسمم الحمل", antidote: "جلوكونات الكالسيوم" },
      { name: "جلوكونات الكالسيوم", dosage: "1 جرام وريد على مدار 5-10 دقائق", indications: "ارتفاع بوتاسيوم الدم، انخفاض كالسيوم الدم", antidote: "لا يوجد" },
      { name: "بيكربونات الصوديوم", dosage: "1 ميكرو مكافئ/كجم وريد", indications: "الحماض الأيضي، جرعة زائدة من مضادات الاكتئاب", antidote: "لا يوجد" }
    ],
    scenarios: [
      { title: "الاختناق", steps: ["شجع على السعال", "5 ضربات على الظهر", "5 ضغطات على البطن", "ابدأ الإنعاش القلبي الرئوي إذا فقد الوعي"] },
      { title: "الغرق", steps: ["أخرج المصاب من الماء بأمان", "افحص التنفس والنبض", "أعطِ 5 أنفاس إنقاذ أولاً", "ابدأ الإنعاش القلبي الرئوي إذا لم يوجد نبض"] },
      { title: "طوارئ السكري", steps: ["افحص مستوى السكر في الدم", "إذا كان واعياً: أعطِ 15 جرام سكر سريع", "إذا كان فاقداً للوعي: جلوكاجون أو D50", "أعد فحص السكر بعد 15 دقيقة"] },
      { title: "البتر", steps: ["اضغط مباشرة على الجرح", "استخدم عاصبة (تورنيكيه) إذا لزم الأمر", "لف الجزء المبتور بشاش معقم", "ضع الجزء المبتور في كيس فوق الثلج"] },
      { title: "التشنجات", steps: ["احمِ المصاب من الإصابة", "لا تقيد حركته", "راقب وقت التشنج", "ضعه في وضع الإفاقة بعد الانتهاء"] },
      { title: "النزيف", steps: ["ضغط مباشر", "ضمادة ضاغطة", "عاصبة للأطراف", "عالج الصدمة (سوائل)"] },
      { title: "الحروق", steps: ["أوقف عملية الحرق", "برد بماء جارٍ", "انزع المجوهرات/الملابس", "غطِ بفيلم شفاف أو ضمادة نظيفة"] }
    ],
    antidotes: [
      { poison: "الأفيونات", antidote: "نالكسون" },
      { poison: "البنزوديازيبينات", antidote: "فلومازينيل" },
      { poison: "الباراسيتامول", antidote: "ن-أسيتيل سيستين" },
      { poison: "الديجوكسين", antidote: "ديجيبايند" },
      { poison: "حاصرات بيتا", antidote: "جلوكاجون" },
      { poison: "حاصرات قنوات الكالسيوم", antidote: "كالسيوم/جلوكاجون" },
      { poison: "الوارفارين", antidote: "فيتامين ك / FFP" },
      { poison: "الفوسفات العضوي", antidote: "أتروبين / براليدوكسيم" },
      { poison: "الحديد", antidote: "ديفيروكسامين" },
      { poison: "الميثانول/إيثيلين جليكول", antidote: "فومبيزول / إيثانول" }
    ],
    calculators: {
      gcs: {
        name: "مقياس غلاسكو للغيبوبة (GCS)",
        categories: [
          { name: "فتح العين", options: [{ label: "تلقائي", score: 4 }, { label: "للأمر الصوتي", score: 3 }, { label: "للألم", score: 2 }, { label: "لا يوجد", score: 1 }] },
          { name: "الاستجابة اللفظية", options: [{ label: "متجاوب ومنتبه", score: 5 }, { label: "مرتبك", score: 4 }, { label: "كلمات غير لائقة", score: 3 }, { label: "أصوات غير مفهومة", score: 2 }, { label: "لا يوجد", score: 1 }] },
          { name: "الاستجابة الحركية", options: [{ label: "يطيع الأوامر", score: 6 }, { label: "يحدد مكان الألم", score: 5 }, { label: "ينسحب من الألم", score: 4 }, { label: "انثناء غير طبيعي", score: 3 }, { label: "انبساط غير طبيعي", score: 2 }, { label: "لا يوجد", score: 1 }] }
        ]
      },
      rass: {
        name: "مقياس ريتشموند للتهدئة والهياج (RASS)",
        options: [
          { label: "+4 عدواني", score: 4 }, { label: "+3 هائج جداً", score: 3 }, { label: "+2 هائج", score: 2 }, { label: "+1 قلق", score: 1 },
          { label: "0 هادئ ومنتبه", score: 0 },
          { label: "-1 نعاس", score: -1 }, { label: "-2 تهدئة خفيفة", score: -2 }, { label: "-3 تهدئة متوسطة", score: -3 }, { label: "-4 تهدئة عميقة", score: -4 }, { label: "-5 لا يستجيب", score: -5 }
        ]
      },
      ccf: {
        name: "مقياس الأداء الوظيفي في العناية المركزة (CCF)",
        categories: [
          { name: "التقلب", options: [{ label: "مستقل", score: 3 }, { label: "مساعدة بسيطة", score: 2 }, { label: "مساعدة متوسطة", score: 1 }, { label: "غير قادر", score: 0 }] },
          { name: "من الاستلقاء للجلوس", options: [{ label: "مستقل", score: 3 }, { label: "مساعدة بسيطة", score: 2 }, { label: "مساعدة متوسطة", score: 1 }, { label: "غير قادر", score: 0 }] },
          { name: "توازن الجلوس", options: [{ label: "مستقل", score: 3 }, { label: "مساعدة بسيطة", score: 2 }, { label: "مساعدة متوسطة", score: 1 }, { label: "غير قادر", score: 0 }] }
        ]
      },
      four: {
        name: "مقياس فور (FOUR Score)",
        categories: [
          { name: "استجابة العين", options: [{ label: "الأجفان مفتوحة، تتبع/رمش بالأمر", score: 4 }, { label: "الأجفان مفتوحة ولكن لا تتبع", score: 3 }, { label: "الأجفان مغلقة ولكن تفتح للصوت العالي", score: 2 }, { label: "الأجفان مغلقة ولكن تفتح للألم", score: 1 }, { label: "الأجفان تبقى مغلقة مع الألم", score: 0 }] },
          { name: "الاستجابة الحركية", options: [{ label: "علامة الإبهام، القبضة، أو علامة السلام", score: 4 }, { label: "تحديد مكان الألم", score: 3 }, { label: "استجابة الانثناء للألم", score: 2 }, { label: "استجابة الانبساط للألم", score: 1 }, { label: "لا استجابة للألم أو حالة رمع عضلي معممة", score: 0 }] },
          { name: "منعكسات جذع الدماغ", options: [{ label: "منعكسات الحدقة والقرنية موجودة", score: 4 }, { label: "حدقة واحدة واسعة وثابتة", score: 3 }, { label: "منعكس الحدقة أو القرنية غائب", score: 2 }, { label: "منعكس الحدقة والقرنية غائب", score: 1 }, { label: "غياب منعكس الحدقة والقرنية والسعال", score: 0 }] },
          { name: "التنفس", options: [{ label: "غير موصول بجهاز، نمط تنفس منتظم", score: 4 }, { label: "غير موصول بجهاز، نمط شين-ستوكس", score: 3 }, { label: "غير موصول بجهاز، تنفس غير منتظم", score: 2 }, { label: "يتنفس فوق معدل الجهاز", score: 1 }, { label: "يتنفس بمعدل الجهاز أو انقطاع النفس", score: 0 }] }
        ]
      },
      cpot: {
        name: "أداة مراقبة الألم في العناية المركزة (CPOT)",
        categories: [
          { name: "تعبيرات الوجه", options: [{ label: "مسترخي، طبيعي", score: 0 }, { label: "متوتر (عبوس، خفض الحاجب)", score: 1 }, { label: "تكشير (كل ما سبق مع إغلاق الأجفان بشدة)", score: 2 }] },
          { name: "حركات الجسم", options: [{ label: "غياب الحركات", score: 0 }, { label: "حماية (حركات بطيئة وحذرة)", score: 1 }, { label: "تململ (سحب الأنابيب، تخبط)", score: 2 }] },
          { name: "توتر العضلات", options: [{ label: "مسترخي (لا توجد مقاومة للحركات السلبية)", score: 0 }, { label: "متوتر، صلب (مقاومة للحركات السلبية)", score: 1 }, { label: "متوتر جداً أو صلب (مقاومة قوية)", score: 2 }] },
          { name: "التوافق مع جهاز التنفس (أو التصويت)", options: [{ label: "يتحمل الجهاز / كلام طبيعي", score: 0 }, { label: "سعال مع تحمل الجهاز / تنهد، أنين", score: 1 }, { label: "محاربة الجهاز / صراخ، نحيب", score: 2 }] }
        ]
      },
      flacc: {
        name: "مقياس FLACC للألم",
        categories: [
          { name: "الوجه", options: [{ label: "لا يوجد تعبير خاص أو ابتسامة", score: 0 }, { label: "تكشير أو عبوس عرضي، منسحب، غير مهتم", score: 1 }, { label: "ارتجاف الذقن المتكرر إلى المستمر، فك مطبق", score: 2 }] },
          { name: "الأرجل", options: [{ label: "وضع طبيعي أو مسترخي", score: 0 }, { label: "غير مرتاح، متململ، متوتر", score: 1 }, { label: "ركل، أو أرجل مسحوبة للأعلى", score: 2 }] },
          { name: "النشاط", options: [{ label: "مستلقٍ بهدوء، وضع طبيعي، يتحرك بسهولة", score: 0 }, { label: "تلوٍ، تحرك ذهاباً وإياباً، متوتر", score: 1 }, { label: "مقوس، صلب أو حركات مفاجئة", score: 2 }] },
          { name: "البكاء", options: [{ label: "لا بكاء (مستيقظ أو نائم)", score: 0 }, { label: "أنين أو تذمر؛ شكوى عرضية", score: 1 }, { label: "بكاء مستمر، صراخ أو نحيب، شكوى متكررة", score: 2 }] },
          { name: "القدرة على التهدئة", options: [{ label: "راضٍ، مسترخي", score: 0 }, { label: "يطمئن باللمس العرضي، العناق أو التحدث إليه، قابل للتشتيت", score: 1 }, { label: "صعب التهدئة أو المواساة", score: 2 }] }
        ]
      },
      apache: {
        name: "مقياس APACHE II (مبسط)",
        categories: [
          { name: "العمر", options: [{ label: "< 44", score: 0 }, { label: "45-54", score: 2 }, { label: "55-64", score: 3 }, { label: "65-74", score: 5 }, { label: "> 75", score: 6 }] },
          { name: "تاريخ فشل عضوي حاد", options: [{ label: "لا يوجد", score: 0 }, { label: "جراحة طارئة / غير جراحية", score: 5 }, { label: "جراحة اختيارية", score: 2 }] },
          { name: "درجة الحرارة (°م)", options: [{ label: "36-38.4", score: 0 }, { label: "38.5-38.9", score: 1 }, { label: "34-35.9", score: 1 }, { label: "32-33.9", score: 2 }, { label: "30-31.9", score: 3 }, { label: "> 39 أو < 30", score: 4 }] },
          { name: "متوسط ضغط الشرايين (ملم زئبق)", options: [{ label: "70-109", score: 0 }, { label: "110-129", score: 2 }, { label: "50-69", score: 2 }, { label: "130-159", score: 3 }, { label: "> 160 أو < 49", score: 4 }] },
          { name: "معدل ضربات القلب", options: [{ label: "70-109", score: 0 }, { label: "110-139", score: 2 }, { label: "55-69", score: 2 }, { label: "140-179", score: 3 }, { label: "40-54", score: 3 }, { label: "> 180 أو < 39", score: 4 }] }
        ]
      },
      start: {
        title: "نظام الفرز البسيط والعلاج السريع (START)",
        back: "العودة للخطوة السابقة",
        startNew: "بدء فرز جديد",
        categoryLabel: "فئة الفرز",
        categories: {
          MINOR: { label: "طفيفة", desc: "البطاقة الخضراء: إصابات طفيفة، يمكنها انتظار العلاج." },
          DELAYED: { label: "متأخرة", desc: "البطاقة الصفراء: إصابات خطيرة ولكنها لا تهدد الحياة." },
          IMMEDIATE: { label: "عاجلة", desc: "البطاقة الحمراء: إصابات تهدد الحياة، تتطلب تدخلاً فورياً." },
          DECEASED: { label: "متوفى", desc: "البطاقة السوداء: متوفى أو إصابات لا تتوافق مع الحياة." }
        },
        steps: {
          walking: { question: "هل يستطيع المريض المشي؟", options: [{ label: "نعم", result: 'MINOR' }, { label: "لا", nextStep: 'breathing' }] },
          breathing: { question: "هل يتنفس المريض؟", options: [{ label: "نعم", nextStep: 'respiratory_rate' }, { label: "لا", nextStep: 'open_airway' }] },
          open_airway: { question: "افتح المجرى الهوائي. هل يتنفس المريض الآن؟", options: [{ label: "نعم", result: 'IMMEDIATE' }, { label: "لا", result: 'DECEASED' }] },
          respiratory_rate: { question: "معدل التنفس؟", options: [{ label: "> 30 / دقيقة", result: 'IMMEDIATE' }, { label: "< 30 / دقيقة", nextStep: 'perfusion' }] },
          perfusion: { question: "التروية (النبض الكعبري أو امتلاء الشعيرات الدموية)؟", options: [{ label: "النبض غائب / الامتلاء > ثانيتين", result: 'IMMEDIATE' }, { label: "النبض موجود / الامتلاء < ثانيتين", nextStep: 'mental_status' }] },
          mental_status: { question: "الحالة العقلية (يتبع الأوامر البسيطة)؟", options: [{ label: "لا", result: 'IMMEDIATE' }, { label: "نعم", result: 'DELAYED' }] }
        }
      },
      rts: {
        title: "مقياس الصدمات المنقح (RTS)",
        survivalProb: "احتمالية البقاء على قيد الحياة",
        categories: [
          { name: "مقياس غلاسكو للغيبوبة", options: [{ label: "13-15", score: 4 }, { label: "9-12", score: 3 }, { label: "6-8", score: 2 }, { label: "4-5", score: 1 }, { label: "3", score: 0 }] },
          { name: "ضغط الدم الانقباضي (ملم زئبق)", options: [{ label: "> 89", score: 4 }, { label: "76-89", score: 3 }, { label: "50-75", score: 2 }, { label: "1-49", score: 1 }, { label: "0", score: 0 }] },
          { name: "معدل التنفس", options: [{ label: "10-29", score: 4 }, { label: "> 29", score: 3 }, { label: "6-9", score: 2 }, { label: "1-5", score: 1 }, { label: "0", score: 0 }] }
        ]
      }
    },
    labValues: {
      hematology: [
        { item: "الهيموجلوبين", male: "13.5-17.5 جم/ديسيلتر", female: "12.0-15.5 جم/ديسيلتر" },
        { item: "خلايا الدم البيضاء", range: "4,500-11,000 /ميكرولتر" },
        { item: "الصفائح الدموية", range: "150,000-450,000 /ميكرولتر" },
        { item: "الهيماتوكريت", male: "41-50%", female: "36-44%" }
      ],
      chemistry: [
        { item: "الصوديوم", range: "135-145 ميكرو مكافئ/لتر" },
        { item: "البوتاسيوم", range: "3.5-5.0 ميكرو مكافئ/لتر" },
        { item: "الكلوريد", range: "98-107 ميكرو مكافئ/لتر" },
        { item: "البيكربونات", range: "22-28 ميكرو مكافئ/لتر" },
        { item: "نيتروجين يوريا الدم", range: "7-20 مجم/ديسيلتر" },
        { item: "الكرياتينين", range: "0.6-1.2 مجم/ديسيلتر" },
        { item: "الجلوكوز (صائم)", range: "70-100 مجم/ديسيلتر" }
      ]
    }
  }
};
