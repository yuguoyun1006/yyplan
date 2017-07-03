package com.ajx.supervise.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.support.ByteArrayMultipartFileEditor;
import org.springframework.web.servlet.ModelAndView;

import com.ajx.supervise.pojo.Attachment;
import com.ajx.supervise.service.AttachmentService;
/**
 * 
 * 功能描述 
 * @类型名称 CommonFileUploadHandler
 * @版本 1.0
 * @创建者 wanghua
 * @创建时间 2014-1-5 上午12:09:08
 * @版权所有 ©2014 CTFO
 * @修改者 wanghua
 * @修改时间 2014-1-5 上午12:09:08
 * @修改描述
 */
@Controller
@RequestMapping("commonFileHandler")
public class CommonFileUploadHandler {
	@Resource
	private AttachmentService attachmentService;

	
	@RequestMapping("test")
	public ModelAndView test(){
		ModelAndView m=new ModelAndView("/test/test");
		return m;
	}
	
	@RequestMapping("uploadFile")
	@ResponseBody
	/**实现文件的上传，并将上传文件信息记录到数据库中*/
	public List<Attachment> uploadFile(HttpServletRequest request,HttpServletResponse response) throws Exception {
		List<Object> result = new ArrayList<Object>();
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;	
		Date uploadDate = new Date();
		List<Attachment> list=new ArrayList<>();
		HttpSession session=request.getSession();
		String loginId=(String)session.getAttribute("username");
		for (MultipartFile multipartFile : multipartRequest.getFileMap().values()) {
			Map<String,Object> fileInfo = new HashMap<String,Object>();
			CommonsMultipartFile cFile = (CommonsMultipartFile) multipartFile;
			String orgFileName = cFile.getOriginalFilename();
			if(orgFileName == null || orgFileName.length()==0)continue;
			String uuid = UUID.randomUUID().toString().replaceAll("-", "");
			String newFileName = uuid;
			String extName = "";
			int dotIndex = orgFileName.lastIndexOf('.');
			if(dotIndex >0){
				extName = orgFileName.substring(dotIndex);
				newFileName = uuid + extName;
			}
			String filePath = getDstFilePath(request);
			String subPath = getSubPath(uploadDate);
			filePath = filePath + File.separator + subPath;
			File path = new File(filePath);
			if(!path.exists()){
				path.mkdirs();
			}
			String newFileFullName = filePath + File.separator + newFileName;
//			String loginId = request.getParameter("loginId");////SSOClient.getLoginUserId(); swf上传客户端会启用另外的session，所以这里不直接读取session数据
			File uploadedFile = new File(newFileFullName);
			//同时添加attachment
			String newFileNameWidthPath = subPath + File.separator + newFileName;
			Attachment attachment = attachmentService.saveAttachment(newFileNameWidthPath,extName, orgFileName, newFileFullName, String.valueOf(cFile.getSize()), loginId, uploadDate);
			list.add(attachment);
			cFile.transferTo(uploadedFile);
			fileInfo.put("fileName", orgFileName);
			fileInfo.put("id", attachment.getId());
			fileInfo.put("fileSize", attachment.getFileSize());
			result.add(fileInfo);
			attachmentService.getDataByPath(newFileFullName);
		}

		response.setContentType("text/html;charset=utf-8");
		response.setHeader("Pragma", "No-cache");
		response.setDateHeader("Expires", 0);
		response.setHeader("Cache-Control", "no-cache");
//		PrintWriter out = response.getWriter();
//		out.println(resultString);
//		out.flush();
//		out.close();

//		ServletOutputStream out = response.getOutputStream();
//		out.println(resultString);
//		out.flush();
//		out.close();

//		return NullValue.value;
		return list;
	}
	
	private String getDstFilePath(HttpServletRequest request){
		String destPath = "";//
		if(destFilePath != null && destFilePath.length()>0){
			File file = new File(destFilePath);
			if(file.exists()){
				destPath = destFilePath;
			}
		}
		if((destPath == null || destPath.length()==0) && request != null){
			destPath = request.getSession().getServletContext().getRealPath("/");
		}
		if(destPath.endsWith("/") || destPath.endsWith("\\")){
			destPath = destPath.substring(0,destPath.length()-1);
		}
		 
		File filePath = new File(destPath);
		if(!filePath.exists()){
			filePath.mkdir();
		}
		return destPath;
	}

