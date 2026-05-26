# Script PowerShell para ejecutar el Frontend

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "FRONTEND - DIAGNOSTICO VEHICULAR" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Ir a la carpeta frontend
$projectRoot = Split-Path -Parent $PSScriptRoot
$frontendPath = Join-Path $projectRoot "frontend"
Set-Location $frontendPath

Write-Host "[1/3] Verificando Node.js..." -ForegroundColor Yellow
node --version >$null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[✗] Node.js no está instalado" -ForegroundColor Red
    Write-Host "    Descarga desde: https://nodejs.org/" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "[2/3] Instalando dependencias..." -ForegroundColor Yellow
npm.cmd install

Write-Host ""
Write-Host "✅ Iniciando frontend..." -ForegroundColor Green
Write-Host "📍 http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

npm.cmd start
