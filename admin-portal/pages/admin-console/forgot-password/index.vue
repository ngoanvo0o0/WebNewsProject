<script setup lang="ts">
	import { definePageMeta } from '~/.nuxt/imports';
	import { computed, reactive } from 'vue';
	import { required, email, minLength, helpers } from '@vuelidate/validators';
	import { useVuelidate } from '@vuelidate/core';

	definePageMeta({
		layout: 'admin-authentication',
	});

	const credentials = reactive({email: '', password: ''});
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
</script>

<template>
	<div>
        <h1 class="text-3xl font-bold mt-6">Quên mật khẩu</h1>
        <form @submit.prevent
                class="space-y-6 sm:w-96 w-[20rem] text-sm mt-10">
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
            <button type="submit"
                    :disabled="!validation.$dirty || validation.$invalid"
                    class="block w-full text-white bg-indigo-600 hover:bg-indigo-700 rounded-md py-2 disabled:opacity-60">
                Đặt lại mật khẩu
            </button>
        </form>
    </div>
</template>
