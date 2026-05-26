import React from 'react';

function ResultCard({ result }) {
  return (
    <div className="result-card card" style={{ borderLeftColor: result.color }}>
      <h2 style={{ color: result.color }}>
        {result.estado}
      </h2>
      <p>{result.mensaje}</p>
      <div className="separator" style={{ borderColor: result.color }}></div>
      <b style={{ color: result.color }}>Recomendación:</b>
      <p>{result.recomendacion}</p>
      {result.origen === 'frontend' && (
        <small className="help-text">Resultado calculado en modo local porque el backend no está activo.</small>
      )}
    </div>
  );
}

export default ResultCard;
