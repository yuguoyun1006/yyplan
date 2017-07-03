package com.ajx.supervise.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.hibernate.sql.DecodeCaseFragment;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.ajx.supervise.pojo.Auth;
import com.ajx.supervise.pojo.PlanInformation;
import com.ajx.supervise.pojo.PlanLx;
import com.ajx.supervise.service.MyPlanService;
import com.ajx.supervise.service.SendPlanService;

@Controller
@RequestMapping("plan")
public class MyPlanController {
	@Resource
	public MyPlanService myPlanService;
	@Resource 
	public SendPlanService sendPlanService;
	/**
	 * 任务列表
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping("planlist")
	@ResponseBody
	public List<Map<String,Object>> getMyPlan(HttpServletRequest req,String title,String status,String mtype) throws UnsupportedEncodingException{
		if(title == ""||title == null){
			title = "";
		}
		title = URLDecoder.decode(title, "UTF-8");
		if(status == ""||status == null){
			status = "";
		}
		status = URLDecoder.decode(status, "UTF-8");
		List<Map<String,Object>> list = myPlanService.getMyPlan(req,title,status,mtype);
		return list;
	}
	
	/**
	 *会议期数树
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping("getCount")
	@ResponseBody
	public List<Map<String,Object>> getCount(HttpServletRequest req,String year){
		List<Map<String,Object>> list=myPlanService.getCount(year);
		req.getSession().setAttribute("nowCount", list.get(list.size()-1).get("countName"));
		return list;
	}
	
	/**
	 * 我的任务信息*/
	@RequestMapping("myPlans")
	@ResponseBody
	public Map<String,List> myPlans(HttpServletRequest req){
		return myPlanService.myPlans(req);
	}
	
	/**
	 * 我的任务页面
	 */
	@Auth(isBushi=true)
	@RequestMapping("myplan1")
	public ModelAndView myPlan1(HttpServletRequest req){
		ModelAndView m=new ModelAndView("myplan/listMyPlan");
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
		m.addObject("mtype", 1);
//		m.addObject(attributeName, attributeValue)
	    m.addObject("loginAccount", username);
	    m.addObject("auth", sendPlanService.getAuth(username));
		return m;
	}
	
	/**
	 * 我的任务页面
	 */
	@Auth(isBushi=true)
	@RequestMapping("myplan2")
	public ModelAndView myPlan2(HttpServletRequest req){
		ModelAndView m=new ModelAndView("myplan/listMyPlan");
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
		m.addObject("mtype",2);
//		m.addObject(attributeName, attributeValue)
	    m.addObject("loginAccount", username);
	    m.addObject("auth", sendPlanService.getAuth(username));
		return m;
	}
	/**
	 * 我的任务页面
	 */
	@Auth(isBushi=true)
	@RequestMapping("myplan3")
	public ModelAndView myPlan3(HttpServletRequest req){
		ModelAndView m=new ModelAndView("myplan/listMyPlan");
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
		m.addObject("mtype", 3);
//		m.addObject(attributeName, attributeValue)
	    m.addObject("loginAccount", username);
	    m.addObject("auth", sendPlanService.getAuth(username));
		return m;
	}
	/**
	 * 任务类型管理页面
	 */
	@Auth(isLdlh=true,isLshy=true,isScxt=true)
	@RequestMapping("planLX")
	public ModelAndView planLX(HttpServletRequest req){
		ModelAndView m=new ModelAndView("myplan/planLX");
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
//		m.addObject(attributeName, attributeValue)
	    m.addObject("loginAccount", username);
	    m.addObject("auth", sendPlanService.getAuth(username));
		return m;
	}
	
	
	/**
	 * 跳转到任务迟报统计页面
	 * */
	@RequestMapping("goFeeBackStatics")
	public ModelAndView goFeeBackStatics(HttpServletRequest req){
		ModelAndView m=new ModelAndView("/myplan/feeBackStatics");
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
		String auth=sendPlanService.getAuth(username);
		if("11".equals(auth)){
			  m.addObject("mtype", 2);
		}else if("12".equals(auth)){
			  m.addObject("mtype", 3);
		}else if("3".equals(auth)){
			  m.addObject("mtype", 1);
		}
//		m.addObject(attributeName, attributeValue)
	    m.addObject("loginAccount", username);
	    m.addObject("auth", sendPlanService.getAuth(username));
		return m;
	}
	
