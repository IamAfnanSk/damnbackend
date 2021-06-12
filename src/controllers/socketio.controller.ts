import http from "http";
import { Socket, Server } from "socket.io";

export class SocketController {
  socketWorkIt(server: http.Server): void {
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    console.log("Socket IO is waiting for client");

    io.on("connection", (socket: Socket) => {
      console.log(`Client: ${socket.id} connected`);

      socket.on("disconnect", (reason) => {
        console.log(`Client: ${socket.id} disconnected because of ${reason}`);
      });

      socket.on("request", async (input: string) => {
        if (input === "create") {
          // TODO: Create docket container and reply
          setTimeout(() => {
            socket.emit(
              "response",
              JSON.stringify({
                appDomain: "http://app.damner.dns.codedamn.afnanshaikh.com",
                apiDomain: "http://damner.dns.codedamn.afnanshaikh.com",
              })
            );
          }, 1000);
        }
      });
    });
  }
}
