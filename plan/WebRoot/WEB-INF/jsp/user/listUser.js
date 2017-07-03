$(function(){
	tree("tree");
	deteTree();
	$.ajax(
  		{
  		type:"get",
  		url:"user/listUser",
  		data:{"name":""},
  		dataType:'json',
  		success:function(data){
//  			list2(data);
  			list(data);
  		}
  		});
});
var national = [
                "汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
                "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
                "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
                "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
        ];
$(function(){
	var nat = document.getElementById ("nation");
    for ( var i = 0; i < national.length; i++)
    {
        var option = document.createElement ('option');
        option.value = national[i];
        var txt = document.createTextNode (national[i]);
        option.appendChild (txt);
        nat.appendChild (option);
    }
})
function list(data){
//	$('#toolbar').find('select').change(function () {
    $('#reportTable').bootstrapTable('destroy').bootstrapTable({
	method: 'get',
//  url: 'user/list',
	data:data,
	dataType: "json",
	striped: true,	 // 使表格带有条纹
	pagination: true,	// 在表格底部显示分页工具栏
//	showExport:true,    //显示导出
//  exportDataType: $(this).val(),//导出类型    // basic, all, selected 
// 'json', 'xml', 'png', 'csv', 'txt', 'sql', 'doc', 'excel', 'powerpoint', 'pdf' //pdf png需要另外引js
	exportTypes: ['json', 'xml', 'csv', 'txt', 'sql', 'excel','doc'],
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
//	          {checkbox:true},
	          {field: 'username',title: '姓名'}, 
	          {field: 'jobnumber',title: '工号'},
	          {field: 'sex',title: '性别',formatter:function(a,b,c){
	        	  if(a=="1"||a==1){
	        		  return "男";
	        		}if(a=="2"||a==2){
	        			return "女";
	        			}else{
	        				return "";
	        			}
	          }},
	          {field: 'birthday',title: '出生日期',formatter:function(a,b,c){
	        	  return new Date(a).Format('yyyy-MM-dd');
	          }},
	          {field: 'nation',title: '民族'},
	          {field: 'jobtitle',title: '职称'},
	          {field: 'mobile',title: '手机'},
	          {field: 'email',title: 'email'},
	          {field: 'account',title: '账号'},
	          {title: '操作',field: 'id',align: 'center',formatter:function(value,row,index){  
	        	  var a = '<a  onclick="addUser1()">添加</a> ';  
                   var e = '<a href="javascript:edit(\''+ row.id + '\')">编辑</a> ';  
                   var d = '<a href="javascript:del(\''+ row.id +'\')">删除</a> ';  
                        return e+d+a;  
                    } 
                  }], // 列
	silent: true,  // 刷新事件必须设置
	formatLoadingMessage: function () {
		return "请稍等，正在加载中...";
	},
	formatNoMatches: function () {  // 没有匹配的结果
		return '无符合条件的记录';
	},
	onLoadSuccess:function(data){
// alert(data);
	}
});
//    });
}

function loadData(){
	$.ajax(
	  		{
	  		type:"get",
	  		url:"user/listUser",
	  		data:{"name":""},
	  		dataType:'json',
	  		success:function(data){
	  			list(data);
	  		}
	  		});
}

function loadData1(id){
	var name = $("#listname").val();
	$.ajax(
	  		{
	  		type:"get",
	  		url:"user/listUser1",
	  		data:{"id":id,"name":encodeURI(name)},
	  		dataType:'json',
	  		success:function(data){
	  			list(data);
	  		}
	  		});
}

