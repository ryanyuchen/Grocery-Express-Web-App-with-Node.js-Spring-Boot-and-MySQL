package edu.gatech.cs6310.cs6310_summer22_group6.exception;

public interface Code {
    String CODE_100 = "100"; // "SQL error"
    String CODE_200 = "200"; // success;
    String CODE_201 = "201"; // The order was attacked by angrybird;
    String CODE_202 = "202"; // The order was not attacked by angrybird;

    String CODE_300 = "300"; // user error;
    String CODE_301 = "301"; // "User does not exist";
    String CODE_302 = "302"; // "Invalid password";
    String CODE_303 = "303"; // "User already exists";
    String CODE_304 = "304"; // "No token found, please log in"
    String CODE_305 = "305"; // "Token verification failed, please log in"
    String CODE_306 = "306"; // "User is not a customer"
    String CODE_307 = "307"; // "User is not authorized for this function"

    String CODE_400 = "400"; // customer error;
    String CODE_401 = "401"; // "Customer already exists"
    String CODE_402 = "402"; // "Please provide customer information"


    String CODE_500 = "500"; // pilot error;
    String CODE_501 = "501"; // "Pilot account already exists"
    String CODE_502 = "502"; // "Pilot identifier already exists"
    String CODE_503 = "503"; // "Pilot license already exists"
    String CODE_504 = "504"; // "Pilot does not exist"




    String CODE_600 = "600"; // store error;
    String CODE_601 = "601"; // "Store already exists";
    String CODE_602 = "602"; // "Store does not exist"

    String CODE_700 = "700"; // drone error;
    String CODE_701 = "701"; // "Drone already exists"
    String CODE_702 = "702"; // "Drone does not exist"
    String CODE_703 = "703"; // "Drone is not available"
    String CODE_704 = "704"; // "Drone needs pilot"


    String CODE_800 = "800"; // order error;
    String CODE_801 = "801"; // "Order identifier already exists";
    String CODE_802 = "802"; // "Order identifier does not exist";

    String CODE_900 = "900"; // item error;
    String CODE_901 = "901"; // "Item already exists";
    String CODE_902 = "902"; // "Item does not exist";
    String CODE_903 = "903"; // "Item already ordered";
    String CODE_904 = "904"; // "Customer cannot afford new item";
    String CODE_905 = "905"; // "Drone cannot carry new item";
    String CODE_1001 = "1001"; // "Probability should be < 1";

}
