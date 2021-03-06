<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
/* String id = request.getParameter("id"); */
%>

<!DOCTYPE HTML>
<html style="width:100%;height:100%;">
  <head>
    <base href="<%=basePath%>">
    <title>组织单位列表</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<%@include file="../common/base.jsp"%>
	<script type="text/javascript" src="<%=basePath%>jsp/account/userAccount.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/form/form.json.js"></script>
	<script type="text/javascript">
	var basePath = "<%=basePath%>";
	var account="${account}";
	var password="${password}";
	</script>
  </head>
  <script>
  $(function(){
	$.post("login/login",function(data){
			if(data.hasError){
				alert("请求错误");
			}else{
				$("#welcome").text("欢迎您:"+data);
			}
		});
	});
  </script>
  <style>
  .listInput{
	position:relative;
	padding: 5px 5px 0px 5px;   /**上, 右, 下, 左*/
	 clear: both;
}

  </style>
  <body style="width:100%;height:100%;">
 <!--  <div style="float:left;width:100%;height:17%;">
  </div> -->
  <div data-option="size:82" style="float:left;width:100%;height:14%;background: url('../../images/banner.png') no-repeat;background-size:100%;">
				<div style="position: absolute; right: 10px; top: 10px; font-size: 12px; color: #DFDFDF">
					<span id="today"></span>
				</div>
				<div style="position: absolute; right: 10px; top: 45px; font-size: 14px; color: #FFFFFF; font-weight: bold;">
					<span id="welcome" style="background: url('../../images/user.gif') no-repeat; padding: 3px 0 3px 25px"></span>&nbsp;&nbsp;<!-- <span id="logout" style="cursor: pointer;"><a href="http://localhost:18080/cas/logout?service=http://localhost:8080" style="color:white">退出系统</a></span> -->
				</div>
			</div>
  <div style="float:left;width:100%;height:86%;border-top:3px solid #00e3e3;background:#F5FFFA;">
  <div style="float:left;width:12%;height:100%;background:#AFEEEE;">
  <%@include file="../common/menu.jsp"%>
  </div>
<!--   <div id="toolbar" style="margin-top:10px">
            <select id="selector" class="form-control" style="width:130px" id="export">
                <option value="">导出当前页</option>
                <option value="all">导出所有数据</option>
                <option value="selected">导出选择数据</option>
            </select>
     </div> -->
  <div style="float:left;width:88%;height:100%;">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document" style="width:470px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">改密码</h4>
				</div>
				<div class="modal-body">
 <form id="form1" class="form-horizontal" role="form" >
  <div class="form-group">
    <label class="col-sm-2 control-label">账号<span style="color:red;">*</span></label>
    <div class="col-sm-10">
      <input class="form-control" id="account" disabled='disabled' name="account" type="text" maxlength="16" value="${loginAccount}" style="width:300px;">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">密码<span style="color:red;">*</span></label>
    <div class="col-sm-10">
      <input class="form-control" id="password" name="password" type="password" maxlength="100" value="${password}" style="width:300px;">
    </div>
  </div>
</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						关闭
					</button>
					<button type="button" id="btn_submit" onclick="submitForm();" class="btn btn-primary"
						>
						保存
					</button>
				</div>
			</div>
		</div>
	</div>
			</div>
	</div>
  </body>
</html>
