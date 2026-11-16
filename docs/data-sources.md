# Data Sources

Where the facts shown to residents come from. Every factual claim on the site
should trace back to an entry here.

| Source                                                                                                                                                                                 | Publisher / author                                                   | Document date               | Type                               | Supports                                                                              | Last checked                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------- |
| [DAVAO: A BRIEF HISTORY (PDF)](https://davaocity.gov.ph/wp-content/uploads/2018/09/Davao-History.pdf)                                                                                  | Davao City Government; excerpts from Ernesto I. Corcino's manuscript | September 2018              | Official (city government website) | Home page history timeline (`public/locales/en/common.json`, `history.*` keys)        | 2026-11-17                       |
| [Standing Committees of the 21st City Council (PDF)](https://www.davaocity.gov.ph/wp-content/uploads/2025/07/21st-COUNCIL-STANDING-COMMITTEE-1.pdf)                                    | Office of the Sangguniang Panlungsod, Davao City                     | As of July 1, 2025          | Official (city government website) | Councilor names in `content/government/officials/officials.json` (`councilDistricts`) | 2026-11-17                       |
| [Directory of Davao City Government Department Heads](https://davaocity.gov.ph/know-davao-city/directory-of-davao-city-government-department-heads/)                                   | Davao City Government                                                | Undated (footer © 2026)     | Official (city government website) | `MAYOR`, `VICE_MAYOR`, `MAYOR_CONTACT` and `VICE_MAYOR_CONTACT` in `officials.json`   | 2026-11-17                       |
| [Legislative districts of Davao City](https://en.wikipedia.org/wiki/Legislative_districts_of_Davao_City)                                                                               | Wikipedia                                                            | Last edited August 26, 2026 | Secondary (encyclopedia)           | `congressionalReps` in `officials.json`                                               | 2026-11-17                       |
| [Baste, Rigo take oath as mayor, vice mayor of Davao City](https://www.gmanetwork.com/regionaltv/news/112564/baste-rigo-take-oath-as-mayor-vice-mayor-of-davao-city/story/)            | GMA Regional TV                                                      | January 2026                | News                               | `MAYOR` and `VICE_MAYOR` in `officials.json`, and the 1st District council vacancy    | 2026-11-17 (search listing only) |
| [Acting Mayor Sebastian, Vice Mayor Rodrigo Duterte II formally assume posts](https://mb.com.ph/2026/01/23/acting-mayor-sebastian-vice-mayor-rodrigo-duterte-ii-formally-assume-posts) | Manila Bulletin                                                      | January 23, 2026            | News                               | Same as above                                                                         | 2026-11-17 (search listing only) |

### Needs verification

Confirm these with the office concerned, or find an official page that lists
them. Remove each item once it has a source, and delete this section when it is
empty.

- `congressionalReps`: backed only by Wikipedia, which anyone can edit.
  Confirm against an official source such as the House of Representatives
  member list.
- `councilDistricts` district assignments: the committee PDF lists councilors
  but not their districts.
