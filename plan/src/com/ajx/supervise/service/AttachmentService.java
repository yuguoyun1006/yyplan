package com.ajx.supervise.service;

import java.io.File;
import java.io.IOException;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.springframework.stereotype.Service;

import com.ajx.supervise.dao.AttachmentDao;
import com.ajx.supervise.pojo.Attachment;

@Service
public class AttachmentService {
	@Resource
	private AttachmentDao attachmentDao; 

	public Attachment saveAttachment(String newFileWidthPath,String extName,String orgFileName,String newFileFullName,String size,String loginId,Date uploadDate){
		Attachment attachment=new Attachment();
		attachment.setId(null);
		attachment.setNewFileWidthPath(newFileWidthPath);
		attachment.setExtName(extName);
		attachment.setOrgFileName(orgFileName);
		attachment.setNewFileFullName(newFileFullName);
		attachment.setFileSize(size);
		attachment.setUploadUser(loginId);
		attachment.setUploadDate(uploadDate);
		attachmentDao.addByEntity(attachment);
		return attachment;
	}
	
	public void getDataByPath(String path) throws BiffException, IOException{
		Workbook book=Workbook.getWorkbook(new File(path));
		Sheet sheet=book.getSheet(0);
	    int columns = sheet.getColumns();
	    int rows = sheet.getRows();
	    for(int i=1;i<rows;i++){
	    	for(int j=0;j<columns;j++){
	        		String username=sheet.getCell(j++, i).getContents();
	        		String userid=sheet.getCell(j++, i).getContents();
	        		String deptid=sheet.getCell(j++, i).getContents();
	        		String jobnumber=sheet.getCell(j++, i).getContents();
	        		String nation=sheet.getCell(j++, i).getContents();
	        		String account=sheet.getCell(j++, i).getContents();
	        		String deleteTag=sheet.getCell(j++, i).getContents();
	        		System.out.println(username+","+userid+","+deptid+","+jobnumber+","+nation+","+account+","+deleteTag);
	    	}
	    }
	}
	
	public Attachment getAttachment(String id){
		return attachmentDao.getAttachment(id);
	}
}
