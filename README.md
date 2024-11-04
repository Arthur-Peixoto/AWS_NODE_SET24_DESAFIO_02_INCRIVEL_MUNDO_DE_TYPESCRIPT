# CompassCar Register API

Serviço para cadastro de carros da empresa CompassCar.
Registre carros, clientes, usuários e pedidos.


## Como utilizar
Pelo github é possível fazer o download do arquivo .zip do projeto. Ou, se preferir, utilize o código abaixo no terminal. Certifique-se de ter o git instalado.
```
git clone https://github.com/Arthur-Peixoto/AWS_NODE_SET24_DESAFIO_02_INCRIVEL_MUNDO_DE_TYPESCRIPT

```

Abra a pasta do projeto e configure suas variáveis de ambiente no modelo do arquivo .env.example.

Após garantir que suas variáveis estão corretas e estar com o banco de dados rodando, entre no seu terminal:

```
npm install
npm run typeorm -- -d src/common/infraestructure/typeorm/index.ts migration:run
npm run dev
```

*** 

Arquivo de Documentação das rotas disponível em [docs](./compasscar.yaml)
Você pode importá-lo em https://editor.swagger.io/
