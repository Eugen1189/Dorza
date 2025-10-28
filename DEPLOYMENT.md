# 🚀 Deployment Guide - Dorza AI

Гайд по розгортанню Dorza AI на різних хостинг платформах.

## 📋 Передумови

- GitHub репозиторій з кодом
- Google Gemini API Key
- Аккаунт на хостингу (Railway/Render/Vercel)

---

## 🔧 Backend Deployment

### Option 1: Railway (Рекомендовано)

Railway чудово підходить для Python/FastAPI проєктів.

#### Кроки:

1. **Створіть аккаунт на [Railway.app](https://railway.app)**
2. **Новий проєкт → Deploy from GitHub**
3. **Налаштуйте змінні середовища:**
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=8000
   ENVIRONMENT=production
   ```
4. **Root Directory:** `backend`
5. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. **Build Command:** `pip install -r requirements.txt`

Railway автоматично надасть URL типу: `https://your-app.railway.app`

---

### Option 2: Render

#### Кроки:

1. **Створіть аккаунт на [Render.com](https://render.com)**
2. **New → Web Service → Connect GitHub**
3. **Налаштування:**
   - **Build Command:** `cd backend && pip install -r requirements.txt`
   - **Start Command:** `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment:** Python 3
4. **Environment Variables:**
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

---

### Option 3: Heroku

#### Кроки:

1. **Встановіть Heroku CLI**
2. **Створіть `Procfile` в `backend/`:**
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
3. **Додайте `runtime.txt` в `backend/`:**
   ```
   python-3.11.0
   ```
4. **Deploy:**
   ```bash
   cd backend
   heroku create your-app-name
   heroku config:set GEMINI_API_KEY=your_api_key
   git push heroku main
   ```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Рекомендовано для Next.js)

#### Кроки:

1. **Створіть аккаунт на [Vercel.com](https://vercel.com)**
2. **Import Project → Connect GitHub**
3. **Root Directory:** `frontend`
4. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```
5. **Deploy!**

Vercel автоматично надасть URL типу: `https://your-app.vercel.app`

---

### Option 2: Netlify

#### Кроки:

1. **Створіть аккаунт на [Netlify.com](https://netlify.com)**
2. **Add new site → Import from Git**
3. **Налаштування Build:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/.next`
4. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

---

### Option 3: Static HTML Version

Для `vanilla-html` версії:

1. **Замініть API URL в `app.js`:**
   ```javascript
   const API_ENDPOINT = "https://your-backend-url.com/api/generate";
   ```
2. **Deploy папку `frontend/vanilla-html/` на будь-який статичний хостинг:**
   - GitHub Pages
   - Netlify Drop
   - Vercel (просто drag & drop)

---

## 🔗 Налаштування CORS

Після deployment backend, переконайтеся що CORS налаштовано правильно:

```python
# backend/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-frontend-url.vercel.app",
        "https://your-frontend-url.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## ✅ Перевірка Deployment

### Backend:
```bash
curl https://your-backend-url.com/health
# Має повернути: {"status":"healthy","service":"campaign-generator"}
```

### Frontend:
Відкрийте URL в браузері і спробуйте згенерувати кампанію.

---

## 🐛 Troubleshooting

### Помилка: "GEMINI_API_KEY not found"
- Перевірте що змінна середовища встановлена в панелі хостингу
- Перезапустіть сервіс після додавання змінної

### Помилка: CORS
- Додайте frontend URL до `allow_origins` в backend
- Перезапустіть backend сервіс

### Помилка: "Module not found"
- Перевірте що `requirements.txt` встановлюється правильно
- Перевірте що ви в правильній директорії (backend/)

---

## 📝 Production Checklist

- [ ] API ключі збережені в environment variables
- [ ] CORS налаштовано для frontend URL
- [ ] Backend доступний через HTTPS
- [ ] Frontend оновлено з правильним API URL
- [ ] Health check endpoint працює
- [ ] Тестова генерація кампанії успішна
- [ ] Логи не містять помилок

---

**Готово! Ваш Dorza AI тепер живе в internet! 🌐**

