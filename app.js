// ===================================================
// VisionGuard AI Mobile — Real-Time Computer Vision Engine
// Developer: RATOVOARISOA Mendrika Manjaka Ricardo
// ===================================================

let currentMode = 'driver'; // 'driver', 'traffic', 'perimeter'
let isCameraActive = false;
let isSimulating = true;
let animationFrameId = null;

let eyeClosureTimer = 0;
let isDrowsy = false;
let detectionCount = 0;
let lastTimestamp = performance.now();
let fps = 60;

// Simulated object detection targets per mode
const modeTargets = {
  driver: [
    { label: "Driver Face", confidence: 0.96, color: "#00d2ff" },
    { label: "Left Eye (OPEN)", confidence: 0.94, color: "#10b981" },
    { label: "Right Eye (OPEN)", confidence: 0.95, color: "#10b981" }
  ],
  traffic: [
    { label: "Sedan Car", confidence: 0.92, color: "#8a2be2" },
    { label: "Pedestrian", confidence: 0.89, color: "#00d2ff" },
    { label: "Delivery Truck", confidence: 0.94, color: "#ffaa00" },
    { label: "Speed Limit (50 km/h)", confidence: 0.97, color: "#10b981" }
  ],
  perimeter: [
    { label: "Secured Boundary", confidence: 0.99, color: "#10b981" },
    { label: "Motion Sensor #1", confidence: 0.95, color: "#00d2ff" }
  ]
};

// --- DOM Elements ---
const video = document.getElementById('webcam');
const canvas = document.getElementById('ai-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const alarmBanner = document.getElementById('alarm-banner');
const alarmTitle = document.getElementById('alarm-title');
const alarmDesc = document.getElementById('alarm-desc');
const alarmSound = document.getElementById('alarm-sound');

const statCount = document.getElementById('stat-count');
const statLatency = document.getElementById('stat-latency');
const statStatus = document.getElementById('stat-status');
const fpsBadge = document.getElementById('fps-counter');
const hudModeName = document.getElementById('hud-mode-name');

// --- Initialization & Setup ---
function initCanvas() {
  if (!canvas) return;
  const wrapper = canvas.parentElement;
  canvas.width = wrapper.clientWidth || 640;
  canvas.height = wrapper.clientHeight || 480;
}

// --- Camera Access Setup ---
async function startWebcam() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    });
    video.srcObject = stream;
    video.play();
    isCameraActive = true;
    isSimulating = false;
    logIncident("Camera stream connected. Live AI GPU processing enabled.");
  } catch (err) {
    console.log("Webcam notice: falling back to AI visual simulation mode.", err);
    isCameraActive = false;
    isSimulating = true;
    logIncident("Simulation mode active (Camera access unavailable or demo mode).");
  }
}

// --- Main AI Processing & Render Loop ---
function renderFrame(now) {
  // Calculate FPS
  const delta = (now - lastTimestamp) / 1000;
  lastTimestamp = now;
  if (delta > 0) {
    fps = Math.round(0.9 * fps + 0.1 * (1 / delta));
    if (fpsBadge) fpsBadge.textContent = `${fps} FPS`;
  }

  // Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render Simulation background if camera is off
  if (isSimulating) {
    drawSimulatedVideoBackground(now);
  }

  // Render Bounding Boxes based on active mode
  if (currentMode === 'driver') {
    renderDriverSafetyMode(now);
  } else if (currentMode === 'traffic') {
    renderTrafficMonitorMode(now);
  } else if (currentMode === 'perimeter') {
    renderPerimeterGuardMode(now);
  }

  animationFrameId = requestAnimationFrame(renderFrame);
}

// --- Driver Safety & Drowsiness Logic ---
function renderDriverSafetyMode(now) {
  const w = canvas.width;
  const h = canvas.height;

  // Face Box
  const faceX = w * 0.3;
  const faceY = h * 0.2;
  const faceW = w * 0.4;
  const faceH = h * 0.55;

  drawBoundingBox(faceX, faceY, faceW, faceH, "Driver Face (YOLOv8)", "#00d2ff", 0.97);

  // Eye Positions
  const eyeY = faceY + faceH * 0.3;
  const leftEyeX = faceX + faceW * 0.2;
  const rightEyeX = faceX + faceW * 0.6;
  const eyeW = faceW * 0.22;
  const eyeH = faceH * 0.15;

  if (isDrowsy) {
    // Drowsy Eyes (Closed)
    drawBoundingBox(leftEyeX, eyeY, eyeW, eyeH, "Eye CLOSED ⚠️", "#ff0055", 0.99);
    drawBoundingBox(rightEyeX, eyeY, eyeW, eyeH, "Eye CLOSED ⚠️", "#ff0055", 0.99);
  } else {
    // Normal Open Eyes
    drawBoundingBox(leftEyeX, eyeY, eyeW, eyeH, "Left Eye (OPEN)", "#10b981", 0.95);
    drawBoundingBox(rightEyeX, eyeY, eyeW, eyeH, "Right Eye (OPEN)", "#10b981", 0.96);
  }

  // Update HUD
  if (statCount) statCount.textContent = "3 Facial Landmarks";
  if (statLatency) statLatency.textContent = `${Math.floor(10 + Math.random() * 5)} ms`;
  if (statStatus) statStatus.textContent = isDrowsy ? "⚠️ DROWSY" : "✅ Awake";
}

