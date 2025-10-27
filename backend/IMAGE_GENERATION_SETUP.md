# Image Generation Setup Guide

## Огляд

Система підтримує генерацію зображень через два основні способи:

1. **Google Imagen 3** (через Vertex AI) - Рекомендовано для production
2. **OpenAI DALL-E 3** - Альтернативний варіант

## Налаштування Google Imagen 3

### Крок 1: Активуйте Vertex AI API

```bash
# Встановіть Google Cloud SDK
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Активуйте Vertex AI API
gcloud services enable aiplatform.googleapis.com
```

### Крок 2: Оновіть requirements.txt

```txt
google-cloud-aiplatform
```

### Крок 3: Оновіть backend/main.py

Додайте імпорт та функцію:

```python
from google.cloud import aiplatform

def generate_image_with_imagen(prompt: str) -> str:
    """Generate image using Imagen 3 API"""
    try:
        aiplatform.init(project="YOUR_PROJECT_ID", location="us-central1")
        
        # Використовуємо Imagen 3
        from vertexai.preview.vision_models import ImageGenerationModel
        
        model = ImageGenerationModel.from_pretrained("imagegeneration@006")
        
        response = model.generate_images(
            prompt=prompt,
            number_of_images=1,
            aspect_ratio="1:1",
            safety_filter_level="block_some",
            person_generation="allow_adult"
        )
        
        # Повертаємо URL або base64
        image = response[0]
        return image._image_bytes
        
    except Exception as e:
        print(f"Error generating image: {e}")
        return None
```

## Налаштування OpenAI DALL-E 3

### Крок 1: Додайте API ключ до .env

```env
OPENAI_API_KEY=sk-your-api-key-here
```

### Крок 2: Оновіть requirements.txt

```txt
openai
```

### Крок 3: Оновіть backend/main.py

```python
import openai

def generate_image_with_imagen(prompt: str) -> str:
    """Generate image using DALL-E 3 API"""
    try:
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
        response = openai.Image.create(
            model="dall-e-3",
            prompt=prompt,
            n=1,
            size="1024x1024",
            quality="standard"
        )
        
        return response['data'][0]['url']
        
    except Exception as e:
        print(f"Error generating image: {e}")
        return None
```

## Вартість та Обмеження

### Google Imagen 3
- Перші 1000 запитів: безкоштовно
- Після: $0.02 за зображення (1024x1024)
- Час генерації: ~5-15 секунд

### OpenAI DALL-E 3
- $0.04 за стандартне зображення (1024x1024)
- $0.08 за HD зображення (1024x1024 HD)
- Час генерації: ~10-20 секунд

## MVP Рекомендації

Для MVP проектів:

1. **Без генерації зображень**: Залиште `image_url = None` і використовуйте лише `image_prompt`
2. **З генерацією**: Встановіть ліміт на 3-5 зображень за кампанію для економії коштів
3. **Кешування**: Зберігайте згенеровані зображення для повторного використання

## Приклад використання

Система автоматично викличе `generate_image_with_imagen()` для кожного посту:

```python
# У backend/main.py
post_data = PostOutput.model_validate_json(response_post.text)

# Генерація зображення
image_url = generate_image_with_imagen(post_data.image_prompt)

# Оновлення посту з URL зображення
if image_url:
    post_data.image_url = image_url
```

## Troubleshooting

### Помилка: "API key not found"
- Перевірте наявність API ключа в `.env`
- Переконайтеся, що `.env` завантажується через `load_dotenv()`

### Помилка: "Quota exceeded"
- Перевірте ліміти вашого тарифного плану
- Додайте логіку retry з exponential backoff
- Встановіть ліміти на кількість зображень за запит

### Зображення не відображаються
- Перевірте `image_url` у response від API
- Переконайтеся, що URL валідний та доступний
- Додайте fallback UI для випадку, коли зображення недоступне
