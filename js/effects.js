;(function() {

// ==================== 主题切换 ====================
function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
        document.body.classList.add('light-mode');
        document.getElementById('themeToggle').textContent = '☀️';
    }
}
window.toggleTheme = function() {
    const isLight = document.body.classList.toggle('light-mode');
    document.getElementById('themeToggle').textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
};
initTheme();

// ==================== 星星粒子背景 ====================
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 250;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function initStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            baseAlpha: Math.random() * 0.7 + 0.3,
            speed: Math.random() * 0.02 + 0.005,
            phase: Math.random() * Math.PI * 2
        });
    }
}
initStars();

function drawStars(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
        const alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
    }
    requestAnimationFrame(drawStars);
}
requestAnimationFrame(drawStars);

// ==================== 打字机效果 ====================
function typewriter() {
    const el = document.querySelector('.subtitle');
    const text = 'Hello World!';
    let i = 0;
    el.textContent = '';
    el.classList.add('typing');

    function type() {
        if (i < text.length) {
            el.textContent += text[i];
            i++;
            setTimeout(type, 80 + Math.random() * 40);
        } else {
            el.classList.remove('typing');
        }
    }
    type();
}
document.addEventListener('DOMContentLoaded', typewriter);

// ==================== 访问计数 ====================
const VISIT_KEY = 'clownier.github.io';
(async function() {
    const el = document.getElementById('visitCount');
    try {
        const res = await fetch(`https://api.countapi.xyz/hit/${VISIT_KEY}/visits`);
        const data = await res.json();
        el.textContent = `👁️ 访问次数: ${data.value}`;
    } catch {
        try {
            const res = await fetch(`https://api.countapi.xyz/get/${VISIT_KEY}/visits`);
            const data = await res.json();
            el.textContent = `👁️ 访问次数: ${data.value}`;
        } catch {
            el.textContent = '';
        }
    }
})();

// ==================== 天气挂件 ====================
(async function() {
    const iconEl = document.getElementById('weatherIcon');
    const tempEl = document.getElementById('weatherTemp');
    const descEl = document.getElementById('weatherDesc');

    try {
        const geoRes = await fetch('https://ipapi.co/json/');
        const geo = await geoRes.json();
        if (!geo.latitude || !geo.longitude) return;

        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${geo.latitude}&longitude=${geo.longitude}&current=temperature_2m,weather_code&timezone=auto`
        );
        const weather = await weatherRes.json();
        if (!weather.current) return;

        const temp = Math.round(weather.current.temperature_2m);
        const code = weather.current.weather_code;

        const weatherMap = {
            0: ['☀️', '晴'], 1: ['🌤️', '少云'], 2: ['⛅', '多云'], 3: ['☁️', '阴'],
            45: ['🌫️', '雾'], 48: ['🌫️', '雾凇'],
            51: ['🌦️', '小毛毛雨'], 53: ['🌦️', '毛毛雨'], 55: ['🌧️', '大毛毛雨'],
            56: ['🌧️', '冻毛毛雨'], 57: ['🌧️', '冻毛毛雨'],
            61: ['🌧️', '小雨'], 63: ['🌧️', '中雨'], 65: ['🌧️', '大雨'],
            66: ['🌧️', '冻雨'], 67: ['🌧️', '冻雨'],
            71: ['🌨️', '小雪'], 73: ['🌨️', '中雪'], 75: ['🌨️', '大雪'],
            77: ['❄️', '雪粒'],
            80: ['🌦️', '阵雨'], 81: ['🌧️', '中阵雨'], 82: ['🌧️', '大阵雨'],
            85: ['🌨️', '小阵雪'], 86: ['🌨️', '大阵雪'],
            95: ['⛈️', '雷暴'], 96: ['⛈️', '雷暴+冰雹'], 99: ['⛈️', '雷暴+冰雹']
        };
        const [icon, desc] = weatherMap[code] || ['🌡️', '未知'];
        iconEl.textContent = icon;
        tempEl.textContent = `${temp}°C`;
        descEl.textContent = desc;

        const weatherEl = document.getElementById('weather');
        weatherEl.style.display = 'flex';
    } catch {}
})();

})();