import { useRef, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { Employee } from './mockEmployees'

const helper = createColumnHelper<Employee>()

const columns = [
  helper.accessor('id', { header: 'ID', size: 60 }),
  helper.accessor('fullName', { header: 'ФИО', size: 200 }),
  helper.accessor('email', { header: 'Email', size: 240 }),
  helper.accessor('department', { header: 'Отдел', size: 130 }),
  helper.accessor('position', { header: 'Должность', size: 160 }),
  helper.accessor('status', {
    header: 'Статус',
    size: 110,
    cell: ({ getValue }) => {
      const status = getValue()
      const text =
        status === 'active' ? 'Работает' : status === 'vacation' ? 'Отпуск' : 'Уволен'

      return <span className={`tag tag-${status}`}>{text}</span>
    },
  }),
  helper.accessor('hireDate', { header: 'Дата найма', size: 110 }),
  helper.accessor('salary', {
    header: 'Зарплата',
    size: 120,
    cell: ({ getValue }) => getValue().toLocaleString('ru-RU') + ' ₽',
  }),
]

type Props = {
  data: Employee[]
}

export function EmployeeTable({ data }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const rows = table.getRowModel().rows

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 40,
    overscan: 8,
  })

  const virtualRows = virtualizer.getVirtualItems()

  return (
    <div className="table-wrap">
      <div ref={scrollRef} className="table-scroll">
        <table style={{ width: 1230 }}>
          <thead>
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id}>
                {group.headers.map((header) => {
                  const sorted = header.column.getIsSorted()

                  return (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {sorted === 'asc' ? ' ↑' : sorted === 'desc' ? ' ↓' : ''}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
            {virtualRows.map((item) => {
              const row = rows[item.index]

              return (
                <tr
                  key={row.id}
                  style={{
                    height: item.size,
                    transform: `translateY(${item.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
