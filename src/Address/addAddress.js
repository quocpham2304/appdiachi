import { faEnvelope, faLocationDot, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row, Select, Typography, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { apiConstants, token } from "../Const/api";

const AddAddress = () => {
    const { Title, Text } = Typography;
    const [danhSachTinhThanh, setDSTT] = useState([]);
    const [danhSachQuanHuyen, setDSQH] = useState([]);
    const [form] = useForm();
    const [api, contextHolder] = notification.useNotification();
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

    const getDanhSachTinhThanh = async () => {
        const resp = await axios.get('https://provinces.open-api.vn/api/?depth=2')
        setDSTT(resp.data.map(tinhthanh => {
            return {
                name: tinhthanh.name,
                code: tinhthanh.code,
                districts: tinhthanh.districts.map(item =><>{item.name}</> )
            }
        }))
        console.log(resp);
        console.log(danhSachTinhThanh);
    };
    const getDanhSachQuanHuyen = async () => {
        const res = await axios.get('https://provinces.open-api.vn/api/?depth=2')
        let newData = await res.data[0].districts;
        console.log(res);
        console.log(danhSachQuanHuyen);
        setDSQH(newData);
        console.log(newData);
        
    };
    const postDSDC = async () => {

        const body = {
            name: form.getFieldValue('name'),
            phone: form.getFieldValue('phone'),
            email: form.getFieldValue('email'),
            city: form.getFieldValue('city'),
            state: form.getFieldValue('state'),
            address: form.getFieldValue('address'),
            country: form.getFieldValue('country'),
            zipcode: form.getFieldValue('zipcode'),
            shipping_address: form.getFieldValue('shipping_address'),
        }
        await axios.post(apiConstants.TAO_DIA_CHI, body,{
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((success) =>{
                notification.destroy()
                notification.success({
                    message: 'Thêm địa chỉ thành công',
                    
                })
                console.log(body);
                Navigate('/appdiachi')
            })
            .catch((error) =>{
                notification.destroy()
                notification.error({
                    message: 'Thêm địa chỉ thất bại',
                    
                })
                console.log(body);
            })
    }

    useEffect(() => {
        getDanhSachTinhThanh()
        getDanhSachQuanHuyen()

    }, []);
    

    return (
        <>
        {contextHolder}
            <Title level={2}
                align="center"
                style={{ paddingBottom: "10px" }}>
                Thêm mới địa chỉ
            </Title>
            <Form
                form={form}
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
                            name='name'
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
                            name='phone'
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
                            name='city'
                            // label="Tỉnh, thành phố"
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder="Tỉnh, thành phố"
                                // key={tinhthanh.code}
                                options={danhSachTinhThanh.map((tinhthanh) => {
                                    return { label: tinhthanh.name, value: tinhthanh.name };
                                })}
                            />

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
                {/* {danhsachTinhThanh.map((tinhthanh, index) => {
                    return ( */}
                    <Col span={24}>
                        <Form.Item
                            name='state'
                            // label="Quận, Huyện" 
                        >
                            <Select
                            // key={danhSachQuanHuyen.province_codee}
                                placeholder="Quận, Huyện"
                                // options={danhsachTinhThanh} 
                                options={danhSachQuanHuyen.map((Quanhuyen) => {
                                    return { label: Quanhuyen.name, value: Quanhuyen.code};
                                })}
                            />
                        </Form.Item>
                    </Col>
                     {/* )})} */}
                </Row>
                <Row>
                    <Col span={2}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </Col>
                    <Col>
                        <Text>Zip code </Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name='zipcode'
                        >
                            <Input
                            placeholder="zipcode"
                            />
                        </Form.Item>
                    </Col>
                     {/* )})} */}
                </Row>
                <Row>
                    <Col span={2}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </Col>
                    <Col>
                        <Text> Đất Nước </Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name='country'
                            // label="Quận, Huyện" 
                        >
                            <Input
                           placeholder="đất nước"
                            />
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
                            name='address'
                            // label="Địa chỉ cụ thể"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Địa chỉ cụ thể" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </Col>
                    <Col>
                        <Text>Địa chỉ Vận chuyển </Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            name='shipping_address'
                            // label="Địa chỉ cụ thể"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Địa chỉ Vận chuyển" />
                        </Form.Item>
                    </Col>
                </Row>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: "10px", color: "yellow" }}
                 onClick={postDSDC}
                >
                    Lưu thông tin
                </Button>
            </Form>
        </>
    )
}

export default AddAddress;