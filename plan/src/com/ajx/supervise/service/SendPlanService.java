package com.ajx.supervise.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.ajx.supervise.dao.SendPlanDao;
import com.ajx.supervise.pojo.PlanInformation;

@Service
public class SendPlanService {
@Resource
public SendPlanDao sendPlanDao;
	public List<Map<String,Object>> getPlan(String title,String loginname,String mtype){
		return sendPlanDao.grtPlanEx(title,loginname,mtype);
	}
	public PlanInformation getPlanById(String id){
		return sendPlanDao.getPlanById(id);
	}
	public String getAuth(String account){
		String auth="";
		String sql="select authority from account where account =? and delete_tag=1";
		List<Map<String,Object>> list=null;
		list=sendPlanDao.getListBySql(sql,new String []{account});
		if(list.size()>0){
			auth=(String) list.get(0).get("authority");
		}
		return auth;
	}
	
	public boolean plSendPlan(String id,String jsonStr,String username,String send,String mtype) throws JSONException, ParseException{
		JSONObject item = new JSONObject(jsonStr);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date=new Date();
		PlanInformation plan11=null;
		boolean flag=false;
		PlanInformation plan1=getPlanById(id);
		if(plan1!=null&&item.getString("plworkUnit").indexOf("|")>0){
			String[] arr=item.getString("plworkUnit").split("\\|");
			sendPlanDao.deletePlan(id);
			for(String unit : arr){
				    PlanInformation plan=new PlanInformation();
				    plan.setId(null);
					plan.setCreateTime(plan1.getCreateTime());
					plan.setUpdateTime(date);
					plan.setTitle(plan1.getTitle());
					plan.setMeetingContent(plan1.getMeetingContent());
					if(!item.getString("plplanTime").isEmpty()){
						plan.setPlanTime(sdf.parse(item.getString("plplanTime")));
					}
					plan.setContent(plan1.getContent());
					plan.setCreatePerson(username);
					plan.setWorkUnit(unit);
					plan.setWorkPerson(item.getString("plworkPerson"));
					plan.setJointly(item.getString("pljointly"));
					plan.setCoOrganizer(item.getString("plcoOrganizer"));
					plan.setMtype(mtype);
					if("2".equals(send)){
						plan.setStatus(3);
						plan.setSendStatus("2");
						plan.setNotdue("未到期");
					}
					sendPlanDao.addByEntity(plan);
					plan11=plan;
					flag=true;
			}
		}else{
			PlanInformation plan=getPlanById(id);
			if(plan!=null){  
				if(!item.getString("plplanTime").isEmpty()){
					plan.setPlanTime(sdf.parse(item.getString("plplanTime")));
				}
				plan.setWorkUnit(item.getString("plworkUnit"));
				plan.setWorkPerson(item.getString("plworkPerson"));
				plan.setJointly(item.getString("pljointly"));
				plan.setCoOrganizer(item.getString("plcoOrganizer"));
				plan.setMtype(mtype);
				if("2".equals(send)){
					plan.setStatus(3);
					plan.setSendStatus("2");
					plan.setNotdue("未到期");
				}
				sendPlanDao.updateByEntity(plan);
			}
			plan11=plan;
			flag=true;
		}
		return flag;
	}
	
