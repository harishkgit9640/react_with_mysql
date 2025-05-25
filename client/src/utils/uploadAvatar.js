import api from '../services/api';

// Maximum file size (2MB)
const MAX_FILE_SIZE = 2 * 1024 * 1024;

// Allowed file types
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export const validateImage = (file) => {
    const errors = [];

    if (!file) {
        errors.push('No file selected');
        return errors;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push('Invalid file type. Please upload a JPEG, PNG, or GIF image');
    }

    if (file.size > MAX_FILE_SIZE) {
        errors.push('File size too large. Maximum size is 2MB');
    }

    return errors;
};

export const createImagePreview = (file) => {
    if (!file) return null;
    return URL.createObjectURL(file);
};

export const uploadAvatar = async (userId, file) => {
    try {
        const formData = new FormData();
        formData.append('profile_picture', file);

        const response = await api.put(`/auth/update-avatar/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.success) {
            return {
                success: true,
                data: response.data.data
            };
        }
        throw new Error(response.data.message || 'Failed to upload avatar');
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to upload avatar'
        };
    }
};

export const cleanupPreview = (previewUrl) => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
    }
}; 