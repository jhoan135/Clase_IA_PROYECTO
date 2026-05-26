const RESULTS = {
  0: {
    estado: 'VEHÍCULO EN BUEN ESTADO',
    mensaje: 'El vehículo no presenta fallas importantes.',
    recomendacion: 'Se recomienda realizar mantenimientos preventivos según el manual del fabricante.',
    color: '#4CAF50',
    nivel: 'Bajo'
  },
  1: {
    estado: 'RIESGO MEDIO',
    mensaje: 'El vehículo presenta desgaste.',
    recomendacion: 'Se recomienda realizar una revisión general para evitar daños mayores.',
    color: '#FFC107',
    nivel: 'Medio'
  },
  2: {
    estado: 'ALTO RIESGO DE FALLA',
    mensaje: 'El vehículo presenta fallas críticas.',
    recomendacion: 'Se recomienda llevar el vehículo a un taller inmediatamente.',
    color: '#F44336',
    nivel: 'Alto'
  }
};

const probabilityByPrediction = {
  0: { bajo: 0.82, medio: 0.14, alto: 0.04 },
  1: { bajo: 0.15, medio: 0.72, alto: 0.13 },
  2: { bajo: 0.05, medio: 0.18, alto: 0.77 }
};

export function predictVehicleRisk(data) {
  const km = Number(data.km);
  const meses = Number(data.meses);
  const ruido = Number(data.ruido);
  const encendido = Number(data.encendido);

  let prediction = 0;

  if (ruido === 3 || encendido === 3 || meses > 8) {
    prediction = 2;
  } else if ((km > 30000 && meses > 4) || ruido === 2 || encendido === 2) {
    prediction = 1;
  }

  const result = RESULTS[prediction];

  return {
    exito: true,
    prediccion: prediction,
    estado: result.estado,
    mensaje: result.mensaje,
    recomendacion: result.recomendacion,
    color: result.color,
    nivel: result.nivel,
    probabilidades: probabilityByPrediction[prediction],
    datos_ingresados: {
      km,
      meses,
      ruido,
      encendido
    },
    origen: 'frontend'
  };
}
