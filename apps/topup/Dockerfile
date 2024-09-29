FROM devops-registry.smartfren.com/devops/node:18.7-alpine3.16 AS base
 
FROM base AS builder
RUN     yarn config set proxy http://jkt-proxy01.smartfren.com:8080
RUN     yarn config set https-proxy http://jkt-proxy01.smartfren.com:8080

#RUN     export http_proxy=http://jkt-proxy01.smartfren.com:8080; \
#        export https_proxy=http://jkt-proxy01.smartfren.com:8080; \
ENV HTTP_PROXY http://jkt-proxy01.smartfren.com:8080
ENV HTTPS_PROXY http://jkt-proxy01.smartfren.com:8080
RUN    apk update && apk add --no-cache libc6-compat;

# Set working directory.

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=topup --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN     yarn config set proxy http://jkt-proxy01.smartfren.com:8080
RUN     yarn config set https-proxy http://jkt-proxy01.smartfren.com:8080

#RUN     export http_proxy=http://jkt-proxy01.smartfren.com:8080; \
#        export https_proxy=http://jkt-proxy01.smartfren.com:8080; \
#        apk update && apk add --no-cache libc6-compat;
ENV HTTP_PROXY http://jkt-proxy01.smartfren.com:8080
ENV HTTPS_PROXY http://jkt-proxy01.smartfren.com:8080
RUN    apk update && apk add --no-cache libc6-compat;

WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN rm -rf ./yarn.lock
RUN yarn cache clean
RUN yarn install --network-timeout 500000
 
# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=topup...
RUN chmod 777 -R /app/apps/topup/.next
#RUN ls -la /app/apps/topup/public
#RUN chmod 777 -R /app/.next
 
FROM base AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=installer /app .

WORKDIR /app/apps/topup
COPY ./apps/topup/package.json /package.json

EXPOSE 3000
CMD ["yarn", "start"]
