// ============================================
// The Digital Temple of Cai Shen
// Complete App Logic
// ============================================

// ============================================
// State
// ============================================

let currentStep = 'preloader';
let userName = '';
let selectedAmount = 11;
let currentTalisman = null;

// ============================================
// Preloader - Eight Talismans Awakening
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('The Digital Temple of Cai Shen - Initializing...');
    
    // Start preloader animation
    setTimeout(() => {
        startEightTalismansIgnition();
    }, 3000);
    
    setupEventListeners();
});

function startEightTalismansIgnition() {
    const preloader = document.getElementById('preloader');
    const baguaContainer = document.querySelector('.bagua-container');
    
    // Show bagua and start rotation
    baguaContainer.classList.remove('hidden');
    
    // After rotation completes, fade to main content
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            currentStep = 'hero';
        }, 1000);
    }, 3000);
}

// ============================================
// Event Listeners Setup
// ============================================

function setupEventListeners() {
    // Start button from Hero
    document.getElementById('start-btn').addEventListener('click', startRitual);
    
    // Activate button after name input
    document.getElementById('activate-btn').addEventListener('click', activateTalismans);
    
    // Draw talisman button
    document.getElementById('draw-talisman-btn').addEventListener('click', startDrawingTalisman);
    
    // Shake button
    if (document.getElementById('shake-btn')) {
        document.getElementById('shake-btn').addEventListener('click', shakeCylinder);
    }
    
    // Share button
    if (document.getElementById('share-btn')) {
        document.getElementById('share-btn').addEventListener('click', shareTalisman);
    }
    
    // Offer button
    if (document.getElementById('offer-btn')) {
        document.getElementById('offer-btn').addEventListener('click', goToDonation);
    }
    
    // Offering options
    document.querySelectorAll('.offering-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.offering-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            if (this.dataset.amount !== 'custom') {
                selectedAmount = parseFloat(this.dataset.amount);
            } else {
                // Custom amount - for simplicity, use 11
                selectedAmount = 11;
            }
        });
    });
    
    // Select default
    document.querySelector('.offering-option[data-amount="11"]').classList.add('selected');
}

// ============================================
// Step 1: Start Ritual from Hero
// ============================================

function startRitual() {
    document.querySelector('.hero-section').classList.add('hidden');
    document.getElementById('ritual-section').classList.remove('hidden');
    currentStep = 'ritual';
}

// ============================================
// Step 2: Activate Eight Talismans after name input
// ============================================

function activateTalismans() {
    userName = document.getElementById('user-name').value.trim();
    
    if (!userName) {
        showToast('Please enter your name to lock the energy.');
        return;
    }
    
    document.getElementById('ritual-section').classList.add('hidden');
    document.getElementById('blessings-section').classList.remove('hidden');
    currentStep = 'blessings';
    
    // Show blessings one by one
    const blessings = document.querySelectorAll('.blessing');
    let delay = 0;
    
    blessings.forEach((blessing, index) => {
        setTimeout(() => {
            blessing.classList.add('visible');
        }, 1000 + delay);
        delay += 1500;
    });
    
    // Show complete message after all blessings
    setTimeout(() => {
        document.querySelector('.blessings-complete').classList.remove('hidden');
    }, 1000 + delay);
}

// ============================================
// Step 3: Draw Your Talisman
// ============================================

function startDrawingTalisman() {
    document.getElementById('blessings-section').classList.add('hidden');
    document.getElementById('talisman-draw-section').classList.remove('hidden');
    currentStep = 'draw';
}

function shakeCylinder() {
    const cylinder = document.querySelector('.bamboo-cylinder');
    cylinder.classList.add('shaking');
    
    setTimeout(() => {
        // One stick falls out
        const fallingStick = document.querySelector('.stick-5');
        fallingStick.classList.add('fallen');
        
        setTimeout(() => {
            // Move to result
            document.getElementById('talisman-draw-section').classList.add('hidden');
            document.getElementById('talisman-result-section').classList.remove('hidden');
            currentStep = 'result';
            
            // Draw random talisman
            drawRandomTalisman();
        }, 1500);
    }, 1000);
}

function drawRandomTalisman() {
    currentTalisman = getRandomTalisman();
    
    document.getElementById('talisman-number').textContent = `FU #${currentTalisman.number}`;
    document.getElementById('talisman-name').textContent = `"${currentTalisman.name}"`;
    document.getElementById('meaning-text').textContent = currentTalisman.meaning;
    document.getElementById('fu-symbol').textContent = currentTalisman.symbol;
}

// ============================================
// Step 4: Result & Sharing
// ============================================

function shareTalisman() {
    if (!currentTalisman) {
        showToast('Draw your talisman first!');
        return;
    }
    
    const shareText = `🧧 My Fu Talisman from The Digital Temple of Cai Shen 🧧\n\nFU #${currentTalisman.number} — "${currentTalisman.name}"\n\n${currentTalisman.meaning}\n\nDraw your own talisman at:`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Cai Shen Fu Talisman',
            text: shareText,
            url: shareUrl
        }).then(() => {
            showToast('✨ Shared! Blessings multiplied! ✨');
        }).catch((err) => {
            // User canceled share, fallback to copy
            copyToClipboard(shareText + '\n' + shareUrl);
        });
    } else {
        // WebShare API not available, copy to clipboard
        copyToClipboard(shareText + '\n' + shareUrl);
    }
}

function goToDonation() {
    document.getElementById('talisman-result-section').classList.add('hidden');
    document.getElementById('donation-section').classList.remove('hidden');
    currentStep = 'donation';
    
    // Initialize PayPal after donation section is visible
    setTimeout(() => {
        initPayPal();
    }, 100);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✨ Copied to clipboard! Share for extra blessings! ✨');
    }).catch(() => {
        showToast('Unable to copy. Please copy manually.');
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
                        description: `Offering to Cai Shen - ${userName || 'Guest'}`
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    showToast(`🙏 Thank you for your offering, ${details.payer.name.givenName}! Great fortune is coming! 🧧`);
                });
            },
            onError: function(err) {
                console.error(err);
                showToast('Payment failed. Please try again.');
            }
        }).render('#paypal-button-container');
    } else {
        console.log('PayPal SDK not loaded - check your client ID');
        setTimeout(() => {
            if (typeof paypal === 'undefined') {
                showToast('PayPal loading... Please wait a moment.');
            }
        }, 2000);
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
