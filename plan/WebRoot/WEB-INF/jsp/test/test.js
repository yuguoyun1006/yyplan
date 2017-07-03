function uploadFile(){
	var form=$("form[name=uploadForm]");
	form.ajaxSubmit({
		url:'/commonFileHandler/uploadFile',   
        type:'post',   
        success:function(data)   
        {   
           alert("上传成功");
        }
	});
}

function downloadFile() {
	window.location.href="/commonFileHandler/downloadFile?id=402881ec5acfc4e6015acfe1cebb0002";
}