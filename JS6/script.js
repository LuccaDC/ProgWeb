window.onload = function(){
    document.addEventListener("mousemove", function(event) {
        let dot = document.createElement("div");
        dot.className = "dot";
        dot.style.left = (event.pageX - 4) + "px";
        dot.style.top = (event.pageY - 4) + "px";
        document.body.appendChild(dot);
        if(document.body.childElementCount > 8){
            document.body.children[0].remove();
        }
    });
}