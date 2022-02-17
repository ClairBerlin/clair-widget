# Clair Widget

The Clair Widget is part of the _Clair Platform_[^como-note], a system to collect measurements from networked CO2-sensors for indoor air-quality monitoring. It is developed and run by the [Clair Berlin Initiative](https://clair-berlin.de), a non-profit, open-source initiative to help operators of public spaces lower the risk of SARS-CoV2-transmission amongst their patrons.

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

[^como-note]: The Clair Platform and the Clair-Berlin initiative are now part of the [CO2-Monitoring (COMo) project](https://www.technologiestiftung-berlin.de/projekte/como-berlin), funded by a grant from the [Senate Chancellery of the Governing Mayor of Berlin](https://www.berlin.de/rbmskzl/en/).
