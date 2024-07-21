"use strict";
window.onload = function () {
    let r;
    let raio = document.getElementById("raio");
    let area = document.getElementById("area");
    let circ = document.getElementById("circ");
    const btn = document.getElementById("btn");
    btn.onclick = function () {
        r = raio.value;
        area.value = (Math.PI * Math.pow(r, 2)).toFixed(2);
        circ.value = (2 * Math.PI * r).toFixed(2);
    };
};
