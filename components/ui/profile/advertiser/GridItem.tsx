interface CardGridParams {
  
  cols: number;
}

export const GridItem = ({  cols }: CardGridParams) => {
  return (
    <div className="py-20 w-full inline-flex justify-center">
      <div className={` grid grid-cols-${cols > 4 ? "4" : cols.toString()}`}>
        <div className=" flex rounded-md bg-sky-50 py-3 justify-between">
          <div className="w-full text-center">
            <p>Visualizaciones</p>
            <p>asdada</p>
          </div>
          <div className="w-full text-center">
            <p>Redirecciones</p>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};
