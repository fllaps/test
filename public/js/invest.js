//点击ul部分，通过ajax动态加载数据
$('#invest-main').on('click','ul>li',function(){
    $(this).addClass('active').siblings().removeClass('active');
    var index=$('#invest-main>ul>li').index(this);
    var div='#invest-main div.invextDiv:eq('+index+')';
    $(div).show().siblings('div.invextDiv').hide();
    var fName='',idName='';
    if(index==0) {fName= 'ycm_invest_ypb';idName='#investYpb'}
    else if(index==1)  {fName= 'ycm_invest_ycb';idName='#investYcb'}
    else {fName= 'ycm_invest_hdb';idName='#investHdb'}
    loadDetail(fName,idName);
});
function loadDetail(fn,id){
    $.ajax({
        type:'POST',
        url:'/getData',
        data:{formName:fn},
        success:function(data){
           if(data.code<0) alert('网络故障，检查网路');
            else renderToView(data,id);
        }
    })
}
function renderToView(data,id){
    var title='';
    switch(id){
        case "#investYpb": title='银票宝';break;
        case "#investYcb": title='银承宝';break;
        case "#investHdb": title='活动标';
    }
    var htmlView="";
    for(var i=0;i<data.length;i++){
        var obj=data[i];
        htmlView+= `<div>
                     <div class="left">
                             <p>${title}</p>
                             <h4>第${obj.issue}期</h4>
                     </div>
                    <ul class="three-characters">
                        <li class="percent">
                              <h4>${obj.percent}<b>%</b></h4>
                            <p>预期年化收益率比</p>
                        </li>
                         <li class="after">
                            <h4><b>${obj.investPrice}</b></h4>
                            <p>筹标金额(元)</p>
                        </li>
                         <li class="after">
                            <h4><b>${obj.deadline}</b>天</h4>
                            <p>期限</p>
                        </li>
                        <li class="after">
                             <h4><b>${obj.startPrice}</b></h4>
                              <p>起投金额(元)</p>
                         </li>
                        <li class="after">
                            <h4><b>${obj.countMethod}</b></h4>
                             <p>计算方法</p>
                         </li>
                    </ul>
                    <div class="right">
                    <a class="showModal">立即投资</a>
                    </div>
    </div>`;
    }
    console.log(id);
    $(id).html(htmlView);
}
loadDetail('ycm_invest_ypb','#investYpb');

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

$('#invest-main').on('click','.showModal',function(){
    loginRef();
})

