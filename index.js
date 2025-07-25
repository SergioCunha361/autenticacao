const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { sequelize } = require('./src/config/configDB');
const authRoute = require('./src/modulos/autenticacao/routes/autenticacao.route')
const alunoRoute = require('./src/modulos/aluno/routes/aluno.route')




// Configuração do banco de dados
dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // frontend React
    credentials: true               // permite enviar cookies (como refreshToken)
}));


app.use(cookieParser());
app.use(express.json());

// rotas de aluno
// http:localhost:3001/api/cadastrar
app.use('/api/', alunoRoute)

// rotas de autenticação
// http:localhost:3001/api/login
// http:localhost:3001/api/logout
// http:localhost:3001/api/refresh-token
app.use('/api/', authRoute)

const PORTA = process.env.PORTA;
app.listen(PORTA, async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        // await sequelize.sync({ force: true, alter: true }); // apaga toda vez o banco de dados quando inicializa
        await sequelize.sync({ force: false, alter: false });//não apaga o banco de dados ao inicializar 
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (err) {
        console.error('Erro ao conectar ou sincronizar o banco de dados:', err);
    }
    console.log(`Servidor rodando na porta ${PORTA}`);
});