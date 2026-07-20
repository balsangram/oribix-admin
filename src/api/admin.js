import apiClient from "./axios";

const BASE = "/api/admin/v1";

/** ADMIN PROFILE APIs */
export const getAdminProfile = () =>
  apiClient.get(`${BASE}/admin/profile`);

export const updateAdminProfile = (payload) =>
  apiClient.patch(`${BASE}/admin/profile`, payload);

/** SUB ADMIN APIs */
export const getSubAdmins = (params) =>
  apiClient.get(`${BASE}/sub-admins`, { params });

export const getSubAdminDetails = (id) =>
  apiClient.get(`${BASE}/sub-admin/${id}`);

export const createSubAdmin = (payload) =>
  apiClient.post(`${BASE}/sub-admin`, payload);

export const updateSubAdmin = (id, payload) =>
  apiClient.patch(`${BASE}/sub-admin/${id}`, payload);

export const deleteSubAdmin = (id) =>
  apiClient.delete(`${BASE}/sub-admin/${id}`);

/** VENDOR APIs */
export const getVendors = (params) =>
  apiClient.get(`${BASE}/vendors`, { params });

export const getVendorDetails = (id) =>
  apiClient.get(`${BASE}/vendor/${id}`);

export const getVendorWarehouses = (vendorId) =>
  apiClient.get(`${BASE}/vendor/${vendorId}/warehouses`);

/** PRODUCT APIs */
export const getCategories = () =>
  apiClient.get(`${BASE}/categories`);

export const getBrands = () =>
  apiClient.get(`${BASE}/brands`);

export const getSubCategories = (categoryId) =>
  apiClient.get(`${BASE}/sub-categories`, { params: { categoryId } });

export const getProducts = (params) =>
  apiClient.get(`${BASE}/products`, { params });

export const getProductDetails = (id) =>
  apiClient.get(`${BASE}/product/${id}`);

export const createProduct = (payload) => {
  const isForm =
    typeof FormData !== "undefined" && payload instanceof FormData;
  return apiClient.post(
    `${BASE}/product`,
    payload,
    isForm ? { headers: { "Content-Type": undefined } } : undefined
  );
};

export const updateProduct = (id, payload) => {
  const isForm =
    typeof FormData !== "undefined" && payload instanceof FormData;
  return apiClient.patch(
    `${BASE}/product/${id}`,
    payload,
    isForm ? { headers: { "Content-Type": undefined } } : undefined
  );
};

export const deleteProduct = (id) =>
  apiClient.delete(`${BASE}/product/${id}`);

/** PERMISSION APIs */
export const getPermissions = () => apiClient.get(`${BASE}/permissions`);

export const createPermission = (payload) =>
  apiClient.post(`${BASE}/permission`, payload);

export const updatePermission = (id, payload) =>
  apiClient.patch(`${BASE}/permission/${id}`, payload);

export const deletePermission = (id) =>
  apiClient.delete(`${BASE}/permission/${id}`);

const adminApi = {
  getAdminProfile,
  updateAdminProfile,
  getSubAdmins,
  getSubAdminDetails,
  createSubAdmin,
  updateSubAdmin,
  deleteSubAdmin,
  getVendors,
  getVendorDetails,
  getVendorWarehouses,
  getCategories,
  getBrands,
  getSubCategories,
  getProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
};

export default adminApi;
