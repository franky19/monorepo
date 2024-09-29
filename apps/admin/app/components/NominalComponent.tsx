import CardNominalPulsa from './CardNominalPulsa';
import LoadingTopupSkeleton from './Loading/LoadingTopupSkeleton';

const NominalComponent = ({
  isLoadingFetchNominal,
  listTopupResponse,
  getNominalTopupAndConvertToArray,
  selectedIndex,
  handleCardClick,
}) => {
  return (
    <>
      {isLoadingFetchNominal ? (
        <LoadingTopupSkeleton />
      ) : (
        <>
          {listTopupResponse && (
            <CardNominalPulsa
              defaultNominal={getNominalTopupAndConvertToArray()}
              handleCardClick={handleCardClick}
              selectedIndex={selectedIndex}
            />
          )}
        </>
      )}
    </>
  );
};

export default NominalComponent;
