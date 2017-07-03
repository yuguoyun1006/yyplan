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
<title>用户管理</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<%@include file="../common/base.jsp"%>
<script type="text/javascript" src="<%=basePath%>jsp/user/listUser.js"></script>
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
.modal-footer{
	border-top:1px;
}
.form-control{
	float:right;
	width:70%;
	margin-top:-5px;
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
	<div id='tree' class="ztree" style="float:left;width:20%;height:100%;border-left:2px solid #00e3e3;border-right:2px solid #FDF5E6;"></div>
	
	 <div style="float:left;width:68%;">
		<div class="input-group listInput" style="display:none;">
            <span class="input-group-addon">用户名</span>
            <input type="text" id="listname" class="form-control" style="width:210px;margin-left:0px;margin-top:0px">&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" id="queryId" onclick="query();" class="btn btn-primary">查询</button>&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" id="addBtn" onclick="addUser1();" class="btn btn-primary">添加</button>
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
        <div style="width:65%;float:right;margin-top:50px">
		<table id="reportTable" class="table table-bordered table-striped"
			style="font-size: 10px;">
		</table>
	</div>

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
					<h4 class="modal-title" id="myModalLabel">新增/修改</h4>
				</div>
			 <input type='hidden' id='id' name='id' value=''/>
			  <input type='hidden' id='userid' name='userid' value=''/>
				<div class="modal-body">
					<div class="form-group">
						<label for="username">姓名<span style="color:red;">*</span></label> 
						<input type="text" maxlength="33" 
							name="username" class="form-control" 
							id="username" >
					</div>
					<div class="form-group">
						<label for="deptid">所属部门<span style="color:red;">*</span></label> 
						<input type="text"   
							name="deptid" class="form-control" id="deptid" value="" > 
					</div>
					<div class="form-group">
						<label for="jobnumber">工号</label> 
						<input type="text" maxlength="16"
							name="jobnumber" class="form-control" id="jobnumber" >
					</div>
					<div class="form-group">
						<label for="sex">性别</label> 
						<div>
       <select class="form-control" id="sex" name="sex" style="width:188px;margin-top:-28px">
      				<option value="" class="form-control"></option> 
      				<option value="1" class="form-control">男</option>
      				<option value="2" class="form-control">女</option>
    </select>
    </div>
					</div>
					<div class="form-group">
						<label for="birthday">出生日期</label> 
						<input type="text"
							name="birthday" class="form-control dkDate" id="birthday">
					</div>
					<div class="form-group">
						 <label for="nation">民族</label> 
						<!--<input type="text"
							name="nation" class="form-control" id="nation"> -->
							<select id="nation" name="nation" class="form-control">
							 	<option value=""></option>
							</select>
					</div>
					<div class="form-group">
						<label for="highesteducation">学历</label> 
						<input type="text" maxlength="16"
							name="highesteducation" class="form-control" id="highesteducation">
					</div>
					<div class="form-group">
						<label for="jobtitle">职称</label> 
						<input type="text" maxlength="16"
							name="jobtitle" class="form-control" id="jobtitle">
					</div>
					<div class="form-group">
						<label for="post">职位</label> 
						<input type="text" maxlength="16"
							name="post" class="form-control" id="post">
					</div>
					<div class="form-group">
						<label for="nativeplace">籍贯</label> 
						<input type="text" maxlength="33"
							name="nativeplace" class="form-control" id="nativeplace">
					</div>
					<div class="form-group">
						<label for="mobile">手机</label> 
						<input type="text" maxlength="11"
							name="mobile" class="form-control" id="mobile">
					</div>
					<div class="form-group">
						<label for="email">EMAIL</label>
						 <input type="text" maxlength="33"
							name="email" class="form-control" id="email">
					</div>
					<div class="form-group">
						<label for="account">账号</label> 
						<input type="text" maxlength="33"
							name="account" class="form-control" id="account">
					</div>
				</div>
			<div class="modal-footer">
            <button type="button" class="btn btn-default"
               data-dismiss="modal">关闭
            </button>
            <button type="button" id="btn" class="btn btn-primary" onclick="addUser()">
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
