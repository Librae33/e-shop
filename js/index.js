~function(){
	function $(obj) {
	return document.getElementById(obj);
}
window.onload = function() {
	var banner1 = new myCarousel("banner1", "json/data.txt", 3000);
	//实现首页滑动门
	function slideDoor() {
		var shopClass_item = document.querySelector(".shopClass_item");
		var itemDls = shopClass_item.getElementsByTagName("dl");
		var itemRight = utils.getElementsByClass("item_right");
		for(var i = 0; i < itemDls.length; i++) {
			var curDl = itemDls[i];
			curDl.index = i;
			curDl.onmouseover = function() {
				itemRight[this.index].style.display = "block";
			};
			curDl.onmouseout = function() {
				itemRight[this.index].style.display = "none";
			};
		}
	}
	slideDoor();
	//实现侧边栏滚动效果
	~ function() {
		var floorData = [{
				id: "oneFloor",
				text: "家用电脑",
				top: null
			}, {
				id: "twoFloor",
				text: "食品酒水",
				top: null
			}, {
				id: "threeFloor",
				text: "手机数码",
				top: null
			}

		];
		var floorIndex = $("floorIndex"),
			oLis = null;
		var str = "";
		for(var i = 0, len = floorData.length; i < len; i++) {
			var curFloor = floorData[i];
			curEle = $(curFloor["id"]); //获取对应的每个楼层
			curFloor["top"] = curEle.offsetTop; //获取各楼层距顶部的高度
			str += "<li text='" + curFloor["text"] + "' top='" + curFloor["top"] + "'>" + curFloor["text"] + "</li>";

		}
		$("floorIndex").innerHTML = str;
		oLis = utils.children(floorIndex);

		//控制楼层的显示隐藏
		function showFloor() {
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //获取页面卷去的高度
			//如果（卷去高度）>第一层高度，就让侧边栏显示，否则隐藏
			$("sideBar").style.display = scrollTop + 100 > oLis[0].getAttribute("top") ? "block" : "none";
			for(var i = 0, len = oLis.length; i < len; i++) {
				var curLi = oLis[i];
				var curTop = curLi.getAttribute("top"); //获取当前的li对应的楼层的top

				if((scrollTop) > curTop - 200) {
					curLi.style.background = "#D70B1C";
					var sib = utils.siblings(curLi);
					for(var j = 0; j < sib.length; j++) {
						sib[j].style.background = "rgb(145,136,136)";

					}
				}
			}
		}
		window.onscroll = showFloor;
		//点击某一楼层后跳转
		for(var k = 0; k < oLis.length; k++) {
			var curLi = oLis[k];
			curLi.index = k;
			curLi.onclick = function() {
				this.style.backgroundColor = "#D70B1C";
				var sib = utils.siblings(oLis[this.index]);
				for(var j = 0; j < sib.length; j++) {
					sib[j].style.background = "rgb(145,136,136)";

				}
				var curTop = oLis[this.index].getAttribute("top");
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				var target = curTop;

				/*document.documentElement.scrollTop = curTop;
				document.body.scrollTop = curTop;*/
				move(target);
			};
		}

		function move(target) {
			var begin = utils.win("scrollTop"),
				duration = 300;
			var step = Math.abs((target - begin) / duration * 10);
			_move();

			function _move() {
				window.clearTimeout(timer);
				var cur = utils.win("scrollTop");
				if(target > begin) { //->向下
					if(cur + step >= target) {
						window.onscroll = showFloor;
						utils.win("scrollTop", target);
						return;
					}
					utils.win("scrollTop", cur + step);
				} else if(target < begin) { //->向上
					if(cur - step <= target) {
						window.onscroll = showFloor;
						utils.win("scrollTop", target);
						return;
					}
					utils.win("scrollTop", cur - step);
				} else { //->不动
					window.onscroll = showFloor;
					return;
				}
				var timer = window.setTimeout(_move, 10);
			}
		}

	}();

};
}();
