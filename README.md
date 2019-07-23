## JavaScript DOM编程艺术 第12章综合示例
预览地址: https://zuoxiaobai.github.io/jsdom_project/

### 配置Github Pages
现在需要将静态页面放到github，并确保可以在线预览对应的效果，配置Github Pages可以实现对应的需求
- 在仓库根目录创建docs文件夹，并在该目录新建index.html文件，待会配置成功生成链接后，就可以访问到该文件了。
```html
<!-- 测试HTML代码 -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>testPage</title>
  </head>
  <body>
    <p>这是一个index页面</p>
  </body>
</html>

```
- 打开仓库的设置，找到GitHub Pages配置位置
![打开仓库设置](./images/github_pages.png)
- 设置 **Source** 为 **master branch/docs folder**，成功后会给出对应的链接，直接访问即可。
![修改source为docs](./images/github_pages2.png)
- 如果之前有使用自己的域名指向github，生成的链接访问会是404，需要在仓库的根目录新建CNAME文件，直接写入对应的域名即可: zuoguoqing.com
> 发现使用自定义域名时，有时候会404，暂时删除自定义域名

![仓库目录截图.png](./images/仓库目录截图.png)
- 进入生成的页面，访问docs里面的项目页面
![测试页面](./images/测试页面.png)

### 在docs目录里实现功能
根据第十二章的描述，一步步完成功能。图片素材、代码均可在 http://www.ituring.com.cn/book/42 下载，但建议只导入图片素材，代码还是根据书中的示例一步步手打完成。
![素材下载](./images/素材下载.png)
