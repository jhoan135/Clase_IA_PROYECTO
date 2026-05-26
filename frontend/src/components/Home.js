import React from 'react';

function Home({ onStart }) {
  const contextOptions = [
    {
      label: 'Qué analiza',
      title: 'Datos principales',
      text: 'Kilometraje, meses sin mantenimiento, ruido del motor y estado de encendido.'
    },
    {
      label: 'Resultados',
      title: 'Tres niveles de riesgo',
      text: 'El sistema clasifica el vehículo en riesgo bajo, medio o alto.'
    },
    {
      label: 'Recomendación',
      title: 'Acción sugerida',
      text: 'Según el resultado, indica si conviene mantenimiento, revisión o taller.'
    },
    {
      label: 'Objetivo',
      title: 'Decisión rápida',
      text: 'Ayuda a interpretar síntomas básicos antes de una revisión mecánica.'
    }
  ];

  const examples = [
    { value: 'Bajo', detail: 'Mantenimiento preventivo' },
    { value: 'Medio', detail: 'Revisión general' },
    { value: 'Alto', detail: 'Atención inmediata' }
  ];

  return (
    <section className="home">
      <div className="home-content">
        <div className="home-copy">
          <span className="home-kicker">Diagnóstico inteligente</span>
          <h1>Diagnóstico Vehicular</h1>
          <p>
            Evalúa el estado general de un vehículo con datos simples y recibe
            una estimación clara del nivel de riesgo junto con una recomendación.
          </p>
          <button type="button" className="home-button" onClick={onStart}>
            Ir al formulario
          </button>

          <div className="home-context-grid" aria-label="Contexto del sistema">
            {contextOptions.map((option) => (
              <article className="home-context-card" key={option.title}>
                <span>{option.label}</span>
                <h3>{option.title}</h3>
                <p>{option.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="home-guide">
          <div className="guide-header">
            <span>Cómo usarlo</span>
            <strong>4 pasos</strong>
          </div>

          <div className="home-steps">
            <div className="home-step">
              <span>01</span>
              <div>
                <h3>Kilometraje</h3>
                <p>Escribe cuántos kilómetros ha recorrido el vehículo.</p>
              </div>
            </div>
            <div className="home-step">
              <span>02</span>
              <div>
                <h3>Mantenimiento</h3>
                <p>Indica cuántos meses han pasado desde el último servicio.</p>
              </div>
            </div>
            <div className="home-step">
              <span>03</span>
              <div>
                <h3>Síntomas</h3>
                <p>Selecciona el nivel de ruido y el estado de encendido.</p>
              </div>
            </div>
            <div className="home-step">
              <span>04</span>
              <div>
                <h3>Resultado</h3>
                <p>Analiza los datos y revisa el diagnóstico recomendado.</p>
              </div>
            </div>
          </div>

          <div className="home-risk-summary">
            <span className="summary-title">Resultados posibles</span>
            {examples.map((example) => (
              <div className="summary-row" key={example.value}>
                <strong>{example.value}</strong>
                <span>{example.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
