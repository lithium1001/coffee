package com.example.test.vo;

public class Result<T> {
   public int code;
   public String msg;
   public T data;

   public static <T> Result suc(){
      Result r=new Result("suc",0,null);
      return r;
   }

   public static <T> Result suc(T data){
      Result r=new Result("suc",0,data);
      return r;
   }

   private Result(String msg,int code,T data){
      this.code=code;
      this.msg=msg;
      this.data=data;
   }
}
