// components/ImageUpload.js - FIXED VERSION

import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload, onImageRemove, uploadedImage, isReadyToProcess }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileSelect = (file) => {
        if (file && file.type.startsWith('image/')) {
            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert('File terlalu besar! Maksimal 10MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const base64 = e.target.result.split(',')[1]; // Remove data:image/xxx;base64, prefix
                    onImageUpload(base64, file.name);
                } catch (error) {
                    console.error('Error reading file:', error);
                    alert('Gagal membaca file. Silakan coba lagi.');
                }
            };
            reader.onerror = () => {
                alert('Gagal membaca file. Silakan coba lagi.');
            };
            reader.readAsDataURL(file);
        } else {
            alert('Silakan pilih file gambar yang valid (PNG, JPG, JPEG)');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
        // Reset input value to allow re-uploading same file
        e.target.value = '';
    };

    return (
        <div className="mb-4">
            {uploadedImage ? (
                <div className="relative">
                    <img
                        src={`data:image/jpeg;base64,${uploadedImage.base64}`}
                        alt="Uploaded"
                        className="w-full max-w-xs h-auto rounded-lg border-2 border-purple-300"
                        onError={() => {
                            console.error('Error loading uploaded image');
                            alert('Gagal memuat gambar. Silakan upload ulang.');
                        }}
                    />
                    {isReadyToProcess && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                            ✓ Siap diproses
                        </div>
                    )}
                    <button
                        onClick={onImageRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        aria-label="Remove image"
                    >
                        ×
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                        {uploadedImage.name}
                    </p>
                </div>
            ) : (
                <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                        }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById('imageInput').click()}
                >
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
                    <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;