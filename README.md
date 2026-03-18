# Lucky God - Chinese Fortune Website

海外财神祈福独立站 - 自愿打赏商业模式

## 🎯 项目简介

- **定位**：海外华人/老外祈福文化娱乐网站，纯自愿打赏模式
- **合规**：无赌博、无强制消费、纯文化娱乐
- **盈利**：自愿打赏 + Google广告 + 周边分销

## ✨ 功能特性

✅ 3秒不可跳过开场财神动画  
✅ 每日随机财运签（中英文）  
✅ 三题财运测试（计算分数给结果）  
✅ 免费壁纸下载（打赏解锁专属）  
✅ 一键分享到TikTok/Facebook，分享得额外抽签  
✅ PayPal + Stripe 双支付支持  
✅ 响应式设计，手机电脑完美适配  
✅ 完整合规页面：隐私政策、服务条款、免责声明  
✅ Google AdSense 广告位已预留  
✅ SEO友好，利于Google收录  

## 🎨 设计规范

- **主色**：中国红 `#C91F37`
- **辅助色**：富贵金 `#D4AF37`
- **背景色**：米白 `#FFF9F0`
- **风格**：海外轻奢国风，高级喜庆

## 🚀 一键部署

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 登录 [Vercel](https://vercel.com)
3. 导入仓库，点击 Deploy
4. 完成！

### 部署到 Cloudflare Pages

1. 推送到 GitHub / GitLab
2. 在 Cloudflare Pages 创建新项目
3. 选中仓库，直接部署（不需要构建）
4. 完成！

## ⚙️ 配置说明

### 1. PayPal 设置

在 `index.html` 找到这行，替换成你的 PayPal Client ID:

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"></script>
```

### 2. Stripe 设置

完整集成需要后端创建 PaymentIntent，建议：
- 使用 Stripe Checkout 托管页面
- 或者集成 Stripe Payment Link
- 在 `js/app.js` 的 `handleStripePayment()` 中添加你的逻辑

### 3. Google AdSense

在 `index.html` 顶部和底部找到 AdSense 代码，替换成你的:

```html
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
data-ad-slot="XXXXXXXXXX"
```

同样替换头部的 AdSense 脚本：

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

## 📱 TikTok 推广指南

### 内容方向

**华人向**：迎财神、接好运、接财运  
**老外向**：Chinese Lucky Culture, Fortune, Money Attraction  

### 视频脚本模板

- 开场：财神动画
- 音乐：喜庆背景音乐
- 文案：`Like + Follow + Share = Money Coming`
- 主页：Linktree 放独立站链接

### 标签推荐

```
#ChineseFortune #LuckyGod #MoneyMagic #Prosperity #GoodLuck #Fortune #Wealth #ChineseCulture
```

## 💰 盈利模式

1. **自愿打赏** (70%) - 用户请财神喝茶，$1.99 ~ $8.88
2. **Google广告** (20%) - 展示广告获利
3. **周边分销** (10%) - 财神T恤、红绳、手链一件代发（可对接Printful）

## 📄 合规说明

已经包含完整合规文件：

- `pages/privacy.html` - 隐私政策
- `pages/terms.html` - 服务条款
- `pages/disclaimer.html` - 免责声明（明确说明纯娱乐、无赌博、不承诺结果）

所有内容符合海外合规要求，降低支付被封风险。

## 📊 统计

网站使用 localStorage 做简单访客统计，数据存在用户本地。可以接 Google Analytics 做更详细统计。

## 🎯 后期扩展

- [ ] 会员系统 $9.99/月 解锁全年好运
- [ ] 更多壁纸更新
- [ ] 用户自定义签文
- [ ] 邮件订阅每日好运
- [ ] 对接Printful售卖实体周边

## 📝 许可证

MIT License

---

🐟 Built with ❤️ by Lucky God
 
