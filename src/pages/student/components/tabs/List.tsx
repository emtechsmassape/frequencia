import { Box, Tabs, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../../shared'

interface iTabsStudentPageProps {
  value?: string
}

export const TabsStudentPage = ({ value = '' }: iTabsStudentPageProps) => {
  const { listYear } = useAuthContext()

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} variant="scrollable" scrollButtons="auto">
        <Tab label="Alunos" value="" component={Link} to={'/student'} />
        <Tab
          label="Não enturmados"
          value="none"
          component={Link}
          to="/student?year_id=none"
        />
        {listYear?.map((el) => (
          <Tab
            key={el.id}
            label={el.year}
            value={el.id}
            component={Link}
            to={`/student?year_id=${el.id}`}
          />
        ))}
      </Tabs>
    </Box>
  )
}
