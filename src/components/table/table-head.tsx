interface TableHeadProps {
  columns: { [key: string]: string };
}

export function TableHead({ columns }: TableHeadProps) {
  return (
    <thead className="mt-[18px] border-b border-gray-100">
      <tr>
        {Object.keys(columns).map((key) => (
          <th key={key} className="uppercase text-lg font-bold py-[18px]">
            {columns[key]}
          </th>
        ))}
      </tr>
    </thead>
  );
}