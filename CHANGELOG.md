# Changelog

## [1.1.0](https://github.com/globalbuildingdatainitiative/web-app/compare/v1.0.1...v1.1.0) (2025-09-04)


### Features

* **gbdi:** Add Asana form for greetings Closes [#353](https://github.com/globalbuildingdatainitiative/web-app/issues/353) ([5ec2dd6](https://github.com/globalbuildingdatainitiative/web-app/commit/5ec2dd62cbf13b299ac544e59880fa8f1268c40f))


### Bug Fixes

* **Greeting:** adjust greeting layout and reposition Beta badge fixes [#353](https://github.com/globalbuildingdatainitiative/web-app/issues/353) ([c6c1f60](https://github.com/globalbuildingdatainitiative/web-app/commit/c6c1f6094c8074c278b212dec4936b96ec3ca676))

## 1.0.0 (2025-08-20)


### ⚠ BREAKING CHANGES

* consolidate Dockerfile by removing Dockerfile.enac-it4r and integrating its content into the main Dockerfile

### Features

* add 'dev' branch to workflow triggers for deployment ([59be122](https://github.com/globalbuildingdatainitiative/web-app/commit/59be122db9f8646985af8f20280bb52b42760358))
* add Dockerfile.enac-it4r and nginx configuration for deployment; keep current Dockerfile behavior for now ([340baf2](https://github.com/globalbuildingdatainitiative/web-app/commit/340baf25930e1b32f96efc0182b160a6b512ff21))
* migrate env handling from VUE_APP/process.env to VITE_/import.meta.env for Vite ([cf03799](https://github.com/globalbuildingdatainitiative/web-app/commit/cf0379949a024b6636965e0b792faba53cf03e14))
* update Dockerfile and entrypoint script to dynamically inject environment variables and create injectEnv.js ([ddd0099](https://github.com/globalbuildingdatainitiative/web-app/commit/ddd00992ebf91e664763fb43b314aa1ff8156e6c))


### Bug Fixes

* add 'stage' branch to deployment trigger in workflow ([5bc8a50](https://github.com/globalbuildingdatainitiative/web-app/commit/5bc8a50091dd076c72954cf64c5217349fac5aec))
* update build context in GitHub Actions and change Nginx to listen on port 8000 ([9c80df0](https://github.com/globalbuildingdatainitiative/web-app/commit/9c80df02c161dba085faf6fabcdad0fac1a6c3de))
* update deploy workflow to use v2.4.1 and adjust Dockerfile for nginx configuration ([75be506](https://github.com/globalbuildingdatainitiative/web-app/commit/75be50662ed71e1180c1862267375e088ff04f7f))
* update deploy workflow to use v2.5.0 for improved functionality ([d739be1](https://github.com/globalbuildingdatainitiative/web-app/commit/d739be1b22aa431aae2f7811d9143eedea13f792))
* update title in index.html to use static name 'GBDI' ([0994120](https://github.com/globalbuildingdatainitiative/web-app/commit/0994120b9d8cb93795fcee63c6d678657f612388))


### Code Refactoring

* consolidate Dockerfile by removing Dockerfile.enac-it4r and integrating its content into the main Dockerfile ([e936561](https://github.com/globalbuildingdatainitiative/web-app/commit/e9365615f74c1abf9c9ecfa8de5715e21b7e7238))
