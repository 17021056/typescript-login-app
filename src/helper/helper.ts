
export const checkInput =(name:string,username: string,password: string,cfpassword:string )=>{
    const atposition=username.indexOf("@");  
    const dotposition=username.lastIndexOf("."); 
    let message ={
        messageName:'',
        messageUserName : '',
        messagePassword: '',
        messagecfpassword: '',
    }
    let isSubmit = false;
    let isName=false;
    let isConfirm = false;
    let isusername=false;
    let ispassword=false;
    //name
    if(name.length===0){
        message.messageName='* Please fill in your name !'
    }
    else{ 
        isName=true;
    }
    //username
    if(username.length>0 && (atposition<1 || dotposition<atposition+2 || dotposition+2>=username.length)){
        message.messageUserName='* Email invalid!'     
    } 
    else if(username.length===0){
        message.messageUserName='* Please fill in your email !'
    }
    else{ 
        isusername=true
    }
    //password
    if(password.length<=6 && password.length>0){
        message.messagePassword='* Password must be at least 6 characters long !'
    }
    else if(password.length===0){
        message.messagePassword='* Please fill in your password !'
    }
    else 
    {
        ispassword=true;
    }
    //cfpassword
    if(cfpassword !== password){
        message.messagecfpassword='* Password incorrect !'
    }
    else if(cfpassword.length===0 && password.length>0){
        message.messagecfpassword='* Please confirm your Password !'
    }
    else if(cfpassword.length===0 && password.length===0){
        message.messagecfpassword='* Please fill in your Password first !'
    }
    else{ 
        isConfirm=true
    }
    //For Login
    if(cfpassword === name && name==='login'){
        isConfirm=true
        isName=true
    } 
    //isSubmit
    if(isusername===true && ispassword===true && isName===true && isConfirm===true){
        isSubmit=true
    }
    
    return { 
        isSubmit:isSubmit,
        message:message
    }
} 