function queryParams(params) {  // 配置参数
		var temp = {   // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			pageSize: params.pageSize,   // 页面大小
			pageNumber: params.pageNumber,  // 页码
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
	$("#listname").val(null);
	loadData1(treeNode.id);
}   

/** 刷新页面 */  
function refresh() {  
    $('#reportTable').bootstrapTable('refresh',{url:"user/listUser"});  
} 

/** 刷新页面 */ 
function ref(){
	$('#reportTable').bootstrapTable('destroy');
	$.ajax(
	  		{
	  		type:"get",
	  		url:"user/listUser",
	  		data:{"name":""},
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
	 error : function(data) {
            alert("加载菜单出错");
        }
});
}

var deptTree;
function deteTree(){
	deptTree=$("#deptid").dkSelectTree({
		url:"departmentController/dtree",
		Async:true,
		idField:"id",
		pidField:"pid",
		nameField:"name",
		listType:"tree",
		multiSelect:false,
		chkboxType:{ "Y": "", "N": "" },
		width : 200
	});
}

function addUser1(){
	clearForm();
	deptTree.setValue(null);
	$(".dkDate").datetimepicker({format: 'yyyy-mm-dd',minView:2}); // 选择日期
	$('#myModal').modal();
}

function edit(id){
	$(".dkDate").datetimepicker({format: 'yyyy-mm-dd',minView:2}); // 选择日期
	$.ajax({
		url:'user/get',
		type:'get',
		dataType:'json',
		data:{"id":id},
		success:function(data){
			data.birthday = dateUtils.getFormatDateFromTimes(data.birthday);
			$("#form1").json2form({'data':data});
			$("#sex").val(data.sex);
			$("#nation").val(data.nation);
			deptTree.setValue(data.deptid);
			$("#myModal").modal();
		},
		 error : function(data) {
			 layer.alert("获取数据失败",{icon:2});
	        }
	});
}

function add(){
	clearForm();
	$.ajax({
		url:'user/add',
		type:'get',
		data:{"id":1},
		dataType:'json',
		success:function(data){
			$.fn.zTree.init($("#"+id), setting, data);
		},
		 error : function(data) {
	            alert("加载菜单出错");
	        }
	});
}
/**
 * 删除数据
 */  
function del(id) {  
    	layer.confirm('确定要删除所选数据？', {icon: 3, title:'提示'}, function(){  
            $.ajax({  
                url:'user/delete', 
                data:{"id":id},
                success:function(data){  
                    if(data.hasError){ 
                    	alert(data.hasError);
                    }else{ 
                    	layer.alert("删除成功",{icon:1}); 
                    	ref();  
                    }  
                }
               
            })  
          });  
}  

function query(){
	var name = $("#listname").val();
	var deptid=null;
	var node=ztree.getSelectedNodes();
	if(node.length>0&&node[0]!=null){
		deptid=node[0].id;
	}
	$.ajax({
	  		data:{"id":deptid,"name":encodeURI(name)},
	  		type:"get",
	  		url:"user/listUser1",
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

$(function(){
	setValidateRule();
})

function setValidateRule(){
	$("#form1").validate({
	    rules: {
	      username: {
	        required: true,
	        minlength: 1
	      },
	      deptid:{
	    	  required: true,
	      }
	      ,
//	      account:{
//	    	  remote: {
//				    url: "user/validate",     
//				    type: "post",             
//				    dataType: "json",           
//				    data: { 
//				    	id:function(){
//				    		return $("#id").val();
//				    	},
//				        username: function() {
//				            return $("#account").val();
//				        }
//				    }
//				}
//	      }
	    },
	    messages: {
	      username: {
//	        required: "请输入用户名"
	      },
	      deptid: {
//		    required: "请输入部门"
		      },
//		  account:{
//			  remote:"该账号已存在"
//		  }
	}
	   });
}

function showDept(){
	tree("tree");
}

function addUser(){
	$(".dkDate").datetimepicker({format: 'yyyy-mm-dd',minView:2}); // 选择日期
	var c = setValidateRule();
	var valid=$("#form1").valid();
	if(valid){
		var obj = $("#form1").form2json();
		var jsonstr = JSON.stringify(obj);
		if(!(/^1[34578]\d{9}$/.test(obj.mobile))&&obj.mobile.length>0){
			layer.alert("请输入正确的手机号码！",{icon:2});
			return ;
		}else{
			$.ajax({
				url:'user/add',
				type:'post',
				data:{"user":jsonstr},
				dataType:'json',
				success:function(data){
					if(data.userid=="1"){
					layer.alert("该账号已存在!",{icon:2});
					}else{
						layer.alert("保存成功",{icon:1});
						loadData();
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
		
	}
//	else if(!$("#account").valid()){
//		layer.alert("该账号已存在!",{icon:2});
//		return;
//	}
	else{
		layer.alert("请填写必填项!",{icon:2});
	}
}

function clearForm(){
	$("#id").val(null);
	$("#userid").val(null);
	$("#username").val(null);
	$("#deptid").val(null);
	$("#jobnumber").val(null);
	$("#sex").val(null);
	$("#birthday").val(null);
	$("#nation").val(null);
	$("#highesteducation").val(null);
	$("#jobtitle").val(null);
	$("#post").val(null);
	$("#nativeplace").val(null);
	$("#mobile").val(null);
	$("#email").val(null);
	$("#account").val(null);
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
}