import React, { Component } from 'react'

export default class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons1: JSON.stringify({ "appname": "com.google.android.play.games", "id": "1", "token": "ffjjifd" }),
            result: []
        };
    }
    componentDidMount() {
     
    }
    test = () => {
        window.backend.basiconfo(this.state.persons1).then((result) => {
            alert(result)
            this.setState({result : result})
        });
    }
    render() {
        return (
            <div>
                {this.state.result && this.state.result}
                <button onClick={this.test}>hhh</button>
            testing          </div>
        )
    }
}
