"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    if (!req.session.uid)
        res.redirect("/auth/login");
    else
        next();
};
exports.checkAuth = checkAuth;
