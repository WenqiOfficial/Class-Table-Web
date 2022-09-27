var botton = $("#testbotton"),
    $window = $(window),
    date = new Date();//获取系统当前时间

$window.on('load', function() {
    window.setTimeout(sayhi, 1000);
});


function sayhi(){
    var daytime = date.getHours();
    var day = date.getDay();
    if(daytime<6){
        daytime = "凌晨了！";
    }else if(daytime<11){
        daytime = "上午好";
    }else if(daytime<13){
        daytime = "中午好";
    }else if(daytime<16){
        daytime = "下午好";
    }else if(daytime<18){
        daytime = "傍晚好";
    }else if(daytime<24){
        daytime = "晚上好"
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
    $.NZ_MsgBox.toast({ content: day + " ， " + daytime, location: "center", showtime: 6000 });
}