/**---------------------------------form2json---------------------------------------*/
/** @serializedParams looks like "prop1=value1&prop2=value2".  
使用方式：     
            var obj = $("#testform").form2json();
			var str = JSON.stringify(obj);
或者
			var obj = {};
			obj。id =1001;
			obj.name = "obj_name";
			.........
			obj = $("#testform").form2json(obj); //可以再原有对象的基础上，根据form值修改原值
			var str = JSON.stringify(obj);
			
Nested property like 'prop.subprop=value' is also supported **/

$.ajaxSetup({
	contentType: "application/x-www-form-urlencoded; charset=utf-8"
}); 

(function ($) {
	function paramString2obj (serializedParams,obj) { 
		//alert(serializedParams);
	    if(!obj) obj={};
	    function evalThem (str) {
	    	if(!str || str.length==0)return;
	    	var atrArr = str.split("=");
	        var attributeName = atrArr[0];
	        var attributeValue = atrArr[1];
	        if(attributeValue){
	        	attributeValue = attributeValue.replace(/\+/g,' ');//把所有的+替换为空格。因为jquery的serialize会把空格替换为+
	        	attributeValue = decodeURIComponent(attributeValue);
	        }
	        /*var array = attributeName.split(".");
	        for (var i = 1; i < array.length; i++) {
	            var tmpArray = Array();
	            tmpArray.push("obj");
	            for (var j = 0; j < i; j++) {
	                tmpArray.push(array[j]);
	            };
	            var evalString = tmpArray.join(".");
	            // alert(evalString);
	            if(!eval(evalString)){
	                eval(evalString+"={};");                
	            }
	        };
	        if($("#"+attributeName).attr("ignorePost") == "true"){
	        	console.log(attributeName + " ignore");
	        	return;
	        }else{
	        	eval("obj."+attributeName+"='"+attributeValue+"';");
	        }*/
	        
	      //序列化字符串转为对象
	        if($("#"+attributeName).attr("ignorePost") == "true"){
	        	console.log(attributeName + " ignore");
	        	return;
	        }else{ //相对上面的代码，这段代码可以解决value中带有'好的值，上面使用eval函数，如果值里面包含'号，会出错。
		        var array = attributeName.split(".");
		        for (var i=array.length-1;i>-1; i--) {
		        	var temp={};
		        	temp[array[i]]=attributeValue;
		            attributeValue=temp;
		        };
		        var temp=obj;
		        for (var i=0,len=array.length;i<len; i++) {
		        	var name=array[i];
		        	if(temp.hasOwnProperty(name)){
		        		temp=temp[name];
		        		attributeValue=attributeValue[name];
		        	}else{
		        		temp[name]=attributeValue[name];
		        		break;
		        	}
		        }
	        }
	    };
	 
	    var properties = serializedParams.split("&");
	    for (var i = 0; i < properties.length; i++) {
	        evalThem(properties[i]);
	    };
	 
	    return obj;
	};
	 
	function convertObject(arr, obj) { //主要是推荐这个函数。它将jquery系列化后的值转为name:value的形式。不能处理 a.b.c的情况
	    if(!obj) obj = {};
	    for (var i in arr) {
	        if (typeof (obj[arr[i].name]) == 'undefined') obj[arr[i].name] = arr[i].value;
	        else obj[arr[i].name] += "," + arr[i].value;
	    }
	    return obj;
	};
	
	function _form2json(form, obj){
		var params = form.serialize(); 
		var obj = paramString2obj(params,obj);
		return obj; 
	};
	$.fn.form2json = function(obj){ 
	    obj = _form2json(this, obj);
	    return obj;
	};
	
	$.fn.jsonSubmit = function(url,data,onSuccess,onError){
		if(!data){
			data = _form2json(this);
		}
	 	 alert(JSON.stringify(data));
	 	 $.post(url,data,
	 		function(data){
	 			if(data.hasError){
	 				if(onError)
	 					onError.apply(this,data.errorMessage);
	 				else{
	 					alert(data.errorMessage);
	 				}
	 			}else{
	 				if(onSuccess){
	 					onSuccess.apply(this);
	 				}
	 			}
	 	});
	};
	
	$.fn.form2query = function(){
		var form = this;
		var queryFields = [];
		var checkboxNames = "|";
		$("input,select,textarea", this).each(function(){
			var queryField = {};
			var elemType=$(this).attr("type")==undefined?this.type:$(this).attr("type");
			if(elemType == 'button')return true;//在jquery中，相当于continue
			var elemName=$(this).attr("name");
			if(!elemName || elemName=='undefined')return true;//在jquery中，相当于continue
			 
			var op = $(this).attr("op"); 
			
			var dataType = $(this).attr("dataType");
			if(!dataType || dataType == "undefined" || dataType=='null'){
				return true;//在jquery中，相当于continue
			}
			
			queryField.columnName = elemName;
			queryField.operator = op;
			queryField.dataType = dataType;
			
			var elemData = "";
			var validValue = true;
			
			switch(elemType){
				case undefined:
				case "text":
				case "password":
				case "hidden":
				case "textarea":{
					elemData = $(this).val();
					if(!queryField.operator || queryField.operator=='null' || queryField.operator=='undefined'){
						queryField.operator = "like";
					}
					break;
				}
				case "checkbox":
					var chkName = $(this).attr("name"); 				 
					if(checkboxNames.indexOf("|"+chkName+"|")<0){
						checkboxNames += chkName+"|";
						queryField.operator = "in";
						var jqfind = "input[type='checkbox'][name='"+chkName+"']:checked";
						 
						$(jqfind).each(
			                function() {
			                	elemData += $(this).val()+"|";   
			                }
				        );
					 
					}else{
						validValue = false;
					}
					break;
				case "radio":{
					if(this.checked){//判断当前checkbox/radio是否被选中
						if(typeof($(this).attr("sqlvalue"))=="undefined"){
							alert("没有为"+$(this).html()+"设置查询值:sqlvalue");
							return true;//在jquery中，相当于continue  判断是否存在属性 op
						}
						elemData = $(this).attr("sqlvalue");
						queryField.operator = "eq";
					}else{
						validValue = false;
					}
					break;
				}
				case "select":{
					queryField.operator = "eq";
				}					
				case "select-one":{
					queryField.operator = "eq";
				}
				case "select-multiple":{
					queryField.operator = "in";
					$(this).find("option:selected").each(function(){
						var val = this.value;
						if(val && val.length>0){
							elemData=elemData+val+"|";
						}
					});
					break;
				}
			}
			if(validValue){//过滤掉没有选中的radio,已经第二次的同名checkbox			
				queryField.queryValue = elemData;
				queryFields.push(queryField);
				//alert(JSON.stringify(queryField));
			}
		});
	    return queryFields;
	};
})(jQuery);
/**---------------------------------json2form------------------------------------------------*/
 
