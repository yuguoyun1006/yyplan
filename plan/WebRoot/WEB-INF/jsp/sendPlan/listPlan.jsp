<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
 	/* String account = request.getParameter("loginAccount");
	System.out.println("fdfdsfdsf............."+account);
	String auth = request.getParameter("auth");
	System.out.println("............"+auth); */
%>

<!DOCTYPE HTML>
<html style="width:100%;height:100%;">
<head>
<base href="<%=basePath%>">
<title>任务分发</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<%@include file="../common/base.jsp"%>
<script type="text/javascript"
	src="<%=basePath%>jsp/sendPlan/listPlan.js"></script>
<script type="text/javascript" src="<%=basePath%>js/form/form.json.js"></script>
<script type="text/javascript">
	var basePath = "<%=basePath%>";
 	/* var account="${loginAccount}";
	var auth ="${auth}";  */
</script>
</head>
<script>
var type = "${mtype}";
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
<style>
.listInput { 
	position: relative;
	padding: 5px 5px 0px 5px; /**上, 右, 下, 左*/
	clear: both;
}
.wid{
width:180px;
}
.col-sm-2{
width:100px;}
</style>
<body style="width:100%;height:100%;">
	<!--  <div style="float:left;width:100%;height:17%;">
  </div> -->
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
	<div
		style="float:left;width:100%;height:86%;border-top:3px solid #00e3e3;background:#F5FFFA;">
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
			<!-- <div id="depTree" class="ztree"
				style="float:left;width:20%;height:100%;border-left:2px solid #00e3e3;border-right:2px solid #FDF5E6;"></div>
 -->
			<div style="float:right;width:99%;height:100%;overflow-y:scroll;">
				<div class="input-group listInput">
					<span class="input-group-addon">任务类型</span> <input type="text"
						id="queryName" class="form-control"
						style="width:210px;margin-left:0px;margin-top:0px;">&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" id="queryId" onclick="queryByTitle();"
						class="btn btn-primary">查询</button>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" id="addBtn" onclick="addPlan();"
						class="btn btn-primary">分发</button>&nbsp;&nbsp;&nbsp;&nbsp;<!-- <button type="button" id="plsend" onclick="plsend();"
						class="btn btn-primary">批量分发</button>&nbsp;&nbsp;&nbsp;&nbsp; --><button type="button" id="export" onclick="expData();"
						class="btn btn-primary">导出excel</button>
				</div>
				<table id="reportTable" class="table table-bordered table-striped"
					style="font-size: 10px;">
				</table>
			</div>
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document" style="width:570px;">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
							<h4 class="modal-title" id="myModalLabel">新增</h4>
						</div>
						<div class="modal-body">
							<form id="form1" class="form-horizontal" role="form">
								<input type='hidden' id='id' name='id' value='' />
								<div class="form-group">
									<label class="col-sm-2">任务类型<span
										style="color:red;">*</span>
									</label>
									<div class="col-sm-10" style="float:left;width:31%;">
										<input class="form-control" id="title" name="title"
											type="text" value="" style="width:145px;" maxlength="16">
									</div>
									<label class="col-sm-2">会议时间<span
										style="color:red;">*</span>
									</label>
									<div class="col-sm-10" style="float:left;width:31%;margin-left:10px;">
										<input class="form-control dkDate" id="createTime" name="createTime"
											type="text" value="" style="width:145px;" maxlength="16">
									</div>
								</div>
								<div class="form-group">
									<label class="col-sm-2">计划时间
									</label>
									<div class="col-sm-10" style="float:left;width:31%;">
										<input class="form-control dkDate" id="planTime"
											name="planTime" type="text" value="">
									</div>
									<label for="inputPassword" class="col-sm-2">会议期数
									</label>
									<div class="col-sm-10" style="float:left;width:31%;margin-left:10px;">
										第<input id="meetingContent"
											name="meetingContent" type="text" maxlength="6" value="" style="width:110px;height:34px;">期
									</div>
								</div>
									<div class="form-group">
									<label class="col-sm-2">主办部门<span
										style="color:red;">*</span>
									</label>
									<div class="col-sm-10" style="float:left;width:31%;">
										<input class="form-control" id="workUnit"
											name="workUnit" type="text" value="">
									</div>
									<label for="inputPassword" class="col-sm-2">负责领导<span
										style="color:red;">*</span>
									</label>
									<div class="col-sm-10" style="float:left;width:31%;margin-left:10px;">
										<input class="form-control" id="workPerson"
											name="workPerson" type="text" value="">
									</div>
								</div>
									<div class="form-group">
									<label class="col-sm-2">协办部门
									</label>
									<div class="col-sm-10" style="float:left;width:31%;">
										<input class="form-control" id="coOrganizer"
											name="coOrganizer" type="text" value="">
									</div>
									<label for="inputPassword" class="col-sm-2">协办领导
									</label>
									<div class="col-sm-10" style="float:left;width:31%;margin-left:10px;">
										<input class="form-control" id="jointly"
											name="jointly" type="text" value="">
									</div>
								</div>
								<div class="form-group">
									<label for="inputPassword" class="col-sm-2">任务内容<span
										style="color:red;">*</span>
									</label>
									<div class="col-sm-10">
										<textarea class="form-control" id="content" name="content"
											type="text" maxlength="400" value=""
											style="width:430px;height:100px;"></textarea>
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" id="btnClick" onclick="sendClick();" class="btn btn-primary">分发</button>
							<!-- <button type="button" id="btn_submit" onclick="submitForm();"
								class="btn btn-primary">保存</button> -->
						</div>
					</div>
				</div>
			</div>

			<div class="modal fade" id="newModal" tabindex="-1" role="dialog"
				aria-labelledby="newModalLabel">
				<div class="modal-dialog" role="document" style="width:470px;">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
							<h4 class="modal-title" id="newModalLabel">分发</h4>
						</div>
						<div class="modal-body">
						<form id="form2" class="form-horizontal" role="form">
						<input type='hidden' id='ids' name='ids' value='' />
							<div class="form-group">
								<label class="col-sm-2 control-label">主办部门<span
									style="color:red;">*</span>
								</label>
								<div class="col-sm-10">
									<input class="form-control" id="workUnit" name="workUnit"
										type="text" value="" maxlength="36" style="width:300px;">
								</div>
							</div>
							<div class="form-group">
									<label class="col-sm-2 control-label">负责人<span
										style="color:red;">*</span> </label>
									<div class="col-sm-10">
										<!-- <input class="form-control" id="workPerson" name="workPerson"
										type="text" value="" maxlength="36" style="width:300px;"> -->
										<select class="form-control" id="workPerson" name="workPerson"
											style="width:300px;">
										</select>
									</div>
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">关闭</button>
							<button type="button" id="btn_submit22" onclick="sendClick();"
								class="btn btn-primary">分发</button>
						</div>
					</div>
				</div>
			</div>
			
			
			<div class="modal fade" id="newModalpl" tabindex="-1" role="dialog"
				aria-labelledby="newModalLabel">
				<div class="modal-dialog" role="document" style="width:440px;">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">×</span>
							</button>
							<h4 class="modal-title" id="newModalLabel">批量分发</h4>
						</div>
						<div class="modal-body">
						<form id="form2" class="form-horizontal" role="form">
			<input type='hidden' id='plids' name='plids' value='' />
			
			<div class="form-group">
								<label class="col-sm-2 control-label">计划时间<span
									style="color:red;">*</span>
								</label>
								<div class="col-sm-10" style="width:280px;">
									<input class="form-control dkDate" id="plplanTime" name="plplanTime"
										type="text" value=""  style="width:280px;">
								</div>
				</div>
							
							<div class="form-group">
								<label class="col-sm-2 control-label">主办部门<span
									style="color:red;">*</span>
								</label>
								<div class="col-sm-10" style="width:280px;">
									<input class="form-control" id="plworkUnit" name="plworkUnit"
										type="text" value="" maxlength="36" style="width:280px;">
								</div>
							</div>
							<div class="form-group">
									<label class="col-sm-2 control-label">负责领导<span
										style="color:red;">*</span> </label>
									<div class="col-sm-10" style="width:280px;">
										<!-- <input class="form-control" id="workPerson" name="workPerson"
										type="text" value="" maxlength="36" style="width:300px;"> -->
										<input class="form-control" id="plworkPerson" name="plworkPerson"
											style="width:280px;"/>
									</div>
								</div>
								
								<div class="form-group">
								<label class="col-sm-2 control-label">协办部门<span
									style="color:red;">*</span>
								</label>
								<div class="col-sm-10" style="width:280px;">
									<input class="form-control" id="plcoOrganizer" name="plcoOrganizer"
										type="text" value="" maxlength="36" style="width:280px;">
								</div>
							</div>
							<div class="form-group">
									<label class="col-sm-2 control-label">协办领导<span
										style="color:red;">*</span> </label>
									<div class="col-sm-10" style="width:280px;">
										<!-- <input class="form-control" id="workPerson" name="workPerson"
										type="text" value="" maxlength="36" style="width:300px;"> -->
										<input class="form-control" id="pljointly" name="pljointly"
											style="width:280px;"/>
									</div>
								</div>
								
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">关闭</button>
							<button type="button" id="btn_submit22" onclick="plsendClick();"
								class="btn btn-primary">分发</button>
						</div>
					</div>
				</div>
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
							<button type="button" class="btn btn-default"
								data-dismiss="modal">关闭</button>
						</div>
					</div>
				</div>
			</div>
			
			
			
		</div>
	</div>
</body>
</html>
