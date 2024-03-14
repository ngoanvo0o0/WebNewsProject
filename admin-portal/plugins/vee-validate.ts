import { defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((/* nuxtApp */) => {
  Object.keys(AllRules).filter(k => k !== 'default').forEach((rule) => {
    defineRule(rule, AllRules[rule])
  })
  configure({
    // create and set a localization handler
    generateMessage: localize('en', {
      messages: {
        // interpolates the field name
        required: 'Trường này là bắt buộc',
        // interpolates the min, max params
        between: 'Trường này phải từ 0:{min} đến 1:{max}',
        // Interpolates another field value in the form
        confirmed: 'Mật khẩu không khớp',
        max: 'Trường này không được nhiều hơn 0:{limit} ký tự',
        min: 'Trường này không được ít hơn 0:{limit} ký tự',
        regex: 'This field must only contains letters or numbers',
        email: 'Trường này phải là một email hợp lệ',
        integer: 'Trường này phải là một giá trị số nguyên',
        max_value: 'Trường này không được lớn hơn 0:{limit}',
        min_value: 'Trường này phải lớn hơn 0:{limit}'
      }
    })
  })
})
