/* =============================================================
   Quickly Rent — script.js  (v2)
   Handles: index, agencies, cars, contact pages
   Features: i18n (en/ar/fr), dark mode, agency flow, modals,
             filters incl. chauffeur, time picker, date range,
             back navigation, star ratings, toast notifications
   ============================================================= */

// ── Config ──────────────────────────────────────────────────
const DB_PATH = 'cars-database.json';
let db = { agencies: [], cars: [] };   // loaded once

// ── Global state ────────────────────────────────────────────
let currentLang = 'en';

// ── Wilayas (all 69) ────────────────────────────────────────
const WILAYAS = {
  en:[
    "01 Adrar","02 Chlef","03 Laghouat","04 Oum El Bouaghi","05 Batna",
    "06 Béjaïa","07 Biskra","08 Béchar","09 Blida","10 Bouira",
    "11 Tamanrasset","12 Tébessa","13 Tlemcen","14 Tiaret","15 Tizi Ouzou",
    "16 Algiers","17 Djelfa","18 Jijel","19 Sétif","20 Saïda",
    "21 Skikda","22 Sidi Bel Abbès","23 Annaba","24 Guelma","25 Constantine",
    "26 Médéa","27 Mostaganem","28 M'Sila","29 Mascara","30 Ouargla",
    "31 Oran","32 El Bayadh","33 Illizi","34 Bordj Bou Arréridj","35 Boumerdès",
    "36 El Tarf","37 Tindouf","38 Tissemsilt","39 El Oued","40 Khenchela",
    "41 Souk Ahras","42 Tipaza","43 Mila","44 Aïn Defla","45 Naâma",
    "46 Aïn Témouchent","47 Ghardaïa","48 Relizane","49 Timimoun","50 Bordj Badji Mokhtar",
    "51 Ouled Djellal","52 Béni Abbès","53 In Salah","54 In Guezzam","55 Touggourt",
    "56 Djanet","57 El M'Ghair","58 El Meniaa",
    "59 Timimoun (New)","60 Bordj Badji Mokhtar (New)","61 Ouled Djellal (New)",
    "62 Béni Abbès (New)","63 In Salah (New)","64 In Guezzam (New)",
    "65 Touggourt (New)","66 Djanet (New)","67 El M'Ghair (New)",
    "68 El Meniaa (New)","69 Taghaza"
  ],
  ar:[
    "01 أدرار","02 الشلف","03 الأغواط","04 أم البواقي","05 باتنة",
    "06 بجاية","07 بسكرة","08 بشار","09 البليدة","10 البويرة",
    "11 تمنراست","12 تبسة","13 تلمسان","14 تيارت","15 تيزي وزو",
    "16 الجزائر","17 الجلفة","18 جيجل","19 سطيف","20 سعيدة",
    "21 سكيكدة","22 سيدي بلعباس","23 عنابة","24 قالمة","25 قسنطينة",
    "26 المدية","27 مستغانم","28 المسيلة","29 معسكر","30 ورقلة",
    "31 وهران","32 البيض","33 إليزي","34 برج بوعريريج","35 بومرداس",
    "36 الطارف","37 تندوف","38 تيسمسيلت","39 الوادي","40 خنشلة",
    "41 سوق أهراس","42 تيبازة","43 ميلة","44 عين الدفلى","45 النعامة",
    "46 عين تموشنت","47 غرداية","48 غليزان","49 تيميمون","50 برج باجي مختار",
    "51 أولاد جلال","52 بني عباس","53 عين صالح","54 عين قزام","55 تقرت",
    "56 جانت","57 المغير","58 المنيعة",
    "59 تيميمون (جديد)","60 برج باجي مختار (جديد)","61 أولاد جلال (جديد)",
    "62 بني عباس (جديد)","63 عين صالح (جديد)","64 عين قزام (جديد)",
    "65 تقرت (جديد)","66 جانت (جديد)","67 المغير (جديد)",
    "68 المنيعة (جديد)","69 طغازة"
  ],
  fr:[
    "01 Adrar","02 Chlef","03 Laghouat","04 Oum El Bouaghi","05 Batna",
    "06 Béjaïa","07 Biskra","08 Béchar","09 Blida","10 Bouira",
    "11 Tamanrasset","12 Tébessa","13 Tlemcen","14 Tiaret","15 Tizi Ouzou",
    "16 Alger","17 Djelfa","18 Jijel","19 Sétif","20 Saïda",
    "21 Skikda","22 Sidi Bel Abbès","23 Annaba","24 Guelma","25 Constantine",
    "26 Médéa","27 Mostaganem","28 M'Sila","29 Mascara","30 Ouargla",
    "31 Oran","32 El Bayadh","33 Illizi","34 Bordj Bou Arréridj","35 Boumerdès",
    "36 El Tarf","37 Tindouf","38 Tissemsilt","39 El Oued","40 Khenchela",
    "41 Souk Ahras","42 Tipaza","43 Mila","44 Aïn Defla","45 Naâma",
    "46 Aïn Témouchent","47 Ghardaïa","48 Relizane","49 Timimoun","50 Bordj Badji Mokhtar",
    "51 Ouled Djellal","52 Béni Abbès","53 In Salah","54 In Guezzam","55 Touggourt",
    "56 Djanet","57 El M'Ghair","58 El Meniaa",
    "59 Timimoun (Nouvelle)","60 Bordj Badji Mokhtar (Nouvelle)","61 Ouled Djellal (Nouvelle)",
    "62 Béni Abbès (Nouvelle)","63 In Salah (Nouvelle)","64 In Guezzam (Nouvelle)",
    "65 Touggourt (Nouvelle)","66 Djanet (Nouvelle)","67 El M'Ghair (Nouvelle)",
    "68 El Meniaa (Nouvelle)","69 Taghaza"
  ]
};

