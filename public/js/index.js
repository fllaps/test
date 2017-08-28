    // function loginTo(){
    //     $('div.login').show();
    // }
    function loginRef(){
        $('div.login').show();
        if(localStorage.getItem('ycm_uid'))
        {
            $('div.login div>p').html('此功能暂未开通，敬请期待...');
            $('div.login div>a:eq(0)').hide();
        }
        else $('div.login div>p').html('此功能暂未开通，敬请期待...');
    }
    $('#header').on('click','.showModal',function(){
        loginRef();
    });