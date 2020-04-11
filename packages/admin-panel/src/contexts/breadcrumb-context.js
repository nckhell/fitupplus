import React, { createContext, useContext, useState } from 'react'

export const BreadcrumbContext = createContext()
export const useBreadcrumb = () => useContext(BreadcrumbContext)

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumb, set_breadcrumb] = useState([])

  const store = {
    items: { get: breadcrumb, set: set_breadcrumb }
  }

  return (
    <BreadcrumbContext.Provider value={store}>
      {children}
    </BreadcrumbContext.Provider>
  )
}
