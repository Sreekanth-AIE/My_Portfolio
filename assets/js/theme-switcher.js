// Accent Color Theme Switcher
const colorThemes = [
    { name: 'Cyan',   primary: '#64ffda', glow: 'rgba(100, 255, 218, 0.5)' },
    { name: 'Purple', primary: '#bb86fc', glow: 'rgba(187, 134, 252, 0.5)' },
    { name: 'Blue',   primary: '#4fc3f7', glow: 'rgba(79, 195, 247, 0.5)'  },
    { name: 'Pink',   primary: '#ff4081', glow: 'rgba(255, 64, 129, 0.5)'  },
    { name: 'Green',  primary: '#69f0ae', glow: 'rgba(105, 240, 174, 0.5)' },
    { name: 'Orange', primary: '#ff9800', glow: 'rgba(255, 152, 0, 0.5)'   },
    { name: 'Red',    primary: '#ff5252', glow: 'rgba(255, 82, 82, 0.5)'   }
];

function loadTheme() {
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme) {
        applyTheme(JSON.parse(savedTheme));
    }
}

function applyTheme(theme) {
    document.documentElement.style.setProperty('--accent-color', theme.primary);
    document.documentElement.style.setProperty('--glow-color', theme.glow);
    localStorage.setItem('portfolioTheme', JSON.stringify(theme));
    updateActiveColorButton(theme.primary);
}

// Browsers normalise inline background colours to rgb(), so we convert before comparing.
function updateActiveColorButton(primaryColor) {
    document.querySelectorAll('.color-option').forEach(btn => {
        const matches = rgbToHex(btn.style.backgroundColor) === primaryColor;
        btn.classList.toggle('active', matches);
    });
}

function rgbToHex(rgb) {
    const result = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!result) return rgb;
    const r = parseInt(result[1]);
    const g = parseInt(result[2]);
    const b = parseInt(result[3]);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function createColorPicker() {
    const navbar = document.querySelector('.navbar-nav');

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

    navbar.appendChild(colorPickerLi);

    document.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            applyTheme(JSON.parse(btn.dataset.theme));
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createColorPicker();
    loadTheme(); // runs after buttons exist, so active state sets correctly
});
