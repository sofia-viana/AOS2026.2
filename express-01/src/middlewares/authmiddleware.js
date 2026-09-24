export function verificarNome(req, res, next) {
  const nome = req.query.nome;

  if (!nome) {
    return res.status(400).json({
      mensagem: "Nome não informado"
    });
  }

  next();
}