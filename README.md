# Gulliver Tunnel - URL Shortener

Gulliver Tunnel is a **URL shortener** tool built using **Django REST Framework (DRF)**. It transforms long URLs into short, manageable links, making sharing easier and more convenient.

---

## 🔹 Features
- ✅ **URL Shortening API** (Convert long URLs into short, shareable links)
- ✅ **User Authentication** (Email-based OTP login)
- ✅ **API Key Authentication** (For third-party integrations)
- ✅ **Dashboard UI** (View, create, and manage shortened URLs)
- ✅ **Redirection Handling** (Short links redirect seamlessly to original URLs)
- ✅ **Expiration Management** (Set expiration times for links)
- ✅ **Rate Limiting** (Prevent API abuse)
- ✅ **Easter Eggs** (Hidden surprises for users exploring the platform)

---

## 🔹 Tech Stack
- **Backend:** Django, Django REST Framework
- **Database:** PostgreSQL (or SQLite for local development)
- **Frontend:** React.js (Planned)
- **Authentication:** Token-based & API Key Authentication
- **Deployment:** Docker & CI/CD (Planned)

---

## 🔹 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/gulliver-tunnel.git
cd gulliver-tunnel
```

### 2️⃣ Create a Virtual Environment & Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3️⃣ Run Database Migrations
```bash
python manage.py migrate
```

### 5️⃣ Start the Server
```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` to see the API running.

---

## 🔹 API Usage
### **1️⃣ Obtain an API Key**
```bash
curl -X GET "http://127.0.0.1:8000/api/v1/api-key/" -H "Authorization: Token YOUR_AUTH_TOKEN"
```

### **2️⃣ Shorten a URL**
```bash
curl -X POST "http://127.0.0.1:8000/api/v1/shortenedurlviewset/manage_urls/" \
     -H "X-API-KEY: YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"original_url": "https://example.com/some-page"}'
```

### **3️⃣ Redirect from Shortened URL**
Simply visit:
```
http://127.0.0.1:8000/xO7WNg
```

---

## 🔹 Roadmap & Future Plans 🚀
- ✅ **Core URL Shortening API** (Done)
- ✅ **User Authentication via OTP** (Done)
- ⏳ **Frontend Dashboard with React.js** (In Progress)
- ⏳ **Click Tracking & Analytics** (Planned)
- ⏳ **Public API Documentation (Swagger)** (Planned)
- ⏳ **Docker & Production Deployment** (Planned)
- ⏳ **Dark Mode & UI Customization** (Planned)

---

## 🔹 Contributing
Contributions are welcome! Feel free to fork the repository and submit pull requests.

1. Fork the repo
2. Create a new branch (`feature/new-feature`)
3. Commit your changes
4. Push the branch & create a PR

---

## 🔹 License
This project is licensed under the **MIT License**.

---

Happy shortening! 🎉🚀

