class IntegerSet {
    constructor(maxSize){
        this.conjunto = new Array(maxSize).fill(!1);
    }

    insere(value){
        this.conjunto[value] = true;
    }

    exclui(value){
        this.conjunto[value] = false;
    }

    uniao(otherSet) {
        let resultado = new IntegerSet(this.conjunto.length);
        otherSet.conjunto.forEach((valor, index) => {
            if (valor === true) {
                resultado.conjunto[index] = true;
            }
            else
                resultado.conjunto[index] = false;
        });
        this.conjunto.forEach((valor, index) => {
            if (valor === true) {
                resultado.conjunto[index] = true;
            }
        });
        return resultado;
      }

    intersecao(otherSet) {
        let resultado = new IntegerSet(this.conjunto.length);
        this.conjunto.forEach((valor, index) => {
            if (valor === true && otherSet.conjunto[index] === true) {
                resultado.conjunto[index] = true;
            }
        });
        return resultado;
  }

    diferenca(otherSet) {
    let resultado = new IntegerSet(this.conjunto.length);
    this.conjunto.forEach((valor, index) => {
        if (valor == true && !otherSet.conjunto[index]) {
            resultado.conjunto[index] = true;
        }
        else
            resultado.conjunto[index] = false;
    });
    return resultado;
    }

    toString() {
        return this.conjunto
          .map((presente, index) => (presente ? index : null))
          .filter(item => item !== null)
          .join(", ");
      }
}

// TESTE DAS FUNÇÕES

function main(){
    let x = new IntegerSet(100);
    x.insere(10);
    x.insere(20);
    x.insere(30);
    console.log("Conjunto X: " + x.toString());
    
    let y = new IntegerSet(100);
    y.insere(20);
    y.insere(30);
    y.insere(40);
    console.log("Conjunto Y: " + y.toString());

    let valorUniao = x.uniao(y);
    console.log("União (X u Y): " + valorUniao.toString());

    let valorIntersecao = x.intersecao(y);
    console.log("Interseção (X ∩ Y): " + valorIntersecao.toString());
    
    let valorDiferenca = x.diferenca(y);
    console.log("Diferença (X - Y): " + valorDiferenca.toString());
}