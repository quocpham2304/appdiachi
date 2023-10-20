
import { Card, Row, Button, Typography, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { apiConstants, token } from '../Const/api';
import { Navigate, useNavigate } from 'react-router';

const ListAddress = () => {
    const { Title, Text } = Typography;
    const [danhSachDiaChi, setDSDC] = useState([]);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/appdiachi/themmoidiachi/');
     };
    const getDSDC = async () => {
        
        const res = await axios.get(apiConstants.DANH_SACH_DIA_CHI, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        setDSDC(res.data.data);
        console.log(danhSachDiaChi);
    };
    useEffect(() => {
        getDSDC();
       
    }, []);
    return (
        <>
            <Col gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }}>
                <Card
                    className='box-address'
                    align="center"
                    style={{
                        width: "80%",
                        textAlign: 'center',
                        marginLeft: "10%",
                        marginTop: "10px",
                    }}>
                    <Row align="middle" style={{ paddingLeft: "50%" }} >
                        <PlusOutlined />
                    </Row>
                    <Row
                        align="middle"
                        style={{ alignItems: "center", paddingLeft: "40%" }}>
                        <Button onClick ={handleClick}>
                            thêm mới
                        </Button>
                    </Row>
                </Card>
            </Col>

            <Col gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }}
                style={{

                    alignItems: "center"
                }}>
                {danhSachDiaChi.map((data, index) => {
                    return (
                        <Row align="middle">
                            <Card
                                className='box-address'
                                align="center"
                                style={{
                                    width: "80%",
                                    textAlign: 'center',
                                    marginLeft: "10%",
                                    marginTop: "10px"
                                }}
                            >
                                <Row align="middle">

                                    <Title level={3} style={{ paddingLeft: '2%' }}>
                                        Họ và tên: {data.name}
                                    </Title>

                                </Row>
                                
                            <Row >
                                <Col span={2}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </Col>
                                <Col>
                                    <Text type='secondary'>
                                        Địa chỉ
                                    </Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {data.address},
                                    {data.state},{data.city},
                                    {data.country}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={2}>
                                    <FontAwesomeIcon icon={faPhone} />
                                </Col>
                                <Col>
                                    <Text type='secondary'>
                                        Số đện thoại
                                    </Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {data.phone}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={2}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </Col>
                                <Col>
                                    <Text type='secondary'>
                                        Địa chỉ Email
                                    </Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {data.email}
                                </Col>
                            </Row>
                            {/* <Row style={{ paddingLeft: "2%" }}>
                                <Button
                                    // href="/appdiachi/chinhsuadiachi/"
                                    onClick={() => Navigate(`/appdiachi/chinhsuadiachi//${data.xid}`)} >
                                    Chỉnh sửa
                                </Button>
                            </Row> */}

                            </Card>

                        </Row>
                 )}
                )} 
            </Col>

        </>
    )
}

export default ListAddress;