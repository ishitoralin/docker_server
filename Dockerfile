# 使用 Node.js 官方映像
FROM node:20

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有檔案
COPY . .

# 指定容器開放的 Port（請確保你的後端有監聽這個 port）
EXPOSE 3000

# 啟動應用程式
CMD ["npm", "run", "start"]
