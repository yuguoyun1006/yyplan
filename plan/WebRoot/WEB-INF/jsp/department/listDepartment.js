var ztree;
var ztree1;
var grid;
var tree2;
var rootid;
$(function(){
	tree("depTree");
	loadDepartmentList(null,null);
	setValidateRule();
	tree2=$("#pid").dkSelectTree({
		url:"/departmentController/dtree",
		Async:true,
		idField:"id",
		pidField:"pid",
		nameField:"name",
		listType:"tree",
		multiSelect:false,
		chkboxType:{ "Y": "", "N": "" },
		width : 200
	});
//	list(null);
});
function addDep(){
	clearForm();
	$("#ppid").show();
	$("#myModal").modal();
}
function queryByName(){
	var name=$("#listname").val();
	var deptid=null;
	var node=ztree.getSelectedNodes();
	if(node.length>0&&node[0]!=null){
		deptid=node[0].id;
	}
	loadDepartmentList(deptid,name);
}
var setting = {
		view: {
			showLine: true,
			addDiyDom: addDiyDom
		},
		data: {
			simpleData: {
				enable: true,
				idKey:"id", 
	            pIdKey:"pid", 
			}
		},
		callback: {
			onClick: onClick,  
		}

	};
function addDiyDom(treeId, treeNode) {  
    var spaceWidth = 5;  
    var switchObj = $("#" + treeNode.tId + "_switch"),  
    icoObj = $("#" + treeNode.tId + "_ico");  
    switchObj.remove();  
    icoObj.before(switchObj);  

    if (treeNode.level > 1) {  
        var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";  
        switchObj.before(spaceStr);  
    }  
    var spantxt=$("#" + treeNode.tId + "_span").html();  
    if(spantxt.length>10){  
        spantxt=spantxt.substring(0,17)+"...";  
        $("#" + treeNode.tId + "_span").html(spantxt);  
    } 
}  
function onClick(event, treeId, treeNode, clickFlag) {  
var deptid=treeNode.id;  
//$("#pid").val(deptid);
$("#listname").val(null);
loadDepartmentList(deptid,null);
}   

//var setting11 = {
//		view: {
//			showLine: true
//		},
//		data: {
//			simpleData: {
//				enable: true,
//				idKey:"id", 
//	            pIdKey:"pid", 
//			}
//		},
//		callback: {
////			onClick: onClick11,  
//		}
//
//	};
//function saveUpdate() { 
//	var treeNode=ztree1.getSelectedNodes();
//var deptid=treeNode[0].id; 
//layer.confirm('确定要调整吗？', {icon: 3, title:'提示'}, function(){  
//    $.ajax({  
//        url:'departmentController/trim', 
//        data:{"id":$("#trimId").val(),"pid":deptid},
//        success:function(data){  
//            if(data.hasError){ 
//            	layer.alert(data.errorMessage,{icon:2});
//            }else{ 
//            	tree("depTree");
//            	loadDepartmentList(null,null);
//            	$("#newModal").modal('hide');
//            	layer.alert("调整成功",{icon:1}); 
//            }  
//        }
//       
//    })  
//  }); 
//}   

//function tree11(id){
//	$.ajax({
//		url:'/departmentController/dtree',
//		type:'get',
//		dataType:'json',
//		success:function(data){
//			ztree1=$.fn.zTree.init($("#"+id), setting11, data);
//			var nodes=ztree1.getNodes();
//			ztree1.expandNode(nodes[0]);
//		},
//		 error : function(data) {
//			 layer.alert("加载菜单出错",{icon:2});
//	        }
//	});
//	}

function tree(id){
$.ajax({
	url:'/departmentController/dtree',
	type:'get',
	dataType:'json',
	success:function(data){
		ztree=$.fn.zTree.init($("#"+id), setting, data);
		var nodes=ztree.getNodes();
		ztree.selectNode(nodes[0]);
		ztree.expandNode(nodes[0]);
		rootid=nodes[0].id;
		$("#pid").val(nodes[0].id);
	},
	 error : function(data) {
		 layer.alert("加载菜单出错",{icon:2});
        }
});
}

