# Cloudflare Pages 部署指南

## 方案一：通过 Git 仓库部署（推荐）

### 1. 推送代码到 Git 仓库
```bash
# 初始化 Git（如果还没有）
git init

# 添加文件
git add .

# 提交
git commit -m "Ready for Cloudflare Pages deployment"

# 添加到 GitHub/GitLab/Bitbucket
git remote add origin https://github.com/你的用户名/cfpack-site.git
git push -u origin main
```

### 2. 在 Cloudflare Pages 控制台部署
1. 登录 https://dash.cloudflare.com/
2. 进入 **Pages** → **Create a project**
3. 选择 **Connect to Git**
4. 选择你的仓库
5. 配置构建设置：
   - **Framework preset**: `None` (因为是静态导出)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node.js version**: `18` 或更高
6. 点击 **Save and Deploy**

部署完成后，你会得到一个 `*.pages.dev` 的测试域名。

---

## 方案二：直接上传 `out` 目录（快速测试）

### 1. 本地构建
```bash
cd C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site
npm run build
```
构建完成后，会生成 `out` 目录。

### 2. 上传到 Cloudflare Pages
1. 登录 https://dash.cloudflare.com/
2. 进入 **Pages** → **Create a project**
3. 选择 **Direct Upload**
4. 上传 `out` 目录
5. 部署完成

---

## 自定义域名（可选）

1. 在 Cloudflare Pages 项目页面，点击 **Custom domains**
2. 点击 **Set up a domain**
3. 输入你的域名（如 `www.gzchanfer.com`）
4. 按照提示添加 DNS 记录
5. 等待 DNS 生效（通常几分钟到几小时）

---

## 本地测试静态导出

构建完成后，可以用以下命令本地预览：
```bash
cd C:\Users\Sarah\WorkBuddy\2026-06-11-17-27-29\cfpack-site
npm run preview
```
然后访问 `http://localhost:3000`

---

## 注意事项

1. **静态导出的限制**：
   - 不支持 API routes
   - 不支持需要服务器的功能
   - 但你的网站是纯展示型，完全没问题

2. **图片优化**：
   - 已配置 `images.unoptimized: true`，确保所有图片正常显示

3. **多语言路由**：
   - 静态导出会生成所有语言的静态 HTML 文件
   - 确保服务器配置了正确的 URL 重写规则（Cloudflare Pages 会自动处理）

4. **更新网站**：
   - 如果用 Git 部署，每次 push 代码会自动触发重新部署
   - 如果直接上传，需要重新上传 `out` 目录

---

## 常见问题

### Q: 部署后页面 404？
A: 确保 `next.config.ts` 里配置了 `trailingSlash: true`，并且 Cloudflare Pages 的构建输出目录是 `out`。

### Q: 图片不显示？
A: 确保所有图片都在 `public/` 目录下，并且使用了相对路径（如 `/images/xxx.jpg`）。

### Q: 多语言切换不工作？
A: 检查 `next.config.ts` 的 `trailingSlash: true` 是否配置，这确保了 `/en` 和 `/en/` 都能正确访问。
