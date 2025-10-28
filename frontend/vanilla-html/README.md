# Vanilla HTML Version - Dorza AI Campaign Generator

Це проста HTML/CSS/JavaScript версія фронтенду без залежностей від фреймворків.

## 🚀 Швидкий Старт

### 1. Запустіть Backend

```bash
cd backend
uvicorn main:app --reload --port 8000
```

### 2. Відкрийте HTML файл

Просто відкрийте `index.html` у браузері або використайте локальний сервер:

```bash
# Python 3
python -m http.server 8080

# Або Node.js
npx serve
```

Потім відкрийте: `http://localhost:8080`

## 📁 Структура Файлів

- `index.html` - Головна HTML структура з формою та результатами
- `style.css` - Стилізація з градієнтами та сучасним дизайном
- `app.js` - JavaScript логіка для API запитів та відображення результатів

## ✨ Функціонал

- ✅ Форма вводу для CampaignInput
- ✅ Взаємодія з `/api/generate` endpoint
- ✅ Відображення FinalCampaignOutput
- ✅ Перемикання між платформами (Facebook, Instagram, LinkedIn, X)
- ✅ Копіювання тексту в буфер обміну
- ✅ Експорт JSON/CSV
- ✅ Обробка помилок та loading стани
- ✅ Адаптивний дизайн

## 🎨 Дизайн

- Градієнтний фон (фіолетово-рожевий)
- Карточки з тінню
- Анімований spinner
- Плавні переходи
- Мобільна адаптивність

## ⚙️ Налаштування API

За замовчуванням API URL: `http://localhost:8000/api/generate`

Щоб змінити, відредагуйте `app.js`:
```javascript
const API_URL = 'http://your-backend-url/api/generate';
```

