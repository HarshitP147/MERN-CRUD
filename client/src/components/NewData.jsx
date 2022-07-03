import { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import "../styles/NewData.css";

const NewData = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name) {
            const body = {
                name: name,
                email: email,
            };

            fetch("/api/newData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((res) => res.json())
                .then((data) => props.setDataList((list) => [...list, data]));

            props.setShow(false);
            setName("");
            setEmail("");
        } else {
            setError(true);
        }
    };

    return (
        <Container className="rounded shadow">
            <Form method="POST" className="p-3 ">
                <Form.Group
                    id="new-data"
                    className="d-flex justify-content-around align-items-baseline "
                >
                    <Form.Control
                        type="text"
                        placeholder="Enter the name of the new record"
                        id="new-name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value), setError(false);
                        }}
                    />
                    <Form.Control
                        type="email"
                        placeholder="Enter the email of the new record"
                        id="new-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div
                        id="new-data-btn"
                        className="btn "
                        onClick={handleSubmit}
                    >
                        Submit
                    </div>
                </Form.Group>
                {error && (
                    <div className="pt-2">
                        <span className="text-danger">
                            Please enter a name!!
                        </span>
                    </div>
                )}
            </Form>
        </Container>
    );
};
export default NewData;
