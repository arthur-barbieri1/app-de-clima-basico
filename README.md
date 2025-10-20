🌤️ App de Clima com Efeitos Visuais
Um aplicativo de clima moderno e interativo com efeitos visuais impressionantes que respondem às condições meteorológicas em tempo real.

https://img.shields.io/badge/Status-Finalizado-green
https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white
https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white
https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black



🚀 Características
🌟 Principais Funcionalidades
🌤️ Previsão do Tempo em Tempo Real - Dados precisos de qualquer cidade do mundo

🎭 Efeitos Visuais Dinâmicos - Backgrounds e animações que mudam conforme o clima

📍 Geolocalização - Detecta automaticamente sua localização

🔍 Autocomplete Inteligente - Sugestões de cidades enquanto digita

📱 Design Responsivo - Funciona perfeitamente em todos os dispositivos

🌪️ Efeitos Visuais Implementados
Efeito	Emoji	Descrição
Sol	☀️	Céu ensolarado com nuvens passageiras
Nublado	☁️	Céu coberto por diversas nuvens
Chuva	🌧️	Efeito de chuva com gotas realistas
Tempestade	⚡	Raios e chuva intensa
Neve	❄️	Flocos de neve caindo suavemente
Noite	🌙	Céu estrelado com efeito de brilho
Neblina	🌫️	Camadas de neblina móveis
Ventania	💨	Folhas voando com o vento
🛠️ Tecnologias Utilizadas
Frontend: HTML5, CSS3, JavaScript (ES6+)

API: OpenWeatherMap API

Design: CSS Grid, Flexbox, Gradientes, Animações CSS

Performance: Debounce, Cache de requisições

Responsividade: Mobile-First, Media Queries

📦 Instalação
Pré-requisitos
Navegador moderno com suporte a JavaScript

Conexão com internet

API Key do OpenWeatherMap (gratuita)

Passos para Configuração
Clone o repositório

bash
git clone https://github.com/arthur-barbieri1/app-de-clima-basico.git
cd app-de-clima-basico
Obtenha uma API Key

Acesse OpenWeatherMap

Crie uma conta gratuita

Gere sua API Key

Configure a API Key
No arquivo script.js, substitua:

javascript
const apiKey = "SUA_API_KEY_AQUI";
Execute o projeto

Abra o arquivo index.html no navegador

Ou sirva via servidor local:

bash
python -m http.server 8000
🎮 Como Usar
🔍 Buscar por Cidade
Digite o nome da cidade no campo de busca

Use as sugestões do autocomplete

Clique em "Buscar" ou pressione Enter

📍 Usar Localização Atual
Clique em "Minha Localização"

Permita o acesso à localização

O clima será carregado automaticamente

🎭 Testar Efeitos Visuais
Clique em qualquer botão na seção "Testar Efeitos"

Observe o background e animações mudando

Cada efeito mostra dados climáticos simulados

📱 Responsividade
O projeto foi desenvolvido com abordagem Mobile-First:

📱 Mobile (≤ 768px): Layout otimizado para touch

💻 Tablet (768px - 1024px): Grid adaptável

🖥️ Desktop (≥ 1024px): Experiência completa

🔄 Landscape: Layout especial para orientação horizontal

🎨 Estrutura do Projeto
text
app-de-clima-basico/
│
├── index.html          # Estrutura principal
├── style.css           # Estilos e animações
├── script.js           # Lógica e interações
├── imagem/
│   └── sun.png         # Ícone do site
└── README.md          # Documentação
🔧 Personalização
Adicionar Novos Efeitos
javascript
// No script.js, adicione no switch case:
case 'novo-efeito':
    createNovoEfeito();
    showTestMessage("🌞 Novo Efeito", "Descrição", 25, 23, 10, 60);
    break;
Modificar Cores
css
/* No style.css, edite os gradientes */
.novo-efeito {
    background: linear-gradient(135deg, #cor1 0%, #cor2 100%) !important;
}
🌐 API Utilizada
OpenWeatherMap
Tipo: REST API

Plano: Free Tier (1000 chamadas/dia)

Endpoints:

weather - Dados climáticos atuais

geo/1.0/direct - Autocomplete de cidades

Exemplo de Resposta
json
{
  "name": "São Paulo",
  "main": {
    "temp": 22.5,
    "feels_like": 23.1,
    "humidity": 65
  },
  "weather": [{
    "main": "Clouds",
    "description": "nublado"
  }],
  "wind": {
    "speed": 3.2
  }
}
🚀 Performance
Otimizações Implementadas
✅ Debounce nas buscas (300ms)

✅ Cache de requisições (5 minutos)

✅ Animações CSS otimizadas

✅ Lazy Loading de efeitos visuais

✅ Compressão de assets

Métricas
⚡ Tempo de carregamento: < 2s

📦 Tamanho total: ~15KB

🌐 Requests: 1 (API externa)

🤝 Contribuindo
Contribuições são bem-vindas! Siga estos passos:

Fork o projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)

Commit suas mudanças (git commit -m 'Add some AmazingFeature')

Push para a branch (git push origin feature/AmazingFeature)

Abra um Pull Request

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

👨‍💻 Autor
Arthur Barbieri

GitHub: @arthur-barbieri1

Portfólio: arthurbarbieri.dev

🙏 Agradecimentos
OpenWeatherMap pela API gratuita

Comunidade de desenvolvedores por recursos e tutoriais

Todos que testaram e deram feedback no projeto

📞 Contato
Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato:

📧 Email: arthurbarbieri30@gmail.com

🐦 Twitter: @artturroo_

<div align="center"> ⭐ Não se esqueça de dar uma estrela no repositório se você gostou do projeto! </div>
