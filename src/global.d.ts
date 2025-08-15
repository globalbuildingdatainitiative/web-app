declare global {
  interface Window {
    injectedEnvVariable: ProcessEnv
    _env: ProcessEnv
  }
}

export {}
