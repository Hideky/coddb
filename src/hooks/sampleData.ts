import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useSampleClients = () => {
  const { data, error } = useSWR('/data-sources/clients.json', fetcher)

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSampleNews = () => {
  const { data, error } = useSWR('/data-sources/news.json', fetcher)

  return {
    news: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSampleArtifacts = () => {
  const { data, error } = useSWR('/data-sources/artifacts.json', fetcher)

  return {
    artifacts: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}


// export const fetchRoster = () => {
//   const { data, error } = useSWR('http://localhost:8000/roster/', fetcher)

//   return {
//     roster: data ? data : [],
//     isLoading: !error && !data,
//     isError: error,
//   }
// }


export const useSampleTransactions = () => {
  const { data, error } = useSWR('/data-sources/history.json', fetcher)

  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}
