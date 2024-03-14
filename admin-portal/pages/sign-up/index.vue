<script setup lang="ts">
	import { definePageMeta } from '~/.nuxt/imports';
	import { navigateTo, useNuxtApp } from 'nuxt/app';
	import { computed, reactive } from 'vue';
	import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';

	definePageMeta({
		layout: '',
	});

	const credentials = reactive({name: '', email: '', password: '', confirmPassword: '', userType: 'admin'});
	const validationRules = computed(() => {
		return {
			name: {
				required: helpers.withMessage('The name field is required', required),
			},
			email: {
				required: helpers.withMessage('The email field is required', required),
				email: helpers.withMessage('Invalid email format', email),
			},
			password: {
				required: helpers.withMessage('The password field is required', required),
				minLength: minLength(6),
			},
			confirmPassword: {
				required: helpers.withMessage('The password confirmation field is required', required),
				sameAs: helpers.withMessage("Passwords don't match", sameAs(credentials.password)),
			},
		};
	});
	const validation = useVuelidate(validationRules, credentials);

	async function signUp() {
		validation.value.$validate();
		if(validation.value.$invalid) return;

		const { $api, $loading } = useNuxtApp();
		const loader = $loading.show();

		try {
			const { token, role } = await $api.auth.signUp(credentials);
		
			localStorage.setItem('token', token);
			if(role) {
				localStorage.setItem('role', role);
			}
			loader.hide();
			// navigateTo('/dashboard');
			navigateTo('https://nguoivietnew.com', { external: true})
		} catch(_) {
			const { $toast } = useNuxtApp();
			$toast.error('Đăng ký thất bại');
		} finally {
			loader.hide();
		}
	}

</script>

<template>
	<main class="h-screen w-screen flex justify-center items-center bg-gray-50 text-gray-900">
		<section class="space-y-8" >
			<h2 class="text-center text-4xl font-bold">Đăng Ký</h2>

			<form @submit.prevent="signUp()"
					class="shadow-md p-8 space-y-6 rounded-md sm:w-96 w-[22rem] text-sm">
				<fieldset >
					<label class="font-medium" for="name">Họ và tên</label>
					<input id="name"
							v-model="credentials.name"
							@change="validation.name.$touch"
							class="block w-full py-1.5 px-2 border border-gray-300 rounded-md"
							:class="{'border-red-500': validation.name.$error}"
							type="text">
					<span class="text-xs text-red-500" v-if="validation.name.$error">
						{{ validation.name.$errors[0].$message }}
					</span>
				</fieldset>

				<fieldset >
					<label class="font-medium" for="email">Email</label>
					<input id="email"
							v-model="credentials.email"
							@change="validation.email.$touch"
							class="block w-full py-1.5 px-2 border border-gray-300 rounded-md"
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
							class="block w-full px-2 py-1.5 border border-gray-300 rounded-md"
							type="password">
					<span class="text-xs text-red-500" v-if="validation.password.$error">
						{{ validation.password.$errors[0].$message }}
					</span>
				</fieldset>

				<fieldset>
					<label class="font-medium" for="confirmPassword">Mật khẩu</label>
					<input id="confirmPassword"
							v-model="credentials.confirmPassword"
							@change="validation.confirmPassword.$touch"
							class="block w-full px-2 py-1.5 border border-gray-300 rounded-md"
							:class="{'border-red-500': validation.confirmPassword.$error}"
							type="password">
					<span class="text-xs text-red-500" v-if="validation.confirmPassword.$error">
						{{ validation.confirmPassword.$errors[0].$message }}
					</span>
				</fieldset>

				<button type="submit"
						:disabled="!validation.$dirty || validation.$invalid"
						class="block w-full text-white bg-red-500 rounded-md py-2 disabled:opacity-60 hover:bg-red-600">
					Đăng ký
				</button>
			</form>

			<div class="flex justify-center">
				<h3>Đã có tài khoản? <a href="/sign-in" class="cursor-pointer text-red-500 font-bold">Đăng nhập</a></h3>
			</div>
		</section>
	</main>
</template>

<style scoped>
input[type="email"], input[type="password"] {
	padding-left: 1rem !important;
	padding-right: 1rem !important;
	height: 2.5rem;
}
</style>
