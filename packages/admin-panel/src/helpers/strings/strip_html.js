//@flow
type htmlType = string

export const strip_html = (html: htmlType): string => {
  var temporalDivElement = document.createElement('div')
  temporalDivElement.innerHTML = html
  return temporalDivElement.textContent || temporalDivElement.innerText || ''
}
