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
let friendName = '';
let friendMessage = '';
let isFriendOffering = false;

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
    
    // Build full meaning with friend attribution if needed
    let fullMeaning = currentTalisman.meaning;
    
    if (isFriendOffering && friendName) {
        fullMeaning += `\n\n<div class="friend-attribution">
            <p><em>This blessing was requested by <strong>${escapeHtml(userName)}</strong> for <strong>${escapeHtml(friendName)}</strong>.</em></p>`;
        
        if (friendMessage) {
            fullMeaning += `<p class="friend-personal-message">"${escapeHtml(friendMessage)}"</p>`;
        }
        
        fullMeaning += `<p><em>May the energy find them and bring great fortune. Thank you for your offering.</em></p>
            </div>`;
    } else if (isFriendOffering) {
        // Friend name missing but still friend offering
        fullMeaning += `\n\n<p><em>This blessing was requested with gratitude by a friend. May the energy find its target.</em></p>`;
    }
    
    document.getElementById('meaning-text').innerHTML = fullMeaning;
    document.getElementById('fu-symbol').textContent = currentTalisman.symbol;
    
    // FIX: Set the sigil image URL for download and show download button
    // If you have pre-generated sigil images (recommended), use:
    const randomSigilNum = currentTalisman.number;
    // Replace this URL prefix with your actual CDN
    const sigilImageUrl = `https://your-cdn.yourdomain.com/sigils/sigil-${randomSigilNum}.png`;
    setCurrentSigilImage(sigilImageUrl);
    
    // If you want "pay after reading, download after pay":
    // - If NOT paid: keep button hidden, show when payment completes
    // - If FREE preview + paid download: uncomment below to show download button that prompts payment
    // document.getElementById('download-wallpaper-btn').style.display = 'inline-flex';
    // If you want FREE download (for conversion): show button immediately
    document.getElementById('download-wallpaper-btn').style.display = 'inline-flex';
}

// Simple HTML escape for safety
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Step 4: Result & Sharing
// ============================================

function shareTalisman() {
    if (!currentTalisman) {
        showToast('Draw your talisman first!');
        return;
    }
    
    // Open custom share modal
    openShareModal();
}

// ============================================
// Share Modal
// ============================================

