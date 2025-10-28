# 🚀 Vercel Deployment для Frontend

Гайд по розгортанню Next.js frontend на Vercel з підключенням до Railway backend.

## 📋 Передумови

- Backend розгорнуто на Railway: `https://beneficial-playfulness.up.railway.app`
- GitHub репозиторій з кодом
- Аккаунт на [Vercel.com](https://vercel.com)

---

## 🔧 Крок 1: Оновлення API Endpoint

API endpoint вже оновлено в коді:
- `frontend/lib/config.js` - для Next.js версії
- `frontend/vanilla-html/app.js` - для vanilla HTML версії

Тепер використовується: `https://beneficial-playfulness.up.railway.app`

---

## 🚀 Крок 2: Deployment на Vercel

### Варіант A: Next.js Frontend (Рекомендовано)

1. **Зайдіть на [Vercel.com](https://vercel.com) і увійдіть**
2. **Клікніть "Add New Project"**
3. **Import проект з GitHub:**
   - Оберіть репозиторій `dorza-ai-generator`
   - Root Directory: `frontend`
4. **Environment Variables (опціонально):**
   ```
   NEXT_PUBLIC_API_URL=https://beneficial-playfulness.up.railway.app
   ```
   (Якщо не встановите, буде використано дефолтне значення з config.js)
5. **Build Settings:**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build` (auto-detect)
   - Output Directory: `.next` (auto-detect)
6. **Клікніть "Deploy"**

### Варіант B: Vanilla HTML Frontend

1. **Завантажте папку `frontend/vanilla-html`**
2. **Vercel → Add New → Deploy Drop**
3. **Перетягніть папку `vanilla-html`**
4. **Deploy!**

---

## ✅ Крок 3: Перевірка Deployment

### Тестування Health Endpoint

Відкрийте в браузері:
```
https://beneficial-playfulness.up.railway.app/health
```

Має повернути:
```json
{"status":"healthy","service":"campaign-generator"}
```

### Тестування Frontend

1. Відкрийте ваш Vercel URL (наприклад: `https://dorza-ai.vercel.app`)
2. Заповніть форму тестовими даними:
   - Business Name: TechNova Bioplastics
   - Product: Launch of new bioplastic PLA-Pro Line
   - Target Audience: Environmental-focused B2B manufacturers
   - Goal: Engagement
   - Tone: Professional
   - Posts: 3
3. Натисніть "Згенерувати Кампанію"
4. Перевірте що результати відображаються

---

## 🔍 Troubleshooting

### Помилка: "Failed to fetch" / CORS Error

**Причина:** Backend не дозволяє запити з Vercel domain

**Рішення:** 
1. Перевірте що backend має `allow_origin_regex=r".*"` в CORS налаштуваннях
2. Перезапустіть backend на Railway
3. Перевірте Railway logs на наявність помилок

### Помилка: "API Error: 502" / "Connection refused"

**Причина:** Backend не працює на Railway

**Рішення:**
1. Перевірте Railway dashboard - чи backend запущений
2. Перевірте `GEMINI_API_KEY` в Railway environment variables
3. Перегляньте Railway logs для деталей помилки

### Помилка: "Invalid JSON response"

**Причина:** Backend повертає помилку замість JSON

**Рішення:**
1. Перевірте Railway logs
2. Перевірте що всі environment variables встановлені
3. Протестуйте backend напряму через curl/Postman

---

## 📝 Production Checklist

- [ ] Backend доступний на Railway
- [ ] `/health` endpoint повертає `{"status":"healthy"}`
- [ ] Frontend deployed на Vercel
- [ ] API endpoint оновлено в коді
- [ ] Тестова генерація кампанії працює
- [ ] CORS налаштування правильні
- [ ] Environment variables встановлені (якщо потрібно)

---

## 🌐 Ваші URLs

### Backend (Railway):
```
https://beneficial-playfulness.up.railway.app
```

### Frontend (Vercel):
```
https://your-app-name.vercel.app
```
(Буде створено автоматично після deployment)

---

## 🎉 Готово!

Після успішного deployment ваш Dorza AI буде доступний публічно!

**Порада:** Додайте Vercel URL до README.md як "Live Demo" посилання.

