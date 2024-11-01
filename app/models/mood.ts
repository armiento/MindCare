export interface Mood {
  id: string;
  timestamp: Date;
  value: number;
  note?: string;
}

export class MoodEntry implements Mood {
  id: string;
  timestamp: Date;
  value: number;
  note?: string;

  constructor(value: number, note?: string) {
    this.id = Date.now().toString();
    this.timestamp = new Date();
    this.value = value;
    this.note = note;
  }
}