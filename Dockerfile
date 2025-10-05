# Multi-stage Dockerfile for Next.js app (pnpm)
# Builder stage: installs dependencies and builds the app
FROM node:20-alpine AS builder
WORKDIR /app

# Ensure pnpm is available via corepack
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy lock and package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install deps
COPY . .
RUN pnpm install --frozen-lockfile

# Build the Next.js app
RUN pnpm build

# Runner stage: lean runtime image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only what's needed to run
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose default Next.js port
EXPOSE 3000

# Start the Next.js production server
# Use pnpm start (which runs `next start`) so the package.json start script is respected
CMD ["pnpm", "start", "-p", "3000"]
