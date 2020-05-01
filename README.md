# Genesys API
This is an unofficial fan-made api containing Genesys data for use in personal web development.

### Talents
Get talent by name: `/api/talents/{name}`

Get multiple talents: `/api/talents`

QUERY OPTIONS
| name | default | description |
| ---- | ------- | ----------- |
| sort | 'name'  | The value to sort by. In the case of matching values (such as with "tier"), name will be used as a secondary sort. |
| orderBy | 'asc' | The direction to sort by. |
| activation | - | Filter by activation. |
| tier | - | Filter by tier. |
| ranked | - | Filter by ranked or not ranked. Acceptable values are "yes" and "no".
| source | - | Filter by source, using book abbreviations, ie. "GCRB" or "RoT" |
