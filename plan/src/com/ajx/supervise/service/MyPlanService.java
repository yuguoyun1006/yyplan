package com.ajx.supervise.service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.ajx.supervise.dao.MyPlanDao;
import com.ajx.supervise.pojo.PlanInformation;
import com.ajx.supervise.pojo.PlanLx;

@Service
public class MyPlanService {
	@Resource
	public MyPlanDao myPlanDao;

	public List<Map<String, Object>> getMyPlan(HttpServletRequest req, String title,
			String status,String mtype) {
		return myPlanDao.getMyPlan(req, title, status,mtype);
	}

	
	public List<Map<String,Object>> getCount(String year){
		return myPlanDao.getCount(year);
	}
	
	
	public Map<String,List> myPlans(HttpServletRequest req){
		return myPlanDao.myPlans(req);
	}
	
	public PlanInformation getPlanById(String id) {
		return myPlanDao.getPlanById(id);
	}

   public List<Map<String,Object>> staticFee(String param) throws ParseException{
	   return myPlanDao.staticFee(param);
   }
	
	public List<Map<String,Object>> lxList(){
		return myPlanDao.lxList();
	}
	
	public boolean update(String planS) throws JSONException, ParseException, UnsupportedEncodingException {
		JSONObject json = new JSONObject(planS);
		PlanInformation plan = getPlanById(json.getString("id"));
//		plan.setId(json.getString("id"));
		Date nowDate=new Date();
		if(plan.getFeebackStatus()==null||plan.getFeebackStatus().isEmpty()){
		       Calendar cal=Calendar.getInstance();
		      int flag=7-cal.get(Calendar.DAY_OF_WEEK);
		      cal.add(Calendar.DATE,flag+1);
//		       cal.set(GregorianCalendar.DAY_OF_WEEK, Calendar.SUNDAY); 
		       cal.set(Calendar.HOUR_OF_DAY, 20);
		       cal.set(Calendar.MINUTE, 0);
		       cal.set(Calendar.SECOND, 0);
		       Date date=cal.getTime();
		       if("1".equals(plan.getMtype())&&nowDate.after(date)){
		    	   plan.setFeebackStatus("迟报");
		       }else if("1".equals(plan.getMtype())){
		    	   plan.setFeebackStatus("准时报");
		       }else{
		    	   plan.setFeebackStatus("已反馈");
		       }
		}
		String status;
		String t = URLDecoder.decode(json.getString("status"),"UTF-8");
		if(StringUtils.isEmpty(t)){
			status = "";
		}else{
			status = json.getString("status");
		}
		String remark = URLDecoder.decode(json.getString("remark"), "UTF-8");
		String ftime = json.getString("finishTime");
		String planTime=json.getString("planTime");
		plan.setRemark(remark); 
		plan.setFeedbackPeople(URLDecoder.decode(json.getString("feedbackPeople"),"UTF-8"));
		return myPlanDao.update(plan,ftime,status,planTime);
	}

	public boolean deleteLX(String id) {
		return myPlanDao.deleteLX(id);
	}
	
	public PlanLx saveLX(PlanLx item){
		Date date=new Date();
		if(item==null){
			return null;
		}
		if(item.getId()==null||item.getId().isEmpty()){
			item.setId(null);
			item.setCreateTime(date);
			item.setUpdateTime(date);
			myPlanDao.addByEntity(item);
			return item;
		}else{
			PlanLx item1=getLXById(item.getId());
			item1.setLxName(item.getLxName());
			item1.setRemark(item.getRemark());
			item1.setUpdateTime(date);
			myPlanDao.updateByEntity(item1);
			return item1;
		}
	}
	
	public PlanLx getLXById(String id){
		return myPlanDao.getLXById(id);
	}
	
	public List<Map<String, Object>> getPlanEx(String id){
		return myPlanDao.getPlanEx(id);
	}
	
	public List<Map<String, Object>> getAllPlan(String meetingContent,String title, String status,HttpServletRequest req,String mtype) {
		return myPlanDao.getAllPlan(meetingContent,title, status,req,mtype);
	}
	public List<Map<String, Object>> statis(String start,String end){
		return myPlanDao.statistics(start,end);
	}
	public List<Map<String, Object>> all(String status){
		return myPlanDao.all(status);
	}
	public List<Map<String,Object>> feedbackRecord(String planId){
		return myPlanDao.feedbackRecord(planId);
	}
	public List<Map<String,Object>> remark(String id){
		return myPlanDao.remark(id);
	}
	public List<Map<String,Object>> getTaskByStatus(String status,String start,String end){
		return myPlanDao.getTaskByStatus(status,start,end);
	}
	public List<Map<String,Object>> TaskStatistics(String start,String end,String meeting_content,String dept,String mtype){
		return myPlanDao.taskStatistics(start, end, meeting_content, dept,mtype);
	}
	public List<Map<String,Object>> TaskDetail(String start,String end,String status,String dept,String meeting_content){
		return myPlanDao.TaskDetail(start, end, status, dept,meeting_content);
	}
}		
