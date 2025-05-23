import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred' };
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials, {
                withCredentials: true // Enable sending cookies
            });
            if (response.data.success) {
                console.log(response.data);
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                return response.data;
            }
            throw new Error(response.data.message || 'Login failed');
        } catch (error) {
            throw error.response?.data || { message: 'An error occurred' };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getAllUser: async () => {
        const response = await api.get('/auth/get-users');
        if (response.data.success) {
            return response.data;
        }
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

export const projectService = {
    getAllProject: async (userData) => {
        const response = await api.get('/projects/get-projects/' + userData);
        if (response.data.success) {
            return response.data;
        }
    },
    getProject: async (userData) => {
        const response = await api.get('/projects/get-project/' + userData);
        if (response.data.success) {
            return response.data;
        }
    },
    updateProject: async (userData) => {
        const response = await api.get('/projects/update-project/' + userData);
        if (response.data.success) {
            return response.data;
        }
    },
    deleteProject: async (userData) => {
        const response = await api.get('/projects/delete-project/' + userData);
        if (response.data.success) {
            return response.data;
        }
    },

}

export default api; 