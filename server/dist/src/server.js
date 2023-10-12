"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socket_1 = require("../socket");
const app = (0, express_1.default)();
const PORT = 3000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.get("/", (req, res) => {
    res.json({ user: "Tamjid", age: 12 });
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
(0, socket_1.listen)(io);
//# sourceMappingURL=server.js.map