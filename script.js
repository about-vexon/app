// ====== تغییر تم ======
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// بررسی تم ذخیره شده
if (localStorage.getItem('vexapp-theme') === 'light') {
    body.classList.remove('dark');
    body.classList.add('light');
    themeToggle.textContent = '🌙 Dark Mode';
} else {
    body.classList.add('dark');
    themeToggle.textContent = '☀️ Light Mode';
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        themeToggle.textContent = '🌙 Dark Mode';
        localStorage.setItem('vexapp-theme', 'light');
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        themeToggle.textContent = '☀️ Light Mode';
        localStorage.setItem('vexapp-theme', 'dark');
    }
});

// ====== تم ======
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (localStorage.getItem('vexapp-theme') === 'light') {
    body.classList.remove('dark');
    body.classList.add('light');
    themeToggle.textContent = '🌙 Dark Mode';
} else {
    body.classList.add('dark');
    themeToggle.textContent = '☀️ Light Mode';
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        themeToggle.textContent = '🌙 Dark Mode';
        localStorage.setItem('vexapp-theme', 'light');
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        themeToggle.textContent = '☀️ Light Mode';
        localStorage.setItem('vexapp-theme', 'dark');
    }
});

// ====== چت با Socket.io ======
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// اتصال به سرور
const socket = io(); // این به آدرس سرور متصل می‌شود

// وقتی پیامی از سرور می‌آید
socket.on('chat message', (msg) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'other');
    messageDiv.textContent = msg;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// ارسال پیام
function sendMessage() {
    const text = messageInput.value.trim();
    if (text === '') return;
    
    // نمایش پیام روی صفحه خودمان
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'self');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // ارسال به سرور
    socket.emit('chat message', text);
    
    messageInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});