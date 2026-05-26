import React from 'react';

function Statistics({ result }) {
  const probs = result.probabilidades;

  return (
    <div className="stats-section card">
      <h3>Probabilidades predichas</h3>
      <div className="probability-grid">
        <div className="probability-item">
          <div className="prob-header">
            <span className="prob-label">Riesgo Bajo</span>
            <span className="prob-value">{(probs.bajo * 100).toFixed(1)}%</span>
          </div>
          <div className="prob-bar">
            <div
              className="prob-fill"
              style={{
                width: (probs.bajo * 100) + '%',
                backgroundColor: '#4CAF50'
              }}
            ></div>
          </div>
        </div>

        <div className="probability-item">
          <div className="prob-header">
            <span className="prob-label">Riesgo Medio</span>
            <span className="prob-value">{(probs.medio * 100).toFixed(1)}%</span>
          </div>
          <div className="prob-bar">
            <div
              className="prob-fill"
              style={{
                width: (probs.medio * 100) + '%',
                backgroundColor: '#FFC107'
              }}
            ></div>
          </div>
        </div>

        <div className="probability-item">
          <div className="prob-header">
            <span className="prob-label">Riesgo Alto</span>
            <span className="prob-value">{(probs.alto * 100).toFixed(1)}%</span>
          </div>
          <div className="prob-bar">
            <div
              className="prob-fill"
              style={{
                width: (probs.alto * 100) + '%',
                backgroundColor: '#F44336'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
