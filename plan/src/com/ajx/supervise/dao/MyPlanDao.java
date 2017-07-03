package com.ajx.supervise.dao;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import com.ajx.supervise.pojo.PlanInformation;
import com.ajx.supervise.pojo.PlanLx;
import com.ajx.supervise.utils.BaseDao;

@Repository
public class MyPlanDao extends BaseDao {
	public Map<String, Object> sqlsMap;

	@Resource
	public void setSqlsMap(Map<String, Object> sqlsMap) {
		this.sqlsMap = sqlsMap;
	}
	
	
	public List<Map<String,Object>> getCount(String year){
		if(StringUtils.isEmpty(year)){
			String sql="select distinct CONCAT('第',t.meeting_content,'期',' ',t.create_time) as countName from plan_information t where t.send_status=2 and t.meeting_content is not null and (t.mtype =1 or t.mtype =2) order by t.create_time,t.meeting_content asc";
			return getListBySql(sql, null);
		}else{
			String sql="select distinct CONCAT('第',t.meeting_content,'期',' ',t.create_time) as countName from plan_information t where t.send_status=2 and t.meeting_content is not null and year(create_time)=? and (t.mtype =1 or t.mtype =2) order by t.create_time,t.meeting_content asc";
			return getListBySql(sql, new String[]{year});
		}
	}

	public PlanLx getLXById(String id) {
		if (id.isEmpty()) {
			return null;
		} else {
			PlanLx lx = (PlanLx) getEntityById(PlanLx.class, id);
			return lx;
		}
	}
	
	public Map<String,List> myPlans(HttpServletRequest req){
		String dept=getDeptId(req).get(0)+"";
		String sql1="select t.id as id,t.mtype as type,t.create_time as time,t.meeting_content as count from plan_dept_user t where (t.notdue='未到期' or t.expire='到期' or t.continued='持续' or t.plan_time is null) and t.mtype=1 and t.work_unit=?";
		String sql2="select t.id as id,t.mtype as type,t.create_time as time,t.meeting_content as count from plan_dept_user t where (t.notdue='未到期' or t.expire='到期' or t.continued='持续' or t.plan_time is null) and t.mtype=2 and t.work_unit=?";
		String sql3="select t.id as id,t.mtype as type,t.create_time as time,t.meeting_content as count from plan_dept_user t where (t.notdue='未到期' or t.expire='到期' or t.continued='持续' or t.plan_time is null) and t.mtype=3 and t.work_unit=?";
		List<Map<String, Object>> list1=null;
		List<Map<String, Object>> list2=null;
		List<Map<String, Object>> list3=null;
		list1=getListBySql(sql1, new String[]{dept});
		list2=getListBySql(sql2, new String[]{dept});
		list3=getListBySql(sql3, new String[]{dept});
		Map<String,List> map=new HashMap<String, List>();
		map.put("mtype1", list1);
		map.put("mtype2", list2);
		map.put("mtype3", list3);
		return map;
	} 
	
