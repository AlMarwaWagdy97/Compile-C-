import React, { useState, Component  } from 'react';
import { AppRegistry,ImageBackground, Image, StyleSheet, Text, View, Button ,TextInput , ScrollView ,FlatList, TouchableOpacity, ProgressViewIOSComponent} from 'react-native';
// import SoundPlayer from 'react-native-sound-player'
// import { Audio } from 'expo';

// export default class Tokens{
    // } 
    //---------------------------------------------------------------------------------------------
export default function App() {
//TOKENS ********************************************************************************************************
let ErrorList = [];
var ErrorExistFound = false; 
let ErrorListtoken = [];
let Index_Error = [];
let Lines = []
let countline = 0, countchar = 0;
let int_list = [], string_list = [], decimal_list = [], double_list = [], char_list = [];
let intType = false , stringType = false, decimalType = false, doubleType = false, charType = []; 
let funcName_list = []
//Scanner *********************************************************************************************************************************
const tokenType = {
    Token: {
        args:"Token.args",
        int: "Token.int",
        float: "Token.float",
        string: "Token.string",
        decimal: "Token.decimal",
        double: "Token.double",
        char: "Token.char",
        bool: "Token.bool",
        byte: "Token.byte",
        short: "Token.short",
        long: "Token.long",
        DateTime: "Token.DataTime",
        
        public:"Token.public",
        private:"Token.private",
        protect:"Token.protect",
        
        OrOp:"Token.OrOp",
        AndOp:"Token.AndOp",
        true:"Token.true",
        false:"Token.false",
        
        using:"Token.using",
        system:"Token.system",
        namespace:"Token.namespace",
        class:"Token.class",
        program:"Token.program",
        static:"Token.static",
        void:"Token.void",
        main:"Token.main",
        if: "Token.if",
        else: "Token.else",
        while: "Token.while",
        do: "Token.do",
        for:"Token.for",
        return:"Token.return",

        identifier:"Token.identfier",
        number:"Token.number",
        string:"Token.string",
        comment:"Token.comment",

        Equal_op :"Token.Equal_op",
        plus_op :"Token.plus_op",
        minus_op :"Token.minus_op",
        divided_op :"Token.divided_op",
        multi_op :"Token.multi_op",
        morethan_op :"Token.morethan_op",
        lessthan_op :"Token.lessthan_op",
        If_equale :"Token.If_equale",
        Lessthan_equal :"Token.Lessthan_equal",
        Morethan_equale :"Token.Morethan_equale",
        Pluseone :"Token.Pluseone",
        Minusone :"Token.Minusone",
        Semicolm: "Token.Semicolm",
        Comma: "Token.Comma",
        Dot: "Token.Dot",
        Comma: "Token.Comma",
        Open_paranthesis:"Token.Open_paranthesis",
        Closed_paranthesis:"Token.Closed_paranthesis",
        Open_bracket:"Token.Open_bracket",
        Closed_bracket:"Token.Closed_bracket",
        Open_brace:"Token.Open_brace",
        Closed_brace:"Token.Closed_brace",
        Notequal_op:"Token.Notequal_op",
        Module_op:"Token.Module_op",

        console:"Token.console",
        WriteLine:"Token.WriteLine",
        ReadLine:"Token.ReadLine", 

    }
}  
class scaner{
    tokensList = []
    reserve_word = new Map();
    operators = new Map();
     constructor(){     
        this.reserve_word.set("args", tokenType.Token.args);
        this.reserve_word.set("int", tokenType.Token.int);
        this.reserve_word.set("float", tokenType.Token.float);
        this.reserve_word.set("string", tokenType.Token.string);
        this.reserve_word.set("decimal", tokenType.Token.decimal);
        this.reserve_word.set("double", tokenType.Token.double);
        this.reserve_word.set("char", tokenType.Token.char);
        this.reserve_word.set("bool", tokenType.Token.bool);
        this.reserve_word.set("byte", tokenType.Token.byte);
        this.reserve_word.set("long", tokenType.Token.long);
        this.reserve_word.set("DateTime", tokenType.Token.DateTime);

        this.reserve_word.set("public", tokenType.Token.public);
        this.reserve_word.set("private", tokenType.Token.private);
        this.reserve_word.set("protect", tokenType.Token.protect);

        this.reserve_word.set("true", tokenType.Token.true);
        this.reserve_word.set("false", tokenType.Token.false);


        this.reserve_word.set("using", tokenType.Token.using);
        this.reserve_word.set("system", tokenType.Token.system);
        this.reserve_word.set("namespace", tokenType.Token.namespace);
        this.reserve_word.set("class", tokenType.Token.class);
        this.reserve_word.set("program", tokenType.Token.program);
        this.reserve_word.set("static", tokenType.Token.static);
        this.reserve_word.set("void", tokenType.Token.void);
        this.reserve_word.set("main", tokenType.Token.main);
        this.reserve_word.set("if", tokenType.Token.if);
        this.reserve_word.set("else", tokenType.Token.else);
        this.reserve_word.set("while", tokenType.Token.while);
        this.reserve_word.set("do", tokenType.Token.do);
        this.reserve_word.set("for", tokenType.Token.for);
        this.reserve_word.set("return", tokenType.Token.return);

        this.reserve_word.set("console", tokenType.Token.console);
        this.reserve_word.set("WriteLine", tokenType.Token.WriteLine);
        this.reserve_word.set("ReadLine", tokenType.Token.ReadLine);

        
        this.operators.set("=",tokenType.Token.Equal_op);
        this.operators.set("+",tokenType.Token.plus_op);
        this.operators.set("-",tokenType.Token.minus_op);
        this.operators.set("/",tokenType.Token.divided_op);
        this.operators.set("*",tokenType.Token.multi_op);
        this.operators.set(">",tokenType.Token.morethan_op);
        this.operators.set("<",tokenType.Token.lessthan_op);
        this.operators.set("==",tokenType.Token.If_equale);
        this.operators.set("<=",tokenType.Token.Lessthan_equal);
        this.operators.set(">=",tokenType.Token.Morethan_equale);
        this.operators.set("++",tokenType.Token.Pluseone);
        this.operators.set("--",tokenType.Token.Minusone);
        this.operators.set(";", tokenType.Token.Semicolm);
        this.operators.set(",",tokenType.Token.Comma);
        this.operators.set(".",tokenType.Token.Dot);
        this.operators.set("(",tokenType.Token.Open_paranthesis);
        this.operators.set(")",tokenType.Token.Closed_paranthesis);
        this.operators.set("[",tokenType.Token.Open_bracket);
        this.operators.set("]",tokenType.Token.Closed_bracket);
        this.operators.set("{",tokenType.Token.Open_brace);
        this.operators.set("}",tokenType.Token.Closed_brace);
        this.operators.set("!=",tokenType.Token.Notequal_op);
        this.operators.set("%",tokenType.Token.Module_op);   
        this.operators.set("&&",tokenType.Token.AndOp);   
        this.operators.set("||",tokenType.Token.OrOp);   
    }     
    //Functions (start)--------------------------- */
     start(code){
        //split code -------------------------------
        // var code = code.split(" ");
        let codelen = code.length
        for(var i = 0; i < codelen;i++){
            var temp="";
            var j = i;
            var current = code[i].charAt(0);
            if(current == "\n"){
                // Lines.set(countline, countchar);
                Lines.push(countchar);
                countline++;
                countchar = 0;
            }
            else if (current != " " && current !="\r") {
                countchar++;
            }
            if (current == " " || current == "\r" || current == "\n")continue;
            //check if string or not-----------------------------------------------------------------------
            else if (current >= "A" && current <= "Z" || (current >= "a" && current <= "z")){
                while (current >= "A" && current <= "Z" || (current >= "a" && current <= "z") || current >= "0" && current <= "9" || current == "_"){
                    temp += current;
                    j++;
                    if (j < codelen) current = code[j];
                    else break;
                }
                this.FindToken(temp);
                i = j - 1;
            }
            //check if digit--------------------------------------------------------------------------------
            else if (current >= "0" && current <= "9"){
                while (current >= "0" && current <= "9" || current == "."){
                    temp += current;
                    j++;
                    if (j < codelen)
                        current = code[j];
                    else break;
                }
                this.FindToken(temp);
                i = j - 1;
            }
            ///////////check if pracket or praces     
            else if (current == "{")
            {
                let find = false;
                while(j<codelen){
                    if (code[j] == "}") { find = true;break;}
                    j++;
                }
                if (find)this.FindToken("{");
                else{
                    j = i;
                    while (j < codelen){
                        temp += code[j];
                        j++;
                    }
                    ErrorList.push(temp);
                    ErrorExistFound = true;
                    i = j - 1;
                }
            }
            /// ckeck if pract is work
            else if (current == "(" ){
                let find = false;
                while (j < codelen){
                    if (code[j] == ")") { find = true; break; }
                    j++;
                }
                if (find)this.FindToken("(");
                else{
                    j = i;
                    while (j < codelen){
                        temp += code[j];
                        j++;
                    }
                    ErrorList.push(temp);
                    ErrorExistFound = true;
                    i = j - 1;
                }
            }          
            else if (current == "["){
                var find = false;
                while (j <codelen){
                    if (code[j] == "]") { find = true; break; }
                    j++;
                }
                if (find)this.FindToken("[");
                else{
                    j = i;
                    while (j < codelen){
                        temp += code[j];
                        j++;
                    }
                    ErrorList.push(temp);
                    ErrorExistFound = true;
                    i = j - 1;
                }
            }
            ////////if comeent code
            else if (current == "/" && code[i + 1] == "*"){
                temp += "/*";
                j++; j++;
                let find = false;
                while ((j + 1 < codelen)) {
                    temp += code[j];
                    if ((j < codelen) && (code[j] == "*" && code[j + 1] == "/")) { find = true; break; }
                    j++;
                }
                if (find){
                    temp += "/";
                    j++;
                    i = j;
                    this.FindToken(temp);
                }
                else{
                    ErrorList.push(temp);
                    ErrorExistFound = true;
                }
            }
            //////// if operation is ||
            else if (current == "|" && code[i + 1] == "|"){
                i++;
                this.FindToken("||");
            }
            //////// if operation is &&
            else if (current == "&" && code[i + 1] == "&"){
                i++;
                this.FindToken("&&");
            }
            //////// if operation is ||
            else if (current == "=" && code[i + 1] == "="){
                i++;
                this.FindToken("==");
            }
            else if (current == "<" && code[i + 1] == "="){
                i++;
                this.FindToken("<=");
            }
            else if (current == ">" && code[i + 1] == "="){
                i++;
                this.FindToken(">=");
            }
            else if (current == "+" && code[i + 1] == "+"){
                i++;
                this.FindToken("++");
            }
            else if (current == "-" && code[i + 1] == "-"){
                i++;
                this.FindToken("--");
            }
            else if (current == "!" && code[i + 1] == "="){
                i++;
                this.FindToken("!=");
            }
            //////if string 
            else if (current == '"'){
                j++;
                temp+='"';  
                let find = false;
                while ((j < codelen)){
                    temp += code[j];
                    if (code[j]=='"'){
                        find = true;
                        break;
                    }
                    j++;
                }
                if(find){
                    i = j;
                    this.FindToken(temp);
                }
                else{
                    i = j;
                    ErrorList.push(temp);
                    ErrorExistFound = true;
                }
            }

            else this.FindToken(current);  
        }
    }
    //---------------------------------------------
    FindToken(Lex){
        let tok = new Object()
        tok.lex = Lex;
        // Lex=Lex.toLowerCase();   
        //reserved words-------
        if(this.reserve_word.get(Lex) != undefined){
            tok.token = this.reserve_word.get(Lex);
            this.tokensList.push(tok);
        }
        else if(this.Is_identifier(Lex)){
            tok.token = tokenType.Token.identifier;
            this.tokensList.push(tok);
        }
        else if(this.IS_constant(Lex)){
            tok.token = tokenType.Token.number ;
            this.tokensList.push(tok);
        }
        else  if(this.operators.get(Lex) != undefined){
            tok.token = this.operators.get(Lex);
            this.tokensList.push(tok);
        }
        else if(this.Is_String(Lex)){
            tok.token = tokenType.Token.string ;
            this.tokensList.push(tok);
        }
        else if(this.IS_comment(Lex)){
            tok.token = tokenType.Token.comment ;
            this.tokensList.push(tok);
        }
        else{
            ErrorList.push(Lex);
            ErrorExistFound = true;
        }        
    }
    //Function checked------------------------------
    Is_identifier(lex){
        let isValid = true;
        if ((lex[0] >= "a" && lex[0] <= "z") || (lex[0] >= "A" && lex[0] <= "Z")){
            let n = lex.length;
            for (let i = 1; i < n; i++){
                if ((lex[i] >= "A" && lex[i] <= "Z") || (lex[i] >= "a" && lex[i] <= "z") || (lex[i] >= "0" && lex[i] <= "9") || lex[i] == "_") continue;
                isValid = false;
                break;
            }
        }
        else isValid = false;
        return isValid;
    }
    IS_constant(lex){
        let isValid = true;
        if ((lex[0] >= "0" && lex[0] <= "9")){
            let dot = false;
            let n = lex.length;
            for (let i = 0; i < n; i++){
                if (lex[i] == "." && dot == false){
                    dot = true;
                    if (i + 1 < n && (lex[i + 1] >= "0" && lex[i + 1] <= "9")) continue;
                    else isValid = false;
                }
                else if (!(lex[i] >= "0" && lex[i] <= "9")) isValid = false;
            }
        }
        else isValid = false;
        return isValid;
    }
    Is_String(lex){
        let n = lex.length;
        if (lex[0] == '"' && lex[n - 1] == '"') return true;
                else return false;
    }
    IS_comment(lex){
        let n = lex.length;
        if (lex[0] == "/" && lex[1] == "*" && lex[n - 2] == "*" && lex[n - 1] == "/") return true;
                else return false;
    }
}
//Parser **********************************************************************************************************************************
class Node{
    name="";
    childern = [];
    constructor(n){
        this.name = n;
    }
}
class Parser{
    // ErrorList = [];
    index = 0;
    TokenList = []
    constructor(listtok){
        this.TokenList  = listtok;
        this.root = new Node("Start");
        this.root.childern.push(this.Program());
        return this.root;
    }
    Program(){
        try{
            this.program = new Node("Program_");
            this.program.childern.push(this.Using_Dirct());
            this.program.childern.push(this.Fun_Main());
            return this.program;
        }catch(E){}
    }
    Using_Dirct(){
        try{
            this.using_dirct = new Node("Using_Dirct_");
            this.using_dirct.childern.push(this.match(tokenType.Token.using));
            this.using_dirct.childern.push(this.match(tokenType.Token.system));
            this.using_dirct.childern.push(this.match(tokenType.Token.Semicolm));
            return this.using_dirct;
        }catch(E){}
    }
    Fun_Main(){
        try{
            this.func_main = new Node("Fun_Main_");
            this.func_main.childern.push(this.match(tokenType.Token.namespace));
            this.func_main.childern.push(this.match(tokenType.Token.identifier));
            this.func_main.childern.push(this.match(tokenType.Token.Open_brace));
            this.func_main.childern.push(this.match(tokenType.Token.class));
            this.func_main.childern.push(this.match(tokenType.Token.program));
            this.func_main.childern.push(this.match(tokenType.Token.Open_brace));
            this.func_main.childern.push(this.FunctionList());
            this.func_main.childern.push(this.Main_Func());
            this.func_main.childern.push(this.match(tokenType.Token.Closed_brace));
            this.func_main.childern.push(this.match(tokenType.Token.Closed_brace));
            return this.func_main;
        }catch(E){}
    }
    FunctionList(){
        try{
            this.func_list= new Node("Function_List");
            if(this.TokenList[this.index+2].token != tokenType.Token.main){
                this.func_list.childern.push(this.Function1());
                this.func_list.childern.push(this.FunctionList());
            }
            else
            this.func_list= null;
            return this.func_list;    
        }catch(E){}
    }
    Function1(){
        try{
            this.function = new Node("Function1_op");
            this.function.childern.push(this.Visualization());
            this.function.childern.push(this.Data_Type());
            this.function.childern.push(this.match(tokenType.Token.identifier));
            // funcName_list.push()
            this.function.childern.push(this.match(tokenType.Token.Open_paranthesis));
            this.function.childern.push(this.Parameter());
            this.function.childern.push(this.match(tokenType.Token.Closed_paranthesis));
            this.function.childern.push(this.Main_Body());
            return this.function;
        }catch(E){}
    }
    Main_Func(){
        try{
            this.main_func = new Node("Main_Func_op");
            this.main_func.childern.push(this.match(tokenType.Token.static));
            this.main_func.childern.push(this.Data_Type());
            this.main_func.childern.push(this.match(tokenType.Token.main));
            this.main_func.childern.push(this.match(tokenType.Token.Open_paranthesis));
            this.main_func.childern.push(this.match(tokenType.Token.string));
            this.main_func.childern.push(this.match(tokenType.Token.Open_bracket));
            this.main_func.childern.push(this.match(tokenType.Token.Closed_bracket));
            this.main_func.childern.push(this.match(tokenType.Token.args));
            this.main_func.childern.push(this.match(tokenType.Token.Closed_paranthesis));
            this.main_func.childern.push(this.Main_Body());
            return this.main_func;
        }catch(E){}
    }
    Visualization(){
        try{
            this.vis = new Node("Visualization_");
            if(this.TokenList[this.index].token == tokenType.Token.public)
                this.vis.childern.push(this.match(tokenType.Token.public));
            else if(this.TokenList[this.index].token == tokenType.Token.private)
                this.vis.childern.push(this.match(tokenType.Token.private));
            else if(this.TokenList[this.index].token == tokenType.Token.protect)
                this.vis.childern.push(this.match(tokenType.Token.protect));
            return this.vis;         
        }catch(E){}
    }
    par(){
        try{
            this.pars = new Node("Par_");
            if(this.TokenList[this.index].token == tokenType.Token.Comma){
                this.pars.childern.push(this.match(tokenType.Token.Comma));
                this.pars.childern.push(this.Parameter());            
            }
            else this.pars = null;
            return this.pars;
        }catch(E){}
    }
    Parameter(){
        try{
            this.parameter1 = new Node("Parameter_");
            if(this.TokenList[this.index].token != tokenType.Token.Closed_paranthesis){
                this.parameter1.childern.push(this.Data_Type());
                this.parameter1.childern.push(this.Arg());
                this.parameter1.childern.push(this.match(tokenType.Token.identifier));
                if(this.TokenList[this.index].token == tokenType.Token.Comma){this.parameter1.childern.push(this.par());}
            }
            else this.parameter1=null;
            return this.parameter1;
        }catch(E){}
    }
    Arg(){
        try{
            this.arg = new Node("Arg_op");
            if(this.TokenList[this.index].token == tokenType.Token.Open_bracket){
                this.arg.childern.push(this.match(tokenType.Token.Open_bracket));
                this.arg.childern.push(this.match(tokenType.Token.Closed_bracket));        
            }
            else this.arg = null;
            return this.arg;
        }catch(E){}
    }
    Main_Body(){
        try{
            this.main_body = new Node("Main_Body_op");
            this.main_body.childern.push(this.match(tokenType.Token.Open_brace));
            this.main_body.childern.push(this.StatmentList());
            if(this.TokenList[this.index].token == tokenType.Token.return )this.main_body.childern.push(this.Returnfun());
            this.main_body.childern.push(this.match(tokenType.Token.Closed_brace));
            return this.main_body;
        }catch(E){}
    }
    StatmentList(){
        try{
            this.statmentlist = new Node("StatmentList_op");
            if(this.TokenList[this.index].token != tokenType.Token.return && this.TokenList[this.index].token != tokenType.Token.Closed_brace ){
                this.statmentlist.childern.push(this.Statments());
                if(this.TokenList[this.index].token != tokenType.Token.return && this.TokenList[this.index].token != tokenType.Token.Closed_brace ){
                    this.statmentlist.childern.push(this.StatmentList());
                }
            }
            return this.statmentlist;
        }catch(E){}
    }
    Statments(){
        try{
            // console.log("state ", this.TokenList[this.index+1].token)
            this.statment = new Node("Statment_op");
            if(this.TokenList[this.index].token == tokenType.Token.return){
                this.statment = null;
            }
            else if (this.TokenList[this.index].token == tokenType.Token.comment){
                this.statment.childern.push(this.match(tokenType.Token.comment));
            }
            else if (this.TokenList[this.index].token == tokenType.Token.console){
                this.statment.childern.push(this.Console());
                this.statment.childern.push(this.match(tokenType.Token.Semicolm));
            }
            else if (this.TokenList[this.index].token == tokenType.Token.bool){
                this.statment.childern.push(this.Booleanstatment());
                this.statment.childern.push(this.match(tokenType.Token.Semicolm));
            }
            else if (this.TokenList[this.index].token == tokenType.Token.if){
                this.statment.childern.push(this.If_State());
            }
            else if (this.TokenList[this.index].token == tokenType.Token.for){
                this.statment.childern.push(this.ForLoop());
            }
            else if (this.TokenList[this.index].token == tokenType.Token.while){
                this.statment.childern.push(this.WhileLoop());
            }
            else if (this.TokenList[this.index].token == tokenType.Token.do){
                this.statment.childern.push(this.DoWhileLoop());
                this.statment.childern.push(this.match(tokenType.Token.Semicolm));
            }
            else if((this.TokenList[this.index].token == tokenType.Token.int)||(this.TokenList[this.index].token == tokenType.Token.decimal)
             ||(this.TokenList[this.index].token == tokenType.Token.double)||(this.TokenList[this.index].token == tokenType.Token.char)
             ||(this.TokenList[this.index].token == tokenType.Token.string) ||(this.TokenList[this.index].token == tokenType.Token.void)){
                this.statment.childern.push(this.Declaration());
                this.statment.childern.push(this.match(tokenType.Token.Semicolm));
            }
            else if (this.TokenList[this.index+1].token == tokenType.Token.Equal_op){
                this.statment.childern.push(this.AssigmentStatment());
                    this.statment.childern.push(this.match(tokenType.Token.Semicolm));
            }
            else if(this.TokenList[this.index+1].token == tokenType.Token.Open_paranthesis){
                this.statment.childern.push(this.FuncCall());
                if(this.TokenList[this.index-1].token != tokenType.Token.Semicolm){
                    this.statment.childern.push(this.match(tokenType.Token.Semicolm));
                }
            }
            else if(this.TokenList[this.index+1].token == tokenType.Token.Pluseone){
                //ckeck DataType
                if(string_list.includes(this.TokenList[this.index].lex) || char_list.includes(this.TokenList[this.index].lex)){
                    Index_Error.push(this.index); 
                    ErrorList.push("invalid conversion from 'number' to char.\n");
                }
                else if(! int_list.includes(this.TokenList[this.index].lex)){
                    Index_Error.push(this.index); 
                    ErrorList.push('"' + this.TokenList[this.index].lex +'"'+ " was not declear in this scope\n");
                }
                this.statment.childern.push(this.match(tokenType.Token.identifier));
                this.statment.childern.push(this.match(tokenType.Token.Pluseone));
                this.statment.childern.push(this.match(tokenType.Token.Semicolm));
            }
            else if(this.TokenList[this.index+1].token == tokenType.Token.Minusone){
                // check DataType
                if(string_list.includes(this.TokenList[this.index].lex) || char_list.includes(this.TokenList[this.index].lex)){
                    Index_Error.push(this.index); 
                    ErrorList.push("invalid conversion from 'number' to char.\n");
                }
                else if(! int_list.includes(this.TokenList[this.index].lex)){
                    ErrorExistFound = true;
                    Index_Error.push(this.index); 
                    ErrorList.push('"' + this.TokenList[this.index].lex +'"'+ " was not declear in this scope\n");
                }
                this.statment.childern.push(this.match(tokenType.Token.identifier));
                this.statment.childern.push(this.match(tokenType.Token.Minusone));
                this.statment.childern.push(this.match(tokenType.Token.Semicolm));
            }    
            return this.statment;  
        }catch(E){}
    }
    Console(){
        try{
            this.con = new Node("console_");
            this.con.childern.push(this.match(tokenType.Token.console));
            this.con.childern.push(this.match(tokenType.Token.Dot));
            if(this.TokenList[this.index].token == tokenType.Token.WriteLine){
                this.con.childern.push(this.match(tokenType.Token.WriteLine));
                this.con.childern.push(this.match(tokenType.Token.Open_paranthesis));
                this.con.childern.push(this.match(tokenType.Token.string));
                this.con.childern.push(this.match(tokenType.Token.Closed_paranthesis));
    
            }
            if(this.TokenList[this.index].token == tokenType.Token.ReadLine){
                this.con.childern.push(this.match(tokenType.Token.ReadLine));
                this.con.childern.push(this.match(tokenType.Token.Open_paranthesis));
                this.con.childern.push(this.match(tokenType.Token.Closed_paranthesis));
            }
            return this.con
        }catch(E){}
    }
    Term(){
        try{
            this.term = new Node("Term_op");
            if (this.TokenList[this.index+1].token == tokenType.Token.Open_paranthesis)
                this.term.childern.push(this.FuncCall());
            else if (this.TokenList[this.index].token == tokenType.Token.number)
                this.term.childern.push(this.match(tokenType.Token.number));
            else if (this.TokenList[this.index].token == tokenType.Token.identifier){
                // if()
                this.term.childern.push(this.match(tokenType.Token.identifier));
            }
            return this.term;
        }catch(E){}
    }
    FuncCall(){
        try{
            this.funccall = new Node("Function_Call");
            this.funccall.childern.push(this.match(tokenType.Token.identifier));
            this.funccall.childern.push(this.match(tokenType.Token.Open_paranthesis));
            this.funccall.childern.push(this.Parameterfunc());
            this.funccall.childern.push(this.match(tokenType.Token.Closed_paranthesis));
            //this.funccall.childern.push(this.match(tokenType.Token.Semicolm));
            return this.funccall;
        }catch(E){}
    }
    Parameterfunc(){
        try{
            this.parameterfunc = new Node("Parameter_call");
            if(this.TokenList[this.index].token != tokenType.Token.Closed_paranthesis){
                this.parameterfunc.childern.push(this.Arg());
                this.parameterfunc.childern.push(this.match(tokenType.Token.identifier));
                if(this.TokenList[this.index].token != tokenType.Token.Closed_paranthesis){this.parameterfunc.childern.push(this.parcall());}
            }
            else this.parameterfunc=null;
            return this.parameterfunc;
        }catch(E){}
    }
    parcall(){
        try{
            this.par1 = new Node("Par_funcCall");
            if(this.TokenList[this.index].token == tokenType.Token.Comma){
                this.par1.childern.push(this.match(tokenType.Token.Comma));
                this.par1.childern.push(this.Parameterfunc());            
            }
            else this.par1 = null;
            return this.par1;
        }catch(E){}
    }
    Equation(){
        try{
            this.cond = new Node("Equation_op");
            if (this.TokenList[this.index].token == tokenType.Token.Open_paranthesis){
                this.cond.childern.push(this.match(tokenType.Token.Open_paranthesis));
                this.cond.childern.push(this.Term());
                this.cond.childern.push(this.EquList());
                this.cond.childern.push(this.match(tokenType.Token.Closed_paranthesis));
                this.cond.childern.push (this.EquList());
            }
            else{
                this.cond.childern.push(this.Term());
                this.cond.childern.push(this.EquList());
            }
            return this.cond;
        }catch(E){}
    }
    EquList(){
        try{
            this.condop = new Node("Condtion_Operation");
            if (this.TokenList[this.index].token == tokenType.Token.plus_op|| this.TokenList[this.index].token == tokenType.Token.minus_op ||
                this.TokenList[this.index].token == tokenType.Token.divided_op || this.TokenList[this.index].token == tokenType.Token.multi_op){
                    this.condop.childern.push(this.Arthop());
                    this.condop.childern.push(this.Equation());
            }
            else { 
                this.condop = null; }
            return this.condop;
        }catch(E){}
    }
    Arthop(){
        try{
            this.arth = new Node("Arthmetic_operation");
            if (this.TokenList[this.index].token == tokenType.Token.plus_op)
                this.arth.childern.push(this.match(tokenType.Token.plus_op));
            else if (this.TokenList[this.index].token == tokenType.Token.minus_op)
                this.arth.childern.push(this.match(tokenType.Token.minus_op));
            else if (this.TokenList[this.index].token == tokenType.Token.multi_op)
                this.arth.childern.push(this.match(tokenType.Token.multi_op));
            else if (this.TokenList[this.index].token == tokenType.Token.divided_op)
                this.arth.childern.push(this.match(tokenType.Token.divided_op));
            return this.arth;
        }catch(E){}
    }
    Condition(){
        try{
            this.condition1 = new Node("Condition_");
            this.condition1.childern.push(this.match(tokenType.Token.identifier));
            this.condition1.childern.push(this.ConditionOP());
            this.condition1.childern.push(this.Term());
            return this.condition1;
        }catch(E){}
    }
    ConditionOP(){
        try{
            this.conditionOP = new Node("Condition_Operation");
            if (this.TokenList[this.index].token == tokenType.Token.lessthan_op)
                this.conditionOP.childern.push(this.match(tokenType.Token.lessthan_op));
            else if (this.TokenList[this.index].token == tokenType.Token.morethan_op)
                this.conditionOP.childern.push(this.match(tokenType.Token.morethan_op));
            else if (this.TokenList[this.index].token == tokenType.Token.If_equale)
                this.conditionOP.childern.push(this.match(tokenType.Token.If_equale));
            else if (this.TokenList[this.index].token == tokenType.Token.Notequal_op)
                this.conditionOP.childern.push(this.match(tokenType.Token.Notequal_op));
            else if (this.TokenList[this.index].token == tokenType.Token.Morethan_equale)
                this.conditionOP.childern.push(this.match(tokenType.Token.Morethan_equale));
            else if (this.TokenList[this.index].token == tokenType.Token.Lessthan_equal)
                this.conditionOP.childern.push(this.match(tokenType.Token.Lessthan_equal));
            return this.conditionOP;
        }catch(E){}
    }
    Data_Type(){
        try{
            this.datatype = new Node("Data_Type_");
            if(this.TokenList[this.index].token == tokenType.Token.int){
                this.datatype.childern.push(this.match(tokenType.Token.int));
                intType = true;
            }
            else if(this.TokenList[this.index].token == tokenType.Token.decimal){
                this.datatype.childern.push(this.match(tokenType.Token.decimal));
                decimalType = true;
            }
            else if(this.TokenList[this.index].token == tokenType.Token.double){
                this.datatype.childern.push(this.match(tokenType.Token.double));
                doubleType = true;
            }
            else if(this.TokenList[this.index].token == tokenType.Token.char){
                this.datatype.childern.push(this.match(tokenType.Token.char));
                charType = true;
            }
            else if(this.TokenList[this.index].token == tokenType.Token.string){
                this.datatype.childern.push(this.match(tokenType.Token.string));
                stringType = true;
            }
            else if(this.TokenList[this.index].token == tokenType.Token.void){
                this.datatype.childern.push(this.match(tokenType.Token.void));
            }
            return this.datatype;
        }catch(E){}
    }
    Declaration(){
        try{
            this.decleartion = new Node("Decleartion_statment");
            this.decleartion.childern.push(this.Data_Type());
            this.decleartion.childern.push(this.DecList());
            this.decleartion.childern.push(this.Dec());
            intType = false , stringType = false, decimalType = false, doubleType = false, charType = [];
            return this.decleartion;
        }catch(E){}
    }
    DecList(){
        try{
            this.declist = new Node("DeclerationList");
            if (this.TokenList[this.index+1].token == tokenType.Token.Equal_op)
                this.declist.childern.push(this.AssigmentStatment());
            else{
                // get data type
                if(intType == true)int_list.push(this.TokenList[this.index].lex);
                if(decimalType == true)decimal_list.push(this.TokenList[this.index].lex);
                if(doubleType == true)double_list.push(this.TokenList[this.index].lex);
                if(stringType == true)string_list.push(this.TokenList[this.index].lex);
                if(charType == true)char_list.push(this.TokenList[this.index].lex);
                this.declist.childern.push(this.match(tokenType.Token.identifier));
                
            }
            return this.declist;
        }catch(E){}
    }
    AssigmentStatment(){
        try{
            this.assigment = new Node("Assigment_Statment");
            //get the datatype
            if(intType == true)int_list.push(this.TokenList[this.index].lex);
            if(decimalType == true)decimal_list.push(this.TokenList[this.index].lex);
            if(doubleType == true)double_list.push(this.TokenList[this.index].lex);
            if(stringType == true)string_list.push(this.TokenList[this.index].lex);
            if(charType == true)char_list.push(this.TokenList[this.index].lex);
            // ckeck if not decleard
            let textLex = this.TokenList[this.index].lex;
            if( (!int_list.includes(textLex)) && (!string_list.includes(textLex)) && (!char_list.includes(textLex)) && (!double_list.includes(textLex)) && (!decimal_list.includes(textLex))){
                let texterror = '"' + this.TokenList[this.index].lex +'"'+ " was not declear in this scope\n"
                if(!ErrorList.includes(texterror)){
                    Index_Error.push(this.index); 
                    ErrorList.push(texterror);
                }
            }
                 
            this.assigment.childern.push(this.match(tokenType.Token.identifier));
            this.assigment.childern.push(this.match(tokenType.Token.Equal_op));
            this.assigment.childern.push(this.Expression());
            return this.assigment;
        }catch(E){}
    }
    Expression(){
        try{
            this.exp = new Node("Expression_op");
            // check types ------
            if (this.TokenList[this.index].token == tokenType.Token.string){
                if(!string_list.includes(this.TokenList[this.index-2].lex) && (int_list.includes(this.TokenList[this.index-2].lex)||double_list.includes(this.TokenList[this.index-2].lex)|| decimal_list.includes(this.TokenList[this.index-2].lex))){
                    Index_Error.push(this.index); 
                    ErrorList.push("invalid conversion from 'const char* ' to 'number' .\n" );
                    // console.log(this.TokenList[this.index-2].lex);
                }
                this.exp.childern.push(this.match(tokenType.Token.string));
                
            }
            else{
                //console.log(this.TokenList[this.index-2].lex);
                if(string_list.includes(this.TokenList[this.index-2].lex || char_list.includes(this.TokenList[this.index-2].lex))){
                    Index_Error.push(this.index); 
                    ErrorList.push("invalid conversion from 'number' to 'const char* ' .\n" );
                }
                if  (this.TokenList[this.index+1].token == tokenType.Token.plus_op|| this.TokenList[this.index+1].token == tokenType.Token.minus_op ||
                    this.TokenList[this.index+1].token == tokenType.Token.divided_op || this.TokenList[this.index+1].token == tokenType.Token.multi_op ){
                        
                        this.exp.childern.push(this.Equation());
                    }
                else this.exp.childern.push(this.Term());
            }
            return this.exp;
        }catch(E){}
    }
    Dec(){
        try{
            this.dec = new Node("Declear");
            if (this.TokenList[this.index].token == tokenType.Token.Comma){
                this.dec.childern.push(this.match(tokenType.Token.Comma));
                this.dec.childern.push(this.DecList());
                this.dec.childern.push(this.Dec());
            }
            else this.dec = null;
            return this.dec;
        }catch(E){}
    }
    If_State(){
        try{
            this.if_state = new Node("IF_State");
            this.if_state.childern.push(this.match(tokenType.Token.if));
            this.if_state.childern.push(this.match(tokenType.Token.Open_paranthesis));
            this.if_state.childern.push(this.Cond_stat());
            this.if_state.childern.push(this.match(tokenType.Token.Closed_paranthesis));
            this.if_state.childern.push(this.match(tokenType.Token.Open_brace));
            if(this.TokenList[this.index].token !=  tokenType.Token.Closed_brace)
                this.if_state.childern.push(this.StatmentList());
            this.if_state.childern.push(this.match(tokenType.Token.Closed_brace));
            this.if_state.childern.push(this.ElseIF_List());
            this.if_state.childern.push(this.Else_List());
            return this.if_state;
        }catch(E){}
    }
    ElseIF_List(){
        try{
            this.else_list = new Node("ElseIf_list");
            if(this.TokenList[this.index].token == tokenType.Token.else && this.TokenList[this.index+1].token == tokenType.Token.if){
                this.else_list.childern.push(this.ElseIf_State());
                if(this.TokenList[this.index].token == tokenType.Token.else && this.TokenList[this.index+1].token == tokenType.Token.if)this.else_list.childern.push(this.ElseIF_List());
            }
            else this.else_list = null;
            return this.else_list;
        }catch(E){}
    }
    ElseIf_State()
    {
        try{
            this.else1 = new Node("Elase_State");
            this.else1.childern.push(this.match(tokenType.Token.else));
            this.else1.childern.push(this.match(tokenType.Token.if));
            this.else1.childern.push(this.match(tokenType.Token.Open_paranthesis));
            this.else1.childern.push(this.Cond_stat());
            this.else1.childern.push(this.match(tokenType.Token.Closed_paranthesis));
            this.else1.childern.push(this.match(tokenType.Token.Open_brace));
            this.else1.childern.push(this.StatmentList());
            this.else1.childern.push(this.match(tokenType.Token.Closed_brace));
            this.else1.childern.push(this.ElseIF_List());
            return this.else1;
        }catch(E){}

    }
    Else_List(){
        try{
            this.else3 = new Node("Else_cond");
             if(this.TokenList[this.index].token == tokenType.Token.else ){
                this.else3.childern.push(this.match(tokenType.Token.else));
                this.else3.childern.push(this.match(tokenType.Token.Open_brace));
                this.else3.childern.push(this.StatmentList());
                this.else3.childern.push(this.match(tokenType.Token.Closed_brace)); 
             }
             else this.else3 = null;
            return this.else3;
        }catch(E){}
    }
    Cond_stat()
    {
        try{
            this.cond_Stat = new Node("Condition_State");
            this.cond_Stat.childern.push(this.Condition());
            this.cond_Stat.childern.push(this.boolList());
            return this.cond_Stat;
        }catch(E){}
    }
    boolList(){
        try{
            this.boollist = new Node("Bool_List");
            if (this.TokenList[this.index].token == tokenType.Token.AndOp || this.TokenList[this.index].token == tokenType.Token.OrOp){
                this.boollist.childern.push(this.Boolean());
                this.boollist.childern.push(this.Condition());
                this.boollist.childern.push(this.boolList());
            }
            else this.boollist = null;
            return this.boollist;
        }catch(E){}
    }
    Boolean(){
        try{
            this.boolean = new Node("Boolean_");
            if (this.TokenList[this.index].token == tokenType.Token.AndOp)
                this.boolean.childern.push(this.match(tokenType.Token.AndOp));
            else if (this.TokenList[this.index].token == tokenType.Token.OrOp)
                this.boolean.childern.push(this.match(tokenType.Token.OrOp));
            return this.boolean;
        }catch(E){}
    }
    WhileLoop(){
        try{
            this.whileloop = new Node("While_Loop");
            this.whileloop.childern.push(this.match(tokenType.Token.while));
            this.whileloop.childern.push(this.match(tokenType.Token.Open_paranthesis));
            this.whileloop.childern.push(this.Cond_stat());
            this.whileloop.childern.push(this.match(tokenType.Token.Closed_paranthesis));
            this.whileloop.childern.push(this.match(tokenType.Token.Open_brace));
            this.whileloop.childern.push(this.StatmentList());
            this.whileloop.childern.push(this.match(tokenType.Token.Closed_brace));
            return this.whileloop;
        }catch(E){}
    }
    ForLoop(){
        try{
            this.forloop = new Node("For_Loop");
            this.forloop.childern.push(this.match(tokenType.Token.for));
            this.forloop.childern.push(this.match(tokenType.Token.Open_paranthesis));
            this.forloop.childern.push(this.Declaration());
            this.forloop.childern.push(this.match(tokenType.Token.Semicolm));
            this.forloop.childern.push(this.Cond_stat());
            this.forloop.childern.push(this.match(tokenType.Token.Semicolm));
            this.forloop.childern.push(this.Equ());
            this.forloop.childern.push(this.match(tokenType.Token.Closed_paranthesis));
            this.forloop.childern.push(this.match(tokenType.Token.Open_brace));
            this.forloop.childern.push(this.StatmentList());
            this.forloop.childern.push(this.match(tokenType.Token.Closed_brace));
            return this.forloop;
        }catch(E){}
    }
    DoWhileLoop(){
        try{
            this.doloop = new Node("Do_WhileLoop");
            this.doloop.childern.push(this.match(tokenType.Token.do));
            this.doloop.childern.push(this.match(tokenType.Token.Open_brace));
            this.doloop.childern.push(this.StatmentList());
            this.doloop.childern.push(this.match(tokenType.Token.Closed_brace));
            this.doloop.childern.push(this.match(tokenType.Token.while));
            this.doloop.childern.push(this.match(tokenType.Token.Open_paranthesis));
            this.doloop.childern.push(this.Cond_stat());
            this.doloop.childern.push(this.match(tokenType.Token.Closed_paranthesis));
            return this.doloop;
        }catch(E){}
    }
    Equ(){
        try{
            this.dop = new Node("double_op");
            if (this.TokenList[this.index].token == tokenType.Token.identifier){
                this.dop.childern.push(this.match(tokenType.Token.identifier));
                this.dop.childern.push(this.Mult_op());
                this.dop.childern.push(this.Equ1());
            }
            else this.dop = null;
            return this.dop;  
        }catch(E){}
    }
    Equ1(){
        try{
            this.equ1 = new Node("Equ1_op");
            if (this.TokenList[this.index].token == tokenType.Token.Comma){
                this.equ1.childern.push(this.match(tokenType.Token.Comma));
                this.equ1.childern.push(this.Equ());
            }
            else  this.equ1 = null;
            return this.equ1;
        }catch(E){}
    }
    Mult_op(){
        try{
            this.mul_op = new Node("Mul_op");
            if (this.TokenList[this.index].token == tokenType.Token.Pluseone)
                this.mul_op.childern.push(this.match(tokenType.Token.Pluseone));
            else if (this.TokenList[this.index].token == tokenType.Token.Minusone)
                this.mul_op.childern.push(this.match(tokenType.Token.Minusone));
            return this.mul_op;
        }catch(E){}
    }   
    Booleanstatment(){
        try{
            this.b = new Node("Boolean_op");
            this.b.childern.push(this.match(tokenType.Token.bool));
            this.b.childern.push(this.match(tokenType.Token.identifier));
            this.b.childern.push(this.match(tokenType.Token.Equal_op));
            this.b.childern.push(this.false_true());
            return this.b;
        }catch(E){}
    }
    false_true(){
        try{
            this.ft = new Node("boolFT");
            if (this.TokenList[this.index].token == tokenType.Token.true)
                this.ft.childern.push(this.match(tokenType.Token.true));
            else if (this.TokenList[this.index].token == tokenType.Token.false)
                this.ft.childern.push(this.match(tokenType.Token.false));
            return this.ft;
        }catch(E){}
    }
    Returnfun(){
        try{
            this. ret = new Node("return1");
            this.ret.childern.push(this.match(tokenType.Token.return));
            if (this.TokenList[this.index].token == tokenType.Token.number) this.ret.childern.push(this.match(tokenType.Token.number));
            if (this.TokenList[this.index].token == tokenType.Token.identifier) this.ret.childern.push(this.match(tokenType.Token.identifier));
            this.ret.childern.push(this.match(tokenType.Token.Semicolm));
            return this.ret 
        }catch(E){}
    }
    //Match-------------------------------------------------------------------------
    match( ExpectedToken){
        try {
            //console.log("exp :" , ExpectedToken , " || token :" , this.TokenList[this.index].token , this.TokenList[this.index].lex, " || i=",this.index)
            if (ExpectedToken == this.TokenList[this.index].token){
                // console.log("Match")
                this.NewNode = new Node(ExpectedToken.ToString);
                this.index++;
                return this.NewNode;
            }
            else{
                // console.log("Error ", ErrorList.length);
                ErrorExistFound = true;
                Index_Error.push(this.index); 
                ExpectedToken = Meantype(ExpectedToken);               
                ErrorList.push(" Expected ' "+ ExpectedToken + " ' but ' " +this.TokenList[this.index].lex +" '  found\r\n");
                // this.index++;
                throw  str(ErrorList)
                return null;
            }
        }
        catch(err){
            
        }
    }    
}
function Meantype(name){
    if(name == tokenType.Token.Equal_op)name = "=";
    else if(name == tokenType.Token.minus_op)name = "-";
    else if(name == tokenType.Token.plus_op)name = "+";
    else if(name == tokenType.Token.divided_op)name = "/";
    else if(name == tokenType.Token.Semicolm)name = ";";
    else if(name == tokenType.Token.multi_op)name = "*";
    else if(name == tokenType.Token.morethan_op)name = ">";
    else if(name == tokenType.Token.lessthan_op)name = "<";
    else if(name == tokenType.Token.If_equale)name = "==";
    else if(name == tokenType.Token.Lessthan_equal)name = "<=";
    else if(name == tokenType.Token.Morethan_equale)name = ">=";
    else if(name == tokenType.Token.Pluseone)name = "++";
    else if(name == tokenType.Token.Minusone)name = "--";
    else if(name == tokenType.Token.Comma)name = ",";
    else if(name == tokenType.Token.Dot)name = ".";
    else if(name == tokenType.Token.Open_paranthesis)name = "(";
    else if(name == tokenType.Token.Closed_paranthesis)name = ")";
    else if(name == tokenType.Token.Open_bracket)name = "[";
    else if(name == tokenType.Token.Closed_bracket)name = "]";
    else if(name == tokenType.Token.Open_brace)name = "{";
    else if(name == tokenType.Token.Closed_brace)name = "}";
    else if(name == tokenType.Token.Notequal_op)name = "!=";
    else if(name == tokenType.Token.Module_op)name = "%";
    else if(name == tokenType.Token.AndOp)name = "&&";
    else if(name == tokenType.Token.OrOp)name = "||";
    else name = name.substring(6,name.length )
    return name;
}
//Main **************************************************************************************************
const [CodeText, SetCode]=useState('');
const [erorrText,SetError]=useState('');
const [checkout, SetCheck]=useState('');
const clickbut1 = ()=>{
    var start = new Date();
    // console.log(SetCode);
    SetCheck("");
    SetError("");
    if(CodeText == ""){
        SetError("Please, Write your code.");

    }
    else{
        let obj = new scaner();
        obj.start(CodeText);
        let parse = new Parser(obj.tokensList);
        //Out Puts ------------------------------------------------
        if (ErrorList.length == 0){
            SetCheck("The Syntax code is right.");
        }
        else {
            let ind = 0, indval =0;
            let lines = [];

            // console.log("Error length "+Index_Error)
            // to get the error line
            for(let l = 0; l < Index_Error.length; l++){
                indval =0;
                for(let i = 0;  i < Lines.length; i++){
                    indval += Lines[i];
                    if(Index_Error[l] <= indval){
                        lines.push(i+1);
                        break;
                    }
                }
                
            }
            let Error_Output = "Errors:- \n ";
            for(let i = 0; i  < Index_Error.length; i++){
                Error_Output += "Line: " + lines[i] + " --> "  + ErrorList[i] ;
            }
            // console.log(Error_Output)
            SetError(Error_Output)
            
        }
    }
    var elapsed = new Date() - start;
    console.log("Time Ex")
    console.log(elapsed)
   
  };
//design*************************************************************************************************
  return (
    <View style={styles.Container}>
        <ImageBackground source={require('./images/div1.jpg')} imageStyle= {{opacity:0.7}} style= { styles.backgroundImage } >
            <ScrollView>
                {/* <Text>{CodeText} !</Text> */}
                <Text style={styles.t1}> Write Your Code And Compile  </Text> 
                <TextInput style={styles.Inputcode} multiline placeholder=' Write Your Code Here --- !' onChangeText={(Val)=>SetCode(Val)}></TextInput>   
                <Text style={styles.checkcode}>{checkout} </Text>
                <Text style={styles.errorcode}> {erorrText} </Text>
                <View style={styles.viewbut1}>
                    <Button style={styles.ButCompiler} title='Compile' onPress={clickbut1}/>
                </View>  
            </ScrollView>
        </ImageBackground> 
    </View>
     
  )
}
//--------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  Container:{
    flex: 1,
    // backgroundColor: '#FFFF99',
  },
  t1:{
    fontSize:30,
    color:'#008080',
    marginTop: 20,
    fontWeight: "bold",
    alignSelf: 'center',
  },
  backgroundImage:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    // opacity: 0.8,
    // backgroundColor:'red',
    // opacity: 0.6
    
    // blurRadius:1,
    // filter: brightness(50%),
    // backgroundColor: rbga(0, 0, 0, .5)
  },
  Inputcode:{
    borderWidth:1,
    borderColor:'#7777',
    padding:5,
    margin:20,
    // marginLeft:20,
    // marginRight:20,
    backgroundColor:'#F5FFFA',
    height:300,
    fontSize:20,

  },
  ButCompiler:{ 
    backgroundColor:'#ff5c5c',
    height:200,

  },
  viewbut1:{
    width:200,
    height:200,
    marginLeft:100 ,
  },
  checkcode:{
    color:'green',
    fontSize:30,
    alignSelf: 'center',
    fontWeight: "bold",
  },
  errorcode:{
    color:'red',
    fontSize:20,
    alignSelf: 'center',
    fontWeight: "bold",
    // backgroundColor : 'white',
  },
 
});
