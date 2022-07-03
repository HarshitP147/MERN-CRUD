import { useState } from "react";

import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import "../styles/UpdateModal.css";

const UpdateModal = (props) => {
    const data = props.updatedata;
    const onHide = props.onHide;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleUpdate = (e) => {
        e.preventDefault();

        const body = {
            id: data.user_id,
            name: name,
            email: email,
        };

        fetch(`/api/update/${data.user_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => {
            // console.log(res);
            if (res.status === 204) {
                setName("");
                setEmail("");
            } else {
                alert("Server could not update data!!");
            }
            onHide();
        });
    };

    return (
        <Container>
            <Modal
                centered
                {...props}
                backdrop="static"
                keyboard={false}
                size="lg"
                autoFocus
            >
                <Modal.Body>
                    <h3 className="text-center">
                        Updating for id {" : " + data.user_id}
                    </h3>
                    <br />
                    <Form method="POST">
                        <Form.Group className="d-flex justify-content-between align-items-center flex-column flex-lg-row">
                            <Form.Label>Name {" : " + data.name}</Form.Label>
                            <Form.Label>Email {" : " + data.email}</Form.Label>
                        </Form.Group>
                        <Form.Group className="d-flex justify-content-evenly gap-2 flex-column flex-lg-row">
                            <Form.Control
                                type="text"
                                className="w-100"
                                placeholder="Type new name here"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Control
                                type="email"
                                className="w-100"
                                placeholder="Type new email here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <h5 className="text-center">
                                Database id {" : " + data._id}
                            </h5>
                        </Form.Group>
                        <span className="fw-light">
                            Leave the entries blank if you don't want to change
                            any data
                        </span>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-evenly flex-column flex-lg-row gap-2 w-100">
                        <div className="btn btn-danger w-100" onClick={onHide}>
                            Cancel
                        </div>
                        <button
                            id="update-data-btn"
                            className="btn w-100"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};
export default UpdateModal;
