package com.ajx.supervise.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.ajx.supervise.dao.DepartmentDao;
import com.ajx.supervise.dao.UserDao;
import com.ajx.supervise.pojo.Department;

@Service
public class DepartmentService {
@Resource 
public DepartmentDao departmentDao;
@Resource 
public UserDao userDao;
public void addDepartment(){
	departmentDao.addDepartment();
}

public List<Map<String,Object>> getListDepartment(String deptid,String name){
	return departmentDao.getListDepartment(deptid,name);
}

public Department saveDepartment(String itemStr) throws Exception{
	JSONObject item = new JSONObject(itemStr);
	Department dept=new Department();
	if (item == null)
		return null;
	/*** 下面开始对item对象进行校验，如必填项，格式，逻辑关系等 ***/
	
	/*** 结束校验 ***/
	
	Date date = new Date();
	if (item.getString("id").isEmpty()) {
		dept.setId(null);
		dept.setAddress(item.getString("address"));
		if(departmentDao.hasDeptid(item.getString("deptId"))){
			dept.setStatus(10);//状态为10时返回到前台，用户判断是否部门id重复
		}else if(departmentDao.hasDeptName(item.getString("name"),item.getString("pid"))){
			dept.setStatus(11);//状态为10时返回到前台，用户判断是否部门名称重复
		}else{
			dept.setDeptId(item.getInt("deptId"));
			dept.setName(item.getString("name"));
			dept.setLeader(item.getString("leader"));
			dept.setRemark(item.getString("remark"));
			dept.setTel(item.getString("tel"));
			dept.setPid(item.getInt("pid"));
			dept.setStatus(1);
			dept.setCreateDate(date);
			dept.setUpdateDate(date);
			departmentDao.saveDepartment(dept);
		}
		return dept;
	} else {
		/**从数据库中取出原始对象，将从页面传过来的新值赋值给原始对象，并将原始对象再保存到数据库中 **/
		Department dept2 =getDeptById(item.getString("id")) ;
		if (dept2 != null) {
			/*** 将页面上的新值逐一赋值，不在页面上的属性不要进行赋值 ***/
			dept2.setAddress(item.getString("address"));
			if(!dept2.getDeptId().equals(item.getInt("deptId"))){
				if(departmentDao.hasDeptid(item.getString("deptId"))){
					dept.setId(null);
					dept.setStatus(10);
					return dept;
				}
				userDao.updateByHql(item.getInt("deptId"),dept2.getDeptId());
			}
			if(!dept2.getName().equals(item.getString("name"))||!dept2.getPid().equals(item.getInt("pid"))){
				if(departmentDao.hasDeptName(item.getString("name"),item.getString("pid"))){
					dept.setId(null);
					dept.setStatus(11);
					return dept;
				}
			}
			dept2.setDeptId(item.getInt("deptId"));
			dept2.setName(item.getString("name"));
			dept2.setLeader(item.getString("leader"));
			dept2.setRemark(item.getString("remark"));
			dept2.setPid(item.getInt("pid"));
			dept2.setTel(item.getString("tel"));
			dept2.setUpdateDate(date);
			boolean result=departmentDao.updateByEntity(dept2);
			return dept2;
		}else{
			return null;
		} 
	}
	
}

/**
 * 查询组织
 * @return
 */
public List<Map<String,Object>> deptTree(){
	return departmentDao.deptTree();
}
public List<Map<String,Object>> usertree(String deptId){
	return userDao.userTree(deptId);
}
public Department getDeptById(String id){
	return departmentDao.getDeptById(id);
}

public boolean deleteDept(String id){
	Department item=getDeptById(id);
	item.setStatus(0);
	boolean flag=false;
	boolean result=departmentDao.updateByEntity(item);
	if(result){
		flag=true;
		String sql="update ys_user set delete_tag = 0 where dept_id =?"; 
		int i=departmentDao.updateBySql(sql, new String[]{String.valueOf(item.getDeptId())});
		if(i==1){
			String sql1="update ys_account set delete_tag = 0 where account=(select account from ys_user where dept_id=?)";
			i=departmentDao.updateBySql(sql1, new String[]{String.valueOf(item.getDeptId())});
			if(i==1){
				flag=true;
			}
		}
	}
	return flag;
}

public boolean trimDept(String id,int pid){
	Department item=getDeptById(id);
	item.setPid(pid);
	return departmentDao.updateByEntity(item);
}
}
