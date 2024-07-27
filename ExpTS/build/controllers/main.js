"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lorem_ipsum_1 = require("lorem-ipsum");
const uuid_1 = require("uuid");
const index = (req, res) => {
    res.render("main/index");
};
const lorem = (req, res) => {
    res.send((0, lorem_ipsum_1.loremIpsum)({
        count: 1, // Number of "words", "sentences", or "paragraphs"
        format: "html", // "plain" or "html"
        paragraphLowerBound: 4, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
    }));
};
const loremParagraph = (req, res) => {
    res.send((0, lorem_ipsum_1.loremIpsum)({
        count: Number(req.params.parag), // Number of "words", "sentences", or "paragraphs"
        format: "html", // "plain" or "html"
        paragraphLowerBound: 4, // Min. number of sentences per paragraph.
        paragraphUpperBound: 7, // Max. number of sentences per paragarph.
        random: Math.random, // A PRNG function
        sentenceLowerBound: 5, // Min. number of words per sentence.
        sentenceUpperBound: 15, // Max. number of words per sentence.
        suffix: "\n", // Line ending, defaults to "\n" or "\r\n" (win32)
        units: "paragraphs", // paragraph(s), "sentence(s)", or "word(s)"
    }));
};
const hb1 = (req, res) => {
    res.render('main/hb1', {
        mensagem: 'Olá, você está aprendendo Express + HBS!',
    });
};
const hb2 = (req, res) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
    });
};
const hb3 = (req, res) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('main/hb3', { profes });
};
const hb4 = (req, res) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('main/hb4', { technologies });
};
const createCookie = (req, res) => {
    if (!('nomeCookie' in req.cookies)) {
        res.cookie('nomeCookie', 'valorCookie', { maxAge: 360000 });
        res.send('Você NUNCA passou por aqui!');
    }
    else {
        res.send('Você JÁ passou por aqui');
    }
};
const clearCookie = (req, res) => {
    res.clearCookie('nomeCookie');
    res.send('cookie apagado');
};
const uuid = (req, res) => {
    const uniqueId = (0, uuid_1.v4)();
    res.send(`UUID: ${uniqueId}`);
};
exports.default = { index, lorem, loremParagraph, hb1, hb2, hb3, hb4, createCookie, clearCookie, uuid };
