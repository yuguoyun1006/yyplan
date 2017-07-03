$(function(){
	$(".dkDate").datetimepicker({format: 'yyyy-mm-dd',minView:2}); // 选择日期
	$.ajax({  
		type:'get',
        url:'departmentController/alldept', 
        async:false,
        success:function(data){  
            if(data.hasError){ 
            	alert(data.hasError);
            }else{ 
            	deptInfo=data;
            }  
        }
	});
	$.ajax(
	  		{
	  		type:"get",
	  		url:"plan/planlist",
	  		data:{"mtype":mtype,"status":encodeURI($("#status1").val())},
	  		dataType:'json',
	  		async:false,
	  		success:function(data){
//	  			list1(data.mtype1);
//	  			list2(data.mtype2);
//	  			list3(data.mtype3);
	  			list4(data);
	  		}
	  		});
	$("#status1").change(function(){
		query();
	});
// list();
});
var deptInfo;
function list1(data){
    $('#reportTable1').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
//  url: 'plan/planlist',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
	pageSize: 20,	// 每页显示条数
	height:500,
	pageNumber: 1,  // 当前页码
	pageList: [5, 10, 15], // 每页显示条数
	idField: "id",  // 标识哪个字段为id主键
	cardView: false,// 设置为True时显示名片（card）布局
	showColumns: false, // 显示隐藏列	
//  showRefresh: true, //显示刷新按钮
//  singleSelect: false,// 复选框只能选择一条记录
	search: false,// 是否显示右上角的搜索框
	clickToSelect: true,// 点击行即可选中单选/复选框
	sidePagination: "client",// 表格分页的位置
//  queryParams: queryParams, //参数
	queryParamsType: "limit", // 参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", // 设置工具栏的Id或者class
	columns: [
	          {field: '',title: '领导工作例会',formatter:function(value,row,index){
	        	  var type=1;
	        	  var time=row.time;
	        	  var count=row.count;
	        	  return "第"+count+"期"+"     "+ time;
	          }}], // 列
	silent: true,  // 刷新事件必须设置
	onClickCell: function (field, value, row, $element) {
			detail(row.id);
		return false;
		},
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
// alert(JSON.stringify(data));
	}
});
}
function detail(id){
	$.ajax(
	  		{
	  		type:"get",
	  		url:"plan/getPlanEx",
	  		data:{"id":id},
	  		dataType:'json',
	  		async:false,
	  		success:function(data){
	  			list4(data);
	  			$("#infoModal").modal();
	  		}
	  		});
}
function getDeptById(deptid){
	return deptInfo["dept"+deptid];
}
function expData(){
	table.tableExport(table.extend({}, {
        showExport: false,
        exportDataType: 'all', // basic, all, selected
        // 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel',
		// 'powerpoint', 'pdf'
        exportTypes: ['excel'],
        exportOptions: {}
    }, {
        type: 'excel',
        escape: false}
	)
    );
}
var table;
function list4(data){
	var title;
	if(mtype=="1"){
		title="领导工作例会";
	}else if(mtype=="2"){
		title="生产协调会";
	}else if(mtype=="3"){
		title="临时安排工作";
	}
    table=$('#reportTable5').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
//    url: 'plan/planlist',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
//	showExport:true,    //显示导出
//  exportDataType: $(this).val(),//导出类型    // basic, all, selected 
// 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf' //pdf png需要另外引js
//	exportTypes: ['excel'],
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
                  "title": "<b style='font-size:20px;'>"+title+"</b>",
                  "halign":"center",
                  "align":"center",
                  "colspan": 14
              }],[
	          {title: '序号',formatter:function(value,row,index){
	        	  return index+1+"";
	          }}, 
	          {field: 'content',title: '任务内容',width:'13%',formatter:function(value,row,index){
            	  if(value==null){
            		  return " ";
            	  }else{
            		  if(value.length>15){
                		  return value.substr(0 , 25)+"...";
                	  }else{
                		  return value;
                	  }
            	  }
              }},
	          {field: 'title',title: '任务类型'}, 
	          {field: 'plan_time',title: '计划完成时间'},
	          {field: 'work_person',title: '负责领导'},
	          {field: 'jointly',title: '协办领导'},
	          {field: 'dept_name',title: '主办部室'},
	          {field: 'co_organizer',title: '协办部门',formatter:function(value,row,index){
            	  if(value==null||value.indexOf("|")==-1){
            		  return row.co_name;
            	  }else{
            		  var text="";
            		  var arr=value.split("|");
            		  for(var i=0;i<arr.length;i++){
            			  text+=getDeptById(arr[i])+",";
            		  }
            		  if(text.trim().length>0){
            			  return text.substring(0, text.length-1);
            		  }else{
            			  return text;
            		  }
            	  }
              }},
	          {field: 'feeback_status',title: '反馈状态',formatter:function(value,row,index){
	        	  if(value==""||value==null){
	        		  return "未反馈";
	        	  }else{
	        		  return value;
	        	  }
	          }},
	          {field: 'remark',title: '反馈信息',width:'13%',formatter:function(v){
	        	  if(v==null||v==""){
	        		  return v;
	        	  }else{
	        		  if(v.length>=15){
		        		  return v.substring(0,15)+"...";
		        	  }else{
		        		  return v;
		        	  }  
	        	  }
	          }},
	          {field: 'finish_time',title: '完成时间'},
	          {field: 'status',title: '状态',width:'6%',formatter:function(value){
	        	  if(value=="1"){return "按期";}
	        	  if(value=="2"){return "超期";}
	        	  if(value=="3"){return "未到期";}
	        	  if(value=="4"){return "到期";}
	        	  if(value=="5"){return "持续";}
	        	  if(value=="6"){return "终止";}
	        	  else{
	        		  return "未到期";
	        	  }
	          }},
//	          {field: 'status',title: '状态',formatter:function(v){
//	        	  if(v=="1"){
//	        		  return "完成";
//	        	  }
//	        	  if(v=="2"){
//	        		  $("#ft").remove();
//	        		  return "未完成";
//	        	  }
//	        	  if(v=="3"){
//	        		  return "持续";
//	        	  }
//	        	  if(v=="4"){
//	        		  return "终止";
//	        	  }
//	          }},
	          {field: 'meeting_content',title: '会议期数',formatter:function(value,row,index){
	        	  return "第"+value+"期"+" "+row.create_time;
	          }},
//	          {field: 'create_time',title: '会议时间'},
	        /*  {field: 'handle',title: '备注'},*/
	          {
		           title:'操作','field':'id',align:'center',width:'120',formatter:function(value,row,index){
		        	   var xq='<a  onclick="show(\''+ row.content +'\')">详情</a> ';
		        	   return xq+'&nbsp;<a href="javascript:showDetail(\''+ row.id + '\')">反馈</a>';
		           } 
	                  }
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

function show(content){
	$("#contentMod").text(content);
	$("#contentModal").modal('show');
}
function list2(data){
    $('#reportTable2').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
//  url: 'plan/planlist',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
	pageSize: 20,	// 每页显示条数
	pageNumber: 1,  // 当前页码
	height:500,
	pageList: [20, 50], // 每页显示条数
	idField: "id",  // 标识哪个字段为id主键
	cardView: false,// 设置为True时显示名片（card）布局
	showColumns: false, // 显示隐藏列	
//  showRefresh: true, //显示刷新按钮
//  singleSelect: false,// 复选框只能选择一条记录
	search: false,// 是否显示右上角的搜索框
	clickToSelect: true,// 点击行即可选中单选/复选框
	sidePagination: "client",// 表格分页的位置
//  queryParams: queryParams, //参数
	queryParamsType: "limit", // 参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", // 设置工具栏的Id或者class
	columns: [
	          {field: '',title: '生产协调会',formatter:function(value,row,index){
	        	  var type=1;
	        	  var time=row.time;
	        	  var count=row.count;
	        	  return "第"+count+"期"+"     "+ time;
	          }}], // 列
	silent: true,  // 刷新事件必须设置
	onClickCell: function (field, value, row, $element) {
		detail(row.id);
	return false;
	},
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
// alert(JSON.stringify(data));
	}
});
}

