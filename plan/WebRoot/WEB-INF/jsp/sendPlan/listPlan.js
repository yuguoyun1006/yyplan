var grid;
var deptTree;
var deptTree1;
var deptTree2;
var deptTree3;
var personTree;
var lxTree;
var userInfo;
var deptInfo;
$(function(){
	if(type=="3"){
		$("#meetingContent").attr("disabled",true);
	}else{
		$("#meetingContent").attr("disabled",false);
	}
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
	loadDepartmentList(null);
	$(".dkDate").datetimepicker({format: 'yyyy-mm-dd',minView:2}); // 选择日期
	//$("#plplanTime").datetimepicker({format: 'yyyy-mm-dd',minView:2}); // 选择日期
//	deptTree1=$("#workPerson").dkSelectTree({ 
//		url:"departmentController/userTree?deptId="+$("#workUnit").val(),
//		Async:false,
//		idField:"account",
////		pidField:"pid",
//		nameField:"username",
//		listType:"tree",
//		multiSelect:false,
//		chkboxType:{ "Y": "", "N": "" },
//		width : 180,
//		height:100
//	});
//	deptTree3=$("#jointly").dkSelectTree({
//		url:"departmentController/userTree?deptId="+$("#coOrganizer").val(),
//		Async:false,
//		idField:"account",
////		pidField:"pid",
//		nameField:"username",
//		listType:"tree",
//		multiSelect:true,
//		chkboxType:{ "Y": "", "N": "" },
//		width : 180,
//		height:100
//	});
	lxTree=$("#title").dkSelectTree({
		url:'plan/lxList',
		Async:false,
		idField:"lx_name",
//		pidField:"pid",
		nameField:"lx_name",
		listType:"tree",
		multiSelect:false,
		chkboxType:{ "Y": "", "N": "" },
		width : 200
	});
	$("#queryName").dkSelectTree({
		url:'plan/lxList',
		Async:false,
		idField:"lx_name",
//		pidField:"pid",
		nameField:"lx_name",
		listType:"tree",
		multiSelect:false,
		chkboxType:{ "Y": "", "N": "" },
		width : 200
	});
	deptTree=$("#workUnit").dkSelectTree({
		url:"departmentController/dtree",
		Async:false,
		idField:"id",
		pidField:"pid",
		nameField:"name",
		listType:"tree",
		multiSelect:true,
		chkboxType:{ "Y": "", "N": "" },
		width : 200,
//		onSelect:function(){
//				var item=document.getElementsByTagName("input");
//				for(var i=0;i<item.length;i++){
//					if(item[i].id.indexOf("workPerson_of_replace_id")!=-1){
//						item[i].remove();
//					}
//				}
//				$("#workPerson_of_replace_id1").remove();
//				$("#workPerson_of_replace_id1_ztree_cont_wh").remove();
//				$("#workPerson").show();
//				$("#workPerson").attr("class","form-control");
//				deptTree1=$("#workPerson").dkSelectTree({
//					url:"departmentController/userTree?deptId="+$("#workUnit").val(),
//					Async:false,
//					idField:"account",
////					pidField:"pid",
//					nameField:"username",
//					listType:"tree",
//					multiSelect:false,
//					chkboxType:{ "Y": "", "N": "" },
//					width : 180,
//					height:100
//				});
//		}
	});
	deptTree2=$("#coOrganizer").dkSelectTree({
		url:"departmentController/dtree",
		Async:false,
		idField:"id",
		pidField:"pid",
		nameField:"name",
		listType:"tree",
		multiSelect:true,
		chkboxType:{ "Y": "", "N": "" },
		width : 200,
//		onSelect:function(){
//			var item=document.getElementsByTagName("input");
//			for(var i=0;i<item.length;i++){
//				if(item[i].id.indexOf("jointly_of_replace_id")!=-1){
//					item[i].remove();
//				}
//			}
//			$("#jointly_of_replace_id1").remove();
//			$("#jointly_of_replace_id1_ztree_cont_wh").remove();
//			$("#jointly").show();
//			$("#jointly").attr("class","form-control");
//			deptTree3=$("#jointly").dkSelectTree({
//				url:"departmentController/userTree?deptId="+$("#coOrganizer").val(),
//				Async:false,
//				idField:"account",
////				pidField:"pid",
//				nameField:"username",
//				listType:"tree",
//				multiSelect:true,
//				chkboxType:{ "Y": "", "N": "" },
//				width : 180,
//				height:100
//			});
//		}
	});
	setValidateRule();
});
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
function getUserByCount(account){
	return userInfo["account"+account];
}
function getDeptById(deptid){
	return deptInfo["dept"+deptid];
}
//function isSendQX(){
//	var list=auth.split("|");
//	for(var i=0;i<list.length;i++){
//		if(list[i].toString()=="3")
//			return true;
//	}
//	return false;
//}
function queryByTitle(){
	var title=$("#queryName").val();
	loadDepartmentList(title);
}
function loadDepartmentList(title){
	if(title==null){
		title="";
	}
	$.ajax(
	  		{
	  		data:{"title":encodeURI(title)},
	  		type:"get",
	  		url:"/sendPlanController/getPlan",
	  		contentType:'application/json;charset=UTF-8',
	  		dataType:'json',
	  		success:function(data){
	  			list(data);
	  		},
	  		error:function(data){
	  			 layer.alert("请求失败！",{icon:2});
	  		}
	  		});
}

