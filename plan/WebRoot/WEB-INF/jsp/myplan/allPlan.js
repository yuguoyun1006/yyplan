var userInfo;
var deptInfo;
$(function(){
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
	$.ajax(
	  		{
	  		type:"get",
	  		url:"plan/allPlan",
	  		data:{"name":"","mtype":mtype,"meetingContent":""},
	  		dataType:'json',
	  		success:function(data){
	  			list(data);
	  		}
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
});
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
//    url: 'plan/planlist',
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
                  "title":"<b style='font-size:20px;'>"+title+"所有任务信息</b>",
                  "halign":"center",
                  "align":"center",
                  "colspan": 13
              }],[
	          {title: '序号',formatter:function(value,row,index){
	        	  return index+1+"";
	          }}, 
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
              },width:160},
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
	          },width:160},
	          {field: 'finish_time',title: '完成时间'},
	          {field: 'feeback_status',title: '反馈状态',formatter:function(value,row,index){
	        	  if(value==""||value==null){
	        		  return "未反馈";
	        	  }else{
	        		  return value;
	        	  }
	          }},
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
            	  return "第"+value+"期"+"\n"+row.create_time;
              }},
              {title: '操作',formatter:function(value,row,index){
	        	  return '<a  onclick="show(\''+ row.content +'\')">详情</a> ';;
	          }}
//	          {
//		           title:'操作','field':'id',align:'center',formatter:function(value,row,index){
//		        	   return '<a href="javascript:showDetail(\''+ row.id + '\')">查看</a>';
//		           } 
//	                  }
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
function fo(value){
	if(value!=null&&value!=""){
		  return "√";
	  }else{
		  return "";
	  }
}
function showDetail(id){
	$.post(
		"plan/get",
		{"id":id},
		function(data){
			if(data['title']==null){
				data['title']="";
			}
			if(data['remark']==null){
				data['remark']="";
			}
			layer.open({
				  type: 1 //Page层类型
				  ,area: ['700px', '400px']
				  ,title: '任务详情'
				  ,shade: 0.6 //遮罩透明度
				  ,maxmin: true //允许全屏最小化
				  ,anim: -1 //0-6的动画形式，-1不开启
				  ,content: "安排工作内容:"+'<div style="margin-left:20px">'+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+
				  data['title']+'</div>'+"办理情况:"+
				  '<div style="margin-left:20px;margin-top:5px;margin-right:20px">'+"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+
				  data['remark']+'</div>'
				});
		}
	);
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
function query(){
	var content = $("#content").val();
	var status = $("#status").val();
	var meetingContent=$("#meetingContent").val();
	$.ajax({
	  		data:{"meetingContent":meetingContent,"title":encodeURI(content),"status":status,"mtype":mtype},
	  		type:"get",
	  		url:"plan/allPlan",
	  		dataType:'json',
	  		success:function(data){
	  			list(data);
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