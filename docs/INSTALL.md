# 🚀 Guía de instalación y ejecución

Tu código de Colab ha sido convertido a dos aplicaciones web completas. Elige la que prefieras.

---

## ⚡ OPCIÓN 1: STREAMLIT (Recomendada - MÁS FÁCIL Y RÁPIDA)

### Paso 1: Abre la terminal en tu carpeta del proyecto

**Windows:**
```bash
cd c:\Users\Jhoan\Desktop\colab
```

### Paso 2: Instala las dependencias

```bash
pip install -r requirements.txt
```

*Espera a que termine la instalación (puede tomar 1-2 minutos)*

### Paso 3: Ejecuta la aplicación

```bash
streamlit run vehicle_risk_predictor.py
```

✅ **¡Listo!** Se abrirá automáticamente en tu navegador en `http://localhost:8501`

---

## 🔧 OPCIÓN 2: FLASK (Control total, UI personalizable)

### Paso 1: Abre la terminal en tu carpeta del proyecto

```bash
cd c:\Users\Jhoan\Desktop\colab
```

### Paso 2: Instala las dependencias

```bash
pip install -r requirements_flask.txt
```

### Paso 3: Ejecuta la aplicación

```bash
python app_flask.py
```

✅ Se abrirá en `http://localhost:5000`

---

## 📁 Estructura de archivos creada

```
colab/
│
├── vehicle_risk_predictor.py    ← App Streamlit (RECOMENDADA)
├── app_flask.py                 ← App Flask alternativa
│
├── templates/
│   └── index.html              ← Interfaz HTML para Flask
│
├── static/
│   ├── style.css               ← Estilos CSS
│   └── script.js               ← Lógica JavaScript
│
├── requirements.txt            ← Dependencias Streamlit
├── requirements_flask.txt      ← Dependencias Flask
│
└── README.md / INSTALL.md      ← Este archivo
```

---

## 🎯 ¿Cuál elegir?

| Aspecto | Streamlit | Flask |
|--------|-----------|-------|
| **Facilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Velocidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Personalización** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Tiempo de setup** | 1 min | 1 min |
| **Ideal para** | Prototipado rápido | Producción |

**Mi recomendación:** Usa **Streamlit** si quieres algo funcionando ahora mismo. Usa **Flask** si quieres más control sobre el diseño.

---

## ❓ Problemas comunes

### "pip no se reconoce"
Asegúrate de que Python está en tu PATH. Reinstala Python y marca "Add Python to PATH" durante la instalación.

### "Port 8501 already in use" (Streamlit)
La aplicación anterior sigue corriendo. Presiona `Ctrl+C` en la terminal para detenerla.

### "Port 5000 already in use" (Flask)
Igual que arriba, presiona `Ctrl+C` para detener la aplicación anterior.

### "No module named 'streamlit'"
La instalación falló. Intenta:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 🌐 Próximos pasos: Desplegar en línea

### Para Streamlit (Gratis y muy fácil):

1. Sube tu proyecto a GitHub
2. Crea una cuenta en https://streamlit.io/cloud
3. Conecta tu repositorio
4. ¡Tu app estará online en minutos!

### Para Flask:
Usa Heroku, Railway, Render, o Google Cloud.

---

## 🔐 Conectar con Google Sheets (Opcional)

Si quieres traer datos reales de tu Google Sheet, abre `vehicle_risk_predictor.py` y descomenta:

```python
# import gspread
# from google.colab import auth
# 
# auth.authenticate_user()
# ...
```

Luego reemplaza la función `cargar_datos()` con tu lógica de Google Sheets.

---

## 💾 Cambiar la URL de Google Sheets

En `vehicle_risk_predictor.py`, busca la sección comentada y reemplaza:
```python
sh = gc.open_by_url("TU_URL_AQUI")
```

---

## 📞 ¿Necesitas ayuda?

Si algo no funciona:
1. Asegúrate de estar en la carpeta correcta (`cd c:\Users\Jhoan\Desktop\colab`)
2. Copia el error completo de la terminal
3. Intenta instalar las dependencias de nuevo

---

**¡Disfruta tu nueva aplicación web! 🎉**
