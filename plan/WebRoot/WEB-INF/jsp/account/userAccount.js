$(function(){
	setValidateRule();
	$("#myModal").modal();
});
function submitForm(){
	var valid=$("#form1").valid();
	if(valid){
			$.ajax({
				url:'/loginController/update',
				type:'post',
				data:{"account":account,"password":$("#password").val()},
				dataType:'json',
				success:function(data){
					if(1==data){
						layer.alert("修改成功",{icon:1});
						$("#myModal").modal('hide');
						window.location.href="/loginController/logout";
					}else{
						layer.alert("修改失败",{icon:2});
					}
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
function setValidateRule(){
	$("#form1").validate({
		rules: { //email:true, url:true,  creditcard :true
	 			account:{
	 				required:true
	 			},
	 			password:{
	 				required:true
	 			}
		},
		messages: {
			account:{
				
			},
			password:{
				
			}
		}
	});
}