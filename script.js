const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let answersCount = {
  ADS: 0,
  Mecatronica: 0,
  Outros: 0
};

const questions = [
  {
    question: "Qual objeto do universo Marvel você gostaria de ter?",
    answers: [
      { text: "O traje tecnológico do Homem-Aranha (ADS)", hero: "ADS" },
      { text: "O traje do Homem de Ferro com armamentos avançados (Mecatronica)", hero: "Mecatronica" },
      { text: "O escudo de um herói inspirador (Outros)", hero: "Outros" }
    ]
  },
  {
    question: "Se pudesse escolher um mentor da Marvel, quem seria?",
    answers: [
      { text: "Homem-Aranha – inteligência e gadgets (ADS)", hero: "ADS" },
      { text: "Tony Stark – engenharia e tecnologia (Mecatronica)", hero: "Mecatronica" },
      { text: "Um herói sábio e estratégico (Outros)", hero: "Outros" }
    ]
  },
  {
    question: "Qual equipe você entraria para salvar o mundo?",
    answers: [
      { text: "Equipe do Peter Parker, cheia de inovação tecnológica (ADS)", hero: "ADS" },
      { text: "Equipe do Tony Stark com robôs e engenhocas (Mecatronica)", hero: "Mecatronica" },
      { text: "Equipe de heróis estratégicos e habilidosos (Outros)", hero: "Outros" }
    ]
  },
  {
    question: "Se fosse criar sua própria base secreta, qual seria o foco dela?",
    answers: [
      { text: "Computadores e sistemas avançados de monitoramento (ADS)", hero: "ADS" },
      { text: "Oficinas e laboratórios cheios de robôs (Mecatronica)", hero: "Mecatronica" },
      { text: "Salas de planejamento e criatividade (Outros)", hero: "Outros" }
    ]
  },
  {
    question: "Qual vilão da Marvel você gostaria de derrotar?",
    answers: [
      { text: "Ultron – uma IA fora de controle (ADS)", hero: "ADS" },
      { text: "Doutor Octopus – braços mecânicos poderosos (Mecatronica)", hero: "Mecatronica" },
      { text: "Loki – mestre da persuasão e da ilusão (Outros)", hero: "Outros" }
    ]
  },
  {
    question: "Se você fosse chamado para criar algo novo para os Vingadores, o que faria?",
    answers: [
      { text: "Um sistema de análise em tempo real das batalhas (ADS)", hero: "ADS" },
      { text: "Um novo veículo voador ou robô de combate (Mecatronica)", hero: "Mecatronica" },
      { text: "Uma rede de comunicação entre heróis e civis (Outros)", hero: "Outros" }
    ]
  },
  {
    question: "Qual tipo de desafio você gosta de enfrentar?",
    answers: [
      { text: "Resolver problemas de lógica e programação (ADS)", hero: "ADS" },
      { text: "Construir e consertar máquinas e robôs (Mecatronica)", hero: "Mecatronica" },
      { text: "Desafios criativos ou estratégicos (Outros)", hero: "Outros" }
    ]
  },
  {
    question: "Se você pudesse criar um equipamento ou invenção incrível, o que seria?",
    answers: [
      { text: "Um app inteligente ou sistema de monitoramento (ADS)", hero: "ADS" },
      { text: "Um robô multifuncional ou armamento tecnológico (Mecatronica)", hero: "Mecatronica" },
      { text: "Um item criativo, divertido ou estratégico (Outros)", hero: "Outros" }
    ]
  },
  {
    question: "Qual habilidade você gostaria de desenvolver?",
    answers: [
      { text: "Raciocínio lógico e programação (ADS)", hero: "ADS" },
      { text: "Engenharia, mecânica e eletrônica (Mecatronica)", hero: "Mecatronica" },
      { text: "Criatividade, liderança e estratégia (Outros)", hero: "Outros" }
    ]
  },
  {
    question: "Qual ferramenta você prefere usar em seu trabalho?",
    answers: [
      { text: "Computador e softwares avançados (ADS)", hero: "ADS" },
      { text: "Robôs, máquinas e dispositivos tecnológicos (Mecatronica)", hero: "Mecatronica" },
      { text: "Materiais de design ou planejamento (Outros)", hero: "Outros" }
    ]
  }
];

// Cria os botões das alternativas
function createAnswerButtons() {
  answerButtons.innerHTML = "";
  const currentQuestion = questions[currentQuestionIndex];

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = answer.text;
    button.addEventListener("click", () => selectAnswer(button, index));
    answerButtons.appendChild(button);
  });
}

// Exibe a pergunta atual
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  createAnswerButtons();
  nextButton.style.display = "inline-block";
  nextButton.style.position = "static"; 
  nextButton.style.marginTop = "20px";
  nextButton.innerText = "Próxima";
  nextButton.onclick = handleNextButton;
}

// Seleciona uma alternativa
function selectAnswer(button, index) {
  const buttons = Array.from(answerButtons.children);
  buttons.forEach((btn, i) => {
    btn.classList.remove("selected", "not-selected");
    if (i === index) {
      btn.classList.add("selected");
      const heroCategory = questions[currentQuestionIndex].answers[index].hero;
      answersCount[heroCategory]++;
    } else {
      btn.classList.add("not-selected");
    }
  });
}

// Próxima pergunta
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScreen();
  }
}

// Tela final com dois botões
function showFinalScreen() {
  questionElement.innerHTML = "Parabéns, você concluiu o quiz! 🚀<br>Descubra seu herói ou reinicie o quiz:";
  answerButtons.innerHTML = "";

  // Botão reiniciar (esquerda)
  const restartBtn = document.createElement("button");
  restartBtn.innerText = "Reiniciar meu quiz";
  restartBtn.classList.add("btn", "restart-btn");
  restartBtn.style.position = "absolute";
  restartBtn.style.left = "20px";
  restartBtn.style.bottom = "20px";
  restartBtn.addEventListener("click", restartQuiz);
  document.querySelector(".quiz").appendChild(restartBtn);

  // Botão revelar herói (direita)
  nextButton.innerText = "Revelar Herói";
  nextButton.style.position = "absolute";
  nextButton.style.right = "20px";
  nextButton.style.bottom = "20px";
  nextButton.onclick = showResult;
}

// Exibe resultado final
function showResult() {
  const maxCategory = Object.keys(answersCount).reduce((a, b) => answersCount[a] > answersCount[b] ? a : b);
  let heroName = "";
  if (maxCategory === "ADS") heroName = "Homem-Aranha";
  else if (maxCategory === "Mecatronica") heroName = "Homem de Ferro";
  else heroName = "Outros";

  questionElement.innerHTML = `Seu herói vocacional é: <strong>${heroName}</strong>! 🎯`;
  answerButtons.innerHTML = "";
}

// Reinicia o quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  answersCount = { ADS: 0, Mecatronica: 0, Outros: 0 };

  // Remove botão reiniciar extra
  const extraBtn = document.querySelector(".quiz button.restart-btn");
  if(extraBtn) extraBtn.remove();

  showQuestion();
}

// Inicia o quiz
showQuestion();
