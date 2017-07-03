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
<title>账户管理</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<%@include file="../common/base.jsp"%>
<script type="text/javascript" src="<%=basePath%>jsp/account/listAccount.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form/form.json.js"></script>

<script type="text/javascript">
	basePath = "<%=basePath%>";
</script>
<style>
.clearfix {
	width: 20%;
}
.form-group{
	width:47%;
	float:left;
	margin-left:10px;
	
}
.form-group1{
	width:27%;
	float:left;
	margin-left:10px;
	
}
.form-group2{
	width:67%;
	float:left;
	margin-left:10px;
	
}
.modal-footer{
	border-top:1px;
}
.form-control{
	float:right;
	width:70%;
	margin-top:-5px;
}
.form-control1{
	float:right;
	width:80%;
	height:34px;
	margin-top:-5px;
	margin-left:12px;
}
label{
	font-weight:100;
}
 .listInput{
	position:relative;
	padding: 5px 5px 0px 5px;   /**上, 右, 下, 左*/
	 clear: both;
}

</style>
<script>
	/* $(function(){
	$.post("login/login",function(data){
			if(data.hasError){
				alert("请求错误");
			}else{
				$("#welcome").text("欢迎您:"+data);
			}
		});
	}); */
</script>
</head>
<script>
	
</script>
<body style="width:100%;height:100%;">
 <!-- <div style="float:left;width:100%;height:17%;">
  </div> -->
   <div data-option="size:82" style="float:left;width:100%;height:14%;background: url('../../images/banner.png') no-repeat;background-size:100%;">
				<div style="position: absolute; right: 10px; top: 10px; font-size: 12px; color: #DFDFDF">
					<span id="today"></span>
				</div>
				<div style="position: absolute; right: 10px; top: 45px; font-size: 14px; color: #FFFFFF; font-weight: bold;">
					<span id="welcome" style="background: url('../../images/user.gif') no-repeat; padding: 3px 0 3px 25px"></span>&nbsp;&nbsp; <!-- <span id="logout" style="cursor: pointer;"><a href="http://localhost:18080/cas/logout?service=http://localhost:8080" style="color:white">退出系统</a></span> -->
				</div>
			</div>
  <div style="float:left;width:100%;height:86%;border-top:3px solid #00e3e3;background:#F5FFFA;">
  <div style="float:left;width:12%;height:100%;background:#AFEEEE;">
  <%@include file="../common/menu.jsp"%>
  </div>
  <div style="float:left;width:88%;height:100%;">
	<div id='tree' class="ztree" style="float:left;width:16%;height:100%;border-left:2px solid #00e3e3;border-right:2px solid #FDF5E6;">
	</div>
	
	 <div style="float:left;width:84%;height:100%;overflow-y:scroll;">
		<div class="input-group listInput" style="display:none;">
            <span class="input-group-addon">账户:</span>
            <input type="text" id="listaccount" class="form-control" style="width:210px;margin-left:0px;margin-top:0px">&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" id="queryId" onclick="query();" class="btn btn-primary">查询</button>&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
    <table id="reportTable" class="table table-bordered table-striped" style="font-size: 10px;">
        </table>
        </div>
	<!-- <div id="toolbar" style="margin-top:10px">
            <select class="form-control" style="width:130px" id="export">
                <option value="">导出当前页</option>
                <option value="all">导出所有数据</option>
                <option value="selected">导出选择数据</option>
            </select>
     </div> -->
	<!-- <div style="width:65%;float:right;margin-top:50px">
		<table id="reportTable" class="table table-bordered table-striped"
			style="font-size: 10px;">
		</table>
	</div> -->

	<div id="dialog_simple"></div>
<form id="form1">
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" style="width:600px" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">修改</h4>
				</div>
			 <input type='hidden' id='userid' name='userid' value=''/>
			  <input type='hidden' id='id' name='id' value=''/>
		<!-- 	  <input type='hidden' id='updateTime' name='updateTime' value=''/>
			  <input type='hidden' id='updateTime' name='updateTime' value=''/> -->
				<div class="modal-body">
					<div class="form-group">
						<label for="account">账户<span style="color:red;">*</span></label> 
						<input type="text"
							name="account" class="form-control" 
							id="account" >
					</div>
					<div class="form-group">
						<label for="password">姓名<span style="color:red;">*</span></label> 
						<input type="text"  
							name="username" class="form-control" id="username" value="" > 
					</div>
					<div class="form-group">
						<label for="account">部门<span style="color:red;">*</span></label> 
						<input type="text"
							name="deptid" class="form-control" 
							id="deptid" >
					</div>
					<div class="form-group">
						<label for="password">角色<span style="color:red;">*</span></label> 
						<input type="text"  
							name="authority" class="form-control" id="authority" value="" > 
					</div>
					<div class="form-group">
						<label for="account">备注</label> 
						<input type="text"
							name="remark" class="form-control" 
							id="remark" >
					</div>
				</div>
			<div class="modal-footer">
            <button type="button" class="btn btn-default"
               data-dismiss="modal">关闭
            </button>
            <button type="button" id="btn" class="btn btn-primary" onclick="upda()">
               									保存
            </button>
         </div>
			</div>
		</div>
	</div>
	</form>
	<form id="form2">
	<div class="modal fade" id="authModal" tabindex="-1" role="dialog"
		aria-labelledby="authModalLabel">
		<div class="modal-dialog" style="width:600px" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
					<h4 class="modal-title" id="authModalLabel">角色</h4>
				</div>
			  <input type='hidden' id='accountId' name='accountId'/>
				<div class="modal-body">
					<div class="form-group1">
						<label for="username">账户<span style="color:red;">*</span></label> 
						<input type="text" name="username" class="form-control" id="username" disabled="true">
					</div>
					<div class="form-group2">
						<label for="authority">选择角色<span style="color:red;">*</span></label> 
						<!-- <select id="authority" name="authority" class="form-control" >
							<option value="">--1-</option>
							<option value="">--2-</option>
							<option value="">--3-</option>
						</select> -->
						<input type="text" name="authority" class="form-control1" id="authority">
					</div>
				</div>
			<div class="modal-footer">
            <button type="button" class="btn btn-default"
               data-dismiss="modal">关闭
            </button>
            <button type="button" id="btn" class="btn btn-primary" onclick="updateAuthority()">
               									保存
            </button>
         </div>
			</div>
		</div>
	</div>
	</form>
	</div>
	</div>
</body>
</html>
