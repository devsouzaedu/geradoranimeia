# Gerador de Foto Anime

Um aplicativo web para transformar fotos em diferentes estilos artísticos como anime, Disney, Studio Ghibli e mais.

## 🚀 Funcionalidades

- Upload de imagem com visualização prévia
- Seleção de múltiplos estilos artísticos
- Transformação de fotos usando técnicas de IA
- Integração com sistema de pagamento PIX através da AbacatePay
- Interface responsiva e amigável

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React para aplicações web
- **React 19** - Biblioteca JavaScript para criar interfaces de usuário
- **TypeScript** - Superset tipado de JavaScript
- **TailwindCSS** - Framework CSS para design responsivo
- **AbacatePay API** - API de pagamentos brasileira

## ⚙️ Como Executar

Requisitos:
- Node.js 18+
- npm ou yarn

Para executar o projeto localmente:

```bash
# Instalar dependências
npm install
# ou
yarn

# Iniciar servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

Acesse `http://localhost:3000` para visualizar a aplicação.

## 🚧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
ABACATEPAY_API_KEY=sua_chave_api
ABACATEPAY_API_URL=https://api.abacatepay.com/v1
EMAIL_RECEIVER=dev.souzaedu@gmail.com
```

### Modo de Desenvolvimento

No modo de desenvolvimento, as transações de pagamento são simuladas. Para configuração em produção, ajuste os arquivos relevantes em `src/app/lib/abacatepay.ts`.

## 📄 Fluxo da Aplicação

1. **Página Inicial** - Upload da foto e seleção do estilo
2. **Instrução de Pagamento** - Geração do QR Code PIX e instruções
3. **Processamento** - Após confirmação do pagamento, a imagem é processada
4. **Entrega** - O resultado é enviado para o email cadastrado

## 📝 Licença

Este projeto está sob licença privada. Todos os direitos reservados.

---

Desenvolvido por Eduardo Souza - dev.souzaedu@gmail.com
