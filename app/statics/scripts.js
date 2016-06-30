(function(w)
    {
        'use strict'

        w.ru = w.ru || {}; // Define um objeto global
    }
)(window);
(function(w)
    {
        'use strict'

        w.ru["Vetor"] = function(x, y)
        {
            this.x = Number(x) || 0;
            this.y = Number(y) || 0;
        };

        w.ru["Vetor"].prototype.soma = function(outro)
        {
            return new w.ru["Vetor"](this.x + outro.x, this.y + outro.y);
        };

        w.ru["Vetor"].prototype.inverteSinal = function()
        {
            return new w.ru["Vetor"](this.x * -1, this.y * -1);
        };
    }
)(window);
(function(w)
    {
        'use strict'

        var tabuleiroLayout = [
            "   ...   ",
            "   ...   ",
            ".........",
            "....~....",
            ".........",
            "   ...   ",
            "   ...   "
        ],
            PINO_SQL = ".",
            PINO_BLANK = "~",
            PINO_NULL = " ";

        w.ru["layout"] = {
            map: tabuleiroLayout,
            sql: PINO_SQL,
            sql_blank: PINO_BLANK,
            sql_null: PINO_NULL,

            each: function(callback)
            {
               for(var y = 0, ly = this.map.length; y < ly; y++)
                {
                    for(var x = 0, lx = this.map[y].length; x < lx; x++)
                    {
                        callback(this.map[y][x], x, y);
                    }
                }
            },

            verificaSQLValido: function(vetor)
            {
                return this.map[vetor.y][vetor.x] !== this.sql_null;
            }
        };
    }
)(window);
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
(function(w)
    {
        'use strict'

        w.ru["Palco"] = function(layout)
        {
            this.el = document.getElementById("game");
            this.btns = {
                start: document.getElementById("startGame")
            };
            this.placar = document.getElementById("placar");
            this.layout = layout;
        };

        w.ru["Palco"].prototype.render = function()
        {
            var html = "";

            this.layout.each(function(sql, x, y)
                {
                    var sufixo = sql === this.layout.sql ? "pin" : sql === this.layout.sql_blank ? "pin_blank" : "blank";

                    if(x === 0)
                    {
                        html += criaEl("fim_linha")
                    }

                    html += criaEl(sufixo, x, y);
                }.bind(this)
            );

            this.el.innerHTML = html;
        };

        w.ru["Palco"].prototype.bindPin = function(callback)
        {
            this.el.addEventListener('click', function(event)
                {
                    var target = event.target;
                    var pos = target.getAttribute("data-pos");

                    if(pos)
                    {
                        pos = pos.split(" ");
                        callback(pos);
                    }
                }
            );
        };

        w.ru["Palco"].prototype.bindStart = function(callback)
        {
            this.btns.start.addEventListener("click", function()
                {
                    callback();
                }
            );
        };

        w.ru["Palco"].prototype.atualizaPlacar = function(valor)
        {
            this.placar.innerHTML = valor + " jogadas";
        };

        w.ru["Palco"].prototype.atualizaPeca = function(vetor, ativo)
        {
            var el = this.el.querySelector('span[data-pos="' + seletor(vetor) + '"]');

            if(ativo)
            {
                if(this.cacheEl)
                {
                    this.cacheEl.setAttribute("data-ativo", "");
                }
                this.cacheEl = el;
            }

            el.setAttribute("data-ativo", ativo ? "ativo" : "");
        };

        w.ru["Palco"].prototype.addPeca = function(vetor)
        {
            var el = this.el.querySelector('span[data-pos="' + seletor(vetor) + '"]')

            el.setAttribute("class", "sql--pin");
        };

        w.ru["Palco"].prototype.removerPeca = function(vetor)
        {
            var el = this.el.querySelector('span[data-pos="' + seletor(vetor) + '"]')

            el.setAttribute("class", "sql--pin_blank");
        };



        function criaEl(classe, x, y)
        {
            var data = 'data-pos="' + x + ' ' + y + '"';

            return '<span class="sql--' + classe + '" ' + data + '></span>';
        }

        function seletor(vetor)
        {
            return vetor.x + " " + vetor.y;
        }
    }
)(window);
(function(w)
    {
        'use strict'

        var pecaAtual = null;

        w.ru["Game"] = {

            init: function()
            {
                this.tabuleiro = new w.ru["Tabuleiro"](w.ru["layout"]);
                this.palco = new w.ru["Palco"](w.ru["layout"]);
                this.regras = new w.ru["Regras"]();

                this.palco.bindPin(this.jogada.bind(this));
                this.palco.bindStart(this.startRound.bind(this));

                return this;
            },

            startRound: function()
            {
                this.tabuleiro.initTabuleiro();
                this.palco.render();
                this.jogadas = 0;

                this.palco.atualizaPlacar(this.jogadas);

                return this;
            },

            jogada: function(pos)
            {
                var vetor = new w.ru["Vetor"](pos[0], pos[1]);
                var peca = this.tabuleiro.getPeca(vetor);

                if(peca)
                {
                    pecaAtual = peca;

                    this.palco.atualizaPeca(vetor, true);
                }
                else if(w.ru["layout"].verificaSQLValido(vetor))
                {
                    var aux = this.regras.verificaJogada(pecaAtual, vetor);

                    if(aux !== false)
                    {
                        var pinMeio = this.tabuleiro.getPeca(pecaAtual.soma(aux.m));

                        if(pinMeio)
                        {
                            if(this.tabuleiro.moverPeca(pecaAtual, vetor))
                            {
                                this.tabuleiro.removerPeca(pinMeio);

                                this.palco.removerPeca(pecaAtual);
                                this.palco.removerPeca(pinMeio);
                                this.palco.addPeca(vetor);
                                this.palco.atualizaPlacar(++this.jogadas);
                            }
                        }
                    }
                }
            },
        };
    }
)(window);
(function(w)
    {
        'use strict'

        var game = w.ru["Game"].init().startRound();
    }
)(window);