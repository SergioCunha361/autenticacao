const Aluno = require("../models/aluno.model");
const bcrypt =require('bcryptjs')
class AlunoController {
  static async cadastrar(req, res) {
    try {
      const {  nome, matricula, email, senha } = req.body;
      if (!matricula || !nome || !email || !senha) {
        return res
          .status(400)
          .json({ msg: "Todos os campos devem serem preenchidos!" });
      }
      // criptografando a senha
      const senhaCriptografada = await bcrypt.hash(senha, 15);
      await Aluno.create({ nome, matricula, email, senha: senhaCriptografada });
      res.status(200).json({ msg: 'Aluno criado com sucesso' });
    } catch (error) {
        res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!', erro: error.message})
    }
  }
  static async perfil(req, res) {
    try {
      const { matricula } = req.usuario
      const aluno = await Aluno.findOne({
        where:{ matricula},
        attributes: ['nome', 'matricula', 'email']
      });

      if (!aluno) {
        return res.status(401).json({ msg: "Não existe aluno cadastrado!" });
      }
      res.status(200).json(aluno);
    } catch (error) {
        res.status(500).json({msg: 'Erro do servidor. Tente novamente mais tarde!',erro: error.message})
    }
  }
}

module.exports = AlunoController