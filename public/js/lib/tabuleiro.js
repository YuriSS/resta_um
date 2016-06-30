(function(w)
    {
        'use strict'

        w.ru["Tabuleiro"] = function(layout)
        {
            this.layout = layout;
        };

        w.ru["Tabuleiro"].prototype.initTabuleiro = function()
        {
            this.numPecas = 0;
            this.pecas = {};

            this.layout.each(function(sql, x, y)
                {
                    if(sql === this.layout.sql)
                    {
                        var vetor = new w.ru["Vetor"](x, y);

                        this.pecas[key(vetor)] = vetor;
                        this.numPecas++;
                    }
                }.bind(this)
            );
        };

        w.ru["Tabuleiro"].prototype.mostrarPecas = function(callback)
        {
            for(var key in this.pecas)
            {
                callback(this.pecas[key]);
            }
        };

        w.ru["Tabuleiro"].prototype.getPeca = function(vetor)
        {
            return this.pecas[key(vetor)];
        };

        w.ru["Tabuleiro"].prototype.moverPeca = function(posPeca, posMove)
        {
            if(instanceVetor(posPeca) && instanceVetor(posMove))
            {
                if(this.pecas[key(posPeca)] !== undefined && this.pecas[key(posMove)] === undefined)
                {
                    this.pecas[key(posMove)] = posMove;

                    this.removerPeca(this.pecas[key(posPeca)]);

                    return true;
                }
                console.error("Peca n existente ou existe peca no caminho.");
            }
            return false;
        };

        w.ru["Tabuleiro"].prototype.removerPeca = function(peca)
        {
            if(this.pecas[key(peca)])
            {
                delete this.pecas[key(peca)];

                return true;
            }

            return false;
        };



        function key(vetor)
        {
            if(instanceVetor(vetor))
            {
                return vetor.x + "" + vetor.y;
            }

            return null;
        }

        function instanceVetor(vetor)
        {
            return vetor && vetor instanceof w.ru["Vetor"];
        }
    }

)(window);