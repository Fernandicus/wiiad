interface Props {
  title: string;
  data: string;
  href:string;
  children?: JSX.Element;
}

export function DataCardButton({ href, title, data, children }: Props) {
  return (
    <a href={href} className="h-full">
      <div className=" group border border-transparent hover:border-sky-300 inline-flex items-center p-5 h-full space-x-5 bg-white rounded-lg shadow-lg shadow-slate-200">
        <div className="text-center">
          <p className="text-gray-500 group-hover:text-sky-500">{title}</p>
          <p className="font-bold group-hover:text-sky-500">{data}</p>
        </div>
      </div>
    </a>
  );
}
