
# Autom.io

**Autom.io** é uma solução de automação de lembretes via WhatsApp desenvolvida para profissionais da saúde e prestadores de serviço. O sistema permite o envio automático de mensagens com base em agendamentos preenchidos em planilhas do Google.

## 🚀 Funcionalidades

- Envio automático de lembretes por WhatsApp para agendamentos do dia seguinte
- Importação de dados via planilha Google Sheets
- Integração com Firebase Functions e Firestore
- Estrutura modular e escalável com TypeScript
- Mensagens personalizadas e notificações inteligentes

## 🧱 Estrutura do Projeto

```
functions/
├── src/
│   ├── functions/
│   │   ├── enviarLembretes.ts          # função agendada
│   │   └── importarPlanilhaGoogle.ts   # função HTTP
│   ├── sheetsImporter.ts               # serviço de leitura da planilha
│   └── index.ts                        # exportações
└── chaves/
    └── service-account.json            # chave da conta de serviço (não subir no Git)
```

## ✅ Pré-requisitos

- Node.js 22+
- Firebase CLI (`npm install -g firebase-tools`)
- Conta no Firebase + Projeto criado
- Conta de desenvolvedor na Meta (WhatsApp Cloud API)
- Conta Google com acesso ao Sheets

## ⚙️ Instalação

```bash
git clone https://github.com/seu-usuario/autom.io.git
cd autom.io/functions
npm install
```

## 🔐 Configuração

- Adicione a chave `service-account.json` em `functions/chaves/`
- Compartilhe a planilha Google com o e-mail da service account
- Configure as variáveis de ambiente se necessário

## 🔧 Execução Local

```bash
firebase login
firebase use --add
firebase emulators:start
```

## ☁️ Deploy

```bash
firebase deploy --only functions
```

## 📩 Teste de Envio

1. Preencha a planilha com nome, telefone, data e hora
2. Compartilhe com a conta de serviço
3. Acesse a URL da função `importarPlanilhaGoogle`
4. Aguarde a função `enviarLembretes` (agendada) ou dispare manualmente

## 📄 Licença

Este projeto está sob licença privada para fins de demonstração e desenvolvimento.

---

Desenvolvido com 💚 por Autom.io
