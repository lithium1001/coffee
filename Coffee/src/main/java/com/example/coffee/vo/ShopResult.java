package com.example.coffee.vo;

public class ShopResult<T> {
    public int code;
    public String msg;
    public T data;

    public static <T> ShopResult success(){
        ShopResult result = new ShopResult(0, "suc", null);
        return result;
    }

    public static <T> ShopResult success(T data){
        ShopResult result = new ShopResult(0, "suc", data);
        return result;
    }

    public ShopResult(int code, String msg, T data){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
