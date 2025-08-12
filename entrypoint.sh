#!/bin/sh
set -euo pipefail

# ---- documentation ----
# the goal of this script is to inject environment variables into the frontend
# by creating a javascript file that will be injected in the index.html file
# this script is called by the Dockerfile
# the script is inspired by https://medium.com/@jans.tuomi/how-to-use-environment-variables-in-a-built-frontend-application-in-an-nginx-container-c7a90c011ec2
# ---------------------------------

# --- config ---
WWW_DIR="${WWW_DIR:-/usr/share/nginx/html}"
INDEX_FILE_PATH="$WWW_DIR/index.html"
INJECT_FILE_PATH="$WWW_DIR/injectEnv.js"
# --------------

[ -f "$INDEX_FILE_PATH" ] || { echo "ERROR: $INDEX_FILE_PATH not found"; exit 1; }

# 1) Build injectEnv.js from VITE_* envs (simple + safe quotes)
{
  printf 'window.injectedEnvVariable = {\n'
  env | while IFS='=' read -r k v; do
    case "$k" in
      VITE_*)
        esc=$(printf '%s' "$v" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g')
        printf '  %s: "%s",\n' "$k" "$esc"
        ;;
    esac
  done
  printf '};\n'
} > "$INJECT_FILE_PATH"

# 2) Rewrite paths + meta if VITE_BASE_URL is set and not "/"
if [ -n "${VITE_BASE_URL:-}" ] && [ "$VITE_BASE_URL" != "/" ]; then
  BASE="${VITE_BASE_URL%/}"     # -> /webapp
  BASE_SEG=$(printf '%s' "$BASE" | sed 's#^/##')  # -> webapp
  META="$BASE/"                 # -> /webapp/

  echo "Using BASE='$BASE'  META='$META'"

  # Prefix absolute href/src
  sed -i 's#href="/#href="'"$BASE"'/#g' "$INDEX_FILE_PATH"
  sed -i 's#src="/#src="'"$BASE"'/#g'  "$INDEX_FILE_PATH"

  # Normalize duplicates: /webapp/webapp/... -> /webapp/...
  sed -E -i 's#href="/('"$BASE_SEG"'/)+#href="/'"$BASE_SEG"'/#g' "$INDEX_FILE_PATH"
  sed -E -i 's#src="/('"$BASE_SEG"'/)+#src="/'"$BASE_SEG"'/#g'  "$INDEX_FILE_PATH"

  # Update meta content (works for both '>' and '/>')
  sed -i 's#name="base_url" content="[^"]*"#name="base_url" content="'"$META"'"#' "$INDEX_FILE_PATH"
fi

echo "entrypoint complete."

# execute the command passed to the entrypoint
# see https://stackoverflow.com/questions/39082768/what-is-the-difference-between-cmd-and-entrypoint-in-a-dockerfile

[ "$#" -eq 0 ] && nginx -g 'daemon off;' || exec "$@"