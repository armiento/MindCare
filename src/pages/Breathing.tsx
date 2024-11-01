import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const breathingExercises = [
  {
    id: 'box',
    title: 'Respiración Cuadrada',
    description: 'Inhala por 4 segundos, mantén por 4, exhala por 4, y pausa por 4.',
    duration: 240,
    pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 }
  },
  {
    id: '478',
    title: 'Técnica 4-7-8',
    description: 'Inhala por 4 segundos, mantén por 7, y exhala por 8.',
    duration: 180,
    pattern: { inhale: 4, hold1: 7, exhale: 8, hold2: 0 }
  },
  {
    id: 'calm',
    title: 'Respiración Calmante',
    description: 'Inhala por 6 segundos y exhala por 6 segundos.',
    duration: 180,
    pattern: { inhale: 6, hold1: 0, exhale: 6, hold2: 0 }
  }
];

export default function Breathing() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      const exercise = breathingExercises.find((ex) => ex.id === selectedExercise);
      if (exercise) {
        switch (phase) {
          case 'inhale':
            setPhase('hold1');
            setTimeLeft(exercise.pattern.hold1);
            break;
          case 'hold1':
            setPhase('exhale');
            setTimeLeft(exercise.pattern.exhale);
            break;
          case 'exhale':
            setPhase('hold2');
            setTimeLeft(exercise.pattern.hold2);
            break;
          case 'hold2':
            setPhase('inhale');
            setTimeLeft(exercise.pattern.inhale);
            break;
        }
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, selectedExercise]);

  const startExercise = (id: string) => {
    const exercise = breathingExercises.find((ex) => ex.id === id);
    if (exercise) {
      setSelectedExercise(id);
      setPhase('inhale');
      setTimeLeft(exercise.pattern.inhale);
      setIsActive(true);
    }
  };

  const stopExercise = () => {
    setIsActive(false);
    setSelectedExercise(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">
        Ejercicios de Respiración
      </h1>

      {!selectedExercise ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {breathingExercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              className="card"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="card-title">{exercise.title}</h3>
              <p className="card-content">{exercise.description}</p>
              <button
                className="btn btn-primary"
                onClick={() => startExercise(exercise.id)}
              >
                Comenzar
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="card"
            >
              <h2 className="text-2xl font-bold mb-4">
                {phase === 'inhale' && 'Inhala'}
                {phase === 'hold1' && 'Mantén'}
                {phase === 'exhale' && 'Exhala'}
                {phase === 'hold2' && 'Pausa'}
              </h2>
              <div className="text-6xl font-bold text-primary mb-8">
                {timeLeft}
              </div>
              <button className="btn btn-primary" onClick={stopExercise}>
                Terminar
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}