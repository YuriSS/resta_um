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