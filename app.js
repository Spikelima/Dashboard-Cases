// LMS Portal JavaScript - Petroquímica Brasileira S.A.

// Global variables
let currentUser = 'João Santos';
let currentUserRole = 'Instrutor';

// Data from the provided JSON
const casesData = [
    {
        id: 1,
        title: "Parada Programada para Manutenção - Butadieno",
        description: "Procedimentos de parada e partida para unidade de produção de butadieno usando destilação extrativa com DMF",
        area: "Operações",
        level: "Iniciante",
        duration: "2 horas",
        version: "1.0",
        lastUpdate: "2025-07-22",
        status: "Ativo",
        completionRate: 85,
        tags: ["destilação", "DMF", "segurança", "procedimentos"]
    },
    {
        id: 2,
        title: "Procedimentos de Segurança em Espaço Confinado",
        description: "Normas e práticas seguras para entrada e trabalho em espaços confinados na indústria petroquímica",
        area: "Segurança",
        level: "Intermediário",
        duration: "3 horas",
        version: "2.1",
        lastUpdate: "2025-07-20",
        status: "Ativo",
        completionRate: 78,
        tags: ["NR-33", "atmosfera", "resgate", "permissão"]
    },
    {
        id: 3,
        title: "Análise de Falha em Bomba Centrífuga",
        description: "Metodologia para diagnóstico e resolução de falhas em sistemas de bombeamento industrial",
        area: "Manutenção",
        level: "Avançado",
        duration: "4 horas",
        version: "1.3",
        lastUpdate: "2025-07-18",
        status: "Ativo",
        completionRate: 62,
        tags: ["vibração", "cavitação", "alinhamento", "diagnóstico"]
    },
    {
        id: 4,
        title: "Controle de Qualidade em Destilação",
        description: "Técnicas de monitoramento e controle da qualidade em processos de destilação industrial",
        area: "Qualidade",
        level: "Intermediário",
        duration: "2.5 horas",
        version: "1.1",
        lastUpdate: "2025-07-15",
        status: "Ativo",
        completionRate: 91,
        tags: ["cromatografia", "especificação", "controle", "amostragem"]
    },
    {
        id: 5,
        title: "Resposta a Emergência - Vazamento de Produto",
        description: "Procedimentos de resposta rápida para contenção e mitigação de vazamentos químicos",
        area: "Segurança",
        level: "Avançado",
        duration: "3.5 horas",
        version: "2.0",
        lastUpdate: "2025-07-12",
        status: "Ativo",
        completionRate: 73,
        tags: ["emergência", "contenção", "EPI", "evacuação"]
    }
];

const studentsData = [
    {
        id: 1,
        name: "Lucas Silva",
        role: "Estagiário",
        team: "Operações",
        progress: [
            {caseId: 1, status: "completed", timeSpent: 120, completedAt: "2025-07-21"},
            {caseId: 2, status: "in_progress", timeSpent: 45, completedAt: null},
            {caseId: 4, status: "not_started", timeSpent: 0, completedAt: null}
        ]
    },
    {
        id: 2,
        name: "Maria Santos",
        role: "Estagiário",
        team: "Manutenção",
        progress: [
            {caseId: 1, status: "completed", timeSpent: 135, completedAt: "2025-07-20"},
            {caseId: 3, status: "completed", timeSpent: 240, completedAt: "2025-07-19"},
            {caseId: 2, status: "in_progress", timeSpent: 90, completedAt: null}
        ]
    },
    {
        id: 3,
        name: "Carlos Lima",
        role: "Técnico",
        team: "Segurança",
        progress: [
            {caseId: 2, status: "completed", timeSpent: 180, completedAt: "2025-07-22"},
            {caseId: 5, status: "completed", timeSpent: 210, completedAt: "2025-07-18"},
            {caseId: 1, status: "not_started", timeSpent: 0, completedAt: null}
        ]
    }
];

