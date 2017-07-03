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
<title>任务统计</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<%@include file="../common/base.jsp"%>
<script type="text/javascript" src="<%=basePath%>jsp/myplan/planstts.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form/form.json.js"></script>
<script type="text/javascript" src="<%=basePath%>js/echarts.min.js"></script>

<script type="text/javascript">
	basePath = "<%=basePath%>";
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
	margin-top: 0px;
	margin-left: 0px;
}

label {
	font-weight: 100;
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
		style="float:left;width:100%;height:14%;background: url('../../images/banner.png') no-repeat;background-size:100%;">
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
	<div
		style="float:left;width:100%;height:86%;border-top:3px solid #00e3e3;background:#F5FFFA;">
		<div style="float:left;width:12%;height:100%;background:#AFEEEE;">
			<%@include file="../common/menu.jsp"%>
		</div>
		<div style="float:left;width:88%;height:100%;">
			<!-- <div id='tree' class="ztree"
				style="float:left;width:20%;height:100%;border-left:2px solid #00e3e3;border-right:2px solid #FDF5E6;"></div> -->
			<div style="float:left;width:100%;height:100%;overflow-y:scroll;">
				
				<div class="input-group" style="float:left;width:17%;margin-left:60px;">
				<span class="input-group-addon">年份</span> <input type="text"
						id="year" class="form-control"
						style="width:100px;margin-left:0px;margin-top:0px" />
				</div>
				<div class="input-group" style="float:left;width:30%;margin-left:60px;">
					
				<span class="input-group-addon">会议期数</span> <input type="text" placeholder="请先选择年份"
						id="meetingContent" class="form-control" />
				</div>
				<div style="float:right;width:30%;margin-left:80px;">
					<button type="button" id="queryId" onclick="query();"
						class="btn btn-primary">查询</button>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<button type="button" id="export" onclick="expData();"
						class="btn btn-primary">导出excel</button>
				</div>
				<div class="input-group" style="float:left;width:20%;display:none;">
				
					<span class="input-group-addon">时间</span> <input type="text"
						id="listname1" class="form-control dkDate"
						style="width:100px;margin-left:0px;margin-top:0px" /><span style="float:left;margin-top:5px;margin-left:8px">~</span>
						 <input type="text"
						id="listname2" class="form-control dkDate"
						style="width:100px;margin-top:0px" />
						&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" id="queryId" onclick="query();"
						class="btn btn-primary">查询</button>
					&nbsp;&nbsp;&nbsp;&nbsp;
				</div>
				
				<!-- <div style="width:95%;float:right;margin-top:0px;overflow-y:scroll;"> -->
		<table id="reportTable" class="table table-bordered table-striped"
			style="font-size: 10px;">
		</table>
	<!-- </div>  -->
			</div> 
<%-- <div id="tb" style="width:800px;height:400px;margin-left:5%;">
		<table class="table table-bordered">
	<caption>任务统计</caption>
	<thead>
		<tr>
			<th>部室</th>
			<th>按期(完成)</th>
			<th>超期(完成)</th>
			<th>未到期(未完成)</th>
			<th>到期(未完成)</th>
			<th>持续</th>
			<th>终止</th>
		</tr>
	</thead>
	<tbody>
	<c:forEach items="${taskList}" var="task">
		<tr onclick="list('1')" title="点击查看详细信息">
			<td>${task.name }</td>
			<td id="td0" name="${task.name }" onclick="query('${task.name}','ontime')">${task.ontime}</td>
			<td id="td1" name="${task.name }" onclick="query('${task.name}','overdue')">${task.overdue}</td>
			<td id="td2" name="${task.name }" onclick="query('${task.name}','notdue')">${task.notdue}</td>
			<td id="td3" name="${task.name }" onclick="query('${task.name}','expire')">${task.expire}</td>
			<td id="td4" name="${task.name }" onclick="query('${task.name}','continued')">${task.continued}</td>
			<td id="td5" name="${task.name }" onclick="query('${task.name}','stop')">${task.stop}</td>
		</tr>
		</c:forEach>
	</tbody>
</table>
	</div> --%>
	
	<!-- <div id="myChart" style="width:400px;height:240px;float:left;margin-left:600px;margin-top:-320px"></div> -->
	<div class="modal fade" id="newModal" tabindex="-1" role="dialog"
				aria-labelledby="newModalLabel">
				<div class="modal-dialog" role="document" style="width:1200px;height:1000px;">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
							<h4 class="modal-title" id="newModalLabel">详情</h4>
						</div>
						<div class="modal-body">
					
					<div class="input-group listInput">
					<span class="input-group-addon">任务内容</span> <input type="text"
						id="content" class="form-control"
						style="width:210px;margin-left:0px;margin-top:0px;">&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" id="queryId" onclick="queryByContent();"
						class="btn btn-primary">查询</button>
				</div>
		<table id="reportTable1" class="table table-bordered table-striped"
			style="font-size: 10px;">
		</table>
					
						</div>
					<!-- 	<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">关闭</button>
						</div> -->
					</div>
				</div>
			</div>
			<div id="dialog_simple"></div>
		</div>
	</div>
	
	
</body>
</html>
