import Link from "next/link";

export const EmptyCampaigns = ({
  noCampaignsCreated = false,
}: {
  noCampaignsCreated?: boolean;
}) => {
  return (
    <>
      {noCampaignsCreated ? (
        <div className="space-y-3">
          <h3 className="text-center">No hay ninguna campaña creada.</h3>{" "}
          <p className="text-center">
            <Link
              className="text-white py-1 px-2 bg-sky-500 rounded-md hover:bg-sky-400"
              href={"/ads"}
            >
              Crea un anuncio y lánzalo
            </Link>
          </p>
        </div>
      ) : (
        <h1>No hay ninguna campaña</h1>
      )}
    </>
  );
};
