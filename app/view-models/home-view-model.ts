import { Observable } from '@nativescript/core';
import { Mood, MoodEntry } from '../models/mood';

export class HomeViewModel extends Observable {
  private _moods: Mood[] = [];
  private _currentMood: number = 0;

  constructor() {
    super();
  }

  get moods(): Mood[] {
    return this._moods;
  }

  get currentMood(): number {
    return this._currentMood;
  }

  set currentMood(value: number) {
    if (this._currentMood !== value) {
      this._currentMood = value;
      this.notifyPropertyChange('currentMood', value);
    }
  }

  logMood(value: number, note?: string) {
    const mood = new MoodEntry(value, note);
    this._moods.unshift(mood);
    this.notifyPropertyChange('moods', this._moods);
  }

  startMeditation(sessionId: string) {
    console.log('Iniciando sesión de meditación:', sessionId);
    // Implementación para iniciar sesión de meditación
  }

  startBreathingExercise() {
    console.log('Iniciando ejercicio de respiración');
    // Implementación para ejercicio de respiración
  }
}