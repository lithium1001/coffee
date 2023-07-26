//加载首页帖子
$(function () {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/post/list",
        dataType: "json",
        success: function (forumlist) {
            // updateForumInfo(forumlist);
            var rows = [];
            $.each(forumlist.data.records, function (i, a) {
                rows.push(' <div class="single-testimonial">\n' +
                    '<div class="testi-author" >'
                    +'<div class="media" id="forumListItem"><img class="avatar align-self-start mr-3" alt="..." src="'
                    + a.avatarUrl
                    + '"/><div class="media-body"> <span class="username" onclick="goPerson(this)" hashId="'
                    + a.userId + '">'
                    + a.username
                    + '</span> <h4 class="forumTitle" onclick="goForum(this)" hashId="'
                    + a.postId+ '">'
                    + a.title
                    + '</h4> <p class="forumContent">'
                    // +a.   看具体后面有没有content
                    +'</p><div><span class="createtime">发帖时间:'
                    +a.createTime
                    +'</span><span class="replies"> &emsp;回帖数：'
                    +'<div class="qt-img">\n' +
                    ' <img src="img/testimonial/qt-icon.png" alt="img">\n' +
                    ' </div>\n' +
                    ' </div>\n' +
                    ' </div>')

            })
            $("#forumList").append(rows.join(''));
        },
        error: function () {
            alert('出现问题')
        }
    })
});