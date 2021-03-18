# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

type Attraction {
  id: String!
  name: String!
  formatted_address: String!
}

type Hotel {
  id: String!
  name: String!
  attractions: [Attraction!]!
}

type Query {
  getAttractions: [Attraction!]!
  getHotels: [Hotel!]!
  getHotel: [Hotel!]!
}

type Mutation {
  createAttraction(input: CreateAttrationInput!): Attraction!
  createHotel(input: CreateHotelInput!): Hotel!
}

input CreateAttrationInput {
  id: String!
  name: String!
  formatted_address: String!
}

input CreateHotelInput {
  id: String!
  name: String!
}