// ── Translations ────────────────────────────────────────────
const T = {
  en:{
    hero_text:"Rent your car easily with Quickly Rent",
    feat_easy:"Easy Renting", feat_wilaya:"All 69 Wilayas", feat_free:"Free Service",
    choose_wilaya:"Select Wilaya…", search:"Search",
    date_from:"From", date_to:"To",
    faq_title:"Frequently Asked Questions",
    contact:"Contact Us", contact_btn:"Contact Us", home:"Home", back:"Back",
    disclaimer:"We do not take responsibility for anything that happens after the contact. We simply are a link between someone who wants to rent a car and a car owner who wants to put his car for rental.",
    owner_text:"If you want to put your car for rental please",
    // agencies page
    agencies_in:"Agencies in {w}",
    no_agencies:"No agencies found in this wilaya.",
    cars_available:"{n} car(s) available",
    see_cars:"See Cars →",
    // cars page
    cars_at:"{a} — Cars",
    filter_price:"Any Price", filter_price_low:"Under 5 000 DZD", filter_price_high:"Over 5 000 DZD",
    filter_seats:"Any Seats", filter_seats_4:"4 Seats", filter_seats_5:"5 Seats", filter_seats_7:"7+ Seats",
    filter_engine:"Any Engine",
    filter_bag:"Bag Size", filter_bag_small:"Small", filter_bag_medium:"Medium", filter_bag_large:"Large",
    filter_km:"Mileage", filter_km_new:"New (< 50 k)", filter_km_used:"Used (> 50 k)",
    filter_trans:"Transmission", filter_trans_manual:"Manual", filter_trans_automatic:"Automatic",
    filter_chauffeur:"Chauffeur", filter_chauffeur_avec:"With Chauffeur", filter_chauffeur_sans:"Without Chauffeur",
    seats:"Seats", per_day:"/ day",
    rent_now:"Rent Now", pay_now:"Pay Now",
    no_cars_found:"No cars found matching your filters.",
    avail_from:"Available", chauffeur_avec:"With Driver", chauffeur_sans:"No Driver",
    // modals
    rent_modal_title:"Redirecting to Email",
    rent_modal_msg:"You will be taken to your email app. Send your rental request and attach any photos or documents needed.",
    pay_modal_title:"Payment Not Available",
    pay_modal_msg:"Online payment is coming soon. Stay tuned!",
    confirm:"Confirm", cancel:"Cancel", got_it:"Got it",
    // contact
    contact_title:"Get in Touch", contact_subtitle:"We are here to help you.",
    contact_location:"Algiers, Algeria",
    your_name:"Your Name", phone_number:"Phone Number",
    email_address:"Email Address", your_message:"Your Message", send_message:"Send Message",
    // toast
    toast_select_wilaya:"Please select a wilaya first."
  },
  ar:{
    hero_text:"أجر سيارتك بسهولة مع Quickly Rent",
    feat_easy:"سهولة التأجير", feat_wilaya:"كل 69 ولاية", feat_free:"خدمة مجانية",
    choose_wilaya:"اختر الولاية…", search:"بحث",
    date_from:"من", date_to:"إلى",
    faq_title:"الأسئلة الشائعة",
    contact:"اتصل بنا", contact_btn:"اتصل بنا", home:"الرئيسية", back:"رجوع",
    disclaimer:"نحن لا نتحمل مسؤولية أي شيء يحدث بعد التواصل. نحن فقط نربط بين المستأجر ومالك السيارة.",
    owner_text:"إذا كنت ترغب في عرض سيارتك للإيجار",
    agencies_in:"الوكالات في {w}",
    no_agencies:"لا توجد وكالات في هذه الولاية.",
    cars_available:"{n} سيارة(ات) متاحة",
    see_cars:"شاهد السيارات →",
    cars_at:"{a} — السيارات",
    filter_price:"أي سعر", filter_price_low:"أقل من 5 000 دج", filter_price_high:"أكثر من 5 000 دج",
    filter_seats:"أي مقاعد", filter_seats_4:"4 مقاعد", filter_seats_5:"5 مقاعد", filter_seats_7:"7+ مقاعد",
    filter_engine:"أي محرك",
    filter_bag:"حجم الحقيبة", filter_bag_small:"صغيرة", filter_bag_medium:"متوسطة", filter_bag_large:"كبيرة",
    filter_km:"المسافة", filter_km_new:"جديدة (< 50 ألف)", filter_km_used:"مستعملة (> 50 ألف)",
    filter_trans:"ناقل الحركة", filter_trans_manual:"يدوي", filter_trans_automatic:"أوتوماتيك",
    filter_chauffeur:"السائق", filter_chauffeur_avec:"مع سائق", filter_chauffeur_sans:"بدون سائق",
    seats:"مقاعد", per_day:"/ يوم",
    rent_now:"استأجر الآن", pay_now:"ادفع الآن",
    no_cars_found:"لم يتم العثور على سيارات تطابق فلاترك.",
    avail_from:"متاح", chauffeur_avec:"مع سائق", chauffeur_sans:"بدون سائق",
    rent_modal_title:"التوجيه إلى البريد الإلكتروني",
    rent_modal_msg:"سيتم أخذك إلى تطبيق البريد الإلكتروني. أرسل طلب الإيجار والصور أو الوثائق المطلوبة.",
    pay_modal_title:"الدفع غير متاح",
    pay_modal_msg:"الدفع عبر الإنترنت قريباً. ابقوا على اطلاع!",
    confirm:"تأكيد", cancel:"إلغاء", got_it:"حسناً",
    contact_title:"تواصل معنا", contact_subtitle:"نحن هنا لمساعدتك.",
    contact_location:"الجزائر، الجزائر",
    your_name:"اسمك", phone_number:"رقم الهاتف",
    email_address:"البريد الإلكتروني", your_message:"رسالتك", send_message:"إرسال الرسالة",
    toast_select_wilaya:"من فضلك اختر ولاية أولاً."
  },
  fr:{
    hero_text:"Louez votre voiture facilement avec Quickly Rent",
    feat_easy:"Location facile", feat_wilaya:"Toutes les 69 wilayas", feat_free:"Service gratuit",
    choose_wilaya:"Choisir une wilaya…", search:"Rechercher",
    date_from:"De", date_to:"À",
    faq_title:"Questions fréquentes",
    contact:"Contactez-nous", contact_btn:"Contactez-nous", home:"Accueil", back:"Retour",
    disclaimer:"Nous ne sommes pas responsables après le contact. Nous relions simplement les locataires et les propriétaires.",
    owner_text:"Si vous voulez mettre votre voiture en location",
    agencies_in:"Agences dans {w}",
    no_agencies:"Aucune agence trouvée dans cette wilaya.",
    cars_available:"{n} voiture(s) disponible(s)",
    see_cars:"Voir les voitures →",
    cars_at:"{a} — Voitures",
    filter_price:"Tous les prix", filter_price_low:"Moins de 5 000 DZD", filter_price_high:"Plus de 5 000 DZD",
    filter_seats:"Tous les sièges", filter_seats_4:"4 sièges", filter_seats_5:"5 sièges", filter_seats_7:"7+ sièges",
    filter_engine:"Tous les moteurs",
    filter_bag:"Taille bagage", filter_bag_small:"Petit", filter_bag_medium:"Moyen", filter_bag_large:"Grand",
    filter_km:"Kilométrage", filter_km_new:"Neuf (< 50 k)", filter_km_used:"Utilisé (> 50 k)",
    filter_trans:"Transmission", filter_trans_manual:"Manuelle", filter_trans_automatic:"Automatique",
    filter_chauffeur:"Chauffeur", filter_chauffeur_avec:"Avec chauffeur", filter_chauffeur_sans:"Sans chauffeur",
    seats:"Sièges", per_day:"/ jour",
    rent_now:"Louer maintenant", pay_now:"Payer maintenant",
    no_cars_found:"Aucune voiture trouvée correspondant à vos filtres.",
    avail_from:"Disponible", chauffeur_avec:"Avec chauffeur", chauffeur_sans:"Sans chauffeur",
    rent_modal_title:"Redirection vers le mail",
    rent_modal_msg:"Vous serez dirigé vers votre application de messagerie. Envoyez votre demande de location et joignez les photos ou documents nécessaires.",
    pay_modal_title:"Paiement non disponible",
    pay_modal_msg:"Le paiement en ligne arrive bientôt. Restez à l'écoute !",
    confirm:"Confirmer", cancel:"Annuler", got_it:"D'accord",
    contact_title:"Contactez-nous", contact_subtitle:"Nous sommes là pour vous aider.",
    contact_location:"Alger, Algérie",
    your_name:"Votre nom", phone_number:"Numéro de téléphone",
    email_address:"Adresse e-mail", your_message:"Votre message", send_message:"Envoyer le message",
    toast_select_wilaya:"Veuillez d'abord sélectionner une wilaya."
  }
};

