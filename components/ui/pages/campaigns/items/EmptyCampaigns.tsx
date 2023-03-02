import Link from "next/link";

export const EmptyCampaigns = ({
  noCampaignsCreated = false,
}: {
  noCampaignsCreated?: boolean;
}) => {
  return (
    <>
      {noCampaignsCreated ? (
        <div className="space-y-3 py-20">
          <h3 className="text-center font-bold text-gray-600">No hay ninguna campaña creada.</h3>{" "}
          <p className="text-center">
            <Link
              className="text-sky-500 py-1 font-medium"
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
