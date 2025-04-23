# Use a Node.js base image

FROM node:22-alpine AS build

RUN corepack enable

# Set the working directory
WORKDIR /app

# Copy package manager configuration files
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy the application code
COPY . ./

ENV HOST http://dev-cafe-01.xcorp.fairstone.ca:3003

# Build the application
RUN pnpm build

# Build Stage 2

FROM node:22-alpine
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./

ENV PORT 80
ENV HOST 0.0.0.0

# Expose the port
EXPOSE 80

# Start Nuxt
CMD ["node", "/app/server/index.mjs"]