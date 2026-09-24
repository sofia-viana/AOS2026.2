import express from "express";
import { listarUsuarios } from "../controller/usuariocontroller.js";
import { verificarNome } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/usuarios", verificarNome, listarUsuarios);

export default router;