import { FiTrash, FiEdit3 } from "react-icons/fi";

import { useMutation, useQuery } from "@apollo/client";
import {
  GET_CARS_OF_PERSON_BY_ID,
  GET_PEOPLE,
  REMOVE_PERSON,
  UPDATE_PERSON,
} from "../../graphql/queries";
import { Link } from "react-router-dom";
import IconButton from "../buttons/IconButton";
import CarCard from "./CarCard";
import { useState } from "react";
import PersonForm from "../forms/PersonForm";

const PersonCard = ({ id, firstName, lastName, people }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updatePerson] = useMutation(UPDATE_PERSON);

  const [removePerson] = useMutation(REMOVE_PERSON, {
    update: (cache, { data: { removePerson } }) => {
      const data = cache.readQuery({ query: GET_PEOPLE });

      const people = data.people.filter(
        (person) => person.id !== removePerson.id
      );

      cache.writeQuery({
        query: GET_PEOPLE,
        data: { people },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CARS_OF_PERSON_BY_ID, {
    variables: { id: id },
  });

  const handleRemovePerson = () => {
    let result = window.confirm("Are you sure you want to delete this person?");

    if (result) {
      removePerson({
        variables: { id: id },
      });
    }
  };

  const handleEditPerson = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    try {
      updatePerson({
        variables: {
          id: id,
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
        },
        update: (cache, { data: { updatePerson } }) => {
          const data = cache.readQuery({ query: GET_PEOPLE });

          //Optimistically Updated Person to People Property
          const people = data.people.map((person) =>
            person.id === updatePerson.id ? updatePerson : person
          );

          cache.writeQuery({
            query: GET_PEOPLE,
            data: { people },
          });
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsEdit(false);
    }
  };

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  return (
    <div className="p-6 border border-gray-200 rounded-md">
      {isEdit ? (
        <PersonForm
          btnTitle="Update User"
          firstName={firstName}
          lastName={lastName}
          onSubmit={handleEditPerson}
        />
      ) : (
        <header className="flex justify-between py-2 px-6 border-b border-b-gray-200">
          <h3 className="font-bold">
            {firstName} {lastName}
          </h3>

          <div className="flex gap-2 items-center">
            <Link to={`/person/${id}`}>
              <button className=" text-sm text-indigo-500">Learn More</button>
            </Link>

            <IconButton
              className="hover:text-red-500"
              onClick={() => setIsEdit(true)}
            >
              <FiEdit3 />
            </IconButton>

            <IconButton
              className="hover:text-red-500"
              onClick={handleRemovePerson}
            >
              <FiTrash />
            </IconButton>
          </div>
        </header>
      )}

      {data.carsOfPersonId.length > 0 ? (
        <div className="content p-4 mt-4">
          {data.carsOfPersonId.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              make={car.make}
              model={car.model}
              year={car.year}
              price={car.price}
              personId={car.personId}
              people={people}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PersonCard;
