<template>
  <div>
    <Form id="raovat-form" class="raovat-form" @submit="submitRaoVats">
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
                      :can-deselect="false"
                  />
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
              Facebook
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="facebook" v-model="facebook" type="text" name="facebook" />
                  <ErrorMessage class="error-msg" name="facebook" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Tên người liên hệ
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="contact-name" v-model="contactName" :rules="{ required: false, max: 100 }" type="text" name="contact-name" />
                  <ErrorMessage class="error-msg" name="contact-name" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Số điện thoại
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="phone-number" v-model="phoneNumber" :rules="{ required: false, max: 255 }" type="text" name="phone-number" />
                  <ErrorMessage class="error-msg" name="phone-number" />
                </div>
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
              Website
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="website" v-model="website" :rules="{ required: false, max: 255 }" type="text" name="website" />
                  <ErrorMessage class="error-msg" name="website" />
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
                  <Field id="email" v-model="email" :rules="{ required: false, max: 255, email: true }" type="text" name="email" />
                  <ErrorMessage class="error-msg" name="email" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Địa chỉ
            </dt>
            <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <section>
                <div class="form-group pb-3">
                  <Field id="address" v-model="address" :rules="{ required: false, max: 255 }" type="text" name="address" />
                  <ErrorMessage class="error-msg" name="address" />
                </div>
              </section>
            </dd>
          </div>
          <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt class="text-sm font-medium text-gray-500">
              Hình ảnh đại diện
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
              Hình ảnh chi tiết
            </dt>
            <dd class="mt-1 flex flex-wrap gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <div v-for="(item, index) in extraImages" class="flex gap-1 h-36 w-72">
                <div class="flex-1">
                  <img :src="item.src" alt="image" class="h-full w-full object-cover"/>
                </div>
              <XCircleIcon class="h-6 w-6 text-gray-500 cursor-pointer hover:text-red-500 " @click="removeExtraImage(index)" />
              </div>

              <UploadFile multiple @onSelectedFile="onSelectExtraImages"/>
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
                      :rules="{ required: false, max: 1000 }"
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
                <div class="form-group pb-3 h-96 max-w-4xl">
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
      title="Xóa rao vặt"
      content="Bạn có chắc chắn xóa rao vặt? Hành động này không thể hoàn tác."
      @closeModal="openOrCloseConfirmModal"
      @submit="deleteRaoVat"
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
import { PropType, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp, useRuntimeConfig } from 'nuxt/app'
import ConfirmDeleteModal from '~/components/shared/ConfirmDeleteModal.vue'
import { CategoryTypeEnum } from '~/models/category.model'
import { RaoVatDto, RaoVatRequest } from '~/models/raovat.model'
import moment from 'moment'
import { PencilSquareIcon, ClipboardDocumentIcon } from '@heroicons/vue/20/solid'
import { XCircleIcon } from '@heroicons/vue/24/outline'
import { reactive } from 'vue'

const props = defineProps({
  raoVats: { type: Object as PropType<RaoVatDto>, default: () => ({}) }
})

watch(() => props.raoVats, (value) => {
  id.value = props.raoVats.id
  title.value = props.raoVats.title
  categoryId.value = props.raoVats.categoryId
  publishDate.value = props.raoVats.publishDate!
  initContent.value = props.raoVats.content
  image.value = props.raoVats.imageUrl?.replaceAll('\\', '/')
  facebook.value = props.raoVats.facebook
  phoneNumber.value = props.raoVats.phoneNumber
  metaKeyword.value = props.raoVats.metaKeyword
  contactName.value = props.raoVats.contactName
  website.value = props.raoVats.websiteUrl
  email.value = props.raoVats.email
  address.value = props.raoVats.address
  extraImages.push( ...props.raoVats.extraImages?.map(x => ({src: x})) ?? [])
  rawExtraImagePaths = props.raoVats.rawExtraImagePaths ?? []
  fileToSave.value = value.imageUrl ? value.imageUrl.replace(apiUrl, '') : '';
  description.value = props.raoVats.description
})

const { $api, $loading, $toast } = useNuxtApp()
const $router = useRouter()
const config = useRuntimeConfig()
const apiUrl = config.public.apiURL

const id = ref()
const title = ref()
const facebook = ref()
const contactName = ref()
const phoneNumber = ref()
const metaKeyword = ref()
const email = ref()
const address = ref()
const website = ref()
const description = ref()
const initContent = ref()
const image = ref()
let rawExtraImagePaths: string[] = [];
const addedExtraImageFiles = reactive<File[]>([])
const extraImages = reactive<{
  src: string,
  indexInAddedImages?: number,
}[]>([])

const fileToSave = ref()
// const results = ref()

const isConfirmDeleteModal = ref<boolean>(false)

