function register(p,t){
    $.ajax({
        url:'/addUser',
        type:'post',
        data:{userPwd:p,userTel:t},
        success:function(data){
            if(data.code>0) {
                $('p.regHint').html('注册成功，3秒后跳转...');
                setTimeout(function(){location.href='login-index.html'},3000);
            }
            else { $('p.regHint').html('注册失败，请重试')};
        }
    });
}
$("#loginToData").click(function(e){
    e.preventDefault();
    var utel=$('#personal-register input:eq(0)').val(),
        upwd=$('#personal-register input:eq(1)').val(),
        vefi=$('#personal-register input:eq(2)').val(),
        inviTel=$('#personal-register input:eq(3)').val();
    var regTel=/^[0-9]{11}$/,regPwd=/^[0-9a-zA-Z]{6,}$/;
    if(!regTel.test(utel)) {
        $('p.regHint').html('手机格式错误，请重试');
        return ;
    }else if(!regPwd.test(upwd)) {
        $('p.regHint').html('密码格式不正确，请设置密码格式为6位数以上的英文与数字');
        return ;
    }
    else{  register(upwd,utel);  }
});
$("#loginToData02").click(function(e){
    e.preventDefault();
    var utel=$('#company-register input:eq(0)').val(),upwd=$('#company-register input:eq(1)').val();
    register(upwd,utel);
});
$('#register-index-main-left li:eq(0)').click(
    function(){
        $('#personal-register').show();
        $("#company-register").hide();
        $(this).children().addClass('active').parent().siblings().children().removeClass('active');
    }
);
$('#register-index-main-left li:eq(1)').click(
    function(){
        $('#personal-register').hide();
        $("#company-register").show();
        $(this).children().addClass('active').parent().siblings().children().removeClass('active');
    }
);
