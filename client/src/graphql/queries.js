import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`;

export const GET_PERSON = gql`
  query PersonWithCar($id: String!) {
    personWithCar(id: $id) {
      cars {
        id
        make
        model
        personId
        price
        year
      }
      person {
        lastName
        id
        firstName
      }
    }
  }
`;

export const GET_CARS_OF_PERSON_BY_ID = gql`
  query GetCarsOfPersonById($id: String!) {
    carsOfPersonId(id: $id) {
      id
      make
      model
      year
      price
      personId
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar(
    $id: String!
    $make: String!
    $model: String!
    $year: Int!
    $price: Float!
    $personId: String!
  ) {
    addCar(
      id: $id
      make: $make
      model: $model
      year: $year
      price: $price
      personId: $personId
    ) {
      id
      make
      model
      year
      price
      personId
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const REMOVE_PERSONS_CAR = gql`
  mutation RemovePersonsCar($id: String!) {
    removeCar(id: $id) {
      id
      make
      model
      year
      price
      personId
    }
  }
`;

export const UPDATE_PERSONS_CAR = gql`
  mutation UpdatePersonsCar(
    $id: String!
    $make: String!
    $model: String!
    $year: Int!
    $price: Float!
    $personId: String!
  ) {
    updateCar(
      id: $id
      make: $make
      model: $model
      year: $year
      price: $price
      personId: $personId
    ) {
      id
      make
      model
      year
      price
      personId
    }
  }
`;