	public PlanInformation saveSendPlan(String jsonStr,String username,String send,String mtype) throws JSONException, ParseException{
		JSONObject item = new JSONObject(jsonStr);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date=new Date();
		PlanInformation plan11=null;
		if(item.getString("id").isEmpty()){
			if(item.getString("workUnit").indexOf("|")>0){
				String[] arr=item.getString("workUnit").split("\\|");
				for(String unit : arr){
					PlanInformation plan=new PlanInformation();
					plan.setId(null);
					plan.setCreateTime(sdf.parse(item.getString("createTime")));
					plan.setUpdateTime(date);
					plan.setTitle(item.getString("title"));
					plan.setMeetingContent(item.getInt("meetingContent"));
					if(!item.getString("planTime").isEmpty()){
						plan.setPlanTime(sdf.parse(item.getString("planTime")));
					}
					plan.setContent(item.getString("content"));
					plan.setCreatePerson(username);
					plan.setWorkUnit(unit);
					plan.setWorkPerson(item.getString("workPerson"));
					plan.setJointly(item.getString("jointly"));
					plan.setCoOrganizer(item.getString("coOrganizer"));
					plan.setMtype(mtype);
					if("2".equals(send)){
						plan.setStatus(3);
						plan.setSendStatus("2");
						plan.setNotdue("未到期");
					}else{
						plan.setSendStatus("1");
					}
					sendPlanDao.saveSendPlan(plan);
					plan11=plan;
				}
			}else{
				PlanInformation plan=new PlanInformation();
				plan.setId(null);
				plan.setCreateTime(sdf.parse(item.getString("createTime")));
				plan.setUpdateTime(date);
				plan.setTitle(item.getString("title"));
				plan.setMeetingContent(item.getInt("meetingContent"));
				if(!item.getString("planTime").isEmpty()){
					plan.setPlanTime(sdf.parse(item.getString("planTime")));
				}
				plan.setContent(item.getString("content"));
				plan.setCreatePerson(username);
				plan.setWorkUnit(item.getString("workUnit"));
				plan.setWorkPerson(item.getString("workPerson"));
				plan.setJointly(item.getString("jointly"));
				plan.setCoOrganizer(item.getString("coOrganizer"));
				plan.setMtype(mtype);
				if("2".equals(send)){
					plan.setStatus(3);
					plan.setSendStatus("2");
					plan.setNotdue("未到期");
				}else{
					plan.setSendStatus("1");
				}
				sendPlanDao.saveSendPlan(plan);
				plan11=plan;
			}
			
		}else{
			if(item.getString("workUnit").indexOf("|")>0){
				String[] arr=item.getString("workUnit").split("\\|");
				for(String unit : arr){
					sendPlanDao.deletePlan(item.getString("id"));
					PlanInformation plan=new PlanInformation();
						plan.setContent(item.getString("content"));
						plan.setUpdateTime(date);
						plan.setTitle(item.getString("title"));
						if(!item.getString("planTime").isEmpty()){
							plan.setPlanTime(sdf.parse(item.getString("planTime")));
						}
						plan.setMeetingContent(item.getInt("meetingContent"));
						plan.setWorkUnit(unit);
						plan.setWorkPerson(item.getString("workPerson"));
						plan.setJointly(item.getString("jointly"));
						plan.setCoOrganizer(item.getString("coOrganizer"));
						plan.setMtype(mtype);
						if("2".equals(send)){
							plan.setStatus(3);
							plan.setSendStatus("2");
							plan.setNotdue("未到期");
						}
						sendPlanDao.updateByEntity(plan);
						plan11=plan;
				}
			}else{
				PlanInformation plan=getPlanById(item.getString("id"));
				if(plan!=null){
					plan.setContent(item.getString("content"));
					plan.setUpdateTime(date);
					plan.setTitle(item.getString("title"));
					if(!item.getString("planTime").isEmpty()){
						plan.setPlanTime(sdf.parse(item.getString("planTime")));
					}
					plan.setMeetingContent(item.getInt("meetingContent"));
					plan.setWorkUnit(item.getString("workUnit"));
					plan.setWorkPerson(item.getString("workPerson"));
					plan.setJointly(item.getString("jointly"));
					plan.setCoOrganizer(item.getString("coOrganizer"));
					plan.setMtype(mtype);
					if("2".equals(send)){
						plan.setStatus(3);
						plan.setSendStatus("2");
						plan.setNotdue("未到期");
					}
					sendPlanDao.updateByEntity(plan);
				}
				plan11=plan;
			}
		}
		return plan11;
	}
	
	public PlanInformation sendPlan(String id,String workUnit,String workPerson){
		PlanInformation plan=sendPlanDao.getPlanById(id);
		if(plan!=null){
			plan.setWorkPerson(workPerson);
			plan.setWorkUnit(workUnit);
			plan.setSendStatus("2");
			sendPlanDao.updateByEntity(plan);
		}
		return plan;
	}
	
	public boolean deletePlan(String id){
		return sendPlanDao.deletePlan(id);
	}
}
