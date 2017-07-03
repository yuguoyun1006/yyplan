package com.ajx.supervise.pojo;

import java.sql.Timestamp;
import java.util.Date;

/**
 * PlanLx entity. @author MyEclipse Persistence Tools
 */

public class PlanLx implements java.io.Serializable {

	// Fields

	private String id;
	private String lxName;
	private String remark;
	private Date createTime;
	private Date updateTime;

	// Constructors

	/** default constructor */
	public PlanLx() {
	}

	/** minimal constructor */
	public PlanLx(String id) {
		this.id = id;
	}

	/** full constructor */
	public PlanLx(String id, String lxName, String remark,
			Date createTime, Date updateTime) {
		this.id = id;
		this.lxName = lxName;
		this.remark = remark;
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

	public String getLxName() {
		return this.lxName;
	}

	public void setLxName(String lxName) {
		this.lxName = lxName;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

}