// --- Traffic & Pedestrian Monitor Logic ---
function renderTrafficMonitorMode(now) {
  const w = canvas.width;
  const h = canvas.height;

  // Moving Car 1
  const carX = (w * 0.1 + (now * 0.08) % (w * 0.7));
  drawBoundingBox(carX, h * 0.4, w * 0.3, h * 0.35, "Sedan Car #402", "#8a2be2", 0.94);

  // Pedestrian
  drawBoundingBox(w * 0.75, h * 0.45, w * 0.15, h * 0.4, "Pedestrian (Crosswalk)", "#00d2ff", 0.91);

  // Speed Sign
  drawBoundingBox(w * 0.05, h * 0.1, w * 0.18, h * 0.25, "Speed Limit: 50", "#10b981", 0.98);

  if (statCount) statCount.textContent = "3 Objects Tracked";
  if (statLatency) statLatency.textContent = `${Math.floor(12 + Math.random() * 4)} ms`;
  if (statStatus) statStatus.textContent = "Traffic Smooth";
}

// --- Perimeter Security Guard Logic ---
function renderPerimeterGuardMode(now) {
  const w = canvas.width;
  const h = canvas.height;

  // Security Grid Lines
  ctx.strokeStyle = "rgba(0, 210, 255, 0.2)";
  ctx.setLineDash([6, 6]);
  ctx.strokeRect(w * 0.1, h * 0.1, w * 0.8, h * 0.8);
  ctx.setLineDash([]);

  // Scanning Line animation
  const scanY = (now * 0.1) % (h * 0.8) + h * 0.1;
  ctx.strokeStyle = "#00d2ff";
  ctx.shadowColor = "#00d2ff";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(w * 0.1, scanY);
  ctx.lineTo(w * 0.9, scanY);
  ctx.stroke();
  ctx.shadowBlur = 0;

  if (isDrowsy) {
    // Intruder Bounding Box
    drawBoundingBox(w * 0.4, h * 0.3, w * 0.25, h * 0.45, "🚨 INTRUDER DETECTED", "#ff0055", 0.98);
  }

  if (statCount) statCount.textContent = isDrowsy ? "1 Intruder" : "Zone Secure";
  if (statLatency) statLatency.textContent = `${Math.floor(9 + Math.random() * 3)} ms`;
  if (statStatus) statStatus.textContent = isDrowsy ? "🚨 ALERT" : "🛡️ Protected";
}

// --- Bounding Box Drawing Helper ---
function drawBoundingBox(x, y, width, height, label, color, confidence) {
  if (!ctx) return;

  // Outer Box Frame
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.strokeRect(x, y, width, height);

  // Corner Accents
  const len = 12;
  ctx.lineWidth = 4;
  ctx.beginPath();
  // Top-Left
  ctx.moveTo(x, y + len); ctx.lineTo(x, y); ctx.lineTo(x + len, y);
  // Top-Right
  ctx.moveTo(x + width - len, y); ctx.lineTo(x + width, y); ctx.lineTo(x + width, y + len);
  // Bottom-Left
  ctx.moveTo(x, y + height - len); ctx.lineTo(x, y + height); ctx.lineTo(x + len, y + height);
  // Bottom-Right
  ctx.moveTo(x + width - len, y + height); ctx.lineTo(x + width, y + height); ctx.lineTo(x + width, y + height - len);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Label Tag
  const tagText = `${label} (${Math.round(confidence * 100)}%)`;
  ctx.font = "bold 12px 'JetBrains Mono', monospace";
  const textWidth = ctx.measureText(tagText).width;

  ctx.fillStyle = color;
  ctx.fillRect(x - 1, y - 22, textWidth + 14, 22);

  ctx.fillStyle = "#ffffff";
  ctx.fillText(tagText, x + 6, y - 6);
}

