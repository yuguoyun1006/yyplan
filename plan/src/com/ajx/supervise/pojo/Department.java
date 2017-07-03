package com.ajx.supervise.pojo;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * YsDepartment entity. @author MyEclipse Persistence Tools
 */

public class Department implements java.io.Serializable {

	// Fields

	private String id;
	private Integer deptId;
	private Integer pid;
	private String name;
	private String address;
	private String leader;
	private String tel;
	private Date createDate;
	private Date updateDate;
	private String remark;
	private Integer status;

	// Constructors

	/** default constructor */
	public Department() {
	}

	/** minimal constructor */
	public Department(String id) {
		this.id = id;
	}

	/** full constructor */
	public Department(String id, Integer deptId, Integer pid, String name,
			String address, String leader, String tel, Date createDate,
			Date updateDate, String remark, Integer status) {
		this.id = id;
		this.deptId = deptId;
		this.pid = pid;
		this.name = name;
		this.address = address;
		this.leader = leader;
		this.tel = tel;
		this.createDate = createDate;
		this.updateDate = updateDate;
		this.remark = remark;
		this.status = status;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getDeptId() {
		return this.deptId;
	}

	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}

	public Integer getPid() {
		return this.pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getLeader() {
		return this.leader;
	}

	public void setLeader(String leader) {
		this.leader = leader;
	}

	public String getTel() {
		return this.tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Date getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return this.updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}


}