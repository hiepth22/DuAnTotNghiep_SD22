import create from 'zustand';

interface HoaDon {
  id: number;
  khachHang: { id: number };
  nguoiTao: string;
  trangThai: string;
}

interface HoaDonChiTiet {
  id: number;
  hoaDonId: number;
  tenSanPham: string;
  giaBan: number;
  soLuong: number;
}

interface BanHangStore {
  hoaDons: HoaDon[];
  hoaDonChiTiets: Record<number, HoaDonChiTiet[]>;
  addHoaDon: (hoaDon: HoaDon) => void;
  addHoaDonChiTiet: (hoaDonId: number, hoaDonChiTiet: HoaDonChiTiet) => void;
}

const useBanHangStore = create<BanHangStore>((set) => ({
  hoaDons: [],
  hoaDonChiTiets: {},
  addHoaDon: (hoaDon) =>
    set((state) => ({
      hoaDons: [...state.hoaDons, hoaDon],
    })),
  addHoaDonChiTiet: (hoaDonId, hoaDonChiTiet) =>
    set((state) => ({
      hoaDonChiTiets: {
        ...state.hoaDonChiTiets,
        [hoaDonId]: [...(state.hoaDonChiTiets[hoaDonId] || []), hoaDonChiTiet],
      },
    })),
}));

export default useBanHangStore;
