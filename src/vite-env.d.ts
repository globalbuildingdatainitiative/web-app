/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_GRAPHQL_API_DOMAIN: string
  readonly VITE_WEB_DOMAIN: string
  readonly VITE_AUTH_API_DOMAIN: string
  readonly VITE_AUTH_API_PATH: string
  readonly VITE_AUTH_WEB_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
