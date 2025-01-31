import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import { exec, execSync } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import { languageConfigs } from './controllers/codeConfig';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3000','https://co-dev-sigma.vercel.app'],
    credentials: true
}));
dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://co-dev-sigma.vercel.app'],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    }
});

const NEXT_API_ENDPOINT = process.env.NEXT_API_ENDPOINT || 'http://localhost:3000/api';

io.on('connection', (socket) => {

    socket.on('join-project', (projectId:string, userId: string) => {
        socket.join(projectId);
        socket.handshake.query = { projectId, userId};
        socket.broadcast.to(projectId).emit('user-joined');
    })

    socket.on('project-state', (data) => {
        io.in(data.projectId).emit('project-state', data);
    });

    socket.on('new-file', (projectId: string) => {
        socket.broadcast.to(projectId).emit('new-file');
    })

    socket.on('code-changed', (data) => {
        io.in(data.projectId).emit('code-changed', data);
    });

    socket.on('code-saved', (data) => {
        io.in(data.projectId).emit('code-saved', data);
    });

    socket.on('leave-project', (projectId, userId ) => {

        const removeParticipant = async () => {
            await fetch(`${NEXT_API_ENDPOINT}/projects/removeParticipant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectId,
                    userId
                }
            )});
        }

        removeParticipant();
        socket.leave(projectId)
        socket.to(projectId).emit('user-left', userId)
    });

    socket.on('disconnect', () => {
        socket.disconnect();
    });
});

app.post('/execute', (req, res) => {
    try {
        const { code, lang } = req.body;
    
        if (!(lang in languageConfigs)) {
            return res.status(400).json({ error: 'Language not supported' });
        }
    
        const { ext, cmd } = languageConfigs[lang as keyof typeof languageConfigs];
        let id = uuidv4();
        
        fs.mkdirSync(`codes/${id}`);
        fs.writeFileSync(`codes/${id}/script.${ext}`, code);

        const sys = os.platform();

        let command = '';

        if(lang === 'javascript'){
            command = `node codes/${id}/script.js`; // as node is already installed in the local for application to run
        }
        else{
            let filepath = '';

            if(sys === 'win32'){
                filepath = `%cd%/codes/${id}`
            }
            else{
                filepath = `$(pwd)/codes/${id}`
            }

            const filename = `script.${ext}`;
        
            command = `docker run --rm -v ${filepath}:/app/code saumyashah40/codev:v2 ${cmd} /app/code/${filename}`;
        }
    
        exec(command, (error, stdout, stderr) => {
        fs.rm(`codes/${id}`, { recursive: true }, (err) => {
            if (err) {
                console.error(err);
            }
        });

        if (error) {
            return res.status(200).json({ output: error.message });
        }
        if (stderr) {
            return res.status(200).json({ output: stderr });
        }
            return res.status(200).json({ output: stdout });
        });
    
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    });

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port 5000`);
});
