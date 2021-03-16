
export const checkInputLogin =(username: string,password: string )=>{
    const atposition=username.indexOf("@");  
    const dotposition=username.lastIndexOf("."); 
    let message ={
        messageUserName : '',
        messagePassword: '',
    }
    let isSubmit = false;
    let isusername=false;
    let ispassword=false;
    if(username.length>0 && (atposition<1 || dotposition<atposition+2 || dotposition+2>=username.length)){
        message.messageUserName='* Email invalid!'     
    } 
    else if(username.length===0){
        message.messageUserName='* Please fill in your email !'
    }
    else{ 
        isusername=true
    }
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
    if(isusername===true && ispassword===true){
        isSubmit=true
    }
    return { 
        isSubmit:isSubmit,
        message:message
    }
} 