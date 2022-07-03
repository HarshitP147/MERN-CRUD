import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

import TopNav from "./components/TopNav";
import DataHolder from "./components/DataHolder";
import NewData from "./components/NewData";
import UpdateModal from "./components/UpdateModal";

import "./styles/App.css";

function App() {
    const [query, setQuery] = useState("");
    const [dataList, setDataList] = useState([]);
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [update, setUpdate] = useState({});

    useEffect(() => {
        if (query) {
            setDataList((list) =>
                list.filter((users) => users.name.match(query))
            );
        } else {
            fetch("/api/data")
                .then((res) => res.json())
                .then((data) => setDataList(data));
        }
    }, [query]);

    const updateUser = (data) => {
        setModalShow(true);
        setUpdate(data);
    };

    const deleteUser = (id) => {
        fetch(`/api/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.text())
            .then((data) => {
                if (data === "true") {
                    setDataList((list) =>
                        list.filter((users) => users.user_id != id)
                    );
                } else {
                    alert("Server could not delete the data!!");
                }
            });
    };

    function closeModal() {
        setModalShow(false);
        fetch("/api/data")
            .then((res) => res.json())
            .then((data) => setDataList(data));
    }

    document.title = "MERN CRUD app";
    return (
        <>
            <TopNav />
            <main id="cover">
                <header>
                    <Container
                        id="controller"
                        className="my-4 d-flex align-items-center justify-content-between"
                    >
                        <div id="search" className="input-group">
                            <input
                                type={"text"}
                                className="form-control shadow"
                                placeholder="Search through names"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button
                                style={{
                                    backgroundColor: "#2f19f4",
                                    border: "none",
                                    width: "6em",
                                }}
                                className="shadow-sm"
                                onClick={() => setQuery("")}
                            >
                                Clear
                            </Button>
                        </div>
                        <button
                            id="new-rec"
                            className="btn shadow text-nowrap"
                            onClick={() => setShow((value) => !value)}
                        >
                            New record
                        </button>
                    </Container>
                </header>
                {show && (
                    <NewData setShow={setShow} setDataList={setDataList} />
                )}
                <main className="my-4">
                    <UpdateModal
                        show={modalShow}
                        updatedata={update}
                        onHide={closeModal}
                    />
                    <Container className="d-grid">
                        <Row>
                            {dataList.map((data, index) => (
                                <DataHolder
                                    key={index}
                                    data={data}
                                    updateUser={updateUser}
                                    deleteUser={deleteUser}
                                />
                            ))}
                        </Row>
                    </Container>
                </main>
            </main>
        </>
    );
}
export default App;
