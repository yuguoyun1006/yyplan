<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
			String nowCount=session.getAttribute("nowCount").toString();
%>

<!DOCTYPE HTML>
<html style="width:100%;height:100%;">
<head>
<base href="<%=basePath%>">
<title>迟报统计</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<%@include file="../common/base.jsp"%>
<script type="text/javascript"
	src="<%=basePath%>jsp/myplan/feeBackStaticx.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form/form.json.js"></script>

<script type="text/javascript">
	basePath = "<%=basePath%>";
	var nowCount = "<%=nowCount%>";
</script>
<style>
.clearfix {
	width: 20%;
}

.modal-footer {
	border-top: 1px;
	height: 125px;
}

.form-control {
	float: right;
	width: 80%;
	margin-top: -5px;
	margin-left: 10px;
}

label {
	font-weight: 100;
}
.counts{
width:140px;
margin-left:0px;
margin-top:0px;
}
.listInput {
	position: relative;
	padding: 5px 5px 0px 5px; /**上, 右, 下, 左*/
	clear: both;
}
</style>
</head>
<script>
var mtype="${mtype}";
	/* $(function() {
		$.post("login/login", function(data) {
			if (data.hasError) {
				alert("请求错误");
			} else {
				$("#welcome").text("欢迎您:" + data);
			}
		});
	}); */
</script>
<body style="width:100%;height:100%;">
	<div data-option="size:82"
		style="float:left;width:100%;height:94px;background: url('../../images/banner.png') no-repeat;background-size:100%;">
		<div
			style="position: absolute; right: 10px; top: 10px; font-size: 12px; color: #DFDFDF">
			<span id="today"></span>
		</div>
		<div
			style="position: absolute; right: 10px; top: 45px; font-size: 14px; color: #FFFFFF; font-weight: bold;">
			<span id="welcome"
				style="background: url('../../images/user.gif') no-repeat; padding: 3px 0 3px 25px"></span>&nbsp;&nbsp;
			<!-- <span id="logout" style="cursor: pointer;"><a href="http://localhost:18080/cas/logout?service=http://localhost:8080" style="color:white">退出系统</a></span> -->
		</div>
	</div>
	<div style="float:left;width:100%;height:86%;border-top:3px solid #00e3e3;background:#F5FFFA;">
		<div style="float:left;width:12%;height:100%;background:#AFEEEE;">
			<%@include file="../common/menu.jsp"%>
		</div>
		<div style="float:left;width:88%;height:100%;">
			<!-- <div id='tree' class="ztree"
				style="float:left;width:20%;height:100%;border-left:2px solid #00e3e3;border-right:2px solid #FDF5E6;"></div> -->

			<div style="float:right;width:95%;height:100%;overflow:scroll;">
					<div class="input-group" style="float:left;width:180px;margin-left:5px;">
					<span class="input-group-addon">年份</span> <input type="text"
						id="year" class="form-control"
						style="width:100px;margin-left:0px;margin-top:0px" />
						</div>
					<div class="input-group" style="float:left;width:220px;margin-left:5px;">
					<span class="input-group-addon">会议期数</span> <input type="text" placeholder="请先选择年份"
						id="meetingContent" class="form-control counts" />
					</div>
					<div style="float:left;margin-left:15px;">
					<button type="button" id="queryId" onclick="queryStatics();"
						class="btn btn-primary">查询</button>
					&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="export" onclick="expData();"
						class="btn btn-primary">导出excel</button>
				</div>
				<table id="reportTable" class="table table-bordered table-striped"
					style="font-size: 10px;">
				</table>
			</div>
			<!-- <div style="width:65%;float:right;margin-top:50px">
				<table id="reportTable" class="table table-bordered table-striped"
					style="font-size: 10px;">
				</table>
			</div> -->


			

			<div id="dialog_simple"></div>
		</div>
		
		<div class="modal fade" id="contentModal" tabindex="-1" role="dialog"
				aria-labelledby="newModalLabel">
				<div class="modal-dialog" role="document" style="width:470px;">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
							<h4 class="modal-title" id="newModalLabel">任务内容</h4>
						</div>
						<div class="modal-body">
						
						<p id="contentMod"></p>
						
						</div>
						<div class="modal-footer">
							<button type="button" style="margin-right:20px;margin-bottom:20px;"  class="btn btn-default"
								data-dismiss="modal">关闭</button>
						</div>
					</div>
				</div>
			</div>
			
	</div>
</body>
</html>
