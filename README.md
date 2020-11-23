# Clair Widget

The Clair Widget is part of the _Clair Platform_, a system to collect measurements from networked CO2-sensors for indoor air-quality monitoring. It is developed and run by the [Clair Berlin Initiative](https://clair-berlin.de), a non-profit, open-source initiative to help operators of public spaces lower the risk of SARS-CoV2-transmission amongst their patrons.

Technically speaking, the Clair Widget is a JavaScript application that can be run in the browser or any other JavaScript runtime to fetch public measurement data from the API of the Clair Platform. The Widget is served by a webserver of the [Clair Stack](https://github.com/ClairBerlin/clair-stack), the infrastructure-as-code implementation of the Clair Platform.

## Project setup
```
npm install
```

Patch @restate/vuex:

```
cd node_modules
patch -p0 < ../@reststate.patch 
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
