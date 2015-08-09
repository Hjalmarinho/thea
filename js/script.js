var Comp = React.createClass({

        do: function(){
          alert("Hello sucker " + this.props.children);
        },

        render: function(){
          return (
              <div>
              <h3>{this.props.name}</h3>
              <a onClick={this.do} href="#">Click me</a>
              </div>
            );
        }

      });

var Header = React.createClass({
  render: function(){
    return (
      <div className="ui secondary vertical pointing menu">
        <a className="item active">
          Home
        </a>
        <a className="item">
          Messages
        </a>
        <a className="item">
          Friends
        </a>
      </div>
      );
  }
});

React.render(
  <Header />,
  document.getElementById('header'));

