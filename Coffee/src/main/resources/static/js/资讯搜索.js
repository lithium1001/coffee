var searchInput = document.getElementById('searchInput');
var suggestionsList = document.getElementById('suggestions');

searchInput.addEventListener('input', function() {
    var keyword = searchInput.value.toLowerCase();

    // 如果搜索关键词为空，则不执行 AJAX 请求并清空联想内容列表
    if (keyword === '') {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
    } else {
        // 使用 AJAX 请求 JSON 数据
        $.ajax({
            url: 'http://47.115.230.54:8080/CoffeeVerse/articles',
            type: 'GET',
            dataType: 'json',
            success: function(jsonData) {
                var fieldValues = findFieldValues(jsonData, 'title');

                // 过滤标题与关键词匹配的项
                var filteredValues = fieldValues.filter(function(value) {
                    return value.toLowerCase().includes(keyword);
                });

                // 清空联想内容列表
                suggestionsList.innerHTML = '';

                // 根据过滤结果生成联想项并添加到列表中
                filteredValues.forEach(function(value) {
                    var articleId = findArticleIdByTitle(jsonData, value);
                    var listItem = document.createElement('li');
                    listItem.textContent = value;
                    listItem.addEventListener('click', function() {
                        redirectToPage(articleId);
                    });
                    suggestionsList.appendChild(listItem);
                });

                // 显示或隐藏下拉框
                if (filteredValues.length > 0) {
                    suggestionsList.style.display = 'block';
                } else {
                    suggestionsList.style.display = 'none';
                }
            },
            error: function() {
                console.log('Error occurred while fetching JSON data.');
            }
        });
    }
});


function findFieldValues(json, field) {
    var values = [];

    function traverse(obj) {
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                var value = obj[property];
                if (typeof value === 'object') {
                    traverse(value);
                } else if (property === field) {
                    values.push(value);
                }
            }
        }
    }

    traverse(json);
    return values;
}

function findArticleIdByTitle(json, title) {
    var records = json.data.records;
    for (var i = 0; i < records.length; i++) {
        if (records[i].title === title) {
            return records[i].articleId;
        }
    }
    return null;
}

function redirectToPage(articleId) {
    // 将要跳转至的页面 URL
    var pageURL = '资讯详情页.html?id=' + encodeURIComponent(articleId);
    window.location.href = pageURL;
}