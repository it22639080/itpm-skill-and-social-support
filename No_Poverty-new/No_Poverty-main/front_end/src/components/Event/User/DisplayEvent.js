import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Modal, Button, Input, Form } from "antd";
import { ReadOutlined } from "@ant-design/icons";
import PageWithTitleSearch from "../../common/PageWithTitleSearch";

const DisplayEvent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDetails, setAllEventDetails] = useState([]);
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [eventId, setEventId] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/event/getAll")
      .then((res) => {
        setAllEventDetails(res.data.Event);
        setEventId(res.data.Event[0]?._id);
      })
      .catch(() => alert("Check The Connectivity"));
  }, []);

  const handleSubmit = () => {
    axios
      .post(`http://localhost:4000/event/${eventId}/registered-entities`, { id, name })
      .then(() => window.location.reload(false))
      .catch((err) => alert(err));
  };

  const showModal = (eventId) => {
    setSelectedEventId(eventId);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <PageWithTitleSearch title="Upcoming Events">
      {eventDetails.map((event) => (
        <Card
          key={event._id}
          title={event.eventName}
          bordered={false}
          style={{ marginBottom: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}
          extra={<span style={{ color: event.eventStatus === "Active" ? "green" : "red" }}>{event.eventStatus}</span>}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <Card style={{ flex: 1 }} title="Location">{event.eventPlace}</Card>
            <Card style={{ flex: 1 }} title="Date">{event.eventDate}</Card>
          </div>
          <Card style={{ marginTop: "10px" }} title="Description">
            <p>{event.eventDetails.length > 120 ? event.eventDetails.substring(0, 120) + " ..." : event.eventDetails}</p>
            <div style={{ textAlign: "right" }}>
              <ReadOutlined onClick={() => showModal(event._id)} style={{ color: "#5DBB63", cursor: "pointer", fontSize: "18px" }} />
            </div>
          </Card>
          {selectedEventId === event._id && (
            <Modal open={modalVisible} onCancel={handleCancel} footer={null}>
              <Form onFinish={handleSubmit}>
                <Card title="Description">{event.eventDetails}</Card>
                <h3 style={{ textAlign: "center", margin: "10px 0" }}>Participate in Event</h3>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
                  <Input onChange={(e) => setname(e.target.value)} />
                </Form.Item>
                <Form.Item label="ID No" name="id" rules={[{ required: true, message: "Please input your ID!" }]}>
                  <Input onChange={(e) => setid(e.target.value)} />
                </Form.Item>
                <div style={{ textAlign: "right" }}>
                  <Button type="primary" htmlType="submit">Participate</Button>
                </div>
              </Form>
            </Modal>
          )}
        </Card>
      ))}
    </PageWithTitleSearch>
  );
};

export default DisplayEvent;
