import React from "react";

function ColaboratorsForm() {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.id = "ff-script";
  //   script.src =
  //     "https://formfacade.com/include/115140183290459632367/form/1FAIpQLSdGsKMf39pNZsxPJvGulgs3DNpN13ZA4PVUnBEfQOnQ8oeU6g/clean.js?div=ff-compose";
  //   script.defer = true;
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

  return (
    <div className="new-member-form">
      {/* <div id="ff-compose" className="my-5"></div> */}
      <div className="row">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdGsKMf39pNZsxPJvGulgs3DNpN13ZA4PVUnBEfQOnQ8oeU6g/viewform?embedded=true"
          width="640"
          height="2010"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          title="formularios de colaboradores"
        >
          Cargando…
        </iframe>
      </div>
    </div>
  );
}

export default ColaboratorsForm;
