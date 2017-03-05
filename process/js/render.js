var $ = jQuery = require('jquery');
var _ = require('lodash');
var bootstrap = require('bootstrap');
var fs = eRequire('fs');
var loadApts = JSON.parse(fs.readFileSync(dataLocation));

var React = require('react');
var ReactDom = require('react-dom');
var AptList = require('./AptList');

var MainInterface = React.createClass({
    getInitialState: function () {
        return {
            myAppoinments: loadApts
        };
    },

    componentDidUpdate: function(){
        fs.writeFile(dataLocation, JSON.stringify(this.state.myAppoinments), 'utf8', 
        function(err){
            if(err){
                console.log(err);
            }
        });
    },

    deleteMessage: function(item){
        var allApts = this.state.myAppoinments;
        var newApts = _.without(allApts, item);
        this.setState({
            myAppoinments: newApts
        });
    },
    render: function () {
        var myAppoinments = this.state.myAppoinments;

        myAppoinments = myAppoinments.map(function (item, index) {
            return (
                <AptList
                    key={index}
                    singleItem={item}
                    whichItem={item}
                    onDelete={this.deleteMessage} />
            );
        }.bind(this));

        return (
            <div className="application">
                <div className="container">
                    <div className="row">
                        <div className="appointments col-sm-12">
                            <h2 className="appointments-headline">Current Appointments</h2>
                            <ul className="item-list media-list">{myAppoinments}</ul>
                        </div>{/* col-sm-12 */}
                    </div>{/* row */}
                </div>{/* container */}
            </div>
        );
    }//render
});//MainInterface

ReactDom.render(
    <MainInterface />,
    document.getElementById("petAppointments")
);//render