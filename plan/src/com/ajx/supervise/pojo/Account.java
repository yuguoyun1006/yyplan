package com.ajx.supervise.pojo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * YsAccount entity. @author MyEclipse Persistence Tools
 */

public class Account implements java.io.Serializable {

	// Fields

	private String id;
	private String account;
	private String password;
	private Integer deleteTag;
	private Integer loginAccount;
	private Date createTime;
	private Date updateTime;
    private String authority;
    private String remark;
	// Constructors

	/** default constructor */
	public Account() {
	}

	/** minimal constructor */
	public Account(String id) {
		this.id = id;
	}

	/** full constructor */
	public Account(String id, String account, String password,
			Integer deleteTag, Integer loginAccount, Date createTime,
			Date updateTime) {
		this.id = id;
		this.account = account;
		this.password = password;
		this.deleteTag = deleteTag;
		this.loginAccount = loginAccount;
		this.createTime = createTime;
		this.updateTime = updateTime;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAccount() {
		return this.account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getDeleteTag() {
		return this.deleteTag;
	}

	public void setDeleteTag(Integer deleteTag) {
		this.deleteTag = deleteTag;
	}

	public Integer getLoginAccount() {
		return this.loginAccount;
	}

	public void setLoginAccount(Integer loginAccount) {
		this.loginAccount = loginAccount;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return this.updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

}