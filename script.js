// --- Configuration ---
const USE_JSON_DATABASE = true; // Set to true to load from JSON file
const JSON_DATABASE_PATH = 'cars-database.json';

// --- Backup/Fallback Database ---
let carDatabase = [];

// --- Wilayas with translations ---
const wilayasData = {
    en: [
        "01 Adrar", "02 Chlef", "03 Laghouat", "04 Oum El Bouaghi", "05 Batna", "06 Béjaïa", "07 Biskra", "08 Béchar", "09 Blida", "10 Bouira",
        "11 Tamanrasset", "12 Tébessa", "13 Tlemcen", "14 Tiaret", "15 Tizi Ouzou", "16 Algiers", "17 Djelfa", "18 Jijel", "19 Sétif", "20 Saïda",
        "21 Skikda", "22 Sidi Bel Abbès", "23 Annaba", "24 Guelma", "25 Constantine", "26 Médéa", "27 Mostaganem", "28 M'Sila", "29 Mascara", "30 Ouargla",
        "31 Oran", "32 El Bayadh", "33 Illizi", "34 Bordj Bou Arréridj", "35 Boumerdès", "36 El Tarf", "37 Tindouf", "38 Tissemsilt", "39 El Oued", "40 Khenchela",
        "41 Souk Ahras", "42 Tipaza", "43 Mila", "44 Aïn Defla", "45 Naâma", "46 Aïn Témouchent", "47 Ghardaïa", "48 Relizane", "49 Timimoun", "50 Bordj Badji Mokhtar",
        "51 Ouled Djellal", "52 Béni Abbès", "53 In Salah", "54 In Guezzam", "55 Touggourt", "56 Djanet", "57 El M'Ghair", "58 El Meniaa",
        "59 New Region 1", "60 New Region 2", "61 New Region 3", "62 New Region 4", "63 New Region 5", "64 New Region 6", "65 New Region 7", "66 New Region 8", "67 New Region 9", "68 New Region 10", "69 New Region 11"
    ],
    ar: [
        "01 أدرار", "02 الشلف", "03 الأغواط", "04 أم البواقي", "05 باتنة", "06 بجاية", "07 بسكرة", "08 بشار", "09 البليدة", "10 البويرة",
        "11 تمنراست", "12 تبسة", "13 تلمسان", "14 تيارت", "15 تيزي وزو", "16 الجزائر", "17 الجلفة", "18 جيجل", "19 سطيف", "20 سعيدة",
        "21 سكيكدة", "22 سيدي بلعباس", "23 عنابة", "24 قالمة", "25 قسنطينة", "26 المدية", "27 مستغانم", "28 المسيلة", "29 معسكر", "30 ورقلة",
        "31 وهران", "32 البيض", "33 إليزي", "34 برج بوعريريج", "35 بومرداس", "36 الطارف", "37 تندوف", "38 تيسمسيلت", "39 الوادي", "40 خنشلة",
        "41 سوق أهراس", "42 تيبازة", "43 ميلة", "44 عين الدفلى", "45 النعامة", "46 عين تموشنت", "47 غرداية", "48 غليزان", "49 تيميمون", "50 برج باجي مختار",
        "51 أولاد جلال", "52 بني عباس", "53 عين صالح", "54 عين قزام", "55 تقرت", "56 جانت", "57 المغير", "58 المنيعة",
        "59 منطقة جديدة 1", "60 منطقة جديدة 2", "61 منطقة جديدة 3", "62 منطقة جديدة 4", "63 منطقة جديدة 5", "64 منطقة جديدة 6", "65 منطقة جديدة 7", "66 منطقة جديدة 8", "67 منطقة جديدة 9", "68 منطقة جديدة 10", "69 منطقة جديدة 11"
    ],
    fr: [
        "01 Adrar", "02 Chlef", "03 Laghouat", "04 Oum El Bouaghi", "05 Batna", "06 Béjaïa", "07 Biskra", "08 Béchar", "09 Blida", "10 Bouira",
        "11 Tamanrasset", "12 Tébessa", "13 Tlemcen", "14 Tiaret", "15 Tizi Ouzou", "16 Alger", "17 Djelfa", "18 Jijel", "19 Sétif", "20 Saïda",
        "21 Skikda", "22 Sidi Bel Abbès", "23 Annaba", "24 Guelma", "25 Constantine", "26 Médéa", "27 Mostaganem", "28 M'Sila", "29 Mascara", "30 Ouargla",
        "31 Oran", "32 El Bayadh", "33 Illizi", "34 Bordj Bou Arréridj", "35 Boumerdès", "36 El Tarf", "37 Tindouf", "38 Tissemsilt", "39 El Oued", "40 Khenchela",
        "41 Souk Ahras", "42 Tipaza", "43 Mila", "44 Aïn Defla", "45 Naâma", "46 Aïn Témouchent", "47 Ghardaïa", "48 Relizane", "49 Timimoun", "50 Bordj Badji Mokhtar",
        "51 Ouled Djellal", "52 Béni Abbès", "53 In Salah", "54 In Guezzam", "55 Touggourt", "56 Djanet", "57 El M'Ghair", "58 El Meniaa",
        "59 Nouvelle Région 1", "60 Nouvelle Région 2", "61 Nouvelle Région 3", "62 Nouvelle Région 4", "63 Nouvelle Région 5", "64 Nouvelle Région 6", "65 Nouvelle Région 7", "66 Nouvelle Région 8", "67 Nouvelle Région 9", "68 Nouvelle Région 10", "69 Nouvelle Région 11"
    ]
};

