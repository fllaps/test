$('div.advice-center>button').click(function(){
    var title=$('div.advice-center p.advice-title input').val(),
        content=$('div.advice-center p.advice-content textarea').val(),
        phone=$('div.advice-center p.advice-tel input').val(),
        msg=$('div.advice-center h6').css('color','#e4393c');
    if(title.length>30) { msg.html('注意：您的标题超过30字，请精简一下');return ;}
    else if(content.length>300) { msg.html('注意：您的内容超过了300字，请精简一下');return ;}
    else {
    $.ajax({
        url:'/sendSug',
        type:'POST',
        data:{title:title,content:content,uTel:phone},
        success:function(data){
            if(data.code<0) {
                $('div.advice-center h6').html('提交失败，请确认网络状况');
            }
            else $('div.advice-center h6').html('提交成功！非常感谢您的宝贵意见，我们会尽快处理您的意见');
        }
    })
    }
});
