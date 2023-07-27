// 初始化用户左侧信息栏
$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/user/" + window.localStorage.getItem("myname"),
        dataType: "json",
        success: function (personInfo) {
            // alert('没有问题');
            const a = personInfo.data.user;
            window.localStorage.setItem("id", a.id)
            $("#avatar_src").val(a.avatarUrl)
            $("#myavatar").attr("src", a.avatarUrl);
            $("#myname").text(a.username);
            $("#myemail").text(a.email);
            $("#sign_username").val(a.username);
            $("#sign_pass").val(a.password);
            $("#sign_email").val(a.email);
        },
        error: function () {
            alert('出现问题')
        }
    })
});
//用户信息修改待完善
$("#modifyInfo").click(function () {
    const username = document.getElementById("sign_username").value;
    const password = document.getElementById("sign_pass").value;
    const email = document.getElementById("sign_email").value;
    const info = {
        id: window.localStorage.getItem("id"),
        "username": username,
        "email": email,
        avatarUrl: $("#avatar_src").val()
    };
    if (password !== "") {
        info.password = password
    }
    $.ajax({
        type: "post",
        url: "http://localhost:8080/user/update",
        data: JSON.stringify(info),
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        },
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log(data)
            if (data.code === 200) {
                window.localStorage.setItem("myname", data.data.username)
                window.localStorage.setItem("myavatar", data.data.avatarUrl)
                location.reload()
            }
        },
        error: function () {
            alert('出现问题')
        }
    })
})
$("#avatar").change(function (e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userName', window.localStorage.getItem("myname"));

    $.ajax({
        type: "post",
        url: "http://localhost:8080/user/avatar",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            $("#avatar_src").val("http://localhost:8080"+res.data.imgUrl)
            alert("头像上传成功！")
        }
    })
})
$("#logout").click(function () {
    window.localStorage.clear();
    window.location.href = "http://localhost:8080/首页.html"
})

