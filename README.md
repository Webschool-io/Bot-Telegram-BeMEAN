# Bot-Telegram-BeMEAN

Bot, para o Telegram, criado pelo Be MEAN.

**User: @BeMEANoficial_bot**

A ideia é que ele possa lhe ajudar a achar a informação mais fácil, principalmente em se tratando de **tecnologia**, além disso executa código em JavaScript!!!

## Comandos

- (Quem|O que|O q|oq|Cadê|Cade) (é|eh|eah|e|significa) {BUSCA}? 
  - Busca na Wikipedia e no DuckDuckGo e envia o texto
  - Exemplo: O que é JavaScript?
  - Exemplo: o que é React.js?
- Onde (fica|está|é|eh) {BUSCA}?
  - Busca no Maps e envia a localização
  - Exemplo: Onde fica Curitiba?
  - Exemplo: onde fica PUC Consolação São Paulo?
- Cálculos
  + Cálculos simples e usando funções do objeto Math do JS
  - Exemplo: 2 + 3 - 4 * 5 / 1
  - Exemplo: 2 + Math.pow(2,3) + Math.sqrt(9) + Math.max(1,2,3,4,5,6)
- Data
  + Executa funções do objeto Date do JS
  + Exemplo: Date.now()
  + Exemplo: var dt = new Date; dt.getFullYear();
- JS {COMANDO}
  + Busca o comando no site da [MDN](http://mdn/.io) e retorna a URL
  + Exemplo: js map
  + Exemplo: js date
- GME {String}
  + Retorna a URL da pergunta a ser pesquisada no Google
  + Exemplo: gme como se faz café?
  + Retorno: http://pt-br.lmgtfy.com/?q=como+se+faz+caf%C3%A9%3F
- {ARRAY}.map({CALLBACK})
  + Executa o comando map
  + Exemplo: [1,2,3,4].map( num => num*2 )
  + Exemplo: [1,2,3,4].map( num => num*Math.sqrt(9) )
- {ARRAY}.filter({CALLBACK})
  + Executa o comando filter
  + Exemplo: [1,2,3,4].filter( num => num%2 )
  + Exemplo: [1,2,3,4].filter( num => !(num%2) )
- {ARRAY}.reduce({CALLBACK})
  + Executa o comando reduce
  + Exemplo: [1,2,3,4].reduce( (antes, atual) => antes+atual )
  + Exemplo: [1,2,3,4].reduce( (antes, atual) => antes*atual )
- regex {REGEX}.test({STRING})
  + Executa o comando test
  + Exemplo: regex /bazing/.test('bazinga')
  + Exemplo: regex /[0-9]/.test('82882')
}

## Funcionalidades

- Quem é ...? // Busca na WIkipedia
- Onde é ...? // Busca no Maps e envia a localização
- O que é ...? // Busca no Google
- #twitter hashtag // busca a hashtag no Twitter
- #insta hashtag // busca a hashtag no Instagram
- [Code]... ? // Busca no Stackoverflow
- [Github]... ? // Busca no Github
- [Be MEAN] ...? // Adiciona a pergunta na FAQ para q eu, Suissa, responda
- [Be MEAN FAQ] // Lista as perguntas e respostas da FAQ
- [Error] // Busca no Stackoverflow
- [JS]{COMANDO} // Busca em mdn.io/{COMANDO}
- [eval]{CODE} // Enviar para um https://eval.in da vida
- Integração com a API Luis.ai com tradução automática

## Autores

- [rohmunhoz](https://github.com/rohmunhoz)
- [suissa](https://github.com/suissa)
