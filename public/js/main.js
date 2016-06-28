(function(w)
    {
        'use strict'

        var tabuleiro = new w.ru["Tabuleiro"]();

        tabuleiro.mostraPecas(function(peca)
            {
                console.log(peca.pos);
            });
    }
)(window);