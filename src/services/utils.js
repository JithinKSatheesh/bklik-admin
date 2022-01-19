
export const findObjectById = (options = [], id, key = 'value') => {
  const data = options.find(val => val[key] == id)
  return (data ? data : {})
}

//  ** remove all empty properties
export const clean = (obj) => {
  const newObj = { ...obj }
  for (const propName in newObj) {
    if (newObj[propName] === "") {
      delete newObj[propName]
    }
  }
  return newObj
}

export const setPagnationLinks = (res = {}, setPage = () => { }, setPageCount = () => { }) => {
  const _meta = res?.data?.data?.meta
  const _pageCount = Math.ceil((_meta?.total ?? 0) / (_meta?.per_page ?? 1))

  setPage(parseInt((_meta?.current_page ?? 0)))
  setPageCount(_pageCount)

}

export const formatDate = (_date, invert) => {

  if (_date) {

    const today = new Date(_date)
    if (today.toString() !== 'Invalid Date') {
      let dd = today.getDate()
      let mm = today.getMonth() + 1
      let yyyy = today.getFullYear()
      if (dd < 10) {
        dd = '0' + dd;
      }
      
      if (mm < 10) {
        mm = '0' + mm;
      }
      return invert ? (`${yyyy}-${mm}-${dd}`) : (`${dd}-${mm}-${yyyy}`)
    }

  }

  return ''

}
