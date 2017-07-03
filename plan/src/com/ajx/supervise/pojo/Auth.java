package com.ajx.supervise.pojo;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Auth {
boolean isAdmin() default false;
boolean isLeader() default false;
boolean isBushi() default false;
boolean isLdlh() default false;
boolean isScxt() default false;
boolean isLshy() default false;
}
