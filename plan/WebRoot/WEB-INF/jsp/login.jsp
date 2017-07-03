<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
			Object urls=session.getAttribute("url");
			String url="trouble/list.shtml";
			if(urls!=null){
			url=urls.toString();
			}
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>登录</title>
	<script type="text/javascript" src="../js/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="../js/layer/layer.js"></script>
<link rel="stylesheet" href="../css/pintuer.css">
    <link rel="stylesheet" href="../css/admin.css">
    <script src="../js/pintuer.js"></script>  
</head>
<script type="text/javascript">
	var basePath="<%=basePath%>";
	var url="<%=url%>";
	// 监听键盘Enter键;
	function keyPressDown() {
		if (event.keyCode == "13") {
			submitForm();
		}
	}
	$(function(){
		$("#username").focus();
	});
	//提交表单
	function submitForm() {
		var username = $("#username").val();
		var password = $("#password").val();
		$.ajax({
			url:basePath+"loginController/login",
			data:{"username" : $("#username").val(),"password" : $("#password").val()},
			success:function(data){
				var errmsg = '';
			if (data.hasError) {
				errmsg = "登录异常，请检查网络是否正常";
				alert(errmsg);

			} else {
			
					$.ajax({
				url:basePath+"loginController/getUrl",
				data:{"user":$("#username").val()},
				success:function(data1){
				window.location.href=basePath+data1;
				}
				});
				
				
			}
			},
			error:function(data){
				alert("网络连接失败");
			}
		});
	}
</script>
<body class="login" background="../images/a.jpg" mycollectionplug="bind" onkeydown="keyPressDown()">
	<div class="bg"></div>
<div class="container">
    <div class="line bouncein">
        <div class="xs6 xm4 xs3-move xm4-move">
            <div style="height:150px;"></div>
            <div class="media media-y margin-big-bottom">           
            </div>         
            <form action="index.html" method="post">
            <div class="panel loginbox">
                <div class="text-center margin-big padding-big-top"><h1>督办管理系统</h1></div>
                <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                    <div class="form-group">
                        <div class="field field-icon-right">
                            <input type="text" class="input input-big" id="username" name="username" placeholder="登录账号" data-validate="required:请填写账号" />
                            <span class="icon icon-user margin-small"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="field field-icon-right">
                            <input type="password" class="input input-big" id="password" name="password" placeholder="登录密码" data-validate="required:请填写密码" />
                            <span class="icon icon-key margin-small"></span>
                        </div>
                    </div>
                </div>
                <div style="padding:30px;"><input type="button" class="button button-block bg-main text-big input-big" value="登录" onclick="submitForm()"></div>
            </div>
            </form>          
        </div>
    </div>
</div>

</body>
</html>