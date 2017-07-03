package com.ajx.supervise.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ajx.supervise.pojo.Account;
import com.ajx.supervise.pojo.Authority;
import com.ajx.supervise.utils.BaseDao;

@Repository
public class AuthorityDao extends BaseDao {
	
	public List<Authority> list(){
		List<Authority> list;
		String hql = "from Authority where (systemId=1 or systemId=0)";
		list=queryListTableByHql(hql,null);
		return list;
	}
	
	//修改 
	public boolean updateAuthority(Authority authority){
		return updateByEntity(authority);
	} 
	
	public Authority getAuthorityById(String id){
		return (Authority) getEntityById(Authority.class,id);
	}

}
