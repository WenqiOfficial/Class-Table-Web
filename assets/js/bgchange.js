//写点备注...怕忘记
$(function () {
    var r = document.querySelector(':root'),
        bgbox = $("#bgbox"),
        num = 0,
        nowpid = 0,
        max,temp,
        pic = new Array(),
        picpid = new Array();
        
    //自定义图片↓
    pic[0]="https://cloud.zeroarea.ml:5221/api/v3/file/get/407/pic02new.webp?sign=oEJPS0C75qX5Ox1mQ7ZfIAV7XeN_iyCwUDR8VZv3kN8=:0";
    picpid[0]= 79776133
    
    pic[1]="https://cloud.zeroarea.ml:5221/api/v3/file/get/552/pic01new.webp?sign=B1iWbDd580RSTiBS23D1QNsEc-fIvUbFVOvCEhUo-yc%3D%3A0";
    picpid[1]= 83508760
    
    pic[2]="https://cloud.zeroarea.ml:5221/api/v3/file/get/553/pic03new.webp?sign=-6tPKe7D5bo6Q4FA4q-if_mTwdDbJPvbo8Q7J1mnoIc%3D%3A0";
    picpid[2]= 76685776

    $window.on('load', function() {
        //切换间隔时间（毫秒）
        var timeInterval=12000; 
        setInterval(randompic,timeInterval);
    });

    function randompic () {
        //命运抉择之时(
        do {
            max = 2 //范围（最大图片编号）
            temp = Math.floor(Math.random()*(max+1));
        } while (temp == num);
        
        num = temp;

        bgbox.addClass('black');

        setTimeout(function () {
            r.style.setProperty('--imgurl', 'url(' + pic[num] + ')');
            bgbox.removeClass('black');
            changepid ();//PID切换
        }, 1000);

    }

    //PID显示
    var options = {
        useEasing: true,
        useGrouping: false
       };
    new CountUp("pid", nowpid, picpid[num], 0, 2, options).start();//先来一次
    nowpid = picpid[num];
    function changepid () {
        new CountUp("pid", nowpid, picpid[num], 0, 2, options).start();
        nowpid = picpid[num];
    }
});