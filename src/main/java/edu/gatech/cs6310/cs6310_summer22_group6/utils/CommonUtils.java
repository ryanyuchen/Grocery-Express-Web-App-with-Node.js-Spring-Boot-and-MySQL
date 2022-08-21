package edu.gatech.cs6310.cs6310_summer22_group6.utils;

import edu.gatech.cs6310.cs6310_summer22_group6.exception.Code;
import edu.gatech.cs6310.cs6310_summer22_group6.exception.ServiceException;
import edu.gatech.cs6310.cs6310_summer22_group6.mapper.StoreMapper;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

@Component
public class CommonUtils {
    private static StoreMapper staticStoreMapper;

    @Resource
    private StoreMapper storeMapper;

    @PostConstruct
    public void setStaticStoreMapper() {
        staticStoreMapper = storeMapper;
    }

    public static Integer getStoreIdByName(String storeName) {
        if (staticStoreMapper.getStoreByName(storeName).size() == 0) {
            throw new ServiceException(Code.CODE_602, "Store does not exist");
        } else {
            return staticStoreMapper.getStoreByName(storeName).get(0).getStoreId();
        }
    }

    public static String encrypt(String s) {
        StringBuilder res = new StringBuilder(s);
        int addNum = 3;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (c >= '0' && c <= '9') {
                char tmp;
                tmp = (char) ((c - '0' + addNum) % 10 + '0');
                res.setCharAt(i, tmp);
            } else if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
                char tmp;

                if (Character.isUpperCase(c)) {
                    tmp = (char) (65 + ((int) (c) - 65 + addNum) % 26);
                    tmp = Character.toLowerCase(tmp);
                } else {
                    tmp = (char) (97 + ((int) (c) - 97 + addNum) % 26);
                    tmp = Character.toUpperCase(tmp);
                }

                res.setCharAt(i, tmp);
            }
        }

        return res.toString();
    }

    public static String decrypt(String s) {
        StringBuilder res = new StringBuilder(s);
        int addNum = 3;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);

            if (c >= '0' && c <= '9') {
                char tmp;

                int num = c - '0' - addNum;
                if (num < 0) {
                    tmp = (char) (num + 10 + '0');
                } else {
                    tmp = (char) ((num) % 10 + '0');
                }

                res.setCharAt(i, tmp);
            } else if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
                char tmp;

                if (Character.isUpperCase(c)) {
                    int num = (int) (c) - 65 - addNum;

                    if (num < 0) {
                        tmp = (char) (65 + num + 26);
                    } else {
                        tmp = (char) (65 + (num % 26));
                    }

                    tmp = Character.toLowerCase(tmp);
                } else {
                    int num = (int) (c) - 97 - addNum;

                    if (num < 0) {
                        tmp = (char) (97 + num + 26);
                    } else {
                        tmp = (char) (97 + (num % 26));
                    }

                    tmp = Character.toUpperCase(tmp);
                }

                res.setCharAt(i, tmp);
            }
        }

        return res.toString();
    }

}
