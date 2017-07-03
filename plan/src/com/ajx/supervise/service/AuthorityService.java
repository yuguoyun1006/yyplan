package com.ajx.supervise.service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.ajx.supervise.dao.AuthorityDao;
import com.ajx.supervise.pojo.Account;
import com.ajx.supervise.pojo.Authority;
import com.ajx.supervise.pojo.User;

@Service
public class AuthorityService {

	@Resource
	public AuthorityDao authorityDao;
	
	public List<Authority> list(){
		return authorityDao.list();
	}
	
	public Authority updateAuthority(String id,String authority){
		Authority item=getById(id);
		if(item != null){
			item.setAuthority(authority);
			authorityDao.updateAuthority(item);
		}
		
		return item;
	}
	
	public Authority getById(String id){
		return authorityDao.getAuthorityById(id);
		
	}
	
	public Authority add(String id,String auth) {
		
		Authority au = new Authority();
		au.setId(id);
		au.setAuthority(auth);
		
		authorityDao.addByEntity(au);
		
		return au;
		
	}
}
