var userInfo;
var deptInfo;
var myChart;
$(function() {
	$.ajax({  
		type:'get',
        url:'departmentController/allUser', 
        async:false,
        success:function(data){  
            if(data.hasError){ 
            	alert(data.hasError);
            }else{ 
            	userInfo=data;
            }  
        }
	}); 
	$("#year").datetimepicker({format: 'yyyy',startView: 4,minView: 4}).on('changeDate',function(ev){
		var item1=document.getElementsByTagName("input");
		for(var i=0;i<item1.length;i++){
			if(item1[i].id.indexOf("meetingContent_of_replace_id")!=-1){
				item1[i].remove();
			}
		}
		$("#meetingContent_of_replace_id1").remove();
		$("#meetingContent_of_replace_id1_ztree_cont_wh").remove();
		$("#meetingContent").attr("class","form-control");
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
	$(".dkDate").datetimepicker({format: 'yyyy-mm-dd',minView:2}); // 选择日期
	list();
});
function query(){
	list();
}
function getDeptById(deptid){
	return deptInfo["dept"+deptid];
}
function getUserByCount(account){
	return userInfo["account"+account];
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
function list(){
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
	url: 'plan/taskStatistics?mtype='+mtype,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
	showExport:false,    // 显示导出
	exportTypes: ['excel'],
    showFooter:true,
	pageSize: 10,	// 每页显示条数
	pageNumber: 1,  // 当前页码
	pageList: [10, 20, 50, 100, 200, 500], // 每页显示条数
	idField: "id",  // 标识哪个字段为id主键
	cardView: false,// 设置为True时显示名片（card）布局
	showColumns: false, // 显示隐藏列
	search: false,// 是否显示右上角的搜索框
	clickToSelect: true,// 点击行即可选中单选/复选框
	sidePagination: "client",// 表格分页的位置
	queryParams:queryParams,
	queryParamsType: "limit", // 参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", // 设置工具栏的Id或者class
	columns: [[
              {
                  "title":"<b style='font-size:20px;'>"+title+"任务统计</b>",
                  "halign":"center",
                  "align":"center",
                  "colspan": 9
              }
         ],
         [
	          {field: 'dept_name',title: '部室',width:'15%',footerFormatter:function(value,row,index){
	        	  return "合计";
	          }}, 
	          {field: 'sendCount',title: '已分发',width:'10%',formatter:function(value,row,index){
	        	  var idstr = "'"+row.dept_name+"'";
	          	  var name = "'" + 'totle' + "'";
	        	  var e = '<a href="javascript:detail('+ idstr +','+name+')">'+value+'</a> ';  
	        	  return value+"";
	          },footerFormatter:function(value){
	        	  var totle=0;
	        	 if(value!=null&&value.length>0){
	        		 for(var i=0;i<value.length;i++){
	        			 totle+=value[i].sendCount;
	        		 }
	        	 }
	        	 var idstr = "''";
	          	 var name = "'" + 'totle' + "'";
	        	 var e = '<div style="width:99%;height:80%;" onclick="detail('+ idstr +','+name+')"><p>'+totle+'</p></div> ';  
	        	 return e;
	          }},
	          {field: 'ontime',title: '按期(完成)',width:'10%',formatter:function(value,row,index){
	        	  var idstr = "'"+row.dept_name+"'";
	          	  var name = "'" + 'ontime' + "'";
	        	  var e = '<a href="javascript:detail('+ idstr +','+name+')">'+value+'</a> ';  
	        	  return value+"";
	          },footerFormatter:function(value){
	        	  var totle=0;
	        	 if(value!=null&&value.length>0){
	        		 for(var i=0;i<value.length;i++){
	        			 totle+=value[i].ontime;
	        		 }
	        	 }
	        	 var idstr = "''";
	          	 var name = "'" + 'ontime' + "'";
	          	 var e = '<div style="width:99%;height:80%;" onclick="detail('+ idstr +','+name+')"><p>'+totle+'</p></div> ';  
	        	 return e;
	          }},
	          {field: 'overdue',title: '超期(完成)',width:'10%',formatter:function(value,row,index){
	        	  var idstr = "'"+row.dept_name+"'";
	          	  var name = "'" + 'overdue' + "'";
	        	  var e = '<a href="javascript:detail('+ idstr +','+name+')">'+value+'</a> ';  
	        	  return value+"";
	          },footerFormatter:function(value,row,index){
	        	  var totle=0;
		        	 if(value!=null&&value.length>0){
		        		 for(var i=0;i<value.length;i++){
		        			 totle+=value[i].overdue;
		        		 }
		        	 }
		        	 var idstr = "''";
		          	 var name = "'" + 'overdue' + "'";
		          	 var e = '<div style="width:99%;height:80%;" onclick="detail('+ idstr +','+name+')"><p>'+totle+'</p></div> ';  
		        	 return e;
	          }},
	          {field: 'notdue',title: '未到期(未完成)',width:'10%',formatter:function(value,row,index){
	        	  var idstr = "'"+row.dept_name+"'";
	          	  var name = "'" + 'notdue' + "'";
	        	  var e = '<a href="javascript:detail('+ idstr +','+name+')">'+value+'</a> ';  
	        	  return value+"";
	          },footerFormatter:function(value,row,index){
	        	  var totle=0;
		        	 if(value!=null&&value.length>0){
		        		 for(var i=0;i<value.length;i++){
		        			 totle+=value[i].notdue;
		        		 }
		        	 }
		        	 var idstr = "''";
		          	 var name = "'" + 'notdue' + "'";
		          	 var e = '<div style="width:99%;height:80%;" onclick="detail('+ idstr +','+name+')"><p>'+totle+'</p></div> ';  
		        	 return e;
	          }},
	          {field: 'expire',title: '到期(未完成)',width:'10%',formatter:function(value,row,index){
	        	  var idstr = "'"+row.dept_name+"'";
	          	  var name = "'" + 'expire' + "'";
	        	  var e = '<a href="javascript:detail('+ idstr +','+name+')">'+value+'</a> ';  
	        	  return value+"";
	          },footerFormatter:function(value,row,index){
	        	  var totle=0;
		        	 if(value!=null&&value.length>0){
		        		 for(var i=0;i<value.length;i++){
		        			 totle+=value[i].expire;
		        		 }
		        	 }
		        	 var idstr = "''";
		          	 var name = "'" + 'expire' + "'";
		          	 var e = '<div style="width:99%;height:80%;" onclick="detail('+ idstr +','+name+')"><p>'+totle+'</p></div> ';  
		        	 return e;
	          }},
	          {field: 'continued',title: '持续',width:'10%',formatter:function(value,row,index){
	        	  var idstr = "'"+row.dept_name+"'";
	          	  var name = "'" + 'continued' + "'";
	        	  var e = '<a href="javascript:detail('+ idstr +','+name+')">'+value+'</a> ';  
	        	  return value+"";
	          },footerFormatter:function(value,row,index){
	        	  var totle=0;
		        	 if(value!=null&&value.length>0){
		        		 for(var i=0;i<value.length;i++){
		        			 totle+=value[i].continued;
		        		 }
		        	 }
		        	 var idstr = "''";
		          	 var name = "'" + 'continued' + "'";
		          	 var e = '<div style="width:99%;height:80%;" onclick="detail('+ idstr +','+name+')"><p>'+totle+'</p></div> ';  
		        	 return e;
	          }},
	          {field: 'stop',title: '终止',width:'10%',formatter:function(value,row,index){
	        	  var idstr = "'"+row.dept_name+"'";
	          	  var name = "'" + 'stop' + "'";
	        	  var e = '<a href="javascript:detail('+ idstr +','+name+')">'+value+'</a> ';  
	        	  return value+"";
	          },footerFormatter:function(value,row,index){
	        	  var totle=0;
		        	 if(value!=null&&value.length>0){
		        		 for(var i=0;i<value.length;i++){
		        			 totle+=value[i].stop;
		        		 }
		        	 }
		        	 var idstr = "''";
		          	 var name = "'" + 'stop' + "'";
		          	 var e = '<div style="width:99%;height:80%;" onclick="detail('+ idstr +','+name+')"><p>'+totle+'</p></div> ';  
		        	 return e;
	          }}
	          ]], // 列
	silent: true,  // 刷新事件必须设置
	onClickCell: function (field, value, row, $element) {
		if("sendCount"==field){
			detail(row.dept_name,"totle");
		}else{
			detail(row.dept_name,field);
		}
		return false;
		},
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
	}
});
}
var depts;
var states;
function detail(dept,status){
	depts=dept;
	states=status;
	$("#content").val(null);
	var start = $("#listname1").val();
	var end = $("#listname2").val();
	var meeting_content = "";
//	var dept = encodeURI($("#dept").val()),
	dept = encodeURI(dept);
	$.ajax({
		url:"plan/detail",
		data:{"start":start,"end":end,"meeting_content":meeting_content,"dept":dept,"status":status},
		type:"post",
		success:function(data){
			 list1(data);
			 $("#newModal").modal();
		},
	    error:function(){
	    	 layer.alert("查询错误",{icon:2});
	    }
	});
}
function queryByContent(){
	$.ajax({
		url:"plan/detail",
		data:{"start":"","end":"","meeting_content":$("#content").val(),"dept":encodeURI(depts),"status":states},
		type:"post",
		success:function(data){
			 list1(data);
			 $("#newModal").modal();
		},
	    error:function(){
	    	 layer.alert("查询错误",{icon:2});
	    }
	});
}

