import type { Database } from '@/types/cms';
import bcrypt from 'bcryptjs';

// Initial database with default admin user
const initialData: Database = {
    products: [
        {
            id: 'coway-150',
            name: 'Coway AirMega 150 (AP-1019C)',
            slug: 'coway-airmega-150',
            category: 'home',
            buyPrice: 12900,
            rentPrice: 499,
            buyAvailable: true,
            rentAvailable: true,
            description: 'The Coway AirMega 150 is a compact yet powerful air purifier, perfect for bedrooms and home offices. It features a Green True HEPA filter that traps 99.99% of allergens and pollutants.',
            features: ['True HEPA Filter', 'Cartridge Design', 'Real-time AQI'],
            specifications: { coverage: '355 sqft', cadr: '303 m³/h', power: '35W' },
            images: ['https://m.media-amazon.com/images/I/51HaE70EANL._SX679_.jpg'],
            altTexts: ['Coway AirMega 150'],
            seo: { metaTitle: 'Coway AirMega 150', metaDescription: 'Rent or Buy Coway AirMega 150 in India', h1: 'Coway AirMega 150', canonical: '', keywords: [] },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'philips-2000',
            name: 'Philips AC1215/20 Air Purifier',
            slug: 'philips-ac1215',
            category: 'home',
            buyPrice: 9999,
            rentPrice: 399,
            buyAvailable: true,
            rentAvailable: true,
            description: 'Intelligent sensing for professional-grade air quality. Purifies a standard room in just 12 minutes.',
            features: ['VitaShield IPS', 'AeraSense Technology', 'Night Mode'],
            specifications: { coverage: '270 sqft', cadr: '270 m³/h', power: '50W' },
            images: ['https://m.media-amazon.com/images/I/61y8L2aXk+L._SX679_.jpg'],
            altTexts: ['Philips Air Purifier'],
            seo: { metaTitle: 'Philips AC1215', metaDescription: 'Philips Air Purifier Rental India', h1: 'Philips AC1215', canonical: '', keywords: [] },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'dyson-tp03',
            name: 'Dyson Pure Cool Link Tower',
            slug: 'dyson-pure-cool-link-tp03',
            category: 'home',
            buyPrice: 29900,
            rentPrice: 1499,
            buyAvailable: true,
            rentAvailable: true,
            description: 'Automatically removes 99.95% of allergens and pollutants as small as 0.1 microns.',
            features: ['Air Multiplier Technology', 'App Control', 'Oscillation'],
            specifications: { coverage: '400 sqft', cadr: 'n/a', power: '40W' },
            images: ['https://m.media-amazon.com/images/I/61yOse4XjDL._SX679_.jpg'],
            altTexts: ['Dyson TP03'],
            seo: { metaTitle: 'Dyson Pure Cool Link', metaDescription: 'Rent Dyson Air Purifier', h1: 'Dyson Pure Cool Link', canonical: '', keywords: [] },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'cr-box-kit',
            name: 'Corsi-Rosenthal Box Kit (DIY)',
            slug: 'cr-box-kit-diy',
            category: 'diy',
            buyPrice: 2499,
            rentPrice: null,
            buyAvailable: true,
            rentAvailable: false,
            description: 'Everything you need to build your own high-performance air cleaner. Includes 4 MERV-13 filters, fan, and tape.',
            features: ['4x MERV-13 Filters', 'High Velocity Fan', 'Duct Tape Included'],
            specifications: { coverage: '500+ sqft', cadr: 'Estimated 400+ m³/h', power: '60W' },
            images: ['https://upload.wikimedia.org/wikipedia/commons/2/26/Corsi-Rosenthal_Box.jpg'],
            altTexts: ['Corsi-Rosenthal Box'],
            seo: { metaTitle: 'DIY Air Purifier Kit', metaDescription: 'Build your own air purifier', h1: 'DIY CR Box Kit', canonical: '', keywords: [] },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'diy-ready',
            name: 'Pre-Assembled DIY Unit',
            slug: 'diy-ready-unit',
            category: 'diy',
            buyPrice: 3499,
            rentPrice: null,
            buyAvailable: true,
            rentAvailable: false,
            description: 'A pre-built Corsi-Rosenthal box. High performance, low cost, ready to plug and play.',
            features: ['Pre-assembled', 'MERV-13 Filtration', 'High CADR'],
            specifications: { coverage: '500+ sqft', cadr: 'Estimated 400+ m³/h', power: '60W' },
            images: ['https://upload.wikimedia.org/wikipedia/commons/2/26/Corsi-Rosenthal_Box.jpg'],
            altTexts: ['Assembled CR Box'],
            seo: { metaTitle: 'Ready to use DIY Purifier', metaDescription: 'Cheap effective air purifier', h1: 'Pre-Assembled DIY Unit', canonical: '', keywords: [] },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'n95-mask-pack',
            name: 'N95 Anti-Pollution Masks (Pack of 5)',
            slug: 'n95-masks-5pack',
            category: 'prevention',
            buyPrice: 499,
            rentPrice: null,
            buyAvailable: true,
            rentAvailable: false,
            description: 'NIOSH certified N95 masks for superior protection against PM2.5.',
            features: ['5 Layers', 'Breathable', 'Adjustable Nose Clip'],
            specifications: { type: 'N95', quantity: '5' },
            images: ['https://m.media-amazon.com/images/I/71p+6jS0aJL._SX679_.jpg'],
            altTexts: ['N95 Masks'],
            seo: { metaTitle: 'N95 Masks India', metaDescription: 'Buy N95 Masks', h1: 'N95 Anti-Pollution Masks', canonical: '', keywords: [] },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'aqi-monitor',
            name: 'Portable AQI Monitor',
            slug: 'portable-aqi-monitor',
            category: 'prevention',
            buyPrice: 2999,
            rentPrice: 299,
            buyAvailable: true,
            rentAvailable: true,
            description: 'Accurate PM2.5 and PM10 laser sensor. Know what you breathe.',
            features: ['Laser Sensor', 'Rechargeable', 'LCD Display'],
            specifications: { range: '0-999 ug/m3', battery: '2000mAh' },
            images: ['https://m.media-amazon.com/images/I/61K-w1Ck+qL._SX679_.jpg'],
            altTexts: ['AQI Monitor'],
            seo: { metaTitle: 'Buy AQI Monitor', metaDescription: 'Air Quality Monitor India', h1: 'Portable AQI Monitor', canonical: '', keywords: [] },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'car-purifier-1',
            name: 'Antia Car Air Purifier Pro',
            slug: 'antia-car-purifier-pro',
            category: 'car',
            buyPrice: 3999,
            rentPrice: null,
            buyAvailable: true,
            rentAvailable: false,
            description: 'Compact high-efficiency air purifier designed for cars. Removes dust, smoke, and odors quickly.',
            features: ['HEPA Filter', 'Car Adapter', 'Silent Operation'],
            specifications: { coverage: 'Car Interior', cadr: '50 m³/h', power: '5W' },
            images: ['https://placehold.co/600x600/e2e8f0/475569?text=Car+Purifier'],
            altTexts: ['Car Purifier'],
            seo: { metaTitle: 'Car Air Purifier', metaDescription: 'Best car air purifier for pollution', h1: 'Antia Car Air Purifier', canonical: '', keywords: [] },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ],
    pages: [],
    menus: [
        {
            id: '1',
            name: 'Main Navigation',
            location: 'header',
            items: [
                {
                    id: '1', label: 'Air Purifiers', url: '/air-purifiers', type: 'dropdown', order: 1, children: [
                        { id: '1-1', label: 'Home', url: '/air-purifiers/home', type: 'internal', order: 1 },
                        { id: '1-2', label: 'Office', url: '/air-purifiers/office', type: 'internal', order: 2 },
                    ]
                },
                { id: '2', label: 'Filters & Accessories', url: '/filters', type: 'internal', order: 2 },
                { id: '3', label: 'Pollution Prevention', url: '/pollution-prevention', type: 'internal', order: 3 },
                { id: '4', label: 'DIY & Kits', url: '/diy-kits', type: 'internal', order: 4 },
                { id: '5', label: 'Blogs', url: '/blogs', type: 'internal', order: 5 },
                { id: '6', label: 'About Us', url: '/about', type: 'internal', order: 6 },
                { id: '7', label: 'Contact Us', url: '/contact', type: 'internal', order: 7 },
            ],
        },
    ],
    redirects: [],
    media: [],
    settings: {
        id: '1',
        globalHeadCode: '',
        globalBodyCode: '',
        siteName: 'Antia',
        siteDescription: 'India\'s #1 Air Purifier Rental & Sales Service',
        defaultSEO: {
            metaTitle: 'Antia - Buy & Rent Air Purifiers in India',
            metaDescription: 'Breathe pure air with India\'s #1 Air Purifier Rental & Sales service. Top brands available in Delhi, Mumbai, Bangalore.',
            h1: 'Breathe Pure, Live Healthy',
            canonical: 'https://antia-india.vercel.app',
            keywords: ['Air Purifier', 'Rent Air Purifier', 'Buy Air Purifier', 'India', 'HEPA Filter'],
        },
        favicon: '/favicon.ico',
        logo: '/logo.png',
    },
    customers: [],
    orders: [],
    contacts: [],
    blogs: [
        {
            id: 'blog-hepa-vs-carbon',
            title: 'HEPA vs. Carbon Filters: What\'s the Difference?',
            slug: 'hepa-vs-carbon-filter',
            excerpt: 'HEPA filters capture particles — dust, pollen, PM2.5. Carbon filters absorb gases — VOCs, smoke odors. Most modern purifiers use both. Here\'s when you need each.',
            content: `<p>When shopping for an air purifier, you'll quickly encounter two types of filters: <strong>HEPA</strong> and <strong>Activated Carbon</strong>. They do very different things, and understanding the difference will help you pick the right purifier for your needs.</p>

<h2>What is a HEPA Filter?</h2>
<p>HEPA stands for <strong>High-Efficiency Particulate Air</strong>. A true HEPA filter captures at least 99.97% of airborne particles 0.3 microns in diameter. This includes:</p>
<ul>
<li>PM2.5 and PM10 particles</li>
<li>Dust and dust mites</li>
<li>Pollen and pet dander</li>
<li>Mold spores</li>
<li>Some bacteria and viruses</li>
</ul>
<p>HEPA filters work by forcing air through a fine mesh. Particles get trapped via three mechanisms: impaction, interception, and diffusion. The 0.3-micron size is actually the <em>hardest</em> to capture — particles larger or smaller are caught even more efficiently.</p>

<h2>What is an Activated Carbon Filter?</h2>
<p>Activated carbon is treated with oxygen to open millions of tiny pores between carbon atoms. This massive surface area (one gram can have 500–3000 m² of surface area) makes it extremely effective at <strong>adsorbing gases and odors</strong>:</p>
<ul>
<li>VOCs (volatile organic compounds from paint, furniture, cleaning products)</li>
<li>Cooking smells and smoke odors</li>
<li>Formaldehyde from new furniture or flooring</li>
<li>Pet odors</li>
<li>Nitrogen dioxide and other combustion gases</li>
</ul>
<p>Critically, carbon filters do <em>not</em> capture particles. They're chemically bonded to gases through adsorption, not filtration.</p>

<h2>Which Do You Need?</h2>
<p><strong>For dust, pollen, PM2.5 (Delhi winter pollution):</strong> HEPA is what you need.</p>
<p><strong>For cooking smells, new furniture off-gassing, pet odors:</strong> Activated carbon is essential.</p>
<p><strong>For most Indian homes:</strong> You want both. That's why models like the Coway AirMega and Philips AC1215 combine a HEPA layer with a carbon pre-filter — they handle particles AND gases in a single unit.</p>

<h2>How Often Do Filters Need Replacing?</h2>
<p>HEPA filters typically last 12–18 months with normal use. Carbon filters exhaust faster — usually 6–12 months, depending on air quality and usage. One advantage of renting from Antia: filter replacements are included at no extra cost.</p>`,
            image: '/images/blogs/hepa-vs-carbon.png',
            altText: 'HEPA vs Carbon Filter comparison diagram',
            author: 'Antia Team',
            category: 'Guides',
            tags: ['HEPA', 'Carbon Filter', 'Air Purifier Guide', 'Filter Replacement'],
            published: true,
            featured: true,
            readTime: '5 min read',
            seo: {
                metaTitle: 'HEPA vs Carbon Filter: What\'s the Difference? | Antia',
                metaDescription: 'HEPA filters capture particles like PM2.5 and dust. Carbon filters absorb gases and odors. Learn which type you need for your home.',
                h1: 'HEPA vs. Carbon Filters: What\'s the Difference?',
                canonical: 'https://antia-india.vercel.app/blogs/hepa-vs-carbon-filter',
                keywords: ['HEPA filter', 'carbon filter', 'air purifier filter', 'PM2.5'],
            },
            createdAt: new Date('2026-03-10').toISOString(),
            updatedAt: new Date('2026-03-10').toISOString(),
        },
        {
            id: 'blog-india-air-pollution',
            title: 'India\'s Air Quality Crisis: 2025 Data & What It Means for You',
            slug: 'india-air-pollution-2025',
            excerpt: 'Delhi, Mumbai, Kolkata — the data is alarming. We break down the latest AQI reports and explain the real health impact of breathing polluted air every day.',
            content: `<p>India is home to 39 of the world's 50 most polluted cities. In 2025, Delhi recorded an average AQI of 218 — nearly 9 times the WHO's safe limit of 25 µg/m³ for PM2.5. But pollution isn't just a Delhi problem.</p>

<h2>The 2025 Numbers</h2>
<p>According to IQAir's 2025 World Air Quality Report:</p>
<ul>
<li><strong>Delhi:</strong> Average PM2.5 of 92.7 µg/m³ (ranked #2 most polluted capital globally)</li>
<li><strong>Mumbai:</strong> 46.4 µg/m³ — "Unhealthy" category for sensitive groups year-round</li>
<li><strong>Kolkata:</strong> 57.3 µg/m³ — one of India's worst non-Delhi readings</li>
<li><strong>Bangalore:</strong> 20.1 µg/m³ — relatively better, but still above WHO guidelines</li>
</ul>

<h2>What Happens When You Breathe Polluted Air?</h2>
<p>The health effects are both immediate and cumulative:</p>
<ul>
<li><strong>Short-term:</strong> Eye and throat irritation, headaches, worsened asthma symptoms</li>
<li><strong>Long-term:</strong> PM2.5 particles bypass your lungs and enter your bloodstream, increasing risk of heart disease, stroke, and lung cancer</li>
<li><strong>Children:</strong> Developing lungs are especially vulnerable — chronic exposure reduces lung capacity permanently</li>
<li><strong>Elderly:</strong> Pre-existing conditions like COPD are significantly worsened</li>
</ul>

<h2>Indoor Air: Often Worse Than Outdoor</h2>
<p>Studies by the US EPA show indoor air can be 2–5x more polluted than outdoor air. Why? Cooking smoke, cleaning chemicals, furniture off-gassing, and poor ventilation trap pollutants inside. In Indian households, where cooking on high heat is common, indoor PM2.5 spikes are frequent and significant.</p>

<h2>What You Can Do</h2>
<p>An air purifier with a true HEPA filter reduces indoor PM2.5 by up to 99.97%. For a 300 sq ft room running at medium speed, a quality purifier like the Coway AirMega or Philips AC1215 can reduce particulate matter to safe levels within 20–30 minutes.</p>
<p>Antia offers rental options starting at ₹399/month — so clean air doesn't have to be a luxury.</p>`,
            image: '/images/blogs/poor-air.png',
            altText: 'Smog over Indian city skyline',
            author: 'Antia Team',
            category: 'News',
            tags: ['Air Pollution India', 'AQI', 'Delhi Pollution', 'PM2.5', 'Health'],
            published: true,
            featured: true,
            readTime: '8 min read',
            seo: {
                metaTitle: 'India Air Quality Crisis 2025: AQI Data & Health Impact | Antia',
                metaDescription: 'Delhi ranked 2nd most polluted capital globally. See the 2025 AQI data for Indian cities and learn how to protect your family from air pollution.',
                h1: 'India\'s Air Quality Crisis: 2025 Data & What It Means for You',
                canonical: 'https://antia-india.vercel.app/blogs/india-air-pollution-2025',
                keywords: ['India air pollution 2025', 'Delhi AQI', 'air quality India', 'PM2.5 health effects'],
            },
            createdAt: new Date('2026-02-28').toISOString(),
            updatedAt: new Date('2026-02-28').toISOString(),
        },
        {
            id: 'blog-best-bedroom-purifier',
            title: 'Best Air Purifiers for Bedrooms in India (2026)',
            slug: 'best-air-purifier-bedroom',
            excerpt: 'You spend 8 hours sleeping. Your bedroom air matters most. We tested Coway, Philips, and Dyson across coverage, noise, and efficiency — here are our picks.',
            content: `<p>You spend roughly a third of your life in your bedroom. The air quality while you sleep directly affects your cardiovascular health, cognitive function, and immune system. Here's our 2026 guide to the best air purifiers for Indian bedrooms.</p>

<h2>What to Look for in a Bedroom Purifier</h2>
<ul>
<li><strong>Coverage area:</strong> Should match or exceed your room size (most Indian bedrooms: 100–250 sq ft)</li>
<li><strong>Noise level:</strong> Under 35 dB on low speed — critical for sleep quality</li>
<li><strong>CADR:</strong> Clean Air Delivery Rate — higher is better for faster purification</li>
<li><strong>Night mode:</strong> Dims display, reduces fan speed automatically</li>
</ul>

<h2>Our Top Picks</h2>

<h3>1. Coway AirMega 150 — Best Overall (₹499/mo rent | ₹12,900 buy)</h3>
<p>The AirMega 150 is our top bedroom pick. At 355 sq ft coverage and 303 m³/h CADR, it handles any Indian bedroom comfortably. The real-time AQI display shows you exactly what you're breathing. Noise on low: 22 dB — whisper quiet. The cartridge filter design makes replacements easy, and Antia includes them free with rentals.</p>

<h3>2. Philips AC1215 — Best Budget Pick (₹399/mo rent | ₹9,999 buy)</h3>
<p>Philips' VitaShield IPS technology and AeraSense sensor deliver professional-grade sensing at an accessible price. Covers 270 sq ft. Night mode is exceptional — the display goes fully dark and the fan whispers at 32 dB. Best for bedrooms under 200 sq ft.</p>

<h3>3. Dyson Pure Cool Link — Best Premium (₹1,499/mo rent | ₹29,900 buy)</h3>
<p>If budget isn't a concern, the Dyson Pure Cool Link doubles as a fan and purifier. App control, oscillation, and 99.95% filtration down to 0.1 microns. The bladeless design is safe around children. Best for large master bedrooms (up to 400 sq ft).</p>

<h2>Placement Tips</h2>
<p>Place your purifier near the bed but not directly blowing on your face. Keep bedroom doors and windows closed when running. Run it for 30 minutes before bedtime to pre-clean the air, then leave on low through the night.</p>`,
            image: 'https://placehold.co/800x450/e0f2fe/1e40af?text=Bedroom+Purifier',
            altText: 'Air purifier in a clean bedroom setting',
            author: 'Antia Team',
            category: 'Buying Guides',
            tags: ['Bedroom Air Purifier', 'Coway', 'Philips', 'Dyson', 'Buying Guide'],
            published: true,
            featured: false,
            readTime: '6 min read',
            seo: {
                metaTitle: 'Best Air Purifiers for Bedrooms India 2026 | Antia',
                metaDescription: 'Top bedroom air purifier picks for Indian homes. Coway, Philips, Dyson compared on coverage, noise, and price. Rent from ₹399/month.',
                h1: 'Best Air Purifiers for Bedrooms in India (2026)',
                canonical: 'https://antia-india.vercel.app/blogs/best-air-purifier-bedroom',
                keywords: ['best bedroom air purifier India', 'Coway AirMega 150', 'Philips air purifier bedroom'],
            },
            createdAt: new Date('2026-02-14').toISOString(),
            updatedAt: new Date('2026-02-14').toISOString(),
        },
        {
            id: 'blog-rent-vs-buy',
            title: 'Renting vs. Buying an Air Purifier: Which is Smarter?',
            slug: 'rent-vs-buy-air-purifier',
            excerpt: 'Upfront cost vs. total cost of ownership. When renting saves money, when buying makes sense — we do the math for Indian households.',
            content: `<p>The question we get most often: <em>"Should I rent or buy an air purifier?"</em> The honest answer: it depends on your situation. Here's the full math.</p>

<h2>The True Cost of Buying</h2>
<p>Let's use the Philips AC1215 as an example (₹9,999 buy price):</p>
<ul>
<li>Purchase price: ₹9,999</li>
<li>HEPA filter replacement (every 12 months): ₹2,500/year</li>
<li>Carbon pre-filter (every 6 months): ₹800/year</li>
<li><strong>Year 1 total: ₹13,299</strong></li>
<li><strong>Year 2 total: ₹3,300</strong></li>
<li><strong>3-year total: ₹16,599</strong></li>
</ul>

<h2>The True Cost of Renting</h2>
<p>Same purifier at ₹399/month (12-month plan, zero deposit):</p>
<ul>
<li>Year 1: ₹4,788</li>
<li>Year 2: ₹4,788</li>
<li>Year 3: ₹4,788</li>
<li><strong>3-year total: ₹14,364</strong></li>
<li>Filter replacements: included</li>
<li>Maintenance: included</li>
<li>Upgrade option: included</li>
</ul>

<h2>When Renting Makes More Sense</h2>
<ul>
<li>You're in a rented flat and may move in the next 1–2 years</li>
<li>You want the freedom to upgrade to a newer model</li>
<li>You don't want to handle filter procurement and replacement yourself</li>
<li>You want zero upfront cost — ₹399 vs ₹9,999 on day one</li>
<li>You're trying different models before committing to a purchase</li>
</ul>

<h2>When Buying Makes More Sense</h2>
<ul>
<li>You own your home and plan to stay for 5+ years</li>
<li>You want full ownership with no recurring costs after filter changes</li>
<li>You only need seasonal use (not year-round)</li>
</ul>

<h2>Our Recommendation</h2>
<p>For most urban Indian renters: <strong>start with a rental</strong>. You protect your lungs immediately, pay a fraction of the upfront cost, and have full flexibility. If you love it and plan to stay put, switch to a purchase after 12 months.</p>`,
            image: 'https://placehold.co/800x450/f0fdf4/166534?text=Rent+vs+Buy',
            altText: 'Comparison chart of renting vs buying an air purifier',
            author: 'Antia Team',
            category: 'Guides',
            tags: ['Rent Air Purifier', 'Buy Air Purifier', 'Cost Comparison', 'India'],
            published: true,
            featured: false,
            readTime: '4 min read',
            seo: {
                metaTitle: 'Renting vs Buying an Air Purifier in India: Full Cost Comparison | Antia',
                metaDescription: 'Should you rent or buy an air purifier in India? We break down the full 3-year cost including filter replacements. Start renting from ₹399/month.',
                h1: 'Renting vs. Buying an Air Purifier: Which is Smarter for Indian Homes?',
                canonical: 'https://antia-india.vercel.app/blogs/rent-vs-buy-air-purifier',
                keywords: ['rent air purifier India', 'buy air purifier India', 'air purifier cost India'],
            },
            createdAt: new Date('2026-01-30').toISOString(),
            updatedAt: new Date('2026-01-30').toISOString(),
        },
        {
            id: 'blog-cr-box-guide',
            title: 'How to Build a Corsi-Rosenthal Box in 15 Minutes',
            slug: 'corsi-rosenthal-box-guide',
            excerpt: 'The CR Box costs under ₹3,000 and outperforms many commercial purifiers. Step-by-step guide with parts list for the Indian market.',
            content: `<p>The Corsi-Rosenthal Box (CR Box) is a DIY air purifier invented by Richard Corsi and Jim Rosenthal during COVID-19. It's surprisingly powerful — studies show CADR values of 400–600 m³/h, outperforming many purifiers costing ₹30,000+. And it costs under ₹3,000 to build.</p>

<h2>What You'll Need</h2>
<ul>
<li><strong>4x MERV-13 filters</strong> (20"×20"×2" or equivalent — available on Amazon India)</li>
<li><strong>1x Box fan</strong> (20" or matching size — Havells, Orient, or similar)</li>
<li><strong>Cardboard</strong> for the top cap</li>
<li><strong>Duct tape</strong> (strong, airtight)</li>
<li>Total cost: ₹2,200–₹3,500 depending on fan quality</li>
</ul>

<h2>Step-by-Step Assembly</h2>
<ol>
<li><strong>Arrange 4 filters in a cube</strong> — place them standing up in a square formation. Make sure the arrows on the filter (showing airflow direction) all point <em>inward</em> toward the center.</li>
<li><strong>Tape the corners</strong> — use duct tape to seal all four vertical joints between filters. Air should only flow through the filter media, not around the sides.</li>
<li><strong>Place the fan on top</strong> — face-up (blowing air upward, drawing air in through the filters from the sides).</li>
<li><strong>Make a cardboard cap</strong> — cut cardboard to cover any gaps between the fan and the filter cube. Tape it down to prevent air bypass.</li>
<li><strong>Tape the fan perimeter</strong> — seal the joint between the fan and the top filter layer.</li>
</ol>

<h2>Performance</h2>
<p>Run on medium speed, a CR Box moves 300–400 m³/h of filtered air. That covers a 500+ sq ft room effectively. MERV-13 filters capture 85%+ of particles 1–3 microns in size, including most PM2.5.</p>

<h2>Maintenance</h2>
<p>MERV-13 filters last 6–12 months depending on air quality. Check them monthly — when they look grey/black, it's time to replace. Cost: ₹800–₹1,200 for a set of 4 replacement filters.</p>

<p>If you'd rather skip the build, our <a href="/product/cr-box-kit">pre-assembled CR Box kit</a> (₹3,499) is ready to plug in.</p>`,
            image: 'https://placehold.co/800x450/fef3c7/92400e?text=DIY+CR+Box',
            altText: 'Corsi-Rosenthal Box DIY air purifier assembly',
            author: 'Antia Team',
            category: 'DIY',
            tags: ['DIY Air Purifier', 'Corsi-Rosenthal Box', 'CR Box', 'MERV-13', 'Budget'],
            published: true,
            featured: false,
            readTime: '7 min read',
            seo: {
                metaTitle: 'How to Build a Corsi-Rosenthal Box DIY Air Purifier in India | Antia',
                metaDescription: 'Build a powerful DIY air purifier for under ₹3,000. Step-by-step CR Box guide with India-specific parts list. Better CADR than many ₹30,000 purifiers.',
                h1: 'How to Build a Corsi-Rosenthal Box in 15 Minutes',
                canonical: 'https://antia-india.vercel.app/blogs/corsi-rosenthal-box-guide',
                keywords: ['DIY air purifier India', 'Corsi-Rosenthal box India', 'CR box build guide', 'MERV-13 filter India'],
            },
            createdAt: new Date('2026-01-15').toISOString(),
            updatedAt: new Date('2026-01-15').toISOString(),
        },
        {
            id: 'blog-pm25-explained',
            title: 'PM2.5 Explained: Why This Invisible Particle is So Dangerous',
            slug: 'pm25-explained',
            excerpt: 'PM2.5 particles are 30x smaller than a human hair. They bypass your nose and throat and go directly into your bloodstream. Here\'s what you need to know.',
            content: `<p>You've seen the AQI numbers. You've heard that PM2.5 is dangerous. But what exactly <em>is</em> PM2.5, and why does its tiny size make it so uniquely harmful?</p>

<h2>What is PM2.5?</h2>
<p>PM2.5 refers to <strong>particulate matter</strong> with a diameter of <strong>2.5 micrometers or less</strong>. To put that in perspective:</p>
<ul>
<li>A human hair is 50–70 micrometers thick</li>
<li>PM2.5 is <strong>20–30 times smaller than a human hair</strong></li>
<li>It's completely invisible to the naked eye</li>
</ul>
<p>PM2.5 comes from vehicle exhaust, industrial emissions, construction dust, crop burning, and even cooking on high heat.</p>

<h2>Why is it So Dangerous?</h2>
<p>Your nose and throat are designed to filter out large particles. The tiny hairs (cilia) and mucus catch dust and pollen before they reach your lungs. But PM2.5 is too small — it bypasses these defenses entirely.</p>
<p>Once inhaled, PM2.5 particles:</p>
<ol>
<li>Penetrate deep into the alveoli (air sacs) in your lungs</li>
<li>Pass through the lung tissue into your <strong>bloodstream</strong></li>
<li>Travel to your heart, brain, liver, and other organs</li>
<li>Trigger systemic inflammation</li>
</ol>

<h2>Proven Health Effects</h2>
<p>The research is unambiguous:</p>
<ul>
<li><strong>Heart disease:</strong> Long-term PM2.5 exposure increases heart attack risk by 30–40%</li>
<li><strong>Stroke:</strong> PM2.5 is linked to increased stroke risk, especially in older adults</li>
<li><strong>Lung cancer:</strong> Classified as a Group 1 carcinogen by the IARC</li>
<li><strong>Cognitive decline:</strong> Recent studies link PM2.5 to accelerated brain aging and dementia</li>
<li><strong>Children:</strong> Reduces lung development, increasing lifetime risk of respiratory disease</li>
</ul>

<h2>What AQI Numbers Mean for PM2.5</h2>
<table>
<tr><th>AQI Range</th><th>PM2.5 (µg/m³)</th><th>Health Message</th></tr>
<tr><td>0–50</td><td>0–12</td><td>Good — safe for all</td></tr>
<tr><td>51–100</td><td>12.1–35.4</td><td>Moderate — sensitive people should reduce outdoor time</td></tr>
<tr><td>101–150</td><td>35.5–55.4</td><td>Unhealthy for sensitive groups</td></tr>
<tr><td>151–200</td><td>55.5–150.4</td><td>Unhealthy — everyone should reduce exposure</td></tr>
<tr><td>201–300</td><td>150.5–250.4</td><td>Very Unhealthy — avoid outdoor activity</td></tr>
<tr><td>301+</td><td>250.5+</td><td>Hazardous — stay indoors with purifier running</td></tr>
</table>

<h2>Protection: What Actually Works</h2>
<p>A HEPA air purifier is the most effective indoor protection against PM2.5. Running a quality purifier in your bedroom and living room can reduce indoor PM2.5 by 97–99%+ even when outdoor AQI is 300+. N95 masks provide protection outdoors, blocking 95% of particles 0.3 microns and above.</p>`,
            image: 'https://placehold.co/800x450/f3e8ff/7c3aed?text=PM2.5+Particles',
            altText: 'Microscopic illustration of PM2.5 particles compared to human hair',
            author: 'Antia Team',
            category: 'Health',
            tags: ['PM2.5', 'Air Quality', 'Health Effects', 'AQI', 'Pollution'],
            published: true,
            featured: false,
            readTime: '5 min read',
            seo: {
                metaTitle: 'PM2.5 Explained: Health Effects & How to Protect Yourself | Antia',
                metaDescription: 'PM2.5 particles enter your bloodstream and damage your heart, lungs, and brain. Learn what PM2.5 is, why it\'s dangerous, and how to protect your family.',
                h1: 'PM2.5 Explained: Why This Invisible Particle is So Dangerous',
                canonical: 'https://antia-india.vercel.app/blogs/pm25-explained',
                keywords: ['PM2.5 health effects', 'what is PM2.5', 'PM2.5 India', 'air pollution health'],
            },
            createdAt: new Date('2026-01-05').toISOString(),
            updatedAt: new Date('2026-01-05').toISOString(),
        },
    ],
    users: [
        {
            id: '1',
            username: 'admin',
            // Password: Sunpower@11@24 (hashed)
            passwordHash: bcrypt.hashSync('Sunpower@11@24', 10),
            createdAt: new Date().toISOString(),
        },
    ],
};

export default initialData;