// ── FAQ data ────────────────────────────────────────────────
const FAQ = {
  en:[
    {q:"How do I rent a car?",a:"Search by wilaya, pick an agency, choose a car, then click Rent Now to contact the owner by email."},
    {q:"What are the conditions?",a:"You must be 18+ and hold a valid driving licence."},
    {q:"How do I find the cheapest car?",a:"Use the price filter on the cars page to narrow results."},
    {q:"Can I rent a car with a chauffeur?",a:"Yes! Use the Chauffeur filter to show only cars offered with a driver."}
  ],
  ar:[
    {q:"كيف أستأجر سيارة؟",a:"ابحث بالولاية، اختر وكالة، حدد سيارة ثم اضغط استأجر الآن للتواصل مع المالك."},
    {q:"ما هي الشروط؟",a:"يجب أن يكون عمرك 18 سنة أو أكثر ولديك رخصة قيادة صالحة."},
    {q:"كيف أجد أرخص سيارة؟",a:"استخدم فلتر السعر في صفحة السيارات."},
    {q:"هل يمكنني استأجار سيارة مع سائق؟",a:"نعم، استخدم فلتر السائق لعرض السيارات مع سائق فقط."}
  ],
  fr:[
    {q:"Comment louer une voiture ?",a:"Recherchez par wilaya, choisissez une agence, puis une voiture et cliquez Louer maintenant."},
    {q:"Quelles sont les conditions ?",a:"Vous devez avoir 18 ans ou plus et un permis de conduire valide."},
    {q:"Comment trouver la voiture la moins chère ?",a:"Utilisez le filtre prix sur la page des voitures."},
    {q:"Puis-je louer une voiture avec chauffeur ?",a:"Oui ! Utilisez le filtre Chauffeur pour ne voir que les voitures avec chauffeur."}
  ]
};

