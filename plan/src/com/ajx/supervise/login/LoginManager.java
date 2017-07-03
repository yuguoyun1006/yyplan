package com.ajx.supervise.login;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ajx.supervise.pojo.Account;
import com.ajx.supervise.service.SendPlanService;
import com.ajx.supervise.utils.BaseDao;

@Controller
@RequestMapping("loginController")
public class LoginManager extends BaseDao{
	public Account account;
	@Resource
	public SendPlanService sendPlanService;
	@RequestMapping("login")
	@ResponseBody
	public boolean login(String username,String password,HttpSession session) {
		if(validate(username, password)){
			session.setAttribute("username", username);
			return true;
		}
		return false;
	}
	public boolean validate(String username,String password){
		String sql = "select * from Account where account = ? and password = ?";
		if(getListBySql(sql, new String[]{username,password}).size()==0){
			return false;
		}
		return true;
	}
	
	@RequestMapping("updatePassword")
	public ModelAndView updatePassword(HttpServletRequest req){
		ModelAndView m=new ModelAndView("/account/userAccount");
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
		String sql="select password from account where account=?";
		List<Map<String,Object>> list=getListBySql(sql,new String[]{username});
		m.addObject("password", list.get(0).get("password")+"");
		m.addObject("mtype", 1);
//		m.addObject(attributeName, attributeValue)
	    m.addObject("loginAccount", username);
	    m.addObject("auth", sendPlanService.getAuth(username));
	    return m;
	}
	
	@RequestMapping("update")
	@ResponseBody
	public int update(String account,String password){
		String sql="update account set password=? where account=?";
		int i=updateBySql(sql,new String[]{password,account});
		return i;
	}
	
	@RequestMapping("logout")
	public String logout(HttpSession session){
		session.invalidate();
		return "login";
	}
	
	@RequestMapping("getUrl")
	@ResponseBody
	public String getUrl(String user){
		String url="";
		String auth=sendPlanService.getAuth(user);
		if("1".equals(auth)){//超级管理员
			url="departmentController/list";
		}else if("11".equals(auth)){//生产协调会任务管理员
			url="plan/statis2";
//			url="sendPlanController/list/2";
		}else if("12".equals(auth)){//临时安排任务任务管理员
			url="plan/statis3";
//			url="sendPlanController/list/3";
		}else if("13".equals(auth)){//部室
			url="plan/myplan1";
		}else if("2".equals(auth)){//领导
			url="plan/statis1";
		}else if("3".equals(auth)){//领导工作例会任务管理员
			url="plan/statis1";
//			url="sendPlanController/list/1";
		}
		return url;
	}
}
