// Enhanced Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

// Toggle mobile menu
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll lock
    if (navMenu.classList.contains('active')) {
        body.classList.add('menu-open');
    } else {
        body.classList.remove('menu-open');
    }
}

// Close mobile menu
function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('menu-open');
}

// Event listeners
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        closeMenu();
    }
});

// Close mobile menu on window resize (if resizing to desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Navigation links redirect to respective pages
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            window.location.href = href;
        }
    });
});
  // Close mobile menu when clicking on a link
document.querySelectorAll('.section-title').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navigation links redirect to respective pages
document.querySelectorAll('.section-title').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            window.location.href = href;
        }
    });
});

// Navigation cards for sections
document.querySelectorAll('.nav-card').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navigation cards redirect to respective pages
document.querySelectorAll('.nav-card').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            window.location.href = href;
        }
    });
});

// Smooth scrolling for navigation cards
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click handlers for navigation cards
// document.querySelectorAll('.nav-card').forEach(card => {
//     card.addEventListener('click', () => {
//         const targetSection = card.querySelector('h3').textContent.toLowerCase().replace(/ /g, '-');
//         scrollToSection(targetSection);
//     });
// });

// Floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['💗', '💖', '💕', '💝'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    const floatingHeartsContainer = document.querySelector('.floating-hearts');
    if (floatingHeartsContainer) {
        floatingHeartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
}

// Create new floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Photo gallery functionality
function addImageToGallery(src, category, caption) {
    const galleryContainer = document.getElementById(`${category}-gallery`);
    if (galleryContainer) {
        const imgElement = document.createElement('div');
        imgElement.className = 'gallery-item';
        imgElement.innerHTML = `
            <img src="${src}" alt="Memory" class="gallery-img">
            <div class="overlay">
                <p>${caption || ''}</p>
            </div>
        `;
        galleryContainer.appendChild(imgElement);
    }
}

function handleImageUpload() {
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', e => {
            e.preventDefault();
            const fileInput = document.getElementById('image-upload');
            const category = document.getElementById('image-category').value;
            const caption = document.getElementById('image-caption').value.trim();
            
            if (fileInput.files && fileInput.files.length > 0) {
                Array.from(fileInput.files).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        addImageToGallery(e.target.result, category, caption);
                        saveImageToLocalStorage(e.target.result, category, caption);
                    };
                    reader.readAsDataURL(file);
                });
                uploadForm.reset();
                alert('Memory uploaded successfully!');
            } else {
                alert('Please select at least one image to upload.');
            }
        });
    }
}

// Local Storage for images
function saveImageToLocalStorage(src, category, caption) {
    let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
    images.push({ src, category, caption });
    localStorage.setItem('galleryImages', JSON.stringify(images));
}

function loadImagesFromLocalStorage() {
    let images = JSON.parse(localStorage.getItem('galleryImages')) || [];
    images.forEach(({ src, category, caption }) => {
        addImageToGallery(src, category, caption);
    });
}

// Birthday wishes form handler
function addBirthdayWish(name, wish) {
    const wishesContainer = document.getElementById('wishes-container');
    if (wishesContainer) {
        const wishElement = document.createElement('div');
        wishElement.className = 'birthday-wish';
        wishElement.innerHTML = `
            <h3>From ${name}</h3>
            <p>${wish}</p>
            <small>Posted on: ${new Date().toLocaleDateString()}</small>
        `;
        wishesContainer.prepend(wishElement);
    }
}

function saveBirthdayWish(name, wish) {
    let wishes = JSON.parse(localStorage.getItem('birthdayWishes')) || [];
    wishes.push({ name, wish, date: new Date().toLocaleDateString() });
    localStorage.setItem('birthdayWishes', JSON.stringify(wishes));
}

function loadBirthdayWishes() {
    let wishes = JSON.parse(localStorage.getItem('birthdayWishes')) || [];
    wishes.forEach(({ name, wish }) => {
        addBirthdayWish(name, wish);
    });
}

// Letters/Notes functionality
function addLetter(title, content) {
    const lettersContainer = document.getElementById('letters-container');
    if (lettersContainer) {
        const letterElement = document.createElement('div');
        letterElement.className = 'letter-card';
        letterElement.innerHTML = `
            <h3>${title}</h3>
            <p>${content}</p>
            <small>Posted on: ${new Date().toLocaleDateString()}</small>
        `;
        lettersContainer.prepend(letterElement);
    }
}

function saveLetter(title, content) {
    let letters = JSON.parse(localStorage.getItem('letters')) || [];
    letters.push({ title, content, date: new Date().toLocaleDateString() });
    localStorage.setItem('letters', JSON.stringify(letters));
}

function loadLetters() {
    let letters = JSON.parse(localStorage.getItem('letters')) || [];
    letters.forEach(({ title, content }) => {
        addLetter(title, content);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// CTA Button functionality - Stop scroll behavior
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault(); // Stop any default scroll/anchor behavior
        
        // Add visual feedback
        ctaButton.style.overflow = 'hidden';
        // ctaButton.style.transition = 'transform 0.2s ease';
        
        setTimeout(() => {
            ctaButton.style.transform = 'scale(1)';
        }, 200);
        
    //    Instead of scrolling, reveal content with animation
        revealContent(); 
    });
}

// Function to reveal content instead of scrolling
function revealContent() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    // Add reveal animation classes
    heroContent.classList.add('content-revealed');
    heroImage.classList.add('image-revealed');
    
    // Create celebration effect
    createCelebrationEffect();
}

// Celebration effect function
function createCelebrationEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadImagesFromLocalStorage();
    loadBirthdayWishes();
    loadLetters();
    handleBirthdayWish();
    handleLetterSubmission();
    handleImageUpload();
    lazyLoadImages();
    
    // Add some initial floating hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 1000);
    }
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    import('https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15.0.0/dist/smooth-scroll.polyfills.min.js').then(module => {
        const scroll = new module.default('a[href*="#"]', {
            speed: 500,
            speedAsDuration: true
        });
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Easter egg - click on the logo for a surprise
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    navLogo.addEventListener('click', e => {
        e.preventDefault();
        const colors = ['#FFB6C1', '#E6E6FA', '#F0FFF0', '#FFDAB9', '#E0F6FF'];
        document.body.style.background = `linear-gradient(135deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]})`;
        
        setTimeout(() => {
            document.body.style.background = '';
        }, 3000);
    });
}
