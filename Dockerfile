# Fallback if Nixpacks is unavailable. Railway prefers railway.json / Nixpacks.
FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-bookworm-slim AS run
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/SERVICE_CONTENT_PRIMARY.json ./SERVICE_CONTENT_PRIMARY.json
COPY --from=build /app/public ./public
EXPOSE 5000
CMD ["npm", "start"]
