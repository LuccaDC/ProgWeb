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
exports.removeMajor = exports.updateMajor = exports.getMajor = exports.majorAlreadyExists = exports.createMajor = exports.getAllMajors = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllMajors = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.major.findMany();
});
exports.getAllMajors = getAllMajors;
const createMajor = (newMajor) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.major.create({ data: newMajor });
});
exports.createMajor = createMajor;
const majorAlreadyExists = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const major = yield prisma.major.findUnique({
        where: { name }
    });
    return !!major;
});
exports.majorAlreadyExists = majorAlreadyExists;
const getMajor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const major = yield prisma.major.findUnique({
        where: { id }
    });
    if (!major) {
        throw new Error('Major not found');
    }
    return major;
});
exports.getMajor = getMajor;
const updateMajor = (id, major) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedMajor = yield prisma.major.updateMany({
        where: { id },
        data: major
    });
    return [updatedMajor.count];
});
exports.updateMajor = updateMajor;
const removeMajor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedMajor = yield prisma.major.delete({
        where: { id }
    });
    return deletedMajor ? 1 : 0;
});
exports.removeMajor = removeMajor;
