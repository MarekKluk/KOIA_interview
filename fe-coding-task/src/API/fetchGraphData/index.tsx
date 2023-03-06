export function fetchGraphData (quartersArray: string[], houseTypeApiValue: string | undefined) {
  return(
    fetch('https://data.ssb.no/api/v0/no/table/07241',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "query": [
            {
              "code": "Boligtype",
              "selection": {
                "filter": "item",
                "values": [
                  houseTypeApiValue
                ]
              }
            },
            {
              "code": "ContentsCode",
              "selection": {
                "filter": "item",
                "values": [
                  "KvPris"
                ]
              }
            },
            {
              "code": "Tid",
              "selection": {
                "filter": "item",
                "values": quartersArray
              }
            }
          ],
          "response": {
            "format": "json-stat2"
          }
        })
      })
  )
}
