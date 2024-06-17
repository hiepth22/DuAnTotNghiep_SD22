import React from "react";
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
    SanPhamAddPage,
} from "./pages/Administrator";
import BanTaiQuayPage from "./pages/Administrator/BanHang/BanTaiQuayPage";
import NhanVienPage from "./pages/Administrator/TaiKhoan/NhanVien/NhanVienPage";
import NhanVienAdd from "./pages/Administrator/TaiKhoan/NhanVien/NhanVienAdd";
import KhachHangPage from "./pages/Administrator/TaiKhoan/KhachHang/KhachHangPage";
import KhachHangAdd from "./pages/Administrator/TaiKhoan/KhachHang/KhachHangAdd";
import PhieuGiamGiaAdd from "./pages/Administrator/PhieuGiamGia/PhieuGiamGiaAdd";

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
                        <Route index element={<PhieuGiamGiaPage />} />
                    </Route>

                    <Route path="/admin" element={<LayoutAdmin />}>
                        <Route index path="/admin" element={<SanPhamPage />} />
                        <Route path="san-pham" element={<SanPhamPage />} />
                        <Route
                            path="san-pham/add"
                            element={<SanPhamAddPage />}
                        />
                        <Route path="ban-tai-quay" element={<HomePage />} />
                        <Route path="chat-lieu" element={<ChatLieuPage />} />
                        <Route
                            path="nha-san-xuat"
                            element={<NhaSanXuatPage />}
                        />
                        <Route
                            path="thuong-hieu"
                            element={<ThuongHieuPage />}
                        />
                        <Route path="de-giay" element={<DeGiayPage />} />
                        <Route path="danh-muc" element={<DanhMucPage />} />
                        <Route path="kich-co" element={<KichCoPage />} />
                        <Route path="mau-sac" element={<MauSacPage />} />
                        <Route path="co-giay" element={<CoGiayPage />} />
                        <Route
                            path="phieu-giam-gia"
                            element={<PhieuGiamGiaPage />}
                        />
                        <Route
                            path="phieu-giam-gia"
                            element={<PhieuGiamGiaPage />}
                        ></Route>
                        {/* phiếu giảm giá  */}
                        <Route
                            path="phieu-giam-gia"
                            element={<PhieuGiamGiaPage />}
                        ></Route>
                        <Route
                            path="phieugiamgia-add"
                            element={<PhieuGiamGiaAdd />}
                        ></Route>
                        <Route
                            path="phieugiamgia-add/:id"
                            element={<PhieuGiamGiaAdd />}
                        ></Route>
                        <Route path="hoa-don" element={<HoaDonPage />} />
                        <Route path="thong-ke" element={<ThongKePage />} />
                        <Route path="nhan-vien" element={<NhanVienPage />} />
                        <Route path="nhanvien-add" element={<NhanVienAdd />} />
                        <Route
                            path="nhanvien-add/:id"
                            element={<NhanVienAdd />}
                        />
                        <Route
                            path="nhan-vien/:id"
                            element={<NhanVienPage />}
                        />
                        <Route path="khach-hang" element={<KhachHangPage />} />
                        <Route
                            path="khachhang-add"
                            element={<KhachHangAdd />}
                        />
                        <Route
                            path="khachhang-add/:id"
                            element={<KhachHangAdd />}
                        />
                    </Route>
                </Routes>
            </div>
        </QueryClientProvider>
    );
}

export default App;
