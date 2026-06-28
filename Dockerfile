# syntax=docker/dockerfile:1.4

ARG NODE_VERSION=22

# Các biến Build-arg để bật/tắt driver (Mặc định là true - cài đặt tất cả)
ARG INSTALL_PG=true
ARG INSTALL_MYSQL=true
ARG INSTALL_MSSQL=true
ARG INSTALL_ORACLE=true
ARG INSTALL_SQLITE=true
ARG INSTALL_REDIS=true

####################################################################################################
## Build Packages

FROM node:${NODE_VERSION}-alpine AS builder

ARG INSTALL_PG
ARG INSTALL_MYSQL
ARG INSTALL_MSSQL
ARG INSTALL_ORACLE
ARG INSTALL_SQLITE
ARG INSTALL_REDIS

# Remove again once corepack >= 0.31 made it into base image
# (see https://github.com/backoffice/backoffice/issues/24514)
RUN npm install --global corepack@latest

RUN apk --no-cache add python3 py3-setuptools build-base

WORKDIR /backoffice

COPY package.json .
RUN corepack enable && corepack prepare

# Deploy as 'node' user to match pnpm setups in production image
# (see https://github.com/backoffice/backoffice/issues/23822)
RUN chown node:node .
USER node

ENV NODE_OPTIONS=--max-old-space-size=8192

COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY --chown=node:node . .
RUN <<EOF
	set -ex
	# Loại bỏ các database driver không dùng đến trước khi cài đặt dependencies
	INSTALL_PG=${INSTALL_PG} \
	INSTALL_MYSQL=${INSTALL_MYSQL} \
	INSTALL_MSSQL=${INSTALL_MSSQL} \
	INSTALL_ORACLE=${INSTALL_ORACLE} \
	INSTALL_SQLITE=${INSTALL_SQLITE} \
	INSTALL_REDIS=${INSTALL_REDIS} \
	node -e '
		const fs = require("fs");
		const f = "api/package.json";
		const pkg = JSON.parse(fs.readFileSync(f, "utf8"));
		const opts = pkg.optionalDependencies || {};
		if (process.env.INSTALL_PG !== "true") delete opts["pg"];
		if (process.env.INSTALL_MYSQL !== "true") delete opts["mysql2"];
		if (process.env.INSTALL_MSSQL !== "true") delete opts["tedious"];
		if (process.env.INSTALL_ORACLE !== "true") delete opts["oracledb"];
		if (process.env.INSTALL_SQLITE !== "true") delete opts["sqlite3"];
		if (process.env.INSTALL_REDIS !== "true") delete opts["@keyv/redis"];
		fs.writeFileSync(f, JSON.stringify(pkg, null, 2));
	'
	pnpm install --recursive --no-frozen-lockfile
	npm_config_workspace_concurrency=2 pnpm run build
	pnpm --filter backoffice deploy --legacy --prod dist
	cd dist
	# Regenerate package.json file with essential fields only
	# (see https://github.com/backoffice/backoffice/issues/20338)
	node -e '
		const f = "package.json", {name, version, type, exports, bin} = require(`./${f}`), {packageManager} = require(`../${f}`);
		fs.writeFileSync(f, JSON.stringify({name, version, type, exports, bin, packageManager}, null, 2));
	'
	mkdir -p database extensions uploads
EOF

####################################################################################################
## Create Production Image

FROM node:${NODE_VERSION}-alpine AS runtime

RUN npm install --global \
	pm2@5 \
	corepack@latest # Remove again once corepack >= 0.31 made it into base image

USER node

WORKDIR /backoffice

ENV \
	DB_CLIENT="sqlite3" \
	DB_FILENAME="/backoffice/database/database.sqlite" \
	NODE_ENV="production" \
	NPM_CONFIG_UPDATE_NOTIFIER="false"

COPY --from=builder --chown=node:node /backoffice/ecosystem.config.cjs .
COPY --from=builder --chown=node:node /backoffice/dist .

EXPOSE 8055

CMD : \
	&& node cli.js bootstrap \
	&& pm2-runtime start ecosystem.config.cjs \
	;