const forumsData = [
    {
        caseId: 1,
        topics: [
            {
                id: 1,
                title: "Dúvidas sobre sequência de parada",
                author: "Lucas Silva",
                authorRole: "Estagiário",
                createdAt: "2025-07-21",
                replies: 3,
                content: "Tenho dúvidas sobre a ordem correta para fechar as válvulas durante a parada programada..."
            },
            {
                id: 2,
                title: "Experiências com DMF",
                author: "João Santos",
                authorRole: "Supervisor",
                createdAt: "2025-07-20",
                replies: 7,
                content: "Vamos compartilhar experiências sobre o manuseio seguro do DMF durante as operações..."
            }
        ]
    },
    {
        caseId: 2,
        topics: [
            {
                id: 3,
                title: "Interpretação de gases em espaços confinados",
                author: "Carlos Lima",
                authorRole: "Técnico",
                createdAt: "2025-07-19",
                replies: 5,
                content: "Como interpretar corretamente as leituras dos detectores de gases..."
            }
        ]
    }
];

const versionsData = [
    {
        caseId: 1,
        version: "1.0",
        date: "2025-07-22",
        changes: ["Versão inicial criada", "Adicionados checklists interativos", "Incluídos vídeos explicativos"]
    },
    {
        caseId: 2,
        version: "2.1",
        date: "2025-07-20",
        changes: ["Atualizada NR-33 versão 2024", "Adicionados novos equipamentos de medição", "Revisados procedimentos de resgate"]
    },
    {
        caseId: 3,
        version: "1.3",
        date: "2025-07-18",
        changes: ["Incluídas novas técnicas de análise vibracional", "Atualizado software de diagnóstico", "Adicionados casos reais de falha"]
    }
];

// Chart variables
let progressChart = null;
let progressOverviewChart = null;
let currentSelectedCaseId = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing LMS Portal...');
    
    // Initialize core functionality
    initializeNavigation();
    initializeUserDropdown();
    
    // Load data and render components
    updateDashboardStats();
    initializeProgressChart();
    initializeProgressOverviewChart();
    renderCases();
    renderProgressTable();
    renderVersions();
    renderForumTopics();
    
    // Initialize interactive features
    initializeFilters();
    setupModalHandlers();
    setupCaseCardClickHandlers();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Bem-vindo ao Portal LMS da Petroquímica Brasileira S.A.', 'success');
    }, 1000);
    
    console.log('LMS Portal initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
    console.log('Setting up navigation...');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Navigation clicked:', this.dataset.section);
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const sectionId = this.dataset.section + '-section';
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('Switched to section:', sectionId);
            } else {
                console.error('Section not found:', sectionId);
            }
        });
    });
    
    console.log('Navigation setup complete');
}

// User dropdown functionality
function initializeUserDropdown() {
    console.log('Setting up user dropdown...');
    const userDropdown = document.querySelector('.user-dropdown');
    const trigger = userDropdown?.querySelector('.user-dropdown__trigger');
    
    if (!trigger) {
        console.error('User dropdown trigger not found');
        return;
    }
    
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('User dropdown clicked');
        userDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (userDropdown && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });
    
    console.log('User dropdown setup complete');
}

// Switch user functionality
function switchUser(name, role) {
    console.log('Switching user to:', name, role);
    currentUser = name;
    currentUserRole = role;
    
    const currentUserElement = document.getElementById('current-user');
    const userRoleElement = document.querySelector('.user-role');
    
    if (currentUserElement) currentUserElement.textContent = name;
    if (userRoleElement) userRoleElement.textContent = role;
    
    // Update dashboard stats based on user
    updateDashboardStats();
    renderProgressTable();
    
    // Close dropdown
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) userDropdown.classList.remove('active');
    
    showNotification(`Usuário alterado para ${name} (${role})`, 'info');
}

// Update dashboard stats
function updateDashboardStats() {
    const totalCases = casesData.length;
    let completedCases = 0;
    let inProgressCases = 0;
    
    // Calculate stats based on current user
    if (currentUserRole === 'Instrutor') {
        // Instructor sees overall stats
        studentsData.forEach(student => {
            student.progress.forEach(prog => {
                if (prog.status === 'completed') completedCases++;
                if (prog.status === 'in_progress') inProgressCases++;
            });
        });
    } else {
        // Student sees their own stats
        const currentStudent = studentsData.find(s => s.name === currentUser);
        if (currentStudent) {
            currentStudent.progress.forEach(prog => {
                if (prog.status === 'completed') completedCases++;
                if (prog.status === 'in_progress') inProgressCases++;
            });
        }
    }
    
    const totalCasesEl = document.getElementById('total-cases');
    const completedCasesEl = document.getElementById('completed-cases');
    const progressCasesEl = document.getElementById('progress-cases');
    const totalUsersEl = document.getElementById('total-users');
    
    if (totalCasesEl) totalCasesEl.textContent = totalCases;
    if (completedCasesEl) completedCasesEl.textContent = completedCases;
    if (progressCasesEl) progressCasesEl.textContent = inProgressCases;
    if (totalUsersEl) totalUsersEl.textContent = studentsData.length;
}

