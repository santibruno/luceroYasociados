// Component loader function
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    await loadComponent('header-component', 'components/header/header.html');
    await loadComponent('hero-component', 'components/hero/hero.html');
    await loadComponent('about-component', 'components/about/about.html');
    await loadComponent('services-component', 'components/services/services.html');
    await loadComponent('contact-component', 'components/contact/contact.html');
    await loadComponent('social-component', 'components/social/social.html');
    await loadComponent('footer-component', 'components/footer/footer.html');
    
    // Add click functionality to video items
    addVideoClickHandlers();
});

// Function to add click handlers to video items
function addVideoClickHandlers() {
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            // Redirect to Instagram profile
            window.open('https://www.instagram.com/luceroyasociados/', '_blank');
        });
    });
}