// ============================================
// 36 Fu Talismans for Wealth & Prosperity
// Each with unique meaning and Taoist philosophy
// ============================================

const fuTalismans = [
    {
        number: 1,
        name: "THE RIVER FLOWS",
        symbol: "☵",
        meaning: "Like water carving mountains, wealth slowly shapes your path. Do not rush. The current carries you where you need to go. Patience is your greatest ally."
    },
    {
        number: 2,
        name: "THE MOUNTAIN STANDS",
        symbol: "☶",
        meaning: "A mountain does not chase fortune. Fortune comes to it. Your stability attracts wealth. Stand firm, and opportunities will gather at your feet."
    },
    {
        number: 3,
        name: "THE THUNDER AWAKENS",
        symbol: "☳",
        meaning: "Thunder shakes the earth awake. An opportunity you have waited for is about to land. When you hear the call, move instantly. This is your moment."
    },
    {
        number: 4,
        name: "THE WIND PENETRATES",
        symbol: "☴",
        meaning: "The wind finds every crack and opening. Opportunities are everywhere if you keep your senses sharp. Stay flexible, and you will profit where others see nothing."
    },
    {
        number: 5,
        name: "THE FIRE CLARIFIES",
        symbol: "☲",
        meaning: "Fire burns away the fog. Your vision becomes clear. What was hidden is revealed. Now is the time to make your move with confidence."
    },
    {
        number: 6,
        name: "THE LAKE JOYS",
        symbol: "☱",
        meaning: "Water reflects abundance, and joy attracts more joy. Celebrate what you have, and more will come. Your positive energy is a magnet for wealth."
    },
    {
        number: 7,
        name: "THE HEAVEN CREATES",
        symbol: "☰",
        meaning: "Heaven supports creative action. New beginnings are blessed. The energy of creation flows through you. Whatever you start now will grow."
    },
    {
        number: 8,
        name: "THE EARTH RECEIVES",
        symbol: "☷",
        meaning: "The earth receives all seeds and grows them. You are ready to receive. Open your hands, open your heart. The gifts are on their way."
    },
    {
        number: 9,
        name: "THE BAMBOO GROWS",
        symbol: "竹",
        meaning: "This Fu carries the energy of patience and steady rise. The first year, the bamboo sleeps. The second year, it creeps. The third year, it leaps—growing 90 feet in 6 weeks. Your roots are deepening. Do not mistake silence for stillness."
    },
    {
        number: 10,
        name: "THE GOLDEN DOOR",
        symbol: "門",
        meaning: "A door that has been closed for a long time is about to open. The key has been in your hand all along. Step through when you feel the call. Great treasure waits on the other side."
    },
    {
        number: 11,
        name: "THE DRAGON BRINGS PEARL",
        symbol: "龍",
        meaning: "The celestial dragon carries the pearl of wealth to your door. This is an ancient blessing—one that only comes once in a great while. Prepare to receive."
    },
    {
        number: 12,
        name: "THE WHEEL TURNS",
        symbol: "輪",
        meaning: "The wheel of fortune has turned in your favor. What was down comes up. What was stuck begins to move. The energy shift is real—you are going up now."
    },
    {
        number: 13,
        name: "THE WELL OVERFLOWS",
        symbol: "井",
        meaning: "Your well of opportunity has gone dry in the past—but now the rain has come. Water flows again. Abundance returns. What was empty fills."
    },
    {
        number: 14,
        name: "THE TREASURE SHIP",
        symbol: "船",
        meaning: "A ship loaded with treasure is sailing into your harbor. It has been on the ocean for a long time, but the journey is over. Prepare to unload your fortune."
    },
    {
        number: 15,
        name: "THE CANDLE BURNS",
        symbol: "燭",
        meaning: "A single candle lights a thousand paths. Clarity is coming to a confused situation. Once you see clearly, the path opens. Your next step is obvious."
    },
    {
        number: 16,
        name: "THE PHOENIX RISES",
        symbol: "鳳",
        meaning: "From the ashes of past failures, the phoenix rises. You are being reborn. What you learned in struggle becomes the fuel for your success. Greatness awaits."
    },
    {
        number: 17,
        name: "FIVE ROADS OPEN",
        symbol: "五路",
        meaning: "The Five Gods of Wealth have opened all five roads. Money comes from unexpected directions. Do not limit where wealth can find you. Stay open to all sources."
    },
    {
        number: 18,
        name: "THE OX PLOWS",
        symbol: "牛",
        meaning: "The ox steadily plows the field. You have done the work. Now you wait for the harvest. The seeds you planted earlier will sprout. Your patience will be rewarded."
    },
    {
        number: 19,
        name: "THE BELL TOLLS",
        symbol: "鐘",
        meaning: "The temple bell rings—your fortune is being called. The sound travels far. Everyone will know of your good luck. This is your moment of announcement."
    },
    {
        number: 20,
        name: "THE MOON SHINES",
        symbol: "月",
        meaning: "The moon reflects the sun's light. Your fortune reflects your inner state. You have cultivated peace, and peace attracts wealth. The light is on your path."
    },
    {
        number: 21,
        name: "THE GARDEN GROWS",
        symbol: "園",
        meaning: "Different plants grow in different seasons. Everything happens in its own time. Trust the timing. Your garden is being prepared. The harvest will come when it is ready."
    },
    {
        number: 22,
        name: "THE BRIDGE CONNECTS",
        symbol: "橋",
        meaning: "A bridge connects where you are to where you need to be. The connection has been made. Help is coming from an unexpected direction. You will cross over safely."
    },
    {
        number: 23,
        name: "THE BOOK OPENS",
        symbol: "書",
        meaning: "The book of your fortune opens to the right page. The wisdom you need is available. Learning a new skill will open the door to new income. Knowledge becomes wealth."
    },
    {
        number: 24,
        name: "THE RICE RIPENS",
        symbol: "稻",
        meaning: "The rice plant bends under the weight of grain. Your pockets will soon bend under the weight of money. The harvest is heavy. You have earned this."
    },
    {
        number: 25,
        name: "THE STARS ALIGN",
        symbol: "星",
        meaning: "The celestial bodies have moved into perfect alignment for you. This is a rare configuration. Take action now while the heavens smile. The energy supports you."
    },
    {
        number: 26,
        name: "THE IRON SMELTS",
        symbol: "冶",
        meaning: "In the fire, iron becomes steel. Your struggles are forging your strength. What doesn't break you makes you stronger—and richer. The fire is almost done."
    },
    {
        number: 27,
        name: "THE ROAD STRAIGHTENS",
        symbol: "路",
        meaning: "The road was winding, and obstacles blocked the way. Now the path clears. The way forward is open. You can travel fast. Your destination is in sight."
    },
    {
        number: 28,
        name: "THE GUEST ARRIVES",
        symbol: "賓",
        meaning: "An unexpected guest brings good news. This visitor carries opportunity. Welcome them warmly. Their arrival changes everything for the better."
    },
    {
        number: 29,
        name: "THE SEAL IS STAMPED",
        symbol: "印",
        meaning: "The divine seal has been stamped on your request. The answer is yes. Approval is given. What you asked for is granted. The paperwork is complete in heaven."
    },
    {
        number: 30,
        name: "THE SPRING FLOWERS",
        symbol: "春",
        meaning: "After winter comes spring. Your cold season is over. Flowers bloom everywhere. Warmth returns. Money flows again. This is your time of growth."
    },
    {
        number: 31,
        name: "THE ECHO RETURNS",
        symbol: "聲",
        meaning: "What you put out into the world comes back to you. You have given generously, and generosity returns multiplied. The law of attraction works perfectly here."
    },
    {
        number: 32,
        name: "THE HORN RESOUNDS",
        symbol: "角",
        meaning: "The hunter's horn announces the catch. Your hunt is successful. The prey has been taken. Celebrate the victory. You have caught what you were chasing."
    },
    {
        number: 33,
        name: "THE JEWEL SHINES",
        symbol: "寶",
        meaning: "A great jewel has been hidden in the earth, and now it is unearthed. Your true value is revealed. Others see your worth, and they will pay for it. The gem is out of the dark."
    },
    {
        number: 34,
        name: "THE WIND BRINGS NEWS",
        symbol: "風",
        meaning: "The wind carries news from far away. This message changes your plans for the better. Pay attention to what you hear. The information you receive leads to profit."
    },
    {
        number: 35,
        name: "THE ALTAR STANDS",
        symbol: "壇",
        meaning: "You have prepared the altar correctly. The gods see your sincerity. The blessing will descend. Your offering is accepted. The energy connects."
    },
    {
        number: 36,
        name: "ALL DOORS OPEN",
        symbol: "八方",
        meaning: "Eight directions, eight doors—all open at once. Wealth flows from every side. Opportunities in every direction. You are at the center of the grid. Everything comes to you."
    }
];

// ============================================
// Get random talisman for drawing
// ============================================

function getRandomTalisman() {
    const randomIndex = Math.floor(Math.random() * fuTalismans.length);
    return fuTalismans[randomIndex];
}
