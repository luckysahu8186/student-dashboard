// TASKS
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.innerText = task.text;

    if (task.done) li.classList.add("done");

    li.onclick = () => {
      task.done = !task.done;
      saveTasks();
    };

    const btn = document.createElement("button");
    btn.innerText = "❌";
    btn.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(i, 1);
      saveTasks();
    };

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) return;

  tasks.push({ text: input.value, done: false });
  input.value = "";
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// NOTES
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  const box = document.getElementById("noteList");
  box.innerHTML = "";

  notes.forEach((note, i) => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerText = note;

    const btn = document.createElement("button");
    btn.innerText = "❌";
    btn.onclick = () => {
      notes.splice(i, 1);
      saveNotes();
    };

    div.appendChild(btn);
    box.appendChild(div);
  });
}

function addNote() {
  const input = document.getElementById("noteInput");
  if (!input.value) return;

  notes.push(input.value);
  input.value = "";
  saveNotes();
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

// TIMER
let time = 1500;
let interval;

function updateDisplay() {
  const m = Math.floor(time / 60);
  const s = time % 60;
  document.getElementById("time").innerText =
    `${m}:${s < 10 ? "0" : ""}${s}`;
}

function startTimer() {
  if (interval) return;
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  time = 1500;
  updateDisplay();
}

// WEATHER (WeatherAPI use ho raha)
const API_KEY = "aa99b94b141344338a5173309262703";

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
  );

  const data = await res.json();

  if (data.error) {
    document.getElementById("weatherResult").innerText = "City not found ❌";
    return;
  }

  document.getElementById("weatherResult").innerHTML = `
    <h3>${data.location.name}</h3>
    <p>🌡️ ${data.current.temp_c}°C</p>
    <p>☁️ ${data.current.condition.text}</p>
  `;
}

// THEME
function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

// INIT
renderTasks();
renderNotes();
updateDisplay();
