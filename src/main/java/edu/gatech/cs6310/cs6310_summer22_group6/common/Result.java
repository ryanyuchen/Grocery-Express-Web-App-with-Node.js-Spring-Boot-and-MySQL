package edu.gatech.cs6310.cs6310_summer22_group6.common;


import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {

    private String code;
    private String msg;
    private Object data;

    public static Result success(){
        return new Result(Code.CODE_200, "", null);
    }

    public static Result success(String msg){
        return new Result(Code.CODE_200, msg, null);
    }

    public static Result success(Object data){
        return new Result(Code.CODE_200, "",data);
    }

    public static Result success(String code, String msg) {return new Result(code, msg, null);}


    public static Result error(String code, String msg){
        return new Result(code, msg, null);
    }


}
