package com.ajx.supervise.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ajx.supervise.pojo.Auth;
import com.ajx.supervise.pojo.User;
import com.ajx.supervise.service.SendPlanService;
import com.ajx.supervise.service.UserService;


@Controller
@RequestMapping("user")
public class UserController {
	@Resource
	private UserService userService;
	@Resource 
	public SendPlanService sendPlanService;
	/**
	 * 用户列表
	 * @param name
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping("/listUser")
	@ResponseBody
	public List<User> list(String name,HttpServletResponse res) throws UnsupportedEncodingException{
		res.setHeader("Access-Control-Allow-Origin", "*");
		if(name==null||name==""){
			name="";
		}else{
			name = URLDecoder.decode(name, "UTF-8");
		}
		List<User> list = userService.list(name);
		return list;
	} 
	@RequestMapping("/listUser1")
	@ResponseBody
	public List<Map<String,Object>> list1(String id,String name,HttpServletResponse res) throws UnsupportedEncodingException{
		res.setHeader("Access-Control-Allow-Origin", "*");
		name = URLDecoder.decode(name, "UTF-8");
		List<Map<String,Object>> list = userService.list1(id,name);
		return list;
	}
	/**
	 * 用户列表页面
	 * @return
	 */
	@Auth(isAdmin=true)
	@RequestMapping("list")
	public ModelAndView userlist(HttpServletRequest req){
		ModelAndView m=new ModelAndView("user/listUser");
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
//		m.addObject(attributeName, attributeValue)
	    m.addObject("loginAccount", username);
	    m.addObject("auth", sendPlanService.getAuth(username));
		return m;
	}
	/**
	 * 删除用户
	 * @param id
	 * @return
	 */
	@RequestMapping("del")
	@ResponseBody
	public boolean del(String id,HttpServletResponse res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		boolean b = userService.del(id);
		return b;
	}
	/**
	 * 添加用户
	 * @param user
	 * @throws ParseException 
	 * @throws JSONException 
	 */
	@RequestMapping("add")
	@ResponseBody
	public User add(String user,HttpServletResponse res) throws JSONException, ParseException{
		res.setHeader("Access-Control-Allow-Origin", "*");
		return userService.add(user);
	}
	/**
	 * 修改用户
	 * @param user
	 * @return
	 */
	@RequestMapping("edit")
	@ResponseBody
	public boolean update(User user,HttpServletResponse res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		return userService.update(user);
	}
	/**
	 * 删除用户(逻辑删除)
	 */
	@RequestMapping("delete")
	@ResponseBody
	public int delete(String id,HttpServletResponse res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		int d = userService.delete(id);
		return d;
	}
	/**
	 * 根据id查询用户
	 * @param id
	 * @return
	 */
	@RequestMapping("get")
	@ResponseBody
	public User getUserById(String id,HttpServletResponse res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		User user = userService.getById(id);
		return user;
	}
	@RequestMapping("validate")
	@ResponseBody
	public boolean accountValidate(String account,String id,HttpServletResponse res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		boolean b = userService.AccountValidate(account,id);
		return b;
	}
	@RequestMapping("test")
	public String gg(){
		return "user/test";
	}
}
