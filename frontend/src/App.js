import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Form from './components/Form';
import ResultCard from './components/ResultCard';
import Statistics from './components/Statistics';
import Parameters from './components/Parameters';
import Info from './components/Info';
import Footer from './components/Footer';
import { predictVehicleRisk } from './utils/localPrediction';

function App() {
  const [page, setPage] = useState('home');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  const [formData, setFormData] = useState({
    km: 50000,
    meses: 6,
    ruido: 1,
    encendido: 1
  });

  useEffect(() => {
    checkServerConnection();
    const interval = setInterval(checkServerConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkServerConnection = async () => {
    try {
      await axios.get('/api/health');
      setServerStatus('connected');
    } catch (error) {
      setServerStatus('error');
    }
  };

  const showResult = (data) => {
    setResult(data);
    setTimeout(() => {
      document.querySelector('.result-card')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 180);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/predict', formData);
      if (response.data.exito) {
        showResult(response.data);
      }
    } catch (error) {
      setServerStatus('error');
      showResult(predictVehicleRisk(formData));
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'km' || name === 'meses' ? parseFloat(value) : parseInt(value)
    }));
  };

  const goToForm = () => {
    setPage('diagnostic');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  const goToHome = () => {
    setPage('home');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  return (
    <div className="app">
      <Navbar serverStatus={serverStatus} onHome={goToHome} />

      {page === 'home' ? (
        <Home onStart={goToForm} />
      ) : (
        <main className="container diagnostic-page">
          <div className="diagnostic-hero">
            <div>
              <span className="diagnostic-kicker">Panel de diagnóstico</span>
              <h1>Evaluación del vehículo</h1>
              <p>Completa los datos principales para calcular el nivel de riesgo y obtener una recomendación.</p>
            </div>
            <button type="button" className="back-button" onClick={goToHome}>
              Volver al inicio
            </button>
          </div>

          <section className="form-section card">
            <Form
              formData={formData}
              onFormChange={handleFormChange}
              onSubmit={handleFormSubmit}
              loading={loading}
            />
          </section>

          {result && (
            <section className="result-section">
              <ResultCard result={result} />
              <Statistics result={result} />
              <Parameters result={result} />
            </section>
          )}

          <Info />
        </main>
      )}

      <Footer />

      {loading && (
        <div className="spinner-overlay">
          <div className="spinner">
            <div className="spinner-circle"></div>
            <p>Analizando vehículo...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
