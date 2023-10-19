import { faEnvelope, faLocationDot, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";




const EditAddress = () => {

    const [danhsachTinhThanh, setDanhSachTinhThanh] = useState([]);
    const getDanhSachTinhThanh = async () => {
        const resp = await axios.get('https://provinces.open-api.vn/api/')
        setDanhSachTinhThanh(resp.data.map(vitri => ({ code: vitri.code, districts: vitri.districts })))
        console.log(resp);
        
    }
    useEffect(() => {
        getDanhSachTinhThanh()
    }, [])

    const { Title, Text } = Typography;
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const validateMessages = {
        required: '${label} không đươc đễ trống',
        types: {
            email: '${label} Không hơp lệ',
            number: '${label} Không hơp lệ!',
            Phone: '${label} Không hơp lệ!'
        },
        // number: {
        //     range: '${label} phải trong khoảng từ ${min} đến ${max}',
        // },
        Phone: {
            range: '${label} phải ít nhất 10 chữ số',
        }

    };
    return (
        <>
            <Title level={2}
                align="center"
                style={{ paddingBottom: "10px" }}>
                Chỉnh sửa địa chỉ
            </Title>
            <Form
                // form={form}
                //         onFinish={postUngVien}
                {...layout}
                name="nest-messages"
                // onFinish={onFinish}
                style={{
                    maxWidth: 400,
                    paddingLeft: "10%"
                }}
                validateMessages={validateMessages}
            >
                <Row>
                    <Col span={2}>
                        <FontAwesomeIcon icon={faUser} />
                    </Col>
                    <Col>
                        <Text>Họ tên </Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name='Họ tên'
                            // label="Họ tên"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Họ tên" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <FontAwesomeIcon icon={faPhone} />
                    </Col>
                    <Col>
                        <Text>Số điện thoại </Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name='Số điện thoại'
                            // label="Số điện thoại"
                            rules={[
                                {
                                    type: 'phone',
                                },
                                { required: true }
                            ]}>
                            <Input placeholder="Số điện thoại" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </Col>
                    <Col>
                        <Text>Địa chỉ email</Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name='email'
                            // label="Địa chỉ email"
                            rules={[
                                {
                                    type: 'email',
                                },
                                { required: true }
                            ]}
                        >
                            <Input placeholder="Địa chỉ email" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </Col>
                    <Col>
                        <Text>Tỉnh, thành phố </Text>
                    </Col>
                </Row>
                
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name='Tỉnh, thành phố'
                            // label="Tỉnh, thành phố"
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="Tỉnh, thành phố" key={danhsachTinhThanh.code} options={danhsachTinhThanh.name}></Select>
                           
                        </Form.Item>
                    </Col>
                </Row>
               
                <Row>
                    <Col span={2}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </Col>
                    <Col>
                        <Text>Quận, Huyện </Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name='Quận, Huyện'
                            // label="Quận, Huyện"
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="Quận, Huyện" options={danhsachTinhThanh} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </Col>
                    <Col>
                        <Text>Địa chỉ cụ thể </Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name='Địa chỉ'
                            // label="Địa chỉ cụ thể"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Địa chỉ cụ thể" />
                        </Form.Item>
                    </Col>
                </Row>
                <Button type="primary" htmlType="submit" style={{ marginTop: "10px", color: "yellow" }}>
                    Lưu thông tin
                </Button>
            </Form>
        </>
    )
}

export default EditAddress;