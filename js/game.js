// ===== GAME STATE =====
let xp = 0;
let level = 1;
const XP_PER_LEVEL = 100;
let tasks = [];

// ===== ON LOAD =====
window.onload = () => {
  const avatar = document.getElementById("avatar");
  const savedAvatar = localStorage.getItem("avatar");
  const savedTasks = localStorage.getItem("tasks");

  // Load avatar
  if (savedAvatar) {
    avatar.src = "assets/" + savedAvatar;
  }

  // Load planned tasks
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }

  // Initialize HUD
  updateXPBar();
  document.getElementById("level").textContent = level;
  applyMood();
};

// ===== RENDER TASK BUBBLES =====
function renderTasks() {
  const area = document.getElementById("taskBubbleArea");
  area.innerHTML = "";

  tasks.forEach((task, index) => {
    const bubble = document.createElement("div");
    bubble.className = `task-bubble ${task.type}`;
    bubble.textContent = task.text;

    // Random arcade placement
    bubble.style.left = Math.random() * 70 + "%";
    bubble.style.top = Math.random() * 50 + "%";

    bubble.onclick = () => completeTask(bubble, index);
    area.appendChild(bubble);
  });
}

// ===== COMPLETE TASK =====
function completeTask(bubble, index) {
  // Gain XP
  xp += 10;

  // Level up logic
  if (xp >= XP_PER_LEVEL) {
    xp -= XP_PER_LEVEL;
    level++;
    document.getElementById("level").textContent = level;
    avatarReact("fun"); // celebration
  }

  updateXPBar();

  // Bubble pop
  bubble.classList.add("pop-out");

  // Avatar reaction based on task type
  avatarReact(tasks[index].type);

  setTimeout(() => {
    tasks.splice(index, 1);
    renderTasks();

    // End of day
    if (tasks.length === 0) {
      saveDayResults();
      window.location.href = "summary.html";
    }
  }, 200);
}

// ===== XP BAR =====
function updateXPBar() {
  const fill = document.getElementById("xpFill");
  if (!fill) return;

  const percent = (xp / XP_PER_LEVEL) * 100;
  fill.style.width = percent + "%";
}

// ===== AVATAR REACTIONS =====
function avatarReact(type) {
  const avatar = document.getElementById("avatar");
  avatar.className = "avatar react-" + type;

  setTimeout(() => {
    avatar.className = "avatar idle";
    applyMood();
  }, 700);
}

// ===== AVATAR MOOD (BASED ON LEVEL) =====
function applyMood() {
  const avatar = document.getElementById("avatar");
  const moodLevel = Math.min(level, 4);
  avatar.classList.add(`mood-${moodLevel}`);
}

// ===== SAVE RESULTS FOR SUMMARY =====
function saveDayResults() {
  localStorage.setItem("finalXP", xp);
  localStorage.setItem("finalLevel", level);
  localStorage.setItem("tasksDone", JSON.parse(localStorage.getItem("tasks")).length);

  // Save leaderboard entry
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name: "You", xp });
  leaderboard.sort((a, b) => b.xp - a.xp);
  leaderboard = leaderboard.slice(0, 5);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}