const translations = {
    en: {
        hero_text: "Rent your car easily with Loc.dz",
        feat_easy: "Easy Renting",
        feat_wilaya: "All 69 Wilayas",
        feat_free: "Free Service",
        choose_wilaya: "Select Wilaya...",
        search: "Search",
        faq_title: "Frequently Asked Questions",
        contact_btn: "Contact Us",
        disclaimer: "We do not take responsibility for anything that happens after the contact. We simply are a link between someone who wants to rent a car and a car owner who wants to put his car for rental.",
        owner_text: "If you want to put your car for rental please",
        contact: "Contact Us",
        // Results page
        filter_price: "Any Price",
        filter_price_low: "Under 5000 DZD",
        filter_price_high: "Over 5000 DZD",
        filter_seats: "Any Seats",
        filter_seats_4: "4 Seats",
        filter_seats_5: "5 Seats",
        filter_seats_7: "7+ Seats",
        filter_engine: "Any Engine",
        filter_bag: "Bag Size",
        filter_bag_small: "Small",
        filter_bag_medium: "Medium",
        filter_bag_large: "Large",
        filter_km: "Mileage",
        filter_km_new: "New (< 50k)",
        filter_km_used: "Used (> 50k)",
        filter_trans: "Transmission",
        filter_trans_manual: "Manual",
        filter_trans_automatic: "Automatic",
        filter_agency: "All Agencies",
        filter_wilaya: "All Wilayas",
        seats: "Seats",
        rent_now: "Rent Now",
        per_day: "/ day",
        no_cars_found: "No cars found matching your criteria",
        agency: "Agency",
        location: "Location",
        // Contact page
        contact_title: "Get in Touch",
        contact_subtitle: "We are here to help you.",
        your_name: "Your Name",
        phone_number: "Phone Number",
        email_address: "Email Address",
        your_message: "Your Message",
        send_message: "Send Message",
        home: "Home"
    },
    ar: {
        hero_text: "أجر سيارتك بسهولة مع Loc.dz",
        feat_easy: "سهولة التأجير",
        feat_wilaya: "كل 69 ولاية",
        feat_free: "خدمة مجانية",
        choose_wilaya: "اختر الولاية...",
        search: "بحث",
        faq_title: "الأسئلة الشائعة",
        contact_btn: "اتصل بنا",
        disclaimer: "نحن لا نتحمل مسؤولية أي شيء يحدث بعد التواصل. نحن فقط نربط بين المستأجر ومالك السيارة.",
        owner_text: "إذا كنت ترغب في عرض سيارتك للإيجار",
        contact: "اتصل بنا",
        // Results page
        filter_price: "أي سعر",
        filter_price_low: "أقل من 5000 دج",
        filter_price_high: "أكثر من 5000 دج",
        filter_seats: "أي مقاعد",
        filter_seats_4: "4 مقاعد",
        filter_seats_5: "5 مقاعد",
        filter_seats_7: "7+ مقاعد",
        filter_engine: "أي محرك",
        filter_bag: "حجم الحقيبة",
        filter_bag_small: "صغيرة",
        filter_bag_medium: "متوسطة",
        filter_bag_large: "كبيرة",
        filter_km: "المسافة المقطوعة",
        filter_km_new: "جديدة (< 50 ألف)",
        filter_km_used: "مستعملة (> 50 ألف)",
        filter_trans: "ناقل الحركة",
        filter_trans_manual: "يدوي",
        filter_trans_automatic: "أوتوماتيك",
        filter_agency: "جميع الوكالات",
        filter_wilaya: "جميع الولايات",
        seats: "مقاعد",
        rent_now: "استأجر الآن",
        per_day: "/ يوم",
        no_cars_found: "لم يتم العثور على سيارات تطابق معاييرك",
        agency: "الوكالة",
        location: "الموقع",
        // Contact page
        contact_title: "تواصل معنا",
        contact_subtitle: "نحن هنا لمساعدتك.",
        your_name: "اسمك",
        phone_number: "رقم الهاتف",
        email_address: "البريد الإلكتروني",
        your_message: "رسالتك",
        send_message: "إرسال الرسالة",
        home: "الرئيسية"
    },
    fr: {
        hero_text: "Louez votre voiture facilement avec Loc.dz",
        feat_easy: "Location facile",
        feat_wilaya: "Toutes les 69 wilayas",
        feat_free: "Service gratuit",
        choose_wilaya: "Choisir la wilaya...",
        search: "Rechercher",
        faq_title: "Questions fréquentes",
        contact_btn: "Contactez-nous",
        disclaimer: "Nous ne sommes pas responsables après le contact. Nous relions simplement les locataires et les propriétaires.",
        owner_text: "Si vous voulez mettre votre voiture en location",
        contact: "Contactez-nous",
        // Results page
        filter_price: "Tous les prix",
        filter_price_low: "Moins de 5000 DZD",
        filter_price_high: "Plus de 5000 DZD",
        filter_seats: "Tous les sièges",
        filter_seats_4: "4 sièges",
        filter_seats_5: "5 sièges",
        filter_seats_7: "7+ sièges",
        filter_engine: "Tous les moteurs",
        filter_bag: "Taille de bagage",
        filter_bag_small: "Petit",
        filter_bag_medium: "Moyen",
        filter_bag_large: "Grand",
        filter_km: "Kilométrage",
        filter_km_new: "Neuf (< 50k)",
        filter_km_used: "Utilisé (> 50k)",
        filter_trans: "Transmission",
        filter_trans_manual: "Manuelle",
        filter_trans_automatic: "Automatique",
        filter_agency: "Toutes les agences",
        filter_wilaya: "Toutes les wilayas",
        seats: "Sièges",
        rent_now: "Louer maintenant",
        per_day: "/ jour",
        no_cars_found: "Aucune voiture trouvée correspondant à vos critères",
        agency: "Agence",
        location: "Emplacement",
        // Contact page
        contact_title: "Contactez-nous",
        contact_subtitle: "Nous sommes là pour vous aider.",
        your_name: "Votre nom",
        phone_number: "Numéro de téléphone",
        email_address: "Adresse e-mail",
        your_message: "Votre message",
        send_message: "Envoyer le message",
        home: "Accueil"
    }
};

