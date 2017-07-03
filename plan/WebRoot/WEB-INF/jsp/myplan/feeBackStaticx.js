$(function(){
	$("#year").datetimepicker({format: 'yyyy',startView: 4,minView: 4}).on('changeDate',function(ev){
		var item1=document.getElementsByTagName("input");
		for(var i=0;i<item1.length;i++){
			if(item1[i].id.indexOf("meetingContent_of_replace_id")!=-1){
				item1[i].remove();
			}
		}
		$("#meetingContent_of_replace_id1").remove();
		$("#meetingContent_of_replace_id1_ztree_cont_wh").remove();
		$("#meetingContent").attr("class","form-control counts");
		//document.getElementById("meetingContent").style.width="140px";
		/*document.getElementById("meetingContent").style.margin-left="0px";
		document.getElementById("meetingContent").style.margin-top="0px";*/
		$("#meetingContent").show();
		if($("#year").val()==""){
			deptTree=$("#meetingContent").dkSelectTree({
				url:"plan/getCount",
				Async:false,
				idField:"countName",
//				pidField:"pid",
				nameField:"countName",
				listType:"tree",
				multiSelect:false,
				chkboxType:{ "Y": "", "N": "" },
				width :200
			});
		}else{
			deptTree=$("#meetingContent").dkSelectTree({
				url:"plan/getCount?year="+$("#year").val(),
				Async:false,
				idField:"countName",
//				pidField:"pid",
				nameField:"countName",
				listType:"tree",
				multiSelect:false,
				chkboxType:{ "Y": "", "N": "" },
				width :200
			});
		}
	}); // 选择日期
	var nowdate=new Date();
	$("#year").val(nowdate.getFullYear());
	deptTree=$("#meetingContent").dkSelectTree({
		url:"plan/getCount?year="+$("#year").val(),
		Async:false,
		idField:"countName",
//		pidField:"pid",
		nameField:"countName",
		listType:"tree",
		multiSelect:false,
		chkboxType:{ "Y": "", "N": "" },
		width :200
	});
	if(nowCount!=null&&nowCount.length>0){
		$("#meetingContent").val(nowCount);
	}
	queryStatics();
})
var table;
function list(data){
	var title;
	if(mtype=="1"){
		title="领导工作例会";
	}else if(mtype=="2"){
		title="生产协调会";
	}else if(mtype=="3"){
		title="临时安排工作";
	}
    table=$('#reportTable').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
	showExport:false,    //显示导出
//  exportDataType: $(this).val(),//导出类型    // basic, all, selected 
// 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf' //pdf png需要另外引js
	exportTypes: ['excel'],
	pageSize: 20,	// 每页显示条数
	pageNumber: 1,  // 当前页码
	pageList: [20, 50, 100, 200, 500], //每页显示条数
	idField: "id",  // 标识哪个字段为id主键
//  showToggle: true, //名片格式
	cardView: false,// 设置为True时显示名片（card）布局
	showColumns: false, // 显示隐藏列
//  showRefresh: true, //显示刷新按钮
//	singleSelect: false,// 复选框只能选择一条记录
	search: false,// 是否显示右上角的搜索框
	clickToSelect: true,// 点击行即可选中单选/复选框
	sidePagination: "client",// 表格分页的位置
//  queryParams: queryParams, //参数
	queryParamsType: "limit", // 参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", // 设置工具栏的Id或者class
	columns: [[
	           {
                  "title":"<b style='font-size:20px;'>"+title+"迟报统计</b>",
                  "halign":"center",
                  "align":"center",
                  "colspan": 13
              }],[
	          {title: '序号',formatter:function(value,row,index){
	        	  return index+1+"";
	          }}, 
	          {field: 'dept_name',title: '部门'}, 
	          {field: 'mount',title: '本期统计'}, 
	          {field: 'month_count',title: '本月统计'}, 
	          {field: 'jd_count',title: '该半年统计'}, 
	          {field: 'year_count',title: '年度统计'}, 
	          ]], // 列
	silent: true,  // 刷新事件必须设置
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
//		alert(JSON.stringify(data));
	}
});
}
function queryStatics(){
	var param=$("#meetingContent").val();
	$.ajax({
		type:'post',
		url:'plan/staticFee',
		data:{param:encodeURI(param)},
		dataType:'json',
		success:function(data){
			list(data);
		},
		error:function(error){
			alert("获取迟报统计数据失败！");
		}
	});
}