function list3(data){
    $('#reportTable3').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
//  url: 'plan/planlist',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
	pageSize: 20,	// 每页显示条数
	height:500,
	pageNumber: 1,  // 当前页码
	pageList: [20, 50], // 每页显示条数
	idField: "id",  // 标识哪个字段为id主键
	cardView: false,// 设置为True时显示名片（card）布局
	showColumns: false, // 显示隐藏列	
//  showRefresh: true, //显示刷新按钮
//  singleSelect: false,// 复选框只能选择一条记录
	search: false,// 是否显示右上角的搜索框
	clickToSelect: true,// 点击行即可选中单选/复选框
	sidePagination: "client",// 表格分页的位置
//  queryParams: queryParams, //参数
	queryParamsType: "limit", // 参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", // 设置工具栏的Id或者class
	columns: [
	          {field: '',title: '临时安排工作',formatter:function(value,row,index){
	        	  var type=1;
	        	  var time=row.time;
	        	  var count=row.count;
	        	  return time+"";
	          }}], // 列
	silent: true,  // 刷新事件必须设置
	onClickCell: function (field, value, row, $element) {
		detail(row.id);
	return false;
	},
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
// alert(JSON.stringify(data));
	}
});
}
/** 反馈记录 */ 
function record(id){
	$.ajax({
		url:"plan/record",
		type:"post",
		data:{"planId":id},
		success:function(data){
			recordList(data);
		}
	});
}
function recordList(data){
    $('#record').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
	showExport:true,    // 显示导出
//  exportDataType: $(this).val(),//导出类型 // basic, all, selected
// 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint',
// 'pdf' //pdf png需要另外引js
	exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel','doc'],
	pageSize: 20,	// 每页显示条数
	pageNumber: 1,  // 当前页码
	pageList: [20, 50, 100, 200, 500], // 每页显示条数
	idField: "id",  // 标识哪个字段为id主键
//  showToggle: true, //名片格式
	cardView: false,// 设置为True时显示名片（card）布局
	showColumns: false, // 显示隐藏列	
//  showRefresh: true, //显示刷新按钮
//  singleSelect: false,// 复选框只能选择一条记录
	search: false,// 是否显示右上角的搜索框
	clickToSelect: true,// 点击行即可选中单选/复选框
	sidePagination: "client",// 表格分页的位置
//  queryParams: queryParams, //参数
	queryParamsType: "limit", // 参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", // 设置工具栏的Id或者class
	columns: [
	          {field: 'title',title: '标题'}, 
	          {field: 'plan_time',title: '计划完成时间'},
	          {field: 'username',title: '负责领导'},
	          {field: 'jointly',title: '协办领导'},
	          {field: 'dept_name',title: '主办部室'},
	          {field: 'co_organizer',title: '协办部室'},
//	          {field: 'create_name',title: '创建人'},
	          {field: 'remark',title: '办理情况',formatter:function(value,row,index){
//	        	  if(v==null||v==""){
//	        		  return v;
//	        	  }else{
//	        		  if(v.length>=15){
//		        		  return v.substring(0,15)+"...";
//		        	  }else{
//		        		  return v;
//		        	  }  
//	        	  }
	        	  return '<a href="javascript:showDetail(\''+ row.id + '\')">查看</a>';
	          }},
	          {field: 'finish_time',title: '完成时间'},
//	          {field: 'ontime',title: '按期'},
//	          {field: 'overdue',title: '超期'},
//	          {field: 'notdue',title: '未到期'},
//	          {field: 'expire',title: '到期'},
//	          {field: 'continued',title: '持续'},
//	          {field: 'stop',title: '终止'},
	          {field: 'status',title: '状态',formatter:function(value){
	        	  if(value==""){return "";}
	        	  if(value=="1"){return "按期";}
	        	  if(value=="2"){return "超期";}
	        	  if(value=="3"){return "未到期";}
	        	  if(value=="4"){return "到期";}
	        	  if(value=="5"){return "持续";}
	        	  if(value=="6"){return "终止";}
	        	  
	          }},
	          {field: 'update_time',title: '反馈时间',formatter:function(value){
	        	  return new Date(value).Format('yyyy-MM-dd hh:mm:ss');
	          }}
//	          {field: 'remark',title: '反馈信息',formatter:function(value,row,index){
//	        	  if(value.length>=15){
//	        		  return value.substring(0,15)+"...";
//	        	  }else{
//	        		  return value;
//	        	  }
//	          }}
	          ], // 列
	silent: true,  // 刷新事件必须设置
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
 alert(JSON.stringify(data));
	}
});
}