// --- FAQ Data with translations ---
const faqData = {
    en: [
        { q: "How do I rent a car?", a: "Search for a car, contact the owner by email, and arrange the rental directly." },
        { q: "What are the conditions?", a: "You must be 18+ and have a valid driving license." },
        { q: "How do I find the cheapest car?", a: "Use filters on the results page to sort by price." }
    ],
    ar: [
        { q: "كيف أستأجر سيارة؟", a: "ابحث عن سيارة وتواصل مع المالك عبر البريد الإلكتروني لترتيب الإيجار." },
        { q: "ما هي الشروط؟", a: "يجب أن يكون عمرك 18 سنة أو أكثر ولديك رخصة قيادة صالحة." },
        { q: "كيف أجد أرخص سيارة؟", a: "استخدم الفلاتر في صفحة النتائج للفرز حسب السعر." }
    ],
    fr: [
        { q: "Comment louer une voiture ?", a: "Cherchez une voiture et contactez le propriétaire par email pour organiser la location." },
        { q: "Quelles sont les conditions ?", a: "Vous devez avoir 18 ans ou plus et un permis de conduire valide." },
        { q: "Comment trouver la voiture la moins chère ?", a: "Utilisez les filtres sur la page de résultats pour trier par prix." }
    ]
};

// Global variables
let currentLang = 'en';
let allCars = []; // Store all cars for filtering
let currentFilters = {}; // Store current filter values
let selectedWilaya = null; // Store selected wilaya from URL

