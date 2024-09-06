// Chat GPT

export const usePagination = (currentPage: number, totalPages: number) => {
  const range = []
  const pages = []

  // If there are 5 or fewer pages, show all pages
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else if (currentPage <= 4) {
    // If the current page is between 1 and 4, show the first few pages
    for (let i = 1; i <= 5; i++) {
      range.push(i)
    }
    pages.push(...range)
    if (totalPages > 5) {
      pages.push('...')
      pages.push(totalPages)
    }
  } else if (currentPage >= totalPages - 3) {
    // If the current page is close to the last page, show the last few pages
    for (let i = totalPages - 4; i <= totalPages; i++) {
      range.push(i)
    }
    pages.push(1)
    pages.push('...')
    pages.push(...range)
  } else {
    // If the current page is somewhere in the middle, show surrounding pages
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
