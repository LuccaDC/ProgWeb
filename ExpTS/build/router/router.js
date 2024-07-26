"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lorem_ipsum_1 = require("lorem-ipsum");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello world!");
});
router.get("/lorem", (req, res) => {
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
});
router.get("/lorem/:parag", (req, res) => {
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
});
exports.default = router;
