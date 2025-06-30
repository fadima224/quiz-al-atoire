
const quiz = [
    {
        
        question: "Q. Quelle est la capitale de la Guinée ?",
        choix: ["Dakar", "Tripoli", "Conakry", "Malabo"],
        reponse: "Conakry"
    },
    {
        question: "Q. Quelle est la capitale du Canada ?",
        choix: ["Toronto", "Vancouver", "Ottawa", "Montréal"],
        reponse: "Ottawa"
    },
    {
        question: "Q. Quelle est la capitale du Japon ?",
        choix: ["Kyoto", "Tokyo", "Osaka", "Hiroshima"],
        reponse: "Tokyo"
    },
    {
        question: "Q. Quelle est la capitale de l'Australie ?",
        choix: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        reponse: "Canberra"
    },
    {
        question: "Q. Quelle est la capitale du Sénégal ?",
        choix: ["Dakar", "Yamoussoukro", "Yaoundé", "Libreville"],
        reponse: "Dakar"
    },
    {
        question: "Q. Quelle est la capitale de l'Allemagne ?",
        choix: ["Berlin", "Munich", "Francfort", "Hambourg"],
        reponse: "Berlin"
    },
    {
        question: "Q. Quelle est la capitale de l'Italie ?",
        choix: ["Rome", "Milan", "Venise", "Naples"],
        reponse: "Rome"
    },
    {
        question: "Q. Quelle est la capitale de l'Égypte ?",
        choix: ["Le Caire", "Alexandrie", "Louxor", "Assouan"],
        reponse: "Le Caire"
    },
    {
        question: "Q. Quelle est la capitale de la Chine ?",
        choix: ["Pékin", "Shanghai", "Canton", "Hong Kong"],
        reponse: "Pékin"
    },
    {
        question: "Q. Quelle est la capitale de la Russie ?",
        choix: ["Saint-Pétersbourg", "Moscou", "Kazan", "Novossibirsk"],
        reponse: "Moscou"
    },

     {
   question: "Q. Quelle est la capitale de l'ouganda ?",
        choix: ["Kampala", "Libreville", "Dodoma", "Victoria"],
        reponse: "Kampala"
    },

        {
   question: "Q. Quelle est la capitale de la Tanzanie ?",
        choix: ["Kampala", "Conakry", "Maputo", "Dodoma"],
        reponse: "Dodoma"
    },

        {
   question: "Q. Quelle est la capitale de la Mozambique ?",
        choix: ["Nairobi", "Yaoundé", "Lilongwé", "Maputo"],
        reponse: "Maputo"
    },

        {
   question: "Q. Quelle est la capitale du Madagascar ?",
        choix: ["Malabo", "Antananarivo", "Karthoum", "Djouba"],
        reponse: "Antananarivo"
    },

        {
   question: "Q. Quelle est la capitale du Soudan de l'ouest ?",
        choix: ["Khartoum", "Libreville", "Nairobi", "Dakar"],
        reponse: "Khartoum"
    },

        {
   question: "Q. Quelle est la capitale du Soudan de l'Ouzbékistan ?",
        choix: ["Douchanbé", "Bichrek", "Achgabat", "Tachkent"],
        reponse: "Tachkent"
    }



];

function melanger(array) {
    return array.sort(() => Math.random() - 0.5);
}

function determinerNiveau(score, total) {
    const pourcentage = (score / total) * 100;
    if  (pourcentage <= 40) return "Insuffisant" ;
    if (pourcentage <= 60) return "Intermédiaire";
    if (pourcentage <= 80) return "Avancé";
    return "Expert";
}

  

const container = document.querySelector('.container')
const questionBox = document.querySelector('.question')
const choixBox = document.querySelector('.choix')
const nextBtn = document.querySelector('.nextBtn')
const scoreCard = document.querySelector('.scoreCard')
const alert = document.querySelector('.alert')
const startBtn = document.querySelector('.startBtn')
const timer = document.querySelector('.timer')

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timeID = null;
let quizAleatoire = [];


startBtn.addEventListener('click', ()=>{
    startBtn.style.display = 'none';
    container.style.display = 'block'
    startQuiz()
});

const startQuiz = () => {
    quizAleatoire = melanger([...quiz]).slice(0, 10).map(item => ({
        question: item.question,
        choix: melanger([...item.choix]),
        reponse: item.reponse
    }));
    currentQuestionIndex = 0;
    score = 0;
    quizOver = false;
    timeLeft = 15;
    timer.style.display = 'flex';
    nextBtn.textContent = 'Suivant';
    scoreCard.textContent = '';
    questionBox.textContent = '';
    choixBox.textContent = '';
    showQuestion();
};

