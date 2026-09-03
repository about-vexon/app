const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // اجازه دسترسی به همه سایت‌ها (برای شروع)
        methods: ["GET", "POST"]
    }
});

// وقتی کاربری به سرور وصل می‌شود
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // وقتی پیامی ارسال می‌شود
    socket.on('chat message', (msg) => {
        // پیام را به همه (به جز خود فرستنده) پخش کن
        io.emit('chat message', msg);
    });

    // وقتی کاربر قطع می‌شود
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// اجرای سرور روی پورت 3000 (یا پورتی که هاست تعیین می‌کند)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});