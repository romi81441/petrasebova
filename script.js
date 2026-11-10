document.addEventListener("DOMContentLoaded", () => {
    // Implementácia Fade-In efektov pri skrolovaní
    const faders = document.querySelectorAll(".fade-in");

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("appear");
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Malý efekt pre plynulé skrolovanie odkazov
    document.querySelectorAll('.nav-links a, .cta-btn, .link-line').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                document.querySelector(hash).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Jazykový prepínač
    const langToggle = document.getElementById("langToggle");
    if(langToggle) {
        let currentLang = localStorage.getItem("lang") || "en";
        
        function setLanguage(lang) {
            document.querySelectorAll("[data-en]").forEach(el => {
                if (el.hasAttribute(`data-${lang}`)) {
                    el.innerHTML = el.getAttribute(`data-${lang}`);
                }
            });
            langToggle.textContent = lang === "en" ? "SK" : "EN";
            localStorage.setItem("lang", lang);
        }
        
        setLanguage(currentLang);
        
        langToggle.addEventListener("click", (e) => {
            e.preventDefault();
            currentLang = currentLang === "en" ? "sk" : "en";
            setLanguage(currentLang);
        });
    }
});
