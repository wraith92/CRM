import React, {useMemo,useRef,useState} from "react";
import { useHistory } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import { useTable } from "react-table";


const Liste_auth = (props) => {
  const listauthRef = useRef();
  const history = useHistory;
  const [listauth, setListeAuth] = useState([]);

  const test = (rowIndex) => {
    const id = listauthRef.current[rowIndex].id;
    console.log(id)

    AuthService.remove_historiqueremove(id)
      .then((response) => {
        history.push("Register");

        let newTutorials = [...listauthRef.current];
        newTutorials.splice(rowIndex, 1);

        setListeAuth(newTutorials);
      })
      .catch((e) => {
        console.log('tets');
      });
  };
  const openTutorial = (rowIndex) => {
    const id = listauthRef.current[rowIndex].id;

    history.push("/tutorials/" + id);
  };

  
   const columns = useMemo(
    () => [
      {
        Header: "Userame",
        accessor: "username",
      },
      {
        Header: "Password",
        accessor: "password",
      },
      {
        Header: "message",
        accessor: "message",
      },
      {
        Header: "date de connection",
        accessor: "date_connection",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openTutorial(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteTutorial(rowIdx)}>
                <i className="bx bxs-trash-alt action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );
 



}
export default new Liste_auth();