function queryParams(params) {  //配置参数
	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		pageSize: params.limit,   //页面大小
		pageNumber: params.pageNumber,  //页码
		start:$("#year").val(),
		end: $("#listname2").val(),
		meeting_content:encodeURI($("#meetingContent").val()),
		dept:encodeURI($("#dept").val()),
//		Cut: Cut,
//		Color: Color,
//		Clarity: Clarity,
		sort: params.sort,  //排序列名
		sortOrder: params.order//排位命令（desc，asc）
	};
	return temp;
}

function list1(data){
    $('#reportTable1').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
//    url: 'plan/detail',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
	showExport:false,    //显示导出
//  exportDataType: $(this).val(),//导出类型    // basic, all, selected 
// 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf' //pdf png需要另外引js
	exportTypes: ['excel'],
	pageSize: 10,	// 每页显示条数
	pageNumber: 1,  // 当前页码
	pageList: [10, 20, 50, 100, 200, 500], //每页显示条数
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
	columns: [
	          {field: 'content',title: '任务内容',formatter:function(value,row,index){
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
	          {field: 'dept_name',title: '主办部室'},
	          {field: 'work_person',title: '负责领导'},
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
	          {field: 'jointly',title: '协办领导'},
//	          {field: 'create_name',title: '创建人'},
	          {field: 'remark',title: '办理情况',formatter:function(v){
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
	          {field: 'status',title: '状态',formatter:function(value){
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
//	          {field: 'ontime',title: '按期',formatter:function(value){
//	        	 return fo(value);
//	          }},
//	          {field: 'overdue',title: '超期',formatter:function(value){
//	        	 return fo(value);
//	          }},
//	          {field: 'notdue',title: '未到期',formatter:function(value){
//	        	 return fo(value);
//	          }},
//	          {field: 'expire',title: '到期',formatter:function(value){
//	        	 return fo(value);
//	          }},
//	          {field: 'continued',title: '持续',formatter:function(value){
//	        	 return fo(value);
//	          }},
//	          {field: 'stop',title: '终止',formatter:function(value){
//	        	 return fo(value);
//	          }},
	          {field: 'meeting_content',title: '会议期数'},
	          {field: 'handle',title: '备注'},
//	          {
//		           title:'操作','field':'id',align:'center',formatter:function(value,row,index){
//		        	   return '<a href="javascript:showDetail(\''+ row.id + '\')">查看</a>';
//		           } 
//	                  }
	          ], // 列
	silent: true,  // 刷新事件必须设置
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
	}
});
}
function fo(value){
	if(value!=null&&value!=""){
		  return "√";
	  }else{
		  return "";
	  }
}