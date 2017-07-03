package com.ajx.supervise.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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

import com.ajx.supervise.pojo.Account;
import com.ajx.supervise.pojo.Auth;
import com.ajx.supervise.service.AccountService;
import com.ajx.supervise.service.SendPlanService;

@Controller
@RequestMapping("account")
public class AccountController {
@Resource
public AccountService accountService;
@Resource 
public SendPlanService sendPlanService;
/**
 * 账户列表
 * @param account
 * @return
 * @throws UnsupportedEncodingException
 */
@RequestMapping("/listAccount")
@ResponseBody
public  List<Account> list(String account,HttpServletResponse res) throws UnsupportedEncodingException{
	res.setHeader("Access-Control-Allow-Origin", "*");
	if(account == null){
		return null;
	}else{
	account = URLDecoder.decode(account,"UTF-8");
	List<Account> list = accountService.list(account);
	return list;
	}	
}
@RequestMapping("/listAccount1")
@ResponseBody
public List<Map<String,Object>> list1(String id,String account,HttpServletResponse res) throws UnsupportedEncodingException{
	res.setHeader("Access-Control-Allow-Origin", "*");
	account = URLDecoder.decode(account,"UTF-8");
	List<Map<String,Object>> list = accountService.list1(id, account);
	return list;
}

/**
 * 账户列表页面
 * @return
 */
@Auth(isAdmin=true)
@RequestMapping("list")
 public ModelAndView listaccount(HttpServletRequest req){
	ModelAndView m=new ModelAndView("account/listAccount");
	HttpSession session=req.getSession();
	String username=(String) session.getAttribute("username");
//	m.addObject(attributeName, attributeValue)
    m.addObject("loginAccount", username);
    m.addObject("auth", sendPlanService.getAuth(username));
	return m; 
 }

/**
 * 删除账号(逻辑删除)
 */
@RequestMapping("delete")
@ResponseBody
public int delete(String id,String userid,HttpServletResponse res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	int d = accountService.delete(id,userid);
	return d;
}

/**
 * 删除账户信息
 * @param id
 * @return
 */
@RequestMapping("del")
@ResponseBody
public boolean del(String id,HttpServletResponse res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	boolean b = accountService.del(id);
	return b;
}

/**
 * 修改账户
 * @param account
 * @param password
 * @param id
 * @return
 */
@RequestMapping("edit")
@ResponseBody
public Account updateaccount(String account,String password,String id,HttpServletResponse res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	return accountService.updateaccount(account, password, id);
}

/**
 * 添加修改账户
 * @param account
 * @param password
 * @param id
 * @return
 * @throws JSONException 
 */
@RequestMapping("saveInfo")
@ResponseBody
public Account saveInfo(String info,HttpServletResponse res) throws JSONException{
	res.setHeader("Access-Control-Allow-Origin", "*");
	return accountService.saveInfo(info);
}

/*@RequestMapping("time")
@ResponseBody
public boolean updatetime(String id,Date updateTime){
	return accountService.updatetime(id, updateTime);
	
}*/
/**
 * 根据id查询账户信息
 * @param id
 * @return
 */
@RequestMapping("get")
@ResponseBody
public List<Map<String,Object>> getAccountById(String id,HttpServletResponse res){
		res.setHeader("Access-Control-Allow-Origin", "*");
		List<Map<String,Object>> account = accountService.getAccountUserDeptById(id);
		return account;
		
	}
/**
 * 重置密码 
 * @param id
 * @param password
 * @return
 */
@RequestMapping("upda")
@ResponseBody
public int update(String id,HttpServletResponse res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	return accountService.update(id);
	
}

/**
 * 修改权限
 * 
 * @param id
 * @param authority
 * @param res
 * @return
 */
@RequestMapping("updateAuthority")
@ResponseBody
public boolean addAuthority(String accountId,String authority,HttpServletResponse res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	return accountService.upadteAuthoruty(accountId, authority);
}

}
