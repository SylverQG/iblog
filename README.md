# iBlog

基于 GitHub Issues 的个人博客系统。写博客 = 提 Issue，自动同步展示。

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Nuxt 4 + Vue 3 |
| 样式 | Tailwind CSS v4 |
| 数据源 | GitHub Issues (octokit) |
| Markdown | marked |
| 暗色模式 | @nuxtjs/color-mode |
| 包管理器 | pnpm |
| 部署 | Vercel |

## 如何工作

1. 在 [SylverQG/Blogs](https://github.com/SylverQG/Blogs/issues) 仓库提 Issue
2. Issue 标题 = 博客标题，正文 = 博客内容（Markdown）
3. Labels = 分类/标签
4. 自动从 GitHub API 获取并展示为博客

## 仓库分工

| 仓库 | 用途 |
|------|------|
| [SylverQG/Blogs](https://github.com/SylverQG/Blogs) | 内容仓库，Issues 作为博客内容源 |
| [SylverQG/iblog](https://github.com/SylverQG/iblog) | 代码仓库，Nuxt 4 项目源码 |

## 快速开始

### 前置要求

- Node.js 24.x LTS
- pnpm（推荐）或 npm
- GitHub Personal Access Token（`Issues: Read` 权限）

### 本地运行

```bash
# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env
# 编辑 .env，填入 GITHUB_TOKEN

# 启动开发服务器
pnpm dev
```

访问 `http://localhost:3000`

### 环境变量

| 变量 | 说明 |
|------|------|
| `GITHUB_TOKEN` | GitHub Personal Access Token |
| `GITHUB_OWNER` | 内容仓库拥有者（SylverQG） |
| `GITHUB_REPO` | 内容仓库名（Blogs） |
| `SITE_URL` | 站点地址 |

## 项目结构

```
app/                          # 应用层
├── app.vue                   # 主布局
├── assets/css/main.css       # Tailwind v4 + 博客排版
├── components/               # 组件
│   ├── AppHeader.vue         # 导航栏 + 暗色模式
│   ├── PostCard.vue          # 文章卡片
│   └── TagBadge.vue          # 标签徽章
├── composables/              # 组合式函数
│   └── usePosts.ts
└── pages/                    # 页面
    ├── index.vue             # 首页
    ├── about.vue             # 关于
    ├── posts/[id].vue        # 文章详情
    └── tags/
        ├── index.vue         # 标签列表
        └── [tag].vue         # 标签筛选

server/                       # 服务端 API（文件路由）
├── api/
│   ├── posts.get.ts          # GET /api/posts
│   ├── posts/[id].get.ts     # GET /api/posts/:id
│   ├── tags.get.ts           # GET /api/tags
│   └── webhook.post.ts       # POST /api/webhook
├── types/blog.ts             # 类型定义
└── utils/github.ts           # octokit 封装
```

## 部署到 Vercel

1. 在 [vercel.com](https://vercel.com) 导入 `SylverQG/iblog` 仓库
2. 在 Settings → Environment Variables 添加：
   - `GITHUB_TOKEN`
   - `GITHUB_OWNER` = `SylverQG`
   - `GITHUB_REPO` = `Blogs`
3. 部署后自动从 GitHub Issues 同步博客内容

## 命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 生产构建 |
| `pnpm generate` | 静态生成 |
| `pnpm preview` | 预览生产构建 |

## 许可证

MIT
