package com.ajx.supervise.dao;

import org.springframework.stereotype.Repository;

import com.ajx.supervise.pojo.Attachment;
import com.ajx.supervise.utils.BaseDao;

@Repository
public class AttachmentDao extends BaseDao{

	
	public Attachment getAttachment(String id){
		Attachment attachment=null;
		if(!id.isEmpty()&&id!=null){
			attachment=(Attachment)getEntityById(Attachment.class, id);
		}
		return attachment;
	}
}
