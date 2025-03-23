import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Collapse, Input, Modal, Space, Typography } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { Search } = Input;
const { Panel } = Collapse;

const AllEvent = () => {
    const [eventDetails, setAllEventDetails] = useState([]);
    const [searchDetail, setsearchDetail] = useState("");
    const [eventId, setEventId] = useState("");
    const [count, setcount] = useState(0);
    const { confirm } = Modal;

    useEffect(() => {
        axios.get("http://localhost:4000/event/getAll")
            .then((res) => setAllEventDetails(res.data.Event))
            .catch(() => alert("Check The Connectivity"));
    }, []);

    function deleteEventDetail(id) {
        axios.delete(`http://localhost:4000/event/delete/${id}`)
            .then(() => window.location.reload(false))
            .catch(() => alert("Error Occurred On Delete"));
    }

    const showPromiseConfirm = (val) => {
        confirm({
            title: "Do you want to delete this event?",
            icon: <ExclamationCircleFilled />,
            content: "Once deleted, this event cannot be restored.",
            async onOk() {
                try {
                    await deleteEventDetail(val._id);
                } catch {
                    console.log("Oops, an error occurred!");
                }
            },
        });
    };

    const handleEventSelect = (eventId) => {
        setEventId(eventId);
        setcount(0);
        axios
            .get(`http://localhost:4000/event/${eventId}/registered-entities-count`)
            .then((res) => setcount(res.data))
            .catch(() => alert("Something went wrong while fetching count"));
    };

    const showCount = (eid, cid) => (eid === cid ? count.count : 0);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '10px' }}>
            <div style={{ width: '90%', background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
                <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Event Main</h1>
                <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <Link to={'/addevent'}>
                        <Button style={{ backgroundColor: '#007BFF', color: 'white', borderRadius: '6px' }}>Add Event</Button>
                    </Link>
                    <Search placeholder="Search events" allowClear enterButton="Search" size="middle" onSearch={setsearchDetail} style={{ width: '35%' }} />
                </section>
                {eventDetails.filter(val => searchDetail === "" || val.eventName.toLowerCase().includes(searchDetail.toLowerCase()))
                    .map((eventDetailsVal, index) => (
                        <Collapse key={index} accordion>
                            <Panel header={<Badge count={eventDetailsVal.eventNo} style={{ backgroundColor: '#FF5722' }}/>} extra={<Badge count={eventDetailsVal.eventDate} style={{ backgroundColor: '#673AB7' }}/>}>
                                <Card title={eventDetailsVal.eventName} extra={
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Link to={`/updateEvent/${eventDetailsVal._id}`}>
                                            <Button style={{ backgroundColor: '#FFA500', color: 'white' }}>Edit</Button>
                                        </Link>
                                        <Link to={`/printDetails/${eventDetailsVal._id}`}>
                                            <Button style={{ backgroundColor: '#00BCD4', color: 'white' }}>Print</Button>
                                        </Link>
                                        <Button style={{ backgroundColor: '#F44336', color: 'white' }} onClick={() => showPromiseConfirm(eventDetailsVal)}>Delete</Button>
                                    </div>
                                }>
                                    <Typography style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "10px" }}>
                                        <Button style={{ backgroundColor: "#dbe0ed", width: "20%", padding: '10px', textAlign: 'center', borderRadius: '4px' }} onClick={() => handleEventSelect(eventDetailsVal._id)}>
                                            Participants
                                        </Button>
                                        <Link to={`/AllParticipants/${eventDetailsVal._id}`}>
                                            <Button style={{ backgroundColor: "#dbe0ed", width: "20%", padding: '10px', textAlign: 'center', borderRadius: '4px' }}>
                                                {showCount(eventDetailsVal._id, count.id)}
                                            </Button>
                                        </Link>
                                    </Typography>
                                    <Card title="Location" style={{ marginTop: '15px' }}>{eventDetailsVal.eventPlace}</Card>
                                    <Card title="Description" style={{ marginTop: '10px' }}>{eventDetailsVal.eventDetails}</Card>
                                </Card>
                            </Panel>
                        </Collapse>
                    ))}
            </div>
        </div>
    );
};

export default AllEvent;