	// 我的任务
	public List<Map<String, Object>> getMyPlan(HttpServletRequest req, String title,
			String status,String mtype) {
		String deptid=getDeptId(req).get(0)+"";
		StringBuffer sb = new StringBuffer(
				"select * from plan_dept_user where work_unit = ? and mtype='"+mtype+"' and send_status = 2 ");//and status in (0,3,4,5) 
		List<Map<String, Object>> list = null;
		if (StringUtils.isEmpty(status)) {
			status = "";
		}
		switch (status) {
		case "按期":
			if (title == "" || title == null) {
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid });
				} else {
					sb.append(" and ontime = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							status });
				}
			} else {
				sb.append(" and content like ?");
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%" });
				} else {
					sb.append(" and ontime = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%", status });
				}
			}
			break;
		case "超期":
			if (title == "" || title == null) {
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid });
				} else {
					sb.append(" and overdue = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							status });
				}
			} else {
				sb.append(" and content like ?");
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%" });
				} else {
					sb.append(" and overdue = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%", status });
				}
			}
			break;
		case "未到期":
			if (title == "" || title == null) {
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid });
				} else {
					sb.append(" and notdue = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							status });
				}
			} else {
				sb.append(" and content like ?");
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%" });
				} else {
					sb.append(" and notdue = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%", status });
				}
			}
			break;
		case "到期":
			if (title == "" || title == null) {
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid });
				} else {
					sb.append(" and expire = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							status });
				}
			} else {
				sb.append(" and content like ?");
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%" });
				} else {
					sb.append(" and expire = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%", status });
				}
			}
			break;
		case "持续":
			if (title == "" || title == null) {
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid });
				} else {
					sb.append(" and (continued = ? or plan_time is null)");
					list = getListBySql(sb.toString(), new String[] { deptid,
							status });
				}
			} else {
				sb.append(" and content like ? or plan_time is null");
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%" });
				} else {
					sb.append(" and continued = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%", status });
				}
			}
			break;
		case "终止":
			if (title == "" || title == null) {
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid });
				} else {
					sb.append(" and stop = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							status });
				}
			} else {
				sb.append(" and content like ?");
				if (status == "" || status == null) {
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%" });
				} else {
					sb.append(" and stop = ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%", status });
				}
			}
			break;

		default:
			if (title == "" || title == null) {
					list = getListBySql(sb.toString(), new String[] { deptid });
			} else {
				sb.append(" and content like ?");
					list = getListBySql(sb.toString(), new String[] { deptid,
							"%" + title + "%" });
			}
			break;
		}

		return list;
	}

	public List<Map<String,Object>> staticFee(String param) throws ParseException{
		int flag=param.lastIndexOf(" ");
	//	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd ");
		String time=param.substring(flag).trim();
		String timearr[]=time.split("\\-"); 
		String year=timearr[0];
		String month=Integer.parseInt(timearr[1])+"";
		//String day=Integer.parseInt(timearr[2])+"";
	//	Date date=sdf.parse(time);
		String startMonth="6";
		String endMonth="13";
		if(Integer.parseInt(month)>0&&Integer.parseInt(month)<7){
			startMonth="0";
			endMonth="7";
		}
		String sql="select t.work_unit,t.dept_name,sum(case when t.countName ='"+param+"' and t.feeback_status='迟报' then 1 else 0 end ) as mount,"+
"sum(case when month(t.create_time)="+month+" and t.feeback_status='迟报' then 1 else 0 end )as month_count,"+
"sum(case when (month(t.create_time)>"+startMonth+" and month(t.create_time)<"+endMonth+" and year(t.create_time)="+year+" and t.feeback_status='迟报') then 1 else 0 end)as jd_count,"+
"sum(case when (year(t.create_time)="+year+" and t.feeback_status='迟报') then 1 else 0 end)as year_count from plan_dept_user t  GROUP BY work_unit";
		List<Map<String,Object>> list=getListBySql(sql,null);
		return list;
	}
	
	public PlanInformation getPlanById(String id) {
		return (PlanInformation) getEntityById(PlanInformation.class, id);
	}
	public boolean deleteLX(String id) {
		boolean flag=deleteById(PlanLx.class,id);
		return flag;
	}
	
	public List<Map<String,Object>> lxList(){
		List<Map<String,Object>> list=null;
		String sql="select * from plan_lx";
		list=getListBySql(sql, null);
		return list;
	}
	
	public List<Map<String, Object>> getPlanEx(String id){
		String sql="select * from plan_dept_user where id=?";
		return getListBySql(sql,new String[]{id});
	}
	
	
	public List<Map<String, Object>> getPlanByDeptId(String id) {
		List<Map<String, Object>> list;
		String sql = "select * from plan_information where FIND_IN_SET(dept_id, getChildLst(?))";
		list = getListBySql(sql, new String[] { id });
		return list;
	}
	public List getDeptId(HttpServletRequest req){
		HttpSession session=req.getSession();
		String username=(String) session.getAttribute("username");
		String sql = "select dept_id from user where account = ?";
		return getListEntityBySql(sql, new String[]{username});
	}

	// 所有任务
	public List<Map<String, Object>> getAllPlan(String meetingContent,String title, String status,HttpServletRequest req,String mtype) {
		List<Map<String, Object>> list;
		StringBuffer sb = new StringBuffer(
				"select * from plan_dept_user where mtype='"+mtype+"'");
		if (title != null && title != "") {
			sb.append(" and content like '%" + title + "%'");
		}
		if(meetingContent!=null&&meetingContent!=""){
			sb.append(" and countName ='" + meetingContent+"'");
		}
		if (status != null && status != "") {
			sb.append(" and status = " + status + "");
		}
		int i = (int) getDeptId(req).get(0);
		list = getListBySql(sb.toString(), null);
		return list;
	}

	// 编辑
	public boolean save(PlanInformation plan, String s) {
		Session session = null;
		Transaction tran = null;
		boolean result = false;
		try {
			session = this.sessionFactory.openSession();
			tran = session.beginTransaction();
			String sql = "";
			if (StringUtils.isEmpty(s)) {
				sql = "update plan_information set status = "
						+ plan.getStatus() + " ,remark = '" + plan.getRemark()
						+ "',finish_time = " + null + " where id = '"
						+ plan.getId() + "'";
			} else {
				sql = "update plan_information set status = "
						+ plan.getStatus() + " ,remark = '" + plan.getRemark()
						+ "',finish_time = '" + s + "' where id = '"
						+ plan.getId() + "'";
			}
			Query query = session.createSQLQuery(sql);
			query.executeUpdate();
			tran.commit();
			result = true;
		} catch (Exception e) {
			if (tran != null) {
				// 事物回滚
				tran.rollback();
			}
		} finally {
			if (session != null) {
				// 关闭session
				session.close();
			}
		}
		return result;
	}

	// 编辑
	public boolean update(PlanInformation plan, String ftime, String status,String planTime) throws UnsupportedEncodingException {
		Session session = null;
		Transaction tran = null;
		boolean result = false;
		String[] s = status.split("[,]");
		status = s[0];
		int statu = 0;
		String sql="";
		String value = URLDecoder.decode(s[1],"utf-8");
		if ("ontime".equals(status)) {
			statu = 1;
			sql = "update plan_information set ontime = '按期',overdue = '',notdue = '',expire = '',continued = '',stop = ''," + status + " = " + "'"+value+"'"
					+ " ,remark = '" + plan.getRemark()+"'"
					+ " ,feedback_people = '" + plan.getFeedbackPeople()+"'"
					+ " ,status = '" + statu+"'";
		}
		if ("overdue".equals(status)) {
			statu = 2;
			sql = "update plan_information set ontime = '',overdue = '超期',notdue = '',expire = '',continued = '',stop = ''," + status + " = " + "'"+value+"'"
					+ " ,remark = '" + plan.getRemark()+"'"
					+ " ,feedback_people = '" + plan.getFeedbackPeople()+"'"
					+ " ,status = '" + statu+"'";
		}
		if ("notdue".equals(status)) {
			statu = 3;
			sql = "update plan_information set ontime = '',overdue = '',notdue = '未到期',expire = '',continued = '',stop = ''," + status + " = " + "'"+value+"'"
					+ " ,remark = '" + plan.getRemark()+"'"
					+ " ,feedback_people = '" + plan.getFeedbackPeople()+"'"
					+ " ,status = '" + statu+"'";
		}
		if ("expire".equals(status)) {
			statu = 4;
			sql = "update plan_information set ontime = '',overdue = '',notdue = '',expire = '到期',continued = '',stop = ''," + status + " = " + "'"+value+"'"
					+ " ,remark = '" + plan.getRemark()+"'"
					+ " ,feedback_people = '" + plan.getFeedbackPeople()+"'"
					+ " ,status = '" + statu+"'";
		}
		if ("continued".equals(status)) {
			statu = 5;
			sql = "update plan_information set ontime = '',overdue = '',notdue = '',expire = '',continued = '持续',stop = ''," + status + " = " + "'"+value+"'"
					+ " ,remark = '" + plan.getRemark()+"'"
					+ " ,feedback_people = '" + plan.getFeedbackPeople()+"'"
					+ " ,status = '" + statu+"'";
		}
		if ("stop".equals(status)) {
			statu = 6;
			sql = "update plan_information set ontime = '',overdue = '',notdue = '',expire = '',continued = '',stop = '终止'," + status + " = " + "'"+value+"'"
					+ " ,remark = '" + plan.getRemark()+"'"
					+ " ,feedback_people = '" + plan.getFeedbackPeople()+"'"
					+ " ,status = '" + statu+"'";
		}
		if(StringUtils.isEmpty(planTime)){
			planTime=null;
			statu = 5;
			sql = "update plan_information set ontime = '',overdue = '',notdue = '',expire = '',continued = '持续',stop = ''," + status + " = " + "'"+value+"'"
					+ " ,remark = '" + plan.getRemark()+"'"
					+ " ,feedback_people = '" + plan.getFeedbackPeople()+"'"
					+ " ,status = '" + statu+"' ,plan_time="+null;
		}else{
			sql+=" ,plan_time='"+planTime+"'";
		}
		if(StringUtils.isEmpty(ftime)){
			ftime = null;
		}
		sql+=",feeback_status='"+plan.getFeebackStatus()+"'";
		try {
			session = this.sessionFactory.openSession();
			tran = session.beginTransaction();
			if (StringUtils.isEmpty(ftime)) {
				
						sql+= ",finish_time = " + null; 
			} else {
				sql +=",finish_time = '" + ftime + "'";
			}
			sql+= " where id = '"+ plan.getId() + "'";
			Query query = session.createSQLQuery(sql);
			query.executeUpdate();
			tran.commit();
			result = true;
		} catch (Exception e) {
			if (tran != null) {
				// 事物回滚
				tran.rollback();
			}
		} finally {
			if (session != null) {
				// 关闭session
				session.close();
			}
		}
		return result;
	}

	/**
	 * 任务统计
	 */
	// public List<Map<String,Object>> statistics(String start,String end){
	// String sql =
	// "select ontime,overdue,notdue,expire,continued,stop,plan_time from plan_information where plan_time >="
	// +
	// "? and plan_time<=? GROUP BY ontime,overdue,notdue,expire,continued,stop,plan_time";
	// start = "2017-02-02";
	// end = "2017-02-09";
	// return getListBySql(sql, new String[]{start,end});
	// }
	public List<Map<String, Object>> statistics(String start, String end) {
		List<Map<String, Object>> list;
		String sql = "";
		if (StringUtils.isEmpty(start) || StringUtils.isEmpty(end)) {
			sql = MapUtils.getString(sqlsMap, "taskcount1");
			list = getListBySql(sql, null);
		} else {
			sql = MapUtils.getString(sqlsMap, "taskcount");
			String[] time = new String[20];
			for (int i = 0; i < 20; i++) {
				if (i % 2 == 0) {
					time[i] = start;
				} else {
					time[i] = end;
				}
			}
			list = getListBySql(sql, time);
		}
		return list;
	}

	/**
	 * 按任务状态查询
	 */
	public List<Map<String, Object>> all(String status) {
		String sql = "select * from plan_dept_user where status = " + status;
		return getListBySql(sql, null);
	}

	/**
	 * 反馈记录
	 */
	public List<Map<String, Object>> feedbackRecord(String planId) {
		String sql = "select * from feedback_record where plan_id = ?";
		return getListBySql(sql, new String[] { planId });
	}

	/**
	 * 办理详情
	 */
	public List<Map<String, Object>> remark(String id) {
		String sql = "select * from feedback_record where id = ?";
		return getListBySql(sql, new String[] { id });
	}

	/**
	 * 按任务状态查询
	 */
	public List<Map<String, Object>> getTaskByStatus(String status,
			String start, String end) {
		String sql = "";
		if ("1".equals(status)) {
			status = "到期";
		}
		if ("2".equals(status)) {
			status = "终止";
		}
		if ("3".equals(status)) {
			status = "按期";
		}
		if ("4".equals(status)) {
			status = "超期";
		}
		if ("5".equals(status)) {
			status = "未到期";
		}
		if ("6".equals(status)) {
			status = "持续";
		}
		if ("7".equals(status)) {
			status = "完成";
		}
		if ("8".equals(status)) {
			status = "未完成";
		}
		switch (status) {
		case "到期":
			if (checkDate(start, end)) {
				sql = "select * from plan_dept_user where expire=? and plan_time between ? and ?";
			} else {
				sql = "select * from plan_dept_user where expire=?";
			}
			break;
		case "终止":
			if (checkDate(start, end)) {
				sql = "select * from plan_dept_user where stop=? and plan_time between ? and ?";
			} else {
				sql = "select * from plan_dept_user where stop=?";
			}
			break;
		case "按期":
			if (checkDate(start, end)) {
				sql = "select * from plan_dept_user where ontime=? and plan_time between ? and ?";
			} else {
				sql = "select * from plan_dept_user where ontime=?";
			}
			break;
		case "超期":
			if (checkDate(start, end)) {
				sql = "select * from plan_dept_user where overdue=? and plan_time between ? and ?";
			} else {
				sql = "select * from plan_dept_user where overdue=?";
			}
			break;
		case "未到期":
			if (checkDate(start, end)) {
				sql = "select * from plan_dept_user where notdue=? and plan_time between ? and ?";
			} else {
				sql = "select * from plan_dept_user where notdue=?";
			}
			break;
		case "持续":
			if (checkDate(start, end)) {
				sql = "select * from plan_dept_user where continued=? and plan_time between ? and ? or plan_time = "
						+ null + " or plan_time = ''";
			} else {
				sql = "select * from plan_dept_user where continued=? or plan_time = "
						+ null + " or plan_time = ''";
			}
			break;
		case "完成":
			if (checkDate(start, end)) {
				sql = "select * from plan_dept_user where ontime=? or overdue=? and plan_time between ? and ?";
			} else {
				sql = "select * from plan_dept_user where ontime=? or overdue=?";
			}
			break;
		case "未完成":
			if (checkDate(start, end)) {
				sql = "select * from plan_dept_user where expire=? or notdue=? and plan_time between ? and ?";
			} else {
				sql = "select * from plan_dept_user where expire=? or notdue=?";
			}
			break;

		default:
			break;
		}
		if (status == "完成" && !checkDate(start, end)) {
			return getListBySql(sql, new String[] { "按期", "超期" });
		} else if (status == "完成" && checkDate(start, end)) {
			return getListBySql(sql, new String[] { "按期", "超期", start, end });
		} else if (status == "未完成" && !checkDate(start, end)) {
			return getListBySql(sql, new String[] { "到期", "未到期" });
		} else if (status == "未完成" && checkDate(start, end)) {
			return getListBySql(sql, new String[] { "到期", "未到期", start, end });
		} else if (checkDate(start, end)) {
			return getListBySql(sql, new String[] { status, start, end });
		} else {
			return getListBySql(sql, new String[] { status });
		}

	}

	public static boolean checkDate(String start, String end) {
		if (StringUtils.isEmpty(start) && StringUtils.isEmpty(end)) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * 任务统计
	 */
	public List<Map<String, Object>> taskStatistics(String start, String end,
			String meeting_content, String dept,String mtype) {
		if (meeting_content == null) {
			meeting_content = "";
		}
		if (dept == null) {
			dept = "";
		}
		String sql = "";
		List<Map<String, Object>> list;
		// sql = MapUtils.getString(sqlsMap, "taskstatisticsbytime");
//		if (checkDate(start, end) && StringUtils.isNotEmpty(meeting_content)
//				&& StringUtils.isNotEmpty(dept)) {
//			// sql.replace("--A", "");
//			// sql.replace("--B", "");
//			// sql.replace("--C", "");
//			sql = "select d.name,IFNULL(t.ontime,0) ontime,IFNULL(t.overdue,0) overdue,IFNULL(t.notdue,0) notdue,"
//					+ " IFNULL(t.expire,0) expire,"
//					+ " IFNULL(t.continued,0) continued,IFNULL(t.stop,0) stop,t.work_unit from department d left join"
//					+ " (select plan_information.work_unit,sum(case when plan_information.continued='持续' then 1 when plan_information.plan_time is null then 1 else 0 end) as continued,"
//					+ " sum(case when plan_information.ontime='按期' then 1 else 0 end) as ontime,"
//					+ " sum(case when plan_information.overdue='超期' then 1 else 0 end) as overdue,"
//					+ " sum(case when plan_information.notdue='未到期' then 1 else 0 end) as notdue,"
//					+ " sum(case when plan_information.expire='到期' then 1 else 0 end) as expire,"
//					+ " sum(case when plan_information.stop='中止' then 1 else 0 end) as stop from plan_information"
//					+ " where create_time between ? and ?"
//					+ " and meeting_content = ? "
//					+ " group by plan_information.work_unit) t"
//					+ " on d.Dept_id = t.work_unit " + "where d.name like ?";
//			list = getListBySql(sql, new String[] { start, end,
//					meeting_content, "%" + dept + "%" });
//		} else if (!checkDate(start, end)
//				&& StringUtils.isNotEmpty(meeting_content)
//				&& StringUtils.isNotEmpty(dept)) {
//			// sql.replace("--B", "");
//			// sql.replace("--C", "");
//			sql = "select d.name,IFNULL(t.ontime,0) ontime,IFNULL(t.overdue,0) overdue,IFNULL(t.notdue,0) notdue,"
//					+ " IFNULL(t.expire,0) expire,"
//					+ " IFNULL(t.continued,0) continued,IFNULL(t.stop,0) stop,t.work_unit from department d left join"
//					+ " (select plan_information.work_unit,sum(case when plan_information.continued='持续' then 1 when plan_information.plan_time is null then 1 else 0 end) as continued,"
//					+ " sum(case when plan_information.ontime='按期' then 1 else 0 end) as ontime,"
//					+ " sum(case when plan_information.overdue='超期' then 1 else 0 end) as overdue,"
//					+ " sum(case when plan_information.notdue='未到期' then 1 else 0 end) as notdue,"
//					+ " sum(case when plan_information.expire='到期' then 1 else 0 end) as expire,"
//					+ " sum(case when plan_information.stop='中止' then 1 else 0 end) as stop from plan_information"
//					+ " where meeting_content = ? "
//					+ " group by plan_information.work_unit) t"
//					+ " on d.Dept_id = t.work_unit " + "where d.name like ?";
//			list = getListBySql(sql, new String[] { meeting_content,
//					"%" + dept + "%" });
//		} 
//		else if (!checkDate(start, end)
//				&& !StringUtils.isNotEmpty(meeting_content)
//				&& StringUtils.isNotEmpty(dept)) {
//			// sql.replace("--C", "");
//			sql = "select d.name,IFNULL(t.ontime,0) ontime,IFNULL(t.overdue,0) overdue,IFNULL(t.notdue,0) notdue,"
//					+ " IFNULL(t.expire,0) expire,"
//					+ " IFNULL(t.continued,0) continued,IFNULL(t.stop,0) stop,t.work_unit from department d left join"
//					+ " (select plan_information.work_unit,sum(case when plan_information.continued='持续' then 1 when plan_information.plan_time is null then 1 else 0 end) as continued,"
//					+ " sum(case when plan_information.ontime='按期' then 1 else 0 end) as ontime,"
//					+ " sum(case when plan_information.overdue='超期' then 1 else 0 end) as overdue,"
//					+ " sum(case when plan_information.notdue='未到期' then 1 else 0 end) as notdue,"
//					+ " sum(case when plan_information.expire='到期' then 1 else 0 end) as expire,"
//					+ " sum(case when plan_information.stop='中止' then 1 else 0 end) as stop from plan_information"
//					+ " group by plan_information.work_unit) t"
//					+ " on d.Dept_id = t.work_unit " + "where d.name like ?";
//			list = getListBySql(sql, new String[] { "%" + dept + "%" });
//		} 
//		else 
			if (StringUtils.isNotEmpty(meeting_content)) {
			// sql.replace("--B", "");
			sql = "select t.dept_name as dept_name,t.work_unit,"
					+" sum(case when t.send_status=2 then 1 else 0 end) as sendCount,"
					+ " sum(case when t.ontime='按期' then 1 else 0 end) as ontime,"
					+ " sum(case when t.overdue='超期' then 1 else 0 end) as overdue,"
					+ " sum(case when t.notdue='未到期' then 1 else 0 end) as notdue,"
					+ " sum(case when t.expire='到期' then 1 else 0 end) as expire,"
					+ " sum(case when t.stop='中止' then 1 else 0 end) as stop,"
					+ " sum(case when t.continued='持续' then 1 when (t.plan_time is null and t.ontime='' and t.overdue='' and t.notdue='' and t.expire='' and t.stop='') then 1 else 0 end) as continued"
					+ " from plan_dept_user t"
					+ " where t.countName = ? and mtype='"+mtype+"'"
					+ " group by t.work_unit";
			list = getListBySql(sql, new String[] { meeting_content });
		}else if(StringUtils.isNotEmpty(start)){
			sql = "select t.dept_name as dept_name,t.work_unit,"
					+" sum(case when t.send_status=2 then 1 else 0 end) as sendCount,"
					+ " sum(case when t.ontime='按期' then 1 else 0 end) as ontime,"
					+ " sum(case when t.overdue='超期' then 1 else 0 end) as overdue,"
					+ " sum(case when t.notdue='未到期' then 1 else 0 end) as notdue,"
					+ " sum(case when t.expire='到期' then 1 else 0 end) as expire,"
					+ " sum(case when t.stop='中止' then 1 else 0 end) as stop,"
					+ " sum(case when t.continued='持续' then 1 when (t.plan_time is null and t.ontime='' and t.overdue='' and t.notdue='' and t.expire='' and t.stop='') then 1 else 0 end) as continued"
					+ " from plan_dept_user t"
					+ " where year(t.create_time) = ? and mtype='"+mtype+"'"
					+ " group by t.work_unit";
			list = getListBySql(sql, new String[] { start });
		}else {
			sql = "select t.dept_name as dept_name,t.work_unit,"
					+" sum(case when t.send_status=2 then 1 else 0 end) as sendCount,"
					+ " sum(case when t.ontime='按期' then 1 else 0 end) as ontime,"
					+ " sum(case when t.overdue='超期' then 1 else 0 end) as overdue,"
					+ " sum(case when t.notdue='未到期' then 1 else 0 end) as notdue,"
					+ " sum(case when t.expire='到期' then 1 else 0 end) as expire,"
					+ " sum(case when t.stop='中止' then 1 else 0 end) as stop,"
					+ " sum(case when t.continued='持续' then 1 when (t.plan_time is null and t.ontime='' and t.overdue='' and t.notdue='' and t.expire='' and t.stop='') then 1 else 0 end) as continued"
					+ " from plan_dept_user t where mtype='"+mtype+"'"
					+ " group by t.work_unit";
			list = getListBySql(sql, null);
		}
		return list;
	}

	public List<Map<String, Object>> taskDetail(String start, String end,
			String status, String dept) {
		// StringBuffer sql = new StringBuffer("select * from plan_dept_user");
		if (checkDate(start, end) && StringUtils.isNotEmpty(status)
				&& StringUtils.isNotEmpty(dept)) {

		}
		return null;
	}

	/**
	 * 各部门任务详情
	 */
	public List<Map<String, Object>> TaskDetail(String start, String end,
			String status, String dept, String meeting_content) {
		List<Map<String, Object>> list;
		StringBuffer sql = new StringBuffer("select * from plan_dept_user");
		if ("expire".equals(status)) {
			status = "到期";
		}
		if ("stop".equals(status)) {
			status = "终止";
		}
		if ("ontime".equals(status)) {
			status = "按期";
		}
		if ("overdue".equals(status)) {
			status = "超期";
		}
		if ("notdue".equals(status)) {
			status = "未到期";
		}
		if ("continued".equals(status)) {
			status = "持续";
		}
		if("totle".equals(status)){
			status="合计";
		}
		switch (status) {
		case "到期":
//			if (checkDate(start, end)) {
//				sql.append(" where dept_name like ? and expire=? and plan_time between ? and ?");
//			} 
			if(dept.isEmpty()){
				sql.append(" where expire=? ");
			}
			else {
				sql.append(" where dept_name like ? and expire=? ");
			}
			break;
		case "终止":
//			if (checkDate(start, end)) {
//				sql.append(" where dept_name like ?  and stop=? and plan_time between ? and ?");
//			} 
			if(dept.isEmpty()){
				sql.append(" where stop=? ");
			}
			else {
				sql.append(" where dept_name like ? and stop=? ");
			}
			break;
		case "按期":
//			if (checkDate(start, end)) {
//				sql.append(" where dept_name like ?  and ontime=? and plan_time between ? and ?");
//			} 
			if(dept.isEmpty()){
				sql.append(" where ontime=? ");
			}
			else {
				sql.append(" where dept_name like ? and ontime=? ");
			}
			break;
		case "超期":
//			if (checkDate(start, end)) {
//				sql.append(" where dept_name like ?  and overdue=? and plan_time between ? and ?");
//			} 
			if(dept.isEmpty()){
				sql.append(" where overdue=? ");
			}
			else {
				sql.append(" where dept_name like ? and overdue=? ");
			}
			break;
		case "未到期":
//			if (checkDate(start, end)) {
//				sql.append(" where dept_name like ?  and notdue=? and plan_time between ? and ?");
//			} 
			if(dept.isEmpty()){
				sql.append(" where notdue=? ");
			}
			else {
				sql.append(" where dept_name like ? and notdue=? ");
			}
			break;
		case "持续":
//			if (checkDate(start, end)) {
//				sql.append(" where dept_name like ?   and  (continued=? and plan_time between ? and ? or plan_time = "
//						+ null + " or plan_time = '')");
//			} 
			if(dept.isEmpty()){
				sql.append(" where (continued=? or plan_time is null or plan_time = '')");
			}
			else {
				sql.append(" where dept_name like ?  and (continued=? or plan_time is null or plan_time = '')");
			}
			break;

		default:
			sql.append(" where send_status=2 ");
			if(dept.isEmpty()){
				if(StringUtils.isNotEmpty(meeting_content)){
					sql.append(" and content like ?");
					return getListBySql(sql.toString(),new String[]{"%"+meeting_content+"%"});
				}else{
					return getListBySql(sql.toString(),null);
				}
			}else{
				sql.append(" and dept_name like ?");
				if(StringUtils.isNotEmpty(meeting_content)){
					sql.append(" and content like ?");
					return getListBySql(sql.toString(),new String[]{"%" + dept + "%","%"+meeting_content+"%"});
				}else{
					return getListBySql(sql.toString(),new String[]{"%" + dept + "%"});
				}
			}
		}
		if (checkDate(start, end) && StringUtils.isNotEmpty(meeting_content)) {
			sql.append(" and content like ?");
			if (dept.isEmpty()) {
				list = getListBySql(sql.toString(), new String[] {
					status, start, end, "%"+meeting_content+"%" });
			} else {
				list = getListBySql(sql.toString(), new String[] {
					"%" + dept + "%", status, start, end, "%"+meeting_content+"%" });
			}
		} else if (checkDate(start, end)
				&& !StringUtils.isNotEmpty(meeting_content)) {
			if (dept.isEmpty()) {
				list = getListBySql(sql.toString(), new String[] {
					status, start, end });
			} else {
				list = getListBySql(sql.toString(), new String[] {
					"%" + dept + "%", status, start, end });
			}
		} else if (!checkDate(start, end)
				&& StringUtils.isNotEmpty(meeting_content)) {
			if (dept.isEmpty()) {
				list = getListBySql(sql.toString(), new String[] {
					status, meeting_content });
			} else {
				list = getListBySql(sql.toString(), new String[] {
					"%" + dept + "%", status, meeting_content });
			}
		} else {
			if (dept.isEmpty()) {
				list = getListBySql(sql.toString(), new String[] {
					status });
			} else {
				list = getListBySql(sql.toString(), new String[] {
					"%" + dept + "%", status });
			}
		}
		return list;
	}
}
