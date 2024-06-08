import { useState, useEffect } from 'react';
import axios from 'axios';

const useAddress = () => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict('');
    setWards([]);

    const city = cities.find(c => c.Id === cityId);
    if (city) {
      setDistricts(city.Districts);
    } else {
      setDistricts([]);
    }
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);

    const city = cities.find(c => c.Id === selectedCity);
    if (city) {
      const district = city.Districts.find(d => d.Id === districtId);
      if (district) {
        setWards(district.Wards);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
    }
  };

  return {
    cities,
    districts,
    wards,
    selectedCity,
    selectedDistrict,
    handleCityChange,
    handleDistrictChange,
  };
};

export default useAddress;
