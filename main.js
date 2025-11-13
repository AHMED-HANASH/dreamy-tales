// Dreamy Tales - Main JavaScript File
// Bilingual Bedtime Stories App

// Global Variables
let currentLanguage = 'en';
let currentStory = null;
let readingProgress = JSON.parse(localStorage.getItem('readingProgress')) || {};
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let readingStreak = parseInt(localStorage.getItem('readingStreak')) || 0;

// Stories Database
const stories = [
    // Free Stories
    {
        id: 'cinderella',
        title: { en: 'Cinderella', ar: 'سندريلا' },
        category: 'classic',
        ageGroup: '4-8',
        language: 'both',
        type: 'free',
        duration: '7 min',
        moral: { en: 'Kindness and hope always win', ar: 'اللطف والأمل دائماً ينتصران' },
        description: { 
            en: 'A kind girl with a heart full of hope overcomes challenges with help from her fairy godmother.',
            ar: 'فتاة لطيفة مليئة بالأمل تتغلب على التحديات بمساعدة أمها الروحية.'
        },
        cover: 'https://kimi-web-img.moonshot.cn/img/cdn.mos.cms.futurecdn.net/d7a02f11a6de99fff2d1a8c38dc692710568eb60.jpg'
    },
    {
        id: 'three-pigs',
        title: { en: 'Three Little Pigs', ar: 'الخنازير الثلاثة' },
        category: 'classic',
        ageGroup: '3-7',
        language: 'both',
        type: 'free',
        duration: '6 min',
        moral: { en: 'Hard work and planning pay off', ar: 'العمل الجاد والتخطيط يؤتيان ثمارهما' },
        description: { 
            en: 'Three pigs build different houses and learn the importance of hard work and preparation.',
            ar: 'ثلاثة خنازير يبنون بيوتاً مختلفة ويتعلمون أهمية العمل الجاد والتحضير.'
        },
        cover: 'https://kimi-web-img.moonshot.cn/img/img.freepik.com/87f9e29cb4c6f8fae61db3e6b9cdf0eb47164a01.jpg'
    },
    {
        id: 'thirsty-crow',
        title: { en: 'The Thirsty Crow', ar: 'الغراب العطشان' },
        category: 'moral',
        ageGroup: '4-8',
        language: 'both',
        type: 'free',
        duration: '5 min',
        moral: { en: 'Where there is a will, there is a way', ar: 'عندما توجد إرادة، توجد طريقة' },
        description: { 
            en: 'A clever crow uses stones to raise water level and quench its thirst.',
            ar: 'غراب ذكي يستخدم الحجارة لرفع مستوى الماء ليروي عطشه.'
        },
        cover: 'https://kimi-web-img.moonshot.cn/img/threebooksanight.com/b3aebfb49e30cf573288da92b8e7b8fad83765df.jpg'
    },
    {
        id: 'lion-mouse',
        title: { en: 'The Lion and the Mouse', ar: 'الأسد والفأر' },
        category: 'moral',
        ageGroup: '3-6',
        language: 'both',
        type: 'free',
        duration: '4 min',
        moral: { en: 'Kindness is never wasted', ar: 'اللطف لا يضيع أبداً' },
        description: { 
            en: 'A small mouse helps a mighty lion, proving that even the smallest creatures can make a difference.',
            ar: 'فأر صغير يساعد أسداً قوياً، مما يثبت أن أصغر الكائنات يمكن أن يكون لها تأثير.'
        },
        cover: 'https://kimi-web-img.moonshot.cn/img/cdn4.volusion.store/f0aa1b2ad9999d517ccb63811976d07cab3313bf.jpg'
    },
    {
        id: 'ugly-duckling',
        title: { en: 'The Ugly Duckling', ar: 'البطة القبيحة' },
        category: 'classic',
        ageGroup: '4-8',
        language: 'both',
        type: 'free',
        duration: '9 min',
        moral: { en: 'True beauty comes from within', ar: 'الجمال الحقيقي يأتي من الداخل' },
        description: { 
            en: 'A duckling who feels different discovers he is actually a beautiful swan.',
            ar: 'بطة صغيرة تشعر بالاختلاف تكتشف أنها في الواقع إوزة جميلة.'
        },
        cover: 'https://kimi-web-img.moonshot.cn/img/s.turbifycdn.com/5fd6b47bc075777c2e512113720a2d4c8d4f622c.gif'
    },
    {
        id: 'golden-egg',
        title: { en: 'The Golden Egg', ar: 'البيضة الذهبية' },
        category: 'moral',
        ageGroup: '5-9',
        language: 'both',
        type: 'free',
        duration: '6 min',
        moral: { en: 'Greed leads to loss', ar: 'الجشع يؤدي إلى الخسارة' },
        description: { 
            en: 'A farmer with a magical goose learns that greed can destroy good fortune.',
            ar: 'مزارع مع إوزة سحرية يتعلم أن الجشع يمكن أن يدمر الحظ الجيد.'
        },
        cover: 'https://kimi-web-img.moonshot.cn/img/img.freepik.com/ac73730252da84832d6d1eaa711b8344f7ec10ec.jpg'
    },
    // Premium Stories
    {
        id: 'sleeping-beauty',
        title: { en: 'Sleeping Beauty', ar: 'الأميرة النائمة' },
        category: 'classic',
        ageGroup: '5-9',
        language: 'both',
        type: 'premium',
        duration: '12 min',
        moral: { en: 'True love conquers all', ar: 'الحب الحقيقي يغلب كل شيء' },
        description: { 
            en: 'A princess under a sleeping spell is awakened by true love after 100 years.',
            ar: 'أميرة تحت تأثير نوم سحري تستيقظ بواسطة الحب الحقيقي بعد 100 عام.'
        },
        cover: 'https://kimi-web-img.moonshot.cn/img/thumbs.dreamstime.com/a10787b4cb88a0eba9e532fad2e9f0724bf8c5b3.jpg'
    },
    {
        id: 'aladdin',
        title: { en: 'Aladdin and the Magic Lamp', ar: 'علاء الدين والمصباح السحري' },
        category: 'adventure',
        ageGroup: '6-10',
        language: 'both',
        type: 'premium',
        duration: '15 min',
        moral: { en: 'Wisdom is more powerful than magic', ar: 'الحكمة أقوى من السحر' },
        description: { 
            en: 'A poor boy finds a magical lamp that changes his life forever.',
            ar: 'ولد فقير يجد مصباحاً سحرياً يغير حياته للأبد.'
        },
        cover: 'https://kimi-web-img.moonshot.cn/img/alldonemonkey.com/19c895ff0fbd6cb0f377d13123d1ce46f952c3fe.jpg'
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    updateReadingStreak();
});