function plsend(){
	var item1=document.getElementsByTagName("input");
	for(var i=0;i<item1.length;i++){
		if(item1[i].id.indexOf("plworkUnit_of_replace_id")!=-1){
			item1[i].remove();
		}
	}
	$("#plworkUnit_of_replace_id1").remove();
	$("#plworkUnit_of_replace_id1_ztree_cont_wh").remove();
	$("#plworkUnit").show();
	$("#plworkUnit").attr("class","form-control");
	document.getElementById("plworkUnit").style.width="280px";
	deptTree=$("#plworkUnit").dkSelectTree({
		url:"departmentController/dtree",
		Async:false,
		idField:"id",
		pidField:"pid",
		nameField:"name",
		listType:"tree",
		multiSelect:true,
		chkboxType:{ "Y": "", "N": "" },
		width : 200,
	});
	var item2=document.getElementsByTagName("input");
	for(var i=0;i<item1.length;i++){
		if(item1[i].id.indexOf("plcoOrganizer_of_replace_id")!=-1){
			item1[i].remove();
		}
	}
	$("#plcoOrganizer_of_replace_id1").remove();
	$("#plcoOrganizer_of_replace_id1_ztree_cont_wh").remove();
	$("#plcoOrganizer").show();
	$("#plcoOrganizer").attr("class","form-control");
	document.getElementById("plcoOrganizer").style.width="280px";
//	$("#plcoOrganizer").attr("width","280px");
	deptTree=$("#plcoOrganizer").dkSelectTree({
		url:"departmentController/dtree",
		Async:false,
		idField:"id",
		pidField:"pid",
		nameField:"name",
		listType:"tree",
		multiSelect:true,
		chkboxType:{ "Y": "", "N": "" },
		width : 200,
	});
	var arr=$('#reportTable').bootstrapTable('getSelections');
	var ids="";
	for(var i=0;i<arr.length;i++){
		ids+=arr[i].id+",";
	}
	ids=ids.substring(0, ids.length-1);
	$("#plids").val(ids);
	$("#newModalpl").modal();
}
function clearplForm(){
	$("#plids").val(null);
	$("#plworkUnit").val(null);
	$("#plworkPerson").val(null);
	$("#plcoOrganizer").val(null);
	$("#pljointly").val(null);
}
function plsendClick(){
	if($("#plworkUnit").val()==""||$("#plworkPerson").val()==""){
		layer.alert("请添加主办单位和领导！",{icon:2});
	}else{
		var obj={};
		var plids=$("#plids").val();
		obj.plworkUnit=$("#plworkUnit").val();
		obj.plworkPerson=$("#plworkPerson").val();
		obj.plcoOrganizer=$("#plcoOrganizer").val();
		obj.plplanTime=$("#plplanTime").val();
		obj.pljointly=$("#pljointly").val();
		var jsonstr=JSON.stringify(obj);
		$.ajax({
			url:'/sendPlanController/plSendPlan',
			type:'post',
			data:{"plids":plids,"jsonStr":encodeURI(jsonstr),"send":"2","type":type},
			dataType:'json',
			success:function(data){
				if(data){
					layer.alert("分发完成",{icon:1});
					loadDepartmentList(null,null);
					$("#newModalpl").modal('hide');
					clearplForm();
				}else{
					 layer.alert("保存失败",{icon:2});
					 clearplForm();
				}
			},
			 error : function(data) {
				 layer.alert("保存失败",{icon:2});
				 clearplForm();
		        }
		});
		
		
	}
}
var table;
function list(data1){
	$('#reportTable').bootstrapTable('destroy');
table=$('#reportTable').bootstrapTable({
	data:data1,
	striped: true,	 //使表格带有条纹
	pagination: true,	//在表格底部显示分页工具栏
	showExport:false,
    exportDataType: "all",//导出类型    
    exportTypes: ['excel'],
	pageSize:10,
	pageNumber: 1,
	pageList: [5, 10, 15, 20, 25, 30],
	idField: "id",  //标识哪个字段为id主键
	showToggle: false,   //名片格式
	cardView: false,//设置为True时显示名片（card）布局
	showColumns: false, //显示隐藏列  
	showRefresh: false,  //显示刷新按钮
//	singleSelect: true,//复选框只能选择一条记录
	search: false,//是否显示右上角的搜索框
	clickToSelect: true,//点击行即可选中单选/复选框
	sidePagination: "client",//表格分页的位置
    queryParams: {"deptid":"","name":""}, //参数
   // checkboxHeader:true,
    maintainSelected:true,
//	queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", //设置工具栏的Id或者class
	columns: [[{
        "title": "<b style='font-size:20px;'>任务分发表</b>",
        "halign":"center",
        "align":"center",
        "colspan": 13
    }
	           ],[
//{title: '',checkbox: true}, 
	          {title: '序号',formatter:function(value,row,index){
	        	  return index+1+"";
	          }}, 
	          {field: 'content',title: '任务内容',width:'140',formatter:function(value,row,index){
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
              {field: 'meeting_content',title: '会议期数',formatter:function(value,row,index){
            	  return "第"+value+"期"+"\n"+row.create_time;
              }},
//              {field: 'create_time',title: '会议时间'},
//              {field: 'create_name',title: '创建人'},
              {field: 'dept_name',title: '主办部门'},
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
              {field: 'jointly',title: '协办领导'
//            	  ,formatter:function(value,row,index){
//            	  if(value==null||value.indexOf("|")==-1){
//            		  return row.jointname;
//            	  }else{
//            		  var text="";
//            		  var arr=value.split("|");
//            		  for(var i=0;i<arr.length;i++){
//            			  text+=getUserByCount(arr[i])+",";
//            		  }
//            		  if(text.trim().length>0){
//            			  return text.substring(0, text.length-1);
//            		  }else{
//            			  return text;
//            		  }
//            	  }
//              }
              },
              {field: 'feeback_status',title: '反馈状态',formatter:function(value,row,index){
	        	  if(value==""||value==null){
	        		  return "未反馈";
	        	  }else{
	        		  return value;
	        	  }
	          }},
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
//              {field: 'send_status',title: '分发状态',formatter:function(value,row,index){
//            	  switch(value){
//            	  case '1':return "未分发";break;
//            	  case '2':return "已分发";break;
//            	  default:return "未分发";break;
//            	  }
//              }},
              {field: 'plan_time',title: '计划完成时间',formatter:function(a,b,c){
//	        	  return new Date(a).format('yyyy-MM-dd');
            	  return a;
//            	  return dateUtils.getFormatDateFromTimes(a);
	          }},
              {title: '操作',field: '',align: 'center',formatter:function(value,row,index){
                   var e = '<a  onclick="edit(\''+ row.id + '\')">修改分发</a> ';  
//                   var a = '&nbsp;<a  onclick="sendPlan(\''+ row.id + '\')">分发</a> ';  
                   var d = '&nbsp;<a  onclick="del(\''+ row.id +'\')">删除</a> ';
                   var n='&nbsp;<a href="javascript:void(0)" style="color:#9FDF4B;disabled:disabled;">已分发</a> '; 
                   var x='&nbsp;<a  onclick="show(\''+ row.content +'\')">详情</a> ';
                   if(row.send_status=='1'){
                	   return e+d+x; 
                   }else if(row.send_status=='2'){
                	   return x;
                   }else{
                	   var m='<a href="javascript:void(0)" style="color:#9FDF4B;disabled:disabled;">无操作权限</a> ';
                	   return m+x;
                   }
                    } 
                  }]], //列
	silent: true,  //刷新事件必须设置
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  //没有匹配的结果
		return '无符合条件的记录';
	},
	/*onLoadError: function (data) {
		$('#reportTable').bootstrapTable('removeAll');
	},
	onClickRow: function (row) {
		window.location.href = "/qStock/qProInfo/" + row.ProductId;
	}*/
//	onLoadSuccess:function(data){
//		debugger;
//		alert(data);
//	}
});
}

function show(content){
	$("#contentMod").text(content);
	$("#contentModal").modal('show');
}

function sendPlan(id){
	$("#ids").val(id);
	$("#workUnit").val(null);
	$("#workPerson").val(null);
	deptTree.setValue(null);
//	if(personTree==null||typeof personTree=="undefined"){
//		
//	}else{
//		$("#workPerson_of_replace_id2").val(null);
//		$("#workPerson_of_replace_id3").val(null);
//		personTree.setValue(null);
//	}
	$("#newModal").modal();
}
function sendClick(){
	if($("#workUnit").val()==""||$("#workPerson").val()==""){
		layer.alert("请添加主办单位和领导！",{icon:2});
	}else{
		var valid=$("#form1").valid();
		if(valid){
			var obj = $("#form1").form2json();
			if(isNaN(obj.meetingContent)){
				 layer.alert("会议期数只能为数字！",{icon:2});
				 return ;
			}else{
				var jsonstr = JSON.stringify(obj);
				$.ajax({
					url:'/sendPlanController/saveSendPlan',
					type:'post',
					data:{"itemStr":jsonstr,"send":"2"},
					dataType:'json',
					success:function(data){
							layer.alert("分发完成",{icon:1});
							loadDepartmentList(null,null);
							$("#myModal").modal('hide');
							clearForm();
					},
					 error : function(data) {
						 layer.alert("保存失败",{icon:2});
						 clearForm();
				        }
				});
			}
		}else{
			layer.alert("请填写必填项!",{icon:2});
		}
	}
}
function edit(id){
	clearForm();
	$.ajax({
		url:'/sendPlanController/getPlanById',
		type:'get',
		dataType:'json',
		 data:{"id":id},
		success:function(data){
			data.planTime = dateUtils.getFormatDateFromTimes(data.planTime);
			data.createTime = dateUtils.getFormatDateFromTimes(data.createTime);
			var item1=document.getElementsByTagName("input");
			for(var i=0;i<item1.length;i++){
				if(item1[i].id.indexOf("workUnit_of_replace_id")!=-1){
					item1[i].remove();
				}
			}
			$("#workUnit_of_replace_id1").remove();
			$("#workUnit_of_replace_id1_ztree_cont_wh").remove();
			$("#workUnit").show();
			$("#workUnit").attr("class","form-control");
			deptTree=$("#workUnit").dkSelectTree({
				url:"departmentController/dtree",
				Async:false,
				idField:"id",
				pidField:"pid",
				nameField:"name",
				listType:"tree",
				multiSelect:true,
				chkboxType:{ "Y": "", "N": "" },
				width : 200,
			});
			var item2=document.getElementsByTagName("input");
			for(var i=0;i<item2.length;i++){
				if(item2[i].id.indexOf("coOrganizer_of_replace_id")!=-1){
					item2[i].remove();
				}
			}
			$("#coOrganizer_of_replace_id1").remove();
			$("#coOrganizer_of_replace_id1_ztree_cont_wh").remove();
			$("#coOrganizer").show();
			$("#coOrganizer").attr("class","form-control");
			deptTree2=$("#coOrganizer").dkSelectTree({
				url:"departmentController/dtree",
				Async:false,
				idField:"id",
				pidField:"pid",
				nameField:"name",
				listType:"tree",
				multiSelect:true,
				chkboxType:{ "Y": "", "N": "" },
				width : 200,
//				onSelect:function(){
//					var item=document.getElementsByTagName("input");
//					for(var i=0;i<item.length;i++){
//						if(item[i].id.indexOf("jointly_of_replace_id")!=-1){
//							item[i].remove();
//						}
//					}
//					$("#jointly_of_replace_id1").remove();
//					$("#jointly_of_replace_id1_ztree_cont_wh").remove();
//					$("#jointly").show();
//					$("#jointly").attr("class","form-control");
//					deptTree3=$("#jointly").dkSelectTree({
//						url:"departmentController/userTree?deptId="+$("#coOrganizer").val(),
//						Async:false,
//						idField:"account",
////						pidField:"pid",
//						nameField:"username",
//						listType:"tree",
//						multiSelect:true,
//						chkboxType:{ "Y": "", "N": "" },
//						width : 180,
//						height:100
//					});
//				}
			});
			var item4=document.getElementsByTagName("input");
			for(var i=0;i<item4.length;i++){
				if(item4[i].id.indexOf("title_of_replace_id")!=-1){
					item4[i].remove();
				}
			}
			$("#title_of_replace_id1").remove();
			$("#title_of_replace_id1_ztree_cont_wh").remove();
			$("#title").show();
			$("#title").attr("class","form-control");
			lxTree=$("#title").dkSelectTree({
				url:"plan/lxList",
				Async:false,
				idField:"lx_name",
//				pidField:"pid",
				nameField:"lx_name",
				listType:"tree",
				multiSelect:false,
				chkboxType:{ "Y": "", "N": "" },
				width : 200,
		});
			$("#form1").json2form({'data':data});
			deptTree.setValue(data.workUnit);
			deptTree2.setValue(data.coOrganizer);
			lxTree.setValue(data.title);
//			var item=document.getElementsByTagName("input");
//			for(var i=0;i<item.length;i++){
//				if(item[i].id.indexOf("workPerson_of_replace_id")!=-1){
//					item[i].remove();
//				}
//			}
//			$("#workPerson_of_replace_id1").remove();
//			$("#workPerson_of_replace_id1_ztree_cont_wh").remove();
//			$("#workPerson").show();
//			$("#workPerson").attr("class","form-control");
//			deptTree1=$("#workPerson").dkSelectTree({
//				url:"departmentController/userTree?deptId="+data.workUnit,
//				Async:false,
//				idField:"account",
////				pidField:"pid",
//				nameField:"username",
//				listType:"tree",
//				multiSelect:false,
//				chkboxType:{ "Y": "", "N": "" },
//				width : 180,
//				height:100
//			});
//			deptTree1.setValue(data.workPerson);
			
//					var item3=document.getElementsByTagName("input");
//					for(var i=0;i<item3.length;i++){
//						if(item3[i].id.indexOf("jointly_of_replace_id")!=-1){
//							item3[i].remove();
//						}
//					}
//					$("#jointly_of_replace_id1").remove();
//					$("#jointly_of_replace_id1_ztree_cont_wh").remove();
//					$("#jointly").show();
//					$("#jointly").attr("class","form-control");
//					deptTree3=$("#jointly").dkSelectTree({
//						url:"departmentController/userTree?deptId="+data.coOrganizer,
//						Async:false,
//						idField:"account",
////						pidField:"pid",
//						nameField:"username",
//						listType:"tree",
//						multiSelect:true,
//						chkboxType:{ "Y": "", "N": "" },
//						width : 180,
//						height:100
//					});
//					deptTree3.setValue(data.jointly);
			$("#myModal").modal();
		},
		 error : function(data) {
			 layer.alert("获取数据失败",{icon:2});
	        }
	});
}
function del(id) {  
	layer.confirm('确定要删除所选数据？', {icon: 3, title:'提示'}, function(){  
        $.ajax({  
            url:'sendPlanController/deletePlan', 
            data:{"id":id},
            success:function(data){  
                if(data.hasError){ 
                	layer.alert(data.errorMessage,{icon:2});
                }else{ 
                	if(data){
                		layer.alert("删除成功",{icon:1}); 
                    	loadDepartmentList(null,null);
                	}else{
                		layer.alert("删除失败",{icon:2});
                	}
                }  
            }
           
        })  
      });  
}  
function addPlan(){
	clearForm();
	$('#myModal').modal();
}
function submitForm(){
	var valid=$("#form1").valid();
	if(valid){
		var obj = $("#form1").form2json();
		if(isNaN(obj.meetingContent)){
			 layer.alert("会议期数只能为数字！",{icon:2});
			 return ;
		}else{
			var jsonstr = JSON.stringify(obj);
			$.ajax({
				url:'/sendPlanController/saveSendPlan',
				type:'post',
				data:{"itemStr":jsonstr,"send":"1"},
				dataType:'json',
				success:function(data){
						layer.alert("保存成功",{icon:1});
						loadDepartmentList(null,null);
						$("#myModal").modal('hide');
						clearForm();
				},
				 error : function(data) {
					 layer.alert("保存失败",{icon:2});
					 clearForm();
			        }
			});
		}
	}else{
		layer.alert("请填写必填项!",{icon:2});
	}
}
function clearForm(){
	$("#id").val(null);
	$("#title").val(null);
	$("#planTime").val(null);
	$("#meetingContent").val(null);
	$("#content").val(null);
	$("#workUnit").val(null);
	$("#workPerson").val(null);
	$("#coOrganizer").val(null);
	$("#jointly").val(null);
	$("#createTime").val(null);
	var item1=document.getElementsByTagName("input");
	for(var i=0;i<item1.length;i++){
		if(item1[i].id.indexOf("workUnit_of_replace_id")!=-1){
			item1[i].remove();
		}
	}
	$("#workUnit_of_replace_id1").remove();
	$("#workUnit_of_replace_id1_ztree_cont_wh").remove();
	$("#workUnit").show();
	$("#workUnit").attr("class","form-control");
	deptTree=$("#workUnit").dkSelectTree({
		url:"departmentController/dtree",
		Async:false,
		idField:"id",
		pidField:"pid",
		nameField:"name",
		listType:"tree",
		multiSelect:true,
		chkboxType:{ "Y": "", "N": "" },
		width : 200,
//		onSelect:function(){
//				var item=document.getElementsByTagName("input");
//				for(var i=0;i<item.length;i++){
//					if(item[i].id.indexOf("workPerson_of_replace_id")!=-1){
//						item[i].remove();
//					}
//				}
//				$("#workPerson_of_replace_id1").remove();
//				$("#workPerson_of_replace_id1_ztree_cont_wh").remove();
//				$("#workPerson").show();
//				$("#workPerson").attr("class","form-control");
//				deptTree1=$("#workPerson").dkSelectTree({
//					url:"departmentController/userTree?deptId="+$("#workUnit").val(),
//					Async:false,
//					idField:"account",
////					pidField:"pid",
//					nameField:"username",
//					listType:"tree",
//					multiSelect:false,
//					chkboxType:{ "Y": "", "N": "" },
//					width : 180,
//					height:100
//				});
//		}
	});
	var item2=document.getElementsByTagName("input");
	for(var i=0;i<item2.length;i++){
		if(item2[i].id.indexOf("coOrganizer_of_replace_id")!=-1){
			item2[i].remove();
		}
	}
	$("#coOrganizer_of_replace_id1").remove();
	$("#coOrganizer_of_replace_id1_ztree_cont_wh").remove();
	$("#coOrganizer").show();
	$("#coOrganizer").attr("class","form-control");
	deptTree2=$("#coOrganizer").dkSelectTree({
		url:"departmentController/dtree",
		Async:false,
		idField:"id",
		pidField:"pid",
		nameField:"name",
		listType:"tree",
		multiSelect:true,
		chkboxType:{ "Y": "", "N": "" },
		width : 200,
//		onSelect:function(){
//			var item=document.getElementsByTagName("input");
//			for(var i=0;i<item.length;i++){
//				if(item[i].id.indexOf("jointly_of_replace_id")!=-1){
//					item[i].remove();
//				}
//			}
//			$("#jointly_of_replace_id1").remove();
//			$("#jointly_of_replace_id1_ztree_cont_wh").remove();
//			$("#jointly").show();
//			$("#jointly").attr("class","form-control");
//			deptTree3=$("#jointly").dkSelectTree({
//				url:"departmentController/userTree?deptId="+$("#coOrganizer").val(),
//				Async:false,
//				idField:"account",
////				pidField:"pid",
//				nameField:"username",
//				listType:"tree",
//				multiSelect:true,
//				chkboxType:{ "Y": "", "N": "" },
//				width : 180,
//				height:100
//			});
//		}
	});
	var item4=document.getElementsByTagName("input");
	for(var i=0;i<item4.length;i++){
		if(item4[i].id.indexOf("title_of_replace_id")!=-1){
			item4[i].remove();
		}
	}
	$("#title_of_replace_id1").remove();
	$("#title_of_replace_id1_ztree_cont_wh").remove();
	$("#title").show();
	$("#title").attr("class","form-control");
	lxTree=$("#title").dkSelectTree({
		url:"plan/lxList",
		Async:false,
		idField:"lx_name",
//		pidField:"pid",
		nameField:"lx_name",
		listType:"tree",
		multiSelect:false,
		chkboxType:{ "Y": "", "N": "" },
		width : 200,
});
	lxTree.setValue(null);
	deptTree.setValue(null);
	deptTree2.setValue(null);
//	var item=document.getElementsByTagName("input");
//	for(var i=0;i<item.length;i++){
//		if(item[i].id.indexOf("workPerson_of_replace_id")!=-1){
//			item[i].remove();
//		}
//	}
//	$("#workPerson_of_replace_id1").remove();
//	$("#workPerson_of_replace_id1_ztree_cont_wh").remove();
//	$("#workPerson").show();
//	$("#workPerson").attr("class","form-control");
//	deptTree1=$("#workPerson").dkSelectTree({
//		url:"departmentController/userTree?deptId="+$("#workUnit").val(),
//		Async:false,
//		idField:"account",
////		pidField:"pid",
//		nameField:"username",
//		listType:"tree",
//		multiSelect:false,
//		chkboxType:{ "Y": "", "N": "" },
//		width : 180,
//		height:100
//	});
//	deptTree1.setValue(null);
	
//			var item3=document.getElementsByTagName("input");
//			for(var i=0;i<item3.length;i++){
//				if(item3[i].id.indexOf("jointly_of_replace_id")!=-1){
//					item3[i].remove();
//				}
//			}
//			$("#jointly_of_replace_id1").remove();
//			$("#jointly_of_replace_id1_ztree_cont_wh").remove();
//			$("#jointly").show();
//			$("#jointly").attr("class","form-control");
//			deptTree3=$("#jointly").dkSelectTree({
//				url:"departmentController/userTree?deptId="+$("#coOrganizer").val(),
//				Async:false,
//				idField:"account",
////				pidField:"pid",
//				nameField:"username",
//				listType:"tree",
//				multiSelect:true,
//				chkboxType:{ "Y": "", "N": "" },
//				width : 180,
//				height:100
//			});
//			deptTree3.setValue(null);
}
function setValidateRule(){
	$("#form1").validate({
		rules: { //email:true, url:true,  creditcard :true
	 			
	 		id: {  /*id*/
	 			//required: false,	 			
//	 			maxlength: 32,
	 			
	 		},
	 		title: {  /*部门*/
	 			required: true,
//	 			number:true,
//	 			maxlength: 16,
	 			
	 		},
	 		planTime: {  /*部门*/
//	 			required: true,
	 		},
	 		workUnit:{
	 			required: true,
	 		},
	 		workPerson:{
	 			required: true,
	 		},
	 		meetingContent: {  /*姓名*/
//	 			required: true,
//	 			maxlength: 100,
	 			
	 		},
	 			
	 		content: {  /*类型*/
	 			required: true,	 			
//	 			maxlength: 10,
	 			
	 		},
	 			
	 			
		},
		messages: {
			id: {  /*id*/
	 		},
	 		title: {  /*部门*/
	 			
	 		},
	 		planTime: {  /*部门*/
	 		},
	 		meetingContent: {  /*姓名*/
	 			
	 		},
	 			
	 		content: {  /*类型*/
	 			
	 		},
	 		
		}
	});
}