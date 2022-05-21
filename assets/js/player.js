$(function () {
    var playerTrack = $("#player-track"),
        playico = $("#playico"),
        pauseico = $("#pauseico"),
        loadingico = $("#loadingico"),
        playerAll = $("#dowebok"),
        playerTrackbg = $("#player-trackbg"),
        bgArtwork = $('#bg-artwork'),
        bgArtworkUrl, albumName = $('#album-name'),
        trackName = $('#track-name'),
        albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null,
        tFlag = false,
        albums = ['Dawn', 'Me & You', 'Electro Boy', 'Home', 'Proxy (Original Mix)'],
        trackNames = ['Skylike - Dawn', 'Alex Skrindo - Me & You', 'Kaaze - Electro Boy', 'Jordan Schor - Home', 'Martin Garrix - Proxy'],
        albumArtworks = ['_1', '_2', '_3', '_4', '_5'],
        trackUrl = ['images/2.mp3', 'images/1.mp3', 'images/3.mp3', 'images/4.mp3', 'images/5.mp3'],
        playPreviousTrackButton = $('#play-previous'),
        playNextTrackButton = $('#play-next'),
        hideshowButton = $('#hide-show'),
        playershow = 0,
        firstmessage = 0,
        currIndex = -1;

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass('active');
                playerTrackbg.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class', 'fa fa-pause');
                playico.addClass('hideico');
                audio.play();
                showmessage();
            } else {
                playerTrack.removeClass('active');
                playerTrackbg.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class', 'fa fa-play');
                pauseico.addClass('hideico');
                playico.removeClass('hideico');
                audio.pause();
            }
        }, 300);
    }

    function firstplay() {
        setTimeout(function () {
            if (audio.paused) {
                audio.play();
                if (!audio.paused) { 
                    playico.addClass('hideico');
                    i.attr('class', 'fa fa-pause');
                    pauseico.removeClass('hideico');
                    showmessage();
                    firstmessage = 1;
                }
            }
        }, 300);
    }


    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60;

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if (ctMinutes < 10)
            ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10)
            ctSeconds = '0' + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds))
            insTime.text('--:--');
        else
            insTime.text(ctMinutes + ':' + ctSeconds);

        insTime.css({
            'left': seekT,
            'margin-left': '-21px'
        }).fadeIn(0);

    }

    function hideHover() {
        sHover.width(0);
        insTime.text('00:00').css({
            'left': '0px',
            'margin-left': '0px'
        }).fadeOut(0);
    }

    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass('active');
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes;
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds;

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes;
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds;

        if (isNaN(curMinutes) || isNaN(curSeconds))
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes + ':' + curSeconds);

        if (isNaN(durMinutes) || isNaN(durSeconds))
            tTime.text('00:00');
        else
            tTime.text(durMinutes + ':' + durSeconds);

        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


        seekBar.width(playProgress + '%');

        if (playProgress == 100) {
            selectTrack2(1);
            /*i.attr('class', 'fa fa-play');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);*/
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function () {
            if ((nTime == 0) || (bTime - nTime) > 1000) {
                albumArt.addClass('buffering');
                pauseico.addClass('hideico');
                loadingico.removeClass('hideico');
            }
            else{
                albumArt.removeClass('buffering');
                loadingico.addClass('hideico');
                pauseico.removeClass('hideico');
            }
            bTime = new Date();
            bTime = bTime.getTime();

        }, 100);
    }

    function selectTrack2(flag) {
        /*
        * 歌单详细见
        * https://api.uomg.com/doc-rand.music.html
        */
        $.getJSON('https://api.uomg.com/api/rand.music?', {
            mid: '7250343074'
            ,format: 'json'
        }, function(json, textStatus) {
            if (json.code == 1) {
                if (flag == 0)
                    i.attr('class', 'fa fa-play');
                else {
                    albumArt.removeClass('buffering');
                    i.attr('class', 'fa fa-pause');
                }

                seekBar.width(0);
                trackTime.removeClass('active');
                tProgress.text('00:00');
                tTime.text('00:00');

                currAlbum = json.data.artistsname;
                currTrackName = json.data.name;
                currArtwork = json.data.picurl;

                audio.src = json.data.url;

                nTime = 0;
                bTime = new Date();
                bTime = bTime.getTime();

                if (flag != 0) {
                    audio.play();
                    playerTrack.addClass('active');
                    albumArt.addClass('active');
                    playico.addClass('hideico');
                    clearInterval(buffInterval);
                    checkBuffering();
                }

                albumName.text(currAlbum);
                trackName.text(currTrackName);
                showmessage();
                albumArt.find('img.active').removeClass('active');
                $('#album-pic').addClass('active');

                $('#album-pic').attr('src',currArtwork);

                bgArtwork.css({
                    'background-image': 'url(' + currArtwork + ')'
                });
                playerTrackbg.css({
                    'background-image': 'url(' + currArtwork + ')'
                });
            }
        });
    }

    function showmessage() {
        if(!audio.paused)
            $.NZ_MsgBox.toast({ content: "当前播放：" + currTrackName + " - " + currAlbum, location: "top", showtime: 2500 });
    }

    function initPlayer() {
        audio = new Audio();

        selectTrack2(0);

        audio.loop = false;

        playPauseButton.on('click', playPause);
        playico.on('click',playPause);
        pauseico.on('click',playPause);
        $("#yun").on('click', function () {
            selectTrack2(1);
        });

        //firstplay();

        sArea.mousemove(function (event) {
            showHover(event);
        });

        sArea.mouseout(hideHover);

        sArea.on('click', playFromClickedPos);

        $(audio).on('timeupdate', updateCurrTime);

        playPreviousTrackButton.on('click', function () {
            selectTrack2(-1);
        });
        playNextTrackButton.on('click', function () {
            selectTrack2(1);
        });
        hideshowButton.on('click', function () {
            if(playershow == 1){
                playerAll.addClass('hide');
                playershow = 0;
                if(audio.played) {
                    playerTrack.removeClass('active');
                    playerTrackbg.removeClass('active');
                    albumArt.removeClass('active');
                }
            }else{
                playerAll.removeClass('hide');
                playershow = 1;
                if(audio.paused) {
                }else{
                    playerTrack.addClass('active');
                    playerTrackbg.addClass('active');
                    albumArt.addClass('active');
                }
            }
        });
    }
    
    $window.on('load', initPlayer() );
    
});


