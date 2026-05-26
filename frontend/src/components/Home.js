import React from 'react';

function Home({ onStart }) {
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
        </div>
      </div>
    </section>
  );
}

export default Home;
