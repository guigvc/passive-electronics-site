# Passive Electronics 公司网站部署指南

## 项目概述

这是一个 Passive Electronics 公司的展示型网站，用于吸引客户询价。包含：
- 英文版产品展示页
- 公司介绍和客户 logo 展示（华为、小米、TCL 等）
- 6 款 IoT 产品图片和描述
- 询价表单（使用 Web3Forms）
- 响应式设计（桌面 + 移动端）

## 文件结构

```
company-site/
├── index.html              # 主页面
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── main.js            # 交互逻辑
│   └── config.js          # Web3Forms 配置
└── assets/
    └── images/            # 产品图片
        ├── product-touch-display.png
        ├── product-smart-mirror.png
        ├── product-cpe-device.png
        ├── product-ipc-camera.png
        ├── product-smart-cabinet.png
        └── product-smart-wall.png
```

## 部署步骤（新电脑）

### 方法一：从 GitHub 克隆 + Cloudflare Pages 部署

#### 步骤 1：克隆仓库到本地

```bash
# 克隆项目
git clone https://github.com/guigvc/passive-electronics-site.git
cd passive-electronics-site
```

#### 步骤 2：部署到 Cloudflare Pages

1. 登录 Cloudflare：https://dash.cloudflare.com/
   - 使用账号：guigvc@gmail.com

2. 进入 Workers & Pages
   - 左侧菜单点击 **Workers & Pages**
   - 点击 **Create application**
   - 选择 **Pages** 标签（不是 Workers）
   - 点击 **Connect to Git**

3. 选择仓库
   - 选择 GitHub 账号：guigvc
   - 选择仓库：**passive-electronics-site**
   - 点击 **Begin setup**

4. 配置构建设置
   - **Project name**: passive-electronics-site
   - **Production branch**: main
   - **Framework preset**: None
   - **Build command**: 留空
   - **Build output directory**: `/`
   - 点击 **Save and Deploy**

5. 等待部署完成（约 1-2 分钟）
   - 部署成功后会自动分配临时域名：`passive-electronics-site.pages.dev`

#### 步骤 3：绑定自定义域名 passive-electronics.com

1. 在 Cloudflare Pages 项目页面
   - 点击顶部导航 **Custom domains**
   - 点击 **Set up a custom domain**

2. 添加域名
   - 输入：`passive-electronics.com`
   - 点击 **Continue**

3. 配置 DNS（两种方式）

   **方式 A：域名已在 Cloudflare**
   - Cloudflare 会自动配置 DNS 记录
   - 点击 **Activate domain** 即可

   **方式 B：域名在其他注册商**
   - 需要在域名注册商处添加 DNS 记录：
     ```
     类型: CNAME
     名称: @
     目标: passive-electronics-site.pages.dev
     ```
   - 或者将域名的 Nameservers 改成 Cloudflare 的：
     - 在 Cloudflare 添加站点（Add site）
     - 按提示修改 Nameservers
     - 等待 DNS 生效（最多 24 小时）

4. 等待 SSL 证书生成（自动，约 5-10 分钟）
   - 完成后网站就能通过 `https://passive-electronics.com` 访问

### 方法二：纯静态文件托管（不用 Git）

如果不想用 GitHub，可以直接上传文件：

1. 在 Cloudflare Pages 创建项目时选择 **"Drag and drop your files"**
2. 把整个 `company-site` 文件夹拖进去
3. 点击 **Deploy**
4. 按步骤 3 绑定自定义域名

**缺点**：每次更新内容要手动重新上传。

---

## 询价表单配置

网站使用 **Web3Forms** 免费服务接收询价邮件。

### 当前配置
- 表单提交后邮件会发送到：`guigvc@gmail.com`
- Access Key 已配置在 `js/config.js` 文件中

### 如需更改接收邮箱

1. 访问：https://web3forms.com/
2. 注册新账号或使用现有账号
3. 创建新的 Access Key
4. 编辑 `js/config.js`，替换 `WEB3FORMS_ACCESS_KEY` 的值
5. 重新推送到 GitHub 或重新部署

---

## 本地预览（可选）

如果想在本地浏览器查看效果：

```bash
# 方法 1：直接双击 index.html

# 方法 2：使用 Python 启动本地服务器
cd company-site
python -m http.server 8000
# 然后访问：http://localhost:8000

# 方法 3：使用 Node.js
npx http-server -p 8000
```

---

## 常见问题

### Q1：域名绑定后显示 "这个网站无法访问"
**A**：DNS 记录可能还未生效，等待最多 24 小时。可以用 https://dnschecker.org/ 检查 DNS 传播状态。

### Q2：网站显示但没有样式
**A**：检查 `css/style.css` 和 `js/main.js` 文件路径是否正确，确保相对路径匹配。

### Q3：表单提交后没有收到邮件
**A**：
1. 检查垃圾邮件文件夹
2. 确认 Web3Forms Access Key 是否正确
3. 登录 Web3Forms 后台查看提交记录

### Q4：想修改网站内容怎么办
**A**：
1. 在本地修改文件
2. 提交到 GitHub：
   ```bash
   git add .
   git commit -m "更新内容"
   git push origin main
   ```
3. Cloudflare Pages 会自动重新部署（约 1 分钟）

---

## 下一步优化建议

1. **添加阿拉伯语版本**（针对中东客户）
   - 创建 `index-ar.html`
   - 使用 RTL 布局
   - 添加语言切换按钮

2. **SEO 优化**
   - 添加 Google Analytics
   - 提交 sitemap.xml 到 Google Search Console
   - 优化 meta 描述和关键词

3. **性能优化**
   - 压缩图片（使用 TinyPNG 或 WebP 格式）
   - 启用 Cloudflare CDN 加速

4. **增加功能**
   - 产品详情页（每个产品单独页面）
   - 客户案例/评价
   - 公司资质证书展示
   - 多语言支持（中文、英文、阿拉伯语）

---

## 技术支持

- **GitHub 仓库**：https://github.com/guigvc/passive-electronics-site
- **Cloudflare Pages 文档**：https://developers.cloudflare.com/pages/
- **Web3Forms 文档**：https://docs.web3forms.com/

---

## 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] Cloudflare Pages 项目已创建
- [ ] 自定义域名已绑定
- [ ] SSL 证书已激活（网站显示 🔒 图标）
- [ ] 表单提交测试通过
- [ ] 移动端显示正常
- [ ] 所有产品图片加载正常

---

**创建日期**：2026-10-28  
**最后更新**：2026-10-28  
**域名**：passive-electronics.com  
**临时域名**：passive-electronics-site.pages.dev
