$(function(){
	tree("tree");
	//initAuthority();
/*	deteTree()*/
	$.ajax(
  		{
  		type:"get",
  		url:"authority/listAuthority",
  		data:{"authority":"","id":""},
  		dataType:'json',
  		success:function(data){
  			list(data);
  		}
  		});
});
function list(data){
$('#reportTable').bootstrapTable('destroy');
$('#reportTable').bootstrapTable({
	method: 'get',
//	url: 'user/list',
	data:data,
	dataType: "json",
	striped: true,	 //使表格带有条纹
	pagination: true,	//在表格底部显示分页工具栏
	showExport:true,    //显示导出
    exportDataType: "basic",//导出类型    // basic, all, selected 
	pageSize: 10,
	pageNumber: 1,
	pageList: [10, 20, 50, 100, 200, 500],
	idField: "id",  //标识哪个字段为id主键
//	showToggle: false,   //名片格式
	cardView: false,//设置为True时显示名片（card）布局
	showColumns: false, //显示隐藏列
//	showRefresh: false,  //显示刷新按钮
//	singleSelect: true,//复选框只能选择一条记录
	search: false,//是否显示右上角的搜索框
	clickToSelect: true,//点击行即可选中单选/复选框
	sidePagination: "client",//表格分页的位置
//	queryParams: queryParams, //参数
	queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
	toolbar: "#toolbar", //设置工具栏的Id或者class
	columns: [
	          {field: 'id',title: '角色等级'}, 
	          {field: 'authority',title: '角色名称'},
	          {title: '操作',field: 'id',align: 'center',formatter:function(value,row,index){  
                   var e = '<a href="javascript:edit(\''+ row.id + '\')">编辑</a> ';  
                  /* var d = '<a href="javascript:del(\''+ row.id +'\')">删除</a> ';  
                   var c = '<a href="javascript:update(\''+ row.id +'\')">重置</a> ';
                   var a = '<a href="javascript:getAuthority(\'' + row.id +'\')">角色</a> ';*/
                        return e;  
                    } 
                  }], //列
	silent: true,  //刷新事件必须设置
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  //没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
//		alert(data);
	}
});
}
//获取页面列表
function loadData(){
	$.ajax(
	  		{
	  		type:"get",
	  		url:"authority/listAuthority",
	  		data:{"authority":""},
	  		dataType:'json',
	  		success:function(data){
	  			list(data);
	  		}
	  		});
}

function loadData1(id){
	var account = "";
	$.ajax(
			{
			type:"get",
			url:"authority/listAuthority",
			data:{"id":id,"account":encodeURI(account)},
			dataType:"json",
			success:function(data){
				list(data);
			}
			});
}

function queryParams(params) {  //配置参数
		var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.pageSize,   //页面大小
			pageNumber: params.pageNumber,  //页码
			orderNum : $("#orderNum").val() 
		};
		return temp;
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
	//点击树传入参数
	$("#listaccount").val(null);
	loadData1(treeNode.id); //获取树的id
}

/** 刷新页面 */  
/*function refresh() {  
    $('#reportTable').bootstrapTable('refresh',{url:"account/listAccount1"});  
} */
/** 刷新页面 */ 
function ref(){
	$('#reportTable').bootstrapTable('destroy');
	$.ajax(
	  		{
	  		type:"get",
	  		url:"authority/listAuthority",
	  		data:{"account":""},
	  		dataType:'json',
	  		success:function(data){
	  			list(data);
	  		}
	  		});
}
var ztree;
function tree(id){
$.ajax({
	url:'departmentController/dtree',
	type:'get',
	data:{"id":1},
	dataType:'json',
	success:function(data){
		ztree=$.fn.zTree.init($("#"+id), setting, data);
		var nodes=ztree.getNodes();
		ztree.selectNode(nodes[0]);
		ztree.expandNode(nodes[0]);
	},
	 error:function(data) {
            alert("加载菜单出错");
        }
});
}
/**
 * 删除账户信息
 * @param id
 */
