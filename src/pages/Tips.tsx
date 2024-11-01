import React from 'react';
import { motion } from 'framer-motion';

const wellnessTips = [
  {
    category: 'Mindfulness',
    tips: [
      {
        title: 'Práctica de Gratitud',
        description: 'Dedica 5 minutos cada mañana a escribir tres cosas por las que estás agradecido.',
        icon: '🙏'
      },
      {
        title: 'Meditación Breve',
        description: 'Realiza mini-meditaciones de 1 minuto durante el día para reconectar contigo mismo.',
        icon: '🧘‍♂️'
      }
    ]
  },
  {
    category: 'Hábitos Saludables',
    tips: [
      {
        title: 'Rutina de Sueño',
        description: 'Mantén un horario regular de sueño, incluso los fines de semana.',
        icon: '😴'
      },
      {
        title: 'Hidratación',
        description: 'Bebe agua regularmente durante el día para mantener tu cuerpo y mente en óptimo estado.',
        icon: '💧'
      }
    ]
  },
  {
    category: 'Bienestar Emocional',
    tips: [
      {
        title: 'Límites Saludables',
        description: 'Aprende a decir "no" cuando sea necesario para proteger tu energía y tiempo.',
        icon: '🛡️'
      },
      {
        title: 'Conexión Social',
        description: 'Mantén contacto regular con amigos y familia, incluso si es virtualmente.',
        icon: '👥'
      }
    ]
  }
];

export default function Tips() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">
        Consejos de Bienestar
      </h1>

      <div className="space-y-12">
        {wellnessTips.map((category, index) => (
          <motion.section
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <h2 className="text-2xl font-bold text-primary mb-6">
              {category.category}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {category.tips.map((tip, tipIndex) => (
                <motion.div
                  key={tip.title}
                  className="card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: tipIndex * 0.1 }}
                >
                  <span className="text-4xl mb-4 block">{tip.icon}</span>
                  <h3 className="card-title">{tip.title}</h3>
                  <p className="card-content">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}