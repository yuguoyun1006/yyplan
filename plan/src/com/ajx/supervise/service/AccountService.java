package com.ajx.supervise.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.ajx.supervise.dao.AccountDao;
import com.ajx.supervise.dao.UserDao;
import com.ajx.supervise.pojo.Account;
import com.ajx.supervise.pojo.User;


@Service
public class AccountService {
	
@Resource
public AccountDao accountDao;
@Resource
public UserDao userDao;

public List<Account> list(String account){
	
	return accountDao.list(account);
}
public List <Map<String,Object>> list1(String id,String account){
	return accountDao.list1(id, account);
}
/**
 * 
 * 逻辑删除
 * @param id
 * @return
 */
public int delete(String id,String userid) {
	return accountDao.delete(id,userid);
}


/**
 * 删除
 * @param id
 * @return
 */
public boolean del(String id){
	return accountDao.del(id);
	
}

public Account saveInfo(String info) throws JSONException{
	JSONObject obj=new JSONObject(info);
	Date date=new Date();
	if(obj.getString("userid").isEmpty()||obj.getString("id").isEmpty()){
		User user=new User();
		Account account=new Account();
		user.setId(null);
		user.setAccount(obj.getString("account"));
		user.setUsername(obj.getString("username"));
		user.setDeptid(obj.getString("deptid"));
		account.setId(null);
		account.setAccount(obj.getString("account"));
		account.setAuthority(obj.getString("authority"));
		account.setRemark(obj.getString("remark"));
		account.setDeleteTag(1);
		account.setPassword("123456");
		account.setCreateTime(date);
		account.setUpdateTime(date);
		if(accountDao.hasCount(obj.getString("account"))){
			account.setId("false");
		}else{
			userDao.addByEntity(user);
			accountDao.addByEntity(account);
		}
		return account;
	}else{
		User user=userDao.getUserById(obj.getString("userid"));
		Account account=getById(obj.getString("id"));
		if(account.getAccount().equals(obj.getString("account"))){
			if(accountDao.hasCount(obj.getString("account"))){
				account.setId("false");
			}
		}else{
			user.setAccount(obj.getString("account"));
			user.setUsername(obj.getString("username"));
			user.setDeptid(obj.getString("deptid"));
			account.setAccount(obj.getString("account"));
			account.setAuthority(obj.getString("authority"));
			account.setRemark(obj.getString("remark"));
			account.setUpdateTime(date);
			userDao.updateByEntity(user);
			accountDao.updateByEntity(account);
		}
		return account;
	}
}
/**
 * 修改
 * @param account
 * @param id
 * @param password
 * @return
 */
public Account updateaccount(String account,String password,String id){
				//只能獲取選中行的數據，不能獲取整個數據的的賬戶信息
				Account item=getById(id);
				boolean b = upadteaccount(account,item.getId());
				if(!b){
					item.setId("1");
				}else{
					int  flag=0;
					if(!account.equals(item.getAccount())){
						flag=userDao.updateByAccount(item.getAccount(),account);
					}
					if(flag==1){
						item.setAccount(account);
					}
					Date date=new Date();
					item.setUpdateTime(date);
					item.setPassword(password);
					accountDao.updateaccount(item);
				}
				return item;
}

/**
 * 根据id查询账户
 * @param id
 * @return
 */
public Account getById(String id){
	return accountDao.getAccountById(id);
	
}

/**
 * 根据id查询账户
 * @param id
 * @return
 */
public List<Map<String,Object>> getAccountUserDeptById(String id){
	return accountDao.getAccountUserDeptById(id);
	
}

/**
 * 根据账户id重置账户密码
 * @param id
 * @param password
 * @return
 */
public int update(String id){
	System.out.println(id);
	return accountDao.updatepassword(id);
	
}
public boolean upadteaccount(String account,String id){
	@SuppressWarnings("rawtypes")
	List list = accountDao.updateaccount(id);
	if(list.contains(account)){
		return false;
	}else{
		return true;
	}
}

	/**
	 * 修改角色
	 * 
	 * @param id
	 * @param authority
	 * @return
	 */
	public boolean upadteAuthoruty(String id,String authority){
		Account account = getById(id);
		boolean flag;
		if(account == null){
			flag = false;
		}else{
//			authority=authority.replace("|", ",");
			account.setAuthority(authority);
			flag = accountDao.updateaccount(account);
		}
		return flag;
	}
}
