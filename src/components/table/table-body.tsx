interface TableBodyProps<T> {
  dataList: T[]
  renderRow: (item: T) => React.ReactNode
}

export function TableBody<T>({ dataList, renderRow }: TableBodyProps<T>) {
  return <tbody>{dataList.map(data => renderRow(data))}</tbody>
}
