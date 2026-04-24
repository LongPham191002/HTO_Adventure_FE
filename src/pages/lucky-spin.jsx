import React from "react";
import { Box, Button, Page, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import bgMain from "../assets/bg_main.png";

const LuckySpinPage = () => {
  const navigate = useNavigate();

  return (
    <Page className="flex flex-col h-full" style={{ backgroundImage: `url(${bgMain})`, backgroundSize: 'cover' }}>
      <Box className="flex-1 flex flex-col items-center justify-center p-6">
        <Box className="bg-white/90 rounded-3xl p-8 w-full max-w-xs text-center shadow-2xl border-4 border-[#3a9edb]">
          <Text className="text-[#0e4b75] font-black text-3xl uppercase italic mb-4">
            VÒNG QUAY MAY MẮN
          </Text>
          
          <Box className="py-12 flex items-center justify-center">
             <Box className="w-48 h-48 rounded-full border-8 border-[#f9d423] flex items-center justify-center bg-white shadow-inner relative">
                <Box className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-8 bg-red-500 rounded-b-full z-10" />
                <Text className="text-[#3a9edb] font-bold text-lg animate-bounce">COMING SOON</Text>
             </Box>
          </Box>

          <Text className="text-gray-600 font-medium mb-8">
            Tính năng đang được phát triển. Quay lại sau nhé!
          </Text>

          <Button fullWidth className="bg-[#3a9edb] rounded-full font-bold h-12 text-lg shadow-lg" onClick={() => navigate("/")}>
            VỀ TRANG CHỦ
          </Button>
        </Box>
      </Box>
    </Page>
  );
};

export default LuckySpinPage;
