Aqui está a documentação para os **EndPoints de Pedidos** no sistema de PDV, seguindo o mesmo formato:

---

# ENDPOINTS DE PEDIDOS

Rotas para cadastrar novos pedidos no sistema de PDV e também detalhar e listar. Pedidos serão entidades em conjunto com seus respectivos produtos, com essas duas entidades vinculadas ao cliente.

### Rota: POST /pedidos

**Rota para cadastro de novos pedidos para clientes**

**Parâmetros de requisição**

O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

#### Não-obrigatório:

```json
{
    "observacao": "Novos produtos"
}
```

#### Obrigatórios:

```json
{
    "cliente_id": 14,
    "pedido_produtos": [
        {
            "produto_id": 36,
            "quantidade_produto": 1
        },
        {
            "produto_id": 37,
            "quantidade_produto": 1
        }
    ]
}
```

#### Critérios de aceite

**“CLIENTE_ID”**

- Precisa ser um número
- O cliente deve existir no sistema
- Deve possuir todos os dados preenchidos (mandatórios e não-mandatórios)

**“OBSERVACOES”**

- Precisa ser uma string (opcional)

**“PEDIDO_PRODUTOS”**

- Precisa ser um array
- Precisa ter pelo menos um produto dentro do array

**“PRODUTO_ID”**

- Precisa ser um número maior que zero
- O ID do produto deve ser vinculado a um produto cadastrado no sistema
- O produto deve ter estoque suficiente para a quantidade solicitada

**“QUANTIDADE_PRODUTO”**

- Precisa ser um número maior que zero
- A quantidade não pode ser maior que a quantidade de produtos no estoque

#### Procedimento para requisições bem-sucedidas

- Após a validação do usuário com JWT e todas as validações da rota, é cadastrado um novo pedido vinculado a um cliente, com seu respectivo valor total. A quantidade referente ao pedido é subtraída do estoque de produtos, criando um controle para evitar que um produto esgote.

---

### Rota: GET /pedidos/:id

**Rota para listagem de pedidos já cadastrados através de seu ID ou listar todos os pedidos cadastrados se o ID não for passado**

O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

**Parâmetro de Requisição:**

#### Opcional:

- id

#### Critérios de aceite “ID”

- Precisa ser um número
- Precisa ser um ID válido de um pedido cadastrado no sistema

#### Procedimento para requisições bem-sucedidas

- Após a validação do usuário com JWT e validação do ID (ou validação de que existe pelo menos um pedido cadastrado), o sistema retornará o pedido referente ao ID ou, então, retornará todos os pedidos cadastrados. Caso não haja nenhum pedido no servidor ou pedidos em todo o sistema, será informado ao usuário que não há nenhum pedido (no geral ou para aquele cliente) cadastrado.

