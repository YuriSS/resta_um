#Jogo Resta um

Para executar o jogo, abra o arquivo app/index.html.

#Setup dev workspace

Requer: NodeJS v6.2.2 e npm v3.9.5.

Instalando as dependencias "npm install".

Talvez se faça necessário fazer os arquivos dentro da pasta bin se tornarem executaveis através do comando "chmod +x bin/*".

Para configurar os arquivos estaticos execute "npm run build".

Apos tudo feito, abrir o arquivo app/index.html para executar a aplicação.

#Tarefas automatizadas

- Processar css:
Para executar a tarefa de processar os arquivos scss em css execute o comando "npm run build-css",

- Excuta de arquivos scss:
Para executar a tarefa de excuta de arquivos scss execute o comando "npm run watch-css",

- Processar js:
Para executar a tarefa de processar os arquivos js execute o comando "npm run build-js",

- Excuta de arquivos js:
Para executar a tarefa de excuta de arquivos js execute o comando "npm run watch-js",

- Excuta generica:
Para executar a tarefa de excuta generica execute o comando "npm run watch";