import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, MapPin } from 'lucide-react';
import { regionData, regionGroups, Country, Province, City } from '../data/regionData';

interface LocationSelectProps {
  label?: string;
  value?: {
    countryId?: string;
    provinceId?: string;
    cityId?: string;
  };
  onChange?: (value: {
    countryId?: string;
    provinceId?: string;
    cityId?: string;
    displayName?: string;
  }) => void;
  placeholder?: string;
  className?: string;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className = ''
}) => {
  const { t } = useTranslation();
  placeholder = placeholder ?? t('location.selectRegion');
  const [selectedCountryId, setSelectedCountryId] = useState<string | undefined>(value?.countryId);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | undefined>(value?.provinceId);
  const [selectedCityId, setSelectedCityId] = useState<string | undefined>(value?.cityId);
  const [isOpen, setIsOpen] = useState(false);

  // 找到选中的国家
  const selectedCountry = regionData.find(c => c.id === selectedCountryId);
  
  // 找到选中的省份
  const selectedProvince = selectedCountry?.provinces.find(p => p.id === selectedProvinceId);
  
  // 找到选中的城市
  const selectedCity = selectedProvince?.cities.find(c => c.id === selectedCityId);

  const getDisplayName = () => {
    const parts: string[] = [];
    if (selectedCountry) parts.push(selectedCountry.nameCn);
    if (selectedProvince && selectedProvince.nameCn !== selectedCountry?.nameCn) {
      parts.push(selectedProvince.nameCn);
    }
    if (selectedCity) {
      parts.push(selectedCity.nameCn);
    }
    return parts.length > 0 ? parts.join(' - ') : placeholder;
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountryId(country.id);
    setSelectedProvinceId(undefined);
    setSelectedCityId(undefined);
    triggerChange(country.id, undefined, undefined, country.nameCn);
  };

  const handleProvinceSelect = (province: Province) => {
    setSelectedProvinceId(province.id);
    setSelectedCityId(undefined);
    const displayName = [selectedCountry?.nameCn, province.nameCn].filter(Boolean).join(' - ');
    triggerChange(selectedCountryId, province.id, undefined, displayName);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCityId(city.id);
    const displayName = [selectedCountry?.nameCn, selectedProvince?.nameCn, city.nameCn].filter(Boolean).join(' - ');
    triggerChange(selectedCountryId, selectedProvinceId, city.id, displayName);
  };

  const triggerChange = (countryId?: string, provinceId?: string, cityId?: string, displayName?: string) => {
    onChange?.({
      countryId,
      provinceId,
      cityId,
      displayName
    });
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCountryId(undefined);
    setSelectedProvinceId(undefined);
    setSelectedCityId(undefined);
    triggerChange(undefined, undefined, undefined, undefined);
  };

  return (
    <div className={`relative ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 border rounded-lg text-left transition-all
          ${isOpen ? 'border-amber-500 ring-2 ring-amber-200' : 'border-gray-300 hover:border-gray-400'}
          ${(!selectedCountryId) ? 'text-gray-500' : 'text-gray-900'}`}
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-600" />
          <span>{getDisplayName()}</span>
        </div>
        <div className="flex items-center gap-2">
          {(selectedCountryId || selectedProvinceId || selectedCityId) && (
            <button
              type="button"
              onClick={clearSelection}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              ✕
            </button>
          )}
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-hidden flex">
          {/* 国家选择（按分组显示标题） */}
          <div className="flex-1 border-r border-gray-200 overflow-y-auto max-h-80">
            <div className="p-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('location.countryRegion')}
            </div>
            {regionGroups.map((group) => {
              const groupCountries = regionData.filter(c => (c.group ?? '') === group);
              if (groupCountries.length === 0) return null;
              return (
                <div key={group}>
                  <div className="px-3 py-1.5 bg-amber-50/60 text-[11px] font-semibold text-amber-700 sticky top-0">
                    {group}
                  </div>
                  {groupCountries.map((country) => (
                    <button
                      key={country.id}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full px-4 py-2 text-left hover:bg-amber-50 transition-colors
                        ${country.id === selectedCountryId ? 'bg-amber-100 text-amber-800 font-medium' : 'text-gray-700'}`}
                    >
                      {country.nameCn}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>

          {/* 省份/州选择 */}
          {selectedCountry && (
            <div className="flex-1 border-r border-gray-200 overflow-y-auto max-h-80">
              <div className="p-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('location.provinceState')}
              </div>
              {selectedCountry.provinces.map((province) => (
                <button
                  key={province.id}
                  type="button"
                  onClick={() => handleProvinceSelect(province)}
                  className={`w-full px-4 py-2 text-left hover:bg-amber-50 transition-colors
                    ${province.id === selectedProvinceId ? 'bg-amber-100 text-amber-800 font-medium' : 'text-gray-700'}`}
                >
                  {province.nameCn}
                </button>
              ))}
            </div>
          )}

          {/* 城市选择 */}
          {selectedProvince && (
            <div className="flex-1 overflow-y-auto max-h-80">
              <div className="p-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('location.city')}
              </div>
              {selectedProvince.cities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleCitySelect(city)}
                  className={`w-full px-4 py-2 text-left hover:bg-amber-50 transition-colors
                    ${city.id === selectedCityId ? 'bg-amber-100 text-amber-800 font-medium' : 'text-gray-700'}`}
                >
                  {city.nameCn}
                  {city.nameEn && (
                    <span className="ml-2 text-xs text-gray-400">{city.nameEn}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelect;
