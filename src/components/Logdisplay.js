import React, { Component } from 'react';
//import './Selector.css';
import urlconfig from './urlconfig';

class Logdisplay extends Component {
    constructor(props) {
        super (props);
        this.state = {log : []};

        this.basicurl = urlconfig.basicurl;

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        console.log("Logdisplay mounted");
    }


    handleSubmit(event) {
        // console.log("click");
        // console.log(this.basicurl);
        fetch(this.basicurl+"getlog")
            .then(res => res.text())
            .then(data => this.setState({log: data.split('\n')}))
        event.preventDefault();

    }

    render() {

        let logList = this.state.log.map((item) => 
            <li key={item}>{item}</li>
            // console.log(item)
        );

        return (
            <div>
                <form onSubmit={this.handleSubmit}><p>Logfile: </p>
                    <input type="submit" value="Get log"/>
                </form>
                <ul>{logList}</ul>
            </div>

        );
    }
}

export default Logdisplay;