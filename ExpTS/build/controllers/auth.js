"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const major_1 = require("../services/major");
const user_1 = require("../services/user");
const auth_1 = require("../services/auth");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "GET") {
        const majors = yield (0, major_1.getAllMajors)();
        res.render("auth/signup", { majors });
    }
    else {
        try {
            yield (0, user_1.createUser)(req.body);
            res.redirect("/auth/login");
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "GET") {
        res.render("auth/login");
    }
    else {
        const user = yield (0, auth_1.checkAuth)(req.body);
        if (!user)
            return res.redirect("/auth/login");
        console.log(user);
        req.session.uid = user.id;
        res.redirect("/major");
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((err) => {
        if (err)
            console.log(err);
        else
            res.redirect("/auth/login");
    });
});
exports.default = { signup, login, logout };
