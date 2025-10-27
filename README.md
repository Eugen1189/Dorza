# Dorza AI Social Media Campaign Generator MVP

**Проєкт:** Демонстраційна платформа маркетингової автоматизації, що використовує багатоетапний ланцюжок AI-агентів для генерації адаптованого контенту для соціальних мереж.

**Мета:** Автоматизувати створення стратегії та публікації постів (текст, хештеги, візуальні ідеї) для малого бізнесу, забезпечуючи платформо-специфічну адаптацію.

## 🛠️ Технології

* **AI Backend:** Python 3.14, FastAPI (для швидкого, асинхронного API).
* **AI Engine:** Google Gemini API (модель gemini-2.0-flash-exp) для стратегії та генерації контенту.
* **Structured Data:** Pydantic V2 для суворої валідації вхідних даних та гарантування JSON-виводу від Gemini (Structured Output).
* **Frontend:** Next.js 14 (React) для сучасного та швидкого UI (Форма введення, Dashboard результатів).
* **UI/UX:** Tailwind CSS для адаптивного дизайну.

## 🧠 Архітектура: Багатоетапний Ланцюжок Агентів

Проєкт реалізує складний агентний ланцюжок, що перетворює простий ввід на готову кампанію, мінімізуючи "галюцинації" та максимізуючи релевантність.

### 1. **Агент-Стратег (Strategy Agent):**
* **Вхід:** `CampaignInput` (Бізнес, Мета, Тон).
* **Вихід:** Структурований `StrategyBrief` (3-5 тем, фокус, ключове повідомлення).
* **Технічний Аспект:** Використовує Gemini з System Prompt для формування маркетингової стратегії та Structured Output для гарантованого формату.

### 2. **Агенти-Адаптери (Content Adapters):**
* **Вхід:** Одна тема з `StrategyBrief` та деталі кампанії.
* **Вихід:** `PostOutput` (JSON) з 4 унікальними текстами для різних платформ.
* **Технічний Аспект:** Проходить циклом по кожній темі, викликаючи Gemini для генерації контенту, адаптованого під Facebook, Instagram, LinkedIn та X/Twitter.

### 3. **Агент-Форматувальник (Formatter):**
* **Вихід:** Фінальний об'єкт `FinalCampaignOutput`.
* **Технічний Аспект:** Збирає всі результати в єдиний, готовий до використання JSON, який передається Frontend для відображення.

## ⚙️ Інструкції по Локальному Запуску

### Передумови
- Python 3.8+
- Node.js 16+
- npm або yarn
- Google Gemini API Key ([отримати тут](https://makersuite.google.com/app/apikey))

### 1. Клонування Репозиторію

```bash
git clone https://github.com/YOUR_USERNAME/dorza-ai-generator.git
cd dorza-ai-generator
```

### 2. Налаштування Backend

#### 2.1. Створіть файл `.env` у папці `backend/`:

```env
# backend/.env
GEMINI_API_KEY="ваш_ключ_з_google_ai_studio"
PORT=8000
ENVIRONMENT=development
```

#### 2.2. Встановіть залежності:

```bash
cd backend
pip install -r requirements.txt
```

#### 2.3. Запустіть Backend сервер:

```bash
uvicorn main:app --reload --port 8000
```

Backend буде доступний на: `http://localhost:8000`

API документація (Swagger): `http://localhost:8000/docs`

### 3. Налаштування Frontend

#### 3.1. Встановіть залежності:

```bash
cd frontend
npm install
```

#### 3.2. Запустіть Frontend сервер:

```bash
npm run dev
```

Frontend буде доступний на: `http://localhost:3000`

## 🧪 Тестування

### Тестування Backend

1. Перевірка health endpoint:
```bash
curl http://localhost:8000/health
```

2. Тестування API endpoint:
```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "business_name": "ProForma Labs",
    "product_service": "Custom 3D prototypes from bioplastic",
    "target_audience": "Engineers and designers aged 30-45 who value sustainability",
    "campaign_goal": "awareness",
    "desired_tone": "professional",
    "num_posts": 3
  }'
```

### Тестування Frontend

1. Відкрийте `http://localhost:3000` у браузері
2. Заповніть форму даними
3. Натисніть "🚀 Запустити AI-Генерацію"
4. Перегляньте згенерований Dashboard з результатами

## 📁 Структура Проєкту

```
dorza-ai-generator/
├── backend/
│   ├── main.py              # FastAPI додаток з агентними ланцюжками
│   ├── models.py            # Pydantic моделі (CampaignInput, StrategyBrief, PostOutput)
│   ├── requirements.txt     # Python залежності
│   └── .env                 # Змінні оточення (API ключі)
├── frontend/
│   ├── app/
│   │   └── page.js          # Головна сторінка з формою та Dashboard
│   ├── components/
│   │   ├── CampaignForm.js     # Форма введення кампанії
│   │   ├── CampaignDashboard.js # Dashboard результатів
│   │   └── PostCard.js          # Картка окремого посту
│   └── lib/
│       └── config.js        # Конфігурація API
└── README.md
```

## 📝 API Endpoints

### Backend API

- `GET /` - Кореневий endpoint
- `GET /health` - Health check
- `POST /api/generate` - Генерація кампанії (повертає `FinalCampaignOutput`)

### Request Body Example

```json
{
  "business_name": "ProForma Labs",
  "product_service": "Custom 3D prototypes from bioplastic",
  "target_audience": "Engineers and designers aged 30-45 who value sustainability",
  "campaign_goal": "awareness",
  "desired_tone": "professional",
  "campaign_theme": "Launch of new bioplastic PLA-Pro line",
  "num_posts": 3
}
```

### Response Example

```json
{
  "strategy_summary": "Comprehensive strategy summary...",
  "posts": [
    {
      "facebook_text": "Content for Facebook...",
      "instagram_text": "Content for Instagram...",
      "linkedin_text": "Content for LinkedIn...",
      "x_text": "Content for X/Twitter...",
      "image_prompt": "Visual description for AI image generator...",
      "suggested_hashtags": "#innovation #sustainability #3Dprinting"
    }
  ]
}
```

## 🔑 Функціонал Dashboard

### Основні можливості:
- ✅ Відображення стратегічного резюме
- ✅ Перегляд контенту для 4 платформ (Facebook, Instagram, LinkedIn, X)
- ✅ Копіювання тексту в буфер обміну
- ✅ Експорт результатів у JSON або CSV формат
- ✅ Адаптивний дизайн для мобільних пристроїв

## 🚀 Майбутні Покращення

- [ ] Інтеграція з DALL-E/Midjourney для автоматичної генерації зображень
- [ ] Автоматична публікація контенту через API соціальних мереж
- [ ] Система аналітики та A/B тестування
- [ ] Багатомовна підтримка
- [ ] Історія згенерованих кампаній

## 📄 Ліцензія

MIT

## 👤 Автор

Dorza AI Team

## 🤝 Внесок

Вітаються pull requests! Будь ласка, відкривайте issue для обговорення великих змін.
