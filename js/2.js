const questions = [
  {
    question: "¿La Tierra es plana?",
    options: ["Verdadero", "Falso"],
    correctAnswer: 1,
  },
  {
    question: "¿Cuál es la capital de Francia?",
    options: ["Madrid", "París", "Roma", "Berlín"],
    correctAnswer: 1,
  },
  {
    question: "¿Donde se encuentra la escuela de robótica del Chocó?",
    options: ["Medellin-Antioquia"," Cundinamarca-Bogota", "Putumayo-Mocoa" , "Choco-Quibdó"],
    correctAnswer: 3,
  },
  {
    question: "Cuánto es 2 X 2?",
    options: ["4", "2", "2000", "2005"],
    correctAnswer: 0,
  },
];

class TriviaGame {
  constructor(nombre_De_usuario) {
    this.nombre_De_usuario = nombre_De_usuario;
    this.currentQuestion = 0;
    this.puntos = 0;
    this.contador = 30;
    this.questionDiv = document.getElementById("question");
    this.optionsDiv = document.getElementById("options");
    this.tiempo_span = document.getElementById("time");
    this.correctSound = new Audio('http://www.sonidosmp3gratis.com/sounds/correct-this-is.mp3');    
    this.incorrectSound = new Audio('http://www.sonidosmp3gratis.com/sounds/iphone-notificacion.mp3'); 
    this.inTimer= new Audio('./song/Kahoot soundtrack_ Kahoot música de fondo.mp3');
  }

  startGame() {
    this.displayQuestion();
    this.startTimer();
  }

  displayQuestion() {
    const currentQuestionObj = questions[this.currentQuestion];
    this.questionDiv.textContent = `${
      this.currentQuestion + 1
    }/${questions.length}: ${currentQuestionObj.question}`;

    this.optionsDiv.innerHTML = "";
    currentQuestionObj.options.forEach((option, index) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "option";
      optionDiv.textContent = option;
      optionDiv.addEventListener("click", () => this.checkAnswer(index));
      this.optionsDiv.appendChild(optionDiv);
    });
  }

  startTimer() {
    const timerInterval = setInterval(() => {
      this.contador--;
      this.tiempo_span.textContent = this.contador;

      if (this.contador === 29) {
        this.inTimer.play();
      }
      if (this.contador === 0) {
        clearInterval(timerInterval);
        this.showNextQuestion();
      }
      if (this.contador === 3) {
        this.inTimer.pause();
      }
      
    }, 1000);
  }

  checkAnswer(selectedIndex) {
    const currentQuestionObj = questions[this.currentQuestion];
    if (selectedIndex === currentQuestionObj.correctAnswer) {
      this.puntos++;
      this.displayResult("Correcto", "green");
      this.correctSound.play();
    } else {
      this.displayResult("Incorrecto", "red");
      this.incorrectSound.play();
    }
    setTimeout(() => this.showNextQuestion(), 1500);
  }

  displayResult(message, color) {
    this.optionsDiv.innerHTML = `<div style="color: ${color}">${message}</div>`;
  }

  showNextQuestion() {
    this.currentQuestion++;
    if (this.currentQuestion < questions.length) {
      this.contador = 30;
      this.displayQuestion();
      this.startTimer();
    } else {
      this.endGame();
    }
  }

  endGame() {
    const container = document.getElementById("container");
    container.innerHTML = `   <p>Nombre del usuario: ${this.nombre_De_usuario}</p>
                              <br>
                              <p id="g">Preguntas correctas: ${this.puntos}</p>
                              <br>
                              <p id="r">Preguntas incorrectas:${questions.length - this.puntos}<p>`;
  } 
}

const urlParams = new URLSearchParams(window.location.search);
const nombre_De_usuario = urlParams.get("nombre_De_usuario");

if (nombre_De_usuario) {
  const trivia = new TriviaGame(nombre_De_usuario);
  trivia.startGame();
} else {
  window.location.assign("index.html");
}
