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


// // Header scroll behavior
// let lastScroll = 0;
// const header = document.querySelector('.header');

// window.addEventListener('scroll', () => {
//     const currentScroll = window.pageYOffset;
    
//     if (currentScroll <= 0) {
//         header.style.transform = 'translateY(0)';
//         return;
//     }
    
//     if (currentScroll > lastScroll && currentScroll > 50) {
//         // Scrolling down
//         header.style.transform = 'translateY(-100%)';
//     } else {
//         // Scrolling up
//         header.style.transform = 'translateY(0)';
//     }
    
//     lastScroll = currentScroll;
// });



// On DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true
    });
    //creating stars
    createStars();

    //Initialize typewriter
    const textElement = document.getElementById('text');
    const words = ['A.I. Developer', 'M.L. Engineer', 'Data Scientist', 'IoT Developer'];
    new TypeWriter(textElement, words);

    // Add click event listeners to all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close the navbar if it's open
            if (navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });
});