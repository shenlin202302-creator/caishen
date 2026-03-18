// Statistics
let stats = {
    visitors: parseInt(localStorage.getItem('lucky_god_visitors') || '0'),
    fortunes: parseInt(localStorage.getItem('lucky_god_fortunes') || '0'),
    shares: parseInt(localStorage.getItem('lucky_god_shares') || '0'),
    donations: parseInt(localStorage.getItem('lucky_god_donations') || '0')
};

// Increment visitor count
stats.visitors++;
localStorage.setItem('lucky_god_visitors', stats.visitors.toString());

// Splash screen timer - with firecracker sound
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Play firecracker sound when splash starts
    try {
        const audio = document.getElementById('firecrackerAudio');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Autoplay blocked:', e));
    } catch(e) {}
    
    // 3-second splash screen with gold falling animation
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        splash.classList.add('fade-out');
        setTimeout(() => {
            splash.classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            window.scrollTo(0, 0);
        }, 800);
    }, 3000);
    
    // Initialize language
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.includes('zh')) {
        currentLang = 'zh';
        changeLanguage('zh');
        document.querySelector('.lang-btn[data-lang="zh"]').classList.add('active');
        document.querySelector('.lang-btn[data-lang="en"]').classList.remove('active');
    }
    
    // Event listeners
    setupEventListeners();
    
    // Initialize PayPal
    initPayPal();
});

function setupEventListeners() {
    // Language switch
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            changeLanguage(lang);
        });
    });
    
    // Daily fortune draw - front page direct draw
    document.getElementById('draw-daily-fortune').addEventListener('click', function() {
        stats.fortunes++;
        localStorage.setItem('lucky_god_fortunes', stats.fortunes.toString());
        
        const fortuneText = getDailyFortune();
        document.getElementById('daily-fortune-text').textContent = fortuneText;
        document.getElementById('daily-fortune-result').classList.remove('hidden');
        
        // Show floating donate button after user gets fortune
        setTimeout(() => {
            document.getElementById('float-donate-btn').classList.remove('hidden');
            document.getElementById('float-donate-btn').addEventListener('click', () => {
                document.querySelector('.donation-section').scrollIntoView({ behavior: 'smooth' });
            });
        }, 1000);
        
        // Scroll to result
        setTimeout(() => {
            document.getElementById('daily-fortune-result').scrollIntoView({ behavior: 'smooth' });
        }, 200);
    });
    
    // Start test
    document.getElementById('start-test-btn').addEventListener('click', openTestModal);
    
    // Browse wallpapers
    document.getElementById('browse-wallpapers-btn').addEventListener('click', openWallpaperModal);
    
    // Share button
    document.getElementById('share-btn').addEventListener('click', openShare);
    
    // Modal close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });
    
    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Donation selection
    document.querySelectorAll('.donation-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.donation-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            selectedAmount = parseFloat(this.dataset.amount);
        });
    });
    
    // Select 6.66 by default
    document.querySelector('.donation-option[data-amount="6.66"]').classList.add('selected');
    selectedAmount = 6.66;
    
    // Share buttons
    document.getElementById('share-tiktok').addEventListener('click', shareToTikTok);
    document.getElementById('share-facebook').addEventListener('click', shareToFacebook);
    
    // Exclusive content downloads
    if (document.getElementById('download-exclusive')) {
        document.getElementById('download-exclusive').addEventListener('click', () => {
            downloadWallpaper(5);
        });
        document.getElementById('download-talisman').addEventListener('click', () => {
            downloadWallpaper(6);
        });
        document.getElementById('view-report').addEventListener('click', () => {
            showToast('Annual report generated based on today\'s energy! Your fortune: ' + getRandomFortune());
        });
    }
    
    // Stripe button
    if (document.getElementById('stripe-button')) {
        document.getElementById('stripe-button').addEventListener('click', handleStripePayment);
    }
}