// ── Helpers ─────────────────────────────────────────────────
function t(key) { return T[currentLang][key] || key; }

function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2400);
}

function getParams() { return new URLSearchParams(window.location.search); }

/** get wilaya display name from code e.g. "16" → "16 Algiers" */
function wilayaLabel(code) {
  return WILAYAS[currentLang].find(w => w.startsWith(code + ' ')) || code;
}

/** Load DB once and cache */
async function loadDB() {
  if (db.cars.length) return db;
  try {
    const r = await fetch(DB_PATH);
    db = await r.json();
  } catch(e) { console.error('DB load error', e); }
  return db;
}

/** Render star icons (out of 5) */
function starsHTML(rating) {
  let h = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    if (rating >= i)       h += '<i class="fas fa-star"></i>';
    else if (rating >= i - .5) h += '<i class="fas fa-star-half-alt"></i>';
    else                   h += '<i class="fas fa-star empty"></i>';
  }
  return h + '</div>';
}

/** Format date dd/mm/yyyy */
function fmtDate(str) {
  if (!str) return '—';
  const [y,m,d] = str.split('-');
  return `${d}/${m}/${y}`;
}

// ── Apply translations to static [data-key] elements ───────
function applyTranslations() {
  document.querySelectorAll('[data-key]').forEach(el => {
    const k = el.getAttribute('data-key');
    if (T[currentLang][k]) el.textContent = T[currentLang][k];
  });
}

