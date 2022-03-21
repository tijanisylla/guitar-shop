## Steps to get seed data

### download raw from musicians friend

visit https://www.musiciansfriend.com/

go to "categories" > "electric-guitars" , etc..

open Network > XHR tab,

find API request that looks similar to:

```
GET
https://www.musiciansfriend.com/cartridges/ajax/leftNavJSON.jsp
    ?N=100902 100511 100512 100902 500002 100511 100512
    &pageName=category-page
    &Nao=0
    &recsPerPage=90
    &Ns=bS
```

right-click, and "copy response",

paste into `./xyz.raw.json`, and "beautify"

view "Products"

### Example Product

(removed a couple keys)

```json
{

    "name": "Gibson Les Paul Studio Electric Guitar",
    "productID": "site1prodL54490",
    "sku": "site1prod501158",
    "defaultSkuUrl": "/guitars/gibson-les-paul-studio-electric-guitar/l54490000003000",
    "openBoxUrl": "/guitars/open-box-gibson-les-paul-studio-electric-guitar",
    "path": "/guitars/gibson-les-paul-studio-electric-guitar",
    "thumb": "https://media.musiciansfriend.com/is/image/MMGS7/Les-Paul-Studio-Electric-Guitar-Smokehouse-Burst/L54490000003000-00-220x220.jpg",
    "itemType": "New",
    "desc": "",
    "rating": "9",
    "reviews": "13",
    "price": "$1,599.00",
    "savings": "$150.00 (9%)",
    "maxSavingsMSRP": "$1,749.00",
    "minRegularPrice": "1599.0",
    "salePrice": "1599.0",
}
```