function openTestModal() {
    const modal = document.getElementById('test-modal');
    modal.classList.remove('hidden');
    startTest();
}

function openWallpaperModal() {
    const modal = document.getElementById('wallpaper-modal');
    modal.classList.remove('hidden');
    loadWallpapers();
}

function closeModal(modal) {
    modal.classList.add('hidden');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function openShare() {
    // Scroll to share section
    document.querySelector('.share-section').scrollIntoView({ behavior: 'smooth' });
}

function getCurrentShareUrl() {
    return window.location.href.split('?')[0];
}

function shareToTikTok() {
    const shareUrl = getCurrentShareUrl();
    const text = getText('share.title') + ' - ' + getDailyFortune();
    
    // TikTok doesn't have a direct web share, but we can copy the link
    navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Link copied! Open TikTok and paste it in your bio. You got an extra fortune draw!');
        stats.shares++;
        localStorage.setItem('lucky_god_shares', stats.shares.toString());
        // Extra fortune
        setTimeout(() => {
            // Open modal for extra draw
            const modal = document.createElement('div');
            modal.id = 'extra-fortune-modal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <h2>Your Extra Fortune</h2>
                    <div class="fortune-result">
                        <div class="fortune-text" id="extra-fortune-text"></div>
                        <div class="fortune-author">— Lucky God</div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.classList.remove('hidden');
            document.getElementById('extra-fortune-text').textContent = getRandomFortune();
            modal.querySelector('.close-btn').addEventListener('click', () => {
                modal.classList.add('hidden');
                setTimeout(() => modal.remove(), 300);
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    setTimeout(() => modal.remove(), 300);
                }
            });
        }, 1000);
    });
}

function shareToFacebook() {
    const shareUrl = getCurrentShareUrl();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    
    stats.shares++;
    localStorage.setItem('lucky_god_shares', stats.shares.toString());
    
    // Extra fortune
    setTimeout(() => {
        const modal = document.createElement('div');
        modal.id = 'extra-fortune-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>Your Extra Fortune</h2>
                <div class="fortune-result">
                    <div class="fortune-text" id="extra-fortune-text"></div>
                    <div class="fortune-author">— Lucky God</div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.classList.remove('hidden');
        document.getElementById('extra-fortune-text').textContent = getRandomFortune();
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.classList.add('hidden');
            setTimeout(() => modal.remove(), 300);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }, 1000);
}

// PayPal Integration
let selectedAmount = 6.66;

function initPayPal() {
    if (typeof paypal !== 'undefined') {
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: selectedAmount.toFixed(2)
                        },
                        description: 'Donation - Buy Lucky God a cup of tea'
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    // Payment successful
                    handleSuccessfulDonation();
                    showToast('Thank you for your donation, ' + details.payer.name.given_name + '! 🙏');
                });
            },
            onError: function(err) {
                console.error(err);
                showToast('Something went wrong with the payment. Please try again.');
            }
        }).render('#paypal-button-container');
    } else {
        console.log('PayPal SDK not loaded - check your client ID');
    }
}

function handleStripePayment() {
    // Stripe integration placeholder
    // In production, you need a backend to create payment intent
    showToast('Stripe integration: Please configure your Stripe keys in the code. Redirecting to checkout...');
    console.log('Stripe payment for amount: $' + selectedAmount);
    
    // After successful payment:
    // handleSuccessfulDonation();
}

function handleSuccessfulDonation() {
    stats.donations++;
    localStorage.setItem('lucky_god_donations', stats.donations.toString());
    setUnlockedContent();
    // Scroll to unlocked section
    setTimeout(() => {
        document.getElementById('unlocked-section').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// ============================================
// Simple statistics (you can expand this)
// ============================================
function getStats() {
    return stats;
}

// Log stats to console for site owner
console.log('Lucky God Stats:', stats);
console.log('Thanks for using Lucky God! 🎋');
