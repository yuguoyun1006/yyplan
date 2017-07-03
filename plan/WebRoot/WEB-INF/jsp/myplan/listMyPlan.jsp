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
<title>我的任务</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<%@include file="../common/base.jsp"%>
<script type="text/javascript"
	src="<%=basePath%>jsp/myplan/listMyPlan.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form/form.json.js"></script>

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
	margin-top: -5px;
	margin-left: 10px;
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
/* 	$(function() {
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
	<div style="float:left;width:100%;height:86%;border-top:3px solid #00e3e3;background:#F5FFFA;">
		<div style="float:left;width:12%;height:100%;background:#AFEEEE;">
			<%@include file="../common/menu.jsp"%>
		</div>
		<div style="float:left;width:88%;height:100%;">
			<!-- <div id='tree' class="ztree"
				style="float:left;width:20%;height:100%;border-left:2px solid #00e3e3;border-right:2px solid #FDF5E6;"></div> -->

			<div style="float:right;width:95%;height:100%;overflow-y:scroll;">
				<div class="input-group listInput">
					<span class="input-group-addon">标题</span> <input type="text"
						id="listname" class="form-control"
						style="width:210px;margin-left:0px;margin-top:0px" />状态<select
						 id="status1" name="status1"
						style="width:95px;margin-top:0px;height:34px">
						<!-- <option value="未完成">未完成</option>
						<option value="完成">完成</option> -->
						<!-- <option value="">请选择</option> -->
						<option value="未到期">未到期</option>
						<option value="到期">到期</option>
						<option value="持续">持续</option>
						<option value="终止">终止</option>
						<option value="按期">按期</option>
						<option value="超期">超期</option>
						<option value="">所有任务</option>
					</select>&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" id="queryId" onclick="query();"
						class="btn btn-primary">查询</button>
					&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" id="export" onclick="expData();"
						class="btn btn-primary">导出excel</button>
				</div>
				
				<table id="reportTable5" class="table table-bordered table-striped"
					style="font-size: 10px;">
				</table>
				<!-- <div style="float:left;width:30%;height:99%;">
				<table id="reportTable1" class="table table-bordered table-striped"
					style="font-size: 10px;">
				</table>
				</div>
				<div style="float:left;width:30%;height:99%;">
				<table id="reportTable2" class="table table-bordered table-striped"
					style="font-size: 10px;">
				</table>
				</div>
				<div style="float:left;width:30%;height:99%;">
				<table id="reportTable3" class="table table-bordered table-striped"
					style="font-size: 10px;">
				</table>
				</div> -->
			</div>
			
			
			<div class="modal fade" id="infoModal" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel">
				<div class="modal-dialog" style="width:1250px;" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
							<h4 class="modal-title" id="myModalLabel">任务信息</h4>
						</div>
						<div class="modal-body">
							<table id="reportTable4"
								class="table table-bordered table-striped"
								style="font-size: 10px;">
							</table>

						</div>
					</div>
				</div>
			</div>
				
				
			<div id="dialog_simple"></div>
			<form id="form1">
				<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel">
					<div class="modal-dialog" style="width:400px;" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-label="Close">
									<span aria-hidden="true">×</span>
								</button>
								<h4 class="modal-title" id="myModalLabel">反馈</h4>
							</div>
							<input type='hidden' id='id' name='id' value='' />
							<div class="modal-body">
							
							<div class="form-group" style="height:50px;">
									<label for="planTime">任务内容<span style="color:red;"></span>
									</label> 
									<textarea id="content11" name="content11" class="form-control" style="width:295px;height:50px;" disabled="true"></textarea>
								<!-- 	<input type="text" name="content" class="form-control" disabled="true"
										id="content"  /> -->
								</div>
							
								<div class="form-group">
									<label for="planTime">计划时间<span style="color:red;"></span>
									</label> <input type="text" name="planTime" class="form-control dkDate"
										id="planTime"  />
								</div>
								<div class="form-group">
									<label for="feedbackPeople">填报人</label> <input type="text"
										maxlength="16" name="feedbackPeople" class="form-control"
										id="feedbackPeople"  />
								</div>
								<div class="form-group" id="zt">
									<label for="status">状态</label>
									<div id='sts'>
										<select class="form-control" id="status" name="status"
											style="width:295px;margin-top:-30px">
											<option value="">请选择</option>
											<option value="ontime,按期">按期</option>
											<option value="overdue,超期">超期</option>
											<option value="notdue,未到期">未到期</option>
											<option value="expire,到期">到期</option>
											<option value="continued,持续">持续</option>
											<option value="stop,终止">终止</option>
										</select>
									</div>
								</div>
								<div class="form-group" id="ftime" class="ftime">
									<label for="finishTime">完成时间</label> <input type="text" 
										maxlength="33" name="finishTime" class="form-control dkDate" 
										id="finishTime" />
								</div>
								<div class="form-group">
									<label for="remark">反馈信息</label>
									<textarea id='remark' name='remark' class="form-control"
										type="text" style="width:300px;height:100px;margin-top:5px"></textarea>
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									style="float:left;margin-top:30px;margin-left:252px" data-dismiss="modal">关闭</button>
								<button type="button" id="btn" class="btn btn-primary" style="margin-top:30px"
									onclick="save()">保存</button>
							</div>
						</div>
					</div>
				</div>
			</form>
			
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
	</div>
	
</body>
</html>
