$(document).ready(function () {
    $.ajax({
        url: 'http://47.115.230.54:8080/CoffeeVerse/articles?pageNum=1&pageSize=10&filter=all',  // 替换为实际的文本文件路径
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            // 请求成功后的处理
            createElement(json.data.records)
        },
        error: function () {
            // 请求失败时的处理
            alert('无法加载文本内容！');
        }
    });
})

function createElement(latestData) {
    // 获取 latestList 容器
    const latestList = document.getElementById('latestList');

    // 循环遍历 latestData 数组，并动态创建 li 元素并插入到列表中
    for (const data of latestData) {
        const listItem = document.createElement('li');

        // 创建链接元素
        const link = document.createElement('a');
        link.href = '资讯详情页.html?id=' + data.articleId;
        link.id = 'latest1'; // 这里可能需要根据实际数据设置不同的 ID
        link.textContent = data.title;

        // 创建日期元素
        const dateSpan = document.createElement('span');
        dateSpan.classList.add('post-date');
        dateSpan.id = 'd_latest1'; // 这里可能需要根据实际数据设置不同的 ID
        dateSpan.textContent = data.date;

        // 将链接和日期元素添加到 li 元素中
        listItem.appendChild(link);
        listItem.appendChild(document.createTextNode(' ')); // 添加空格
        listItem.appendChild(dateSpan);

        // 将 li 元素添加到列表中
        latestList.appendChild(listItem);
    }
}
