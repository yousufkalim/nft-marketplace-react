import React, {useState} from "react";
import {
    Input,
    Form,
    Button,
    Switch,
  } from "antd";
  import $ from 'jquery'; 
// import FeaturedCard from "../../components/presentational/FeaturedCard/FeaturedCard";
import "./editProfile.scss";
import useWindowSize from "../../helpers/hooks";
import HEADER_EDIT_MOBILE from '../../images/PageHeader.png'
const EditProfile = () => { 
    const [browserWidth] = useWindowSize();
    const [activeIndex, setActiveIndex] = useState(1);
    const handleClick = (index) => {
        setActiveIndex(index);
    }
    const checkActive = (index, className) => activeIndex === index ? className : "";
    if ($(window).width() < 767) {
        $('.edit_profile_1.main_page_width.padding_add, .editprofileHeader_main').addClass('active_mobile_function');
        $('.active_mobile_function .edit_profile_wrapper .tabs_main p.tab').click(function(){
            $('.active_mobile_function .edit_profile_wrapper .edit_profile_tabs_data').show();
            $('.active_mobile_function .edit_profile_wrapper .edit_profile_tabs').hide();
            $('.active_mobile_function .editprofileText').show();
            var data_heading = $(this).children('.ac_t_mb').html();
            $('.active_mobile_function .back_txt_pr_mb8 span').html(data_heading);
        });
        $('.active_mobile_function .editprofileText').click(function() {
            $('.active_mobile_function .edit_profile_wrapper .edit_profile_tabs').show();
            $('.active_mobile_function .editprofileText').hide();
            $('.active_mobile_function .back_txt_pr_mb8 span').html('Edit profile');
        });
        $('.active_mobile_function .editprofileText').click(function(){
            $('.active_mobile_function .edit_profile_wrapper .edit_profile_tabs_data').hide();
            $('.active_mobile_function .edit_profile_wrapper .edit_profile_tabs').show();
        });
    }
    else {
        $('.edit_profile_1.main_page_width.padding_add, .editprofileHeader_main').removeClass('active_mobile_function');
    }
    
    $( window ).resize(function() {
        if ($(window).width() < 767) {
            $('.edit_profile_1.main_page_width.padding_add, .editprofileHeader_main').addClass('active_mobile_function');
            $('.active_mobile_function .edit_profile_wrapper .tabs_main p.tab').click(function(){
                $('.active_mobile_function .edit_profile_wrapper .edit_profile_tabs_data').show();
                $('.active_mobile_function .edit_profile_wrapper .edit_profile_tabs').hide();
                $('.active_mobile_function .editprofileText').show();
                var data_heading = $(this).children('.ac_t_mb').html();
                $('.active_mobile_function .back_txt_pr_mb8 span').html(data_heading);
            });
            $('.active_mobile_function .editprofileText').click(function() {
                $('.active_mobile_function .edit_profile_wrapper .edit_profile_tabs').show();
                $('.active_mobile_function .editprofileText').hide();
                $('.active_mobile_function .back_txt_pr_mb8 span').html('Edit profile');
            });
            $('.active_mobile_function .editprofileText').click(function(){
                $('.active_mobile_function .edit_profile_wrapper .edit_profile_tabs_data').hide();
                $('.active_mobile_function .edit_profile_wrapper .edit_profile_tabs').show();
            });
            $('.edit_profile_wrapper .edit_profile_tabs_data').hide();
        }
        else {
            $('.edit_profile_1.main_page_width.padding_add, .editprofileHeader_main').removeClass('active_mobile_function');
            $('.edit_profile_wrapper .edit_profile_tabs, .edit_profile_wrapper .edit_profile_tabs_data').show();
        }
      });



        return (
            <>
           <div className="bg_banner_1"></div>

            <div className="editprofileHeader_main">
                <div className="editprofileHeader">
                    <img src={HEADER_EDIT_MOBILE} alt={HEADER_EDIT_MOBILE}/>
                    <div className="editprofileHeadingSection">
                    <div className="editprofileText">
                    <span class="chevron_icon_btn left_cev"></span> <span className="my_ac_mb_tx">Edit profile</span>
                    </div>
                        <div className="back_txt_pr_mb8">
                            <span>Edit profile</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="back_profile_btn main_page_width">
                <div className="flex_hr_ap padding_add">
                <div className="back_btn_pr_wrapper">
                    <div className="back_btn_pr">
                        <span class="chevron_icon_btn left_cev"></span>
                    </div>
                    <div className="back_txt_pr">
                        <span>Edit profile</span>
                    </div>
                </div>
                <hr />
                </div>
            </div>

            <div className="edit_profile_1 main_page_width padding_add">
                  <div className="edit_profile_wrapper">
                        <div className="edit_profile_tabs">
                            <div className="tabs_main">
                                <p 
                                    className={`active_tabac tab ${checkActive(1, "active")}`}
                                    onClick={() => handleClick(1)}
                                ><span className="ac_t_mb">Account</span><span class="chevron_icon_btn left_cev"></span></p>
                            </div>
                            <div className="tabs_main">
                                <p
                                    className={`tab ${checkActive(2, "active")}`}
                                    onClick={() => handleClick(2)}
                                ><span className="ac_t_mb">Security</span><span class="chevron_icon_btn left_cev"></span></p>
                            </div>
                            <div className="tabs_main">
                                <p
                                    className={`tab ${checkActive(3, "active")}`}
                                    onClick={() => handleClick(3)}
                                ><span className="ac_t_mb">Notifications</span><span class="chevron_icon_btn left_cev"></span></p>
                            </div>
                            <div className="tabs_main">
                                <p
                                    className={`tab ${checkActive(4, "active")}`}
                                    onClick={() => handleClick(4)}
                                ><span className="ac_t_mb">Collections</span><span class="chevron_icon_btn left_cev"></span></p>
                            </div>
                            <div className="tabs_main">
                                <p
                                    className={`tab ${checkActive(5, "active")}`}
                                    onClick={() => handleClick(5)}
                                ><span className="ac_t_mb">Favourites</span><span class="chevron_icon_btn left_cev"></span></p>
                            </div>
                        </div>
                        <div className="edit_profile_tabs_data">
                            <div className="edit_profile_tabs_inner">
                                <div  className={`account_data_tab fields_data edit_profile_panel ${checkActive(1, "active")}`}>
                                    <div className="fields_inner">
                                    <Form name="basic" layout="horizontal">
                                        <div className="tabform_part_1 _space_inner_de">
                                            <div className="_field_out">
                                                <div className="fields_input_data">
                                                    <Form.Item name="fullname" label="Full name">
                                                        <Input placeholder="Full Name"  />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="_field_out">
                                                <div className="fields_input_data">
                                                <Form.Item name="username" label="Username">
                                                        <Input placeholder="Username"  />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="_field_out">
                                                <div className="fields_input_data">
                                                    <Form.Item
                                                    name="email"
                                                    label="Email"
                                                    rules={[
                                                        {
                                                        type: "email",
                                                        message: "The input is not valid E-mail!",
                                                        },
                                                        {
                                                        required: true,
                                                        message: "Please input your email!",
                                                        },
                                                    ]}
                                                    >
                                                    <Input placeholder="Email" />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="_field_out">
                                                <div className="fields_input_data">
                                                <Form.Item name="website" label="Website">
                                                        <Input placeholder="example.com"  />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="_field_out">
                                                <div className="fields_input_data">
                                                <Form.Item name="Description" label="Description">
                                                    <Input.TextArea
                                                    placeholder="Not more than 100 words"
                                                    style={{ height: 150 }}
                                                    />
                                                </Form.Item>
                                                </div>
                                            </div>
                                            <span className="nextButton">
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">
                                                    {"Save changes"}
                                                    </Button>
                                                </Form.Item>
                                            </span>
                                        </div>
                                        <div className="deactivate_acc_last">
                                            <hr />
                                            <div className="switch_antd _space_inner_de">
                                                <Form.Item
                                                    label="Deactivate account"
                                                    labelAlign="right"
                                                    // valuePropName="checked"
                                                    className="firstSwitch"
                                                >
                                                    <Switch
                                                    size="small"
                                                    // checked='true'
                                                    // onChange={() => setIsMintLocked(!isMintLocked)}
                                                    />
                                                </Form.Item>
                                                <div className="_field_out">
                                                    <div className="fields_input_data">
                                                    <Form.Item name="deactivate_reason" label="Reason to deactivate">
                                                        <Input.TextArea
                                                        placeholder="Why you are deactivating your account?"
                                                        style={{ height: 150 }}
                                                        />
                                                    </Form.Item>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </Form>
                                    </div>
                                </div>
                            

                                <div className={`security_data_tab edit_profile_panel ${checkActive(2, "active")}`}>
                                    <div className="_space_inner_de">
                                        <div className="fields_inner">
                                        <Form name="basic" layout="horizontal">
                                            <div className="tabform_part_1">
                                                <div className="_field_out">
                                                    <div className="fields_input_data">
                                                        <Form.Item
                                                        name="curr_passowrd"
                                                        label="Current Password"
                                                        // labelCol={{span:24}}
                                                        // wrapperCol={{span:24}}
                                                        rules={[
                                                            {
                                                            required: true,
                                                            message: "Please input current password!",
                                                            },
                                                        ]}
                                                        >
                                                        <Input.Password placeholder="" />
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <div className="_field_out">
                                                    <div className="fields_input_data">
                                                        <Form.Item
                                                        name="new_passowrd"
                                                        label="New Password"
                                                        // labelCol={{span:24}}
                                                        // wrapperCol={{span:24}}
                                                        rules={[
                                                            {
                                                            required: true,
                                                            message: "Please input New password!",
                                                            },
                                                        ]}
                                                        >
                                                        <Input.Password placeholder="" />
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <div className="_field_out">
                                                    <div className="fields_input_data">
                                                        <Form.Item
                                                        name="confirm_passowrd"
                                                        label="Confirm Password"
                                                        // labelCol={{span:24}}
                                                        // wrapperCol={{span:24}}
                                                        rules={[
                                                            {
                                                            required: true,
                                                            message: "Please confirm new password!",
                                                            },
                                                        ]}
                                                        >
                                                        <Input.Password placeholder="" />
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <div className="_field_out">
                                                    <div className="fields_input_data">
                                                        <Form.Item
                                                        name="phone_number"
                                                        label="Phone number"
                                                        rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your phone number!',
                                                        },
                                                        ]}
                                                    >
                                                        <Input
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        />
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <span className="nextButton">
                                                    <Form.Item>
                                                        <Button type="primary" htmlType="submit">
                                                        {"Save changes"}
                                                        </Button>
                                                    </Form.Item>
                                                </span>
                                            </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                                <div className={`notification_data_tab edit_profile_panel ${checkActive(3, "active")}`}>
                                    <div className="fields_inner">
                                        <Form name="basic" layout="horizontal">
                                            <div className="deactivate_acc_last">
                                                <div className="switch_antd _space_inner_de">
                                                    <div className="switch_antd_subscription">
                                                        <p>Your subscriptions</p>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="switch_antd _space_inner_de">
                                                    <div className="outer_layer_select">
                                                        <Form.Item
                                                            label="Newsletter"
                                                            labelAlign="right"
                                                            className="firstSwitch"
                                                        >
                                                            <Switch
                                                            size="small"
                                                            />
                                                        </Form.Item>
                                                        <p className="get_promo_subs">Get latest news and learn new opportunities</p>
                                                    </div>
                                                    <div className="outer_layer_select">
                                                    <Form.Item
                                                        label="Updates"
                                                        labelAlign="right"
                                                        className="firstSwitch"
                                                    >
                                                        <Switch
                                                        size="small"
                                                        />
                                                    </Form.Item>
                                                    <p className="get_promo_subs">Get notified about new updates</p>
                                                    </div>
                                                    <div className="outer_layer_select">
                                                    <Form.Item
                                                        label="Promotional emails"
                                                        labelAlign="right"
                                                        className="firstSwitch"
                                                    >
                                                        <Switch
                                                        size="small"
                                                        />
                                                    </Form.Item>
                                                    <p className="get_promo_subs">Get promotional emails</p>
                                                    </div>
                                                    <span className="nextButton">
                                                        <Form.Item>
                                                            <Button type="primary" htmlType="submit">
                                                            {"Save changes"}
                                                            </Button>
                                                        </Form.Item>
                                                    </span>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                                <div className={`collections_tab_data edit_profile_panel ${checkActive(4, "active")}`}>
                                    <div className="deactivate_acc_last">
                                        <div className="switch_antd _space_inner_de">
                                            <div className="switch_antd_subscription">
                                                <p>Your collection</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="switch_antd _space_inner_de">
                                            <div className="outer_layer_select">
                                            {/* <FeaturedCard 
                                            showFollowIcon={true}
                                             /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`edit_profile_panel ${checkActive(5, "active")}`}>
                                    <div className="_space_inner_de">
                                        data 5
                                    </div>
                                </div>
                            </div>

                        </div>
                  </div>
            </div>
            </>
        )
}
export default EditProfile;