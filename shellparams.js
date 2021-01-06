module.exports = class ShellParams{

    constructor(){
        this.paramActions = [];
    }
     
    static create(){
        return new ShellParams();
    }
 
    parameters(){
        let paramAction = new ParamAction();
 
        for(var i = 0; i < arguments.length -1; i++)
            paramAction.parameters.push(arguments[i]);
 
        if(arguments.length > 0)
            paramAction.acao = arguments[arguments.length -1];
 
        this.paramActions.push(paramAction);
 
        return this;
    }
 
    default(defaultAction){
        
        //order, to consider most specialized first (those who has most parameters)
        this.paramActions = this.paramActions.sort((c1, c2) => c2.parameters.length - c1.parameters.length);
        
        let foundParamAction = false;
        let inputParameters = process.argv.slice(2);
 
 
        for(var i = 0; i < this.paramActions.length; i++){
             let paramAction = this.paramActions[i];
             
             if(this.arrayHasSubArray(inputParameters, paramAction.parameters)){
                 let reimaningItems = inputParameters.slice(paramAction.parameters.length, inputParameters.length);
                 foundParamAction = true;
 
                 if(paramAction.acao)
                     paramAction.acao.apply(null, reimaningItems);
 
                 break;
             }
        }
 
        if(!foundParamAction && defaultAction)
            defaultAction();
    }
 
    arrayHasSubArray(array, subArray){
       if(!array || !subArray)
          return false;
 
       if(subArray.length > array.length)
          return false;
 
        for(var i = 0; i < subArray.length; i++){
            let subArrayItem = subArray[i];
            let arrayItem = array[i];
 
            if(typeof subArrayItem != "string" || 
              typeof arrayItem != "string")
              return false;
 
            subArrayItem = subArrayItem.toLowerCase().trim();
            arrayItem = arrayItem.toLowerCase().trim();
 
            if(subArrayItem != arrayItem)
                return false;
        }
 
        return true;
    }
}
 
class ParamAction{
    constructor(){
        this.parameters = [];
        this.acao = () => {};
    }
}