// Initialize progress chart
function initializeProgressChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) {
        console.log('Progress chart canvas not found');
        return;
    }
    
    try {
        progressChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Operações', 'Segurança', 'Manutenção', 'Qualidade'],
                datasets: [{
                    label: 'Taxa de Conclusão (%)',
                    data: [85, 75, 62, 91],
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
        console.log('Progress chart initialized');
    } catch (error) {
        console.error('Error initializing progress chart:', error);
    }
}

// Initialize progress overview chart
function initializeProgressOverviewChart() {
    const ctx = document.getElementById('progressOverviewChart');
    if (!ctx) {
        console.log('Progress overview chart canvas not found');
        return;
    }
    
    try {
        const completedCount = studentsData.reduce((acc, student) => 
            acc + student.progress.filter(p => p.status === 'completed').length, 0);
        const inProgressCount = studentsData.reduce((acc, student) => 
            acc + student.progress.filter(p => p.status === 'in_progress').length, 0);
        const notStartedCount = studentsData.reduce((acc, student) => 
            acc + student.progress.filter(p => p.status === 'not_started').length, 0);
        
        progressOverviewChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Concluídos', 'Em Progresso', 'Não Iniciados'],
                datasets: [{
                    data: [completedCount, inProgressCount, notStartedCount],
                    backgroundColor: ['#5D878F', '#D2BA4C', '#B4413C'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
        console.log('Progress overview chart initialized');
    } catch (error) {
        console.error('Error initializing progress overview chart:', error);
    }
}

// Setup case card click handlers
function setupCaseCardClickHandlers() {
    console.log('Setting up case card click handlers...');
    // This will be called after renderCases
}

// Render cases in the library
function renderCases(filteredCases = casesData) {
    const casesGrid = document.getElementById('cases-grid');
    if (!casesGrid) {
        console.log('Cases grid not found');
        return;
    }
    
    casesGrid.innerHTML = filteredCases.map(case_ => `
        <div class="case-card" data-case-id="${case_.id}">
            <div class="case-card__header">
                <h3 class="case-card__title">${case_.title}</h3>
                <div class="case-card__meta">
                    <span class="badge badge--${case_.area.toLowerCase()}">${case_.area}</span>
                    <span class="badge badge--${case_.level.toLowerCase().replace('á', 'a').replace('é', 'e')}">${case_.level}</span>
                </div>
                <p class="case-card__description">${case_.description}</p>
            </div>
            <div class="case-card__body">
                <div class="case-card__info">
                    <div class="case-info-item">
                        <i class="fas fa-clock"></i>
                        <span>${case_.duration}</span>
                    </div>
                    <div class="case-info-item">
                        <i class="fas fa-calendar"></i>
                        <span>${formatDate(case_.lastUpdate)}</span>
                    </div>
                    <div class="case-info-item">
                        <i class="fas fa-chart-line"></i>
                        <span>${case_.completionRate}% conclusão</span>
                    </div>
                    <div class="case-info-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${case_.status}</span>
                    </div>
                </div>
            </div>
            <div class="case-card__footer">
                <span class="case-version">v${case_.version}</span>
                <button class="btn btn--primary btn--sm start-case-btn" data-case-id="${case_.id}">
                    <i class="fas fa-play"></i>
                    Iniciar
                </button>
            </div>
        </div>
    `).join('');
    
    // Add click handlers to case cards
    casesGrid.querySelectorAll('.case-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the button
            if (e.target.closest('.start-case-btn')) return;
            
            const caseId = parseInt(this.dataset.caseId);
            console.log('Case card clicked:', caseId);
            openCaseModal(caseId);
        });
    });
    
    // Add click handlers to start buttons
    casesGrid.querySelectorAll('.start-case-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const caseId = parseInt(this.dataset.caseId);
            console.log('Start case button clicked:', caseId);
            startCase(caseId);
        });
    });
    
    console.log('Cases rendered:', filteredCases.length);
}

