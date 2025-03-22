
import { useState } from 'react';
import './App.css';



const App = ()=>{


const [allValues , setValues] = useState ({
    username : "",
    email : "",
    gender : "",
    status : "active",
    errorMsg : ""
});




  const onSubmitUserDetail = async (e)=>{ //release event which receive parameters
    e.preventDefault();


    const{username, email, gender, status} = allValues;
    
    const api = "https://gorest.co.in/public/v2/users";
    const userDetails = {
    
        name : username,
        email : email,
        gender : gender,
        status : status
    }


    const options = {
    method : "post",
    headers : {
        "content-type" : "application/json",
        "Access" : "application/json",
        Authorization : "53dd4635bc69da823b6330785be8c9c72b9623b01769abc03ef583cd0168982e"
        },
        body : JSON.stringify(userDetails)

    }

    if(username ===  "" || email === "" || gender === ""){
    setValues({...allValues, errorMsg: "please fill out all the fields!!!"});

    }
    else{
    setValues({...allValues, errorMsg:""});
    
    try {
    const response = await fetch(api, options);

    
    const data = await response.json();

    if (response.ok === true){
    
    setValues({...allValues, errorMsg: "" });
    
    }
    else{
    setValues({...allValues, errorMsg: `${data[0].field} ${data[0].message}`});

    }

    
    } catch (error) {
console.log(error);
}
}
}

return(
    
    
    <div  className="app-cont">
    <h1  className="text-primary">Sign Up  form</h1>
    <br />

        <form    className="my-form" onSubmit={onSubmitUserDetail} >


        <label htmlFor="name">Name :</label> <br />
        <input onChange={(e)=>{setValues({...allValues,username : e.target.value})}} id='name' type="text" className='form-control'/>


        <br /><br />
        
        <label htmlFor="email">Email:</label><br />
        <input  onChange={(e)=>{setValues({...allValues , email : e.target.value})}} id ="email" type="text" className="form-control"/>
<br /><br />

<p>Gender:</p>
<label className="ml-3 mr-3"  htmlFor="female" >Male</label>
<input value="male" onChange={(e)=>{setValues({...allValues , gender : e.target.value})}} id="male" type="radio" name="gender"/> 
<label className="ml-2 mr-2"  htmlFor="female" >Female</label>
<input value="female" onChange={(e)=>{setValues({...allValues , gender : e.target.value})}} id="female" type="radio" name="gender"/>
<br /> <br />
<p>Status</p>

            <select onChange={(e)=>{setValues({...allValues , status : e.target.value})}} name = "status" className="form-control">
<option value="active">Active</option>
<option value="inactive">Inactive</option>

</select>

<br />

<button  type="Submit"  className="btn btn-primary btn-block">signup</button>
        </form>
        
        <p className='text-danger'> {allValues.errorMsg}</p>

    </div>


    )
}
export default App;
