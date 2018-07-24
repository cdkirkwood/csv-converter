import top25 from './top25'
import bottom25 from './bottom25'
import over100 from './over100'
import under100 from './under100'

const filterData = (data, index, filterName) => {
  switch (filterName) {
    case ('top25'):
      return top25(data, index)
      case ('bottom25'):
      return bottom25(data, index)
      case ('over100'):
      return over100(data, index)
      case ('under100'):
      return under100(data, index)
    default:
      return
  }
}

export default filterData
