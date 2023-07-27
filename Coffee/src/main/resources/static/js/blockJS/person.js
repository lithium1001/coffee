// 初始化用户左侧信息栏
$(function () {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/"+window.localStorage.getItem("myname"),
        dataType: "json",
        success: function (personInfo) {
            // alert('没有问题');
            var a=personInfo.user
            $("#myavatar").attr("src",a.avatarUrl);
            $("#myname").text(a.username);
            $("#myemail").text(a.email);
        },
        error: function () {
            alert('出现问题')
        }
    })
});
//用户信息修改待完善
$("#modifyInfo").click(function (){

})
$("#logout").click(function (){
    window.localStorage.clear();
    window.location.href = "http://localhost:8080/首页.html"
})


