<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'index.jsp' starting page</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<%@include file="common/base.jsp"%>
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
</head>
<script type="text/javascript">
  $(function(){
  var that = this;
  $.ajax({
  		url:"test/list",
  		success:function(data){
  			/* that.writeln(JSON.stringify(data)); */
  			$("#a").text(JSON.stringify(data));
  		}
  	});
  });
  	
  </script>
<body>
	<p>${test}</p>
	<p>ppppppp</p>
	<p id="a"></p>
	<a href="http://localhost:8080/loginController/logout">退出系统</a>
</body>
</html>
