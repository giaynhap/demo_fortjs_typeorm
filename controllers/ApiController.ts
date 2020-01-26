import { DefaultWorker,Assign,Controller ,jsonResult, Worker, Route,HTTP_METHOD,viewResult} from "fortjs";

import {getManager, getRepository,getConnection} from "typeorm";
import {UService} from "../entity/UService";
import { USlider } from "../entity/USlider";
import { PageOptions } from "../entity/PageOptions";
import { UQuestion } from "../entity/UQuestion";

export class ApiController extends Controller {

    @Worker([HTTP_METHOD.Get])
    @Route("/services")
    async getService() {
        const data = {
            error:1,
            message:"success",
            data: await getManager().find(UService)
        };
        return  jsonResult(data);
    }
    @Worker([HTTP_METHOD.Get])
    @Route("/slides")
    async getSlide() {
        const data = {
            error:1,
            message:"success",
            data: await getManager().find(USlider)
        };
        return  jsonResult(data);
    }
    @Worker([HTTP_METHOD.Get])
    @Route("/options")
    async getPageOption() {
        const data = {
            error:1,
            message:"success",
            data: await getManager().find(PageOptions)
        };
        return  jsonResult(data);
    }

    @Worker([HTTP_METHOD.Get])
    @Route("/questions")
    async getQuestion() {
        var filter = this.query.filter;
        var page = this.query.page||0
        var limit = this.query.limit||2
        
        const questions = await getConnection()
        .createQueryBuilder()
        .select("*")
        .from(UQuestion, "q")
        .where("q.status = :status AND q.type = :type", { status: 1,type: filter })
        .orderBy("q.createDate", "DESC")
        .skip(limit*page)
        .take(limit)
        .execute();
        const count = await getConnection()
        .createQueryBuilder()
        .select("count(*)")
        .from(UQuestion, "q")
        .where("q.status = :status AND q.type = :type", { status: 1,type: filter })
        .getRawOne();
        const questionType = await getConnection()
        .createQueryBuilder()
        .select("*")
        .from(UService, "q")
        .where("q.code = :code", { code:filter })
        .getRawOne();
        
        for(var item in questions){
            questions[item].description = questions[item].description.substr(0,Math.min(questions[item].description.length,80))+"..."
        } 
        const data = {
            error:1,
            message:"success",
            data: 
            questions,
            service:questionType,
            page:{
                totalItem:count["count(*)"]*1,
                page:page*1,
                numItem:questions.length 
            }
        };
        return  jsonResult(data);
    }
    
    @Worker([HTTP_METHOD.Get])
    @Route("/question/detail/{id}")
    async getQustionDetail() {
        var id = this.param.id;
        var service = {};
        var moreQuestion = {};
        const question = await getConnection()
        .createQueryBuilder()
        .select("*")
        .from(UQuestion, "q")
        .where("q.status = :status AND q.id = :id", { status: 1,id: id })
        .getRawOne();
        if (question != null){
            service = await getConnection()
            .createQueryBuilder()
            .select("*")
            .from(UService, "q")
            .where("q.code = :code", { code:question.type })
            .getRawOne();
            moreQuestion = await getConnection()
            .createQueryBuilder()
            .select("*")
            .from(UQuestion, "q")
            .where("q.status = :status AND q.type = :type", { status: 1,type: question.type })
            .orderBy("q.createDate", "DESC")
            .take(10)
            .execute();
            for(var item in moreQuestion){ 
                moreQuestion[item].description = moreQuestion[item].description.substr(0,Math.min(moreQuestion[item].description.length,80))+"..."
            } 

        }
        const data = {
            error:1,
            message:"success",
            service:service,
            data:{
                question,
                moreQuestion
            }
        };
        return  jsonResult(data);
    }
}