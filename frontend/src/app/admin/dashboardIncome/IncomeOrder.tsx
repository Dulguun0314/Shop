import { Incomes, IncomesTitle } from "./mockData";

const IncomeOrder = () => {
  return (
    <>
      <div>
        <div className="flex w-full bg-white border rounded-t-xl px-6 py-3 justify-between">
          {IncomesTitle.map((title, index) => {
            return (
              <div key={index} className="flex-1 ">
                <p className="font-bold">{title.name}</p>
              </div>
            );
          })}
        </div>
        <div className="bg-white border rounded-b-xl px-6 py-3 justify-between ">
          {Incomes.map((income, index) => {
            return (
              <div key={index} className="border-b-2">
                <div className="flex w-full my-4 items-center">
                  <p className="flex-1">{income.orderNumber}</p>
                  <div>
                    <p className="flex-1">{income.gmail}</p>
                    <p className="flex-1">{income.phone}</p>
                  </div>
                  <p className="flex-1 pl-20">{income.price}</p>
                  <p className="flex-1">{income.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default IncomeOrder;
