<template>
    <div>
      <form id="advertisement-form">
        <div class="border-gray-200">
          <dl class="divide-y divide-gray-200">
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt class="text-sm font-medium text-gray-500">
                Tên
              </dt>
              <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <section>
                  <div class="form-group pb-3">
                    <input id="name" v-model="advertisement.name" type="text" name="name" @change="validation.name.$touch"/>
                    <span class="error-msg" v-if="validation.name.$error">
                      {{ validation.name.$errors[0].$message }}
                    </span>
                 </div>
                </section>
              </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt class="text-sm font-medium text-gray-500">
                Liên kết
              </dt>
              <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <section>
                  <div class="form-group pb-3">
                    <input id="name" v-model="advertisement.url" type="text" name="name" @change="validation.url.$touch"/>
                    <span class="error-msg" v-if="validation.url.$error">
                      {{ validation.url.$errors[0].$message }}
                    </span>
                 </div>
                </section>
              </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt class="text-sm font-medium text-gray-500">
                Độ ưu tiên
              </dt>
              <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <section>
                  <div class="form-group pb-3">
                    <div class="mt-1 rounded-md shadow-sm">
                      <input id="order" v-model="advertisement.order" type="number" name="order" @change="validation.order.$touch" />
                    </div>
                    <span class="error-msg" v-if="validation.order.$error">
                      {{ validation.order.$errors[0].$message }}
                    </span>                  
                  </div>
                </section>
              </dd>
            </div>
            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt class="text-sm font-medium text-gray-500">
                Nơi hiển thị
              </dt>
              <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <section>
                  <div class="form-group pb-3">
                    <Field v-model="advertisement.position" name="position" as="select" @change="validation.position.$touch">
                      <option v-for="item in positionOptions" :value="item.value">{{item.label}}</option>
                    </Field>
                    <span v-if="validation.position.$error" class="error-msg">
                      {{ validation.position.$errors[0].$message }}
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
                    <Field v-model="advertisement.status" name="status" as="select" @change="validation.status.$touch">
                      <option v-for="item in statusOptions" :value="item.value">{{item.label}}</option>
                    </Field>
                    <span v-if="validation.status.$error" class="error-msg">
                      {{ validation.status.$errors[0].$message }}
                    </span>
                  </div>
                </section>
              </dd>
            </div>

            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt class="text-sm font-medium text-gray-500">
                Hình quảng cáo
              </dt>
              <dd class="mt-1 grid grid-cols-2 gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <section>
                  <div class="form-group pb-3">
                   <input id="image" name="image" type="file" class="hidden" @change="onSelectFile($event)" accept="image/*">
                   <label for="image" :class="{'border-indigo-500': isHover, 'border-gray-300': !isHover}"
                   @dragenter.prevent="setActive" @dragover.prevent="setActive" @dragleave.prevent="setInactive" @drop.prevent="onDrop"
                   class="border-2 border-dashed rounded-md h-32 flex items-center justify-center">
                      <img v-if="imageSource" :src="imageSource" alt="uploaded image" class="h-full">
                   </label>
                  </div>
                  <span v-if="validation.image.$error" class="error-msg">
                      {{ validation.image.$errors[0].$message }}
                    </span>
                </section>
              </dd>
            </div> 
          </dl>
        </div>
      </form>
    </div>
</template>
  
<script setup lang="ts">
  import { PropType, onMounted, ref, watch } from 'vue'
  import { SaveAdvertisementRequest } from '~/models/advertisement.model';
  import { computed, reactive, onUnmounted } from 'vue';
  import { helpers, integer, maxLength, minValue, required, url } from '@vuelidate/validators';
  import useVuelidate from '@vuelidate/core';
  import { Field } from 'vee-validate';
  
  const props = defineProps({
    ad: { type: Object as PropType<SaveAdvertisementRequest>, default: () => ({}) }
  })
  const emit = defineEmits<{
    (e: 'validate', disabled: boolean): void
  }>();

  const imageSource = ref<string>();
  let advertisement = reactive<SaveAdvertisementRequest>(props.ad);
  const validationRules = computed(() => {
		return {
			name: {
				required: helpers.withMessage('The name field is required', required),
                max: helpers.withMessage('The name field must be less than 100 characters', maxLength(100)),
			},
      order: {
          required: helpers.withMessage('The order field is required', required),
          integer: helpers.withMessage('The order field must be integer', integer),
          min: helpers.withMessage('The order field must be greater than 0', minValue(1)),
      },
      url: {
          required: helpers.withMessage('The url field is required', required),
          url: helpers.withMessage('The url field must be url', url),
      },
      position: {
          required: helpers.withMessage('The position field is required', required),
      },
      status: {
          required: helpers.withMessage('The status field is required', required),
      },
      image: {
          required: helpers.withMessage('The image field is required', required),
      },
		};
	});
  let validation = useVuelidate(validationRules, advertisement);

  let unwatch = watch(validation, (value) => {
      emit('validate', !value.$anyDirty || value.$invalid)
  })
  watch(() => props.ad, (value) => {
      advertisement = reactive(value)
      validation = useVuelidate(validationRules, advertisement);
      unwatch();
      unwatch = watch(validation, (value) => {
          emit('validate', !value.$anyDirty || value.$invalid)
      })
      imageSource.value = value.image as string;
  })

  const positionOptions = [
    {
      label: 'Phần đầu',
      value: 'top'
    },
    {
      label: 'Bên phải',
      value: 'right'
    },
    {
      label: 'Ở giữa',
      value: 'center'
    },
    {
      label: 'Phần cuối',
      value: 'bottom'
    },
  ] as const;
  const statusOptions = [{
    label: 'Đang hoạt động',
    value: 'active'
  }, {
    label: 'Dừng hoạt động',
    value: 'inactive'
  }] as const;

  const events = ['dragenter', 'dragover', 'dragleave', 'drop'] as const;
  const isHover = ref(false)
  
  function onDrop(e: DragEvent) {
    setInactive() // add this line too
    handleFile(e.dataTransfer?.files?.[0]!)
  }

  function setActive() {
      isHover.value = true
  }

  function setInactive() {
      isHover.value = false
  }

  onMounted(() => {
    events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults)
    })
  })

  onUnmounted(() => {
    events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults)
    })
  })

  function preventDefaults(e: Event) {
    e.preventDefault()
  }

  function onSelectFile(event: Event){
    const files = (event?.target as HTMLInputElement)?.files;
    if(files){
      handleFile(files[0])
    }
  }

  function handleFile(file: File) {
    if(file){
      if(!file) return;
      advertisement.image = file
      imageSource.value = URL.createObjectURL(file)
      validation.value.image.$touch();
    }

  }
  
</script>
