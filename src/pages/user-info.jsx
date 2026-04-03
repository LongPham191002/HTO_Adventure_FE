import React, { useState, useEffect } from "react";
import { Box, Button, Checkbox, Input, Page, Text, DatePicker } from "zmp-ui";
import { authorize, getUserInfo, getPhoneNumber } from "zmp-sdk/apis";
import { useNavigate } from "react-router-dom";
import "../css/info-style.css";
import bgMain from "../assets/bg_main.png";
import mascot from "../assets/mascot-CdQs06Pp.png";

function UserInfoPage() {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  
  const [user, setUser] = useState({
    name: "",
    phone: "",
    birthday: "01/01/2000",
  });

  // TỰ ĐỘNG LẤY THÔNG TIN KHI VÀO TRANG
  useEffect(() => {
    const fetchZaloData = () => {
      // Bước 1: Xin quyền truy cập tổng quát (Hiện bảng Cho phép)
      authorize({
        scopes: ["scope.userInfo", "scope.userPhonenumber"],
        success: () => {
          console.log("Đã cấp quyền thành công!");
          
          // Đợi một chút để hệ thống Zalo xử lý dữ liệu sau khi nhấn nút
          setTimeout(() => {
            // Bước 2: Lấy Tên người dùng
            getUserInfo({
              success: (data) => {
                if (data.userInfo) {
                  setUser((prev) => ({ ...prev, name: data.userInfo.name }));
                }
              },
              fail: (err) => console.error("Lỗi lấy UserInfo:", err)
            });

            // Bước 3: Lấy Số điện thoại
            getPhoneNumber({
              success: (data) => {
                // Nếu Dashboard đã Duyệt quyền SĐT, data.number sẽ hiện số thật
                if (data.number) {
                  setUser((prev) => ({ ...prev, phone: data.number }));
                } else if (data.token) {
                  // Nếu chỉ có token (đang chờ duyệt), hiện thông báo để Admin biết
                  setUser((prev) => ({ ...prev, phone: "Đã lấy mã xác thực" }));
                }
              },
              fail: (err) => console.error("Lỗi lấy SĐT:", err)
            });
          }, 500); 
        },
        fail: (err) => {
          console.error("Người dùng từ chối hoặc lỗi authorize:", err);
        }
      });
    };

    fetchZaloData();
  }, []);

  return (
    <Page className="user-info-page" style={{ backgroundImage: `url(${bgMain})` }}>
      {/* Header Logo */}
      <Box className="user-info-header">
        <Text className="logo-text-large">HITO</Text>
        <Text className="logo-text-large" style={{ lineHeight: "0.8" }}>ADVENTURE</Text>
        <Box className="bg-[#0e4b75] px-3 py-0.5 rounded-full mt-2">
          <Text className="text-white font-bold text-[10px] uppercase tracking-widest">By HTO Group</Text>
        </Box>
      </Box>

      {/* Form Card */}
      <Box className="user-info-card">
        <Box className="mascot-wrapper">
          <img src={mascot} className="mascot-img-ui" alt="Mascot" />
        </Box>

        <Box className="mt-10 w-full space-y-4">
          <Box>
            <Text className="text-[#0e4b75] text-center font-black text-2xl uppercase italic">Thông Tin Cá Nhân</Text>
            <Box className="h-1 w-16 bg-[#3a9edb] mx-auto rounded-full mt-1" />
          </Box>

          {/* Ô Họ Tên */}
          <Box className="w-full">
            <Text className="text-[#0e4b75] font-black ml-4 mb-1 text-[11px] uppercase opacity-70">Họ và Tên</Text>
            <Input 
              placeholder="Đang lấy tên..." 
              className="hito-input-custom" 
              value={user.name}
              onChange={(e) => setUser({...user, name: e.target.value})}
            />
          </Box>

          {/* Ô Số điện thoại */}
          <Box className="w-full">
            <Text className="text-[#0e4b75] font-black ml-4 mb-1 text-[11px] uppercase opacity-70">Số điện thoại</Text>
            <Input 
              placeholder="Nhập hoặc lấy tự động..." 
              className="hito-input-custom" 
              value={user.phone}
              onChange={(e) => setUser({...user, phone: e.target.value})}
            />
          </Box>

          {/* Ô Ngày Sinh */}
          <Box className="w-full">
            <Text className="text-[#0e4b75] font-black ml-4 mb-1 text-[11px] uppercase opacity-70">Ngày Sinh</Text>
            <DatePicker
              mask
              maskClosable
              title="Chọn ngày sinh"
              defaultValue={new Date(2000, 0, 1)}
              onChange={(value) => {
                const dateStr = value.toLocaleDateString('vi-VN');
                setUser({...user, birthday: dateStr});
              }}
              format="dd/mm/yyyy"
            >
              {(props) => (
                <div onClick={props.onClick} className="datepicker-trigger-wrapper">
                   <Input
                    {...props}
                    readOnly
                    value={user.birthday}
                    className="hito-input-custom"
                  />
                </div>
              )}
            </DatePicker>
          </Box>
          
          <Box className="agree-box-custom">
            <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <Text size="xxxxSmall" className="ml-2 text-[#0e4b75] font-bold leading-tight opacity-90">
              Tôi đồng ý nhận ưu đãi và tư vấn từ <span className="text-[#3a9edb]">HTO Group</span>.
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Nút Điều Hướng */}
      <Box className="nav-buttons-container">
        <Button className="btn-3d-secondary" onClick={() => navigate("/")}> Quay lại </Button>
        <Button
          className="btn-3d-primary"
          onClick={() => {
            if (!user.name || !user.phone) alert("Vui lòng điền đủ thông tin!");
            else if (!agree) alert("Vui lòng đồng ý điều khoản!");
            else navigate("/game");
          }}
        >
          Tiếp tục
        </Button>  
      </Box>
    </Page>
  );
}

export default UserInfoPage;