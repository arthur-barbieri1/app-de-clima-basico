// Configuração
const apiKey = "e67c776df83402a95722f1d8168e8cce";

// Elementos DOM
const elements = {
    button: document.getElementById("search"),
    locationBtn: document.getElementById("location-btn"),
    effectBtns: document.querySelectorAll('.effect-btn'),
    effectsContainer: document.getElementById('effects-container'),
    weatherBackground: document.querySelector('.weather-background'),
    autocompleteList: document.getElementById('autocomplete-list'),
    cityInput: document.getElementById('city'),
    result: document.getElementById("result")
};

// Estado do app
let currentEffect = null;
let effectInterval = null;
let cloudIntervals = [];

// ===== INICIALIZAÇÃO =====
function init() {
    setupEventListeners();
    console.log("🚀 App de Clima com Nuvens Corrigidas inicializado!");
}

// ===== CONFIGURAÇÃO DE EVENTOS =====
function setupEventListeners() {
    // Botão de busca
    elements.button.addEventListener("click", handleSearch);

    // Botão de localização
    elements.locationBtn.addEventListener("click", handleLocation);

    // Botões de efeito
    elements.effectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const effect = e.currentTarget.getAttribute('data-effect');
            activateEffect(effect);
        });
    });

    // Buscar com Enter
    elements.cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    });

    // Autocomplete
    elements.cityInput.addEventListener('input', handleAutocompleteInput);

    // Clique no autocomplete
    elements.autocompleteList.addEventListener('click', handleAutocompleteClick);

    // Clique fora para fechar autocomplete
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            hideAutocomplete();
        }
    });
}

// ===== HANDLERS PRINCIPAIS =====
function handleSearch() {
    const city = elements.cityInput.value.trim();
    if (!city) {
        showError("Por favor, digite o nome de uma cidade!");
        return;
    }
    getWeather(city);
}

function handleLocation() {
    if (!navigator.geolocation) {
        showError("Geolocalização não é suportada pelo seu navegador!");
        return;
    }

    elements.locationBtn.innerHTML = '<span class="btn-icon">📍</span><span class="btn-text">Detectando...</span>';
    elements.locationBtn.classList.add("loading");

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        },
        (error) => {
            showError("Não foi possível obter sua localização!");
            elements.locationBtn.innerHTML = '<span class="btn-icon">📍</span><span class="btn-text">Minha Localização</span>';
            elements.locationBtn.classList.remove("loading");
        }
    );
}

// ===== SISTEMA DE NUVENS CORRIGIDO =====
function createCloud() {
    const cloud = document.createElement('div');

    // Tamanhos aleatórios
    const sizes = ['small', 'medium', 'large'];
    const size = sizes[Math.floor(Math.random() * sizes.length)];

    // Velocidades aleatórias
    const speeds = ['slow', 'normal', 'fast'];
    const speed = speeds[Math.floor(Math.random() * speeds.length)];

    // Direção aleatória (50% para cada lado)
    const direction = Math.random() > 0.5 ? 'left-to-right' : 'right-to-left';

    cloud.className = `cloud ${size} ${speed} ${direction}`;

    // Posição vertical aleatória
    const top = 5 + Math.random() * 70; // 5% a 75% do topo

    // Configurações baseadas na direção
    let delay, duration;

    if (direction === 'left-to-right') {
        // Começa da esquerda (fora da tela)
        cloud.style.left = '0px';
        cloud.style.transform = 'translateX(-200px)';
    } else {
        // Começa da direita (fora da tela)
        cloud.style.right = '0px';
        cloud.style.transform = 'translateX(200px)';
    }

    // Configurações de animação
    delay = Math.random() * 20; // Delay aleatório até 20s
    duration = 30 + Math.random() * 40; // Duração entre 30-70s

    cloud.style.top = top + '%';
    cloud.style.animationDelay = delay + 's';
    cloud.style.animationDuration = duration + 's';
    cloud.style.opacity = '0'; // Começa invisível

    elements.effectsContainer.appendChild(cloud);

    // Forçar reflow para animação funcionar
    setTimeout(() => {
        cloud.style.opacity = '1';
    }, 10);

    // Remover após animação completa
    const removeTime = (delay + duration) * 1000;
    setTimeout(() => {
        if (cloud.parentNode) {
            cloud.parentNode.removeChild(cloud);
        }
    }, removeTime);
}

function createSunnyEffect() {
    // Menos nuvens para sol
    for (let i = 0; i < 3; i++) createCloud();

    // Adicionar nuvens continuamente
    const cloudInterval = setInterval(() => {
        if (currentEffect === 'sunny') {
            createCloud();
        } else {
            clearInterval(cloudInterval);
        }
    }, 8000); // Nova nuvem a cada 8 segundos

    cloudIntervals.push(cloudInterval);
}

