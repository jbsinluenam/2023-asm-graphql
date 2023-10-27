import { FiTrash, FiEdit3 } from "react-icons/fi";

import IconButton from "../buttons/IconButton";
import { useMutation } from "@apollo/client";
import {
  GET_CARS_OF_PERSON_BY_ID,
  REMOVE_PERSONS_CAR,
  UPDATE_PERSONS_CAR,
} from "../../graphql/queries";
import { useState } from "react";
import CarForm from "../forms/CarForm";

const CarCard = ({ id, year, model, make, price, personId, people }) => {
  const [removeCar] = useMutation(REMOVE_PERSONS_CAR);
  const [updateCar] = useMutation(UPDATE_PERSONS_CAR);
  const [isEdit, setIsEdit] = useState(false);

  const handleRemoveCar = () => {
    let result = window.confirm("Are you sure you want to delete this car?");

    if (result) {
      removeCar({
        variables: { id: id },
        update: (cache, { data: { addCar } }) => {
          const data = cache.readQuery({
            query: GET_CARS_OF_PERSON_BY_ID,
            variables: { id: personId },
          });

          cache.writeQuery({
            query: GET_CARS_OF_PERSON_BY_ID,
            variables: { id: personId },
            data: {
              ...data,
              carsOfPersonId: [
                ...data.carsOfPersonId.filter((car) => car.id !== id),
              ],
            },
          });
        },
      });
    }
  };

  const handleEditCar = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const year = parseInt(data.get("year"));
    const make = data.get("make");
    const model = data.get("model");
    const price = parseInt(data.get("price"));
    const newPersonId = data.get("personId");

    try {
      updateCar({
        variables: {
          id,
          year,
          make,
          model,
          price,
          personId: newPersonId,
        },
        update: (cache, { data: { updateCar } }) => {
          if (personId !== newPersonId) {
            const currentData = cache.readQuery({
              query: GET_CARS_OF_PERSON_BY_ID,
              variables: { id: personId },
            });

            let newCurrentData = currentData.carsOfPersonId.filter(
              (car) => car.id !== updateCar.id
            );

            newCurrentData = [...newCurrentData, updateCar];

            newCurrentData = newCurrentData.filter(
              (car) => car.personId === personId
            );

            cache.writeQuery({
              query: GET_CARS_OF_PERSON_BY_ID,
              variables: { id: personId },
              data: {
                carsOfPersonId: newCurrentData,
              },
            });

            const newPersonIdData = cache.readQuery({
              query: GET_CARS_OF_PERSON_BY_ID,
              variables: { id: newPersonId },
            });

            cache.writeQuery({
              query: GET_CARS_OF_PERSON_BY_ID,
              variables: { id: newPersonId },
              data: {
                carsOfPersonId: [...newPersonIdData.carsOfPersonId, updateCar],
              },
            });
          }
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsEdit(false);
    }
  };

  if (isEdit)
    return (
      <CarForm
        people={people}
        year={year}
        model={model}
        make={make}
        price={price}
        personId={personId}
        btnTitle="Edit Car"
        onSubmit={handleEditCar}
      />
    );

  return (
    <div className="flex justify-between items-center hover:bg-gray-200 border-b border-b-gray-200 rounded-sm px-2 py-2">
      <p>
        Car: {year} {make} {model}, Price: ${price.toLocaleString()}
      </p>

      <div className="flex gap-2">
        <IconButton
          className="hover:text-red-500"
          onClick={() => setIsEdit(true)}
        >
          <FiEdit3 />
        </IconButton>

        <IconButton className="hover:text-red-500" onClick={handleRemoveCar}>
          <FiTrash />
        </IconButton>
      </div>
    </div>
  );
};

export default CarCard;
