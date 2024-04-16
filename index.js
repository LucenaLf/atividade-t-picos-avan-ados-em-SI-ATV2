const express = require('express');
const bodyParser = require('body-parser');
const quizBD = require('./quiz_bd');
const quizPOO = require('./quiz_poo');
const quizHTMLCSSJS = require('./quiz_html_css_js');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Configurando o Express para servir arquivos estáticos
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Página Inicial' });
});

app.get('/quiz_bd', (req, res) => {
    res.render('quiz', { title: 'Quiz de Banco de Dados', perguntas: quizBD });
});

app.get('/quiz_poo', (req, res) => {
    res.render('quiz', { title: 'Quiz de Programação Orientada a Objetos', perguntas: quizPOO });
});

app.get('/quiz_html_css_js', (req, res) => {
    res.render('quiz', { title: 'Quiz de HTML, CSS e JavaScript', perguntas: quizHTMLCSSJS });
});

app.post('/submit', (req, res) => {
    const respostas = req.body;
    let acertos = 0;

    // Verifica as respostas
    quizBD.forEach((pergunta, indice) => {
        if (respostas[`resposta${indice}`] === pergunta.resposta) {
            acertos++;
        }
    });

    // Envie o número de respostas corretas como resposta
    res.render('resultado', { acertos, total: quizBD.length });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});