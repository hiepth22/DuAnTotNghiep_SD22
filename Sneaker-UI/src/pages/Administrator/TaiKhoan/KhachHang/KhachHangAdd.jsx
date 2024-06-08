import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { add, update } from '../../../../services/KhachHangService';
import { set } from 'date-fns';

const getDateNow = () => {
    return moment().format("YYYY-MM-DD HH:mm:ss")
}
export const convertDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
};

const add = () => {
    const [anh, setAnh] = useState('');
    const [preview, setPreview] = useState(null);
    const [ten, setTen] = useState('');
    const [ma, setMa] = useState('');
    const [sdt, setSdt] = useState('');
    const [ngaySinh, setNgaySinh] = useState('');
    const [email, setMail] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');
    const [cccd, setCccd] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [trangThai, setTrangThai] = useState('');
    const [diachi, setdiachi] = useState('');

    const { id } = useParams();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setAnh(file);
        setPreview(URL.createObjectURL(file));
    };
    const navigate = useNavigate();
    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };
    const cancel = () => {
        navigate('/admin/nhan-vien');
    };
    function check() {
        if (id) {
            return <h1 className='text-center fs-3 p-3 mb-2 bg-success text-white'>Update Khách Hàng</h1>
        }
        else {
            return <h1 className='text-center fs-3 p-3 mb-2 bg-success text-white'>Thêm Khách Hàng</h1>
        }
    }
    useEffect(() => {
        if (id) {
            detail(id).then((kh) => {
                setAnh(kh.data.anh);
                setTen(kh.data.ten);
                setMa(kh.data.ma);
                setSdt(kh.data.sdt);
                setNgaySinh(kh.data.ngaySinh);
                setMail(kh.data.email);
                setGioiTinh(kh.data.gioiTinh);
                setCccd(kh.data.cccd);
                setMatKhau(kh.data.matKhau);
                setTrangThai(kh.data.trangThai);
                setdiachi(kh.data.diachi)
            }).catch(error => {
                console.log(error);
            })


        }
    }, [id])
    const save = async (nv) => {
        nv.preventDefault();
        const ngaytao = getDateNow();
        const ngaycapnhap = getDateNow();
    }
    const khData = {
        anh,
        ten,
        ma,
        sdt,
        ngaySinh,
        email,
        gioiTinh,
        cccd,
        matKhau,
        trangThai,
        ngaytao,
        ngaycapnhap,
        diachi,
      };
      console.log(khData);

}