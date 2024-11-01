type FormTitleProps = {
  title: string
  subtitle: string
}

export function FormTitle({ title, subtitle }: FormTitleProps) {
  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-green-600 font-bold text-3xl">{title}</h1>
        <h2 className="text-gray-900 font-medium text-sm">{subtitle}</h2>
      </div>
      <div className="w-full h-1 bg-gray-200 rounded-full" />
    </div>
  )
}
