/*构造函数模式封装插件*/
/*@parameter:
 * curId:当前轮播图的id
 * url：ajax请求的地址
 * interval：自动轮播的时间间隔
 */
~ function() {
	function myCarousel(curId, url, interval) {
		//私有属性
		this.banner = document.getElementById(curId);
		this.bannerInner = utils.firstChild(this.banner);
		this.tip = this.banner.getElementsByTagName("ul")[0]; //焦点区域
		this.oLis = this.tip.getElementsByTagName("li");//获取每一个焦点
		this.divList = this.bannerInner.getElementsByTagName("div");//获取包裹每一张图片的div
		this.imgList = this.bannerInner.getElementsByTagName("img");//获取图片集合
		this.btnLeft = this.banner.getElementsByTagName("a")[0]; //获取向左切换的按钮
		this.btnRight = this.banner.getElementsByTagName("a")[1]; //获取向右切换的按钮
		this.val = null; //通过ajax请求回来的数据（json格式的字符串）
		this.data = null; //转换后的数据（json格式的对象）
		this.url = url; //ajax请求的地址
		this.interval = interval || 3000; //自动轮播的间隔，如果不传默认为3s
		this.timer = null; //定时器
		this.index = 0; //记录当前进行到第几张了
		return this.init();

	}
	myCarousel.prototype = {
		constructor: myCarousel,
		//公共方法
		//ajax 请求数据
		getData: function() {
			var xhr = new XMLHttpRequest;
			var _this=this;//先把当前的this存起来，下面使用到的this指的是xhr，而不是当前对象
			//false表示同步请求（如果数据没有请求回来将不进行下面的操作）
			xhr.open("get", this.url +"?_="+ Math.random(), false);
			//监听ajax请求的状态
			xhr.onreadystatechange = function() {
				if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status <= 300)) {
					_this.val = xhr.responseText; //ajax请求回来的是json格式的字符串
					_this.data = JSON.parse(_this.val); //需要将json格式的字符串转化为json格式的对象
					//console.log(data);
				}
			};
			xhr.send(null);
		},

		//实现数据绑定
		bindData: function() {
			var str = "";
			var l = this.data.length; //图片的个数
			//绑定图片
			if(this.data) {
				for(var i = 0; i < l; i++) {
					var curData = this.data[i];
					str += '<div><img src="" trueImg="' + curData["img"] + '" /></div>';
				}
			}
			this.bannerInner.innerHTML = str;
			//绑定tip
			str = "";
			if(this.data) {
				for(var i = 0; i < l; i++) {
					if(i === 0) {
						str += '<li class="bg"></li>';
					} else {
						str += '<li></li>';
					}

				}
			}
			this.tip.innerHTML = str;

		},

		// 图片的延迟加载
		lazyLoad: function() {
			for(var i = 0, l = this.imgList.length; i < l; i++) {
				var _this = this;
				~ function(i) {
					var curImg = _this.imgList[i]; //自执行函数中的this指的是window
					var oImg = new Image;
					oImg.src = curImg.getAttribute("trueImg");
					oImg.onload = function() {
						curImg.src = this.src;
						curImg.style.display = "block";
						if(i === 0) { //只对第一张图片进行处理
							var curDiv = curImg.parentNode;
							curDiv.style.zIndex = 1;
							//curImg.style.opacity=1;
							myAnimate(curDiv, {
								opacity: 1
							}, 500);
						}
						oImg = null;

					};
				}(i);
			}
			//window.setTimeout(lazyLoad, 500);
		},

		//自动轮播
		autoPlay: function() {
			console.log(this.data.length);
			if(this.index == (this.data.length - 1)) {
				this.index = -1;
			}
			this.index++;
			this.setCarousel();
			this.changeTip();
		},

		//实现切换效果
		setCarousel: function() {
			for(var i = 0; i < this.divList.length; i++) {
				var curDiv = this.divList[i];
				if(i === this.index) {
					utils.css(curDiv, "zIndex", 1);
					//让当前的透明度从0变到1，当动画结束，让其他的div的透明度的值变为0
					myAnimate(curDiv, {
						opacity: 1
					}, 500, function() {
						var curDivSib = utils.siblings(this);
						for(var k = 0; k < curDivSib.length; k++) {
							curDivSib[k].style.opacity = 0;
						}
					});
					return;
				}
				utils.css(curDiv, "zIndex", 0);
			}
		},

		//实现焦点对齐
		changeTip: function() {
			for(var i = 0, l = this.oLis.length; i < l; i++) {
				var curLi = this.oLis[i];
				i === this.index ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
			}
		},

		//鼠标悬停 停止轮播
		mouseEvent: function() {
			var _this = this;
			this.banner.onmouseover = function() {
				clearInterval(_this.timer);
			};
			this.banner.onmouseout = function() {
				_this.timer = setInterval(function() {
					_this.autoPlay();
					_this.changeTip();
				}, 3000);
			};

		},

		//实现焦点切换
		tipEvent: function() {
			var _this = this;
			for(var i = 0, l = this.oLis.length; i < l; i++) {
				var curLi = this.oLis[i];
				curLi.liIndex = i;
				curLi.onmouseover = function() {
					_this.index = this.liIndex;
					_this.setCarousel();
					_this.changeTip();

				}
			}
		},

		//实现左右切换
		toggleLeftRight: function() {
			var _this = this;
			this.btnLeft.onclick = function() {
				if(_this.index === 0) {
					_this.index = _this.data.length;

				}
				_this.index--;
				_this.changeTip();
				_this.setCarousel();

			}; 
			this.btnRight.onclick =function(){
				_this.autoPlay();
			};

		},
		//当前方法的唯一入口   命令模式
		init: function() {
			var _this = this;
			this.getData();
			this.bindData();
			window.setTimeout(function() {
				_this.lazyLoad();
			}, 500);
			_this.timer = window.setInterval(function() {
				_this.autoPlay();
			}, _this.interval);
			this.tipEvent();
			this.toggleLeftRight();
			return this;

		}
	};

	window.myCarousel = myCarousel;
}();