FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/.output .output
COPY --from=builder /app/.env .env

EXPOSE 3000

CMD ["node", "--env-file=.env", ".output/server/index.mjs"]
