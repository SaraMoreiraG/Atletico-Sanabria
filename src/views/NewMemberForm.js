import React, { useEffect } from "react";

function NewMemberForm() {

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "ff-script";
    script.src =
      "https://formfacade.com/include/115140183290459632367/form/1FAIpQLSe9VlnRraXky_wi2Hi_R_wJC49WWc5wLPDXtmTu2UZF9VCk2Q/clean.js?div=ff-compose";
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="new-member-form">
      <div id="ff-compose" className="my-5"></div>
    </div>
  );
}

export default NewMemberForm;
