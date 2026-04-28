import http from 'node:http'
import express from 'express';
import path from 'node:path';
import {Server, Socket} from 'socket.io'

async function main(){
    const app = express();
    const server = http.createServer(app);

    const io = new Server();
    io.attach(server);
    ///socket io handler
    io.on('connection' ,(socket)=>{
        console.log(`socket connected`, {id: socket.id});

    socket.on('client:checkbox:change', (data) =>{
        console.log(`[Socket: ${socket.id}]: client:checkbox:change`, data);
        io.emit('server:checkbox:change', data);
    });
    });

    //express
    const PORT =process.env.PORT ?? 8000;

    app.use(express.static(path.resolve('./public')));

    app.get('/health',(req,res)=> res.json({healthy: true}));


  server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
  })
}

main();