// Initialize filters
function initializeFilters() {
    console.log('Setting up filters...');
    
    const searchInput = document.getElementById('search-input');
    const areaFilter = document.getElementById('area-filter');
    const levelFilter = document.getElementById('level-filter');
    const statusFilter = document.getElementById('status-filter');
    const durationFilter = document.getElementById('duration-filter');
    
    function applyFilters() {
        let filtered = casesData;
        
        // Search filter
        if (searchInput?.value) {
            const searchTerm = searchInput.value.toLowerCase();
            filtered = filtered.filter(case_ => 
                case_.title.toLowerCase().includes(searchTerm) ||
                case_.description.toLowerCase().includes(searchTerm) ||
                case_.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        // Area filter
        if (areaFilter?.value) {
            filtered = filtered.filter(case_ => case_.area === areaFilter.value);
        }
        
        // Level filter
        if (levelFilter?.value) {
            filtered = filtered.filter(case_ => case_.level === levelFilter.value);
        }
        
        // Status filter
        if (statusFilter?.value) {
            filtered = filtered.filter(case_ => case_.status === statusFilter.value);
        }
        
        // Duration filter
        if (durationFilter?.value) {
            filtered = filtered.filter(case_ => {
                const duration = parseFloat(case_.duration);
                switch(durationFilter.value) {
                    case 'short': return duration <= 2;
                    case 'medium': return duration > 2 && duration <= 4;
                    case 'long': return duration > 4;
                    default: return true;
                }
            });
        }
        
        renderCases(filtered);
        console.log('Filters applied, showing', filtered.length, 'cases');
    }
    
    // Add event listeners
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (areaFilter) areaFilter.addEventListener('change', applyFilters);
    if (levelFilter) levelFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (durationFilter) durationFilter.addEventListener('change', applyFilters);
    
    console.log('Filters setup complete');
}

// Open case modal
function openCaseModal(caseId) {
    console.log('Opening case modal for case:', caseId);
    const case_ = casesData.find(c => c.id === caseId);
    if (!case_) {
        console.error('Case not found:', caseId);
        return;
    }
    
    currentSelectedCaseId = caseId;
    
    // Populate modal content
    const modalTitle = document.getElementById('modal-case-title');
    const modalArea = document.getElementById('modal-case-area');
    const modalLevel = document.getElementById('modal-case-level');
    const modalVersion = document.getElementById('modal-case-version');
    const modalDescription = document.getElementById('modal-case-description');
    const modalDuration = document.getElementById('modal-case-duration');
    const modalDate = document.getElementById('modal-case-date');
    const modalCompletion = document.getElementById('modal-case-completion');
    const modalTags = document.getElementById('modal-case-tags');
    
    if (modalTitle) modalTitle.textContent = case_.title;
    if (modalArea) {
        modalArea.textContent = case_.area;
        modalArea.className = `badge badge--${case_.area.toLowerCase()}`;
    }
    if (modalLevel) {
        modalLevel.textContent = case_.level;
        modalLevel.className = `badge badge--${case_.level.toLowerCase().replace('á', 'a').replace('é', 'e')}`;
    }
    if (modalVersion) modalVersion.textContent = case_.version;
    if (modalDescription) modalDescription.textContent = case_.description;
    if (modalDuration) modalDuration.textContent = case_.duration;
    if (modalDate) modalDate.textContent = formatDate(case_.lastUpdate);
    if (modalCompletion) modalCompletion.textContent = case_.completionRate + '%';
    
    // Populate tags
    if (modalTags) {
        if (case_.tags && case_.tags.length > 0) {
            modalTags.innerHTML = case_.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        } else {
            modalTags.innerHTML = '<span class="tag">Sem tags</span>';
        }
    }
    
    // Show modal
    const modal = document.getElementById('case-modal');
    if (modal) {
        modal.classList.add('active');
        console.log('Case modal opened');
    }
}

// Close case modal
function closeCaseModal() {
    console.log('Closing case modal');
    const modal = document.getElementById('case-modal');
    if (modal) {
        modal.classList.remove('active');
        currentSelectedCaseId = null;
    }
}

// Start case
function startCase(caseId) {
    const case_ = casesData.find(c => c.id === (caseId || currentSelectedCaseId));
    if (case_) {
        console.log('Starting case:', case_.title);
        showNotification(`Iniciando case: ${case_.title}`, 'success');
        
        // Close modal if open
        const modal = document.getElementById('case-modal');
        if (modal && modal.classList.contains('active')) {
            closeCaseModal();
        }
    }
}

// Render progress table
function renderProgressTable() {
    const tableBody = document.querySelector('#progress-table tbody');
    if (!tableBody) {
        console.log('Progress table body not found');
        return;
    }
    
    let progressRows = [];
    
    studentsData.forEach(student => {
        student.progress.forEach(progress => {
            const case_ = casesData.find(c => c.id === progress.caseId);
            if (case_) {
                progressRows.push({
                    studentName: student.name,
                    studentRole: student.role,
                    caseTitle: case_.title,
                    status: progress.status,
                    timeSpent: Math.floor(progress.timeSpent / 60) + 'h ' + (progress.timeSpent % 60) + 'm',
                    completedAt: progress.completedAt ? formatDate(progress.completedAt) : '-',
                    studentId: student.id,
                    caseId: case_.id
                });
            }
        });
    });
    
    tableBody.innerHTML = progressRows.map(row => `
        <tr>
            <td>${row.studentName}</td>
            <td>${row.studentRole}</td>
            <td>${row.caseTitle}</td>
            <td>
                <span class="status status--${getStatusClass(row.status)}">
                    ${getStatusText(row.status)}
                </span>
            </td>
            <td>${row.timeSpent}</td>
            <td>${row.completedAt}</td>
            <td>
                <button class="btn btn--outline btn--sm" onclick="viewDetails(${row.studentId}, ${row.caseId})">
                    <i class="fas fa-eye"></i>
                    Detalhes
                </button>
            </td>
        </tr>
    `).join('');
    
    console.log('Progress table rendered with', progressRows.length, 'rows');
}

// Get status class for styling
function getStatusClass(status) {
    switch(status) {
        case 'completed': return 'success';
        case 'in_progress': return 'warning';
        case 'not_started': return 'info';
        default: return 'info';
    }
}

// Get status text in Portuguese
function getStatusText(status) {
    switch(status) {
        case 'completed': return 'Concluído';
        case 'in_progress': return 'Em Progresso';
        case 'not_started': return 'Não Iniciado';
        default: return 'Desconhecido';
    }
}

// View details
function viewDetails(studentId, caseId) {
    const student = studentsData.find(s => s.id === studentId);
    const case_ = casesData.find(c => c.id === caseId);
    if (student && case_) {
        showNotification(`Visualizando progresso de ${student.name} no case ${case_.title}`, 'info');
    }
}

// Render versions
function renderVersions() {
    const versionsContainer = document.getElementById('versions-container');
    if (!versionsContainer) {
        console.log('Versions container not found');
        return;
    }
    
    versionsContainer.innerHTML = versionsData.map(version => {
        const case_ = casesData.find(c => c.id === version.caseId);
        return `
            <div class="version-card">
                <div class="version-card__header">
                    <h3 class="version-card__title">${case_ ? case_.title : 'Case não encontrado'}</h3>
                    <div class="version-card__meta">
                        <span class="case-version">v${version.version}</span>
                        <span><i class="fas fa-calendar"></i> ${formatDate(version.date)}</span>
                    </div>
                </div>
                <div class="version-card__body">
                    <h4>Alterações:</h4>
                    <div class="version-changes">
                        ${version.changes.map(change => `
                            <div class="version-change-item">
                                <i class="fas fa-check"></i>
                                <span>${change}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('Versions rendered');
}

// Render forum topics
function renderForumTopics() {
    const forumTopicsContainer = document.getElementById('forum-topics');
    if (!forumTopicsContainer) {
        console.log('Forum topics container not found');
        return;
    }
    
    let allTopics = [];
    forumsData.forEach(forum => {
        forum.topics.forEach(topic => {
            const case_ = casesData.find(c => c.id === forum.caseId);
            allTopics.push({
                ...topic,
                caseTitle: case_ ? case_.title : 'Case desconhecido'
            });
        });
    });
    
    forumTopicsContainer.innerHTML = allTopics.map(topic => `
        <div class="forum-topic">
            <div class="topic-header">
                <div class="topic-info">
                    <h4>${topic.title}</h4>
                    <div class="topic-meta">
                        <span><i class="fas fa-user"></i> ${topic.author} (${topic.authorRole})</span>
                        <span><i class="fas fa-book"></i> ${topic.caseTitle}</span>
                        <span><i class="fas fa-calendar"></i> ${formatDate(topic.createdAt)}</span>
                    </div>
                </div>
                <div class="topic-stats">
                    <span><i class="fas fa-comments"></i> ${topic.replies} respostas</span>
                </div>
            </div>
            <div class="topic-content">
                ${topic.content}
            </div>
        </div>
    `).join('');
    
    // Populate case select in new topic modal
    const topicCaseSelect = document.getElementById('topic-case');
    if (topicCaseSelect) {
        topicCaseSelect.innerHTML = '<option value="">Selecione um case</option>' + 
            casesData.map(case_ => `<option value="${case_.id}">${case_.title}</option>`).join('');
    }
    
    console.log('Forum topics rendered');
}

// Open new topic modal
function openNewTopicModal() {
    console.log('Opening new topic modal');
    const modal = document.getElementById('new-topic-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Close new topic modal
function closeNewTopicModal() {
    console.log('Closing new topic modal');
    const modal = document.getElementById('new-topic-modal');
    if (modal) {
        modal.classList.remove('active');
        
        // Clear form
        const titleInput = document.getElementById('topic-title');
        const caseSelect = document.getElementById('topic-case');
        const messageTextarea = document.getElementById('topic-message');
        
        if (titleInput) titleInput.value = '';
        if (caseSelect) caseSelect.value = '';
        if (messageTextarea) messageTextarea.value = '';
    }
}

// Create new topic
function createNewTopic() {
    const titleInput = document.getElementById('topic-title');
    const caseSelect = document.getElementById('topic-case');
    const messageTextarea = document.getElementById('topic-message');
    
    const title = titleInput?.value;
    const caseId = caseSelect?.value;
    const message = messageTextarea?.value;
    
    if (!title || !caseId || !message) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    // Simulate creating topic
    const newTopic = {
        id: Date.now(),
        title: title,
        author: currentUser,
        authorRole: currentUserRole,
        createdAt: new Date().toISOString().split('T')[0],
        replies: 0,
        content: message
    };
    
    let forumExists = forumsData.find(f => f.caseId == caseId);
    if (forumExists) {
        forumExists.topics.unshift(newTopic);
    } else {
        forumsData.push({
            caseId: parseInt(caseId),
            topics: [newTopic]
        });
    }
    
    renderForumTopics();
    closeNewTopicModal();
    showNotification('Tópico criado com sucesso!', 'success');
    
    console.log('New topic created:', title);
}

// Setup modal handlers
function setupModalHandlers() {
    console.log('Setting up modal handlers...');
    
    // Close modals when clicking backdrop
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal__backdrop')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                console.log('Modal closed via backdrop click');
            }
        }
    });
    
    // Close modals with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                console.log('Modal closed via ESC key');
            }
        }
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    const notificationsContainer = document.getElementById('notifications');
    if (notificationsContainer) {
        notificationsContainer.appendChild(notification);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
    }
}

// Get notification icon
function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        case 'info': default: return 'info-circle';
    }
}

// Format date to Brazilian format
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Simulate real-time updates
setInterval(() => {
    if (Math.random() > 0.98) { // 2% chance every interval
        const messages = [
            'Novo case disponível na biblioteca',
            'Atualização de versão detectada',
            'Nova discussão iniciada no fórum',
            'Progresso sincronizado com sucesso'
        ];
        const types = ['info', 'success', 'info', 'success'];
        const randomIndex = Math.floor(Math.random() * messages.length);
        showNotification(messages[randomIndex], types[randomIndex]);
    }
}, 15000); // Every 15 seconds

// Export functions for global access
window.switchUser = switchUser;
window.openCaseModal = openCaseModal;
window.closeCaseModal = closeCaseModal;
window.startCase = startCase;
window.viewDetails = viewDetails;
window.openNewTopicModal = openNewTopicModal;
window.closeNewTopicModal = closeNewTopicModal;
window.createNewTopic = createNewTopic;