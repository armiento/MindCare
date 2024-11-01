import tkinter as tk
from tkinter import ttk, messagebox
import datetime
import json
import os
from ttkthemes import ThemedTk
from PIL import Image, ImageTk
import sv_ttk
import threading

class ModernMindCareGUI:
    def __init__(self):
        self.master = ThemedTk(theme="arc")
        self.master.title("MindCare - Bienestar Mental")
        self.master.geometry("800x600")
        self.master.configure(bg='#f0f0f0')
        
        # Apply Sun Valley theme
        sv_ttk.set_theme("light")
        
        self.current_user = None
        self.users = self.load_users()
        
        # Load and store images
        self.images = {
            'meditation': self.load_image('assets/meditation.png', (64, 64)),
            'breathing': self.load_image('assets/breathing.png', (64, 64)),
            'mood': self.load_image('assets/mood.png', (64, 64)),
            'history': self.load_image('assets/history.png', (64, 64)),
            'reminder': self.load_image('assets/reminder.png', (64, 64))
        }
        
        self.create_widgets()
        self.style_config()

    def style_config(self):
        style = ttk.Style()
        style.configure('Card.TFrame', background='white', relief='raised', borderwidth=1)
        style.configure('Title.TLabel', font=('Helvetica', 24, 'bold'), padding=10)
        style.configure('Subtitle.TLabel', font=('Helvetica', 16), padding=5)
        style.configure('Action.TButton', font=('Helvetica', 12), padding=10)

    def load_image(self, path, size):
        try:
            img = Image.open(path)
            img = img.resize(size, Image.Resampling.LANCZOS)
            return ImageTk.PhotoImage(img)
        except:
            return None

    def create_widgets(self):
        # Main container with padding
        self.main_container = ttk.Frame(self.master, padding="20")
        self.main_container.pack(fill=tk.BOTH, expand=True)

        # Create and pack the notebook
        self.notebook = ttk.Notebook(self.main_container)
        self.notebook.pack(fill=tk.BOTH, expand=True)

        # Create frames
        self.login_frame = ttk.Frame(self.notebook, padding="20")
        self.main_frame = ttk.Frame(self.notebook, padding="20")
        
        self.notebook.add(self.login_frame, text="Inicio de Sesión")
        self.notebook.add(self.main_frame, text="MindCare")

        self.create_login_widgets()
        self.create_main_widgets()

    def create_login_widgets(self):
        # Center login content
        login_container = ttk.Frame(self.login_frame)
        login_container.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

        # Welcome message
        ttk.Label(
            login_container,
            text="Bienvenido a MindCare",
            style='Title.TLabel'
        ).pack(pady=(0, 20))

        # Login form
        form_frame = ttk.Frame(login_container)
        form_frame.pack(fill=tk.BOTH, pady=20)

        ttk.Label(
            form_frame,
            text="Usuario:",
            style='Subtitle.TLabel'
        ).pack()

        self.username_entry = ttk.Entry(
            form_frame,
            width=30,
            font=('Helvetica', 12)
        )
        self.username_entry.pack(pady=10)

        # Buttons container
        button_frame = ttk.Frame(form_frame)
        button_frame.pack(pady=20)

        ttk.Button(
            button_frame,
            text="Iniciar Sesión",
            style='Action.TButton',
            command=self.login
        ).pack(side=tk.LEFT, padx=5)

        ttk.Button(
            button_frame,
            text="Registrarse",
            style='Action.TButton',
            command=self.register
        ).pack(side=tk.LEFT, padx=5)

    def create_main_widgets(self):
        # Header
        header_frame = ttk.Frame(self.main_frame)
        header_frame.pack(fill=tk.X, pady=(0, 20))

        ttk.Label(
            header_frame,
            text="MindCare",
            style='Title.TLabel'
        ).pack(side=tk.LEFT)

        # Cards container
        cards_frame = ttk.Frame(self.main_frame)
        cards_frame.pack(fill=tk.BOTH, expand=True)

        # Configure grid
        cards_frame.columnconfigure(0, weight=1)
        cards_frame.columnconfigure(1, weight=1)

        # Create feature cards
        features = [
            ("Meditación Guiada", "meditation", self.guided_meditation),
            ("Ejercicio de Respiración", "breathing", self.breathing_exercise),
            ("Registrar Estado de Ánimo", "mood", self.log_mood),
            ("Ver Historial", "history", self.view_mood_history),
            ("Configurar Recordatorio", "reminder", self.set_reminder)
        ]

        for idx, (text, icon, command) in enumerate(features):
            row = idx // 2
            col = idx % 2
            self.create_feature_card(cards_frame, text, icon, command, row, col)

    def create_feature_card(self, parent, text, icon, command, row, col):
        card = ttk.Frame(parent, style='Card.TFrame')
        card.grid(row=row, column=col, padx=10, pady=10, sticky="nsew")

        # Card content
        if self.images.get(icon):
            ttk.Label(card, image=self.images[icon]).pack(pady=10)

        ttk.Label(
            card,
            text=text,
            style='Subtitle.TLabel'
        ).pack(pady=5)

        ttk.Button(
            card,
            text="Iniciar",
            style='Action.TButton',
            command=command
        ).pack(pady=10)

    def create_progress_window(self, title, duration):
        window = tk.Toplevel(self.master)
        window.title(title)
        window.geometry("400x300")
        window.transient(self.master)
        window.grab_set()

        # Progress frame
        progress_frame = ttk.Frame(window, padding="20")
        progress_frame.pack(fill=tk.BOTH, expand=True)

        # Progress bar
        self.progress = ttk.Progressbar(
            progress_frame,
            mode='determinate',
            length=300
        )
        self.progress.pack(pady=20)

        # Timer label
        self.timer_label = ttk.Label(
            progress_frame,
            text=str(duration),
            style='Title.TLabel'
        )
        self.timer_label.pack(pady=10)

        return window

    def guided_meditation(self):
        window = self.create_progress_window("Meditación Guiada", "05:00")
        self.start_meditation_timer(300)  # 5 minutes

    def breathing_exercise(self):
        window = self.create_progress_window("Ejercicio de Respiración", "Preparado")
        self.start_breathing_exercise()

    def start_meditation_timer(self, duration):
        def update():
            while duration > 0:
                minutes, seconds = divmod(duration, 60)
                self.timer_label.config(text=f"{minutes:02d}:{seconds:02d}")
                self.progress['value'] = ((300 - duration) / 300) * 100
                self.master.update()
                time.sleep(1)
                duration -= 1
            self.timer_label.config(text="¡Completado!")

        threading.Thread(target=update, daemon=True).start()

    def log_mood(self):
        window = tk.Toplevel(self.master)
        window.title("Registrar Estado de Ánimo")
        window.geometry("500x400")
        window.transient(self.master)
        window.grab_set()

        content_frame = ttk.Frame(window, padding="20")
        content_frame.pack(fill=tk.BOTH, expand=True)

        ttk.Label(
            content_frame,
            text="¿Cómo te sientes hoy?",
            style='Title.TLabel'
        ).pack(pady=10)

        # Mood scale with emojis
        scale_frame = ttk.Frame(content_frame)
        scale_frame.pack(fill=tk.X, pady=20)

        self.mood_var = tk.IntVar(value=3)
        
        emojis = ["😢", "😕", "😐", "🙂", "😊"]
        for i, emoji in enumerate(emojis, 1):
            ttk.Radiobutton(
                scale_frame,
                text=emoji,
                value=i,
                variable=self.mood_var
            ).pack(side=tk.LEFT, padx=20)

        # Notes field
        ttk.Label(
            content_frame,
            text="Notas (opcional):",
            style='Subtitle.TLabel'
        ).pack(pady=(20, 5))

        notes_entry = ttk.Entry(content_frame, width=50)
        notes_entry.pack(pady=10)

        # Save button
        ttk.Button(
            content_frame,
            text="Guardar",
            style='Action.TButton',
            command=lambda: self.save_mood(self.mood_var.get(), notes_entry.get(), window)
        ).pack(pady=20)

    def save_mood(self, mood, notes, window):
        if self.current_user:
            self.users[self.current_user]["mood_log"].append({
                "date": datetime.datetime.now().isoformat(),
                "mood": mood,
                "notes": notes
            })
            self.save_users()
            messagebox.showinfo("Éxito", "Estado de ánimo registrado correctamente")
            window.destroy()

    def load_users(self):
        if os.path.exists("users.json"):
            with open("users.json", "r") as f:
                return json.load(f)
        return {}

    def save_users(self):
        with open("users.json", "w") as f:
            json.dump(self.users, f)

if __name__ == "__main__":
    app = ModernMindCareGUI()
    app.master.mainloop()