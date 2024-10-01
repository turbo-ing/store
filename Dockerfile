# syntax=docker/dockerfile:1
FROM node:18.20-bookworm

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

COPY . /zknoid
WORKDIR /zknoid

RUN corepack enable
RUN corepack prepare pnpm@9.11.0 --activate

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

