$(function(){
	setValidateRule();
});
function submitForm(){
	var valid=$("#form1").valid();
	if(valid){
		var obj = $("#form1").form2json();
		var jsonstr = JSON.stringify(obj);
		$.ajax({
			url:'/departmentController/saveDepartment',
			type:'post',
			data:{"itemStr":jsonstr},
			dataType:'json',
			success:function(data){
				alert("保存成功");
			},
			 error : function(data) {
		            alert("保存失败");
		        }
		});
	}
}
function setValidateRule(){
	$("#form1").validate({
		rules: { //email:true, url:true,  creditcard :true
	 			
	 		id: {  /*id*/
	 			//required: false,	 			
	 			maxlength: 32,
	 			
	 		},
	 		deptId: {  /*部门*/
	 			required: true,
	 			number:true,
	 			maxlength: 16,
	 			
	 		},
	 		name: {  /*姓名*/
	 			required: true,
	 			maxlength: 100,
	 			
	 		},
	 			
	 		address: {  /*类型*/
	 			required: true,	 			
	 			maxlength: 10,
	 			
	 		},
	 			
	 		leader: {  /*负责人*/
	 			//required: false,	 			
	 			maxlength: 100,
	 			
	 		},
	 			
	 		tel: {  /*电话*/
	 			//required: false,
	 			number:true,
	 			maxlength: 30,
	 			
	 		},
	 			
	 		remark: {  /*描述*/
	 			//required: false,	 			
	 			maxlength: 4000,
	 			
	 		},
	 			
		},
		messages: {
			id: {  /*id*/
	 		},
	 		deptId: {  /*部门*/
	 			
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