@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM ============================================
REM  寻亲桥 一键部署脚本（带版本存档）
REM  构建 -> 记录版本 -> 提交 -> 打标签 -> 推送
REM  每次部署都生成一个永不覆盖的版本 vN
REM ============================================

cd /d "%~dp0"

REM ---- 取本次提交说明 ----
set "msg=%~1"
if "%msg%"=="" set "msg=更新网站内容"

echo.
echo [1/5] 正在构建项目 (npm run build)...
echo --------------------------------------------
call npm run build
if errorlevel 1 (
    echo.
    echo [错误] 构建失败，已中止。请检查上面的报错信息。
    pause
    exit /b 1
)

REM ---- 计算下一个版本号 ----
set "lastver="
for /f "delims=" %%t in ('git tag -l "v*" --sort=-v:refname') do (
    if not defined lastver set "lastver=%%t"
)
if "%lastver%"=="" (
    set "num=1"
) else (
    set "num=%lastver:v=%"
    set /a num=!num!+1
)
set "ver=v!num!"

REM ---- 取当前时间 ----
for /f "tokens=1-3 delims=/.- " %%a in ("%date%") do set "d=%%a-%%b-%%c"
for /f "tokens=1-2 delims=:." %%a in ("%time: =0%") do set "t=%%a:%%b"

echo.
echo [2/5] 记录版本 !ver! 到 VERSIONS.md...
echo --------------------------------------------
if not exist VERSIONS.md (
    echo # 版本历史>> VERSIONS.md
    echo.>> VERSIONS.md
)
echo - **!ver!**  ^| %d% %t%  ^| !msg!>> VERSIONS.md
echo 已记录: !ver! ^| !msg!

echo.
echo [3/5] 添加改动到 Git...
echo --------------------------------------------
git add -A

echo.
echo [4/5] 提交并打版本标签 !ver!...
echo --------------------------------------------
git commit -m "!msg! (!ver!)"
git tag -a "!ver!" -m "!msg!"

echo.
echo [5/5] 推送到 GitHub（含版本标签）...
echo --------------------------------------------
set "HTTP_PROXY="
set "HTTPS_PROXY="
git push origin main --follow-tags
if errorlevel 1 (
    echo.
    echo [错误] 推送失败。若使用代理（Clash/FlClash），请先开启代理再重试。
    pause
    exit /b 1
)

echo.
echo ============================================
echo  完成！已发布版本 !ver!
echo  GitHub Pages 将在 1-2 分钟内自动更新。
echo  网站: https://krillor.github.io/xqq-home/
echo  所有版本: https://github.com/krillor/xqq-home/tags
echo ============================================
echo.
pause
