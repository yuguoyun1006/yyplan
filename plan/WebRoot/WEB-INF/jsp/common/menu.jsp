<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<script type="text/javascript">
var account="${loginAccount}";
	var auth ="${auth}"; 
$(function(){
isAdmin();
});



function isAdmin(){
var list=auth.split("|");
for(var i in list){
   if(list[i].toString()=="1"){//超级管理员
   $("#myadmin").text("系统管理");
   $("#dept1").show();
   $("#user1").hide();
   $("#account1").show();
   $("#PlanLX").hide();
    $("#send1").hide();
   $("#myPlan1").hide();
    $("#myPlan2").hide();
     $("#myPlan3").hide();
   $("#allPlan1").hide();
   $("#context1").hide();
    $("#context2").hide();
   $("#context3").hide();
   }else if(list[i].toString()=="2"){//领导
    $("#myadmin").text("任务统计");
     $("#dept1").hide();
   $("#user1").hide();
   $("#account1").hide();
   $("#PlanLX").hide();
    $("#send1").hide();
   $("#myPlan1").hide();
    $("#myPlan2").hide();
     $("#myPlan3").hide();
   $("#allPlan1").hide();
   $("#context1").show();
    $("#context2").show();
     $("#context3").show();
   }else if(list[i].toString()=="3"){//领导工作例会任务管理员
   $("#myadmin").text("任务管理");
     $("#dept1").hide();
   $("#user1").hide();
   $("#account1").hide();
   $("#PlanLX").show();
    $("#send1").show();
    $("#types").attr('href',"sendPlanController/list/1");
   $("#myPlan1").hide();
    $("#myPlan2").hide();
     $("#myPlan3").hide();
   $("#allPlan1").show();
   $("#context1").show();
    $("#suoyou1").html("<i class='glyphicon glyphicon-fire'></i>任务统计");
    $("#suoyou2").html("<i class='glyphicon glyphicon-fire'></i>任务统计");
    $("#suoyou3").html("<i class='glyphicon glyphicon-fire'></i>任务统计");
   $("#context2").hide();
   $("#context3").hide();
   }else if(list[i].toString()=="11"){//生产协调会任务管理员
    $("#myadmin").text("任务管理");
     $("#dept1").hide();
   $("#user1").hide();
   $("#account1").hide();
   $("#PlanLX").show();
    $("#send1").show();
    $("#types").attr('href',"sendPlanController/list/2");
    $("#myPlan1").hide();
    $("#myPlan2").hide();
     $("#myPlan3").hide();
   $("#allPlan1").show();
   $("#context2").show();
   $("#suoyou1").html("<i class='glyphicon glyphicon-fire'></i>任务统计");
    $("#suoyou2").html("<i class='glyphicon glyphicon-fire'></i>任务统计");
    $("#suoyou3").html("<i class='glyphicon glyphicon-fire'></i>任务统计");
   $("#context1").hide();
   $("#context3").hide();
   }else if(list[i].toString()=="12"){//临时安排任务任务管理员
   $("#myadmin").text("任务管理");
     $("#dept1").hide();
   $("#user1").hide();
   $("#account1").hide();
   $("#PlanLX").show();
    $("#send1").show();
    $("#types").attr('href',"sendPlanController/list/3");
    $("#myPlan1").hide();
    $("#myPlan2").hide();
     $("#myPlan3").hide();
   $("#allPlan1").show();
   $("#context3").show();
   $("#context1").hide();
   $("#suoyou1").text("任务统计");
    $("#suoyou1").html("<i class='glyphicon glyphicon-fire'></i>任务统计");
    $("#suoyou2").html("<i class='glyphicon glyphicon-fire'></i>任务统计");
    $("#suoyou3").html("<i class='glyphicon glyphicon-fire'></i>任务统计");
   $("#context2").hide();
   }else if(list[i].toString()=="13"){//部室
   $("#myadmin").text("部室任务");
     $("#dept1").hide();
   $("#user1").hide();
   $("#account1").hide();
   $("#PlanLX").hide();
    $("#send1").hide();
   $("#myPlan1").show();
   $("#myPlan2").show();
   $("#myPlan3").show();
   $("#allPlan1").hide();
   $("#context1").hide();
    $("#context2").hide();
   $("#context3").hide();
   }
}
}
function feeBack(){
	location.href="plan/goFeeBackStatics";
}
var type = "${mtype}";
</script>
<div class="container-fluid" style="float:left;">
	<!-- <div class="row">
		<div class="col-md-2">
			<ul id="main-nav" class="nav nav-tabs nav-stacked" style="">
				<li class="active"><a href="javascript:;"> <i
						class="glyphicon glyphicon-th-large"></i> 首页 </a></li>
				<li id="dept1"><a href="departmentController/list"> <i
						class="glyphicon glyphicon-cog"></i> 组织管理 </a></li>
				<li id="user1"><a href="user/list"> <i
						class="glyphicon glyphicon-user"></i> 用户管理 </a></li>
				<li id="account1"><a href="account/list"> <i
						class="glyphicon glyphicon-fire"></i> 账号管理 </a></li>
				<li id="send1"><a href="sendPlanController/list"> <i
						class="glyphicon glyphicon-fire"></i> 任务分发 </a></li>
				<li id="myPlan1"><a href="plan/myplan"> <i
						class="glyphicon glyphicon-fire"></i> 我的任务 </a></li>
				<li id="allPlan1"><a href="plan/allplanlist"> <i
						class="glyphicon glyphicon-fire"></i> 所有任务 </a></li>
				<li id="context1"><a href="plan/statis"> <i
						class="glyphicon glyphicon-fire"></i> 任务统计 </a></li>
			</ul>
		</div>
	</div> -->
        <div class="row">
            <div class="col-md-2">
                <ul id="main-nav" class="nav nav-tabs nav-stacked">
                    <li class="active">
                        <a id="myadmin">   <!-- href="plan/mtype" -->
                            <i class="glyphicon glyphicon-th-large"></i>
                            	督办菜单		
                        </a>
                    </li>
                    <li id="dept1" style="display:none;">
                        <a href="departmentController/list">
                            <i class="glyphicon glyphicon-cog"></i>
                            	组织管理
                        </a>
                    </li>
   					<li id="user1" style="display:none;">
                        <a href="user/list">
                            <i class="glyphicon glyphicon-user"></i>
                          		用户管理
                        </a>
                    </li>
                    <li id="account1" style="display:none;">
                        <a href="account/list">
                            <i class="glyphicon glyphicon-fire"></i>
                           		 账号管理
                        </a>
                    </li>
                    <li id="PlanLX" style="display:none;">
                        <a href="plan/planLX">
                            <i class="glyphicon glyphicon-fire"></i>
                           		任务类型
                        </a>
                    </li>
 					<li id="send1" style="display:none;">
                        <a id="types" href="sendPlanController/list/${type}">
                            <i class="glyphicon glyphicon-fire"></i>
                            	任务分发
                        </a>
                    </li>
                    <li id="feeBack">
                        <a id="feeBackA" onclick="feeBack();">
                            <i class="glyphicon glyphicon-fire"></i>
                            	迟报统计
                        </a>
                    </li>
                    <li id="myPlan1" style="display:none;">
                        <a href="plan/myplan1">
                            <i class="glyphicon glyphicon-fire"></i>
                           		领导工作例会
                        </a>
                    </li>
                    <li id="myPlan2" style="display:none;">
                        <a href="plan/myplan2">
                            <i class="glyphicon glyphicon-fire"></i>
                           		生产协调会
                        </a>
                    </li>
                    <li id="myPlan3" style="display:none;">
                        <a href="plan/myplan3">
                            <i class="glyphicon glyphicon-fire"></i>
                           		临时安排工作
                        </a>
                    </li>
                    <li id="allPlan1" style="display:none;">
                        <a href="plan/allplanlist">
                            <i class="glyphicon glyphicon-fire"></i>
                           		 所有任务
                        </a>
                    </li>
                    <li id="context1" style="display:none;">
                        <a href="plan/statis1" id="suoyou1">
                            <i class="glyphicon glyphicon-fire"></i>
                            	领导工作例会
                        </a>
                    </li>
                      <li id="context2" style="display:none;">
                        <a href="plan/statis2" id="suoyou2">
                            <i id="renwu2" class="glyphicon glyphicon-fire"></i>
                            	生产协调会
                        </a>
                    </li>
                      <li id="context3" style="display:none;">
                        <a href="plan/statis3" id="suoyou3">
                            <i id="renwu3" class="glyphicon glyphicon-fire"></i>
                            	临时安排工作
                        </a>
                    </li>
                     <li>
                        <a href="loginController/updatePassword">
                            <i class="glyphicon glyphicon-fire"></i>
                            	修改密码
                        </a>
                    </li>
                     <li>
                        <a href="loginController/logout">
                            <i class="glyphicon glyphicon-fire"></i>
                            	退出系统
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
