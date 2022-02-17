# css 模拟图片透明背景效果

> 版权声明：本文为博主原创文章，未经博主允许不得转载。 欢迎 Issues 留言。

# 一、背景

有时候我们需要处理一些图片预览的情况，然后在一个图片列表中展示图片缩略图会遇到，如果图片是 png 格式的，背景透明但是图案是白色的，看不清怎么办呢？

我们看到浏览器打开控制预览一些图片连接的时候，图片是这样显示的，接下来我们详细说明如何显示这样的透明背景效果。
![示意图.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bd7072c46d1412e8528f1cefecc6820~tplv-k3u1fbpfcp-watermark.image?)

# 二、实现

这里主要利用了 `css` 中的 [background-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)、[background-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position) 、[background-size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)属性实现的，以掘金 logo 为示例做对比效果图：

![对比效果图.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/44ebccdfee204ec0b262cd761b22e42e~tplv-k3u1fbpfcp-watermark.image?)

## 1.background-image

[background-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image) 属性可以设置一个或者多个背景图，由逗号分隔的多个值来指定多个背景图像。

## 2.linear-gradient

我们通过 [linear-gradient ](<https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient()>) 来创建一个表示两种或多种颜色线性渐变的图片。

```css
/*以上两个属性demo*/
.bg-img {
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 0, 0.5),
      rgba(0, 0, 255, 0.5)
    ), url("https://mdn.mozillademos.org/files/7693/catfront.png");
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8b6146c2d1443419ac908b0e39f1282~tplv-k3u1fbpfcp-watermark.image?)

引用 mdn 中的说明示例，让我们对 `linear-gradient`属性有个概念，具体参考 mdn 文档 [linear-gradient ](<https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient()>) ：

```css
/* 渐变轴为45度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 从下到上，从蓝色开始渐变、到高度40%位置是绿色渐变开始、最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);
```

## 3.实现效果图

在前面熟悉了 [background-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image) 和 [linear-gradient ](<https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient()>) 属性的基础上呢，我们就可以进行实现了。

### 1. 首先我们要利用 `linear-gradient` 创建两个图片

```css
/*第一层：从45度开始灰色渐变到25%的位置，透明从0开始，到75%的位置，灰色从0开始到结束，这样有清晰的间隔线*/
linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0, #eee)
```

这里看到的中间白色的部分其实是透明的哈：
![第一层效果.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/225be0c235824c9ab2b1856208e22ed4~tplv-k3u1fbpfcp-watermark.image?)

```css
/*第二层 这里为了举例看的清楚用的红色red，实际改成白色#fff*/
linear-gradient(45deg, #eee 25%, red 0, red 75%, #eee 0, #eee)
```

![第二层效果.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c82a0db00d884b6982206122effa9dca~tplv-k3u1fbpfcp-watermark.image?)

### 2. 接下来叠加在一起看效果：

```css
background-image: linear-gradient(
    45deg,
    #eee 25%,
    transparent 0,
    transparent 75%,
    #eee 0,
    #eee
  ), linear-gradient(45deg, #eee 25%, red 0, red 75%, #eee 0, #eee);
```

![background-image效果.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a1b85fbf8384340bf405975b4782642~tplv-k3u1fbpfcp-watermark.image?)

### 3. 设置 `background-size`

把上图的图片设置成 `20px * 20px` 的大小，铺满整个区域

```css
background-size: 20px 20px;
```

![background-size效果图.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6731503b466341e089b4b05fc011d5d1~tplv-k3u1fbpfcp-watermark.image?)

### 4. 设置 background-position

为每一个图片设置初始位置，因为每个图片大小是 20px，位置偏移是图片大小的一半，是 10px

```css
background-position: 0 0, 10px 10px;
```

**注意：**

> 这里会发现 background-position 用逗号隔开了两个值，这里其实代表的是对于上面我们设置的 background-image 的两张图分别对应的初始位置。

如下图所看到的：

- 把第一层透明的区域从透明改成 `rgba(0,0,0,.5)`，这样可以看到两图叠加的效果。第一层图片位移 `background-position: 0 0`。
- 第二层红色的图位移 `background-position: 5px 5px;` 叠加以后的效果。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5b07301cc90414d954d4a89476d3100~tplv-k3u1fbpfcp-watermark.image?)

再把黑色阴影改成透明，可以看到就成了 4 个正方形的四宫格效果：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b805af75c3f450e83517c0a12ce6986~tplv-k3u1fbpfcp-watermark.image?)

下面把每一个这样的平铺放到全局，并把颜色替换看下最终效果。

### 5.红色替换为白色，最终效果：

```css
background-size: 20px 20px;
background-position: 0 0, 10px 10px;
background-image: linear-gradient(
    45deg,
    #eee 25%,
    transparent 0,
    transparent 75%,
    #eee 0,
    #eee
  ), linear-gradient(45deg, #eee 25%, #fff 0, #fff 75%, #eee 0, #eee);
```

![最终效果.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef64cf4c4f3c4ac7854fdf6bdcb9547d~tplv-k3u1fbpfcp-watermark.image?)

[以上代码 demo 请查看](https://codesandbox.io/s/cssmo-ni-tu-pian-tou-ming-bei-jing-xiao-guo-2tlmev)

# 参考文献

- [background-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)
- [background-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)
- [background-size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)
- [linear-gradient ](<https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient()>)
