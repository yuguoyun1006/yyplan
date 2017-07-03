package com.ajx.supervise.pojo;

import java.util.Date;

/**
 * PlanInformation entity. @author MyEclipse Persistence Tools
 */

public class PlanInformation implements java.io.Serializable {

	// Fields

	private String id;
	private String content;
	private Date planTime;
	private String createPerson;
	private String workUnit;
	private String workPerson;
	private Integer status;
	private Date finishTime;
	private String remark;
	private Integer meetingContent;
	private Date createTime;
	private Date updateTime;
	private String title;
	private String jointly;
	private String coOrganizer;
	private String ontime;
	private String overdue;
	private String notdue;
	private String expire;
	private String handle;
	private String continued;
	private String stop;
	private String sendStatus;
	private String mtype;
	private String feedbackPeople;
	private String feebackStatus;

	// Constructors

	public String getFeedbackPeople() {
		return feedbackPeople;
	}

	public void setFeedbackPeople(String feedbackPeople) {
		this.feedbackPeople = feedbackPeople;
	}

	/** default constructor */
	public PlanInformation() {
	}

	/** minimal constructor */
	public PlanInformation(String id, String title) {
		this.id = id;
		this.title = title;
	}

	/** full constructor */
	public PlanInformation(String id, String content, Date planTime,
			String createPerson, String workUnit, String workPerson,
			Integer status, Date finishTime, String remark,
			Integer meetingContent, Date createTime, Date updateTime,
			String title, String jointly, String coOrganizer, String ontime,
			String overdue, String notdue, String expire, String handle,
			String continued, String stop,String mtype,String feebackStatus) {
		this.id = id;
		this.content = content;
		this.planTime = planTime;
		this.createPerson = createPerson;
		this.workUnit = workUnit;
		this.workPerson = workPerson;
		this.status = status;
		this.feebackStatus=feebackStatus;
		this.finishTime = finishTime;
		this.remark = remark;
		this.meetingContent = meetingContent;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.title = title;
		this.jointly = jointly;
		this.coOrganizer = coOrganizer;
		this.ontime = ontime;
		this.overdue = overdue;
		this.notdue = notdue;
		this.expire = expire;
		this.handle = handle;
		this.continued = continued;
		this.stop = stop;
		this.mtype = mtype;
	}

	// Property accessors

	public String getMtype() {
		return mtype;
	}

	public void setMtype(String mtype) {
		this.mtype = mtype;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getPlanTime() {
		return this.planTime;
	}

	public void setPlanTime(Date planTime) {
		this.planTime = planTime;
	}

	public String getCreatePerson() {
		return this.createPerson;
	}

	public void setCreatePerson(String createPerson) {
		this.createPerson = createPerson;
	}

	public String getWorkUnit() {
		return this.workUnit;
	}

	public void setWorkUnit(String workUnit) {
		this.workUnit = workUnit;
	}

	public String getWorkPerson() {
		return this.workPerson;
	}

	public void setWorkPerson(String workPerson) {
		this.workPerson = workPerson;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getFinishTime() {
		return this.finishTime;
	}

	public void setFinishTime(Date finishTime) {
		this.finishTime = finishTime;
	}

	public String getRemark() {
		return this.remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Integer getMeetingContent() {
		return this.meetingContent;
	}

	public void setMeetingContent(Integer meetingContent) {
		this.meetingContent = meetingContent;
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

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getJointly() {
		return this.jointly;
	}

	public void setJointly(String jointly) {
		this.jointly = jointly;
	}

	public String getCoOrganizer() {
		return this.coOrganizer;
	}

	public void setCoOrganizer(String coOrganizer) {
		this.coOrganizer = coOrganizer;
	}

	public String getOntime() {
		return this.ontime;
	}

	public void setOntime(String ontime) {
		this.ontime = ontime;
	}

	public String getOverdue() {
		return this.overdue;
	}

	public void setOverdue(String overdue) {
		this.overdue = overdue;
	}

	public String getNotdue() {
		return this.notdue;
	}

	public void setNotdue(String notdue) {
		this.notdue = notdue;
	}

	public String getExpire() {
		return this.expire;
	}

	public void setExpire(String expire) {
		this.expire = expire;
	}

	public String getHandle() {
		return this.handle;
	}

	public void setHandle(String handle) {
		this.handle = handle;
	}

	public String getContinued() {
		return this.continued;
	}

	public void setContinued(String continued) {
		this.continued = continued;
	}

	public String getStop() {
		return this.stop;
	}

	public void setStop(String stop) {
		this.stop = stop;
	}

	public String getSendStatus() {
		return sendStatus;
	}

	public void setSendStatus(String sendStatus) {
		this.sendStatus = sendStatus;
	}

	public String getFeebackStatus() {
		return feebackStatus;
	}

	public void setFeebackStatus(String feebackStatus) {
		this.feebackStatus = feebackStatus;
	}

}