<script setup lang="ts">
	import { definePageMeta } from '~/.nuxt/imports';
	import { navigateTo, useNuxtApp } from 'nuxt/app';
	import { computed, reactive } from 'vue';
	import { required, email, minLength, helpers } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';

	definePageMeta({
		layout: 'admin-authentication',
		middleware: ['guest'],
	});

	const credentials = reactive({email: '', password: '', isRememberMe: false});
	const validationRules = computed(() => {
		return {
			email: {
				required: helpers.withMessage('The email field is required', required),
				email: helpers.withMessage('Invalid email format', email),
			},
			password: {
				required: helpers.withMessage('The password field is required', required),
				minLength: minLength(6),
			},
		};
	});
	const validation = useVuelidate(validationRules, credentials);

	async function login() {
		validation.value.$validate();
		if(validation.value.$invalid) return;
		const { $loading } = useNuxtApp();
		const loader = $loading.show();

		try {
			const { $api } = useNuxtApp();
			const { token, refreshToken, role, userInfo } = await $api.auth.signIn(credentials);
			localStorage.setItem('token', token);
			localStorage.setItem('refresh-token', refreshToken)
			const jsonToken = JSON.parse(atob(token.split('.')[1]))
			localStorage.setItem('exp', jsonToken?.exp);
			if(role && userInfo) {
				localStorage.setItem('role', JSON.stringify(role));
				localStorage.setItem('userInfo', JSON.stringify(userInfo));
				navigateTo('/admin-console/dashboard');
			} else {
				navigateTo('/');
			}
		} catch (_) {
			const { $toast } = useNuxtApp();
			$toast.error('Invalid credentials');
		} finally {
			loader.hide();
		}
	}

</script>

<template>
	<div>
		<h1 class="text-3xl font-bold mt-6">Đăng nhập</h1>
		<form @submit.prevent="login()"
				class="mt-10 space-y-6 sm:w-96 w-[20rem] text-sm">
			<fieldset >
				<label class="font-medium" for="email">Email</label>
				<input id="email"
						v-model="credentials.email"
						@change="validation.email.$touch"
						class="email-input block w-full py-1.5 px-2 border border-gray-300 rounded-md"
						:class="{'border-red-500': validation.email.$error}"
						type="email">
				<span class="text-xs text-red-500" v-if="validation.email.$error">
					{{ validation.email.$errors[0].$message }}
				</span>
			</fieldset>
			<fieldset>
				<label class="font-medium" for="password">Mật khẩu</label>
				<input id="password"
						v-model="credentials.password"
						@change="validation.password.$touch"
						class="block w-full h-10 leading-5 px-2 py-1.5 border border-gray-300 rounded-md"
						type="password">
				<span class="text-xs text-red-500" v-if="validation.password.$error">
					{{ validation.password.$errors[0].$message }}
				</span>
			</fieldset>
			<div class="flex justify-between items-center">
				<fieldset class="space-x-2">
					<input id="isRememberPassword" v-model="credentials.isRememberMe" class="border border-gray-300 rounded-md" type="checkbox">
					<label for="isRememberPassword">Ghi nhớ đăng nhập</label>
				</fieldset>
				<NuxtLink to="./forgot-password" class="text-indigo-600 hover:text-indigo-800">
					Quên mật khẩu?
				</NuxtLink>
			</div>
			<button type="submit"
					:disabled="!validation.$dirty || validation.$invalid"
					class="block w-full text-white bg-indigo-600 hover:bg-indigo-700 rounded-md py-2 disabled:opacity-60">
				Đăng Nhập
			</button>
		</form>
	</div>
</template>

<style scoped>
.email-input {
	padding-left: 0.5rem !important;
	padding-right: 0.5rem !important;
}
</style>
