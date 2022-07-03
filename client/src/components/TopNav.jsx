import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import "../styles/TopNav.css";

const TopNav = () => {
    return (
        <>
            <Navbar id="topnav" className="text-light">
                <Container>
                    <h4 className="py-1">MERN Stack CRUD App</h4>
                    <h6 className="text-muted">
                        Developed by
                        <a
                            href="https://www.github.com/HarshitP147"
                            target={"_blank"}
                            className="text-light text-decoration-none ms-1"
                        >
                            Harshit Pandit
                        </a>
                    </h6>
                </Container>
            </Navbar>
        </>
    );
};
export default TopNav;
