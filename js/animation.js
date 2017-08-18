~ function() {
	var myEffect = {
		//匀速
		Linear: function(t, b, c, d) {
			return c * t / d + b;
		},
		//指数衰减的反弹缓动
		Bounce: {
			easeIn: function(t, b, c, d) {
				return c - myEffect.Bounce.easeOut(d - t, 0, c, d) + b;
			},
			easeOut: function(t, b, c, d) {
				if((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b;
				} else if(t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
				} else if(t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
				}
			},
			easeInOut: function(t, b, c, d) {
				if(t < d / 2) {
					return myEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
				}
				return myEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
			}
		},
		//二次方的缓动
		Quad: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t + b;
			},
			easeOut: function(t, b, c, d) {
				return -c * (t /= d) * (t - 2) + b;
			},
			easeInOut: function(t, b, c, d) {
				if((t /= d / 2) < 1) {
					return c / 2 * t * t + b;
				}
				return -c / 2 * ((--t) * (t - 2) - 1) + b;
			}
		},
		//三次方的缓动
		Cubic: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOut: function(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOut: function(t, b, c, d) {
				if((t /= d / 2) < 1) {
					return c / 2 * t * t * t + b;
				}
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			}
		},
		//四次方的缓动
		Quart: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t * t * t + b;
			},
			easeOut: function(t, b, c, d) {
				return -c * ((t = t / d - 1) * t * t * t - 1) + b;
			},
			easeInOut: function(t, b, c, d) {
				if((t /= d / 2) < 1) {
					return c / 2 * t * t * t * t + b;
				}
				return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
			}
		},
		//五次方的缓动
		Quint: {
			easeIn: function(t, b, c, d) {
				return c * (t /= d) * t * t * t * t + b;
			},
			easeOut: function(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
			},
			easeInOut: function(t, b, c, d) {
				if((t /= d / 2) < 1) {
					return c / 2 * t * t * t * t * t + b;
				}
				return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
			}
		},
		//正弦曲线的缓动
		Sine: {
			easeIn: function(t, b, c, d) {
				return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
			},
			easeOut: function(t, b, c, d) {
				return c * Math.sin(t / d * (Math.PI / 2)) + b;
			},
			easeInOut: function(t, b, c, d) {
				return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
			}
		},
		//指数曲线的缓动
		Expo: {
			easeIn: function(t, b, c, d) {
				return(t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
			},
			easeOut: function(t, b, c, d) {
				return(t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
			},
			easeInOut: function(t, b, c, d) {
				if(t == 0) return b;
				if(t == d) return b + c;
				if((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		//圆形曲线的缓动
		Circ: {
			easeIn: function(t, b, c, d) {
				return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
			},
			easeOut: function(t, b, c, d) {
				return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
			},
			easeInOut: function(t, b, c, d) {
				if((t /= d / 2) < 1) {
					return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
				}
				return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
			}
		},
		//超过范围的三次方缓动
		Back: {
			easeIn: function(t, b, c, d, s) {
				if(s == undefined) s = 1.70158;
				return c * (t /= d) * t * ((s + 1) * t - s) + b;
			},
			easeOut: function(t, b, c, d, s) {
				if(s == undefined) s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
			},
			easeInOut: function(t, b, c, d, s) {
				if(s == undefined) s = 1.70158;
				if((t /= d / 2) < 1) {
					return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
				}
				return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
			}
		},
		//指数衰减的正弦曲线缓动
		Elastic: {
			easeIn: function(t, b, c, d, a, p) {
				if(t == 0) return b;
				if((t /= d) == 1) return b + c;
				if(!p) p = d * .3;
				var s;
				!a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
			},
			easeOut: function(t, b, c, d, a, p) {
				if(t == 0) return b;
				if((t /= d) == 1) return b + c;
				if(!p) p = d * .3;
				var s;
				!a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
				return(a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
			},
			easeInOut: function(t, b, c, d, a, p) {
					if(t == 0) return b;
					if((t /= d / 2) == 2) return b + c;
					if(!p) p = d * (.3 * 1.5);
					var s;
					!a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
					if(t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
					return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
				}
				//
		}
		//
	};
	//实现多方向的move动画
	/*
	 * curEle：当前要运动的元素
	 * target:当前动画的目标位置
	 * duration:动画持续的时间
	 * effect:运动方式
	 * callback:回调函数
	 */
	function move(curEle, target, duration, effect, callback) {
		var tempEffect = myEffect.Linear;
		if(typeof effect == 'number') {
			switch(effect) {
				case 0:
					tempEffect = myEffect.Linear;
					break;
				case 1:
					tempEffect = myEffect.Bounce.easeIn;
					break;
				case 2:
					tempEffect = myEffect.Quart.easeInOut;
			}
		} else if(effect instanceof Array) {
			tempEffect = effect.length >= 2 ? myEffect[effect[0]][effect[1]] : myEffect[effect[0]];
		} else if(typeof effect == 'function') { //用来做回调函数
			callback = effect;
		}
		//在每一次执行这个方法之前，首先把当前元素正在运行的动画结束掉
		clearInterval(curEle.timer);
		//根据target来获取每一个方向的起始值begin和总距离change {}
		var begin = {},
			change = {};
		for(var key in target) {
			/*
			 * 在for-in循环的时候，默认会把私有的和所属类原型上扩展的属性和方法
			 * 都遍历到，但是我们遍历一个对象的时候通常只需要遍历私有的属性和方法即可
			 * 
			 */
			if(target.hasOwnProperty(key)) {
				//key -》方向：例如：top，left
				begin[key] = utils.css(curEle, key);
				change[key] = target[key] - begin[key];
			}
		}
		var time = 0; //当前已经运动的时间
		curEle.timer = setInterval(function() {
			time += 10;
			//到达目标，结束动画，让当前元素的样式等于目标样式值
			if(time >= duration) {
				utils.css(curEle, target);
				clearInterval(curEle.timer);
				//动作执行完毕,执行回调函数
				typeof callback === "function" ? callback.call(curEle) : null;
				//另一种写法：callback && callback.call(curEle);
				return;
			}
			//没到达目标，分别获取每一个方向的当前样式，给当前元素设置样式即可
			for(var key in target) {
				if(target.hasOwnProperty(key)) {
					var curPos = tempEffect(time, begin[key], change[key], duration);
					utils.css(curEle, key, curPos);
				}
			}
		}, 10);
	}
	window.myAnimate = move;
}();