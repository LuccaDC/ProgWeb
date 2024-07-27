import { Router } from 'express';
import mainController from '../controllers/main';
import majorController from '../controllers/major';
import authContolller from '../controllers/auth'
import { checkAuth } from '../middlewares/checkAuth';

const router = Router();

// Main Controller

router.get("/", mainController.index);
router.get("/lorem", mainController.lorem);
router.get("/lorem/:parag", mainController.loremParagraph);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

// Major Contoller

router.get('/major', checkAuth ,majorController.index);
router.get('/major/read/:id', checkAuth ,majorController.read);
router.get('/major/create', checkAuth ,majorController.create);
router.post('/major/create', checkAuth ,majorController.create);
router.get('/major/update/:id', checkAuth ,majorController.update);
router.post('/major/update/:id', checkAuth ,majorController.update);
router.post('/major/remove/:id', checkAuth ,majorController.remove);

// Cookie & Session

router.get('/create-cookie', mainController.createCookie);
router.get('/clear-cookie', mainController.clearCookie);
router.get('/uuid', mainController.uuid);

// Auth Controller

router.get("/auth/signup", authContolller.signup);
router.post("/auth/signup", authContolller.signup);
router.get("/auth/login", authContolller.login);
router.post("/auth/login", authContolller.login);
router.get("/auth/logout", checkAuth ,authContolller.logout);

export default router;