FROM platformatic/node-caged:25-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack
RUN corepack enable

COPY . /app
WORKDIR /app

FROM base AS prod-deps
RUN pnpm install --prod --frozen-lockfile

FROM base AS build
ARG BUILD_AUTH_URL
ARG BUILD_UI_URL
ARG BUILD_API_URL

RUN pnpm install --frozen-lockfile
RUN VITE_BETTER_AUTH_URL="$BUILD_AUTH_URL" \
	VITE_API_URL="$BUILD_API_URL" \
	pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 4173
CMD ["pnpm", "preview"]