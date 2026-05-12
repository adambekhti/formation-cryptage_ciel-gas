// 1. Gestion du Quiz
function checkAnswer(isCorrect, element) {
    const resultMsg = document.getElementById('result-message');
    const options = document.querySelectorAll('.option');
    
    // Désactiver les clics après réponse
    options.forEach(opt => opt.style.pointerEvents = "none");

    if(isCorrect) {
        element.classList.add('correct');
        resultMsg.innerHTML = "✅ Bravo ! C'est exactement le principe de la solution.";
        resultMsg.style.color = "#10b981";
    } else {
        element.classList.add('wrong');
        resultMsg.innerHTML = "❌ Attention. Sans la clé, le fichier reste illisible.";
        resultMsg.style.color = "#f87171";
    }
}

// 2. Barre de progression et ScrollSpy
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Mise à jour barre de progression
    document.getElementById("progress-bar").style.width = scrolled + "%";

    // Mise à jour du menu actif (ScrollSpy)
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(current)) {
            item.classList.add("active");
        }
    });
};