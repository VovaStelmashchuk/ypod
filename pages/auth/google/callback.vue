<template>
  <AuthProgress />
</template>

<script setup>
import { navigateTo } from "nuxt/app";

onMounted(async () => {
  const route = useRoute();
  const hash = route.hash.substring(1);

  const params = hash.split("&").reduce((acc, item) => {
    const [key, value] = item.split("=");
    acc[key] = value;
    return acc;
  }, {});

  const accessToken = params.access_token;

  const request = {
    googleAccessToken: accessToken,
  };

  await $fetch("/api/auth/google/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  await useAuth().fetchUser();

  navigateTo("/");
});
</script>
