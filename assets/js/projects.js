// Static JSON object with project data
const projectsData = [
    {
        name: 'Personal_ATS_Assistant',
        description: 'Personal ATS Assistant using Google GEN-AI framework with GEMINI-1.5 FLASH Model API',
        languages: { Python: 100 },
        imageUrl: 'assets/images/placeholder.png',
        githubUrl: 'https://github.com/Sreekanth-AIE/Personal_ATS_Assistant'
    },
    {
        name: 'Knowing_Soil',
        description: 'a simple soil classification model that is structured as modular, scalable production-ready code',
        languages: { Jupyter_Notebook: 61.2, Python: 38.8 },
        imageUrl: 'assets/images/placeholder.png',
        githubUrl: 'https://github.com/Sreekanth-AIE/Knowing_Soil'
    },
];

// Fetch projects from static JSON object
function fetchProjects() {
    try {
        document.getElementById('loading').style.display = 'none';
        
        projectsData.forEach((repo, index) => {
            // Create project card with animation delay
            const delay = (index % 3) * 100;
            createProjectCard(repo, delay);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        document.getElementById('loading').innerHTML = 'Error loading projects';
    }
}

function createProjectCard(repo, delay) {
    const projectsGrid = document.getElementById('projects-grid');
    
    const card = document.createElement('div');
    card.className = 'col-12 col-md-6 col-lg-4';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', delay);
    
    // Create languages HTML
    const languagesHtml = Object.keys(repo.languages)
        .map(lang => `<span class="tech-badge">${lang}</span>`)
        .join('');
    
    // Create card content
    card.innerHTML = `
       <div class="project-card">
                            <img src="${repo.imageUrl}" alt="${repo.name}" class="project-image">
                            <div class="p-4">
                                <h3 class="h5 mb-3" style="color: var(--accent-color);">${repo.name}</h3>
                                <p class="mb-3" style="color: var(--foreground-color);">${repo.description || 'No description available'}</p>
                                <div class="mb-3">
                                    ${languagesHtml}
                                </div>
                                <div class="d-flex gap-2">
                                    ${repo.homepage ? 
                                        `<a href="${repo.homepage}" class="project-link" target="_blank">Live Demo</a>` : ''}
                                    <a href="${repo.githubUrl}" class="project-link" target="_blank">GitHub</a>
                                </div>
                            </div>
                        </div>
                    `;
    
    projectsGrid.appendChild(card);
}

// Call fetchProjects to initialize the project cards
fetchProjects();