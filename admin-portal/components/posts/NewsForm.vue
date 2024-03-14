<template>
  <div>
    <Form id="news-form" class="news-form" @submit="submitNews">
      <div class="course-detail-form border-t border-gray-200">
        <dl class="divide-y divide-gray-200">
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Tiêu đề
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="title" v-model="title" :rules="{ required: true, max: 100 }" type="text" name="title" />
                  <ErrorMessage class="error-msg" name="title" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Tin nóng
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field
                    id="is-hot-news"
                    v-model="isHotNews"
                    type="checkbox"
                    name="is-hot-news"
                    :value="true"
                    :checked="true"
                    @update:model-value="onChangeIsHotNews"
                  />
                  <ErrorMessage class="error-msg" name="is-hot-news" />
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
                    placeholder="Chọn danh mục"
                    no-options-text="No category found"
                  />
                </div>
                <span v-if="errorCategory" class="error-msg">
                  {{ errorCategory }}
                </span>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Tags
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Multiselect
                    id="tags"
                    v-model="tagIds"
                    mode="tags"
                    name="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    :on-create="handleTagCreate"
                    :options="tagOptions"
                    placeholder="Nhập hoặc chọn tags"
                    no-options-text="No tags found"
                  />
                </div>
                <span v-if="errorTags" class="error-msg">
                  {{ errorTags }}
                </span>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Ngày xuất bản
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <VueDatePicker
                    v-model="publishDate"
                    placeholder="Start Typing ..."
                    text-input
                    :required="true"
                    format="dd/MM/yyyy HH:mm"
                    :clearable="true"
                    :auto-apply="true"
                  />
                </div>
                <span v-if="errorDate" class="error-msg">
                  {{ errorDate }}
                </span>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Từ khóa meta
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="meta-keyword" v-model="metaKeyword" :rules="{ required: false, max: 255 }" type="text" name="meta-keyword" />
                  <ErrorMessage class="error-msg" name="meta-keyword" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Hình ảnh
            </dt>
            <dd class="mt-1 grid grid-rows-1 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <UploadFile 
                v-if="!image"
                @onSelectedFile="onSelectedFile"
              />
              <div v-else class="flex flex-row gap-2 h-36 w-72">
                <div>
                  <img :src="image" alt="image" class="h-full w-full object-cover"/>
                </div>
                <PencilSquareIcon class="h-5 w-5 text-gray-400 cursor-pointer" @click="onRemoveImage" />
              </div>
              <div v-if="image" class="flex flex-row gap-2">
                <p>
                  {{ image }}
                </p>
                <ClipboardDocumentIcon class="h-5 w-5 text-gray-400 cursor-pointer" @click="copyClipboard(image)" />
              </div>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Mô tả
            </dt>
            <dd class="mt-1 grid grid-rows-1 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <div class="relative mt-1 rounded-md shadow-sm">
                    <Field
                      id="description"
                      as="textarea"
                      v-model="description"
                      :rules="{ required: true, max: 1000 }"
                      type="text"
                      name="description"
                      rows="4"
                      class="h-20 min-h-max py-2"
                    />
                  </div>
                  <ErrorMessage class="error-msg" name="description" /> 
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Nội dung
            </dt>
            <dd class="mt-1 grid grid-rows-1 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3 h-[600px] max-w-4xl">
                  <TinyEditor
                    :content-value="initContent"
                    @on-text-change="onChangeContent"
                  />
                </div>
                <span v-if="errorContent" class="error-msg">
                  {{ errorContent }}
                </span>
              </section>
            </dd>
          </div>
        </dl>
      </div>
      <div class="submit-button mt-8 gap-x-4 flex flex-row justify-between">
        <div class="flex gap-x-4">
          <button type="submit" class="btn btn-primary font-semibold" @click="[
            validateCategory(),
            validateDate(),
            validateContent()
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
      title="Xóa bài viết"
      content="Bạn có chắc chắn xóa bài viết? Hành động này không thể hoàn tác."
      @closeModal="openOrCloseConfirmModal"
      @submit="deleteNews"
    />
  </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, useField } from 'vee-validate'
import Multiselect from '@vueform/multiselect'
import VueDatePicker from '@vuepic/vue-datepicker'
import TinyEditor from '../../components/shared/TinyEditor.vue'
import UploadFile from '../../components/shared/UploadFile.vue'
import { SelectOption, UploadType } from '../../models/common.model'
import { NewsDto, NewsRequest, NewsStatusEnum } from '../../models/news.model'
import { PropType, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp, useRuntimeConfig } from 'nuxt/app'
import { SelectOptionResponse } from '~/models/role.model'
import ConfirmDeleteModal from '~/components/shared/ConfirmDeleteModal.vue'
import { CategoryTypeEnum } from '~/models/category.model'
import { PencilSquareIcon, ClipboardDocumentIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  news: { type: Object as PropType<NewsDto>, default: () => ({}) }
})

