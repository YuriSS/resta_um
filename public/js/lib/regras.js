(function(w)
    {
        'use strict'

        var jogadasPossiveis = {
            cima:   { j: new w.ru["Vetor"](0, 2), m: new w.ru["Vetor"](0, 1)},
            baixo:  { j: new w.ru["Vetor"](0, -2), m: new w.ru["Vetor"](0, -1)},
            esq:    { j: new w.ru["Vetor"](-2, 0), m: new w.ru["Vetor"](-1, 0)},
            dir:    { j: new w.ru["Vetor"](2, 0), m: new w.ru["Vetor"](1, 0)},
        };

        w.ru["Regras"] = function()
        {
        };

        w.ru["Regras"].prototype.verificaJogada = function(de, para)
        {
            for(var key in jogadasPossiveis)
            {
                var teste = de.soma(jogadasPossiveis[key].j);

                if(teste.x === para.x && teste.y === para.y)
                {
                    return jogadasPossiveis[key];
                }
            }

            return false;
        };
    }
)(window);