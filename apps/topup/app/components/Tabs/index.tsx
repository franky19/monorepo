import './index.css';

export type TabItem = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabItems: TabItem[];
  activeTabs?: string;
  setActiveTabs?: (activeTabs?: string) => void;
};

const Tabs: React.FC<TabsProps> = ({tabItems, setActiveTabs, activeTabs}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex space-x-0 w-full pt-3 xs:border-b xs:border-[#D5D6D8] md:border-[#D5D6D8] lg:border-0">
        {tabItems.map(({label}) => (
          <button
            key={label}
            className={`min-h-[69px] ${
              activeTabs === label
                ? 'text-[#F21D5B] border-b-2 border-[#F21D5B] bg-[#f9f9f9] font-semibold text-sm'
                : 'border-b-2 border-[#E9E9E9] text-sm font-light'
            } w-full`}
            onClick={() => {
              setActiveTabs(label);
            }}>
            <p
              className={` ${
                activeTabs === label
                  ? 'font-semibold text-[18px]'
                  : 'text-[#555] text-[18px] font-light'
              } leading-[42px]`}>
              {label}
            </p>
          </button>
        ))}
      </div>
      <div className="w-full">
        {tabItems.map(({label, content}) =>
          activeTabs === label ? (
            <div key={label} className="py-8 tab-content bg-[#f9f9f9]">
              {content}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default Tabs;
