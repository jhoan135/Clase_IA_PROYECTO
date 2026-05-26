# Clase_IA_PROYECTO

Sistema web de diagnóstico vehicular con Inteligencia Artificial. El proyecto predice el nivel de riesgo de falla de un vehículo a partir de cuatro variables simples: kilometraje, meses sin mantenimiento, nivel de ruido del motor y estado de encendido.

## Problema o necesidad

El problema abordado es la falta de una herramienta sencilla para orientar a un usuario sobre el estado general de su vehículo antes de que ocurra una falla grave. La solución usa IA para convertir datos básicos del vehículo en una predicción de riesgo y una recomendación clara para el usuario.

## Tecnologías utilizadas

- Backend: Python, Flask, Flask-CORS.
- Machine Learning: NumPy, scikit-learn, StandardScaler y LogisticRegression.
- Frontend: React 18, Axios, HTML y CSS.
- Herramientas: Node.js, npm, Git y scripts de PowerShell para ejecución local.

## Dataset

El dataset se construye de forma sintética dentro de `backend/app.py`. Se generan 200 entradas con semilla fija (`np.random.seed(42)`) para que el entrenamiento sea reproducible.

Cada entrada contiene:

- `km`: kilometraje entre 10.000 y 150.000 km.
- `meses`: meses sin mantenimiento entre 0 y 23.
- `ruido`: nivel de ruido de 1 a 3.
- `encendido`: estado de encendido de 1 a 3.

Las etiquetas se generan con reglas de riesgo:

- Clase 0, riesgo bajo: vehículo en buen estado.
- Clase 1, riesgo medio: desgaste o señales moderadas.
- Clase 2, riesgo alto: falla crítica, ruido fuerte, falla de encendido o mucho tiempo sin mantenimiento.

Cantidad de entradas usadas: 200 registros. El sistema divide los datos en 70% entrenamiento y 30% prueba, es decir, 140 entradas para entrenar y 60 para validar.

## Modelo de Machine Learning

El modelo principal es Regresión Logística multiclase (`LogisticRegression`) con normalización previa mediante `StandardScaler`.

Se eligió este modelo porque:

- Es adecuado para clasificación en categorías.
- Es rápido de entrenar y fácil de explicar.
- Funciona bien con pocas variables numéricas.
- Permite obtener probabilidades por clase, no solo una etiqueta final.

## Métricas y efectividad

El proyecto incluye el script `backend/evaluate_model.py` para reproducir la evaluación del modelo con el mismo dataset y la misma división entrenamiento/prueba.

Para ejecutar la evaluación:

```powershell
cd backend
py -3.11 -m pip install -r requirements.txt
py -3.11 evaluate_model.py
```

Las métricas reportadas por el script son:

- Exactitud general (`accuracy`).
- Precisión, recall y F1-score por clase.
- Matriz de confusión.

Modelo evaluado: Regresión Logística. Como el dataset fue generado con reglas determinísticas, la efectividad esperada es alta en los datos de prueba. La validación sirve para revisar que el modelo replique correctamente las tres categorías de riesgo: bajo, medio y alto.

## Predicciones generadas

El endpoint `POST /api/predict` recibe datos del vehículo y retorna:

- `prediccion`: clase numérica 0, 1 o 2.
- `estado`: descripción del resultado.
- `nivel`: bajo, medio o alto.
- `mensaje`: explicación breve.
- `recomendacion`: acción sugerida.
- `probabilidades`: probabilidad estimada para cada nivel.
- `datos_ingresados`: datos usados en la predicción.

Ejemplo de salida:

```json
{
  "exito": true,
  "prediccion": 2,
  "estado": "ALTO RIESGO DE FALLA",
  "nivel": "Alto",
  "mensaje": "El vehículo presenta fallas críticas.",
  "recomendacion": "Se recomienda llevar el vehículo a un taller inmediatamente.",
  "probabilidades": {
    "bajo": 0.05,
    "medio": 0.18,
    "alto": 0.77
  }
}
```

## Uso de las predicciones en la solución

Las predicciones se usan para construir una experiencia directa para el usuario:

- Si el riesgo es bajo, la interfaz muestra un estado positivo y recomienda mantenimiento preventivo.
- Si el riesgo es medio, muestra advertencia y recomienda revisión general.
- Si el riesgo es alto, muestra alerta crítica y recomienda asistir a un taller.

Además, los colores del resultado cambian según la clase predicha: verde para bajo, amarillo para medio y rojo para alto. Las probabilidades se muestran en la interfaz para que el usuario entienda el nivel de confianza del sistema.

## Reglas y comportamientos generados

La predicción activa nuevas reglas dentro del sistema:

- Se selecciona automáticamente el mensaje correspondiente al nivel de riesgo.
- Se genera una recomendación personalizada.
- Se actualiza visualmente la tarjeta de resultado.
- Se muestran probabilidades por categoría.
- Si el backend no está activo, el frontend usa una función local en `frontend/src/utils/localPrediction.js` para mantener la experiencia disponible.

## Web, frontend y backend

La solución fue llevada a la web con una arquitectura separada:

- Backend Flask: entrena el modelo al iniciar el servidor y expone una API REST.
- Frontend React: muestra la interfaz, captura los datos del usuario y consume la API con Axios.

Endpoints principales:

- `GET /api/health`: verifica que el backend esté funcionando.
- `GET /api/info`: devuelve información general del sistema.
- `POST /api/predict`: genera la predicción.

El frontend contiene una página inicial, un formulario de diagnóstico, tarjetas de resultado, sección de probabilidades, parámetros analizados e información del sistema.

## Cómo ejecutar el proyecto

Backend:

```powershell
cd backend
py -3.11 -m pip install -r requirements.txt
py -3.11 app.py
```

Frontend:

```powershell
cd frontend
npm install
npm start
```

URLs locales:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- API de predicción: `http://localhost:5000/api/predict`

También se pueden usar los scripts en la carpeta `scripts/` para iniciar el proyecto en Windows.

## Objetivo de la interfaz final

El objetivo de la interfaz es que cualquier usuario pueda ingresar datos básicos de su vehículo y recibir una orientación rápida sobre el riesgo de falla. La aplicación no reemplaza un diagnóstico mecánico profesional, pero ayuda a priorizar revisiones, prevenir daños mayores y tomar decisiones de mantenimiento con mayor claridad.

## Estructura principal

```text
Clase_IA_PROYECTO/
  backend/
    app.py
    evaluate_model.py
    requirements.txt
  frontend/
    public/
    src/
    package.json
  docs/
  scripts/
  README.md
```
