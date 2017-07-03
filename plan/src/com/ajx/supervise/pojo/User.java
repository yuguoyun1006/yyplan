package com.ajx.supervise.pojo;

import java.util.Date;

/**
 * YsUser entity. @author MyEclipse Persistence Tools
 */

public class User implements java.io.Serializable {

	// Fields

	private String id;
	private String deptid;
	private String userid;
	private String username;
	public String getDeptid() {
		return deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}

	private String jobnumber;
	private Integer sex;
	private Date birthday;
	private String nation;
	private String highesteducation;
	private String jobtitle;
	private String post;
	private String nativeplace;
	private String mobile;
	private String email;
	private String account;
	private Integer deleteTag;

	// Constructors

	/** default constructor */
	public User() {
	}

	/** minimal constructor */
	public User(String id) {
		this.id = id;
	}

	/** full constructor */
	public User(String id, Department ysDepartment, String userid,
			String username, String jobnumber, Integer sex, Date birthday,
			String nation, String highesteducation, String jobtitle,
			String post, String nativeplace, String mobile, String email,
			String account, Integer deleteTag) {
		this.id = id;
//		this.ysDepartment = ysDepartment;
		this.userid = userid;
		this.username = username;
		this.jobnumber = jobnumber;
		this.sex = sex;
		this.birthday = birthday;
		this.nation = nation;
		this.highesteducation = highesteducation;
		this.jobtitle = jobtitle;
		this.post = post;
		this.nativeplace = nativeplace;
		this.mobile = mobile;
		this.email = email;
		this.account = account;
		this.deleteTag = deleteTag;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

//	public YsDepartment getYsDepartment() {
//		return this.ysDepartment;
//	}
//
//	public void setYsDepartment(YsDepartment ysDepartment) {
//		this.ysDepartment = ysDepartment;
//	}

	public String getUserid() {
		return this.userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getJobnumber() {
		return this.jobnumber;
	}

	public void setJobnumber(String jobnumber) {
		this.jobnumber = jobnumber;
	}

	public Integer getSex() {
		return this.sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public Date getBirthday() {
		return this.birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getNation() {
		return this.nation;
	}

	public void setNation(String nation) {
		this.nation = nation;
	}

	public String getHighesteducation() {
		return this.highesteducation;
	}

	public void setHighesteducation(String highesteducation) {
		this.highesteducation = highesteducation;
	}

	public String getJobtitle() {
		return this.jobtitle;
	}

	public void setJobtitle(String jobtitle) {
		this.jobtitle = jobtitle;
	}

	public String getPost() {
		return this.post;
	}

	public void setPost(String post) {
		this.post = post;
	}

	public String getNativeplace() {
		return this.nativeplace;
	}

	public void setNativeplace(String nativeplace) {
		this.nativeplace = nativeplace;
	}

	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAccount() {
		return this.account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public Integer getDeleteTag() {
		return this.deleteTag;
	}

	public void setDeleteTag(Integer deleteTag) {
		this.deleteTag = deleteTag;
	}

}