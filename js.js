let stopwatchInterval;
let stopwatchElapsedTime = 0;
let stopwatchRunning = false;

let reverseInterval;
let reverseEndTime;
let reverseRunning = false;

const stopwatchDisplay = document.getElementById("stopwatchTime");
const reverseDisplay = document.getElementById("reverseTime");
const reverseInput = document.getElementById("reverseInput");
const lapList = document.getElementById("lapList");

function formatTime(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function startStopwatch() {
  if (stopwatchRunning) return;
  stopwatchRunning = true;
  stopwatchInterval = setInterval(() => {
    stopwatchElapsedTime += 1000;
    stopwatchDisplay.textContent = formatTime(stopwatchElapsedTime);
  }, 1000);
}

function pauseStopwatch() {
  if (!stopwatchRunning) return;
  stopwatchRunning = false;
  clearInterval(stopwatchInterval);
}

function resetStopwatch() {
  stopwatchRunning = false;
  clearInterval(stopwatchInterval);
  stopwatchElapsedTime = 0;
  stopwatchDisplay.textContent = formatTime(stopwatchElapsedTime);
  lapList.innerHTML = "";
}

function addLap() {
  if (!stopwatchRunning) return;
  const lapTime = document.createElement("li");
  lapTime.textContent = formatTime(stopwatchElapsedTime);
  lapList.appendChild(lapTime);
}

function startReverseTimer() {
  if (reverseRunning) return;
  reverseRunning = true;
  reverseInterval = setInterval(() => {
    const now = Date.now();
    const timeLeft = reverseEndTime - now;
    if (timeLeft <= 0) {
      clearInterval(reverseInterval);
      reverseDisplay.textContent = "00:00:00";
      reverseRunning = false;
      return;
    }
    reverseDisplay.textContent = formatTime(timeLeft);
  }, 1000);
}

function pauseReverseTimer() {
  if (!reverseRunning) return;
  reverseRunning = false;
  clearInterval(reverseInterval);
}

function resetReverseTimer() {
  reverseRunning = false;
  clearInterval(reverseInterval);
  reverseDisplay.textContent = "00:00:00";
}

function setReverseTimer() {
  const inputTime = reverseInput.value;
  const [hours, minutes, seconds] = inputTime.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    alert("Invalid time format. Use hh:mm:ss");
    return;
  }
  const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
  reverseEndTime = Date.now() + totalMilliseconds;
  reverseDisplay.textContent = formatTime(totalMilliseconds);
}

document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("pause").addEventListener("click", pauseStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("lap").addEventListener("click", addLap);

document
  .getElementById("setReverse")
  .addEventListener("click", setReverseTimer);
document
  .getElementById("startReverse")
  .addEventListener("click", startReverseTimer);
document
  .getElementById("pauseReverse")
  .addEventListener("click", pauseReverseTimer);
document
  .getElementById("resetReverse")
  .addEventListener("click", resetReverseTimer);