	/**
	 * 统计迟报信息
	 * @throws UnsupportedEncodingException 
	 * @throws ParseException 
	 * */
	@RequestMapping("staticFee")
	@ResponseBody
	public List<Map<String,Object>> staticFee(String param) throws UnsupportedEncodingException, ParseException{
		param=URLDecoder.decode(param, "utf-8");
		return myPlanService.staticFee(param);
	}
	
	/**
	 * 任务类型信息
	 */
	@RequestMapping("lxList")
	@ResponseBody
	public List<Map<String,Object>> lxList(HttpServletRequest req){
		return myPlanService.lxList();
	}
	
	
	
	/**
	 * 查询当前登录用户
	 */
	public String getLoginUser(HttpServletRequest req){
		HttpSession session = req.getSession();
		String username = (String) session.getAttribute("username");
		return username;
	}
	
	/**
	 * 根据id查询任务
	 */
	@RequestMapping("get")
	@ResponseBody
	public PlanInformation getPlanById(String id){
		PlanInformation pif = myPlanService.getPlanById(id);
		return pif;
	}
	
	/**
	 * 根据id查询任务
	 */
	@RequestMapping("getPlanEx")
	@ResponseBody
	public List<Map<String, Object>> getPlanEx(String id){
		return myPlanService.getPlanEx(id);
	}
	
