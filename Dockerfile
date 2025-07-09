FROM rust:1.85 AS wasm-builder

RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

WORKDIR /app

COPY doc-maker/Cargo.toml doc-maker/Cargo.lock doc-maker/
COPY doc-maker/src doc-maker/src/

WORKDIR /app/doc-maker
RUN wasm-pack build --target web --release --out-dir pkg

FROM node:20-alpine AS react-builder

RUN npm install -g pnpm

WORKDIR /app

COPY web-app/package.json web-app/pnpm-lock.yaml web-app/pnpm-workspace.yaml web-app/
COPY web-app/tsconfig*.json web-app/vite.config.ts web-app/eslint.config.js web-app/

COPY --from=wasm-builder /app/doc-maker/pkg /app/doc-maker/pkg

WORKDIR /app/web-app
RUN pnpm install

RUN pnpm add file:../doc-maker/pkg

COPY web-app/src src/
COPY web-app/public public/
COPY web-app/index.html .

RUN pnpm build

FROM nginx:alpine

COPY --from=react-builder /app/web-app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 