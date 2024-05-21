function tabela(){
    for(let i=1; i<11; i++){
        document.write("<table style='display:inline-table; margin: 10px; text-align: center;' border = 1> <thead> <tr> <th colspan='2'> Produtos de "+i+" </th> </tr> </thead> <tbody>");
        for(let j=1; j<11; j++){
            document.write("<tr> <td> "+i+"X"+j+" </td> <td> "+i*j+" </td> </tr>");
        }
        document.write(" </tbody> </table>");
    }
}