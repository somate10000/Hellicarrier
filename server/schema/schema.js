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

var data = [
  {
    id: "1",
    name: "Mr. Emma Obi",
    AV: "EO",
    category: "Pos-Atm",
    type: "Debit",
    status: "sent",
    reciever: "",
    amount: 5000.0,
    date: "12-02-22",
    authorid: "2022-08-25",
    category: "Date",
  },
  {
    id: "1",
    name: "Mark Joseph",
    AV: "MJ",
    category: "Pos-Atm",
    type: "Debit",
    status: "sent",
    reciever: "",
    amount: 5000.0,
    date: "12-02-22",
    authorid: "2022-01-16",
    category: "Date",
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
    authorid: "2022-01-10",
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
    authorid: "2022-01-01",
  },
  {
    id: "4",
    name: "Evans Maduka",
    category: "Upkeep",
    AV: "EM",
    status: "sent",
    reciever: "",
    type: "Debit",
    status: "sent",
    amount: 250000.0,
    authorid: "2022-01-01",
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
    authorid: "2021-12-26",
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
    authorid: "2021-12-26",
  },
  {
    id: "7",
    name: "Mrs. Maureen Luke",
    category: "Recieved Money",
    AV: "ML",
    reciever: "",
    type: "Credit",
    status: "recieved",
    amount: 10000.0,
    authorid: "2021-11-25",
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
    authorid: "2021-11-25",
  },
  {
    id: "1",
    name: "Jeff Brown",
    AV: "JB",
    category: "Bills",
    type: "Debit",
    status: "sent",
    reciever: "",
    amount: 5000.0,
    date: "12-02-22",
    authorid: "2022-01-10",
    category: "Date",
  },
  {
    id: "2",
    name: "Celeron",
    AV: "C",
    category: "Cable-Payment",
    status: "sent",
    reciever: "",
    type: "Debit",
    status: "sent",
    amount: 16500.0,
    authorid: "2022-01-10",
  },
  {
    id: "3",
    name: "Mary Maduka",
    category: "Upkeep",
    AV: "MM",
    type: "Debit",
    status: "sent",
    reciever: "",
    amount: 1000.0,
    authorid: "2022-01-01",
  },
  {
    id: "4",
    name: "Benjamin Gana",
    category: "Others",
    AV: "BG",
    status: "sent",
    reciever: "",
    type: "Debit",
    status: "sent",
    amount: 250000.0,
    authorid: "2022-01-01",
  },
  {
    id: "5",
    name: "Mrs. Glady Gold",
    category: "Received Money",
    AV: "GG",
    reciever: "",
    type: "Credit",
    status: "recieved",
    amount: 500000.0,
    authorid: "2021-12-26",
  },
  {
    id: "6",
    name: "Translook Hotel",
    category: "Accomodation",
    AV: "TH",
    status: "sent",
    reciever: "",
    type: "Debit",
    status: "sent",
    amount: 2000.0,
    authorid: "2021-12-26",
  },
  {
    id: "7",
    name: "Ifeanyi Daniel",
    category: "Recieved Money",
    AV: "ID",
    reciever: "",
    type: "Credit",
    status: "recieved",
    amount: 500000.0,
    authorid: "2021-11-25",
  },
  {
    id: "8",
    name: "Mau Dohamn",
    category: "Electronics",
    AV: "MD",
    status: "sent",
    reciever: "",
    type: "Debit",
    amount: 50000.0,
    authorid: "2022-08-25",
  },
];

var date = [
  { title: "2022-08-25" },
  { title: "2022-01-16" },
  { title: "2022-01-10" },
  { title: "2022-01-01" },
  { title: "2021-12-26" },
  { title: "2021-11-25" },
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
