(function(w)
    {
        'use strict'

        w.ru["Vetor"] = function(x, y)
        {
            this.x = x || 0;
            this.y = y || 0;
        };

        w.ru["Vetor"].prototype.soma = function(outro)
        {
            return new w.ru["Vetor"](this.x + outro.x, this.y + outro.y);
        };
    }
)(window);