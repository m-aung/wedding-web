# Changelog

## 0.11.1

### Patch Changes

- 1fa4c95: Consolidate navigation links into a single useNavLinks hook so all three nav surfaces (mobile drawer, desktop masthead, home quick-links) share one source of truth.

## 0.11.0

### Minor Changes

- 8516329: Add a dedicated Registry page with the gift preference message, and remove the gift registry question from Q&A. Available in both English and Burmese.

## 0.10.5

### Patch Changes

- ee71a50: Trigger production build deployment.

## 0.10.4

### Patch Changes

- 66a5050: Clarify Our Story chapter one narrative — clearer timeline and relationship details

## 0.10.3

### Patch Changes

- 09e888a: Remove brightness filter from Events hero image

## 0.10.2

### Patch Changes

- 9f36176: Fix Burmese translation for the karaoke timeline detail — use မောင်နှံနှစ်ဦး (the couple) instead of စုံတွဲ for a more natural phrasing.
- b8e8af0: Fix timeline alignment on the Events page — use baseline alignment so the time label and event title sit on the same horizontal line in both English and Burmese. Also widen the time column to 150px to accommodate longer Burmese time strings.

## 0.10.1

### Patch Changes

- 179a641: Fix image src paths — use root-relative paths (/filename) instead of relative public/ prefixes so images load correctly in production. Also rename wedding_parking_map.jpeg to wedding-parking-map.jpeg for consistency.

## 0.10.0

### Minor Changes

- 5045f3d: Add tap-to-zoom lightbox to story chapter photos and dress code palette images — tap or click any photo to view it full-screen, with pinch-to-zoom support on mobile.
- a9acae5: Restrict special characters in the RSVP name field and close the RSVP form after August 1st with a polite deadline-passed message in English and Burmese.
- 7c5d588: Rename Travel page file to TravelInfo, replace the parking map placeholder with the real image, and enable tap-to-zoom on the parking map photo.
- 3cbe90a: Rename route from /travel-registry to /travel-info across all navigation and links, and update the parking message to clarify that street parking is available but guests should not park on the grass along Fireplace Neck Rd.

### Patch Changes

- 48b3211: Update LIRR link in both locales to the MTA trip planner pre-set for the wedding day (Sep 19, 2026), arriving at Mastic-Shirley by 2:50 PM to allow time for the Uber/Lyft ride to the venue.

## 0.9.0

### Minor Changes

- dbae1eb: Named the closest LIRR station (Mastic-Shirley, Montauk Branch) on the Travel page and Events page, and added a link to buy LIRR tickets on the MTA website.
- ade689c: Removed the gift registry section and renamed the page from "Travel & Registry" to "Travel Info". The registry_items database table has been dropped.

### Patch Changes

- 6a36748: Corrected cocktail hour (4 PM) and reception (5 PM) times, added karaoke to the timeline, simplified reception details, and updated the home page hero photo.

## 0.8.0

### Minor Changes

- fa326ac: Update carpool info with Jamaica Center meetup details. Updated the carpool travel tip to confirm a carpool will be waiting at Jamaica Center–Parsons/Archer station at 1:00 PM, with a return carpool also arranged for the end of the evening.
- d705714: Update dress code attire notes and add colour palette images. Rewrote the three attire note bodies (dressy, outdoor, colors) and added responsive palette images — full palette on desktop, stacked women/men palettes on mobile.

### Patch Changes

- f66e929: Fix Our Story hero background to match other pages. Removed the grey surface-low background from the Our Story page header, replacing it with the same white hero style used across all other pages.

## 0.7.0

### Minor Changes

- 0237764: Hovering a wheel segment or colour chip now highlights both — the segment pushes out and the matching chip label bolds, with the colour name shown in the wheel centre.

## 0.6.0

### Minor Changes

- de0759f: Enhance RSVP form UX: replace radio buttons with card-style toggle buttons for attendance and plus-one, add inline field validation with blur-time errors and auto-focus on the first failing field, and add a loading spinner to submit buttons.

## 0.5.0

### Minor Changes

- 7eb327c: Add a live search input to the Q&A page that filters questions and answers in both English and Burmese.
- 41b43e4: Add plus one and kids count fields to the RSVP form, introduce a two-step lookup flow so guests can edit a previously submitted RSVP, and handle duplicate or uninvited guest scenarios gracefully.

## 0.4.1

### Patch Changes

- 9bac99e: Rename Cloudflare Pages project to myo-and-yoon-wedding.

## 0.4.0

### Minor Changes

- f732ab6: Add directions map and parking section to Travel page
- 2479647: Add custom wedding rings favicon for browser tab and mobile home screen

## 0.3.0

### Minor Changes

- 4644483: Add an animated colour palette wheel to the Dress Code page, showing the recommended wedding colours as interactive SVG segments that pop outward on hover, alongside labelled swatches and a reserved-colours strip.
- 910b3cb: Add a horizontally scrollable dress code gallery to the Dress Code page, featuring SVG outfit silhouettes for dresses and suits in the wedding palette that lift on hover, evoking a closet browsing experience.
- ab72b09: feat: add ScrollToTop component to reset scroll position on route change
- 527a6d7: Switch changelog tooling from standard-version to Changesets, enabling human-authored changelog entries before each release.

### Patch Changes

- bc7a317: Fix Burmese script rendering by syncing the HTML `lang` attribute with the active language and adding Myanmar-specific line-height and letter-spacing adjustments.

All notable changes to this project will be documented in this file. Entries are written manually via [Changesets](https://github.com/changesets/changesets).

## [0.2.0](https://github.com/m-aung/wedding-web/compare/v0.1.0...v0.2.0) (2026-05-07)

## 0.1.0 (2026-05-07)

### Features

- add accommodation request form and related styles ([221777d](https://github.com/m-aung/wedding-web/commit/221777ddac3af35283a4753d3e0fa46c2fde8f67))
- add email, allergies, and notes fields to RSVP form and database ([69fa5e8](https://github.com/m-aung/wedding-web/commit/69fa5e81d66c5614019269f8ccfb909c8b2fe277))
- add multilingual support with English and Burmese translations ([572966f](https://github.com/m-aung/wedding-web/commit/572966f0e076552e6ce43ae8626422758d400811))
- integrate i18n for multi-language support across all pages ([c261190](https://github.com/m-aung/wedding-web/commit/c26119029bea729fae51d6a38e77bfa6b56b0373))
- remove accommodations and travel tips tables from database schema ([4c30c3a](https://github.com/m-aung/wedding-web/commit/4c30c3a1004a2c9a02255ccf040cacdff4379b96))
- remove meal choice from RSVP form and database, add validation for guest list ([ed8b5e2](https://github.com/m-aung/wedding-web/commit/ed8b5e2b5ca0354e9ab5dbea736ec2357cd0a7b4))
- update event images and correct wedding year in OurStory ([726c355](https://github.com/m-aung/wedding-web/commit/726c35523c9080858b16c0a25b89cb6592e9478a))
- update font styles and enhance hero section visuals across multiple pages ([62d2f17](https://github.com/m-aung/wedding-web/commit/62d2f1711e10c9b88dffd755c5bd823c47829bcf))

### Code Refactoring

- simplify state updates in TravelRegistry component and remove unnecessary loading state ([9cdd032](https://github.com/m-aung/wedding-web/commit/9cdd032012c6630881c2eca351e149458aa5e550))
- streamline TravelRegistry component by removing unused code and simplifying data fetching ([26d7a18](https://github.com/m-aung/wedding-web/commit/26d7a1813d7fd718ce635d36d1b82a16df3c581b))
