var tagname=window.sessionStorage.getItem("tagname")
//初始化列表
$(function () {
    $.ajax({
        type: "get",
        url: "http://47.115.230.54:8080/tag"+tagname,
        dataType: "json",
        success: function (forumlist) {
            $("#forumList").empty()
            updateForumInfo(forumlist.data.records);
        },
        error: function () {
            alert('出现问题')
        }
    })
});

// 更新回帖评论信息
function updateReview(reviewInfo) {
    var rows = [];
    $.each(reviewInfo, function (i, a) {
        console.log(a.content)
        rows.push('<div class="media forumfloor"> <div class="col-lg-3 text-center userInfo"> <img class="align-self-center avatar" src="'
            + a.pictureUrl
            + '"/><h6 class="username">'
            + a.username
            + '</h6></div><div class="col-lg-9 pt-15"><p class="forumContent">'
            + a.content
            + '</p></div><div class="other"><span class="floorNum">1楼&nbsp;</span><span class="time">发帖时间'
            + a.createTime
            + '</span></div></div>')
    })
    $("#reviewlist").append(rows.join(''));
}