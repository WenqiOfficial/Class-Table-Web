var botton = $("#testbotton"),
    $window = $(window),
    w1 = $("#w1"),
    w2 = $("#w2"),
    w3 = $("#w3"),
    w4 = $("#w4"),
    w5 = $("#w5"),
    date = new Date();//获取系统当前时间
var daytime = date.getHours();
var day = date.getDay();

$window.on('load', function() {
    window.setTimeout(sayhi, 1000);
    window.setTimeout(todaysclass, 2000);
});


function sayhi(){
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

function todaysclass(){
    var r = document.querySelector(':root');
    day = 3;
    r.style.setProperty('--colors'+ day , 'red');
}