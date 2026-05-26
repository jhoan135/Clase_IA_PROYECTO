import React from 'react';

function Form({ formData, onFormChange, onSubmit, loading }) {
  return (
    <>
      <h2>Ingresa los datos del vehículo</h2>
      <p className="section-subtitle">Completa los siguientes campos para analizar el estado de tu vehículo.</p>

      <form onSubmit={onSubmit} className="vehicle-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="km">
              <span className="label-icon">KM</span>
              Kilometraje del vehículo
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id="km"
                name="km"
                min="0"
                max="500000"
                value={formData.km}
                onChange={onFormChange}
                step="1000"
                required
                placeholder="Ej: 50000"
              />
              <span className="input-unit">km</span>
            </div>
            <small className="help-text">Kilómetros recorridos por el vehículo.</small>
          </div>

          <div className="form-group">
            <label htmlFor="meses">
              <span className="label-icon">T</span>
              Meses sin mantenimiento
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id="meses"
                name="meses"
                min="0"
                max="60"
                value={formData.meses}
                onChange={onFormChange}
                step="1"
                required
                placeholder="Ej: 6"
              />
              <span className="input-unit">meses</span>
            </div>
            <small className="help-text">Tiempo transcurrido desde el último mantenimiento.</small>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="ruido">
              <span className="label-icon">R</span>
              Nivel de ruido del motor
              <span className="slider-value">{formData.ruido}</span>
            </label>
            <input
              type="range"
              id="ruido"
              name="ruido"
              min="1"
              max="3"
              value={formData.ruido}
              onChange={onFormChange}
              className="slider"
            />
            <div className="slider-labels">
              <span>Normal</span>
              <span>Leve</span>
              <span>Fuerte</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="encendido">
              <span className="label-icon">E</span>
              Estado de encendido
              <span className="slider-value">{formData.encendido}</span>
            </label>
            <input
              type="range"
              id="encendido"
              name="encendido"
              min="1"
              max="3"
              value={formData.encendido}
              onChange={onFormChange}
              className="slider"
            />
            <div className="slider-labels">
              <span>Normal</span>
              <span>Dificultad</span>
              <span>Falla</span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary btn-large" disabled={loading}>
          {loading ? 'Analizando...' : 'Analizar vehículo'}
        </button>
      </form>
    </>
  );
}

export default Form;
