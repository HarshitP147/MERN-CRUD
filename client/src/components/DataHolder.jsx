import Card from "react-bootstrap/Card";

import "../styles/DataHolder.css";

const DataHolder = (props) => {
    const data = props.data;
    const deleteUser = props.deleteUser;

    return (
        <div className="col-12  col-md-6 col-lg-4 my-2 my-lg-3 p-4 shadow-lg rounded rounded-2">
            <Card className="shadow-lg">
                <div className="border-0 ">
                    <Card.Title className="text-center">
                        <h2>{data.name}</h2>
                    </Card.Title>
                </div>
                <div className="">
                    <table className="ms-3 " width={"100%"}>
                        <tbody>
                            <tr>
                                <th>
                                    <span>Email</span>
                                </th>
                                <td>
                                    <span>{data.email}</span>
                                </td>
                            </tr>
                            <tr className="justify-content-evenly">
                                <th>
                                    <span>User id</span>
                                </th>
                                <td>
                                    <span>{data.user_id} </span>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <span>Database id</span>
                                </th>
                                <td className="text-wrap">
                                    <span>{data._id}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Card.Footer className="d-flex align-items-baseline justify-content-around justify-content-md-between">
                    <div
                        style={{ width: "7rem" }}
                        className="btn btn-primary"
                        onClick={() => props.updateUser(data)}
                    >
                        Update
                    </div>
                    <div
                        style={{ width: "7rem" }}
                        className="btn btn-danger"
                        onClick={() => deleteUser(data.user_id)}
                    >
                        Delete
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
};
export default DataHolder;
