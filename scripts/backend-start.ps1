# Script PowerShell para ejecutar el Backend

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "BACKEND - DIAGNOSTICO VEHICULAR" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Ir a la carpeta backend
$projectRoot = Split-Path -Parent $PSScriptRoot
$backendPath = Join-Path $projectRoot "backend"
Set-Location $backendPath

# Instalar dependencias si no existen
if (-not (Test-Path "venv")) {
    Write-Host "[1/3] Creando ambiente virtual..." -ForegroundColor Yellow
    python -m venv venv
}

Write-Host "[2/3] Activando ambiente virtual..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"

Write-Host "[3/3] Instalando dependencias..." -ForegroundColor Yellow
pip install -r requirements.txt -q

Write-Host ""
Write-Host "✅ Iniciando backend..." -ForegroundColor Green
Write-Host "📍 http://localhost:5000" -ForegroundColor Cyan
Write-Host ""

python app.py
