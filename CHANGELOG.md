# Changelog

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
