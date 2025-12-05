// Create starry background
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const numberOfStars = 200;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 2;
        const duration = 3 + Math.random() * 4;
        
        star.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            --duration: ${duration}s;
        `;
        
        starsContainer.appendChild(star);
    }
}


// Typewriter Class
class TypeWriter {
    constructor(textElement, words) {
        this.textElement = textElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 150;
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.typeSpeed = 75;
        } else {
            this.typeSpeed = Math.random() * (150 - 90) + 100;
        }

        if (!this.isDeleting) {
            this.txt = currentWord.substring(0, this.txt.length + 1);
        } else {
            this.txt = currentWord.substring(0, this.txt.length - 1);
        }

        this.textElement.textContent = this.txt;

        if (!this.isDeleting && this.txt === currentWord) {
            this.typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            this.typeSpeed = 500;
        }

        setTimeout(() => this.type(), this.typeSpeed);
    }
}


// On DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: false
    });
    //creating stars
    createStars();

    //Initialize typewriter
    const textElement = document.getElementById('text');
    const words = ['A.I. Developer', 'M.L. Engineer', 'Data Scientist', 'IoT Developer'];
    new TypeWriter(textElement, words);

    // Add click event listeners to all nav links (for mobile menu collapse)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close the navbar if it's open (mobile view)
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    // Scroll Spy - Highlight active menu item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActive() {
        const scrollY = window.pageYOffset;
        const viewportCenter = scrollY + window.innerHeight / 2;
        const docHeight = document.documentElement.scrollHeight;
        const nearBottom = window.innerHeight + scrollY >= docHeight - 5;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.navbar-nav a[href*="' + sectionId + '"]');

            if (!navLink) return;

            let isActive = viewportCenter >= sectionTop && viewportCenter < sectionTop + sectionHeight;

            // When very close to the bottom of the page, force Contact as active
            if (nearBottom && sectionId === 'contact') {
                isActive = true;
            }

            if (isActive) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', scrollActive);
    
    // Call once on load to set initial active state
    scrollActive();
});