// const { value: phoneNumber, errorMessage: errorPhoneNumber, validate: validatePhoneNumber, resetField: resetPhoneNumber } = useField<string>('phoneNumber', { required: true }, {  initialValue: undefined })
const { value: categoryId, errorMessage: errorCategory, validate: validateCategory, resetField: resetCategory } = useField<string | undefined>('categoryId', { required: true }, {  initialValue: '' })
const { value: status, errorMessage: errorStatus, validate: validateStatus, resetField: resetStatus } = useField<string | undefined>('status', { required: true }, {  initialValue: 'draft' })
const { value: publishDate, errorMessage: errorDate, validate: validateDate, resetField: resetDate } = useField<string | Date>('date', { required: true }, {  initialValue: new Date() })
const { value: content, errorMessage: errorContent, validate: validateContent, resetField: resetContent } = useField<string | undefined>('content', { required: true }, {  initialValue: '' })
const categoryOptions = ref<SelectOption[]>([])
const statusOptions = ref<SelectOption[]>([
  {value: 'draft', label: 'Bản nháp'},
  {value: 'publish', label: 'Công bố'}
])

onMounted(() => {
  getSelectCategories()
})

const handleGoBack = async () => {
  await $router.push('/admin-console/classifieds/')
}

const openOrCloseConfirmModal = () => {
  isConfirmDeleteModal.value = !isConfirmDeleteModal.value
}

const onChangeContent = ($event: string) => {
  content.value = $event
}

const extractFileNameFromUrl = (url: string) => {
  return url.substring(url.lastIndexOf('/')+1);
}

const copyClipboard = ($event: string) => {
  $toast.success('Sao chép thành công!')
  navigator.clipboard.writeText($event)
}

const onRemoveImage = () => {
  image.value = undefined
  fileToSave.value = undefined
}

const removeExtraImage = (index: number) => {
  const extraImage = extraImages[index];
  if(extraImage.indexInAddedImages) {
    addedExtraImageFiles.splice(extraImage.indexInAddedImages, 1);
  } else {
    const filename = extractFileNameFromUrl(extraImage.src)
    const rawPathIndex = rawExtraImagePaths.findIndex(x => x.includes(filename))
    if(rawPathIndex > -1) {
      rawExtraImagePaths.splice(rawPathIndex, 1);
    }
  }
  extraImages.splice(index, 1);
}

const onSelectedFile = async (files: File[]) => {
  if (files.length > 0) {
    if (files?.[0]) {
      const formData = new FormData();
      formData.append('image', files?.[0])
      formData.append('type', UploadType.RaoVat)
      const [imageUrl] = await Promise.all([
        $api.upload.uploadFile(formData),
      ])

      image.value = !imageUrl.includes(apiUrl) ? `${apiUrl}${imageUrl.replaceAll('\\', '/')}` : imageUrl
      fileToSave.value = imageUrl
    }
    // const reader = new FileReader()
    // reader.onload = (event: any) => {
    //   image.value = event.target?.result
    // }

    // fileToSave.value = files?.[0]
    // reader.readAsDataURL(files?.[0])
  }
}

const onSelectExtraImages = (files: FileList) => {
  if(files.length > 0) {
    const addedImagesLengthBeforePushing = addedExtraImageFiles.length;
    addedExtraImageFiles.push(...files);
    for(let index = 0; index < files.length; index++) {
      extraImages.push({
        src: URL.createObjectURL(files[index]),
        indexInAddedImages: addedImagesLengthBeforePushing + index,
      })
    }
  }

}

const getSelectCategories = async () => {
  const loader = $loading.show()
  const { data }: { data: SelectOption[] } = await $api.adminConsole.getSelectCategories(CategoryTypeEnum.RaoVat).finally(() => loader.hide())
  categoryOptions.value = data
}

const uploadExtraImages = async () => {
  const formData = new FormData();
  addedExtraImageFiles.forEach(x => formData.append("images", x))
  return await $api.upload.uploadFiles(UploadType.RaoVat, formData);
}

const submitRaoVats = async () => {
  if (errorCategory.value || errorDate.value || errorContent.value) {
    return
  }

  const loader = $loading.show()
  let addedExtraImagePaths = [];
  if(addedExtraImageFiles.length > 0) {
    addedExtraImagePaths = await uploadExtraImages()
  }

  const raoVatRequest = {
    categoryId: categoryId.value,
    content: content.value,
    id: id.value,
    publishDate: moment(publishDate.value).local().toDate(),
    title: title.value,
    imageUrl: image.value && fileToSave.value ? fileToSave.value : '',
    extraImages: [...rawExtraImagePaths, ...addedExtraImagePaths],
    facebook: facebook.value || '',
    phoneNumber: phoneNumber.value || '',
    metaKeyword: metaKeyword.value || '',
    contactName: contactName.value || '',
    websiteUrl: website.value || '',
    address: address.value || '',
    email: email.value || '',
    description: description.value || '',
    status: status.value
  } as RaoVatRequest
  
  await $api.adminConsole.upsertRaoVat(raoVatRequest)
    .then(() => {
      $toast.success('Save successful!')
      handleGoBack()
    })
    .finally(() => {
      loader.hide()
    })
}

const deleteRaoVat = async () => {
  const loader = $loading.show()
  await $api.adminConsole.deleteRaoVat(id.value)
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

<style lang="scss">
.raovat-form {
  .ql-container {
    height: 300px;
    max-height: 300px;
  }
}
</style>
