// Color Theme Switcher
const colorThemes = [
    { name: 'Cyan', primary: '#64ffda', glow: 'rgba(100, 255, 218, 0.5)' },
    { name: 'Purple', primary: '#bb86fc', glow: 'rgba(187, 134, 252, 0.5)' },
    { name: 'Blue', primary: '#4fc3f7', glow: 'rgba(79, 195, 247, 0.5)' },
    { name: 'Pink', primary: '#ff4081', glow: 'rgba(255, 64, 129, 0.5)' },
    { name: 'Green', primary: '#69f0ae', glow: 'rgba(105, 240, 174, 0.5)' },
    { name: 'Orange', primary: '#ff9800', glow: 'rgba(255, 152, 0, 0.5)' },
    { name: 'Red', primary: '#ff5252', glow: 'rgba(255, 82, 82, 0.5)' }
];

// Light theme colors (softer Nebula Dawn)
const lightTheme = {
    background: '#f5f7fa',
    foreground: '#1e293b',
    secondary: 'rgba(255, 255, 255, 0.85)',
    cardBorder: '#e2e8f0',
    starsColor: '#cbd5e1'
};

const darkTheme = {
    background: '#000',
    foreground: 'rgb(238, 226, 226)',
    secondary: 'rgba(17, 17, 17, 0.85)',
    cardBorder: '#333',
    starsColor: 'white'
};

// Load saved theme or default to Cyan
function loadTheme() {
    const savedTheme = localStorage.getItem('portfolioTheme');
    const savedMode = localStorage.getItem('portfolioMode') || 'dark';
    
    if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        applyTheme(theme);
    }
    
    if (savedMode === 'light') {
        applyLightMode();
    }
}

// Apply theme colors to CSS variables
function applyTheme(theme) {
    document.documentElement.style.setProperty('--accent-color', theme.primary);
    document.documentElement.style.setProperty('--glow-color', theme.glow);
    
    // Save to localStorage
    localStorage.setItem('portfolioTheme', JSON.stringify(theme));
    
    // Update active state on color buttons
    updateActiveColorButton(theme.primary);
}

// Apply light mode
function applyLightMode() {
    document.documentElement.style.setProperty('--background-color', lightTheme.background);
    document.documentElement.style.setProperty('--foreground-color', lightTheme.foreground);
    document.documentElement.style.setProperty('--secondary-background-color', lightTheme.secondary);
    document.documentElement.style.setProperty('--card-border-color', lightTheme.cardBorder);
    document.documentElement.style.setProperty('--stars_color', lightTheme.starsColor);
    
    localStorage.setItem('portfolioMode', 'light');
    updateModeIcon('light');
    
    // Reduce star opacity for light mode
    document.querySelectorAll('.star').forEach(star => {
        star.style.opacity = '0.3';
    });
}

// Apply dark mode
function applyDarkMode() {
    document.documentElement.style.setProperty('--background-color', darkTheme.background);
    document.documentElement.style.setProperty('--foreground-color', darkTheme.foreground);
    document.documentElement.style.setProperty('--secondary-background-color', darkTheme.secondary);
    document.documentElement.style.setProperty('--card-border-color', darkTheme.cardBorder);
    document.documentElement.style.setProperty('--stars_color', darkTheme.starsColor);
    
    localStorage.setItem('portfolioMode', 'dark');
    updateModeIcon('dark');
    
    // Reset star opacity for dark mode
    document.querySelectorAll('.star').forEach(star => {
        star.style.opacity = '';
    });
}

// Toggle between light and dark mode
function toggleMode() {
    const currentMode = localStorage.getItem('portfolioMode') || 'dark';
    if (currentMode === 'dark') {
        applyLightMode();
    } else {
        applyDarkMode();
    }
}

// Update mode icon
function updateModeIcon(mode) {
    const icon = document.querySelector('#modeToggle svg');
    if (icon && mode === 'light') {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else if (icon) {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
}

// Update active button visual state
function updateActiveColorButton(primaryColor) {
    document.querySelectorAll('.color-option').forEach(btn => {
        if (btn.style.backgroundColor === primaryColor || 
            rgbToHex(btn.style.backgroundColor) === primaryColor) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Convert RGB to Hex for comparison
function rgbToHex(rgb) {
    const result = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!result) return rgb;
    
    const r = parseInt(result[1]);
    const g = parseInt(result[2]);
    const b = parseInt(result[3]);
    
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Create color picker UI in navbar
function createColorPicker() {
    const navbar = document.querySelector('.navbar-nav');
    
    /* Light/Dark mode toggle - COMMENTED OUT (hero SVG planets have black fills)
    const modeToggleLi = document.createElement('li');
    modeToggleLi.className = 'nav-item';
    modeToggleLi.innerHTML = `
        <a class="nav-link" href="#" id="modeToggle" role="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                 stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </a>
    `;
    */
    
    // Color picker dropdown
    const colorPickerLi = document.createElement('li');
    colorPickerLi.className = 'nav-item dropdown';
    colorPickerLi.innerHTML = `
        <a class="nav-link" href="#" id="themeDropdown" 
           role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" 
                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                 stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a7 7 0 1 0 10 10"></path>
            </svg>
        </a>
        <ul class="dropdown-menu dropdown-menu-end color-picker-dropdown" aria-labelledby="themeDropdown">
            <li class="px-3 py-2">
                <div class="color-options d-flex flex-wrap gap-2 justify-content-center">
                    ${colorThemes.map(theme => `
                        <button class="color-option" 
                                style="background-color: ${theme.primary}" 
                                title="${theme.name}"
                                data-theme='${JSON.stringify(theme)}'>
                        </button>
                    `).join('')}
                </div>
            </li>
        </ul>
    `;
    
    // navbar.appendChild(modeToggleLi); // COMMENTED OUT
    navbar.appendChild(colorPickerLi);
    
    // Add click handlers to color buttons
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const theme = JSON.parse(btn.dataset.theme);
            applyTheme(theme);
        });
    });
    
    /* Add click handler to mode toggle - COMMENTED OUT
    document.getElementById('modeToggle').addEventListener('click', (e) => {
        e.preventDefault();
        toggleMode();
    });
    */
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createColorPicker();
    loadTheme();
});
