// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))


// 登録ボタンのイベントリスナー
document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // すでに登録されているユーザー名が存在するか確認
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(user => user.username === username)) {
      alert("このユーザー名は既に登録されています。");
      return;
  }

  // 新しいユーザーを追加
  users.push({ username: username, password: password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("登録が完了しました");
  document.getElementById("authForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
});

// ログインボタンのイベントリスナー
document.getElementById("login").addEventListener("submit", function(event) {
  event.preventDefault();
  const loginUsername = document.getElementById("loginUsername").value;
  const loginPassword = document.getElementById("loginPassword").value;

  // ローカルストレージからユーザー情報を取得
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // ユーザー名とパスワードが一致するユーザーを探す
  const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

  if (user) {
      alert("ログイン成功");
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("wordApp").style.display = "block";
  } else {
      alert("ユーザー名またはパスワードが違います");
  }
});

// 新規登録ページに移動
document.getElementById("goToRegister").addEventListener("click", function() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("authForm").style.display = "block";
});

// ログインページに移動
document.getElementById("goToLogin").addEventListener("click", function() {
  document.getElementById("authForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
});

// 単語と意味の追加ボタン
const wordList = [];
document.getElementById("addWordBtn").addEventListener("click", function() {
  const wordInput = document.getElementById("wordInput").value;
  const meaningInput = document.getElementById("meaningInput").value;

  if (wordInput && meaningInput) {
      wordList.push({ word: wordInput, meaning: meaningInput });
      const wordListDisplay = document.getElementById("wordList");
      const newWordItem = document.createElement("li");
      newWordItem.textContent = `${wordInput}: ${meaningInput}`;
      wordListDisplay.appendChild(newWordItem);

      document.getElementById("wordInput").value = '';
      document.getElementById("meaningInput").value = '';
      
      document.getElementById("startQuizBtn").style.display = "block";
  }
});

// クイズを開始するボタン
document.getElementById("startQuizBtn").addEventListener("click", function() {
  document.getElementById("wordApp").style.display = "none";
  document.getElementById("quizApp").style.display = "block";
  currentQuestionIndex = 0;
  displayQuestion();
});

// クイズの問題を表示
let currentQuestionIndex = 0;
let currentAnswer = '';

function displayQuestion() {
  const wordEntry = wordList[currentQuestionIndex];
  document.getElementById("quizMeaning").textContent = `意味: ${wordEntry.meaning}`;
  currentAnswer = wordEntry.word;
  document.getElementById("quizAnswer").value = '';
  document.getElementById("quizResult").textContent = '';
  document.getElementById("nextQuestionBtn").style.display = "none";
}

document.getElementById("submitAnswerBtn").addEventListener("click", function() {
  const userAnswer = document.getElementById("quizAnswer").value.trim();
  if (userAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
      document.getElementById("quizResult").textContent = "正解！";
  } else {
      document.getElementById("quizResult").textContent = `不正解。正解は「${currentAnswer}」です。`;
  }

  document.getElementById("nextQuestionBtn").style.display = "block";
});

document.getElementById("nextQuestionBtn").addEventListener("click", function() {
  currentQuestionIndex = (currentQuestionIndex + 1) % wordList.length;
  displayQuestion();
});

// 単語帳に戻るボタン
document.getElementById("backToWordListBtn").addEventListener("click", function() {
  document.getElementById("quizApp").style.display = "none";
  document.getElementById("wordApp").style.display = "block";
});