// Load cars from JSON file
async function loadCarsFromJSON() {
    try {
        const response = await fetch(JSON_DATABASE_PATH);
        const data = await response.json();
        carDatabase = data.cars || [];
        console.log('Loaded', carDatabase.length, 'cars from JSON database');
        return carDatabase;
    } catch (error) {
        console.error('Error loading cars from JSON:', error);
        console.log('Using empty database');
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    
    // Load cars from JSON if enabled
    if (USE_JSON_DATABASE) {
        await loadCarsFromJSON();
    }
    
    // 1. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = themeBtn.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

    // 2. Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. Wilaya Population
    const wilayaSelect = document.getElementById('wilaya-select');
    if(wilayaSelect) {
        populateWilayas(currentLang);

        document.getElementById('search-btn').addEventListener('click', () => {
            const val = wilayaSelect.value;
            if(!val) {
                wilayaSelect.style.border = "2px solid red";
                return;
            }
            window.location.href = `results.html?wilaya=${val}`;
        });
    }

    // 4. FAQ Generation
    const faqList = document.querySelector('.faq-list');
    if(faqList) {
        renderFAQ(currentLang);
    }

    // 5. Results Page Logic
    const carsContainer = document.getElementById('cars-container');
    if(carsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        selectedWilaya = urlParams.get('wilaya');
        
        // Initial filtering by wilaya - ONLY show cars from selected wilaya
        if(selectedWilaya) {
            allCars = carDatabase.filter(c => c.wilaya === selectedWilaya);
            console.log(`Filtered to ${allCars.length} cars in wilaya ${selectedWilaya}`);
        } else {
            // If no wilaya selected, show all cars
            allCars = [...carDatabase];
        }

        // Populate filters
        populateAgencyFilter();
        populateWilayaFilter();

        // Render initial cars
        renderCars(allCars);

        // Set up all filter listeners
        setupFilters();
    }

    // 6. Language Translation
    const langSelect = document.getElementById('lang-select');
    if(langSelect) {
        langSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            currentLang = lang;
            document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
            
            // Update static text
            document.querySelectorAll('[data-key]').forEach(el => {
                const key = el.getAttribute('data-key');
                if(translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });
            
            // Update hero text with gradient
            const heroText = document.querySelector('h1[data-key="hero_text"]');
            if(heroText) {
                heroText.innerHTML = `${translations[lang].hero_text.replace('Loc.dz', '<span class="gradient-text">Loc.dz</span>')}`;
            }

            // Re-populate wilayas
            if(wilayaSelect) {
                populateWilayas(lang);
            }

            // Re-render FAQ
            const faqList = document.querySelector('.faq-list');
            if(faqList) {
                renderFAQ(lang);
            }

            // Update filter options on results page
            updateFilterOptions(lang);

            // Re-render cars if on results page
            if(carsContainer) {
                applyFilters();
            }

            // Update input placeholders on contact page
            updateContactFormPlaceholders(lang);
        });
    }
});

