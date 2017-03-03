import React, { Component } from 'react';
import Poll from './Poll';
import Api from '../../utils/ApiManager';
import {Link} from 'react-router';
//waste

class CreatePoll extends Component {
    constructor(){
        super()
            this.state = {
                poll:{
                    pollquestion: '',
                    author: '',
                    responses: [],
                    loggedin:false
                    
                    
                }
        };
    }
    
    componentWillMount(){
        if(localStorage.getItem("profile")){
            console.log("full profile",localStorage.getItem("profile"))
        var obj = localStorage.getItem("profile")
        console.log("component will mount parsed value",JSON.parse(obj))
        var parobj = JSON.parse(obj);
        var username = parobj.email;
        console.log("componentwill mount email is",username)
        this.setState({author:username,loggedin:true})
            
        }
        else{
            
        }
         
         
         
        
        
    }
    updatePoll(event){
       

        // WRONG!!! Never mutate state!!
        // this.state.comment['username'] =event.target.value; 
        let updtPoll = Object.assign({}, this.state.poll);
        updtPoll[event.target.id] = event.target.value;
        

        this.setState({
            poll: updtPoll
        });
        console.log("poll",this.state.poll)
        
    }
   
    

    submitPoll(event){
        var username;
         if(localStorage.getItem("profile")){
            console.log("full profile",localStorage.getItem("profile"))
        var obj = localStorage.getItem("profile")
        console.log("parsed value",JSON.parse(obj))
        var parobj = JSON.parse(obj);
        username = parobj.email;
        console.log("email is",username)
        this.setState({author:username,loggedin:true})
            
        }
        else{
            
        }
       
        // call the function from the container (not here as this is presentation layer)
        //this.props.onCreate(this.state.poll);fg
        
        let pollObject = Object.assign({},this.state.poll);
        pollObject.author=username;
        console.log("state copied",pollObject);
        // var arr1 =this.state.poll.responses.split(","); // don't do this here
        // var arr2=[];
        // for(var i=0;i<arr1.length;i++){
        //     arr2.push({response:arr1[i],votes:0})
            
        // }
         // pollObject["responses"]=this.state.poll.responses;
          console.log("final pollObject",pollObject)
        	Api.post('/api/polls', pollObject, (err, response) => {
			if (err) { 
				alert("Error: " + JSON.stringify(err)); 
				return;
			}
			
			console.log('this is response after saving: ' + JSON.stringify(response.message));
			
			
		});
    }
    
    render(){	
        return (
			<div>
        			<nav role="navigation">
                     <div className="container-fluid">
                        <div className="navbar-header">
                            <ul className="nav navbar-nav navbar-right">
                              <li><a href="/login" title="signin">Sign in</a></li>
                              <li><a href="/mypolls" title="My Polls">My Polls</a></li>
                              
                              <li><Link to="/createPoll">Create Poll</Link></li>
                           
                            </ul>
                        </div>
                     </div>
                    </nav>
              Add a new poll:<br/>
                    
                    <input onChange={this.updatePoll.bind(this)} id="pollquestion" className="form-control" type="text" placeholder="Poll question" value={this.state.poll.pollquestion}/>
                    <br/>
                    <input onChange={this.updatePoll.bind(this)} id="author" className="form-control" type="text" placeholder="Author"/>
                    <br/>
                    <input onChange={this.updatePoll.bind(this)} id="responses" className="form-control" type="text" placeholder="response" value={this.state.poll.responses}/>
                    <p>NB: add multiple responses using ; </p>
                 
                    <br/>
                    <button onClick={this.submitPoll.bind(this)} className="btn btn-info" >Send</button>
            </div>
	    )
    }
    
}
        /* Removed Timestamp field : /*  <!-- input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="Time"/ -->*/
export default CreatePoll