const showQuestion = () => {
    if (currentQuestionIndex >= quizAleatoire.length) {
        showScore();
        return;
    }
    const questionDetails = quizAleatoire[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choixBox.textContent = '';
    
    for (let i = 0; i < questionDetails.choix.length; i++) {
        const currentChoix = questionDetails.choix[i];
        const choixDiv = document.createElement('div');
        choixDiv.textContent = currentChoix;
        choixDiv.classList.add('choix');
        choixBox.appendChild(choixDiv);
        choixDiv.addEventListener('click', () => {
            const allChoix = choixBox.querySelectorAll('.choix');
            allChoix.forEach(c => c.classList.remove('selected'));
            choixDiv.classList.add('selected');
        });
    }

    startTimer();
};

function startTimer() {
    clearInterval(timeID);

    // Définir le temps selon la question
    if (currentQuestionIndex === 6) timeLeft = 10;
    else if (currentQuestionIndex === 7) timeLeft = 8;
    else if (currentQuestionIndex === 8) timeLeft = 5;
    else if (currentQuestionIndex === 9) timeLeft = 4;
    else timeLeft = 15;

    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timeID);
            const confirmUser = confirm('Temps écoulé !!');
            timeLeft = 15;
            questionBox.textContent = '';
            choixBox.textContent = '';
            showScore();
        }
    };

    timeID = setInterval(countDown, 1000);
}


nextBtn.addEventListener('click', () => {
    const selectedChoix = document.querySelector('.choix.selected');
    if (!selectedChoix && nextBtn.textContent === 'Suivant') {
        displayAlert('Sélectionnez votre choix');
        return;
    }
    if (quizOver) {
        startQuiz();
    } else {
        checkReponse();
    }
});
//VERIFICATION REPONSES
 const checkReponse = () => {
    const choixSelected = document.querySelector('.choix.selected');
    const bonneReponse = quizAleatoire[currentQuestionIndex].reponse;

    if (choixSelected && choixSelected.textContent === bonneReponse) {
        score++;
        displayAlert('Bonne réponse !!');
        playSound('bonneReponse');
    } else {
        // Si mauvaise réponse entre question 7 et 10 (index 6 à 9), fin du jeu
        if (currentQuestionIndex >= 6 && currentQuestionIndex <= 9) {
           
            playSound('mauvaise Reponse');
            showScore();
            return; // On quitte la fonction ici
        } else {
            displayAlert('Mauvaise réponse');
            playSound('mauvaiseReponse');
        }
    }

    timeLeft = 15;
    currentQuestionIndex++;
    showQuestion();
   };

//AFFICHAGE DU SCORE
const showScore = () => {
    questionBox.textContent = '';
    choixBox.textContent = '';
    const niveau = determinerNiveau(score, quizAleatoire.length);
    scoreCard.textContent = `Vous avez répondu ${score} sur ${quizAleatoire.length}    ➡️ Niveau : ${niveau}`;
    displayAlert('fin du quiz');
    nextBtn.textContent = 'Jouez encore';
    quizOver = true;
    timer.style.display = 'none';
    clearInterval(timeID);
if (score >= 7) {
        playSound('victoire');
    } else {
        playSound('defaite');
    }
    // Affichage de l'image de félicitations pendant 5 secondes si score >= 7
if (score >= 7) {
    const felicitationContainer = document.querySelector('.felicitation-container');
    felicitationContainer.style.display = 'flex';

    setTimeout(() => {
        felicitationContainer.style.display = 'none';
    }, 5000);
}

};

const displayAlert = (msg)=>{
    alert.style.display='block'
    alert.textContent = msg
    setTimeout(()=>{
        alert.style.display = 'none'
    }, 2000)
}



// Gestion des sons
let isMuted = false;

const sounds = {
    bonneReponse: new Audio("sonido-correcto-331225.mp3"),
    mauvaiseReponse: new Audio("error-126627.mp3"),
    victoire: new Audio("0812.wav"),
    defaite: new Audio("game-over-38511.mp3")
};

// Fonction pour jouer un son
function playSound(type) {
    if (!isMuted && sounds[type]) {
        sounds[type].currentTime = 0;
        sounds[type].play();
    }
}