	/**
	 * 编辑
	 * @throws ParseException 
	 * @throws JSONException 
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping("save")
	@ResponseBody
	public boolean save(String plan,HttpServletRequest req) throws ParseException, JSONException, UnsupportedEncodingException{
		req.setCharacterEncoding("utf-8");
		boolean b = myPlanService.update(plan);
		return b;
	}
	/**
	 * 所有任务页面
	 */
	@Auth(isLdlh=true,isLeader=true,isLshy=true,isScxt=true)
	@RequestMapping("allplanlist")
	public ModelAndView allPlan(HttpServletRequest req){
		ModelAndView m=new ModelAndView("myplan/allPlan");
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
		String auth=sendPlanService.getAuth(username);
		if("11".equals(auth)){
			  m.addObject("mtype", 2);
		}else if("12".equals(auth)){
			  m.addObject("mtype", 3);
		}else if("3".equals(auth)){
			  m.addObject("mtype", 1);
		}
//		m.addObject(attributeName, attributeValue)
	    m.addObject("loginAccount", username);
	    m.addObject("auth", sendPlanService.getAuth(username));
		return m;
	}
	/**
	 * 查询所有任务
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping("allPlan")
	@ResponseBody
	public List<Map<String, Object>> getAllPlan(String meetingContent,String title,String status,HttpServletRequest req,String mtype) throws UnsupportedEncodingException{
		if(title == ""||title == null){
			title = "";
		}
		title = URLDecoder.decode(title, "UTF-8");
		return myPlanService.getAllPlan(meetingContent,title,status,req,mtype);
	}
	
	/**
	 *删除任务类型*/
	@RequestMapping("deleteLX")
	@ResponseBody
	public boolean deleteLX(String id){
		return myPlanService.deleteLX(id);
	}
	/**
	 * 根据id获取任务类型*/
    @RequestMapping("getLXById")
    @ResponseBody
    public PlanLx getLXById(String id){
    	return myPlanService.getLXById(id);
    }
	/**
	 * 保存类型
	 * @throws IOException 
	 * @throws JsonMappingException 
	 * @throws JsonParseException */
	@RequestMapping("saveLX")
	@ResponseBody
	public PlanLx saveLX(String itemStr) throws JsonParseException, JsonMappingException, IOException{
		 ObjectMapper objectMapper = new ObjectMapper();
		PlanLx item=objectMapper.readValue(itemStr, PlanLx.class);
		return myPlanService.saveLX(item);
	}
	@Auth(isLdlh=true,isLeader=true)
	@RequestMapping("statis1")
	public String statis1(Model model,HttpServletRequest req,String start,String end,String meeting_content,String dept){
//		List<Map<String, Object>> list = myPlanService.TaskStatistics(start,end,meeting_content,dept,mtype);
//		model.addAttribute("plan", list);
		model.addAttribute("mtype", 1);
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
//		m.addObject(attributeName, attributeValue)
		model.addAttribute("loginAccount", username);
		model.addAttribute("auth", sendPlanService.getAuth(username));
		return "myplan/planstts";
	}
	@Auth(isLeader=true,isScxt=true)
	@RequestMapping("statis2")
	public String statis2(Model model,HttpServletRequest req,String start,String end,String meeting_content,String dept){
//		List<Map<String, Object>> list = myPlanService.TaskStatistics(start,end,meeting_content,dept,mtype);
//		model.addAttribute("plan", list);
		model.addAttribute("mtype", 2);
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
//		m.addObject(attributeName, attributeValue)
		model.addAttribute("loginAccount", username);
		model.addAttribute("auth", sendPlanService.getAuth(username));
		return "myplan/planstts";
	}
	@Auth(isLeader=true,isLshy=true)
	@RequestMapping("statis3")
	public String statis3(Model model,HttpServletRequest req,String start,String end,String meeting_content,String dept){
//		List<Map<String, Object>> list = myPlanService.TaskStatistics(start,end,meeting_content,dept,mtype);
//		model.addAttribute("plan", list);
		model.addAttribute("mtype", 3);
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
//		m.addObject(attributeName, attributeValue)
		model.addAttribute("loginAccount", username);
		model.addAttribute("auth", sendPlanService.getAuth(username));
		return "myplan/planstts";
	}
//	@RequestMapping("planstatis")
//	@ResponseBody
//	public List<Map<String, Object>> planstatis(String start,String end){
//		List<Map<String, Object>> list = myPlanService.statis(start,end);
//		return list;
//	}
	@RequestMapping("queryPlan")
	@ResponseBody
	public List<Map<String, Object>> all(String status){
		List<Map<String, Object>> list = myPlanService.all(status);
		return list;
	}
	@RequestMapping("record")
	@ResponseBody
	public List<Map<String,Object>> feedbackRecord(String planId){
		List<Map<String, Object>> list = myPlanService.feedbackRecord(planId);
		return list;
	}
	@RequestMapping("remark")
	@ResponseBody
	public List<Map<String,Object>> remark(String id){
		List<Map<String, Object>> list = myPlanService.remark(id);
		return list;
	}
	@RequestMapping("task")
	@ResponseBody
	public List<Map<String,Object>> getTaskByStatus(String status,String start,String end) throws UnsupportedEncodingException{
		List<Map<String,Object>> list = myPlanService.getTaskByStatus(status,start,end);
		return list;
	}
	@RequestMapping("taskStatistics")
	@ResponseBody
	public List<Map<String,Object>> TaskStatistics(String start,String end,String meeting_content,String dept,String mtype) throws UnsupportedEncodingException{
		if(dept == ""||dept == null){
			dept = "";
		}
		dept = URLDecoder.decode(dept, "UTF-8");
		meeting_content=URLDecoder.decode(meeting_content, "UTF-8");
		List<Map<String,Object>> list = myPlanService.TaskStatistics(start, end, meeting_content, dept,mtype);
		return list;
	}
	@RequestMapping("detail")
	@ResponseBody
	public List<Map<String,Object>> TaskDetail(String start,String end,String status,String dept,String meeting_content) throws UnsupportedEncodingException{
		if(dept == ""||dept == null){
			dept = "";
		}
		dept = URLDecoder.decode(dept, "UTF-8");
		List<Map<String,Object>> list= myPlanService.TaskDetail(start, end, status, dept,meeting_content);
		return list;
	}
	@RequestMapping("mtype")
	public String meetingType(){
		return "myplan/meeting_type";
	}
}
