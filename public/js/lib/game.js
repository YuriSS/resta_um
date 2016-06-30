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