// --- Advanced Filtering Functions ---

function setupFilters() {
    const filterElements = [
        'filter-price',
        'filter-seats',
        'filter-engine',
        'filter-bag',
        'filter-km',
        'filter-trans',
        'filter-agency',
        'filter-wilaya-results'
    ];

    filterElements.forEach(filterId => {
        const filterEl = document.getElementById(filterId);
        if(filterEl) {
            filterEl.addEventListener('change', (e) => {
                currentFilters[filterId] = e.target.value;
                applyFilters();
            });
        }
    });
}

function applyFilters() {
    // Start with cars from selected wilaya (or all cars if no wilaya selected)
    let filtered = selectedWilaya 
        ? carDatabase.filter(c => c.wilaya === selectedWilaya)
        : [...carDatabase];

    // Apply wilaya filter (additional filter on results page)
    if(currentFilters['filter-wilaya-results'] && currentFilters['filter-wilaya-results'] !== 'all') {
        filtered = filtered.filter(c => c.wilaya === currentFilters['filter-wilaya-results']);
    }

    // Price filter
    if(currentFilters['filter-price'] === 'low') {
        filtered = filtered.filter(c => c.price <= 5000);
    } else if(currentFilters['filter-price'] === 'high') {
        filtered = filtered.filter(c => c.price > 5000);
    }

    // Seats filter
    if(currentFilters['filter-seats']) {
        const seatsVal = currentFilters['filter-seats'];
        if(seatsVal === '4') {
            filtered = filtered.filter(c => c.seats === 4);
        } else if(seatsVal === '5') {
            filtered = filtered.filter(c => c.seats === 5);
        } else if(seatsVal === '7') {
            filtered = filtered.filter(c => c.seats >= 7);
        }
    }

    // Engine filter
    if(currentFilters['filter-engine']) {
        const engineVal = currentFilters['filter-engine'];
        if(engineVal !== 'all') {
            if(engineVal === '2.0') {
                filtered = filtered.filter(c => {
                    const size = parseFloat(c.engine);
                    return size >= 2.0;
                });
            } else {
                filtered = filtered.filter(c => c.engine.startsWith(engineVal));
            }
        }
    }

    // Bag filter
    if(currentFilters['filter-bag'] && currentFilters['filter-bag'] !== 'all') {
        filtered = filtered.filter(c => c.bag === currentFilters['filter-bag']);
    }

    // Mileage filter
    if(currentFilters['filter-km']) {
        if(currentFilters['filter-km'] === 'new') {
            filtered = filtered.filter(c => c.km < 50000);
        } else if(currentFilters['filter-km'] === 'used') {
            filtered = filtered.filter(c => c.km >= 50000);
        }
    }

    // Transmission filter
    if(currentFilters['filter-trans'] && currentFilters['filter-trans'] !== 'all') {
        filtered = filtered.filter(c => c.trans === currentFilters['filter-trans']);
    }

    // Agency filter
    if(currentFilters['filter-agency'] && currentFilters['filter-agency'] !== 'all') {
        filtered = filtered.filter(c => c.agency === currentFilters['filter-agency']);
    }

    renderCars(filtered);
}

