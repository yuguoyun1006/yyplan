var setting = {
			view: {
				showLine: true
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
function onClick(event, treeId, treeNode, clickFlag) {  
    alert("onClick: " + treeId + "," + "name:"+treeNode.name + "," + clickFlag+ "," + "id:"+treeNode.id+ "," + treeNode.url);  
}   

function tree(id){
	$.ajax({
		url:'/departmentController/dtree',
		type:'get',
		dataType:'json',
		success:function(data){
			$.fn.zTree.init($("#"+id), setting, data);
		},
		 error : function(data) {
	            alert("加载菜单出错");
	        }
	});
}
