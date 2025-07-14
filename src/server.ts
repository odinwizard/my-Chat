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



