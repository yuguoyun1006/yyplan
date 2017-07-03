<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML>
<html style="width:100%;height:100%;">
<head>
<base href="<%=basePath%>">
<title></title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<%@include file="../common/base.jsp"%>

<script type="text/javascript">
	basePath = "<%=basePath%>";
</script>
<style>
.indexLink ul {
    display: block;
    list-style-type: none;
}
.indexLink ul li {
    width: 200px;
    text-align: center;
    float: right;
    margin-left: 30px;
}
.indexLink ul li a, .indexLink ul li a:visited {
    width: 200px;
    height: 60px;
    text-align: center;
    background-color:#006a91;/*#90000a;*/
    color:#FFFFFF;
    font-family:微软雅黑;
    font-size:18px;
    display:block;
    padding-top:18px;
    margin-bottom: 47px;
    text-decoration:none;
    /*font-weight:bold;*/
}
.indexLink ul li a:hover{

    background-color:#F60;
}

.indexLink ul li a.brown, .indexLink ul li a.brown:visited {
    background-color:#90000a;
    color:#FFFFFF;
}
.indexLink ul li a.brown:hover{

    background-color:#F60;
}

.indexLink ul li a.green, .indexLink ul li a.green:visited {
    background-color:#7a8523;
    color:#FFFFFF;
}
.indexLink ul li a.green:hover{

    background-color:#F60;
}

.indexLink ul li a.orange, .indexLink ul li a.orange:visited {
    background-color:#d5641c;
    color:#FFFFFF;
}
.indexLink ul li a.orange:hover{

    background-color:#F60;
}

li.list-group-item>a{
  color: #5f5f5f;
  font-family:"微软雅黑";

}li.list-group-item>a:hover{
  color: #b92e32;
}
</style>
</head>
<script>
</script>
<body style="width:100%;height:100%;">
<div class="indexLink"  style="margin-top:290px;width:850px;float:left;margin-left:150px">
            <ul>
                <li><a href="http://localhost:8080/sendPlanController/list/1" class="blue" target="_self">领导工作例会</a></li>
                <li><a href="http://localhost:8080/sendPlanController/list/2" class="blue" target="_self">生产会</a></li>
                <li><a href="http://localhost:8080/sendPlanController/list/3" class="blue" target="_self">临时会</a></li>
            </ul>
        </div>

</body>
</html>
