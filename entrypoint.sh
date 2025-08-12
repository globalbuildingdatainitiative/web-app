#!/usr/bin/env bash

# documentation: the goal of this script is to inject environment variables into the frontend
# by creating a javascript file that will be injected in the index.html file
# this script is called by the Dockerfile
# the script is inspired by https://medium.com/@jans.tuomi/how-to-use-environment-variables-in-a-built-frontend-application-in-an-nginx-container-c7a90c011ec2
# and chat-gpt-4

WWW_DIR=/app
ENV_PREFIX=VITE_
INJECT_FILE_PATH="${WWW_DIR}/injectEnv.js"
INDEX_FILE_PATH="${WWW_DIR}/index.html"
SITE_FILE_PATH="${WWW_DIR}/site.webmanifest" # don't exist yet
# Create the file
echo "window.injectedEnvVariable = {" >> "${INJECT_FILE_PATH}"
for envrow in $(printenv); do
  IFS='=' read -r key value <<< "${envrow}"
  if [[ $key == "${ENV_PREFIX}"* ]]; then
    echo "  ${key}: \"${value}\"," >> "${INJECT_FILE_PATH}"
  fi
  if [[ $key == "BASE_URL" ]]; then
    echo "  ${key}: \"${value}\"," >> "${INJECT_FILE_PATH}"
    BASE_URL="${value}"
  fi
  # We decided to not use NODE_ENV for now it should be always production
done
echo "};" >> "${INJECT_FILE_PATH}"

sed -i "s|\(href\|src\)=\"|\1=\"${BASE_URL}|gi" $INDEX_FILE_PATH
sed -i "s|\(\"/\)|\"${BASE_URL}|gi" $SITE_FILE_PATH
# execute the command passed to the entrypoin
# see https://stackoverflow.com/questions/39082768/what-is-the-difference-between-cmd-and-entrypoint-in-a-dockerfile

[ "$#" -eq 0 ] && nginx -g 'daemon off;' || exec "$@"