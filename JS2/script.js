function jogada(){
    jogador = parseInt(prompt("Escolha sua jogada:\n1 - Papel\n2 - Pedra\n3 - Tesoura"));
    if (jogador < 1 || jogador > 3)
        return 0;
    computador = Math.floor(Math.random() * 3) + 1;
    
    if (computador == 1)
        console.log("O Computador Jogou Papel") 
    else if (computador == 2)
        console.log("O Computador Jogou Pedra") 
    else if (computador == 3)
        console.log("O Computador Jogou Tesoura") 

    // Derrota = 0
    // Vitoria = 1
    // Empate = 2
    if (jogador == computador)
        return 2;
    switch(jogador){
        case(1):
            if (computador == 2)
                return 1;
            else
                return 0;
        case(2):
            if (computador == 3)
                return 1;
            else
                return 0;
        case(3):
            if (computador == 1)
                return 1;
            else
                return 0;
    }
}

function jokenpo(){
    pontuação = 0
    while (true){
        switch(jogada()){
            case(0):
                console.log('Você perdeu! A sua pontuação foi de ' + pontuação);
                return pontuação;
            case(1):
                console.log('Você ganhou!');
                pontuação += 1;
                continue;
            case(2):
                console.log('A rodada empatou.');
                continue;
        }
    }
}