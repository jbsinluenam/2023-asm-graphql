import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery } from '@apollo/client';
import CarForm from './components/forms/CarForm';
import PersonForm from './components/forms/PersonForm';
import Header from './components/Header';
import Records from './components/list/Records';
import {
  ADD_CAR,
  ADD_PERSON,
  GET_CARS_OF_PERSON_BY_ID,
  GET_PEOPLE,
} from './graphql/queries';

export default function App() {
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [addPerson] = useMutation(ADD_PERSON);
  const [addCar] = useMutation(ADD_CAR);

  const handleAddPerson = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    addPerson({
      variables: {
        id: uuidv4(),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
      },
      refetchQueries: [{ query: GET_PEOPLE }],
    });

    e.target.reset();
  };

  const handleAddCar = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const personId = data.get('personId');
    const make = data.get('make');
    const model = data.get('model');
    const year = data.get('year');
    const price = data.get('price');

    addCar({
      variables: {
        id: uuidv4(),
        personId,
        make,
        model,
        year: parseInt(year),
        price: parseInt(price),
      },
      refetchQueries: [
        { query: GET_CARS_OF_PERSON_BY_ID, variables: { id: personId } },
      ],
    });

    e.target.reset();
  };

  if (loading) return 'Loading...';

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className='mx-auto max-w-[1200px] min-h-screen p-4 mt-8 mb-16 font-inter'>
        <Header />

        <main className='flex flex-col gap-4'>
          <section className='py-4 mt-4'>
            <h2 className='text-center font-semibold uppercase m-4 px-4 '>
              Add Person
            </h2>

            <PersonForm onSubmit={handleAddPerson} />
          </section>

          {data?.people?.length > 0 ? (
            <section className='py-4 mb-8'>
              <h2 className='text-center font-semibold uppercase m-4 px-4'>
                Add Car
              </h2>

              <CarForm people={data.people} onSubmit={handleAddCar} />
            </section>
          ) : null}

          <Records data={data} />
        </main>
      </div>
    </>
  );
}
