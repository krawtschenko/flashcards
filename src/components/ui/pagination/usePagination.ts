export const usePagination = (currentPage: number, totalPages: number) => {
  const range = []
  const pages = []

  // Если страниц меньше или равно 5, показываем все
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else if (currentPage <= 4) {
    // Если текущая страница от 1 до 4, показываем первые несколько страниц
    for (let i = 1; i <= 5; i++) {
      range.push(i)
    }
    pages.push(...range)
    if (totalPages > 5) {
      pages.push('...')
      pages.push(totalPages)
    }
  } else if (currentPage >= totalPages - 3) {
    // Если текущая страница близка к последней, показываем последние страницы
    for (let i = totalPages - 4; i <= totalPages; i++) {
      range.push(i)
    }
    pages.push(1)
    pages.push('...')
    pages.push(...range)
  } else {
    // Страница в середине диапазона
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      range.push(i)
    }
    pages.push(1)
    pages.push('...')
    pages.push(...range)
    pages.push('...')
    pages.push(totalPages)
  }

  return pages
}
