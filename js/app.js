document.addEventListener('DOMContentLoaded', () => {
    const agentsContainer = document.getElementById('agents-container');
    const searchInput = document.getElementById('search');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    let currentCategory = 'all';
    let searchTerm = '';
    
    // Initial render
    renderAgents();
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderAgents();
    });
    
    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            renderAgents();
        });
    });
    
    // Render agents based on current filters
    function renderAgents() {
        agentsContainer.innerHTML = '';
        
        const filteredAgents = agents.filter(agent => {
            const matchesSearch = agent.name.toLowerCase().includes(searchTerm) || 
                                agent.description.toLowerCase().includes(searchTerm);
            const matchesCategory = currentCategory === 'all' || agent.category === currentCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        if (filteredAgents.length === 0) {
            agentsContainer.innerHTML = `
                <div class="no-results">
                    <p>No agents found matching your criteria.</p>
                </div>
            `;
            return;
        }
        
        filteredAgents.forEach(agent => {
            const agentCard = document.createElement('div');
            agentCard.className = 'agent-card';
            agentCard.innerHTML = `
                <div class="agent-image">
                    <img src="${agent.image}" alt="${agent.name}" onerror="this.src='images/placeholder.png'">
                </div>
                <div class="agent-content">
                    <span class="agent-category">${agent.category}</span>
                    <h3 class="agent-name">${agent.name}</h3>
                    <p class="agent-description">${agent.description}</p>
                    <a href="${agent.deepLink}" class="agent-link">Open Agent</a>
                </div>
            `;
            agentsContainer.appendChild(agentCard);
        });
    }
});