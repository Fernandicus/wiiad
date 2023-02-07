interface ICreditCardParams {
  owner: string;
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
}

export const CreditCard = (params: ICreditCardParams) => {
  const { brand, expMonth, expYear, last4, owner } = params;

  return (
    <div className="relative  w-64 h-36 group text-white  hover:shadow-lg hover:shadow-slate-400 shadow-md shadow-slate-300 transition-all duration-300 rounded-lg overflow-hidden">
      <div className="absolute top-0 w-96 h-56 group-hover:-translate-x-24 transition-all duration-300 bg-gradient-to-bl from-sky-600 via-purple-500 to-red-400" />
      <div className="relative w-64 h-36 p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <p className="font-bold">{brand}</p>
          <p className=" text-sm">{owner}</p>
        </div>
        <div className="text-end font-light">
          <p>**** **** **** {last4}</p>
          <p className="text-xs">
            {expMonth} / {expYear}
          </p>
        </div>
      </div>
    </div>
  );
};
