import { useMood } from '../context/MoodContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';

export default function MoodTracker() {
  const { moods } = useMood();

  const getMoodEmoji = (value: number) => {
    const emojis = ['😢', '😕', '😐', '🙂', '😊'];
    return emojis[value - 1];
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">
        Registro de Estado de Ánimo
      </h1>
      
      <div className="card">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Tu Historia de Estado de Ánimo</h2>
        
        {moods.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-4xl mb-4 block">📝</span>
            <p className="text-gray-600">Aún no has registrado ningún estado de ánimo.</p>
            <p className="text-purple-600 mt-2">¡Comienza registrando cómo te sientes hoy!</p>
          </div>
        ) : (
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {moods.map(mood => (
              <motion.div
                key={mood.id}
                variants={item}
                className="border-b border-gray-200 pb-4 hover:bg-purple-50 rounded-lg p-4 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{getMoodEmoji(mood.value)}</span>
                  <div className="flex-1">
                    <p className="text-purple-600 font-medium">
                      {format(mood.timestamp, "d 'de' MMMM 'a las' HH:mm", { locale: es })}
                    </p>
                    {mood.note && (
                      <p className="text-gray-700 mt-1">{mood.note}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}