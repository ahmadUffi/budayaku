const PROVINCES = [
    'DKI Jakarta',
    'Jawa Barat',
    'Jawa Tengah',
    'Jawa Timur',
    'Sumatera Utara',
    'Sumatera Barat',
    'Sumatera Selatan',
    'Kalimantan Timur',
    'Kalimantan Selatan',
    'Sulawesi Selatan',
    'Bali',
    'Yogyakarta'
];

export default function ProvinceSelector({
    selectedProvince,
    onProvinceChange
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Provinsi:
            </label>
            <select
                value={selectedProvince}
                onChange={(e) => onProvinceChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
                {PROVINCES.map((province) => (
                    <option key={province} value={province}>
                        {province}
                    </option>
                ))}
            </select>
        </div>
    );
}