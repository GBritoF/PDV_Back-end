Aqui está a formatação em Markdown para os **ENDPOINTS DE PRODUTOS**:

# ENDPOINTS DE PRODUTOS

Rotas para cadastrar novos produtos no sistema de PDV e também editar, detalhar e listar. Produtos serão usados em conjunto com suas respectivas categorias, sendo mandatórios para o cadastro de pedidos.

## rota: POST /produtos

### Parâmetros de requisição

O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

**Não-obrigatório:**
```json
{
  "descricao": "Teclado Mecanico Baltmor com LEDs"
}
```

**Obrigatórios:**
```json
{
  "quantidade_estoque": 65,
  "valor": 35000,
  "categoria_id": 1
}
```

### Critérios de aceite “DESCRICAO”

- Precisa ser uma String.
- Precisa ser única; não é possível cadastrar produtos com a mesma descrição, evitando duplicidade de informações no banco de dados.
- Se a descrição não for passada, será registrada como “EMPTY”.

### Critérios de aceite “QUANTIDADE_ESTOQUE”

- Precisa ser um número.
- Precisa ser maior que zero.

### Critérios de aceite “VALOR”

- Precisa ser um número.
- Precisa ser maior que zero.

### Critérios de aceite “CATEGORIA_ID”

- Precisa existir no banco de dados.
- Precisa ser um número válido maior que zero.
- O ID da categoria precisa corresponder ao ID da categoria cadastrada.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS

- Após todas as validações necessárias, o produto é cadastrado no banco de dados e é retornado como resposta o corpo do produto cadastrado com suas informações.

---

## rota: PUT /produtos/:id

Rota para edição de produtos já cadastrados. O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

### Obrigatórios
```json
{
  "descricao": "Teclado Mecanico Baltmor com LEDs",
  "quantidade_estoque": 65,
  "valor": 35000,
  "categoria_id": 1
}
```

### Critérios de aceite “DESCRICAO”

- Precisa ser uma String.
- Precisa ser única; não é possível cadastrar produtos com a mesma descrição, evitando duplicidade de informações no banco de dados.

### Critérios de aceite “QUANTIDADE_ESTOQUE”

- Precisa ser um número.
- Precisa ser maior que zero.

### Critérios de aceite “VALOR”

- Precisa ser um número.
- Precisa ser maior que zero.

### Critérios de aceite “CATEGORIA_ID”

- Precisa existir no banco de dados.
- Precisa ser um número válido maior que zero.
- O ID da categoria precisa corresponder ao ID da categoria cadastrada.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS

- Após todas as validações necessárias, o produto é atualizado no banco de dados e é retornado como resposta o corpo do produto atualizado com suas informações.

---

## rota: GET /produtos?categoria_id=1

Rota para listagem de produtos já cadastrados através de sua categoria ou listar todos os produtos cadastrados se a categoria_id não for passada. O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

### Parâmetro de Requisição:

**Opcional:**
- categoria_id

### Critérios de aceite “CATEGORIA_ID”

- Precisa ser um número.
- Precisa ser uma categoria válida cadastrada no sistema.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS

- Após a validação do usuário com JWT e validação da categoria existente, são retornados todos os produtos relacionados à categoria informada. Caso não seja passado o parâmetro, retornará todos os produtos cadastrados no sistema.

---

## rota: GET /produtos/:id

Rota para detalhar produtos já cadastrados através de seu ID. O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

### Parâmetros de Requisição

**Obrigatórios:**
- :id

### Critérios de aceite “ID”

- Precisa ser um número.
- Precisa ser um ID válido de um produto cadastrado no sistema.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS

- Após a validação do usuário com JWT e validação do ID existente, é retornado o produto relacionado ao ID informado, detalhando seus dados.

---

## rota: DELETE /produtos/:id

Rota para deletar produtos já cadastrados através de seu ID. O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

### Parâmetros de Requisição

**Obrigatórios:**
- :id

### Critérios de aceite “ID”

- Precisa ser um número.
- Precisa ser um ID válido de um produto cadastrado no sistema.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS

- Após a validação do usuário com JWT e validação do ID existente, o produto é deletado do sistema. Se o produto tiver uma imagem vinculada a ele, ela também será deletada do bucket em seu storage na nuvem.

---

## rota: GET /usuarios

Rota para listar dados de um usuário cadastrado (usuário logado).

### Parâmetros de Requisição/Critérios de Aceite:

Estar logado e autenticado com um Token JWT.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS

- Após acessar a rota sendo validado/autenticado, o usuário recebe informações de seu cadastro, apenas seu nome e e-mail.

---

## rota: PATCH /produtos/:id/imagem

Rota para atualizar a imagem de um produto já cadastrado através de seu ID. O usuário precisa estar logado e autenticado com JWT para acessar essa rota.

### Parâmetros de Requisição

**Opcional:**
- imagem (jpg, png)

**Obrigatórios:**
- :id

### Critérios de aceite “ID”

- Precisa ser um número.
- Precisa ser um ID válido de um produto cadastrado no sistema.

### Critérios de aceite “IMAGEM”

- Ter menos de 20mb.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS

- Após a validação do usuário com JWT e validação do ID existente, a imagem do produto é vinculada ao produto através do URL em seu banco de dados. A imagem é enviada para o bucket no storage da nuvem. Se nenhuma imagem for passada na requisição, `imagem_url` ficará como null, e se o produto já tiver uma imagem, esta será removida.
