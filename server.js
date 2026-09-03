const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// این خط باعث می‌شود فایل‌های HTML, CSS, JS در دسترس باشند
app.use(express.static(__dirname));

// وقتی کاربری به سرور وصل می‌شود
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// اجرای سرور
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
