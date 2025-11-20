
// CONTACT FORM — EMAILJS INTEGRATION

   const form = document.getElementById("contact-form");

   form?.addEventListener("submit", function (e) {
     e.preventDefault();
   
     const name = form.name.value.trim();
     const email = form.email.value.trim();
     const message = form.message.value.trim();
   
     if (!name || !email || !message) {
       alert("Please fill in all fields.");
       return;
     }
   
     const params = { name, email, message };
   
     emailjs
       .send("service_dmiuxvi", "template_dwepv2i", params)
       .then(() => {
         alert("Message sent successfully! I'll get back to you soon.");
         form.reset();
       })
       .catch((error) => {
         console.error("EmailJS Error:", error);
         alert("Failed to send message. Please try again later.");
       });
   });
   

    // MAIN WEBSITE SCRIPT

   (function () {
        // THEME TOGGLE (Light / Dark)
     const themeCheckbox = document.getElementById("theme-toggle");
   
     if (themeCheckbox) {
       // Set checkbox based on current theme
       themeCheckbox.checked = document.documentElement.classList.contains(
         "dark"
       );
   
       // Change theme when toggled
       themeCheckbox.addEventListener("change", () => {
         document.documentElement.classList.toggle("dark");
       });
     }
   
        // PROFILE PHOTO UPLOAD PREVIEW

     const photoPlaceholder = document.getElementById("photo-placeholder");
     const photoInput = document.getElementById("photo-input");
     const aboutPhoto = document.getElementById("about-photo");
   
     function setImagePreview(el, file) {
       const reader = new FileReader();
   
       reader.onload = function (e) {
         el.style.backgroundImage = `url(${e.target.result})`;
         el.style.backgroundSize = "cover";
   
         // Remove "Add Photo" text
         el.querySelector(".upload-hint")?.remove();
       };
   
       reader.readAsDataURL(file);
     }
   
     // Clicking placeholder opens file input
     photoPlaceholder?.addEventListener("click", () => photoInput.click());
   
     // When photo selected
     photoInput?.addEventListener("change", (ev) => {
       const file = ev.target.files[0];
       if (!file) return;
   
       setImagePreview(photoPlaceholder, file);
       setImagePreview(aboutPhoto, file);
     });
   
    // REVEAL ON SCROLL ANIMATIONS
    const observer = new IntersectionObserver(
        entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add('inview');
            } else {
            entry.target.classList.remove('inview');
            }
        });
        },
        { threshold: 0.15 }
    );
  
   
     // Everything that fades-in on scroll
     document
       .querySelectorAll(
         "h2, .fade-in, .project-card, .skill-card, .timeline-item, .about-text"
       )
       .forEach((el) => {
         el.classList.add("fade-in");
         observer.observe(el);
       });
   
    // TILT EFFECT FOR CARDS
     function addTilt(el) {
       el.addEventListener("mousemove", (e) => {
         const rect = el.getBoundingClientRect();
         const x = e.clientX - rect.left;
         const y = e.clientY - rect.top;
   
         const cx = rect.width / 2;
         const cy = rect.height / 2;
   
         const dx = (x - cx) / cx;
         const dy = (y - cy) / cy;
   
         el.style.transform = `perspective(800px) 
                               rotateX(${-dy * 6}deg) 
                               rotateY(${dx * 6}deg) 
                               translateY(-8px)`;
       });
   
       el.addEventListener("mouseleave", () => {
         el.style.transform = "translateZ(0)";
       });
     }
   
     document
       .querySelectorAll(".project-card, .skill-card")
       .forEach(addTilt);
   
    // DOWNLOAD RESUME (Placeholder)
     document
       .getElementById("download-resume")
       ?.addEventListener("click", (e) => {
         e.preventDefault();
         alert(
           "Resume download placeholder — upload your resume file and link it."
         );
       });
 
    // HERO SECTION ENTRANCE ANIMATION
     gsap.from(".hero-title", {
       y: 20,
       opacity: 0,
       duration: 0.8,
       ease: "power3.out",
     });
   
     gsap.from(".hero-sub", {
       y: 12,
       opacity: 0,
       duration: 0.9,
       delay: 0.12,
     });
   })();
   