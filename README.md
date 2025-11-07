https://doc.vben.pro/guide/introduction/quick-start.html

# 进入项目目录

cd vue-vben-admin

# 使用项目指定的pnpm版本进行依赖安装

npm i -g corepack

# 安装依赖

pnpm install

# 启动项目

pnpm dev

此时，你会看到类似如下的输出，选择你需要运行的项目：│ ◆ Select the app you need to run [dev]: │ ○ @vben/web-antd │ ○ @vben/web-ele │ ○ @vben/web-naive │ ○ @vben/docs │ ● @vben/playground └ 现在，你可以在浏览器访问 http://localhost:5555 查看项目。

# 运行指定项目

如果你不想选择项目，可以直接运行以下命令运行你需要的应用：pnpm run dev:antd pnpm run dev:ele pnpm run dev:naive pnpm run dev:docs pnpm run dev:play
