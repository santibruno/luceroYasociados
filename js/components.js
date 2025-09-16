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
    initContactForm();
    await loadComponent('social-component', 'components/social/social.html');
    await loadComponent('footer-component', 'components/footer/footer.html');
    
    // Add click functionality to video items
    addVideoClickHandlers();
});
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = form.querySelector(".btn-enviar");
  const btnSpinner = form.querySelector(".btn-spinner");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Mostrar spinner y desactivar botón
    submitBtn.disabled = true;
    btnSpinner.style.display = "inline-block";

    const formData = new FormData(form);

    try {
      const response = await fetch("send.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: result.msg,
          confirmButtonText: "Aceptar",
        });

        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.msg,
          confirmButtonText: "Cerrar",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Hubo un problema al enviar el mensaje. Intentalo más tarde.",
      });
    } finally {
      submitBtn.disabled = false;
      btnSpinner.style.display = "none";
    }
  });
}

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