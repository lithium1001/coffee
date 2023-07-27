//加载资讯内容
//新闻
$(document).ready(function () {
    // 发起 Ajax 请求
    $.ajax({
        url: 'http://47.115.230.54:8080/CoffeeVerse/articles?pageNum=1&pageSize=10&filter=资讯',  // 替换为实际的文本文件路径
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            // 请求成功后的处理
            $("#title_news").text( json.data.records[0].title)
            $("#content_news").text(json.data.records[0].abs)
            createNews("news", json.data.records, "资讯分tag板块.html?name=资讯丨新闻&id=1")
        },
        error: function () {
            // 请求失败时的处理
            alert('无法加载文本内容！');
        }
    });
    $.ajax({
        url: 'http://47.115.230.54:8080/CoffeeVerse/articles?pageNum=1&pageSize=10&filter=行业报告',  // 替换为实际的文本文件路径
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            // 请求成功后的处理
            $("#title_report").text( json.data.records[0].title)
            $("#content_report").text(json.data.records[0].abs)
            createNews("bg", json.data.records, "资讯分tag板块.html?name=资讯丨行业报告&id=2")
        },
        error: function () {
            // 请求失败时的处理
            alert('无法加载文本内容！');
        }
    });
    $.ajax({
        url: 'http://47.115.230.54:8080/CoffeeVerse/articles?pageNum=1&pageSize=10&filter=赛事',  // 替换为实际的文本文件路径
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $("#title_competition").text( json.data.records[0].title)
            $("#content_competition").text(json.data.records[0].abs)
            createNews("competition", json.data.records, "资讯分tag板块.html?name=资讯丨赛事&id=3")
        },
        error: function () {
            // 请求失败时的处理
            alert('无法加载文本内容！');
        }
    });
});


function createNews(id, newsData, link) {
    // 获取 newsContainer 容器
    const newsContainer = document.getElementById(id);

    // 循环遍历 newsData 数组，并动态创建 p 元素，并插入到容器中
    for (let i = 0; i < newsData.length; i++) {
        const data = newsData[i];
        const element = i === 0 ? 'h2' : 'p'; // 根据索引决定使用 h2 或 p 元素

        const tag = document.createElement(element);
        const link = document.createElement('a');

        link.href = `资讯详情页.html?id=${data.articleId}`; // 设置链接的 href 属性
        link.id = data.id; // 设置链接的 id 属性
        link.textContent = data.title; // 设置链接的文本内容

        // 将链接元素添加到 h2 或 p 元素中
        tag.appendChild(link);

        // 将 h2 或 p 元素添加到容器中
        newsContainer.appendChild(tag);
    }

    // 添加“更多信息”链接
    const blogBtn = document.createElement('div');
    blogBtn.classList.add('blog__btn');

    const moreLink = document.createElement('a');
    moreLink.href = link;
    moreLink.textContent = '更多信息';

    blogBtn.appendChild(moreLink);
    newsContainer.appendChild(blogBtn);
}
