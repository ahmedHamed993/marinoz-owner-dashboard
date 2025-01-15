- insert yacht type

```graphql
mutation MyMutation {
  insert_yacht_types(
    objects: {
      yacht_type_ar: "شق"
      yacht_type_de: "de"
      yacht_type_en: "en"
      yacht_type_ru: "re"
    }
  ) {
    returning {
      id
      yacht_type_ar
      yacht_type_de
      yacht_type_en
      yacht_type_ru
    }
  }
}
```

- create country

```graphql
mutation MyMutation {
  insert_countries(
    objects: {
      country_ar: "ar"
      country_de: "qw"
      country_en: "er"
      country_ru: "we"
    }
  ) {
    returning {
      id
      country_ru
      country_en
      country_de
      country_ar
    }
  }
}
```

- property type

```graphql
mutation MyMutation {
  insert_property_types(
    objects: {
      property_type_ar: "qw"
      property_type_de: "es"
      property_type_en: "na"
      property_type_ru: "qe"
    }
  ) {
    returning {
      id
      property_type_ar
      property_type_de
      property_type_en
      property_type_ru
    }
  }
}
```

- get cities

```graphql
query MyQuery {
  cities(limit: 10, offset: 10) {
    city_ar
    city_de
    city_en
    city_ru
    created_at
    image
    id
    updated_at
    yachts {
      id
    }
    country {
      country_ar
      country_de
      country_en
      country_ru
      id
      created_at
      image
    }
  }
}
```

- get countries

```graphql
query MyQuery {
  countries {
    country_ar
    country_de
    country_en
    country_ru
    created_at
    id
    image
  }
}
```

- get users

```graphql
query MyQuery {
  clients {
    address
    date_of_birth
    email
    email_verified_at
    id
    image
    name
    phone_number
    status
    updated_at
    created_at
  }
}
```

- get clients

```graphql
query MyQuery {
  owners {
    created_at
    address
    email
    id
    image
    name
    password
    phone_number
    status
    yachts_aggregate {
      aggregate {
        count
      }
    }
    tours_aggregate {
      aggregate {
        count
      }
    }
  }
}
```
