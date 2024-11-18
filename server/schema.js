export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String!
    role: String!
    profileImage: String
  }

  type Artist {
    id: ID!
    name: String!
    specialty: [String!]!
    location: String!
    rating: Float!
    imageUrl: String!
    bio: String!
    available: Boolean!
    latitude: String!
    longitude: String!
    verificationStatus: String!
  }

  type TattooDesign {
    id: ID!
    title: String!
    imageUrl: String!
    price: Float!
    artist: Artist!
    style: String!
    likes: Int!
  }

  type TimeSlot {
    id: ID!
    artistId: ID!
    date: String!
    time: String!
    available: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    artists: [Artist!]!
    artist(id: ID!): Artist
    designs: [TattooDesign!]!
    design(id: ID!): TattooDesign
    availableSlots(artistId: ID!): [TimeSlot!]!
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!, role: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createDesign(title: String!, imageUrl: String!, price: Float!, style: String!): TattooDesign!
    bookSlot(slotId: ID!): TimeSlot!
    updateArtistAvailability(available: Boolean!): Artist!
  }
`;