var botton = $("#testbotton"),
    $window = $(window),
    date = new Date();//获取系统当前时间

botton.on('click',testfun);

$window.on('load', function() {
    window.setTimeout(sayhi, 1000);
});

function testfun(){
    $.NZ_MsgBox.tipsbar({
        title: "test~"
        , content: "测试信息！"
        , type: "info"
        , tipsort: "bottom"
        , showtime: 2500
    });
    $.NZ_MsgBox.toast({ content: "测试信息长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长", location: "top", showtime: 300000 });
}

function sayhi(){
    var daytime = date.getHours();
    var day = date.getDay();
    if(daytime<6){
        daytime = "已经凌晨了！勤奋的你也要注意休息了";
    }else if(daytime<11){
        daytime = "上午好，充满元气加油吧！";
    }else if(daytime<13){
        daytime = "中午好，吃完午饭小憩一下很不错哦";
    }else if(daytime<16){
        daytime = "下午好，距离成功就差那么一点点了！";
    }else if(daytime<18){
        daytime = "傍晚好,努力了一天辛苦了";
    }else if(daytime<24){
        daytime = "天黑了..."
    }
    if(day==1){
        day = "今天是周一";
    }else if(day==2){
        day = "今天是周二";
    }else if(day==3){
        day = "今天是周三";
    }else if(day==4){
        day = "今天是周四";
    }else if(day==5){
        day = "今天是周五";
    }else if(day==6){
        day = "今天是周六";
    }else if(day==7){
        day = "今天是周日";
    }
    $.NZ_MsgBox.toast({ content: day + " ; " + daytime, location: "top", showtime: 6000 });
}