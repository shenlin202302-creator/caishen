const wallpapers = [
    {
        id: 1,
        name: {
            en: "Golden Lucky God",
            zh: "金财神"
        },
        url: "https://picsum.photos/seed/luckygod1/1080/1920.jpg",
        isFree: true
    },
    {
        id: 2,
        name: {
            en: "Red Fortune",
            zh: "鴻運當頭"
        },
        url: "https://picsum.photos/seed/fortune2/1080/1920.jpg",
        isFree: true
    },
    {
        id: 3,
        name: {
            en: "Prosperity Dragon",
            zh: "招財龍"
        },
        url: "https://picsum.photos/seed/prosperity3/1080/1920.jpg",
        isFree: true
    },
    {
        id: 4,
        name: {
            en: "Money Tree",
            zh: "搖錢樹"
        },
        url: "https://picsum.photos/seed/moneytree4/1080/1920.jpg",
        isFree: true
    },
    {
        id: 5,
        name: {
            en: "Exclusive Golden God",
            zh: "專屬黃金財神"
        },
        url: "https://picsum.photos/seed/exclusive5/1080/1920.jpg",
        isFree: false
    },
    {
        id: 6,
        name: {
            en: "Premium Lucky Talisman",
            zh: "高級平安符"
        },
        url: "https://picsum.photos/seed/talisman6/1080/1920.jpg",
        isFree: false
    }
];

function loadWallpapers() {
    const grid = document.getElementById('wallpaper-grid');
    grid.innerHTML = '';
    
    wallpapers.forEach(wallpaper => {
        const name = wallpaper.name[currentLang];
        const locked = !wallpaper.isFree && !hasUnlockedContent();
        const lockIcon = locked ? '<div class="lock-overlay">🔒</div>' : '';
        
        const html = `
            <div class="wallpaper-item">
                <img src="${wallpaper.url}" alt="${name}" loading="lazy">
                ${lockIcon}
                <div class="wallpaper-overlay">
                    <button class="wallpaper-download" data-id="${wallpaper.id}" ${locked ? 'disabled' : ''}>
                        ${locked ? 'Locked' : 'Download'}
                    </button>
                </div>
            </div>
        `;
        
        grid.innerHTML += html;
    });
    
    // Add click handlers
    grid.querySelectorAll('.wallpaper-download:not([disabled])').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(e.target.dataset.id);
            downloadWallpaper(id);
        });
    });
}

function downloadWallpaper(id) {
    const wallpaper = wallpapers.find(w => w.id === id);
    if (!wallpaper) return;
    
    if (!wallpaper.isFree && !hasUnlockedContent()) {
        showToast('This wallpaper is locked. Please make a donation to unlock.');
        return;
    }
    
    // Create download link
    const a = document.createElement('a');
    a.href = wallpaper.url;
    a.download = `lucky-god-wallpaper-${id}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    showToast('Download started!');
}

function hasUnlockedContent() {
    return localStorage.getItem('lucky_god_donated') === 'true';
}

function setUnlockedContent() {
    localStorage.setItem('lucky_god_donated', 'true');
    document.getElementById('unlocked-section').classList.remove('hidden');
}

// Check on load
if (hasUnlockedContent()) {
    document.getElementById('unlocked-section').classList.remove('hidden');
}
