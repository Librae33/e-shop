~ function() {
	var username = document.getElementById("username");
	var tipUsername = document.getElementById("tip_username");
	var password = document.getElementById("password");
	var tipPassword = document.getElementById("tip_password");
	var confirmPassword = document.getElementById("confirm_password");
	var tipConfirmPassword = document.getElementById("tip_Confirmpassword");
	var email = document.getElementById("email");
	var tipEmail = document.getElementById("tip_email");
	var phone = document.getElementById("phone");
	var tipPhone = document.getElementById("tip_phone");
	var submitBtn=document.getElementById("submit");
	var EventUtil = {
			addHandler: function(el, type, handler) {
				if(el.addEventListener) {
					el.addEventListener(type, handler, false);
				} else if(el.attachEvent) {
					el.attachEvent('on' + type, handler);
				} else {
					el['on' + type] = handler;
				}
			}
		}
		//验证成功后的样式
	function success_style(tipname, name, innerText) {
		tipname.style.visibility = "visible";
		tipname.style.color = "#3CB371";
		tipname.innerText = innerText;
		name.style.borderColor = "#3CB371";
	}
	//验证失败后的样式
	function error_style(tipname, name, innerText) {
		tipname.style.visibility = "visible";
		tipname.style.color = "#DC143C";
		tipname.innerText = innerText;
		name.style.borderColor = "#DC143C";
	}
	//获取焦点后的样式
	function onfocus_style(tipname, name, innerText) {
		tipname.style.visibility = "visible";
		tipname.style.color = "#999999";
		tipname.innerText = innerText;
		name.style.borderColor = "#999999";
	}
	//验证用户名
	function check_username() {
		var length = username.value.length;
		if(username.value == "") {
			error_style(tipUsername, username, "名称不能为空");
			return false;
		} else if(length < 4 || length > 14) {
			error_style(tipUsername, username, "名称格式错误");
			return false;
		} else {
			success_style(tipUsername, username, "名称格式正确");
			return true;
		}

	}
	//用户名验证
	EventUtil.addHandler(username, "focus", function() {
		onfocus_style(tipUsername, username, "必填，长度为4~16个字符");
	});
	EventUtil.addHandler(username, "blur", function() {
		check_username();
	});
	//验证密码
	function check_password() {
		var reg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,20}');
		if(password.value == "") {
			error_style(tipPassword, password, "密码不能为空");
			return false;
		} else if(!reg.test(password.value)) {
			error_style(tipPassword, password, "密码格式错误");
			return false;
		} else {
			success_style(tipPassword, password, "密码可用");
			return true;
		}
	}
	//密码验证
	EventUtil.addHandler(password, "focus", function() {
		onfocus_style(tipPassword, password, "必填，6-20位字母，数字，符号，不能含空格");
	});
	EventUtil.addHandler(password, "blur", function() {
		check_password();
	});

	function confirm_Password() {
		if(confirmPassword.value==""){
			error_style(tipConfirmPassword, confirmPassword, "密码不能为空");
			return false;
		}
		if(password.value === confirmPassword.value) {
			success_style(tipConfirmPassword, confirmPassword, "密码输入一致");
			return true;
		} else {
			error_style(tipConfirmPassword, confirmPassword, "密码不匹配");
			return false;
		}
	}

	//确认密码
	EventUtil.addHandler(confirmPassword, "focus", function() {
		onfocus_style(tipConfirmPassword, confirmPassword, "重新输入密码");
	});
	EventUtil.addHandler(confirmPassword, "blur", function() {
		confirm_Password();
	});
	//验证邮箱
	function check_email() {
		var reg = /^[\w.-]+@[0~9a-zA-Z]+(\.[a-zA-Z0-9]{2,4}){1,2}$/g;
		if(email.value == "") {
			error_style(tipEmail, email, "邮箱不能为空");
			return false;
		} else if(!reg.test(email.value)) {
			error_style(tipEmail, email, "邮箱格式错误");
			return false;
		} else {
			success_style(tipEmail, email, "邮箱格式正确");
			return true;
		}
	}
	//邮箱验证
	EventUtil.addHandler(email, "focus", function() {
		onfocus_style(tipEmail,email, "请输入邮箱");
	});
	EventUtil.addHandler(email, "blur", function() {
		check_email();
	});
	
	//验证手机号
	function check_phone(){
		var reg = /^1\d{10}$/g;
		if(phone.value == "") {
			error_style(tipPhone,phone, "手机号码不能为空");
			return false;
		} else if(!reg.test(phone.value)) {
			error_style(tipPhone,phone , "手机号码格式错误");
			return false;
		} else {
			success_style(tipPhone,phone, "手机号码格式正确");
			return true;
		}
	}
	EventUtil.addHandler(phone, "focus", function() {
		onfocus_style(tipPhone,phone, "请输入手机号码");
	});
	EventUtil.addHandler(phone, "blur", function() {
		check_phone();
	});
	//提交
	EventUtil.addHandler(submitBtn, "click", function() {
		if(check_email()&&check_password()&&check_username()&&check_phone()&&confirm_Password()){
			alert("提交成功！");
		}else{
			alert("提交失败");
		}
	});
}();