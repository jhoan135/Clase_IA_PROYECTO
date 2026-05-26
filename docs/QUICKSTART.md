# ⚡ Guía Rápida de Inicio

Empieza en **4 pasos simples**:

## 1️⃣ Backend - Instalar dependencias

Abre PowerShell y ve a la carpeta backend:

```powershell
cd backend
pip install -r requirements.txt
```

**Esto toma ~2 minutos**

---

## 2️⃣ Backend - Ejecutar servidor

```powershell
python app.py
```

Verás algo como:
```
============================================================
DIAGNOSTICO VEHICULAR
============================================================

✅ Backend iniciado correctamente
📍 Servidor: http://localhost:5000
📊 API: http://localhost:5000/api/predict
============================================================
```

---

## 3️⃣ Frontend - Instalar dependencias

**En OTRA terminal** abre PowerShell:

```powershell
cd frontend
npm install
```

**Requiere Node.js instalado: https://nodejs.org/**

---

## 4️⃣ Frontend - Ejecutar aplicación

```powershell
npm start
```

✅ **¡Listo! Se abrirá automáticamente en http://localhost:3000**

---

## 🎮 Cómo usar

1. Ingresa los datos de tu vehículo
2. Ajusta los sliders si es necesario
3. Haz clic en **"🔍 Analizar vehículo"**
4. Ve los resultados con probabilidades

---

## 🚀 Script rápido (Windows)

Si prefieres una forma más rápida:

**Terminal 1 (Backend):**
```powershell
.\backend-start.ps1
```

**Terminal 2 (Frontend):**
```powershell
.\frontend-start.ps1
```

---

## 🛑 Para detener los servidores

Presiona `Ctrl+C` en ambas terminales.

---

## ❌ Problemas?

### Node.js no está instalado
Descarga desde: https://nodejs.org/

### pip no funciona
```powershell
python -m pip install -r requirements.txt
```

### Puerto en uso
```powershell
netstat -ano | findstr :5000  # Backend
netstat -ano | findstr :3000  # Frontend
```

### Más ayuda
Ver [README.md](README.md)

---

**¡Disfruta! 🚀**