function showDetail(id){
	$.ajax({
		url:'plan/get',
		type:'get',
		dataType:'json',
		data:{"id":id},
		success:function(data){
			data.planTime = dateUtils.getFormatDateFromTimes(data.planTime);
			if(data.planTime!=""&&data.planTime!=null){
				$("#planTime").attr("disabled","true");
				document.getElementById("planTime").disabled=true;
			}else{
				document.getElementById("planTime").disabled=false;
			}
			data.finishTime = dateUtils.getFormatDateFromTimes(data.finishTime);
			$("#form1").json2form({'data':data});
			$("#content11").val(data.content);
			var status;
			if(data.status==1){
				status = "ontime,按期";
			}
			if(data.status==2){
				status = "overdue,超期";
			}
			if(data.status==3){
				status = "notdue,未到期";
			}
			if(data.status==4){
				status = "expire,到期";
			}
			if(data.status==5){
				status = "continued,持续";
			}
			if(data.status==6){
				status = "stop,终止";
			}
			if($("#status").val()!="ontime,按期"&&$("#status").val()!="overdue,超期"){
				$("#ftime").hide();
			}
			$("#status").change(function(){
				var num = $("#status").val();
				if(num!="ontime,按期"&&num!="overdue,超期"){
					$("#ftime").hide();
					$("#finishTime").val("");
				}else{
					$("#ftime").show();
				}
			});
			$("#status").val(status);
			$("#myModal").modal();
		},
		 error : function(data) {
			 layer.alert("获取数据失败",{icon:2});
	        }
	});
}

