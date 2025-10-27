# Dorza AI Campaign Generator

AI-powered маркетингова система для генерації контенту в соціальних мережах.

## 🚀 Швидкий старт

### Передумови
- Python 3.8+
- Node.js 16+
- npm або yarn

### Встановлення Backend

```bash
cd backend
pip install -r requirements.txt
```

### Встановлення Frontend

```bash
cd frontend
npm install
```

## 🏃 Запуск проєкту

### 1. Запуск Backend (FastAPI)

```bash
cd backend
uvicorn main:app --reload --port 8000
```

Backend буде доступний на: `http://localhost:8000`

API документація (Swagger): `http://localhost:8000/docs`

### 2. Запуск Frontend (Next.js)

```bash
cd frontend
npm run dev
```

Frontend буде доступний на: `http://localhost:3000`

## 🧪 Тестування

### Перевірка Backend

1. Перевірте health endpoint:
```bash
curl http://localhost:8000/health
```

2. Перевірте API endpoint з тестовими даними:
```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "business_name": "Test Company",
    "product_service": "Test Product",
    "target_audience": "Test Audience",
    "campaign_goal": "awareness",
    "desired_tone": "professional",
    "num_posts": 3
  }'
```

### Перевірка Frontend

1. Відкрийте `http://localhost:3000` у браузері
2. Заповніть форму даними
3. Натисніть "Запустити AI-Генерацію"
4. Перевірте відповідь від сервера

## 📁 Структура проєкту

```
dorza-ai-generator/
├── backend/
│   ├── main.py              # FastAPI додаток
│   ├── models.py            # Pydantic моделі
│   ├── requirements.txt     # Python залежності
│   └── .env                 # Змінні оточення
├── frontend/
│   ├── app/
│   │   └── page.js         # Головна сторінка
│   ├── components/
│   │   └── CampaignForm.js  # Форма кампанії
│   └── lib/
│       └── config.js        # Конфігурація API
└── README.md
```

## 🔧 Конфігурація

### Backend (.env)

```env
GEMINI_API_KEY=your_api_key_here
PORT=8000
ENVIRONMENT=development
```

### Frontend (lib/config.js)

```javascript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

## 📝 API Endpoints

- `GET /` - Кореневий endpoint
- `GET /health` - Health check
- `POST /api/generate` - Генерація кампанії

## 🛠 Технології

### Backend
- FastAPI
- Pydantic
- Uvicorn

### Frontend
- Next.js 14
- React
- Tailwind CSS

## 📄 Ліцензія

MIT
