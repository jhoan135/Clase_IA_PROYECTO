from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Inicializar Flask
app = Flask(__name__)
CORS(app)

# ENTRENAMIENTO DEL MODELO

# Generar datos de entrenamiento
np.random.seed(42)
n_samples = 200

km = np.random.randint(10000, 150000, n_samples)
meses = np.random.randint(0, 24, n_samples)
ruido = np.random.randint(1, 4, n_samples)
encendido = np.random.randint(1, 4, n_samples)

X = np.column_stack([km, meses, ruido, encendido])

# Generar etiquetas según la lógica
y = []
for dato in X:
    km_val, meses_val, ruido_val, encendido_val = dato

    if (ruido_val == 3) or (encendido_val == 3) or (meses_val > 8):
        y.append(2)
    elif (km_val > 30000 and meses_val > 4) or (ruido_val == 2) or (encendido_val == 2):
        y.append(1)
    else:
        y.append(0)

y = np.array(y)

# Dividir datos
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

# Normalizar
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)

# Entrenar modelo
modelo = LogisticRegression(max_iter=1000)
modelo.fit(X_train_scaled, y_train)

# RESULTADOS

RESULTADOS = {
    0: {
        "estado": "VEHÍCULO EN BUEN ESTADO",
        "mensaje": "El vehículo no presenta fallas importantes.",
        "recomendacion": "Se recomienda realizar mantenimientos preventivos, según el manual del fabricante.",
        "color": "#4CAF50",
        "nivel": "Bajo"
    },
    1: {
        "estado": "RIESGO MEDIO",
        "mensaje": "El vehículo presenta desgaste.",
        "recomendacion": "Se recomienda realizar una revisión general para evitar daños mayores.",
        "color": "#FFC107",
        "nivel": "Medio"
    },
    2: {
        "estado": "ALTO RIESGO DE FALLA",
        "mensaje": "El vehículo presenta fallas críticas.",
        "recomendacion": "Se recomienda llevar el vehículo a un taller inmediatamente.",
        "color": "#F44336",
        "nivel": "Alto"
    }
}

# RUTAS

@app.route('/')
def index():
    """Servir la página principal desde el frontend."""
    return send_from_directory('../frontend', 'index.html')


@app.route('/api/predict', methods=['POST'])
def predict():
    """
    API Endpoint para hacer predicciones.
    Recibe: {km, meses, ruido, encendido}
    Retorna: predicción y análisis.
    """
    from flask import request

    try:
        data = request.json

        # Validar datos
        if not all(key in data for key in ['km', 'meses', 'ruido', 'encendido']):
            return jsonify({'error': 'Faltan parámetros requeridos'}), 400

        km = float(data['km'])
        meses = float(data['meses'])
        ruido = float(data['ruido'])
        encendido = float(data['encendido'])

        # Validar rangos
        if not (0 <= km <= 500000 and 0 <= meses <= 60 and 1 <= ruido <= 3 and 1 <= encendido <= 3):
            return jsonify({'error': 'Valores fuera de rango'}), 400

        # Preparar datos
        nuevo = np.array([[km, meses, ruido, encendido]])
        nuevo_scaled = scaler.transform(nuevo)

        # Predicción
        pred = int(modelo.predict(nuevo_scaled)[0])
        probabilidades = modelo.predict_proba(nuevo_scaled)[0]

        resultado = RESULTADOS[pred]

        return jsonify({
            'exito': True,
            'prediccion': pred,
            'estado': resultado['estado'],
            'mensaje': resultado['mensaje'],
            'recomendacion': resultado['recomendacion'],
            'color': resultado['color'],
            'nivel': resultado['nivel'],
            'probabilidades': {
                'bajo': float(probabilidades[0]),
                'medio': float(probabilidades[1]),
                'alto': float(probabilidades[2])
            },
            'datos_ingresados': {
                'km': km,
                'meses': meses,
                'ruido': int(ruido),
                'encendido': int(encendido)
            }
        })

    except ValueError:
        return jsonify({'error': 'Tipos de datos inválidos'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'ok', 'mensaje': 'Backend funcionando correctamente'})


@app.route('/api/info', methods=['GET'])
def info():
    """Obtener información del sistema."""
    return jsonify({
        'nombre': 'Diagnóstico Vehicular',
        'autor': 'Jhoan Zamudio',
        'descripcion': 'Utiliza Machine Learning para predecir el riesgo de falla en vehículos',
        'modelo': 'Regresión Logística',
        'caracteristicas': ['Kilometraje', 'Meses sin mantenimiento', 'Nivel de ruido', 'Estado de encendido']
    })


# MANEJO DE ERRORES

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Recurso no encontrado'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Error interno del servidor'}), 500


# MAIN

if __name__ == '__main__':
    print("=" * 60)
    print("DIAGNÓSTICO VEHICULAR")
    print("=" * 60)
    print("\nBackend iniciado correctamente")
    print("Servidor: http://localhost:5000")
    print("API: http://localhost:5000/api/predict")
    print("\nhttp://localhost:5000")
    print("=" * 60 + "\n")

    app.run(debug=True, port=5000, host='0.0.0.0')
