Aqui está a documentação formatada em Markdown:

# ENDPOINTS DE USUÁRIOS

Rotas para cadastrar novos usuários no sistema de PDV e também editar, detalhar e listar. Usuários serão usados para manipular dados gerais de cadastro e inserção.

## Rota: POST /usuarios

### Rota para cadastro de Usuários

**Parâmetros de Requisição:**

**Obrigatório**
```json
{
  "nome": "John Doe",
  "email": "johndoe@gmail.com",
  "senha": "joJo!123654"
}
```

**Critérios de aceite “NOME”**
- Precisa ser uma String.
- Ter no mínimo 3 caracteres.
- Não possuir números nem caracteres especiais.

**Critérios de aceite “EMAIL”**
- Precisa ser uma string.
- Precisa ser um e-mail válido (possuindo formato com @ e .com).
- Precisa ser único na tabela de usuários cadastrados, sistema não aceita duplicidades.

**Critérios de aceite “SENHA”**
- Deve ser uma string.

Para ser uma senha válida, ela precisa seguir os seguintes aspectos:
- Contém pelo menos uma letra maiúscula.
- Contém pelo menos um número.
- Contém pelo menos um caractere especial.
- Tem no mínimo 6 caracteres de comprimento.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS
- Após todas as validações, os dados informados são enviados para o banco de dados. A senha é criptografada com hash do bcrypt.

---

## Rota: GET /confirm/“token”

### Rota para confirmar e-mail de um usuário cadastrado

**Parâmetro de Requisição:** token enviado para o e-mail (link)

**Critérios de Aceite**
- Deve ser fornecido ao endpoint do servidor um link com um token válido.
- O token só poderá ser utilizado uma vez.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS
- O token é comparado ao token no banco de dados e, com o aceite, emailVerified se torna true, permitindo assim que o usuário faça login.

---

## Rota: POST /login

### Rota para login de um usuário cadastrado

**Parâmetros de Requisição:**

**Obrigatórios**
```json
{
  "email": "johndoe@gmail.com",
  "senha": "John!123456"
}
```

Para fazer login, é necessário que o usuário tenha confirmado seu e-mail registrado.

**Critérios de aceite “EMAIL”**
- Precisa ser uma string.
- Precisa ser um e-mail válido (possuindo formato com @ e .com).
- Precisa existir no banco de dados e ser relativo à senha passada no body.

**Critérios de aceite “SENHA”**
- Deve ser uma string.
- Precisar ser uma senha válida e aceita pela comparação de senha do bcrypt; a senha também deve ser referente ao e-mail passado no body.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS
- Após todas as validações de autenticidade/verificações, o usuário é permitido a fazer login no servidor, recebendo um token de sessão JWT que será usado para autenticação nas demais rotas.

---

## Rota: PATCH /usuarios/redefinir

### Rota para redefinir senha de usuário

**Parâmetros de Requisição:**

**Obrigatórios**
```json
{
  "email": "johndoe@gmail.com",
  "senha_antiga": "John!123456",
  "senha_nova": "joJo!123654"
}
```

O usuário não precisa estar logado para resetar sua senha.

**Critérios de aceite “EMAIL”**
- Precisa ser uma string.
- Precisa ser um e-mail válido (possuindo formato com @ e .com).
- Precisa existir no banco de dados e ser relativo à senha passada no body.
- Não pode ser um e-mail usado por outro usuário cadastrado.

**Critérios de aceite “SENHA_ANTIGA”**
- Deve ser uma string.
- Precisar ser uma senha válida e aceita pela comparação de senha do bcrypt; a senha também deve ser referente ao e-mail/usuário passado no body.

**Critérios de aceite “SENHA_NOVA”**
- Deve ser uma string.

Para ser uma senha válida, ela precisa seguir os seguintes aspectos:
- Contém pelo menos uma letra maiúscula.
- Contém pelo menos um número.
- Contém pelo menos um caractere especial.
- Tem no mínimo 6 caracteres de comprimento.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS
- Após todas as validações, a senha nova do usuário é armazenada no banco de dados. A senha nova é criptografada com hash do bcrypt. Um e-mail é enviado ao usuário para informar que sua senha foi alterada (procedimento de segurança).

---

## Rota: PUT /usuarios

### Rota para editar todos os dados de um usuário cadastrado

**Parâmetros de Requisição:**

**Obrigatório**
```json
{
  "nome": "John Doe",
  "email": "johndoe@gmail.com",
  "senha": "joJo!123654"
}
```

O Usuário deve existir no banco de dados e estar logado e autenticado com token JWT para esta rota.

**Critérios de aceite “NOME”**
- Precisa ser uma String.
- Ter no mínimo 3 caracteres.
- Não possuir números nem caracteres especiais.

**Critérios de aceite “EMAIL”**
- Precisa ser uma string.
- Precisa ser um e-mail válido (possuindo formato com @ e .com).
- Precisa ser único na tabela de usuários cadastrados; sistema não aceita duplicidades.
- Se passado o mesmo e-mail anterior no body, o e-mail deve ser do próprio usuário.

**Critérios de aceite “SENHA”**
- Deve ser uma string.

Para ser uma senha válida, ela precisa seguir os seguintes aspectos:
- Contém pelo menos uma letra maiúscula.
- Contém pelo menos um número.
- Contém pelo menos um caractere especial.
- Tem no mínimo 6 caracteres de comprimento.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS
- Após todas as validações (com o usuário logado e autenticado), os dados informados são enviados para o banco de dados. O usuário pode manter o mesmo e-mail e senha anterior. A senha é criptografada com hash do bcrypt.

---

## Rota: GET /usuarios

### Rota para listar dados de um usuário cadastrado (usuário logado)

**Parâmetros de Requisição/Critérios de Aceite:**
- Estar logado e autenticado com um Token JWT.

### PROCEDIMENTO PARA REQUISIÇÕES BEM SUCEDIDAS
- Após acessar a rota e ser validado/autenticado, o usuário recebe informações de seu cadastro, apenas seu nome e e-mail.

---

## Rota: GET /categorias

### Rota para listar categorias cadastradas no sistema

O usuário não precisa estar logado ou autenticado para verificar essa rota. Ao acessar essa rota, o usuário terá a lista de todas as categorias do sistema ou receberá uma mensagem informando que não há categorias cadastradas.


