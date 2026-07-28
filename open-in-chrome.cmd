@echo off
rem ============================================================
rem  台本などのファイル・URLを Chrome で開く
rem
rem  使い方:
rem    open-in-chrome.cmd youtube\2026-07-28-daihon-shoujiki-5fund-hikaku.md
rem    open-in-chrome.cmd                （引数なし＝youtube\ の最新ファイル）
rem
rem  既定のブラウザが Edge のままでも、これで開けば Chrome になります。
rem ============================================================
setlocal

rem --- Chrome の場所を探す ---
set "CHROME="
for %%P in (
  "%ProgramFiles%\Google\Chrome\Application\chrome.exe"
  "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
  "%LocalAppData%\Google\Chrome\Application\chrome.exe"
) do if exist %%P set "CHROME=%%~P"

if not defined CHROME (
  echo Chrome が見つかりませんでした。
  echo インストール先を確認するか、このファイルの探索パスを追記してください。
  pause
  exit /b 1
)

rem --- 開く対象を決める ---
set "TARGET=%~1"
if "%TARGET%"=="" (
  rem 引数なしのときは youtube フォルダの最新更新ファイル
  for /f "delims=" %%F in ('dir /b /o-d /a-d "%~dp0youtube\*.md" 2^>nul') do (
    set "TARGET=%~dp0youtube\%%F"
    goto :found
  )
  echo youtube フォルダに .md ファイルが見つかりませんでした。
  pause
  exit /b 1
)
:found

rem --- 相対パスなら絶対パスに直す ---
if exist "%TARGET%" for %%A in ("%TARGET%") do set "TARGET=%%~fA"

echo Chrome で開きます: %TARGET%
start "" "%CHROME%" "%TARGET%"
endlocal