function openShareModal() {
    const shareText = `🧧 I just drew a Fu Talisman from the Digital Temple of Cai Shen, the God of Wealth.  

FU #${currentTalisman.number} — "${currentTalisman.name}"

${currentTalisman.meaning}

${window.location.href}

Digital Temple of Cai Shen, the God of Wealth
Your fortune is waiting.
Would you like to receive a blessing?
Each talisman is drawn just for you.`;
    const shareUrl = window.location.href;
    const fullShareText = shareText;
    
    // Set full share text in input (for copying)
    document.getElementById('share-url-input').value = fullShareText;
    
    // Build social share links - share the full text with call to action
    const encodedText = encodeURIComponent(fullShareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    document.getElementById('share-twitter').href = 
        `https://twitter.com/intent/tweet?text=${encodedText}`;
    document.getElementById('share-facebook').href = 
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
    document.getElementById('share-whatsapp').href = 
        `https://wa.me/?text=${encodedText}`;
    
    // Show modal
    document.getElementById('share-modal').classList.remove('hidden');
}

function closeShareModal() {
    document.getElementById('share-modal').classList.add('hidden');
}

// Copy share URL to clipboard
function copyShareUrl() {
    const input = document.getElementById('share-url-input');
    input.select();
    navigator.clipboard.writeText(input.value).then(() => {
        showToast('✨ Link copied! Paste it to share ✨');
    }).catch(() => {
        showToast('Unable to copy. Please copy manually.');
    });
}

// Open native share from modal
function openNativeShare() {
    if (!navigator.share) {
        showToast('Native share not supported on this browser.');
        return;
    }
    
    const shareText = `🧧 My Fu Talisman from The Digital Temple of Cai Shen 🧧\n\nFU #${currentTalisman.number} — "${currentTalisman.name}"\n\n${currentTalisman.meaning}\n\nDraw your own talisman at:`;
    const shareUrl = window.location.href;
    
    navigator.share({
        title: 'My Cai Shen Fu Talisman',
        text: shareText,
        url: shareUrl
    }).then(() => {
        showToast('✨ Shared! Blessings multiplied! ✨');
        closeShareModal();
    }).catch((err) => {
        // User canceled, do nothing
    });
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

// Read friend offering information
function readFriendInfo() {
    const friendInput = document.getElementById('friend-name');
    const messageInput = document.getElementById('friend-message');
    
    if (friendInput && friendInput.value.trim()) {
        friendName = friendInput.value.trim();
        isFriendOffering = true;
        selectedAmount = 1; // $1 fixed price for friend incense
    } else {
        friendName = '';
        isFriendOffering = false;
    }
    
    if (messageInput && messageInput.value.trim()) {
        friendMessage = messageInput.value.trim();
    } else {
        friendMessage = '';
    }
}

// After friend offering payment, go to draw the friend's talisman
function goToDrawFromDonation() {
    document.getElementById('donation-section').classList.add('hidden');
    document.getElementById('talisman-draw-section').classList.remove('hidden');
    currentStep = 'draw';
}

function initPayPal() {
    if (typeof paypal !== 'undefined') {
        paypal.Buttons({
            createOrder: function(data, actions) {
                // Read friend info before creating order
                readFriendInfo();
                
                let description = `Offering to Cai Shen - ${userName || 'Guest'}`;
                
                if (isFriendOffering && friendName) {
                    description = `Incense for ${friendName} - requested by ${userName || 'Guest'}`;
                }
                
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: selectedAmount.toFixed(2)
                        },
                        description: description
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    showToast(`🙏 Thank you for your offering, ${details.payer.name.givenName}! Great fortune is coming! 🧧`);
                    
                    // If this is an offering for a friend, go draw their talisman
                    if (isFriendOffering) {
                        setTimeout(() => {
                            goToDrawFromDonation();
                        }, 1500);
                    }
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

// ============================================
// Offering Amount Selection
// ============================================

document.addEventListener('click', function(e) {
    // Handle offering option clicks
    if (e.target.closest('.offering-option')) {
        const option = e.target.closest('.offering-option');
        const amount = option.dataset.amount;
        
        // Remove previous selection
        document.querySelectorAll('.offering-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Select this option
        option.classList.add('selected');
        
        if (amount === 'custom') {
            // For custom amount, show prompt
            const custom = prompt('Enter your custom offering amount (USD):', '');
            if (custom && !isNaN(parseFloat(custom)) && parseFloat(custom) > 0) {
                selectedAmount = parseFloat(custom);
                showToast(`Custom offering selected: $${selectedAmount.toFixed(2)}`);
            }
        } else {
            selectedAmount = parseFloat(amount);
            showToast(`Offering selected: $${selectedAmount.toFixed(2)}`);
        }
        
        // If friend name is filled, it overrides to $1
        const friendInput = document.getElementById('friend-name');
        if (friendInput && friendInput.value.trim()) {
            selectedAmount = 1;
            showToast('Incense for a friend: $1 fixed price');
        }
    }
});

// Update amount when friend name is entered
document.addEventListener('input', function(e) {
    if (e.target.id === 'friend-name') {
        if (e.target.value.trim()) {
            selectedAmount = 1;
            document.querySelectorAll('.offering-option').forEach(opt => {
                opt.classList.remove('selected');
            });
        }
    }
});

// ============================================
// Share Modal Event Listeners
// ============================================

document.addEventListener('click', function(e) {
    // Close modal when clicking backdrop
    if (e.target.id === 'close-share-modal' || e.target.classList.contains('share-modal-backdrop')) {
        closeShareModal();
    }
    
    // Copy share URL button
    if (e.target.id === 'copy-share-url') {
        copyShareUrl();
    }
    
    // Native share button
    if (e.target.id === 'native-share') {
        openNativeShare();
    }
    
    // Download wallpaper button (NEW)
    if (e.target.id === 'download-wallpaper-btn') {
        downloadCurrentSigilWallpaper();
    }
    
    // Submit user testimony message (NEW)
    if (e.target.id === 'submit-message-btn') {
        submitUserMessage();
    }
});

// ============================================
// The Gratitude Altar - Submit Intention
// ============================================

document.addEventListener('click', function(e) {
    if (e.target.id === 'submit-gratitude-btn') {
        submitGratitude();
    }
});

document.addEventListener('keypress', function(e) {
    if (e.target.id === 'gratitude-input' && e.key === 'Enter') {
        submitGratitude();
    }
});

function submitGratitude() {
    const input = document.getElementById('gratitude-input');
    const text = input.value.trim();
    
    if (!text) {
        showToast('Please whisper your intention before sealing!');
        return;
    }
    
    if (text.length > 140) {
        showToast('Intention is too long! Max 140 characters.');
        return;
    }
    
    // Store in localStorage
    try {
        const existing = getGratitudeMessages();
        existing.unshift({
            text: text,
            timestamp: Date.now(),
            location: getRandomLocation()
        });
        // Keep last 20
        const trimmed = existing.slice(0, 20);
        localStorage.setItem('cai-shen-gratitude', JSON.stringify(trimmed));
        input.value = '';
        showToast('✨ Your intention is sealed in the altar ✨');
    } catch (e) {
        console.error('Failed to save:', e);
        showToast('Failed to seal intention. Please try again.');
    }
}

function getGratitudeMessages() {
    try {
        const stored = localStorage.getItem('cai-shen-gratitude');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load gratitude:', e);
    }
    return [];
}

function getRandomLocation() {
    const firstInitial = [
        'A.', 'B.', 'C.', 'D.', 'E.', 'J.', 'K.', 'L.', 'M.', 
        'N.', 'P.', 'R.', 'S.', 'T.', 'W.'
    ];
    const cities = [
        'Madrid', 'NYC', 'London', 'Berlin', 'Singapore', 'Tokyo', 
        'Paris', 'Austin', 'Toronto', 'Sydney', 'Los Angeles', 'Chicago'
    ];
    const first = firstInitial[Math.floor(Math.random() * firstInitial.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    return `${first} from ${city}`;
}

// ============================================
// Legacy User Messages Board - kept for reference
// ============================================

// Load existing messages when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Already handled by static pre-populated scroll
});

function getStoredMessages() {
    try {
        const stored = localStorage.getItem('cai-shen-messages');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load messages:', e);
    }
    return [];
}

function saveMessage(message) {
    const messages = getStoredMessages();
    // Add new message with timestamp
    messages.unshift({
        text: message,
        timestamp: Date.now(),
        location: getRandomLocation()
    });
    // Keep only last 20 messages
    const trimmed = messages.slice(0, 20);
    try {
        localStorage.setItem('cai-shen-messages', JSON.stringify(trimmed));
    } catch (e) {
        console.error('Failed to save message:', e);
    }
    return trimmed;
}

function loadUserMessages() {
    const container = document.getElementById('messages-container');
    if (!container) return;
    
    // Remove loading message
    container.innerHTML = '';
    
    const messages = getStoredMessages();
    
    if (messages.length === 0) {
        container.innerHTML = '<div class="loading-msg" style="color: var(--color-text-dim); font-style: italic;">No testimonies yet. Be the first to share! ✨</div>';
        return;
    }
    
    messages.forEach(msg => {
        const date = new Date(msg.timestamp);
        const dateStr = date.toLocaleDateString('en-US');
        
        const div = document.createElement('div');
        div.className = 'user-message-item';
        div.innerHTML = `
            <p class="user-message-text">${escapeHtml(msg.text)}</p>
            <p class="user-message-meta">${dateStr} • ${msg.location}</p>
        `;
        container.appendChild(div);
    });
}

function submitUserMessage() {
    const input = document.getElementById('user-message-input');
    const text = input.value.trim();
    
    if (!text) {
        showToast('Please write something before sharing!');
        return;
    }
    
    // Don't allow empty or too long
    if (text.length > 140) {
        showToast('Message is too long! Max 140 characters.');
        return;
    }
    
    // Save and reload
    saveMessage(text);
    loadUserMessages();
    input.value = '';
    showToast('✨ Thank you for sharing your testimony! ✨');
}


// ============================================
// NEW: 24h Expiry Countdown & Wallpaper Download
// ============================================

// Start 24-hour countdown when result page loads
let countdownInterval;

function startCountdown() {
    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Calculate expiry time (24 hours from now)
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
    const displayEl = document.getElementById('countdown-display');
    
    countdownInterval = setInterval(() => {
        const now = Date.now();
        const diff = expiryTime - now;
        
        if (diff <= 0) {
            displayEl.textContent = '00:00:00';
            clearInterval(countdownInterval);
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        displayEl.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
    
    // If we have a stored sigil image URL, show download button
    if (currentSigilImageUrl) {
        document.getElementById('download-wallpaper-btn').style.display = 'inline-flex';
    }
}

// Current sigil image URL (for download)
let currentSigilImageUrl = null;

// Set the current sigil image (you can set this when generating the image)
function setCurrentSigilImage(imageUrl) {
    currentSigilImageUrl = imageUrl;
    if (document.getElementById('download-wallpaper-btn')) {
        document.getElementById('download-wallpaper-btn').style.display = 
            imageUrl ? 'inline-flex' : 'none';
    }
}

// Download the current sigil as high-res wallpaper
async function downloadCurrentSigilWallpaper() {
    if (!currentSigilImageUrl) {
        showToast('No sigil image generated yet.');
        return;
    }
    
    try {
        // Fetch the image as blob
        const response = await fetch(currentSigilImageUrl);
        const blob = await response.blob();
        
        // Create object URL
        const blobUrl = window.URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `My-Cosmic-Sigil-${currentTalisman ? currentTalisman.number : 'Custom'}.png`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        
        showToast('✨ Wallpaper downloaded! Set it as your lock screen to activate ✨');
    } catch (error) {
        console.error('Download failed:', error);
        showToast('Oops! The energy flow was interrupted. Please try again.');
    }
}

// Start countdown when result page is shown
const originalDrawRandomTalisman = drawRandomTalisman;
drawRandomTalisman = function() {
    // Call original function
    originalDrawRandomTalisman();
    
    // Start countdown for the new sigil
    setTimeout(() => {
        startCountdown();
    }, 100);
    
    // If you're generating the image somewhere else, call setCurrentSigilImage()
    // For static pre-generated sigils, we can use a random one from your CDN
    // This example uses a random pre-generated image
    const randomSigilNum = Math.floor(Math.random() * 50) + 1;
    // Replace with your CDN URL pattern
    const imageUrl = `https://your-cdn.yourdomain.com/sigils/sigil-${randomSigilNum}.png`;
    setCurrentSigilImage(imageUrl);
};

