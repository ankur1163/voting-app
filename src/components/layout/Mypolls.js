import React, { Component } from 'react';
import Api from '../../utils/ApiManager';
import Poll from '../presentation/Poll';


class Mypolls extends Component {
    constructor(){
        super()
        this.state={
            list:[]
        }
    }
    componentWillMount(){
         var username;
        console.log("full profile real user",localStorage.getItem("profile"))
        var obj = localStorage.getItem("profile")
        console.log("parsed value realuser",JSON.parse(obj))
        var parobj = JSON.parse(obj);
        username = parobj.email;
      
        Api.get('/api/polls/'+username, null, (err, response) => {
			if (err) { 
				alert("Error: " + err); 
				return;
			}
			
			console.log('RESULTS: ' + JSON.stringify(response.message));
			
			this.setState({
					list: response.message
				});
		});
        
    }
    
    render() {
       
       	const listItems = this.state.list.map((poll, i) =>  {
			return (
				<li key={i}>
					<Poll currentPoll={poll} /> 
				</li>
			)
		});
	
        
        //const zoneStyle = styles.zone; // needs to be inside the render func!
        
        return(<div>
                <h2> My Polls  page is here </h2>
                {listItems}
                </div>);
    }
}

export default Mypolls