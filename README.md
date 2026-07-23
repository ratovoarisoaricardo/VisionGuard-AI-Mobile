# VisionGuard AI Mobile 📱👁️

<div align="center">
  <h3>Mobile Computer Vision, Driver Safety & Perimeter Surveillance</h3>
  <p><em>Vision par Ordinateur Mobile, Sécurité du Conducteur & Surveillance</em></p>

  <br />
  
  <!-- Demonstration Banner -->
  <div style="border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 10px; background: rgba(0,0,0,0.5);">
    <img src="preview.gif" alt="VisionGuard AI Mobile Demonstration" width="700" style="border-radius: 8px;"/>
    <p><sub>🎬 <b>Demonstration / Aperçu Visuel :</b> Remplacez <code>preview.gif</code> par la vraie démo animée du projet.</sub></p>
  </div>

  <br />
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=white) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) ![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
</div>

---

<details open>
  <summary><b>📌 Table of Contents / Table des matières</b></summary>
  <ul>
    <li><a href="#-english">🇬🇧 English</a></li>
    <ul>
      <li><a href="#-about-the-project">About the Project</a></li>
      <li><a href="#-architecture--data-flow">Architecture & Data Flow</a></li>
      <li><a href="#-key-features">Key Features</a></li>
      <li><a href="#-getting-started">Getting Started</a></li>
    </ul>
    <li><a href="#-français">🇫🇷 Français</a></li>
    <ul>
      <li><a href="#-à-propos-du-projet">À propos du projet</a></li>
      <li><a href="#-architecture--flux-de-données">Architecture & Flux de données</a></li>
      <li><a href="#-fonctionnalités-clés">Fonctionnalités clés</a></li>
      <li><a href="#-démarrage-rapide">Démarrage rapide</a></li>
    </ul>
    <li><a href="#-license--licence">📜 License / Licence</a></li>
  </ul>
</details>

---

## 🇬🇧 English

### 📖 About the Project
VisionGuard AI Mobile is a real-time mobile computer vision and surveillance application featuring camera stream ingestion, driver drowsiness detection, object tracking, acoustic/haptic hazard alerts, and PWA mobile installation.

### 🏗️ Architecture & Data Flow
```mermaid
graph TD
    A[📱 Mobile Camera / Stream] --> B[🎞️ HTML5 Canvas / Video Preprocessor]
    B --> C[🧠 YOLOv8 AI Computer Vision Engine]
    C --> D{🎯 Active Surveillance Mode}
    D -->|🚗 Driver Guard| E[😴 Eye Closure & Fatigue Alarm System]
    D -->|🚦 Traffic Monitor| F[🏎️ Vehicle & Pedestrian Tracker]
    D -->|🛡️ Perimeter Guard| G[🚨 Intruder Alert & Snapshot Logger]
```

### ✨ Key Features
- 🚗 **Driver Drowsiness Guard**: Real-time eye tracking with acoustic and vibration alarms
- 🚦 **Traffic & Pedestrian Monitor**: 60 FPS object tracking and speed analytics
- 🛡️ **Perimeter Intrusion Detector**: Motion scanner with instant snapshot export
- 📱 **Installable PWA**: Standalone fullscreen mobile experience on iOS & Android

### 💻 Getting Started
To run this project locally:
```bash
start_visionguard.bat
```

---

## 🇫🇷 Français

### 📖 À propos du projet
VisionGuard AI Mobile est une application mobile de vision par ordinateur et de surveillance en temps réel proposant le suivi par caméra, la détection de somnolence du conducteur, le suivi d'objets, des alertes sonores/haptiques et le support PWA.

### 🏗️ Architecture & Flux de données
```mermaid
graph TD
    A[📱 Caméra Mobile / Flux] --> B[🎞️ Preprocesseur Canvas HTML5]
    B --> C[🧠 Moteur IA YOLOv8 Vision]
    C --> D{🎯 Mode de Surveillance Actif}
    D -->|🚗 Driver Guard| E[😴 Système d'Alarme de Somnolence & Yeux]
    D -->|🚦 Traffic Monitor| F[🏎️ Suivi de Véhicules & Piétons]
    D -->|🛡️ Perimeter Guard| G[🚨 Alerte d'Intrusion & Journal Photos]
```

### ✨ Fonctionnalités clés
- 🚗 **Anti-Somnolence Conducteur**: Suivi du regard en direct avec alarme sonore et vibration
- 🚦 **Surveillance du Trafic**: Suivi d'objets et véhicules à 60 images par seconde
- 🛡️ **Protection de Périmètre**: Détection d'intrusions avec capture d'écran horodatée
- 📱 **PWA Installable**: Expérience d'application autonome plein écran sur iOS et Android

### 💻 Démarrage rapide
Pour démarrer ce projet localement :
```bash
start_visionguard.bat
```

---

## 📜 License / Licence
Distributed under the MIT License. Copyright © 2026 **Ricardo Ratovoarisoa**. All rights reserved.

---
<div align="center">
  <sub>Built with ❤️ by <b>Ricardo Ratovoarisoa</b> | AI & Full-Stack Developer</sub>
</div>
