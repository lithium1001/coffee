var searchInput = document.getElementById('searchInput');
var suggestionsList = document.getElementById('suggestions');

var backendUrls = ['http://localhost:8080/CoffeeVerse/articles', 'http://localhost:8080/post/list','http://localhost:8080/coffee-shop/shoplist'];

searchInput.addEventListener('input', function() {
    var keyword = searchInput.value.toLowerCase();
    var allSuggestions = [];
    if (keyword === '') {
        suggestionsList.innerHTML = '';
        suggestionsList.style.display = 'none';
    } else {
        // 使用 AJAX 请求 JSON 数据
        // 遍历后端接口地址数组
        backendUrls.forEach(function(url) {
            // 使用 AJAX 请求 JSON 数据
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(jsonData) {
                    var fieldValues;
                    if (url === 'http://localhost:8080/coffee-shop/shoplist') {
                        fieldValues = findFieldValues(jsonData, 'name');
                    } else {
                        fieldValues = findFieldValues(jsonData, 'title');
                    }

                    // 过滤标题与关键词匹配的项
                    var filteredValues = fieldValues.filter(function(value) {
                        return value.toLowerCase().includes(keyword);
                    });

                    // 根据过滤结果生成联想项并添加到列表中
                    filteredValues.slice(0, 5).forEach(function(value) {
                        var listItem;
                        if (url === 'http://localhost:8080/CoffeeVerse/articles') {
                            var articleId = findArticleIdByTitle(jsonData, value);
                            listItem = document.createElement('li');
                            listItem.innerHTML = '<span style="color: #000000; border: 3px solid #3f271e; padding: 4px 4px; border-radius: 30px;" >资讯</span><span style="display: inline;">&emsp;' + value + '</span>';
                            listItem.addEventListener('click', function() {
                                redirectToPage(articleId);
                            });
                        } else if (url === 'http://localhost:8080/post/list') {
                            var postId = findpostIdByTitle(jsonData, value);
                            listItem = document.createElement('li');
                            listItem.innerHTML = '<span style="color: #000000; border: 3px solid #76452f; padding: 4px 4px; border-radius: 30px;" >帖子</span><span style="display: inline;">&emsp;' + value + '</span>';
                            listItem.addEventListener('click', function() {
                                goForum(postId);
                            });
                        } else if (url === 'http://localhost:8080/coffee-shop/shoplist') {
                            var shopname = findShopnameByTitle(jsonData, value);
                            listItem = document.createElement('li');
                            listItem.innerHTML = '<span style="color: #000000; border: 3px solid #aa725a ; padding: 4px 4px; border-radius: 30px;" >店铺</span><span style="display: inline;">&emsp;' + value + '</span>';
                            listItem.addEventListener('click', function() {
                                goShop(shopname);
                            });
                        }

                        suggestionsList.appendChild(listItem);
                    });

                    // 将当前接口的过滤结果添加到总的联想结果中
                    allSuggestions.push(...filteredValues);

                    // 显示或隐藏下拉框
                    if (allSuggestions.length > 0) {
                        suggestionsList.style.display = 'block';
                    } else {
                        suggestionsList.style.display = 'none';
                    }
                },
                error: function() {
                    console.log('Error occurred while fetching JSON data.');
                }
            });
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

function findpostIdByTitle(json, title) {
    var records = json.data.records;
    for (var i = 0; i < records.length; i++) {
        if (records[i].title === title) {
            return records[i].postId;
        }
    }
    return null;
}

function findShopnameByTitle(json, title) {
    var records = json.data.records;
    for (var i = 0; i < records.length; i++) {
        if (records[i].name === title) {
            return records[i].shopname;
        }
    }
    return null;
}

function redirectToPage(articleId) {
    // 将要跳转至的页面 URL
    var pageURL = '资讯详情页.html?id=' + encodeURIComponent(articleId);
    window.location.href = pageURL;
}

function goForum(postId) {
    window.sessionStorage.setItem("postId", postId)
    window.location.href = "http://localhost:8080/forum-detail.html";
}

function goShop(shopname) {
    window.sessionStorage.setItem('shopname', shopname)
    window.location.href = "http://localhost:8080/shop-detail.html";
}
