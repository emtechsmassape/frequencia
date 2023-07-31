import { useCallback, useEffect, useState } from 'react'
import { usePaginationContext } from '../../../shared/contexts'
import { useDebounce } from '../../../shared/hooks'
import { iPeriod } from '../../../shared/interfaces'
import { apiCalendar } from '../../../shared/services'
import { TablePeriodPage } from '../components'

export const ViewPeriodPage = () => {
  const { debounce } = useDebounce()
  const { search, setIsLoading, setCount } = usePaginationContext()
  const [listData, setListData] = useState<iPeriod[]>([])

  const getPeriod = useCallback((query: string) => {
    setIsLoading(true)
    apiCalendar
      .listPeriod(query)
      .then((res) => {
        setListData(res.result)
        setCount(res.total)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const define_query = useCallback((comp: string) => {
    return `?category=ANO${comp}`
  }, [])

  useEffect(() => {
    let query_data = ''
    if (search) {
      query_data += `&name=${search}`
      debounce(() => {
        getPeriod(define_query(query_data))
      })
    } else getPeriod(define_query(query_data))
  }, [debounce, define_query, getPeriod, search])

  return <TablePeriodPage listData={listData} />
}