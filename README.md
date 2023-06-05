# Evernode dApp Ledger Explorer

If you have an [Evernode](https://github.com/EvernodeXRPL) host that you want to monitor created ledgers or view a specific ledger, then you can use this simple web-based app. The app is built with Vue 3 using composition API.

## Screenshots
<img width="1054" alt="screenshot-1" src="https://github.com/jremi/evernode-dapp-ledger-explorer/assets/5322988/91c9a514-1c57-409d-8a80-5e5ed29e2510">
<img width="1050" alt="screenshot-2" src="https://github.com/jremi/evernode-dapp-ledger-explorer/assets/5322988/7c36b98f-6ab3-4bde-90c7-89279643fafd">

## Why was this built?

It was to provide both an example of using the `HotPocket.events.ledgerEvent` within a basic single page application but also to have a easy way to searh ledger sequence numbers or monitor newly created ledgers in real-time thru a graphical web-based user-interface.

To view ledger information you can either click a ledger from the live carousel or use the search lookup box. If the ledger number is found a dialog window will appear with additional details related to that specific ledger number.

Pull requests welcomed.

## How to set the Evernode host?

By default the app will attempt to establish a websocket connection to an Evernode host running on `localhost:8081`.  If you want to use a different host, change the environment variable inside **.env** named `VITE_EVERNODE_HOST` to a different Evernode host. For example: `evernode-1.mydomain.com:26201`

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
