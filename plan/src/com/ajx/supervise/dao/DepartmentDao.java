package com.ajx.supervise.dao;

import java.util.List;
import java.util.Map;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ajx.supervise.pojo.Department;
import com.ajx.supervise.utils.BaseDao;

@Repository
public class DepartmentDao extends BaseDao{
	
	
	public void addDepartment(){
		Department department=new Department();
		department.setId("test");
		department.setAddress("test");
		department.setDeptId(11);
		System.out.println("添加部门结果为："+addByEntity(department));
	}
	
	public void saveDepartment(Department item){
		addByEntity(item);
	}
	
	public void updateDepartment(Department item){
		updateByEntity(item);
	}
	
	public List<Map<String,Object>> getListDepartment(String deptid,String name){
		if(name==null){name="";}
		if(deptid==null){
			deptid="";
		}
		String hql = "select * from department";
//		String hql = "select dept_id id,pid,name,address,leader,tel from ys_department where FIND_IN_SET(dept_id, getChildLst(3))";
		List<Map<String,Object>> listDepartment=null;
		if(name.isEmpty()&&deptid.isEmpty()){
			hql=hql+" where status = 1";
		 listDepartment=getListBySql(hql, null);
		}else if(name.isEmpty()&& !deptid.isEmpty()){
			hql=hql+ " where FIND_IN_SET(dept_id, getChildLst(?)) and status = 1";
			listDepartment=getListBySql(hql, new String[]{deptid});
		}else if(!name.isEmpty()&&deptid.isEmpty()){
			hql=hql+" where name like '%"+name+"%' and status = 1";
			listDepartment=getListBySql(hql,null);
		}else if(!name.isEmpty()&&!deptid.isEmpty()){
			hql=hql+" where name like '%"+name+"%' and FIND_IN_SET(dept_id, getChildLst(?))  and status = 1";
			listDepartment=getListBySql(hql, new String[]{deptid});
		}
		return listDepartment;
	}
	/**
	 * 查询组织
	 * @return
	 */
	public List<Map<String,Object>> deptTree(){
		String sql = "select dept_id id,pid,name from Department where status = 1";
		List<Map<String,Object>> list = getListBySql(sql,null);
		return list;
	}
	 
	public boolean hasDeptid(String deptid){
		String sql="select * from department where Dept_id =? and status = 1";
		List<Department> list=null;
		list=getListEntityBySql(sql,new String[]{deptid});
		if(list.size()>0){
			return true;
		}else{
			return false;
		}
	}
	public boolean hasDeptName(String name,String pid){
		String sql="select * from department where name =? and pid =? and status = 1";
		List<Department> list=null;
		list=getListEntityBySql(sql,new String[]{name,pid});
		if(list.size()>0){
			return true;
		}else{
			return false;
		}
	}
	public Department getDeptById(String id){
		Department dept=null;
		if(id==null||id.isEmpty()){
		}else{
			dept=(Department)getEntityById(Department.class,id);
		}
	    return dept;
	}
	
	
	public boolean deleteDept(String id){
		return deleteById(Department.class,id);
	}
}
