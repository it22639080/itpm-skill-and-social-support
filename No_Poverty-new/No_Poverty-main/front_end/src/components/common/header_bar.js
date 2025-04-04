import { Layout, Menu, theme, Col, Row } from "antd";
import logo from "../../assets/images/logo2.png";
import "../../assets/styles/style.css";
import "../../assets/styles/header.css";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logout from "../User/Logout";
const { Header, Content, Footer } = Layout;
const userName = "John Doe"; // Replace this with the actual user's name

const Header_bar = (props) => {
  const { opennav, open } = props;
  const navigate = useNavigate();
  const [name, setName] = useState(""); // State to hold the username
  const id = useParams();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        className="site-layout-background"
        style={{ justifyContent: "space-between" }}
      >
        
        <Row
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Col>
            <img
              src={logo}
              alt="Logo"
              width={50}
              style={{ marginTop: "30px" }}
            />
          </Col>
          <Col>
          <a href="/userDash" className="text-gray-600 hover:text-purple-600 transition-colors">Home</a>
          <a href="/adsUserView" className="text-gray-600 hover:text-purple-600 transition-colors">Donate Now</a>
          <a href="/showDonation" className="text-gray-600 hover:text-purple-600 transition-colors">My Donation</a>
          <a href="/showVacancies" className="text-gray-600 hover:text-purple-600 transition-colors">Job Portal</a>
          <a href="/appliedJobs" className="text-gray-600 hover:text-purple-600 transition-colors">Applied Jobs</a>
          <a href="/userEvent" className="text-gray-600 hover:text-purple-600 transition-colors">Events</a>
          </Col>
          <Col>
            <h1 style={{ color: "white" }}>HelpingHands</h1>
          </Col>
          
          <Logout />
        </Row>
      </Header>
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={""}
        />
        {/* </Header> */}
      </div>
    </Layout>
  );
};
export default Header_bar;
