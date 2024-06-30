window.onload = function(){
    const btn = document.getElementById("btn");
    const sizes = document.getElementById("sizes");
    const chart = document.getElementById("chart");

    btn.onclick = function(){
        chart.style.setProperty("height",Math.max(sizes.children[0].value,sizes.children[1].value,sizes.children[2].value,sizes.children[3].value,sizes.children[4].value)+"px");
        for(var i=0; i<5; i++){
            chart.children[i].style.setProperty("height",sizes.children[i].value+"px");
            chart.children[i].style.setProperty("width",sizes.children[6].value+"px");
        }
    };
}