function renderCars(cars) {
    const carsContainer = document.getElementById('cars-container');
    if(!carsContainer) return;

    carsContainer.innerHTML = '';

    if(cars.length === 0) {
        carsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-car" style="font-size: 4rem; color: var(--teal-blue); margin-bottom: 1rem;"></i>
                <h3>${translations[currentLang].no_cars_found}</h3>
            </div>
        `;
        return;
    }

    cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        
        // Get wilaya name for display
        const wilayaName = car.wilayaName ? car.wilayaName[currentLang] : 'N/A';
        
        card.innerHTML = `
            <img src="${car.image}" class="car-img" alt="${car.name}">
            <div class="car-info">
                <h3>${car.name}</h3>
                <p class="car-agency"><i class="fas fa-building"></i> ${car.agency}</p>
                <p class="car-location"><i class="fas fa-map-marker-alt"></i> ${wilayaName}</p>
                <div class="car-stats">
                    <span><i class="fas fa-chair"></i> ${car.seats} <span class="translatable">${translations[currentLang].seats}</span></span>
                    <span><i class="fas fa-cogs"></i> ${car.engine}</span>
                    <span><i class="fas fa-suitcase"></i> ${car.bag}</span>
                    <span><i class="fas fa-tachometer-alt"></i> ${car.km.toLocaleString()} km</span>
                    <span><i class="fas fa-star"></i> ${car.state}/10</span>
                    <span><i class="fas fa-exchange-alt"></i> ${car.trans}</span>
                </div>
                <h3 style="color:var(--teal-blue)">${car.price.toLocaleString()} DZD <span class="translatable">${translations[currentLang].per_day}</span></h3>
                <a href="mailto:${car.ownerEmail}?subject=Rent Request for ${car.name}" class="rent-btn translatable">${translations[currentLang].rent_now}</a>
            </div>
        `;
        carsContainer.appendChild(card);
    });
}

function populateAgencyFilter() {
    const agencyFilter = document.getElementById('filter-agency');
    if(!agencyFilter) return;

    // Get unique agencies from current filtered cars (or all if no wilaya selected)
    const relevantCars = selectedWilaya 
        ? carDatabase.filter(c => c.wilaya === selectedWilaya)
        : carDatabase;
    const agencies = [...new Set(relevantCars.map(c => c.agency))].sort();
    
    agencyFilter.innerHTML = `<option value="all">${translations[currentLang].filter_agency}</option>`;
    agencies.forEach(agency => {
        const opt = document.createElement('option');
        opt.value = agency;
        opt.textContent = agency;
        agencyFilter.appendChild(opt);
    });
}

function populateWilayaFilter() {
    const wilayaFilter = document.getElementById('filter-wilaya-results');
    if(!wilayaFilter) return;

    // Get unique wilayas from cars
    const wilayas = [...new Set(carDatabase.map(c => c.wilaya))].sort();
    
    wilayaFilter.innerHTML = `<option value="all">${translations[currentLang].filter_wilaya}</option>`;
    wilayas.forEach(wilayaCode => {
        const wilayaData = wilayasData[currentLang].find(w => w.startsWith(wilayaCode + ' '));
        if(wilayaData) {
            const opt = document.createElement('option');
            opt.value = wilayaCode;
            opt.textContent = wilayaData;
            wilayaFilter.appendChild(opt);
        }
    });
}

// Function to populate wilayas based on language
function populateWilayas(lang) {
    const wilayaSelect = document.getElementById('wilaya-select');
    if(!wilayaSelect) return;

    wilayaSelect.innerHTML = `<option value="" disabled selected>${translations[lang].choose_wilaya}</option>`;

    wilayasData[lang].forEach(w => {
        let opt = document.createElement('option');
        opt.value = w.split(' ')[0];
        opt.textContent = w;
        wilayaSelect.appendChild(opt);
    });
}

// Function to render FAQ based on language
function renderFAQ(lang) {
    const faqList = document.querySelector('.faq-list');
    if(!faqList) return;

    faqList.innerHTML = '';
    faqData[lang].forEach(item => {
        const div = document.createElement('div');
        div.className = 'faq-item';
        div.innerHTML = `
            <div class="faq-question">
                ${item.q} <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">${item.a}</div>
        `;
        div.addEventListener('click', () => {
            div.classList.toggle('active');
        });
        faqList.appendChild(div);
    });
}

// Function to update filter options on results page
function updateFilterOptions(lang) {
    const filterPrice = document.getElementById('filter-price');
    if(filterPrice) {
        const currentVal = filterPrice.value;
        filterPrice.innerHTML = `
            <option value="all">${translations[lang].filter_price}</option>
            <option value="low">${translations[lang].filter_price_low}</option>
            <option value="high">${translations[lang].filter_price_high}</option>
        `;
        filterPrice.value = currentVal;
    }

    const filterSeats = document.getElementById('filter-seats');
    if(filterSeats) {
        const currentVal = filterSeats.value;
        filterSeats.innerHTML = `
            <option value="all">${translations[lang].filter_seats}</option>
            <option value="4">${translations[lang].filter_seats_4}</option>
            <option value="5">${translations[lang].filter_seats_5}</option>
            <option value="7">${translations[lang].filter_seats_7}</option>
        `;
        filterSeats.value = currentVal;
    }

    const filterEngine = document.getElementById('filter-engine');
    if(filterEngine) {
        const currentVal = filterEngine.value;
        filterEngine.innerHTML = `
            <option value="all">${translations[lang].filter_engine}</option>
            <option value="1.0">1.0L</option>
            <option value="1.2">1.2L</option>
            <option value="1.5">1.5L</option>
            <option value="1.6">1.6L</option>
            <option value="2.0">2.0L+</option>
        `;
        filterEngine.value = currentVal;
    }

    const filterBag = document.getElementById('filter-bag');
    if(filterBag) {
        const currentVal = filterBag.value;
        filterBag.innerHTML = `
            <option value="all">${translations[lang].filter_bag}</option>
            <option value="small">${translations[lang].filter_bag_small}</option>
            <option value="medium">${translations[lang].filter_bag_medium}</option>
            <option value="large">${translations[lang].filter_bag_large}</option>
        `;
        filterBag.value = currentVal;
    }

    const filterKm = document.getElementById('filter-km');
    if(filterKm) {
        const currentVal = filterKm.value;
        filterKm.innerHTML = `
            <option value="all">${translations[lang].filter_km}</option>
            <option value="new">${translations[lang].filter_km_new}</option>
            <option value="used">${translations[lang].filter_km_used}</option>
        `;
        filterKm.value = currentVal;
    }

    const filterTrans = document.getElementById('filter-trans');
    if(filterTrans) {
        const currentVal = filterTrans.value;
        filterTrans.innerHTML = `
            <option value="all">${translations[lang].filter_trans}</option>
            <option value="Manual">${translations[lang].filter_trans_manual}</option>
            <option value="Automatic">${translations[lang].filter_trans_automatic}</option>
        `;
        filterTrans.value = currentVal;
    }

    // Update agency and wilaya filters
    populateAgencyFilter();
    populateWilayaFilter();
}

// Function to update contact form placeholders
function updateContactFormPlaceholders(lang) {
    const nameInput = document.querySelector('input[name="name"]');
    if(nameInput) nameInput.placeholder = translations[lang].your_name;

    const phoneInput = document.querySelector('input[name="phone"]');
    if(phoneInput) phoneInput.placeholder = translations[lang].phone_number;

    const emailInput = document.querySelector('input[name="email"]');
    if(emailInput) emailInput.placeholder = translations[lang].email_address;

    const messageTextarea = document.querySelector('textarea[name="message"]');
    if(messageTextarea) messageTextarea.placeholder = translations[lang].your_message;
}