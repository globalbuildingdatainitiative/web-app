
// Use import.meta.env for Vite variables (must be prefixed with VITE_)
const processEnv: Record<string, string> = { ...import.meta.env } as Record<string, string>;

// Support for injected variables (e.g., from entrypoint.sh)
const injectedEnvVariable: Record<string, string> =
  typeof window !== "undefined" &&
  (window as Window & { injectedEnvVariable?: Record<string, string> }).injectedEnvVariable
    ? (window as Window & { injectedEnvVariable?: Record<string, string> }).injectedEnvVariable
    : {};

// Merge Vite and injected variables
const env = {
  ...processEnv,
  ...injectedEnvVariable,
};
env.BASE_URL_WITHOUT_SLASH = (env.VITE_BASE_URL || "").replace(/\/$/, "");
window._env = env;
export { env };