import { createContext, useContext, useState, ReactNode } from 'react';

interface Mood {
  id: string;
  value: number;
  timestamp: Date;
  note?: string;
}

interface MoodContextType {
  moods: Mood[];
  addMood: (value: number, note?: string) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [moods, setMoods] = useState<Mood[]>([]);

  const addMood = (value: number, note?: string) => {
    const newMood = {
      id: Date.now().toString(),
      value,
      timestamp: new Date(),
      note
    };
    setMoods(prev => [newMood, ...prev]);
  };

  return (
    <MoodContext.Provider value={{ moods, addMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}