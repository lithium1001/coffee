package com.example.coffee.common.Exception;

import com.example.coffee.common.Api.IErrorCode;
public class ApiException extends RuntimeException {
    private IErrorCode errorCode;

    public ApiException(IErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
    public ApiException(String message) {
        super(message);
    }
    public IErrorCode getErrorCode() {
        return errorCode;
    }
}
