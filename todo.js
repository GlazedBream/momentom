const toDoForm = document.querySelector(".js-toDoForm");
const taskInput = document.querySelector(".toDoInput");
const pendingList = document.querySelector(".pendingList");
const finishedList = document.querySelector(".finishedList");

const pending_LS = "PENDING";
let pendingTasks = [];
const finished_LS = "FINISHED";
let finishedTasks = [];

function deleteTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  if (li.parentNode.getAttribute("class") === "pendingList") {
    pendingList.removeChild(li);
    const cleanPending = pendingTasks.filter(function (text) {
      return text.id !== parseInt(li.id);
    });
    pendingTasks = cleanPending;
    localStorage.setItem(pending_LS, JSON.stringify(pendingTasks));
  } else {
    finishedList.removeChild(li);
    const cleanFinished = finishedTasks.filter(function (text) {
      return text.id !== parseInt(li.id);
    });
    finishedTasks = cleanFinished;
    localStorage.setItem(finished_LS, JSON.stringify(finishedTasks));
  }
}

function fromPtoF(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanPending = pendingTasks.filter(function (text) {
    return text.id !== parseInt(li.id);
  });
  const toFinished = pendingTasks.filter(function (text) {
    return text.id === parseInt(li.id);
  });
  pendingTasks = cleanPending;
  localStorage.setItem(pending_LS, JSON.stringify(pendingTasks));
  const newTask = {
    id: toFinished[0].id,
    text: toFinished[0].text
  };
  finishedTasks.push(newTask);
  localStorage.setItem(finished_LS, JSON.stringify(finishedTasks));
  listFinished(newTask);
}

function fromFtoP(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinished = finishedTasks.filter(function (text) {
    return text.id !== parseInt(li.id);
  });
  const toPending = finishedTasks.filter(function (text) {
    return text.id === parseInt(li.id);
  });
  finishedTasks = cleanFinished;
  localStorage.setItem(finished_LS, JSON.stringify(finishedTasks));
  const newTask = {
    id: toPending[0].id,
    text: toPending[0].text
  };
  pendingTasks.push(newTask);
  localStorage.setItem(pending_LS, JSON.stringify(pendingTasks));
  listPendings(newTask);
}

function appendToPending(text) {
  const taskId = new Date() * 1;
  const newTask = {
    id: taskId,
    text: text
  };
  pendingTasks.push(newTask);
  localStorage.setItem(pending_LS, JSON.stringify(pendingTasks));
  listPendings(newTask);
}

function listPendings(pending) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = pending.text;
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteTask);
  const doneBtn = document.createElement("button");
  doneBtn.innerHTML = "✔️";
  doneBtn.addEventListener("click", fromPtoF);
  const taskId = pending.id;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  li.id = taskId;
  pendingList.appendChild(li);
}

function listFinished(finished) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = finished.text;
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteTask);
  const againBtn = document.createElement("button");
  againBtn.innerHTML = "🔄";
  againBtn.addEventListener("click", fromFtoP);
  const taskId = finished.id;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(againBtn);
  li.id = taskId;
  finishedList.appendChild(li);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = taskInput.value;
  appendToPending(currentValue);
  taskInput.value = "";
}

function loadTasks() {
  const loadedPending = localStorage.getItem(pending_LS);
  const loadedFinished = localStorage.getItem(finished_LS);
  if (loadedPending !== null) {
    const parsedPending = JSON.parse(loadedPending);
    parsedPending.forEach(function (pending) {
      listPendings(pending);
      pendingTasks.push(pending);
    });
  }
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (finished) {
      listFinished(finished);
      finishedTasks.push(finished);
    });
  }
}

function init() {
  loadTasks();
}

toDoForm.addEventListener("submit", handleSubmit);
init();