/** 刷新页面 */  
function refresh() {  
    $('#reportTable').bootstrapTable('refresh',{url:"plan/planlist"});  
} 
/** 刷新页面 */ 
function ref(){
	$('#reportTable').bootstrapTable('destroy');
	$.ajax(
	  		{
	  		type:"get",
	  		url:"plan/planlist",
	  		data:{"name":""},
	  		dataType:'json',
	  		success:function(data){
	  			list(data);
	  		}
	  		});
}
function loadData(){
	$.ajax(
	  		{
	  		type:"get",
	  		url:"plan/planlist",
	  		data:{"name":""},
	  		dataType:'json',
	  		success:function(data){
	  			list(data);
	  		}
	  		});
}
function edit(id){
	$(".dkDate").datetimepicker({format: 'yyyy-mm-dd',minView:2}); // 选择日期
	$.ajax({
		url:'plan/get',
		type:'get',
		dataType:'json',
		data:{"id":id},
		success:function(data){
			data.planTime = dateUtils.getFormatDateFromTimes(data.planTime);
			data.finishTime = dateUtils.getFormatDateFromTimes(data.finishTime);
//			if($("#status").val()!=1&&$("#status").val()!=2){
//				$("#ftime").hide();
//			}
//			$("#status").change(function(){
//				var num = $("#status").val();
//				if(num!=1&&num!="2"){
//					$("#ftime").hide();
//					$("#finishTime").val("");
//				}else{
//					$("#ftime").show();
//				}
//			});
			$("#form1").json2form({'data':data});
			$("#status").val(data.status);
			$("#myModal").modal();
		},
		 error : function(data) {
			 layer.alert("获取数据失败",{icon:2});
	        }
	});
}
function save(){
	var obj = $("#form1").form2json();
	obj.feedbackPeople=encodeURI(obj.feedbackPeople);
	obj.remark=encodeURI(obj.remark);
	obj.status=encodeURI(obj.status);
	obj.planTime=$("#planTime").val();
	var jsonstr = JSON.stringify(obj);
	if(obj.feedbackPeople.length==0){
			 layer.alert("请输入填报人",{icon:2});
		return;
	}
	$.ajax({
		url:"plan/save",
		type:"get",
		data:{"plan":jsonstr},
		success:function(data){
			if(data==1)layer.alert("保存成功",{icon:1});
			loadData();
//			record(obj.id);
			$("#myModal").modal('hide');
		},
		error:function(data){
			alert(data);
		}
		
	});
}
function query(){
	var title = $("#listname").val();
	var status = $("#status1").val();
	$.ajax({
	  		data:{"title":encodeURI(title),"status":encodeURI(status),"mtype":mtype},
	  		type:"get",
	  		url:"plan/planlist",
	  		contentType:'application/json;charset=UTF-8',
	  		dataType:'json',
	  		success:function(data){
	  			list4(data);
	  		},
	  		error:function(data){
	  			 layer.alert("查询错误",{icon:2});
	  		}
	  		});
}

Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};