// ── Language switch ─────────────────────────────────────────
function initLangSwitch() {
  const sel = document.getElementById('lang-select');
  if (!sel) return;
  sel.value = currentLang;
  sel.addEventListener('change', e => {
    currentLang = e.target.value;
    document.documentElement.lang = currentLang;
    document.body.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations();
    // page-specific re-renders
    if (document.getElementById('wilaya-select'))   initIndex();
    if (document.getElementById('agencies-container')) initAgencies();
    if (document.getElementById('cars-container'))  initCars();
    updateContactPlaceholders();
  });
}

// ── Theme toggle ────────────────────────────────────────────
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = btn.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });
}

// ── Hamburger ───────────────────────────────────────────────
function initHamburger() {
  const ham = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  if (!ham || !nav) return;
  ham.addEventListener('click', () => nav.classList.toggle('active'));
  // close on outside click
  document.addEventListener('click', e => {
    if (!ham.contains(e.target) && !nav.contains(e.target)) nav.classList.remove('active');
  });
}

// =============================================================
//   INDEX PAGE
// =============================================================
async function initIndex() {
  await loadDB();
  // wilaya select
  const wSel = document.getElementById('wilaya-select');
  if (!wSel) return;
  wSel.innerHTML = `<option value="" disabled selected>${t('choose_wilaya')}</option>`;
  WILAYAS[currentLang].forEach(w => {
    const code = w.split(' ')[0];
    wSel.innerHTML += `<option value="${code}">${w}</option>`;
  });

  // time selects
  const hSel = document.getElementById('hour-select');
  const mSel = document.getElementById('minute-select');
  if (hSel) {
    hSel.innerHTML = '';
    for (let h = 1; h <= 12; h++) hSel.innerHTML += `<option value="${h}">${h}</option>`;
  }
  if (mSel) {
    mSel.innerHTML = '';
    ['00','15','30','45'].forEach(v => mSel.innerHTML += `<option value="${v}">${v}</option>`);
  }

  // default dates: today → today+7
  const today = new Date();
  const tomorrow7 = new Date(); tomorrow7.setDate(today.getDate() + 7);
  const dfrom = document.getElementById('date-from');
  const dto   = document.getElementById('date-to');
  if (dfrom) dfrom.value = today.toISOString().slice(0,10);
  if (dto)   dto.value   = tomorrow7.toISOString().slice(0,10);

  // FAQ
  renderFAQ();

  // search button
  const sBtn = document.getElementById('search-btn');
  if (sBtn) {
    sBtn.onclick = () => {
      const wilaya = wSel.value;
      if (!wilaya) { showToast(t('toast_select_wilaya')); return; }
      const hour  = document.getElementById('hour-select').value;
      const min   = document.getElementById('minute-select').value;
      const ampm  = document.getElementById('ampm-select').value;
      const from  = dfrom ? dfrom.value : '';
      const to    = dto   ? dto.value   : '';
      window.location.href = `agencies.html?wilaya=${wilaya}&hour=${hour}&min=${min}&ampm=${ampm}&from=${from}&to=${to}`;
    };
  }
}

