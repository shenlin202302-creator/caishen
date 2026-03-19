// ============================================
// Fortune Data - All blessings for wealth and prosperity
// ============================================

const fortuneData = {
    levels: [
        { name: "Supreme Blessing", icon: "👑", color: "#FFD700" },
        { name: "Great Fortune", icon: "💎", color: "#00CED1" },
        { name: "Golden Luck", icon: "🌟", color: "#FFA500" },
        { name: "Prosperity Flow", icon: "💰", color: "#32CD32" }
    ],
    
    blessings: [
        // Supreme wealth blessings
        "The God of Wealth has marked you. Massive fortune is rushing toward you from all directions.",
        "Your money luck is exploding! Unexpected windfalls are coming your way this month.",
        "The universe has approved your wealth. Prepare for a massive financial upgrade.",
        "Your bank account is about to receive a divine blessing. Stay ready.",
        "Fortune favors you today. A golden opportunity that will change your life is approaching.",
        
        // Business & career wealth
        "Your business ventures will flourish beyond imagination. Profits are guaranteed.",
        "That big client you've been waiting for will sign the deal very soon.",
        "Your career is about to skyrocket. A major promotion and raise are coming.",
        "Your investments will multiply. Every stock you touch will turn to gold.",
        "New business opportunities are flowing to you. Success is inevitable.",
        
        // Luck & windfalls
        "Lady Luck has taken a special interest in you. Expect miraculous blessings.",
        "A surprise windfall is heading your way. Check your accounts often.",
        "Your lottery luck is at its peak. Fortune numbers favor you today.",
        "An unexpected inheritance or gift of great value will come to you.",
        "The stars align for your wealth. Abundance is your birthright.",
        
        // Continuous prosperity
        "Money will flow to you continuously like a mighty river.",
        "Your prosperity consciousness attracts unlimited wealth.",
        "Financial freedom is already yours. Claim it with confidence.",
        "Every door you knock on will open to reveal golden opportunities.",
        "Your wealth mindset creates your wealthy reality. Stay positive.",
        
        // Divine protection & blessing
        "The God of Wealth watches over you. Your prosperity is protected.",
        "Divine favor surrounds your financial endeavors. Success is guaranteed.",
        "Ancient blessings of abundance flow through you now.",
        "Sacred symbols of wealth light your path to prosperity.",
        "The Tao of wealth smiles upon you. Fortune is your companion."
    ],
    
    runes: ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"],
    
    chineseChars: ["財", "福", "祿", "壽", "喜", "吉", "祥", "瑞"]
};

// ============================================
// Fortune Generation Functions
// ============================================

function generateSeed() {
    const now = new Date();
    return now.getTime() + Math.random() * 10000;
}

function getRandomItem(array, seed) {
    const index = Math.abs(seed % array.length);
    return array[index];
}

function generateFortune() {
    const seed = generateSeed();
    
    const level = getRandomItem(fortuneData.levels, seed);
    const blessing = getRandomItem(fortuneData.blessings, seed + 1);
    const rune1 = getRandomItem(fortuneData.runes, seed + 2);
    const rune2 = getRandomItem(fortuneData.runes, seed + 3);
    const char = getRandomItem(fortuneData.chineseChars, seed + 4);
    
    return {
        level: level,
        blessing: blessing,
        runes: [rune1, rune2],
        char: char,
        timestamp: new Date().toISOString()
    };
}

// ============================================
// Export for use in app.js
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fortuneData, generateFortune };
}
