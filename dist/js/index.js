~function(){function o(o){return document.getElementById(o)}window.onload=function(){function t(){function t(){var t=document.documentElement.scrollTop||document.body.scrollTop;o("sideBar").style.display=t+100>i[0].getAttribute("top")?"block":"none";for(var n=0,l=i.length;n<l;n++){var e=i[n];if(t>e.getAttribute("top")-200){e.style.background="#D70B1C";for(var r=utils.siblings(e),s=0;s<r.length;s++)r[s].style.background="rgb(145,136,136)"}}}function n(o){function n(){window.clearTimeout(r);var i=utils.win("scrollTop");if(o>l){if(i+e>=o)return window.onscroll=t,void utils.win("scrollTop",o);utils.win("scrollTop",i+e)}else{if(!(o<l))return void(window.onscroll=t);if(i-e<=o)return window.onscroll=t,void utils.win("scrollTop",o);utils.win("scrollTop",i-e)}var r=window.setTimeout(n,10)}var l=utils.win("scrollTop"),e=Math.abs((o-l)/300*10);n()}for(var l=[{id:"oneFloor",text:"家用电脑",top:null},{id:"twoFloor",text:"食品酒水",top:null},{id:"threeFloor",text:"手机数码",top:null}],e=o("floorIndex"),i=null,r="",s=0,u=l.length;s<u;s++){var c=l[s];curEle=o(c.id),c.top=curEle.offsetTop,r+="<li text='"+c.text+"' top='"+c.top+"'>"+c.text+"</li>"}o("floorIndex").innerHTML=r,i=utils.children(e),window.onscroll=t;for(var d=0;d<i.length;d++){var a=i[d];a.index=d,a.onclick=function(){this.style.backgroundColor="#D70B1C";for(var o=utils.siblings(i[this.index]),t=0;t<o.length;t++)o[t].style.background="rgb(145,136,136)";var l=i[this.index].getAttribute("top");document.documentElement.scrollTop||document.body.scrollTop;n(l)}}}new myCarousel("banner1","json/data.txt",3e3);~function(){for(var o=document.querySelector(".shopClass_item").getElementsByTagName("dl"),t=utils.getElementsByClass("item_right"),n=0;n<o.length;n++){var l=o[n];l.index=n,l.onmouseover=function(){t[this.index].style.display="block"},l.onmouseout=function(){t[this.index].style.display="none"}}}(),t()}}();