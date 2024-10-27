let selectedSymptoms = [];
const firebaseConfig = {
  apiKey: "AIzaSyDQ62VF6jh4sv7Kyuk8dPV7PgRdPUkY34c",
  authDomain: "evolumin-fb768.firebaseapp.com",
  databaseURL: "https://evolumin-fb768-default-rtdb.firebaseio.com",
  projectId: "evolumin-fb768",
  storageBucket: "evolumin-fb768.appspot.com",
  messagingSenderId: "178761401898",
  appId: "1:178761401898:web:c25bb3306905d12b84e553",
  measurementId: "G-HSB1CJD69G"
};

// Display subcategories and their symptoms as checkboxes
function showSubcategories(category) {
  const subcategoryContainer = document.getElementById('subcategory-container');
  subcategoryContainer.innerHTML = ''; // Clear previous content

  const subcategories = {
    head: ['Eyes', 'Nose', 'Forehead', 'Mouth','Ears','Face','Jaw',],
    neck: ['Throat'],
    chest: ['Upper_Chest', 'Sternum', 'Breast'],
    arms: ['Shoulder','Armpit','Upper_Arm','Elbow','Forearm','Wrist','Hand','Fingers'],
    abdomen: ['Upper_Abdomen','Upper_central_abdomen','Lower_Abdomen'],
    pelvis: ['Hip','Groin','above_pubic_bone','Genitals'],
    back: ['Upper_back','Flank','Lower_back','Tailbone'],
    buttocks: ['Hip','Rectum'],
    legs: ['Thigh','Hamstring','Knee','back_of_knee','Shin','Calf','Ankle','Foot','Toes']
    // Add more subcategories as needed
  };

  const symptomsList = {
    Eyes: [ 'around eye socket hurts', 'black eye', ' blind spot', ' blurry vision',  'blurry vision in one eye',  'bruising around eyes',  'cannot look up',' central vision loss ', 'decreased vision', 'distorted vision', 'double vision', 'dry eyes', 'eye discharge', 'eye hurts', 'eye pain' , 'eye socket hurts', 'eye strain', 'eye twitching', 'eyelid hurts' , 'eyes are irritated', 'flashing lights in vision', 'flickering uncolored zig-zag lines in vision', 'inner corner of eye is swollen' , 'irritated eye', 'itchy eye' , 'itchy eyelid' , 'lateral vision loss', 'lazy eye' , 'light hurts eyes', 'loss of vision in one eye','no peripheral vision', 'nystagmus','one eye sees better than the other', 'one eyelid swollen', 'painful and weak eye movement', 'pink eye', 'poor night vision', 'pus coming from the eye', 'rash limited to eyelid', 'red eye', 'seeing halos of light around things', 'severe eye pain', 'single red eye', 'skin and eyes more sensitive to sunlight', 'small dot of light or zigzag shape in your vision', 'sore eye', 'stye', 'swollen eyelid', 'tearing in one eye', 'temporary vision loss', 'vision loss', 'visual aura', 'visual loss on the sides', 'watery eyes', 'wrinkle between eyebrows', 'yellow eyes'],
    Nose: ['blockage in nose', 'bloody nose', 'hay fever', 'head congestion', 'inside of nose feels dry', 'itchy nose', 'nasal sinus draining', 'nasal sinus feels full', 'nasal sinus pain', 'nasal sinus sore', 'nose discharge, foul smelling, unilateral', 'nose discharge, purulent, unilateral', 'nosebleed', 'postnasal drip', 'pus coming out of nose', 'runny nose', 'sinusitis', 'smelly, runny nose', 'sneezing', 'snotty, runny nose', 'stuffy nose', 'trouble smelling', 'using decongestant nose drops'],
    Ears: ['blocked ear', 'cannot hear on one side', 'constant ear ringing', 'dry skin in ear', 'ear bleeding', 'ear infection', 'ear is red', 'ear tender to touch', 'ear wax blocking ear', 'earache', 'ears feel full', 'ears set low', 'fluid leaking from my ear', 'headache behind ears', 'hearing is getting worse', 'itchy ear', 'outside of ear hurts', 'pus coming from my ear', 'rash limited to ear', 'swollen ear cartilage', 'trouble hearing'],
    Mouth: ['bad breath', 'bleeding gums', 'breath has a fruity smell', 'breath smells like almonds', 'bulimia', 'cold sore', 'cough', 'crack on tongue', 'cracking at corner of mouth', 'dehydration', 'dental caries', 'denture pain', 'drooling', 'dry mouth', 'gingival erythema', 'gingival tenderness', 'gingival ulceration', 'gingivitis', 'gums hurt', 'hives on lips', 'large tongue', 'lip hurts', 'lips turning blue', 'lower lip droops', 'malocclusion', 'metal taste in mouth', 'more thirsty than usual', 'mouth bleeding', 'mouth hurts', 'mouth is swollen', 'mouth mucous membrane bleeding', 'open sore(s) in mouth', 'open sore(s) on lip', 'self induced vomiting', 'severely bad breath', 'snoring', 'swelling around the mouth', 'swollen gums', 'swollen lips', 'swollen throat', 'swollen tonsils', 'throat is dry', 'thrush', 'tonsil inflammation', 'tooth discoloration', 'tooth erosion', 'tooth heat sensitivity', 'tooth hurts with cold liquids or food', 'tooth impaction', 'tooth loose', 'toothache', 'upper lip is swollen', 'vomiting blood'],
    Forehead: ['fatigue', 'fever', 'forehead is tender', 'forehead sticks out', 'headache', 'headache in front of head', 'high forehead', 'lightheadedness'],
    Face: ['cannot move one side of my face', 'cheek bone pain', 'cheek pain', 'face feels numb', 'face feels weak', 'face hurts', 'face is swollen', 'face sweats a lot', 'face turns reddish color', 'half of face is flushed', 'horner syndrome', 'loss of facial hair', 'nasal sinus pain', 'numbness of face', 'one side of face feels weak', 'one side of face not the same as the other', 'rash limited to face', 'red face', 'red flaky rash limited to smile or laugh lines', 'red, swollen, runny nose', 'rough hair on face', 'thinning facial hair', 'tingling or pricking face skin', 'tingling or pricking on one side of face', 'tingling or pricking skin of face', 'trigeminal neuralgia', 'trigeminal paralysis', 'weak muscles in face'],
    Jaw: ['cheek and jaw swollen', 'clicking or popping sound from jaw', 'jaw angle tenderness', 'jaw hurts', 'lower jaw hurts', 'lymph node under jaw enlarged', 'pain in jaw when chewing', 'upper jaw hurts'],
    Throat: ['choking', 'choking sensation', 'cough', 'epiglottis swelling', 'episodes of not breathing during sleep', 'food comes back up', 'food or liquid goes down wrong pipe', 'high pitched breathing', 'itchy throat', 'jugular vein a wave increased', 'laryngeal pain', 'laryngitis', 'lump on neck', 'lump on one side of neck', 'neck bones fused together', 'neck bones sticking out', 'neck hurts', 'neck is swollen', 'neck tender to touch', 'pain on one side of throat', 'pain when i swallow', 'painful swollen gland in front part of neck', 'rash limited to neck', 'sore throat', 'stiff neck', 'tender neck lymph node', 'throat burning sensation', 'throat clearing', 'throat dryness', 'thyroid enlargement', 'thyroid nodule', 'tightness in throat', 'trouble swallowing', 'voice is hoarse', 'white stuff on throat'],
    Upper_Chest: ['fatty area above collar bone', 'left supraclavicular lymph node enlargement', 'supraclavicular fossa bruit', 'supraclavicular lymph node enlargement', 'supraclavicular pulsation'],
    Sternum: ['breastbone tender to touch', 'chest bones cave in', 'chest bones stick out', 'congestive heart failure', 'feeling of pressure in food pipe', 'food gets stuck', 'hard for food to go down', 'heartburn', 'hiccups', 'inflammation of esophagus', 'palpitations', 'pressure on heart due to fluid buildup', 'severe chest pain/pressure', 'sternal lift', 'sternal pulsation visible', 'tightening of esophagus'],
    Breast: ['abnormal growth of male breasts', 'bloody nipple discharge', 'breast getting bigger', 'breast hurts', 'breast redness', 'breast skin feels like an orange peel', 'breasts not developing', 'fluid leaking from nipple', 'growth on nipple', 'hard lump in breast', 'infected lump or sore on breast', 'lump in breast', 'nipple pulling to one side', 'nipple redness', 'nipple tender to touch', 'part of breast skin appears pulled inward', 'rash limited to under the breast', 'red, irritated nipple', 'swollen breast'],
    Shoulder: ['lump in shoulder', 'shoulder girdle muscle weakness', 'shoulder muscle pain', 'shoulder muscle twitching', 'shoulder tender to touch', 'subacromial bursal tenderness', 'subdeltoid bursal tenderness'],
    Armpit: ['axillary lymph node enlargement', 'axillary lymph node tenderness', 'darkening skin on armpit', 'firm lump in armpit', 'losing armpit hair', 'lump in armpit that doesn\'t move', 'painful nodules in armpits', 'rash limited to armpit', 'very little armpit hair'],
    Upper_Arm: ['bicep shaking', 'biceps and triceps hyperreflexia', 'biceps hyporeflexia', 'humeral swelling, lower', 'triceps hyporeflexia', 'upper arm pain'],
    Elbow: ['darkened skin on elbow', 'elbow bones out of place', 'elbow pain', 'flaky bump(s) limited to elbows or knees', 'rash limited to elbow or knees', 'red bump(s) on elbow', 'single flaky raised skin patch on elbows or knees', 'stiff elbow', 'tenderness lateral epicondyle'],
    Forearm: ['forearm feels more sensitive', 'forearm hurts', 'forearm itches', 'lump on forearm', 'tingling or prickling in forearm'],
    Wrist: ['crackling sound when moving wrist', 'wrist hurts when moved', 'wrist pain', 'wrist stiffness', 'wrist swelling'],
    Hand: ['asterixis', 'cold hand', 'compressed nerve in wrist/hand', 'cramp in my palm', 'darkened skin on knuckle(s)', 'hand cramping at night', 'hand hurts', 'hand is numb', 'hand muscle weakness', 'hand shaking', 'hand swelling', 'knuckle joint on hand hurts', 'rash limited to hand', 'rash limited to palm', 'rash on hand', 'red flaky rash limited to palms or soles', 'stiff hands', 'stiff knuckles in hands or toes', 'swollen knuckles', 'tingling or prickling in hand', 'trouble moving hands', 'weak hand grip'],
    Fingers: ['can\'t straighten bent finger(s)', 'finger shaking', 'finger(s) are swollen', 'finger(s) hurts', 'finger(s) lock in place', 'finger(s) turn red', 'finger(s) turns blue', 'nail loss', 'nail not growing the way it should', 'nail pulling away from cuticle', 'thumb hurts', 'tingling and prickling in finger(s)'],
    Upper_Abdomen: ['burping', 'can\'t digest fatty foods', 'diarrhea after meals', 'gallbladder inflammation', 'gallstones', 'inflammation of stomach and intestines', 'liver disease', 'nausea', 'pancreas inflammation', 'reflux', 'scarring of the liver', 'stomach pain upper left side', 'stomach pain upper right side', 'ulcer in muscle connecting stomach to duodenum', 'upper belly bloating', 'upper stomach pain'],
    Upper_central_abdomen: ['burping', 'epigastric abdominal tenderness', 'heartburn', 'indigestion', 'nausea', 'pain around belly button', 'pain in middle of belly', 'pain near belly button spreading to lower right side of stomach', 'reflux', 'stomach inflammation', 'stomach pushes through diaphragm', 'vomiting blood'],
    Lower_Abdomen: ['bladder distention', 'bladder feels full', 'diarrhea', 'feels like need to pee all the time', 'gassy', 'inflammation of stomach and intestines', 'lower belly bloating', 'lower stomach pain', 'stomach pain lower left side', 'stomach pain lower right side'],
    Hip: ['bend at hip', 'greater tuberosity tenderness', 'hip deformity', 'hip feels like it pops out of socket', 'hip feels stiff', 'hip hurts', 'hip is swollen', 'hip muscle is weak', 'hip tenderness', 'hurts to walk'],
    Groin: ['groin pain', 'groin tenderness', 'inguinal hernia', 'inguinal lymph node abscess', 'inguinal lymph node enlargement', 'inguinal lymph node tenderness', 'lump in groin', 'painful gland in groin', 'rash limited to groin', 'redness of groin'],
    above_pubic_bone:['pubic area swollen', 'pubic hair early onset', 'pubic hair lice', 'thinning pubic hair'],
    Genitals:['a lot of blood in urine', 'balls turning blue', 'bladder distention', 'bladder feels full', 'bladder infection', 'blood in urine', 'bloody pee', 'bloody sperm', 'can\'t have orgasm', 'can\'t pee', 'cloudy pee', 'decreased sex drive', 'delayed or late period', 'discharge from penis', 'enlarged prostate', 'epididymal mass', 'epididymal tenderness', 'erection that won\'t go down or soften', 'feels like need to pee all the time', 'firm pus filled rash around head of penis', 'foreskin stuck over head of penis', 'genital pain', 'genitals itching', 'genitals swollen', 'hard bump(s) around head of penis', 'hard bump(s) on head of penis', 'head of penis curves downward', 'head of penis hurts', 'head of penis is irritated', 'head of penis is red and swollen', 'hurts to ejaculate or cum', 'immediate urge to pee', 'impotence', 'incontinence', 'inflamed scrotum', 'irritation between butt and genitals', 'itching on urethra', 'large blister(s) on penis', 'lump in genital area', 'lump on penis', 'lump on scrotum', 'lump on testicle', 'man ejaculates sooner during sexual intercourse than he or his partner would like', 'need to pee often', 'open sore(s) around head of penis', 'open sore(s) on head of penis', 'open sore(s) on penis', 'open sore(s) on urethra', 'pain in testicle or ovary', 'pain in tube behind testicle', 'pain while peeing', 'painful erection', 'painless ulcer on the genitals', 'passing small kidney stones', 'pee more than usual', 'penis hurts', 'penis is red', 'penis is red and irritated', 'prostate pain', 'prostate tenderness', 'prostatitis', 'rash limited to genitals', 'red bump(s) around head of penis', 'red bump(s) on head of penis', 'redness of testicle sac', 'scrotal mass', 'scrotal mass, firm', 'scrotal ulceration', 'scrotum hurts', 'small penis', 'swollen scrotum', 'swollen testicle', 'testicle hurts', 'testicles hurt to touch', 'trouble starting to pee', 'uncircumcised penis', 'undescended testicles', 'urethral pain', 'urinary incontinence', 'urinary tract infection', 'urinating less', 'weak pee stream', 'wet dream'],
    Upper_back:['back pain', 'scapula, winged', 'upper back pain'],
    Flank:['flank tenderness', 'kidney disease', 'kidney stone', 'kidney, polycystic', 'one side of low back hurts', 'one side of low back is red'],
    Lower_back:['back pain', 'can\'t bend backwards', 'extreme curve in low back', 'low back pain', 'low back tenderness', 'lower back muscle spasm', 'severe back pain', 'solitary patch, rough, raised, lumbosacral', 'spine curvature in side-to-side direction'],
    Tailbone:['compression of spinal nerves', 'pain in tailbone', 'pain when sitting', 'sacroiliac pain'],
    Hip:['bend at hip', 'greater tuberosity tenderness', 'hip deformity', 'hip feels like it pops out of socket', 'hip feels stiff', 'hip hurts', 'hip is swollen', 'hip muscle is weak', 'hip tenderness', 'hurts to walk'],
    Rectum:['anal bleeding', 'anal bulla, hemorrhagic', 'anal fistula', 'anal inflammation', 'anal sphincter spasm', 'anal ulceration', 'blood in poop', 'butt hurts', 'can\'t poop completely', 'clay colored poop', 'constipation', 'feels like need to poop all the time', 'gassy', 'hard stool', 'hemorrhoid', 'infrequent bowel movements', 'itchy anus', 'oily greasy looking poop', 'pain during pooping', 'poop leaking', 'poop smells bad', 'rash limited to anus', 'rectal fissure', 'rectal tenderness', 'rectum protrudes out anus', 'stool backed up or blocked', 'tarry stool', 'wart on butt', 'yellow colored poop'],
    Thigh:['burning feeling on thigh', 'cramp in thigh muscle', 'itching thigh', 'numb thigh muscle', 'thigh pain'],
    Hamstring:['back of upper leg is weak'],
    Knee:['back of knee hurts  darkened skin on knee  dislocated knee  flaky bump(s) limited to elbows or knees  hurts to walk  inflamed fluid sac in knee  knee cracking when moving  knee gets stuck when moving  knee hurts  knee instability  knee joint inflammation  outer side of knee hurts  rash limited to elbow or knees  single flaky raised skin patch on elbows or knees  stiff knee  swollen knee  trouble moving knee'],
    back_of_knee:['back of knee is swollen', 'joint fluid swelling of back of knee joint', 'lachman test positive'],
    Shin:['ridges on shin bone', 'sharp forward bowing of shin', 'tibial bone mass', 'tibial deformity', 'tibial pulse absence'],
    Calf:['calf muscle cramp', 'calf pain', 'calf swelling', 'hurts to walk', 'tender calf muscle', 'weakness in lower legs'],
    Ankle:['ankle pain', 'ankle redness', 'ankle swollen', 'bruise on ankle', 'lump on ankle'],
    Foot:['ball of foot joint hurts when move', 'big toe joint is swollen', 'big toe joint is tender to touch', 'foot feels weak', 'foot hurts', 'foot is numb', 'foot turning blue', 'heel hurts', 'heel is swollen', 'heel spur', 'heel tenderness', 'itchy foot', 'pain in the arch of foot', 'rash limited to feet', 'rash limited to soles of feet', 'swollen foot', 'tingling or prickling in foot', 'trouble moving foot'],   
    Toes:['arthritis in big toe', 'big toe hurts', 'big toe hurts when moving', 'big toe is under the second toe', 'big toe joint is swollen', 'big toe joint is tender to touch', 'great toe metatarsophalangeal prominence', 'nail loss', 'nail not growing the way it should', 'nail pulling away from cuticle', 'rash limited to between toes', 'stiff knuckles in hands or toes', 'toe pain']

  };


  if (subcategories[category]) {
    subcategories[category].forEach((sub) => {
      let subDiv = document.createElement('div');
      subDiv.innerHTML = `<h4>${sub}</h4>`;

      if (symptomsList[sub]) {
        symptomsList[sub].forEach((symptom) => {
          subDiv.innerHTML += `
            <label>
              <input type="checkbox" value="${symptom}" onclick="toggleSymptom('${symptom}')">
              ${symptom}
            </label><br>
          `;
        });
      }
      subcategoryContainer.appendChild(subDiv);
    });
  }
}

// Toggle symptom selection
function toggleSymptom(symptom) {
  if (!selectedSymptoms.includes(symptom)) {
    selectedSymptoms.push(symptom);
  } else {
    selectedSymptoms = selectedSymptoms.filter((item) => item !== symptom);
  }
}

// Add selected symptoms to JSON file (simulated in local storage)
function addSelectedSymptoms() {
  const existingSymptoms = JSON.parse(localStorage.getItem('symptomsData')) || [];
  selectedSymptoms.forEach(symptom => {
    if (!existingSymptoms.includes(symptom)) {
      existingSymptoms.push(symptom);
    }
  });

  localStorage.setItem('symptomsData', JSON.stringify(existingSymptoms));
  alert("Symptoms added!");
}

function submitSymptoms() {
  const mobileNumber = prompt("Enter mobile number:");

  if (!mobileNumber) {
      alert("Mobile number is required.");
      return;
  }

  const symptomsString = selectedSymptoms.join(', ');

  database.ref(`users/${mobileNumber}`).update({
      symptoms: symptomsString
  })
  .then(() => {
      alert("Symptoms submitted successfully!");
  })
  .catch(error => {
      console.error("Error submitting symptoms:", error);
      alert("Error submitting symptoms.");
  });
}

