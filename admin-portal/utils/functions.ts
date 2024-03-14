export const capitalizeString = (text: string) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

export const getUserNameFromLocalStorage = () => {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    return JSON.parse(userInfo)
  }

  return '-'
}

export const convertStatus = (status: string) => {
  switch (status) {
    case 'active':
      return 'Đang hoạt động'
    case 'inactive':
      return 'Dừng hoạt động'
    default:
      return '-'
  }
}

export const convertCategory = (category: string) => {
  switch (category) {
    case 'news':
      return 'Bài viết'
    case 'raovat':
      return 'Rao vặt'
    default:
      return '-'
  }
}
