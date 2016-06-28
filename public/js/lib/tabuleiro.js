(function(w)
    {
        'use strict'

        var tabuleiroLayout = [
            "   ...   ",
            "   ...   ",
            ".........",
            ".........",
            ".........",
            "   ...   ",
            "   ...   "
        ];

        w.ru["Tabuleiro"] = function()
        {
            this.criaTabuleiro();
        };

        w.ru["Tabuleiro"].prototype.criaTabuleiro = function()
        {
            this.pecas = {};

            for(var y = 0, ly = tabuleiroLayout.length; y < ly; y++)
            {
                for(var x = 0, lx = tabuleiroLayout[y].length - 1; x < lx; x++)
                {
                    var sql = tabuleiroLayout[y][x];

                    if(sql === ".")
                    {
                        var key = x + "" + y;
                        var pos = new w.ru["Vetor"](x, y);

                        this.pecas[key] = new w.ru["Peca"](pos);
                    }
                }
            }
        };

        w.ru["Tabuleiro"].prototype.mostraPecas = function(callback)
        {
            for(var key in this.pecas)
            {
                console.log(key);
                callback(this.pecas[key]);
            }
        };

        // w.ru["Tabuleiro"].prototype.removePeca = function()
        // {
        //     --this.numPecas;
        // };
    }
)(window);