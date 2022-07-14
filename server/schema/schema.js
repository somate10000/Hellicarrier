const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

var books = [
  {
    id: "1",
    name: "Mr. Emma Obi",
    AV: "EA",
    category: "Pos-Atm",
    type: "Debit",
    status: "sent",
    reciever: "",
    amount: 5000.0,
    date: "12-02-22",
    authorid: "2021-09-16",
  },
  {
    id: "2",
    name: "John Philips",
    AV: "JP",
    category: "Tv-Payment",
    status: "sent",
    reciever: "",
    type: "Debit",
    status: "sent",
    amount: 16500.0,
    authorid: "2021-09-16",
  },
  {
    id: "3",
    name: "Donald Ben",
    category: "Pos-Atm",
    AV: "DB",
    type: "Debit",
    status: "sent",
    reciever: "",
    amount: 1000.0,
    authorid: "2021-07-08",
  },
  {
    id: "4",
    name: "Evans Maduka",
    category: "Tv-Payment",
    AV: "EM",
    status: "sent",
    reciever: "",
    type: "Debit",
    status: "sent",
    amount: 250000.0,
    authorid: "2021-07-08",
  },
  {
    id: "5",
    name: "Mrs. Henry Gold",
    category: "Received Money",
    AV: "HG",
    reciever: "",
    type: "Credit",
    status: "recieved",
    amount: 500000.0,
    authorid: "2021-06-26",
  },
  {
    id: "6",
    name: "Global limited",
    category: "Electronics",
    AV: "G",
    status: "sent",
    reciever: "",
    type: "Debit",
    status: "sent",
    amount: 2000.0,
    authorid: "2021-06-26",
  },
  {
    id: "7",
    name: "Mrs. Maureen Luke",
    category: "",
    AV: "ML",
    reciever: "",
    type: "Credit",
    status: "recieved",
    amount: 10000.0,
    authorid: "2021-06-25",
  },
  {
    id: "8",
    name: "Maru Kombat",
    category: "Electronics",
    AV: "MK",
    status: "sent",
    reciever: "",
    type: "Debit",
    amount: 50000.0,
    authorid: "2021-06-25",
  },
];

var date = [
  { id: "2021-09-16" },
  { id: "2021-07-08" },
  { id: "2021-06-26" },
  { id: "2021-06-25" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    category: { type: GraphQLString },
    AV: { type: GraphQLString },
    status: { type: GraphQLString },
    reciever: { type: GraphQLString },
    type: { type: GraphQLString },
    amount: { type: GraphQLString },
    date: { type: GraphQLString },

    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(date, { name: parent.authorid });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },

    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorid: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { name: { type: GraphQLString }, id: { type: GraphQLID } },

      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    date: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(date, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    dates: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return date;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
