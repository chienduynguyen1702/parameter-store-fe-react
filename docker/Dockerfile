# # Sử dụng image node để build ReactJS
# FROM node:latest AS build

# # Thiết lập thư mục làm việc
# WORKDIR /app

# # Copy package.json và package-lock.json để cài đặt các dependencies
# COPY package*.json ./

# # Cài đặt dependencies
# RUN npm install

# # Copy toàn bộ mã nguồn vào thư mục làm việc
# COPY . .

# # Build ứng dụng React
# RUN npm run build

# Sử dụng image nginx để chạy ứng dụng build
FROM nginx:stable-alpine

# Copy các file đã build từ image node vào thư mục mặc định của Nginx
COPY ./build /usr/share/nginx/html

# Copy file cấu hình nginx.conf của bạn
# COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Expose cổng 80 để có thể truy cập ứng dụng qua trình duyệt
EXPOSE 80

# Khởi động nginx khi container được chạy
CMD ["nginx", "-g", "daemon off;"]
