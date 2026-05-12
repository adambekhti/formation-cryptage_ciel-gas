/**
 * CONFIGURATION DU QUIZ
 * On utilise un tableau d'objets pour pouvoir ajouter 
 * autant de questions que l'on souhaite facilement.
 */
const quizData = [
    {
        question: "Si j'envoie un fichier chiffré par erreur à la mauvaise personne, peut-elle le lire ?",
        options: [
            "Oui, car elle a reçu le fichier.",
            "Non, car elle ne possède pas la clé de déchiffrement.",
            "Seulement si elle utilise le même ordinateur que moi."
        ],
        correct: 1,
        feedback: "✅ Exact ! Sans la clé, le fichier reste une suite de caractères incohérents."
    },
    {
        question: "Quel terme est techniquement correct lorsqu'on utilise une clé ?",
        options: [
            "Cryptage",
            "Chiffrement",
            "Codage"
        ],
        correct: 1,
        feedback: "✅ Bravo ! On dit 'Chiffrer'. Le mot 'Crypter' est un abus de langage en français."
    },
    {
        question: "Un mot de passe '123456' est-il efficace pour le chiffrement ?",
        options: [
            "Oui, c'est simple et rapide.",
            "Non, il peut être cassé par force brute en une fraction de seconde.",
            "Oui, tant que personne ne me voit le taper."
        ],
        correct: 1,
        feedback: "✅ Exactement. La force du verrou dépend de la complexité de la clé."
    }
];

let currentQuestionIndex = 0;

/**
 * LOGIQUE DU QUIZ DYNAMIQUE
 */
function loadQuiz() {
    const quizContainer = document.getElementById('q1'); // C'est l'ID dans ton HTML
    const resultMsg = document.getElementById('result-message');
    
    if (!quizContainer) return;

    const currentQuiz = quizData[currentQuestionIndex];
    
    // On vide le message de résultat précédent
    resultMsg.innerHTML = "";
    resultMsg.style.display = "none";

    // Génération du HTML de la question
    quizContainer.innerHTML = `
        <p class="quiz-question"><strong>Question ${currentQuestionIndex + 1}/${quizData.length} : ${currentQuiz.question}</strong></p>
        <div class="options-container">
            ${currentQuiz.options.map((option, index) => `
                <div class="option" onclick="handleQuizAnswer(${index}, this)">
                    ${option}
                </div>
            `).join('')}
        </div>
    `;
}

function handleQuizAnswer(selectedIndex, element) {
    const currentQuiz = quizData[currentQuestionIndex];
    const resultMsg = document.getElementById('result-message');
    const options = document.querySelectorAll('.option');

    // Bloquer les clics supplémentaires
    options.forEach(opt => opt.style.pointerEvents = "none");

    resultMsg.style.display = "block";

    if (selectedIndex === currentQuiz.correct) {
        element.classList.add('correct');
        resultMsg.innerHTML = currentQuiz.feedback;
        resultMsg.style.color = "#10b981";

        // Passer à la question suivante après 2 secondes
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuiz();
            } else {
                showFinalScore();
            }
        }, 2000);
    } else {
        element.classList.add('wrong');
        resultMsg.innerHTML = "❌ Mauvaise réponse. Réessayez !";
        resultMsg.style.color = "#f87171";
        
        // Laisser l'utilisateur réessayer après un court délai
        setTimeout(() => {
            options.forEach(opt => opt.style.pointerEvents = "auto");
            element.classList.remove('wrong');
        }, 1500);
    }
}

function showFinalScore() {
    const quizContainer = document.getElementById('q1');
    quizContainer.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fa-solid fa-certificate" style="font-size: 3rem; color: #F28C28; margin-bottom: 15px;"></i>
            <h3>Félicitations !</h3>
            <p>Vous avez validé tous les modules de la formation CryptoSecure.</p>
            <button onclick="location.reload()" style="margin-top:15px; padding:10px 20px; cursor:pointer; border-radius:8px; border:none; background: #F28C28; color:white; font-weight:bold;">Recommencer la formation</button>
        </div>
    `;
    document.getElementById('result-message').innerHTML = "";
}

/**
 * TESTEUR DE MOT DE PASSE (Optionnel - à ajouter dans ton HTML si tu veux)
 * Pour l'utiliser, ajoute <input type="password" id="pw-tester"> dans ton module 4
 */
function initPasswordTester() {
    const input = document.getElementById('pw-tester');
    if (!input) return;

    input.addEventListener('input', () => {
        const val = input.value;
        let score = 0;
        if (val.length >= 12) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        const colors = ['#f87171', '#fbbf24', '#34d399', '#10b981'];
        input.style.borderBottom = `4px solid ${colors[score-1] || '#cbd5e1'}`;
    });
}

/**
 * BARRE DE PROGRESSION ET SCROLLSPY
 */
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) progressBar.style.width = scrolled + "%";

    // Gestion du ScrollSpy
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    let currentSectionId = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href") === `#${currentSectionId}`) {
            item.classList.add("active");
        }
    });
};

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    loadQuiz();
    initPasswordTester();
});