<template>
  <div>
    <Form id="user-form" class="user-form" @submit="submitUser">
      <div class="course-detail-form border-t border-gray-200">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Họ và tên
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="ho-va-ten" v-model="fullName" :rules="{ required: true, max: 100 }" type="text" name="ho-va-ten" />
                  <ErrorMessage class="error-msg" name="ho-va-ten" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Email
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                      </svg>
                    </div>
                    <Field id="email" as="input" v-model="email" :rules="{ required: true, max: 100, email: true }" :disabled="id" type="email" name="email" />
                  </div>
                  <ErrorMessage class="error-msg" name="email" /> 
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Trạng thái
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Multiselect
                    id="status"
                    v-model="status"
                    mode="single"
                    :close-on-select="true"
                    name="status"
                    :searchable="true"
                    :options="statusOptions"
                    placeholder="Chọn trạng thái"
                    no-options-text="Không tìm thấy trạng thái"
                  />
                  <span v-if="errorStatus" class="error-msg">
                    {{ errorStatus }}
                  </span>
                </div>
              </section>
            </dd>
          </div>
        </dl>
      </div>
      <div class="submit-button mt-8 gap-x-4 flex flex-row justify-between">
        <div class="flex gap-x-4">
          <button type="submit" class="btn btn-primary font-semibold" @click="[
            validateStatus()
          ]">
            Lưu
          </button>
          <button v-if="id" type="button" class="btn btn-outline" @click="openOrCloseConfirmModal">
            Xóa
          </button>
        </div>
        <div>
          <button type="button" class="btn btn-outline" @click="handleGoBack">
            Hủy bỏ
          </button>
        </div>
      </div>
    </Form>

    <ConfirmDeleteModal
      :is-open-modal="isConfirmDeleteModal"
      title="Xóa người dùng"
      content="Bạn có chắc chắn xóa người dùng này? Hành động này không thể hoàn tác."
      @closeModal="openOrCloseConfirmModal"
      @submit="deleteUser"
    />
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, useField } from 'vee-validate'
import Multiselect from '@vueform/multiselect'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import { PropType, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { UpsertUserRequest, UserDto, UserStatus } from '~/models/user.model'
import { useNuxtApp } from 'nuxt/app'
import { SelectOption } from '~/models/common.model'
import { SelectOptionResponse } from '~/models/role.model'
import ConfirmDeleteModal from '~/components/shared/ConfirmDeleteModal.vue'

const props = defineProps({
  user: { type: Object as PropType<UserDto>, default: () => ({}) }
})

watch(() => props.user, () => {
  id.value = props.user.id
  fullName.value = props.user.name
  email.value = props.user.email
  status.value = props.user.status!
})

const { $api, $loading, $toast } = useNuxtApp()
const $router = useRouter()
const id = ref()
const fullName = ref()
const email = ref()
const isConfirmDeleteModal = ref()

const { value: status, errorMessage: errorStatus, validate: validateStatus, resetField: resetStatus } = useField('status', { required: true }, {  initialValue: UserStatus.Active })
const statusOptions = ref<SelectOption[]>([{
  label: 'Đang hoạt động',
  value: 'active'
}, {
  label: 'Dừng hoạt động',
  value: 'inactive'
}])

onMounted(() => {
})

const handleGoBack = () => {
  $router.push('/admin-console/users')
}

const openOrCloseConfirmModal = () => {
  isConfirmDeleteModal.value = !isConfirmDeleteModal.value
}

const submitUser = async () => {
  if (errorStatus.value) {
    return
  }
  const loader = $loading.show()
  const userRequest: UpsertUserRequest = {
    id: id.value,
    fullName: fullName.value,
    email: email.value,
    status: status.value
  }

  await $api.adminConsole.upsertUser(userRequest)
    .then(() => {
      $toast.success('Save successful!')
      handleGoBack()
    })
    .finally(() => {
      loader.hide()
    })
}

const deleteUser = async () => {
  const loader = $loading.show()
  await $api.adminConsole.deleteUser(id.value)
  .then(() => {
    $toast.success('Delete successful!')
    handleGoBack()
  })
  .finally(() => {
    loader.hide()
  })
}
</script>

<style>
.m-phone-number-input__country-flag {
  top: 10px
}
</style>
