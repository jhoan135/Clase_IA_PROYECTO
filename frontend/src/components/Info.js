import React, { useState } from 'react';

function Info() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`info-section card ${expanded ? 'expanded' : 'collapsed'}`}>
      <button
        className="info-toggle"
        onClick={() => setExpanded(!expanded)}
      >
        <h3>Cómo funciona este sistema</h3>
        <span className="toggle-icon">{expanded ? '-' : '+'}</span>
      </button>

      {expanded && (
        <div className="info-content">
          <p>
            Este sistema utiliza Machine Learning en el backend cuando Flask está activo.
            Si el backend no está disponible, React calcula el resultado en modo local con
            la misma lógica base usada para clasificar el riesgo.
          </p>

          <h4>Niveles de riesgo</h4>
          <ul className="risk-levels">
            <li>
              <span className="risk-badge risk-low">BAJO</span>
              El vehículo está en buen estado y no presenta fallas importantes.
            </li>
            <li>
              <span className="risk-badge risk-medium">MEDIO</span>
              El vehículo presenta desgaste y necesita una revisión general.
            </li>
            <li>
              <span className="risk-badge risk-high">ALTO</span>
              El vehículo presenta fallas críticas y requiere atención inmediata.
            </li>
          </ul>

          <h4>Factores considerados</h4>
          <ul className="factors-list">
            <li>
              <strong>Kilometraje:</strong>
              Mayor cantidad de kilómetros recorridos indica más desgaste y uso.
            </li>
            <li>
              <strong>Mantenimiento:</strong>
              Más meses sin mantenimiento aumenta el riesgo de fallas.
            </li>
            <li>
              <strong>Ruido del motor:</strong>
              Ruidos fuertes indican problemas internos o desgaste de componentes.
            </li>
            <li>
              <strong>Estado de encendido:</strong>
              Dificultades al encender indican problemas eléctricos o en el motor.
            </li>
          </ul>

          <h4>Recomendaciones</h4>
          <ul className="recommendations">
            <li>
              <strong>Riesgo Bajo:</strong>
              Mantén un programa regular de mantenimiento preventivo según el manual del fabricante.
            </li>
            <li>
              <strong>Riesgo Medio:</strong>
              Programa una revisión general con un mecánico certificado.
            </li>
            <li>
              <strong>Riesgo Alto:</strong>
              Lleva el vehículo a un taller inmediatamente para una revisión completa.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Info;
