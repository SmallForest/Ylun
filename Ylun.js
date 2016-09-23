$(function(){
    var css = "<style>#Ylun{width:100%;height:100%;background:#fff}#YImgArea{width:100%;height:80%}#YImgArea img{width:100%;height:100%}#YImgList{width:100%;height:15%}#YImgList ul{width:94%;height:100%;float:left;overflow:hidden}#YImgList ul li{width:15%;height:100%;float:left;cursor:pointer;margin-right:1%;border:1px solid #fff;background:#000}#YImgList ul li img{width:100%;height:100%;opacity:.5}#YImgList .Yprev{width:3%;background:#000;color:#FFF;position:relative;z-index:100;float:left;height:100%;text-align:center;cursor:pointer;opacity:.5}#YImgList .Ynext{width:3%;background:#000;color:#FFF;position:relative;z-index:100;float:right;height:100%;text-align:center;cursor:pointer;opacity:.5;height:100%;}#YImgList .Ycurrent{border:1px solid #fd9826}</style>";
    $('#Ylun').before(css);
    // 绑定click事件
   $('#YImgList li').click(function(){
        var th = $(this);
        changeImg(th);
   })
   // 页面加载时自动触发第一个
   $('#YImgList li').first().trigger('click');
    var sumLen = $('#YImgList ul').width();
    var liLen = $('#YImgList li').width();
    var num = Math.floor(sumLen / liLen)
    $('#YImgList').attr('direction' , 'next');
    var h = $('.Yprev').height();
    $('.Yprev,.Ynext').css('line-height',h+'px');

    // 向上
   $('#YImgList .Yprev').click(function(){
        $('#YImgList').attr('direction' , 'prev');
        var index = $('li[class=Ycurrent]').index();
        var len = $('#YImgList li').length - 1;
        index - 1 >= 0 ? index = index - 1 :index = len;
        $('#YImgList li').eq(index).trigger('click');
        var left = $('#YImgList li').eq(index).offset().left;
        if(left < liLen & index >= 1){
            $('#YImgList li').eq(index-1).css('display','block');
            $('#YImgList li').eq(index+sumLen-1).css('display','block');
        }else if(index == len){
            $('#YImgList li').css('display','block');
            for (var i = len - num; i >= 0; i--) {
                $('#YImgList li').eq(i).css('display','none');
            }
        }             
   })
    // 向下
   $('#YImgList .Ynext').click(function(){
        $('#YImgList').attr('direction' , 'next');                
        var index = $('li[class=Ycurrent]').index();
        var len = $('#YImgList li').length - 1;
        index + 1 <= len ? index = index + 1 :index = 0;
        $('#YImgList li').eq(index).trigger('click');
        if(index >= num){
            $('#YImgList li').eq(index-num).css('display','none');
        }else{
            $('#YImgList li').css('display','block');
        }                    
   })
   $('#YImgList li').mouseover(function(){
        $(this).css('background','#FFF').find('img').css('opacity',1);
   })
   $('#YImgList li').mouseout(function(){
        if($(this).hasClass('Ycurrent')){
            return false;
        }
        $(this).css('background','#000').find('img').css('opacity',.5);
   })
   // 自动切换
   var timer = setInterval(function(){
        var action = $('#YImgList').attr('direction');
        $('.Y'+action).trigger('click');
   },3000);
})
function changeImg(th){
    $('#YImgArea img').attr('src' , th.find('img').attr('src'));
    th.addClass('Ycurrent').siblings().removeClass('Ycurrent');
    th.css('background','rgba(2,2,2,0)').find('img').css('opacity' , 1);
    th.siblings().css('background','rgba(2,2,2,1)').find('img').css('opacity' , 0.5);
}
            