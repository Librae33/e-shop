~ function() {
	
	//实现产品详情页（description.html）的商品选项卡切换
	function changeTab() {
		var oUl = document.getElementById("tabUl");
		var oLis = oUl.children;
		var oDivs = utils.nextAll(oUl.parentNode);
		for(var i = 0; i < oLis.length; i++) {
			var curLi = oLis[i];
			curLi.index = i;
			curLi.onmouseover = function() {
				for(var j = 0; j < oDivs.length; j++) {
					oLis[j].className = "";
					oDivs[j].style.display = "none";
				}
				oDivs[this.index].style.display = "block";
				oLis[this.index].className = "li_select";
			};
		}
	}
	//实现产品详情页（description.html）的商品展示图片大小图切换
	function changePic() {
		var bigImg = document.getElementById("bigImg");
		var smallImg = document.getElementById("smallImg");
		var oImgs = smallImg.getElementsByTagName("img");
		smallImg.onclick = function(e) {
			e = e || window.event;
			e.target = e.target || e.srcElement;
			var sib = utils.siblings(e.target.parentNode);
			for(var i = 0; i < sib.length; i++) {
				utils.removeClass(sib[i], "smallImg_select");
			}

			utils.addClass(e.target.parentNode, "smallImg_select");
			bigImg.src = e.target.src;

		};

	}
	//实现产品详情页（description.html）的商品展示图片放大镜效果
	function photoLoupe() {
		var box = document.getElementById("box");
		var mark = document.getElementById("mark");
		var bigBox = document.getElementById("bigBox");
		var tempLeft = 0,
			tempTop = 0;
		var bigImg = bigBox.getElementsByTagName("img")[0];
		

		function setPosition(e) {		
			var left = e.clientX - box.offsetLeft - (mark.offsetWidth / 2);
			var top = e.clientY - box.offsetTop - (mark.offsetHeight / 2);
			var minLeft = 0,
				minTop = 0,
				maxLeft = box.offsetWidth - mark.offsetWidth,
				maxTop = box.offsetHeight - mark.offsetHeight;
			if(left <= 0) {
				mark.style.left = 0;
				tempLeft = 0;
			} else if(left >= maxLeft) {
				mark.style.left = maxLeft + "px";
				tempLeft = maxLeft;
			} else {
				mark.style.left = left + "px";
				tempLeft = left;
			}
			if(top <= 0) {
				mark.style.top = 0;
				tempTop = 0;
			} else if(top >= maxTop) {
				mark.style.top = maxTop + "px";
				tempTop = maxTop;
			} else {
				mark.style.top = top + "px";
				tempTop = top;
			}

			bigImg.style.left = -tempLeft * 2 + "px";
			bigImg.style.top = -tempTop * 2 + "px";

		}
		box.onmouseenter = function(e) {
			e=e||window.event;
			e.target=e.target||e.srcElement;
			var innerImg=e.target.getElementsByTagName("img")[0];
			bigImg.src=innerImg.src;
			mark.style.display = "block";
			bigBox.style.display = "block";
			setPosition(e);

		};
		box.onmousemove = function(e) {
			e = e || window.event;
			setPosition(e);

		};
		box.onmouseleave = function(e) {
			e = e || window.event;
			mark.style.display = "none";
			bigBox.style.display = "none";
			setPosition(e);

		};
	}
   //回到顶部效果
		 function backTop() {
			var backToTop = document.getElementById("backToTop");
			window.onscroll = showBtn;
			function showBtn() {
				var b_scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
				if(b_scrollTop > winHeight) {
					backToTop.style.display = "block";
				}
			}
			backToTop.onclick = function() {
				window.onscroll = null;
				backToTop.style.display = "none";
				var interval = 10,
					duration = 500,
					target = document.documentElement.scrollHeight || document.body.scrollHeight;
				var step = (target / duration) * interval;
				var timer = setInterval(function() {
					var b_curTop = document.documentElement.scrollTop || document.body.scrollTop;
					if(b_curTop <= 0) {
						window.onscroll = showBtn;
						clearInterval(timer);
						return;
					}
					b_curTop -= step;
					document.documentElement.scrollTop =b_curTop;
					document.body.scrollTop = b_curTop;
				}, interval);
				
			};
			
		}
	function init() {
		changeTab(); //选项卡
		changePic(); //图片切换
		photoLoupe(); //图片放大镜
		backTop();//回到顶部
	}
	init();

}();