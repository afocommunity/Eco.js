
# ECO API Interface

![npm](https://img.shields.io/npm/dw/eco.js) ![GitHub Sponsors](https://img.shields.io/github/sponsors/bombitmanbomb) [![GitHub issues](https://img.shields.io/github/issues/afocommunity/eco.js)](https://github.com/afocommunity/eco.js/issues) ![GitHub](https://img.shields.io/badge/license-MIT-brightgreen) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/eco.js) [![Codacy grade](https://img.shields.io/codacy/grade/bc777618c71e42fb87caae1c0c970327?logo=codacy)](https://www.codacy.com/gh/afocommunity/eco.js/dashboard?utm_source=github.com&utm_medium=referral&utm_content=afocommunity/eco.js&utm_campaign=Badge_Grade) ![GitHub](https://img.shields.io/badge/node->=16.0.0-brightgreen) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/afocommunity/eco.js)

![GitHub package.json version](https://img.shields.io/github/package-json/v/afocommunity/eco.js) ![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/afocommunity/eco.js)

Eco.js is a full WebAPI Interface for ECO GameServers.

# Installation

NPM

```bash
npm install eco.js
```

YARN

```bash
yarn add eco.js
```

# Documentation

Documentation can be found [HERE](https://afocommunity.github.io/eco.js/modules.html)

![Docs](https://img.shields.io/website?down_color=red&down_message=offline&up_color=brightgreen&up_message=online&url=https%3A%2F%2Fafocommunity.github.io%2FOHD-RCON%2Fmodules.html)

# Usage

```ts
import { ECO } from 'eco.js';

const server = new ECO({base_url: 'url_to_eco_server_webview', api_key: 'myAwesomeAPIAdminToken', serverVirtualPlayerName: '[Server]', serverChatUpdateInterval: 8000});

server.isReady.then(() => {
  server.on('NEW_MESSAGE', chat_message => {
    if (chat_message.Receiver == 'General' && chat_message.Text?.contains('!kickme')) {
      chat_message.senderUser.kick('User ran !kickme');
    }
  })
});
```
