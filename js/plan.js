let tasks = [];

window.onload = () => {
  const avatar = document.getElementById("avatar");
  const savedAvatar = localStorage.getItem("avatar");

  if (savedAvatar) {
    avatar.src = "assets/" + savedAvatar;
  }
};

function addTask() {
  const input = document.getElementById("taskInput");
  const select = document.getElementById("taskType");

  const text = input.value.trim();
  const type = select.value;

  if (!text) return;

  tasks.push({ text, type });
  taskInput.value = "";

  renderTasks();
  avatarReact(type);
}


function renderTasks() {
  const area = document.getElementById("taskBubbleArea");
  area.innerHTML = "";

  tasks.forEach((task, index) => {
    const bubble = document.createElement("div");
    bubble.className = `task-bubble ${task.type}`;
    bubble.textContent = task.text;

    bubble.style.left = Math.random() * 70 + "%";
    bubble.style.top = Math.random() * 50 + "%";

    bubble.onclick = () => popBubble(bubble, index);
    area.appendChild(bubble);
  });
}
function popBubble(bubble, index) {
  bubble.classList.add("pop-out");

  setTimeout(() => {
    tasks.splice(index, 1);
    renderTasks();
  }, 200);
}
function avatarReact(type) {
  const avatar = document.getElementById("avatar");

  avatar.className = "avatar react-" + type;

  setTimeout(() => {
    avatar.className = "avatar idle";
  }, 700);
}

setInterval(() => {
  const avatar = document.getElementById("avatar");
  const bubbles = document.querySelectorAll(".task-bubble");

  const aRect = avatar.getBoundingClientRect();

  bubbles.forEach(b => {
    const r = b.getBoundingClientRect();
    const dx = r.x - aRect.x;
    const dy = r.y - aRect.y;
    const dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 120) {
      b.style.left = (b.offsetLeft + dx * 0.05) + "px";
      b.style.top = (b.offsetTop + dy * 0.05) + "px";
    }
  });
}, 100);



function startDay() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  window.location.href = "game.html";
}
