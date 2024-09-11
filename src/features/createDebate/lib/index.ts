export const validTitle = (title: string) => {
  return title.length < 3 || title.length > 50
} 