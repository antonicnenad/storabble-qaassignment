# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy everything else
COPY . .

# Set the default command to run the tests
CMD ["npx", "playwright", "test"]
