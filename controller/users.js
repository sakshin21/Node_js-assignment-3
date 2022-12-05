const fs=require('fs');
const registration=((req,res)=>{
    let {name,email,password,age,city}=req.body;
    if(fs.existsSync(`users/${email}.txt`))
    {
        res.render('register',{errMsg:'Email already registered'});
    }
    else
    {
        fs.writeFile(`users/${email}.txt`,`${name}\n${email}\n${password}\n${age}\n${city}`,(err)=>{
            if(err){
                res.render('register',{errMsg:'Something went wrong'});
            }
            else{
                //res.render('register',{succMsg:'Registered Successfully'});
                res.redirect("/user/welcome/"+email);
            }
        });
    }
})

const login=((req,res)=>{
    let {email,password}=req.body;
    if(fs.existsSync(`users/${email}.txt`)){
        var array=fs.readFileSync(`users/${email}.txt`).toString().split("\n");
        if(array[2]===password){
            res.render('login',{succmsg:'Login Successfully'});
        }
        else{
            res.render('login',{errmsg:"Enter correct password"});
        }
    }else{
        res.render('login',{errmsg:"Email not found"});
    }
})

module.exports={
    registration,
    login
}
