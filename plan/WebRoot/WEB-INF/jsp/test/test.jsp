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
<%@include file="../common/base.jsp"%>
<script type="text/javascript" src="<%=basePath%>jsp/test/test.js"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath%>js/plugin/uploadify/uploadify.css"/>
<script type="text/javascript" src="<%=basePath%>js/plugin/uploadify/jquery.uploadify.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/jquery.form.js"></script>
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
</head>
<script type="text/javascript">
var basePath = '<%=basePath%>';
  </script>
<body>
	<p>ceshi</p>
	<p>ppppppp</p>
	<p id="a"></p>
	<form id="uploadForm" name="uploadForm" action="/commonFileHandler/uploadFile" method="post" enctype="multipart/form-data">  
<input type="file" name="file" /> <input type="button" value="提交" onclick="uploadFile();" />
<input type="button" value="下载模板" onclick="downloadFile();"/></form>  
	<!-- <a href="localhost:8080/loginController/logout">退出系统</a> -->
</body>
</html>
