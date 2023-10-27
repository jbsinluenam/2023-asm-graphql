import MainButton from "../components/buttons/MainButton";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PERSON } from "../graphql/queries";

const PersonPage = () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_PERSON, {
    variables: { id },
  });


  refetch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { person, cars } = data.personWithCar;

  return (
    <div className="mx-auto max-w-[1200px] min-h-screen p-4 font-inter">
      <Header />

      <main className="flex flex-col gap-4">
        <div className="py-4 text-center">
          <Link to="/">
            <MainButton title="Back to Home" className="py-8" />
          </Link>

          <h2 className="text-4xl font-bold py-4 mt-8">
            {person.firstName} {person.lastName}
          </h2>

          {cars.length ? (
            <ul className="flex flex-col gap-4">
              {cars.map((car) => (
                <li key={car.id}>
                  <h3 className="text-2xl font-bold">
                    {car.make} {car.model}
                  </h3>

                  <p>
                    {car.year} | ${car.price.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p> Please add a car. </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PersonPage;
