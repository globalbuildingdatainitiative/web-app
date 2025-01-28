FROM node:20-alpine

WORKDIR /app

COPY ./dist /app/dist
RUN npm install -g vite@5.1.6

CMD ["vite", "preview", "--port", "8000", "--host", "0.0.0.0"]
