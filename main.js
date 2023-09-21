// Sélection des éléments DOM nécessaires
var passwordInput = document.getElementById("passwordInput");
var visibilityIcon = document.getElementById("visibilityIcon");

/**
 * Bascule la visibilité du mot de passe. Si le mot de passe est caché, 
 * il sera affiché et vice versa.
 */
function toggleVisibility() {
    var currentType = passwordInput.type;
    var newType = currentType === "password" ? "text" : "password";
    passwordInput.type = newType;

    // Change l'icône en fonction de la visibilité du mot de passe
    visibilityIcon.className = newType === "password" ? "fas fa-eye" : "fas fa-eye-slash";
}

/**
 * Vérifie la validité du mot de passe en fonction des critères définis
 * et met à jour la barre de progression et les icônes en conséquence.
 */
function checkPassword() {
    var password = passwordInput.value;
    var validCount = 0; // Compte le nombre de critères satisfaits

    validCount += validateCriteria(password.length >= 8, 'length');
    validCount += validateCriteria(/[a-z]/.test(password), 'lowercase');
    validCount += validateCriteria(/[A-Z]/.test(password), 'uppercase');
    validCount += validateCriteria(/[0-9]/.test(password), 'number');
    validCount += validateCriteria(/[^a-zA-Z0-9]/.test(password), 'special');

    // Met à jour la barre de progression
    updateProgressBar(validCount);
}

/**
 * Valide un critère spécifique pour le mot de passe.
 * @param {boolean} condition - Si le critère est rempli ou non.
 * @param {string} elementId - L'ID de l'élément lié à ce critère.
 * @return {number} - Retourne 1 si le critère est validé, sinon 0.
 */
function validateCriteria(condition, elementId) {
    var element = document.getElementById(elementId);
    var icon = element.querySelector('.icon');
    if (condition) {
        element.classList.add('valid');
        icon.className = "icon fas fa-check";
        return 1; 
    } else {
        element.classList.remove('valid');
        icon.className = "icon fas fa-times";
        return 0; 
    }
}

/**
 * Met à jour la barre de progression en fonction du nombre de critères validés.
 * @param {number} validCount - Nombre de critères satisfaits.
 */
function updateProgressBar(validCount) {
    var progressBar = document.getElementById("progressBar");
    var progress = (validCount / 5) * 100; // 5 est le nombre total de critères
    progressBar.style.width = progress + "%";

    // Ajuste la couleur de la barre en fonction de la progression
    if (progress <= 20) {
        setProgressBarColor(progressBar, 'red');
    } else if (progress <= 40) {
        setProgressBarColor(progressBar, 'orange');
    } else if (progress <= 60) {
        setProgressBarColor(progressBar, 'yellow');
    } else if (progress <= 80) {
        setProgressBarColor(progressBar, 'lightgreen');
    } else {
        setProgressBarColor(progressBar, 'green');
    }

    // Si le mot de passe est entièrement validé, lance une animation de confettis
    if (progress === 100) {
        triggerConfetti();
    }
}

/**
 * Définit la couleur de la barre de progression.
 * @param {Element} progressBar - L'élément de la barre de progression.
 * @param {string} color - La couleur à appliquer.
 */
function setProgressBarColor(progressBar, color) {
    ['red', 'orange', 'yellow', 'lightgreen', 'green'].forEach(cls => {
        progressBar.classList.remove(cls);
    });
    progressBar.classList.add(color);
}

/**
 * Lance une animation de confettis à l'écran.
 */
function triggerConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6, x: 0.5 }
    });
}

// Vérifie initialement la validité du mot de passe
checkPassword();