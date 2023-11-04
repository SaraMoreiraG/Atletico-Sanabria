import React from "react";
class NewMemberForm extends React.Component {
  render() {
    return <div id="ff-compose"></div>;
  }
  componentDidMount() {
    var script = document.createElement("script");
    script.id = "ff-script";
    script.src = "https://formfacade.com/include/117873153172965594970/form/1FAIpQLScZHQ6_lXv-3LrWfzErgO5QDGoEPlwQ-6hvS8EFFhQhqC7nKg/clean.js?div=ff-compose";
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);
  }
}
export default NewMemberForm;
