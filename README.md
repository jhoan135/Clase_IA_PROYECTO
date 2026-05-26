# Clase_IA_PROYECTO

Sistema web de diagnostico vehicular con Inteligencia Artificial. El proyecto predice el nivel de riesgo de falla de un vehiculo a partir de cuatro variables simples: kilometraje, meses sin mantenimiento, nivel de ruido del motor y estado de encendido.

## Problema o necesidad

El problema abordado es la falta de una herramienta sencilla para orientar a un usuario sobre el estado general de su vehiculo antes de que ocurra una falla grave. La solucion usa IA para convertir datos basicos del vehiculo en una prediccion de riesgo y una recomendacion clara para el usuario.

## Tecnologias utilizadas

- Backend: Python, Flask, Flask-CORS.
- Machine Learning: NumPy, scikit-learn, StandardScaler y LogisticRegression.
- Frontend: React 18, Axios, HTML y CSS.
- Herramientas: Node.js, npm, Git y scripts de PowerShell para ejecucion local.

## Dataset

El dataset se construye de forma sintetica dentro de `backend/app.py`. Se generan 200 entradas con semilla fija (`np.random.seed(42)`) para que el entrenamiento sea reproducible.

Cada entrada contiene:

- `km`: kilometraje entre 10.000 y 150.000 km.
- `meses`: meses sin mantenimiento entre 0 y 23.
- `ruido`: nivel de ruido de 1 a 3.
- `encendido`: estado de encendido de 1 a 3.

Las etiquetas se generan con reglas de riesgo:

- Clase 0, riesgo bajo: vehiculo en buen estado.
- Clase 1, riesgo medio: desgaste o senales moderadas.
- Clase 2, riesgo alto: falla critica, ruido fuerte, falla de encendido o mucho tiempo sin mantenimiento.

Cantidad de entradas usadas: 200 registros. El sistema divide los datos en 70% entrenamiento y 30% prueba, es decir, 140 entradas para entrenar y 60 para validar.

## Modelo de Machine Learning

El modelo principal es Regresion Logistica multiclase (`LogisticRegression`) con normalizacion previa mediante `StandardScaler`.

Se eligio este modelo porque:

- Es adecuado para clasificacion en categorias.
- Es rapido de entrenar y facil de explicar.
- Funciona bien con pocas variables numericas.
- Permite obtener probabilidades por clase, no solo una etiqueta final.
- Es suficiente para un prototipo academico donde el objetivo es transformar datos de entrada en reglas de decision comprensibles.

## Metricas y efectividad

El proyecto incluye el script `backend/evaluate_model.py` para reproducir la evaluacion del modelo con el mismo dataset y la misma division entrenamiento/prueba.

Para ejecutar la evaluacion:

```powershell
cd backend
pip install -r requirements.txt
python evaluate_model.py
```

Las metricas reportadas por el script son:

- Exactitud general (`accuracy`).
- Precision, recall y F1-score por clase.
- Matriz de confusion.

Modelo evaluado: Regresion Logistica. Como el dataset fue generado con reglas deterministicas, la efectividad esperada es alta en los datos de prueba. La validacion sirve para revisar que el modelo replique correctamente las tres categorias de riesgo: bajo, medio y alto.

## Predicciones generadas

El endpoint `POST /api/predict` recibe datos del vehiculo y retorna:

- `prediccion`: clase numerica 0, 1 o 2.
- `estado`: descripcion del resultado.
- `nivel`: bajo, medio o alto.
- `mensaje`: explicacion breve.
- `recomendacion`: accion sugerida.
- `probabilidades`: probabilidad estimada para cada nivel.
- `datos_ingresados`: datos usados en la prediccion.

Ejemplo de salida:

```json
{
  "exito": true,
  "prediccion": 2,
  "estado": "ALTO RIESGO DE FALLA",
  "nivel": "Alto",
  "mensaje": "El vehiculo presenta fallas criticas.",
  "recomendacion": "Se recomienda llevar el vehiculo a un taller inmediatamente.",
  "probabilidades": {
    "bajo": 0.05,
    "medio": 0.18,
    "alto": 0.77
  }
}
```

## Uso de las predicciones en la solucion

Las predicciones se usan para construir una experiencia directa para el usuario:

- Si el riesgo es bajo, la interfaz muestra un estado positivo y recomienda mantenimiento preventivo.
- Si el riesgo es medio, muestra advertencia y recomienda revision general.
- Si el riesgo es alto, muestra alerta critica y recomienda asistir a un taller.

Ademas, los colores del resultado cambian segun la clase predicha: verde para bajo, amarillo para medio y rojo para alto. Las probabilidades se muestran en la interfaz para que el usuario entienda el nivel de confianza del sistema.

## Reglas y comportamientos generados

La prediccion activa nuevas reglas dentro del sistema:

- Se selecciona automaticamente el mensaje correspondiente al nivel de riesgo.
- Se genera una recomendacion personalizada.
- Se actualiza visualmente la tarjeta de resultado.
- Se muestran probabilidades por categoria.
- Si el backend no esta activo, el frontend usa una funcion local en `frontend/src/utils/localPrediction.js` para mantener la experiencia disponible.

## Web, frontend y backend

La solucion fue llevada a la web con una arquitectura separada:

- Backend Flask: entrena el modelo al iniciar el servidor y expone una API REST.
- Frontend React: muestra la interfaz, captura los datos del usuario y consume la API con Axios.

Endpoints principales:

- `GET /api/health`: verifica que el backend este funcionando.
- `GET /api/info`: devuelve informacion general del sistema.
- `POST /api/predict`: genera la prediccion.

El frontend contiene una pagina inicial, un formulario de diagnostico, tarjetas de resultado, seccion de probabilidades, parametros analizados e informacion del sistema.

## Como ejecutar el proyecto

Backend:

```powershell
cd backend
pip install -r requirements.txt
python app.py
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
- API de prediccion: `http://localhost:5000/api/predict`

Tambien se pueden usar los scripts en la carpeta `scripts/` para iniciar el proyecto en Windows.

## Objetivo de la interfaz final

El objetivo de la interfaz es que cualquier usuario pueda ingresar datos basicos de su vehiculo y recibir una orientacion rapida sobre el riesgo de falla. La aplicacion no reemplaza un diagnostico mecanico profesional, pero ayuda a priorizar revisiones, prevenir danos mayores y tomar decisiones de mantenimiento con mayor claridad.

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
