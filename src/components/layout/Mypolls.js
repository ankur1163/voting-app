import React, { Component } from 'react';
import Api from '../../utils/ApiManager';
import Poll from '../presentation/Poll';

//final

class Mypolls extends Component {
    constructor(){
        super()
        this.state={
            list:[]
        }
    }
    componentWillMount(){
         var username;
        
        var obj = localStorage.getItem("profile")
        
        var parobj = JSON.parse(obj);
        username = parobj.email;
      
        Api.get('/api/polls/mypolls/'+username, null, (err, response) => {
			if (err) { 
				console.log("error mypolls",err); 
				return;
			}
			
			console.log('RESULTS my polls: ' + JSON.stringify(response.message));
			
			this.setState({
					list: response.message
				});
		});
        
    }
    
    render() {
       console.log("my polls",this.state.list)
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