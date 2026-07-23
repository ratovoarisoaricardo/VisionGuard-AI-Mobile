@echo off
cd /d C:\Users\ABCD\OneDrive\Documents\AI\visionguard-ai
if not exist ".git" (
    git init
)
git remote remove origin >nul 2>&1
git remote add origin https://github.com/ratovoarisoaricardo/VisionGuard-AI-Mobile.git
git branch -M main
git add .
git commit -m "Initial commit: Mobile VisionGuard AI PWA App"
git push -u origin main
pause
