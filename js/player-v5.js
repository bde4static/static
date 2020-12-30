let xhr = new XMLHttpRequest();
xhr.open('GET', m3u8, true)
xhr.responseType = 'arraybuffer';
xhr.onload = function(e) {
  buffer = xhr.response
  console.log(buffer);
  let t=new Uint8Array(buffer);t=t.slice(3354);
  let r=pako.inflate(t);
  var res = '';var chunk = 16 * 1024;var i;for (i = 0; i < r.length / chunk; i++) {res += String.fromCharCode.apply(null, r.slice(i * chunk, (i + 1) * chunk));}res += String.fromCharCode.apply(null, r.slice(i * chunk));
  res = res.replace(/.*?\.ts/g, "https://bde4.com/$&");
  let player = new HlsPlayer({
    id: 'video',
    url: URL.createObjectURL(new Blob([res], {type: "application/vnd.apple.mpegurl"})),
    autoplay: true,
    playsinline: true,
    fluid: true,
    download: true
  });
};
xhr.send();


/*
let player = new Player({
  el:document.querySelector('#video'),
  url: 'https://csrc.vcloud.dogecdn.com/vcloud/17/v/20190424/1556036075_818c4125ec9c8cbc7a7a8a7cc1601512/1037/7d515b22c4958598c0fbd1e6290a5ca5.mp4?vkey=59F742282109DB435802C4109387E1BC7B1EEA87128B06E82F1B1A76B2ABDF41A560ED70413EF47CFE4E32D50600F136E377DFF112324A16F62D87494901F102DE0883B8EEF0AC954749624F949905E31FA62A7B213471E37C22D5F80EA69BB582D19F7B56543B746ADD83BB266C0CDBBBADBB43542EF8C66F079EA8C3CD6DEB3A012825A5F13D55FE6C4BCE3C6F42135BC0F9DDF08511D840CE8F9949F6E84C&tkey=1592587007ef38f26c76',
  definitionActive: 'click',
  fluid: true,
  textTrack: [
    {
      src: "/js/sub.vtt",
      kind: "subtitles",
      label: "字幕1",
      srclang: "zh",
      default: true
    }
  ],
  textTrackStyle: {
    "background-color": "transparent",
    "color": "#b7daff",
    "font-size": "1em",
    "bottom": "20px"
  },
  textTrackActive: 'click'
});*/
