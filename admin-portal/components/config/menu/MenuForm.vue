<template>
  <div>
    <Form id="user-form" class="user-form" @submit="submitRaoVats">
      <div class="course-detail-form border-t border-gray-200">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Số thứ tự
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="order" v-model="order" :rules="{ required: true, integer: true }" type="number" name="order" />
                  <ErrorMessage class="error-msg" name="order" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Tên menu
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="menu-name" v-model="name" :rules="{ required: true, max: 100 }" type="text" name="menu-name" />
                  <ErrorMessage class="error-msg" name="menu-name" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Thể loại
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Multiselect
                    id="category"
                    v-model="categoryId"
                    mode="single"
                    :close-on-select="true"
                    name="category"
                    :searchable="true"
                    :options="categoryOptions"
                    placeholder="Chọn thể loại"
                    no-options-text="Không tìm thấy thể loại"
                  />
                </div>
                <span v-if="errorCategory" class="error-msg">
                  {{ errorCategory }}
                </span>
              </section>
            </dd>
          </div>
        </dl>
      </div>
      <div class="submit-button mt-8 gap-x-4 flex flex-row justify-between">
        <div class="flex gap-x-4">
          <button type="submit" class="btn btn-primary font-semibold" @click="[
            validateCategory()
          ]">
            Lưu
          </button>
          <button v-if="id" type="button" class="btn btn-outline text-red-500" @click="openOrCloseConfirmModal">
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
      title="Xóa menu"
      content="Bạn có chắc chắn xóa menu? Hành động này không thể hoàn tác."
      @closeModal="openOrCloseConfirmModal"
      @submit="deleteMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, useField } from 'vee-validate'
import Multiselect from '@vueform/multiselect'
import { SelectOption, UploadType } from '../../../models/common.model'
import { PropType, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from 'nuxt/app'
import ConfirmDeleteModal from '~/components/shared/ConfirmDeleteModal.vue'
import { CategoryTypeEnum } from '~/models/category.model'
import { MenuDto, MenuRequest } from '~/models/menu.model'

const props = defineProps({
  menu: { type: Object as PropType<MenuDto>, default: () => ({}) }
})

watch(() => props.menu, () => {
  id.value = props.menu.id
  order.value = props.menu.order
  name.value = props.menu.name
  categoryId.value = props.menu.categoryId
})

const { $api, $loading, $toast } = useNuxtApp()
const $router = useRouter()

const id = ref()
const order = ref()
const name = ref()

const isConfirmDeleteModal = ref<boolean>(false)

const { value: categoryId, errorMessage: errorCategory, validate: validateCategory, resetField: resetCategory } = useField<string | undefined>('categoryId', { required: true }, {  initialValue: '' })

const categoryOptions = ref<SelectOption[]>([])

onMounted(() => {
  getSelectCategories()
})

const handleGoBack = async () => {
  await $router.push('/admin-console/config/menu/')
}

const openOrCloseConfirmModal = () => {
  isConfirmDeleteModal.value = !isConfirmDeleteModal.value
}

const getSelectCategories = async () => {
  const loader = $loading.show()
  const { data }: { data: SelectOption[] } = await $api.adminConsole.getSelectCategories(CategoryTypeEnum.News).finally(() => loader.hide())
  categoryOptions.value = data
}

const submitRaoVats = async () => {
  if (errorCategory.value) {
    return
  }

  const loader = $loading.show()

  const menuRequest = {
    categoryId: categoryId.value,
    id: id.value,
    name: name.value,
    order: Number(order.value)
  } as MenuRequest
  
  await $api.adminConsole.upsertMenu(menuRequest)
    .then(() => {
      $toast.success('Save successful!')
      handleGoBack()
    })
    .finally(() => {
      loader.hide()
    })
}

const deleteMenu = async () => {
  const loader = $loading.show()
  await $api.adminConsole.deleteMenu(id.value)
  .then(() => {
    $toast.success('Delete successful!')
    handleGoBack()
  })
  .finally(() => {
    loader.hide()
  })
}
</script>
