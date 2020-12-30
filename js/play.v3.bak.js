$(function () {
  let inited = false;

  function init() {
    if (inited)
      return;
    inited = true;
    let subtitle;
    if (subUrl != '' && subUrl != null) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', subUrl, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function (e) {
        buffer = xhr.response;
        let t = new Uint8Array(buffer);
        t = t.slice(3354);
        let r = pako.inflate(t);
        subtitle = new Blob([r], {type: "text/vtt"});
        initPlayer();
      };
      xhr.send();
    } else {
      initPlayer();
    }

    function initPlayer() {
      if ((typeof ptoken) == 'undefined') {
        $('#video').css({'text-align': 'center', 'font-size': '50px', 'padding-top': '50px'}).html('应版权方要求已屏蔽！');
        return;
      }

      function shuffle(a) {
        var len = a.length;
        for (var i = 0; i < len; i++) {
          var end = len - 1;
          var index = (Math.random() * (end + 1)) >> 0;
          var t = a[end];
          a[end] = a[index];
          a[index] = t;
        }
        return a;
      };
      const currentTime = localStorage.getItem("ct_" + pid);
      if (lines == 1 && m3u8 == null) {
        $.getJSON("/god/" + ptoken + "?sg=" + sg, function (result) {
          if (result.url != null) {

            if (result.url.indexOf("handler") > 0) {
              result.url += '/' + new Date().getTime() + '.mp4';
            }
            result.url = result.url.replace("?rkey", new Date().getTime() + ".mp4?ver=6010&rkey").replace('https', 'http');
            var ftn = result.url.substring(result.url.lastIndexOf("/"));

            var index = 0;
            var sites = ['\x68\x74\x74\x70\x3a\x2f\x2f\x74\x6a\x2d\x63\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x78\x67\x2d\x63\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x73\x7a\x2d\x63\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x78\x61\x2d\x62\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x63\x64\x2d\x63\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x73\x68\x2d\x63\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x67\x7a\x63\x2d\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x6e\x6a\x63\x2d\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x73\x7a\x2d\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d'];
            shuffle(sites);
            const dp = new DPlayer({
              container: document.getElementById('video'),
              autoplay: true,
              video: {
                url: result.url.indexOf('bde4') > 0 ? result.url : sites[index++] + ftn,
                type: 'auto',
                pic: '/images/play_window_pic.png'
              }
            });
            if (subtitle != null) {
              dp.subtitle = {
                url: URL.createObjectURL(subtitle),
                type: 'webvtt',
                fontSize: '25px',
                bottom: '10%',
                color: '#b7daff',
              };
            }
            if (IsPC()) {
              var error = '<a href="/play-help.htm" target="_blank" style="margin-right: 10px;">播放问题？</a>';
              var download = '<a href="' + result.url + '" target="_blank" style="color: #fff !important;margin-right: 10px;">下载</a>';
              $('.xuanji').before(error + download);
            } else {
              $('.xuanji').before('<a href="' + result.url + '" target="_blank" style="color: #fff !important;margin-right: 10px;">下载</a>');
            }
            dp.on('error', function () {
              var url = result.url;
              if (index > sites.length) {
                $('body').toast({
                  position: 'top center',
                  class: 'error',
                  message: '视频格式不支持或地址失效，请刷新页面或者换安卓手机浏览器重试！',
                  showProgress: 'bottom'
                });
                dp.notice('视频格式不支持或地址失效，请刷新页面或者换安卓手机浏览器重试！', -1);
                return;
              }
              dp.notice('视频加载中...未提示失败前请勿刷新页面！', 10000);
              if (index == sites.length) {
                index++;
                url = result.url;
              } else
                url = sites[index++] + ftn;

              dp.switchVideo({
                url: url.replace('https', 'http'),
                pic: '/images/play_window_pic.png'
              });
            });

            dp.on('loadedmetadata', function () {
              dp.video.currentTime = currentTime;
              dp.play();
            });
            dp.on('timeupdate', function () {
              var currentTime = Math.floor(dp.video.currentTime);
              localStorage.setItem("ct_" + pid, currentTime);
            })

            $('.xuanji').click(function () {
              toggle()
            })
          } else {
            $('body').toast({
              position: 'top center',
              class: 'error',
              message: result.msg,
              showProgress: 'bottom'
            });
          }
        });
      } else if (lines == 1 && m3u8 != null) {
        const dp = new DPlayer({
          container: document.getElementById('video'),
          autoplay: true,
          video: {
            url: m3u8,
            type: 'customHls',
            customType: {
              customHls: function (video, player) {
                var config = {debug: true}
                const hls = new Hls(config);
                hls.loadSource(video.src);
                hls.attachMedia(video);
                hls.on(Hls.Events.ERROR, function (event, data) {
                  console.info(data);
                });
              },
            },
            pic: '/images/play_window_pic.png'
          },
          pluginOptions: {
            hls: {
              autoStartLoad: true,
              startFragPrefetch: true,
              maxBufferLength: 120
            },
          }
        });
        if (subtitle != null) {
          dp.subtitle = {
            url: URL.createObjectURL(subtitle),
            type: 'webvtt',
            fontSize: '25px',
            bottom: '10%',
            color: '#b7daff',
          };
        }
        dp.on('loadedmetadata', function () {
          dp.video.currentTime = currentTime;
          dp.play();
        });
        dp.on('timeupdate', function () {
          var currentTime = Math.floor(dp.video.currentTime);
          localStorage.setItem("ct_" + pid, currentTime);
        });
        $('.xuanji').click(function () {
          toggle();
        })
      } else if (lines == 2 && m3u8 != null) {
        const dp = new DPlayer({
          container: document.getElementById('video'),
          autoplay: true,
          video: {
            type: 'customHls',
            customType: {
              customHls: function (video, player) {
                const hls = new Hls();
                hls.loadSource(video.src);
                hls.attachMedia(video);
              },
            },
            quality: [
              {
                name: '线路1',
                url: m3u8,
                type: 'customHls'
              },
              {
                name: '线路2',
                url: 'https://bde4.com/ptoken/' + ptoken,
                type: 'normal',
              }
            ],
            defaultQuality: 0,
            pic: '/images/play_window_pic.png'
          },
          pluginOptions: {
            hls: {
              autoStartLoad: true,
              startFragPrefetch: true,
              maxBufferLength: 120
            },
          }
        });
        if (subtitle != null) {
          dp.subtitle = {
            url: URL.createObjectURL(subtitle),
            type: 'webvtt',
            fontSize: '25px',
            bottom: '10%',
            color: '#b7daff',
          };
        }
        dp.oldSwitchQuality = dp.switchQuality;
        var t = null, playUrl = null, ftn = null, index = 0;
        var sites = ['\x68\x74\x74\x70\x3a\x2f\x2f\x74\x6a\x2d\x63\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x78\x67\x2d\x63\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x73\x7a\x2d\x63\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x78\x61\x2d\x62\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x63\x64\x2d\x63\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x73\x68\x2d\x63\x74\x66\x73\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x67\x7a\x63\x2d\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x6e\x6a\x63\x2d\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d', '\x68\x74\x74\x70\x3a\x2f\x2f\x73\x7a\x2d\x64\x6f\x77\x6e\x6c\x6f\x61\x64\x2e\x66\x74\x6e\x2e\x71\x71\x2e\x63\x6f\x6d'];
        shuffle(sites);
        dp.switchQuality = function (e) {
          t = this;
          if (e == 1) {  //切换的是线路2
            if (playUrl == null) {  //第一次切换
              dp.notice('正在获取地址...', 10000);
              try {
                $.getJSON("/god/" + ptoken + "?sg=" + sg, function (result) {
                  if (result.url != null) {
                    if (result.url.indexOf("handler") > 0) {
                      result.url += '/' + new Date().getTime() + '.mp4';
                    }
                    result.url = result.url.replace("?rkey", new Date().getTime() + ".mp4?ver=6010&rkey").replace('https', 'http');
                    playUrl = result.url;
                    ftn = result.url.substring(result.url.lastIndexOf("/"));
                    t.options.video.quality[e].url = result.url.indexOf('bde4') > 0 ? result.url : sites[index++] + ftn;

                    if (IsPC()) {
                      var error = '<a href="/play-help.htm" target="_blank" style="margin-right: 10px;">播放问题？</a>';
                      var download = '<a id="download" href="' + result.url + '" target="_blank" style="color: #fff !important;margin-right: 10px;">下载</a>';
                      $('.xuanji').before(error + download);
                    } else {
                      $('.xuanji').before('<a id="download" href="' + result.url + '" target="_blank" style="color: #fff !important;margin-right: 10px;">下载</a>');
                    }
                  }
                  dp.oldSwitchQuality(e);
                });
              } catch (e) {
                dp.notice('切换失败！', 3000);
              }
            } else {
              dp.oldSwitchQuality(e);
            }
            if ($('#download')) {
              $('#download').show();
            }
          } else {
            dp.oldSwitchQuality(e);
            if ($('#download')) {
              $('#download').hide();
            }
          }
        };
        dp.on('canplay', function () {
          if (t && t.prevVideo) {
            if (t.video.currentTime !== t.prevVideo.currentTime)
              return void t.seek(t.prevVideo.currentTime);
            t.template.videoWrap.removeChild(t.prevVideo),
              t.video.classList.add("dplayer-video-current"),
            a || t.video.play(),
              t.prevVideo = null,
              t.notice("".concat(t.tran("Switched to"), " ").concat(t.quality.name, " ").concat(t.tran("quality"))),
              t.switchingQuality = !1,
              t.events.trigger("quality_end")
          }
        });
        dp.on('error', function () {
          if (t && t.qualityIndex == 1 && ftn != null) {
            var url = playUrl;
            if (index > sites.length) {
              $('body').toast({
                position: 'top center',
                class: 'error',
                message: '视频格式不支持或地址失效，请切换线路或者刷新页面或者换安卓手机浏览器重试！',
                showProgress: 'bottom'
              });
              dp.notice('视频格式不支持或地址失效，请切换线路或者刷新页面或者换安卓手机浏览器重试！', -1);
              t.template.videoWrap.removeChild(t.prevVideo);
              t.video.classList.add('dplayer-video-current');
              t.prevVideo = null;
              t.switchingQuality = false;
              t.events.trigger('quality_end');
              playUrl = null, ftn = null, index = 0;
              return;
            }
            if (t.switchingQuality) {
              t.template.videoWrap.removeChild(t.prevVideo);
              t.video.classList.add('dplayer-video-current');
              t.prevVideo = null;
              t.switchingQuality = false;
              t.events.trigger('quality_end');
            }
            dp.notice('视频加载中...未提示失败前请勿刷新页面！', 10000);
            if (index == sites.length) {
              index++;
              url = playUrl;
            } else
              url = sites[index++] + ftn;

            dp.switchVideo({
              url: url.replace('https', 'http'),
              pic: '/images/play_window_pic.png'
            });
          } else if (t && t.switchingQuality) { //切换视频出错
            t.template.videoWrap.removeChild(t.prevVideo);
            t.video.classList.add('dplayer-video-current');
            t.prevVideo = null;
            t.switchingQuality = false;
            t.events.trigger('quality_end');
          }
        })
        dp.on('loadedmetadata', function () {
          dp.video.currentTime = currentTime;
          dp.play();
        });
        dp.on('timeupdate', function () {
          var currentTime = Math.floor(dp.video.currentTime);
          localStorage.setItem("ct_" + pid, currentTime);
        });
        $('.xuanji').click(function () {
          toggle();
        });
      }
      let tm;

      function toggle() {
        $('.player-wrapper .ui.sidebar')
          .sidebar({
            context: $('#player-box'),
            transition: 'overlay',
            onHide: function () {
              clearTimeout(tm);
            }
          })
          .sidebar('toggle');
      }

      toggle();
      $('#play-list').scrollTop($('#play-list .active').offset().top - $('#play-list').offset().top + $('#play-list').scrollTop());
      tm = setTimeout(function () {
        toggle();
      }, 3000);
    }
  }

  let adTime = 15, timerAdCountdownCount = 0;
  $('#count-down').on('click', function () {
    timerAdCountdownCount > 5 && closeAd();
  });

  let timerAdCountdown = null;
  timerAdCountdown = setInterval(function () {
    timerAdCountdownCount++;
    if (timerAdCountdownCount > 5) {
      $('#count-down').html('点击关闭 (倒计时' + (adTime - timerAdCountdownCount) + 's)');
    } else {
      $('#count-down').html('倒计时' + (adTime - timerAdCountdownCount) + 's');
    }
    if (adTime == timerAdCountdownCount && timerAdCountdown) {
      clearInterval(timerAdCountdown);
      closeAd();
    }
  }, 1000);

  function closeAd() {
    $('#ybad').remove();
    init();
  }
});
