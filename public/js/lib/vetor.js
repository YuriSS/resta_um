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