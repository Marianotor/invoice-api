import express from "express";
import morgan from "morgan";

import invoiceRoutes from "./routes/invoice.routes";
import productRoutes from "./routes/product.routes";
import clientRoutes from "./routes/client.routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", invoiceRoutes);
app.use("/api", productRoutes);
app.use("/api", clientRoutes);

export default app;
