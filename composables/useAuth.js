import { ref } from "vue";
import { useFetch } from "#app";

const user = ref(null);

export const useAuth = () => {
  async function fetchUser() {
    const { data, error } = await useFetch("/api/user", {
      credentials: "include",
    });

    if (error.value) {
      return null;
    }

    user.value = data?.value;
    return user.value;
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      user.value = null;
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  function getUser() {
    return user.value;
  }

  return {
    getUser,
    fetchUser,
    logout,
  };
};