function edit(id){
	$.ajax({
		url:'authority/get',
		type:'get',
		dataType:'json',
		data:{"id":id},
		success:function(data){
			//data.birthday = dateUtils.getFormatDateFromTimes(data.birthday);
			$("#form1").json2form({'data':data});
			$("#myModal").modal();
		},
		 error : function(data) {
			 layer.alert("获取数据失败",{icon:2});
	        }
	});
}

/**
 * 修改账户信息
 */
function update(){
	var obj = $("#form1").form2json();
//	var jsonstr = JSON.stringify(obj);
	if(obj.id==null||obj.id.length==0){
		layer.alert("角色不能为空！",{icon:2});
		return ;
	}else if(obj.authority==null||obj.authority.length==0){
		layer.alert("角色名称不能为空！",{icon:2});
		return ;
	}else{
		$.ajax({
			url:'authority/edit',
			type:'post',
			data:{"id":obj.id,
				"authority":obj.authority
				},
			dataType:'json',
			success:function(data){
				if(data.id=="1"){
					layer.alert("该账号已存在!",{icon:2});
					}else{
					layer.alert("保存成功",{icon:1});
					loadData();
					$("#myModal").modal('hide');
					ref();
					}
			},
			error : function(data){
				layer.alert("保存失败",{icon:2});
				ref();
				updatetime(id)
			}
		});
	}
}

$(function(){
	setValidateRule();
})

function setValidateRule(){
	$("#addAuthModal").validate({
	    rules: {
	      id: {
	        required: true,
	      },
	      authority:{
	    	  required: true,
	      }
	      ,
	    },
	    messages: {
	    	id: {
//	        required: "请输入用户名"
	      },
	      authority: {
//		    required: "请输入部门"
		      },
//		  account:{
//			  remote:"该账号已存在"
//		  }
	}
	   });
}

function addAuthority(){
	var obj = $("#form2").form2json();
	if(obj.id==null||obj.id.length==0){
		layer.alert("角色级别不能为空！",{icon:2});
		return ;
	}else if(obj.authority==null||obj.authority.length==0){
		layer.alert("角色名称不能为空！",{icon:2});
		return ;
	}else{
		$.ajax({
			url:'authority/add',
			type:'post',
			data:{"id":obj.id,
				"authority":obj.authority
				},
			dataType:'json',
			success:function(data){
				if(data.id=="1"){
					layer.alert("该账号已存在!",{icon:2});
					}else{
					layer.alert("保存成功",{icon:1});
					loadData();
					$("#addAuthModal").modal('hide');
					ref();
					}
			},
			error : function(data){
				layer.alert("保存失败",{icon:2});
				ref();
				updatetime(id)
			}
		});
	}
		
}

/** 
 * 删除数据 
 */  
/*function del(id) {  
    	layer.confirm('确定要删除所选数据？', 
    			{icon: 3, title:'提示'}, function(){  

            $.ajax({  
                url:'account/delete', 
                data:{"id":id},
                success:function(data){  
                    if(data.hasError){ 
                    	alert(data.hasError);
                    }else{ 
                    	layer.alert("删除成功",{icon:1}); 
                    	refresh();  
                    	ref();
                    }  
                }
               
            })  
          });  
}  */

function addAuth(){
	$('#addAuthModal').modal();
}

/*
 * 根据账户名称查询
 */
function query(){
	//获取输入框数据
	var account = $("#listaccount").val();
	var node=ztree.getSelectedNodes();
	var deptid;
	if(node.length>0&&node[0]!=null){
		deptid=node[0].id;
	}
	$.ajax({
	  		data:{"account":encodeURI(account),"id":deptid}, //传入输入框数据
	  		type:"get",
	  		url:"authority/listAuthority",
	  		contentType:'application/json;charset=UTF-8',
	  		dataType:'json',
	  		success:function(data){
	  			list(data);
	  		},
	  		error:function(data){
	  			 layer.alert("查询错误",{icon:2});
	  		}
	  		});
}


