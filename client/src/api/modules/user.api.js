import publicClient from "../client/public.client";
const userEndpoints = {
  getAllUsers: `/users`,
  createUser: `/users`,
  getUser: ({ userId }) => `/users/${userId}`,
  updateUser: ({ userId }) => `/users/${userId}`,
  deleteUser: ({ userId }) => `/users/${userId}`,
};

const userApi = {
  getAllUsers: async (params = {}) => {
    try {
      const response = await publicClient.get(userEndpoints.getAllUsers, {
        params,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  getUser: async ({ userId }) => {
    try {
      const response = await publicClient.get(
        userEndpoints.getUser({ userId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  createUser: async ({ name, uid, email }) => {
    try {
      const response = await publicClient.post(userEndpoints.createUser, {
        name,
        uid,
        email,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  deleteUser: async ({ userId }) => {
    try {
      const response = await publicClient.delete(
        userEndpoints.deleteUser({ userId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  updateUser: async (fields, { userId }) => {
    try {
      const response = await publicClient.patch(
        userEndpoints.updateUser({ userId }),
        fields
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
