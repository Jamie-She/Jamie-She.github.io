# AI Native 个人主页

一个面向AI产品、内容生态、互动体验、UGC与创作者运营方向的个人品牌单页网站。页面以沉浸式作品章节为主，不采用传统简历或卡片墙结构。

## 本地运行

需要 Node.js 18+（推荐 Node.js 20）。

```bash
npm install
npm run dev
```

浏览器打开终端提示的本地地址即可。

## 构建检查

```bash
npm run lint
npm run build
npm run preview
```

生产文件会输出到 `dist/`。

## 替换内容

绝大多数文案和项目数据都集中在：

```text
src/data/content.ts
```

建议优先替换这些内容：

- `profile`：名字、首屏主张、邮箱与社交链接
- `heroMedia`：首屏showreel中的3段作品演示
- `practiceStages`：三阶段实践、AI的作用、阶段产出与作品链接
- `notes`：文章标题、摘要与后续链接
- `capabilities`：能力标签与解释

作品图片集中在`src/assets/practice/`，录屏集中在`src/assets/video/`。替换素材后同步修改`heroMedia`或`practiceStages.media`即可。每个阶段支持`portrait`、`wide`和`system`三种媒体形态；配置`video`后会优先播放录屏，并在离开可视区域后自动暂停。

## 发布到 GitHub Pages

项目已经包含 `.github/workflows/deploy.yml`。

1. 把本目录作为仓库根目录推送到`main`分支。
2. 在仓库的 **Settings → Pages** 中，把 **Source** 设为 **GitHub Actions**。
3. 推送后等待 `Deploy to GitHub Pages` 工作流完成。

当前仓库使用用户主页地址`https://jamie-she.github.io/`。`vite.config.ts`会自动区分用户主页与普通项目仓库，并设置正确的资源路径；本地开发仍使用`/`。

如果你的源码放在大仓库的子目录中，需要相应调整工作流的 `working-directory` 和缓存路径。

## 技术栈

- React
- Vite
- TypeScript
- Tailwind CSS

## 设计参考

`design/`目录中的`concept-immersive-*-v3.png`是本轮3张视觉概念稿，只作为实现参照，不会被打包进网站。
