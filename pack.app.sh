echo -e "\033[33m 开始打包... \033[0m"
echo -e "\033[33m vue静态文件打包中.... \033[0m"
cd ./vue-static
npm run build
echo -e "\033[33m vue静态文件打包完成... \033[0m"
echo -e "\033[33m app打包中............ \033[0m"
cd ..
npm run build
echo -e "\033[33m app打包完成! \033[0m"