import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./layouts/LayoutAdmin/LayoutAdmin";
import { HomePage } from "./pages/Client";
import {
  SanPhamPage,
  ChatLieuPage,
  HoaDonPage,
  NhaSanXuatPage,
  PhieuGiamGiaPage,
  ThuongHieuPage,
  DeGiayPage,
  DanhMucPage,
  KichCoPage,
  MauSacPage,
  ThongKePage,
  CoGiayPage,
  // BanTaiQuayPage,
} from "./pages/Administrator";
import BanTaiQuayPage from "./pages/Administrator/BanHang/BanTaiQuayPage";
import NhanVienPage from './pages/TaiKhoan/NhanVien/NhanVienPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="">
        <ToastContainer theme="colored" autoClose={1000} />
        <Routes>
          <Route path="/" element={<LayoutAdmin />}>
            <Route index path="*" element={<HomePage />}></Route>
          </Route>

          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index path="/admin" element={<SanPhamPage />}></Route>
            <Route path="san-pham" element={<SanPhamPage />}></Route>

            <Route path="ban-tai-quay" element={<BanTaiQuayPage />}></Route>

            <Route path="chat-lieu" element={<ChatLieuPage />}></Route>
            <Route path="nha-san-xuat" element={<NhaSanXuatPage />}></Route>
            <Route path="thuong-hieu" element={<ThuongHieuPage />}></Route>
            <Route path="de-giay" element={<DeGiayPage />}></Route>
            <Route path="danh-muc" element={<DanhMucPage />}></Route>
            <Route path="kich-co" element={<KichCoPage />}></Route>
            <Route path="mau-sac" element={<MauSacPage />}></Route>
            <Route path="co-giay" element={<CoGiayPage />}></Route>

            <Route path="phieu-giam-gia" element={<PhieuGiamGiaPage />}></Route>

            <Route path="hoa-don" element={<HoaDonPage />}></Route>

            <Route path="thong-ke" element={<ThongKePage />}></Route>
            <Route path="nhan-vien" element={<NhanVienPage />}></Route>
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
