
class checkedForm{

   required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          ce champs ne doit pas etre vide 
        </div>
      );
    }
  };
  


 
   vsiret = value => {
    if (isNaN(value) || (value.length !== 14)) {
      return (
        <div className="alert alert-danger" role="alert">
          siret invalide :(.
        </div>
      );
    }
  };
  
   vsiren = value => {
   if (isNaN(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid siren.
        </div>
      );
    }
  };
  
   vnom_soc = value => {
    if ((value.length<4)) {
      return (
        <div className="alert alert-danger" role="alert">
         nom socitété invalide !.
        </div>
      );
    }
  };
  
   vnom_responsable = value => {
    if ((value.length<4)) {
      return (
        <div className="alert alert-danger" role="alert">
          nom responsable invalide !.
        </div>
      ); 
    }
  };
  
   vdate_creation_soc = value => {
    if ((value.length<4)) {
      return (
        <div className="alert alert-danger" role="alert">
          date invalide !
        </div>
      );
    }
  };
  
   vactivité = value => {
    if ((value.length<4)) {
      return (
        <div className="alert alert-danger" role="alert">
          activité invalide !
        </div>
      );
    }
  };
   vadresse = value => {
    if ((value.length<4)) {
      return (
        <div className="alert alert-danger" role="alert">
          adresse invalide !
        </div>
      );
    }
  };
   vpays = value =>{
    if ((value.length<4)) {
      return (
        <div className="alert alert-danger" role="alert">
          pays invalide !
        </div>
      );
    }
  }
  
   cville = value => {
    if (value.length < 2 || value.length > 30) {
      return (
        <div className="alert alert-danger" role="alert">
          ville invalide !
        </div>
      );
    }
  };
  
   vcode_postal = value => {
    if (value.length < 4 || value.length > 10) {
      return (
        <div className="alert alert-danger" role="alert">
          code postal invalide !
        </div>
      );
    }
  };
  
   vopportunité = value => {
    if (value.length < 4) {
      return (
        <div className="alert alert-danger" role="alert">
           opportunité invalide !
        </div>
      );
    }
  };
  
   vobservation = value => {
    if (value.length < 4) {
      return (
        <div className="alert alert-danger" role="alert">
           opportunité invalide !
        </div>
      );
    }
  };
  
   vtel = value => {
    if (value.length < 4 || value.length > 10) {
      return (
        <div className="alert alert-danger" role="alert">
           télephone doit pas etre vide :( !
        </div>
      );
    }
  };
  
   vid_role = value => {
    if (isNaN(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          1 or 2.
        </div>
      );
    }
  };
  
  
}
export default new checkedForm();
