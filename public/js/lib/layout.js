(function(w)
    {
        'use strict'

        var tabuleiroLayout = [
            "  ...  ",
            "  ...  ",
            ".......",
            "...~...",
            ".......",
            "  ...  ",
            "  ...  "
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