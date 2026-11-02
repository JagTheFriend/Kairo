import type { EventItem } from '../types'

export const HERO_EVENT_SLUG = 'neon-fields'

function eventDate(daysFromNow: number, hour: number, minute = 0): string {
  const date = new Date()
  date.setHours(hour, minute, 0, 0)
  date.setDate(date.getDate() + daysFromNow)
  return date.toISOString()
}

export const events: EventItem[] = [
  {
    slug: 'night-market-no-9',
    title: 'Night Market No. 9',
    category: 'Food & Drink',
    start: eventDate(4, 18),
    time: '18:00 – 23:00',
    venue: 'The Old Depot Yards',
    address: '14 Cannon Street',
    city: 'Riverside',
    image: '/images/night-market.jpg',
    imageAlt: 'A brightly lit street food stall at a night market',
    summary:
      'Thirty stalls, one long table, and the best late-night food the city has to offer.',
    about: [
      'For one night, the old depot turns into a proper night market: charcoal grills, dumpling counters, natural wine, and a bakery selling out of cardamom buns by nine. Bring cash for the small stalls and an appetite you can defend.',
      "We keep the lineup tight on purpose. That means fewer queues, more time eating, and enough room to actually sit down with friends.",
    ],
    highlights: [
      '30 independent food stalls',
      'Live sets from 19:00',
      'Vegetarian and vegan options throughout',
      'Family friendly until 21:00',
    ],
    goodToKnow: [
      'Entry is free. Dishes are paid directly to vendors.',
      'The venue is outdoors, so dress for the weather.',
      'Step-free access from Cannon Street.',
    ],
    price: 0,
    capacity: 240,
    organizer: 'Kairo x Old Depot',
    featured: false,
  },
  {
    slug: 'sunrise-flow',
    title: 'Sunrise Flow',
    category: 'Wellness',
    start: eventDate(7, 7),
    time: '07:00 – 08:15',
    venue: 'Riverside Green',
    address: 'Riverside Green, North Bank',
    city: 'Riverside',
    image: '/images/sunrise-flow.jpg',
    imageAlt: 'Three people practising yoga on mats in an autumn park',
    summary:
      'A slow, all-levels yoga session on the grass, before the city wakes up.',
    about: [
      'We start at seven, with the sun coming up over the water and not much else going on. The session is guided but unhurried: breath work, a gentle flow, and ten quiet minutes at the end.',
      'Mats are provided, but bring a layer. The ground can be cold before the sun clears the trees.',
    ],
    highlights: [
      'All levels welcome',
      'Mats and props provided',
      '75-minute guided session',
      'Coffee after class for anyone who wants to stay',
    ],
    goodToKnow: [
      'Meet at the north gate at 06:50.',
      'Sessions are cancelled in heavy rain. Check your email.',
      'No previous yoga experience needed.',
    ],
    price: 0,
    capacity: 40,
    organizer: 'Still Studio',
    featured: true,
  },
  {
    slug: 'neon-fields',
    title: 'Neon Fields',
    category: 'Music',
    start: eventDate(11, 19, 30),
    time: '19:30 – 23:00',
    venue: 'Pier 24, East Dock',
    address: 'Pier 24, East Dock',
    city: 'Harbour',
    image: '/images/neon-fields.jpg',
    imageAlt: 'A crowd at an outdoor concert beneath confetti and stage lights',
    summary:
      'Four bands, one dock, and a light show built for the last warm nights of the year.',
    about: [
      "Neon Fields is a one-night lineup of guitar music that doesn't fit neatly into one genre. Expect shoegaze, post-punk, and a headline set from a band that has been quietly selling out rooms all year.",
      'Doors at seven, music at half past. Between sets, the loading bay turns into a bar with local beer and a very good grilled cheese stand.',
    ],
    highlights: [
      'Four live acts across two stages',
      'Local beer and food from 19:00',
      'Indoor and outdoor areas',
      'Cloakroom available',
    ],
    goodToKnow: [
      '18+ event. Photo ID required.',
      'Re-entry is allowed until 21:00.',
      'The dock is a 12-minute walk from Harbour station.',
    ],
    price: 28,
    capacity: 600,
    organizer: 'Lowlight Presents',
    featured: true,
  },
  {
    slug: 'build-better',
    title: 'Build Better: A Product Night',
    category: 'Technology',
    start: eventDate(17, 18, 30),
    time: '18:30 – 21:30',
    venue: 'The Foundry, Floor 3',
    address: '88 Mill Lane',
    city: 'Riverside',
    image: '/images/build-better.jpg',
    imageAlt: 'A speaker on stage in front of a seated conference audience',
    summary:
      'Three short talks on shipping useful software, followed by honest questions and cold drinks.',
    about: [
      'No growth-hacking keynote, no forty-slide deck. Three product people talk about a decision they got wrong, what it cost, and what they changed. Then we open the floor.',
      "The talks are practical and specific: onboarding, pricing, and the messy middle of building a product with a small team. You'll leave with notes, not a tote bag.",
    ],
    highlights: [
      'Three 20-minute talks',
      'Q&A with all speakers',
      'Drinks and snacks included',
      'Quiet room available',
    ],
    goodToKnow: [
      'Doors open at 18:00.',
      'Talks start promptly at 18:30.',
      'Bring ID for building access.',
    ],
    price: 15,
    capacity: 120,
    organizer: 'Kairo Studio',
    featured: true,
  },
  {
    slug: 'sunday-jazz',
    title: 'Sunday Jazz on the Roof',
    category: 'Music',
    start: eventDate(21, 17),
    time: '17:00 – 20:00',
    venue: 'Hotel Meridian Rooftop',
    address: '2 Meridian Square',
    city: 'Old Town',
    image: '/images/sunday-jazz.jpg',
    imageAlt: 'A jazz singer and saxophonist performing on a dimly lit stage',
    summary:
      'A five-piece jazz band, a rooftop at golden hour, and nowhere else to be.',
    about: [
      "Blue Room Sessions bring their quintet to the Hotel Meridian roof for one Sunday. The set leans on hard bop and a few standards, with a long, loose middle section that sounds best when the sun goes down.",
      'Doors at five. The bar serves a short list of cocktails and zero-proof drinks, and the kitchen sends up small plates until eight.',
    ],
    highlights: [
      'Live five-piece jazz band',
      'Golden-hour set at 17:30',
      'Rooftop bar and small plates',
      'Seated and standing areas',
    ],
    goodToKnow: [
      'The roof is open-air, so bring a jacket.',
      "Access is by the hotel's east lift.",
      '21+ after 19:00.',
    ],
    price: 22,
    capacity: 90,
    organizer: 'Blue Room Sessions',
    featured: false,
  },
  {
    slug: 'paper-and-light',
    title: 'Paper & Light: Independent Print Fair',
    category: 'Arts & Culture',
    start: eventDate(29, 11),
    time: '11:00 – 18:00',
    venue: 'Warehouse 8, Canal Street',
    address: '8 Canal Street',
    city: 'Old Town',
    image: '/images/paper-light.jpg',
    imageAlt: 'Two people looking at black-and-white prints in a gallery',
    summary:
      'Forty independent printers, photographers, and zine makers under one warehouse roof.',
    about: [
      'A print fair for people who still like holding things. Forty tables of photography, poetry, illustration, and small-run books, with prices that start low and stay there.',
      "There are talks at noon and three, a repair table for damaged books, and a reading corner that is genuinely quiet. Bring a tote. You'll need it.",
    ],
    highlights: [
      '40 independent exhibitors',
      'Talks at 12:00 and 15:00',
      'Book repair table',
      'Quiet reading corner',
    ],
    goodToKnow: [
      'Free entry, no ticket needed.',
      'Some exhibitors are cash only.',
      'Step-free access via the canal entrance.',
    ],
    price: 0,
    capacity: 300,
    organizer: 'Paper & Light Collective',
    featured: false,
  },
  {
    slug: 'founders-table',
    title: "Founders' Table",
    category: 'Business',
    start: eventDate(34, 19),
    time: '19:00 – 22:00',
    venue: 'Casa Lupe, Back Room',
    address: '31 Orchard Road',
    city: 'Old Town',
    image: '/images/founders-table.jpg',
    imageAlt: 'A waiter serving plates in a warmly lit restaurant',
    summary:
      'An intimate dinner for founders, with one rule: no pitching at the table.',
    about: [
      'Twelve seats, one long table, and a fixed menu from Casa Lupe. The guest list is deliberately mixed: early-stage founders, people who have sold a company, and a few operators who have seen both sides.',
      'There are no name badges and no stage. The point is a useful conversation with someone who is not trying to sell you anything.',
    ],
    highlights: [
      'Dinner and drinks included',
      '12-person table',
      'Fixed menu, dietary needs collected after booking',
      'Hosted conversation, no pitching',
    ],
    goodToKnow: [
      "You'll receive a short dietary form after booking.",
      'Arrive by 18:45 for a 19:00 start.',
      'Tickets are transferable up to 48 hours before.',
    ],
    price: 45,
    capacity: 12,
    organizer: 'The Long Table',
    featured: false,
  },
  {
    slug: 'city-swap',
    title: 'City Swap: Clothes & Stories',
    category: 'Community',
    start: eventDate(43, 10),
    time: '10:00 – 16:00',
    venue: 'Civic Hall, West Wing',
    address: '1 Civic Square',
    city: 'Riverside',
    image: '/images/city-swap.jpg',
    imageAlt: 'A rack of colourful second-hand clothes at a market',
    summary:
      "Bring five things you've stopped wearing. Leave with five things you'll actually wear.",
    about: [
      'City Swap is a clothes swap with a story table. Drop off up to five clean items before noon, take a ticket, and come back to browse once everything is on the racks. Anything left at the end goes to a local shelter.',
      "The story table is new this year: write the history of one piece you're letting go. Some of the best ones will be pinned to the wall.",
    ],
    highlights: [
      'Swap up to five items',
      'Repair station for small fixes',
      'Story wall and zine corner',
      'Leftover clothing donated',
    ],
    goodToKnow: [
      'Items must be clean and in wearable condition.',
      'Drop-off closes at 12:00.',
      'Changing rooms available on site.',
    ],
    price: 0,
    capacity: 200,
    organizer: 'Common Ground',
    featured: false,
  },
  {
    slug: 'ai-honestly',
    title: 'AI, Honestly',
    category: 'Technology',
    start: eventDate(52, 18),
    time: '18:00 – 21:00',
    venue: "Studio 4, Maker's Quarter",
    address: '9 Kiln Yard',
    city: 'Harbour',
    image: '/images/ai-honestly.jpg',
    imageAlt: 'A group of people collaborating around a table with laptops',
    summary:
      'A working session for people using AI tools in real projects, without the hype.',
    about: [
      "This is a small, hands-on session for designers, writers, and developers who are already using AI tools and want to compare notes. Bring one workflow you're happy with and one thing that still doesn't work.",
      "We'll spend the first hour on short demos from three local teams, then split into groups to test ideas. No vendor pitches, no predictions about the future.",
    ],
    highlights: [
      'Three local team demos',
      'Small-group working session',
      'Bring your own laptop',
      'Notes and resources shared afterwards',
    ],
    goodToKnow: [
      'Basic familiarity with AI tools is expected.',
      'Power sockets are limited, so charge beforehand.',
      'The venue is a 6-minute walk from Harbour station.',
    ],
    price: 20,
    capacity: 60,
    organizer: "Maker's Quarter",
    featured: false,
  },
]

export const upcomingEvents = [...events].sort(
  (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
)

export function getEventBySlug(slug: string | undefined): EventItem | undefined {
  if (!slug) return undefined
  return events.find((event) => event.slug === slug)
}
