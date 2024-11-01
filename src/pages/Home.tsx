import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Meditación Guiada',
      icon: '🧘‍♂️',
      description: 'Sesiones de meditación para reducir el estrés y mejorar tu bienestar.',
      onClick: () => navigate('/meditation')
    },
    {
      title: 'Ejercicios de Respiración',
      icon: '🌬️',
      description: 'Técnicas de respiración para la relajación y el enfoque.',
      onClick: () => navigate('/breathing')
    },
    {
      title: 'Registro de Estado de Ánimo',
      icon: '📊',
      description: 'Seguimiento diario de tus emociones y estados de ánimo.',
      onClick: () => navigate('/mood-tracker')
    },
    {
      title: 'Consejos de Bienestar',
      icon: '💡',
      description: 'Recomendaciones diarias para mejorar tu salud mental.',
      onClick: () => navigate('/tips')
    }
  ];

  return (
    <div className="home-container">
      <h1 className="text-center text-4xl font-bold text-primary mb-8 slide-up">
        Bienvenido a MindCare
      </h1>
      <div className="grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            icon={feature.icon}
            description={feature.description}
            onClick={feature.onClick}
          />
        ))}
      </div>
    </div>
  );
}