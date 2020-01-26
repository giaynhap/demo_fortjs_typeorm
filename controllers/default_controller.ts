import { Assign,Controller, DefaultWorker, HttpFormatResult, HTTP_STATUS_CODE,viewResult, MIME_TYPE,jsonResult} from "fortjs";

import {getManager, getRepository} from "typeorm";
import {UService} from "../entity/UService";

export class DefaultController extends Controller {

    @DefaultWorker()
    async index() {


        const data = {
          
            sql: await getManager().find(UService)
        };
        console.log(data)

        const result = await viewResult('default/index.html', data);
         
        return result;
    }
}