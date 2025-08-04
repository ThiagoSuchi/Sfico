# Dockerfile é um "manual" para construir uma imagem Docker.
# Foca em uma única aplicação/container.

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copia todo o restante do projeto
COPY . .

# Gera o client do Prisma
RUN npx prisma generate

# Expõe a porta usada pela aplicação
EXPOSE 3080

CMD [ "npm", "run", "dev" ]