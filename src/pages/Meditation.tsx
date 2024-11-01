import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MeditationSession {
  id: string;
  title: string;
  duration: string;
  description: string;
  icon: string;
}

export default function Meditation() {
  const [activeSession, setActiveSession] = useState<string | null>(null);

  const sessions: MeditationSession[] = [
    {
      id: 'stress-relief',
      title: 'Alivio del Estrés',
      duration: '10 minutos',
      description: 'Una sesión tranquila para ayudarte a reducir el estrés y la ansiedad.',
      icon: '🌿'
    },
    {
      id: 'better-sleep',
      title: 'Mejor Descanso',
      duration: '15 minutos',
      description: 'Prepárate para un sueño reparador con esta meditación nocturna.',
      icon: '🌙'
    },
    {
      id: 'focus',
      title: 'Concentración y Enfoque',
      duration: '8 minutos',
      description: 'Mejora tu concentración y claridad mental.',
      icon: '🎯'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">
        Meditación Guiada
      </h1>
      
      <div className="grid gap-6">
        {sessions.map(session => (
          <motion.div
            key={session.id}
            className="card"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start">
              <span className="text-4xl mr-4">{session.icon}</span>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-purple-700">{session.title}</h2>
                <p className="text-purple-500 text-sm mt-1">{session.duration}</p>
                <p className="text-gray-600 mt-2">{session.description}</p>
                <motion.button
                  onClick={() => setActiveSession(session.id)}
                  className="btn-primary mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar Sesión
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}