function createCloudyEffect() {
    // Mais nuvens para nublado
    for (let i = 0; i < 8; i++) createCloud();

    // Adicionar nuvens continuamente
    const cloudInterval = setInterval(() => {
        if (currentEffect === 'cloudy') {
            createCloud();
        } else {
            clearInterval(cloudInterval);
        }
    }, 3000); // Nova nuvem a cada 3 segundos

    cloudIntervals.push(cloudInterval);
}

// ===== SISTEMA DE EFEITOS VISUAIS =====
function activateEffect(effectType) {
    console.log(`🎭 Ativando efeito: ${effectType}`);

    // Limpar efeito anterior
    clearEffects();
    currentEffect = effectType;

    // Aplicar background
    elements.weatherBackground.className = 'weather-background';
    elements.weatherBackground.classList.add(`${effectType}-effect`);

    // Criar efeitos específicos
    switch (effectType) {
        case 'sunny':
            createSunnyEffect();
            showTestMessage("☀️ Dia Ensolarado", "Céu claro com algumas nuvens", 32, 34, 3, 40);
            break;
        case 'cloudy':
            createCloudyEffect();
            showTestMessage("☁️ Céu Nublado", "Muitas nuvens cobrindo o céu", 18, 17, 8, 65);
            break;
        case 'rain':
            createRainEffect();
            showTestMessage("🌧️ Chuva", "Chuva moderada", 15, 14, 12, 85);
            break;
        case 'storm':
            createStormEffect();
            showTestMessage("⚡ Tempestade", "Tempestade com raios", 16, 14, 25, 90);
            break;
        case 'snow':
            createSnowEffect();
            showTestMessage("❄️ Neve", "Neve caindo", -2, -5, 15, 80);
            break;
        case 'night':
            createNightEffect();
            showTestMessage("🌙 Noite", "Céu noturno estrelado", 12, 11, 5, 70);
            break;
        case 'fog':
            createFogEffect();
            showTestMessage("🌫️ Neblina", "Neblina densa", 10, 9, 2, 95);
            break;
        case 'wind':
            createWindEffect();
            showTestMessage("💨 Ventania", "Ventos fortes", 20, 18, 30, 50);
            break;
    }
}

function clearEffects() {
    elements.effectsContainer.innerHTML = '';

    // Limpar intervals principais
    if (effectInterval) {
        clearInterval(effectInterval);
        effectInterval = null;
    }

    // Limpar todos os intervals de nuvens
    cloudIntervals.forEach(interval => clearInterval(interval));
    cloudIntervals = [];
}

// ===== OUTROS EFEITOS VISUAIS =====
function createRainEffect() {
    for (let i = 0; i < 80; i++) createRaindrop();
}

function createStormEffect() {
    for (let i = 0; i < 120; i++) createRaindrop();

    effectInterval = setInterval(() => {
        if (Math.random() < 0.3) createLightning();
    }, 2000);
}

function createSnowEffect() {
    for (let i = 0; i < 60; i++) createSnowflake();
}

function createNightEffect() {
    // Efeito de estrelas já está no CSS
}

function createFogEffect() {
    for (let i = 0; i < 5; i++) createFogLayer(i);
}

function createWindEffect() {
    for (let i = 0; i < 20; i++) createLeaf();
}

// ===== ELEMENTOS DOS EFEITOS =====
function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';

    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 1 + Math.random() * 1.5;

    raindrop.style.left = left + '%';
    raindrop.style.animationDelay = delay + 's';
    raindrop.style.animationDuration = duration + 's';
    raindrop.style.opacity = 0.3 + Math.random() * 0.4;

    elements.effectsContainer.appendChild(raindrop);
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';

    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 8 + Math.random() * 10;

    snowflake.style.left = left + '%';
    snowflake.style.animationDelay = delay + 's';
    snowflake.style.animationDuration = duration + 's';

    elements.effectsContainer.appendChild(snowflake);
}

function createLightning() {
    const lightning = document.createElement('div');
    lightning.className = 'lightning';

    const left = 20 + Math.random() * 60;
    lightning.style.left = left + '%';

    elements.effectsContainer.appendChild(lightning);

    setTimeout(() => {
        if (lightning.parentNode) {
            lightning.parentNode.removeChild(lightning);
        }
    }, 500);
}

function createFogLayer(index) {
    const fog = document.createElement('div');
    fog.className = 'fog';

    const top = 10 + index * 15;
    const delay = index * 5;
    const duration = 40 + index * 10;

    fog.style.top = top + '%';
    fog.style.animationDelay = delay + 's';
    fog.style.animationDuration = duration + 's';
    fog.style.opacity = 0.1 + index * 0.05;

    elements.effectsContainer.appendChild(fog);
}

function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';

    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 8 + Math.random() * 8;

    leaf.style.left = left + '%';
    leaf.style.animationDelay = delay + 's';
    leaf.style.animationDuration = duration + 's';

    elements.effectsContainer.appendChild(leaf);
}

