================= list api ====================
#API Get Answer
@content-type: application/json
@param : email string
@response: {status:string, msg:string, data:object dari table answer}


#API save data answer
@content-type: application/json
@body : {
  email: string;
  answer: [{
    keyQuestion: string;
    valueQuestion: string;
    keyAnswer: string;
    valueAnswer: string;
    statusAnswer: boolean | null;
  }]
  gift: string;
}
@response: {status:string, msg:string, data:object dari data yang di save}


================= table answer ====================
id:unique_id, userId:unique_id, email:string, give:string

================= table item_answer ====================
id:unique_id, answerId:unique_id, keyQuestion:string, valueQuestion:string, keyAnswer:string, valueAnswer:string, statusAnswer:boolean | null