<template>
  <div>
    <Form id="team-form" class="team-form" @submit="submitTeam">
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
                    <Field id="email" as="input" v-model="email" :rules="{ required: true, max: 100, email: true }" type="email" name="email" />
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
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Vai trò
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Multiselect
                    id="role"
                    v-model="roleId"
                    mode="single"
                    :close-on-select="true"
                    name="role"
                    :searchable="true"
                    :options="roleOptions"
                    placeholder="Chọn vai trò"
                    no-options-text="Không tìm thấy vai trò"
                  />
                  <span v-if="errorRole" class="error-msg">
                    {{ errorRole }}
                  </span>
                </div>
              </section>
            </dd>
          </div>
          <div v-if="isEdit" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <button v-if="!isSetPassword" type="button" class="btn btn-outline col-start-2 justify-self-end px-4" @click="isSetPassword = !isSetPassword">
              Đặt lại mật khẩu
            </button>
            <button v-else type="button" class="btn btn-outline col-start-2 justify-self-end px-4" @click="cancelSetPassword">
              Huỷ bỏ
            </button>
          </div>
          <!-- <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Số điện thoại
            </dt>
            <dd class="mt-1 grid grid-rows-1 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <MazPhoneNumberInput
                    v-model="phoneNumber"
                    show-code-on-list
                    color="secondary"
                    :preferred-countries="['VN']"
                    :default-country-code="'VN'"
                    @update="results = $event"
                    :success="results?.isValid"
                    :translations="{
                      countrySelector: {
                        placeholder: '',
                        error: '',
                        searchPlaceholder: ''
                      },
                      phoneInput: {
                        placeholder: '',
                        example: ''
                      },
                    }"
                  />
                  <span v-if="errorPhoneNumber" class="error-msg">
                    {{ errorPhoneNumber }}
                  </span>
                </div>
              </section>
            </dd>
          </div> -->
          <ng-template v-if="isSetPassword">
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Mật khẩu
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="password" class="h-10 border border-gray-300 rounded-md shadow-sm px-4" :rules="{ required: isSetPassword, min: 6 }" name="password" type="password" v-model="password"/>
                  <ErrorMessage class="error-msg" name="password" />
                </div>
              </section>
            </dd>
          </div>

          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Xác nhận mật khẩu
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="confirmPassword" class="h-10 border border-gray-300 rounded-md shadow-sm px-4" v-model="confirmPassword" rules="confirmed:@password" type="password" name="confirmPassword" />
                  <ErrorMessage class="error-msg" name="confirmPassword" />
                </div>
              </section>
            </dd>
          </div>
          </ng-template>
         
        </dl>
      </div>
      <div class="submit-button mt-8 gap-x-4 flex flex-row justify-between">
        <div class="flex gap-x-4">
          <button type="submit" class="btn btn-primary font-semibold" @click="[
            validateStatus(),
            validatePhoneNumber(),
            validateRole()
          ]">
            Lưu
          </button>
          <button v-if="isEdit" type="button" class="btn btn-outline" @click="openOrCloseConfirmModal">
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
      title="Xóa thành viên"
      content="Bạn có chắc chắn xóa thành viên này? Hành động này không thể hoàn tác."
      @closeModal="openOrCloseConfirmModal"
      @submit="deleteTeam"
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
  team: { type: Object as PropType<UserDto>, default: () => ({}) },
})

watch(() => props.team, () => {
  id.value = props.team.id
  fullName.value = props.team.name
  email.value = props.team.email
  status.value = props.team.status!
  phoneNumber.value = props.team.phoneNumber!
  roleId.value = props.team.roleId
  isEdit.value = !!props.team.id
  isSetPassword.value = !isEdit.value;
})

const { $api, $loading, $toast } = useNuxtApp()
const $router = useRouter()
const id = ref()
const isEdit = ref(false);
const isSetPassword = ref(true);
const fullName = ref()
const password = ref('')
const confirmPassword = ref('')
const email = ref()
// const results = ref()
const isConfirmDeleteModal = ref()

const { value: phoneNumber, errorMessage: errorPhoneNumber, validate: validatePhoneNumber, resetField: resetPhoneNumber } = useField<string>('phoneNumber', { required: true }, {  initialValue: undefined })
const { value: status, errorMessage: errorStatus, validate: validateStatus, resetField: resetStatus } = useField('status', { required: true }, {  initialValue: UserStatus.Active })
const { value: roleId, errorMessage: errorRole, validate: validateRole, resetField: resetRole } = useField('roleId', { required: true }, { initialValue: '' })
const roleOptions = ref<SelectOption[]>([])
const statusOptions = ref<SelectOption[]>([{
  label: 'Đang hoạt động',
  value: 'active'
}, {
  label: 'Dừng hoạt động',
  value: 'inactive'
}])

onMounted(() => {
  getSelectRoles()
})

const cancelSetPassword = () => {
  isSetPassword.value = false;
  password.value = '';
  confirmPassword.value = '';
}

const handleGoBack = () => {
  $router.push('/admin-console/team')
}

const openOrCloseConfirmModal = () => {
  isConfirmDeleteModal.value = !isConfirmDeleteModal.value
}

const getSelectRoles = async () => {
  const loader = $loading.show()
  const { data } = await $api.adminConsole.getSelectRoles().finally(() => loader.hide()) as SelectOptionResponse
  roleOptions.value = data
}

const submitTeam = async () => {
  if (errorRole.value || errorStatus.value) {
    return
  }
  const loader = $loading.show()
  const userRequest: UpsertUserRequest = {
    id: id.value,
    fullName: fullName.value,
    email: email.value,
    status: status.value,
    phoneNumber: phoneNumber.value,
    roleId: roleId.value,
    password: password.value
  }

  await $api.adminConsole.upsertTeam(userRequest)
    .then(() => {
      $toast.success('Save successful!')
      handleGoBack()
    })
    .finally(() => {
      loader.hide()
    })
}

const deleteTeam = async () => {
  const loader = $loading.show()
  await $api.adminConsole.deleteTeam(id.value)
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