function renderFAQ() {
  const list = document.querySelector('.faq-list');
  if (!list) return;
  list.innerHTML = '';
  FAQ[currentLang].forEach(item => {
    const d = document.createElement('div');
    d.className = 'faq-item';
    d.innerHTML = `<div class="faq-question">${item.q} <i class="fas fa-chevron-down"></i></div>
                   <div class="faq-answer">${item.a}</div>`;
    d.addEventListener('click', () => d.classList.toggle('active'));
    list.appendChild(d);
  });
}

// =============================================================
//   AGENCIES PAGE
// =============================================================
async function initAgencies() {
  await loadDB();
  const params = getParams();
  const wilaya = params.get('wilaya');
  // heading
  const title = document.getElementById('agencies-title');
  if (title) title.textContent = t('agencies_in').replace('{w}', wilayaLabel(wilaya));

  // summary line
  const summary = document.getElementById('search-summary');
  if (summary) {
    const parts = [];
    const h = params.get('hour'), m = params.get('min'), ap = params.get('ampm');
    if (h) parts.push(`${h}:${m} ${ap}`);
    const fr = params.get('from'), to = params.get('to');
    if (fr && to) parts.push(`${fmtDate(fr)} – ${fmtDate(to)}`);
    summary.textContent = parts.join('  •  ');
  }

  // filter cars by wilaya
  const carsInWilaya = db.cars.filter(c => c.wilaya === wilaya);

  // get unique agency names present
  const agencyNames = [...new Set(carsInWilaya.map(c => c.agency))];

  const container = document.getElementById('agencies-container');
  const empty      = document.getElementById('empty-agencies');

  if (!container) return;
  container.innerHTML = '';

  if (agencyNames.length === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  agencyNames.forEach(name => {
    const agencyData = db.agencies.find(a => a.name === name) || { name, rating: 4, reviewCount: 0, description:{en:'',ar:'',fr:''} };
    const count = carsInWilaya.filter(c => c.agency === name).length;
    const rating = agencyData.rating || 4;
    const desc = (agencyData.description && agencyData.description[currentLang]) || '';

    const card = document.createElement('a');
    card.className = 'agency-card';
    // build href cleanly — no duplicate keys
    const carParams = new URLSearchParams();
    carParams.set('agency', name);
    ['wilaya','hour','min','ampm','from','to'].forEach(k => { if (params.get(k)) carParams.set(k, params.get(k)); });
    card.href = `cars.html?${carParams}`;
    card.innerHTML = `
      <div class="agency-card-header">
        <div class="agency-icon"><i class="fas fa-building"></i></div>
        <div>
          <h3>${name}</h3>
          <div class="agency-stars">
            ${starsHTML(rating)}
            <span class="stars-label">${rating.toFixed(1)} (${agencyData.reviewCount || 0})</span>
          </div>
        </div>
      </div>
      <p class="agency-desc">${desc}</p>
      <div class="agency-meta">
        <span><i class="fas fa-car"></i> ${t('cars_available').replace('{n}', count)}</span>
      </div>
      <div class="agency-cta">${t('see_cars')} <i class="fas fa-chevron-right"></i></div>
    `;
    container.appendChild(card);
  });
}

// =============================================================
//   CARS PAGE
// =============================================================
let pendingMailto = '';  // used by rent modal

async function initCars() {
  await loadDB();
  const params  = getParams();
  const agency  = params.get('agency');
  const wilaya  = params.get('wilaya');

  // back button → agencies page with same search params
  const backBtn = document.getElementById('cars-back-btn');
  if (backBtn) {
    const backParams = new URLSearchParams();
    ['wilaya','hour','min','ampm','from','to'].forEach(k => { if (params.get(k)) backParams.set(k, params.get(k)); });
    backBtn.href = `agencies.html?${backParams}`;
  }

  // page title
  const pageTitle = document.getElementById('cars-page-title');
  if (pageTitle) pageTitle.textContent = t('cars_at').replace('{a}', agency || '');

  // populate filter options (translated)
  populateFilterOptions();

  // filter setup
  const filterIds = ['filter-price','filter-seats','filter-engine','filter-bag','filter-km','filter-trans','filter-chauffeur'];
  filterIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', renderFilteredCars);
  });

  renderFilteredCars();
}

