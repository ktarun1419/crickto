(self.webpackChunkdex_website=self.webpackChunkdex_website||[]).push([[645],{940:()=>{document.addEventListener("DOMContentLoaded",(function(e){var o=function(e,o,t){var n=(t={expires:2678400,domain:window.location.host,path:"/"}).expires;if("number"==typeof n&&n){var c=new Date;c.setTime(c.getTime()+1e3*n),n=t.expires=c}n&&n.toUTCString&&(t.expires=n.toUTCString());var r=e+"="+(o=encodeURIComponent(o));for(var i in t){r+="; "+i;var a=t[i];!0!==a&&(r+="="+a)}document.cookie=r},t=function(e){console.log("ee::",e);var o=document.cookie.match(new RegExp("(?:^|; )"+e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return o?decodeURIComponent(o[1]):void 0},n={utm_source:"utm_source",utm_value:"tf",utm_cookie:"tf_url",pb_cookie:"tf_pb",checkTrafUtm:function(){return e=n.utm_source,((o=(o=window.location.search).match(new RegExp(e+"=([^&=]+)")))?o[1]:"")===n.utm_value;var e,o},checkTrafCookie:function(){return n.checkTrafUtm()&&o(n.utm_cookie,location.href),t(n.utm_cookie)||""}};console.log("Traf tool loaded");var c=n.checkTrafCookie(),r=document.querySelector(".head-wallet__container .head-wallet__key");c.length>0&&r&&!t(n.pb_cookie)&&(console.log("https://go.dexsport.io/p/5?id="+encodeURIComponent(r.innerText)+"&url="+encodeURIComponent(c)),(new Image).src="https://go.dexsport.io/p/5?id="+encodeURIComponent(r.innerText)+"&url="+encodeURIComponent(c),o(n.pb_cookie,(new Date).toISOString()))}))}},e=>{e(e.s=940)}]);