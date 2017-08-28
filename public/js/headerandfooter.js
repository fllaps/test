
(function(){
	//加载头部和尾部
    //*/
	$("#header").load("header.html");
	$("#footer").load("footer.html");
	//点击出现模态框
	// $('#cancelLog').click(function(){
	// 	$('div.login').hide();
	// });
	$('#footer').on('click','#cancelLog',function(){
		$('div.login').hide();
	});

	//广告轮播.
	//图片的src要异步请求，放在一个数组中，在定时器中取出arr[n]的src，实现动态化处理
	//轮播时，可以通过将所有图片并排放在一个ul中，通过从左向右移动（改变left），当一次轮播完，再将left改变为0，（可以在ul最后再放一个第一张图片，这样减小轮播间切换的视觉差）
	var n=1;
	setInterval(function(){
        var imgSrc=$('#top3 img').attr("src");
        n++;
        $('#top3 img').animate({opacity:0.3},10,function(){
            $('#top3 img').attr('src',imgSrc.substr(0,imgSrc.indexOf('.')-1)+n+'.jpg').animate({opacity:1},500)
        }.bind(this));
     	var aEle='#top3 >div.toppage i:eq('+(n-1)+')';
     	$(aEle).addClass('active').parent().siblings().children().removeClass('active');
        if(n==4) {
        	n=1;
        	$('#top3 >div.toppage i:eq(0)').addClass('active');
            $('#top3 >div.toppage i:eq(2)').removeClass('active');
        };
	},5000);
	$('div.toppage').on('click','a',function(e){
        var imgSrc=$('#top3 img').attr("src"),m=0;
        e.preventDefault();
        $(e.target).addClass('active').parent().siblings().children().removeClass('active');
        $('#top3 img').animate({opacity:0.3},10,function(){
        	$('#top3 img').attr('src',imgSrc.substr(0,imgSrc.indexOf('.')-1)+this.getAttribute('href')+'.jpg').animate({opacity:1},500)
		}.bind(this));
    });
	//票据融资部分，点击弹出模态框
    function loginTo(){
        $('div.login').show();
    }
    function loginRef(){
        $('div.login').show();
        if(localStorage.getItem('ycm_uid'))
        {
            $('div.login div>p').html('此功能暂未开通，敬请期待...');
            $('div.login div>a:eq(0)').hide();
        }
        else $('div.login div>p').html('此功能暂未开通，敬请期待...');
    }
	$('#header').click(function(){
        $('div.login').show();
	})
})();