function initializeApp() {
    // Set initial language from localStorage or default to English
    currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    updateLanguageDisplay();
    
    // Initialize page-specific content
    if (document.getElementById('story-grid')) {
        renderStoryGrid();
        initializeFilters();
    }
    
    if (document.getElementById('story-reader')) {
        loadStoryContent();
    }
    
    // Initialize animations
    initializeAnimations();
}

function setupEventListeners() {
    // Language toggle
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Search functionality
    const searchInput = document.getElementById('story-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterStories);
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('preferredLanguage', currentLanguage);
    
    // Update text direction for Arabic
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    updateLanguageDisplay();
    
    // Re-render content with new language
    if (document.getElementById('story-grid')) {
        renderStoryGrid();
    }
    
    if (document.getElementById('story-reader')) {
        loadStoryContent();
    }
}

function updateLanguageDisplay() {
    // Update all translatable elements
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key] && translations[key][currentLanguage]) {
            element.textContent = translations[key][currentLanguage];
        }
    });
    
    // Update language toggle button
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.textContent = currentLanguage === 'en' ? 'العربية' : 'English';
    }
}

function renderStoryGrid() {
    const grid = document.getElementById('story-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filteredStories = getFilteredStories();
    
    filteredStories.forEach(story => {
        const storyCard = createStoryCard(story);
        grid.appendChild(storyCard);
    });
    
    // Animate cards
    anime({
        targets: '.story-card',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuart'
    });
}

function createStoryCard(story) {
    const card = document.createElement('div');
    card.className = 'story-card bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer';
    card.onclick = () => openStory(story.id);
    
    const isFavorite = favorites.includes(story.id);
    const isPremium = story.type === 'premium';
    
    card.innerHTML = `
        <div class="relative">
            <img src="${story.cover}" alt="${story.title[currentLanguage]}" class="w-full h-48 object-cover">
            ${isPremium ? '<div class="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">PREMIUM</div>' : ''}
            <button class="absolute top-2 left-2 favorite-btn ${isFavorite ? 'text-red-500' : 'text-gray-400'}" onclick="toggleFavorite('${story.id}', event)">
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
        </div>
        <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800 mb-2">${story.title[currentLanguage]}</h3>
            <p class="text-gray-600 text-sm mb-3">${story.description[currentLanguage]}</p>
            <div class="flex justify-between items-center text-xs text-gray-500 mb-3">
                <span>${story.duration}</span>
                <span>${story.ageGroup} years</span>
            </div>
            <div class="text-xs text-purple-600 font-medium">${story.moral[currentLanguage]}</div>
        </div>
    `;
    
    return card;
}

function openStory(storyId) {
    const story = stories.find(s => s.id === storyId);
    if (!story) return;
    
    if (story.type === 'premium') {
        showPremiumModal(story);
    } else {
        localStorage.setItem('currentStory', storyId);
        window.location.href = 'reading.html';
    }
}

function toggleFavorite(storyId, event) {
    event.stopPropagation();
    
    const index = favorites.indexOf(storyId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(storyId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Update UI
    const storyCard = event.target.closest('.story-card');
    const favoriteBtn = storyCard.querySelector('.favorite-btn');
    favoriteBtn.classList.toggle('text-red-500');
    favoriteBtn.classList.toggle('text-gray-400');
}

function getFilteredStories() {
    let filtered = stories;
    
    // Apply filters based on current selections
    const activeFilters = document.querySelectorAll('.filter-btn.active');
    
    activeFilters.forEach(filter => {
        const filterType = filter.getAttribute('data-filter');
        const filterValue = filter.getAttribute('data-value');
        
        if (filterType === 'type') {
            filtered = filtered.filter(story => story.type === filterValue);
        }
        if (filterType === 'category') {
            filtered = filtered.filter(story => story.category === filterValue);
        }
        if (filterType === 'age') {
            filtered = filtered.filter(story => story.ageGroup === filterValue);
        }
    });
    
    // Apply search filter
    const searchTerm = document.getElementById('story-search')?.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(story => 
            story.title[currentLanguage].toLowerCase().includes(searchTerm) ||
            story.description[currentLanguage].toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

function handleFilterClick(event) {
    const button = event.target;
    const filterType = button.getAttribute('data-filter');
    const filterValue = button.getAttribute('data-value');
    
    // Toggle active state
    if (filterType === 'type' || filterType === 'category' || filterType === 'age') {
        // Remove active from other buttons of same type
        document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active to clicked button
        button.classList.add('active');
    }
    
    renderStoryGrid();
}

function filterStories() {
    renderStoryGrid();
}

function showPremiumModal(story) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 class="text-xl font-bold mb-4">${currentLanguage === 'en' ? 'Premium Story' : 'قصة مميزة'}</h3>
            <p class="text-gray-600 mb-4">${currentLanguage === 'en' ? 'This story is part of our premium collection. Subscribe to unlock all stories!' : 'هذه القصة جزء من مجموعتنا المميزة. اشترك لفتح جميع القصص!'}</p>
            <div class="flex gap-3">
                <button onclick="closeModal()" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg">${currentLanguage === 'en' ? 'Cancel' : 'إلغاء'}</button>
                <button onclick="goToPremium()" class="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg font-medium">${currentLanguage === 'en' ? 'Subscribe' : 'اشتراك'}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal
    anime({
        targets: modal,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
}

function closeModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        anime({
            targets: modal,
            opacity: [1, 0],
            duration: 300,
            easing: 'easeOutQuart',
            complete: () => modal.remove()
        });
    }
}

function goToPremium() {
    window.location.href = 'premium.html';
}

function updateReadingStreak() {
    const streakElement = document.getElementById('reading-streak');
    if (streakElement) {
        streakElement.textContent = readingStreak;
    }
}

function initializeAnimations() {
    // Hero text animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        new Typed('.hero-title', {
            strings: [
                currentLanguage === 'en' ? 'Welcome to Dreamy Tales' : 'مرحباً بكم في قصص الأحلام',
                currentLanguage === 'en' ? 'Magical Stories Every Night' : 'قصص سحرية كل ليلة'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            backDelay: 2000
        });
    }
    
    // Floating particles background
    if (typeof p5 !== 'undefined') {
        initializeParticles();
    }
}

function initializeParticles() {
    new p5((p) => {
        let particles = [];
        
        p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particles-container');
            canvas.style('position', 'fixed');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('z-index', '-1');
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    size: p.random(2, 6),
                    speedX: p.random(-0.5, 0.5),
                    speedY: p.random(-0.5, 0.5),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            particles.forEach(particle => {
                p.fill(155, 136, 180, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
                
                // Move particle
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around screen
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
            });
        };
        
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}

// Translations Object
const translations = {
    'app-title': {
        en: 'Dreamy Tales',
        ar: 'قصص الأحلام'
    },
    'hero-subtitle': {
        en: 'Magical bedtime stories in Arabic and English',
        ar: 'قصص سحرية للنوم باللغتين العربية والإنجليزية'
    },
    'search-placeholder': {
        en: 'Search stories...',
        ar: 'ابحث عن القصص...'
    },
    'filter-all': {
        en: 'All Stories',
        ar: 'جميع القصص'
    },
    'filter-free': {
        en: 'Free',
        ar: 'مجاني'
    },
    'filter-premium': {
        en: 'Premium',
        ar: 'مميز'
    },
    'reading-streak-text': {
        en: 'Day Streak',
        ar: 'أيام متتالية'
    }
};

// Story content for reading page
const storyContent = {
    cinderella: {
        pages: [
            {
                en: {
                    text: "Once upon a time, there lived a kind girl named Cinderella. She lived with her mean stepmother and two stepsisters who made her do all the housework.",
                    image: "cinderella-1.jpg"
                },
                ar: {
                    text: "ذات مرة، كانت تعيش فتاة لطيفة تُدعى سندريلا. كانت تعيش مع زوجة أبيها الشريرة وأختيها غير الشقيقتين اللتين جعلتها تفعل كل أعمال المنزل.",
                    image: "cinderella-1.jpg"
                }
            },
            {
                en: {
                    text: "One day, the king announced a royal ball for the prince to find a bride. Cinderella's stepsisters were excited, but they wouldn't let her go.",
                    image: "cinderella-2.jpg"
                },
                ar: {
                    text: "في أحد الأيام، أعلن الملك عن حفل ملكي للأمير ليجد عروساً. كانت أخوات سندريلا متحمسات، لكنهن لم يسمحن لها بالذهاب.",
                    image: "cinderella-2.jpg"
                }
            }
        ]
    }
};