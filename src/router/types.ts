export interface BreadcrumbItem {
  name: string
  link?: string | (() => string)
  params?: string[]
}

export interface AppRouteMeta {
  requiresAuth?: boolean
  titleAppearance?: boolean
  title?: string
  noNeedRouteWaiting?: boolean
  breadcrumb?: BreadcrumbItem
  layout?: string
}
