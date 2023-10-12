"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
function listen(io) {
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
}
exports.listen = listen;
//# sourceMappingURL=socket.js.map