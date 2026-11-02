export const EVENT_CATEGORIES = [
  'Music',
  'Technology',
  'Food & Drink',
  'Arts & Culture',
  'Wellness',
  'Business',
  'Community',
] as const

export type EventCategory = (typeof EVENT_CATEGORIES)[number]

export interface EventItem {
  slug: string
  title: string
  category: EventCategory
  start: string
  time: string
  venue: string
  address: string
  city: string
  image: string
  imageAlt: string
  summary: string
  about: string[]
  highlights: string[]
  goodToKnow: string[]
  price: number
  capacity: number
  organizer: string
  featured: boolean
}

export interface Registration {
  id: string
  reference: string
  name: string
  email: string
  phone: string
  eventSlug: string
  createdAt: string
}