// ===== SISTEMA DE BUSCA =====
async function getWeather(city) {
    elements.result.innerHTML = "<p>🌍 Buscando cidade...</p>";
    elements.button.classList.add("loading");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
        );
        const data = await response.json();

        if (data.cod === 200) {
            showWeather(data);
        } else {
            showError("Cidade não encontrada!");
        }
    } catch (error) {
        showError("Erro ao buscar dados da cidade");
    } finally {
        elements.button.classList.remove("loading");
    }
}

async function getWeatherByCoords(lat, lon) {
    elements.result.innerHTML = "<p>📍 Buscando localização...</p>";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
        );
        const data = await response.json();

        if (data.cod === 200) {
            showWeather(data);
            elements.cityInput.value = data.name;
        } else {
            showError("Erro ao obter dados da localização");
        }
    } catch (error) {
        showError("Erro ao buscar localização");
    } finally {
        elements.locationBtn.innerHTML = '<span class="btn-icon">📍</span><span class="btn-text">Minha Localização</span>';
        elements.locationBtn.classList.remove("loading");
    }
}

function showWeather(data) {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    const weatherMain = data.weather[0].main.toLowerCase();
    const humidity = data.main.humidity;
    const feelsLike = Math.round(data.main.feels_like);

    // Ativar efeito baseado no clima real
    let effect = getEffectFromWeather(weatherMain);
    activateEffect(effect);

    elements.result.innerHTML = `
        <h2>${getWeatherEmoji(weatherMain)} ${cityName}</h2>
        <p>🌡️ Temperatura: ${temperature}°C</p>
        <p>🤔 Sensação: ${feelsLike}°C</p>
        <p>💨 Vento: ${windSpeed} m/s</p>
        <p>💧 Umidade: ${humidity}%</p>
        <p>📝 ${weatherDescription}</p>
    `;
}

// ===== AUTCOMPLETE =====
let debounceTimer;

function handleAutocompleteInput(e) {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();

    if (query.length < 2) {
        hideAutocomplete();
        return;
    }

    debounceTimer = setTimeout(() => {
        fetchAutocomplete(query);
    }, 300);
}

function handleAutocompleteClick(e) {
    if (e.target.classList.contains('autocomplete-item')) {
        const cityName = e.target.getAttribute('data-city');
        elements.cityInput.value = cityName;
        hideAutocomplete();
        getWeather(cityName);
    }
}

async function fetchAutocomplete(query) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
        );
        const data = await response.json();
        showAutocomplete(data);
    } catch (error) {
        console.error('Erro no autocomplete:', error);
    }
}

function showAutocomplete(cities) {
    if (!cities || cities.length === 0) {
        hideAutocomplete();
        return;
    }

    elements.autocompleteList.innerHTML = '';
    cities.forEach(city => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.setAttribute('data-city', `${city.name}, ${city.country}`);
        item.innerHTML = `
            ${city.name}, ${city.state || city.country}
            <span style="opacity: 0.7; font-size: 12px; float: right;">${city.country}</span>
        `;
        elements.autocompleteList.appendChild(item);
    });

    elements.autocompleteList.style.display = 'block';
}

function hideAutocomplete() {
    elements.autocompleteList.style.display = 'none';
}

// ===== FUNÇÕES AUXILIARES =====
function showTestMessage(title, description, temp, feelsLike, wind, humidity) {
    elements.result.innerHTML = `
        <h2>${title}</h2>
        <p>🌡️ Temperatura: ${temp}°C</p>
        <p>🤔 Sensação: ${feelsLike}°C</p>
        <p>💨 Vento: ${wind} km/h</p>
        <p>💧 Umidade: ${humidity}%</p>
        <p>📝 ${description}</p>
        <p style="text-align: center; background: rgba(255,255,255,0.15); border-radius: 8px; padding: 8px; margin-top: 10px;">
            <strong>🎭 Modo Demonstração</strong>
        </p>
    `;
}

function showError(message) {
    elements.result.innerHTML = `<p>❌ ${message}</p>`;
}

function getEffectFromWeather(weatherType) {
    const effectMap = {
        'clear': 'sunny',
        'clouds': 'cloudy',
        'rain': 'rain',
        'drizzle': 'rain',
        'thunderstorm': 'storm',
        'snow': 'snow',
        'mist': 'fog',
        'fog': 'fog',
        'haze': 'fog'
    };

    return effectMap[weatherType] || 'sunny';
}

function getWeatherEmoji(weatherType) {
    const emojis = {
        'clear': '☀️',
        'clouds': '☁️',
        'rain': '🌧️',
        'drizzle': '🌦️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️',
        'fog': '🌫️'
    };

    return emojis[weatherType] || '🌍';
}

// ===== INICIALIZAR APP =====
document.addEventListener('DOMContentLoaded', init);