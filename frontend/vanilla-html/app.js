// app.js

const API_ENDPOINT = "http://127.0.0.1:8000/api/generate"; // Переконайтеся, що порт співпадає з вашим Uvicorn

document.getElementById('campaign-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // 1. Збір даних та підготовка
    const form = event.target;
    const inputData = {
        business_name: form.business_name.value,
        product_service: form.product_service.value,
        target_audience: form.target_audience.value,
        campaign_goal: form.campaign_goal.value,
        desired_tone: form.desired_tone.value,
        campaign_theme: form.campaign_theme ? form.campaign_theme.value : "",
        num_posts: parseInt(form.num_posts.value, 10)
    };
    
    // 2. Управління станом UI (Loading)
    showSection('loading-spinner');
    hideSection('input-form');
    hideSection('results');
    hideSection('error-message');

    // 3. Виклик API
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`API Error: ${response.status} - ${error.detail || 'Невідома помилка'}`);
        }

        const finalCampaignOutput = await response.json();
        
        // 4. Успіх: Відображення результатів
        renderResults(finalCampaignOutput);
        showSection('results');
        hideSection('loading-spinner');
        
    } catch (error) {
        // 5. Помилка: Відображення повідомлення про помилку
        console.error("Fetch Error:", error);
        document.getElementById('error-text').textContent = error.message || "Помилка зв'язку з сервером. Перевірте консоль.";
        showSection('error-message');
        showSection('input-form'); // Показати форму знову для повторної спроби
        hideSection('loading-spinner');
    }
});


// Функція для відображення фінальних даних
function renderResults(data) {
    // 1. Відображення стратегічного резюме
    document.getElementById('strategy-summary-text').textContent = data.strategy_summary;

    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Очистити попередні результати

    // 2. Цикл по кожному посту
    data.posts.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <h3>Пост ${index + 1}</h3>
            
            <div class="tabs">
                <button class="tab-btn active" data-platform="linkedin">LinkedIn</button>
                <button class="tab-btn" data-platform="facebook">Facebook</button>
                <button class="tab-btn" data-platform="instagram">Instagram</button>
                <button class="tab-btn" data-platform="x">X/Twitter</button>
            </div>
            
            <div class="content-display">
                <textarea class="post-text linkedin-content active" readonly>${post.linkedin_text}</textarea>
                <textarea class="post-text facebook-content" readonly>${post.facebook_text}</textarea>
                <textarea class="post-text instagram-content" readonly>${post.instagram_text}</textarea>
                <textarea class="post-text x-content" readonly>${post.x_text}</textarea>
            </div>
            
            <p><strong>Хештеги:</strong> ${post.suggested_hashtags}</p>
            <p><strong>Промпт для Зображення:</strong> <em>${post.image_prompt}</em></p>
        `;

        // Додаємо логіку перемикання вкладок
        postCard.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Знімаємо активний стан з усіх кнопок
                postCard.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Приховуємо всі текстові поля
                postCard.querySelectorAll('.post-text').forEach(textarea => textarea.classList.remove('active'));
                
                // Показуємо вибране текстове поле
                const platform = this.getAttribute('data-platform');
                postCard.querySelector(`.${platform}-content`).classList.add('active');
            });
        });

        postsContainer.appendChild(postCard);
    });
}

// Допоміжні функції для UI
function showSection(id) {
    document.getElementById(id).style.display = 'block';
}

function hideSection(id) {
    document.getElementById(id).style.display = 'none';
}
