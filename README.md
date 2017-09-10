# goConnectors :)

## Fase Prototipo:

### O que foi feito ?
* Bot Connector para Skype, usando Bot Framework emulator
* Servidor de Proxy para API REST - pasta connector Bot Framework

### Como testar ?
1. instalar o node
1. baixar o codigo do git
1. instalar os packages ``` npm install ```
1. Criar as variaveis de ambiente, geradas a partir do registro do bot no [Bot Framework Dev site] (https://dev.botframework.com)
    1. MICROSOFT_APP_ID
    1. MICROSOFT_APP_PASSWORD
1. subir o server NodeJS ``` npm start ```
1. abrir o Bot Framework emulator para o caminho http://localhost:3978/api/messages
1. Subir tanto o prototpo alfa quanto o connector Bot Framework

### O que falta ?

1. Subir na Azure
1. Transformar em um API Gateway
1. Criar persistencia
1. Juntar sessões (histórico das mensagens)
1. Criar Direct Line para e-mail
