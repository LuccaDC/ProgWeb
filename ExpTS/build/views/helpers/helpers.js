"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTechs = listTechs;
exports.listNodeTechs = listNodeTechs;
function listTechs(techs) {
    const list = techs.map((p) => `<li>${p.name}-${p.type}</li>`);
    return `<ul>${list.join('')}</ul>`;
}
function listNodeTechs(techs) {
    const nodeTechs = techs.filter(p => p.poweredByNodejs);
    const list = nodeTechs.map((p) => `<li>${p.name}-${p.type}</li>`);
    return `<ul>${list.join('')}</ul>`;
}
