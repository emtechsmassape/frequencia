import sortArray from 'sort-array'
import { useMemo } from 'react'
import { TableRow, TableCell } from '@mui/material'
import {
  ActionsFrequency,
  iFrequencyBase,
  iHeadCell,
  TableBase,
  usePaginationContext,
} from '../../../../shared'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('pt-br')
dayjs.extend(relativeTime)

interface iTableFrequencyPageProps {
  listData: iFrequencyBase[]
  handleFrequency: (newFrequency: iFrequencyBase) => void
}

export const TableFrequencyPage = ({
  handleFrequency,
  listData,
}: iTableFrequencyPageProps) => {
  const { order, by } = usePaginationContext()
  const headCells: iHeadCell[] = useMemo(() => {
    return [
      { order: 'finished_at', numeric: 'left', label: 'Finalizado' },
      { order: 'date', numeric: 'left', label: 'Data' },
      { order: 'school_name', numeric: 'left', label: 'Escola' },
      { order: 'class_name', numeric: 'left', label: 'Turma' },
      { order: 'user_name', numeric: 'left', label: 'Usuário' },
      { numeric: 'left', label: 'Ações' },
    ]
  }, [])

  const data = useMemo(() => {
    let listFreq: iFrequencyBase[]

    if (order === 'school_name')
      listFreq = sortArray<iFrequencyBase>(listData, {
        by: order,
        order: by,
        computed: { school_name: (row) => row.school.name },
      })

    if (order === 'class_name')
      listFreq = sortArray<iFrequencyBase>(listData, {
        by: order,
        order: by,
        computed: { class_name: (row) => row.class.name },
      })

    if (order === 'user_name')
      listFreq = sortArray<iFrequencyBase>(listData, {
        by: order,
        order: by,
        computed: { user_name: (row) => row.user.name },
      })

    listFreq = sortArray<iFrequencyBase>(listData, {
      by: order,
      order: by,
    })

    return listFreq
  }, [by, listData, order])

  return (
    <TableBase headCells={headCells}>
      {data.map((el) => (
        <TableRow key={el.id}>
          <TableCell>
            {el.finished_at > 0
              ? dayjs(el.finished_at).fromNow()
              : 'Não Finalizado'}
          </TableCell>
          <TableCell>{el.date}</TableCell>
          <TableCell>{el.school.name}</TableCell>
          <TableCell>{el.class.name}</TableCell>
          <TableCell>{el.user.name}</TableCell>
          <ActionsFrequency frequency={el} handleFrequency={handleFrequency} />
        </TableRow>
      ))}
    </TableBase>
  )
}
