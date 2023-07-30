const tagTitle = document.getElementById("tag_title");

$(document).ready(function () {
    let id = getQueryString("id");
    // 发起 Ajax 请求
    tagTitle.innerText = getQueryString("name");
    if (id === "1") {
        $.ajax({
            url: 'http://localhost:8080/CoffeeVerse/articles?pageNum=1&pageSize=10&filter=资讯',  // 替换为实际的文本文件路径
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                console.log(json.data.records)
                createElementList(json.data.records)
            },
            error: function () {
                // 请求失败时的处理
                alert('无法加载文本内容！');
            }
        });
    } else if (id === "2") {
        console.log(1)
        $.ajax({
            url: 'http://localhost:8080/CoffeeVerse/articles?pageNum=1&pageSize=10&filter=行业报告',  // 替换为实际的文本文件路径
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                // 请求成功后的处理
                createElementList(json.data.records)

            },
            error: function () {
                // 请求失败时的处理
                alert('无法加载文本内容！');
            }
        });
    } else {
        $.ajax({
            url: 'http://localhost:8080/CoffeeVerse/articles?pageNum=1&pageSize=10&filter=赛事',  // 替换为实际的文本文件路径
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                // 请求成功后的处理
                createElementList(json.data.records)
            },
            error: function () {
                // 请求失败时的处理
                alert('无法加载文本内容！');
            }
        });
    }


})

//获取get传值的方法
function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
}

function createElementList(blogData) {
    // 获取 blogContainer 容器
    const blogContainer = document.getElementById('blogContainer');

    // 循环创建多个结构
    for (const data of blogData) {
        // 创建图片元素
        const img = document.createElement('img');
        img.src = data.pictureUrl;
        img.alt = '';
        img.height = 350;
        img.width = 650;//感觉这里有点问题
        // 创建日期元素
        const date = createElementWithClass('div', 'date-home');
        var time=data.date;
        time=time.replace('T',' ')
        time=time.split('.')[0]
        date.textContent = time;

        // 创建标题元素
        const title = document.createElement('h2');
        title.textContent = data.title;

        // 创建内容元素
        const content = document.createElement('p');
        content.textContent = data.abs;

        // 创建“更多信息”链接
        const link = document.createElement('a');
        link.href = "资讯详情页.html?id=" + data.articleId;
        link.textContent = '更多信息';

        // 创建按钮容器并将链接放入其中
        const btnContainer = createElementWithClass('div', 'blog__btn');
        btnContainer.appendChild(link);

        // 创建内容容器，并将其他元素放入其中
        const contentContainer = createElementWithClass('div', 'bsingle__content');
        contentContainer.appendChild(date);
        contentContainer.appendChild(title);
        contentContainer.appendChild(content);
        contentContainer.appendChild(btnContainer);

        // 创建最外层容器，并将图片和内容容器放入其中
        const blogPost = createElementWithClass('div', 'bsingle__post');
        blogPost.appendChild(img);
        blogPost.appendChild(contentContainer);

        // 将最外层容器插入页面中
        blogContainer.appendChild(blogPost);
    }
}