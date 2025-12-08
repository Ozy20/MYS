# ---------------------------------------
# Stage 1: Build the React App
# ---------------------------------------
FROM node:22-alpine as build

WORKDIR /app

# 1. Copy package files from the 'frontend/my-app' folder
# Note the path: we go down into frontend -> my-app
COPY frontend/my-app/package*.json ./

# 2. Install dependencies
RUN npm install

# 3. Copy the actual React source code
COPY frontend/my-app/ .

# 4. Build the static files (creates /app/dist)
RUN npm run build

# ---------------------------------------
# Stage 2: Serve with Nginx
# ---------------------------------------
FROM nginx:alpine

# 5. Copy the built assets from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# 6. Copy the config from the 'nginx' folder
# Since the context is root, we copy from 'nginx/default.conf'
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 7. Expose port 80
EXPOSE 80

# 8. Start Nginx
CMD ["nginx", "-g", "daemon off;"]


# 3. How do I update the Nginx version?
# When you are ready to test a "Release Candidate" (e.g., you finished a big feature), you run this command:

# Bash

# docker-compose up --build nginx
# This tells Docker: "Trash the old Nginx snapshot, take a new photo of my code, cook it (build), and serve the fresh meal."