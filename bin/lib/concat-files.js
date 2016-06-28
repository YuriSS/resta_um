var _fs     = require('fs');
var _path   = require('path');

var FILE_ENCODING   = 'utf-8',
    EOL             = '\n';


var dir         = _path.join(__dirname, "../../public/js"),
    destino     = _path.join(__dirname, "../../app/statics/scripts.js"),

    arquivos = [
        _path.join(dir, "lib/bootstrap.js"),
        _path.join(dir, "lib/tabuleiro.js"),
        _path.join(dir, "lib/vetor.js"),
        _path.join(dir, "lib/peca.js"),
        _path.join(dir, "main.js")
    ],

    saida = arquivos.map(function(filePath)
        {
            return _fs.readFileSync(filePath, FILE_ENCODING);
        }
    );

_fs.writeFileSync(destino, saida.join(EOL), FILE_ENCODING);
console.log('O arquivo js foi construido em /app/statics/scripts.js');