# Automação de Testes E2E - Desafio QA Colmeia

Repositório destinado ao desafio de Quality Assurance, focado na exploração e validação E2E da aplicação Colmeia utilizando **Cypress**. 

O projeto abrange testes de interface, fluxos de exceção, operações de CRUD (Create, Read, Update/Archive, Delete) e, principalmente, a identificação e documentação de comportamentos inesperados (Bugs) encontrados durante as sessões de teste exploratório.

## Tecnologias Utilizadas
- **Node.js**
- **Cypress**

## Relatório de Bugs Identificados 

Durante a análise exploratória e automação, foram mapeados **4 bugs críticos/graves** na aplicação. O Cypress foi configurado para gerar screenshots automáticos no exato momento em que essas falhas ocorrem (disponíveis na pasta `cypress/screenshots`).

### 1. Bypass de Autenticação
* **Local:** Tela de Login (`/`)
* **Comportamento Esperado:** Ao inserir credenciais e o sistema identificar uma falha na validação, o acesso deve ser estritamente bloqueado.
* **Comportamento Obtido:** O sistema exibe um modal alertando "Seu login está incorreto, quer continuar?". Ao clicar em "Continuar", a aplicação permite o acesso irrestrito ao Dashboard logado. Além disso, a falha dispara uma exceção não tratada no console (`TypeError: Cannot read properties of null`).

### 2. Tela "Colmeia Forms" não renderizada
* **Local:** Menu Lateral > Colmeia Forms (`/dashboard/campanha/colmeia-forms`)
* **Comportamento Esperado:** A interface do formulário ou uma mensagem de "Em construção" deveria ser exibida.
* **Comportamento Obtido:** A URL é alterada corretamente, mas o componente principal da tela não é renderizado, resultando em uma tela completamente em branco.

### 3. Perda de Dados Visual em Itens Arquivados
* **Local:** Bancos de dados > Itens Arquivados
* **Comportamento Esperado:** Ao clicar no ícone de "Arquivar" de um banco de dados, o item deve ser movido da listagem principal e exibido na listagem da tela de Itens Arquivados.
* **Comportamento Obtido:** O item some da tela principal com sucesso, porém, ao acessar a tela de arquivados, a listagem encontra-se vazia, sem exibição dos dados arquivados e sem mensagem de feedback na tabela (ex: "Nenhum banco encontrado").

### 4. Link sem ação ("Esqueceu sua senha?")
* **Local:** Tela de Login (`/`)
* **Comportamento Esperado:** O link deveria redirecionar para a rota de recuperação de senha ou abrir um modal de envio de e-mail.
* **Comportamento Obtido:** O link não possui nenhuma ação ou evento atrelado. Ao clicar, a URL permanece a mesma e nenhum feedback visual é dado ao usuário.

---