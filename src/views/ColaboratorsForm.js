import React, { useEffect } from "react";

function ColaboratorsForm() {

  useEffect(() => {
    const script = document.createElement("script");
    script.id = "ff-script";
    script.src =
      "https://formfacade.com/include/115140183290459632367/form/1FAIpQLSdGsKMf39pNZsxPJvGulgs3DNpN13ZA4PVUnBEfQOnQ8oeU6g/clean.js?div=ff-compose";
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

export default ColaboratorsForm;
