// ============================================
// Lucky God - Simplified App
// Only fortune drawing, sharing, and donations
// ============================================

// ============================================
// State
// ============================================

let currentFortune = null;
let selectedAmount = 6.66;

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initSplashScreen();
    setupEventListeners();
    initPayPal();
});

function initSplashScreen() {
    // 3 second splash screen
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.classList.add('fade-out');
        setTimeout(() => {
            splash.classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
        }, 800);
    }, 3000);
}

// ============================================
// Event Listeners
// ============================================

function setupEventListeners() {
    // Main fortune draw button
    document.getElementById('draw-fortune-btn').addEventListener('click', drawFortune);
    
    // Draw again button
    document.getElementById('draw-again-btn').addEventListener('click', drawFortune);
    
    // Share button
    document.getElementById('share-fortune-btn').addEventListener('click', shareFortune);
    
    // Donate button
    document.getElementById('donate-btn').addEventListener('click', () => {
        document.querySelector('.donation-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Donation options
    document.querySelectorAll('.donation-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.donation-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedAmount = parseFloat(this.dataset.amount);
        });
    });
    
    // Select default amount
    document.querySelector('.donation-option[data-amount="6.66"]').classList.add('selected');
}

// ============================================
// Fortune Drawing
// ============================================

function drawFortune() {
    // Generate new fortune
    currentFortune = generateFortune();
    
    // Hide result if showing
    const resultDiv = document.getElementById('fortune-result');
    resultDiv.classList.add('hidden');
    
    // Show loading animation on button
    const btn = document.getElementById('draw-fortune-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="btn-text">✨ Consulting the Divine ✨</span>';
    btn.disabled = true;
    
    // Simulate divine consultation
    setTimeout(() => {
        // Restore button
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Display fortune
        displayFortune(currentFortune);
        
        // Show result area
        resultDiv.classList.remove('hidden');
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Show toast
        showToast('✨ Divine blessing received! Share for extra luck! ✨');
        
    }, 2000);
}

function displayFortune(fortune) {
    // Set level
    document.getElementById('fortune-level').innerHTML = `
        <span class="level-icon">${fortune.level.icon}</span>
        <span class="level-name" style="color: ${fortune.level.color}">${fortune.level.name}</span>
    `;
    
    // Set blessing text with runes decoration
    document.getElementById('fortune-text').innerHTML = `
        <div class="fortune-runes">
            <span class="rune">${fortune.runes[0]}</span>
            <span class="rune">${fortune.char}</span>
            <span class="rune">${fortune.runes[1]}</span>
        </div>
        <p class="blessing-text">${fortune.blessing}</p>
        <div class="fortune-seal">
            <span class="seal-char">財神印</span>
        </div>
    `;
}

// ============================================
// Sharing
// ============================================

function shareFortune() {
    if (!currentFortune) {
        showToast('Draw a fortune first!');
        return;
    }
    
    const shareText = `🧧 Lucky God Fortune 🧧\n\n${currentFortune.level.icon} ${currentFortune.level.name}\n\n"${currentFortune.blessing}"\n\nDraw your own fortune at:`;
    const shareUrl = window.location.href;
    
    // Try native share
    if (navigator.share) {
        navigator.share({
            title: 'My Lucky God Fortune',
            text: shareText,
            url: shareUrl
        }).then(() => {
            showToast('✨ Shared! The God of Wealth smiles upon you! ✨');
        }).catch(() => {
            copyToClipboard(shareText + ' ' + shareUrl);
        });
    } else {
        copyToClipboard(shareText + ' ' + shareUrl);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✨ Fortune copied! Share for extra blessings! ✨');
    }).catch(() => {
        showToast('Unable to copy. Please share manually!');
    });
}

// ============================================
// PayPal Integration
// ============================================

function initPayPal() {
    if (typeof paypal !== 'undefined') {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: selectedAmount.toFixed(2)
                        },
                        description: 'Lucky God Divine Offering'
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    showToast('🧧 Thank you for your offering! Great fortune is coming! 🧧');
                });
            },
            onError: function(err) {
                console.error(err);
                showToast('Payment failed. Please try again.');
            }
        }).render('#paypal-button-container');
    }
}

// ============================================
// Toast Notification
// ============================================

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
