import { useTranslation } from 'react-i18next'

export function useNavLinks() {
  const { t } = useTranslation()
  return [
    { to: '/', label: t('nav.home') },
    { to: '/our-story', label: t('nav.ourStory') },
    { to: '/events', label: t('nav.events') },
    { to: '/dress-code', label: t('nav.dressCode') },
    { to: '/q-and-a', label: t('nav.qAndA') },
    { to: '/registry', label: t('nav.registry') },
    { to: '/rsvp', label: t('nav.rsvp') },
    { to: '/travel-info', label: t('nav.travelRegistry') },
  ]
}
