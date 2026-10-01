import express from "express";
import userRoutes from "./src/routes/user.js";
import messageRoutes from "./src/routes/message.js";
import AppError from "./src/utils/appError.js";

const app = express();
app.use(express.json());

// Temporário: simula usuário autenticado
app.use((req, res, next) => {
  req.context = { me: { id: 1 } };
  next();
});

app.get("/", (req, res) => res.send("API no ar"));
app.use("/usuarios", userRoutes);
app.use("/messages", messageRoutes);

// Rota não encontrada
app.use((req, res, next) => {
  next(new AppError(`Rota ${req.originalUrl} não encontrada.`, 404));
});

// Middleware global de erro (sempre por último)
app.use((err, req, res, next) => {
  let statusCode = 500;
  let status = "error";
  let message = "Algo deu errado no servidor";

  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    status = "fail";
    message = err.errors.map((e) => e.message).join("; ");
  } else if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    status = "fail";
    message = "Registro duplicado: já existe um registro com esses dados.";
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
  } else {
    console.error(err);
  }

  const body = { status, message };
  if (process.env.NODE_ENV === "development") {
    body.stack = err.stack;
  }

  return res.status(statusCode).json(body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));