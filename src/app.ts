import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { redirectToOriginalUrl, shortenUrl } from "./controllers/url.controller";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.post("/shorten", shortenUrl);

app.get("*", redirectToOriginalUrl);

export default app;
