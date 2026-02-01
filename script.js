// --- Mock Database (Simulating Backend) ---
const carDatabase = [
    { id: 1, name: "Renault Clio 4", seats: 5, engine: "1.2L", bag: "small", trans: "Manual", state: 9, km: 45000, price: 4000, wilaya: "16", ownerEmail: "owner1@gmail.com" },
    { id: 2, name: "Volkswagen Golf 7", seats: 5, engine: "2.0L", bag: "small", trans: "Automatic", state: 10, km: 12000, price: 8000, wilaya: "16", ownerEmail: "owner2@gmail.com" },
    { id: 3, name: "Toyota Hilux", seats: 5, engine: "2.8L", bag: "large", trans: "Manual", state: 8, km: 120000, price: 9000, wilaya: "31", ownerEmail: "owner3@gmail.com" },
    { id: 4, name: "Hyundai Accent", seats: 5, engine: "1.6L", bag: "small", trans: "Automatic", state: 8, km: 80000, price: 5000, wilaya: "06", ownerEmail: "owner4@gmail.com" },
    { id: 5, name: "Skoda Fabia", seats: 5, engine: "1.2L", bag: "small", trans: "Manual", state: 9, km: 30000, price: 4500, wilaya: "16", ownerEmail: "owner5@gmail.com" },
    { id: 6, name: "Kia Picanto", seats: 4, engine: "1.0L", bag: "small", trans: "Automatic", state: 10, km: 5000, price: 3500, wilaya: "31", ownerEmail: "owner6@gmail.com" },
];

// --- Translations ---
const translations = {
    en: {
        hero_text: "Rent your car easily with Startup",
        feat_easy: "Easy Renting",
        feat_wilaya: "All 69 Wilayas",
        feat_free: "Free Service",
        choose_wilaya: "Select Wilaya...",
        search: "Search",
        faq_title: "Frequently Asked Questions",
        contact_btn: "Contact Us",
        disclaimer: "We do not take responsibility for anything that happens after the contact we simply are a link between someone who wants to rent a car and a car owner who wants to put his car for rental.",
        owner_text: "If you want to put your car for rental please",
        contact: "Contact Us"
    },
    ar: {
        hero_text: "أجر سيارتك بسهولة مع شركتنا",
        feat_easy: "سهولة التأجير",
        feat_wilaya: "كل الولايات",
        feat_free: "خدمة مجانية",
        choose_wilaya: "اختر الولاية...",
        search: "بحث",
        faq_title: "الأسئلة الشائعة",
        contact_btn: "اتصل بنا",
        disclaimer: "نحن لا نتحمل مسؤولية أي شيء يحدث بعد الاتصال، نحن مجرد رابط بين شخص يريد استئجار سيارة ومالك سيارة يريد عرض سيارته للإيجار.",
        owner_text: "إذا كنت ترغب في عرض سيارتك للإيجار من فضلك",
        contact: "اتصل بنا"
    },
    fr: {
        hero_text: "Louez votre voiture facilement avec Startup",
        feat_easy: "Location Facile",
        feat_wilaya: "Toutes les Wilayas",
        feat_free: "Service Gratuit",
        choose_wilaya: "Choisir la Wilaya...",
        search: "Rechercher",
        faq_title: "Questions Fréquemment Posées",
        contact_btn: "Contactez-nous",
        disclaimer: "Nous ne prenons aucune responsabilité pour ce qui se passe après le contact, nous sommes simplement un lien entre quelqu'un qui veut louer une voiture et un propriétaire.",
        owner_text: "Si vous souhaitez mettre votre voiture en location s'il vous plaît",
        contact: "Contactez-nous"
    }
};

// --- FAQ Data ---
const faqData = [
    { q: "How do i rent a car?", a: "You simply search a car and click on add email and phone number, a response should come from the car owner." },
    { q: "Conditions?", a: "You have to be 18+ with a driving license." },
    { q: "How do i find the cheapest car?", a: "You can simply filter the results in the search page." }
];