function populateFilterOptions() {
  const map = {
    'filter-price':   [['all',t('filter_price')],['low',t('filter_price_low')],['high',t('filter_price_high')]],
    'filter-seats':   [['all',t('filter_seats')],['4',t('filter_seats_4')],['5',t('filter_seats_5')],['7',t('filter_seats_7')]],
    'filter-engine':  [['all',t('filter_engine')],['1.0','1.0L'],['1.2','1.2L'],['1.5','1.5L'],['1.6','1.6L'],['2.0','2.0L+']],
    'filter-bag':     [['all',t('filter_bag')],['small',t('filter_bag_small')],['medium',t('filter_bag_medium')],['large',t('filter_bag_large')]],
    'filter-km':      [['all',t('filter_km')],['new',t('filter_km_new')],['used',t('filter_km_used')]],
    'filter-trans':   [['all',t('filter_trans')],['Manual',t('filter_trans_manual')],['Automatic',t('filter_trans_automatic')]],
    'filter-chauffeur': [['all',t('filter_chauffeur')],['avec',t('filter_chauffeur_avec')],['sans',t('filter_chauffeur_sans')]]
  };
  Object.entries(map).forEach(([id, opts]) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prev = el.value;
    el.innerHTML = opts.map(([v,l]) => `<option value="${v}">${l}</option>`).join('');
    if (opts.some(o => o[0] === prev)) el.value = prev;
  });
}

function renderFilteredCars() {
  const params = getParams();
  const agency = params.get('agency');
  const wilaya = params.get('wilaya');

  let cars = db.cars.filter(c => {
    if (agency && c.agency !== agency) return false;
    if (wilaya && c.wilaya !== wilaya) return false;
    return true;
  });

  // apply filters
  const price = document.getElementById('filter-price')?.value;
  if (price === 'low')  cars = cars.filter(c => c.price <= 5000);
  if (price === 'high') cars = cars.filter(c => c.price > 5000);

  const seats = document.getElementById('filter-seats')?.value;
  if (seats === '4') cars = cars.filter(c => c.seats === 4);
  if (seats === '5') cars = cars.filter(c => c.seats === 5);
  if (seats === '7') cars = cars.filter(c => c.seats >= 7);

  const engine = document.getElementById('filter-engine')?.value;
  if (engine && engine !== 'all') {
    if (engine === '2.0') cars = cars.filter(c => parseFloat(c.engine) >= 2.0);
    else cars = cars.filter(c => c.engine.startsWith(engine));
  }

  const bag = document.getElementById('filter-bag')?.value;
  if (bag && bag !== 'all') cars = cars.filter(c => c.bag === bag);

  const km = document.getElementById('filter-km')?.value;
  if (km === 'new')  cars = cars.filter(c => c.km < 50000);
  if (km === 'used') cars = cars.filter(c => c.km >= 50000);

  const trans = document.getElementById('filter-trans')?.value;
  if (trans && trans !== 'all') cars = cars.filter(c => c.trans === trans);

  const chauf = document.getElementById('filter-chauffeur')?.value;
  if (chauf && chauf !== 'all') cars = cars.filter(c => c.chauffeur === chauf);

  // render
  const container = document.getElementById('cars-container');
  if (!container) return;
  container.innerHTML = '';

  if (cars.length === 0) {
    container.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <i class="fas fa-car"></i><h3>${t('no_cars_found')}</h3></div>`;
    return;
  }

  cars.forEach(car => {
    const loc = car.wilayaName ? (car.wilayaName[currentLang] || car.wilayaName.en) : '';
    const chaufLabel = car.chauffeur === 'avec' ? t('chauffeur_avec') : t('chauffeur_sans');
    const chaufIcon  = car.chauffeur === 'avec' ? 'fa-user-tie' : 'fa-user-times';

    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.image}" class="car-img" alt="${car.name}" loading="lazy">
      <div class="car-info">
        <h3>${car.name}</h3>
        <p class="car-agency"><i class="fas fa-building"></i> ${car.agency}</p>
        <p class="car-location"><i class="fas fa-map-marker-alt"></i> ${loc}</p>
        <div class="car-stats">
          <span><i class="fas fa-chair"></i> ${car.seats} ${t('seats')}</span>
          <span><i class="fas fa-cogs"></i> ${car.engine}</span>
          <span><i class="fas fa-suitcase"></i> ${car.bag}</span>
          <span><i class="fas fa-tachometer-alt"></i> ${car.km.toLocaleString()} km</span>
          <span><i class="fas fa-star"></i> ${car.state}/10</span>
          <span><i class="fas fa-exchange-alt"></i> ${car.trans}</span>
          <span><i class="fas ${chaufIcon}"></i> ${chaufLabel}</span>
          <span><i class="fas fa-calendar-alt"></i> ${fmtDate(car.availableFrom)}</span>
        </div>
        <p class="car-avail"><i class="fas fa-circle"></i> ${t('avail_from')} ${fmtDate(car.availableFrom)} – ${fmtDate(car.availableTo)}</p>
        <div class="car-price-row">
          <span class="car-price">${car.price.toLocaleString()} DZD <span class="per-day">${t('per_day')}</span></span>
          <div class="car-btns">
            <button class="rent-btn" data-email="${car.ownerEmail}" data-name="${car.name}">${t('rent_now')}</button>
            <button class="pay-btn">${t('pay_now')}</button>
          </div>
        </div>
      </div>`;
    container.appendChild(card);
  });

  // wire buttons
  container.querySelectorAll('.rent-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.dataset.email;
      const name  = btn.dataset.name;
      pendingMailto = `mailto:${email}?subject=${encodeURIComponent('Rent Request – ' + name)}&body=${encodeURIComponent('Hello,\n\nI am interested in renting the ' + name + '.\n\nPlease let me know the next steps.\n\nThank you.')}`;
      document.getElementById('rent-modal').classList.add('open');
    });
  });

  container.querySelectorAll('.pay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('pay-modal').classList.add('open');
    });
  });
}

