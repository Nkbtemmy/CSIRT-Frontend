FROM node:18 AS build
WORKDIR /app
COPY package.json ./
RUN npm install --force
COPY . ./
RUN npm run build

# Final Stage
FROM node:alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
RUN npm install --omit=dev --force
RUN npm install -g serve
CMD ["serve", "-s", "build"]



# FROM node:18-alpine
# WORKDIR /app
# RUN npm install -g npm@10.2.2
# COPY package*.json ./
# RUN npm ci --force
# COPY . .
# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "start"]