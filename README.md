# 🚀 Dorza AI - Social Media Campaign Generator

**AI-Powered Marketing Automation Platform** що автоматизує створення соціального медіа контенту для бізнесу.

## 🎯 Проблема, яку Вирішує Dorza

Малий та середній бізнес стикається з викликами:
- ❌ Недостатньо часу для створення якісного контенту для соціальних мереж
- ❌ Немає професійних маркетологів в команді
- ❌ Важко адаптувати контент під різні платформи (Facebook, Instagram, LinkedIn, X)
- ❌ Контент не відповідає цільовій аудиторії

**Dorza AI вирішує це:** За кілька секунд створює повну маркетингову кампанію з 3-5 постами, адаптованими під кожну платформу, разом з стратегією, хештегами та візуальними ідеями.

## 🛠️ Технологічний Стек

### Backend (AI Engine)
- **Python 3.14+** - Сучасна мова для AI розробки
- **FastAPI** - Асинхронний, швидкий REST API фреймворк
- **Pydantic V2** - Сувора валідація даних та типизація
- **Google Gemini API** (`gemini-2.0-flash-exp`) - Потужна AI модель для генерації контенту
- **Uvicorn** - ASGI сервер для production-ready розгортання

### Frontend (User Interface)
- **Next.js 14** (React) - Сучасний фреймворк для UI
- **Tailwind CSS** - Утилітарний CSS для адаптивного дизайну
- **Vanilla HTML/JS** версія - Для простої інтеграції без фреймворків

### AI Architecture
- **Structured Output** - Гарантія правильного JSON формату від AI
- **Asyncio** - Паралельна генерація постів (3-4x прискорення)
- **Multi-agent Chain** - Спеціалізовані агенти для кожної задачі

## 🧠 Архітектура AI-Агентів

**Багатоетапний ланцюжок спеціалізованих AI-агентів**, що мінімізує "галюцинації" та максимізує релевантність контенту:

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

## ✨ Ключові Особливості

### 🎨 User Experience
- ✅ **Проста форма вводу** - Заповніть інформацію про бізнес, отримайте готову кампанію
- ✅ **Dashboard результатів** - Перегляд стратегії та всіх постів в одному місці
- ✅ **Перемикання платформ** - Легке переключення між Facebook, Instagram, LinkedIn, X
- ✅ **Копіювання одним клацом** - Швидке копіювання тексту для публікації
- ✅ **Експорт даних** - JSON/CSV для подальшої обробки

### ⚡ Performance
- ✅ **Паралельна генерація** - Усі пости генеруються одночасно (3-4x швидше)
- ✅ **Швидке API** - Асинхронний FastAPI для мінімального часу очікування
- ✅ **Оптимізований AI** - Використання Gemini Flash для швидкої генерації

### 🎯 AI Capabilities
- ✅ **Структурований вивід** - Гарантований правильний JSON формат
- ✅ **Платформо-специфічна адаптація** - Унікальний контент для кожної соцмережі
- ✅ **Стратегічне планування** - AI аналізує мету та аудиторію перед генерацією
- ✅ **Візуальні ідеї** - Генерація промптів для створення зображень (готово до інтеграції з Imagen)

## 🌐 Deployment & Demo

### Локальне Запущення
Детальні інструкції в розділі [Інструкції по Локальному Запуску](#-інструкції-по-локальному-запуску)

### Production Deployment
- **Backend:** Railway, Render, или Heroku (FastAPI + Uvicorn)
- **Frontend:** Vercel, Netlify (Next.js статичний export або SSR)
- **API Key:** Зберігайте `GEMINI_API_KEY` в environment variables хостингу

### 🎬 Live Demo (Coming Soon)
[Демо буде доступне тут] - Зараз доступно лише локально через інструкції вище

## 📊 Порівняння з Альтернативами

| Функціонал | Dorza AI | Canva | Hootsuite AI | Buffer |
|------------|----------|-------|--------------|--------|
| AI Генерація Стратегії | ✅ | ❌ | ⚠️ Обмежено | ❌ |
| Платформо-Специфічна Адаптація | ✅ | ❌ | ⚠️ Частково | ⚠️ Частково |
| Структурований Вивід | ✅ | ❌ | ❌ | ❌ |
| Паралельна Генерація | ✅ | ❌ | ❌ | ❌ |
| Open Source | ✅ | ❌ | ❌ | ❌ |
| Self-Hosted | ✅ | ❌ | ❌ | ❌ |

## 🚀 Roadmap

### Version 2.0 (Planned)
- [ ] **Інтеграція з Google Imagen** - Автоматична генерація зображень
- [ ] **Публікація через API** - Пряме надсилання до соцмереж
- [ ] **Аналітика та A/B тестування** - Відстеження ефективності
- [ ] **Багатомовна підтримка** - Генерація контенту різними мовами
- [ ] **Історія кампаній** - База даних для збереження та редагування
- [ ] **Scheduling** - Автоматичне планування публікацій

### Version 1.1 (In Progress)
- [x] Паралельна генерація постів
- [x] Vanilla HTML/JS версія для простої інтеграції
- [x] Оптимізація продуктивності
- [ ] Production deployment guide

## 🤝 Contributing

Вітаємо внески до проєкту! Будь ласка, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) для деталей.

## 📄 License

MIT License - див. [LICENSE](LICENSE) файл

## 👤 Author

**Dorza AI Team**

- GitHub: [@Eugen1189](https://github.com/Eugen1189)
- Portfolio: [Coming Soon]

## 🌟 Show Your Support

Якщо проєкт був корисним, поставте ⭐ на GitHub!

## 📚 Додаткова Документація

- [Deployment Guide](DEPLOYMENT.md) - Детальні інструкції по розгортанню
- [Performance Optimization](backend/PERFORMANCE_OPTIMIZATION.md) - Про паралельну генерацію
- [Image Generation Setup](backend/IMAGE_GENERATION_SETUP.md) - Про інтеграцію з Imagen

---

**Зроблено з ❤️ для автоматизації маркетингу**
