# ⚡ Quick Start Guide - Dorza AI

Швидкий запуск для тестування.

## 🔍 Перевірка Перед Запуском

### Швидка діагностика:

```bash
cd backend
python startup_check.py
```

Це перевірить:
- ✅ Всі залежності встановлені
- ✅ GEMINI_API_KEY налаштовано

## 🚀 Запуск Backend

### Варіант 1: Команда в терміналі

```bash
cd backend
uvicorn main:app --reload --port 8000
```

Ви побачите:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### Варіант 2: Через Python

```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

## ✅ Перевірка Backend

Відкрийте в браузері: http://127.0.0.1:8000/health

Або в терміналі:
```bash
curl http://127.0.0.1:8000/health
```

Має повернути:
```json
{"status":"healthy","service":"campaign-generator"}
```

## 🎨 Запуск Frontend (Vanilla HTML)

### Варіант 1: Просто відкрити файл
Подвійний клік на `frontend/vanilla-html/index.html`

### Варіант 2: Через локальний сервер
```bash
cd frontend/vanilla-html
python -m http.server 8080
```
Потім відкрийте: http://localhost:8080

## 🔧 Якщо Backend не запускається

### Помилка: "Module not found"
```bash
cd backend
pip install -r requirements.txt
```

### Помилка: "GEMINI_API_KEY not found"
Створіть файл `backend/.env`:
```env
GEMINI_API_KEY=your_api_key_here
PORT=8000
```

### Помилка: "Address already in use"
Змініть порт:
```bash
uvicorn main:app --reload --port 8001
```
І оновіть `API_ENDPOINT` в `frontend/vanilla-html/app.js`

## 🐛 Діагностика CORS

Якщо побачите помилку CORS в консолі браузера:

1. Перевірте що backend запущений
2. Перевірте що порт в `app.js` правильний (8000)
3. Перезапустіть backend після змін в `main.py`

## ✅ Чеклист Тестування

- [ ] Backend запущений на http://127.0.0.1:8000
- [ ] /health endpoint повертає {"status":"healthy"}
- [ ] Frontend відкритий (HTML файл або локальний сервер)
- [ ] Форма заповнена тестовими даними
- [ ] Кнопка "Згенерувати Кампанію" працює
- [ ] Результати відображаються в Dashboard

---

**Готово! Тепер можете тестувати Dorza AI! 🎉**

