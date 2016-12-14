var DisplayContainer = React.createClass({
    updateValue:function(modifiedValue){
        this.setState({
            value: modifiedValue
        })
    },
    getInitialState:function(){
        return{
            value:'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*'
        }
    },
    rawMarkup: function(value) {
        var rawMarkup = marked(value, {sanitize: true});
        return { __html: rawMarkup };
    },
    render:function(){
        return (
            <div className="row">
                <div className="col-md-6">
                    <RawInput value={this.state.value} updateValue={this.updateValue}/>
                </div>
                <div className="col-md-6">
                    <span dangerouslySetInnerHTML={this.rawMarkup(this.state.value)} />
                </div>
            </div>
        );
    }
});

var RawInput = React.createClass({
    update:function(){
        var modifiedValue=this.refs.inputValue.getDOMNode().value;
        this.props.updateValue(modifiedValue);
    },
    render:function(){
        return (<textarea rows="22" type="text" ref="inputValue" value={this.props.value} onChange={this.update} className="form-control" />)
    }
});

React.render(<DisplayContainer />,document.getElementById("container"));










//var App = React.createClass({
//    getInitialState: function() {
//        var value = 'Heading \n======= \n\nSub-heading \n----------- \n\n### Another deeper heading \n\nParagraphs are separated \nby a blank line.  \n\nLeave 2 spaces at the end of a line to do a line break  \n \nText attributes *italic*, **bold**, `monospace`, ~~strikethrough~~ . \n\nShopping list: \n* apples \n* oranges \n* pears \n\nNumbered list: \n\n1. apples \n2. oranges \n3. pears  \n\nThe rain---not the reign---in Spain.  \n\n *Text borrowed from [Herman Fassett](https://freecodecamp.com/hermanfassett)*';
//        return { value: value, html: marked(value, {sanitize: true}) };
//
//    },
//    parseText: function(newText) {
//        var parsed = marked(newText, {sanitize: true});
//        this.setState({ value: newText, html: parsed });
//    },
//    render: function() {
//        var html = this.state.html;
//        return (
//            <div>
//                <h1 id="title">Luke's Markdown Previewer</h1>
//                <div className="container">
//                    <InputBox
//                        value={this.state.value}
//                        onChange={this.parseText}
//                    />
//                    <OutputBox value={this.state.html} />
//                </div>
//            </div>
//        );
//    }
//});
//
//var InputBox = React.createClass({
//    handleChange: function (e) {
//        var inputText = e.target.value;
//        this.props.onChange(inputText);
//    },
//    render: function() {
//        return (
//            <div className="input">
//                <h2>Input</h2>
//        <textarea
//            value={this.props.value}
//            onChange={this.handleChange}
//        />
//            </div>
//        );
//    }
//});
//
//var OutputBox = React.createClass({
//    render: function() {
//        var html = this.props.value;
//        return (
//            <div className="output">
//                <h2>Output</h2>
//                <div id="outputbox" dangerouslySetInnerHTML={{ __html: html }} />
//            </div>
//        );
//    }
//});
//
//ReactDOM.render(
//    <App />,
//    document.getElementById('app')
//);/**
// * Created by Hairy on 11/8/2016.
// */
//
