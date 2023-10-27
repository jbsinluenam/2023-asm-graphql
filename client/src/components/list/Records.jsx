import PersonCard from "./PersonCard";

const Records = ({ data }) => {
  return (
    <section>
      <h2 className="text-center font-semibold uppercase mb-4">Records</h2>

      <div className="flex flex-col gap-4">
        {data.people.map((person) => (
          <PersonCard
            key={person.id}
            id={person.id}
            firstName={person.firstName}
            lastName={person.lastName}
            people={data.people}
          />
        ))}
      </div>
    </section>
  );
};

export default Records;
