import React from 'react';

class QuickAddInfo extends React.Component{
    render(){
        return <div style={{display:this.props.showInfo ? 'flex' : 'none'}}>
            <h1>Quick Add Instructions</h1>
            <p>
                Quick Add is a feature that allows you to search for a skater.  
                As you type, the list will update with only skaters which have 
                names with that exact match anywhere in their name of the 
                letters you type into the search field.  The search is NOT case 
                sensitive so if you type 'a', any name with either 'a' or 'A' 
                will match and show up in the list.
            </p>
        </div>
    }
}

export default QuickAddInfo;