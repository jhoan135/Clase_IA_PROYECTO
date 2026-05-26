# Script PowerShell para ejecutar el backend

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "DIAGNOSTICO VEHICULAR" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Python está instalado
try {
    $pythonVersion = python --version 2>&1
    Write-Host "[✓] Python encontrado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "[✗] Python no está instalado o no está en el PATH" -ForegroundColor Red
    Write-Host "    Descarga desde: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "    Marca 'Add Python to PATH' durante la instalación" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Ir a la carpeta backend
$projectRoot = Split-Path -Parent $PSScriptRoot
$backendPath = Join-Path $projectRoot "backend"
if (-not (Test-Path $backendPath)) {
    Write-Host "[✗] No se encontró la carpeta backend" -ForegroundColor Red
    Write-Host "    Asegúrate de ejecutar desde la carpeta correcta" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

Set-Location $backendPath

# Verificar si existe requirements.txt
if (-not (Test-Path "requirements.txt")) {
    Write-Host "[✗] requirements.txt no encontrado" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Instalar dependencias
Write-Host ""
Write-Host "[1/3] Instalando dependencias..." -ForegroundColor Yellow
Write-Host ""

pip install -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[✗] Fallo al instalar dependencias" -ForegroundColor Red
    Write-Host ""
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Ejecutar la aplicación
Write-Host ""
Write-Host "[2/3] Iniciando servidor..." -ForegroundColor Yellow
Write-Host ""

python app.py

Write-Host ""
Write-Host "[✓] Servidor detenido" -ForegroundColor Green
Write-Host ""
Read-Host "Presiona Enter para salir"