document.addEventListener('DOMContentLoaded', () => {
    
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
        // Generating 69 entries as requested (using standard 58 + placeholders)
        const wilayas = [
            "01 Adrar", "02 Chlef", "03 Laghouat", "04 Oum El Bouaghi", "05 Batna", "06 Béjaïa", "07 Biskra", "08 Béchar", "09 Blida", "10 Bouira",
            "11 Tamanrasset", "12 Tébessa", "13 Tlemcen", "14 Tiaret", "15 Tizi Ouzou", "16 Algiers", "17 Djelfa", "18 Jijel", "19 Sétif", "20 Saïda",
            "21 Skikda", "22 Sidi Bel Abbès", "23 Annaba", "24 Guelma", "25 Constantine", "26 Médéa", "27 Mostaganem", "28 M'Sila", "29 Mascara", "30 Ouargla",
            "31 Oran", "32 El Bayadh", "33 Illizi", "34 Bordj Bou Arréridj", "35 Boumerdès", "36 El Tarf", "37 Tindouf", "38 Tissemsilt", "39 El Oued", "40 Khenchela",
            "41 Souk Ahras", "42 Tipaza", "43 Mila", "44 Aïn Defla", "45 Naâma", "46 Aïn Témouchent", "47 Ghardaïa", "48 Relizane", "49 Timimoun", "50 Bordj Badji Mokhtar",
            "51 Ouled Djellal", "52 Béni Abbès", "53 In Salah", "54 In Guezzam", "55 Touggourt", "56 Djanet", "57 El M'Ghair", "58 El Meniaa"
        ];
        
        // Add placeholders to reach 69 as requested
        for(let i=59; i<=69; i++) wilayas.push(i + " New Wilaya");

        wilayas.forEach(w => {
            let opt = document.createElement('option');
            opt.value = w.split(' ')[0]; // Store ID
            opt.textContent = w;
            wilayaSelect.appendChild(opt);
        });

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
        faqData.forEach(item => {
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

    // 5. Results Page Logic
    const carsContainer = document.getElementById('cars-container');
    if(carsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedWilaya = urlParams.get('wilaya');
        
        // Filter logic could go here, for now showing random sample or filtered by wilaya
        let displayCars = selectedWilaya 
            ? carDatabase.filter(c => c.wilaya === selectedWilaya || c.wilaya === "16") // Show Algiers cars as backup
            : carDatabase;

        if(displayCars.length === 0) displayCars = carDatabase; // Fallback if empty

        const renderCars = (cars) => {
            carsContainer.innerHTML = '';
            cars.forEach(car => {
                const card = document.createElement('div');
                card.className = 'car-card';
                card.innerHTML = `
                    <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80" class="car-img" alt="Car">
                    <div class="car-info">
                        <h3>${car.name}</h3>
                        <div class="car-stats">
                            <span><i class="fas fa-chair"></i> ${car.seats} Seats</span>
                            <span><i class="fas fa-cogs"></i> ${car.engine}</span>
                            <span><i class="fas fa-suitcase"></i> ${car.bag}</span>
                            <span><i class="fas fa-tachometer-alt"></i> ${car.km} km</span>
                            <span><i class="fas fa-star"></i> ${car.state}/10</span>
                            <span><i class="fas fa-exchange-alt"></i> ${car.trans}</span>
                        </div>
                        <h3 style="color:var(--teal-blue)">${car.price} DZD / day</h3>
                        <a href="mailto:${car.ownerEmail}?subject=Rent Request for ${car.name}" class="rent-btn">Rent Now</a>
                    </div>
                `;
                carsContainer.appendChild(card);
            });
        };

        renderCars(displayCars);

        // Simple Frontend Filter Event Listeners
        const filters = document.querySelectorAll('.filters select');
        filters.forEach(f => {
            f.addEventListener('change', () => {
                // Logic to filter 'displayCars' based on values selected
                // This is a visual demo, real filtering happens in backend usually
                let filtered = displayCars.filter(c => {
                    const priceFilter = document.getElementById('filter-price').value;
                    if(priceFilter === 'low' && c.price > 5000) return false;
                    if(priceFilter === 'high' && c.price <= 5000) return false;
                    return true;
                });
                renderCars(filtered);
            });
        });
    }

    // 6. Language Translation
    const langSelect = document.getElementById('lang-select');
    if(langSelect) {
        langSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
            
            document.querySelectorAll('[data-key]').forEach(el => {
                const key = el.getAttribute('data-key');
                if(translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });
            
            // Re-render hero HTML specifically for gradient text if needed
            if(lang === 'en' && document.querySelector('h1[data-key="hero_text"]')) {
               document.querySelector('h1[data-key="hero_text"]').innerHTML = `Rent your car easily with <span class="gradient-text">Startup</span>`;
            }
        });
    }
});