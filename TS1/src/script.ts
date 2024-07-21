window.onload = function(){ 
    let r: number;
    let raio: HTMLFormElement = <HTMLFormElement> document.getElementById("raio");
    let area: HTMLFormElement = <HTMLFormElement> document.getElementById("area");
    let circ: HTMLFormElement = <HTMLFormElement> document.getElementById("circ");
    const btn: HTMLButtonElement = <HTMLButtonElement> document.getElementById("btn");
    

    btn.onclick = function(){
        r = raio.value;
        area.value = (Math.PI * Math.pow(r,2)).toFixed(2);
        circ.value = (2 * Math.PI * r).toFixed(2);
    }; 
};