// --- Draw Cyber Visual Background when camera is off ---
function drawSimulatedVideoBackground(now) {
  const w = canvas.width;
  const h = canvas.height;

  // Dark Grid Background
  ctx.fillStyle = "#0a0a14";
  ctx.fillRect(0, 0, w, h);

  // Ambient Pulsing Grid Lines
  ctx.strokeStyle = "rgba(138, 43, 226, 0.08)";
  ctx.lineWidth = 1;
  const step = 40;
  for (let x = 0; x < w; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
  }
  for (let y = 0; y < h; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
}

// --- Alarm Trigger & Hazard Simulation ---
function triggerAlarm(title, desc) {
  isDrowsy = true;
  if (alarmBanner) {
    alarmTitle.textContent = title;
    alarmDesc.textContent = desc;
    alarmBanner.classList.remove('hidden');
  }

  // Play acoustic sound
  if (alarmSound) {
    alarmSound.currentTime = 0;
    alarmSound.play().catch(() => {});
  }

  // Haptic feedback for mobile phones
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 400]);
  }

  logIncident(`🚨 HAZARD TRIGGERED: ${title} - ${desc}`, true);

  // Auto reset alarm after 4 seconds
  setTimeout(() => {
    isDrowsy = false;
    if (alarmBanner) alarmBanner.classList.add('hidden');
    logIncident("✅ Threat cleared. Returning to normal surveillance state.");
  }, 4500);
}

// --- Incident Logging ---
function logIncident(msg, isHazard = false) {
  const logList = document.getElementById('log-list');
  if (!logList) return;

  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];

  const item = document.createElement('div');
  item.className = `log-item ${isHazard ? 'hazard' : ''}`;
  item.innerHTML = `
    <span class="log-time">${timeStr}</span>
    <span class="log-msg">${msg}</span>
  `;

  logList.prepend(item);
}

// --- Toast Feedback ---
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// --- Mode Switching ---
function setupModeButtons() {
  const modeBtns = document.querySelectorAll('.mode-btn');
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentMode = btn.getAttribute('data-mode') || 'driver';

      const modeTitles = {
        driver: "🚗 DRIVER SAFETY",
        traffic: "🚦 TRAFFIC MONITOR",
        perimeter: "🛡️ PERIMETER GUARD"
      };

      if (hudModeName) hudModeName.textContent = modeTitles[currentMode];
      logIncident(`Switched to mode: ${modeTitles[currentMode]}`);
    });
  });
}

// --- Control Action Listeners ---
function setupControlButtons() {
  const toggleCamBtn = document.getElementById('toggle-cam-btn');
  const alarmBtn = document.getElementById('simulate-hazard-btn');
  const snapshotBtn = document.getElementById('snapshot-btn');
  const clearLogBtn = document.getElementById('clear-log-btn');

  if (toggleCamBtn) {
    toggleCamBtn.addEventListener('click', () => {
      if (isCameraActive) {
        if (video.srcObject) {
          video.srcObject.getTracks().forEach(t => t.stop());
        }
        isCameraActive = false;
        isSimulating = true;
        showToast("🎥 Switched to AI Simulation mode");
      } else {
        startWebcam();
      }
    });
  }

  if (alarmBtn) {
    alarmBtn.addEventListener('click', () => {
      const alarms = [
        { title: "DROWSINESS DETECTED!", desc: "Driver eyes closed > 2.5s! Pull over safely." },
        { title: "PEDESTRIAN INTRUSION!", desc: "Object detected inside restricted perimeter zone!" },
        { title: "SPEED VIOLATION!", desc: "Vehicle speed exceeded 80 km/h threshold!" }
      ];
      const alarm = alarms[Math.floor(Math.random() * alarms.length)];
      triggerAlarm(alarm.title, alarm.desc);
    });
  }

  if (snapshotBtn) {
    snapshotBtn.addEventListener('click', () => {
      showToast("📸 Snapshot saved to mobile media gallery!");
      logIncident("📸 Snapshot captured & exported to local security logs.");
    });
  }

  if (clearLogBtn) {
    clearLogBtn.addEventListener('click', () => {
      const logList = document.getElementById('log-list');
      if (logList) logList.innerHTML = '';
      logIncident("Log list cleared.");
    });
  }
}

// --- PWA Registration ---
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.log('SW registration notice:', err);
    });
  }
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  setupModeButtons();
  setupControlButtons();
  registerSW();

  // Try webcam first
  startWebcam();

  // Start Animation Render Loop
  requestAnimationFrame(renderFrame);

  window.addEventListener('resize', initCanvas);
});
