//初始化列表
$(function () {
    $('[data-toggle="popover"]').popover()
    $.ajax({
        type: "get",
        url: "http://47.115.230.54:8080/post/list",
        dataType: "json",
        success: function (json) {
            // 请求成功后的处理
            $("#name1").text( json.data.records[0].username)
            $("#title1").html('<br>' + json.data.records[0].title).attr("hashID", json.data.records[0].postId);
            $("#time1").html('发帖时间：' + json.data.records[0].createTime);
            $("#reply1").html('&emsp;回帖数：' + json.data.records[0].replynum);
            $('#img1').attr("src", json.data.records[0].avatarUrl);
        },
        error: function () {
            alert('出现问题')
        }
    })
    $.ajax({
        type: "get",
        url: "http://47.115.230.54:8080/post/list",
        dataType: "json",
        success: function (json) {
            // 请求成功后的处理
            $("#name2").text( json.data.records[1].username)
            $("#title2").html('<br>' + json.data.records[1].title).attr("hashID", json.data.records[1].postId);
            $("#time2").html('发帖时间：' + json.data.records[1].createTime);
            $("#reply2").html('&emsp;回帖数：' + json.data.records[1].replynum);
            $('#img2').attr("src", json.data.records[1].avatarUrl);
        },
        error: function () {
            alert('出现问题')
        }
    })
    $.ajax({
        type: "get",
        url: "http://47.115.230.54:8080/post/list",
        dataType: "json",
        success: function (json) {
            // 请求成功后的处理
            $("#name3").text(json.data.records[2].username);
            $("#title3").html('<br>' + json.data.records[2].title).attr("hashID", json.data.records[2].postId);
            $("#time3").html('发帖时间：' + json.data.records[2].createTime);
            $("#reply3").html('&emsp;回帖数：' + json.data.records[2].replynum);
            $('#img3').attr("src", json.data.records[2].avatarUrl);
        },
        error: function () {
            alert('出现问题')
        }
    })
    $.ajax({
        type: "get",
        url: "http://47.115.230.54:8080/post/list",
        dataType: "json",
        success: function (json) {
            // 请求成功后的处理
            $("#name4").text( json.data.records[3].username)
            $("#title4").html('<br>' + json.data.records[3].title).attr("hashID", json.data.records[3].postId);
            $("#time4").html('发帖时间：' + json.data.records[3].createTime);
            $("#reply4").html('&emsp;回帖数：' + json.data.records[3].replynum);
            $('#img4').attr("src", json.data.records[3].avatarUrl);
        },
        error: function () {
            alert('出现问题')
        }
    })
});

function goForum(a) {
    var postId = $(a).attr("hashId");
    alert('论坛页面跳转'+ postId);
    window.sessionStorage.setItem("postId",postId)
    window.location.href = "http://47.115.230.54:8080/forum-detail.html";
}

