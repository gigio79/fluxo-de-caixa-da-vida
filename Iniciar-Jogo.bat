@echo off
setlocal
title CASHFLOW PT-BR - Link Online
set "FOLDER=C:\Users\familia gidelu\Documents\Fluxo de Caixa\Fluxo de Caixa Clássico _ Pai Rico_files"
set "PORT=8010"
set "TUN=%TEMP%\opencode\cloudflared.exe"

echo ============================================================
echo  CASHFLOW PT-BR - GERADOR DE LINK ONLINE
echo ============================================================

if not exist "%TUN%" (
  echo [1/3] Baixando cloudflared (primeira vez, ~52 MB)...
  powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe' -OutFile '%TUN%'"
  if not exist "%TUN%" ( echo ERRO: falha ao baixar o cloudflared. & pause & exit /b 1 )
)

echo [2/3] Iniciando servidor local na porta %PORT%...
start "Servidor CASHFLOW" /min python -m http.server %PORT% --directory "%FOLDER%"
timeout /t 2 /nobreak >nul

echo [3/3] Criando link publico...
echo  IMPORTANTE: depois que a caixa "Your quick Tunnel has been created"
echo              aparecer, AGUARDE MAIS 15 SEGUNDOS antes de abrir o link
echo              no navegador (o tunel "esquenta" nos primeiros instantes).
echo.
echo  LINK LOCAL (neste PC):  http://localhost:%PORT%/saved_resource(1).html?gh=SEU_NOME
echo.
echo  Quando aparecer a caixa "Your quick Tunnel has been created":

echo   1. Copie a URL  https://XXXX.trycloudflare.com
echo   2. Para jogar, use esta url + o caminho:
echo      https://XXXX.trycloudflare.com/saved_resource(1).html?gh=SEU_NOME
echo   3. Sua esposa usa o MESMO link (troque o nome no final se quiser).
echo.
echo  IMPORTANTE: nao feche esta janela enquanto quiser jogar.
echo.
"%TUN%" tunnel --no-autoupdate --url http://localhost:%PORT%
echo.
echo O tunel foi encerrado. Pressione qualquer tecla para fechar.
pause >nul
endlocal