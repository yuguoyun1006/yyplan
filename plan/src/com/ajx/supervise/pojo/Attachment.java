package com.ajx.supervise.pojo;

import java.sql.Timestamp;
import java.util.Date;


/**
 * Attachment entity. @author MyEclipse Persistence Tools
 */

public class Attachment  implements java.io.Serializable {


    // Fields    

     private String id;
     private String newFileWidthPath;
     private String extName;
     private String orgFileName;
     private String newFileFullName;
     private String fileSize;
     private String uploadUser;
     private Date uploadDate;


    // Constructors

    /** default constructor */
    public Attachment() {
    }

	/** minimal constructor */
    public Attachment(String id) {
        this.id = id;
    }
    
    /** full constructor */
    public Attachment(String id, String newFileWidthPath, String extName, String orgFileName, String newFileFullName, String fileSize, String uploadUser, Date uploadDate) {
        this.id = id;
        this.newFileWidthPath = newFileWidthPath;
        this.extName = extName;
        this.orgFileName = orgFileName;
        this.newFileFullName = newFileFullName;
        this.fileSize = fileSize;
        this.uploadUser = uploadUser;
        this.uploadDate = uploadDate;
    }

   
    // Property accessors

    public String getId() {
        return this.id;
    }
    
    public void setId(String id) {
        this.id = id;
    }

    public String getNewFileWidthPath() {
        return this.newFileWidthPath;
    }
    
    public void setNewFileWidthPath(String newFileWidthPath) {
        this.newFileWidthPath = newFileWidthPath;
    }

    public String getExtName() {
        return this.extName;
    }
    
    public void setExtName(String extName) {
        this.extName = extName;
    }

    public String getOrgFileName() {
        return this.orgFileName;
    }
    
    public void setOrgFileName(String orgFileName) {
        this.orgFileName = orgFileName;
    }

    public String getNewFileFullName() {
        return this.newFileFullName;
    }
    
    public void setNewFileFullName(String newFileFullName) {
        this.newFileFullName = newFileFullName;
    }

    public String getFileSize() {
        return this.fileSize;
    }
    
    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    public String getUploadUser() {
        return this.uploadUser;
    }
    
    public void setUploadUser(String uploadUser) {
        this.uploadUser = uploadUser;
    }

    public Date getUploadDate() {
        return this.uploadDate;
    }
    
    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }
   








}