function loadDepartmentList(deptid,name){
	if(name==null){
		name="";
	}
	if(deptid==null){
		deptid="";
	}
	$.ajax(
	  		{
	  		data:{"deptid":deptid,"name":encodeURI(name)},
	  		type:"get",
	  		url:"/departmentController/getJsonListDepartmentBySql",
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
function list(data1){
	$('#reportTable').bootstrapTable('destroy');
grid=$('#reportTable').bootstrapTable({
//	url:"/departmentController/getJsonListDepartmentBySql",
//	method: 'get',
	data:data1,
	striped: true,	 //使表格带有条纹
	pagination: true,	//在表格底部显示分页工具栏
//	showExport:true,
    exportDataType: "all",//导出类型    
	pageSize:10,
	pageNumber: 1,
	pageList: [ 10, 15, 20, 25, 30],
	idField: "id",  //标识哪个字段为id主键
	showToggle: false,   //名片格式
	cardView: false,//设置为True时显示名片（card）布局
	showColumns: false, //显示隐藏列  
	showRefresh: false,  //显示刷新按钮
	singleSelect: true,//复选框只能选择一条记录
	search: false,//是否显示右上角的搜索框
	clickToSelect: true,//点击行即可选中单选/复选框
	sidePagination: "client",//表格分页的位置
    queryParams: {"deptid":"","name":""}, //参数
//	queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", //设置工具栏的Id或者class
	columns: [[
	           {
	                  "title": "组织单位表",
	                  "halign":"center",
	                  "align":"center",
	                  "colspan": 7
	              }
	          ],[
              {field: 'Dept_id',title: '部门编码'},
              {field: 'name',title: '部门名称',formatter:function(value,row,index){
            	  if(value.length>10){
            		  return value.substr(0 , 10)+"...";
            	  }else{
            		  return value;
            	  }
              }},
              {field: 'address',title: '机构类型'},
              {field: 'leader',title: '负责人',formatter:function(value,row,index){
            	  if(value!=null&&value.length>10){
            		  return value.substr(0 , 10)+"...";
            	  }else{
            		  return value;
            	  }
              }},
              {field: 'tel',title: '联系电话'},
              {field: 'remark',title: '描述',formatter:function(value,row,index){
            	  if(value==null){
            		  return " ";
            	  }else{
            		  if(value.length>15){
                		  return value.substr(0 , 15)+"...";
                	  }else{
                		  return value;
                	  }
            	  }
              }},
              {title: '操作',field: '',align: 'center',formatter:function(value,row,index){ 
            	  var a = '<a  onclick="addDep()">添加</a> ';  
                   var e = '<a  onclick="edit(\''+ row.id + '\')">编辑</a> ';  
                   var d = '<a  onclick="del(\''+ row.id +'\')">删除</a> ';  
                        return e+d+a;  
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
//function editDept(id){
//	$("#trimId").val(id);
//	$("#newModal").modal();
//	tree11("depTree1");
//}
function edit(id){
	$.ajax({
		url:'/departmentController/getDeptById',
		type:'get',
		dataType:'json',
		 data:{"id":id},
		success:function(data){
			$("#form1").json2form({'data':data});
			$("#address").val(data.address);
			if(rootid==data.id){
				$("#ppid").hide();
				$("#pid").val(data.pid);
			}else{
				$("#ppid").show();
				tree2.setValue($("#pid").val());
			}
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
            url:'departmentController/deleteDept', 
            data:{"id":id},
            success:function(data){  
                if(data.hasError){ 
                	layer.alert(data.errorMessage,{icon:2});
                }else{ 
                	if(data){
                		layer.alert("删除成功",{icon:1}); 
                    	tree("depTree");
                    	loadDepartmentList(null,null);
                	}else{
                		layer.alert("删除失败",{icon:2});
                	}
                }  
            }
           
        })  
      });  
}  
function queryParams(params) {  //配置参数
		var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.limit,   //页面大小
			pageNumber: params.pageNumber,  //页码
			minSize: $("#leftLabel").val(),
			maxSize: $("#rightLabel").val(),
			minPrice: $("#priceleftLabel").val(),
			maxPrice: $("#pricerightLabel").val(),
			Cut: Cut,
			Color: Color,
			Clarity: Clarity,
			sort: params.sort,  //排序列名
			sortOrder: params.order//排位命令（desc，asc）
		};
		return temp;
	}
function submitForm(){
	var valid=$("#form1").valid();
	if(valid){
		var obj = $("#form1").form2json();
		if(isNaN(obj.deptId)){
			 layer.alert("部门编码只能为数字！",{icon:2});
			 return ;
		}else if(isNaN(obj.tel)){
			layer.alert("电话号码只能为数字！",{icon:2});
			return ;
		}else{
			var jsonstr = JSON.stringify(obj);
			$.ajax({
				url:'/departmentController/saveDepartment',
				type:'post',
				data:{"itemStr":jsonstr},
				dataType:'json',
				success:function(data){
					if(data.status==10){
						 layer.alert("部门编码不能重复！",{icon:2});
					}else if(data.status==11){
						layer.alert("同一组织下的组织名称不能重复！",{icon:2});
					}else{
						layer.alert("保存成功",{icon:1});
						tree("depTree");
						loadDepartmentList(null,null);
						$("#myModal").modal('hide');
						clearForm();
					}
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
	$("#pid").val(null);
	tree2.setValue($("#pid").val());
	$("#deptId").val(null);
	$("#name").val(null);
	$("#address").val(null);
	$("#leader").val(null);
	$("#tel").val(null);
	$("#remark").val(null);
}
function setValidateRule(){
	$("#form1").validate({
		rules: { //email:true, url:true,  creditcard :true
	 			
	 		id: {  /*id*/
	 			//required: false,	 			
//	 			maxlength: 32,
	 			
	 		},
	 		deptId: {  /*部门*/
	 			required: true,
//	 			number:true,
//	 			maxlength: 16,
	 			
	 		},
	 		pid: {  /*部门*/
	 			required: true,
	 		},
	 		name: {  /*姓名*/
	 			required: true,
//	 			maxlength: 100,
	 			
	 		},
	 			
	 		address: {  /*类型*/
	 			required: true,	 			
//	 			maxlength: 10,
	 			
	 		},
	 			
	 		leader: {  /*负责人*/
	 			//required: false,	 			
//	 			maxlength: 100,
	 			
	 		},
	 			
	 		tel: {  /*电话*/
	 			//required: false,
//	 			number:true,
//	 			maxlength: 30,
	 			
	 		},
	 			
	 		remark: {  /*描述*/
	 			//required: false,	 			
//	 			maxlength: 4000,
	 			
	 		},
	 			
		},
		messages: {
			id: {  /*id*/
	 		},
	 		deptId: {  /*部门*/
	 			
	 		},
	 		pid: {  /*部门*/
	 		},
	 		name: {  /*姓名*/
	 			
	 		},
	 			
	 		address: {  /*类型*/
	 			
	 		},
	 			
	 		leader: {  /*负责人*/
	 			
	 		},
	 			
	 		tel: {  /*电话*/
	 			
	 		},
	 			
	 		remark: {  /*描述*/
	 			
	 		},
		}
	});
}