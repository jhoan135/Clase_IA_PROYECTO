@echo off
REM Script para ejecutar el backend de forma fácil en Windows

echo.
echo ============================================================
echo           DIAGNOSTICO VEHICULAR
echo ============================================================
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python no está instalado o no está en el PATH
    echo Descarga Python desde: https://www.python.org/downloads/
    echo Asegúrate de marcar "Add Python to PATH" durante la instalación
    pause
    exit /b 1
)

REM Ir a la carpeta backend
cd /d "%~dp0..\backend"

REM Verificar si existe requirements.txt
if not exist "requirements.txt" (
    echo [ERROR] requirements.txt no encontrado
    echo Asegúrate de ejecutar este script desde la carpeta raíz del proyecto
    pause
    exit /b 1
)

REM Instalar dependencias
echo.
echo [1/3] Instalando dependencias...
echo.
pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Fallo al instalar dependencias
    pause
    exit /b 1
)

REM Ejecutar la aplicación
echo.
echo [2/3] Iniciando servidor...
echo.
python app.py

REM Si el script llega aquí, el usuario presionó Ctrl+C
echo.
echo [Servidor detenido]
echo.
pause
