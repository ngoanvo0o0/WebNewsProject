<template>
  <Form id="category-form" class="category-form" @submit="submitCategory">
    <div class="course-detail-form border-t border-gray-200">
      <dl class="divide-y divide-gray-200">
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-sm font-medium text-gray-500">
            Tên danh mục
          </dt>
          <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <section>
              <div class="form-group pb-3">
                <Field id="categoryName" v-model="categoryName" :rules="{ required: true, max: 100 }" type="text" name="categoryName" />
                <ErrorMessage class="error-msg" name="categoryName" />
              </div>
            </section>
          </dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-sm font-medium text-gray-500">
            Danh mục cha
          </dt>
          <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <section>
              <div class="form-group pb-3">
                <Multiselect
                  id="categoryParentId"
                  v-model="categoryParentId"
                  mode="single"
                  :close-on-select="true"
                  name="categoryParentId"
                  :searchable="true"
                  :options="categoriesParentsOptions"
                  placeholder="Chọn danh mục cha"
                  no-options-text="Không tìm thấy danh mục cha"
                />
                <!-- <span v-if="categoryParentIdError" class="error-msg">
                  {{ categoryParentIdError }}
                </span> -->
              </div>
            </section>
          </dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-sm font-medium text-gray-500">
            Loại danh mục
          </dt>
          <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <section>
              <div class="form-group pb-3">
                <Multiselect
                  id="categoryType"
                  v-model="categoryType"
                  mode="single"
                  :close-on-select="true"
                  name="categoryType"
                  :searchable="true"
                  :options="categoryTypesOptions"
                  placeholder="Chọn loại danh mục"
                  no-options-text="Không tìm thấy loại danh mục"
                />
                <span v-if="errorCategoryType" class="error-msg">
                  {{ errorCategoryType }}
                </span>
              </div>
            </section>
          </dd>
        </div>
        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
          <dt class="text-sm font-medium text-gray-500">
            Hiển thị loại
          </dt>
          <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <section>
              <div class="form-group pb-3">
                <Multiselect
                  id="styleShow"
                  v-model="styleShow"
                  mode="single"
                  :close-on-select="true"
                  name="styleShow"
                  :searchable="true"
                  :options="styleShowOptions"
                  placeholder="Chọn hiển thị loại"
                  no-options-text="Không tìm thấy hiển thị loại"
                />
                <span v-if="errorStyleShow" class="error-msg">
                  {{ errorStyleShow }}
                </span>
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
          validateStatus(),
          validateCategoryParentId(),
          validateCategoryType(),
          validateStyleShow()
        ]">
          Lưu
        </button>
        <button v-if="id" type="button" class="btn btn-outline text-red" @click="deleteCategory">
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
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, useField } from 'vee-validate'
import Multiselect from '@vueform/multiselect'
import { PropType, ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useNuxtApp } from 'nuxt/app';
import { SelectOption } from '~/models/common.model';
import { CategoryDto, CategoryStatusEnum, CategoryTypeEnum, CategoryTypeShowEnum, UpsertCategoryRequest } from '../../models/category.model';

const props = defineProps({
  category: { type: Object as PropType<CategoryDto>, default: () => ({}) }
})

watch(() => props.category, () => {
  id.value = props.category.id
  categoryName.value = props.category.name
  status.value = props.category.status!
  styleShow.value = props.category.styleShow
  categoryType.value = props.category.type
  categoryParentId.value = props.category.categoryParentId
})

const { $api, $loading, $toast } = useNuxtApp()
const $router = useRouter()
const categoryName = ref('')
const id = ref()
const { value: status, errorMessage: errorStatus, validate: validateStatus, resetField: resetStatus } = useField('status', { required: true }, {  initialValue: CategoryStatusEnum.Active })
const { value: categoryType, errorMessage: errorCategoryType, validate: validateCategoryType, resetField: resetCategoryType } = useField('categoryType', { required: true }, {  initialValue: CategoryTypeEnum.News })
const { value: styleShow, errorMessage: errorStyleShow, validate: validateStyleShow, resetField: resetStyleShow } = useField<CategoryTypeShowEnum | string>('styleShow', { required: false }, {  initialValue: '' })
const { value: categoryParentId, errorMessage: errorCategoryParentId, validate: validateCategoryParentId, resetField: resetCategoryParentId } = useField('categoryParentId', { required: true }, {  initialValue: '' })


const categoriesParentsOptions = ref<SelectOption[]>([])
const statusOptions = ref<SelectOption[]>([{
  label: 'Đang hoạt động',
  value: CategoryStatusEnum.Active
}, {
  label: 'Dừng hoạt động',
  value: CategoryStatusEnum.Inactive
}])

const categoryTypesOptions = ref<SelectOption[]>([{
  label: 'Bài viết',
  value: 'news'
}, {
  label: 'Rao vặt',
  value: 'raovat'
}])

const styleShowOptions = ref<SelectOption[]>([{
    label: 'News1',
    value: CategoryTypeShowEnum.News1
  }, {
    label: 'News2',
    value: CategoryTypeShowEnum.News2
  }, {
    label: 'News3',
    value: CategoryTypeShowEnum.News3
}])

onMounted(() => {
  loadCategoriesParents() 
})

const handleGoBack = () => {
  $router.push('/admin-console/posts/categories')
}

const submitCategory = async () => {
  if (errorCategoryType.value || errorStatus.value || errorStyleShow.value) {
    return
  }

  const loader = $loading.show()
  const categoryRequest: UpsertCategoryRequest = {
    id: id.value,
    name: categoryName.value, 
    status: status.value, 
    type: categoryType.value,
    styleShow: styleShow.value || '',
    categoryParentId: categoryParentId.value || undefined
  }

  await $api.adminConsole.upsertCategory(categoryRequest)
    .then(() => {
      $toast.success('Save successful!')
      handleGoBack()
    })
    .finally(() => {
      loader.hide()
    })
}

const deleteCategory = async () => {
  const loader = $loading.show()
  await $api.adminConsole.deleteCategory(id.value)
    .then(() => {
      $toast.success('Delete successful!')
      handleGoBack()
    })
    .finally(() => {
      loader.hide()
    })
}

const loadCategoriesParents = async () => {
  const loader = $loading.show()
  const { data } = await $api.adminConsole.getCategoriesParents().finally(() => loader.hide())
  categoriesParentsOptions.value = data.map(e => {
    return {
      label: e.name,
      value: e.id
    } as SelectOption
  })
}
</script>

<style>
.m-phone-number-input__country-flag {
  top: 10px
}
</style>