// ── Modal wiring (cars page) ────────────────────────────────
function initModals() {
  // Rent confirm
  const rConfirm = document.getElementById('rent-confirm');
  if (rConfirm) {
    rConfirm.addEventListener('click', () => {
      document.getElementById('rent-modal').classList.remove('open');
      if (pendingMailto) { window.location.href = pendingMailto; pendingMailto = ''; }
    });
  }
  const rCancel = document.getElementById('rent-cancel');
  if (rCancel) rCancel.addEventListener('click', () => document.getElementById('rent-modal').classList.remove('open'));

  // close rent modal on overlay click
  const rModal = document.getElementById('rent-modal');
  if (rModal) rModal.addEventListener('click', e => { if (e.target === rModal) rModal.classList.remove('open'); });

  // Pay ok
  const pOk = document.getElementById('pay-ok');
  if (pOk) pOk.addEventListener('click', () => document.getElementById('pay-modal').classList.remove('open'));

  const pModal = document.getElementById('pay-modal');
  if (pModal) pModal.addEventListener('click', e => { if (e.target === pModal) pModal.classList.remove('open'); });
}

// ── Contact placeholders ────────────────────────────────────
function updateContactPlaceholders() {
  const map = { name:'your_name', phone:'phone_number', email:'email_address' };
  Object.entries(map).forEach(([n,k]) => {
    const el = document.querySelector(`input[name="${n}"]`);
    if (el) el.placeholder = t(k);
  });
  const ta = document.querySelector('textarea[name="message"]');
  if (ta) ta.placeholder = t('your_message');
}

// =============================================================
//   BOOT
// =============================================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadDB();

  initTheme();
  initHamburger();
  initLangSwitch();
  applyTranslations();
  updateContactPlaceholders();

  // page detection
  const path = window.location.pathname.split('/').pop();
  if (path === 'index.html' || path === '')    initIndex();
  if (path === 'agencies.html')                initAgencies();
  if (path === 'cars.html')                    { initCars(); initModals(); }
});