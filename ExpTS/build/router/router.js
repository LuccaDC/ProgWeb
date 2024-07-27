"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = __importDefault(require("../controllers/main"));
const major_1 = __importDefault(require("../controllers/major"));
const auth_1 = __importDefault(require("../controllers/auth"));
const checkAuth_1 = require("../middlewares/checkAuth");
const router = (0, express_1.Router)();
// Main Controller
router.get("/", main_1.default.index);
router.get("/lorem", main_1.default.lorem);
router.get("/lorem/:parag", main_1.default.loremParagraph);
router.get('/hb1', main_1.default.hb1);
router.get('/hb2', main_1.default.hb2);
router.get('/hb3', main_1.default.hb3);
router.get('/hb4', main_1.default.hb4);
// Major Contoller
router.get('/major', checkAuth_1.checkAuth, major_1.default.index);
router.get('/major/read/:id', checkAuth_1.checkAuth, major_1.default.read);
router.get('/major/create', checkAuth_1.checkAuth, major_1.default.create);
router.post('/major/create', checkAuth_1.checkAuth, major_1.default.create);
router.get('/major/update/:id', checkAuth_1.checkAuth, major_1.default.update);
router.post('/major/update/:id', checkAuth_1.checkAuth, major_1.default.update);
router.post('/major/remove/:id', checkAuth_1.checkAuth, major_1.default.remove);
// Cookie & Session
router.get('/create-cookie', main_1.default.createCookie);
router.get('/clear-cookie', main_1.default.clearCookie);
router.get('/uuid', main_1.default.uuid);
// Auth Controller
router.get("/auth/signup", auth_1.default.signup);
router.post("/auth/signup", auth_1.default.signup);
router.get("/auth/login", auth_1.default.login);
router.post("/auth/login", auth_1.default.login);
router.get("/auth/logout", checkAuth_1.checkAuth, auth_1.default.logout);
exports.default = router;
