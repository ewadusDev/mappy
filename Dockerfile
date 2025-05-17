# Stage 1: Build
FROM oven/bun:1.2-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN bun i

COPY . .

# Build the Next.js app
RUN bun run build

# Stage 2: Run
FROM oven/bun:1.2-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["bun", "run", "start"]