/*
 * 本地调用/local data

 $("#json2form").json2form({data:json2fromdata});
 
   远程调用/remote data
 $("#json2form").json2form({url:"http://...",data:{id:"json2form",name:"json2form"}});
 * */
(function ($) {
	$.fn.json2form = function(config) { 
		var config=$.extend({
			url		:null,
			elem	:this.attr("id"),
			type	:'POST'
		}, config || {});

		if(config.url){
			$.ajax({
				type: config.type,
				url: config.url,
				contenttype :"application/x-www-form-urlencoded;charset=utf-8", 
				data:$.extend({json2form:config.elem},config.data||{}),dataType: "json",async: false,
				success: function(data){
					config.data=data;
				}
			});
		}
	
		if(!$("#"+config.elem).attr("loadedInit")){//init checkbox radio and select element ,label
			if(config.data.init){			
				for (var elem in config.data.init){
					var arrayData=config.data.init[elem];
					if($("#"+config.elem+" input[name='"+elem+"']")){
						var elemType=$("#"+config.elem+" input[name='"+elem+"']").attr("type");
						var elemName=$("#"+config.elem+" input[name='"+elem+"']").attr("name");
						var initElem=$("#"+config.elem+" input[name='"+elem+"']");
						switch(elemType){
							case "checkbox":
							case "radio":
								for (var initelem in arrayData){
									initElem.after('<input type="'+elemType+'"  name="'+elemName+'" value="'+arrayData[initelem].value+'" />'+arrayData[initelem].display);
								}
								initElem.remove();
								break;
						}
					} 
					if($("#"+config.elem+" select[name='"+elem+"']")){
						for (var initelem in arrayData){
							$("#"+config.elem+" select[name='"+elem+"']").append("<option value='"+arrayData[initelem].value+"'>"+arrayData[initelem].display+"</option>");
						}
					}
				}
			}
			if(config.data.label){//label
				$("#"+config.elem+" label").each(function(){
					var labelFor=$(this).attr("for");
					if(config.data.label[labelFor]){
						$(this).html(config.data.label[labelFor]);
					}
				});
			}
		}
	
		if(config.data){//input text password hidden button reset submit checkbox radio select textarea
			$("#"+config.elem+" input,select,textarea").each(function(){
				var elemType=$(this).attr("type")==undefined?this.type:$(this).attr("type");
				if(elemType == 'button')return true;//在jquery中，相当于continue
				var elemName=$(this).attr("name");
				if(!elemName || elemName=='undefined')return true;//在jquery中，相当于continue
				//alert(elemName);
				//var elemData=config.data[elemName];     //delete by wanghua
				var elemNameArr = elemName.split('.');	  //add by wanghua		
				var elemData=config.data[elemNameArr[0]]; //add by wanghua
				for(i = 1;i<elemNameArr.length;++i){	  //add by wanghua			
					elemData = elemData[elemNameArr[i]];  //add by wanghua
				}
				
				if(!$("#"+config.elem).attr("loadedInit")&&$(this).attr("loadurl")){
					switch(elemType){
						case "checkbox":
						case "radio":
						case "select":
						case "select-one":
						case "select-multiple":{
							var _this =this;
							$.ajax({type: config.type,url: $(this).attr("loadurl"),dataType: "json",async: false,success: function(data){	
								if(elemType=="select"||elemType=="select-one"||elemType=="select-multiple"){
									$(_this).empty();
								}
								for (var elem in data){
										if(elemType=="select"||elemType=="select-one"||elemType=="select-multiple"){
											$(_this).append("<option value='"+data[elem].value+"'>"+data[elem].display+"</option>");
										}else{
											$(_this).after('<input type="'+elemType+'"  name="'+elemName+'" value="'+data[elem].value+'" />'+data[elem].display);
										}
									}
									if(elemType=="checkbox"||elemType=="radio")$(_this).remove();
								}
							});
							break;
						}
					}
				}
				
				//if(elemData) //delete by wanghua
				{
					switch(elemType){
						case undefined:
						case "text":
						case "password":
						case "hidden":
						case "button":
						case "reset":
						case "textarea":
						case "submit":{
							if(!elemData) elemData = "";
							if(typeof(elemData)=="string"){
								$(this).val(elemData.toUpperCase()=="NULL"?"":elemData);
							}else{
								$(this).val(elemData+"");
							}
							break;
						}
						case "checkbox":
						case "radio":{						
							$(this).attr("checked",false);
							if(elemData && elemData.constructor==Array){//checkbox multiple value is Array						 
								for (var elem in elemData){
									if(elemData[elem]==$(this).val()){
										$(this).attr("checked",true);									 									 
									}
								}						 					
							}else{//radio or checkbox is a string single value
								//if(elemData==$(this).val()){          //delete by wanghua
								if(elemData==true || elemData == "on"){ //add by wanghua
									$(this).attr("checked",true);								 
								}
							}
							break;
						}
						case "select":
						case "select-one":
						case "select-multiple":{
							$(this).find("option:selected").attr("selected",false);
							if(elemData && elemData.constructor==Array){
								for (var elem in elemData){
									$(this).find("option[value='"+elemData[elem]+"']").attr("selected",true);
								}
							}else{
								$(this).find("option[value='"+elemData+"']").attr("selected",true);
							}
							break;
						}
					}
				}
			});
		}

		$("#"+config.elem).attr("loadedInit","true");//loadedInit is true,next invoke not need init checkbox radio and select element ,label
};
})(jQuery);
