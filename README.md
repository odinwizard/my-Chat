# myChat

A simple chat application backend built with Express, TypeScript, PostgreSQL, and Prisma ORM. This project uses `pnpm` for package management.

---

## 🚀 Features
- Express.js REST API
- TypeScript support
- PostgreSQL database
- Prisma ORM
- Environment variable support with `.env`

---

## 🛠️ Project Setup

### 1. Install pnpm (if not already installed)
```bash
npm install -g pnpm
```

### 2. Clone the repository and navigate to the project directory
```bash
git clone <your-repo-url>
cd my-Chat
```

### 3. Initialize the project and install dependencies
```bash
pnpm init
pnpm add express cors dotenv pg
```

### 4. Install TypeScript and development dependencies
```bash
pnpm add -D typescript ts-node-dev @types/node @types/express
```

### 5. Initialize TypeScript config
```bash
npx tsc --init
```

---

## 🗄️ Database & Prisma Setup

### 1. Install Prisma and client
```bash
pnpm add prisma --save-dev
pnpm add @prisma/client
```

### 2. Initialize Prisma
```bash
npx prisma init
```

### 3. Configure your database
- Create a PostgreSQL database (e.g., `appname`).
- Update the `.env` file with your database URL:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/appname?schema=public"
```

### 4. Generate Prisma client
```bash
npx prisma generate
```

---

## 📁 Project Structure
```
my-Chat/
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── prisma/
│   └── schema.prisma
├── src/
│   ├── prisma.ts
│   └── server.ts
└── ...
```

---

## 📝 Example Code

### `src/prisma.ts`
```typescript
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

export default prisma;
```

### `src/server.ts`
```typescript
import cors from "cors";
import express from "express";
import prisma from "./prisma";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", async (_req, res ) => {
    try {
        const dbConnection = await prisma.$queryRaw`SELECT NOW()`;
        res.status(200).json({
            message: "server is connected",
            data: dbConnection
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:`db connection failed with this error : ${error}`
        })
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
})
```

---

## 🏃 Running the Project

Start the development server:
```bash
pnpm dev
```

---

## 🐞 Troubleshooting
- Most errors will be TypeScript-related. Read the error messages and fix accordingly.
- Ensure your PostgreSQL server is running and the `DATABASE_URL` in `.env` is correct.

---

## 📄 License
MIT
