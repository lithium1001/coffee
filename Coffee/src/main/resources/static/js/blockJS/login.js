//测试提交，对接程序删除即可
var storage=window.localStorage
$("#button_login").click(function(){
    var username = document.getElementById("login_username").value;
    var password = document.getElementById("login_password").value;
    if(username != null){
        if(password != null){
            $.ajax({
                type: "post",
                url: "http://localhost:8080/user/login",
                dataType: "json",
                data: {
                    username:username,
                    password:password
                },
                success: function (data) {
                    if(data.code==200){
                        alert('登录成功！');
                        storage.token=data.token
                    }
                    else if(data.code==-1){
                        $("#login_prompt").text="账号密码错误"
                    }
                },
                error: function () {
                    alert('出现问题')
                }
            })
        }
        else{
            $("#login_prompt").text("密码不可为空")
        }
    }
    else{
        $("#login_prompt").text("用户名不可为空")
    }
});
var a=true;
var b=true;
var c=true;
//昵称长度检验
$("#sign_username").blur(function(){
    var username = document.getElementById("sign_username").value;
    if(username.length>15||username.length<2){
        $("#prompt_username i").attr("style","color:#e11d07")
        $("#prompt_username i").removeClass(" fa-check-circle")
        $("#prompt_username i").addClass(" fa-exclamation-circle")
        a=false;
    }
    else{
        $("#prompt_username i").attr("style","color:limegreen")
        $("#prompt_username i").removeClass(" fa-exclamation-circle")
        $("#prompt_username i").addClass(" fa-check-circle")
        a=true;
    }
});

//密码长度检验
$("#sign_pass").blur(function(){
    var password = document.getElementById("sign_pass").value;
    if(password.length>20||password.length<6){
        $("#prompt_pass i").attr("style","color:#e11d07")
        $("#prompt_pass i").removeClass(" fa-check-circle")
        $("#prompt_pass i").addClass(" fa-exclamation-circle")
        b=false;
    }
    else{
        $("#prompt_pass i").attr("style","color:limegreen")
        $("#prompt_pass i").removeClass(" fa-exclamation-circle")
        $("#prompt_pass i").addClass(" fa-check-circle")
        b=true;
    }
})
//两次密码验证
$("#sign_checkpass,#sign_pass").blur(function(){
    var password = document.getElementById("sign_pass").value;
    var checkpassword = document.getElementById("sign_checkpass").value;
    if(password!==checkpassword){
        $("#prompt_checkpass").attr("style","display:block")
        c=false
    }
    else{
        $("#prompt_checkpass").attr("style","display:none")
        c=true
    }
});
$("#button_register").click(function(){
    var username = document.getElementById("sign_username").value;
    var password = document.getElementById("sign_pass").value;
    var checkpassword = document.getElementById("sign_checkpass").value;
    var email = document.getElementById("sign_email").value;
    if((a&&b&&c)!=true)
    {
        return;
        alert("不满足条件")
    }
    alert("通过")
    $.ajax({
        type: "post",
        url: "http://localhost:8080/user/register",
        data:{
            "name":username,
            "pass":password,
            "email":email
        },
        contentType : "application/json",
        dataType: "json",
        success: function (data) {
            if(data.code==200){
                alert('注册成功！'+data.user.username);
            }
            else if(data.code==-1){
                $("#prompt_register").attr("style","display:block")
                $("#prompt_register span").text(data.message)
            }},
        error: function () {
            alert('出现问题')
        }
    })
});