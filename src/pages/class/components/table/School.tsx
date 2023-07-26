import { useState } from 'react'
import { usePaginationContext } from '../../../../shared/contexts'
import { iHeadCell, iSchool } from '../../../../shared/interfaces'
import {
  DialogActiveSchool,
  DialogCreateSchool,
  DialogDirectorSchool,
  DialogEditSchool,
  TableBase,
} from '../../../../shared/components'
import { Link, Skeleton, TableCell, TableRow } from '@mui/material'
import { ActionsSchool } from '../actions'
import { Link as RouterLink } from 'react-router-dom'

interface iTableSchoolProps {
  data: iSchool[]
}

export const TableSchool = ({ data }: iTableSchoolProps) => {
  const { isLoading, onClickReset } = usePaginationContext()
  const [schoolData, setSchoolData] = useState<iSchool>()

  const handleSchool = (newSchool: iSchool) => setSchoolData(newSchool)

  const headCells: iHeadCell[] = [
    { order: 'name', numeric: 'left', label: 'Escola' },
    { order: 'director_name', numeric: 'left', label: 'Diretor' },
    { numeric: 'left', label: 'Ações' },
  ]

  return (
    <>
      <TableBase headCells={headCells} message="Nenhuma escola encotrada">
        {data.map((school) => (
          <TableRow key={school.id} hover>
            <TableCell>
              {isLoading ? (
                <Skeleton width={250} />
              ) : school.is_active ? (
                <Link
                  underline="none"
                  variant="body2"
                  color="inherit"
                  component={RouterLink}
                  to={`/school/${school.id}`}
                  onClick={onClickReset}
                >
                  {school.name}
                </Link>
              ) : (
                school.name
              )}
            </TableCell>
            <TableCell>
              {isLoading ? <Skeleton width={200} /> : school.director?.name}
            </TableCell>
            <ActionsSchool school={school} handleSchool={handleSchool} />
          </TableRow>
        ))}
      </TableBase>
      <DialogCreateSchool />
      {schoolData && <DialogEditSchool school={schoolData} locale="list" />}
      {schoolData && <DialogDirectorSchool school={schoolData} locale="list" />}
      {schoolData && <DialogActiveSchool school={schoolData} locale="list" />}
    </>
  )
}