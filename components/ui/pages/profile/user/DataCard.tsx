export function DataCard(props: { title: string; data: string }) {
  return (
    <div className="inline-flex items-center p-5 h-full space-x-5 bg-white rounded-lg shadow-lg shadow-slate-200">
      <div className="flex-items-center text-center">
        <p className="text-gray-500">{props.title}</p>
        <p className="font-bold">{props.data}</p>
      </div>
    </div>
  );
}
