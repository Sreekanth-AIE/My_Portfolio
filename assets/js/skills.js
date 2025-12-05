const skillsData = [
    {
        category: "Programming Languages",
        icon: "Code2",
        skills: [
            { name: "Python (Advanced)", icon: "file-code" },
            { name: "C++", icon: "file-code" },
            { name: "JavaScript", icon: "file-code" }
        ]
    },
    {
        category: "ML and DL Frameworks",
        icon: "Brain",
        skills: [
            { name: "TensorFlow / Keras", icon: "Network" },
            { name: "PyTorch", icon: "Network" },
            { name: "scikit-learn", icon: "Network" },
            { name: "pyannote", icon: "Network" }
        ]
    },
    {
        category: "LLM Platforms & Tools",
        icon: "Bot",
        skills: [
            { name: "ollama", icon: "Cpu" },
            { name: "groq", icon: "Cpu" },
            { name: "Hugging Face", icon: "Cpu" },
            { name: "langchain ecosystem", icon: "Cpu" }
        ]
    },
    {
        category: "NLP Libraries",
        icon: "message-square-more",
        skills: [
            { name: "NLTK", icon: "Languages" },
            { name: "genism", icon: "Languages" },
            { name: "spaCy", icon: "Languages" },
            { name: "Hugging Face Transformers", icon: "Languages" }
        ]
    },
    {
        category: "NLP Tools",
        icon: "messages-square",
        skills: [
            { name: "Rasa", icon: "anvil" },
            { name: "Stanford NLP", icon: "anvil" },
            { name: "OpenNLP", icon: "anvil" }
        ]
    },
    {
        category: "Computer Vision Libraries",
        icon: "images",
        skills: [
            { name: "Opencv-Python", icon: "image" },
            { name: "Dlib", icon: "image" },
            { name: "MediaPipe", icon: "image" },
            { name: "Scikit-Image", icon: "image" }
        ]
    },
    {
        category: "Data Analysis Tools",
        icon: "chart-column-increasing",
        skills: [
            { name: "Pandas", icon: "chart-no-axes-column-increasing" },
            { name: "NumPy", icon: "chart-no-axes-column-increasing" },
            { name: "Matplotlib", icon: "chart-no-axes-column-increasing" },
            { name: "plotly", icon: "chart-no-axes-column-increasing" }
        ]
    },
    {
        category: "Big Data Libraries",
        icon: "Database",
        skills: [
            { name: "PySpark", icon: "Flame" }
        ]
    },
    {
        category: "Databases",
        icon: "Database",
        skills: [
            { name: "MySQL", icon: "Database" },
            { name: "SQLite", icon: "Database" },
            { name: "ChromaDB", icon: "Database" },
            { name: "FAISS", icon: "Database" }
        ]
    },
    {
        category: "Web Development",
        icon: "Globe",
        skills: [
            { name: "Flask", icon: "Server" },
            { name: "FastAPI", icon: "Server" },
            { name: "Streamlit", icon: "Layout" }
        ]
    },
    {
        category: "Version Control",
        icon: "folder-git-2",
        skills: [
            { name: "Git", icon: "git-branch" }
        ]
    },
    {
        category: "Monitoring Tools",
        icon: "Activity",
        skills: [
            { name: "MLflow", icon: "Activity" },
            { name: "DVC", icon: "Activity" }
        ]
    }
];

const container = document.getElementById('skills-container');

skillsData.forEach((category, index) => {
    const categoryEl = document.createElement('div');
    categoryEl.className = 'skill-category';
    categoryEl.style.animationDelay = `${index * 0.1}s`;
    categoryEl.setAttribute('data-aos', 'fade-up');
    categoryEl.setAttribute('data-aos-delay', `${100}`);

    categoryEl.innerHTML = `
        <div class="category-header">
            <div class="category-icon">
                <i data-lucide="${category.icon}"></i>
            </div>
            <div class="category-title">${category.category}</div>
        </div>
        <div class="skills-list">
            ${category.skills.map(skill => `
                <div class="skill-item">
                    <i data-lucide="${skill.icon}" class="skill-icon"></i>
                    <span class="skill-name">${skill.name}</span>
                </div>
            `).join('')}
        </div>
    `;

    container.appendChild(categoryEl);
    lucide.createIcons(); // Initialize Lucide icons after injecting HTML
});

// Initialize Lucide icons
lucide.createIcons();