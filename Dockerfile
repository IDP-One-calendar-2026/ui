FROM platformatic/node-caged:25-slim AS base

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack && corepack enable

FROM base AS build
ARG BUILD_AUTH_URL
ARG BUILD_API_URL

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY vendor ./vendor
RUN pnpm install --frozen-lockfile

COPY . .

RUN VITE_BETTER_AUTH_URL="$BUILD_AUTH_URL" \
	VITE_API_URL="$BUILD_API_URL" \
	pnpm run build

FROM platformatic/node-caged:25-slim AS runtime

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g corepack && corepack enable
RUN pnpm add -g serve

COPY --from=build /app/dist /app/dist

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]