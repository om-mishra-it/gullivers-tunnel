# Gulliver Tunnel - URL Shortener

Gulliver Tunnel is a **URL shortener** tool built using **Django REST Framework (DRF)**. It transforms long URLs into short, manageable links, making sharing easier and more convenient.

## 🔹 Features
- ✅ Django REST Framework (DRF) API setup
- ✅ Basic home route (`/`) to check if API is running
- ✅ Project structure defined

## 🔹 Tech Stack
- **Backend:** Django, Django REST Framework

## 🔹 Installation & Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/gulliver-tunnel.git
   cd gulliver-tunnel
   ```
2. **Create a Virtual Environment & Install Dependencies**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install django djangorestframework
   ```
3. **Run the Project**
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```
   Visit `http://127.0.0.1:8000/` to see the API running.

