package com.ajx.supervise.controller;

import java.text.ParseException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ajx.supervise.pojo.Account;
import com.ajx.supervise.pojo.Auth;
import com.ajx.supervise.pojo.Authority;
import com.ajx.supervise.pojo.User;
import com.ajx.supervise.service.AuthorityService;
import com.ajx.supervise.service.SendPlanService;

@Controller
@RequestMapping("authority")
public class AuthorityController {

	@Resource
	public AuthorityService authorityService;
	@Resource 
	public SendPlanService sendPlanService;
	
	@RequestMapping("/listAuthority")
	@ResponseBody
	public List<Authority> list(HttpServletResponse res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		List<Authority> list = authorityService.list();
		return list;
	}
	
	/**
	 * 角色列表页面
	 * @return
	 */
	@Auth(isAdmin=true)
	@RequestMapping("list")
	 public ModelAndView listaccount(HttpServletRequest req){
		ModelAndView m=new ModelAndView("authority/listAuthority");
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
//		m.addObject(attributeName, attributeValue)
	    m.addObject("loginAccount", username);
	    m.addObject("auth", sendPlanService.getAuth(username));
		return m;
	 }
	
	@RequestMapping ("edit")
	@ResponseBody
	public Authority updateaccount(String id, String authority,HttpServletResponse res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		return authorityService.updateAuthority(id, authority);
	}
	
	@RequestMapping("get")
	@ResponseBody
	public Authority getAccountById(String id,HttpServletResponse res){
			res.setHeader("Access-Control-Allow-Origin", "*");
			Authority authority = authorityService.getById(id);
			return authority;
			
	}
	
	@RequestMapping("add")
	@ResponseBody
	public Authority add(String id,String authority,HttpServletResponse res) throws JSONException, ParseException{
		res.setHeader("Access-Control-Allow-Origin", "*");
		return authorityService.add(id,authority);
	}
	
}
