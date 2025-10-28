# 🤝 Contributing to Dorza AI

Вітаємо участь у розробці Dorza AI! Це guide допоможе вам почати.

## 🚀 Як Розпочати

1. **Fork репозиторій**
2. **Clone ваш fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dorza-ai-generator.git
   cd dorza-ai-generator
   ```

3. **Створіть ветку для вашого feature:**
   ```bash
   git checkout -b feature/amazing-feature
   ```

## 📝 Процес Розробки

### Backend (Python/FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

## ✍️ Coding Standards

### Python
- Використовуйте **PEP 8** style guide
- Type hints для функцій
- Docstrings для класів та функцій
- Максимум 100 символів в рядку

### JavaScript/React
- ESLint правила дотримано
- Functional components з hooks
- Meaningful назви змінних та функцій

### Git Commits
Використовуйте conventional commits:
```
feat: Add image generation support
fix: Resolve CORS issue on production
docs: Update deployment guide
refactor: Optimize async post generation
```

## 🧪 Testing

Перед submission, переконайтеся що:
- [ ] Backend API працює локально
- [ ] Frontend підключається до API
- [ ] Немає помилок в консолі
- [ ] Всі нові dependencies додані до requirements.txt / package.json

## 📤 Submitting Changes

1. **Push вашу ветку:**
   ```bash
   git push origin feature/amazing-feature
   ```

2. **Створіть Pull Request на GitHub**

3. **Опишіть ваші зміни:**
   - Що було змінено?
   - Чому це важливо?
   - Як це тестувалося?

## 🎯 Areas for Contribution

### High Priority
- [ ] Image generation integration (Imagen API)
- [ ] Social media publishing API integration
- [ ] Analytics & A/B testing
- [ ] Multi-language support

### Medium Priority
- [ ] Improved error handling
- [ ] Loading states optimization
- [ ] Additional platform support (TikTok, Pinterest)
- [ ] UI/UX improvements

### Low Priority
- [ ] Documentation improvements
- [ ] Code comments & cleanup
- [ ] Performance optimizations
- [ ] Test coverage

## 📧 Questions?

Якщо у вас є запитання, відкрийте Issue на GitHub.

**Дякуємо за внесок! 🙏**

