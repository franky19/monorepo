import Datatable from '../Datatable/Datatable';

const Film = () => {
  const mockData = [
    {
      id: 'abc',
      data: {
        title: 'Beranak Dalam Kubur',
        description: 'Film Beranak Dalam Kubur',
        director: 'John Doe',
        writer: 'Jane Doe',
        total_episod: 10,
      },
    },
    {
      id: 'abc',
      data: {
        title: 'Beranak Dalam Kubur',
        description: 'Film Beranak Dalam Kubur',
        director: 'John Doe',
        writer: 'Jane Doe',
        total_episod: 10,
      },
    },
    {
      id: 'abc',
      data: {
        title: 'Beranak Dalam Kubur',
        description: 'Film Beranak Dalam Kubur',
        director: 'John Doe',
        writer: 'Jane Doe',
        total_episod: 10,
      },
    },
    {
      id: 'abc',
      data: {
        title: 'Beranak Dalam Kubur',
        description: 'Film Beranak Dalam Kubur',
        director: 'John Doe',
        writer: 'Jane Doe',
        total_episod: 10,
      },
    },
    {
      id: 'abc',
      data: {
        title: 'Beranak Dalam Kubur',
        description: 'Film Beranak Dalam Kubur',
        director: 'John Doe',
        writer: 'Jane Doe',
        total_episod: 10,
      },
    },
    {
      id: 'abc',
      data: {
        title: 'Beranak Dalam Kubur',
        description: 'Film Beranak Dalam Kubur',
        director: 'John Doe',
        writer: 'Jane Doe',
        total_episod: 10,
      },
    },
  ];

  const headers = [
    'id',
    'title',
    'description',
    'director',
    'writer',
    'total_episod',
  ];

  return (
    <>
      <h3 className="text-3xl font-medium text-gray-700 dark:text-gray-300">
        Film
      </h3>

      <Datatable data={mockData} headers={headers} />
    </>
  );
};

export default Film;
