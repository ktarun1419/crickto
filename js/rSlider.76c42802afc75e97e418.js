(self.webpackChunkdex_website=self.webpackChunkdex_website||[]).push([[302],{553:()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}!function(){"use strict";var e=function(t){for(var e in this.input=null,this.inputDisplay=null,this.slider=null,this.sliderWidth=0,this.sliderLeft=0,this.pointerWidth=0,this.pointerR=null,this.pointerL=null,this.activePointer=null,this.selected=null,this.scale=null,this.step=0,this.tipL=null,this.tipR=null,this.timeout=null,this.valRange=!1,this.values={start:null,end:null},this.conf={target:null,values:null,set:null,range:!1,width:null,scale:!0,labels:!0,tooltip:!0,step:null,disabled:!1,onChange:null},this.cls={container:"rs-container",background:"rs-bg",selected:"rs-selected",pointer:"rs-pointer",scale:"rs-scale",noscale:"rs-noscale",tip:"rs-tooltip"},this.conf)t.hasOwnProperty(e)&&(this.conf[e]=t[e]);this.init()};e.prototype.init=function(){return"object"==t(this.conf.target)?this.input=this.conf.target:this.input=document.getElementById(this.conf.target.replace("#","")),this.input?(this.inputDisplay=getComputedStyle(this.input,null).display,this.input.style.display="none",this.valRange=!(this.conf.values instanceof Array),!this.valRange||this.conf.values.hasOwnProperty("min")&&this.conf.values.hasOwnProperty("max")?this.createSlider():console.log("Missing min or max value...")):console.log("Cannot find target element...")},e.prototype.createSlider=function(){return this.slider=i("div",this.cls.container),this.slider.innerHTML='<div class="rs-bg"></div>',this.selected=i("div",this.cls.selected),this.pointerL=i("div",this.cls.pointer,["dir","left"]),this.scale=i("div",this.cls.scale),this.conf.tooltip&&(this.tipL=i("div",this.cls.tip),this.tipR=i("div",this.cls.tip),this.pointerL.appendChild(this.tipL)),this.slider.appendChild(this.selected),this.slider.appendChild(this.scale),this.slider.appendChild(this.pointerL),this.conf.range&&(this.pointerR=i("div",this.cls.pointer,["dir","right"]),this.conf.tooltip&&this.pointerR.appendChild(this.tipR),this.slider.appendChild(this.pointerR)),this.input.parentNode.insertBefore(this.slider,this.input.nextSibling),this.conf.width&&(this.slider.style.width=parseInt(this.conf.width)+"px"),this.sliderLeft=this.slider.getBoundingClientRect().left,this.sliderWidth=this.slider.clientWidth,this.pointerWidth=this.pointerL.clientWidth,this.conf.scale||this.slider.classList.add(this.cls.noscale),this.setInitialValues()},e.prototype.setInitialValues=function(){if(this.disabled(this.conf.disabled),this.valRange&&(this.conf.values=n(this.conf)),this.values.start=0,this.values.end=this.conf.range?this.conf.values.length-1:0,this.conf.set&&this.conf.set.length&&l(this.conf)){var t=this.conf.set;this.conf.range?(this.values.start=this.conf.values.indexOf(t[0]),this.values.end=this.conf.set[1]?this.conf.values.indexOf(t[1]):null):this.values.end=this.conf.values.indexOf(t[0])}return this.createScale()},e.prototype.createScale=function(t){this.step=this.sliderWidth/(this.conf.values.length-1);for(var e=0,s=this.conf.values.length;e<s;e++){var n=i("span"),l=i("ins");n.appendChild(l),this.scale.appendChild(n),n.style.width=e===s-1?0:this.step+"px",this.conf.labels?l.innerHTML=this.conf.values[e]:0!==e&&e!==s-1||(l.innerHTML=this.conf.values[e]),l.style.marginLeft=l.clientWidth/2*-1+"px"}return this.addEvents()},e.prototype.updateScale=function(){this.step=this.sliderWidth/(this.conf.values.length-1);for(var t=this.slider.querySelectorAll("span"),e=0,i=t.length;e<i;e++)t[e].style.width=this.step+"px";return this.setValues()},e.prototype.addEvents=function(){var t=this.slider.querySelectorAll("."+this.cls.pointer),e=this.slider.querySelectorAll("span");s(document,"mousemove touchmove",this.move.bind(this)),s(document,"mouseup touchend touchcancel",this.drop.bind(this));for(var i=0,n=t.length;i<n;i++)s(t[i],"mousedown touchstart",this.drag.bind(this));for(i=0,n=e.length;i<n;i++)s(e[i],"click",this.onClickPiece.bind(this));return window.addEventListener("resize",this.onResize.bind(this)),this.setValues()},e.prototype.drag=function(t){if(t.preventDefault(),!this.conf.disabled){var e=t.target.getAttribute("data-dir");return"left"===e&&(this.activePointer=this.pointerL),"right"===e&&(this.activePointer=this.pointerR),this.slider.classList.add("sliding")}},e.prototype.move=function(t){if(this.activePointer&&!this.conf.disabled){var e=("touchmove"===t.type?t.touches[0].clientX:t.pageX)-this.sliderLeft-this.pointerWidth/2;return(e=Math.round(e/this.step))<=0&&(e=0),e>this.conf.values.length-1&&(e=this.conf.values.length-1),this.conf.range?(this.activePointer===this.pointerL&&(this.values.start=e),this.activePointer===this.pointerR&&(this.values.end=e)):this.values.end=e,this.setValues()}},e.prototype.drop=function(){this.activePointer=null},e.prototype.setValues=function(t,e){var i=this.conf.range?"start":"end";return t&&this.conf.values.indexOf(t)>-1&&(this.values[i]=this.conf.values.indexOf(t)),e&&this.conf.values.indexOf(e)>-1&&(this.values.end=this.conf.values.indexOf(e)),this.conf.range&&this.values.start>this.values.end&&(this.values.start=this.values.end),this.pointerL.style.left=this.values[i]*this.step-this.pointerWidth/2+"px",this.conf.range?(this.conf.tooltip&&(this.tipL.innerHTML=this.conf.values[this.values.start],this.tipR.innerHTML=this.conf.values[this.values.end]),this.input.value=this.conf.values[this.values.start]+","+this.conf.values[this.values.end],this.pointerR.style.left=this.values.end*this.step-this.pointerWidth/2+"px"):(this.conf.tooltip&&(this.tipL.innerHTML=this.conf.values[this.values.end]),this.input.value=this.conf.values[this.values.end]),this.values.end>this.conf.values.length-1&&(this.values.end=this.conf.values.length-1),this.values.start<0&&(this.values.start=0),this.selected.style.width=(this.values.end-this.values.start)*this.step+"px",this.selected.style.left=this.values.start*this.step+"px",this.onChange()},e.prototype.onClickPiece=function(t){if(!this.conf.disabled){var e=Math.round((t.clientX-this.sliderLeft)/this.step);return e>this.conf.values.length-1&&(e=this.conf.values.length-1),e<0&&(e=0),this.conf.range&&e-this.values.start<=this.values.end-e?this.values.start=e:this.values.end=e,this.slider.classList.remove("sliding"),this.setValues()}},e.prototype.onChange=function(){var t=this;this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout((function(){if(t.conf.onChange&&"function"==typeof t.conf.onChange)return t.conf.onChange(t.input.value)}),500)},e.prototype.onResize=function(){return this.sliderLeft=this.slider.getBoundingClientRect().left,this.sliderWidth=this.slider.clientWidth,this.updateScale()},e.prototype.disabled=function(t){this.conf.disabled=t,this.slider.classList[t?"add":"remove"]("disabled")},e.prototype.getValue=function(){return this.input.value},e.prototype.destroy=function(){this.input.style.display=this.inputDisplay,this.slider.remove()};var i=function(t,e,i){var s=document.createElement(t);return e&&(s.className=e),i&&2===i.length&&s.setAttribute("data-"+i[0],i[1]),s},s=function(t,e,i){for(var s=e.split(" "),n=0,l=s.length;n<l;n++)t.addEventListener(s[n],i)},n=function(t){var e=[],i=t.values.max-t.values.min;if(!t.step)return console.log("No step defined..."),[t.values.min,t.values.max];for(var s=0,n=i/t.step;s<n;s++)e.push(t.values.min+s*t.step);return e.indexOf(t.values.max)<0&&e.push(t.values.max),e},l=function(t){return!t.set||t.set.length<1||t.values.indexOf(t.set[0])<0?null:!t.range||!(t.set.length<2||t.values.indexOf(t.set[1])<0)||null};window.rSlider=e}()}},t=>{t(t.s=553)}]);