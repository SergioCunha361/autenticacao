const express = require('express');

const router = express.Router()

const { login, refreshToken, sair } = require('../controller/autenticacao.controller')

// rota publica de login
router.post('/login', login);

// rota para sair 
router.post('/logout', sair);

// rota usada pelo navegador para atualizar o token 
router.post('/refress-token', refreshToken);

module.exports = router


