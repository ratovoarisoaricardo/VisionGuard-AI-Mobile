@echo off
cd /d "%~dp0"
if not exist ".git" (
    git init
    git remote add origin https://github.com/ratovoarisoaricardo/VisionGuard-AI-Mobile.git
    git branch -M main
)
git add .
git commit -m "VisionGuard AI update"
git push -u origin main
pause