package com.ajx.supervise.filter;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.ajx.supervise.pojo.Auth;
import com.ajx.supervise.service.SendPlanService;

public class AuthInterceptor implements HandlerInterceptor{

	@Autowired
	SendPlanService sendPlanService;
	@Override
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res,
			Object handler) throws Exception {
		// TODO Auto-generated method stub
		HttpSession session = req.getSession();
		String username=session.getAttribute("username")+"";
		HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod(); 
        Auth auth=method.getAnnotation(Auth.class);
        if(username!=null&&!"null".equals(username)){
        	 String aty=sendPlanService.getAuth(username);
             if(auth!=null){
             	if(auth.isAdmin()&&"1".equals(aty)){
             		return true;
             	}else if(auth.isBushi()&&"13".equals(aty)){
             		return true;
             	}else if(auth.isLdlh()&&"3".equals(aty)){
             		return true;
             	}else if(auth.isLeader()&&"2".equals(aty)){
             		return true;
             	}else if(auth.isLshy()&&"12".equals(aty)){
             		return true;
             	}else if(auth.isScxt()&&"11".equals(aty)){
             		return true;
             	}else{
             		res.sendRedirect("/loginController/logout");
            		return false;
             	}
             }
        }
            return true;
	}

}