	//检查上传的文件名是否存在
	public boolean ifExist(String destPath,String filename) {
		boolean boo = false;
		File file = new File(destPath);
		 if (file.isDirectory()) {
		         String[] filelist = file.list();
		         for (int i = 0; i < filelist.length; i++) {
		                 File readfile = new File(destPath + "\\" + filelist[i]);
		                 if (!readfile.isDirectory()) {
		                	 System.out.println(readfile.getName()+"----------"+filename);
		                	 if(readfile.getName().equals(filename)) {
		                		 boo = true;
		                		 break;
		                	 }
		                 } 
		         }

		 }
		return boo;
	}
	
	// 注册一个spring的编辑器非常重要，没有这个方法，上传将不能进行
	protected void initBinder(HttpServletRequest request,
			ServletRequestDataBinder binder) throws ServletException {
		binder.registerCustomEditor(byte[].class,
				new ByteArrayMultipartFileEditor());
	}
	
	private String destFilePath;
		
	public String getDestFilePath() {
		return destFilePath;
	}

	public void setDestFilePath(String destFilePath_) throws Exception {
		System.out.println("destFilePath:"+destFilePath_);
		if(destFilePath_ != null && destFilePath_.length()>0){
			File file = new File(destFilePath_);
			if(!file.exists()){
				System.out.println("配置的上传文件存储路径不存在:"+destFilePath_);
				throw new Exception("配置的上传文件存储路径不存在:"+destFilePath_);
			}else{
				destFilePath = destFilePath_;
			}
		}		
	}
	 

	/**获取存储目录，附件按日期分文件夹存储*/
	private String getSubPath(Date date){
		DateFormat df = new SimpleDateFormat("yyyyMMdd");
		String datestr = df.format(date);
		String yearstr = datestr.substring(0,4);
		return "F"+yearstr + File.separator + "F"+datestr;
	}
	
	/**
	 * 根据文件的数据库记录id获取文件的实际存储文件名（带完整路径）
	 * 功能描述：
	 * @param id 文件的数据库记录id
	 * @return
	 * @throws Exception 
	 * @版本 1.0
	 * @创建者 wanghua
	 * @创建时间 2014-5-25 下午1:58:47
	 * @版权所有 ©2014 CTFO
	 * @修改者 wanghua
	 * @修改时间 2014-5-25 下午1:58:47
	 * 修改描述
	 */
	public String getFullFileName(String id) throws Exception{
		Attachment  attachment = attachmentService.getAttachment(id);
		if(attachment == null)throw new Exception("文件不存在!");
		String basePath = getDstFilePath(null);
		String filePath = basePath ;
		String fullFileName = filePath + File.separator + attachment.getNewFileWidthPath();
		return fullFileName;
	}
	
	
	@RequestMapping("downloadFile")
	@ResponseBody
	public String downloadFile(HttpServletRequest request,HttpServletResponse response,String id) throws Exception {
		String message = "";
		String basePath = getDstFilePath(request);
		Attachment  attachment = attachmentService.getAttachment(id);
		if(attachment == null) {
			System.out.println("文件不存在!");
			throw new Exception("文件不存在!");
		}else {
			//String filePath = basePath + File.separator + attachment.getAttachmentType();
			String filePath = basePath ;//+ File.separator + getDay(attachment.getUploadDate());
			File f = new File(filePath + File.separator + attachment.getNewFileWidthPath());
			System.out.println(f.getPath());
			if(!f.exists()){
				response.sendError(404,"File not found!");
				return "File not found!";
			}
			BufferedInputStream br = new BufferedInputStream(new FileInputStream(f));
			try{
				byte[] buf = new byte[1024];
				int len = 0;
	
				response.reset(); //非常重要
	//			if(isOnLine){ //在线打开方式
	//			URL u = new URL("file:///"+filePath);
	//			response.setContentType(u.openConnection().getContentType());
	//			response.setHeader("Content-Disposition", "inline; filename="+f.getName());
	//			//文件名应该编码成UTF-8
	//			}
	//			else{ //纯下载方式
				response.setContentType("application/x-msdownload"); 
				String orgFileName = attachment.getOrgFileName()+"";
				response.setHeader("Content-Disposition", "attachment; filename=" + new String(orgFileName.getBytes("gb2312"), "ISO8859-1" )); 
	//			}
				OutputStream out = response.getOutputStream();
				try{
					while((len = br.read(buf)) >0){
						out.write(buf,0,len);
					}
				}finally{
					out.close();
				}
			}finally{
				br.close();
			}
			message = "success";
		}
		return message;
	}

//	public AttachmentService getAttachmentService() {
//		return attachmentService;
//	}
//
//	public void setAttachmentService(AttachmentService attachmentService) {
//		this.attachmentService = attachmentService;
//	}
	
	
}
