var ztree;
var ztree1;
var grid;
var tree2;
var rootid;
$(function(){
	loadDepartmentList(null,null);
	setValidateRule();
});
function addLX(){
	clearForm();
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
function loadDepartmentList(deptid,name){
	if(name==null){
		name="";
	}
	if(deptid==null){
		deptid="";
	}
	$.ajax(
	  		{
	  		data:{},
	  		type:"get",
	  		url:"/plan/lxList",
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
	pageList: [5, 10, 15, 20, 25, 30],
	idField: "id",  //标识哪个字段为id主键
	showToggle: false,   //名片格式
	cardView: false,//设置为True时显示名片（card）布局
	showColumns: false, //显示隐藏列  
	showRefresh: false,  //显示刷新按钮
	singleSelect: true,//复选框只能选择一条记录
	search: false,//是否显示右上角的搜索框
	clickToSelect: true,//点击行即可选中单选/复选框
	sidePagination: "client",//表格分页的位置
//	queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", //设置工具栏的Id或者class
	columns: [[ {
        "title": "<b style='font-size:20px;'>任务类型信息</b>",
        "halign":"center",
        "align":"center",
        "colspan": data1.length+1
    }
	           ],[
{title: '序号',width:'3%',formatter:function(value,row,index){
	  return index+1+"";
}}, 
              {field: 'lx_name',title: '类型',width:'10%'},
              {field: 'remark',title: '描述',width:'20%',formatter:function(value,row,index){
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
              {title: '操作',field: '',align: 'center',width:'15%',formatter:function(value,row,index){ 
            	  var a = '<a  onclick="addLX()">添加</a> ';  
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
		url : 'plan/getLXById',
		type : 'get',
		dataType : 'json',
		data : {
			"id" : id
		},
		success : function(data) {
			$("#form1").json2form({
				'data' : data
			});
			$("#myModal").modal();
		},
		error : function(data) {
			layer.alert("获取数据失败", {
				icon : 2
			});
		}
	});
}

function del(id) {  
	layer.confirm('确定要删除所选数据？', {icon: 3, title:'提示'}, function(){  
        $.ajax({  
            url:'plan/deleteLX', 
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

function submitForm(){
	var valid=$("#form1").valid();
	if(valid){
		var obj = $("#form1").form2json();
			var jsonstr = JSON.stringify(obj);
			$.ajax({
				url:'/plan/saveLX',
				type:'post',
				data:{"itemStr":jsonstr},
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
	}else{
		layer.alert("请填写必填项!",{icon:2});
	}
}
function clearForm(){
	$("#id").val(null);
	$("#lxName").val(null);
	$("#remark").val(null);
}
function setValidateRule(){
	$("#form1").validate({
		rules: { //email:true, url:true,  creditcard :true
	 			
	 		id: {  /*id*/
	 			//required: false,	 			
//	 			maxlength: 32,
	 			
	 		},
	 		lxName: {  /*姓名*/
	 			required: true,
//	 			maxlength: 100,
	 			
	 		},
	 			
	 			
	 		remark: {  /*描述*/
	 			//required: false,	 			
//	 			maxlength: 4000,
	 			
	 		},
	 			
		},
		messages: {
		}
	});
}