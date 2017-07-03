package com.ajx.supervise.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ajx.supervise.pojo.Department;
import com.ajx.supervise.pojo.PlanInformation;
import com.ajx.supervise.utils.BaseDao;

@Repository
public class SendPlanDao extends BaseDao{

	public List<PlanInformation> getPlan(String title){
		String hql="from PlanInformation ";
		List<PlanInformation> list=null;
		if(title!=null&&!title.isEmpty()){
			hql+=" where title like ?";
			list=queryListTableByHql(hql,new String []{"%"+title+"%"});
		}else{
			list=queryListTableByHql(hql,null);
		}
		return list;
	}
	public List<Map<String,Object>> grtPlanEx(String title,String loginname,String mtype){
		String sql="";
		List<Map<String,Object>> list;
		if(title==null||title==""){
		sql = "select * from plan_dept_user where mtype ="+mtype;
		list = getListBySql(sql,null);
		}else{
		sql = "select * from plan_dept_user where title like ? and mtype = "+mtype;
		list = getListBySql(sql, new String[]{"%"+title+"%"});
		}
		
		return list;
	}
	
	public PlanInformation getPlanById(String id){
		PlanInformation plan=null;
		if(id!=null&&!id.isEmpty()){
			plan=(PlanInformation)getEntityById(PlanInformation.class,id);
		}
		return plan;
	}
	
	public void saveSendPlan(PlanInformation item){
		addByEntity(item);
	}
	public boolean deletePlan(String id){
		return deleteById(PlanInformation.class,id);
	}
}
