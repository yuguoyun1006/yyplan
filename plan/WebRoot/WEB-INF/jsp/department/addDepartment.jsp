<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
/* String id = request.getParameter("id"); */
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>组织单位列表</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<%@include file="../common/base.jsp"%>
	<script type="text/javascript" src="<%=basePath%>jsp/department/addDepartment.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/form/form.json.js"></script>
	<script type="text/javascript">
	var basePath = "<%=basePath%>";
	</script>
  </head>
  <script>
  </script>
  <style>
 
  </style>
  <body>
  
 <form id="form1" class="form-horizontal" role="form" onsubmit = "return submitMyForm();" >
 <input type='hidden' id='id' name='id' value=''/>
  <div class="form-group">
    <label class="col-sm-2 control-label">部门编码<span style="color:red;">*</span></label>
    <div class="col-sm-10">
      <input class="form-control" id="deptId" name="deptId" type="text" value="" style="width:240px;">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">部门名称<span style="color:red;">*</span></label>
    <div class="col-sm-10">
      <input class="form-control" id="name" name="name" type="text" value="" style="width:240px;">
    </div>
  </div>
 <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">类型<span style="color:red;">*</span></label>
    <div class="col-sm-10">
       <select class="form-control" id="address" name="address" style="width:240px;">
      <option value="单位">单位</option>
      <option value="部门">部门</option>
    </select>
    </div>
  </div>
 <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">负责人</label>
    <div class="col-sm-10">
      <input class="form-control" id="leader" name="leader" type="text" value="" style="width:240px;">
    </div>
  </div><div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">联系电话</label>
    <div class="col-sm-10">
      <input class="form-control" id="tel" name="tel" type="text" value="" style="width:240px;">
    </div>
  </div><div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">描述</label>
    <div class="col-sm-10">
      <input class="form-control" id="remark" name="remark" type="text" value="" style="width:240px;">
    </div>
  </div>
  <button id="btnAdd" type="button" class="btn btn-primary" onclick="submitForm();">提交</button>
</form>
</html>
