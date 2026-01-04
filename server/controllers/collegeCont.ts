import type { Response , Request } from "express"
import express from "express"
import college from "../models/college.js"
import dotenv from "dotenv"
import { getRedisClient } from "../config/redis.js"

export const getColleges = async (req : Request , res : Response ) => {
    try{
        const redis = getRedisClient();
        if(redis){
            const cachedValue = await redis.get('colleges:all');
            if(cachedValue){
                return res.status(200).json({allColleges : JSON.parse(cachedValue)});
            }
        }
    const allColleges = await college.find();
    if(redis){
        await redis.setEx('colleges:all' , 600, JSON.stringify(allColleges));
    }
    res.status(200).json({allColleges});
    }catch(err){
        res.status(500).json({message : err})
    }

}

export const getCollegeName = async(req : Request , res : Response) => {
    try{
        const collegeId = req.params.id;
        const redis = getRedisClient();
        if(redis){
            const cachedValue = await redis.get(`clgName:${collegeId}`);
            if (cachedValue){
                return res.status(200).json({name : cachedValue})
            }
        }
        const clgName = await college.findById(collegeId);
        if(redis && clgName && clgName.collegeName){
            await redis.setEx(`clgName:${collegeId}` , 3600 , clgName?.collegeName);
        }
        return res.status(200).json({name : clgName?.collegeName});
        
    }catch(err){
        console.error('controller error', err);
    }

}

// admin only
export const addCollege = async (req : Request , res : Response) => {

    try{
        const {collegeName} =  req.body;
        const newCollege = await new college({collegeName});
        await newCollege.save();
        return res.status(200).json({message : "added successfully"});
    }catch(err){
        console.error(err);
    }

 }