# 어떤 이미지를 사용
FROM node:alpine

# Docker 환경에 폴더 생성
RUN mkdir -p /var/app

# Working Directory 생성
WORKDIR /var/app

# 파일/폴더 복사
COPY . .

# pnpm 설치
RUN npm i -g pnpm

# Dependency 설치
RUN pnpm install

RUN pnpm run build

EXPOSE 3001

CMD ["pnpm", "start:dev"]
# CMD ["node", "dist/main.js"]