watch(() => props.news, (value) => {
  id.value = props.news.id
  title.value = props.news.title
  description.value = props.news.description
  categoryId.value = props.news.categoryId
  publishDate.value = props.news.publishDate!
  initContent.value = props.news.content
  tagIds.value = props.news.tagIds
  image.value = props.news.imageUrl?.replaceAll('\\', '/')
  isHotNews.value = props.news.isHotNews as boolean
  metaKeyword.value = props.news.metaKeyword || ''
  view.value = props.news.view
  fileToSave.value = value.imageUrl ? value.imageUrl.replace(apiUrl, '') : '';
})

const { $api, $loading, $toast } = useNuxtApp()
const $router = useRouter()
const config = useRuntimeConfig()
const apiUrl = config.public.apiURL

const id = ref()
const title = ref()
const metaKeyword = ref('')
const view = ref()
const description = ref()
const initContent = ref()
const image = ref()
const fileToSave = ref()
const isHotNews = ref<boolean>(false)

const isConfirmDeleteModal = ref<boolean>(false)

const { value: categoryId, errorMessage: errorCategory, validate: validateCategory, resetField: resetCategory } = useField<string | undefined>('categoryId', { required: true }, {  initialValue: '' })
const { value: publishDate, errorMessage: errorDate, validate: validateDate, resetField: resetDate } = useField<string | Date>('date', { required: true }, {  initialValue: new Date() })
const { value: content, errorMessage: errorContent, validate: validateContent, resetField: resetContent } = useField<string | undefined>('content', { required: true }, {  initialValue: '' })
const { value: tagIds, errorMessage: errorTags, validate: validateTags, resetField: resetTags } = useField<string[] | undefined>('tagIds', { required: false }, {  initialValue: [] })

const statusOptions = ref<SelectOption[]>([{
  label: 'Bản nháp',
  value: NewsStatusEnum.Draft
}, {
  label: 'Công bố',
  value: NewsStatusEnum.Publish
}])
const categoryOptions = ref<SelectOption[]>([])
const tagOptions = ref<SelectOption[]>([])

onMounted(() => {
  getSelectCategories()
  getSelectTags()
})

const handleGoBack = () => {
  $router.go(-1)
}

const handleTagCreate = (option: any) => {
  if (option.value.trim().length === 0) {
    return false
  }

  return option
}

const onRemoveImage = () => {
  image.value = undefined
  fileToSave.value = undefined
}

const onSelectedFile = async (files: File[]) => {
  if (files.length > 0) {
    if (files?.[0]) {
      const formData = new FormData();
      formData.append('image', files?.[0])
      formData.append('type', UploadType.Categories)
      const [imageUrl] = await Promise.all([
        $api.upload.uploadFile(formData)
      ])

      image.value = !imageUrl.includes(apiUrl) ? `${apiUrl}${imageUrl.replaceAll('\\', '/')}` : imageUrl
      fileToSave.value = imageUrl
    }
  }
}

const copyClipboard = ($event: string) => {
  $toast.success('Sao chép thành công!')
  navigator.clipboard.writeText($event)
}

const openOrCloseConfirmModal = () => {
  isConfirmDeleteModal.value = !isConfirmDeleteModal.value
}

const onChangeContent = ($event: string) => {
  content.value = $event
}

const onChangeIsHotNews = () => {
  if (!isHotNews.value) {
    isHotNews.value = false
  }
}

const getSelectCategories = async () => {
  const loader = $loading.show()
  const { data }: { data: SelectOption[] } = await $api.adminConsole.getSelectCategories(CategoryTypeEnum.News).finally(() => loader.hide())
  categoryOptions.value = data
}

const getSelectTags = async () => {
  const loader = $loading.show()
  const { data }: { data: SelectOption[] } = await $api.adminConsole.getSelectTags().finally(() => loader.hide())
  tagOptions.value = data
}

const submitNews = async () => {
  if (errorCategory.value || errorDate.value || errorContent.value) {
    return
  }

  const loader = $loading.show()

  const newsRequest = {
    categoryId: categoryId.value,
    content: content.value,
    description: description.value,
    id: id.value,
    publishDate: publishDate.value,
    title: title.value,
    tagIds: tagIds.value,
    imageUrl: image.value && fileToSave.value ? fileToSave.value : '',
    isHotNews: isHotNews.value,
    metaKeyword: metaKeyword.value,
    view: view.value 
  } as NewsRequest
  
  await $api.adminConsole.upsertNews(newsRequest)
    .then(() => {
      $toast.success('Lưu thành công!')
      handleGoBack()
    })
    .finally(() => {
      loader.hide()
    })
}

const deleteNews = async () => {
  const loader = $loading.show()
  await $api.adminConsole.deleteNews(id.value)
  .then(() => {
    $toast.success('Xóa thành công!')
    handleGoBack()
  })
  .finally(() => {
    loader.hide()
  })
}
</script>

<style lang="scss">
.news-form {
  .ql-container {
    height: 300px;
    max-height: 300px;
  }
}
</style>
