import CardV1 from '../Card/CardV1';

const Dashboard = () => {
  return (
    <>
      <h3 className="text-3xl font-medium text-gray-700 dark:text-gray-300">
        Dashboard
      </h3>

      <div className="mt-4">
        <div className="flex flex-wrap -mx-6">
          <CardV1
            srcIcon={'icons/profile_group.svg'}
            total={1000}
            cardTitle="Users"
          />
          <CardV1
            srcIcon={'icons/card.svg'}
            total={1000}
            cardTitle="Subscription"
          />
          <CardV1
            srcIcon={'icons/comic.svg'}
            total={1000}
            cardTitle="Comic Favorite"
          />
          <CardV1
            srcIcon={'icons/leather.svg'}
            total={1000}
            cardTitle="Novel Favorite"
          />
          <CardV1
            srcIcon={'icons/movie.svg'}
            total={1000}
            cardTitle="Film Favorite"
          />
        </div>
      </div>
      <div className="mt-8"></div>
    </>
  );
};

export default Dashboard;
