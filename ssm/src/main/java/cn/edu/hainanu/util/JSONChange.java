package cn.edu.hainanu.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

/**
 * @ClassName : JSONChange
 * @Author : Jett
 * @Date : 2020/5/10 12:54
 * @Description :
 **/

public class JSONChange {
    static ObjectMapper mapper = new ObjectMapper();

    public static Object jsonToObject(String jsonStr, Class c) {
        Object o = null;
        try {
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            o = mapper.readValue(jsonStr, c);
        }
        catch (IOException e) {
            e.printStackTrace();
            o = "json to obj error";
        }
        return o;
    }

    public static String objectToJson(Object obj) {
        try {
            return mapper.writeValueAsString(obj);
        }
        catch (JsonProcessingException e) {
            e.printStackTrace();
            return "obj to json error";
        }
    }

    public static String getNodeString(String jsonStr, String key) {
        String val = "";
        try {
            JsonNode root = mapper.readTree(jsonStr);
            val = root.get(key).asText();
        }
        catch (IOException e) {
            e.printStackTrace();
            val = "read json node error";
        }
        return val;
    }
}
