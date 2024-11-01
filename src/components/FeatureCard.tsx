import React from 'react';

interface FeatureCardProps {
  title: string;
  icon: string;
  description: string;
  onClick: () => void;
}

export default function FeatureCard({ title, icon, description, onClick }: FeatureCardProps) {
  return (
    <div className="card fade-in">
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-content">{description}</p>
      <button className="btn btn-primary" onClick={onClick}>
        Iniciar
      </button>
    </div>
  );
}