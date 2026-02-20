# Análise Funcional ABA — Documentação do Sistema

## Visão Geral

O **Análise Funcional ABA** é um aplicativo web completo para psicólogos que trabalham com Análise do Comportamento Aplicada (ABA). O sistema integra **análise molecular** (preenchida pelo paciente) e **análise molar** (preenchida pelo psicólogo), permitindo uma formulação de caso baseada em dados reais e mensuráveis.

---

## Arquitetura do Sistema

O sistema possui duas interfaces distintas, cada uma com seu fluxo próprio:

| Interface | Destinatário | Função Principal |
|-----------|-------------|-----------------|
| Área do Psicólogo | Profissional | Dashboard, cadastro de pacientes, análise molar, visualização de dados, notificações |
| Área do Paciente | Paciente | Diário ABC molecular (registro diário de situações, antecedentes, respostas e consequências) |

---

## Fluxo do Psicólogo

### 1. Acesso
O psicólogo cria um PIN de 4 dígitos para proteger seus dados clínicos. Esse PIN é armazenado localmente no navegador.

### 2. Dashboard
Ao entrar, o psicólogo visualiza um painel com:
- Número total de pacientes ativos
- Total de registros moleculares (diários ABC dos pacientes)
- Total de sessões molares registradas
- Alertas não lidos (notificações)
- Status de preenchimento do dia (quais pacientes preencheram ou não)

### 3. Gestão de Pacientes
- Cadastrar novo paciente com nome, e-mail, telefone, data de nascimento, comportamentos-alvo e observações iniciais
- O sistema gera automaticamente um **código de acesso de 6 caracteres** para cada paciente
- Esse código deve ser compartilhado com o paciente para que ele acesse o diário

### 4. Detalhes do Paciente
Ao clicar em um paciente, o psicólogo vê:
- Informações do paciente e código de acesso
- Contadores de registros ABC, sessões e intensidade média
- Botões para "Nova Análise Molar" e "Ver Análise de Dados"
- Abas para visualizar registros moleculares (do paciente) e molares (do psicólogo)
- Botão de exportação de dados

### 5. Análise Molar (5 seções)
A análise molar é dividida em 5 seções navegáveis por abas:

**Seção 1 — Modelo ABC Profissional:**
- Data e número da sessão
- Antecedente (onde, com quem, o que fazia/pensava/sentia)
- Resposta (o que disse, fez ou pensou)
- Consequência (o que mudou, como se sentiu)
- Intensidade da emoção (escala 0-10)
- Recorrência da situação
- Função do comportamento
- Observações adicionais

**Seção 2 — Análise Molar (Telescópio):**
- Filogênese (biológico)
- Ontogênese (história de vida)
- Cultura
- Ambiente atual como Operação Motivadora
- Autorregras rígidas

**Seção 3 — Quádrupla Contingência (Microscópio):**
- Operação Motivadora (OM)
- Estímulo Discriminativo (SD)
- Resposta Pública (operante)
- Resposta Privada (respondente/encoberto)
- Consequência Imediata
- Consequência Atrasada

**Seção 4 — CRBs e Comportamento Verbal:**
- CRB1 (o problema em sessão)
- CRB2 (a melhora em sessão)
- Comportamento Verbal (autoclíticos, tatos, mandos)
- Incongruência verbal vs. não verbal

**Seção 5 — Formulação e Intervenção:**
- Hipótese funcional
- Plano de intervenção

### 6. Análise de Dados
O dashboard de análise inclui:
- Filtro por período (7 dias, 30 dias, todos)
- Indicadores resumo (registros, sessões, intensidade média, tendência)
- Análise de contingências (R+, R-, punição, outros)
- Gráfico de intensidade emocional ao longo do tempo
- Gráfico de frequência de registros por dia
- Gráfico de funções do comportamento (pizza)
- Gráfico de frequência de ocorrência (pizza)
- Resumo automático para formulação de caso

### 7. Notificações
O sistema gera notificações automáticas quando:
- Um paciente preenche o diário ABC
- A intensidade emocional está alta (>= 8)
- Padrões comportamentais são detectados

---

## Fluxo do Paciente

### 1. Acesso
O paciente digita o código de 6 caracteres fornecido pelo psicólogo.

### 2. Diário ABC (9 passos guiados)
O diário é apresentado em formato de wizard com barra de progresso:

1. **Quando aconteceu?** — Data e hora do evento
2. **O que aconteceu?** — Descrição da situação
3. **O que estava acontecendo antes?** — Antecedente (onde, com quem, pensando, sentindo)
4. **O que você fez a respeito?** — Resposta + evento privado (corpo/mente)
5. **O que aconteceu depois?** — Consequência
6. **Intensidade do sentimento** — Escala visual 0-10
7. **Frequência** — Primeira vez, já aconteceu, 1-2x/semana, 3+x/semana
8. **O que esse comportamento trouxe?** — Seleção múltipla de funções
9. **Observações adicionais** — Texto livre + duração

### 3. Histórico
O paciente pode ver todos os seus registros anteriores com cores indicando intensidade.

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|-----------|-----|
| React 19 + TypeScript | Framework frontend |
| Vite 7 | Build tool |
| TailwindCSS v4 | Estilização |
| Chart.js + react-chartjs-2 | Gráficos e visualizações |
| React Router v7 | Navegação |
| Lucide React | Ícones |
| localStorage | Persistência de dados |

---

## Como Publicar (Deploy)

### Opção 1: Vercel (Recomendado)
1. Acesse [vercel.com](https://vercel.com) e conecte sua conta GitHub
2. Importe o repositório `funcional-tracker-aba`
3. O Vercel detectará automaticamente o Vite e fará o deploy

### Opção 2: Netlify
1. Acesse [netlify.com](https://netlify.com) e conecte sua conta GitHub
2. Importe o repositório
3. Configure o build command: `npx vite build`
4. Configure o publish directory: `dist`

### Opção 3: GitHub Pages
1. Execute `npx vite build`
2. Faça deploy da pasta `dist`

---

## Repositório GitHub

O código-fonte está disponível em: **https://github.com/Leydsonmonteiro/funcional-tracker-aba**

---

## Paleta de Cores

O sistema utiliza uma paleta inspirada em tons de baunilha, sálvia e cores complementares:

| Cor | Uso |
|-----|-----|
| Baunilha (dourado) | Área do psicólogo, botões principais |
| Sálvia (verde) | Área do paciente, indicadores positivos |
| Coral (laranja) | Destaques, alertas moderados |
| Lavanda (roxo) | Consequências, CRBs |
| Sky (azul) | Análise de dados, informações |
| Rose (vermelho) | Alertas de alta intensidade |

---

## Observações Importantes

1. **Privacidade:** Os dados são armazenados localmente no navegador (localStorage). Para uso em produção com múltiplos dispositivos, seria necessário implementar um backend com banco de dados.

2. **Backup:** Recomenda-se exportar os dados periodicamente usando o botão de exportação na página de detalhes do paciente.

3. **Compatibilidade:** O sistema funciona em qualquer navegador moderno (Chrome, Firefox, Safari, Edge) e é responsivo para uso em celulares e tablets.
