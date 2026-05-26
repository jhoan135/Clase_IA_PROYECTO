import React from 'react';

function Parameters({ result }) {
  const ruidos = ['', 'Normal', 'Leve', 'Fuerte'];
  const encendidos = ['', 'Normal', 'Dificultad', 'Falla'];
  const datos = result.datos_ingresados;

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="params-section card">
      <h3>Parámetros analizados</h3>
      <div className="params-grid">
        <div className="param-item">
          <span className="param-label">Kilometraje</span>
          <span className="param-value">{formatNumber(datos.km)} km</span>
        </div>
        <div className="param-item">
          <span className="param-label">Meses sin mantenimiento</span>
          <span className="param-value">{datos.meses} meses</span>
        </div>
        <div className="param-item">
          <span className="param-label">Nivel de ruido</span>
          <span className="param-value">{ruidos[datos.ruido]}</span>
        </div>
        <div className="param-item">
          <span className="param-label">Estado de encendido</span>
          <span className="param-value">{encendidos[datos.encendido]}</span>
        </div>
      </div>
    </div>
  );
}

export default Parameters;
