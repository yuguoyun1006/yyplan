package com.ajx.supervise.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.ajx.supervise.pojo.Account;
import com.ajx.supervise.utils.BaseDao;

@Repository
public class AccountDao extends BaseDao{
	public List<Account> list(String account){
		String hql="";
		List<Account> list;
		if(account==null || account == ""){
			hql = "from Account where deleteTag=1";
			 list=queryListTableByHql(hql,null);
		}else{
			hql = "from Account where account like ? and deleteTag=1";
			list = queryListTableByHql(hql,new String[]{"%"+account+"%"});
		}
		return list;
	}
	
	public boolean hasCount(String count){
		String sql="select * from account where delete_tag=1 and account=?";
		List list=getListBySql(sql, new String[]{count});
		if(list.size()>0){
			return true;
		}else{
			return false;
		}
	}
	
	public List<Map<String,Object>> list1(String id,String account){
		String hql="";
		List<Map<String,Object>> list;
		if(id==null||id.isEmpty()){
			hql="select * from account_user_dept where delete_tag = 1";
			list=getListBySql(hql,null);
		}else if(account == null || account==""){
			hql="select * from account_user_dept where FIND_IN_SET(dept_id,getChildLst(?)) and delete_tag = 1";
//			hql="select * from account where delete_tag = 1";
			list=getListBySql(hql,new String[]{id});
		}else{
			hql="select * from account_user_dept where FIND_IN_SET(dept_id,getChildLst(?)) and account like ? and delete_tag = 1";
//			hql="select * from account where account like ? and delete_tag = 1";
			list = getListBySql(hql,new String[]{id,"%"+account+"%"});
		}
		return list;
	}
	/**
	 * 逻辑删除
	 * @param id
	 * @return
	 */
	public int delete(String id,String userid){
		String sql = "update account set delete_tag = 0 where id =? ";
		String sql1="update user set delete_tag =0 where id= ?";
		int i=updateBySql(sql,new String[]{id});
		if(i==1){
			int j=updateBySql(sql1,new String[]{userid});
			return j;
		}
    	return i;
	}

	//删除
	public boolean del(String id){
		boolean b = false;
		if(deleteById(Account.class,id)){
			b = true;
			return b;
		}
			return b;
	}
	//根据id查询账户
	public Account getAccountById(String id){
		return (Account) getEntityById(Account.class,id);
	}
	
	//根据id查询账户
		public List<Map<String,Object>> getAccountUserDeptById(String id){
			String sql="select * from account_user_dept where id=?";
			List<Map<String,Object>> list=getListBySql(sql, new String[]{id});
			return list;
		}
	
	//修改 
	public boolean updateaccount(Account account){
		return updateByEntity(account);
	}
	//根据id重置账户密码
	public int updatepassword(String id){
		String sql="update account set password='123456' where id=?";
		return updateBySql(sql,new String[]{id});
	}
	
	public boolean upadtetime(Account account){
		return updateByEntity(account);
	}
	@SuppressWarnings("rawtypes")
	public List updateaccount(String id){
		List list = null;
		if(id==""||id==null){
			String sql = "select account from account where delete_tag = 1"; 
			list = getListEntityBySql(sql,null);
		}else{
			String sql = "select account from account where delete_tag = 1 and id != ?";
			list = getListEntityBySql(sql,new String []{id});
		}
		return list;
	}

}
