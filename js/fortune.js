const fortuneMessages = {
    en: [
        "Great fortune is coming your way. Stay ready.",
        "Your kindness will attract unexpected prosperity.",
        "A golden opportunity will knock on your door soon.",
        "Your hard work will pay off in ways you don't expect.",
        "Good things come to those who wait. Your turn is next.",
        "Wealth flows to where energy flows. Keep your focus positive.",
        "An unexpected windfall is coming your way this month.",
        "Your network is your net worth. New connections bring new fortune.",
        "Trust the process. Your patience will be rewarded with prosperity.",
        "A pleasant surprise regarding money is coming your way.",
        "New doors are opening. Step through with confidence.",
        "Your positive attitude is your best magnet for wealth.",
        "Financial freedom is closer than you think. Keep going.",
        "An old friend will bring you a new opportunity.",
        "Luck favors the bold. Take that calculated risk.",
        "Abundance is coming. Get ready to receive.",
        "Your creativity will lead you to unexpected income.",
        "Good fortune comes in many forms. Keep your eyes open.",
        "Prosperity is a habit. You're building it correctly.",
        "Today is the day your luck begins to change for the better.",
        "YOU WILL GET RICH this year. The universe has approved it.",
        "A huge jackpot is waiting for you around the next corner.",
        "Money is rushing towards you from multiple directions.",
        "Your bank account is about to get a massive surprise.",
        "Seven figures are coming your way. Start preparing.",
        "Your stock picks will green all year. Big profits coming.",
        "Luck is with you at the poker table. Tonight is your night.",
        "Your side hustle will blow up this month. Get ready.",
        "Salary raise coming next week. You deserve it.",
        "The big client you've been waiting for will say yes tomorrow."
    ],
    zh: [
        "大吉大利，好運即將到來，請做好準備。",
        "你的善心善舉，將會吸引意想不到的財富。",
        "絕佳的機會即將敲門，準備迎接吧。",
        "現在的努力耕耘，日後會有超乎預期的收穫。",
        "好運留給有準備的人，輪到你了。",
        "財富隨著能量走，保持正向，財富自然來。",
        "這個月會有意外之財降臨。",
        "你的人脈就是你的錢脈，新的連結帶來新的財運。",
        "相信過程，你的耐心會得到豐厚的回報。",
        "金錢方面即將有驚喜發生。",
        "新的大門正在打開，勇敢邁進去吧。",
        "正向的態度是吸引財富最好的磁鐵。",
        "財務自由比你想像的更近，繼續堅持。",
        "老朋友會帶來新機會。",
        "好運眷顧勇者，那個評估過的風險可以試試。",
        "豐盛富足即將到來，準備好接收吧。",
        "你的創意會為你帶來額外收入。",
        "好運有很多樣子，擦亮眼睛仔細看。",
        "繁榮富足是一種習慣，你走在正確的路上。",
        "今天就是你好運轉旺的開始。",
        "今年必定發大財，老天已經同意了。",
        "大財運就在下一個轉角等你，快接好。",
        "金錢從四面八方湧進你的口袋。",
        "你的銀行帳戶即將迎來驚喜大爆發。",
        "百萬大關就在今年，準備接財神。",
        "買的股票天天漲，年底收成裝滿箱。",
        "今晚打牌手氣旺，莊家通殺贏滿袋。",
        "你的副業這個月就要爆單，準備數錢。",
        "下週就要漲薪水，你的努力老闆看見了。",
        "你等很久那個大客戶，明天就會簽約點頭。"
    ]
};

// Simple deterministic random from seed
function simpleHash(seed) {
    let hash = seed;
    hash = ((hash >> 16) ^ hash) * 0x45d9f3b;
    hash = ((hash >> 16) ^ hash);
    return hash;
}

function getDeterministicFortune(seed) {
    // Different fortune every draw - based on seed which includes date + draw count
    const messages = fortuneMessages[currentLang];
    const hash = simpleHash(seed);
    const randomIndex = Math.abs(hash) % messages.length;
    return messages[randomIndex];
}

function getDailyFortune() {
    // Use date for consistent daily fortune per user
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const randomIndex = seed % fortuneMessages[currentLang].length;
    return fortuneMessages[currentLang][randomIndex];
}

function getRandomFortune() {
    // Truly random for extra draws
    const messages = fortuneMessages[currentLang];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}
