Claro! Aqui está a documentação para os **EndPoints de Clientes** no sistema de PDV, seguindo o mesmo formato que você utilizou:

---

# ENDPOINTS DE CLIENTES

Rotas para cadastrar novos clientes no sistema de PDV e também editar, detalhar e listar. Clientes serão entidades em conjunto com seus respectivos pedidos, sendo mandatórios para tal cadastro.

### Rota: POST /clientes

**Rota para cadastro de novos clientes**

**Parâmetros de requisição**

O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

#### Não-obrigatório:

```json
{
    "cep": "EMPTY",
    "rua": "EMPTY",
    "numero": "EMPTY",
    "bairro": "EMPTY",
    "cidade": "EMPTY",
    "estado": "EMPTY"
}
```

#### Obrigatórios:

```json
{
    "nome": "Alaor Santos",
    "email": "alasantos@gmail.com",
    "cpf": "658.959.650-67"
}
```

#### Critérios de aceite

**“NOME”**

- Precisa ser uma String
- Ter no mínimo 3 caracteres
- Não possuir números nem caracteres especiais

**“EMAIL”**

- Precisa ser uma string
- Precisa ser um e-mail válido (com formato contendo @ e .com)
- Precisa ser único na tabela de clientes cadastrados, sistema não aceita duplicidades

**“CPF”**

- Precisa ser uma string
- Precisa ser um CPF válido e no formato: XXX.XXX.XXX-XX
- Precisa ser único na tabela de clientes cadastrados, sistema não aceita duplicidades

**“CEP”**

- Precisa ser uma string
- Precisa ser um CEP válido no formato: XXXXX-XX

**“RUA”**

- Precisa ser uma string

**“NUMERO”**

- Precisa ser uma string

**“BAIRRO”**

- Precisa ser uma string

**“CIDADE”**

- Precisa ser uma string

**“ESTADO”**

- Precisa ser uma string

#### Procedimento para requisições bem-sucedidas

- Após a validação do usuário com JWT e todas as validações da rota, um novo cliente é cadastrado. Se passar todos os campos (opcionais e mandatórios), estará pronto para inserção de novos pedidos. Caso passe apenas os dados mandatórios, o cliente será cadastrado, mas só poderá ser vinculado a pedidos quando todos os dados estiverem fornecidos.

---

### Rota: PUT /clientes/:id

**Rota para edição de um cliente cadastrado**

**Parâmetros de requisição**

O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

#### Não-obrigatório:

```json
{
    "cep": "EMPTY",
    "rua": "EMPTY",
    "numero": "EMPTY",
    "bairro": "EMPTY",
    "cidade": "EMPTY",
    "estado": "EMPTY"
}
```

#### Obrigatórios:

```json
{
    "nome": "Alaor Santos",
    "email": "alasantos@gmail.com",
    "cpf": "658.959.650-67"
}
```

#### Critérios de aceite

**“NOME”**

- Precisa ser uma String
- Ter no mínimo 3 caracteres
- Não possuir números nem caracteres especiais

**“EMAIL”**

- Precisa ser uma string
- Precisa ser um e-mail válido (com formato contendo @ e .com)
- Se passado o mesmo e-mail, ele deve pertencer ao ID que está sendo atualizado
- Precisa ser único na tabela de clientes cadastrados, sistema não aceita duplicidades

**“CPF”**

- Precisa ser uma string
- Precisa ser um CPF válido e no formato: XXX.XXX.XXX-XX
- Se passado o mesmo CPF, ele deve pertencer ao ID que está sendo atualizado
- Precisa ser único na tabela de clientes cadastrados, sistema não aceita duplicidades

**“CEP”**

- Precisa ser uma string
- Precisa ser um CEP válido no formato: XXXXX-XX

**“RUA”**

- Precisa ser uma string

**“NUMERO”**

- Precisa ser uma string

**“BAIRRO”**

- Precisa ser uma string

**“CIDADE”**

- Precisa ser uma string

**“ESTADO”**

- Precisa ser uma string

#### Procedimento para requisições bem-sucedidas

- Após a validação do usuário com JWT e todas as validações da rota, os dados do cliente são atualizados. Se passar todos os campos (opcionais e mandatórios caso não tenham sido preenchidos no cadastro), estará pronto para inserção de novos pedidos. Caso passe apenas os dados mandatórios (e tenha campos “EMPTY”), o cliente será atualizado, mas só poderá ser vinculado a pedidos quando todos os dados estiverem fornecidos.

---

### Rota: GET /clientes/:id

**Rota para listagem de clientes já cadastrados através de seu ID ou listar todos clientes cadastrados se o ID não for passado**

O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

**Parâmetro de Requisição:**

#### Opcional:

- id

#### Critérios de aceite “ID”

- Precisa ser um número
- Precisa ser um ID válido cadastrado no sistema

#### Procedimento para requisições bem-sucedidas

- Após a validação do usuário com JWT e validação do ID (ou validação de que existe pelo menos um cliente cadastrado), o sistema retornará o cliente referente ao ID ou, então, retornará todos os clientes cadastrados. Caso o cliente detalhado pelo ID tenha algum campo de dado “EMPTY”, será enviada junto com o corpo uma nota avisando que o cliente possui dados não cadastrados ainda, informando também que o cliente só poderá fazer pedidos se tiver todos os dados preenchidos. Caso não haja nenhum cliente no servidor, será informado ao usuário que não há nenhum cliente cadastrado.

