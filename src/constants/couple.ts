export const GROOM = {
  firstName: 'Myo Thu Win',
  nickname: 'Myo',
  lastName: 'Aung',
  fullName: 'Myo Thu Win Aung',
} as const

export const BRIDE = {
  firstName: 'Yoon Hayman',
  nickname: 'Yoon',
  lastName: 'Aung',
  fullName: 'Yoon Hayman Aung',
} as const

export const WEDDING = {
  date: 'September 19, 2026',
  dateLong: 'Saturday, September 19, 2026',
  time: '4:00 PM',
  venueName: '9 Fire Place',
  venueCity: 'New York',
  venueDisplay: '9 Fire Place, New York',
  venueAddress: '9 Fire Place Neck Road, Brookhaven, New York 11719',
  venueMapsUrl: 'https://maps.app.goo.gl/REuvzoxPQvyqSTuK6',
} as const

/** "Myo & Yoon" — short display form used in headings and navbars */
export const COUPLE_DISPLAY = `${GROOM.nickname} & ${BRIDE.nickname}` as const

/** Contact email derived from couple nicknames */
export const COUPLE_EMAIL = `travel@${GROOM.nickname.toLowerCase()}and${BRIDE.nickname.toLowerCase()}.com`

/** Hotel booking code */
export const HOTEL_BOOKING_CODE = `${GROOM.nickname.toUpperCase()}${BRIDE.nickname.toUpperCase()}24`
