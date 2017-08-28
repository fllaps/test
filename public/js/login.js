//定义登录和注册事件，点击发送请求
function login(t,p){
    $.ajax({
        url:'/login',
        type:'post',
        data:{uTel:t,uPwd:p},
        success:function(data){
            if(data.code>0){ $('p.logHint').html('登录成功！3秒后跳转至首页...');
                setTimeout(function(){
                    location='index.html';
                },3000);
                localStorage.setItem('ycm_uid',data.uid);
            }
            else $('p.logHint').html(`登录失败，请先确认是否注册。如果已经注册，可能是用户名或密码输入错误。`);
        }
    })
}
$('#login-index-main-right').on('click','p>a',function(e){
        e.preventDefault();
        var t=$('#login-index-main-right input:eq(0)').val(),p=$('#login-index-main-right input:eq(1)').val();
        login(t,p);
    }
);
