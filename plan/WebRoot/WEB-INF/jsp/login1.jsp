<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
			Object urls=session.getAttribute("url");
			String url="plan/myplan";
			if(urls!=null){
			url=urls.toString();
			}
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="keywords" content="">
<meta name="description" content="">
<title>登录</title>
<meta name="keywords" content="">
<meta name="description" content="">
<script type="text/javascript" src="../js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="../js/layer/layer.js"></script>
</head>
<script type="text/javascript">
	var basePath="<%=basePath%>";
	var url="<%=url%>";
	$(function(){
		$("#username").focus();
		$("#username").change(function(){
		if($(this).length>0){
			$("#noneuser").css("display","none");
		}
		});
		$("#password").change(function(){
		if($(this).length>0){
			$("#nonepass").css("display","none");
		}
		});
	});
	// 监听键盘Enter键;
	function keyPressDown() {
		if (event.keyCode == "13") {
			submitForm();
		}
	}
	//提交表单
	function submitForm() {
		var username = $("#username").val();
		var password = $("#password").val();
		if(username==""||username==null){
			$("#noneuser").css("display","block");
			return;
		}
		if(password==""||password==null){
			$("#nonepass").css("display","block");
			return;
		}
		$.ajax({
			url:basePath+"loginController/login",
			data:{"username" : $("#username").val(),"password" : $("#password").val()},
			success:function(data){
				var errmsg = '';
			if (data.hasError) {
				errmsg = "登录异常，请检查网络是否正常";
				alert(errmsg);

			} else {
				
				if (data == false) {
					 layer.alert("用户名或密码错误",{icon:2});
				} else {
					window.location.href = basePath+url;
				}
			}
			},
			error:function(data){
				alert("网络连接失败");
			}
		});
	}
</script>
<body class="loginbody" onkeypress="keyPressDown()">
	<div class="dataEye">
		<div class="loginbox">
			<div class="login-content">
				<form id="login" name="login" action="login" method="post"
					style="text-align: center;margin-top: 200px">
					<div class="row">
						<label class="field">用户名</label> <input type="text"
							class="input-text-user input-click" name="username" id="username" />
						<span id="noneuser" style="display: none;color: red">用户名不能为空</span>
					</div>

					<div class="row" style="margin-top: 20px">
						<label class="field">密 码</label> <input type="password"
							class="input-text-password input-click" name="password"
							id="password" /> <span id="nonepass"
							style="display: none;color: red">密码不能为空</span>
					</div>

					<div class="row btnArea">
						<input type="button" id="submit" value="登 录"
							onclick="submitForm()" />
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>