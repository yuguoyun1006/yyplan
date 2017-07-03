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

import org.apache.commons.lang3.StringUtils;
import org.json.JSONException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ajx.supervise.pojo.Auth;
import com.ajx.supervise.pojo.PlanInformation;
import com.ajx.supervise.service.SendPlanService;

@Controller
@RequestMapping("sendPlanController")
public class SendPlanController {
	String mtype = "";
	@Resource
	public SendPlanService sendPlanService;

	@Auth(isLdlh=true,isLeader=true,isLshy=true,isScxt=true)
	@RequestMapping(value = "list/{mtype}")
	public ModelAndView listPlan(@PathVariable("mtype") String mtype,
			HttpServletRequest req) {
		this.mtype = mtype;
		ModelAndView m = new ModelAndView("/sendPlan/listPlan");
		HttpSession session = req.getSession();
		session.setAttribute("type", mtype);
		String username = (String) session.getAttribute("username");
		// m.addObject(attributeName, attributeValue)
		m.addObject("loginAccount", username);
		m.addObject("auth", sendPlanService.getAuth(username));
		return m;
	}

	@RequestMapping("getPlan")
	@ResponseBody
	public List<Map<String, Object>> getPlan(String title,
			HttpServletResponse res, HttpServletRequest req)
			throws UnsupportedEncodingException {
		res.setHeader("Access-Control-Allow-Origin", "*");
		title = URLDecoder.decode(title, "UTF-8");
		HttpSession session = req.getSession();
		String username = (String) session.getAttribute("username");
		return sendPlanService.getPlan(title, username,mtype);
	}

	@RequestMapping("saveSendPlan")
	@ResponseBody
	public PlanInformation saveSendPlan(String itemStr, String send,
			HttpServletResponse res, HttpServletRequest req)
			throws JSONException, ParseException {
		res.setHeader("Access-Control-Allow-Origin", "*");
		HttpSession session = req.getSession();
		String username = (String) session.getAttribute("username");
		return sendPlanService.saveSendPlan(itemStr, username, send,mtype);
	}

	/*批量分发
	 * **/
	@RequestMapping("plSendPlan")
	@ResponseBody
	public boolean plSendPlan(String plids,String jsonStr,String send,String type,HttpServletResponse res, HttpServletRequest req) throws UnsupportedEncodingException, JSONException, ParseException{
		boolean flag=false;
		res.setHeader("Access-Control-Allow-Origin", "*");
		HttpSession session = req.getSession();
		String username = (String) session.getAttribute("username");
		jsonStr=URLDecoder.decode(jsonStr, "utf-8");
	    String[] lis=plids.split(",");
	    for(String id:lis){
	    	flag=sendPlanService.plSendPlan(id,jsonStr, username, send, type);
	    }
		return flag;
	}
	
	@RequestMapping("getPlanById")
	@ResponseBody
	public PlanInformation getPlanById(String id) {
		return sendPlanService.getPlanById(id);
	}

	@RequestMapping("deletePlan")
	@ResponseBody
	public boolean deletePlan(String id) {
		return sendPlanService.deletePlan(id);
	}

	@RequestMapping("sendPlan")
	@ResponseBody
	public PlanInformation sendPlan(String id, String workUnit,
			String workPerson) {
		return sendPlanService.sendPlan(id, workUnit, workPerson);
	}
}
