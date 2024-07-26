import { Tech } from './helpersTypes';

export function listTechs(techs: Tech[]) {
    const list = techs.map((p)=>`<li>${p.name}-${p.type}</li>`);
    return `<ul>${list.join('')}</ul>`;
}

export function listNodeTechs(techs: Tech[]) {
    const nodeTechs = techs.filter(p => p.poweredByNodejs)
    const list = nodeTechs.map((p)=>`<li>${p.name}-${p.type}</li>`);
    return `<ul>${list.join('')}</ul>`;
}