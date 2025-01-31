# CollabCode 

CoDev is a powerful, real-time collaborative code editor designed for seamless project development. It enables developers to create and manage files, invite team members, and work together in a dynamic coding environment.

## 🚀 Features

- **Real-time Collaboration**: Multiple developers can work simultaneously on the same project with instant updates.
- **Project Management**: Easily create and organize projects, files, and folders.
- **Team Invitations**: Invite fellow developers to join your projects effortlessly.
- **Live Activity Tracking**: Monitor who joins, leaves, or is currently editing in real-time.
- **Code Execution**: Run your code and receive instant output or error feedback.
- **Multi-language Support**: Write and execute code in JavaScript, TypeScript, C, C++, Java, Python, and Go.

## ⚠️ Deployment Note

The deployed version supports, JavaScript/TypeScript code execution only. Other languages (C, C++, Java, Python, Go) require Docker, which is not available on the current hosting platform. These languages will work on local installations with Docker.

## 🎥 Demo

** Get Started **

https://github.com/user-attachments/assets/d1f28a03-1e03-4352-a6ea-e0cc5bb530f8

1. **Create a Project**
   [View Demo](https://github.com/Saumya40-codes/CoDev/assets/115284013/4fd9487c-2fe7-46a7-8dc3-42957d2abeab)

2. **Create Multiple Files**
   [View Demo](https://github.com/Saumya40-codes/CoDev/assets/115284013/76cb64b4-14f3-41e7-bbf6-8d2e25e0b2be)

3. **Collaborate with Other Developers**
   [View Demo](https://github.com/Saumya40-codes/CoDev/assets/115284013/2b9713e2-3914-41bf-b4bf-adb655060ec5)

4. **Collaborative Work in Action**
   [View Demo](https://github.com/Saumya40-codes/CoDev/assets/115284013/43cfbfca-b935-4e4f-ba64-1e17059c742c)

5. **Code Execution (JavaScript and Python)**
   [View Demo](https://github.com/Saumya40-codes/CoDev/assets/115284013/ec6abdf3-e77f-40ec-9adb-2e0c28bfa9af)

## 🛠️ Tech Stack

- **Frontend**: Next.js with TypeScript
- **State Management**: Redux Toolkit, React-Redux
- **Backend**: Node.js
- **Database**: MySQL with Prisma ORM
- **Caching**: Redis
- **Real-time Communication**: Socket.io
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js (v14 or later)
- MySQL
- Redis
- Docker (for local execution of non-JS/TS languages)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Saumya40-codes/CoDev.git -b local
   cd CoDev

   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Set up environment variables** Create a .env file in the root directory with the following:

   ```bash
    DATABASE_URL=mysql://username:password@localhost:3306/database_name
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    REDIS_HOST=your_redis_host
    REDIS_PORT=your_redis_port
    REDIS_PASSWORD=your_redis_password
    HOST_ENV=dev
    ENDPOINT=http://localhost:5000

   ```

4. **Run Prisma migrations**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init --create-only
   npx prisma migrate deploy

   ```

5. **Start the development server**

   ```bash
   npm run dev

   ```

6. Open `http://localhost:3000` in your browser.

## Running server 💻

1. ```bash
   cd server

   ```

2. ```bash
   npm install

   ```

3. ```bash
   NEXT_API_ENDPOINT=http://localhost:3000/api #(might be different if you changed client endpoint)

   ```

4. ```bash
   npm run dev
   ```
